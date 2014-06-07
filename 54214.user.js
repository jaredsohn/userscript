// ==UserScript==
// @name 	Travian3 Beyond - ML&CN
// @author	ms99 (Nux, Lux, Szabka, Victor Garcia (aka Croc))
// @namespace 	T3
// @version 	3.8.8.6.3
// @description	Travian3 Beyond - ML&CN (Arabic only)
// @source 	http://userscripts.org/scripts/show/54214
// @identifier 	http://userscripts.org/scripts/show/54214.user.js
// @license 	Creative Commons Attribution-Noncommercial-Share Alike 3.0 Germany License
// @include 	http://*.travian*.*/*.php*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude	http://*.travian*.*/log*.php*
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
*Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Spain License.
*To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/es/
*
*The updated script from ms99 is licensed under the
*Creative Commons Attribution-Noncommercial-Share Alike 3.0 Germany License
*To view a copy of this license, please visit http://creativecommons.org/licenses/by-nc-sa/3.0/de/
*
*An English translation of the "Creative Commons Attribution-Noncomercial-Share Alike 3.0 License"
*can be found here http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en
*
/*****************************************************************************
*© Copyright ms99, 2008-2009
*Parts of this script © Copyright Nux, 2008
*Setup page behavior © Copyright Lux, 2008
*Big icons behavior (except default & except Setup) © Copyright onetmt, 2009
*Until then & Residue calculations © Velonis Petros (mail: velonis.gr) , 2009
*Initial script © Copyright Victor Garcia (aka Croc), 2007
*Parts of this script (functions for moving a report/message displayed as a pop-up with the mouse) © Copyright Richard Laffers, 2007
*
*Parts of this code are provided or based on ideas and/or code written by others
*Additional images embedded in this script provided by ms99, Nux, Lux, DMaster, Brains, fr3nchlover, CuPliz13
*Translations to different languages are provided by users of this script
*IMPORTANT CONTRIBUTIONS TO THIS SCRIPT (listed in alphabetical order):
*ACE, Acr111, BmW, Brains, CuPliz13, Dakkie, digital012, david.macej, DMaster, Dream1, EXEMOK, ezGertieY,
*FitForTheLooneyVille, friedturnip, fr3nchlover, Lassie, Lux, MarioCheng, matteo466, MrRyMan, napkin, Nux, onetmt,
*phob0z,rtellezi, Rypi, Sag, samad909, someweirdnobody, Thornheart, vampiricdust, Velonis Petros, yabash, Zippo
*Please have understanding if I've forgotten somebody with a relevant contribution to this script
*Please send a message to the address specified on the page of the script, for credits
*
*Other contributors' (nick)names may be provided in the header of (or inside) the functions
*SPECIAL THANKS to all contributors and translators of this script !
*****************************************************************************/

function functionMain(e) {

	var crtPage = window.location.href;
	var TB3O = new Object();
	TB3O.version = '3.8.8.6.3';
	TB3O.language = 'en';
	TB3O.TBStartTime = new Date().getTime();
	TB3O.TBEndTime = 0;
	TB3O.usoLink = 'http://userscripts.org/scripts/';
	TB3O.usoNo = '54214';
	TB3O.url = TB3O.usoLink + 'source/' + TB3O.usoNo + '.user.js';
	TB3O.shN = 'TB3-ML&CN';
	TB3O.name = 'Waiting for the storm';
	TB3O.usoSabout = TB3O.usoLink + 'show/' + TB3O.usoNo;
	TB3O.origMap = true;
	TB3O.FXtitle = "";
	TB3O.TBTotalRunTime = function() {return TB3O.TBEndTime - TB3O.TBStartTime;}
	TB3O.OrigDocTitle = document.title;
	TB3O.versionText = function() {return TB3O.version + " - " + TB3O.name;}
	TB3O.boolShowCPinUpgTables = "1";
	TB3O.boolShowCCinUpgTables = "1";
	TB3O.boolShowDistTimes = "1";
	TB3O.boolShowCCinVL = "1";
	TB3O.nodeToAppendRbT = '';
	TB3O.nodeToAppendSb = '';
	TB3O.boolShowResBarTable = '1';
	TB3O.boolFloatResBarTable = '1';
	TB3O.boolShowSearchBar = '1';
	TB3O.boolFloatSearchBar = '1';
	TB3O.boolShowMapUserLinks = '1';
	TB3O.boolShowTravmapAllyLinks = '1';
	TB3O.boolShowUserBM = '1';
	TB3O.boolFloatUserBM = '0';
	TB3O.boolLockBookmarks = '1';
	TB3O.nodeToAppendUb = '';
	TB3O.nodeToAppendNb = '';
	TB3O.boolShowNoteBlock = '1';
	TB3O.boolFloatNoteBlock = '0';
	TB3O.boolShowPopInVL = '1';
	TB3O.wsAnalyserOpt = '0';
	TB3O.mapAnalyserOption = '0';
	TB3O.FmapServer = '';
	TB3O.FmapLanguage = '';
	TB3O.boolShowStatLinks = '1';
	TB3O.boolShowCellTypeInfo = '1';
	TB3O.showBiAlliance = '1';
	TB3O.boolShowTroopInfoTooltips = '1';
	TB3O.boolShowTB3BattleReport = '1';
	TB3O.boolShowBRStatDetails = '1';
	TB3O.bool2ndVlist = '1';
	TB3O.boolUseNPCAssistant = '1';
	TB3O.boolIsT2x;
	TB3O.boolRemoveAdBanner = '1';
	TB3O.boolShowSortedBiUpgT = '0';
	TB3O.boolShowUntilthenResidue = '1';
	TB3O.boolShowIGMLinkForMe = '1';
	TB3O.boolIsThisNPC = false;
	TB3O.boolIsNPCExluded = false;
	TB3O.bSaIeMa = '1';
	TB3O.rpDefAction = '0';
	TB3O.bRpr = '1';
	TB3O.bMO = '1';
	TB3O.T35 = false;
	TB3O.M35 = 0;
	TB3O.boolIsAvBarracks = false;
	TB3O.boolShowNPCLink = crtPage.indexOf(".org") == -1;
	TB3O.gServer;
	TB3O.fullServerName;
	TB3O.crtUserID = '0';
	TB3O.crtUserName = '';
	TB3O.LOG_LEVEL = 10;
	TB3O.plusAcc = false;
	TB3O.tPpH = [0, 0, 0, 0, 0]; //total production per hour for all villages -> requires to open all villages from time to time to get current data
	//race
	TB3O.crtUserRace = '';
	TB3O.dispUserRace = '';
	TB3O.deltaRaceImg = 0;
	//crt coords
	TB3O.xCrt = -1000;
	TB3O.yCrt = -1000;
	//CN colors
	TB3O.CN_COL_TXT = '#000000';
	TB3O.CN_COL_NEUTRAL = '#FDF8C1';
	TB3O.CN_COL_MAX_LVL = '#7DFF7D';
	TB3O.CN_COL_NO_UPG = '#FF9696';
	TB3O.CN_COL_UPG_VIA_NPC = '#FFC84B';

	TB3O.wH = window.innerHeight;
	TB3O.wW = window.innerWidth;

	//TB3O.Setup = [];

	function xVillage(aName, vID, newdid, x, y, vLink) {//village information
		this.vName = aName;
		this.vID = vID;
		this.vNewdid = newdid;
		this.vx = x;
		this.vy = y;
		this.vLink = vLink;
		return this;
	}

	function xBiP(aName, tEnd) {//a building being upgraded
		var txtLvl = aName[1].replace(")", "");
		var lvl = txtLvl.split(" ");
		this.name = aName[0];
		this.txtLvl = txtLvl;
		this.lvl = lvl[1];
		this.endTime = tEnd;
		return this;
	}

	function xTiT(aType, aName, t1) {
		this.type = aType;
		this.name = aName;
		this.t1 = t1;
		var aD = new Date();
		aD.setTime(aD.getTime());
		this.crtDate = aD;
		return this;
	}

	function xTrMov(iT, no, fT) {//a troop movement (from dorf1.php)
		this.type = iT;
		this.no = no;
		this.fT = fT;
	}

	var vList = new Array();
	//active village
	var aVillage = new xVillage('', 0, 0, -1000, -1000, '');

	var defPosFloatDiv = "680px|150px";
	var merchantsCapacity = 0;
	var defaultMF = [5, 5, 4, 2, 4];
	var specBuildings = [0, 0, 0, 0, 0, 0, 0, 0];//cpbuilding, barracks, big barracks, workshot, stable, big stable, tournament square, townhall
	var marketFilters;
	var boolIsTroopsTrainingBuilding;
	var localGP = "";
	var docDir = ['left', 'right'];
	var wsSName;
	var wsURLCropFinderLinkV2 = "http://crop-finder.com/";
	var wsAnalyser = [
		["World Analyser", "http://www.travian.ws/analyser.pl?s="],
		["Travian Utils", "http://travian-utils.com/?s="],
		["Travianbox.com", "http://travianbox.com/stats/"]
	];
	var mapAnalyser = [
		["Travmap", "http://travmap.shishnet.org/"],
		["Flash map", "http://travian.org.ua/"]
	];
	var wsURLTravianBox = "http://travianbox.com";
	var urlNow = window.location.pathname + window.location.search;
	var warsimExtLink = "http://kirilloid.ru/travian/warsim.php";
	var warsimIntLink = "warsim.php";
	var jsVoid = 'javaScript:void(0)';
	var xGIF = "a/x.gif";
	var dlright1 = 'lright1';
	var dmid = 'lmidall';
	var dTop5 = 'ltop5';
	var dTop1 = 'ltop1';
	var dmid2 = 'lmid2';
	var dleft = 'lleft';
	var dmid1 = 'lmid1';
	var dmap = 'map1';
	var gIcons = new Array();

	var crtResUnits = new Array(5);//current resource units
	var capacity = new Array(4);//capacity of the warehouse/granary
	var prodPerHour = new Array(7);//production per hour for the four resource types
	var timeToFill = [[-1, ""], [-1, ""], [-1, ""], [-1, ""]];//time to fill the warehouse/granary

	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
	var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;

	//css Style declarations
	var acss = "";
	acss += "#upgTable	{position:relative; width:682px; border-collapse:collapse; border:1px solid silver; background-color:white;}" +
	"#mapTable		{position: relative; width:682px; margin-top:16px;}" +
	".bttable		{width:100%; height:129px;}" +
	".dcol			{color:#A0A0A0;}" +
	"table.tbg tr.cbgx td, td.cbgx {background-color:#FFFFC0; text-align:center;}" +
	"#resNtable		{border:0px none white;}" +
	"table.tb3tb	{width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:white; padding:2px; margin:1px;}" +
	"tr.cbgx td, td.cbgx {background-color:#FFFFC0; border:1px solid silver; text-align:center;}" +
	"table.tb3tb tr td {border:1px solid silver;}" +
	"table.tb3tbnb	{border-collapse:collapse; border:0px none white; font-size:8pt; text-align:center; padding:2px; margin:1px;}" +
	"table.tb3tbnb tr td {border:0px none white;}" +
	"tr.tb3rh		{background-color:#ECECEC; text-align:center; border:1px solid silver;}" +
	"tr.tb3rhb		{background-color:#ECECEC; text-align:center; border:1px solid silver; font-weight:bold;}" +
	"tr.tb3rhnb		{background-color:#ECECEC; text-align:center;}" +
	"tr.tb3r 		{border-collapse:collapse; border:1px solid silver; text-align:center;}" +
	"tr.tb3rnb		{border-collapse:collapse; border:0px none white; text-align:center; white-space:nowrap;}" +
	"td.tb3chbb		{border:1px solid silver; background-color:#ECECEC; padding:2px; font-weight:bold; font-size:10pt;}" +
	"td.tb3chb		{border:1px solid silver; background-color:#ECECEC; padding:2px; font-weight:bold;}" +
	"td.tb3ch		{border:1px solid silver; background-color:#ECECEC; padding:2px;}" +
	"td.tb3chnb		{border:0px none white; background-color:#ECECEC; padding:2px; text-align:center;}" +
	"td.tb3c		{border:1px solid silver; background-color:white; padding:2px;}" +
	"td.tb3cnb		{border:0px none white; text-align:center; padding:2px;}" +
	"td.tb3cbt		{border-top:1px solid silver; font-size:8pt; color:#000000; text-align:center;}" +
	"td.tb3cnbhal	{border:0px none white; text-align:left;}" +
	"td.tb3cresbar	{border:1px solid silver; background-color:white; padding:0px;}";

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
	var cssSetup =	".MsgPageOff {visibility:hidden; display:none; position:absolute; top:-100px; left:-100px;}" +
	".OuterMsgPageOn {position:absolute; top:0px; left:0px; visibility:visible; width:150%; height:200%; background-color:#000; z-index:1998; opacity:0.75;}" +
	".InnerMsgPageOn {position: absolute; left:25%; top:2.8%; visibility:visible; opacity:1; z-index:1999;}" +
	".divCloseMsgPageOn {position: absolute; left:73.5%; top:0.2%; visibility:visible; opacity:1; z-index:2000;}";
	GM_addStyle(cssSetup);
	//------------------------------------------

	//NPC Assistant
	var cssNPC = ".npc-general {margin:3px 0 0; font-size:7pt; float:none;} " +
	".npc-red {color: #DD0000} " +
	".npc-green {color: #009900}";
	GM_addStyle(cssNPC);

	var NPCResources = 'npcResources';
	var NPCbacklinkName = 'npcBacklinkName';
	var NPCURL = '/build.php?gid=17&t=3';

	//center numbers css
	var cssCN = ".CNbuildingtags{background-color:" + TB3O.CN_COL_NEUTRAL + "; border:thin solid #000000; -moz-border-radius: 2em; " +
	"padding-top:3px; font-family:Arial, Helvetica, Verdana, sans-serif; font-size:9pt; font-weight:bold; " +
	"color:" + TB3O.CN_COL_TXT + "; text-align:center; position:absolute; width:21px; height:18px; cursor:pointer; visibility:hidden; z-index:26;}";
	GM_addStyle(cssCN);

var xLang = new Array();
//default = English
xLang['ALLIANCE'] = 'Alliance';
xLang['SIM'] = 'Combat simulator';
xLang['AREYOUSURE'] = 'Are you sure?';
xLang['LOSS'] = 'Loss';
xLang['PROFIT'] = 'Profit';
xLang['EXTAV'] = 'Extension available';
xLang['PLAYER'] = 'Player';
xLang['VILLAGE'] = 'Village';
xLang['POPULATION'] = 'Population';
xLang['COORDS'] = 'Coordinates';
xLang['MAPTBACTS'] = 'Actions';
xLang['SAVED'] = 'Saved';
xLang['YOUNEED'] = 'You need';
xLang['TODAY'] = 'today';
xLang['TOMORROW'] = 'tomorrow';
xLang['PAS_MANYANA'] = 'day after tomorrow';
xLang['MARKET'] = 'Marketplace';
xLang['BARRACKS'] = 'Barracks';
xLang['RALLYPOINT'] = 'Rally point';
xLang['STABLE'] = 'Stable';
xLang['WORKSHOP'] = 'Workshop';
xLang['SENDRES'] = 'Send resources';
xLang['COMPRAR'] = 'Buy';
xLang['SELL'] = 'Sell';
xLang['SENDIGM'] = 'Send IGM';
xLang['LISTO'] = 'Available';
xLang['ON'] = 'on';
xLang['AT'] = 'at';
xLang['EFICIENCIA'] = 'Efficiency';
xLang['NEVER'] = 'Never';
xLang['ALDEAS'] = 'Village(s)';
xLang['TIEMPO'] = 'Time';
xLang['OFREZCO'] = 'Offering';
xLang['BUSCO'] = 'Searching';
xLang['TIPO'] = 'Type';
xLang['DISPONIBLE'] = 'Only available';
xLang['CUALQUIERA'] = 'Any';
xLang['YES'] = 'Yes';
xLang['NO'] = 'No';
xLang['LOGIN'] = 'Login';
xLang['MARCADORES'] = 'Bookmarks';
xLang['ANYADIR'] = 'Add';
xLang['ENLACE'] = 'New Bookmark URL';
xLang['TEXTO'] = 'New Bookmark Text';
xLang['ELIMINAR'] = 'Delete';
xLang['MAPA'] = 'Map';
xLang['MAXTIME'] = 'Maximum time';
xLang['ARCHIVE'] = 'Archive';
xLang['SUMMARY'] = 'Summary';
xLang['TROPAS'] = 'Troops';
xLang['CHECKVERSION'] = 'Update TBeyond';
xLang['ACTUALIZAR'] = 'Update village information';
xLang['VENTAS'] = 'Saved Offers';
xLang['MAPSCAN']  = 'Scan the Map';
xLang['BIGICONS'] = 'Show extended icons';
xLang['NOTEBLOCK'] = 'Show note block';
xLang['SAVE'] = 'Save';
xLang['RPDEFACT'] = 'Rally point default action';
xLang['ATTACKTYPE2'] = 'Reinforcement';
xLang['ATTACKTYPE3'] = 'Attack: Normal';
xLang['ATTACKTYPE4'] = 'Attack: Raid';
xLang['NBSIZE'] = 'Note block size';
xLang['NBSIZEAUTO'] = 'Auto';
xLang['NBSIZENORMAL'] = 'Normal (small)';
xLang['NBSIZEBIG'] = 'Large screen (large)';
xLang['NBHEIGHT'] = 'Note block height';
xLang['NBAUTOEXPANDHEIGHT'] = 'Automatic expand height';
xLang['NBKEEPHEIGHT'] = 'Default height';
xLang['SHOWCENTERNUMBERS'] = 'Show center numbers';
xLang['NPCSAVETIME'] = 'Save: ';
xLang['SHOWCOLORRESLEVELS'] = 'Show resource level colours';
xLang['SHOWCOLORBUILDLEVELS'] = 'Show building level colours';
xLang['CNCOLORNEUTRAL'] = 'Color upgrade available<br>(Default = Empty)';
xLang['CNCOLORMAXLEVEL'] = 'Color max level<br>(Default = Empty)';
xLang['CNCOLORNOUPGRADE'] = 'Color upgrade not possible<br>(Default = Empty)';
xLang['CNCOLORNPCUPGRADE'] = 'Color upgrade via NPC<br>(Default = Empty)';
xLang['TOTALTROOPS'] = 'Total village troops';
xLang['SHOWBOOKMARKS'] = 'Show bookmarks';
xLang['RACECRTV2'] = 'Race';
xLang['SERVERVERSION2'] = "Travian v2.x server";
xLang['SELECTALLTROOPS'] = "Select all troops";
xLang['PARTY'] = "Festivities";
xLang['CPPERDAY'] = "CP/day";
xLang['SLOT'] = "Slot";
xLang['TOTAL'] = "Total";
xLang['NOPALACERESIDENCE'] = "No residence or palace in this village or village center not opened yet !";
xLang['SELECTSCOUT'] = "Select scout";
xLang['SELECTFAKE'] = "Select fake";
xLang['NOSCOUT2FAKE'] = "It's impossible to use scouts for a fake attack !";
xLang['NOTROOP2FAKE'] = "There aren't troops for a fake attack!";
xLang['NOTROOP2SCOUT'] = "There aren't troops to scout !";
xLang['NOTROOPS'] = "There aren't troops in the village !";
xLang['ALL'] = "All";
xLang['COLORHELP'] = "In color fields you may enter:<br>- <b>green</b> or <b>red</b> or  <b>orange</b>, etc.<br>- the HEX color code like <b>#004523</b><br>- leave empty for the default color";
xLang['SHOWORIGREPORT'] = "Show original report (for posting)";
xLang['SHOWCELLTYPEINFO'] = "Show cell type/oasis info<br>while mousing over the map";
xLang['WARSIM'] = "Combat simulator link to use:<br>(menu left)";
xLang['WARSIMOPTION1'] = "Internal (provided by the game)";
xLang['WARSIMOPTION2'] = "External (provided by kirilloid.ru)";
xLang['WSANALYSER'] = "World Analyser to use";
xLang['SHOWSTATLINKS'] = "Show analyser statistic links";
xLang['NONEWVER'] = "You have the latest version available";
xLang['BVER'] = "You may have a beta version";
xLang['NVERAV'] = "A new version of the script is available";
xLang['UPDATESCRIPT'] = "Update script now ?";
xLang['CHECKUPDATE'] = "Checking for script update.<br>Please wait...";
xLang['CROPFINDER'] = "Crop finder";
xLang['AVPOPPERVIL'] = "Average population per village";
xLang['AVPOPPERPLAYER'] = "Average population per player";
xLang['SHOWRESUPGRADETABLE'] = "Show resource fields upgrade table";
xLang['SHOWBUPGTABLE'] = "Show buildings upgrade table";
xLang['CONSOLELOGLEVEL'] = "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING<br>(Default = 1)";
xLang['MARKETPRELOAD'] = "Number of offer pages to preload<br>while on the 'Market => Buy' page<br>(Default = 1)";
xLang['CAPITAL'] = 'Name of your capital<br><b>Visit your Profile for an update</b>';
xLang['CAPITALXY'] = 'Coordinates of your capital<br><b>Visit your Profile for an update</b>';
xLang['MAX'] = 'Max';
//version 3.0.7
xLang['TOTALTROOPSTRAINING'] = 'Total troops training';
//version 3.0.9
xLang['SHOWDISTTIMES'] = 'Show distances & times';
//version 3.1.3
xLang['TBSETUPLINK'] = TB3O.shN + ' Setup';
xLang['UPDATEALLVILLAGES'] = 'Update all villages.  USE WITH MAXIMUM CARE AS THIS CAN LEAD TO A BANNED ACCOUNT !';
//version 3.1.4
xLang['SHOWMENUSECTION3'] = "Show additional links in left menu<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
//version 3.1.7
xLang['LARGEMAP'] = 'Large map';
//version 3.1.9
xLang['USETHEMPR'] = 'Use them (proportional)';
xLang['USETHEMEQ'] = 'Use them (equal)';
//version 3.2
xLang['TOWNHALL'] = 'Town Hall';
xLang['GAMESERVERTYPE'] = 'Game server';
xLang['ACCINFO'] = 'Account Information';
xLang['NOTEBLOCKOPTIONS'] = 'Noteblock';
xLang['MENULEFT'] = 'Menu on the left side';
xLang['STATISTICS'] = 'Statistics';
xLang['RESOURCEFIELDS'] = 'Resource fields';
xLang['VILLAGECENTER'] = 'Village center';
xLang['MAPOPTIONS'] = 'Map options';
xLang['COLOROPTIONS'] = 'Color options';
xLang['DEBUGOPTIONS'] = 'Debug options';
xLang['SHOWBIGICONMARKET'] = 'Market';
xLang['SHOWBIGICONMILITARY'] = 'Rally point/Barracks/Workshop/Stable';
xLang['SHOWBIGICONMILITARY2'] = "Town hall/Hero's mansion/Armoury/Blacksmith";
xLang['HEROSMANSION'] = "Hero's mansion";
xLang['BLACKSMITH'] = 'Blacksmith';
xLang['ARMOURY'] = 'Armoury';
//3.2.1
xLang['NOW'] = 'Now';
xLang['CLOSE'] = 'Close';
//3.3
xLang['USE'] = 'Use';
xLang['USETHEM1H'] = 'Use them (1 hour production)';
xLang['OVERVIEW'] = 'Overview';
xLang['FORUM'] = 'Forum';
xLang['ATTACKS'] = 'Attacks';
xLang['NEWS'] = 'News';
//3.3.1
xLang['ADDCRTPAGE'] = 'Add current';
xLang['SCRIPTPRESURL'] = 'TBeyond page';
//3.3.3
xLang['NOOFSCOUTS'] = 'No. of scouts for the<br>"Select scout" function';
//3.3.4.2
xLang['SPACER'] = 'Spacer';
//3.3.5
xLang['SHOWTROOPINFOTOOLTIPS'] = 'Show troops information in tooltips';
//3.3.6
xLang['MESREPOPTIONS'] = 'Messages & Reports';
xLang['MESREPPRELOAD'] = 'Number of message/report pages to preload<br>(Default = 1)';
xLang['ATTABLES'] = 'Troop tables';
//3.3.7
xLang['MTWASTED'] = 'Wasted';
xLang['MTEXCEED'] = 'Exceeding';
xLang['MTCURRENT'] = 'Current load';
xLang['ALLIANCEFORUMLINK'] = 'Link to external forum<br>(Leave empty for internal forum)';
xLang['LOCKBOOKMARKS'] = 'Lock bookmarks<br>(Hide delete, move up, move down icons)';
xLang['MTCLEARALL'] = 'Clear all';
//3.3.7.2
xLang['UNLOCKBOOKMARKS'] = 'Unlock bookmarks<br>(Show delete, move up, move down icons)';
//3.3.7.3
xLang['CLICKSORT'] = 'Click to sort';
xLang['MIN'] = 'Min';
//3.3.8
xLang['SAVEGLOBAL'] = 'Shared among villages';
//3.3.8.1
xLang['VILLAGELIST'] = 'Village List';
xLang['SHOWINOUTICONS'] = "Show 'dorf1.php' and 'dorf2.php' links";
//3.3.8.3
xLang['UPDATEPOP'] = 'Update population';
//3.4
xLang['SHOWRPRINFOTOOLTIPS'] = 'Show distance and times to villages in tooltips<br>(Rally Point & Reports)';
//3.4.5
xLang['EDIT'] = 'Edit';
//3.5.4.1
xLang['NPCOPTIONS'] = 'NPC Assistant options';
xLang['NPCASSISTANT'] = 'Show NPC Assistant calculations/links';
//3.5.4.7
xLang['SHOWMAPTABLE'] = 'Show table of players/villages/occupied oasis';
//3.5.4.7.2
xLang['NEWVILLAGEAV'] = 'Date/Time';
xLang['TIMEUNTIL'] = 'Time to wait';
//3.5.5
xLang['SHOWREPDELTABLE'] = 'Show "Delete all" table on the Reports page';
xLang['SHOWIGMLINKFORME'] = 'Show the "Send IGM" icon for me, too';
xLang['CENTERMAP'] = 'Center map on this village';
xLang['SHOWCENTERMAPICON'] = 'Show "Center map on this village" icon';
//3.5.9.2
xLang['SENDTROOPS'] = 'Send troops';
//3.5.9.3
xLang['SHOWBRSTATDETAILS'] = 'Show details in Report Statistics';
//3.5.9.8
xLang['SHOWBIGICONMISC'] = "Palace/Residence/Academy/Treasury";
xLang['PALACE'] = "Palace";
xLang['RESIDENCE'] = "Residence";
xLang['ACADEMY'] = "Academy";
xLang['TREASURY'] = "Treasury";
//3.7
xLang['SHOWBBLINK'] = "Show blinking levels for buildings being upgraded";
//3.7.4
xLang['SHOWSENDTROOPSRESOURCES'] = "Show 'Send troops/Send resources' icons in village list";
//3.7.8.1
xLang['SHOWCPINUPGTABLES'] = "Show CP/day information in upgrade tables";
xLang['UPGTABLES'] = "Resource fields/buildings upgrade tables";
xLang['SHOWCCINUPGTABLES'] = "Show crop consumption in upgrade tables";
//3.7.9
xLang['SHOWCCINVL'] = "Show effective crop production in village list";
xLang['RESBARTABLETITLE'] = "Resource Bar";
//3.7.9.2
xLang['SHOWRESBARTABLE'] = "Show 'Resource Bar' table";
xLang['FLOATRESBARTABLE'] = "Show 'Resource Bar' table as floating window";
xLang['FLOATBOOKMARKS'] = "Show 'User Bookmarks' as floating window";
xLang['FLOATNOTEBLOCK'] = "Show 'NoteBlock' as floating window";
//3.7.9.3
xLang['SHOWPOPINVL'] = "Show population in village list";
xLang['MAPANALYSER'] = 'Map Analyser to use';
xLang['SHOWTRAVMAPUSERLINKS'] = 'Show links to map for users';
xLang['SHOWTRAVMAPALLYLINKS'] = 'Show links to map for alliances';
//3.8.2
xLang['SHOWTB3BATTLEREPORT'] = 'Show TB3 enhanced Battle Reports';
//3.8.2.3
xLang['SHOWVL2TABLE'] = 'Show additional (2 columns) village list as floating window';
//3.8.2.7
xLang['SHOWMESOPENLINKS'] = 'Show links to open messages/reports in a pop-up';
//3.8.5.1
xLang['SHOWSORTEDBIUPGT'] = 'Sort buildings by name in upgrade table';
//3.8.6.6
xLang['SHOWBIPATTINVL'] = 'Show information about buildings in progress and troop movements<br>in village list';
xLang['SHOWSEARCHBAR'] = "Show 'Search Bar'";
xLang['ID_SEARCH'] = "Search";
xLang['FORCET31TCAP'] = 'Force T3.1 Legionnaire & Phalanx capacity calculation<br>(for mixed T3.1 & T3.5 servers)';
//3.8.7.1
xLang['FLOATSEARCHBAR'] = "Show 'Search Bar' as floating window";
//3.8.7.5
xLang['SHOWUNTILTHENRESIDUE'] = "Show 'Until then/Residue' calculation in upgrade/training tables";
xLang['RESIDUE'] = 'The residue if you build it ';
xLang['RESOURCES'] = 'Resources';
//3.8.7.6.3
xLang['ACCINFOHELP'] = "Open your Profile for automatic capital/coordinates detection<br>Build the barracks for automatic race detection and then open the village center";
//3.8.7.7
xLang['SHOWADDINFOMARR'] = "Show additional information for every merchant arrival";
//3.8.8.2
xLang['REMOVEADBANNER'] = 'Remove ad banners';

function switchLanguage() {
switch (TB3O.language) {
case "ae":
//by Dream1 & Me_TheKing & kaser15 & aatkco
xLang['ALLIANCE'] = 'التحالف';
xLang['SIM'] = 'محاكي المعركة';
xLang['AREYOUSURE'] = 'هل أنت متأكد؟';
xLang['LOSS'] = 'الخسائر';
xLang['PROFIT'] = 'الفائدة';
xLang['EXTAV'] = 'متاح';
xLang['PLAYER'] = 'اللاعب';
xLang['VILLAGE'] = 'اسم القرية';
xLang['POPULATION'] = 'السكان';
xLang['COORDS'] = 'الإحداثيات';
xLang['MAPTBACTS'] = 'الأمر';
xLang['SAVED'] = 'تم حفظ الاعدادات';
xLang['YOUNEED'] = 'تحتاج';
xLang['TODAY'] = 'اليوم';
xLang['TOMORROW'] = 'غداً';
xLang['PAS_MANYANA'] = 'بعد غداً';
xLang['MARKET'] = 'السوق';
xLang['BARRACKS'] = 'الثكنة';
xLang['RALLYPOINT'] = 'نقطة التجمع';
xLang['STABLE'] = 'الإسطبل';
xLang['WORKSHOP'] = 'المصانع الحربية';
xLang['SENDRES'] = 'إرسال الموارد';
xLang['COMPRAR'] = 'شراء';
xLang['SELL'] = 'بيع';
xLang['SENDIGM'] = 'إرسال رسالة';
xLang['LISTO'] = 'يتاح';
xLang['ON'] = 'على';
xLang['AT'] = 'في';
xLang['EFICIENCIA'] = 'الفعالية';
xLang['NEVER'] = 'أبدا';
xLang['ALDEAS'] = 'القرى';
xLang['TIEMPO'] = 'الوقت';
xLang['OFREZCO'] = 'العرض';
xLang['BUSCO'] = 'البحث';
xLang['TIPO'] = 'النوع';
xLang['DISPONIBLE'] = 'فقط المتاح';
xLang['CUALQUIERA'] = 'أي';
xLang['YES'] = 'نعم';
xLang['NO'] = 'لا';
xLang['LOGIN'] = 'تسجيل الدخول';
xLang['MARCADORES'] = 'الروابط';
xLang['ANYADIR'] = 'إضافة رابط +نص';
xLang['ENLACE'] = 'ضع الرابط هنا';
xLang['TEXTO'] = 'ضع نص الرابط هنا';
xLang['ELIMINAR'] = 'حذف';
xLang['MAPA'] = 'الخريطة';
xLang['MAXTIME'] = 'الحد الأقصى للوقت';
xLang['ARCHIVE'] = 'الأرشيف';
xLang['SUMMARY'] = 'الموجز';
xLang['TROPAS'] = 'القوات';
xLang['CHECKVERSION'] = 'تحديث السكربت';
xLang['ACTUALIZAR'] = 'تحديث معلومات القرية';
xLang['VENTAS'] = 'حفظ العروض';
xLang['MAPSCAN'] = 'فحص الخريطة';
xLang['BIGICONS'] = 'إظهار الإيقونات المختصرة';
xLang['NOTEBLOCK'] = 'أظهار دفتر الملاحظات';
xLang['FLOATNOTEBLOCK'] = ' أظهار النافذة العائمة لدفتر الملاحظات';
xLang['SAVE'] = 'حفظ';
xLang['RPDEFACT'] = 'الاختصار الافتراضي في نقطة التجمع';
xLang['ATTACKTYPE2'] = 'مساندة';
xLang['ATTACKTYPE3'] = 'هجوم: كامل';
xLang['ATTACKTYPE4'] = 'هجوم: للنهب';
xLang['NBSIZE'] = 'مقاس دفتر الملاحظات';
xLang['NBSIZEAUTO'] = 'تلقائي';
xLang['NBSIZENORMAL'] = 'عادي (صغيره)';
xLang['NBSIZEBIG'] = 'ملء الشاشة (كبيرة)';
xLang['NBHEIGHT'] = 'ارتفاع دفتر الملاحظات';
xLang['NBAUTOEXPANDHEIGHT'] = 'توسيع تلقائي للارتفاع';
xLang['NBKEEPHEIGHT'] = 'ارتفاع افتراضي';
xLang['SHOWCENTERNUMBERS'] = 'أظهار الأرقام على المباني';
xLang['NPCSAVETIME'] = 'حفظ: ';
xLang['SHOWCOLORRESLEVELS'] = 'اظهار الألوان على مستويات الموارد';
xLang['SHOWRESBARTABLE'] = 'اظهار طاوة الموارد';
xLang['FLOATRESBARTABLE'] = 'إضهار طاولة الموارد في صفحة عائمة';
xLang['SHOWCOLORBUILDLEVELS'] = 'أظهار الألوان على مستويات المباني';
xLang['SHOWBBLINK'] = "تفعيل خاصية الوميض عند تطوير المباني ";
xLang['CNCOLORNEUTRAL'] = 'لون التطوير متاح<br>المربع فارغ = افتراضي)';
xLang['CNCOLORMAXLEVEL'] = 'لون الحد الأقصى<br>(المربع فارغ = افتراضي)';
xLang['CNCOLORNOUPGRADE'] = 'لون التطوير لا يمكن<br>(المربع فارغ = افتراضي)';
xLang['CNCOLORNPCUPGRADE'] = 'لون التطوير عن طريق NPC<br>(المربع فارغ = افتراضي)';
xLang['DEBUGOPTIONS'] = 'خيارات التصحيح';
xLang['CONSOLELOGLEVEL'] = "مستوى الدخول فقط لتصحيح الأخطاء للمبرمجين<br>(الافتراضي = 0 أو أتركه فارغ)";
xLang['TOTALTROOPS'] = 'مجموع القوات في القرية';
xLang['SHOWBOOKMARKS'] = 'أظهار العناوين';
xLang['FLOATBOOKMARKS'] = "إضهار العناوين بصفحة عائمة ";
xLang['RACECRTV2'] = 'القبيلة';
xLang['SERVERVERSION2'] = "Travian v2.x server";
xLang['SELECTALLTROOPS'] = "اختيار كل القوات";
xLang['PARTY'] = "الاحتفالات";
xLang['CPPERDAY'] = "نقاط حضارية يومياً";
xLang['SLOT'] = "فتح قرية";
xLang['TOTAL'] = "المجموع";
xLang['NOPALACERESIDENCE'] = "لايوجد قصر أو سكن في هذه القرية أو لم تفتح مركز القرية بعد !";
xLang['SELECTSCOUT'] = "اختيار الكشافة";
xLang['SELECTFAKE'] = "اختيار هجوم وهمي";
xLang['NOSCOUT2FAKE'] = "مستحيل اختيار الكشافة في الهجوم الوهمي !";
xLang['NOTROOP2FAKE'] = "لاتوجد قوات للهجوم الوهمي !";
xLang['NOTROOP2SCOUT'] = "لاتوجد قوات كشافة !";
xLang['NOTROOPS'] = "لا توجد قوات في القرية !";
xLang['ALL'] = "الكل";
xLang['COLORHELP'] = "يمكنك إدخال الالوان كالاتي:<br>- green أو red أو orange, الخ.<br>- رمز اللون مثل #004523<br>- تركه فارغ لالون الافتراضي";
xLang['SHOWORIGREPORT'] = "أظهار النسخة الأصلية للتقرير";
xLang['SHOWCELLTYPEINFO'] = "عرض نوع القرية<br>عند المرور بالماوس على الخريطة";
xLang['WARSIM'] = "تغيير نوع محاكي المعركة:<br>(في القائمة اليسرى)";
xLang['WARSIMOPTION1'] = "داخلي (محاكي المعركة العادي)";
xLang['WARSIMOPTION2'] = "خارجي (محاكي المعركة المطور kirilloid.ru)";
xLang['WSANALYSER'] = "أختيار نوع محلل عالم ترافيان";
xLang['SHOWSTATLINKS'] = "أظهار رابط محلل الاحصائيات";
xLang['MAPANALYSER'] = "تشغيل محلل انواع القرى بالخريطة";
xLang['SHOWTRAVMAPUSERLINKS'] = "أظهار روابط الخريطة للمستخدمين";
xLang['SHOWTRAVMAPALLYLINKS'] = "أظهار روابط الخريطة للتحالفات";
xLang['UPGTABLES'] = "الموارد الميادين / المباني تحديث الجداول";
xLang['SHOWCPINUPGTABLES'] = "تحديث معلومات الجدول -التاريخ\اليوم";
xLang['SHOWCCINUPGTABLES'] = "إضهار رفع مستوى استهلاك المحاصيل في الجداول";
xLang['NONEWVER'] = "لديك أحدث نسخة متاحة";
xLang['BVER'] = "قد يكون لديك نسخة تجريبية";
xLang['NVERAV'] = "يوجد نسخة جديده من السكربت متاحة";
xLang['UPDATESCRIPT'] = "هل تريد تحديث السكربت الآن؟";
xLang['CHECKUPDATE'] = "التحقق من وجود تحديث للسكربت. الرجاء الانتظار...";
xLang['CROPFINDER'] = "بحث عن القرى القمحيه";
xLang['AVPOPPERVIL'] = "متوسط عدد السكان للقريه الواحده ";
xLang['AVPOPPERPLAYER'] = "متوسط عدد السكان للاعب الواحد";
xLang['SHOWRESUPGRADETABLE'] = "اظهار جدول رفع مستوى الموارد";
xLang['SHOWBUPGTABLE'] = "اظهار جدول رفع مستوى المباني";
xLang['SHOWSORTEDBIUPGT'] = 'فرز المباني بالأسم في جدول الترقية';
xLang['CONSOLELOGLEVEL'] = "مستوى الدخول فقط لتصحيح الأخطاء للمبرمجين<br>(الافتراضي = 0 أو أتركه فارغ)";
xLang['MARKETPRELOAD'] = "عدد صفحات العروض<br>في 'السوق => شراء'<br>(الوضع الافتراضي = 1 أو فارغ ؛ الحد الأقصى = 5)";
xLang['CAPITAL'] = 'أسم العاصمه<br>لايمكنك التعديل, فقط قم بزيارة بطاقة العضوية';
xLang['CAPITALXY'] = 'أحداثيات العاصمه<br>لايمكنك التعديل, فقط قم بزيارة بطاقة العضوية';
xLang['MAX'] = 'الحد الأقصى';
xLang['TOTALTROOPSTRAINING'] = 'أجمالي تدريب القوات';
xLang['SHOWDISTTIMES'] = 'إظهار المسافات & الوقت';
xLang['TBSETUPLINK'] = 'إعدادات ترافيان بويند';
xLang['UPDATEALLVILLAGES'] = 'تحديث جميع القرى. لاتستخدمها بكثره فقد يؤدي ذالك الى حظر حسابك !';
xLang['SHOWMENUSECTION3'] = "إظهار الروابط الاضافية في القائمة اليمنى<br>(Traviantoolbox, World Analyser, Travilog, Map, وغيره.)";
xLang['LARGEMAP'] = 'خريطة كبيرة';
xLang['USETHEMPR'] = 'الإستخدام (النسبي)';
xLang['USETHEMEQ'] = 'الإستخدام (المتساوي)';
xLang['TOWNHALL'] = 'البلدية';
xLang['GAMESERVERTYPE'] = 'سيرفر اللعبة';
xLang['ACCINFO'] = 'معلومات الحساب';
xLang['NOTEBLOCKOPTIONS'] = 'دفتر الملاحظات';
xLang['MENULEFT'] = 'القائمه على الجانب الأيمن';
xLang['STATISTICS'] = 'أحصائيات';
xLang['RESOURCEFIELDS'] = 'حقول الموارد';
xLang['VILLAGECENTER'] = 'مركز القرية';
xLang['MAPOPTIONS'] = 'خيارات الخريطة';
xLang['COLOROPTIONS'] = 'خيارات الألوان';
xLang['DEBUGOPTIONS'] = 'خيارات التصحيح';
xLang['SHOWBIGICONMARKET'] = 'السوق';
xLang['SHOWBIGICONMILITARY'] = 'نقطة التجمع/الثكنة/المصانع الحربية/الإسطبل';
xLang['SHOWBIGICONMILITARY2'] = "البلدية/قصر الأبطال/مستودع الاسلحة/الحداد";
xLang['HEROSMANSION'] = "قصر الأبطال";
xLang['BLACKSMITH'] = 'الحداد';
xLang['ARMOURY'] = 'مستودع الاسلحة';
xLang['NOW'] = 'الآن';
xLang['CLOSE'] = 'إغلاق';
xLang['USE'] = 'استخدام';
xLang['USETHEM1H'] = 'الإستخدام (1 ساعة الإنتاج)';
xLang['OVERVIEW'] = 'العرض';
xLang['FORUM'] = 'المنتدى';
xLang['ATTACKS'] = 'الهجمات';
xLang['NEWS'] = 'الاخبار';
xLang['ADDCRTPAGE'] = 'إضافة نص للصفحة الحاليه';
xLang['SCRIPTPRESURL'] = 'TBeyond صفحة سكربت';
xLang['NOOFSCOUTS'] = 'عدد الكشافة في<br>وظيفة "اختيار الكشافة"';
xLang['SPACER'] = 'إضافة فاصل';
xLang['SHOWTROOPINFOTOOLTIPS'] = 'إظهار معلومات القوات';
xLang['MESREPOPTIONS'] = 'رسائل & تقارير';
xLang['MESREPPRELOAD'] = 'عدد الصفحات في الرسائل/التقارير<br>(الوضع الافتراضي = 1 أو فارغ ؛ الحد الأقصى = 5)';
xLang['ATTABLES'] = 'جدول القوات';
xLang['MTWASTED'] = 'الباقي';
xLang['MTEXCEED'] = 'الزائد';
xLang['MTCURRENT'] = "الحموله الحاليه";
xLang['ALLIANCEFORUMLINK'] = "رابط خارجي للمنتدى<br>(المربع فارغ = اذا كان المنتدى داخلي)";
xLang['MTCLEARALL'] = "مسح الكل";
xLang['SAVEGLOBAL'] = "عرض مشترك بين القرى";
xLang['VILLAGELIST'] = "قائمة القرية";
xLang['SHOWINOUTICONS'] = "أظهار روابط 'dorf1.php' و 'dorf2.php'";
xLang['UPDATEPOP'] = "تحديث السكان";
xLang['LOCKBOOKMARKS'] = "إغلاق لوحة الروابط<br>إخفاء أيقونة ( حذف، فوق، تحت";
xLang['UNLOCKBOOKMARKS'] = "تحرير لوحة الروابط<br>إظهار أيقونة ( حذف، فوق، تحت)";
xLang['CLICKSORT'] = "إضغط لترتيب";
xLang['MIN'] = "الأدنى";
xLang['SHOWRPRINFOTOOLTIPS'] = "إظهار المسافة و الوقت للقرى كتلميحات<br>(نقطة التجمع والتقارير)";
xLang['EDIT'] = "تحرير";
xLang['NPCOPTIONS'] = "خيارات المساعدة NPC";
xLang['NPCASSISTANT'] = "إظهار الحسابات/الروابط للمساعد NPC";
xLang['SHOWMAPTABLE'] = "إظهار جدول اللاعبين/القرى/الواحات المحتلة";
xLang['NEWVILLAGEAV'] = "التاريخ/الوقت";
xLang['TIMEUNTIL'] = "الوقت اللازم للأنتظار";
xLang['SHOWREPDELTABLE'] = 'إظهار جدول "حذف الجميع" على صفحة التقارير';
xLang['SHOWIGMLINKFORME'] = 'إظهارأيقونة "أرسل رسالة" لي, أيضاً';
xLang['SHOWTB3BATTLEREPORT'] = "عرض تي بي 3 في تقارير المعركة";
xLang['CENTERMAP'] = "توسيط هذه القرية على الخريطة";
xLang['SHOWCENTERMAPICON'] = ' إظهار أيقونة "توسيط هذه القرية على الخريطة';
xLang['SHOWSENDTROOPSRESOURCES'] = "إضهار 'ارسال قوات / أرسل الموارد 'الرموز في قائمة القرية";
xLang['SHOWCCINVL'] = "إضهار 'عدد انتاج القمح / في قائمة القرية";
xLang['RESBARTABLETITLE'] = "شريط الموارد";
xLang['SHOWPOPINVL'] = "إضهار 'عدد سكان القرية / في قائمة القرية";
xLang['SHOWVL2TABLE'] = " إضهار القائمة العائمة";
xLang['SENDTROOPS'] = 'إرسال القوات';
xLang['SHOWBRSTATDETAILS'] = 'إظهار التفاصيل في تقرير الإحصاءات';
xLang['SHOWBIGICONMISC'] = "القصر/السكن/الأكاديمية/الخزنة";
xLang['PALACE'] = "القصر";
xLang['RESIDENCE'] = "السكن";
xLang['ACADEMY'] = "الأكاديمية";
xLang['TREASURY'] = "الخزنة";
xLang['SHOWMESOPENLINKS'] = "إظهار وصلات لفتح الرسائل في نافذة منبثقة";
xLang['SHOWSEARCHBAR'] = "عرض شريط البحث";
xLang['FLOATSEARCHBAR'] = "عرض شريط البحث فى نافذة عائمة" ;
xLang['ID_SEARCH'] = "بحث";
xLang['RESIDUE'] = "ويتبقى من الموارد بعد بنائها";
xLang['RESOURCES'] = "الموارد";
xLang['SHOWADDINFOMARR'] = "عرض معلومات إضافية عن وصول كل تاجر";
xLang['SHOWBIPATTINVL'] = 'عرض معلومات عن تقدم تطوير المبانى وتحركات القوات فى قائمة القرى';
xLang['SHOWUNTILTHENRESIDUE'] = 'عرض الموارد المتبقية بعد البناء<br>والموارد فى هذا الوقت فى قوائم الترقية والتدريب';
break;
}
}

var lumberCost = [
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
];

var clayCost=[
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
];

var ironCost=[
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
];

var cropCost=[
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
];

var warehouseCost=[
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
];

var granaryCost=[
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
];

var grainMillCost=[
[0,0,0,0,0,0],
[500,440,380,1240,1,3],
[900,790,685,2230,1,5],
[1620,1425,1230,4020,2,7],
[2915,2565,2215,7230,2,9],
[5250,4620,3990,13015,2,11]
];

var brickyardCost=[
[0,0,0,0,0,0],
[440,480,320,50,1,3],
[790,865,575,90,1,5],
[1425,1555,1035,160,2,7],
[2565,2800,1865,290,2,9],
[4620,5040,3360,525,2,11]
];

var sawmillCost=[
[0,0,0,0,0,0],
[520,380,290,90,1,4],
[935,685,520,160,1,6],
[1685,1230,940,290,2,8],
[3035,2215,1690,525,2,10],
[5460,3990,3045,945,2,12]
];

var ironFoundryCost=[
[0,0,0,0,0,0],
[200,450,510,120,1,6],
[360,810,920,215,1,9],
[650,1460,1650,390,2,12],
[1165,2625,2975,700,2,15],
[2100,4725,5355,1260,2,18]
];

var bakeryCost=[
[0,0,0,0,0,0],
[1200,1480,870,1600,1,4],
[2160,2665,1565,2880,1,6],
[3890,4795,2820,5185,2,8],
[7000,8630,5075,9330,2,10],
[12595,15535,9135,16795,2,12]
];

var greatWarehouseCost=[
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
];

var greatGranaryCost=[
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
];

var academyCost=[
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
];

var armouryCost=[
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
];

var blacksmithCost=[
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
];

var barracksCost=[
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
];

var stableCost=[
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
];

var workshopCost=[
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
];

var rallyPointCost=[
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
];

var tournamentSquareCost=[
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
];

var greatBarrackCost=[
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
];

var greatStableCost=[
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
];

var citywallCost=[
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
];

var palisadeCost=[
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
];

var earthwallCost=[
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
];

var herosMansionCost=[
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
];

var trapperCost=[
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
];

var mainBuildingCost=[
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
];

var marketplaceCost=[
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
];

var embassyCost=[
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
];

var crannyCost=[
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
];

var townhallCost=[
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
];

var residenceCost=[
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
];

var palaceCost=[
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
];

var treasuryCost=[
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
];

var tradeOfficeCost=[
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
];

var breweryCost=[
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
];

var horsedtCost=[
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
];

var stonemasonCost=[
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
];

var WWCost=[
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
];

var bCost = new Array();
bCost[1] = lumberCost;
bCost[2] = clayCost;
bCost[3] = ironCost;
bCost[4] = cropCost;
bCost[5] = sawmillCost;
bCost[6] = brickyardCost;
bCost[7] = ironFoundryCost;
bCost[8] = grainMillCost;
bCost[9] = bakeryCost;
bCost[10] = warehouseCost;
bCost[11] = granaryCost;
bCost[12] = blacksmithCost;
bCost[13] = armouryCost;
bCost[14] = tournamentSquareCost;
bCost[15] = mainBuildingCost;
bCost[16] = rallyPointCost;
bCost[17] = marketplaceCost;
bCost[18] = embassyCost;
bCost[19] = barracksCost;
bCost[20] = stableCost;
bCost[21] = workshopCost;
bCost[22] = academyCost;
bCost[23] = crannyCost;
bCost[24] = townhallCost;
bCost[25] = residenceCost;
bCost[26] = palaceCost;
bCost[27] = treasuryCost;
bCost[28] = tradeOfficeCost;
bCost[29] = greatBarrackCost;
bCost[30] = greatStableCost;
bCost[31] = citywallCost;
bCost[32] = earthwallCost;
bCost[33] = palisadeCost;
bCost[34] = stonemasonCost;
bCost[35] = breweryCost;
bCost[36] = trapperCost;
bCost[37] = herosMansionCost;
bCost[38] = greatWarehouseCost;
bCost[39] = greatGranaryCost;
bCost[40] = WWCost;
bCost[41] = horsedtCost;

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
//Natarian - by fr3nchlover
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

//Speed for the market Merchants
var mts = {'Romans': 16, 'Gauls': 24, 'Teutons': 12};

var imgPr = 'data:image/gif;base64,';
var imgPrPNG = 'data:image/png;base64,';
// base64 coded images included in script
var image = {
"igm":			imgPr + 'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAICAYAAAAvOAWIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QsKFws6qttDxQAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAkUlEQVQY05XQTUpDQRAE4K8yz9BuPEduEH8C2Tw8haeT3CQbPZEiIeNmhLdIAvamqerqaqqDdxxwcr0mvAWv+MYHfi4I13hErXCuqmOSp9batFS11qYk26o64gzzmCXJPsl64DvskYHn1cKo995PvfdnPOBl5OjLa/PY3qEGtxm9Bh/MfwG/8Hkj4Bb3+c/rfgHKwRzhskmMfQAAAABJRU5ErkJggg==',
"igmopen":		imgPr + 'R0lGODlhCwAPAPcAAEBAQAAm/4CAgP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAACwAPAAAIRwAHABhIkOAAgQcTHgSwcECAhw8RSlQokSHEiAwnKsxo8SLCgRQXAhAgwKFHkiVLKkypUuWAljBRHiT5kiJLlysFjETJU2dAADs=',
"underline":	imgPr + 'R0lGODlhFwAQAIABAODg4AAAACH5BAEAAAEALAAAAAAXABAAQAIVjI+py+0Po5y02ouz3rxjAIbiSIIFADs=',
"buttonDel":	imgPr + 'R0lGODlhLQAUAPcAAAAAAHHQAJoIBZQ2LZ8xKZw+NqMDAa0NCaEVDqkfGbwFArsKB7oPCrIVC7IUDbgSDrcYEqslGq8iHb8kFrgkHKYvJKc1LLU+Lb4/MLBFM5hKQZVWT55gWaRMQqpZSaNjWrpgUqxyZqlyaqV9d8IHBcwEA80GBM8KBcMVDc8bD8YbEdQOD9MSCdURD9YREdUSEdYYEtQeFNkWE9oYEtgeFdkfFtwcFMElGtAjFd0gFt4jF90mFd4rHcIyIOAjF+ElGOEnGeIoGeIpGuIrG+AtG+MvG+QpGuQrGuUsGuYvGuYuG+MwHOcwGuc0HugxHOgyHek1Huo2H+w5H+Q1Iuk7I+w4IO46Ie89IfA/IshHKc9LK8JJOsVNO8tONsxIMdJCKeBHJelFJO1BI+9FJO5JMfBAIvFBI/FCI/NEJPFFJvRHJfdNJ/hNKPpSKfpTK8JcTclcRsxcSM1pVsN9dtB+cK6Jg7aQiM+ZktSViNWjmcOrp8S2s8i4tNanodqxqNqxqtqxrOC+ucrKyszMzM/Pz9PFw9LS0tnS0NjY2Nra2tzc3OTKxebQyujSzuPd2+Pe3enV0ODg4OLi4uTk5OXm5Obm5ufn5+ro5+jo6Onp6evr6+zs7O7t7e7v7e/v7/Hk4fHx8fPy8fPz8/T09PX19fb29vf29/n08vj4+Pn5+fr6+vz8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAtABQAAAj/AP8J/BegoMGDCBMqXBhg4MCCriJKnEixosWLrgo+xMhx4h86eBh1jMiqIcGRrvzEkZPn1MQ+KKi40YLSVMMArXLq3LnTC5k0Y+B8yhmIAQs2bbLwXNqKVSlOBZuymkq16tQLU7CYOdMFUiMIJ9CsAWPHqtmppCwVZLWqrdu3bvlU2GHlCpYvFEpIURMmhCm4gNuOmlSwrarDiBMjPlQgRZQqVpgkKSPGAyfFmBGDklRQVSpUoEOLFn2JQ4MlUB5byfBotGvRniIV/Gyqtu3buE0NEEDEyZMmIHILtx27IKpSpJIrX858joEDQo4gUVLkDfPryzfJDmBqlKjv4MOH2r+jgEQOHzhUBDEyZIv49+A1KSpIShSo+/jz4we0oMQMGzF8sIEDOvwABAb6JXhfJokUNAoonkQo4YQRLnKDCS3IAEMHnIQyAgI05DABhSRGiAkiBYHSySYstugii1zw0IILL1jgSIt7aBCBCC/2uIkmkxhSECeaZGLkkUga2UMNK6wgQSFJRimlkZMgIiRBmFRCSSVcdullHQQ8kIAeXnaJZJldUhJJIoSYFEAkisQp55x01mnnnVYOMohJBAVgCCF6Biqonn8OauihegoiiEYO9cnQo5Ai5FBAADs=',
"globe":		imgPr + 'R0lGODlhDAANAPcAAAAAAAVrEwB0CgB4DQB7DQByHwplPQF+MRZlNxJwOQdcRAZYagRkTwFuTRhiUAFjditgawM/pQBHmxVHlx9UgwFApwNGqABGrQJJrwBQtQBUuwBevBJCpxREqRdFqxdWsgFrpQB1tAF4uitcgShOtCJXtjdXpDddvjhXuDtdvTxltQBcwgBrzQFuzQ1oxxxsxRV41EFdiUdemkRerVxsk1lsmkZxvgGCNiSoLDSxLgGGQQGETAGJWQyTcB6beD6NdSWkfky/LEK3RljFNWfNRWzPQ2LKU2/QVHTTan7YdQGAjQiHjw2Xgx6KnQKIoQiEohyilTazjQGJyQKD3AaS2AGG7QmY5BKe+xehxzSd6DCw+meBkHqJmHKQmHaIqnmGo06Qz0mj3kq+/nam2nbNrGfL13rU1JyisqOotKistqW6va6yuYir1pWnwY3YkIjcq4LStZDhkZPhpJ3mpJzlrqTpoqTjtpvV0p3K66rL0qHZ0KLH5qfjzabow7XwxQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAMAA0AAAifAP8J/McHDpk7AwfaeSMnyRAgWfAMdINkjh86RqBMaZLnnx4hReLU6VMGi5MDP/6F8RGEyBEzYqzwIJBADYwnOHJE0XJFyo0CBrq4aLGkBxMqVZQMCOBgy4sVLETo2BECBAMEELiAwaBhQwMBDzJYGBEDzZ4PFS4sUCAhAgcTNASOKdGBwgQPJFDIWDOQjQ0VJ1LMqJEmocA2Xr6cSRgQADs=',
"usethempr":	imgPrPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAntJREFUSEuVlU1ME1EQx1dOHD169OjRo0eP3rTGLV5Mjdui3lCaQEy01bAtfiDRlIgEwbYkxBAwVVGCgZqI8WsNcjBNlYMJoYRaWNq1ZVtWVv6bvGa7fbv7mOSlzb7Z/29m3szbA5yLtQnR43DZbeGMXztr2eXeYa9VUz/F4zdVN92G/ZO+0MGuWyNjiYm5yvLvnIyluxjxm3z1Yfua+HSa9905xAQ9I0ROTL5YyGvav5obxGn/9ZxUuHClP+AI7RZHn6ys5l2zYQ2kIJe2eu6Pp6jQQOeDc+t5eZNVjNWvXFH/Xu4aCDdAUe+Xs1/W7ERyuZwuSZKezWapLtjDsrOPUmbjdLt4pA4N3x2b0TSNemapVEoXBMEQFEVRDwaDTboej0dHUE52e2Bi0QD6fKFWdJadM8TMZhUnwbiVeGZeUtH9HObMqe2tQGRJyheLxXQsFgPDmGneHz1fLJUVpwwJQFEUnQSAZ7Ty2umo1Zrq9Uc69oCRS3udVHaKEsJYKB8axwzGe25NA58dTdvhBbGbw6Dvd/aQJcBoFPxPp9N6MpmsZ08Lfm1d3vK2i6c4jMT8+++OGZoFkCnEYcjY3J14TvasUDDq113f4FSG5eDJiBBfa0OR0aFpDSXe/KnPIe/vOfpt6VfBCQoxKwDZmLvUmjHRw5Hh6Bpum6uh4XuVbZXarTgvwGjlAhAgLFTAavgI3OhNTDXdp7gA+oeeL1WrNdtLgKXsZh/A4s/eZoyBpxmgndcfP8z8XJH3K271RxmRmS3MHIDX33vs0ej06sLnHwramRW+sVkqfl3MFkfGZ4tNZ8byNW67GD2M2eED0TDL8gbEsw1fBQrkP6+jTExmIuLUAAAAAElFTkSuQmCC',
"usethemeq":	imgPrPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAflJREFUSEtjZCAAwpPbHUBK/jExgGlcgOkfwwGQHMefHycWLmz8QchcFHn/+HqB8qZ5Sxat3vvtzoNn70H4PwEAU7d2y9HvVa0LtobGd0kQZWlIcpvH2k1HXv358/cXIUvwyW/be+ZNUmF/Kl5LK1rnz3389BVB3xDrkDfvP31o6Vu+EaulqcUTY1++ev+OWMOIVff1248vmeVTG1AsBYX35l2nnhNrCKnqjp+5/jYorVUDbmlD95Idf/78oSjOCDmic+rq82AL4+PrOUApi5AGSuV37DvzA5T6GUD5jJhkP2XKlP9nzpzBijdu3Pj/5s2beN0EsgOcp0NT2hM+fvr6mZAPAgMD/9vY2ODEIMfgAz9+/voRltJWALSwLQOYkr4SsvDzZ4JuwmvE7z9/focmt1YwgDI6MXmP0iB9/vL9h7C01gAGUJbYd/gCQR9SGqQgO+DFXe+MdddpHaSzFm1/Dc+HoSktBmcv3n5DyFJy5UFRBoo6lNKmqH5Oz7fvPyhLGVhcBKoE6joWrcMoT0EFQP+s9Rd//vxFtUIAZNnClbuvgzM8NgCytLh25qTrtx5TXGOAghHkM5yWITsgLKXDYvr8rU+PnLz6GZSciY27t+8+fTx9/ubHect3fcSIM2Jq4/D0dgVQ3glNbW8gBoeltkag1ApYLAEAIKtp4+xd+jMAAAAASUVORK5CYII=',
"usethem1h":	imgPrPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAA8FJREFUSEudlUtsG2UQx01PPXLkyJEjR46coPQCQjjlgoJIUtITLRWkQoIEVCflWYFUAVEfJKpUoZICgUBUlAqJIkobmkdBVuq68Wu9tnfX6/V6n971n5kPOfL60USMtLI8+3l+8/jP54diu9ihkZkn+UhrX0x8DrJ9rdiv/G5/4N6Ym3vX3S1u5P2zw5MPT7x3/uL85RX7Xqao84NdrH1u4cffnbcSXy3Fhz94ZE/QF0amDywsXq8EQeh3Mnzfh240IFd05IsaspKKgqyhrNbQsBy0WmEkpZ9WVtVXjp0eeyD0ROLCubxEETssDANUdR3ZfAkFqYJyWYWqaNAUFUpFRVGuIEPvJPq0bTsCVfV67eQnl77vCx07/ulL5Ype7fxFMwgooILtrARN0+HZFkLXRmA16DHFZ+jY5Lchl1SktyXqghmBWrbbODJxZioC5X7/cPWm3Hmy1QIUzaDsZXiOg3q9TnAZDaOGgMBNhhLMNk2Uya8pClRKKp2lM9TiTvtjNak9fzjx2A506sOLy0EQRGbmek1kCxXU9BpavicC5wsScvkCfAK2PBeuZWErlcbt9Q1oqgoaJM1XodmqCDnjDnv/zOU1ARwentzPyuoWoWE6YjauWUeTAFyN2yDRyGWRhGs7oqJCsQSTkmmLpkotvU9V+n4zEnL52qrL6o/xnvWTvW5YAugxkNonoK6DkKrNFSvYTKZQNxs9y1IzLaQzNIYuIDPETsdHZ1426qSALmvYHrZzJZqZge8WvgE1A/dTdxE2faFGnapkXzabjfyypFSRKZRBaxXxu57vDo1OHyXg9DgpyeoGBmEIqVTFa0ePIXnnjgi+nb6HkJTLs2LrBtqOR6Ipgtahp3JSfDM+kjgR40Xv3r32advxhXBk2r3/gmcigdi3uLiI8fFxPHPwIJaWVyhJDZxst8llvTZ0OPFcjFfi2m/rPRXuQF1f3CgcfH3zb9iOC78ZUMsC4XvjzQlKSMPsuTk89fSBnla24zBj57r7+IsryZ6UOhycMQe/dXtTyD5HN05OUoTvxs01VOh629pKie+DbHb+Z2VnD+OjJx//ayNFizTY+gmk08fiGQTkkfHoIrfN65NnP6J29ai1ncL/BfKfwDun5q/03Kd8AZye/XbD8/zIJcCg7qe9CrtVyLC5r39JioXvZww9/vaXnyXv5vUHtXcv77iNXNlAWGcCQ6Onnvj8wpJ0/c9/TJbzXgB8RqvWjVtrW8b5S1eNnpn1LbHLeejVmUd5d+JjM1N7eYbGEi9G/hX6QP4F7nAoMfND3esAAAAASUVORK5CYII=',
"buttonOK":		imgPrPNG + 'iVBORw0KGgoAAAANSUhEUgAAAC8AAAAWCAYAAABQUsXJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAgVJREFUWEfdl0urQVEUx93Bnd4PcL/lnXlMFMmAiZGUx4SBlDLwKJFHXhERoSiSkMhAKWld/1Vnd06329U+k3PuqT/rbNZev7VaZ7WPxfKfrq+BhYyqX+usAJOBLxXjm0gEi4/HwzQCrwb+fr+TWSTgYdxuN9OJE8DH9XrVrcvlQtvtls7ns+69XuER8Agsq8PhQLFYjGw2G1mtVlY4HKbNZsN7DodDXut0Ony/2+3I5/ORw+GgwWAgHVfAn04nkpUCns/naTabUbPZJJfLRX6/n47HIwMCvtVq0X6/p0AgwIkiGdmY8BPwqJ6MVqsVgyUSCY1/vV4XwL1ej22sBYNBYcvEU/sIePSqjLrdLsOUy2WN/3w+5/VMJsMVhu3xePjb6XTScrmUiqdmFPDr9Zpk1G63GahYLGr8J5MJr6fTaW4j5VmIx+Nso9Vk4ql9BPxisSAZjcdj7t9oNKrxLxQKDFkqlahWq7GdSqX4P6FQiO8rlYpUTIVTwE+nU5JVJBJhmGQyyVXO5XLcGl6vl5AcWgq/IyHEQKth0rjdbhqNRtJxBTw2kRWmCRKw2+2iPTBRMF2wJ1oK8NlsVsRQt49sXAHf7/dJr1BRTBQ8oHr3esVfwCOg2cTwzxPwO4xGo2Ea/ThVVqtVMos08M/qfygHfUwHo0ph/PONyoivgs8if/6bV+5vVrsE+rT9pU4AAAAASUVORK5CYII=',
"buttonSave":	imgPrPNG + 'iVBORw0KGgoAAAANSUhEUgAAAC4AAAAUCAMAAADFhv/OAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAAIDBAMDBgMDhwMEBAQDhwUFBQUFhwUGBwEDigMDigIECgIEiwMECgMEiwMFCwQDiAQECAQEiQUEiQQECgQEiwUFCgUFCwUFiwYFiwYGiAaWqOYHiAcHiQQFDAUFjAUGDAYGDAYGjAYGDQYGjQcGjQcHDQcHjQcHjgcdAAcICQgHjQgHjggIDggIjwkIjgkIjwkJDgkJDwkJD/oJjgoJj/sLjAoKDwoKD/oKjwsKjwsKj/sLDwsLD/sLjwsLj/wLj/ysrKzMzMz8/PwMDQwMjQ0tLS2NjY2tra3NzcwMjgwMD/wNDg0Njw0ODw4ODg4uLi5OTk5ebk5ubm5+fn6Ojo6enp6+vr7Ozs7e3t7u/t7+/v4ODw4Ojw8PDw8fHx8/Pz9PT09fX19vb29/f38Pj/+Pj4+fn5+vr6/Pz8/f39/v7+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfr7zJgAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAYdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My4zNqnn4iUAAAFpSURBVDhPlZNrUwFRGIBVJGldFosuNsVqY4mEaimUS5uE3JLWPbb+/1e9i+qcaZrR8+3M88x75sycVzEF2KWQS4UcfywFy8r5kjFMlNjfeSLB8xfRcDAY4LweBrt2ADn7jsMLp4tmSNvtqJP6TRZyCYMXTub58NWxasNU7wlyaYJxLnCLuq33UZjqliCfTMYoUeFoPrtd0DEUpsRHyMdvI5SwIL9Pru+1LgpTrSLkb6MBSlBwLeo7jdOEqVk+6vdQAtdXh/u0Q6/Tapw0iamGnA+6HRQuHo+F/JyPcTtpK4mpeh7yXkdE8V7GQmpgY5u2WoyYquUg74otFA/MViuUhYddi8VsxFQ1C7n43EBhzvycWrn30j4mzIQBNfVSBvJmvYbiDnFbK5HIze06QWyqUFPKQj5lq5Vy5YedAxtFUSaSNBoMqrXKtysXc+nZjyzm/wI12UwqJeewHpl0CgE/fYlkcr4e/1q+T12HLuCJR4bvAAAAAElFTkSuQmCC',
"info":			imgPr + 'R0lGODlhEAAQAPcAAAAAABxUqSdUoCBVqixaqDRaoCBhtydmuiJpvCtovzB4xj12zzV91UZmpkVnqUlop011uU92vWR9sk15xi2Q/i+U/zGP/jiN9DCU/jKY/zad/jyV9zia/Tmc/jye/j6i/T2i/maDumyEtXOMv0CK5kaI50aa4U2Q7UeW90CV/EGc/kSb/kud/Uud/l2Q4FCb/EGh/kKn/keg/0Ko/0qj/k2g/0+r/1Wp71yq5lKh8FCj/1Om/1Si/lek/lGo/1ep/lWo/1as+Vau/1qi/1mn/l2l/l+n/luo/l2o/lm0/GaGw26LwWmOz3aOwHub1X2b0nGc4mGl/GOl/mSm/mGo/mOq/mOs/GSo/2Wq/2qr/mur/2ms/W2q/m2q/26s/2C1/2K2/2Ww+2Sz/2S0+Ge7/2W8/mm69mq882u8+2q9/3Ot/nKu/neu/Xmv/XK193S0+HG4+HO9/nqy+nq9/HTE9XHB/H7J+4GWwoihz5KkyZmrz4S0+4W3/Ye4/Ie4/Ym6+42/+5e5756556az0Kaz0qa006C12aW32Ki21Km52LS/17C+2oDB+IXI/ozI/JLB+pTA/ZXN+pTP/JzK9ZHQ/pvX/JvY/afJ/KjL/anM/a3N+6HU+6TW/a/T+67W+LzJ4LbT/bXk/rri/sDK3sTO5MfS5svT5crU5sDd+9DY6Nbe7Nvi7tzj79Pm/OHu/O/3/fDy9/T5/vb7/vn9/vj8//v+//z+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAj8AP8JFKgqkSFDh04NXPhvFR5BoDRdwhToSSmGpJxk8rPHVas2bPhAOTSQFRNIatb8sUVLjpcuXFx8EqikD5csWrI8ApQFy5UpUiY0XBBlyhUsW1B1qkLFSJEhJRbpOZGCBRIkb2zJsnKESA8eL5Y0QWGBggogbliG+bFDR40WEUZcoFAhgwc4tmbNEeODhowVEPKQwJBBgw1GeR3FEQKjw4YQqRJw0AACTCRbtTg1+gKiA4NC/xzk+DAjzSZbtkRRIhMjCAGBpgaMSVJGUqxXquugOYBoIKEAN+xYmuQpVCUzBu4wHFUAgYkzdHAoEACaoUBFIh40kDAI1sKAADs=',
"help":			imgPr + 'R0lGODlhEAAQAPcAAAAAABxUqSdUoCBVqixaqDRaoCBhtydmuiJpvCtovzB4xj12zzV91UZmpkVnqUlopk11uU92vWR9sk15xiyQ/i+U/zGP/jiN9DCU/jKY/zad/jyV9zia/Tmc/jye/j6i/T2i/maDumyEtXOMv0CK5kaI50aa4U2Q7UeW90CV/EGc/kSb/kud/l2Q4FCb/EGh/kKn/keg/0Ko/0qj/k2g/0+r/1Wp71yq51Kh8FCk/1Si/lek/lGo/1Wo/las+Vau/1qi/1yl+V2l/l2o/lyq/Fm0/GaGw26LwWmOz3aOwHuc1X2b0nGc4mGl/GOl/mOm/mOs/Ger+2So/mWr/m2q/mC1/2K2/2S0+Ge7/2W8/muy+m22/Gm69mq882u8+2q9/3Su/Hiv/XS9/n+3+3i8+nTE9XHB/H7B+37J+4GWwoihz5KkyZmrz4W3/Ye4/Ii4/Iu9+ou8+467+pe5756555C8+qaz0Kaz0qa006G12KG12aa32Ki21Km52LS/17C+2ofI/oXI/4jH/Y7C+ZTA/ZbH+pDR/pPQ/5vX/JvX/Z7U/abJ/aTM+ajL/arM/a/P+6HV/6LX/K/X96rQ+6nU+rzJ4LDQ/LbT/bPc/Lbb+73Z+7Xj/rvg+rnh/7vj/sDK3sTO48fS5svT5crU5sPc+9DY6Nbe7M/k+9vi7tzj79bo+93v/ef0/enz/Ov1/ej1/u34/vDy9/b3+vb7/vf8/vr8/vn9//z+/v3+/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAj+AP8JFGiqTx49e0YNXPgPlRo6lxwtajRnSSiGoJQ4elPnkSU5Ydow2TMwFRJCYEjhWnlLExUqLSoJNOKGShxct06pWgnniZMJDRc0kTLGFaMpUVrhmiQESIk/bE6kYDEkyBAog2jhKrRDh4sjSVBYoKCihxZWK1cRyUGDRYQRFyhUyOCBDK5ambbwmBFjBYQ1JDBk0FDjjK1XgsT8eNFhQ4hSCThoAGEFECVMkAJVAdGBAZ5/DnB8kPFFEaxXnQ5hgeGDgEBRA64UyRIJ1yxPhsx4OcBn4J0ANtAkksRpEyIuBtIw/FQAgYkuZW4oEPCZ4T9ZfkQ8aCDBTqyFAQEAOw==',
"alliance":		imgPr + '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',
"alliance_gs":	imgPr + 'R0lGODlhRgBkAOe6AAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH5BAEAAPwALAAAAABGAGQAAAj+APkJHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzpk2GgT79Yobt3DlU57xhY0YLU81PzOz9W9qv3759dpo2Xfrv3S+jLR9Jw7d0H76vYPFNCQt231J7vwKlxOTtn1eyYe+NhVt2qTS1JB+17UcX7ty+YJsyw+tRkKBPrZSRuwc47N/G85q5muzq0UYzhjNLwqWsXuOvj/vam/yo9KPKDrOoXs16CmZBkhB/MozLF+Ow9siGpiv50Zzfvx/hMkfclBjWrO0pX76cXSHMrbrl6zdPmiRBuKTd/mrvnnd8+6b+vAUrLda8r/IqcwEO/BGycePMravHvL59e8Ews0LmilaxY/9JIkkr5Hx1Tz3oWFOMLrTQUkSDuhyjzTvQPOILM+cc88cc67G33nvwmRPPfe+UaGKJ5nxihiS6tKiLMthQc4wv2PnSDTPF9BchNNp084Q32kCzIC2u2PHJkWxsyMWSTH44jjXjIEOOOyeWeJ895KxhRmLHMMMMNN14I003sEkyySSW+PKLMlDKU88T9cwjzzvtqIMNIrjgIokdjHDY5JKRWCOoNcGEM499VZboji9rCHIhNdZQA8014WhzDmyFGGOMLpPYQQUbgUADzxPwlFqqO+q0kqckZATyx5/+6+EyKC6pYNNOorh2042WrTRzTaTSNCOoNIYVIgsxxoxCyhUDxuIOqaaWqs4jR35CSSBrLBnFtlwwYk0z4OICyzVUVunNuehio004z0lSDDYxSnqMLq3AJkgsxOgyyjO5WAONHdX8iO6511Diiy3NIPNHFFxwy+0auAgjsTDIhDnwxedKs884j5ixJTXXaIONMrrYktkkuuRrCTLBBENLIZYUYTG61MQCjTe4LLztzjxHMUozEyODMSZEE/3IOftoQ8UH0PkCjTKfbJLZG6WkrIsm1vTbiiixFFLII5QUjQnYmOx8xLZnp33EEWtMLMwoYhPt5dy//IOOGB9MYYX+x7DNJojHb0xyCjDGxOJeMNakcokoolzidSy2xJIKIqbYsvblmGduicSlWELL3KB7+cs78rAxAxt2zPDB3h63HngpvhCuCiuEQlPvJYuLoooqZ04iRSOTBBFE5pkLX4gwpYzyyCahgz66HUWgPkMEVtjBhhXYh/FGIZOsQkwwxojyiTeIt/KGIIvLAgwxyLB8rCzCxy///HdM8okmumCyU/MYflKEHYEowgeugIlPsAF1YnjDJU5xCl0AA3yiyEQugoEMUpQBfarQRcuEEQxfxOISgiDC/EYovEcg4jTdQIUr+KcLfDziCZ76ABV0QotAbOITcLiELWQhjGZ8zxj+k2hFK2ghxC2gTxa+2GAsBGGJTUhhCSIkYfwCQS1daEMe19AJ/+ShiyzMYAZZ+EQxxiEKWugiFpbQxaYo1jIgBiMX3qigFRRoi5YFo2usUEY2EEGEPkoxCIEQxS+kUQ553MMen/icl+AljXPIoxgBpAImiqEOa7hCSGyAAzGUQTFgrE8XlkAcyzAxx0to0JOXeIQyNrGJYCzhBkSgwgijEAhUYEgeucFHP/ojDXjBixn4mIc2XEEJMZ6jHrr4hTWckYpCBANop0yGKEbRslykAhNkeIModMHBWLyBFazYxAStcAMpkMEO1kMdOikhjXXk8iv7YAYqeulLXfzjHu7+sMYvjlGOesjjFMy4RmkmkYz2tU8YxrhEK1yGjFZkIgthaIQtiAGMS5RBGbnIxSbgcINyloESIAXbJkSxiXa8E57ewARPsJGxf+DDHu9QRzs8Uw5aaMMbykCEIJBBDHAhC5RvZFkrJMEGKVwCGMLQRSPuEIxHlEEK5lxCGMpAC2Uc46rNgIYr2kEXRP4CXdJoC12cUYwwTe4UxkCGD4fxi0tQExrqCIYkAiEGQdgCqbZ4wxKeeoMlsGIdd7jBG2hxsW78YhxdRcUvWOoNZogVLi86VyzuIAq1fs8XqigEMqDxxlxkog1b2GYwgCGLMHRUBREQwzrWkQspvOEOGCv+BjT6MhnGYogvcKHFza4hikKswqfEEEUYMuGNVLQiF60gBRsEob4OXiIMd4gAAD5wh3Vk4w4qkEIZinGxZvxiPGWhxTy9cY7b0oWw5xjHKaQwDLU2YxixaEQhaEGKBrUiEGGIRRKB4Qv5KuMDH1BBER6xhAKHoRCx8ImCu6EL8MLzF6joSXnf4WDw6GIcPvFGKdKaMPAFoxFlqC99xdAIT3ZwibDIxgcigAEVLOER2dgEEcIwinIoOL32hEs/ICzh0VV4xzY+RzFWoVaWBYMYsrCFKN5QhjsUwlEc7GBvsxGMD2Dgxdmw7h2kEAYyVOPG5fiujpnxiUa+A5JTSLP+mtNchCc8YQpksIVah2HHfOlucb8g7bGAYQsQP2ILL26ZMjSxhY6+YQticLOii2CFNauZEqjwRokaiduw7OMX6oCHNE6hjITFAqngk4UokmgMX0hTFN9TxRuIsIRCsCIXrPhzH8lQhjBIoRjRUscxKowPCEv6HZSGyz2KUQ543FGtulDF+jZIDGEQQxWySIYsVCEMzG4vj8G4QxmIIIUtbMIWcOByKqI1DmdU+B6T+TVLXUqWeHYDHhtm3zBkgUQOTswXopioxPjsuFzkdNtEgMMqTUEGIrwhDHCIlja0kVhanOMd9wgKu+NyDm3UYxW6SEYwOGgLbtZZF6KQhTH+Nu5BQWgCEQB/RC5MEYxtL+F3l9iCK5ajDa62+x06ecdypDHxsMhDGvXgniiM8T2J2XHjwdihLyhqC1UIAopSKAQiqPzUgAdDaoLYwimUUw9o1GM7YDmHSiGuHGb03ED5OIY7wqGMLVziF8hIxveOzkEk2sIXora1t9ehiUIU+gZkWG0suHwHaSinHc3IB12kgQlsMAcb4IFL0sbhnUBwbxWq8MXIj37kpCc766kIhiYeIYUbqAADAc8yLOBQilgsJxyIhQtaPnEO5ZzFG5UOSz0EJY9RxAIRcAitGudO96YLAhG2eAQRTC/dD0gBDll+hB18EQ+mYAPs8MT5L5T+QpV/YOPsBmKTNTShUU1YwmuTgHuzN3gwxyFiC328QQQiAODnr4MVqSgK4xrE/2e8IywppTHd533Y9xXz0AsIiAixEAubAE4mVAiXIAtHRgz5IguCIAVEoAIAcANbQH8q4HxlgAhFgAkCIgmMs3/8pw5gcRXnMID/YA+4BxfWAAs0OGgNGAusEAsaBXyXkHTAoAul5WIrNgNSQH8zoAKAZgdt0AclKCAnWEa0IArqcA84pwv14IL/oDFkYQ80SIO9oA/FMAqsYAq5gIOmMFCF0AiiIAgqEHDTw20eCADalQte4zUl+AzPIAomWEZSKA2PgA39gIU+AV7dAAu4cwn+sNAN/rAOvtCAK2cK4DQKJ1cGBUYEdzADG0gE8xcBM0CJfVCHdSgJ8/APeuiEZXQKqPAOWPgP/SAN8kAc5lCIh4g7sGANxGENr6AJOvhqsWAKhuNURIAImJgFRTBdbCANiNAGeLCMeOA1zdggTWiCXrMV3VcfhmiIh8iMyziLtEgKj1BNOZhRcEAEhfBF1hAIHyAG12AP6lAI2viMz0ALklAI0SgJfYAO9QE6xXAJ79iP/Yg7qVAasdBZwTCOcPAEVlBDdpAFmgAgB6SN86UO/dBboSggfdAloNN97dALy4gFHvmRIPmRy0gKzCAP+VAMj8BywaAMHGUFhWAHYoD+OplwCvKADnjwkMzIBs/gD6LQjKBoj/IQiFRxIt3gCoAwBiGZlB45BoCwCYdVKuFAC76XDRx1BixDj60ADadQDtZwQF55kzo5D+4Iil7TB7+GK+egDKJwlB4JBG2JBW7plkz5CKfwDOcQLeHgC4R2A1SlDhnlL5/Adl7glWxwk4WgDs/gj4XQB9iAKyXSDuWgDKfAlkBQmXBpmWPwCKjgDOFADc/gDejgDqbiDZqwBGSQCdAwQblwCsXQDMUwmITpBaKgD7RQmP3YBxPimHRSDs1gCmNQmcAZnGPgCtRgUvtQD+HADNJwU+YgU1bwLZsgCdf0C+EgD93QB7B5QF7+QAv9QFTvWAhsgAm5qZvucA69sATBmZ5Y0AsQVxb7YA/tICbPAA1FAA1PU0zp4BX3EA6Z4AWwOZjPQIrg+ZV44AWRppsm0g6kcJnpCZy94Bl98RT7YAX74BRwUVNtMJj+uZ3q4A21iZNeUAi/8HAI+g7ncAnBuQRjgJ7AeQny8BliARjvQA2ikKHayQZeQ5hs4AVtIArUsA4l+g7h8JuVOQZnIAZngJ4zAARjgA4wuhtgYQ/oUAyYAAX+uaMb6pU8Kgm/UA7lYiIIsaQzcAMCURlIip5j0A0FqBuNUQ/joAuU0AZWuqEbWgMdIBEogAIYQBDSIAowOQaXoA1r6hiunzEPHhoIVDAEULCoNWCnHXEMj4CjzAChgAGlUeoOzrAJ6BQInCoShuUKqEALjdQddLEbh/QO3vALn0CXbKIMJtEO63AN4rVCjalzjBEeXgFTJioNqlpAogpxKtEP9nAOvIoKxtofv/ALRZCsoPoJRIMKujCq/fAS74mq0sAMv9AgbNAftLATLKVz01oT1Voi5WAiynEPN5Gu6rqu7Nqu7vqu8Bqv8jqv9FqvCBEQADs=',
"mercado":		imgPr + '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',
"mercado_gs":	imgPr + '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',
"militar":		imgPr + 'R0lGODlhRgBkAPcAAAAAAP///8zMzPj4+Pb29u/v7+7w7+bm5t7e3rXG0xQxQqe7xZ6yu5+tsnewwlprcHSMkUtaXDGAhpWhokZHR/X29uPk5N7f346XljNoW0dPTO3v7uXn5s3PzsvNzGqHbt/h3/3+/fb39vX29e3u7enq6eXm5dTV1L/Av5qbmk9bToeahDJSK5WrivT286rNmE1rN2uDWsrbvtTdzXecV9jky+nv48bIxOLk4MzOyoqLie/w7rS1s4GGepmsfMbLvvf59OPq17i8sefr4KmwnKezjmBmVM/UxczPxtrd1O3w5+Tn3ru8uebn5Nvc2Xh7cNTYya6wqVhbT8vOwuHj297g2PHy7tHSzmh0QMDGq7W5qJaZjDEzKYuPe3FzZKSmmNDRyiUmHuHj0mhpXvLz6FRVRoqLa5qae7a2nEFBOd7eysTEtvv769fXzqiopv39+/b29Ozs6v///vn5+PX19PPz8vLy8e3t7OTk493d3M3NzMrKyXJxSKCfgtbVuM/Ou2hlR5SRdvPx3Pr58Ix/KbWraJaQYk9NP+3JApF8Co99FZmFF3ttFvfcSc+6QaaebYV/WXNuUaqmjuzDANi2BPHNDePBDN27DNGyC/rVDuzJDurGDpqDC6CIDJyFDMKmEJaADYt4GKuWKL6oNZqILop9PZSHSbOqfry0isW9lGBcSNLKpZl+BK6QDItzClBLNdDGmufcr9/VqriwkIFoCLqlVkxEJ11VOfDktW1WCnJdGychDllPLaCOVsm1d2hbNndYCGZPF4RtNnhlNkY7IDwwFaaHQn9uRl5BBpBkD1lCFXFZKxIPCa91D6RtDpxoDYZbEGVIEn9ZF3RSFaN0H3xeKWBJIJRyMoRlLWhQJVdEIKN+PrWOSHFLDZlrHIVcGHlUFnxWF3FOFVE4EN+dL8OLLLOBK6l9M6F3MZxzL6R5Mo9qLZt4PdamVcebUOSxXPW/ZapKEJxeNf39/fv7+/f39+fn5+Xl5djY2NfX19LS0llZWVVVVVNTU1BQUP///yH5BAEAAP8ALAAAAABGAGQAAAj/AP8JHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPKnEmzpk2GOlKgEIDPnj039hDgE8AjRc0UAggEWDpvHj16T5o2XRqgAAqjLXXoG7CU3oCvYAf0CwuW3lICKHSkTIEgAL0hh2zd6pLERh2wY8mGNRtAn1qSOtrO+zqEWLBx44rRxau3cVMBf0HyaBq2wg9DvJbxIiKCcWPHQz7EoNFRh70AXzuHHRKFyJQldOjYEPv5MxAIoh/u2827N28ddLwOILOlSmMyXoxsWUG7tt4zrrIk8U29N4Hr2LMTKHAgy5YdX9GE//FCR2+BNMhKtaDHT7jzAfW0uGrVKwQBAQi0Xx+h/7oYO9kVUMAcXnDxx1dChCHFXWARQAceZSAjDAo8pMHDhTc4UcAIjREgGiOJtEHPffllt0MRTWAnoICSqEHCD1DEYc8cdAQSRiADDNKFBCoUAN8ISXzhBg9dFKOMEBdoAAI+V9zABA9R7BFHBWGJEcMHurRiyADzoIXAigWQMMEHWgiYXRd1rKHLOY8cYUQPfWDzBAFWaJCBEXbQcQEKWhCxRQlHEENMFCP4UwEddmxwhxNREIVCCQSElwsrnHSiSBJcWWVPdlGswEMF263YwxqQBANNMrukYYQZxJhBhwhejP+Hw5NXEFFGFBsowYQQLRTgTwEGGIBDEdc8U8QFHfCAwh31QCLKIp1EawoQXNrDhD0CNuEDFRuAKSAxtwRyxjCpcnHLE1wI8ZU/XmgRhRQ/2BNILVoYsMEGJcRggD8GUCHJNc4044w3M5QAggdR/CAMIaJU2gknWYDXlwD2rEFIImusiMDGefQCyQkILPFDCvEgo8EWavyRwh9Z/DAGF0bk0ccyT+SBgBtbGIEABQhEkozAzgRtCgJ54ONBF6RY40ginXjSCSEfrJAFPVH0Akq0j2ys9cZitKHPYAOsMc4vagwiyBiH6BAFFE9Q0AMCawBwSB5I2KJMGVVogIAkyTz/E3TQz2SNwBSlkMKMI4u4cjUhNHzgwyyEROs0KfhsnMLll5smHBlGSDLIAEuooIEXRETxgAQQpLBFGl2oDkwuY6TARQpmeOP3385AM8YTkIxSigKOjEILKKw84gMNhDjctCeK5ITUHgJAj8Ig1IbNBREDzKFDBhn0MUMHFCjQgwAoCLFHDpHQEgxSFAggSTm2B/wMOMFkQ4wwjazgQCGNKNJJKKgwhSui1bRoXc0QAkigAlGghCdIAg4DcEIW7lKPL3DvCAnsAQC24AEBdPAHtsgFMXQgAArsoQ/lMMczktGNYozDHO5oxygcgYpV8E94vSgEIa62PAOCQhFCUGAC/1EAhTGUQQxfqQd8nPCFMIQBCgJYAxe4EIUOJnAPkeAFF1rggfahEH7iKAYzlHGObbjjFKjARSxgUQhfQKIWoygGtJxWQFC4whMIFKI9eBCGMrAhLHaIQoXSgMEcROEGV3GDHsj3hSy0gIvtO0M5UlgOUkCiGuaYBSxiscZYyCIWq6hFIwixC1JwwhNOcxonKsUIITKBDYdQwAPI0KAOuAENZfjCIhN4g0iMgxg/QMIhxnEIIzxhDxTIgSTJQY1yGAMWx7gGLHxRilUE4pOxmIUoxWjKStERFD8kghAFIIg0yBKQQ/qDFoQYhWHkQhelEIIXchENLqzgBiWM3hnMYf+OcmTjFKeQhS+DAYlbHAOUsoBjGABAikWgsmmuEIXvssATfOjDHm/QQh9d8BV6TOEJo7pBPkaKAmIgIximkMQWohEMZrDgBSOlwEjzsQZDqGMYv+hFKmBhCFk84hg9xYUsUoEKWXiBYZVKxCKCZ4hZHAEfUBVA9rrghTL8oXpfeIIRfjDTfAhBG8MgxhncYFKXwuAFJ8iHTEea1jWg4hTHEMYjYqHGofaiGrBQoycLMQpWJEIUjigEGoigD6hClQlyGMQXznCGNnylDltwoRfSioQVRMEMkOhBErRQCluEQQU9IEJMuzrSNaDBEKjIhjBOQddhIGMYsJCFbHFRCFH/hGIUhfCDEvKAFKhuTB+ocVB5vpIEVSSjGlPYGBGM6QSt5eALH6DBCy5wgY3xbGta08IqUGsNU8AiFadYhV49GYtHmGIVgqAWAXSiNX20pTE3EAIX0jCDjQkBHPKYQQ6aiwAodEoGTrDZzrCL3TPIAhKo0EYq9PpJ2XqyBvD5CgHcgILKIQA/qNHLrsqQhidUQQdhQEwaiOGFPDjBC0kAgROqa10CY9cJgYAmJ2csW1kIgqNkiUIULEwxsJGFB0JAwhSOUIUyMGMXu0CGMsbwhR7sQcBbu66LOdZfSNC1wbH4AwrcUxYeuMG99uhxY3iAgAOY2QKAsEYxfmEILSwn/x8H4AAHzExnf9D5zng+QBOSIIYGqwEPeWAClzuKAjf0JMwFGPQA6MGEJNDZBELoQQ+ikAQqIAAEea7zPTKd6SZUwQ9iaMIBLMCEDIdlHoU+NAoSrRdUb/rOPhE1p+9s51nb+gD32HKrBZCCixbgBj3gRz+GTex+UMAfyE62spfN7GY7+9kUEHax+8EPDLjhSwXQxz18XJZHBevb4A63uPc17nKLuwQ3UPQACo3ti3I7iTewgLnnHSx+0dsAS6ACuLPwhC6kWy/10PEFBFQ5Uw8AB6L4xCge8YMN3Hvc9qb3GQBBBBwEawI9uGeHhoStegTF1HDoAyYqUYlLLHwN/f9JOXb6oXLsUIEXytAGIL5AAiEkAAP40As9CqCTAmAHuGCZQisusYlNaKISlvjEI7QAoJZnh+Utd4EZtKENa1hDG7/oQQImAAIlksUeSClAPa4jgAyXwBiUKDomMLGJSmgi6cZAAxX443Soa2cJSbjOFKpudauPQwoTeEIRDKAXfaQgH9nJOT1EcIpPWKLolrgE0TVh9KSTQhJUqEPL7Z4dMwjjDEeIRN/7rgzAM8AWfNCCFRp0lU0pJQAEQMA81tCKtBddE5Qv+u3fjglSzIIKc6CK8APAj+EHoAbYQEc6sEH10VtjHE9YQANgrg0+HGHRPEfB66mCDyeQghK4h/z/43VPft43TwTGJ/7wQwCJdKQDHepARzWab3ViMCABT1CG320BYQT0mi9UkQ99AAqUQHKUt3aWkHsHmICZgAnIUAw9UALGV3zClwXJhw7wh4HqUA1Xd3VjoArjYHXaQAzcYAozcBUHYHwjAAawkHCXQHKbsHZGp3uY8IKZkAvj8A3i4AVOMHwUuBRKIAzr8H7wF3/xlw4cqA3joH/1hw3csA180ANMQAfppw/0EAjSQAuO13aXkIAz2IWZ0ArjEA7fAA3goAonIHw/6AKGsA7Kl4EaGIfrkA18V3XcsAvL0A7DsAVAkH724ASQAA2n4gmfUINup3uW0IDRIA7SMA3h/yAN3XALQsAXFDgPRbAO14CBGqgO8ReH6aAO11AMI8gO3KANxtAO7cAHLjB8LpAFvXANfdM3zSAwnWAJXth2mkAL0fAN4TANvigNwfAFFbAUFNgG2MCJcViE8HcOnPh+1SAMVNcOMSSN7dAHIUAVZPcKygAMtxMws9gMrcAJI0dyiZCD0tCLvggOwuAEdAd1SoAGw3CM5/CJnUiPGpgOy+AOxFAMxuAO7LAM+XgGIoAdCcQDPcADTxAN0AA43ugM3YAMrbAJnzAO4sCL4JCO4TAMPKBA7eNBHnAG1ZAN8vh+72eE6nAOy2AM23ANtzCC2oAN6+AOZiBESzEFZpAKtf9QDdHQDckQMAwJDYRQCtTgDYwYDuBwlBd5DEkgB8RIFSGACu3wDthQDNVwDvOofJx4DuuwDNzADOzwRutADOuADe7QB8InINBBCYjQCuQgDUkmP+uQUvlwBfATDY9olL2YkWAALOT2bafQDvDADcWwC8WwDOlwlehwDtbQDuxQDNwQQ+yQDWPpDmfgLQXQCaxACZjgCswEAPN1DLPwBz6CA5JgDt5gl0bpiEd5DPjwbRG3AWgAmIIpRsywDNiQiefwjPAQle/ADoxpDZPZB90CJoQgDNyABm5gDtBwCKrDA1+BAFEACIRQl0dplOAAib+QCn5Qb99WALEZmMXABdn/cA2oiA3WEIruAA/w8A7uwAvbwA7AuQ7tUJneQgSQAAUb0AQ30AVmgFkHEnDL8AulUJficJ1HKQ3iMA2f4AglsAH+gC8W8AOQkJ7ccAuvcJvcwA58AAjZkA2yCQktYATCEJnrUA3cUCbecgOSACZ4IC69cAZRgAL2CQZeUA7UsIjpeJTdkAuJmANXQAG1Yga/YJvuwA19AAlmYASvUAQyUATs+Q7b0AVp4QXvqQ2R0AVIQARHsAH3sCIlgC0CwgRogACu+AiwEAlRUAUj4AXmcKM52g3WkAZcAAyf4BTtQQzp4DG3sA7W0AcvMARHwAf1AAdQGUOmEAU64AY9YAzc/9ACJVAARPAAZrAFXmCZYQoIkBAIvdALhtAFVzAAd8CmN2qU4qANaRABDwABD4ACXzEWvMAHy/ANJVoMWABhYjB4WQAJqNgOUPgF+RAI21ALM1AAXwAJaXAN2TABlloAQpBVgLAMkCAFW7AHPnIF5iANyhANxKABD5CqC8AAXxAHrToAW7ABa8AHtiAEgOADQTAAFTAHQKACY8Ce7rAN1cALeLAF3FALOAAFtsCntqAKT1AAClEMvBAJY3AD+kBmSNAKrQAMt/AAT4ABDLAAE8AETkB4zTEAQSAJNGADRWADc/AVQQAFOsAD1CgMZQAD/8CP3DAQxGALDjEGvzAQA++AACjwBZ8wCZNgCgkAAQzQADegsZ4xAEpQA0fgAiMLFi8gAyuwBdLoDo/wD1zwD1jwC1igEXEQBcagcIWAARiwB6unF3nxGQRgBy/gBisQCe8gjaYQEhugBYXwCMi5B/bgdWRRtmAxdgWAsymgA0XwAj4QQ+5wDCMxBwaAD17WKPhgJkrEHl4RKvagD1dxOTxwAnEQBAIxDMuQtSQxDxUwuYXmBm4gSCiAAhRwulHgBpjjBkxwUQQwDy8xIn2rD+RzIWMgSMoiAPnwJbFrE7QrIGDqcwRQDzdxvMibvMq7vMzbvM77vNAbvdI7vQgREAA7',
"militar_gs":	imgPr + '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',
"militar2":		imgPr + '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',
"militar2_gs":	imgPr + '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',
"misc":			imgPr + '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',
"misc_gs":		imgPr + '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',
"setup":		imgPr + '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',
"alliance35":	imgPr + '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',
"alliance35_gs":imgPr + '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',
"mercado35":	imgPr + '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',
"mercado35_gs":	imgPr + 'R0lGODlhRgBDAPcAAAAAABAQEBwcHCIiIiMjIyUlJSoqKiwsLC0tLS8vLzIyMjQ0NDY2Njg4ODk5OTw8PD4+Pj8/P0FBQUJCQkZGRkdHR0hISEtLS01NTVBQUFJSUlNTU1RUVFZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2JiYmNjY2RkZGZmZmdnZ2hoaGpqamtra2xsbG9vb3BwcHJycnNzc3V1dXd3d3h4eHp6enx8fH9/f4CAgIKCgoODg4iIiImJiYuLi4yMjI2NjY6OjpGRkZSUlJWVlZaWlpiYmJmZmZycnJ2dnZ6enp+fn6KioqOjo6SkpKampqioqKqqqqurq62tra6urq+vr7CwsLGxsbKysrS0tLW1tba2tre3t7m5ubq6uru7u7y8vL6+vr+/v8DAwMHBwcLCwsTExMXFxcfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9HR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uTk5OXl5ebm5ufn5+jo6Onp6evr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19ff39/j4+Pn5+fv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAABGAEMAAAj/AP8JHEiwoEGDPJaMcZPHkCEmTGJ8+KLlyMGLGDNqvLjEzaRNIDMp+rKjxxYtQ3RAAtlojMWNMGMaFDKnEshLlSoRMqOjhxYxYcKg6fFlUqVLICeN4SGzacYjfjbhzJmTSZAkUcqA2QomjBYdkageBTmHqdOz/4REzSS2kpMgWrSE4Uq3DI5DbXNm0uTGLFqYWjKxFQuHCIYgXadEmUs3TBQmealmorTkr0YehjblPYPBhIwXOICKoUtXB6DIOZG6sXyRh6WpYutYMIFjhwwTUUaT3lomihNJqHNuMsS6YGbYVAF9eNEDR48dL4Jo3T2ayIc8wYVPalO8USPNbQ+t/8nB4XnzHSZ6oCEdRswWIiZ2KMqeepIbP38bZQ7P5AUFByHsUFINttXQVVejRREFETLkMAUbiRiVXSZK4XdWVGLl4cQKEHDAAQUQLFDDeTWokJt7W0zxQocYYDDEF16MgYiEqG3SEnFN5ZEJbGdY4AAGHmLQYQgyOPdcCESgscUTPZiwAAUYEPDBBykQEYcWYywyoSFe4AiTH4KJRQUDDGBAQQhQliSggDjgEEKJIWCgQAALmGCAFU6k4EAKVJxRxR7A1TjHajDl4QdylYxpxRAZCMjcms3VgAMBAkDQWQgaqGDYDjSYkQMJFpDgRBVZonbJJVoQqtEcg4lpgh5EhP8whA8q9GDreTi8oAAGMshARAw8UGCrm0zkQAUTCjgwhBdaIFIJG1+0dYkhVcBkCKKJmsAGBwO88IIJNchga7g9rIjBC0kkUQKlJNDwgm0fOErDCkLwMISZFLxABV56aeHXRWOA1xYVLwyhgAIIHABBshisCR0EIeDwxA4QICCAE2vwQEIPSeTwQQ5MrJDGGUyQQAEFG1DwgRaEHNVIZRiN8V1kTmDgwsEYMJCAAw4sUOsOuULgK5MSKHCACzxI8AERTzxBBA4Y5NAGG2M08cIBFHCA5gstZzJGFDELTJUihxBBwQAKDIC1AvnCZ54MBEDQwxQ9FDBAAlFukMQTeyf/oUIAWLDhBtU7YJCBBRQwMIEeLit0kBvXtjWICe3W8MIDFDQAQa1MbnAr3BDElwQFJhDxNN9E9CBDAwoIwAMbZXxxBg0YSDAEGTlgwPhRVVRrkBetJmenA3KjRwHTO6TuQgwx9BDCAhAQMEAIe/PdQ+ovYHAA2wQgUAYeS5BggAMRKFHJGh/sfkkejhfkRvCVWPJFCBCIUIECBDTHdxKnv0F7AgcgwAGIgAAFoMtphWNdAxqQAAI44A1yyMADBECAAgxBEYRIwe4qMYklaKEgczAE/CoBBRG44AQQCIAActU0IhDoCn9whBIQQAALJIkGHBCAsExwsAZQYAEC3MEb/3gQgheoYAEJ0GEOfJA+yVThgwRxQ17YsAYnVOAEHNDBBCbwpolVSRB1eMMfElGGJ0zBBRLgAQ9o4AAKnowCmBNCGP7QBZ49oAbwWeADMJCCQVDlEm4AG0G8IDYrUCEQceABdHKwghUcYAMxaAIe/sCHQvBhDYJIBCXkYAEE7KAQcniBCwSwAOjRAA+JKEQi1uCCbzlgAyVRQRJCkIHTpMYPR1CVH+YgtjjgAQ2YdAQfTDCB2tFgDpQAHxb+QMk/CKIQdShDF1Q5Bz5coY0h4AIl/KeEQvygmG/ggsmKxCklfKEPVOngGAYyBwxRJRFf4MMbysAHPODBCUSIYRlo4P8CCCTgComQwxvqIAdBCEIOQmBCEZyAhjcsQQ+OuMILJGCBF3Bgiy5wJhdo8IEjyIEShShDOqOwToHcR2yViEQkzCAHPJQhhswsA+IeYIAMEIESlKxnItCQgyGcJAo9cEIiEoGHEJAgCNR7gQAQwAMxCrML9ixDHRghlt4NBHIjrAQW4PCFTPJBDnTMgdk8IIEMhEGYmJTDDqIwhS0EpQwz4MIqM+AmBTxgAQWQwBrCgIdCMHMNa6hDWP6oBUH+A6uR0YIf6qCHNciBD6tkTgp0EIIAUGAIBZ2Dp7RQhqCEYQs5KEMipBCDJMjJAQMIgF7F+IdofkFL0vraVRuBrUv/eOGZg2BDHEA5UB9wwAUWwNcHolAIQRQhCFF4wpJwwAM8XFIIRUgC5iBAgyv4NZp28AMh8+I1w8oMW14bRCEKMQhBsIELfb1CB3Rg0x6YSQE8oMQVLMAGNNihDC6wbh3G+AQakAABIXBEa8vAhjoMYhBjAK8bYPaPM/CAAxqIsIQ5IAEJRzgEPIjDGqSAgAKEoCezXIADdEADHjgiESfmgRSyEsb9CkIKL/0CD1xgYQlA2MIa4AARDDuHQozwEjJihJAZ0YhFHMIMdfCCELowByLkQFcSqADE1sAHPpQhAwYIgAvqUMk3hEEOXFhDHrwz5EOkAVuVkK1AQjhCSpxh/xDeiXMjGDEIQJgBgi3dpwV0YAEBUoAEGXAAAQhQARoE9ApleIMdACHnOAviDdiihFUFYiiUHqUNe2g0mRcxCDOEYQ14cEQcXOCBB6hABRwwEwZqYIILECERVl4DGQ6hae/oYYNimUQUoCgQd4oFpHqYhLCHPWxJSGIRZljDG9CABhccQAVOs1USppACJeBBEIbog3eIzW09wFYsl3hZSdds6Uo8Yg7cTrewCfGFx+IXSU4jQhJ8lQgusEHd6Y6DJCiRF0PkMoqWpoQl0sCIYcuaDAhP+BokcYhArIGeR3jBk2OgAx6gAYySEHYersDxCBF7EW+wRGTm8JKBYKe2ev8QhLAbQYYsuPzlLn/EyuugYTpioQyBPUQkMj6JRFwBCUA3A8+FDQhBREYpDB4ImI6uh0xsYhEwj/p3QKKJSQBCD3IwBBfyoAmQeP3nAgq61zORB35LS9wGyUO5L4GHR2jiEEqIusuVcAiv250Dm9BE1+0OdochQe028gNqcHmQsqMmEn24xCCUkK7Gp0sJhtj73e1OdTMggQWYz/wO/n4JQKHGJRdZel4634jFp8sISUB9EiAvea/jnfJm2EHmZ4/5vwNisG15mRcuMgc0U2ISdwCEEoxA/OIbge6tB8nrQYKJPMgeBLTHPPSRkAjUzEEIebiIQ9BciUSwQQlACL//+IGQhMhTfhPL34TzQcD+9ruf/SxAAiTy0ggFZaQmqLGEG3Kgg/77XwdJUAjJh35jtwMgkAEI+H7vxwJXgHscdH0a4QeHEhmUAAj893/9lwMql24aMGyJQHsJmAHtR3uBkhMvY1gYoQWNIBaWoAQuqAT9ZwMyKIMZ2DFK4AY46AYSkINecAMp8IMscIAiiIAsgAIpcAM3AAWGkE5LERNSRBWRoAMzOIVUaAMyYAM6YAmu53WFUBFE4AMugIBiKII8YDpE4AV+xEF+IAS8tirYkROFwAS9AgO9Uod2SIcywAR+EGca4GhtMAZjAAVhOIZkqAVnkAZ3oCWT8DIlBxNj/xA5gDAFOQADlFiJltgClJgDUaAHfBhnRkYIggAGgziGIMADgMAIiyBzlNAIWiAEZyEzlYAIY0AEKwADLXCLuIiLMEAvt0VmfShnjCAIWoACGXAyxYiAPMAvlbCKQ9SGMiEzkgAISrYCLYAC1niNKNACK8ADTZAGe0AIiMAIGsAIiEAIfqAHc8AGw/hGb5QByZhOQ+Q7aPGIiOcvMICN10gvWrAHh7BLcBAHEhAHcUAHgLAIk0AJaoAC7GiMPOAsq9gXVaAHlpEHj9gIeVAFO4ACIrCRG7mNWNAHg3Uql8ABl7AjVCEJCbmQJ5OMqzgGQoCClqEFeLAIcxAFNKCRG/+JAjtQBXnwCGZHFRqQF5GgBiOgkhSAGazIAzxZHL3mBWwwCG1gNRxJA1FAB43wk0CZFyhZlCqZYUsgBOPGlP8wCXOgBXNwBkvwAiLwAlEQB4uAlVnZFpKABzewAXZ5lyXgAwkxB40glgRRCX4wBliABUcgBEuQBpqEGkHZFpPgB1VQL2o0YyHgAl5gIX5ZEJMQB0twBN1oCDSSF4v5a4jABlUQBU0gBC6ANF5wCJd5EZmQCF9TBXHgmXCZE6FJFZQQCYLgBo/JA0cwBn3QmhpRCY2AB4VVBQyxbfw2kjixiPoxB2OwmR7El5UgnDBBIYYAnQoSBU8EiBIAiKW5mUcsEAVeEEKTkAnW6RSXsIi75AZjEBcu8ERYwhB7eJ7pWRzrGWeFEGfCRgnCGRAAOw==',
"militar35":	imgPr + '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',
"militar35_gs":	imgPr + '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',
"militar235":	imgPr + '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',
"militar235_gs":imgPr + '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',
"misc35": 		imgPr + 'R0lGODlhRgBDAPcAAAAAAA4MCSMcDCAiHjgrDjEtIDAzMTg7OU42DkA7J1NBH0dENFhMLVJOPWFACGZJFnNJBnxKGH1UDXNWH2pZMHxrE3xuLHlnP3B5OEFDQ0ZHR0lJSEhOT05PSExMTE5PT0hOU0tUWFpXRVpbT1JSUlJZXVpaWVJdZFtla2NdSGNmT2tkRWhmV2l1SXBtV3lzWGVqZWRudG52eHByZnl4Y3B6gnOMU3qAdHmEi3+Jg45AAo1cCYFdHZVOF5lWI4RqCI94B5ViDJFsD51lB5lmDpttAZ1pD455MJZuI6NLA6FlAaFqC6BrDqNtD6ZvD6luCqZuEqJzAqlxEK10ErF3E6hrNIZ7V8ZhBNd3ApaACpmQMqGLEK+TBauXH7+hCb2kGq2gOIWARISaVZSDUoaCZ4qIcoyPfYiXbJeKY5KOdJ+baJqWeYeoZJqje6SASqiacq6oUbOrb9qXAMedPMqrCMuxGdqkBNerGNGxCtm4C9+9DNi6F9C1OO2IAe+iAeG/F/SxAfa5AeS4I8i2U8O9cOTBCOXDDuzFAuvGCunHDu3IBuvIDu7KDfDMC/jEAfrJGvnTDfnMLdbEaPjTSv3ea4CMk4qTiIqVmZeVg5SUlJGcoZ6jk5ikrKGcgaeihKyni6mqnKSyiKm0l7GrirKtkL24i7exk7C6nbq0lrq1mr25nKOkpKqupKOvtrSyoLu8rrGysru7u626w7TBk7rIqrXCyr7L0si+hsO+ntnLgMnDpMHItc/LsMfWuNDKqNbQrdzWstnnvuPduvrii+7mv/TjosPEwsfNwMzOw8nJyczMzM3Nzc7Uw8/Qz8jV3dTayNrYzdHS0dTV0NTU1NfX19nc1Nra2dvc293d3d7e3tHe5tfgzt3g2N/l2Nrm7+Dh3/jxz+Lj4uTl4+bn4+Xn5Obm5ubp4Onq5+zp5Ojp6evt6uzs6+3t7O7v7O7u7u7w7+bz+v/74/Ly8vP08vT18/T09Pb39fb29vf39/n79vn5+fz8+/z8/P7+/v///wAAACH5BAEAAP8ALAAAAABGAEMAAAj/AP8JHEiwoMAIBhMqXMhQSxeGECMWLBNKGbZy5WJhnKYsViaJAjEcoYNIC8h/GBiKMUlwlbJ5Zx6g80fTHwl+NWnuO+eRoYUteAwlOtQlDEQbDo4w/PJFYKZp+GjOo1WGHb6r+EhgxVrvzZhn8noW3OIlTyFDixIhysOSoVGFXRY1qkOLJlZ79uIQuodV69arbnQws0dT2UeBR7jkyWNIzyI9kPNErGMhoZZChxQdIkTvL7M6X5j1/Ytvnipo5rDSNPYvDBcvjhMZEroITyKGYOokytMlZcFBwCXN6nz1GRzdjb7EeZaVtLxuV+9xgx41nxjFhRopYsS9USHJcPUg/1rEaC7BTOVc6frFi1b0bl0KkV80e1Dzrd3ahAllrg0JGKJdFYwYR4DBBx9f0LFHHXyIsVAhhSTCSCKNHLKCCSqoYA49NCyAyguiYOVJHmlNKBQf+vh1VTdhAMEFFxZwIossu/B1FShlpLLJJ2q8UQouutCwEBh7RJjIHoMcI88YQxyhhggFmHIDKFgxo8Ufacn2RxzWaGDNNd+EowYQeORBBxet2CKLe1ht4kIno/zyiy64qKLLKQuhUkoucdyCCy/bMIOEFE9AkUYnpriBxinPtCMOJqPE0ectpezyDgnvlHMNLUeUhRYdrMiiiRjLzUPPJgeUQYovwAgD5C+zLP+kijDC8IILLr/sEsYSTkwhBRqeHKFEoUxMsIkndaaSSqvMvPPBO9DOkkWZcuHBii2tJLaFFmBoUcERaGCywBq+dLJAKAt9QsMn672ACRo7OOHEE04wQUQTUjghxRJxdPKJJyKQoosLnyBzDwn3JBwKF3QE1Yi1rVzimhdelImHF0AoEEAKwogQwBkLpVEAGbgusAAS9DLRRBMq6zsvEp1QUIYIAnjiy8i7uPPsO+rAQYceQjGCByiirpAFZI14QYEVWnhBgArElEFGGwt1UoAIQHbggBH1qrxyEy4vcYEVowBsQCe4NPAJL85Cqw4Y8qXVCB2ZcFKJBXRUa4UGN1j/4QUhuujSKroKjdIJ2qqMsQMTRjChL8uON7GEEaSYYucnqpgisCqvZLNBNtlIE1eWjHBBRg5heJGIXFuMQcEDFGwhia2+/EJ4QjbrosonSAzRBBHysryyE00MMYYquLyBBhnAZK6LL51/no0odUyYyPW7wbYIeYX8MIEAAnwSBxjA1P4LKAt58gINvLgxBPH11ovvyk8goUonFyCggCcu4AJMA50ARSYMkIlMhME2WVodd7KUtDfoYgACwIQpugCMW/3CDAtpg8msIIElDO9rLiPeEaxgATQUYAHEaMAohFGAF7xiGRlYxiu0gAc9WA97qzNEHg4Bh1eYogAD8MQv/yxABl+sBxMZTEACylAABEhgcVKQwhT0la8dEEAAvgDHAQowBgR44oFpeIUyMqCMU3yhELbB4fWEhgc6qAETqoDgCijggBV0AnmbWIVC2tCJNHwCSgqAwBOJEEV5DQENBxiAL0qhAAWEYQ2q+EUkxUhGMCiiEdijT2wYYRY+pGIFDAhAAESwgguQYRQVFGAsEtIGMnhiFC9IAI8mAAEHSMAJVHjCEYSxAAFMYAJoQIUqgNEqNOCCksqAwxfEw4jtzQZ7emiEFi7wAAd0wAzI2AQZRoAJYFygE7CARULIgIAJeIIGIyuDJxCAAAdAAAI7eMMoFDCBMXRCF6gwhS+Ekf8GBIzBFWNUxjFCcQEt5GGBaaGPIfAwQgWoABasSAEL0NAFIPHAE9jIBGsKsgIEPGANsaSBCEZhAFFSgAcOcMAE3pAKcjJAWb/wJgLCAIqAltEUa3hAFvLQiO3RpxFcWIMuyMAAFcBgDb/ARRd8gQoJdEIemVhlQcyAAAiANAEgJUMCRLmGT4zBCqnghSmq6YAXPO8XdKQAKKihAWpQQxTAIEUAAGCBI3xhO4sohAUwMSddXIACZCCGL4Y5Cgh4Ah/hLIgx+mEMBqwvFCooQye2CgAyNOBWqPDFBWopAQqY4k8UoAAs3NpWapzCFzerrCkoqgdI4MEKafgFMdDgTgT/lIEYrUIFBDCAD2XokSCx8Ac9emGGTUjjAjZLgAAqqwJUkOITY30nBBiwnk9gYhduZatbq7GJTvzClcT4RQMI8AMtYKITwiisIHegAFwRAxcUcE85MqGMgWBjGv7YyjV0cIFPIHUBgR3FKFCRBne+kwGkOAMysAE60EkvG994RRtoBQxiiAAAAfBE5ogxBkHC8wG6wO0aBoMPeaxio/+YBjbyixVoDGABKmCXL9aAhhdAEg3vdIAFynAKZjS4wQ8G3UDjRAwaiDKSuBBGGDwsAQSgbRfisAdWViHVfyijHCy+ijRcoIIXlOEFKfhyGj7bYWNd48doDjLoqrELM+CC/xhrKACudCEMN0j3AmegRcJsdJXECsQYWP5LNzBBAxWkwAVW8IELNGwFMhgDzZBWM+iwcY1XzOKscxLGESSgBldYoxnY4DNWYPFbK7sjy1iJRjTMoIJTtGF/pFhDKMpBDozY+tYY8QCub02ObYRiwnP6LjJsfQ1qkAYfsRDnn09NmmV8oxziKIcoGnAGUDBj19guh66zjRFx7EIUqjjFKapRa4yEAyp/8YcxSm0MZv9lGtyO9623He9yZxvdW1F3qWPBChL4+98kyIAHPkDwghv84AhPuMIX7gENAPzfBRzINNy9FVBD6+IYz7jGobWzjXs84+EwNmliUWp4o/oq0/9ohjE2QY6Pu7zjGj9GGtDghjm4wQzfyLg18L0VP//jIifHhzWMwYoCGMPlH4f5xdURikRfQQ6ACIQdxkALjE/DGsem8kDKsWLSfCMZnYDAAz4R6j2b/exmR9jZu7EGH/QgCX2I+iMi8Ygv4OIdCXO2c05MEPySJh2xQMISqEAECmBiHGhPfMLUvud3kMEHOoC7HxzhiEcMoxiTwMMpEpaMdJBmvvUdiDKC/g5MBMEIU2BCECSAhlecQ/FnZ3zCPlGFJEgeEJR3xCRwO4kvdCMcy3gHaaaRCWwQBBvHlsbpqWCEHUxhCqu/wCvoAfvFm70atU/CFfrgh0Dk3hGUAEf/MSJRimhQox4jX0U5CtL1rbxhCFAgPNiIYAQq7IAHaTBYTvZPgprkwxOQt31xl3uBEAiWBw6UAAaARhruoHXsh2rVgARB4CuoJwVGAAUus3plEA3foA77ZxM1sQ1uYHtYwH3eR3kFGAiTEA/EcAeiIHx/kVHTYBDIhxVL4jvQBwVTRART1DUWyAMMUAb9wH81sQtVEHklOHkomIKRAA7xEAlq0BnzQB34YAyHURDy0H6uMAREQHgT6AT014NBoC9QEAQU0ACYoA850X80oQo9oANXUIK4h4KAUIePgAY3MAlawBfbcApX0YBVVhB+Nw9uMIFSQARQAAVNUIGHiHrM/ycBc9QA7LCGNNEPcfB2SXiCBViHUtcBNYAgqaALu4AMKPcUCoER++AJvkN4XQgFTKCD8gI8VEAFQYAABFAAncAKQ0gTbOgPb4CEJkiAnBgFIyALg+AFLYAJIYIPDVhqCTEN85AGEiAF9kIFUrCI1OgERkBIU2AEPLACA1AAFLAC31ATbNgLF3AFcMh9c+gIgVCHgAABI8AJcNAFL+AGZ8AXxDeDC0FprEADCEAETzAFkEM8TbADTUCQO+AGmCAACPACqAAK1HcwCXMDLKB9SYAFfjCHKQgIfjAGzsAJKaAJRygColANq+CMCaEMsJACCjADVkABRkCNU3SIjjMFRP8QBH91AaOgCp80A8lgU5uAA2QABXEIdQRYgH6QBtqgDZVwAgqAAJfQCjJwA8oGEZnwOglACi7wAL1igStDkEPwAAqwBqmAUxRwATQwDyDoD/kwA5XQCp1ABVhgB1H3jn4gB12gCSjgDLaAA3CpCZqQA4HIEJuACg0gACIAQBcwjYyjL833AqSQCp1QSp7wZeHQNtByAyFwCX7ZCqCwBmowmpgAl84AA7JQC5VgN5qAA2YgDSCxCqSQAsolAGCGP/FCkEFgAa7QCS+gAC/gCXGgAAxQDpr5DpZgC6xQAiAQAidQAzhQAzUQAgYQA5xwnauJA5dQCZWwCSfBCrjAAsr/pVwIcAEsMAoXwANBsARogAYMkAIvgAaNZAqfkA7HaQnO8AoyEAIBYAAlgAMHYABANADWCQOcoJ2VEAKtUJgMkQmf0ADjWQBrYAUEkAZloAoWIAEM4EUvcAG32AFpQAb22XGWoA2hcAkm4AAlUAm1EAMSIAQ1kAEZoAkxEJ0lgAI4UAsoRgsMMQMXygAQpFxmUAYJQAAJUGP+8gIUAD4KkAASNQKWkA4fkA7hIA2WUAtncAkp4AAoUAm2cANREAV82Z8lIAMgEAAnkKO7MBCiwBCrogpogADgUwAmsAELUAAEQAAIsAZEtVwCsAAJ4AI3AAMwEAsHEAv8lgOVoAKV/9CYMaAJp9lOlxADHDAAmlAJAzAAOFoLrKAFb/AMPLoQyOAKpoAKnWBCJmCRd5oABZACVoBcBgAAAsAACUADZmACm5AOHpAO6kALMHAJOFAJLoAEMtAKssACO1AEloADzmAAdmMABIoDnkAL2kQLz8AQ7rAOoOBHv+AJHSADM3CnBVCrulAGDTAAsgqhLDADhdocvZAD1ukN3mALtSADMRADI2ABYRADraANB9AKADoANcADgoAJa9ADLRCqEVEGQpUGlgCQAjCuBNMJDRCrAqBEL7AJ/NYcZACdl2ALztCUrVAJU+kNTQkPtmAArRADlwACKLAAFxADCYCwJyEQZf9gCa1QBmjwAAQwADSQCqRAAyZgALVEAC4wAzlwAweDD8taA5WgnTUArDKgCU2JLZdQAwWABAxwAjJwAGnKCQ2gAGxQs/9gCTeQAzBACp1gBQhABqjgCSwAA1sKARcwA5ZAallxD5aQA5fgDbLwtJoAnTUgAzIQrDIAlXJgBfcKAvdqCyxAADZAthprDDeQBgLjCZ5gCqMwA5qQAAiACe7wDtRAZc1xDt1AC5mgDfDQCpogA9rgDLUAslF7CR5AA/AaAiogBjEAMmSbEDSwBp+FCp/AAqwwA2ZgDe7gDvKAD3yhIvLADZuwCZogC8wqr97gDI/amjggCzXQuyAhQaRMQAYscANVmZKrEE6xYAwwYAzJlpIFZAY3sAnGYAP0O7Y2MAKCaQs54L0nUQYsIAOroAn/4A7lwBGICgsygL6xoAzw9g4McbY3ABIBAQA7',
"misc35_gs":	imgPr + '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',
"setup35":		imgPr + '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',
"arrowup":		imgPr + 'R0lGODlhEAAQAPcAAAAAADFM1jxX0SJa9Cpj6i5m6CVg9yhv/Chy/Cp3/C579yp7/E9Txkla3V5nwVFl4i+D+S2A/C2D/C+F/C2F/y+I/C+L/D6I7zCJ/zKS/zWV/DWW/zWa/zed/Die/zeg/Dii/z2r/zys/Dyv/D2u/z+w/EyH4EKS7UCe91WG6Eag9E+t+UGx/Eu7/Ey9/1C9/FW//GmN02KO/GSP/GSS/GSU/GeZ/Geb/Gee/Gqf/HqC6HyN71/D/IyNzoWH24WJ3YuO04yK2ICW3Y+Q2JWS05WR1pGR2JCT25KU3ZKW3ZWT2JKY3YOK6oiT6oiY74KX8oqd8oqe8ome9JSa4J2a6o6szpChzpauzpmvyYCq5Yui9Iqj94ql946n+Yup+Yur+Y2u/I2w/LCo27Sz07i80aaj7aqq7aqr76qt76ux8quz8quz9Ku19Ku29K229LO54LzF06zB5dfY3dPa6tra6t3c8u3t7eLh8gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAjIAP8JHEiwoEGBWKocNHhFxYosCwfCOfECBoo4EeWYEAGDR4kLcw7aiaFBRAsXLDqkOGhFAYcQJEaQ6ABBSEEyBSps8ADigwcOFgi8GShHAAIJGDIozWCBQoIAdAQ6GHAgQYQIEyZIiLAAgQEG/8Y0kEHDxo0cOHLcuGGjxowHYnrskLLlCxgwYfKC8cJFyhMfQHQ0cQJFy5YuXbZoieKkCZMfRKiYQaPGzZo2bdi4SYPmTJkgd4oYOZJkyZTTp5MgGaKkTsSDAQEAOw==',
"arrowdown":	imgPr + 'R0lGODlhEAAQAPcAAAAAADFM1jxX0SJa9Cpj6i5m6CVg9yhv/Chy/Cp3/C579yp7/E9Txkla3V5nwVFl4i+D+S2A/C2D/C+F/C2F/y+I/C+L/D6I7zCJ/zKS/zWV/DWW/zWa/zed/Die/zeg/Dii/z2r/zys/Dyv/D2u/z+w/EyH4EKS7UCe91WG6Eag9E+t+UGx/Eu7/Ey9/1C9/FW//GmN02KO/GSP/GSS/GSU/GeZ/Geb/Gee/Gqf/HqC6HyN71/D/IyNzoWH24WJ3YuO04yK2ICW3Y+Q2JWS05WR1pGR2JCT25KU3ZKW3ZWT2JKY3YOK6oiT6oiY74KX8oqd8oqe8ome9JSa4J2a6o6szpChzpauzpmvyYCq5Yui9Iqj94ql946n+Yup+Yur+Y2u/I2w/LCo27Sz07i80aaj7aqq7aqr76qt76ux8quz8quz9Ku19Ku29K229LO54LzF06zB5dfY3dPa6tra6t3c8u3t7eLh8gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAjKAP8JHEiw4L86SoYgSTKlYcMlSY4YKXInSJkzaNK4YdOmzRo3atCYoULkB5MmTqJo2dKlyxYtUJw00QHExxMpXLyACcMTDJgvW6Ts6CHmwYwaNm7cyIEjxw0bNGQ0GPOPgQEECyJImDAhQoQEBwY4EEgnQAIKFjKozYBBAgIBcga+IWCBg4cPIDxsqFCATEEhEDqQGEEiBAcFVgz+S9GBhYsWIjTEsKN4zoUSPGCIMBFX8b84KGC8OAHH88AsK1RcMU2wChbWsAUGBAA7',
"speedl":		imgPr + 'R0lGODlhGgAQAPcAAAAAAAICAgQEBAYGBgkJCQ0NDRAQEBISEhYWFhkZGR0dHR8fHyIiIiQkJCYmJigoKCsrKy4uLjMzMzU1NTc3Nzg4OD4+PkFBQUdHR0tLS01NTU9PT1JSUldXV1lZWV5eXmJiYmVlZWdnZ2hoaHFxcXNzc3R0dHd3d3l5eYGBgYKCgoSEhIaGhomJiYqKioyMjI2NjY+Pj5CQkJGRkZWVlZqampubm5ycnKGhoaampqioqKurq6+vr7Ozs7S0tLW1tbi4uLm5ub6+vr+/v8PDw8fHx8nJycrKyszMzM7Ozs/Pz9HR0dLS0tfX193d3d7e3uDg4OHh4eLi4uPj4+Tk5Ofn5+jo6Onp6erq6uzs7O/v7/Dw8PLy8vPz8/T09PX19fb29vj4+Pn5+fv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAaABAAAAj/AP8JHEiwoMAzOBpgqGKwoUAiQrAM1FIAAIATDgs+iTFAgAIQN5hYgWARRsaBQDQIsFCCQgABBkQQ6ZCiy8l/QxoAcHHlH5gWBCwGMXOzzAsABnwIDMOiQAEYCSSIGUhGBoqCZDxgYCJwSQYAF4r8swGAh0AnIQBEMAjGi8AcCQqoCCPwCwMGWo4sAOCBYcMpJCxuQAJmoA4AFgocoEHGYZEGAig4eGlhRpR/XiIAeKDE4ZYZTmlwufJjREUFVv4lWTHFoRQNASIYIVjjgAAWUzOO4aEAgAkqA6eI2NzjJhcTAg7sIAhF5wcpN7NUAMCBK8ElE2AQvdkEQQq6BrncAxwYEAA7',
"speedr":		imgPr + 'R0lGODlhGgAQAPcAAAAAAAICAgQEBAYGBgkJCQ0NDRAQEBISEhYWFhkZGR0dHR8fHyIiIiQkJCYmJigoKCsrKy4uLjMzMzU1NTc3Nzg4OD4+PkFBQUdHR0tLS01NTU9PT1JSUldXV1lZWV5eXmJiYmVlZWdnZ2hoaHFxcXNzc3R0dHd3d3l5eYGBgYKCgoSEhIaGhomJiYqKioyMjI2NjY+Pj5CQkJGRkZWVlZqampubm5ycnKGhoaampqioqKurq6+vr7Ozs7S0tLW1tbi4uLm5ub6+vr+/v8PDw8fHx8nJycrKyszMzM7Ozs/Pz9HR0dLS0tfX193d3d7e3uDg4OHh4eLi4uPj4+Tk5Ofn5+jo6Onp6erq6uzs7O/v7/Dw8PLy8vPz8/T09PX19fb29vj4+Pn5+fv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAaABAAAAj/AP8J/FcFQwMcZwYqXMhw4AkAAApoGYhFCJGGGGFAhGCFyQ0QCgQMiPEE48IuKToQEWFAQAAKJSwI0ADE5EIzQSASaAHm3xUXABoMaYhCBpmBYiQkgFGgAIswAn0YAPCizMIIAEI4EcgDgI1/RS4AyLBEIBMMHo4qrOIBwIIjWhgw+CIwjIoCCXII9NKTIRkaBwpYAKBjIBgkGyCSmGLzn5IHACJ4+RdlhswADigIaFCk8ZQVSf5ZURBxxI8rXGg0nbGlsUAxLAQcqKHQSIQAGqS4FtgDsgjGAqmYAKCAx5jdUj4EhaJwxwEBJrjsNgNjQlmFTDgAqJBl9z/pDMOkBEDQJCAAOw==',
"capacity":		imgPr + 'R0lGODlhDwAQAOZ/AKqlmopuQKyMVpqETFdGI3psSqaXe6ySVczJwpWKcqSdjuLf2aWKWWdQLJqUhYRxQ3tjQLy3qtnTzk09IlpVRod9aP38+mFLLMLBtJ2FW/f38qmOXKWKVpd7RpuOaaKGVN7c1vTz7m5bMpODXHdfN////o12QqqPWqOFRaeNV5d9TotzRYtxQmhVLoBnP62PWJl6Sop1Rf7+/f39/aKhmqiGVI9xRaSHUph+TZGAZJyFYWFTP21WOqiLXY9ySuzp5J+MVJF4SZR5SOLh3Z2AVGVOJ722pfHu525iNrCkiLSvoLe3sk1EKcS7ZVlKNF9XPpF0SH59aczIv/n595GCaXdqMW9qUIVpPGFSNI99Tp6LWnJaK2tVMmpfPquKWNTLxMvGuKSRWKuPXefm4u/s6aGLUqSPUDsvGISBb3ttQIJnN7iuYYBsN5iQe4lrPIVwTZF+TIuAXPPz8/b19WJUKKCCUaKMYpmBULCTW5mAVJ2HU2NFJpp8SVZBIZ1+TP///yH5BAEAAH8ALAAAAAAPABAAAAfsgH+CfyFSVkoIDksyQwgWglMRCR5rdDwXbRFoURh/cxUtF2xNdHsuTxVgITQlDg0rKy5VSA8EFAoSMnIyCXYnLCoHYSJnFBgzg0cjQFkiDDEEE1gAMoMWcVVpLSQtRS4kfQDIfwsjbA8PJBB5KgFbBAB/GgZ3dRspH0QMHTZXF0wavmjhAwPPCwEfOJgI4uaCk3kfYLDgIOBFihQDBqjpU0GGDj81fEDhIEaMECE4uEwA8ScDCgE9OJwQw4BFBhc7FghKYubGhwMvDpSBk6YLS0FkPOgxUcfLgBgFHIwZJOiHkRwQ3lBRoJPqn0AAOw==',
"unlockedl":	imgPrPNG + 'iVBORw0KGgoAAAANSUhEUgAAABMAAAAQCAMAAADDGrRQAAAAAXNSR0IArs4c6QAAAYBQTFRFAAAA/sSU9XQV+4Ym/ta2/d3D9nEN/3kB7qsT/+LI/+ra8LMc/qJS8bti/ePP/4ES/7p+//37/vPq/+HG/c+t/pY8/+XN/eHM9deD9oMv/8CI+3oO/7h5/4MVq4xa9oQwp4ZS9n4n///+/5Mz/7Rx7JwW8MdK9+Kz8a8R/atl//fw+Iw5996g/byI7ak6/uTR+uvI++zP8bAs+ee38Lgc9Kwe78Nw//Tq+KFi+JRJ/30I+eSu/frx+oAg/PTg/+3E7Z8E/6RU6Y4H+HUS99WMuZFU+JxZ7J0t/tGr/u7j7qgE/7Jt/6le920E+9mH/KNZ+n0X+okw//v4/9Cl64MF6oQI8cs+6Y0PpYE8++zJ/+7IqolU88JY9chU765H8bMWzYYdmHtL+u/S++7U/+jU/d/J/9q68L4o88V666YN/4AP76oK17h89duh+XMJ9t2m9r9l//Xt/phA/XkK+3UG++Kn9tKF//v3/6BM8cxa+7F3//Hk8LBO+u3B9slM65cFJqizLQAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AsOFwYDc4wxCQAAANVJREFUGNNjYEAA82AeUU1WQSQRpWoZK2npElsRJMFCmeIqcX3dADYWhLI0dkYQ7ZFnCRcLkmLmAtGComxwsXKVQE8wo8iXQYtLTFhYmDNFrMKWFSzGo83gZsTvqCzLnyWr7M0iBBJjFWFQDKuNNLCPMky2s2FMhZojmV4pIZEjl5uvniQlDhWTN1GLjUlUMCvTMRbgg4nFc3Bzyynw8mZYI8Q0uE1No11rClxK4WKS2ZkcHAkR7npxfj4wMUUvh3qnkNBwVaM6K5gdFmxMUODsLwQRAgAIGCOyrkYbMQAAAABJRU5ErkJggg==',
"locked":		imgPr + 'R0lGODlhDAAQAOZ/APvx0qmIUvnqtc2ra//Fk/+bQ/p2Cf6xZvuROvp+HP15CZ6AT/6GHfV1GPRnAP+4ePnpuP54AfGtS/nowu2dFv7Opv/aufvmqu+0DfXEXvGuQPtzAfCvE/RoAf/y6P7Gj+2ZFfeWT/XCQf+RMPTRfvS7X/nqxMOaW/zbw/iQQOeDBumLB/qlZPPFVvK+NP/JmPjmve7PNf2WP/bYkPK/We2dBf+hTv7x6PvKpfydT/TThv2rWP7y6fmNOv/DjvnqwPK2If/Qpvd5GPDAHvbdo//r2Pvfp//hx/K8Yv+1c/25dfDVR/+iUPLTb/+/humQE+mQGfCiHvyFIvrciPz35u+lEeeDCvhuAemOD/+rYP+vaPHKVPO0OPO6PPvhu/CtIvjnuPTHcu/IK/LEb/uTP/+7f//Mn/C6F/zBkvXblvjovu+lBOuUBvh3D//XtPG3Se2dLv+pXP7fwPXYmv+fSvKrF/fSg/fotPRrB/qlQP+oW/9/DfqMNcGZV//z6f///yH5BAEAAH8ALAAAAAAMABAAAAesgH+CFQUMDExHgoosGwoIPQZ7boo4VzIegjxkI0WCKQp+in83Bk6CCTaignxxp1qqfwhZfyhtBRZBLwQEaFJ6fnhcXh9KBwc7eUZyZg5Ldz9qMBMmAgBUPg4xTSQ6AwNzRGAAZQ5iWy00CwtjJGkQDw5DLl1vfSdIYTMC8GdAdVEBAkgoYedCEgcYOFQB8QQKHA0ZptDpsKYGmxUqrGCh8EVEhBANQooUKSRHIAA7',
"unlockedr":	imgPr + 'R0lGODlhEwAQAOZ/AP7ElPV0FfuGJv7Wtv3dw/ZxDf95Ae6rE//iyP/q2vCzHP6iUvG7Yv3jz/+BEv+6fv/9+/7z6v/hxv3Prf6WPP/lzf3hzPXXg/aDL//AiPt6Dv+4ef+DFauMWvaEMKeGUvZ+J////v+TM/+0ceycFvDHSvfis/GvEf2rZf/38PiMOffeoP28iO2pOv7k0frryPvsz/GwLPnnt/C4HPSsHu/DcP/06vihYviUSf99CPnkrv368fqAIPz04P/txO2fBP+kVOmOB/h1EvfVjLmRVPicWeydLf7Rq/7u4+6oBP+ybf+pXvdtBPvZh/yjWfp9F/qJMP/7+P/QpeuDBeqECPHLPumND6WBPPvsyf/uyKqJVPPCWPXIVO+uR/GzFs2GHZh7S/rv0vvu1P/o1P3fyf/auvC+KPPFeuumDf+AD++qCte4fPXboflzCfbdpva/Zf/17f6YQP15Cvt1Bvvip/bShf/79/+gTPHMWvuxd//x5PCwTvrtwfbJTOuXBf///yH5BAEAAH8ALAAAAAATABAAAAfRgH8QBCgUC1I2f4qLjIITPHMaGjkbeiGNjAMFTywuFnlyG3CYizhtR4wABmWXpAUUEIwJAhlRpH9McY1IUCN2tyoLjQQ8dxVjCBLKFQkpEwSMEUUxDkAiHA5pHCJKA5hkIFV8WC8+WTBiPTsAmBYYZngXF2sdbG4mYRmYDR4zJVxbwHyoUWeFjAf7PHg5oEBBhw8MGJzRgbARvxMKaNDQQmTPmyF0KjJqgEENmgMHvlwx0qJLkyXtQCT54SfIFCpWSMTokwNThBsFAggdKlSIk0AAOw==',
"external":		imgPr + 'R0lGODlhCgAKAKIFAAChAf+AALjogArGASnGAf///wAAAAAAACH5BAEAAAUALAAAAAAKAAoAAAMlWFrRvoMsNsNYAWgQBAZKVwhXxnhCQ5gCkYIXOAaFXE+3su1LAgA7',
"insidev":		imgPr + 'R0lGODlhEAAQAPcAAAAAABAQEBgYGCAgICgoKDg4OEBAQFhYWGBgYHBwcH9/f/8AAP4ICP4wMP5AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiSAP8J/KdAAICDAAQoGMgwwMEBBgwMOBiA4b+DBSz+K3BwoEMEGgUiAFAxAQADAxksWMBgoAEACRwOXNmgwcqBJAEQEKiSIUuBBA4eELjAAUMHCwQeEErU6ECkSg/u/NdzZst/QWUSXVDzpkCSJlHyXHn138sE/z6G/Dey4lcAGS1yBGDRIQCIEimGLIgw4cKBAQEAOw==',
"outsidev":		imgPr + 'R0lGODlhEAAQAPcAAAAAAAgICDAwMAB/DkBAQBCGHBiKJCCOKyiSMziaQkCeSliqYGCuaHC2d3++hQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiSAP8J/OfAwICDAww4GMiwwMEDChQcOFiA4b+DCSz+S3BwoEMGGgUyGFCxwQAFAwMAABBgoIIBDRwOXClAwMqBJAcgEKiSIUuBCA4uEAiAAEMCAAQuEErU6ECkSg/u/NdzZst/QWUSBVDzpkCSJlHyXHn138sG/z6G/Dey4tcBGS1yHGDR4QCIEimGLIgw4cKBAQEAOw==',
"centermap":	imgPr + 'R0lGODlhEAAQAPcAAAAAAAATfwx0FRB3GRZ8Hxh9IRl+IxQu/yQ+/yBG5S9J/0NZ/0Ve/0xj/2B1/xyAJSOELCmJMzCOOTaRPzeSQTuURT+XSE6gVk+gV1alX1ukal+pZmGsaXe4fnizvIC9h5up/5LHmJvLoKXQqbjbvKLjqbj/osvT/8LgxcvlztXq2ODv4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiHAAMs+EewoEGDDgIgOMiwIIMADRo2VBAAhESGBwKc+DeBwkWCAQJoKBDAwoqLI0KaCBCCwAeGKyxIKBEgQQATJi5AQFHwA4EQOD2oxGniwYZ/AirgDMmUKE4OA1JA+OC0Ks4HPP9doGAVZwYJJwuKeGA1QoeGKswSfUDiYwYKGCR8LGjAQMOAADs=',
"distl":		imgPr + 'R0lGODlhDAAMAPcAAAAAACpIgjJWmTdkqzhstDh0uzh7wEdhklJkiFRmiUNjoUhwsFJwqFZ7t1J/vTiExTiMyTiUzTWn1FmEv0mAwEiGxEeVy0CYzlOUy1aVzFacz06x2FKh0nCWxnyey2+k0X+hzHiq1Hus1VvB317D342pz4q02Jew0pW62qOuxajT5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAMAAwAAAhZAP8JFDiCxMCDAlVIkLAB4cELESJwcDjQAgQIGgZ+CCHCBAoMD0Jm+GegpMmTBioUWMmyZQEK/zp4AFHihAMCOCdQXDBgQAOKCgQIYEAxRYAABygKRJAAYUAAOw==',
"distr":		imgPr + 'R0lGODlhDAAMANUqADh0uzh7wDhstDiExTWn1DJWmTiUzTdkqypIgjiMyVvB33CWxlacz0eVy0CYzkdhkn+hzG+k0Yq02I2pz6jT5Hiq1FJwqHus1Zew0laVzFRmiVZ7t06x2FKh0lJ/vUiGxFOUy1JkiFmEv0NjoUhwsHyey17D30mAwJW62qOuxf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACoALAAAAAAMAAwAAAZIQJVQaFIMj0IOgUBBCjsGg8OpYiQSDWpmwAWhJJdKRPUJmM/owAnAbrsBKpFg7sFMIKXFcHM4kKhCFgUFI4AqDwgIKYYaIUhBADs=', // Distance Icon - RTL servers
"merchant":		imgPr + 'R0lGODlhCgAMAPcAAAAAAAAEBQQAAAACCw4GEwARAA8TAg8WDgQZEg8cFRMLAB0WBB0aCRwgHxQ0KSYoGywhHTUvHyInKy0tISwsJC45Kys+PDo1IjM1MjgyNBxFMzNFNzlLMyJMQjZISjxbXj94aU8/L0c6MUZFM1BQTktXY1xkT0V5Y0B4d1B2a2JfQGxeQ2xlS25sXXFsWHl6anR6el+LjmKupFXRyW3NyXLTyoKAZ5GHbpSRcJyXeZ6bfJqRgJ+Xio+hi6eZjq+qjaWikbOti7GtlLiykKamsrvEp8XFoczXt9POsdjUt83Hy+LW2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAKAAwAAAhuAP/9W7HggQqBCIOEgJBBwQ2E/3L4WEJAwA6ISEQoIWKhQhKIPBp4QNGBA8R/G1LQkKGhCEIbBU7MqAGih0AjBgKUiPEhgRCIMAY4QHAA4Y8WGCQcMTEBiEAWESiQ+DfkAgMdAl2MeCGQAQMcAQEAOw==',
"palisade":		imgPr + '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',
"citywall":		imgPr + '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',
"earthwall":	imgPr + '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',
"rallypoint":	imgPr + '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',
"upgr0":		imgPr + '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',
"upgr1":		imgPr + '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',
"upgr2":		imgPr + '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',
"upgr3":		imgPr + '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',
"reload":		imgPr + 'R0lGODlhEAAQAPcAAAAAAB82YSlGfTBTlDZgpjhqsjhwuDh3vTh+wjiHxjiOyjeXzjSo1TK12pqmv7CytLKztpKrzp2rx5G726Cyz6u40r/AwqLH4aPL46zM4qHS58rKzMrKzcvMzszMzsLH0MbM2N3e38ze683n7uDh4eDh4uLi4uHi4+Pj5OXl5ubm5+bn6Ozs7e/v7+/v8PDw8PDw8fLy8vLy8/T09AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiVAP8JFDhjBouBCBPKaNBgxImECVVoYBBjBcSEIhZgSHERoYkLCjKEGIgCBoqBJFy4SJBggsoSJV4kePHwXwsEOHMiUJnTRYl/HFQcGDpUhVCiB1QI7LDCgFOjTqM+FehhRYEVHDisUBGhQAGjHAZW7TDQQgUCFMJ2FMhBwgAQD9YCVSHAgdqOED4ECKBU7lwVG/yuDQgAOw==',
"smap":			imgPr + 'R0lGODlhDAAMAPcAAAB/DgAm//8AAP/YAICAgP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAADAAMAAAIPgAJCBxIcKAAAQQKKEy4kMBBhgUgClyoMGKBAAEmWqSIUaPEih5BgmSYcMAAiSQLmEQJAMDHhi1fRixIk0BAADs=',
"addbookmark":	imgPr + 'R0lGODlhEAAQAOZ/APV+AfaRA/748/qdVfvKpvl0CvV6APunC/54AvZ8JP/7+P/t3f/9/P/49PijB/2rDv/59P3Dk/7z6v/ewP/HaPeBAvx7DP/u4P62OPzBVv+xSfidBv3o2f/Kc/eQRf/z6fyiM//cr/7q2fSPAfuwKvzQsP/FYvuLBf2uDv+xa//69fuLDv++T//9+/V1Fv+4cP25QvR2APmwJv/VkPSDAPWgAvyqDf/Kmv67RvecBf/lzf/w4v/KcfRpAf/37/iPQf/MlPaEBv/Vp//dpP/gxPipB/q0gP/YtfvJo/eiDvzLpf/isf/Nof/XsvzUtv/IbP+mRP2pEf6sE/+vF/iaVfyfUv+TJf+vGPqoGP/17P717v/VmPusbvmLNPytbv2safaCLf+9dfuZJPhvAf+jU/+mV//DXP/RhvWUAv/Xk/WBAP/38vehBvmmCf2pDvV5H//Lnf/8+fy6RP2XP//+/fafBP7AV//lz/+ybf+/U/++Uf7CWPx9CvRpBP/27v///yH5BAEAAH8ALAAAAAAQABAAAAezgH+Cg39ZO4SIiE0piY0QeAgijYgTYSBck4MKEVsZBReIDAo+C3dHQkMUYnM3RAt+cUxlZC9AIUtpT3saUFZ8BV4qVSswHTNnPCZmdnIyQT9afwwDFVgYLHl6OCRJAD8Ngy0DYwdSU1dRGz0e4IQfFm4PNg8HOX0ciToIKG1sDg51YjhJBOdEETQGDASoQcNIoi8B1CQgUAIMgBFUEnVxEUGAIAVI3iSgQ0iBEgmJ1hBoFwgAOw==',
"addbmthispage":imgPr + 'R0lGODlhFwAQAOZ/AP/69v+rQ/l8GPV+AfaEMf/RlfqKL/2qDP3Zvf/Kmv6SMvuuI/738f/x5v/kzf/m0vacBP/48v/PgPlxBfumZf/v4f717fu7i/dxCv/27//HlP/BivWRAv/GZv/59faEA/mscf/8+vmlCP16CfyMBf+1MvzHnv/BW/ZsBP/Fkf6ubf/Ytf+DFfulYvuzef26RP7n1fypZv///v/s3f7q2fqhWv/9/P57B//Sqv+zb/mAIf/fwv/69f/+/f+6ff7dwv6mWv2HIf6zLP/VsPvLqP+sYv/Oif2taf+fSfZ/JvigBvR4APicWPqpGf+LJP6/VPuWB//UpPmna//coP/frP/79/mvef7r3feNQPSMAf/juPy3gPhzCPeTSfyWQv+aQPyhL/7z6vmeDPvBl/qpbfusbviECf2qaPeiEvqmH/2pYv/AdP/o1f+uZ/6jNP+oWv+zXP/hx/zRsfuTHP7Xtf/Ylv/Lc//Ej//NoP/Ibf+/eft5DP58DPq4h/+9gv///yH5BAEAAH8ALAAAAAAXABAAAAf/gH9/PAkbgocAFRmHgkM4EYdVGgqQjBU+OIx/AG13kD0rLJWMO3pHNpo8RRshGUgqmn8NGkYCP7EJCjMafAiHMiFVO1F1YDEVHj2HcSxnTgYwIQ8PDjsreFp1JyNfPikadCFsBjojLX8efgFwawVUUxIdTwFuc2ZlkGoYNzWCHlsT0rzIY6fDiRcL0HwAwUAQkAn8EPVBIWZBiRJCmkAYYKWhoDdcbpxD5ILEgZMHlHyQ4lFQDi5BDDxglMCkiJtKBlywpEDHGQy+BFXJAUUEhwEcIGRhEubQjj0UZqAgc6iBl41YxnRZwoEAjUMqUFwJAUKAB0EOMCQhYuFPBjkEKZbc+lNFAIgQbikYOEvDRANNFkzAoKuAwiJBFlzs/IMqlg1lG1y0/RMIADs=',
"addbmspacer":	imgPr + 'R0lGODlhEwAQAOZrAP/+/f/8+vZrAPumZP/59f/7+P/JmP+SMf57B/x0APhuAPmAIf7r3fuiWvlvAP/69f/Gkvy0ef/BivqCIv727/+rYf/Ej/3ZvP/Ci/2qZ/dyDPdxCPqRPvumYv56CP/s3f6RMvytbPulYv58DP/t3f95AfqmZ/+JIP/9/Py8iv6nWv2NLvp+F/mIL/+EFvmKMv/hxv+aQPuxeP+uZ/VrBPqtcf/Sqv/GlPyqaP/69v+oWvhxB/uyef/Aiv/48//17f61ePxzAP/p1f/27/mrcf2QMf+MJv/27v7s3f57CP+LJPqpbf/Ytv/48vdtBP/9+/dsAPhyB/3Kov/79//59P/Wsv+CFP7n1f3YvPqILv/t3Pd4F//ewf3l0/+fSPyUPvt5DP/VsP/48f2pYv6vbfhzCP2HIf+IH/+mVv717f+wa////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGsALAAAAAATABAAAAengGtrDwYSgoeIYTZihwU3RVSIkjkzFk1rAEwuPpKdDxUYAUdeIZ2mBgcfECMXpp0wVjhKWVcorodPQisLHiKYt4hjGwgNaydnQUBVMSUJJGhGCV9rKjvEaw4KAjJSDlACDBPaHGs6UUkdwJJqZWYtXeqCWgcLGRpY8WtcYCZINEv5yDhhEKDGFgLqprAgEmDNkAEvEAIwVQDEAAqHfvBIcatHhDSCAgEAOw==',
"editbookmark": imgPr + 'R0lGODlhEAAQAOZ/AP/x5P7z6v7t3/SdBv/8+fq3hv/lzv/69P/cvP/17PiYUffYS/VuCfpzBfhuAfV5HfVqAffZhf/Fkfq8jvmqcf/7+f7p2PZ/KfV2Gf+3d/K/NvVqBPeuKP738fu+j//+/fZyEP/38f/Djv+cRfngqP/38PVzE/nplfbcb/+zb/isMf/Hlv+9hPXaZvTCSPTRYfnWZfeCKvXHWf+4efq6jPffefp+HP+gS/WcEfXTav/o0/jhiPbcaf+MJ/7IkvrbofVxEP/GkvXUJP/Qpv/TrPyrVfLMJf+uZvfQPPfhZvmwevz03P7v5P7m1P/Ytf7ox/PCQvadIvzJovLLQvjNTvnaafjWUvveqvjaU/G4Hf/XtO/DHP1+EPixNf2gUfu5XP+oW//jyv/kyvzln/2xcfZxEPdvBv+SMvqdMPSYFPafF/u9jPjUX/XMLf53Af+8f/qHKvnnifvqw/SeCv7q3P+JIP/u3/+fS/nWbPnfo/vuzP7uz//Il//LnP/o1P///yH5BAEAAH8ALAAAAAAQABAAAAfYgH+CgwRBd3aDiX8fJYs6TiIsBH8Jk4IJWnxhRAgAe24jK2deAoIARwB9Fno5UzVPEmNmTYNDGSdQUSBlaRpJHBSJGWIaGxMBARMbWW0xlwYpcg4TiR4OLQ5rATdvBi8gHYkhXBFVag82aFRbQOGDB3URC3MmAVIMRhAeiQg9KBAFLAiCg8dFAxEhDhiQ8IPNhURkvsSRUQTMDB9XlqhQMshPgwUckPDIQ2IHjC5CMAj8I0DBAwoXIGCxguMCBQYKSgkiwORPhQIDBtCo8IeOJUUsMTxwlygQADs=',
"closeButton":	imgPrPNG + 'iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABMZJREFUSEu1lXtQlFUYxg+jIIXoBMw04vpH2i6sOoIkDgTeYBAFC2uhsBKScNcJqqGRSwiKEitXEa8tStSMOYOQkaloIFPCtGDo4AUQBANUZIGNm6i7sDy956yidvurvtlnzvu9531+z5z9vtm12BXoBVuryczG0oqNjBrFOtVqErOxsmTTabW1tmTiAn1gIQpYgJnGLdj4OJjRNMYM4+PswZiJ3Tea2LBxlN0zjhFjsljvEZPFrvTG6OgoxsbGJlZe/1cK91sBlrTKG0MXtejS5EB/rBD9pCHSSMmXeFBSCMO3hTCSRo//SY/6Bpq5T7pH80PFZr++qFDw+s+dQrjPUrDtq5dMhPTQRl9+NgZIw4ezcZ/0sCDnH2UoyBl5SDMjpCES93E/5zwOCVvuBZYW8OQkui+y0KfJQr8mE8P5mdBsjkXw26oJaWJjYSzIQn5s3LN9mhuiee7rI4buYNZEyPqlHmBqChmsqcKt3FTc3Z2KnrxU6PfswODeHVC8pYTJZMI4PWEuHqiJifnb/gB5uI/7u4hzO/dz6E8fx3uei8AyVnuhv/oc2tPicUsdjy5Sz854/J4ejwPR0QLMXwIexld+z18Ufs8VErpJzPXRvI58Xeo4dBKrXZ2A3tKjeNfdFSzd3wN9FafQHKdEW7wKHQlK3PlMCV2iEoPJKhxQKQXYYDDAaDROrLzmAfuVGzGQpEQ3zd8mXzv5OaclToW73xxGqIucvi5fd9w9WYL6SAXqw9eg4f1ANJNuRgSiN0qBvqhg7AsPE0Hd3d3Q6XRCPGAv9Xs/5DMKtG0w+66FB6I+bA0uE689PxfBzrPBUjzlaNifjWNSO5QtdEQF6bzbDNS+MgPXFkxDIylz5QrxHJ4O4aEZ1G+gfS4tzXMf9592dUSx9AVoYyLhN20KhXg442peOo5IrPHd7Odxcs5zKH/ZGuel1rgsnYRMX28R0N7eic7OJ+ro6KTTKZHh4y3mfqL5H+dYC/9x4hydNQXV0WHwtZn06CQHslAkm4bv59qibJ4tKufboHqBDTJWLRMBLS2taG01KyRUiRs3zDVfRRDNVdH8OfJxfylxiomn/TQCftOtwLZ5yXH90C6ULnRA2WIHVHja47yXPWqW2omAhsYmNDWZxQMyg3wEuPFRv5H6/F67xE74KjzsBeeEmwPqElXwd7Cmn5VX5Wg9sgdnfGahcpUE1YES1AZJcOnNmcgKXSkAj8Xvm99xRPa6v/YvvjETta9JUBUgQaW/BOX+L6F+ZwxenzkVbIv3XHSUHESVwhk165xQF+aEyx/I0LBJhuaPZGiLkf6rWj+R4nqUDFdVMtRHyFC33gla4mg3LMbFfdsQNv9FOsmyebhzQoNfI91Qt9ENlzYtRFOCC1qSXNCR7YLf0l1wM80FrSnmHt9riHXF1RjXZ+orH7uiPnoRrmz2FRzO4yGcz75WeGPk9FfoLdqKntIU9P6QAv2pbeg/m4z+ymQMVpFqkzB8KRFDF5Iw+EsyBn6mvXLqP1Xrz2yF/qxa+AWHeJzL+Wx3gDuKQ5fg0Fp3JCyXYouPFNtXO0GtkCMjRI70YLmo1WvlSAtyRuoaZ7G/1V/2TJ3kJ0Wir1mcw3mcy/nmf73/4bqQlzr1MfYPNcKdTI8iX3wAAAAASUVORK5CYII=',
"minButton":	imgPrPNG + 'iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABHtJREFUSEu1lXlQlGUcxx+PGM0jO8WybMILddnFpnTAtDSnpqZj0tGZnI6xEq0YrzxQIWkByxQQMQSVAIHFRUUOFS8OWUDQRZCFZV1CXOISnClvOfbT82zWTH/pH/nOfPd53t/z+32+7/udnXn7zI7Kwm3wY8Jt8FDhNmiw6DdgoOjTt7/o26+/kD/igS5nr3A6ewS9PcJ5947ounlDdN24Jq63NAq3IcOEmDXnE7q7u+np6XkoUnwx/cMFlF7qYG/5ZVLPOkg1N2OsaMVY1cbBqg4OVXeQWd1JtkWq9io5NZ3kqPWesuV9luUqmRc6XP3pF9rYd74VQ0ULRfUdKL6Y9v7H/5vJgcor/zE5bb+C4guf9+Y/NBP1JoovprwzD9PFdnad/o09RQ0kljaSVOYg5VyLjK4FY2WbjO4KRhmHUUaXLqMzSqXL+FQtXdWr2jFUtpMiY04pb2bvGYeLc6quHcUXk2d/RL61le35dewosBFTYCdOmu0ubiShtImk8haSpWGKuZXUirZ7anetKWalVtd5Ylkz8aUO15ya31lYT66lDcUXk974gKMXmvnxcDWbj1jYkltL+HErkXl2ovLr2VHYQEzRJWKLL0s5iFMqaSK2xOG6jzU18os8j5Z9qn/bKRsRJ+rYeqyWjIomFF+Mfu1djGUNrEwtY5WhnDX7zKzbX8H6jCqCsqoJzrEQcqSGsFwrYcfq2HTMxqbjNsKk1Loptw790VqCD9cQlG0hMKNSzp9nrdFMosmO4ouBnjNYlWJixOIERvon8sKyZDy+S2Ps2nTe9Atlzny/B9LsJaFoAjMZJ+c8VqYxankyX+4qQPHFI+Om821CIY9+FsuQhbsY5hfP098k4b7MwJx5i+jt7cXpdN5Xc+XDPB9wkBHLUnlGzj++OJ4F0SdRfOE2fgZLk0wMXbiHJ7/6leFfJ8rGNJ5bf9BlYrfXU19/f82dv4iRodmMDJRGK9Jwl0afxuSh+GKA5+usNpQw3C8B9yUqLgOj1h7gxZAcl0ltrRWr9f5SJi9FnMQjNIdRAQdkXAa+2JmP4ouh2rcIkiZjlhvxWJ7GGPnK46XBBDkwc+XPqOEH0cw14XjuKWJi5Ek89YcZuy6DJfHFKL4Y4TOPrfuL8QnOQRNwCK/gI3hvPYV3XAneqefQZZ1He7waTb6VicU2JpTa8DwrVWZjYpHNVdedsOCdWYl3mpmXd5vQReSh0x9l6d4yFF9MX7jhb5OIQt6OKMA3Uir2DD7JZnzl33dK3kVeNTXwirkRncWBrqYJL+vv6Gqb0FU7XHV1PjXfztScaqbJB/ONk/OSt3pfJYrvMomt6SDmUidRzX+QXNdGvNzHyv22zpvo/7yN763bjO7qwr2ni6d6uxnk7MZNapDcPyFrz969w2jZ43vtFj90XndxFE9xXSaen2/gH032j0Djp0frH4Z2xWa8A8LRbYhEG7QN3cYoNPrtaEKkQqOZFBKNlz4K7feReAWG4xWwBe2qn9D4hzLJb+O/TMV2ffiW5lrlZ/DhXX8BmUnqCVosKVcAAAAASUVORK5CYII=',
"maxButton":	imgPrPNG + 'iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAABGdBTUEAALGPC/xhBQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAABERJREFUSEu1lQ9MlGUcxx/UmBqRWy1iBi0NFeE4IBMGAVZjbbX+LAqbzdpoglYIlvw5SSwk/v8RiBk5To4/h5z8BwEPkAMhhAPiBO84OP6GcQdSyUToDvj2PK+DDWeDrflu3/f3Pu/v+X2+v+d533evkWdqOYxNnibGJqbE+EkTsnHzFkKIETHauIls2LCJ0BMdr3FgiWBxgSwtUf0zTwz3Z8nS4iLR35uhukvIm16HYTAYsLCw8FjE+MT9g0/ROjyFnPZRiOVjEHfexuWOCRQptChR6FDSM4WKW3dwRck0jSrVNCpUf3KRid2rpPnynjsoU0yimNax+oLOcTRqJsH45LX3Dj1WE8YnLu8e/E+TU/GZ+Oig37oURucur6SwU7uyEsYnTm97o7lfhwtNg8i8PgRR6wiy239Hrnycg+v1eu6ZrSU2N79rAnm0LofWi1qHca1vAoxPHD0/RINqAmkNfUiXqXFeNsCZCVuGOZP1vhRsbvaNUVxsGUFm8xAymgZQc/MPMD6xff19VN+8jZgrPYir6kVCjRJJUjVSr6lXmXz8ydFHbttyE8wkXTZI6/qRXKtG0lUliumLxPjkZbd3IGkbwrfiNgTltyOkoBOniroRXtLNQbVaLXQ6HXcdK1UhlgJipP2Io408nI+ovIXwUgXCirshkHRARFfD+GSLtQeC8pphfjQLL/iLYBmYC6ugAtgILsPLe7WJW4wUbnF1cI+vh1tsHbweasLxTDlsBYXYHSzBDso5klEPxidP7HbH11mN2Pp5Bp7yuYBtfkKYHc+BxclLnMno6BjGxsZo174cdJW8fVflrUKLaJNimPvn4llfIQ6lXQXjE+M9HgjIboapTyaeOXIRZl+KsD2kAJaR5RxwYEADjUbDxUeJ5ZhYE1YRZdgZXASLADG2HxPhcHotGJ9stj6A4PxfYeaXhedpwjIwHy9GVGBHcjVnolSqoFKtLWayN7Yae06X0e0uxEvHxfD5RQbGJ6b8txBOTaxOSLDzxCVYCYqxK1EK658b8EZoEtfheuQZlAB+WgN40TWwDa+A9ckiHBPSHaJ8Yu7ijcTCFuyjCZ6gFHY/VMHhfBMc8uRwKO2CvbQXdg0q2FxXY29bH6zlDyIb28v68EpdL/ZVKuAk6YKT8AacU2XYH1XL8QJzWsH4xN3nO87ENboWbilNcD0ng3OOHE7lCjjXq+HUPIhXO0Zg3zMGvnIcfBUVjWy8v3MELvTLdmnUwKNKCQ+JAgeE8gccyguW/AbG50yiuqeRPjSFc+N/I3RyBgm6GQT/NQvXe/dhNTcHC4Mezy3osW3RgK1LBhhTscjGZjRnOT+PXbNzcLs7y9UzDuMx7oqJo38ylsXzOwu7gCjwg+PBFySCfzoZ9t+ngBeRBl7kT+D9SBVJr8+mgU/vszw/LAn2IXTuN9HgfxUJ2y/OwOaz0BWRlC6tyVo/vv+b/xcAf9f/4T3A6wAAAABJRU5ErkJggg==',
"def1":			imgPr + 'R0lGODlhEAAQANUgADtsLWU+ALt+IOTLpjdcANDczPL399ClY6/CxNXEqLzO0MLU1lppANStcFl6MpmusEJsH+jw8avAo39tFCucAD5GAJqjYpR4Tezz9IVRAMGymdDh4znQACF6ABZPACyhAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACAALAAAAAAQABAAAAaOQMXGACoaj4aNELGJHI+RDROzeQA82CwW8NhgQAtAp/P5cDjlMWBh9IzL53THc3STzejPmN5+4+V8RRB+cXodEEcObnB5cw5HFgR3hR0EFk8MHoxlHgxPAxMEmx8EEwNGDQIZFZpxHhUZAg0gA6oBGhIeFBQeEhoBsQMHGbdFBVgFRb8ZBwkXGk9PGhcJQQA7',
"def_i":		imgPr + 'R0lGODlhEAAQALMLANDh45musLt+IIVRAOO2AL2OAEQoBXFDB8p6Em9DCZdZCv///wAAAAAAAAAAAAAAACH5BAEAAAsALAAAAAAQABAAAARIcC1Fa7pYLlS7TxIHeF+oBCNJgZtioKrCcseblq1SwzhH7YRepUYoCDqzTs0wOK40vl+teWCZPMuq5qrUbrmW7xbhu4jFlHMEADs=',
"def_c":		imgPr + 'R0lGODlhEAAQAKIHAEQoBZmusMp6EtDh43FDB29DCZdZCv///yH5BAEAAAcALAAAAAAQABAAAANNeGfc9VAd0aotitqNZx3gQDhZAwYBOBqddgJAGowtMwQAod90adw524zlA654RI8BgDQmPQTYSPpU6hjXqpIj6Woqna5EoHmIzwsDOgEAOw==',
"att_all":		imgPr + 'R0lGODlhEAAQANUgALzO0P/SAIGXmeTLpuzz9PTimdStcPL390RSU5R4TdXEqMLU1ujw8dClY6a0tt7AXIaNjnqLjeTHXL/S1IVRAMGymeXSmbt+IK/CxGU+AJmusOO2AN7q672OAHGIitDh4////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACAALAAAAAAQABAAAAaRQMDnACoaj4ePEPNhHI+MD5Pw0Xw4TxCn+iGAFh/B9bgVL4wYgGes/XgAmKcAs+ZsPRhBFuTRrN1+WQVFHhOAHkWDRhYbbX0eECAbFkcWHQGHCA4BHZRHHRuPCBEeGx1PAxegAUUBphcDRgYXFBkdoKYdGRQXBiCptRUgFg8SlBW7sA3BeyDIFA0KCcLNzgkKQQA7',
"bulletBlue":	imgPr + 'R0lGODlhDAAMANU4AABDx2F1/wA8/3KD/wA2/wBBxwBV/ABT9gBJ4IeT/wA8sgBExQBBuB5G/wNBzQBQ7QBO5ABAwgBH3xtS/wBDyQBIywA9uWh7/wA9qQBT8gJE/73E/ztd/wAx/x9f9WZ5/wBFvQA4nQA+tQBK4wBQ4wBD/wBG/w1X9QBGzABCvgA4pgBDwgBJ/wBL3gA6pQBT/wBP/wA5oQA//0B6/wBF/wA5pABT9ydP/////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADgALAAAAAAMAAwAAAZyQJwQF6u5YsNhTZSKFBaM2jBmQcxYJEgL4BIqJLPBxmYwPFa4EIh1fdFKJlpLpaKMMm4BoXGTpVQoBzZuBDcBNx0VMQuCMDINAQk3EwU4DAg2jhwJAzceQjUAD44XHzczDkMuKy02AhonqUk4GAopaENBADs=',
"bulletGreen":	imgPr + 'R0lGODlhDAAMANU3AAG/AACxAgOpAFTlcWjkgwDZEgGpAEXnZAWdAAbtJgWoAATWAAXRAADZFwOXAATKAAfBAAfjCgihACDqPQbOAAKdAEvmaQXCAAaQAAC+AASaAADZGwOrAAHbAALtE0nmaADZDAatAADbDQLBAJvfqQWuAAGlAADZCAWGAAS9AALZAAONAASiAAWlAADZAgDZBwWJAADZCgDZDyXqJwTSAA3sKwSMAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADcALAAAAAAMAAwAAAZxwJvwBrPZYMOhTcMyGRQI2xBWAcxekEtKIL05MrMBibZYPFo3lOR1VcVAp1hqteKMKO5CI1GTsVYlDDRuDTUHNRshMAqCLjIJBwQ1HgY3CAA0jhMEAzURQjYCD44WHzUzAUotKTQFIh2pSTcYDixoQ0EAOw==',
"bulletYellow":	imgPr + 'R0lGODlhDAAMANU4ALJ6AP/zcs2VA/arAOCdAP/3h//RAP/eHsWHALh9AP/LAP/wYceKAPywAMeMAO2lAMyNAOOgAJ1qAN+eAP/PG//xZqlyAP/FAsmNAP/BAL1+AOSdAPKmALmBAPWyDf/WALV8AMuJAP/EAPW7H//jO+OaAP/6vcKIAP/waKVwAKZzAN6aAMKFAP+4AP+0AP++AL6CAP/LQKRvAKFtAP/CAP/IAPerAP/eJ////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADgALAAAAAAMAAwAAAZyQJwQN5OlZsOhDAQ7ORAJ2XDWIcRepc2KkRICJrGAydZoPFg4ieZ1ddFEGdpKpcJEOG6F4XCrwVQQAzZuBjcLNx8hMwiCLTUHCwU3FA44CQQ2jiQFATcjQjIMD44oFTcxAkMpLCs2ChceqUk4FgAwaENBADs=',
"bulletRed":	imgPr + 'R0lGODlhDAAMANU4AMcbAP+XYbIWAMUYAPYgAP9BALgVAP+zh/whAP87AMcaAOAfAP+jcv9fHs0jA+0fAP8xAKkSAN8gAP/Vvf9OG+MaAOQcALUWAP80AP+baMkbAL0TAP90O/VCH8IbAOMgAPIdAP82Av+bZssWAPUvDZ0RAP9GALkZAMwZAN4dAP8oAP8kAL4WAP8uAMIXAKYVAKUTAP8yAKQTAP84AP9fQKESAPcgAP9kJ////wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADgALAAAAAAMAAwAAAZyQJwQV5PBasOh7MLyAAYG2bB2WtBaFUtKARMKJDTGxIZAPFy40qZ1XcUwkFjq9dJ8QO5EoXGbsV4oBDZuBTcBNyYjNQOCKjMNAQc3FAA4Bgs2jhwHDDcdQjIKD44ZIjc0DkMwLik2CSEkqUk4EQIsaENBADs=',
"bulletGrey":	imgPr + 'R0lGODlhDAAMANUhAMrKyqqqqunp6bi4uOTk5J+fn62traenp+Hh4bOzs76+vt/f38HBwaCgoLu7u9TU1PX19cfHx8nJyZWVlZubm7S0tKKioqSkpNXV1bKysqampqmpqc3Nzby8vJiYmL+/v5mZmf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACEALAAAAAAMAAwAAAZnwJAw5PGAPMOhp3HRbA4WpNBjSWA+lUpmAxIWMhgCpKNQDDShyeVz/bjdGRBoU3G8PwDO5wIKdDpvHAt6AR4Hf24ACwIcEhshVYAfDwIEHBFTGwNuCAgcGAZDIBoZkgyhSSEUBU1JQQA7',
"del":			imgPr + 'R0lGODlhEAAQAPcAAAAAAJoIBZQ2LZ8xKZw+NqMDAa0NCaEVDqkfGbwFArsKB7oPCrIVC7IUDbgSDrcYEqslGq8iHb8kFrgkHKYvJKc1LLU+Lb4/MLBFM5hKQZVWT55gWaRMQqpZSaNjWrpgUqxyZqlyaqV9d8IHBcwEA80GBM8KBcMVDc8bD8YbEdQOD9MSCdURD9YREdUSEdYYEtQeFNkWE9oYEtgeFdkfFtwcFMElGtAjFd0gFt4jF90mFd4rHcIyIOAjF+ElGOEnGeIoGeIpGuIrG+AtG+MvG+QpGuQrGuUsGuYvGuYuG+MwHOcwGuc0HugxHOgyHek1Huo2H+w5H+Q1Iuk7I+w4IO46Ie89IfA/IshHKc9LK8JJOsVNO8tONsxIMdJCKeBHJelFJO1BI+9FJO5JMfBAIvFBI/FCI/NEJPFFJvRHJfdNJ/hNKPpSKfpTK8JcTclcRsxcSM1pVsN9dtB+cK6Jg7aQiM+ZktSViNWjmcOrp8S2s8W9u8i4tNanodqxqNqxqtqxrOC+udPFw9nS0NjT0t/c2+TKxebQyujSzuPd2+Pe3enV0O3e2+vj4ezl4+ro5+7o5+zr6+/t7fHk4fDs6/bt6vTt7PXu7fPy8fXy8fX19Pf29/n08vr29fr6+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAjcAP8JHEjw3585dw4J9AMnDh5OBPucmNImyyVLXcagEfNmksBAC1asYYMFEiULUq6UMcNlEaIHJs6o+VJHIB8KOqpYueJlAokoacCA2DRwEAEUUKhUWYKETJgOkgo+2sBAyZOkVTAoKigwk4AAQ5o4YfKBq0A5BQwEMXIkCRE3lQraSTACR48bKYAUEaKF0UBACkjIqAHDg4YGOXz8uCDQkI0SLGK84CAJk4gDM3BIaNRpyw4WLVxUSDRQTwYIIf454kFDhYoIggpqKiTQE50BDhDkMVsw0h5CvAcGBAA7',
"bau": 			imgPr + 'R0lGODlhCgAQALMJAJyfokhLU5xmNlRXXl0xCnN2fMzNzX9LHY6RlP///wAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAkALAAAAAAKABAAAAQwMMlJq73i4ENs7tV3cVdCludkAEiaGMWADAUyxUENGNKcI7ve4BeUDGsG3oSGUFIiADs=',
"ww":			imgPr + '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'
}

	//update script (by Richard Gibson, changed by ms99)
	function updScript() {
		var divUpd = newDiv("<b><br>&nbsp;" + T('CHECKUPDATE') + "&nbsp;<br>&nbsp;</b>", [["style", "position:absolute; top:200px; left:120px; display:block; padding:1px; z-index:50; clear:both; border:2px solid #C0C0C0; background-color:black; color:yellow;"]]);
		var aD = get(dmid1);
		if (aD) aD.appendChild(divUpd);
		if (!GM_getValue) return;
		GM_xmlhttpRequest({
			method: 'GET',
			url: TB3O.url + '?source', //don't increase the 'installed' count; just checking
			onload: function(result) {
				removeElement(divUpd);
				if (result.status != 200) return;
				if (!result.responseText.match(/@version\s+([\d.]+)/)) {return;}
				var nv = RegExp.$1;
				if (nv == TB3O.version) {
					alert(T('NONEWVER') + ' (v' + TB3O.version + ') !');
					return;
				} else if (nv < TB3O.version) {
					alert(T('BVER') + ' (v' + TB3O.version + ') ?!');
					return;
				} else if (window.confirm(T('NVERAV') + ' (v ' + nv + ')!\n\n' + T('UPDATESCRIPT') + '\n')) window.location.href = TB3O.url;
			}
		});
	}

	function addAttr(aElem, att) {
		//Acr111
		if (att !== undefined) {
			for (var xi = 0; xi < att.length; xi++) {
				aElem.setAttribute(att[xi][0], att[xi][1]);
				if (att[xi][0].toUpperCase() == 'TITLE') aElem.setAttribute('alt', att[xi][1]);
			}
		}
	}

	function newTable(att) {
		var aTb = document.createElement("TABLE");
		addAttr(aTb, att);
		return aTb;
	}

	function newRow(iHTML, att) {
		var aRow = document.createElement("TR");
		aRow.innerHTML = iHTML;
		addAttr(aRow, att);
		return aRow;
	}

	function newCell(iHTML, att) {
		var aCell = document.createElement("TD");
		aCell.innerHTML = iHTML;
		addAttr(aCell, att);
		return aCell;
	}

	function newImage(att) {
		var aImg = document.createElement("IMG");
		addAttr(aImg, att);
		return aImg;
	}

	function newLink(iHTML, att) {
		var aLink = document.createElement("A");
		aLink.innerHTML = iHTML;
		addAttr(aLink, att);
		return aLink;
	}

	function newInput(att) {
		var aInput = document.createElement("INPUT");
		addAttr(aInput, att);
		return aInput;
	}

	function newDiv(iHTML, att) {
		var aDiv = document.createElement("DIV");
		aDiv.innerHTML = iHTML;
		addAttr(aDiv, att);
		return aDiv;
	}

	//does nothing. Used when there is no other choice but need to use a function
	function dummy() {return;}

	function getRndTime(maxrange) {return Math.floor(maxrange * (0.6 + 0.4 * Math.random())); }

	//name of a file from a path or URL
	function basename(path) {return path.replace(/.*\//, "");}

	//returns the element with the aID id (wrapper for getElementById)
	function get(aID) {return (aID != '' ? document.getElementById(aID) : null);}

	//multiply every element of the "a" array by "n"
	function arrayByN(a, n) {
		var b = arrayClone(a);
		for (var i in b) {b[i] *= n;}
		return b;
	}

	//return a copy of the "a" array
	function arrayClone(a) {
		var b = new Array();
		for (var i in a) {b[i] = a[i];}
		return b;
	}

	function arrayAdd(a, b){
		if(!a) return arrayClone(b);
		if(!b) return arrayClone(a);
		var c = new Array();
		for (var i = 0; i < Math.max(a.length,b.length); c[i] = a[i] + b[i++]);
		return c;
	}

	//Remove the "elem" element from the current document
	function removeElement(elem) {if (elem && elem.parentNode) elem.parentNode.removeChild(elem);}

	//move the (elem) element from the current parent to the destination (dest) node of the DOM
	function moveElement(elem, dest) {
		removeElement(elem);
		dest.appendChild(elem);
	}

	//Sum all the values of the arr array
	function arrayToInt(arr) {
		var h = 0;
		for(var i in arr) {h += arr[i];}
		return h;
	}

	//insert a referenceNode after a specified node
	function insertAfter(node, referenceNode) {node.parentNode.insertBefore(referenceNode, node.nextSibling);}

	//Create a new element of the DOM (type and innerHTML)
	function elem(tag, aContent){
		var ret = document.createElement(tag);
		ret.innerHTML = aContent;
		return ret;
	}

	//convert a number to local string
	function getLS(aX) {return aX.toLocaleString();}

	function find(xpath, xpres, startnode) {
		if (!startnode) startnode = document;
		var ret = document.evaluate(xpath, startnode, null, xpres, null);
		return xpres == XPFirst ? ret.singleNodeValue : ret;
	}

	function getCrtServer() {
		crtPage.search(/http:\/\/(.*)\//);
		TB3O.fullServerName = RegExp.$1;
		TB3O.gServer = TB3O.fullServerName.replace(/\.travian\./,'');
		return;
	}

	function getCrtUserName() {
		var uLink = find ("//div[@id='" + dleft + "']//a[contains(@href, 'chatname')]", XPFirst);
		if (uLink) TB3O.crtUserName = uLink.href.split("|")[1];
		return;
	}

	function getCrtUserID() {
		var uLink = find("//div[@id='" + dleft + "']//a[contains(@href, 'spieler.php')]", XPFirst);
		if (uLink) TB3O.crtUserID = uLink.href.split("uid=")[1];
		return;
	}

	function getLanguageAndPlusStatus() {
		var imgPlus;
		if (TB3O.T35 == false) {
			//for Travian older versions
			imgPlus = find("//img[contains(@src, 'plus.gif')]", XPFirst);
			if (imgPlus != null) {
				imgPlus.src.search(/\/img\/([^\/]+)\//);
				TB3O.language = RegExp.$1.substring(0,2);
			}
			if (find("//img[contains(@src, 'travian1.gif')]", XPFirst)) TB3O.plusAcc = true;
		} else {
			//for Travian 3.5
			imgPlus = get("logo");
			var ahref;
			if (imgPlus != null) {
				if (imgPlus.nodeName == "IMG") {
					TB3O.M35 = 1;
					if (imgPlus.className && (imgPlus.className == "plus" || imgPlus.className == "logo_plus")) TB3O.plusAcc = true;
					ahref = imgPlus.parentNode.href;
				} else if (imgPlus.nodeName == "A") {
					if (imgPlus.firstChild && imgPlus.firstChild.className == "logo_plus") TB3O.plusAcc = true;
					ahref = imgPlus.href;
					TB3O.M35 = 2;
				}
				if (ahref) {
					var aLang = ahref.split(".");
					TB3O.language = aLang[aLang.length - 1].replace("/", "");
				}
			}
		}
	}

	function getGMcookie(aName, addNewDid) {
		var nC;
		if (addNewDid && addNewDid == true) nC = TB3O.gServer + '_' + TB3O.crtUserID + '_' + aVillage.vNewdid + '_' + aName; else nC = TB3O.gServer + '_' + TB3O.crtUserID + '_' + aName;
		var gmcookie = GM_getValue(nC, false);
		return decodeURIComponent(gmcookie);;
	}

	function setGMcookie(aName, aValue, addNewDid) {
		var nC;
		if (TB3O.crtUserID != '0') {
			if (addNewDid && addNewDid == true) nC = TB3O.gServer + '_' + TB3O.crtUserID + '_' + aVillage.vNewdid + '_' + aName; else nC = TB3O.gServer + '_' + TB3O.crtUserID + '_' + aName;
			if (aValue) GM_setValue(nC, encodeURIComponent(aValue)); else GM_setValue(nC, false);
		}
	}

	function appendGMcookieValue(aName, values, addNewDid) {
		var newValue = '';
		for (var i = 0; i < values.length; i++){
			if (values[i] != ''){
				newValue += values[i];
				if (i != values.length - 1) newValue += '$';
			} else return;
		}
		var valC = getGMcookie(aName, addNewDid);
		if (valC != "false" && valC != '') valC += "$$" + newValue; else valC = newValue;
		setGMcookie(aName, valC, addNewDid);
	}

	function removeGMcookieValue(aName, indexNo, reloadPage, aFunctionToRunAfter, addNewDid) {
		return function(){
			if (confirm(T('ELIMINAR') + ". " + T('AREYOUSURE'))) {
				var valC = getGMcookie(aName, addNewDid);
				if (valC != "false" && valC != '') {
					valC = valC.split("$$");
					valC.splice(indexNo, 1);
					valC = valC.join("$$");
					setGMcookie(aName, valC, addNewDid);
					removeElement(find("//*[@id='" + aName + "']", XPFirst));
					if (reloadPage) history.go(0); else aFunctionToRunAfter();
				}
			}
		}
	}

	function deleteGMcookie(aName, addNewDid) {
		setGMcookie(aName, undefined, addNewDid);
	}

	/**
	 * Create the path of the image, taking into account the possible graphic pack
	 * Params: ref Relative path of the image
	 * Returns: Absolute path of the image
	 */
	function img(ref, lang_dependant) {
		var imgPath = '';
		if (ref == 'img/x.gif') {
			imgPath = ref;
		} else if (!lang_dependant) {
			imgPath = localGP + "img/un/" + ref;
		} else {
			imgPath = localGP + "img/" + TB3O.language + '/' + ref;
		}
		return imgPath;
	}

	//get the vID of the cell having the x,y coordinates
	function xy2id(x, y) {return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));}

	//Inverse function for xy2id(x,y) => id2xy(vid) - fr3nchlover.
	function id2xy(vid) {
		var arrXY = new Array;
		arrXY[0] = (vid%801?(vid%801)-401:400);
		arrXY[1] = 400 - (vid - 401 - arrXY[0]) / 801;
		return arrXY;
	}

	//Compute the seconds for a given human time
	function toSeconds(hTime) {
		var p = hTime.split(":");
		return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1);
	}

	//Custom log function (log level, message to log)
	function log(level, msg) {if (console != undefined && level <= TB3O.LOG_LEVEL) console.log(msg);}

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
			}
			ht += h + ":" + (m > 9 ? m: '0' + m) + ":" + (s > 9 ? s : '0' + s);
		} else ht = "0:00:0?";
		return ht;
	}

	function getNewdidFromLink(aLink) {
		aLink.search(/\?newdid=(\d+)/);
		return RegExp.$1;
	}

	function getDidFromLink(aLink) {
		aLink.search(/\?d=(\d+)/);
		return RegExp.$1;
	}

	//set the active village from the villageList
	function getActiveVillage() {
		var aV = find('//a[@class="active_vl"]/../../td/table/tbody/tr/td', XPFirst);
		if (aV == null) {
			aV = find("//div[@id='vlist']//table[@class='vlist']//tr[@class='sel']//a", XPFirst);
			if (!aV) aV = find("//td[@class='dot hl']", XPFirst);
		}

		var v = ['', '', '', -1000, -1000, ''];

		if (aV) {
			try {
				if (TB3O.M35 == 0) {
					v[3] = aV.textContent.replace("(", "");
					aV = find('//a[@class="active_vl"]/../../td/table/tbody/tr/td[3]', XPFirst);
					v[4] = aV.textContent.replace(")", "");
					v[1] = xy2id(v[3], v[4]);
					v[5] = find('//a[@class="active_vl"]', XPFirst);
					if (v[5]) v[0] = v[5].textContent;
					v[2] = getNewdidFromLink(v[5].href);
				} else if (TB3O.M35 == 1) {
					v[3] = aV.parentNode.parentNode.cells[2].textContent.replace("(", "");
					v[4] = aV.parentNode.parentNode.cells[4].textContent.replace(")", "");
					v[1] = xy2id(v[3], v[4]);
					v[0] = aV.textContent;
					v[5] = aV;
					v[2] = getNewdidFromLink(v[5].href);
				} else if (TB3O.M35 == 2) {
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
					}
				}

				aVillage = new xVillage(v[0], v[1], v[2], v[3], v[4], v[5].href);
			} catch(e) {
				getActiveVillageFromCookie();
			}
		} else {
			getActiveVillageFromCookie();
		}

		function getActiveVillageFromCookie() {
			//get the singleTown villageId from the GM "cookies"
			var singleTown = getGMcookie('singleTownNI', false);
			if (singleTown != "false") {
				var sArray = singleTown.split("|");
				var vNewdid = getGMcookie('singleTownNEWDID', false);
				var xy = id2xy(sArray[1]);
				aVillage = new xVillage(sArray[0], sArray[1], vNewdid, xy[0], xy[1], 'dorf1.php?newdid=' + vNewdid);
			}
		}
	}

	//used to move down the resource field/building upgrade tables
	function deltaTopY(aTb){
		if (TB3O.T35 == false) {
			var topx = 0;
			var rightx = 0;
			var leftx = 0;
			var middlex = 0;
			var menux = 0;
			var mapx = 0;
			var maxTopY = 0;
			var middlex1 = 0;
			var middlex2 = 0;
			var navix = 0;
			var docElem;

			docElem = get(dTop1);
			if (docElem) topx = parseInt(docElem.clientHeight);
			docElem = get(dlright1);
			if (docElem) rightx = topx + parseInt(docElem.clientHeight);
			docElem = find("//td[@class='menu']", XPFirst);
			if (docElem) menux = topx + parseInt(docElem.clientHeight); //+60
			docElem = get("navi_table");
			if (docElem) navix = topx + parseInt(docElem.clientHeight) + 30;
			docElem = get(dleft);
			if (docElem) leftx = topx + parseInt(docElem.clientHeight); //+60
			docElem = get("lmidlc");
			if (docElem) middlex = topx + parseInt(docElem.clientHeight);
			docElem = get(dmid);
			if (docElem) middlex1 = topx + parseInt(docElem.clientHeight);
			docElem = get("lres0");
			if (docElem) middlex2 = topx + parseInt(docElem.clientHeight);
			docElem = get("ltbw1");
			if (docElem) middlex2 += parseInt(docElem.clientHeight);
			docElem = get("lrpr");
			if (docElem) middlex2 += parseInt(docElem.clientHeight);
			docElem = get("ltrm");
			if (docElem) middlex2 += parseInt(docElem.clientHeight); //+170
			docElem = get("lbau1");
			if (docElem) middlex2 += parseInt(docElem.clientHeight);
			docElem = get("map_content");
			if (docElem) {
				docElem = docElem.firstChild;
				if (docElem) mapx = topx + 10 + parseInt(docElem.clientHeight);
			}

			maxTopY = leftx;
			if (navix >= maxTopY) maxTopY = navix;
			if (menux >= maxTopY) maxTopY = menux;
			if (middlex >= maxTopY) maxTopY = middlex;
			if (middlex1 >= maxTopY) maxTopY = middlex1;
			if (middlex2 >= maxTopY) maxTopY = middlex2;
			if (mapx >= maxTopY) maxTopY = mapx;
			if (maxTopY < 0) maxTopY = 0;

			maxTopY = maxTopY - Math.floor(topx * 3/4 - 30);
		} else {
			var dfooter = get("footer");
			if (dfooter) maxTopY = dfooter.offsetTop;
		}
		return maxTopY;
	}

	function calculateResourceTime(need, procWidth) {
		var maxTime = 0;
		var boolTb = false;
		var cSt0 = 'font-size:8pt; ';
		var cSt1 = 'text-align:' + docDir[0] + '; ';
		var cSt2 = 'text-align:' + docDir[1] + '; ';
		var cSt3 = 'color:#404040; ';
		var cSt4 = 'color:#000000; ';
		var cRst1 = cSt2 + cSt0 + cSt3;
		var cRst2 = cSt2 + 'font-size:6pt; ' + cSt3;
		var cVst1 = cSt1 + cSt0 + cSt4;
		var cVst2 = cSt2 + cSt0 + cSt4;
		var cRTstyle;

		var resTable = newTable([['class', 'tb3tbnb']]);
		if(TB3O.M35 == 2) resTable.setAttribute('style', 'width:' + procWidth + '%');
		for (var i = 0; i < 4; i++){
			need[i] = need[i] - 0;
			var restante = need[i] - crtResUnits[i];
			if (restante > 100000) cRTstyle = cRst2; else cRTstyle = cRst1;
			if (restante > 0) {
				var tiempo = -1;
				if (prodPerHour[i] != 0) tiempo = Math.round(restante / (prodPerHour[i] / 3600));
				if (tiempo < 0 || capacity[i]-need[i]<0) {
					maxTime = 'Infinity';
					var aCell = newCell(gIcons["r" + (i + 1)], [['class', 'tb3cnb'], ['style', cSt1]]);
					var bCell = newCell(' ' + restante +' ', [['class', 'tb3cnb'], ['style', cRTstyle], ['id', "timeout" + i]]);
					var cCell = newCell(' ' + T('NEVER') + ' ', [['class', 'tb3cnb'], ['width', '220'], ['style', cRTstyle]]);
					boolTb = true;
				} else {
					if (tiempo > maxTime && maxTime !='Infinity') maxTime = tiempo;
					tiempo = formatTime(tiempo + 5, 0);
					var aCell = newCell(gIcons["r" + (i + 1)], [['class', 'tb3cnb'], ['style', cSt0]]);
					var bCell = newCell(' ' + restante +' ', [['class', 'tb3cnb'], ['style', cRTstyle], ['id', "timeout" + i]]);
					var cCell = newCell(' ' + tiempo + ' ', [['class', 'tb3cnb'] , ['width', '60'], ['style', cRTstyle], ['id', 'timeouta']]);
					boolTb = true;
				}
				if (boolTb) {
					var aRow = newRow("", [['class', 'tb3rnb']]);
					aRow.appendChild(aCell);
					aRow.appendChild(bCell);
					aRow.appendChild(cCell);
					resTable.appendChild(aRow);
				}
			}
		}

		if (maxTime == 'Infinity'){
			var xRow = newRow("");
			xRow.appendChild(newCell(T('LISTO'), [['class', 'tb3cnb'], ['style', cSt0 + cSt1 + cSt4], ['colspan' ,"2"]]));
			xRow.appendChild(newCell(T('NEVER'), [['class', 'tb3cnb'], ['style', cSt0 + cSt2 + cSt4]]));
			resTable.appendChild(xRow);
			boolTb = true;
		} else if (maxTime > 0) {
			var tiempo2 = formatTime(maxTime + 5, 0); // a 5 seconds addition to compensate differences between JS timer and server
			var aDate = new Date();
			aDate.setTime(aDate.getTime() + (maxTime * 1000));
			var xRow = newRow("");
			var txtDate = computeTextTime(aDate);
			xRow.appendChild(newCell(T('LISTO'), [['class', 'tb3cnb'], ['style', cSt0 + cSt1 + cSt4], ['colspan', '2']]));
			xRow.appendChild(newCell(txtDate, [['class', 'tb3cnb'], ['style', cSt0 + cSt2 + cSt4]]));
			resTable.appendChild(xRow);

			if (TB3O.boolShowUntilthenResidue == '1') {
				//added by Velonis Petros - start of addition - the until then row
				var uthen = new Array(4);//Obtained until the max time
				//the residue row
				var residue = new Array(4);//Obtained until the max time
				for (var i = 0; i < 4; i++){
					uthen[i] = crtResUnits[i] + Math.round(maxTime*prodPerHour[i]/3600);
					residue[i] = uthen[i] - need[i];
				}
				var uiHTML = createCRrows(T('RESOURCES') + " " + txtDate, uthen);
				var riHTML = createCRrows(T('RESIDUE') + txtDate, residue);
				resTable.innerHTML += uiHTML;
				resTable.innerHTML += riHTML;
				//end of Velonis' addition
			}
			boolTb = true;
		}
		if (boolTb == true) return resTable; else return null;

		//added by Velonis Petros
		function createCRrows(aTitle, aV) {
			var aTb = newTable([['class', 'tb3tbnb']]);
			var xRow = newRow("");
			var aCell = newCell(aTitle, [['class', 'tb3cnb'], ['style', cVst1 + "border-top:1px solid silver;"], ['colspan', '3']]);
			xRow.appendChild(aCell);
			aTb.appendChild(xRow);
			for (var i = 0; i < 4; i++) {
				var yRow = newRow("");
				var bCell = newCell(gIcons["r" + (i + 1)], [['class', 'tb3cnb'], ['style', cVst1]]);
				var cCell = newCell(aV[i], [['class', 'tb3cnb'], ['style', cVst2], ['colspan', '2']]);
				yRow.appendChild(bCell);
				yRow.appendChild(cCell);
				aTb.appendChild(yRow);
			}
			return aTb.innerHTML;
		}
		//end of Velonis' addition
	}

	function computeTextTime(aD){
		var dtNow = new Date();
		var h = ((aD.getTime() - dtNow.getTime()) / 1000 / 3600);
		h += dtNow.getHours() + (dtNow.getMinutes() / 60);
		var timeR='';
		if (h < 24) timeR = ""; else if (h < 48) timeR = T('TOMORROW'); else if (h < 72) timeR = T('PAS_MANYANA'); else timeR = T('ON') + " " + to2Str(aD.getDate()) + "/" + to2Str((aD.getMonth()+1));
		return timeR + " " + T('AT') + " " + to2Str(aD.getHours()) + ":" + to2Str(aD.getMinutes());

		//convert to a 2 digit string (time representation)
		function to2Str(n) {return (n > 9 ? n : '0' + n);}
	}

	function calculateTime(needed){
		var maxTime = 0;
		var aTime = 0;
		for (var i = 0; i < 4; i++){
			var restante = needed[i] - crtResUnits[i];
			if (restante > 0){
				aTime = Math.round(restante / (prodPerHour[i] / 3600));
				if (aTime > maxTime) maxTime = aTime;
				if (aTime < 0) maxTime = 'Infinity';
			}
		}
		if (maxTime > 0 && maxTime != 'Infinity') maxTime = formatTime(maxTime + 5, 0);//5 sec delay for JS timers
		return maxTime;
	}

	//add the fill time row
	function addFillTimeRow() {
		var tbe = get('l4').parentNode.parentNode;
		var beforelres = tbe.childNodes[0];
		var aRow = getFillTimeRow();
		tbe.insertBefore(aRow, beforelres);
	}

	//compute fill time
	function getFillTimeRow() {
		var timeToFillRow = newRow("");
		for (var i = 0; i < 4; i++){
			timeToFill[i][0] = -1;
			var strTtoFill, strColor, strTime;
			if (prodPerHour[i] < 0) {
				timeToFill[i][0] = Math.round(crtResUnits[i] / (-prodPerHour[i] / 3600));
				strTtoFill = formatTime(timeToFill[i][0], 0);
			} else if (prodPerHour[i] > 0) {
				timeToFill[i][0] = Math.round((capacity[i] - crtResUnits[i]) / (prodPerHour[i] / 3600));
				strTtoFill = formatTime(timeToFill[i][0], 0);
			} else if (prodPerHour[i] == 0) {
				timeToFill[i][0] = -1;
				strTtoFill = "Infinity";
			}
			if (strTtoFill == -1) {
				strColor = "#008000";
				strTime = T('NEVER');
			} else if (timeToFill[i][0] <= 0) {
				strColor = "#FF0000";
				strTime = strTtoFill.blink();
			} else if (timeToFill[i][0] < 7200 || prodPerHour[i] < 0) {
				strColor = "#FF0000";
				strTime = strTtoFill;
			} else {
				strColor = "#008000";
				strTime = strTtoFill;
			}
			timeToFill[i][1] = "<span id='timeouta' style='font-weight:bold; color:" + strColor + "; white-space:nowrap;'>" + strTime + "</span>";
			var prodStr;
			if (prodPerHour[i] < 0) prodStr = "<span style='color:#FF0000'>" + prodPerHour[i] + "</span>"; else prodStr = "" + prodPerHour[i] + "";
			var aCell = newCell('(' + prodStr + ', ' + timeToFill[i][1] +')', [["style","font-size:9px; text-align:" + docDir[0] + "; padding-" + docDir[0] + ":25px; white-space:nowrap; vertical-align:top;"], ["colspan","2"]]);
			timeToFillRow.appendChild(aCell);
		}
		return timeToFillRow;
	}

	//the translated xLang item if available
	function T(xT){
		var rV = '---';
		if (xLang[xT] != undefined) rV = xLang[xT];
		return rV;
	}

	//get current resource units, capacity of warehouse/granary, production per hour
	function getResourceInfo() {
		crtResUnits[4] = 0;
		prodPerHour[5] = 0;
		var intImg = 0;
		for (var i = 0; i < 4; i++){
			var a = get('l' + (4-i));
			if (a != undefined && a != null) {
				//get current resource units
				var resIppH = a.textContent.split("/");
				crtResUnits[i] = parseInt(resIppH[0]);
				crtResUnits[4] += crtResUnits[i];
				//get capacity of warehouse/granary
				capacity[i] = parseInt(resIppH[1]);
				//get production/h for this resource
				prodPerHour[i] = parseInt(a.title);
				//sum of production/h for this village (crop = effective production)
				prodPerHour[5] += prodPerHour[i];

				//get the resource names
				if (i > 0 && TB3O.T35 == false) intImg = 1;
				//try to get resource titles
				var aS = a.previousSibling;
				if (aS) {
					var cellImg = aS.previousSibling;
					if (cellImg) {
						var resImg = cellImg.childNodes[intImg];
						if (resImg) xLang['RES' + (i + 1)] = resImg.title;
					}
				}
				if (i == 3) {
					//get the real crop production of this village (last cell of the row)
					var cpRow = a.parentNode;
					var intLastCell = cpRow.cells.length;
					var ccCell = cpRow.cells[intLastCell - 1];
					if (ccCell.id == "l" + (4-i)) {
						var cpTable = cpRow.parentNode;
						var intLastRow = cpTable.rows.length;
						cpRow = cpTable.rows[intLastRow - 1];
						intLastCell = cpRow.cells.length;
						var ccCell = cpRow.cells[intLastCell - 1];
					}
					var arrCcTxt = ccCell.textContent.split("/");
					//the real total crop production of this village
					prodPerHour[4] = parseInt(arrCcTxt[1]);
					prodPerHour[6] = parseInt(arrCcTxt[0]);
				}
			}
		}
	}

	//change the browser title, get active village coords and coords for the cell/oasis/village opened from the map
	function getCrtLocation() {
		var crtLocTitle = '';
		var locX;

		if (crtPage.indexOf('dorf3') != -1) {
			//the dorf3 page
			crtLocTitle = T("ALDEAS") + " (" + aVillage.vx + "|" + aVillage.vy + ")";
			TB3O.xCrt = aVillage.vx;
			TB3O.yCrt = aVillage.vy;
		} else {
			locX = find("//h1", XPFirst);
			locXx = find("//span[@id='x']", XPFirst);
			locXy = find("//span[@id='y']", XPFirst);

			if (locXx) TB3O.xCrt = parseInt(locXx.textContent);
			if (locXy) TB3O.yCrt = parseInt(locXy.textContent);

			if (locX && locXx == null && locXy == null) {
				var aH = new Array();
				var theName = locX.textContent;
				var ipLast = theName.lastIndexOf(")");
				if (ipLast + 1 == theName.length || ipLast + 2 == theName.length) {
					if (ipLast > 0) theName = theName.substring(0, ipLast + 1);
					ipLast = theName.lastIndexOf("(");
					if (ipLast != -1) {
						aH[0] = theName.substring(0, ipLast);
						aH[1] = theName.substr(ipLast + 1);
					} else aH[0] = theName;
					crtLocTitle = aH[0];
					if (aH.length > 1) {
						var strXY = aH[1].replace(")", "").replace(" ", "").replace(" ", "");
						var aCoord = strXY.split("|");
						TB3O.xCrt = parseInt(aCoord[0]);
						TB3O.yCrt = parseInt(aCoord[1]);
						crtLocTitle += " (" + TB3O.xCrt + "|" + TB3O.yCrt + ")";
					} else {
						TB3O.xCrt = aVillage.vx;
						TB3O.yCrt = aVillage.vy;
						var strXY = "(" + TB3O.xCrt + "|" + TB3O.yCrt + ")";
						if (crtLocTitle.indexOf(strXY) == -1) crtLocTitle += " " + strXY;
					}
				} else {
					TB3O.xCrt = aVillage.vx;
					TB3O.yCrt = aVillage.vy;
					crtLocTitle = theName + " (" + TB3O.xCrt + "|" + TB3O.yCrt + ")";
				}
			} else {
				if (locX != null) {
					crtLocTitle = locX.textContent;
					var strXY = "(" + TB3O.xCrt + "|" + TB3O.yCrt + ")";
					if (crtLocTitle.indexOf(strXY) == -1) crtLocTitle += " " + strXY;
				}
			}
		}
		//change browser title
		TB3O.FXtitle = crtLocTitle.replace("\n", "").replace("\n", "").replace("\n", "").replace("\n", "");
		document.title = TB3O.OrigDocTitle + " - " + TB3O.FXtitle;
		return true;
	}

	//general function for getting info from the XPathResult
	function xpathResultEvaluate(searchFor, startNode) {
		if (!startNode) {startNode = document;}
		return document.evaluate(searchFor, startNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	}

	/**
	 * Function to get/post a page via asynchronous request (AJAX) to/from a server
	 * Parameters:
	 *	url: URL of the page to get from the game server
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
		}

		xmlHttpRequest.open(aMethod, url, true);
		if (aMethod == 'POST') xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
		xmlHttpRequest.send(param);
	}

	function getRace() {
		TB3O.crtUserRace = getGMcookie('raceV2', false);
		TB3O.dispUserRace = getGMcookie('raceCrtV2', false);
		if ((TB3O.crtUserRace == "false" || TB3O.dispUserRace == "false") && TB3O.boolIsAvBarracks == true) {
			//race cookies are undefined
			//enter the barracks
			var barracksLink = "build.php?gid=19";
			ajaxRequest(barracksLink, 'GET', null, function(AJAXrespX) {
				var aDoc = document.implementation.createDocument("", "", null);
				var aElem = document.createElement('DIV');
				aElem.innerHTML = AJAXrespX.responseText;
				aDoc.appendChild(aElem);
				var strToEvaluate = "//img[starts-with(@class, 'unit')]";
				if (TB3O.T35 == false) strToEvaluate = "//img[@class='unit']";
				var aValue = aDoc.evaluate(strToEvaluate, aElem, null, XPFirst, null).singleNodeValue;
				if (aValue) {
					//recognition of the race is done by the first image appearing in the table of troops that can be trained
					var tIndex = getTroopIndexTitleFromImage(aValue)[0];
					switch (tIndex) {
						case '1': TB3O.crtUserRace = "Romans"; break;
						case '11': TB3O.crtUserRace = "Teutons"; break;
						case '21': TB3O.crtUserRace = "Gauls"; break;
					}
					//set the GM cookie for the race
					setGMcookie('raceV2', TB3O.crtUserRace, false);
				}
			});

			//get the displayed race from the Profile page
			var profileLink = "/spieler.php";
			ajaxRequest(profileLink, 'GET', null, function(AJAXrespX) {
				var aDoc = document.implementation.createDocument("", "", null);
				var aElem = document.createElement('DIV');
				aElem.innerHTML = AJAXrespX.responseText;
				aDoc.appendChild(aElem);
				var aValue = aDoc.evaluate("//table[@class='tbg']/tbody/tr[5]/td[2]", aElem, null, XPFirst, null).singleNodeValue;
				if (!aValue) aValue = aDoc.evaluate("//td[@class='details']//table/tbody/tr[2]/td[1]", aElem, null, XPFirst, null).singleNodeValue;
				if (aValue) {
					TB3O.dispUserRace = aValue.textContent;
					//set the GM cookie for the display race
					setGMcookie('raceCrtV2', TB3O.dispUserRace, false);
				}
			});
		}
		switch (TB3O.crtUserRace) {
			case "Romans":	TB3O.deltaRaceImg = 0; break;
			case "Teutons":	TB3O.deltaRaceImg = 10; break;
			case "Gauls":	TB3O.deltaRaceImg = 20; break;
		}
		return TB3O.crtUserRace;
	}

	//Get general information
	function getGeneralData() {
		//game version
		if (get(dTop5) == null) {
			TB3O.T35 = true;
			setT35Constants();
		}

		//Path to the graphic pack (if available)
		//empty graphics set support added
		var cssDeclaration = find("//link[starts-with(@href, 'file') and @rel='stylesheet']", XPFirst);
		if (cssDeclaration != null) {
			var csshr = cssDeclaration.href;
			csshr.search(/^file:\/\/[^\/]*\/(.*\/)?(.*)\.css/);
			localGP = RegExp.$1;
			localGP = 'file://' + localGP;
		}

		getLanguageAndPlusStatus();
		getCrtUserID();
		getCrtServer();

		//log level
		var sLL = getGMcookie("consoleloglevel", false);
		if (sLL == "false") {
			sLL = "0";
			setGMcookie("consoleloglevel", "0", false);
		}
		TB3O.LOG_LEVEL = parseInt(sLL);
		TB3O.LOG_LEVEL = 10;

		getCrtUserName();
		getActiveVillage();
		getResourceInfo();
		setVillageRes(aVillage.vID, -1);
		//get special buildings cookie
		var spBcookie = getGMcookieV2("specBuildings");
		if (spBcookie && spBcookie[aVillage.vNewdid]) specBuildings = spBcookie[aVillage.vNewdid];
		//get the doc direction
		if (document.defaultView.getComputedStyle(document.body, null).getPropertyValue("direction") == 'rtl') {docDir[0] = "right"; docDir[1] = "left";}

		//server name & analyser server (wsSName)
		crtPage.search(/http:\/\/(.*)\//);
		var oldserver =  RegExp.$1;
		var crtServerX = oldserver.split(".");
		var strFirst = crtServerX[0];
		var strLast = crtServerX[crtServerX.length - 1];
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
		} else if (strFirst == "speed" || strFirst == "speedserver") {
			//all other x servers
			wsSName = strLast + "x";
		} else if (strFirst == "team") {
			//team server
			wsSName = "team";
		} else if (strFirst == "lv1") {
			//lv
			wsSName = "lv1";
		} else if (strLast == "com" && strFirst.indexOf("ae") != -1) {
			//ae
			wsSName = strFirst;
		} else if (strLast == "at") {
			//Austrian
			wsSName = "at";
			TB3O.language = "de";
		} else if (strLast == "org") {
			//org DE
			wsSName = "org";
			TB3O.language = "de";
		} else if (strLast == "cat") {
			//Catalunian
			wsSName = "cat";
		} else if (strLast == "net") {
			//Spanish
			TB3O.language = "es";
			wsSName = "net" + strFirst.substr(strFirst.search(/[0-9]{1,2}/));
		} else if (strLast == "fr" && TB3O.wsAnalyserOpt != "1") {
			//france3-exception fr3nchlover
			//france-exception Turio
			wsSName = "fr" + strFirst.substr(strFirst.search(/[0-9]{1,2}/));
			TB3O.language = "fr";
		} else if (strLast == "uk" || strLast == "us" || strLast == "com") {
			wsSName = strLast + strFirst.substr(strFirst.search(/[0-9]{1,2}/));
			TB3O.language = "en";
		} else if (TB3O.language == "cl" && strLast == "mx") {
			//mx
			TB3O.language = "ar";
			wsSName = strLast + strFirst.substr(strFirst.search(/[0-9]{1,2}/));
			TB3O.FmapLanguage = "es";
		} else if (strLast == "asia") {
			//Thailand
			wsSName = "th" + strFirst.substr(strFirst.search(/[0-9]{1,2}/));
			TB3O.language = "th";
		} else if (strLast == TB3O.language) {
			//all other normal servers
			wsSName = strLast + strFirst.substr(strFirst.search(/[0-9]{1,2}/));
		}

		if (TB3O.language == '') TB3O.language = strLast;
		if (TB3O.language != '') switchLanguage();

		adaptDataToGameVersion();

		//get some of the saved GM "cookies" and set as active if Setup has not been visited yet
		TB3O.wsAnalyserOpt = getGMcookie('wsanalyser', false);
		if (TB3O.wsAnalyserOpt == "false") {
			setGMcookie('wsanalyser', '0', false);
			TB3O.wsAnalyserOpt = "0";
		}

		TB3O.boolShowDistTimes = getGMcookie("showdisttimes", false);
		if (TB3O.boolShowDistTimes == 'false') {
			setGMcookie("showdisttimes", "1", false);
			TB3O.boolShowDistTimes = '1';
		}

		TB3O.boolShowStatLinks = getGMcookie("showstatlinks", false);
		if (TB3O.boolShowStatLinks == 'false') {
			setGMcookie("showstatlinks", "1", false);
			TB3O.boolShowStatLinks = '1';
		}

		TB3O.boolShowCellTypeInfo = getGMcookie("showcelltypeinfo", false);
		if (TB3O.boolShowCellTypeInfo == 'false') {
			setGMcookie("showcelltypeinfo", '1', false);
			TB3O.boolShowCellTypeInfo = '1';
		}

		TB3O.boolShowMapUserLinks = getGMcookie("showtravmapuserlinks", false);
		if (TB3O.boolShowMapUserLinks == "false") {
			setGMcookie("showtravmapuserlinks", '1', false);
			TB3O.boolShowMapUserLinks = '1';
		}

		TB3O.boolShowTravmapAllyLinks = getGMcookie("showtravmapallylinks", false);
		if (TB3O.boolShowTravmapAllyLinks == "false") {
			setGMcookie("showtravmapallylinks", '1', false);
			TB3O.boolShowTravmapAllyLinks = '1';
		}

		TB3O.boolShowTroopInfoTooltips = getGMcookie("showtroopinfotooltips", false);
		if (TB3O.boolShowTroopInfoTooltips == 'false') {
			setGMcookie("showtroopinfotooltips", '1', false);
			TB3O.boolShowTroopInfoTooltips = '1';
		}

		cTemp = getGMcookie('showbigiconalliance', false);
		if (cTemp != 'false') {
			if (getGMcookie("alliance", false) == 'false') setGMcookie("alliance", cTemp, false);
			GM_deleteValue("showbigiconalliance");
		}

		TB3O.showBiAlliance = getGMcookie("alliance", false);
		if (TB3O.showBiAlliance == 'false') {
			setGMcookie("alliance", '1', false);
			TB3O.showBiAlliance = '1';
		}

		TB3O.boolShowCPinUpgTables = getGMcookie("showcpinupgtables", false);
		if (TB3O.boolShowCPinUpgTables == 'false') {
			setGMcookie("showcpinupgtables", '1', false);
			TB3O.boolShowCPinUpgTables = '1';
		}

		TB3O.boolShowCCinUpgTables = getGMcookie("showccinupgtables", false);
		if (TB3O.boolShowCCinUpgTables == 'false') {
			setGMcookie("showccinupgtables", '1', false);
			TB3O.boolShowCCinUpgTables = '1';
		}

		TB3O.boolShowCCinVL = getGMcookie("showccinvl", false);
		if (TB3O.boolShowCCinVL == 'false') {
			setGMcookie("showccinvl", '1', false);
			TB3O.boolShowCCinVL = '1';
		}

		TB3O.boolShowPopInVL = getGMcookie("showpopinvl", false);
		if (TB3O.boolShowPopInVL == 'false') {
			setGMcookie("showpopinvl", '1', false);
			TB3O.boolShowPopInVL = '1';
		}

		TB3O.boolShowResBarTable = getGMcookie("showresbartable", false);
		if (TB3O.boolShowResBarTable == 'false') {
			setGMcookie("showresbartable", '1', false);
			TB3O.boolShowResBarTable = '1';
		}

		TB3O.boolFloatResBarTable = getGMcookie("floatresbartable", false);
		if (TB3O.boolFloatResBarTable == 'false') {
			setGMcookie("floatresbartable", '1', false);
			TB3O.boolFloatResBarTable = '1';
		}

		TB3O.boolShowUserBM = getGMcookie("showbookmarks", false);
		if (TB3O.boolShowUserBM == 'false') {
			setGMcookie("showbookmarks", '1', false);
			TB3O.boolShowUserBM = '1';
		}

		TB3O.boolFloatUserBM = getGMcookie("floatbookmarks", false);
		if (TB3O.boolFloatUserBM == 'false') {
			setGMcookie("floatbookmarks", '0', false);
			TB3O.boolFloatUserBM = '0';
		}

		TB3O.boolShowNoteBlock = getGMcookie("noteblock", false);
		if (TB3O.boolShowNoteBlock == 'false') {
			setGMcookie("noteblock", '1', false);
			TB3O.boolShowNoteBlock = '1';
		}

		TB3O.boolFloatNoteBlock = getGMcookie("floatnoteblock", false);
		if (TB3O.boolFloatNoteBlock == 'false') {
			setGMcookie("floatnoteblock", '0', false);
			TB3O.boolFloatNoteBlock = '0';
		}

		TB3O.mapAnalyserOption = getGMcookie("mapanalyser", false);
		if (TB3O.mapAnalyserOption == 'false') {
			setGMcookie("mapanalyser", '0', false);
			TB3O.mapAnalyserOption = '0';
		}

		TB3O.boolShowTB3BattleReport = getGMcookie("showtb3battlereport");
		if (TB3O.boolShowTB3BattleReport == 'false') {
			setGMcookie("showtb3battlereport", '1', false);
			TB3O.boolShowTB3BattleReport = '1';
		}

		TB3O.boolShowBRStatDetails = getGMcookie("showbrstatdetails", false);
		if (TB3O.boolShowBRStatDetails == "false") {
			setGMcookie("showbrstatdetails", '1', false);
			TB3O.boolShowBRStatDetails = '1';
		}

		TB3O.boolRemoveAdBanner = getGMcookie("removeadbanner");
		if (TB3O.boolRemoveAdBanner == 'false') {
			setGMcookie("removeadbanner", '1', false);
			TB3O.boolRemoveAdBanner = '1';
		}

		TB3O.bool2ndVlist = getGMcookie("showvl2table");
		if (TB3O.bool2ndVlist == 'false') {
			setGMcookie("showvl2table", '1', false);
			TB3O.bool2ndVlist = '1';
		}

		TB3O.boolUseNPCAssistant = getGMcookie("npcassistant", false);
		if (TB3O.boolUseNPCAssistant == 'false') {
			setGMcookie("npcassistant", '1', false);
			TB3O.boolUseNPCAssistant = '1';
		}

		TB3O.boolShowUntilthenResidue = getGMcookie("showuntilthenresidue", false);
		if (TB3O.boolShowUntilthenResidue == 'false') {
			setGMcookie("showuntilthenresidue", '1', false);
			TB3O.boolShowUntilthenResidue = '1';
		}

		TB3O.bRpr = getGMcookie("showrprinfotooltips", false);
		if (TB3O.bRpr == 'false') {
			setGMcookie("showrprinfotooltips", '1', false);
			TB3O.bRpr = '1';
		}

		TB3O.bMO = getGMcookie("showmesopenlinks", false);
		if (TB3O.bMO == 'false') {
			setGMcookie("showmesopenlinks", '1', false);
			TB3O.bMO = '1';
		}

		TB3O.boolShowIGMLinkForMe = getGMcookie("showigmlinkforme", false);
		if (TB3O.boolShowIGMLinkForMe == 'false') {
			setGMcookie("showigmlinkforme", '1', false);
			TB3O.boolShowIGMLinkForMe = '1';
		}

		TB3O.rpDefAction = getGMcookie('rpdefact', false);
		if (TB3O.rpDefAction == "false") {
			setGMcookie("rpdefact", '0', false);
			TB3O.rpDefAction = '0';
		}

		TB3O.boolShowSearchBar = getGMcookie("showsearchbar");
		if (TB3O.boolShowSearchBar == "false") {
			setGMcookie("showsearchbar", '1', false);
			TB3O.boolShowSearchBar = '1';
		}

		TB3O.boolFloatSearchBar = getGMcookie("floatsearchbar");
		if (TB3O.boolFloatSearchBar == 'false') {
			setGMcookie("floatsearchbar", '1', false);
			TB3O.boolFloatSearchBar = '1';
		}

		TB3O.bSaIeMa = getGMcookie("showaddinfomarr");
		if (TB3O.bSaIeMa == 'false') {
			setGMcookie("showaddinfomarr", '1', false);
			TB3O.bSaIeMa = '1';
		}

		TB3O.boolIsT2x = getGMcookie("serverversion2", false);

		//CN colors
		var colorX = getGMcookie("cncolorneutral", false);
		if (colorX != "false" && colorX != "") TB3O.CN_COL_NEUTRAL = colorX;

		colorX = getGMcookie("cncolormaxlevel", false);
		if (colorX != "false" && colorX != "")  TB3O.CN_COL_MAX_LVL = colorX;

		colorX = getGMcookie("cncolornoupgrade", false);
		if (colorX != "false" && colorX != "") TB3O.CN_COL_NO_UPG = colorX;

		colorX = getGMcookie("cncolornpcupgrade", false);
		if (colorX != "false" && colorX != "") TB3O.CN_COL_UPG_VIA_NPC = colorX;

		//stop "Delete all" reports if the user changed the page
		if (getGMcookie("reportsDeleteAll", false) == '1') {
			if (crtPage.indexOf('berichte.php') == -1) {
				setGMcookie("reportsDeleteAll", "0", false);
				setGMcookie("reportsPageToDelete", '', false);
			}
		}
	}

	//hide ad banners
	function hideAd() {
		if (TB3O.T35 == false) {
			if (TB3O.boolRemoveAdBanner == '1') {
				var ad = find("//iframe", XPFirst);
				if (ad) {
					if (ad.id == '') {
						ad.style.display = 'none';
						var headerTop = find("//html/body/div", XPFirst);
						if (headerTop) {
							headerTop.style.height = '30px';
							headerTop.style.backgroundImage = '';
						}
						var header2 = find("//html/body/div[2]", XPFirst);
						if (header2) header2.style.display = 'none';
						var header3 = find("//html/body/div[3]", XPFirst);
						if (header3 && header3.id != dTop1) header3.style.display = 'none';
						var lres = get("lres2");
						if (lres) lres.style.top = '100px';
					}
				}
			}
		} else {
			if (TB3O.boolRemoveAdBanner == '1') {
				removeElement(find("//div[@class='dyn1']", XPFirst));
				removeElement(find("//div[@class='dyn2']", XPFirst));
				removeElement(get("ad_iframe"));
				var divHeader = get('dynamic_header');
				if (divHeader) {
					divHeader.style.height = '30px';
					get("res").style.top = '100px';
				}
			}
			var divltime = get("ltime");
			addAttr(divltime, [['style', 'top:0px; color:white']]);
		}
	}

	//Change the menu on the left side
	function leftMenuLinks() {
		var menu = find("//td[@class='menu']", XPFirst);
		if (!menu) {
			menu = find("//div[@id='" + dleft + "']/p", XPList);
			if (menu.snapshotLength > 1) {
				var pFirst = menu.snapshotItem(0);
				for (xi = 1; xi < menu.snapshotLength; xi++) {
					//j000
					while (tmp = menu.snapshotItem(xi).firstChild) {
						removeElement(tmp);
						pFirst.appendChild(tmp);
					}
					removeElement(menu.snapshotItem(xi));
				}
				menu = pFirst;
			} else menu = menu.snapshotItem(0);
		}

		//j000;
		var brs = menu.childNodes;
		for (var i = 0; i < brs.length; i++) {
			if (brs[i].nodeName.toLowerCase() == "br") {
				brs[i].parentNode.removeChild(brs[i]);
				--i;
			}
		}

		var boolShowMenuSection3 = getGMcookie("showmenusection3", false);
		if (boolShowMenuSection3 == 'false') {
			setGMcookie("showmenusection3", '1', false)
			boolShowMenuSection3 = '1';
		}

		var linkWarSim = warsimExtLink;
		var warsimOption = getGMcookie('warsim', false);
		if (warsimOption != "1") {
			setGMcookie('warsim', '0', false);
			linkWarSim = warsimIntLink;
		}

		var aL = [0,
				[T('LOGIN'), "login.php"],
				(TB3O.showBiAlliance != "1" ? [T('ALLIANCE'), "allianz.php"] : ['', '']),
				[T('SENDTROOPS'), "a2b.php"],
				[T('SIM'), linkWarSim, "_blank"],
			];

		if (boolShowMenuSection3 == "1") {
			var ttbLang;
			var ttblangTR = TB3O.language;
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
			}

			var wsAnalyserOption = parseInt(TB3O.wsAnalyserOpt);
			var mapAnalyserOption = parseInt(TB3O.mapAnalyserOption);

			var mapAnalyserLink;
			if (TB3O.mapAnalyserOption == '0') mapAnalyserLink = mapAnalyser[0][1] + "?lang=" + TB3O.language; else if (TB3O.mapAnalyserOption == '1') mapAnalyserLink = mapAnalyser[1][1] + TB3O.FmapLanguage;

			var menuSection3Links = [
				0,
				[T('CROPFINDER'), wsURLCropFinderLinkV2, "_blank"],
				['Travilog', "http://travilog.org.ua/" + TB3O.language + "/", "_blank"],
				['T-Reports.net', "http://travian-reports.net/" + ttblangTR + "/", "_blank"],
				['Toolbox', "http://www.traviantoolbox.com/index.php?lang=" + ttbLang, "_blank"],
				['Travian Utility', "http://travianutility.netsons.org/index_en.php", "_blank"],
				['TravianBox', wsURLTravianBox + "/stats/server/" + wsSName, "_blank"],
				[mapAnalyser[mapAnalyserOption][0], mapAnalyserLink, "_blank"],
				[wsAnalyser[wsAnalyserOption][0], wsAnalyser[wsAnalyserOption][1] + wsSName, "_blank"]//,
				//0
			];
			aL = aL.concat(menuSection3Links);
		}

		for (var i = 0; i < aL.length; i++) {
			if (aL[i]) {
				if (aL[i][1] != '') {
					var yh = 20;
					if (aL[i][0].length > 19) yh = 40;
					var aLink = newLink(aL[i][0], [['href', aL[i][1]], ['style', 'height:' + yh + 'px !important;']]);
					if (aL[i][2]) aLink.setAttribute('target', aL[i][2]);
					menu.appendChild(aLink);
				}
			} else menu.appendChild(document.createElement('HR'));
		}
	}

	function setT35Constants() {
		dlright1 = 'sright';
		var dl = get(dlright1);
		if (!dl) {dlright1 = 'side_info'; dl = get(dlright1);}

		dleft = 'sleft';
		dl = get(dleft);
		if (!dl) {dleft = 'side_navi'; dl = get(dleft);}

		dTop1 = 'header';
		dTop5 = 'mtop';
		dmid2 = 'content';
		dmid1 = 'content';
		dmid = "mid";
		xGIF = "img/x.gif";
	}

	function adaptDataToGameVersion() {
		var cssBI = "";
		if (TB3O.T35 == false) {
			gIcons["r1"] = '<img src="' + img("r/1.gif") + '" width="16" height="12" title="' + T('RES1') + '" alt="' + T('RES1') + '">';
			gIcons["r2"] = '<img src="' + img("r/2.gif") + '" width="16" height="12" title="' + T('RES2') + '" alt="' + T('RES2') + '">';
			gIcons["r3"] = '<img src="' + img("r/3.gif") + '" width="16" height="12" title="' + T('RES3') + '" alt="' + T('RES3') + '">';
			gIcons["r4"] = '<img src="' + img("r/4.gif") + '" width="16" height="12" title="' + T('RES4') + '" alt="' + T('RES4') + '">';
			gIcons["r41"] = '<img src="' + img("r/4.gif") + '" width="16" height="12" title="' + T('SENDRES') + '" alt="' + T('SENDRES') + '">';
			gIcons["r5"] = '<img src="' + img("r/5.gif") + '" width="16" height="12 title="' + T('RES5') + '" alt="' + T('RES5') + '">';
			gIcons["clock"] = '<img src="' + img("a/clock.gif") + '" width="16" height="12">';
			gIcons["capacity"] = '<img src="' + image["capacity"] + '">';
			gIcons["b1"] = img("a/b1.gif");
			gIcons["b2"] = img("a/b2.gif");
			gIcons["b3"] = img("a/b3.gif");
			gIcons["b4"] = img("a/b4.gif");
			gIcons["b5"] = img("a/b5.gif");
			gIcons["del"] = image["del"];
			gIcons["bau"] = img("a/bau.gif");
			for (var i = 1; i < 31; i ++) {gIcons["u" + i] = img("u/" + i) + ".gif";}
			gIcons["hero"] = '<img src="' + img("u/hero.gif") + '">';
			gIcons["att_all"] = '<img src="' + img("a/att_all.gif") + '" width="12px" height="12px">';
			gIcons["def_i"] = '<img src="' + img("a/def_i.gif") + '" width="12px" height="12px">';
			gIcons["def_c"] = '<img src="' + img("a/def_c.gif") + '" width="12px" height="12px">';
			gIcons["def1_1"] = '<img src="' + img("a/def1.gif") + '" width="12px" height="12px" title="' + T('ATTACKTYPE2') + '" alt="' + T('ATTACKTYPE2') + '">';
			gIcons["def1_1"] = '<img src="' + img("a/def1.gif") + '" width="12px" height="12px" title="' + T('RALLYPOINT') + '" alt="' + T('RALLYPOINT') + '">';
			gIcons["def1"] = '<img src="' + img("a/def1.gif") + '" width="12px" height="12px">';
			gIcons["def2"] = '<img src="' + img("a/def2.gif") + '" width="12px" height="12px">';
			gIcons["def3"] = '<img src="' + img("a/def3.gif") + '" width="12px" height="12px">';
			gIcons["att_all_1"] = '<img src="' + img("a/att_all.gif") + '" width="12px" height="12px" title="' + T('ATTACKTYPE3') + '" alt="' + T('ATTACKTYPE3') + '">';
			gIcons["att_all_2"] = '<img src="' + img("a/att_all.gif") + '" width="12px" height="12px" title="' + T('ATTACKTYPE4') + '" alt="' + T('ATTACKTYPE4') + '">';

			//big icons
			var bIheight = "100";
			//troops
			uc[1] = [120,100,180,40,40,40,35,50,6,1]; // Legionnaire
			uc[21] = [100,130,55,30,30,15,40,50,7,1]; // Phalanx
		} else {

			gIcons["r1"] = '<img class="r1" src="' + xGIF + '" title="' + T('RES1') + '" alt="' + T('RES1') + '">';
			gIcons["r2"] = '<img class="r2" src="' + xGIF + '" title="' + T('RES2') + '" alt="' + T('RES2') + '">';
			gIcons["r3"] = '<img class="r3" src="' + xGIF + '" title="' + T('RES3') + '" alt="' + T('RES3') + '">';
			gIcons["r4"] = '<img class="r4" src="' + xGIF + '" title="' + T('RES4') + '" alt="' + T('RES4') + '">';
			gIcons["r41"] = '<img class="r4" src="' + xGIF + '" title="' + T('SENDRES') + '" alt="' + T('SENDRES') + '">';
			gIcons["r5"] = '<img class="r5" src="' + xGIF + '" title="' + T('RES5') + '" alt="' + T('RES5') + '">';
			//icons
			gIcons["clock"] = '<img class="clock" src="' + xGIF + '">';
			gIcons["capacity"] = '<img src="' + image["capacity"] + '">';
			gIcons["b1"] = image["bulletBlue"];
			gIcons["b2"] = image["bulletGreen"];
			gIcons["b3"] = image["bulletYellow"];
			gIcons["b4"] = image["bulletRed"];
			gIcons["b5"] = image["bulletGrey"];
			gIcons["del"] = image["del"];
			gIcons["bau"] = image["bau"];
			for (var i = 1; i < 31; i ++) {gIcons["u" + i] = xGIF;}
			gIcons["hero"] = '<img class="unit uhero" src="' + xGIF + '">';
			gIcons["att_all"] = '<img src="' + image["att_all"] + '" width="12px" height="12px">';
			gIcons["def_i"] = '<img src="' + image["def_i"] + '" width="12px" height="12px">';
			gIcons["def_c"] = '<img src="' + image["def_c"] + '" width="12px" height="12px">';
			gIcons["def1_1"] = '<img class="def1" src="' + xGIF + '" title="' + T('ATTACKTYPE2') + '" alt="' + T('ATTACKTYPE2') + '">';
			gIcons["def1"] = '<img class="def1" src="' + xGIF + '" width="12px" height="12px">';
			gIcons["def1_1"] = '<img class="def1" src="' + xGIF + '" width="12px" height="12px" title="' + T('RALLYPOINT') + '" alt="' + T('RALLYPOINT') + '">';
			gIcons["def2"] = '<img class="def2" src="' + xGIF + '" width="12px" height="12px">';
			gIcons["def3"] = '<img class="def3" src="' + xGIF + '" width="12px" height="12px">';
			gIcons["att_all_1"] = '<img class="att_all" src="' + xGIF + '" width="12px" height="12px" title="' + T('ATTACKTYPE3') + '" alt="' + T('ATTACKTYPE3') + '">';
			gIcons["att_all_2"] = '<img class="att_all" src="' + xGIF + '" width="12px" height="12px" title="' + T('ATTACKTYPE4') + '" alt="' + T('ATTACKTYPE4') + '">';
			gIcons["att1"] = '<img class="att1" src="' + xGIF + '" width="12px" height="12px">';
			gIcons["att2"] = '<img class="att2" src="' + xGIF + '" width="12px" height="12px">';
			//big icons
			bIheight = "67";
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
			boolForceT31Tcap = getGMcookie("forcet31tcap", false);
			if (boolForceT31Tcap == '1') {
				//troops
				uc[1] = [120,100,180,40,40,40,35,50,6,1]; // Legionnaire
				uc[21] = [100,130,55,30,30,15,40,50,7,1]; // Phalanx
			}
		}

		gIcons["merchant"] = '<img src="' + image["merchant"] + '">';
		gIcons["reload"] = '<img src="' + image["reload"] + '">';
		gIcons["reload_p"] = '<img src="' + image["reload"] + '" title="' + T('UPDATEPOP') + '" alt="' + T('UPDATEPOP') + '" width="12px" heigth="12px">';
		gIcons["reload_v"] = '<img src="' + image["reload"] + '" title="' + T('UPDATEALLVILLAGES') + '" alt="' + T('UPDATEALLVILLAGES') + '" width="12px" heigth="12px">';
		gIcons["usethempr"] = '<img src="' + image["usethempr"] + '" title="' + T('USETHEMPR') + '" alt="' + T('USETHEMPR') + '">';
		gIcons["usethemeq"] = '<img src="' + image["usethemeq"] + '" title="' + T('USETHEMEQ') + '" alt="' + T('USETHEMEQ') + '">';
		gIcons["usethem1h"] = '<img src="' + image["usethem1h"] + '" title="' + T('USETHEM1H') + '" alt="' + T('USETHEM1H') + '">';

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
	}

	function xTB3SetupItem(lvl, iName, iType, aV, aValue) {
		this.lvl = lvl;
		this.iN = iName;
		this.iT = iType;
		this.aV = aV;
		this.iV = aValue;
	}

	function createHelpTooltip(aT) {
		return function() {
			var aTT = get("tb_tooltip");
			if (!aTT) aTT = createTooltip();
			aTT.innerHTML = '<p style="margin:5px">' + T(aT.toUpperCase()) + '</p>';
			aTT.style.display = 'block';
			aTT.style.zIndex = '3000';
			aTT.style.fontSize = '8pt';
			aTT.style.color = 'blue';
		}
	}

	//TB3 Setup page
	function TB3Setup(){
		//TB3 Setup parameters
		var aTBSetup = [
			[1, "accinfo", "TR", "ACCINFOHELP", -1],
				[2, "capital", "span", "", 0],
				[2, "capitalxy", "span", "", 1],
				[2, "raceCrtV2", "span", "", 2],
			[1, "gameservertype", "TR", "", -1],
				[2, "serverversion2", "checkbox", "", 3],
				[2, "removeadbanner", "checkbox", "", 4],
				[2, "forcet31tcap", "checkbox", "", 5],
			[1, "bigicons", "TR", "", -1],
				[2, "showbigiconmarket", "checkbox", "", 6],
				[2, "showbigiconmilitary", "checkbox", "", 7],
				[2, "showbigiconmilitary2", "checkbox", "", 8],
				[2, "showbigiconmisc", "checkbox", "", 9],
				[2, "alliance", "checkbox", "", 10],
				[2, "allianceforumlink", "text", "", 11],
			[1, "menuleft", "TR", "", -1],
				[2, "showmenusection3", "checkbox", "", 12],
				[2, "warsim", "SELECT", [T('WARSIMOPTION1'), T('WARSIMOPTION2')], 13],
			[1, "villagelist", "TR", "", -1],
				[2, "showinouticons", "checkbox", "", 14],
				[2, "showcentermapicon", "checkbox", "", 15],
				[2, "showsendtroopsresources", "checkbox", "", 16],
				[2, "showccinvl", "checkbox", "", 17],
				[2, "showpopinvl", "checkbox", "", 18],
				[2, "showvl2table", "checkbox", "", 19],
				[2, "showbipattinvl", "checkbox", "", 20],
			[1, "marcadores", "TR", "", -1],
				[2, "showbookmarks", "checkbox", "", 21],
				[2, "floatbookmarks", "checkbox", "", 22],
				[2, "marcadores", "text", "", 23],
			[1, "noteblockoptions", "TR", "", -1],
				[2, "noteblock", "checkbox", "", 24],
				[2, "floatnoteblock", "checkbox", "", 25],
				[2, "nbsize", "SELECT", [T('NBSIZEAUTO'), T('NBSIZENORMAL'), T('NBSIZEBIG')], 26],
				[2, "nbheight", "SELECT", [T('NBKEEPHEIGHT'), T('NBAUTOEXPANDHEIGHT')], 27],
			[1, "npcoptions", "TR", "", -1],
				[2, "npcassistant", "checkbox", "", 28],
			[1, "statistics", "TR", "", -1],
				[2, "wsanalyser", "SELECT", [wsAnalyser[0][0], wsAnalyser[1][0], wsAnalyser[2][0]], 29],
				[2, "showstatlinks", "checkbox", "", 30],
				[2, "mapanalyser", "SELECT", [mapAnalyser[0][0], mapAnalyser[1][0]], 31],
				[2, "showtravmapuserlinks", "checkbox", "", 32],
				[2, "showtravmapallylinks", "checkbox", "", 33],
				[2, "showsearchbar", "checkbox", "", 34],
				[2, "floatsearchbar", "checkbox", "", 35],
			[1, "upgtables", "TR", "", -1],
				[2, "showcpinupgtables", "checkbox", "", 36],
				[2, "showccinupgtables", "checkbox", "", 37],
				[2, "showuntilthenresidue", "checkbox", "", 38],
			[1, "resourcefields", "TR", "", -1],
				[2, "showresupgradetable", "checkbox", "", 39],
				[2, "showcolorreslevels", "checkbox", "", 40],
				[2, "showresbartable", "checkbox", "", 41],
				[2, "floatresbartable", "checkbox", "", 42],
			[1, "villagecenter", "TR", "", -1],
				[2, "showbupgtable", "checkbox", "", 43],
				[2, "showsortedbiupgt", "checkbox", "", 44],
				[2, "showcenternumbers", "checkbox", "", 45],
				[2, "showcolorbuildlevels", "checkbox", "", 46],
				[2, "showbblink", "checkbox", "", 47],
			[1, "market", "TR", "", -1],
				[2, "showaddinfomarr", "checkbox", "", 69],
				[2, "marketpreload", "SELECT", ["1", "2", "3", "4", "5"], 48],
				[2, "ventas", "text", "", 49],
			[1, "rallypoint", "TR", "", -1],
				[2, "rpdefact", "SELECT", [T('ATTACKTYPE2'), T('ATTACKTYPE3'), T('ATTACKTYPE4')], 50],
				[2, "noofscouts", "text", "", 51],
				[2, "showtroopinfotooltips", "checkbox", "", 52],
				[2, "showrprinfotooltips", "checkbox", "", 53],
			[1, "mapoptions", "TR", "", -1],
				[2, "showcelltypeinfo", "checkbox", "", 54],
				[2, "showdisttimes", "checkbox", "", 55],
				[2, "showmaptable", "checkbox", "", 56],
			[1, "mesrepoptions", "TR", "", -1],
				[2, "mesreppreload", "SELECT", ["1", "2", "3", "4", "5"], 57],
				[2, "showmesopenlinks", "checkbox", "", 58],
				[2, "showrepdeltable", "checkbox", "", 59],
				[2, "showigmlinkforme", "checkbox", "", 60],
				[2, "showtb3battlereport", "checkbox", "", 61],
				[2, "showbrstatdetails", "checkbox", "", 64],
			[1, "coloroptions", "TR", "COLORHELP", -1],
				[2, "cncolormaxlevel", "text", "", 65],
				[2, "cncolornoupgrade", "text", "", 66],
				[2, "cncolornpcupgrade", "text", "", 67],
			[1, "debugoptions", "TR", "", -1],
				[2, "consoleloglevel", "SELECT", ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], 68],
		];

		//Modified by Lux
		if (get('configuracion')) {showMsgPage(true); return;}
		var a = get(dmid2);
		var innerPane = get('InnerMsgPage');
		if (!innerPane) {addDiv(); innerPane = get('InnerMsgPage');}
		//------------------------------------------

		if (!a) a = find("//form", XPFirst);

		var setupTb = newTable([['class', 'tb3tb'], ["id", "configuracion"]]);
		var tRow = newRow("", [["class", "tb3rh"]]);
		var topCell = newCell(T('TBSETUPLINK') + " - " + TB3O.versionText(), [['class', 'tb3chb'], ["width", "70%"]]);
		//save button
		var sCell = newCell("", [['class', 'tb3ch'], ['width', '20%'], ["style", "text-align:center;"]]);
		var sImg = newImage([['src', image["buttonSave"]], ['style', 'cursor:pointer;'], ['title', T('SAVE')]]);
		sImg.addEventListener("click", TB3SetupSave, 0);
		sCell.appendChild(sImg);
		//close setup
		var xCell = newCell("", [['class', 'tb3ch'], ['width', '10%'], ["style", "text-align:center;"]]);
		var xImg = newImage([['src', image["closeButton"]], ['style', 'cursor:pointer;'], ['title', T('CLOSE')]]);
		xImg.addEventListener("click", function(){showMsgPage(false)}, true);

		xCell.appendChild(xImg);
		tRow.appendChild(topCell);
		tRow.appendChild(sCell);
		tRow.appendChild(xCell);
		setupTb.appendChild(tRow);

		for (var i = 0; i < aTBSetup.length; i++){
			if (aTBSetup[i][0] == 1) {
				var sectionRow = elem(aTBSetup[i][2], "");
				var sTC = newCell(T(aTBSetup[i][1].toUpperCase()), [["class", "tb3ch"], ['style', "text-align:" + docDir[0] + "; font-size:9pt; font-weight:bold; color:darkblue;"], ['colspan', '3']]);
				if (aTBSetup[i][3] != '') {
					var aTN = elem("TEXTNODE", " ");
					var aImg = newImage([['src', image["help"]]]);
					aImg.addEventListener('mouseover', createHelpTooltip(aTBSetup[i][3]), false);
					aImg.addEventListener('mouseout', function() {get("tb_tooltip").style.display = 'none';}, false);
					sTC.appendChild(aTN);
					sTC.appendChild(aImg);
				}
				sectionRow.appendChild(sTC);
				setupTb.appendChild(sectionRow);
			} else if (aTBSetup[i][0] == 2) {
				var setupRow = newRow("");
				var setupRowLabel = newCell(T(aTBSetup[i][1].toUpperCase()), [['class', 'tb3c'], ['style', 'text-align:' + docDir[0] + '; font-size:8pt']]);
				setupRow.appendChild(setupRowLabel);
				var cellInput = newCell("", [['class', 'tb3c'], ['style', 'text-align:' + docDir[0] + ';'], ['colspan', '2']]);
				var aValue = getGMcookie(aTBSetup[i][1], false);
				var sVal = (aValue != "false" ? aValue : '');
				var pS;
				if (aTBSetup[i][2] == "SELECT") {
					pS = document.createElement(aTBSetup[i][2]);
					pS.setAttribute('type', aTBSetup[i][2]);
				} else if (aTBSetup[i][2] == "span") pS = document.createElement("SPAN"); else pS = newInput([['type', aTBSetup[i][2]]]);
				addAttr(pS, [['name', aTBSetup[i][1]], ['id', 'is_' + aTBSetup[i][1]]]);
				switch (aTBSetup[i][2]) {
					case "checkbox":
						pS.setAttribute('value', T('YES'));
						if (sVal == "1") pS.setAttribute('checked', true);
						break;
					case "text":
						addAttr(pS, [['style', "font-size:8pt; width:360px;"], ['value', sVal], ['class', 'fm']]);
						break;
					case "SELECT":
						for (var xi = 0; xi < aTBSetup[i][3].length; xi++) pS.options[xi] = new Option(aTBSetup[i][3][xi], xi, false, false);
						addAttr(pS, [['style', 'font-size:8pt;']]);
						pS.selected = sVal;
						pS.value = sVal;
						break;
					case "span":
						pS.innerHTML = sVal;
						addAttr(pS, [['style', 'font-weight:bold; font-size:8pt;']]);
						break;
					default:
						break;
				}
				cellInput.appendChild(pS);
				setupRow.appendChild(cellInput);
				setupTb.appendChild(setupRow);
			}
		}

		//create the "Save" row
		var saveRow = newRow("", [['class', 'tb3rh']]);
		var bCell = newCell(T('TBSETUPLINK') + " - " + TB3O.versionText(), [['class', 'tb3chb'], ["width", "70%"]]);
		var sCell2 = newCell("", [['class', 'tb3ch'], ["style", "text-align:center;"], ["width", "20%"]]);
		var sImg2 = sImg.cloneNode(true);
		sImg2.addEventListener("click", TB3SetupSave, 0);
		sCell2.appendChild(sImg2);

		var xCell2 = newCell("", [['class', 'tb3ch'], ["style", "text-align:center;"], ["width", "10%"]]);
		var xImg2 = xImg.cloneNode(true);
		xImg2.addEventListener("click", function(){showMsgPage(false)}, true);
		xCell2.appendChild(xImg2);

		saveRow.appendChild(bCell);
		saveRow.appendChild(sCell2);
		saveRow.appendChild(xCell2);
		setupTb.appendChild(saveRow);
		//Modified by Lux
		innerPane.appendChild(setupTb);
		showMsgPage(true);

		function TB3SetupSave() {
			var arrSelect = get("configuracion").getElementsByTagName("SELECT");
			var arrInput = get("configuracion").getElementsByTagName("INPUT");
			for (var i = 0; i < arrInput.length; i++) {
				var crtValue = arrInput[i].value;
				if (arrInput[i].type == 'checkbox') {(arrInput[i].checked == true) ? (crtValue = '1') : (crtValue = '0');}
				setGMcookie(arrInput[i].name, crtValue, false);
			}
			for (var i = 0; i < arrSelect.length; i++) {setGMcookie(arrSelect[i].name, arrSelect[i].value, false);}
			TB3O.boolShowNoteBlock = getGMcookie("noteblock", false);
			if (TB3O.boolShowNoteBlock == 'false') {
				setGMcookie('noteblock', '1', false);
				TB3O.boolShowNoteBlock = '1';
			}
			if (TB3O.boolShowNoteBlock == "1") {
				var nbnotes = get('noteblockcontent');
				if (nbnotes) setGMcookie('notas', nbnotes.value, false);
			}
			alert(T('SAVED') + ".");
			location.reload(true);
		}

	}

	function showBigIconsBar(){
		//localise top bar with big icons
		var biBar = get(dTop5);
		if (biBar == null) return;

		//move "Plus" icon
		var intAddIc = 0;
		var hPH = '100';
		var strMapCbib = ["0,0,35,50", "35,0,70,50", "0,50,35,100", "35,50,70,100"];
		var strMapMbib = ["0,0,70,50", "0,50,35,100", "35,50,70,100"];
		var iHTML = '';

		if (TB3O.T35 == true) {
			hPH = '67';
			var clearDiv = find("//div[@id='" + dTop5 + "']//div[@class='clear']", XPFirst);
			if (clearDiv) biBar.removeChild(clearDiv);
			strMapCbib = ["0,0,35,33", "35,0,70,33", "0,33,35,67", "35,33,70,67"];
			strMapMbib = ["0,0,70,33", "0,33,35,67", "35,33,70,67"];
		}

		addAttr(biBar, [['style', 'display:none; width:900px; ' + docDir[0] + ':10px;']]);

		//setup icon
		var setupImg = newImage([['id', 'n9'], ['src', xGIF]]);
		var setupLink = newLink("", [['title', T('TBSETUPLINK')], ['href', jsVoid], ['style', 'float:' + docDir[0] + '; ']]);
		setupLink.appendChild(setupImg);
		setupLink.addEventListener('click', TB3Setup, false);

		var aPlus = find("//div[@id='" + dTop5 + "']//a[contains(@href, 'plus.php')]", XPFirst);
		if (!aPlus) aPlus = find("//div[@id='" + dTop1 + "']//a[contains(@href, 'plus.php')]", XPFirst);
		if (aPlus) {
			addAttr(aPlus, [['href', aPlus.href + '?id=3'], ['style', 'margin-' + docDir[0] + ':30px']]);
			biBar.removeChild(aPlus);
		}

		var showBiMarket = getGMcookie("showbigiconmarket", false);
		var showBiM2 = getGMcookie("showbigiconmilitary2", false);
		var showBiM = getGMcookie("showbigiconmilitary", false);
		var showBiMisc = getGMcookie("showbigiconmisc", false);

		//enable icons if Setup has not been visited yet
		if (showBiMarket == 'false') {
			setGMcookie("showbigiconmarket", '1', false);
			showBiMarket = '1';
		}
		if (showBiM == 'false') {
			setGMcookie("showbigiconmilitary", '1', false);
			showBiM = '1';
		}
		if (showBiM2 == 'false') {
			setGMcookie("showbigiconmilitary2", '1', false);
			showBiM2 = '1';
		}
		if (showBiMisc == 'false') {
			setGMcookie("showbigiconmisc", '1', false);
			showBiMisc = '1';
		}

		if (showBiMarket == "1") {
			var marketLink = newLink("<img usemap='#market' id='n6' src='" + xGIF + "'>");
			addAttr(marketLink, [['style', 'float:' + docDir[0] + '; ']]);
			biBar.appendChild(marketLink);
			intAddIc += 1;
		}

		if (showBiM == "1") {
			var militaryLink = newLink("<img usemap='#militar' id='n7' src='" + xGIF + "'>");
			addAttr(militaryLink, [['style', 'float:' + docDir[0] + '; ']]);
			biBar.appendChild(militaryLink);
			intAddIc += 1;
		}

		if (showBiM2 == "1") {
			var militaryLink2 = newLink("<img usemap='#militar2' id='n10' src='" + xGIF + "'>");
			addAttr(militaryLink2, [['style', 'float:' + docDir[0] + '; ']]);
			biBar.appendChild(militaryLink2);
			intAddIc += 1;
		}

		if (showBiMisc == "1") {
			var miscLink = newLink("<img usemap='#misc' id='n11' src='" + xGIF + "'>");
			addAttr(miscLink, [['style', 'float:' + docDir[0] + '; ']]);
			biBar.appendChild(miscLink);
			intAddIc += 1;
		}

		if (TB3O.showBiAlliance == "1") {
			var allyLink = newLink("<img usemap='#alliance' id='n8' src='" + xGIF + "' title='" + T('ALLIANCE') + "' alt = '" + T('ALLIANCE') + "'>");
			addAttr(allyLink, [['style', 'float:' + docDir[0] + '; ']]);
			biBar.appendChild(allyLink);
			intAddIc += 1;
		}

		if (TB3O.plusAcc) biBar.appendChild(aPlus);

		if (showBiMarket == "1") {
			iHTML += '<map name="market" onmouseover="bigIconMarket()" onmouseout="bigIconMarketGS()"><area shape="rect" coords="' + strMapMbib[0] + '" href="build.php?gid=17" title="' + T('SENDRES') + '"><area shape="rect" coords="' + strMapMbib[1] + '" href="build.php?gid=17&t=1" title="' + T('COMPRAR') + '"><area shape="rect" coords="' + strMapMbib[2] + '" href="build.php?gid=17&t=2" title="' + T('SELL') + '"></map>';
			addGreyScaleSwitcher ("mercado");
		}

		if (showBiM == "1") {
			iHTML += '<map name="militar" onmouseover="bigIconMilitar()" onmouseout="bigIconMilitarGS()"><area shape="rect" coords="' + strMapCbib[0] + '" href="build.php?gid=16&j&k" title="' + T('RALLYPOINT') + '"><area shape="rect" coords="' + strMapCbib[1] + '" href="build.php?gid=19" title="' + T('BARRACKS') + '"><area shape="rect" coords="' + strMapCbib[2] + '" href="build.php?gid=20" title="' + T('STABLE') + '"><area shape="rect" coords="' + strMapCbib[3] + '" href="build.php?gid=21" title="' + T('WORKSHOP') + '"></map>';
			addGreyScaleSwitcher ("militar");
		}

		if (showBiM2 == "1") {
			iHTML += '<map name="militar2" onmouseover="bigIconMilitar2()" onmouseout="bigIconMilitar2GS()"><area shape="rect" coords="' + strMapCbib[0] + '" href="build.php?gid=24" title="' + T('TOWNHALL') + '"><area shape="rect" coords="' + strMapCbib[1] + '" href="build.php?gid=37" title="' + T('HEROSMANSION') + '"><area shape="rect" coords="' + strMapCbib[2] + '" href="build.php?gid=12" title="' + T('BLACKSMITH') + '"><area shape="rect" coords="' + strMapCbib[3] + '" href="build.php?gid=13" title="' + T('ARMOURY') + '"></map>';
			addGreyScaleSwitcher ("militar2");
		}

		if (showBiMisc == "1") {
			iHTML += '<map name="misc"  onmouseover="bigIconMisc()" onmouseout="bigIconMiscGS()"><area shape="rect" coords="' + strMapCbib[0] + '" href="build.php?gid=26" title="' + T('PALACE') + '"><area shape="rect" coords="' + strMapCbib[1] + '" href="build.php?gid=25" title="' + T('RESIDENCE') + '"><area shape="rect" coords="' + strMapCbib[2] + '" href="build.php?gid=22" title="' + T('ACADEMY') + '"><area shape="rect" coords="' + strMapCbib[3] + '" href="build.php?gid=27" title="' + T('TREASURY') + '"></map>';
			addGreyScaleSwitcher ("misc");
		}

		if (TB3O.showBiAlliance == "1") {
			var forumLink = getGMcookie("allianceforumlink", false);
			if (forumLink == "false" || forumLink == "") forumLink = "allianz.php?s=2"; else forumLink += ' target="_blank"';
			iHTML += '<map name="alliance" onmouseover="bigIconAlliance()" onmouseout="bigIconAllianceGS()"><area shape="rect" coords="' + strMapCbib[0] + '" href="allianz.php" title="' + T('ALLIANCE') + ':&nbsp;' + T('OVERVIEW') + '"><area shape="rect" coords="' + strMapCbib[1] + '" href=' + forumLink + ' title="' + T('ALLIANCE') + ':&nbsp;' + T('FORUM') + '"><area shape="rect" coords="' + strMapCbib[2] + '" href="allianz.php?s=3" title="' + T('ALLIANCE') + ':&nbsp;' + T('ATTACKS') + '"><area shape="rect" coords="' + strMapCbib[3] + '" href="allianz.php?s=4" title="' + T('ALLIANCE') + ':&nbsp;' + T('NEWS') + '"></map>';
			addGreyScaleSwitcher ("alliance");
		}

		biBar.innerHTML += iHTML;

		//insert an empty image based on the boolShowBigIconsOptions
		var xM = 140;
		switch (intAddIc) {
			case 1: xM = 115; break;
			case 2: xM = 80; break;
			case 3: xM = 45; break;
			case 4: xM = 10; break;
			case 5: xM = 0; break;
		}

		var emptyImg = newImage([['src', xGIF], ['width', xM + 'px'], ['height', hPH + 'px'], ['style', 'float:' + docDir[0] + '; ']]);

		biBar.insertBefore(emptyImg, biBar.firstChild);
		biBar.insertBefore(setupLink, emptyImg);
		biBar.style.display = '';
	}

	//onetmt
	function addGreyScaleSwitcher (icon) {
		//this function is a workaround for the mouse event unawareness of <area> tag with respect to background image;
		//through addGreyScaleSwitcher it is possible to change from a greyscale background to a color one, increasing the look and feel coherence with original travian GUI
		var mouseover_fun = document.createElement ("script");
		var mouseout_fun  = document.createElement ("script");
		var div_id  = "";
		var fun_id  = "";
		var icon_gs = icon + "_gs";

		switch (icon) {
			case "mercado": div_id = "n6"; fun_id = "Market"; break;
			case "militar": div_id = "n7"; fun_id = "Militar"; break;
			case "alliance": div_id = "n8"; fun_id = "Alliance"; break;
			case "militar2": div_id = "n10"; fun_id = "Militar2"; break;
			case "misc": div_id = "n11"; fun_id = "Misc"; break;
		}

		mouseover_fun.innerHTML = "function bigIcon" + fun_id + " () {var icon = document.getElementById (\"" + div_id + "\"); icon.style.backgroundImage = \"url(\'" + image[icon] + "\')\";}";
		document.body.appendChild (mouseover_fun);
		mouseout_fun.innerHTML = "function bigIcon" + fun_id + "GS () {var icon = document.getElementById (\"" + div_id + "\"); icon.style.backgroundImage = \"url(\'" + image[icon_gs] + "\')\";}";
		document.body.appendChild (mouseout_fun);
	}

	function createStatLink(strType, aX, textURL) {
		var linkType;
		var linkURLws = '';
		var statLink = '';
		var labelWAnalyser = '';
		if (TB3O.wsAnalyserOpt == "0") {
			labelWAnalyser = wsAnalyser[0][0];
			if (strType == "user") linkType = 'uid='; else if (strType == "ally") linkType = 'aid=';
			linkURLws = wsAnalyser[0][1] + wsSName + "&" + linkType + aX;
		} else if (TB3O.wsAnalyserOpt == "1") {
			labelWAnalyser = wsAnalyser[1][0];
			if (strType == "user") linkType = 'idu='; else if (strType == "ally") linkType = 'ida=';
			linkURLws = wsAnalyser[1][1] + wsSName + "&" + linkType + aX;
		} else if (TB3O.wsAnalyserOpt == "2") {
			labelWAnalyser = wsAnalyser[2][0];
			if (strType == "user") linkType = 'player/'; else if (strType == "ally") linkType = 'alliance/';
			linkURLws = wsAnalyser[2][1] + linkType + wsSName + "/id/" + aX;
		}

		if (textURL) statLink = newLink(textURL, [['target', '_blank'], ['href', linkURLws]]); else if (linkURLws != '') {
			statLink = newLink("", [['target', '_blank'], ['href', linkURLws]]);
			statLink.appendChild(newImage([['src', image["globe"]], ['style', 'margin:0px 2px -2px 3px; display:inline; border:0px none white;'], ['title', labelWAnalyser]]));
		}
		return statLink;
	}

	function createMapLink(strType, aX, strName) {
		var hrefMapPage = '';
		var aLink = null;
		var smURLStart;
		if (TB3O.mapAnalyserOption == '0') {
			smURLStart = mapAnalyser[0][1] + "map.php?lang=" + TB3O.language + "&server=" + TB3O.fullServerName;
			var smURLEnd = "&groupby=player&casen=on&format=svg&azoom=on";
			if (strType == "user") hrefMapPage = smURLStart + "&player=id:" + aX + smURLEnd; else if (strType == "ally") hrefMapPage = smURLStart + "&alliance=id:" + aX + smURLEnd;
		} else if (TB3O.mapAnalyserOption == '1') {
			smURLStart = mapAnalyser[1][1] + TB3O.FmapLanguage + "/" + TB3O.FmapServer + "/";
			if (strType == "user") hrefMapPage = smURLStart + "players/" + strName; else if (strType == "ally") hrefMapPage = smURLStart + "clans/" + strName;
		}
		if (hrefMapPage != '') {
			var aImg = newImage([['src', image["smap"]], ['style', 'margin:0px 2px -2px 3px; display:inline; border:0px none white;'], ['title', 'Map']]);
			aLink = newLink("",[['href', hrefMapPage], ['target', '_blank']]);
			aLink.appendChild(aImg);
		}
		return aLink;
	}

	function insertTravMapUserLink(aNode, uid, strName) {
		//insert the Travmap link
		aNode.parentNode.insertBefore(createMapLink("user", uid, strName), aNode.nextSibling);
	}

	function insertWALink(aNode, uid) {
		//insert the Travian World Analyser link
		aNode.parentNode.insertBefore(createStatLink("user", uid), aNode.nextSibling);
	}

	function insertIGMLink(aNode, uid) {
		//insert the IGM link
		var igmL = newLink("", [['href', 'nachrichten.php?t=1&id=' + uid]]);
		igmL.appendChild(newImage([['src', image["igm"]], ['style', 'margin:3px 0px 1px 3px; display:inline; border:0px none white;'], ['title', T('SENDIGM')]]));
		aNode.parentNode.insertBefore(igmL, aNode.nextSibling);
	}

	function addReadMesRepInPopup(aNode) {
		if (aNode.parentNode) {
			if (aNode.parentNode.innerHTML.indexOf(imgPr) == -1) {
				var aBt = newLink("&nbsp;&nbsp;", [['href', jsVoid], ['style', 'height:0px; position:relative; float:' + docDir[1]]]);
				var aImg = newImage([['src', image['igmopen']]]);;
				aImg.addEventListener("click", createMesRepPopup(aNode), false);
				aBt.appendChild(aImg);
				aNode.parentNode.insertBefore(aBt, aNode);
			}
		}

		function createMesRepPopup(aNode) {
			return function() {
				ajaxRequest(aNode.href, 'GET', null, function(AJAXrespX) {
					var aDoc = document.implementation.createDocument("", "", null);
					var aElem = document.createElement('DIV');
					aElem.innerHTML = AJAXrespX.responseText;
					aDoc.appendChild(aElem);
					var aValue = aDoc.evaluate("//div[@id='" + dmid2 + "']", aElem, null, XPFirst, null).singleNodeValue;
					if (aValue) {
						var tooltip = get("mr_tooltip");
						var dW = 480;
						if (aValue.className == "reports") dW = 550;
						if (tooltip == null) tooltip = createFloatingDiv(dW, 680, 90, '', '', "mr_tooltip");
						removeElement(get('lmid2_1'));
						aValue.setAttribute('id', 'lmid2_1');
						tooltip.appendChild(aValue);

						//process message
						var aCells = xpathResultEvaluate("//td[@background]");
						if (aCells.snapshotLength == 0) aCells = xpathResultEvaluate("//div[@class='underline']");
						if (aCells.snapshotLength == 0) aCells = xpathResultEvaluate("//div[@id='message']");
						if (aCells.snapshotLength > 0) {
							//add coordinates in message if needed
							for (var i = 0; i < aCells.snapshotLength; i++) {
								var aCell = aCells.snapshotItem(i);
								aCell.innerHTML = processCoordsInMessage(aCell.innerHTML);
							}
						} else {
							battleReportV2();
							playerLinks("lmid2_1");
							if (TB3O.boolShowTroopInfoTooltips == "1") showTroopInfoInTooltips();
							//by suggestion of Acr111
							tooltip.style.position="fixed";
							tooltip.scrollTop = 0;
							if (tooltip.offsetTop + tooltip.offsetHeight > TB3O.wH) {
								tooltip.style.height = (TB3O.wH - tooltip.offsetTop - 6) + "px";
								tooltip.style.overflow = "auto";
								tooltip.firstChild.style.width = parseInt(tooltip.firstChild.style.width) - 18 + "px";
							}
						}
						tooltip.style.display = "block";
					}
				}, dummy);
			}
		}
	}

	function updProcResBarTooltip(i, procNo, prC) {
		var strSpan = timeToFill[i][1];
		var tSpanColor = "color:" + prC;
		var tBlink = '';
		if (procNo > 90) tBlink = '; text-decoration:blink; ';
		var prSpan = elem("SPAN", procNo + "%");
		addAttr(prSpan, [["id", "resbarProc_" + i], ["style", "font-size:8pt; " + tSpanColor + tBlink]]);
		return prSpan;
	}

	function updColTableResBarTooltip(i, procNo, prC) {
		var bTable = newTable([['style', 'float:left; height:16px; width:100px; background-color:white'], ['id', 'resbarTable_' + i]]);
		var bRow = newRow("");
		bRow.appendChild(newCell("", [['class', 'tb3cnb'], ['style', 'width:' + procNo + 'px; background-color:' + prC + "; padding:0px;"], ['title', crtResUnits[i] + "/" + capacity[i]]]));
		bRow.appendChild(newCell("", [['class', 'tb3cnb'], ['style', 'width:' + (100 - procNo) + 'px; background-color:white; padding:0px;'], ['title', crtResUnits[i] + "/" + capacity[i]]]));
		bTable.appendChild(bRow);
		return bTable;
	}

	function getColorResBarTooltip(p) {
		//formulas provided by Acr111 (adapted by ms99)
		var prC;
		var trigPr = 90;
		if (p < trigPr) prC = "rgb(" + parseInt(p / trigPr * 255) + "," + (100 + p) + ",0)"; else prC = "rgb(255," + parseInt((100 - p) / (100 - trigPr) * 170) + ",0)";
		return prC;
	}

	function updateResbarTooltip() {
		getFillTimeRow();
		for (var i = 0; i < 4; i++) {
			var procNo = Math.round(crtResUnits[i] / capacity[i] * 100);
			if (procNo > 100) procNo = 100;
			var prC = getColorResBarTooltip(procNo);
			var aSpan = get("resbarProc_" + i);
			if (aSpan != null) {
				var prSpan = updProcResBarTooltip(i, procNo, prC);
				aSpan.parentNode.replaceChild(prSpan, aSpan);
			}
			var rbT = get("resbarTable_" + i);
			if (rbT != null) {
				var bTable = updColTableResBarTooltip(i, procNo, prC);
				rbT.parentNode.replaceChild(bTable, rbT);
			}
		}
	}

	function createFloatingDiv(dWidth, posX, posY, strTitle, sCookieN, divID, boolShowMinMax) {
		var wClose = 25;
		var wCMM = 25;
		var intHeight = 20;
		var bckgColor = "#ECECEC";
		var iPx = parseInt(posX);
		if (iPx < 5) iPx = 0;
		var iPy = parseInt(posY);
		if (iPy < 5) iPy = 0;
		if (boolShowMinMax == true) wCMM = 2 * wClose;

		var div = newDiv("", [['id', divID], ["style", "position:absolute; width:" + dWidth + "px; top:" + iPy + "px;" + docDir[0] + ":" + iPx + "px; display:block; padding:1px; z-index:50; clear:both; border:2px solid #C0C0C0; background-color:#FFFFFF;"]]);
		if (strTitle == T('VILLAGELIST')) strTitle = "<a href='dorf3.php'>" + strTitle + "</a>";
		var dragDiv = newDiv(strTitle, [['id', 'dragDiv_' + sCookieN], ["style", "text-align:center; font-weight:bold; height:" + intHeight + "px; width:" + (dWidth - wCMM) + "px; float:" + docDir[0] + "; cursor: pointer; border-bottom:1px solid #C0C0C0; background-color:" + bckgColor + ";"]]);

		if (boolShowMinMax == true) {
			var newState = getGMcookie(sCookieN + "_state", false);
			if (newState == "false") newState = "max";
			var mmDiv = newDiv("", [["style", "height:" + intHeight + "px; width:" + wClose + "px; float:" + docDir[0] + "; border-bottom:1px solid #C0C0C0; background-color:" + bckgColor + ";"]]);
			var strImgMM = "minButton";
			if (newState == "min") strImgMM = "maxButton";
			var mmImage = newImage([['src', image[strImgMM]], ['style', 'cursor:pointer']]);
			if (divID && divID != "") mmImage.addEventListener("click", function() {
				if (newState == "min") newState = "max"; else newState = "min";
				if (sCookieN && sCookieN != "") setGMcookie(sCookieN + "_state", newState, false);
				removeElement(get(divID));
				switch (sCookieN) {
					case "showresbartable": showResBarTooltip(); break;
					case "showbookmarks": showUserBookmarks(); break;
					case "noteblock": showNoteBlock(); break;
					case "showvl2table": show2ndVillageList(); break;
					case "showsearchbar": showSearchBar(); break;
				}
			}, false);
			mmDiv.appendChild(mmImage);
		}

		var closeDiv = newDiv("", [["style", "height:" + intHeight + "px; width:" + wClose + "px; float:" + docDir[0] + "; border-bottom:1px solid #C0C0C0; background-color:" + bckgColor + ";"]]);
		var xImg = newImage([['src', image["closeButton"]], ['style', 'cursor:pointer'], ['title', T('CLOSE')]]);
		if (divID && divID != "") xImg.addEventListener("click", function() {get(divID).style.display = "none"; if (sCookieN && sCookieN != "") setGMcookie(sCookieN, "0", false);}, false);
		closeDiv.appendChild(xImg);

		makeDraggable(div, dragDiv);

		div.appendChild(dragDiv);
		if (mmDiv) div.appendChild(mmDiv);
		div.appendChild(closeDiv);
		document.body.appendChild(div);
		return div;
	}

	function showResBarTooltip() {
		if (TB3O.boolShowResBarTable != "1") return;

		var rbT = createResBarTable();
		if (TB3O.boolFloatResBarTable != '1') {
			var prbT = document.createElement("P");
			prbT.appendChild(rbT);
			rbT = prbT;
//			get(dlright1).appendChild(rbT);
		} else {
			var xyC = getGMcookie("resbarXY", false);
			if (xyC == "false") {xyC = defPosFloatDiv; setGMcookie("resbarXY", xyC, false);}
			var xy = xyC.split("|");
			var div = createFloatingDiv(300, xy[0], xy[1], T('RESBARTABLETITLE'), "showresbartable", "showresbartable_tooltip", true);
			TB3O.nodeToAppendRbT = div;
		}
		TB3O.nodeToAppendRbT.appendChild(rbT);
		setInterval(updateResbarTooltip, 10000);
	}

	function createResBarTable() {
		var strStyle = 'border-left:2px solid #C0C0C0; font-size:8pt; background-color:#FFFFC0; text-align:' + docDir[1] + '; ';
		var rbT = newTable([['style', 'border-collapse:collapse; border:1px solid #C0C0C0; background-color:white;'], ['width', '100%'], ['id', 'showresbartable']]);
		var crtState = getGMcookie("showresbartable_state", false);
		if (crtState == "min" && TB3O.boolFloatResBarTable == '1' ) rbT.style.display = 'none';
		var hRow = newRow("", [['class', 'tb3r']]);
		var hCell1 = newCell(aVillage.vName, [['class', 'tb3c'], ['colspan', '4'], ['style', 'text-align:center; font-size:8pt; font-weight:bold; color:blue; background-color:#FFFFC0;']]);
		hRow.appendChild(hCell1);
		var hCell2 = newCell(T('TOTAL') + " / 1h", [['class', 'tb3c'], ['style', 'font-size: 8pt; font-weight:bold; border-left:2px solid silver; background-color:#FFFFC0;']]);
		hRow.appendChild(hCell2);
		rbT.appendChild(hRow);
		//get total production per hour from the VillageRes cookie
		var tPpH = [0, 0, 0, 0, 0];
		var infoX = getGMcookieV2("VillageRes");

		for (var i = 0; i < vList.length; i++) {
			if (infoX[vList[i].vID]) {
				for (var yi = 1; yi < 6; yi++) {tPpH[yi - 1] += infoX[vList[i].vID][yi];}
			}
		}

		TB3O.tPpH = tPpH;

		for (var i = 0; i < 4; i++) {
			var procNo = Math.round(crtResUnits[i] / capacity[i] * 100);
			if (procNo > 100) procNo = 100;
			var prC = getColorResBarTooltip(procNo);
			var aRow = newRow("", [['class', 'tb3r']]);
			var aCell = newCell(gIcons["r" + (i+1)], [['class', 'tb3c'], ['title', "" + prodPerHour[i]]]);

			var bCell = newCell("", [['class', 'tb3c'], ['style', 'text-align:' + docDir[1] + ';']]);
			var procSpan = updProcResBarTooltip(i, procNo, prC);
			bCell.appendChild(procSpan);

			var bTable = updColTableResBarTooltip(i, procNo, prC);
			var cCell = newCell("", [['class', 'tb3cresbar'], ['style', 'width:100px']]);
			cCell.appendChild(bTable);

			var strSpan = timeToFill[i][1];
			var strSpanNew = strSpan.replace("font-weight:bold", "font-weight:normal; font-size:8pt");
			var dCell = newCell(strSpanNew, [['class', 'tb3c'], ['style', 'text-align:' + docDir[1] + ';']]);

			var intTpPh;
			if (i == 3) intTpPh = TB3O.tPpH[4]; else intTpPh = TB3O.tPpH[i];
			var eCell = newCell(getLS(intTpPh), [['class', 'tb3c'], ['style', strStyle]]);

			aRow.appendChild(aCell);
			aRow.appendChild(bCell);
			aRow.appendChild(cCell);
			aRow.appendChild(dCell);
			aRow.appendChild(eCell);
			rbT.appendChild(aRow);
		}
		//append a row for total crop consumption
		var bRow = newRow("", [['class', 'tb3r']]);
		var fCell = newCell(gIcons["r5"], [['class', 'tb3c']]);
		var emptyCell2 = newCell("", [['class', 'tb3c'], ['colspan', '2']]);
		var gCell = newCell(getLS(prodPerHour[6]), [['class', 'tb3c'], ['style', 'text-align:' + docDir[1] + '; font-size:8pt;']]);
		var hCell = newCell(getLS(tPpH[4] - tPpH[3]), [['class', 'tb3c'], ['style', strStyle]]);
		bRow.appendChild(fCell);
		bRow.appendChild(emptyCell2);
		bRow.appendChild(gCell);
		bRow.appendChild(hCell);
		rbT.appendChild(bRow);

		//append a row for effective crop production
		var cRow = newRow("", [['class', 'tb3r']]);
		var emptyCell = newCell("", [['class', 'tb3c'], ['colspan', '3']]);
		var iCell = newCell(gIcons["r4"] + " - " + gIcons["r5"], [['class', 'tb3c'], ['colspan', '1'], ['style', 'text-align:' + docDir[1] + '; white-space:nowrap; background-color:#FFFFC0;']]);
		var jCell = newCell(getLS(tPpH[3]), [['class', 'tb3c'], ['style', strStyle]]);
		cRow.appendChild(emptyCell);
		cRow.appendChild(iCell);
		cRow.appendChild(jCell);
		rbT.appendChild(cRow);

		return rbT;
	}

	function insertUserLinks(aNode, uid, strName) {
		if (aNode.parentNode) {
			if (aNode.parentNode.innerHTML.indexOf(imgPr) == -1) {
				if (TB3O.boolShowMapUserLinks == "1") insertTravMapUserLink(aNode, uid, strName);
				if (TB3O.boolShowStatLinks == "1") insertWALink(aNode, uid);
				if (TB3O.crtUserID != uid || (TB3O.crtUserID == uid && TB3O.boolShowIGMLinkForMe != "0")) insertIGMLink(aNode, uid);
			}
		}
	}

	function insertAttSendResLinks(aNode, newdid) {
		var aP = aNode.parentNode;
		if (aP && aP.innerHTML.indexOf("att_link_" + newdid) == -1) {
			var act = getArrDefaultrpAction();
			//insert a market link for this village
			var srlink = newLink("&nbsp;" + gIcons["r41"]);
			srlink.href = aNode.href.replace("karte.php?d", "build.php?z") + "&gid=17";
			aP.insertBefore(srlink, aNode.nextSibling);
			//insert an attack/reinforcement link for this village
			var atklink = newLink("&nbsp;" + gIcons[act[0]], [['href', 'a2b.php?z=' + newdid], ['id', 'att_link_' + newdid]]);
			aP.insertBefore(atklink, aNode.nextSibling);
		}
	}

	function insertAllyLinks(aNode, aid, strName) {
		var aP = aNode.parentNode;
		if (aP &&aP.innerHTML.indexOf(imgPr) == -1) {
			//insert the Travmap link
			if (TB3O.boolShowTravmapAllyLinks == "1") aP.insertBefore(createMapLink("ally", aid, strName), aNode.nextSibling);
			//insert the Travian World Analyser link
			if (TB3O.boolShowStatLinks == "1") aP.insertBefore(createStatLink("ally", aid), aNode.nextSibling);
		}
	}

	function getTroopIndexTitleFromImage(tImg) {
		var tInfo = [0, ""];
		if (tImg.src.match(/img\/un\/u\/(\d+)\.gif/)) {
			tInfo[0] = RegExp.$1;
			tInfo[1] = tImg.title;
		} else {
			var imgCN = tImg.getAttribute("class");
			if (imgCN != null) {
				if (imgCN.indexOf("unit") != -1 && imgCN.indexOf(" ") != -1) {
					tInfo[0] = imgCN.split(" ")[1].replace("u", "");
					tInfo[1] = tImg.title;
				}
			}
		}
		return tInfo;
	}

	//add player & ally links - IGM, World Analyser, Map Analyser
	function playerLinks(idNode){
		//var aL = document.getElementsByTagName("a");
		var wrp = get(idNode);
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
			} else if (aL[i].href.search(/karte.php\?d=(\d+)/) > 0  && crtPage.indexOf("build.php?gid=17") == -1 && crtPage.indexOf("&t=1") == -1) {
				var vID = RegExp.$1;
				if (vID != aVillage.vID) {
					insertAttSendResLinks(aL[i], vID);
					if (TB3O.bRpr == "1" && (crtPage.indexOf("build.php?id=39") != -1 || crtPage.indexOf("gid=16") != -1 || crtPage.indexOf("berichte.php") != -1) || crtPage.indexOf("spieler.php?") != -1 || crtPage.indexOf("allianz.php?s=3") != -1) {
						//add a tooltip including distance and troop times
						aL[i].addEventListener("mouseover", showCoordAndDist(vID), false);
						aL[i].addEventListener("mouseout", function() {get("tb_tooltip").style.display = 'none';}, false);
					}
				}
			//an alliance link
			} else if (aL[i].href.search(/allianz.php\?aid=(\d+$)/) > 0){
				var a = RegExp.$1;
				if (a == 0) continue;
				insertAllyLinks(aL[i], a, aL[i].textContent);
			//a message link
			} else if (TB3O.bMO == "1" && (aL[i].href.indexOf("nachrichten.php?id=") != -1 || aL[i].href.indexOf("berichte.php?id=") != -1)) addReadMesRepInPopup(aL[i]);
		}

		function showCoordAndDist(vID) {
			return function() {
				var cdTable = newTable([['style', 'padding:0px; spacing:0px; width:0%;']]);
				var cd1Row = newRow("");
				var xy = id2xy(vID);
				var cd1Cell = newCell("(" + xy[0] + "|" + xy[1] + ")", [['style', 'text-align:center; font-weight:bold; color:green; border:0 none white; border-bottom:1px solid grey;'], ['colspan', '2']]);
				cd1Row.appendChild(cd1Cell);
				cdTable.appendChild(cd1Row);
				var ttHTML = cdTable.innerHTML;
				ttHTML += getTroopMerchantTooltipHTML(vID, "blue", false, true, true);
				ttHTML = "<table>" + ttHTML + "</table>";
				var ttDiv = get("tb_tooltip");
				if (ttDiv == null) ttDiv = createTooltip();
				ttDiv.innerHTML = ttHTML;
				ttDiv.style.display = 'block';
				cdTable = null;
			}
		}
	}

	//just to add the time tables for troops and merchants
	function quickCity() {
		var formInput = find("//form[@name='snd']", XPFirst);
		if (!formInput) return;

		if (crtPage.indexOf('a2b.php') != -1 || crtPage.indexOf('karte.php?d=') != -1) {
			var x = null;
			var y = null;
			var strSearch = "//form[@name='snd']";
			var aForm = find(strSearch, XPFirst);
			if (aForm) {
				x = find(strSearch + "//input[@name='x']", XPFirst);
				y = find(strSearch + "//input[@name='y']", XPFirst);
			}
			if (x) x.addEventListener('keyup', function() {captureDestination();}, 0);
			if (y) y.addEventListener('keyup', function() {captureDestination();}, 0);
			if (crtPage.indexOf('a2b.php?z=') != -1) captureDestination();
			if (crtPage.indexOf('a2b.php?newdid=') != -1 && crtPage.indexOf('z=') != -1) captureDestination();
		}

		function captureDestination() {
			var xD = x.value;
			var yD = y.value;
			var parOK = null;
			if (xD != "" && yD != "") {
				var oldTb = get("trooptimetable");
				if (oldTb) {
					parOK = oldTb.parentNode;
					oldTb.parentNode.removeChild(oldTb);
				}
				//var ttTable = newTable();
				//for compatibility to the Travian Battle Analyser
				if (!parOK) {
					parOK = find("//form[@name='snd']/p[4]", XPFirst);
					//normal case, when Travian Battle Analyser is not active
					if (!parOK) parOK = find("//form[@name='snd']/p[3]", XPFirst);
					if (!parOK) {
						btnOK = get("btn_ok");
						if (btnOK) {
							var parOK = elem("P", "");
							btnOK.parentNode.appendChild(parOK);
						}
					}
				}
				//parOK.appendChild(ttTable);
				//var aRow = newRow("&nbsp;");
				//ttTable.appendChild(aRow);
				//createTimeTroopTable(aRow, xD, yD);
				createTimeTroopTable(parOK, xD, yD);
			} else {
				var oldTb = get("trooptimetable");
				if (oldTb) oldTb.style.visibility = "hidden";
			}
			return;
		}
	}

	function getOrigBRTable() {
		var strSearch = "//table[@class='std reports_read']";
		if (TB3O.T35 == false) strSearch = "//table[@class='tbg']";
		var oT = find(strSearch, XPFirst);
		if (!oT) oT = find("//table[@class='reports std']", XPFirst);
		if (!oT) oT = get("report_surround");
		return oT;
	}


	function battleReportV2(aFrom){
		var origT = getOrigBRTable();
		if (!origT) return;
		var txtorigT = origT.innerHTML;
		if (TB3O.boolShowTB3BattleReport != '1') return;

		var t = find("//table[@class='std reports_read']//table[@class='std'] | //table[@class='tbg']//table[@class='tbg']", XPList);
		if (t.snapshotLength < 2) t = find("//table[@class='std reports_read']//table[@class='tbg']", XPList);
		if (t.snapshotLength < 2) t = find("//table[starts-with(@id, 'attacker') or starts-with(@class, 'defender')]", XPList);
		if (t.snapshotLength < 2) return;

		if (aFrom == "orig") {
			var neworigT = origT.cloneNode(true);
			var divlmid2 = get(dmid2);
			divlmid2.removeChild(origT);
			//add a paragraph, a table with a text and a checkbox
			var input = newInput([['type', 'checkbox'], ['id', 'tb_battlereport']]);
			input.addEventListener("click", function() { showHideOriginalBattleReport(p1, neworigT, origT); }, 0);

			var p2 = elem("P", "");
			var ptable = newTable();
			var aRow = newRow("", [['class', 'tb3rnb']]);
			var aCell = newCell(T('SHOWORIGREPORT') + ":", [['class', 'tb3cnb'], ['style', 'text-align:'+ docDir[0] + ';']]);
			aRow.appendChild(aCell);
			var bCell = newCell("", [['class', 'tb3cnb'], ['style', 'text-align:' + docDir[0] + ';']]);
			bCell.appendChild(input);
			aRow.appendChild(bCell);
			ptable.appendChild(aRow);
			p2.appendChild(ptable);
			divlmid2.appendChild(p2);

			//create a  second paragraph (for displaying the tables)
			var p1 = elem("P", "");
			//append the paragraph to the divlmid2
			var divlmid2 = get(dmid2);
			divlmid2.appendChild(p1);
			p1.appendChild(origT);
		}

		//get the total booty info (PLUS accounts)
		var gBooty = find("//div[@class='carry']", XPFirst);
		var bgBooty = null;
		if (gBooty) bgBooty = gBooty.cloneNode(true);

		//get the total booty
		var booty = 0;
		var labelReward = gIcons["capacity"];
		var imgRes = new Array;
		for (var i = 0; i < 4; i++) {imgRes[i] = gIcons["r" + (i + 1)];}
		var stBooty = [0, 0, 0, 0];

		if (TB3O.T35 == false) {
			straXsearch = "//tr[@class='cbg1']";
			var aX = find(straXsearch, XPList);
			if (aX.snapshotLength == 0) aX = find("//table[@class='tbg']//tr", XPList);
			if (aX.snapshotLength >= 3){
				var intToProcess = -1;
				for (var i = 0; i < aX.snapshotLength; i++) {if (aX.snapshotItem(i).childNodes.length == 4) intToProcess = i;}
				if (intToProcess > -1) {
					var b = aX.snapshotItem(intToProcess).childNodes[3];
				} else {
					var b = aX.snapshotItem(1).childNodes[1];
					if (b.innerHTML.indexOf('class="res"') == -1) b = aX.snapshotItem(2).childNodes[1];
				}
				if (b.childNodes.length == 8){
					var qBooty = new Array();
					var infoBooty = '';
					for (var i = 0; i < 4; i++) {
						qBooty[i] = parseInt(b.childNodes[i*2 + 1].nodeValue);
						infoBooty += imgRes[i];
						infoBooty += qBooty[i];
						if (i < 3) infoBooty += ' + '; else infoBooty += ' = ';
						stBooty[i] = qBooty[i];
					}
					booty = arrayToInt(qBooty);
					infoBooty += booty;
					b.innerHTML = infoBooty;
					if (bgBooty != null) b.appendChild(bgBooty);
				}
			}
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
			}
			if (gata) {
				var resInfo = bootyCell;
				for (var xi = 0; xi < bootyCell.childNodes.length; xi++) {
					var aChild = bootyCell.childNodes[xi];
					if (aChild.className == "goods" || aChild.className == "res") resInfo = aChild;
				}

				var aqBooty = resInfo.textContent.split("|");
				if (aqBooty.length > 1) {
					var qBooty = new Array();
					for (var i = 0; i < 4; i++) {
						qBooty[i] = parseInt(aqBooty[i].replace(" ", "").replace(" ", ""));
						infoBooty += imgRes[i];
						infoBooty += qBooty[i];
						if (i < 3) infoBooty += ' + '; else infoBooty += ' = ';
						stBooty[i] = qBooty[i];
					}
					booty = arrayToInt(qBooty);
					infoBooty += booty;
					bootyCell.innerHTML = infoBooty;
					if (bgBooty != null) bootyCell.appendChild(bgBooty);
				}
			}
		}

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
			var tTable = t.snapshotItem(g);
			var attdefPower = [0,0,0];
			var intNoOfCells = tTable.rows[1].cells.length - 1;
			if (intNoOfCells == 11) {
				//corrected by JOPS
				if (g == 0) tadPower[0][9] += 1; else tadPower[1][9] += parseInt(tTable.rows[2].cells[11].textContent);
			}
			if (g == 0) atkLabelCell = tTable.rows[0].cells[0].textContent; else defLabelCell = tTable.rows[0].cells[0].textContent;
			for(var j = 1; j < 11; j++){
				var tImg = tTable.rows[1].cells[j].getElementsByTagName('img')[0];
				var tInd = getTroopIndexTitleFromImage(tImg)[0];
				var tNo = parseInt(tTable.rows[2].cells[j].textContent);
				var tNoLost = 0;
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
					}
				}

				var u = uc[tInd];
				var p = tTable.rows[3] ? tTable.rows[3].cells[j].innerHTML : 0;
				var ptu = arrayByN(u, p);
				arrLoss[g] = arrayAdd(arrLoss[g], ptu.slice(0, 4));
				arrCarry[g] += (tTable.rows[2] ? tTable.rows[2].cells[j].innerHTML - p : 0) * u[4];
			}

			//add the attack/def power to the row[1].cells[0]
			var attdefCell = tTable.rows[1].cells[0];
			if (g == 0) {
				//the attacking power
				attdefCell.setAttribute('style', 'font-size:8pt; color:#FF8000');
				attdefCell.innerHTML = getLS(attdefPower[0]) + " " + gIcons["att_all"];
			} else {
				//the defense power of the defender (per table)
				attdefCell.setAttribute('style', 'font-size:8pt; color:green');
				attdefCell.innerHTML = getLS(attdefPower[1]) + " " + gIcons["def_i"] + "<br>" + getLS(attdefPower[2]) + " " + gIcons["def_c"];
			}

			// add the loss row to the att/def table
			var iHTML = '';
			for (var i = 0; i < 4; i++){
				iHTML += imgRes[i];
				iHTML += arrLoss[g][i];
				if (i < 3) iHTML += ' + '; else iHTML += ' = ';
				if (g == 0) tadPower[0][4 + i] += arrLoss[g][i]; else tadPower[1][4 + i] += arrLoss[g][i];
			}
			var lossTotal = arrayToInt(arrLoss[g]);
			if (g == 0) tadPower[0][3] += lossTotal; else tadPower[1][3] += lossTotal;
			if (lossTotal > 0) iHTML += " <b><font color='red'>" + lossTotal + "</font></b>"; else iHTML += lossTotal;
			var informe = newCell(iHTML, [['colspan', intNoOfCells], ['class', 's7']]);
			var aRow = newRow("", [['class', 'cbg1']]);
			aRow.appendChild(newCell(T('LOSS'), [['style', 'text-align:center;']]));
			aRow.appendChild(informe);
			tTable.appendChild(aRow);

			// For the attacker we'll compute the profit and efficiency of the attack
			if (g == 0){
				// Profit compared to lossTotal
				var profit = 0;
				if (arrCarry[g] == 0) {
					booty = 0;
					for (var i = 0; i < 4; i++) {stBooty[i] = 0;}
				} else  {
					profit = ((booty - lossTotal) * 100 / booty).toFixed(2);
				}
				if (booty == 0)	if (lossTotal == 0) profit = 0; else profit = -100;
				var bCell = newCell(profit + "%", [['colspan', intNoOfCells], ['class', 's7']]);
				var pRow = newRow("", [['class', 'cbg1']]);
				pRow.appendChild(newCell(T('PROFIT'), [['style', 'text-align:center;']]));
				pRow.appendChild(bCell);
				tTable.appendChild(pRow);

				// Efficiency -> the entire booty compared to how much the attacker can carry back (considering only the troops that survived)
				var efficiency = 100 - ((arrCarry[g] - booty) * 100 / arrCarry[g]);
				if (arrCarry[g] == 0) efficiency = 0;
				var bCell = newCell(efficiency.toFixed(2) + "% (" + booty + "/" + arrCarry[g] + ")", [['colspan', intNoOfCells], ['class', 's7']]);
				var eRow = newRow("", [['class', 'cbg1']]);
				eRow.appendChild(newCell(T('EFICIENCIA'), [['style', 'text-align:center;']]));
				eRow.appendChild(bCell);
				tTable.appendChild(eRow);
			}
		}

		//add a simple statistics table
		var sTable = newTable([['id', 'br_table'], ['width', '100%'], ['style', 'border:1px solid #C2C2C2; text-align:center; spacing:0px; padding:0px; border:1px solid silver;']]);

		//add the title row
		var sTitleRow = newRow("", [['class', 'tb3r']]);
		var sTcell1 = newCell(T('STATISTICS'), [['style','background-color:#F3F3F3; font-weight:bold; text-align:center;']]);
		sTitleRow.appendChild(sTcell1);
		sTitleRow.appendChild(newCell(atkLabelCell, [['style', 'background-color:#F3F3F3; font-weight:bold; color:#FF8000; text-align:center;']]));
		sTitleRow.appendChild(newCell(defLabelCell, [['style', 'background-color:#F3F3F3; font-weight:bold; color:#71D000; text-align:center;']]));
		sTable.appendChild(sTitleRow);

		//attack power row
		atkRow = newRow("");
		var atkIconCell = newCell(gIcons["att_all"], [['class', 'tb3cbt']]);
		atkRow.appendChild(atkIconCell);
		var atkAPower = newCell(getLS(tadPower[0][0]), [['class', 'tb3cbt'], ['style', 'text-align:' + docDir[1] + ';']]);
		atkRow.appendChild(atkAPower);
		var atkDPower = newCell(getLS(tadPower[1][0]), [['class', 'tb3cbt'], ['style', 'text-align:' + docDir[1] + ';']]);
		atkRow.appendChild(atkDPower);
		sTable.appendChild(atkRow);

		//def power rows
		var defiRow = newRow("");
		var defiIconCell = newCell(gIcons["def_i"], [['class', 'tb3cbt']]);
		defiRow.appendChild(defiIconCell);
		var defiAPower = newCell(getLS(tadPower[0][1]), [['class', 'tb3cbt'], ['style', 'text-align:' + docDir[1] + ';']]);
		defiRow.appendChild(defiAPower);
		var defiDPower = newCell(getLS(tadPower[1][1]), [['class', 'tb3cbt'], ['style', 'text-align:' + docDir[1] + ';']]);
		defiRow.appendChild(defiDPower);
		sTable.appendChild(defiRow);

		var defcRow = newRow("");
		var defcIconCell = newCell(gIcons["def_c"], [['class', 'tb3cbt']]);
		defcRow.appendChild(defcIconCell);
		var defcAPower = newCell(getLS(tadPower[0][2]), [['class', 'tb3cbt'], ['style', 'text-align:' + docDir[1] + ';']]);
		defcRow.appendChild(defcAPower);
		var defcDPower = newCell(getLS(tadPower[1][2]), [['class', 'tb3cbt'], ['style', 'text-align:' + docDir[1] + ';']]);
		defcRow.appendChild(defcDPower);
		sTable.appendChild(defcRow);

		//reward row (for the attacker only)
		var strRewATotal = getLS(booty) + (TB3O.boolShowBRStatDetails == '1' ? " " + T('TOTAL') : '');
		var rewATotal = newCell(strRewATotal, [['class', 'tb3cbt'], ['style', 'font-weight:bold;' + ' text-align:' + docDir[1] + ';']]);

		var rewRow1 = newRow("");
		var intDetailRowSpan = 1 + parseInt(TB3O.boolShowBRStatDetails);
		var rewLabelCell = newCell(labelReward, [['class', 'tb3cbt'], ['rowspan', intDetailRowSpan]]);
		rewRow1.appendChild(rewLabelCell);

		if (TB3O.boolShowBRStatDetails == '1') {
			var rewA = '';
			for (var i = 1; i < 5; i++) {getLS(rewA += stBooty[i - 1]) + " " + imgRes[i - 1] + "<br>";}
			rewADetail = newCell(rewA, [['class', 'tb3cbt'], ['style', 'text-align:' + docDir[1] + ';']]);
			rewRow1.appendChild(rewADetail);
		} else rewRow1.appendChild(rewATotal);

		rewRow1.appendChild(newCell('-', [['class', 'tb3cbt'], ['style', 'text-align:' + docDir[1] + ';'], ['rowspan', intDetailRowSpan]]));
		sTable.appendChild(rewRow1);

		if (TB3O.boolShowBRStatDetails == '1') {
			var rewRow2 = newRow("");
			var rewATotal = newCell(getLS(booty) + " " + T('TOTAL'), [['class', 'tb3cbt'], ['style', 'font-weight:bold;' + ' text-align:' + docDir[1] + ';']]);
			rewRow2.appendChild(rewATotal);
			sTable.appendChild(rewRow2);
		}

		//loss row
		var strLossATotal = getLS(tadPower[0][3]) + (TB3O.boolShowBRStatDetails == '1' ? " " + T('TOTAL') : '');
		var lossATotal = newCell(strLossATotal, [['class', 'tb3cbt'], ['style', 'font-weight:bold;' + ' text-align:' + docDir[1] + ';']]);
		if (tadPower[0][3] > 0) lossATotal.setAttribute('style', 'font-weight:bold; color:red' + '; text-align:' + docDir[1] + ';');

		var strLossDTotal = getLS(tadPower[1][3] + booty) + (TB3O.boolShowBRStatDetails == '1' ? " " + T('TOTAL') : '');
		lossDTotal = newCell(strLossDTotal, [['class', 'tb3cbt'], ['style', 'font-weight:bold;' + 'text-align:' + docDir[1] + ';']]);
		if (tadPower[1][3] + booty > 0) lossDTotal.setAttribute('style', 'font-weight:bold; color:red' + '; text-align:' + docDir[1] + ';');

		var lossRow1 = newRow("");
		var lossLabelCell = newCell(T('LOSS'), [['class', 'tb3cbt'], ['rowspan', intDetailRowSpan]]);
		lossRow1.appendChild(lossLabelCell);

		if (TB3O.boolShowBRStatDetails == '1') {
			var iLossA = '';
			var iLossD = '';
			for (var i = 1; i < 5; i++) {
				iLossA += getLS(tadPower[0][i + 3]) + imgRes[i - 1] + "<br>";
				iLossD += getLS(tadPower[1][i + 3] + stBooty[i - 1]) + " " + imgRes[i - 1] + "<br>";
			}
			var lossADetail = newCell(iLossA, [['class', 'tb3cbt'], ['style', 'text-align:' + docDir[1] + ';']]);
			if (tadPower[0][3] > 0) lossADetail.setAttribute('style', 'color:red' + '; text-align:' + docDir[1] + ';');
			lossRow1.appendChild(lossADetail);
			var lossDDetail = newCell(iLossD, [['class', 'tb3cbt'], ['style', 'text-align:' + docDir[1] + ';']]);
			if (tadPower[1][3] + booty > 0) lossDDetail.setAttribute('style', 'color:red;' + '; text-align:' + docDir[1] + ';');
			lossRow1.appendChild(lossDDetail);
		} else {
			lossRow1.appendChild(lossATotal);
			lossRow1.appendChild(lossDTotal);
		}
		sTable.appendChild(lossRow1);

		if (TB3O.boolShowBRStatDetails == '1') {
			var lossRow2 = newRow("");
			lossRow2.appendChild(lossATotal);
			lossRow2.appendChild(lossDTotal);
			sTable.appendChild(lossRow2);
		}

		//crop consumption of initial troops
		var ccRow = newRow("");
		var ccRowLabelCell = newCell(gIcons["r5"], [['class', 'tb3cbt']]);
		ccRow.appendChild(ccRowLabelCell);
		ccACell = newCell(tadPower[0][10] + " (-" + tadPower[0][8] + ")", [['class', 'tb3cbt'], ['style', 'text-align:' + docDir[1] + ';']]);
		ccDCell = newCell(tadPower[1][10] + " (-" + tadPower[1][8] + ")", [['class', 'tb3cbt'], ['style', 'text-align:' + docDir[1] + ';']]);
		ccRow.appendChild(ccACell);
		ccRow.appendChild(ccDCell);
		sTable.appendChild(ccRow);

		//hero row
		var heroRow = newRow("");
		var heroLabelCell = newCell(gIcons["hero"], [['class', 'tb3cbt']]);
		heroRow.appendChild(heroLabelCell);
		var acc = 0;
		if (tadPower[0][9] > 0) acc = tadPower[1][8];
		heroACell = newCell(acc, [['class', 'tb3cbt'], ['style', 'font-weight:bold;' + ' text-align:' + docDir[1] + ';']]);
		if (tadPower[1][9] > 0) acc = Math.floor(tadPower[0][8] / tadPower[1][9]); else acc = 0;
		heroDCell = newCell(acc, [['class', 'tb3cbt'], ['style', 'font-weight:bold;' + ' text-align:' + docDir[1] + ';']]);
		heroRow.appendChild(heroACell);
		heroRow.appendChild(heroDCell);
		sTable.appendChild(heroRow);

		//simple paragraph
		var sPar = document.createElement("P");
		brCell.appendChild(sPar);
		brCell.appendChild(sTable);

		function showHideOriginalBattleReport(p1, neworigT, origT) {
			var input = get("tb_battlereport");
			if (input) {
				if (input.checked == true) {
					p1.removeChild(origT);
					p1.appendChild(neworigT);
				} else {
					p1.removeChild(neworigT);
					p1.appendChild(origT);
				}
			}
		}
	}

	//get the troop movements from the "dorf1.php" page
	function getTroopMovements() {
		var arrAtt = new Array();
		var aTM = find("//div[@id='troop_movements']//table/tbody/tr", XPList);
		if (aTM.snapshotLength == 0) aTM = find("//div[starts-with(@id, 'ltbw')]//table[@class='f10']/tbody/tr", XPList);
		if (aTM.snapshotLength == 0) aTM = find("//table[@id='movements']/tbody/tr", XPList);
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
							}
						}
						var dFirst = new Date();
						dFirst.setTime(dFirst.getTime() + toSeconds(strTime) * 1000);
						arrAtt[arrAtt.length] = new xTrMov(imgType, intNo, dFirst.getTime());
					}
				}
			}
		}
		setGMcookieV2('TroopMovements', arrAtt, aVillage.vNewdid);
	}

	//Create the resource fields upgrade table
	function processDorf1() {
		getTroopMovements();
		var bIsC = isThisTheCapital();
		//get the buildings in progress
		var arrBiP = getArrBiP();

		var bRcC = getGMcookie("showcolorreslevels", false);
		if (bRcC == 'false') {setGMcookie("showcolorreslevels", '1', false);bRcC = '1';}

		if (bRcC == "1") {
			//create the DIV for the coloured level numbers
			var intTop = 69;
			if (TB3O.M35 == 1) intTop = 32; else if (TB3O.M35 == 2) intTop = 75;

			var posDIV = newDiv("", [['id', 'resDiv'], ['style', 'position:absolute; top:' + intTop + 'px; left:12px; z-index:20;']]);
			if (TB3O.T35 == false) {
				if (docDir[0] == 'right') addAttr(posDIV, [['style', 'position:absolute; top:69px; left:257px; z-index:20;']]);
			} else {
				if (docDir[0] == 'right') {
					if (TB3O.M35 == 2) pDs = 'position:absolute; top:' + intTop + 'px; left:240px; z-index:20;'; else pDs = 'position:absolute; top:30px; left:257px; z-index:20;';
					addAttr(posDIV, [['style', pDs]]);
				}
			}
			get(dmid2).appendChild(posDIV);
		}

		var grid = new Array(4);
		for (var i = 0; i < 4; i ++) {
			grid[i] = new Array(26);
			for(var j = 0; j <= 25; j++) {grid[i][j] = 0;}
		}

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

		var rDiv = find("//div[starts-with(@id,'village_map')]", XPFirst);
		var aTitle;
		if (rDiv) aTitle = find("//map[starts-with(@id, 'rx')]", XPFirst); else {
			rDiv = find("//div[starts-with(@id,'f')]", XPFirst);
			aTitle = find("//map[starts-with(@name, 'rx')]", XPFirst);
		}

		if (rDiv) {
			if (rDiv.className) rDiv.className.search(/f(\d+)/); else rDiv.id.search(/f(\d+)/);
			var tipo = RegExp.$1;
		}
		for (var i = 1; i <= 18; i++){
			if (TB3O.T35 == false) {
				var imgLvl = find("//img[@class='rf" + i + "']", XPFirst);
			} else {
				var imgLvl = 0;
				var aLvl = find("//img[starts-with(@class, 'reslevel rf" + i + " ')]", XPFirst);
				if (aLvl != null) imgLvl = aLvl.className.split(" ")[2].replace("level", "")
			}
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
				}
				grid[dist[tipo - 1][i - 1]][crtLevel] = i;
			} else grid[dist[tipo - 1][i - 1]][0] = i;

			var strClass = "reslevel rf" + i;// + " level" + crtLevel;
			if (TB3O.T35 == false) strClass = "rf" + i;
			var resLink = newLink("", [['href', "build.php?id=" + i], ['id', "RES" + i], ['class', strClass], ['title', aTitle.areas[i-1].title]]);

			if (posDIV) {
				posDIV.appendChild(resLink);
				var aDIV = createCNDiv(crtLevel, strNewLevel);
				resLink.appendChild(aDIV);
			}

			if (bRcC == "1") {
				aDIV.style.visibility = 'visible';
				var theDivColor = TB3O.CN_COL_NEUTRAL;
				if ((bIsC == false && crtLevel < 10) || (bIsC == true && TB3O.boolIsT2x != "1") || (bIsC == true && TB3O.boolIsT2x == "1" && crtLevel < 12)) {
					//select resource type
					var aCol = colorLvl(crtLevel, dist[tipo - 1][i - 1] + 1);
					if (aCol == 2) theDivColor = TB3O.CN_COL_UPG_VIA_NPC; else if (aCol == 0) theDivColor = TB3O.CN_COL_NO_UPG;
				} else theDivColor =  TB3O.CN_COL_MAX_LVL;
				aDIV.style.backgroundColor = theDivColor;
			}
		}

		var bRuT = getGMcookie("showresupgradetable", false);
		if (bRuT == 'false') {setGMcookie("showresupgradetable", '1', false); bRuT = '1';}

		if (bRuT == '1') {
			//create the resource fields upgrade table
			var table = newTable([["class", "tb3tb"], ["id", "upgTable"], ['style', 'text-align:' + docDir[0]]]);
			var aRow1 = newRow("", [['class', 'tb3rh']]);
			var showUpgTable = false;
			table.appendChild(aRow1);
			var noOfEntries = [0, 0, 0, 0];
			var noOfRow = 0;
			for (var i = 0; i < 4; i++) {
				var td1 = newCell(gIcons["r" + (i + 1)], [['class', 'tb3ch'], ['width','25%'], ['style', 'text-align:center;']]);
				aRow1.appendChild(td1);
				for (var j = 0; j < 25; j++){
					if ((bIsC) || (!bIsC && j < 10)){
						if (grid[i][j] > 0 && bCost[i + 1][j+1] != null){
							noOfEntries[i] = noOfEntries[i] + 1;
							for (k = 0; k < 4; k++) {
								if (noOfRow < noOfEntries[k]) {
									noOfRow = noOfEntries[i];
									var bRow = newRow("");
									for (xi = 0; xi < 4; xi++) {bRow.appendChild(newCell("", [['class', 'tb3c'], ['style', 'vertical-align:top;'], ['width','25%']]));}
									table.appendChild(bRow);
								}
							}
							var table2 = newTable([['class', 'tb3tbnb'], ['style', 'text-align:' + docDir[1] + '; vertical-align:top;']]);
							var td4 = table.rows[noOfEntries[i]].cells[i];
							td4.appendChild(table2);

							showUpgTable = true;
							var aRow3 = newRow("");

							var intxOffset = 17;
							if (j > 9) intxOffset = 13;
							var cDIV = newDiv(j, [['style', 'font-family: Arial,Helvetica,Verdana,sans-serif; font-size:9pt; color:black; position:relative; top:-28px;' + docDir[0] + ':' + intxOffset +'px; z-index:100;']]);

							var aLink = newLink("", [['href', "/build.php?id=" + grid[i][j]]]);
							var aDiv = newDiv("", [['style', 'width:0%;']]);
							var aImg = newImage([['src', image["upgr" + i]], ['title', T('RES' + (i + 1))]]);
							aDiv.appendChild(aImg);
							aDiv.appendChild(cDIV);
							aLink.appendChild(aDiv);

							var td = newCell("", [['class', 'tb3cnb'], ['style', 'vertical-align:top;']]);
							td.appendChild(aLink);
							aRow3.appendChild(td);

							var restante = calculateResourceTime(bCost[i + 1][j+1], "100");
							var td3 = newCell("", [['class', 'tb3cnb']]);
							aRow3.appendChild(td3);
							table2.appendChild(aRow3);
							var cpB = [bCost[i + 1][j][4], bCost[i + 1][j + 1][4]];
							var ccB = [bCost[i + 1][j][5], bCost[i + 1][j + 1][5]];
							//********************
							if (restante != null) {
								if (TB3O.boolShowCPinUpgTables == '1') restante.appendChild(getCpcRow(cpB, "cp"));
								if (TB3O.boolShowCCinUpgTables == '1') restante.appendChild(getCpcRow(ccB, "cc"));
								addAttr(td3, [['class', 'tb3cnb'], ['style', 'vertical-align:bottom;']]);
								td3.appendChild(restante);
							} else {
								td3.setAttribute('style', 'vertical-align:middle;');
								var aTb = newTable();
								var aRow = newRow("");
								var aCell = newCell('<a href="/build.php?id=' + grid[i][j] + '">' + T('EXTAV') + '</a>', [['class', 'tb3cnb'], ['style', 'font-size:8pt; font-weight:bold;']]);
								aRow.appendChild(aCell);
								aTb.appendChild(aRow);
								if (TB3O.boolShowCPinUpgTables == '1') aTb.appendChild(getCpcRow(cpB, "cp"));
								if (TB3O.boolShowCCinUpgTables == '1') aTb.appendChild(getCpcRow(ccB, "cc"));
								td3.appendChild(aTb);
							}
						}
					}
				}
			}
			//move the upgrade table down
			if (showUpgTable == true)  {
				var middleblock = get(dmid);
				table.style.top = deltaTopY(table) + 'px';
				table.style.position = "absolute";
				middleblock.appendChild(table);
			}
		}
		arrBiP = null;
		dist = null;
	}

	function getCpcRow(cpcPerDay, aType) {
		var cpcRow = newRow("");
		var dAr = '→';
		if (docDir[0] == 'right') dAr = '←';
		if (aType == "cp") {strIn = T('CPPERDAY'); tColor = "blue"} else if (aType == "cc") {strIn = gIcons["r5"];tColor = "red";}
		cpcRow.appendChild(newCell(strIn + ": " + cpcPerDay[0] + " " + dAr + " " + cpcPerDay[1], [['class', 'tb3cnb'], ['colspan', '3'], ['style', 'font-size:8pt; color:' + tColor + ';']]));
		return cpcRow;
	}

	function getNewUpgradeLevel(arrBiP, bName, bLevel) {
		var arrNewLevel = [parseInt(bLevel), ''];
		for (var xi = 0; xi < arrBiP.length; xi++) {
			if (arrBiP[xi].name != '') {
				if (arrBiP[xi].name == bName && parseInt(arrBiP[xi].lvl) == arrNewLevel[0] + 1) {
					arrNewLevel[0] += 1;
					arrNewLevel[1] = " (↑ " + (arrNewLevel[0] + 1) + ")";
				}
			}
		}
		return arrNewLevel;
	}

	function createCNDiv(levelX, strNewLevel, bCNcB) {
		var iHTML = levelX;
		var strBlink = '';
		if (bCNcB == '1' && strNewLevel != null && strNewLevel[1].indexOf("(") != -1) strBlink = 'text-decoration:blink;';
		var aDIV = newDiv(iHTML, [['style', 'visibility:visible;' + strBlink], ['class', 'CNbuildingtags']]);
		return aDIV;
	}

	//Create the buildings upgrade table & center numbers if necessary
	function processDorf2() {
		var mapB = get('map2');
		if (!mapB) mapB = find("//map[@name='" + dmap + "']", XPFirst);
		if (mapB == null) return;

		var bCN = getCNprefs();
		var intCpR = 3;
		var boolShowTable = false;
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
			}
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
		}

		function sortBuildingsInUpgTable(bData, k) {
			//insertion sort
			for (var i = 0; i < k; i++) {
				var kData = bData[i];
				var j = i;
				while (j > 0 && bData[j - 1].name > kData.name) {
					bData[j] = bData[j - 1];
					j--;
				}
				bData[j] = kData;
			}
			return bData;
		}

		function getCNprefs() {
			//center numbers array of preferences: showCN, showCNcolors, showCNblink
			var bCN = [1, 1, 1];
			var aTemp = getGMcookie("showcenternumbers", false);
			if (aTemp == 'false') {setGMcookie("showcenternumbers", '1', false); bCN[0] = 1;} else bCN[0] = parseInt(aTemp);

			aTemp = getGMcookie("showcolorbuildlevels", false);
			if (aTemp == 'false') {setGMcookie("showcolorbuildlevels", '1', false); bCN[1] = 1;} else bCN[1] = parseInt(aTemp);

			aTemp = getGMcookie("showbblink", false);
			if (aTemp == 'false') {setGMcookie("showbblink", '1', false); bCN[2] = 1;} else bCN[2] = parseInt(aTemp);

			return bCN;
		}

		//get the building images
		var bImg = new Array();
		if (TB3O.T35 == false) {
			var aXP = find("//div[@id='" + dmid2 + "']/img/@src", XPList);
		} else {
			var aXP = find("//div[starts-with(@id, 'village_map')]/img[starts-with(@class, 'building') or starts-with(@class, 'dx') or starts-with(@class, 'ww')]", XPList);
			if (!aXP || aXP.snapshotLength == 0) aXP = find("//div[starts-with(@class, 'village2_map') and not (@id='village2_levels')]//img[starts-with(@class, 'building') or starts-with(@class, 'dx')]", XPList);
		}
		if (TB3O.T35 == false) bImg[0] = img('g/g16.gif');
		for (var i = 0; i < aXP.snapshotLength; i++) {
			if (TB3O.T35 == false) {
				bImg[bImg.length] = aXP.snapshotItem(i).nodeValue;
			} else {
				var clName = aXP.snapshotItem(i).getAttribute("class");
				if (clName != null && clName != '') {
					var clName1 = clName.split(" ");
					if (clName1.length > 1) bImg[bImg.length] = clName1[clName1.length - 1] + ".gif";
				}
			}
		}

		//get the type of wall
		var ahref = find("//area[@href='build.php?id=40']", XPFirst);
		if (ahref) {
			var b = '';
			switch (TB3O.crtUserRace) {
				case "Romans": b = "g/g31.gif"; break;
				case "Teutons": b = "g/g32.gif"; break;
				case "Gauls": b = "g/g33.gif"; break;
			}
			if (b != '') {if (TB3O.T35 == false) bImg[bImg.length - 2] = img(b); else bImg[bImg.length] = b;}
		}

		//get building array and set the required cookies
		var maxB = bImg.length;
		for (var i = 0; i < bImg.length; i++) {
			bData[i] = new xBinfo(mapB.areas[i].title, mapB.areas[i].href, mapB.areas[i].coords, bImg[i]);
			switch (bData[i].gid) {
				case 25: specBuildings[0] = 25;	break; //residence is available
				case 26: specBuildings[0] = 26; break; //palace is available
				case 19: {specBuildings[1] = 19; TB3O.boolIsAvBarracks = true; if (TB3O.crtUserRace == 'false' || TB3O.dispUserRace == 'false') getRace()}; break;
				case 29: specBuildings[2] = 29;	break;
				case 21: specBuildings[3] = 21;	break;
				case 20: specBuildings[4] = 20;	break;
				case 30: specBuildings[5] = 30;	break;
				case 14: specBuildings[6] = bData[i].lvl; break;
				case 24: specBuildings[7] = 24;	break;
			}
		}
		setGMcookieV2('specBuildings', specBuildings, aVillage.vNewdid);

		var boolShowBUpgTable = getGMcookie("showbupgtable");
		if (boolShowBUpgTable == 'false') {setGMcookie("showbupgtable", '1', false); boolShowBUpgTable = '1';}

		var aTb = newTable([["class", "tb3tbnb"], ["id", "upgTable"], ['style', 'text-align:' + docDir[0] + ';']]);
		var j = 0;
		var k = bImg.length;
		if (TB3O.T35 == false) k = k - 1;

		TB3O.boolShowSortedBiUpgT = getGMcookie("showsortedbiupgt");
		if (TB3O.boolShowSortedBiUpgT == 'false') {setGMcookie("showsortedbiupgt", '0', false); TB3O.boolShowSortedBiUpgT = '0';}
		if (TB3O.boolShowSortedBiUpgT == '1') bData = sortBuildingsInUpgTable(bData, k);

		var divmap2 = find("//div[starts-with(@class, 'village2_map d2_')]", XPFirst);
		if (divmap2 && bCN[0] == 1) {
			var dm2c = divmap2.className.split(" ");
			divmap2.className = 'village2_mapTB3 ' + dm2c[1];
		}

		for (var i = 0; i < k; i++) {
			if (bData[i].gid != -1 && bData[i].lvl != -1) {
				var strNewLevel = [bData[i].lvl, ''];
				var bLevel = bData[i].lvl;
				if (arrBiP != null) {
					strNewLevel = getNewUpgradeLevel(arrBiP, bData[i].name, bData[i].lvl);
					bLevel = strNewLevel[0];
				}
				if (bCN[0] == 1 && bLevel != -1) {
					//show center numbers if required
					var aDIV = createCNDiv(bData[i].lvl, strNewLevel, bCN[2]);
					var xy = bData[i].xy.split(",");
					var dy = 30;
					if (TB3O.M35 == 0 || TB3O.M35 == 2) dy = 60;
					aDIV.style.top = parseInt(xy[1]) + dy + 'px';
					aDIV.style.left = parseInt(xy[0]) + 95 + 'px';

					var bMaxLevel = getBmaxLevel(bData[i].gid);
					var theDivColor = TB3O.CN_COL_NEUTRAL;
					if (bCN[1] == 1) {
						if (bLevel == bMaxLevel || bLevel == 100) {
							theDivColor =  TB3O.CN_COL_MAX_LVL;
						} else {
							var aCol = colorLvl(bLevel, bData[i].gid);
							switch (aCol) {
								case 0: theDivColor = TB3O.CN_COL_NO_UPG; break;
								case 2: theDivColor = TB3O.CN_COL_UPG_VIA_NPC; break;
							}
						}
					}
					aDIV.style.backgroundColor = theDivColor;
					get(dmid2).appendChild(aDIV);
					log(3, "aDIV.style.top = " + aDIV.style.top);
				}

				if (boolShowBUpgTable == '1') {
					//create a new cell in the building uprade table id necessary
					if (bCost[bData[i].gid] != null && bCost[bData[i].gid][bLevel + 1] != null) {
						// check/create a new row if necessary
						if (j % intCpR == 0){
							var aRow = newRow("", [['class', 'tb3r']]);
							aTb.appendChild(aRow);
						}
						j++;

						boolShowTable = true;
						//Switch image for the roman wall/pallisade/earth wall/rally point
						var strBc = "";
						if (TB3O.M35 != 0) strBc = "building ";
						var imgB = 'class="' + strBc + 'g' + bData[i].gid + '" src="' + xGIF + '"';
						var strImgWidth = '';
						switch (bData[i].gid) {
							//31,32,33 - citywall, earth wall, palisade
							case 31: bData[i].bImg = image["citywall"]; imgB = 'src="' + bData[i].bImg + '"'; break;
							case 32: bData[i].bImg = image["earthwall"]; imgB = 'src="' + bData[i].bImg + '"'; break;
							case 33: bData[i].bImg = image["palisade"]; imgB = 'src="' + bData[i].bImg + '"'; break;
							case 16: bData[i].bImg = image["rallypoint"]; imgB = 'src="' + bData[i].bImg + '"'; break;
							case 40: bData[i].bImg = image["ww"]; imgB = 'src="' + bData[i].bImg + '"'; break;
						}

						var td = newCell("", [['class', 'tb3c'], ['width', Math.floor(100/intCpR) + '%'], ['style', 'vertical-align:top; border:1px solid silver;']]);
						aRow.appendChild(td);

						var tb2 = newTable([['class','bttable'], ['style', 'text-align:left;']]);
						td.appendChild(tb2);

						var nametr = newRow("");
						var nametd = newCell('<a href="' + bData[i].link + '">' + bData[i].title + strNewLevel[1] + '</a>', [['colspan',"2"], ['class', 'tb3cnb']]);
						nametr.appendChild(nametd);
						tb2.appendChild(nametr);

						var bRow = newRow("");
						if (TB3O.T35 == false) {
							imgB = 'src="' + bData[i].bImg + '"';
							strImgWidth = " width='90%' ";
						} else if (TB3O.M35 == 2) {
							strImgWidth = "width='70px' height='100px'";
						}
						var td2 = newCell('<a href="' + bData[i].link + '"><img ' + imgB + strImgWidth + '></a>', [['class', 'tb3cnb'], ['style', 'vertical-align:top;']]);
						bRow.appendChild(td2);
						tb2.appendChild(bRow);

						var restante = calculateResourceTime(bCost[bData[i].gid][bLevel + 1], "100");
						var td3 = newCell("", [['class', 'tb3cnb'], ['style','vertical-align:bottom;']]);
						bRow.appendChild(td3);
						var cpB = [bCost[bData[i].gid][bLevel][4], bCost[bData[i].gid][bLevel + 1][4]];
						var ccB = [bCost[bData[i].gid][bLevel][5], bCost[bData[i].gid][bLevel + 1][5]];

						if (restante != null) {
							if (TB3O.boolShowCPinUpgTables == '1') restante.appendChild(getCpcRow(cpB, "cp"));
							if (TB3O.boolShowCCinUpgTables == '1') restante.appendChild(getCpcRow(ccB, "cc"));
							td3.setAttribute('style', 'vertical-align:bottom;');
							td3.appendChild(restante);
						} else {
							td3.setAttribute('style', 'vertical-align:middle;');
							var xTable = newTable();
							var xRow = newRow("");
							var xCell = newCell('<a href="' + bData[i].link + '">' + T('EXTAV') + '</a>', [['class', 'tb3cnb'],['style', 'font-size:8pt; font-weight:bold;']]);
							xRow.appendChild(xCell);
							xTable.appendChild(xRow);
							if (TB3O.boolShowCPinUpgTables == '1') xTable.appendChild(getCpcRow(cpB, "cp"));
							if (TB3O.boolShowCCinUpgTables == '1') xTable.appendChild(getCpcRow(ccB, "cc"));
							td3.appendChild(xTable);
						}
					}
				}
			}
		}
		while (j % intCpR != 0) {
			aRow.appendChild(newCell("", [['class', 'tb3c']]));
			j++;
		}

		//reposition the building upgrade table vertically
		if (boolShowBUpgTable == '1') {
			if (boolShowTable == true)  {
				var middleblock = get(dmid);
				aTb.style.top = deltaTopY(aTb) + 'px';
				aTb.style.position = "absolute";
				middleblock.appendChild(aTb);
			}
		}
		arrBiP = null;
		bData = null;
		bImg = null;
	}

	function sortTable(sTableID, iCol, sDataType) {
		return function(){
			var oTable = get(sTableID);
			var oTBody = oTable.tBodies[0];
			var colDataRows = oTBody.rows;
			var aTRs = new Array;

			for (var i = 0; i < colDataRows.length; i++) aTRs[i] = colDataRows[i];
			if (oTable.getAttribute("sortCol") == iCol) aTRs.reverse(); else aTRs.sort(generateCompareTRs(iCol, sDataType));

			var oFragment = document.createDocumentFragment();
			for (var i = 0; i < aTRs.length; i++) oFragment.appendChild(aTRs[i]);

			oTBody.appendChild(oFragment);
			oTable.setAttribute("sortCol", iCol);
		}
	}

	function convert(aElement, sDataType) {
		switch(sDataType) {
			case "int": return ((aElement.nodeValue == null) || !aElement.nodeValue.match(/\d+/)) ? 0 : parseInt(aElement.nodeValue);
			case "float": return ((aElement.nodeValue == null) || !aElement.nodeValue.match(/\d+/)) ? 0 : parseFloat(aElement.nodeValue);
			default: return (aElement == null) ? '' : aElement.textContent.toLowerCase();
		}
	}

	function generateCompareTRs(iCol, sDataType) {
		return function compareTRs(oTR1, oTR2) {
			var v1 = convert(oTR1.cells[iCol].firstChild, sDataType);
			var v2 = convert(oTR2.cells[iCol].firstChild, sDataType);
			if (v1 < v2) return -1; else if (v1 > v2) return 1; else return 0;
		}
	}

	function showNoteBlock() {
		//add the noteblock if necessary
		if (TB3O.boolShowNoteBlock != '1') return;

		var aTb = createNoteBlock();
		if (TB3O.boolFloatNoteBlock != '1') {
			var parNB = document.createElement("P");
			parNB.appendChild(aTb);
			aTb = parNB;
		} else {
			var nbCoords = getGMcookie("noteblockXY", false);
			if (nbCoords == "false") {
				nbCoords = "680px|200px";
				setGMcookie("noteblockXY", nbCoords, false);
			}
			var noteblockXY = nbCoords.split("|");
			var nbWidth = aTb.style.width;
			var div = createFloatingDiv(parseInt(nbWidth), noteblockXY[0], noteblockXY[1], T('NOTEBLOCKOPTIONS'), 'noteblock', "noteblock_tooltip", true);
			TB3O.nodeToAppendNb = div;
		}
		TB3O.nodeToAppendNb.appendChild(aTb);
	}

	//Create a noteblock (data from GM cookie)
	function createNoteBlock(){
		var aTb = newTable([['class', 'tb3tbnb'], ['style', 'width:0%;'], ['id', 'noteblock']]);
		var crtState = getGMcookie("noteblock_state", false);
		var strStyleDisplay = '';
		if (crtState == "min" && TB3O.boolFloatNoteBlock == '1' ) strStyleDisplay = ' display:none;';

		var tr2 = newRow("", [['class', 'tb3rnb']]);
		var td2 = newCell("", [["class", 'tb3cnb']]);

		var nbValue = getGMcookie("notas", false);
		if (nbValue == "false") nbValue = "";

		var tArea = elem("TEXTAREA", nbValue);
		//addAttr(tArea, []);
		//height of the note block
		var nl = 10;
		var nbheight = 0;
		var nbheightX = getGMcookie('nbheight', false);
		if (nbheightX != "false") nbheight = parseInt(nbheightX);
		if (nbheight > 0) {
			if (nbValue != '') nl = 3 + nbValue.split("\n").length;
		}
		if (nl > 30) nl = 30;
		tArea.setAttribute("rows", nl);


		//width of the note block
		var nboption = 0;
		var nboptionX = getGMcookie('nbsize', false);
		if (nboptionX != false) nboption = parseInt('nboptionX');

		var dInfo = [280, '30'];

		if ((nboption == 0 && screen.width >= 1200) || nboption == 2) dInfo = [545, '60'];

		addAttr(aTb, [['style', "width:" + dInfo[0] + "px;" + strStyleDisplay]]);
		addAttr(tArea, [["cols", dInfo[1]], ["id", "noteblockcontent"], ["nowrap", false], ["style", 'background-image: url(' + image["underline"] + '); border:1px solid black; padding:0px 2px 0px 2px; overflow:auto; font-size:10pt; width:' + (dInfo[0] - 10) + 'px;']]);

		td2.appendChild(tArea);
		tr2.appendChild(td2);

		var tr3 = newRow("", [['class', 'tb3rnb']]);
		var td3 = newCell("", [["class", 'tb3cnb'], ['style', 'text-align:center;']]);

		var btnSave = newInput([['type', 'image'], ['border', '0'], ['src', image["buttonSave"]], ['title', T('SAVE')]]);
		btnSave.addEventListener("click", function(){setGMcookie("notas",tArea.value, false); alert(T('SAVED')); }, 0);
		var p1 = document.createElement("P");
		p1.appendChild(btnSave);
		td3.appendChild(p1);
		tr3.appendChild(td3);

		aTb.appendChild(tr2);
		aTb.appendChild(tr3);
		return aTb;
	}

	function getTTime(iTT, xRace, arX) {
		var tt = 1;
		switch (xRace) {
			case "Teutons": tt = 11; break;
			case "Gauls": tt = 21; break;
		}
		return Math.round(arX[0] * 3600 / uc[tt + iTT][8] / arX[4] + arX[1] * 3600 / uc[tt + iTT][8] / arX[4] / (1 + arX[2]/10));
	}

	function getMTime(qDist, xRace) {return Math.round(qDist * 3600 / mts[xRace] / (crtPage.indexOf('speed') != -1 ? 3 : 1));}

	function getTroopsDetails(qDist, xRace, boolIgnoreTS) {
		var arX = [qDist, 0, 0, 1, 1];
		if (boolIgnoreTS == false) {
			//get the tournament square level
			var strtsLevel = specBuildings[6];
			if (strtsLevel != 0) {
				//split the distance in 2 parts for distances > 30
				arX[2] = parseInt(strtsLevel);
				if (qDist > 30) {arX[0] = 30; arX[1] = qDist - 30;}
			}
		}
		//troop image ZERO index if not Romans race
		switch (xRace) {
			case "Teutons": arX[3] = 11; break;
			case "Gauls": arX[3] = 21; break;
		}
		//troop speed multiplier for speed servers
		if (crtPage.indexOf('speed') != -1) arX[4] = 2;
		return arX;
	}

	function createTimeTroopTable(pNode, x2, y2, boolAllRaces) {
		var vID = xy2id(x2, y2);
		var iHTML = getTroopMerchantTooltipHTML(vID, "blue", true, true, true, boolAllRaces);
		var aTb = newTable([['class', 'tb3tbnb'], ['style', 'width:350px;']]);
		if (TB3O.T35 == false) aTb = newTable([['class', 'tb3tbnb']]);
		aTb.innerHTML = iHTML;
		var aDiv = newDiv("", [['style', 'font-size:8pt;'], ['id', 'trooptimetable']]);
		aDiv.appendChild(aTb);
		pNode.appendChild(aDiv);
	}

	function createTimeMerchantTable(pNode, x2, y2) {
		var dRow = newRow("");
		insertAfter(pNode, dRow);
		var vID = xy2id(x2, y2);
		var iHTML = getTroopMerchantTooltipHTML(vID, "blue", true, true, false);
		var mWidth = '';
		if (TB3O.T35) mWidth = ' style=width:50%;';
		var aDiv = newDiv('<table' + mWidth + ' class="tb3tbnb">' + iHTML + '</table>', [['style', 'font-size:8pt;']]);
		dRow.parentNode.appendChild(aDiv);
		dRow.parentNode.id = "Merchanttimetable";
	}

	function isMarketSend() {
		var bML1 = false;
		var bML2 = false;
		var retValue = 0;
		if (find("//form[@action='build.php' and @name='snd']")) {
			var mL = document.getElementsByTagName("a");
			for (xi = 0; xi < mL.length; xi++) {
				if (mL[xi].href.indexOf("&t=1") != -1) bML1 = true;
				if (mL[xi].href.indexOf("&t=2") != -1) bML2 = true;
			}
			var iText = find("//input[@type='Text']|//input[@type='text']", XPList);
			var intText = iText.snapshotLength;
			if (bML1 && bML2) retValue = intText;
		}
		return (retValue >= 6);
	}

	function marketSend() {
		//we are inside the market, option "Send resources"
		// Array of new quantities
		var aQcarry = [100, 250, 500, 1000];
		var bAdjMc = true;
		var strMaxC = find("//form//p/b", XPFirst);
		var maxC = 0;
		if (strMaxC) {
			maxC = toNumber(strMaxC.innerHTML);
			for (var i = 0; i < aQcarry.length; i++) {
				if (maxC == aQcarry[i]) {
					bAdjMc = false;
					break;
				}
			}
			setGMcookieV2("merchantscapacity", maxC, aVillage.vID);
		} else maxC = merchantsCapacity;
		//Insert new quantities selectable via links on the market -> send resources page
		if (bAdjMc) aQcarry = [100, 500, 1000, maxC];
		var merchantsCell = find("//table[@class='f10']//tr//td[@colspan='2']", XPFirst);
		if (!merchantsCell) merchantsCell = find("//td[@class='mer']", XPFirst);
		if (merchantsCell) {
			var merchantsCellIHTML = merchantsCell.innerHTML;
			addCumulativeArrivals(maxC, merchantsCell.textContent);

			var mName = merchantsCellIHTML.split(' ')[0];
			setGMcookie("merchantsName", mName, false);
			var maxM = parseInt(merchantsCellIHTML.split(' ')[1].split('/')[0]);
			var mhMH = merchantsCellIHTML.split(' ')[0];
			var newMCIHTML = merchantsCellIHTML.replace('<br>', '');
			merchantsCell.innerHTML = newMCIHTML;
		}
		var max_transport = maxM * maxC;
		var resTb = find("//table[@class='f10']", XPFirst);
		if (resTb == null) resTb = get('send_res');
		if (resTb == null) resTb = get("send_select");
		var rxI = new Array();
		for (var i = 0; i < 4; i++){
			//Remove original options
			var aRow = resTb.rows[i];
			aRow.removeChild(aRow.cells[3]);

			//clear single resource - code provided by matteo466
			var aCell = newCell("", [['style', 'vertical-align:middle; text-align:center;']]);
			var clRowImg = newImage([['src', image["del"]], ['title', T('ELIMINAR') + ' ' + T('RES'+(i+1))], ['style', 'width:12px; height:12px;']]);
			var delLink = newLink("", [['href', jsVoid]]);
			delLink.appendChild(clRowImg);
			delLink.addEventListener("click", clearTransportRes(i + 1), false);
			aCell.appendChild(delLink);
			aRow.appendChild(aCell);
			//end code provided by matteo466

			//For each new quantity and resource create a new link with the associated request
			for(var j = 0; j < aQcarry.length; j++){
				var xLink = newLink('&nbsp;' + aQcarry[j], [['href', jsVoid], ['style', 'font-size:8pt; white-space:nowrap; ']]);
				xLink.addEventListener('click', createEventmarketSend(i, aQcarry[j]), false);
				var aCell = newCell("", [['style', 'text-align:center; vertical-align:middle;']]);
				aCell.appendChild(xLink);
				aRow.appendChild(aCell);
			}
			//add the ALL option to the list of links
			var xLink = newLink('&nbsp;' + T('ALL'), [['href', jsVoid], ['style', 'font-size:8pt; white-space:nowrap;']]);
			xLink.addEventListener('click', createEventmarketSend(i, crtResUnits[i]), false);
			var aCell = newCell("", [['style', 'text-align:center;']]);
			aCell.appendChild(xLink);
			aRow.appendChild(aCell);

			rxI[i + 1] = find("//input[@name='r" + (i + 1) + "']", XPFirst);
			rxI[i + 1].addEventListener('keyup', mhRowUpdate, false);
			rxI[i + 1].addEventListener('change', mhRowUpdate, false);
		}

		//add all resource type images and the clear all button
		var clAllRow = newRow("");

		var aCell = newCell(gIcons["r1"] + gIcons["r2"] + gIcons["r3"] + gIcons["r4"], [['colspan', '2'], ['style', 'vertical-align:middle; white-space:nowrap;']]);
		clAllRow.appendChild(aCell);
		var aCell = newCell("", [['style', 'text-align:center; vertical-align:middle;']]);
		var clAllImg = newImage([['src', image["buttonDel"]], ['title', T('MTCLEARALL')]]);
		var clAllLink = newLink("", [['href', jsVoid]]);
		clAllLink.appendChild(clAllImg);
		clAllLink.addEventListener("click", clearTransport, false);
		aCell.appendChild(clAllLink);
		clAllRow.appendChild(aCell);

		var emptyCell = newCell("");
		clAllRow.appendChild(emptyCell);

		//add the quantities links for all res
		for (var i = 0; i < 4; i++) {
			var uCellA1 = newCell("", [['style', 'text-align:center;']]);
			var useThemLinkA1 = newLink('<span style="white-space:nowrap;">&nbsp;' + aQcarry[i] + '</span>', [['href', jsVoid], ['style', 'font-size:8pt;']]);
			useThemLinkA1.addEventListener('click', createEventmarketSendAll(aQcarry[i]), false);
			uCellA1.appendChild(useThemLinkA1);
			clAllRow.appendChild(uCellA1);
		}

		//add the real ALL resources link (don't know if it really makes sense)
		var uCellA1 = newCell("", [['style', 'text-align:center;']]);
		var useThemLinkA1 = newLink('<span style="white-space:nowrap;">&nbsp;' + T('ALL') + '</span>', [['href', jsVoid], ['style', 'font-size:8pt;']]);
		useThemLinkA1.addEventListener('click', createEventMarketAllRes, false);
		uCellA1.appendChild(useThemLinkA1);
		clAllRow.appendChild(uCellA1);

		resTb.appendChild(clAllRow);

		var merchantsRow = merchantsCell.parentNode;
		merchantsCell.setAttribute("colspan", "3");
		var mIHTML = merchantsCell.innerHTML;
		var bigTable = get("target");
		if (!bigTable) bigTable = get("target_select");
		if (bigTable == null) {
			bigTable = merchantsRow.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			if (bigTable) {
				if (!bigTable.rows) return;
				var bigRow = bigTable.rows[0];
				var bigRowCell0 = bigRow.cells[0];
				bigRowCell0.setAttribute("width", "70%");
				var bigRowCell1 = bigRow.cells[1];
				bigRowCell1.setAttribute("width", "30%");
				var firstBigRow = newRow("");
				var firstBigCell = newCell("", [["width", "70%"]]);
				firstBigRow.appendChild(firstBigCell);
				var secondBigCell = newCell(mIHTML, [["style", "font-weight:bold; color:darkblue;"], ["width", "30%"]]);
				firstBigRow.appendChild(secondBigCell);
				bigTable.removeChild(bigRow.parentNode);
				bigTable.appendChild(firstBigRow);
				bigTable.appendChild(bigRow);
				merchantsRow.removeChild(merchantsCell);
				merchantsRow.parentNode.rows[1].cells[0].setAttribute('colspan', '4');
				merchantsRow.parentNode.rows[2].cells[0].setAttribute("colspan", '4');
				merchantsRow.parentNode.rows[3].cells[0].setAttribute("colspan", '4');
			}
		} else {
			if (docDir[0] == 'left') bTstyle = 'position:absolute; top:165px; left:350px;'; else bTstyle = 'position:absolute; top:150px; right:320px;';
			addAttr(bigTable, [['style', bTstyle]]);
			var bigRow = bigTable.rows[0];
			var bigRowCell0 = bigRow.cells[0];
			addAttr(bigRowCell0, [['style', 'font-weight:bold; color:darkblue;']]);
			var ccoo = find("//td[@class='coo']", XPFirst);
			ccoo.setAttribute('colspan', '3');
			var cvil = find("//td[@class='vil']", XPFirst);
			cvil.setAttribute('colspan', '3');
		}

			var uTRc = getGMcookie('usethemres', false);
		if (uTRc == 'false') {
			var uTRc = 'true|true|true|true';
			setGMcookie('usethemres', uTRc, false);
		}
		var aUTR = uTRc.split("|");

		var uRow1 = newRow("");
		var uCell1 = newCell(gIcons["r1"], [['style', 'width:30px;']]);
		uRow1.appendChild(uCell1);
		var uCell2 = newCell("", [['style', 'width:30px']]);
		var i1Check = newInput([['type', 'checkbox'], ['id', 'res1x'], ['title', T('USE') + " " + T('RES1')]]);
		i1Check.checked = eval(aUTR[0]);
		i1Check.addEventListener('click', saveUseThemResOption(1), false);
		uCell2.appendChild(i1Check);
		uRow1.appendChild(uCell2);

		var uCell3 = newCell("");
		var useThemLink = newLink(gIcons["usethempr"], [['href', jsVoid]]);
		useThemLink.addEventListener('click', createEventUseThemAllPr, false);
		uCell3.appendChild(useThemLink);
		uRow1.appendChild(uCell3);

		insertAfter(merchantsRow, uRow1);

		var uRow2 = newRow("");
		var uCell4 = newCell(gIcons["r2"]);
		uRow2.appendChild(uCell4);
		var uCell5 = newCell("");
		var i2Check = newInput([['type', 'checkbox'], ['id', 'res2x'], ['title', T('USE') + " " + T('RES2')]]);
		i2Check.checked = eval(aUTR[1]);
		i2Check.addEventListener('click', saveUseThemResOption(2), false);
		uCell5.appendChild(i2Check);
		uRow2.appendChild(uCell5);

		var uCell6 = newCell("");
		var useThemLinkEq = newLink(gIcons["usethemeq"], [['href', jsVoid]]);
		useThemLinkEq.addEventListener('click', createEventUseThemAllEq, false);
		uCell6.appendChild(useThemLinkEq);
		uRow2.appendChild(uCell6);

		insertAfter(uRow1, uRow2);

		var uRow3 = newRow("");
		var uCell7 = newCell(gIcons["r3"]);
		uRow3.appendChild(uCell7);
		var uCell8 = newCell("");
		var i3Check = newInput([['type', 'checkbox'], ['id', 'res3x'], ['title', T('USE') + " " + T('RES3')]]);
		i3Check.checked = eval(aUTR[2]);
		i3Check.addEventListener('click', saveUseThemResOption(3), false);
		uCell8.appendChild(i3Check);
		uRow3.appendChild(uCell8);

		var uCell9 = newCell("");
		var useThemLink1H = newLink(gIcons["usethem1h"], [['href', jsVoid]]);;
		useThemLink1H.addEventListener('click', createEventUseThemAll1H, false);
		uCell9.appendChild(useThemLink1H);
		uRow3.appendChild(uCell9);

		insertAfter(uRow2, uRow3);

		var uRow4 = newRow("");
		var uCell10 = newCell(gIcons["r4"]);
		uRow4.appendChild(uCell10);
		var uCell11 = newCell("");
		var i4Check = newInput([['type', 'checkbox'], ['id', 'res4x'], ['title', T('USE') + " " + T('RES4')]]);
		i4Check.checked = eval(aUTR[3]);
		i4Check.addEventListener('click', saveUseThemResOption(4), false);
		uCell11.appendChild(i4Check);
		uRow4.appendChild(uCell11);
		uRow4.appendChild(newCell(""));

		insertAfter(uRow3, uRow4);

		var xyD = new Array();
		xyD[0] = find("//form[@name='snd']//input[@name='x']", XPFirst);
		xyD[0].addEventListener('keyup', captureMerchantDestination, 0);
		xyD[1] = find("//form[@name='snd']//input[@name='y']", XPFirst);
		xyD[1].addEventListener('keyup', captureMerchantDestination, 0);
		if (crtPage.indexOf("z=") != -1) captureMerchantDestination();

		function saveUseThemResOption(i) {
			return function() {
				var uR = get('res' + i + 'x');
				if (uR) {
					var uTRc = getGMcookie('usethemres', false);
					var aUTR = uTRc.split("|");
					if (uR.checked == true) aUTR[i - 1] = 'true'; else aUTR[i - 1] = 'false';
					uTRc = aUTR.join("|");
					setGMcookie("usethemres", uTRc, false);
				}
			}
		}

		//function provided by matteo466
		function clearTransportRes(i) {
			return function() {
				rxI[i].value = '';
				mhRowUpdate();
			}
		}

		function clearTransport() {
			for (var i = 1; i < 5; i++) {rxI[i].value = '';}
			mhRowUpdate();
		}

		function createEventUseThemAllPr() {
			var totRes = 0;
			for (var i = 0; i < 4; i++) {
				var useRes = get("res" + (i + 1) + "x");
				if (useRes && useRes.checked == true) totRes += crtResUnits[i];
			}
			var dmx = max_transport / totRes;

			//changes by darkytoothpaste to use the full merchants capacity
			var minResource = 99999;
			var minResourceType = 0;
			var totalResourceSent = 0;

			for (var i = 1; i < 5; i++) {
				var useRes = get("res" + i + "x");
				var aRes = 0;
				if (useRes && useRes.checked == true) {
					aRes = Math.floor(crtResUnits[i - 1] * dmx);
					if (aRes > crtResUnits[i - 1]) aRes = crtResUnits[i - 1];
					if (aRes < minResource) {
						minResource = aRes;
						minResourceType = i;
					}
				}
				rxI[i].value = aRes;
				totalResourceSent += aRes;
			}
			//ensure that we maximise our merchants
			if (crtResUnits[minResourceType - 1] >= (minResource + (max_transport - totalResourceSent))) rxI[minResourceType].value = minResource + (max_transport - totalResourceSent);
			mhRowUpdate();
		}

		function createEventUseThemAllEq() {
			var totRes = 0;
			var intSelected = 0;
			for (var i = 0; i < 4; i++) {
				var useRes = get("res" + (i + 1) + "x");
				if (useRes && useRes.checked == true) {
					totRes += crtResUnits[i];
					intSelected += 1;
				}
			}
			var minA = max_transport / intSelected;
			var minB = totRes / intSelected;
			minX = Math.min(parseInt(minA), parseInt(minB));
			for (var i = 1; i < 5; i++) {
				var useRes = get("res" + i + "x");
				var aRes = 0;
				if (useRes && useRes.checked == true) {
					aRes = minX;
					if (aRes > crtResUnits[i - 1]) aRes = crtResUnits[i - 1];
				}
				rxI[i].value = aRes;
			}
			mhRowUpdate();
		}

		function createEventUseThemAll1H() {
			var totalRes = 0;
			var intSelected = 0;
			for (var i = 0; i < 4; i++) {
				var useRes = get("res" + (i + 1) + "x");
				var intPPH = prodPerHour[i];
				if (i == 0) intPPH = prodPerHour[4];
				totalRes += intPPH;
				if (useRes.checked == true) intSelected += 1;
			}

			var prod1H = [prodPerHour[0], prodPerHour[1],  prodPerHour[2], prodPerHour[4]];

			for (var i = 0; i < 4; i++) {
				var useRes = get("res" + (i + 1) + "x");
				var aRes = 0;
				if (useRes && useRes.checked == true) {
					if (intSelected == 4) aRes = prod1H[i]; else aRes = Math.floor(totalRes / intSelected);
					if (aRes > crtResUnits[i]) aRes = crtResUnits[i];
				}
				rxI[i + 1].value = aRes;
			}
			mhRowUpdate();
		}

		function createEventMarketAllRes() {
			for (var i = 0; i < 4; i++) {rxI[i + 1].value = crtResUnits[i];}
			mhRowUpdate();
		}

		function mhRowUpdate() {
			var totTransport = 0;
			for (var xi = 1; xi < 5; xi++) {
				var aR = parseInt(rxI[xi].value);
				if (!isNaN(aR)) totTransport += aR;
			}
			var totMerchants = Math.ceil(totTransport / maxC);
			var mhColor = 'darkgreen';
			var crtWaste = maxC - (totTransport - (totMerchants-1) * maxC);
			var crtExceed = totTransport - max_transport;
			var mhText = gIcons["merchant"] + "<b>" + " (" + mhMH + "): " + totMerchants + "/" + maxM + "<br>" + T('MAX') + ": " + maxM * maxC + "<br>";

			if (totMerchants > maxM) {
				mhColor = "red";
				mhText += T('MTEXCEED') + ": "+ crtExceed;
			} else mhText += T('MTWASTED') + ": "+ crtWaste;
			mhText += "<br>" + T('MTCURRENT') + ": " + totTransport + "</b>";
			var mhCell = get("mhMerchants");
			if (mhCell == null) {
				var mhRow = newRow("");
				var mhCell = newCell(mhText, [["id", "mhMerchants"], ["style", 'color:' + mhColor + ';line-height:16px;'], ["colspan", '9']]);
				mhRow.appendChild(mhCell);
				resTb.appendChild(mhRow);
			} else {
				mhCell.innerHTML = mhText;
				mhCell.setAttribute("style", 'color:' + mhColor);
			}
		}

		function createEventmarketSend(i, q) {
			return function(){
				var aInput = document.getElementsByTagName('INPUT')[i + 1];
				var aValue = aInput.value;
				var aSum = 0;
				if (aValue != '') aSum = parseInt(aValue);
				aSum += q;
				if (aSum > crtResUnits[i]) aSum = crtResUnits[i];
				if (aSum > max_transport) aSum = max_transport;
				aInput.value = aSum;
				mhRowUpdate();
			}
		}

		function createEventmarketSendAll(q) {
			return function(){
				var arrInp = document.getElementsByTagName('INPUT');
				for (var i = 0; i < 4; i++) {
					var aInput = arrInp[i + 1];
					var aValue = aInput.value;
					var aSum = 0;
					if (aValue != '') aSum = parseInt(aValue);
					aSum += q;
					if (aSum > crtResUnits[i]) aSum = crtResUnits[i];
					if (aSum > max_transport) aSum = max_transport;
					aInput.value = aSum;
				}
				mhRowUpdate();
			}
		}

		function captureMerchantDestination() {
			var x = xyD[0].value;
			var y = xyD[1].value;
			var oldTable = get("Merchanttimetable");
			if (x != "" && y != "") {
				if (oldTable) var oldChild = oldTable.parentNode.removeChild(oldTable);
				var aRow = newRow("");
				var bRow = newRow("");
				aRow.appendChild(bRow);
				var mtTable = newTable();
				mtTable.appendChild(aRow);
				var parOK = find("//form[@name='snd']/p[2]", XPFirst);
				parOK.appendChild(mtTable);
				createTimeMerchantTable(aRow, x, y);
			} else {
				if (oldTable) oldTable.style.visibility = "hidden";
			}
		}

		//initial function provided by david.macej
		//modified by ms99
		function MerchantArrivingTitles(maxC, strAvTotM) {
			var retValue = '';
			var strMparTitles = xpathResultEvaluate("//div[@id='" + dmid2 + "']/form/p[@class='b']|//div[@id='" + dmid2 + "']//form/h4");
			if (strMparTitles.snapshotLength == 0) {return retValue;}
			var retValue1 = strMparTitles.snapshotItem(0).textContent;
			if (strMparTitles.snapshotLength == 2) return retValue1;//2 groups: 1st is arriving mercs, 2nd is own mercs

			var otherMercs = xpathResultEvaluate("//div[@id='" + dmid2 + "']/form/table[@class='tbg']/tbody/tr[1]/td[1]/a[1][not(contains(@href, 'spieler.php?uid=" + TB3O.crtUserID + "'))]");
			if (otherMercs.snapshotLength == 0) otherMercs = xpathResultEvaluate("//div[@id='" + dmid2 + "']//form/table[@class='traders']/thead/tr[1]/td[1]/a[1][not(contains(@href, 'spieler.php?uid=" + TB3O.crtUserID + "'))]");
			if (otherMercs.snapshotLength > 0) return retValue1; //only 1 group: the arriving mercs group
			var arrAvTotM = strAvTotM.split(" ")[1].split("/");
			var mercsOnWay = arrAvTotM[1] - arrAvTotM[0];

			var resSpanOnMercTables = xpathResultEvaluate("//div[@id='" + dmid2 + "']/form/table[@class='tbg']/tbody/tr[3]/td[2]/span[@class='f10']");
			if (resSpanOnMercTables.snapshotLength == 0) resSpanOnMercTables = xpathResultEvaluate("//div[@id='" + dmid2 + "']//form/table[@class='traders']//tr[@class='res']//span[@class='f10']");
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
			}
			if (totalMercsOnTables > mercsOnWay) return retValue1; else return retValue;
		}

		//initial function provided by david.macej
		//modified by ms99: changed to table, added timers
		function addCumulativeArrivals(maxC, strAvTotM) {
			// selects the receiving merchants
			var origPar = find("//div[@id='" + dmid2 + "']/form/table[@class='tbg']|//div[@id='" + dmid2 + "']/form/p[@class='b']|//div[@id='" + dmid2 + "']//form/h4", XPFirst);
			if (!origPar) return;
			var sendReceive = xpathResultEvaluate("//div[@id='" + dmid2 + "']/form/table[@class='tbg']|//div[@id='" + dmid2 + "']/form/p[@class='b']|//div[@id='" + dmid2 + "']//form/table[@class='traders']|//div[@id='" + dmid2 + "']//form/h4");

			if (sendReceive.snapshotLength == 0) return;
			var strMercArrTitles = MerchantArrivingTitles(maxC, strAvTotM);

			if (strMercArrTitles != origPar.textContent) return;
			var tRow = null;
			var allValues = [0, 0, 0, 0, 0];

			//create table to sum the resources
			var txtPar = origPar.textContent.replace(":", "");
			armTable = newTable([['class', 'tb3tb'], ['style', 'line-height:16px;']]);
			var hRow = newRow("", [['class', 'tb3r']]);
			var hCell = newCell(T('SUMMARY') + " - " + txtPar, [['class', 'cbgx'], ['colspan', '6'], ['style', 'font-size:10pt; font-weight:bold;']]);
			hRow.appendChild(hCell);
			armTable.appendChild(hRow);
			var rRow = newRow("");
			var qRow = newRow("");
			tRow = newRow("");

			var cCell = newCell(gIcons["clock"]);
			rRow.appendChild(cCell);
			var tCell = newCell("", [["id", "timeouta"], ['style', 'font-size:9pt; font-weight:bold;']]);
			qRow.appendChild(tCell);
			var eCell = newCell("");
			tRow.appendChild(eCell);

			for (var xi = 1; xi < 6; xi++) {
				if (xi < 5) {
					var iCell = newCell(gIcons["r" + xi]);
					var tCell = newCell("00:00:00", [['id', 'timeouta'], ['style', 'font-weight:normal; font-size:9pt;']]);
				} else {
					var iCell = newCell(T('TOTAL'), [['style', 'font-weight:bold;']]);
					var tCell = newCell("");
				}
				rRow.appendChild(iCell);
				var qCell = newCell("0", [['class', 'tb3c'], ['id', "arrmQ" + xi], ['style', 'font-size:9pt; font-weight:bold;']]);
				qRow.appendChild(qCell);
				tRow.appendChild(tCell);
			}

			armTable.appendChild(rRow);
			armTable.appendChild(qRow);
			armTable.appendChild(tRow);
			var aPar = elem("P", "");
			aPar.appendChild(armTable);
			origPar.appendChild(aPar);
			//finished creating the additional sum table

			//get server time
			var sT = get("tp1").textContent.split(":");
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
					var bTb = newTable([['class', 'tb3tbnb']]);
					var bTbR1 = newRow("", [['class', 'tb3rnb']]);
					var bTbR2 = newRow("", [['class', 'tb3rnb']]);
					var tdRes = aTb.rows[2].cells[1].textContent;
					var inRes = tdRes.split(" | ");
					var tdTime = get('timer' + i);//anyway only the last timer will be used in the armTable
					for (var zi = 0; zi < 4; zi++) {
						var aValue = parseInt(inRes[zi]);
						arrRes[zi] += aValue;
						allValues[zi] += aValue;
						allValues[4] += aValue;
					}

					if (TB3O.bSaIeMa == '1') {
						var aR = newRow("", [['class', 'tb3r']]);
						xts = toSeconds(tdTime.textContent);
						var deltaS = xts - aTs;
						var xt = formatTime(sTs + xts, 2);
						var aC1 = newCell(gIcons['clock'] + " " + xt, [['class', 'tb3c'], ['style', 'padding-' + docDir[0] + ':2px; text-align:' + docDir[0] + '; font-weight:bold; font-size:8pt; color:blue;']]);
						var strBorder = 'border-' + docDir[1] + ':1px solid black; ';
						for (xi = 0; xi < 4; xi++) {
							var strColor = '';
							var qu = rAtArr[xi] + parseInt((prodPerHour[xi] / 3600) * deltaS + parseInt(inRes[xi]));
							if (xi == 3) strBorder = '';
							var iHTML1 = " " + gIcons['r' + (xi + 1)] + " ";
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
							}
							var bC1 = newCell(iHTML1, [['class', 'tb3c'], ['style', 'width:25%; padding:0px; padding-' + docDir[0] + ':2px; text-align:' + docDir[0] + '; font-size:8pt;' + strColor + strBorder]]);
							var bC2 = newCell(iHTML2, [['class', 'tb3c'], ['style', 'width:25%; padding:0px; padding-' + docDir[0] + ':2px; text-align:center; font-size:8pt;' + strColor + strBorder]]);
							bTbR1.appendChild(bC1);
							bTbR2.appendChild(bC2);
						}
						aTs = xts;
						var aC2 = newCell("", [['class', 'tb3c'], ['colspan', '2'], ['style', 'padding:1px; text-align:' + docDir[0] + ';']]);
						bTb.appendChild(bTbR1);
						if (boolAddRow2) bTb.appendChild(bTbR2);
						aC2.appendChild(bTb);
						aR.appendChild(aC1);
						aR.appendChild(aC2);
						aTb.appendChild(aR);
					}
				}
			}

			//add the values  (res1...res4 & Total) to the armTable
			for (var xi = 0; xi < 5; xi++) get("arrmQ" + (xi + 1)).innerHTML = getLS(allValues[xi]);
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
						}
					} else if (timeToEmpty > tdTimeSeconds) {
						timeToEmpty = totalAtArrival / Math.abs(PpS);
						timeToShow = timeToEmpty;
						if (timeToEmpty < 7200) txtStyle = ['white', 'red', 'bold'];
					}
				} else if (prodPerHour[zi] == 0) {
					if (totalAtArrival >= capacity[zi]) {
						timeToFill = tdTimeSeconds;
						timeToShow = timeToFill;
						if (timeToFill < 7200) txtStyle = ['white', 'darkgreen', 'bold'];
					} else {
						timeToShow = T('NEVER');
					}
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
					}
					if (timeToShow < 7200) txtStyle = ['white', 'darkgreen', 'bold'];
				}
				timeToShow = formatTime(timeToShow, 0);

				if (tRow != null) {
					var rtCell = tRow.cells[zi + 1];
					addAttr(rtCell, [['id', 'timeouta'], ['style', 'font-weight:normal; background-color:' + txtStyle[1] + ' !important; font-weight:' + txtStyle[2] + ' !important; color:' + txtStyle[0] + '; important;' + strX]]);
					rtCell.innerHTML = timeToShow;
				}
			}
		}
	}

	//return the number of villages that can be built based on the number of CP available
	function cp2villages(cp){
		var retValue;
		if (crtPage.indexOf("speed") > -1) retValue = Math.round(Math.pow(3*cp/1600, 1 / 2.3)); else {
			if (TB3O.boolIsT2x == "1") retValue = Math.round(Math.pow(cp/2000, 1 / 2)); else retValue = Math.round(Math.pow(cp/1600, 1 / 2.3));
		}
		return retValue;
	}

	//return the no of CP needed to create a specific no of villages (version from fr3nchlover)
	function villages2cp(noVil){
		var retValue;
		if (crtPage.indexOf("speed") != -1) {
			retValue = Math.round(1.6/3 * Math.pow(noVil, 2.3)*10) * 100;
		} else {
			retValue = 2000;
			if (noVil > 1) {
				if (TB3O.boolIsT2x == "1") retValue = Math.round(2 * Math.pow(noVil, 2)*10) * 100; else retValue = Math.round(1.6 * Math.pow(noVil, 2.3)) * 1000;
			}
		}
		return retValue;
	}

	function culturePoints(){
		var aX = find("//div[@id='" + dmid2 + "']//b", XPList);
		var intAdd = 0;
		if (TB3O.T35 == false) {
			if (aX.snapshotLength != 5) return;
			intAdd = 1;
		} else if (aX.snapshotLength != 4) return;

		var bckCG = '#C8FFC8';
		var bckCR = '#FFE1E1';

		//CP for all villages
		var prodTotalCP = toNumber(aX.snapshotItem(intAdd + 1).innerHTML);
		//Current no of CP
		var crtTotalCP = toNumber(aX.snapshotItem(intAdd + 2).innerHTML);
		//CP needed to create a new village
		var pc_aldea_prox = toNumber(aX.snapshotItem(intAdd + 3).innerHTML);

		//No of current villages
		var crtVil = cp2villages(pc_aldea_prox);
		//No of villages to be build with current CP

		var textMenu = find("//p[@class='txt_menue']", XPFirst);
		if (!textMenu) textMenu = get("textmenu");
		if (textMenu) var aV = textMenu.textContent.replace('\n', '').split(" |");

		//create the new cp to villages table
		var cpTable = newTable([['class', 'tb3tb']]);
		//header row 11
		var rCP1 = newRow("", [['class', 'tb3rh']]);
		var c11 = newCell(T('VILLAGE'), [['class', 'tb3chb'], ['rowspan', 2], ['style', 'font-size:8pt;']]);
		rCP1.appendChild(c11);
		var c12 = newCell(aV[1], [['class', 'tb3chb'], ['colspan', 2], ['style', 'font-size:8pt;']]);
		rCP1.appendChild(c12);
		var c13 = newCell(gIcons["clock"], [['class', 'tb3chb'], ['colspan', 2]]);
		rCP1.appendChild(c13);
		cpTable.appendChild(rCP1);
		//header row 2
		var rCP2 = newRow("", [['class', 'tb3rh']]);
		var c22 = newCell(T('TOTAL'), [['class', 'tb3chb'], ['style', 'font-size:8pt;']]);
		rCP2.appendChild(c22);
		var c23 = newCell(T('YOUNEED'), [['class', 'tb3chb'], ['style', 'font-size:8pt;']]);
		rCP2.appendChild(c23);
		var c24 = newCell(T('NEWVILLAGEAV'), [['class', 'tb3chb'], ['style', 'font-size:8pt;']]);
		rCP2.appendChild(c24);
		var c25 = newCell(T('TIMEUNTIL'), [['class', 'tb3chb'], ['style', 'font-size:8pt;']]);
		rCP2.appendChild(c25);
		cpTable.appendChild(rCP2);

		var maxNewVillages = 1;
		var boolReachedMaxNewVillages = false;

		for (var i = 0; i < maxNewVillages && i < 50; i++) {
			var cpRow = newRow("");
			var iHTML = [crtVil + i + 1, '', '', '', ''];
			//get the necessary CP for building/conquering a new village
			var reqCP = villages2cp(crtVil + i);

			if (reqCP <= crtTotalCP) {
				iHTML[1] = reqCP;
				iHTML[2] = "0";
				iHTML[3] = T('NOW');
				iHTML[4] = "0:00:00";
				var strStyle = "font-size:8pt; background-color:" + bckCG + ";";
				maxNewVillages += 1;
			} else {
				if (boolReachedMaxNewVillages == false) {
					maxNewVillages += 2;
					boolReachedMaxNewVillages = true;
				}
				//time until able to build/conquer a new village
				var tiempo = ((reqCP - crtTotalCP) / prodTotalCP) * 86400;
				iHTML[4] = formatTime(tiempo, 1);

				var dtNow = new Date();
				dtNow.setTime(dtNow.getTime() + (tiempo * 1000));
				iHTML[1] = reqCP;
				iHTML[2] = "" + (reqCP - crtTotalCP) ;
				iHTML[3] = computeTextTime(dtNow);
				var strStyle = "font-size:8pt; background-color:" + bckCR + ";";
			}
			for (var xi = 0; xi < 5; xi++) {
				var cpCellx = newCell(iHTML[xi], [['class', 'tb3c'], ['style', strStyle]]);
				cpRow.appendChild(cpCellx);
			}
			cpTable.appendChild(cpRow);
		}
		aX.snapshotItem(intAdd + 3).parentNode.parentNode.appendChild(cpTable);
	}

	function getMarketOfferRatioCell(aRow) {
		var aRatio = parseInt(aRow.cells[1].textContent) / parseInt(aRow.cells[3].textContent);
		var aColor = ['black', 'white'];
		if (aRatio < 1.00) aColor = ['red', '#FFE1E1']; else if (aRatio > 1.00) aColor = ['darkgreen', '#C8FFC8'];
		var ratioCell = newCell(aRatio.toFixed(2), [["style", "font-size:9px; background-color:" + aColor[1] + "; color:" + aColor[0] + ";"]]);
		var timeCell = aRow.cells[5];
		if (timeCell) timeCell.setAttribute("style", "font-size:10px");
		var actionCell = aRow.cells[6];
		if (actionCell) actionCell.setAttribute("style", "font-size:10px;");
		return ratioCell;
	}

	function getMarketOfferAllianceCell(aRow) {
		//aliance info from the title property of the player
		var aName = aRow.cells[4].getAttribute('title');
		if (aName == undefined || aName == null || aName == "") aName = "-";
		var aCell = newCell(aName, [['style', 'font-size:8pt']]);
		return aCell;
	}

	function addMarketOfferCellEvents(aRow) {
		var cellA = aRow.cells[3];
		var cellB = aRow.cells[6];
		var quantity = cellA.innerHTML;
		cellA.addEventListener('mouseover', showNeededMerchants(quantity), false);
		cellA.addEventListener("mouseout", function() {get("tb_tooltip").style.display = 'none';}, 0);
		cellB.addEventListener('mouseover', showNeededMerchants(quantity), false);
		cellB.addEventListener("mouseout", function() {get("tb_tooltip").style.display = 'none';}, 0);

		function showNeededMerchants(quantity) {
			return function() {
				var tt = get("tb_tooltip");
				if (tt == null) tt = createTooltip();
				var mQ = parseInt(quantity);
				var mC = parseInt(merchantsCapacity);
				//var mC = parseInt(capacity);
				var mTotal = 0;
				if (mC != 0) mTotal = Math.ceil(mQ / mC) + " x " + gIcons["merchant"] + ' (' + T('MERCHANTS') + ')';
				var aWaste = parseInt(mTotal) * mC - mQ;
				var aTb = newTable([['class', 'tb3tbnb']]);
				var aRow = newRow("", [['class', 'tb3rnb']]);
				var aCell = newCell(mTotal, [['class', 'tb3cnb'], ['style', 'font-size:8pt; font-weight:bold; color:blue; text-align:' + docDir[0] + ';']]);
				aRow.appendChild(aCell);
				aTb.appendChild(aRow);
				if (aWaste > 0) {
					var bRow = newRow("", [['class', 'tb3rnb']]);
					var bCell = newCell(T('MTWASTED') + ": " + aWaste, [['class', 'tb3cnb'], ['style', 'font-size:8pt; color:red; text-align:' + docDir[0] + ';']]);
					bRow.appendChild(bCell);
					aTb.appendChild(bRow);
				}
				tt.innerHTML = "";
				tt.appendChild(aTb);
				tt.style.display = 'block';
			}
		}
	}

	 //Create a new column showing the alliance of the player that offers resources for trade at the market and a ratio column
	function addAllyColumnForMarketOffers() {
		if (crtPage.indexOf('&t=1') == -1 && crtPage.indexOf('build.php?') == -1) return;
		//if (crtPage.indexOf('&t=1&u=') == -1 && crtPage.indexOf('&t=1&s') == -1 && crtPage.indexOf('&t=1&b') == -1) return;
		if (get("summary")) return;

		var aX = find("//tr[@class='rbg']", XPFirst);
		if (aX) aX = aX.parentNode; else {
			aX = get("market_buy");
			if (!aX) aX = get("range");
		}

		//prepare insertion of column
		var b = aX.getElementsByTagName("TR");
		var b = aX.rows;
		b[0].cells[0].setAttribute('colspan', '9');
		b[b.length - 1].cells[0].setAttribute('colspan', '9');

		//Create and insert the alliance & ration columns
		aColumn = newCell(T('ALLIANCE'), [['style', 'background-color:#ECECEC;']]);
		bColumn = newCell("", [['style', 'background-color:#ECECEC;']]);
		b[1].appendChild(aColumn);
		b[1].appendChild(bColumn);

		for(var i = 2; i < b.length - 1; i++){
			var allyCell = getMarketOfferAllianceCell(b[i]);
			b[i].appendChild(allyCell);
			var ratioCell = getMarketOfferRatioCell(b[i]);
			b[i].appendChild(ratioCell);
			addMarketOfferCellEvents(b[i]);
		}
	}

	function setOfferFilter(aOffer, aFilter) {
		addAttr(aOffer, [['style', 'display:none;'], ["filtro" + aFilter, "on"]]);
	}

	function quitMarketFilter(aOffer, aFilter, filtros) {
		aOffer.removeAttribute("filtro" + aFilter);
		var remove = true;
		for (var i = 0; i < filtros.length; i++) if (aOffer.getAttribute("filtro" + filtros[i]) == 'on') remove = false;
		if (remove == true) aOffer.removeAttribute("style");
	}

	function marketBuy() {
		if (crtPage.indexOf('&t=1&') != -1 && crtPage.indexOf('&t=1&u=') == -1) return;

		//get the original offers table
		var orOffersTb = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]", XPFirst);
		if (!orOffersTb) orOffersTb = get("market_buy");
		if (!orOffersTb) orOffersTb = get("range");

		getSavedMarketFilters();

		createFilterTable(orOffersTb);

		if (TB3O.T35 == false) {
			var linkid = find('//td[@class="rowpic"]/a', XPFirst, orOffersTb).href.match('id=([0-9]*)&')[1];
		} else {
			var lastCell = orOffersTb.rows[orOffersTb.rows.length - 1].cells[0];
			var linkid = lastCell.lastChild.href.match('id=([0-9]*)&')[1];
		}
		//market preload
		var marketpreloads = getGMcookie("marketpreload", false);
		if (marketpreloads == "false") {
			marketpreload = 0;
			setGMcookie("marketpreload", 0, false);
		} else {
			marketpreload = parseInt(marketpreloads) + 1;
		}

		var pageNo1 = crtPage.indexOf("&u=");
		var intPage = 0;
		if (pageNo1 != -1) {
			var pageNo2 = crtPage.indexOf("#h2");
			var pageNoS1 = crtPage.substring(pageNo1 + 3, pageNo2);
			var intPage = Math.round(parseInt(pageNoS1) / 40);
		}

		if (marketpreload > 1) {
			for (var i = 1; i < marketpreload; i++) {setTimeout(createPreloadFunc(i + intPage), getRndTime(1302));}
			var X2 = (marketpreload + intPage) * 40;
			var X1 = (intPage - marketpreload) * 40;
			var backLink = "build.php?id=" + linkid + "&t=1&u=" + X1 + "#h2";
			var forwardLink = "build.php?id=" + linkid + "&t=1&u=" + X2 + "#h2";
			var tdbfLinks = find('//td[@class="rowpic"]', XPFirst);
			if (!tdbfLinks) tdbflinks = orOffersTb.rows[orOffersTb.rows.length - 1].cells[0];
			if (tdbfLinks) {
				if (X1 < 0) {
					var aSpan = elem("SPAN", "«");
					addAttr(aSpan, [["style", "font-weight:bold;"], ["class", "c"]]);
				} else {
					var aSpan = newLink("« ", [['style', 'font-weigth:bold'],['href', backLink]]);
				}
				var fwLink = newLink("»&nbsp;", [['style', "font-weight:bold;"], ['href', forwardLink]]);
				tdbfLinks.innerHTML = "";
				tdbfLinks.appendChild(aSpan);
				tdbfLinks.appendChild(fwLink);
			}
		}

		function prepareOrigFilters() {
			var sTable = get("search_select");
			if (!sTable) return;
			var bTable = get("bid_select");
			var arrLinks = sTable.getElementsByTagName("A");
			if (arrLinks) {
				for (var i = 0; i < arrLinks.length; i++) {arrLinks[i].addEventListener("click", addAllyColumnForMarketOffers, false);}
			}
			arrLinks = bTable.getElementsByTagName("A");
			if (arrLinks) {
				for (var i = 0; i < arrLinks.length; i++) {arrLinks[i].addEventListener("click", addAllyColumnForMarketOffers, false);}
			}
		}

		function applyFilter(orOffersTb, aType, aOpt) {
			return function () {
				marketFilters[aType] = aOpt;
				setGMcookieV2("marketfilters", marketFilters, 'all');
				filterMarket(orOffersTb, aType, aOpt);
			}
		}

		function filterMarket(orOffersTb, tipo, resource) {
			for (var i = 2; i < orOffersTb.rows.length - 1; i++) {
				b = orOffersTb.rows[i];
				if (TB3O.T35 == false) {
					if (b.childNodes.length > 8) var error = true; else var error = false;
					b.childNodes[error ? 1 : 0].firstChild.src.search(/\/(\d).gif$/);
					var ofrezco = RegExp.$1;
					b.childNodes[error ? 4 : 2].firstChild.src.search(/\/(\d).gif$/);
					var busco = RegExp.$1;
					var ofrezco_cantidad = parseInt(b.childNodes[error ? 2 : 1].textContent);
					var busco_cantidad = parseInt(b.childNodes[error ? 6 : 3].textContent);
					if (b.childNodes[error ? 11 : 6].className == 'c') var carencia = true; else var carencia = false;
					var tiempo = toSeconds(b.childNodes[error ? 10 : 5].textContent);
				} else {
					var ofrezco = b.cells[0].firstChild.className.replace("r", "");
					var busco = b.cells[2].firstChild.className.replace("r", "");
					var ofrezco_cantidad = parseInt(b.cells[1].textContent);
					var busco_cantidad = parseInt(b.cells[3].textContent);
					var carencia = true;
					if (b.cells[6].className == 'act') carencia = false;
					var tiempo = toSeconds(b.cells[5].textContent);
				}

				switch (tipo) {
					case 0: if ((ofrezco != resource) && resource != 5) setOfferFilter(b, "Ofrezco"); else quitMarketFilter(b, "Ofrezco", ["Busco", "Tipo", "Carencia", "Tiempo"]); break;
					case 1: if ((busco != resource) && resource != 5) setOfferFilter(b, "Busco"); else quitMarketFilter(b, "Busco", ["Ofrezco", "Tipo", "Carencia", "Tiempo"]); break;
					case 2: switch(resource) {
						case 1: if (ofrezco_cantidad <= busco_cantidad) setOfferFilter(b, "Tipo"); else quitMarketFilter(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]); break;
						case 2: if (ofrezco_cantidad != busco_cantidad) setOfferFilter(b, "Tipo"); else quitMarketFilter(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]); break;
						case 3: if (ofrezco_cantidad >= busco_cantidad) setOfferFilter(b, "Tipo"); else quitMarketFilter(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]); break;
						case 4: quitMarketFilter(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]); break;
					} break;
					case 3: switch(resource) {
						case 1: if (carencia == true) setOfferFilter(b, "Carencia"); else quitMarketFilter(b, "Carencia", ["Ofrezco", "Busco", "Tipo", "Tiempo"]); break;
						case 2: quitMarketFilter(b, "Carencia", ["Ofrezco", "Busco", "Tipo", "Tiempo"]); break;
					} break;
					case 4: switch(resource) {
						case 1: if (tiempo > (60*60)) setOfferFilter(b, "Tiempo"); else quitMarketFilter(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]); break;
						case 2: if (tiempo > (2*60*60)) setOfferFilter(b, "Tiempo"); else quitMarketFilter(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]); break;
						case 3: if (tiempo > (3*60*60)) setOfferFilter(b, "Tiempo"); else quitMarketFilter(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]); break;
						case 4: quitMarketFilter(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]); break;
					} break;
				}
			}

			// Para mantener un unico sombreado por cada filtro, activa el que se ha seleccionado y elimina
			// el resto de su tipo
			for (var i = 0; i < 5; i++){
				for (var j = 0; j < 6; j++){
					var aFilters = find("//td[@id='filtro" + i + j + "']", XPFirst);
					if (aFilters) {
						if (i == tipo && j == (resource - 1)) aFilters.setAttribute("style", "background-color:#FFE4B5"); else if (i == tipo) aFilters.removeAttribute("style");
					}
				}
			}
		}

		function getSavedMarketFilters() {
			var cookieMF = getGMcookieV2('marketfilters');
			if (cookieMF && cookieMF['all']) {
				marketFilters = cookieMF['all'];
			} else {
				marketFilters = defaultMF;
				setGMcookieV2('marketfilters', marketFilters, 'all');
			}
		}

		function applyAllFilters(orOffersTb) {
			for (var i = 0; i < 5; i++) {if (marketFilters[i] != defaultMF[i]) filterMarket(orOffersTb, i , marketFilters[i]);}
		}

		function processOfferPage(t) {
			var ans = newDiv(t.responseText);
			var ansdoc = document.implementation.createDocument("", "", null);
			ansdoc.appendChild(ans);
			if (TB3O.T35 == false) {
				var strOffersTableRows = "//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]/tbody/tr";
				var xpres = ansdoc.evaluate(strOffersTableRows, ans, null, XPList, null);
				var linktrl = find(strOffersTableRows, XPList);
			} else {
				var strOffersTableRows = "//table[@id='market_buy']/tbody/tr";
				var xpres = ansdoc.evaluate(strOffersTableRows, ans, null, XPList, null);
				if (xpres.snapshotLength == 0) {
					strOffersTableRows = "//table[@id='range']/tbody/tr";
					xpres = ansdoc.evaluate(strOffersTableRows, ans, null, XPList, null);
				}
				var linktrl = find(strOffersTableRows, XPList);
			}

			var linktrlind = 3;
			linktr = linktrl.snapshotItem(linktrl.snapshotLength - 1);
			var linktimedata = toSeconds(linktr.childNodes[linktr.childNodes.length >= 12 ? 11 : 6].innerHTML);
			for (var i = 2; i < xpres.snapshotLength - 1; i++) {
				var mrow = xpres.snapshotItem(i);
				var timedata = toSeconds(mrow.childNodes[mrow.childNodes.length >= 12 ? 11 : 6].innerHTML);
				var allyCell = getMarketOfferAllianceCell(mrow);
				mrow.appendChild(allyCell);
				var ratioCell = getMarketOfferRatioCell(mrow);
				mrow.appendChild(ratioCell);
				addMarketOfferCellEvents(mrow);
				while (linktimedata < timedata && linktrlind < linktrl.snapshotLength - 1) {
					linktrlind++;
					linktr = linktrl.snapshotItem(linktrlind);
					if (linktr.innerHTML.indexOf('class="rowpic"') < 0) {
						linktimedata = toSeconds(linktr.childNodes[linktr.childNodes.length >= 12 ? 11 : 6].innerHTML);
					} else {
						linktimedata = 999999;
					}
				}
				linktr.parentNode.insertBefore(mrow, linktr);
			}
			applyAllFilters(orOffersTb);
		}

		function createPreloadFunc(page) {
			return function() {
				ajaxRequest("build.php?id=" + linkid + "&t=1&u=" + (page * 40) + "#h2", "GET", null, processOfferPage, dummy);
			}
		}

		function createFilterTable(orOffersTb) {
			var table = newTable([["class", "tb3tb"], ["style", "width:100%"]]);
			// Se crea la aTb con 3 filas, Ofrezco, Busco y Tipo
			var arrayLabels = [orOffersTb.rows[1].cells[0].textContent, orOffersTb.rows[1].cells[1].textContent];
			for (var j = 0; j < 2; j++){
				var tr = newRow("", [['class', 'tb3r']]);
				tr.appendChild(newCell(arrayLabels[j]));
				//Para Ofrezco y Busco se muestran 4 materiales y un quinto comodin
				for (var i = 0; i < 4; i++){
					var td = newCell("", [['class', 'tb3c'], ["id", "filtro" + j + i]]);
					//var ref = newLink(gIcons["r" + (i + 1)]);
					var ref = newLink(gIcons["r" + (i + 1)]);
					if (i + 1 == marketFilters[j]) td.setAttribute("style", "background-color:#FFE4B5");
					td.addEventListener("click", applyFilter(orOffersTb, j, i  + 1), 0);
					td.appendChild(ref);
					tr.appendChild(td);
				}
				var td = newCell("", [['class', 'tb3c'], ["id", "filtro" + j + "4"]]);
				if (marketFilters[j] == 5) td.setAttribute("style", "background-color:#FFE4B5");
				var ref = newLink(T('CUALQUIERA'), [['href', jsVoid]]);
				td.addEventListener("click", applyFilter(orOffersTb, j, 5), 0);
				td.appendChild(ref);
				tr.appendChild(td);
				table.appendChild(tr);
			}
			// Tipo de transaccion segun la relacion entre oferta y demanda
			var tr = newRow("", [['class', 'tb3r']]);
			tr.appendChild(newCell(T('TIPO')));
			table.appendChild(tr);
			var etiquetas_tipo = ["1:>1", "1:1", "1:<1", "1:x"];
			for (var i = 0; i < 4; i++){
				var td = newCell("", [['class', 'tb3c'], ["id", "filtro" + 2 + i]]);
				if (i+1 == marketFilters[2]) td.setAttribute("style", "background-color:#FFE4B5");
				var ref = newLink(etiquetas_tipo[i], [['href', jsVoid]]);
				td.addEventListener("click", applyFilter(orOffersTb, 2, i+1), 0);
				td.appendChild(ref);
				tr.appendChild(td);
			}
			tr.appendChild(newCell(""));

			//Tiempo maximo de transporte
			var tr = newRow("", [['class', 'tb3r']]);
			tr.appendChild(newCell(T('MAXTIME')));
			table.appendChild(tr);
			var etiquetas_tipo = ["1", "2", "3", ">3"];
			for (var i = 0; i < 4; i++){
				var td = newCell("", [['class', 'tb3c'], ["id", "filtro" + 4 + i]]);
				if (i+1 == marketFilters[4]) td.setAttribute("style", "background-color:#FFE4B5");
				var ref = newLink(etiquetas_tipo[i], [["href", jsVoid]]);
				td.addEventListener("click", applyFilter(orOffersTb, 4, i+1), 0);
				td.appendChild(ref);
				tr.appendChild(td);
			}
			tr.appendChild(newCell(""));
			//Filtro por disponibilidad de resources y mercaderes
			var tr = newRow("", [['class', 'tb3r']]);
			tr.appendChild(newCell(T('DISPONIBLE'), [['class', 'tb3c']]));
			table.appendChild(tr);
			var etiquetas_carencia = [T('YES'), T('NO')];
			for (var i = 0; i < 2; i++){
				var td = newCell("", [['class', 'tb3c'], ["colspan", "2"], ["id", "filtro" + 3 + i]]);
				if (i + 1 == marketFilters[3]) td.setAttribute("style", "background-color:#FFE4B5");
				var ref = newLink(etiquetas_carencia[i], [["href", jsVoid]]);
				td.addEventListener("click", applyFilter(orOffersTb, 3, i+1), 0);
				td.appendChild(ref);
				tr.appendChild(td);
			}
			tr.appendChild(newCell("", [['class', 'tb3c']]));
			applyAllFilters(orOffersTb);
			var p = document.createElement("P");
			p.appendChild(table);
			orOffersTb.parentNode.insertBefore(p, orOffersTb);
		}
	}

	function TimeToExplore() {
		var showCalculation = true;
		var arrY;
		var arrY = find('//div[@id="' + dmid2 + '"]//table[@class="f10"]/tbody/tr[1]/td', XPList);
		if (arrY.snapshotLength == 0) arrY = find('//td[@class="required"]', XPList);
		if (arrY.snapshotLength == 0) {
			arrY = find('//p[@id="contract"]', XPList);
			if (arrY.snapshotLength == 0) arrY = find("//table[@class='new_building']//td[@class='res']", XPList);
		}
		if (arrY.snapshotLength > 0) {
			for (var i = 0; i < arrY.snapshotLength; i++) {
				var aY = arrY.snapshotItem(i);
				var arrContent = aY.textContent.replace("\n", "").replace("\n", "").replace("\n", "").replace("\n", "").split("|");
				if (arrContent.length > 1) {
					var arrayRes = new Array;
					for (xi = 0; xi < 4; xi++) {
						var aQ = arrContent[xi];
						if (arrContent[xi].indexOf(":") != -1) {
							aQ = arrContent[xi].substr(arrContent[xi].lastIndexOf(":") + 1);
						} else if (arrContent[xi].indexOf(".") != -1) {
							aQ = arrContent[xi].substr(arrContent[xi].lastIndexOf(".") + 1);
						}
						var intVal = parseInt(aQ);
						if (isNaN(intVal)) {
							showCalculation = false;
						} else {
							arrayRes[arrayRes.length] = intVal;
						}
					}
					if (arrayRes == null || arrayRes.length < 4) showCalculation = false;

					if  (showCalculation == true) {
						aY.setAttribute("id", 'npcXX_1');
						var e = calculateResourceTime(arrayRes, "30");
						if (e) {
							var xCell = aY.parentNode;
							if (xCell) {
								if (xCell.nodeName == "TR") {
									var aDiv = newCell("");
									var aRow = newRow("", [['class', 'tb3rnb']]);
									aRow.appendChild(aDiv);
									xCell.parentNode.appendChild(aRow);
									e.setAttribute('style', 'width:30%;');
								} else if (xCell.nodeName == "FORM" || xCell.nodeName == "DIV") {
									var aDiv = document.createElement("P");
									xCell.appendChild(aDiv);
								}
							}
							aDiv.setAttribute('id', 'resNtable');
							aDiv.appendChild(e);
						}
					}
				}
			}
		}

		//fix for the armoury, blacksmith and town hall
		var boolIsTownHall = true;
		var mainTable = null;
		var levelx;
		mainTable = find("//div[@id='" + dmid2 + "']//table[@class='std build_details']", XPFirst);
		if (!mainTable)	mainTable = find("//div[@id='" + dmid2 + "']//table[starts-with(@class, 'build')]", XPFirst);
		if (!mainTable) {
			var ax = find("//table[@class='tbg']//tr[@class='cbg1']", XPFirst);
			if (ax == null || (ax.childNodes.length != 2 && ax.childNodes.length != 4)) return;
			mainTable = ax.parentNode.parentNode;
		}
		if (!boolIsTroopsTrainingBuilding) lspan = find("//span[@class='f8'] | //span[@class='info']", XPList);
		for (var xi = 1; xi < mainTable.rows.length; xi++) {
			var aCell = mainTable.rows[xi].cells[0];
			var aTb = aCell.childNodes[1];
			levelx = "";
			if (!aTb) aTb = aCell.childNodes[0];
			if (aTb) {
				if (aTb.nodeName == "TABLE") {
					//table to analyse in this cell
					var bCell = aTb.rows[0].cells[0];
					if (bCell.getAttribute("rowspan") != null) boolIsTownHall = false;
					var cCell = aTb.rows[1].cells[0];
					addAttr(cCell, [['id', 'npcXX_1'], ['style', 'font-size:8pt;']]);
					if (boolIsTownHall) {
						//code for missing resources for parties
						var dx = cCell.textContent.split("|").splice(0, 4);
						var ex = calculateResourceTime(dx, "30");
						if (ex != null) {
							mainTable.rows[xi].cells[1].innerHTML = '';
							mainTable.rows[xi].cells[1].appendChild(ex);
						}
					} else {
						aTb.rows[0].cells[1].textContent.search(/(\d+)/);
						levelx = RegExp.$1;
						if (levelx != '20') {
							var dx = cCell.textContent.split("|").splice(0,4);
							var ex = calculateResourceTime(dx, "30");
							if (ex != null) {
								mainTable.rows[xi].cells[1].innerHTML = '';
								mainTable.rows[xi].cells[1].appendChild(ex);
							}
						}
					}
				} else if (aTb.nodeName == "DIV") {
					var levelx = "0";
					var aSpan = aCell.childNodes[3];
					var bSpan = aSpan.childNodes[6];
					addAttr(bSpan, [['id', 'npcXX_1'], ['style', 'font-size:8pt;']]);
					aSpan = aSpan.childNodes[3];
					var boolShowCalculation = true;
					if (aSpan) {
						if (aSpan.textContent.indexOf("20)") != -1) boolShowCalculation = false;
					}
					if (boolShowCalculation == true) {
						var dx = bSpan.textContent;
						var dx = dx.split("|").splice(0, 4);
						var ex = calculateResourceTime(dx, "30");
						if (ex != null) {
							mainTable.rows[xi].cells[1].innerHTML = '';
							mainTable.rows[xi].cells[1].appendChild(ex);
						}
					}
				} else if (aTb.nodeName == "IMG") {
					var bRow = mainTable.rows[xi];
					if (bRow.cells[1].childNodes.length > 8) {
						var bCell = bRow.cells[1].childNodes[6];
						var aTimeElem = bRow.cells[1].childNodes[8];
					} else {
						var bCell = bRow.cells[1].childNodes[4];
						var aTimeElem = bRow.cells[1].childNodes[6];
					}
					if (!boolIsTroopsTrainingBuilding) {
						//check for level 20 in the armoury/blacksmith
						if (lspan.snapshotLength > 0) {
							arrLevelx = lspan.snapshotItem(xi - 1).textContent.split(" ");
							levelx = arrLevelx[arrLevelx.length - 1].replace(")", "");
						}
					}
					if (levelx != "20") {
						addAttr(bCell, [['id', 'npc_tt_r' + xi], ['style', 'font-size:8pt;']]);
						addAttr(aTimeElem, [['id', 'npc_tt_t' + xi], ['style', 'font-size:8pt;']]);
						var dx = bCell.textContent;
						var dx = dx.split("|").splice(0, 4);
						var ex = calculateResourceTime(dx, "100");
						if (ex != null) {
							if (mainTable.rows[xi].cells.length < 4) {
								mainTable.rows[xi].cells[2].innerHTML = '';
								mainTable.rows[xi].cells[2].appendChild(ex);
							}
						}
					}
				} else if (aTb.nodeName == "A") {
					var bRow = mainTable.rows[xi];
					var arrDivs = bRow.getElementsByTagName("DIV");
					var bCell = arrDivs[0];
					var aTimeElem = arrDivs[1];
					addAttr(bCell, [['id', 'npc_tt_r' + xi], ['style', 'font-size:8pt;']]);
					addAttr(aTimeElem, [['id', 'npc_tt_t' + xi], ['style', 'font-size:8pt;']]);
					var dx = bCell.textContent;
					var dx = dx.split("|").splice(0, 4);
					var ex = calculateResourceTime(dx, "30");
					if (ex != null) {
						mainTable.rows[xi].cells[1].innerHTML = '';
						mainTable.rows[xi].cells[1].appendChild(ex);
					}
				}
			}
		}
	}

	//change to the default attack type on the "Rally Point -> Send Troops" page
	function defaultAttackType(){
		//2:Defend, 3:Attack, 4:Raid
		//OASIS - only attack:raid (fr3nchlover)
		if (crtPage.match(/a2b.php\?(.*)&o/)) act = 4; else {
			var actDef = getGMcookie('rpdefact', false);
			var act = 2;
			if (actDef != "false") act = (parseInt(actDef) + 2);
			//action = 2 if the destination is one of your own villages
			if (crtPage.search(/z=(\d+)/) >= 0) {
				var z = RegExp.$1;
				for (var i = 0; i < vList.length; i++) {if (z == vList[i].vID) act = 2;}
			}
		}
		var rbAction = find("//input[@value='" + act + "' and @name='c']", XPFirst);
		if (rbAction) rbAction.checked = true;
	}

	function prepareDivDocking() {
		var dD = get(dlright1);
		if (dD == null){
			dD = newDiv("", [["id", dlright1]]);
			var divlmidall = get(dmid);
			divlmidall.appendChild(dD);
		}
		if (dD != null) {
			TB3O.nodeToAppendUb = dD;
			TB3O.nodeToAppendNb = dD;
			TB3O.nodeToAppendRbT = dD;
			TB3O.nodeToAppendSb = dD;
		}
	}

	//Bookmarks on the right side
	function showUserBookmarks() {
		if (TB3O.boolShowUserBM != '1') return;
		removeElement(get("showbookmarks_tooltip"));
		removeElement(get("showbookmarks"));
		var aTb = getUserBookmarksTable();
		var crtState = getGMcookie("showbookmarks_state", false);
		if (crtState == "min" && TB3O.boolFloatUserBM == '1') aTb.style.display = 'none';
		if (TB3O.boolFloatUserBM != '1') {
			var parBM = get("parBM");
			if (parBM == null) {
				parBM = document.createElement("P");
				parBM.setAttribute("id", "parBM");
				TB3O.nodeToAppendUb.appendChild(parBM);
			}
			parBM.appendChild(aTb);
		} else {
			var ubCoords = getGMcookie("userBookmarksXY", false);
			if (ubCoords == "false") {
				ubCoords = defPosFloatDiv;
				setGMcookie("userBookmarksXY", ubCoords, false);
			}
			var ubXY = ubCoords.split("|");
			var ubWidth = 400;
			var div = createFloatingDiv(ubWidth, ubXY[0], ubXY[1], T('MARCADORES'), 'showbookmarks', "showbookmarks_tooltip", true);
			div.appendChild(aTb);
		}
		playerLinks("showbookmarks");

		function getUserBookmarksTable() {
			var aTb = newTable([["class", "tb3tbnb"], ['id', 'showbookmarks'], ['style', 'font-size:10pt;']]);
			if (TB3O.T35 == true) aTb.setAttribute('style', 'width:0%;');
			//header row
			var bmHeader = newRow("",[['class', 'tb3rnb'], ['width', '400px'], ['style', 'white-space:nowrap']]);
			var headerCell = getUserBookmarksHeader();
			bmHeader.appendChild(headerCell);
			aTb.appendChild(bmHeader);
			//bookmarks string
			var strBookmarks = getGMcookie("marcadores", false);
			if (strBookmarks == "false") {setGMcookie("marcadores", '', false);	strBookmarks = '';}

			if (strBookmarks != ''){
				var marcadores = new Array();
				strBookmarks = strBookmarks.split("$$");
				for (var i = 0; i < strBookmarks.length; i++) marcadores[i] = strBookmarks[i].split("$");
				for (var i = 0; i < marcadores.length; i++) {
					var bmRow = newRow("", [['class', 'tb3rnb'], ['style', 'text-align:' + docDir[0] + ';']]);
					var strBookmark = marcadores[i][0];
					if (TB3O.boolLockBookmarks != "1") {
						var delLink = newLink("", [['href', jsVoid]]);
						delLink.appendChild(newImage([['src', gIcons["del"]],['style', 'cursor:pointer'], ['title', T('ELIMINAR')]]));
						delLink.addEventListener("click", removeGMcookieValue("marcadores", i, false, showUserBookmarks, false), 0);
						var aCell = newCell("", [['class', 'tb3cnb'], ['style', 'text-align:' + docDir[0] + ';']]);
						aCell.appendChild(delLink);
						bmRow.appendChild(aCell);

						bmRow.appendChild(newCell("&nbsp;", [['class', 'tb3cnb']]));

						var upCell = newCell("", [['class', 'tb3cnb'], ['style', 'text-align:' + docDir[0] + ';']]);
						if (i > 0) {
							var upLink = newLink("", [['href', jsVoid]]);
							upLink.appendChild(newImage([['src', image["arrowup"]], ['style', 'cursor:pointer']]));
							upLink.addEventListener("click", moveUserBookmark(i, -1), false);
							upCell.appendChild(upLink);
						}
						bmRow.appendChild(upCell);

						var downCell = newCell("", [['class', 'tb3cnb'], ['style', 'text-align:' + docDir[0] + ';']]);
						if (i < marcadores.length - 1) {
							var downLink = newLink("", [['href', jsVoid]]);
							downLink.appendChild(newImage([['src', image["arrowdown"]], ['style', 'cursor:pointer']]));
							downLink.addEventListener("click", moveUserBookmark(i, 1), false);
							downCell.appendChild(downLink);
						}
						bmRow.appendChild(downCell);

						bmRow.appendChild(newCell("&nbsp;", [['class', 'tb3cnb']]));

						var editCell = newCell("", [['class', 'tb3cnb'], ['style', 'text-align:' + docDir[0] + ';']]);
						var editLink = newLink("", [['href', jsVoid]]);
						editLink.appendChild(newImage([['src', image["editbookmark"]], ['style', 'cursor:pointer'], ['title', T('EDIT')]]));
						editLink.addEventListener("click", editUserBookmark(i), false);
						editCell.appendChild(editLink);
						bmRow.appendChild(editCell);

						bmRow.appendChild(newCell("&nbsp;", [['class', 'tb3cnb']]));
					} else {
						var aCell;
						var sCol = "black";
						if (marcadores[i][1] == crtPage) sCol = "#FF8000";
						aCell = newCell("<span>&#8226;&nbsp;&nbsp;</span>", [['class', 'tb3cnb'], ['style', 'text-align:' + docDir[0] + '; color:' + sCol + ';'], ['width', '17px']]);
						bmRow.appendChild(aCell);
					}
					//some changes and additions by fr3nchlover
					if (marcadores[i][1].indexOf("*") != -1) {
						iHTML = newLink(strBookmark + " ", [['href', marcadores[i][1].substring(0, marcadores[i][1].length-1)], ['target','_blank']]);
						iHTML.appendChild(newImage([['src', image["external"]], ['style', 'cursor:pointer']]));
					} else {
						iHTML = newLink(strBookmark, [['href', marcadores[i][1].substring(0, marcadores[i][1].length)]]);
					}
					var bmCell = newCell("", [['class', 'tb3cnb'], ['style', 'white-space:nowrap'], ['style', 'font-size:10pt; text-align:' + docDir[0] + ';']]);
					bmCell.appendChild(iHTML);
					bmRow.appendChild(bmCell);
					aTb.appendChild(bmRow);
				}
			}
			return aTb;

			function getUserBookmarksHeader() {
				var hText = elem("B", T('MARCADORES') + ':');
				var aL = new Array();

				aL[0] = newLink("",[['href', jsVoid]]);
				aL[0].appendChild(newImage([['src', image["addbookmark"]], ['title', T('ANYADIR')]]));
				aL[0].addEventListener("click", function() {addUserBookmark();}, 0);
				aL[1] = newLink("",[['href', jsVoid]]);
				aL[1].appendChild(newImage([['src', image["addbmthispage"]], ['title', T('ADDCRTPAGE')]]));
				aL[1].addEventListener("click", function() {addUserBookmark(window.location.href);}, 0);
				aL[2] = newLink("", [['href', jsVoid]]);
				aL[2].appendChild(newImage([['src', image["addbmspacer"]], ['title', T('SPACER')]]));
				aL[2].addEventListener("click", function() {appendGMcookieValue("marcadores", ["<hr size='2' width='100%' noshade color=black>", "#"], false); showUserBookmarks();}, 0);
				TB3O.boolLockBookmarks = getGMcookie("lockbookmarks", false);
				var dInfo = ["locked", 'UNLOCKBOOKMARKS', "0", '2'];
				if (TB3O.boolLockBookmarks != "1") dInfo = ["unlocked" + docDir[0].substring(0, 1), 'LOCKBOOKMARKS', "1", '8'];
				aL[3] = newLink("", [['href', jsVoid]]);
				aL[3].appendChild(newImage([['src', image[dInfo[0]]], ['title', T(dInfo[1]).replace("<br>", " ")]]));
				aL[3].addEventListener("click", function() {setGMcookie("lockbookmarks", dInfo[2], false); showUserBookmarks(); }, false);
				var hCell = newCell("", [['class', 'tb3cnb'], ['style', 'white-space:nowrap'], ['colspan', dInfo[3]]]);
				hCell.appendChild(hText);
				var strVbar = " ";
				for (var i = 0; i < 4; i++) {
					if (i > 0) strVbar = "| ";
					hCell.appendChild(document.createTextNode(" " + strVbar));
					hCell.appendChild(aL[i]);
				}
				return hCell;
			}
		}

		function addUserBookmark(ubURL, ubLabel) {
			if (!ubURL) {
				var ubURL = prompt(T('ENLACE'));
				if (ubURL == null || ubURL == '') return;
			}
			var ubLabel = prompt(T('TEXTO'));
			if (ubLabel == null || ubLabel == '') return;
			appendGMcookieValue("marcadores", [ubLabel, ubURL], false);
			showUserBookmarks();
		}

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
			}
		}

		function editUserBookmark(i) {
			return function() {
				var ubC = getGMcookie("marcadores", false);
				var arrUbC = ubC.split("$$");
				var tmpUb = arrUbC[i].split("$");

				var ubLabel = prompt(T('TEXTO'), tmpUb[0]);
				var ubURL = null;
				if (ubLabel != '') ubURL = prompt(T('ENLACE'), tmpUb[1]);

				if (ubLabel == null) ubLabel = tmpUb[0];
				if (ubURL == null) ubURL = tmpUb[1];

				if (ubLabel != '' && ubURL != '' && (ubLabel != tmpUb[0] || ubURL != tmpUb[1])) {
					arrUbC[i] = ubLabel + "$" + ubURL;
					ubC = arrUbC.join("$$");
					setGMcookie("marcadores", ubC, false);
					showUserBookmarks();
				}
			}
		}
	}

	function getSingleTown() {
		//we'll do the AJAX Request if the user has only one village
		//get the list of villages
		var vTable = find("//div[@id='" + dlright1 + "']//table[@class='f10']", XPFirst);
		if (!vTable) vTable = find("//div[@id='" + dlright1 + "']//table[@id='vlist']", XPFirst);
		if (!vTable || (vTable && vList.length < 2)) {
			//get town coordinates from the spieler.php page via AJAX request
			ajaxRequest("/spieler.php", 'GET', null, function(AJAXrespX) {
				var aDoc = document.implementation.createDocument("", "", null);
				var aElem = document.createElement('DIV');
				aElem.innerHTML = AJAXrespX.responseText;
				aDoc.appendChild(aElem);
				var aValue = aDoc.evaluate("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@class='s7']//a[contains(@href,'karte.php?d=')]", aElem, null, XPFirst, null).singleNodeValue;
				if (!aValue) aValue = aDoc.evaluate("//div[@id='" + dmid2 + "']//table[@id='villages']//a[contains(@href, 'karte.php?d=')]", aElem, null, XPFirst, null).singleNodeValue;
				var sName = aValue.textContent;
				var sId = aValue.href.match(/\?d=(\d+)/)[1];
				setGMcookie('singleTownNI', sName + "|" + sId, false);
				setGMcookie('capital', sName, false);
			});
			//get the newdid from the dorf3.php page via AJAX request
			ajaxRequest("/dorf3.php", 'GET', null, function(AJAXrespX) {
				var aDoc = document.implementation.createDocument("", "", null);
				var aElem = document.createElement('DIV');
				aElem.innerHTML = AJAXrespX.responseText;
				aDoc.appendChild(aElem);
				var aValue = aDoc.evaluate("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@class='s7 li ou']//a[contains(@href,'dorf1.php?newdid=')]", aElem, null, XPFirst, null).singleNodeValue;
				if (!aValue) aValue = aDoc.evaluate("//div[@id='" + dmid2 + "']//table[@id='overview']//a[contains(@href, 'dorf1.php?newdid=')]", aElem, null, XPFirst, null).singleNodeValue;
				var sNid = aValue.href.split("=")[1];
				setGMcookie('singleTownNEWDID', sNid, false);
			});
		}
	}

	function createVillageList(dlr1) {
		//single village
		//get GM "cookie" with single town name and id
		var stC = getGMcookie('singleTownNI', false);
		var stNidC = getGMcookie('singleTownNEWDID', false);
		if (stC == "false" || stNidC == "false") {
			getSingleTown();
			var stC = getGMcookie('singleTownNI', false);
			var stNidC = getGMcookie('singleTownNEWDID', false);
		}
		if (stC != "false") {
			//idea from Travian3 Beyond Hacked FR (mik french (fr), A_r_e_s (br), Booboo(hu))
			//create village list for single village accounts
			stC = stC.split("|");
			var stName = stC[0];
			var xy = id2xy(stC[1]);
			//find dlr1
			if (!dlr1) {
				dlr1 = newDiv("", [['id', dlright1]]);
				var divlmidall = get(dmid);
				divlmidall.appendChild(dlr1);
			}
			if (TB3O.T35 == false) {
				dlr1.style.position = "relative";
				var vLink = newLink('<span class="f10 c0 s7 b">' + T('VILLAGE') + ':</span>', [['href', 'dorf3.php']]);
				dlr1.insertBefore(vLink, dlr1.firstChild);
				var vTable = newTable([['class', "f10"]]);
				var aBody = elem("TBODY", "");
				vTable.appendChild(aBody);
				var aRow = newRow("");
				aBody.appendChild(aRow);
				var aCell = newCell('<span class="c2">&#8226;</span>&nbsp;&nbsp;', [['class', 'nbr']]);
				aRow.appendChild(aCell);
				var bLink = newLink(stName, [['class', 'active_vl'], ['href', (stNidC == 'false' ? '?newdid=0' : '?newdid=' + stNidC)]]);
				aCell.appendChild(bLink);
				var bCell = newCell("", [['class', 'right']]);
				aRow.appendChild(bCell);
				var aTb = newTable([["class", "dtbl"]]);
				bCell.appendChild(aTb);
				var bBody = elem("TBODY", "");
				aTb.appendChild(bBody);
				var bRow = newRow("");
				bBody.appendChild(bRow);
				var cCell = newCell("(" + xy[0], [["class", "right dlist1"]]);
				var dCell = newCell("|", [["class", "center dlist2"]]);
				var eCell = newCell(xy[1] + ")", [["class", "left dlist3"]]);
				bRow.appendChild(cCell);
				bRow.appendChild(dCell);
				bRow.appendChild(eCell);
				insertAfter(vLink, vTable);
			} else if (TB3O.M35 == 1) {
				var vDiv = newDiv("", [['class', 'vlist']]);
				var vTable = newTable([['class', 'vlist']]);
				var tbody = elem("TBODY", "");
				var aRow = newRow("", [['class', 'sel']]);
				var aCell = newCell("●", [['class', 'dot']]);
				aRow.appendChild(aCell);
				var bCell = newCell("", [['class', 'text']]);
				var vLink = newLink(stName, [['href', (stNidC == 'false' ? '?newdid=0' : '?newdid=' + stNidC)]]);
				bCell.appendChild(vLink);
				aRow.appendChild(bCell);
				var cCell = newCell("(" + xy[0], [['class', "x"]]);
				aRow.appendChild(cCell);
				var dCell = newCell("|");
				aRow.appendChild(dCell);
				var eCell = newCell(xy[1] + ")", [['class', "y"]]);
				aRow.appendChild(eCell);
				tbody.appendChild(aRow);
				vTable.appendChild(tbody);
				var vLink = newLink('<span class="f10 c0 s7 b">' + T('VILLAGE') + ':</span>', [['href', 'dorf3.php']]);
				vLink.setAttribute('accesskey', '9');
				vDiv.appendChild(vLink);
				vDiv.appendChild(vTable);
				dlr1.insertBefore(vDiv, dlr1.firstChild);
			} else {
				var vTable = newTable([['id', 'vlist']]);
				var ahead = elem("THEAD", "");
				var hrow = newRow("");
				var hCell = newCell("", [['colspan', '3']]);
				var hLink = newLink(T('VILLAGE') + ':', [['href', 'dorf3.php'], ['accesskey', '9']]);
				hCell.appendChild(hLink);
				hrow.appendChild(hCell);
				ahead.appendChild(hrow);
				var tbody = elem("TBODY", "");
				var aRow = newRow("");
				var aCell = newCell("●", [['class', 'dot h1']]);
				var bCell = newCell("", [['class', 'link']]);
				var bLink = newLink(stName, [['href', (stNidC == 'false' ? '?newdid=0' : '?newdid=' + stNidC)]]);
				bCell.appendChild(bLink);
				var cCell = newCell("", [['class', 'aligned_coords']]);
				var xD = newDiv(" (" + xy[0], [['class', 'cox'], ['style', 'padding-' + docDir[0] + ':5px; float:' + docDir[0] + ';']]);
				var piD = newDiv(" | ", [['class', 'pi'], ['style', 'float:' + docDir[0] + ';']]);
				var yD = newDiv(xy[1] + ") ", [['class', 'pi'], ['style', 'padding-' + docDir[1] + ':5px; float:' + docDir[0] + ';']]);
				cCell.appendChild(xD);
				cCell.appendChild(piD);
				cCell.appendChild(yD);
				aRow.appendChild(aCell);
				aRow.appendChild(bCell);
				aRow.appendChild(cCell);
				tbody.appendChild(aRow);
				vTable.appendChild(ahead);
				vTable.appendChild(tbody);
				if (get("qge")) dlr1.insertBefore(vTable, get("qge")); else dlr1.insertBefore(vTable, dlr1.fistChild);
			}
			return vTable;
		}
	}

	function vilCount(vCount) {
		var vlHead = find("//div[@id='" + dlright1 + "']//a[contains(@href, 'dorf3.php')]", XPFirst);
		if (vlHead) {
			if (vlHead.parentNode.nodeName == "TD") vlHead.innerHTML = T('ALDEAS') + " (" + (vCount - 1) + "):&nbsp;&nbsp;"; else vlHead.firstChild.innerHTML = T('ALDEAS') + " (" + vCount + "):&nbsp;&nbsp;";
			var l = newLink(gIcons["reload_p"], [['href', jsVoid]]);
			l.addEventListener("click", updatePopulation, false);
			insertAfter(vlHead, l);
		}

		function updatePopulation() {
			ajaxRequest('spieler.php', 'GET', null, function(AJAXrespX) {
				var aDoc = document.implementation.createDocument("", "", null);
				var aElem = document.createElement('DIV');
				aElem.innerHTML = AJAXrespX.responseText;
				aDoc.appendChild(aElem);
				var aTb = aDoc.evaluate("//div[@id='" + dmid2 + "']//table[@class='tbg'][2]", aElem, null, XPFirst, null).singleNodeValue;
				if (!aTb) aTb = aDoc.evaluate("//table[@id='villages']", aElem, null, XPFirst, null).singleNodeValue;
				if (aTb) {
					parsePlayerTable(aTb, true);
					pauseScript(892);
					location.href = crtPage;
				}
			});
			return;
		}
	}

	function parsePlayerTable(aTb, boolUpdate) {
		var vPop = 0;
		var totalPop = 0;
		for (i = 2; i < aTb.rows.length; i++) {
			vPop = parseInt(aTb.rows[i].cells[1].innerHTML);
			totalPop = totalPop + vPop;
			var vLink = aTb.rows[i].cells[0].getElementsByTagName("A")[0];
			var arrLink = vLink.href.split("=");
			var cxy = id2xy(parseInt(arrLink[1]));
			var xy = "(" + cxy[0] + "|" + cxy[1] + ")";
			var vID = xy2id(cxy[0], cxy[1]);
			if (boolUpdate == true) setVillageRes(vID, vPop);
		}
		return totalPop;
	}

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
		var fDiv = document.createElement("DIV");
		fDiv.innerHTML = '';

		if (arrBiP != null) {
			var tr1 = newRow("", [['class', 'tb3r']]);
			var aC1 = newCell("<img src='" + gIcons["bau"] + "'>", [['class', 'tb3c'], ['style', 'text-align:center;'],['colspan', '3']]);
			tr1.appendChild(aC1);
			for (var i = 0; i < arrBiP.length; i++) {
				var bipT = arrBiP[i].endTime;
				var crtDate = new Date();
				var crtTime = crtDate.getTime();
				if (crtTime < bipT) {
					var tr2 = newRow("", [['class', 'tb3r']]);
					var aC2 = newCell(arrBiP[i].name, [['class', 'tb3c'], ['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					var aC3 = newCell(arrBiP[i].txtLvl, [['class', 'tb3c'], ['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					var strEndTime = new Date();
					strEndTime.setTime(arrBiP[i].endTime);
					var strH = strEndTime.getHours();
					if (strH < 10) strH = '0' + strH;
					var strM = strEndTime.getMinutes();
					if (strM < 10) strM = '0' + strM;
					var aC4 = newCell(strH + ":" + strM,  [['class', 'tb3c'], ['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					tr2.appendChild(aC2);
					tr2.appendChild(aC3);
					tr2.appendChild(aC4);
					if (boolShow == false) {
						fDiv.appendChild(tr1);
						boolShow = true;
					}
					fDiv.appendChild(tr2);
				}
			}
		}

		boolShow = false;

		if (arrTM != null) {
			var tr1 = newRow("", [['class', 'tb3r']]);
			var aC1 = newCell(gIcons["att_all"], [['class', 'tb3c'], ['style', 'text-align:center;'],['colspan', '3']]);
			tr1.appendChild(aC1);
			for (var i = 0; i < arrTM.length; i++) {
				var atT = arrTM[i].fT;
				var crtDate = new Date();
				var crtTime = crtDate.getTime();
				if (crtTime < atT) {
					var tr2 = newRow("", [['class', 'tb3r']]);
					var xImg;
					if (TB3O.T35 == false) xImg = '<img src="' + img("a/" + arrTM[i].type) + '" height="12px" width= "12px">'; else xImg = gIcons[arrTM[i].type];
					var aC2 = newCell(xImg, [['class', 'tb3c'], ['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					var aC3 = newCell(arrTM[i].no, [['class', 'tb3c'], ['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					var strFTime = new Date();
					strFTime.setTime(arrTM[i].fT);
					var strH = strFTime.getHours();
					var strM = strFTime.getMinutes();
					var aC4 = newCell((strH > 9 ? strH : '0' + strH) + ":" + (strM > 9 ? strM : '0' + strM),  [['class', 'tb3c'], ['style', 'white-space:nowrap; text-align:' + docDir[0] + ';']]);
					tr2.appendChild(aC2);
					tr2.appendChild(aC3);
					tr2.appendChild(aC4);
					if (boolShow == false) {
						fDiv.appendChild(tr1);
						boolShow = true;
					}
					fDiv.appendChild(tr2);
				}
			}
		}
		return fDiv.innerHTML;
	}

	function showBiPTMinTT(vNewdid) {
		//show Buildings in Progress and Troop Movements in a tooltip
		return function() {
			var tadInfo = getBiPTMTable(vNewdid);
			if (tadInfo != '') {
				var adtHTML = "<table class='tb3tb' width='100px'>" + tadInfo + "</table>";
				var aTooltip = get("tb_tooltip");
				if (aTooltip == null) aTooltip = createTooltip();
				aTooltip.innerHTML = adtHTML;
				aTooltip.style.display = 'block';
			}
		}
	}

	function villageList() {
		//list of villages
		var strPadding = 'padding-right:2px; padding-left:2px;';
		var vTable;
		var dlr1 = get(dlright1);

		vTable = find("//div[@id='" + dlright1 + "']//table[@class='f10']", XPFirst);
		if (!vTable) vTable = find("//table[@class='vlist']", XPFirst);
		if (!vTable) vTable = get('vlist');

		if (!vTable) vTable = createVillageList(dlr1); else setGMcookie('singleTownNI', false, false);
		if (!vTable) return;

		vilCount(vTable.rows.length);

		var tmpX, tmpY;
		if (dlr1.childNodes[1] && dlr1.childNodes.nodeName == "DIV" || dlr1.childNodes[0] && dlr1.childNodes[0].nodeName == "DIV") vTable = vTable.firstChild;

		var bCmI = getGMcookie("showcentermapicon", false);
		if (bCmI == 'false') {setGMcookie("showcentermapicon", '1', false);	bCmI = '1';}

		var bIOI = getGMcookie("showinouticons", false);
		if (bIOI == 'false') {setGMcookie("showinouticons", '1', false); bIOI = '1';}

		var bStrI = getGMcookie("showsendtroopsresources", false);
		if (bStrI == 'false') {setGMcookie("showsendtroopsresources", '1', false); bStrI = '1';}

		var bShBiPTM = getGMcookie("showbipattinvl", false);
		if (bShBiPTM == 'false') {setGMcookie("showbipattinvl", '1', false); bShBiPTM = '1';}

		var zi = 0;
		if (vTable.parentNode.nodeName == "DIV" && (vTable.parentNode.id == "sright" || vTable.parentNode.id == 'side_info')) zi = 1;
		dlr1.style.width = '200px';
		for (var i = zi; i < vTable.rows.length; i++){
			var v = vTable.rows[i];
			var vLink;
			var vName;
			var vCell = v.cells[1];
			if (!vCell) continue;
			//vCell.style.width = "100%"; //by Tusvob
			if (zi == 1) {
				vName = vCell.textContent;
				vLink = vCell.childNodes[0].href;
			} else {
				if (vCell.className == 'text') {
					vName = vCell.textContent;
					vLink = vCell.childNodes[0].href;
				} else {
					vCell = v.cells[0];
					var vChild = vCell.childNodes[2];
					if (vChild.nodeName != "A") vChild = vCell.childNodes[3];
					vName = vChild.textContent;
					vLink = vChild.href;
				}
			}
			var vNewdid = getNewdidFromLink(vLink);

			if (vCell.nextSibling.childNodes[0].nodeName == "TABLE") {
				var strCoords = vCell.nextSibling.childNodes[0].textContent;
				strCoords.search(/\((.*)\n?\|\n?(.*)\)/);
				tmpX = RegExp.$1;
				tmpY = RegExp.$2;
			} else if (vCell.nextSibling.className == 'aligned_coords') {
				var tmpC = vCell.nextSibling.textContent.replace("(", "").replace(")", "").split("|");
				tmpX = parseInt(tmpC[0]);
				tmpY = parseInt(tmpC[1]);
				var cTable = newTable("");
				var cRow = newRow("");
				var cX = newCell(" (" + tmpX, [['class', 'cox'], ['style', 'padding-left:5px']]);
				var cS = newCell(" | ", [['class', 'pi']]);
				var cY = newCell(tmpY + ") ", [['class', 'coy'], ['style', 'padding-right:5px']]);
				cRow.appendChild(cX);
				cRow.appendChild(cS);
				cRow.appendChild(cY);
				cTable.appendChild(cRow);
				vCell.nextSibling.innerHTML = '';
				vCell.nextSibling.appendChild(cTable);
			} else {
				tmpX = vCell.nextSibling.textContent.replace("(", "");
				tmpY = vCell.nextSibling.nextSibling.nextSibling.textContent.replace(")", "");
			}

			var vID = xy2id(tmpX, tmpY);

			vList[vList.length] = new xVillage(vName, vID, vNewdid, tmpX, tmpY, vLink);
			var yi = vList.length - 1;

			var popX = [0, 0, 0, 0, 0, 0];
			var infoX = getGMcookieV2("VillageRes");
			if (infoX[vList[yi].vID]) {
				popX = infoX[vList[yi].vID];
			}

			if (TB3O.boolShowPopInVL == '1') {
				var popCell;
				if (infoX == "false") {
					popCell = newCell("<a href='spieler.php?uid=" + TB3O.crtUserID + "'>?</a>", [['class', 'tb3cnb'], ['style', strPadding]]);
				} else {
					popCell = newCell(popX[0], [['class', 'tb3cnb'], ['style', 'text-align:' + docDir[1] + '; font-size:8pt; color:darkgreen;' + strPadding]]);
				}
				v.appendChild(popCell);
			}

			//show effective crop production  per hour
			if (TB3O.boolShowCCinVL == "1") {
				var cpphColor = "black";
				var cpph = parseInt(popX[4]);
				if (cpph > 0) {
					cpph = "+" + cpph;
					cpphColor = "darkgreen";
				} else if (cpph < 0) {
					cpphColor = "red";
				}
				var ciCell = newCell(" " + gIcons["r4"], [['class', 'tb3cnb'], ['style', 'text-align:' + docDir[0] + ';white-space:nowrap;' + strPadding]]);
				var ccCell = newCell(cpph, [['class', 'tb3cnb'], ['style', 'font-size:8pt; color:' + cpphColor + '; text-align:' + docDir[1] + '; white-space:nowrap;' + strPadding]]);
				v.appendChild(ciCell);
				v.appendChild(ccCell);
			}

			if (bIOI == "1") {
				for (var xi = 1; xi < 3; xi++) {
					var aCell = newCell("", [['class', 'tb3cnb'], ['style', strPadding]]);
					var aLink = newLink("", [['href', 'dorf' + xi + '.php?newdid=' + vList[yi].vNewdid]]);
					if (xi == 1) strImg = "outsidev"; else strImg = "insidev";
					aLink.appendChild(newImage([['src', image[strImg]], ['style', 'border:0px none white; width:12px;'], ['title', vList[yi].vName + " (dorf" + xi + ".php)"]]));
					aCell.appendChild(aLink);
					v.appendChild(aCell);
				}
			}
			if (bCmI == '1') {
				var aCell = newCell("", [['class', 'tb3cnb'], ['style', strPadding]]);
				var aLink = newLink("", [['href', 'karte.php?z=' + vList[yi].vID]]);
				aLink.appendChild(newImage([['src', image["centermap"]], ['style', 'border:0px none white; width:12px;'], ['title', T('CENTERMAP') + " (" + vList[yi].vName + ")"]]));
				aCell.appendChild(aLink);
				v.appendChild(aCell);
			}

			if (bShBiPTM == '1') {
				var cBiP = getGMcookieV2("BiP");
				var cTM = getGMcookieV2("TroopMovements");
				var aCell = newCell("", [['class', 'tb3cnb'], ['style', strPadding]]);
				aCell.addEventListener("mouseover", showBiPTMinTT(vNewdid), false);
				aCell.addEventListener("mouseout",  function() {get("tb_tooltip").style.display = 'none';}, 0);
				aCell.appendChild(newImage([['src', image["info"]], ['style', 'width:12px; height:12px;']]));
				v.appendChild(aCell);
			}

			if (bStrI == '1') {
				v.appendChild(newCell("<a href='a2b.php?z=" + vList[yi].vID + "'>" + gIcons["def1_1"] + "</a>", [['class', 'tb3cnb'], ['style', strPadding]]));
				v.appendChild(newCell("<a href='build.php?z=" + vList[yi].vID + "&gid=17'>" + gIcons["r41"] + "</a>", [['class', 'tb3cnb'], ['style', strPadding]]));
			}
			if (crtPage.indexOf('karte') != -1) {
				if (TB3O.boolShowDistTimes == "1" && TB3O.xCrt != -1000 && TB3O.yCrt != -1000) {
					var lDist = getDistance(vList[yi].vx, vList[yi].vy, TB3O.xCrt, TB3O.yCrt);
					var distCell = newCell(" " + "<img src='" + image["dist" + docDir[0].substr(0,1)] + "'>" + " " + lDist.toFixed(2), [['style', 'font-size:8pt; color:blue; white-space:nowrap;' + strPadding]]);
					v.appendChild(distCell);
				}
			}
		}
	}

	function show2ndVillageList() {
		if (TB3O.bool2ndVlist != "1") return;
		var minVL2Width = 250;

		var vL2Tb = create2ndVLtable();
		var vL2Coords = getGMcookie("vList2XY", false);
		if (vL2Coords == "false") {
			vL2Coords = defPosFloatDiv;
			setGMcookie("vList2XY", vL2Coords, false);
		}
		var vL2XY = vL2Coords.split("|");
		var vL2Width = minVL2Width;
		var div = createFloatingDiv(vL2Width, vL2XY[0], vL2XY[1], T('VILLAGELIST'), "showvl2table", "showvl2table_tooltip", true);
		TB3O.nodeToAppendvL2Tb = div;
		TB3O.nodeToAppendvL2Tb.appendChild(vL2Tb);
		var vL2Tb = get("vl2table");
		if (vL2Tb != null) {
			vL2Width = vL2Tb.clientWidth;
			if (vL2Width < minVL2Width) vL2Width = minVL2Width;
			div.style.width = vL2Width + "px";
			var dragDiv = get("dragDiv_showvl2table");
			dragDiv.style.width = (vL2Width - 50) + "px";
		}
	}

	function create2ndVLtable() {
		var aTb = newTable([['class', "tb3tbnb"], ['id', 'vl2table'], ['style', 'font-size:10pt;']]);
		var crtState = getGMcookie("showvl2table_state", false);
		if (crtState == "min") aTb.style.display = 'none';
		strBx = '<span>&#8226</span>';
		strBa = '<span class="c2">&#8226</span>';
		var strBt;
		var maxRows = Math.ceil(vList.length / 2);
		for (var i = 1; i <= maxRows; i++) {
			var aRow = newRow("", [['class', 'tb3rnb']]);
			strBt = strBx;
			if (vList[i - 1].vID == aVillage.vID) strBt = strBa;
			var aCell = newCell(strBt + '&nbsp;&nbsp;', [['class', 'tb3cnb'], ['style', 'text-align:' + docDir[0] + ';']]);
			var aLink = newLink(vList[i - 1].vName, [['href', vList[i - 1].vLink]]);
			aCell.appendChild(aLink);
			aRow.appendChild(aCell);
			var bCell = newCell("(" + vList[i - 1].vx + "|" + vList[i - 1].vy + ")", [['class', 'tb3cnb'], ['style', 'font-size:8pt; text-align:' + docDir[0] + ';']]);
			aRow.appendChild(bCell);
			aRow.appendChild(newCell("<a href='a2b.php?z=" + vList[i - 1].vID + "'>" + gIcons["def1_1"] + "</a>", [['class', 'tb3cnb']]));
			aRow.appendChild(newCell("<a href='build.php?z=" + vList[i - 1].vID + "&gid=17'>" + gIcons["r41"] + "</a>", [['class', 'tb3cnb']]));
			var dummyC = newCell('', [['class', 'tb3cnb'], ['width', '10px']]);
			aRow.appendChild(dummyC);
			if (i + maxRows <= vList.length ) {
				strBt = strBx;
				if (vList[i - 1 + maxRows].vID == aVillage.vID) strBt = strBa;
				var cCell = newCell(strBt + '&nbsp;&nbsp;', [['class', 'tb3cnb'], ['style', 'text-align:' + docDir[0] + ';']]);
				var bLink = newLink(vList[i - 1 + maxRows].vName, [['href', vList[i - 1 + maxRows].vLink]]);
				cCell.appendChild(bLink);
				aRow.appendChild(cCell);
				var dCell = newCell("(" + vList[i - 1 + maxRows].vx + "|" + vList[i - 1 + maxRows].vy + ")", [['class', 'tb3cnb'], ['style', 'font-size:8pt; text-align:' + docDir[0] + ';']]);
				aRow.appendChild(dCell);
				aRow.appendChild(newCell("<a href='a2b.php?z=" + vList[i - 1 + maxRows].vID + "'>" + gIcons["def1_1"] + "</a>", [['class', 'tb3cnb']]));
				aRow.appendChild(newCell("<a href='build.php?z=" + vList[i - 1 + maxRows].vID + "&gid=17'>" + gIcons["r41"] + "</a>", [['class', 'tb3cnb']]));
			} else {
				var cCell = newCell("", [['class', 'tb3cnb'], ['colspan', '4']]);
				if (vList.length == 1) cCell.setAttribute('width', '250px');
				aRow.appendChild(cCell);
			}
			aTb.appendChild(aRow);
		}
		return aTb;
	}

	function selectFakeTroopsCell(boolShowAll) {
		var addInt = TB3O.deltaRaceImg;
		var aCell = null;
		if (TB3O.crtUserRace != 'false') {
			aCell = newCell("", [['id', 'selectfaketroopscell']]);
			for (var xi = 1; xi < 9; xi++) {
				if ((TB3O.crtUserRace != 'Gauls' && xi != 4) || (TB3O.crtUserRace == 'Gauls' && xi != 3)) {
					var tAv = get("troopsav_" + xi);
					if (tAv || boolShowAll) {
						var aInput = newInput([['type', 'checkbox'], ['id', 'faketroop_' + (xi)], ['value', '1']]);
						aCell.appendChild(aInput);
						var aImg = newImage([['src', gIcons["u" + (xi + addInt)]]]);
						if (TB3O.T35 != false) aImg.setAttribute('class', "unit u" + (xi + addInt));
						aCell.appendChild(aImg);
						var aTxt = document.createTextNode("  ")
						aCell.appendChild(aTxt);
					}
				}
			}
		}
		return aCell;
	}

	//someweirdnobody (initial), Nux (selectScout & selectFake), ms99 (final), Acr111 (change)
	function selectAllTroops() {
		var iField = find("//input[@name='t1' and not (@type='hidden')]", XPFirst);
		if (iField == null) return;
		//add an EventListener to all the input fields
		for (var i = 1; i < 12; i++) {
			var troopInput = find("//input[@name='t" + i + "']", XPFirst);
			if (troopInput) {
				troopInput.setAttribute("id", "t" + i);
				troopInput.addEventListener('keyup', updateTroopsPower, false);
				troopInput.addEventListener('change', updateTroopsPower, false);
				var troopLink;
				if (TB3O.T35 == false) {
					troopLink = troopInput.parentNode.nextSibling.firstChild;
				} else {
					troopLink = troopInput.parentNode.childNodes[5];
					if (!troopLink) troopLink = troopInput.parentNode.childNodes[5].childNodes[0];
				}
				if (troopLink) {
					var xxx = troopLink.textContent.replace("(", "").replace(")", "");
					if (xxx != '0') {
						troopLink.setAttribute('id', 'troopsav_' + i);
						troopLink.addEventListener('click', addUpdateTroopsPower(i, troopLink), false);
					}
				}
			}
		}

		//original position
		var header = find("//div[@id='" + dmid2 + "']//h1", XPFirst);
		//move the table as suggested by Acr111
		//var header = find("//td[@width='33%']", XPFirst);
		var arrSelect = [[T('SELECTALLTROOPS'), getAllTroops], [T('SELECTSCOUT'), getScout], [T('SELECTFAKE'), getFakeUnitV2]];
		var aTb = newTable([["class", "tb3tbnb"]]);
		//change the style of the table as suggested by Acr111
		//aTb.setAttribute("style", "position:relative; left:-20px; z-index: 100; border: 1px solid #00C000; font-size:11px;");
		for (var i = 0; i < 3; i++) {
			var aRow = newRow("", [['class', 'tb3rnb']]);
			var aCell = newCell("", [['class', 'tb3cnb'], ['style', 'text-align:' + docDir[0] + '; font-size:8pt;']]);
			//change as suggested by Acr111
			//if (i == 0) aCell.setAttribute("colspan", "3");
			var aLink = newLink(arrSelect[i][0], [['href', jsVoid]]);
			aLink.addEventListener("click", arrSelect[i][1], true);
			aCell.appendChild(aLink);
			aRow.appendChild(aCell);
			if (i == 0) {
				var bCell = newCell("", [['colspan', '2']]);
				aRow.appendChild(bCell);
			}
			if (i == 1){
				//insert no of fakes cell
				var bCell = newCell("");
				var scoutInput = newInput([['type', 'text'], ['id', 'selectscoutnumber'], ['style', 'width:30px; font-size:8pt']]);
				var noOfScouts = getGMcookie("noofscouts", false);
				if (noOfScouts == "false") {
					setGMcookie("noofscouts", "3", false);
					noOfScouts = "3";
				}
				scoutInput.value = parseInt(noOfScouts);
				bCell.appendChild(scoutInput);
				aRow.appendChild(bCell);
				//insert save option to change the setup option directly from the Rally point -> Send troops page
				var cCell = newCell("&nbsp;<input type='checkbox' id='savescoutnumber' value='1'></input>&nbsp;" + T('SAVE'));
				aRow.appendChild(cCell);
			}
			if (i == 2) {
				//allow selection of fake unit
				var aCell = selectFakeTroopsCell();
				if (aCell != null) {
					aCell.setAttribute('colspan', '2');
					aRow.appendChild(aCell);
				}
			}
			aTb.appendChild(aRow);
		}

		insertAfter(header, aTb);

		if (TB3O.T35 == false) {
			var troopTable = find("//table[@class='f10']", XPFirst);
		} else {
			var troopTable = find("//table[@class='troops']", XPFirst);
			if (!troopTable) troopTable = find("//table[@class='dashed']", XPFirst);
			if (!troopTable) troopTable = get("troops");
		}
		//fix for unusual icons appearing under the list of villages - fr3nchlover
		var tags7 = find("//div[@id='" + dmid2 + "']//td[@class='s7']", XPFirst);
		if ((TB3O.T35 == false && troopTable != null && !tags7) || (TB3O.T35 == true && troopTable != null)) {
			//add the "clear all" button
			var aRow = newRow("");
			var delCell = newCell("", [['colspan', '12'], ['style', 'text-align:center']]);
			var clAllLink = newLink("<img src='" + image["buttonDel"] + "' title='" + T('MTCLEARALL') + "' alt='" + T('MTCLEARALL') + "'>");
			clAllLink.href = jsVoid;
			clAllLink.addEventListener("click", clearAllTroops, false);
			delCell.appendChild(clAllLink);
			aRow.appendChild(delCell);
			troopTable.appendChild(aRow);

			//add additional table as requested by users
			if (TB3O.T35 == false) {
				var parX = find("//table[@class='p1']", XPFirst);
			} else {
				var parX = troopTable;
			}
			if (parX) {
				var attdefTable = newTable([['class', 'tb3tb']]);
				var hRow = newRow("", [['class', 'tb3r']]);
				var hCell = newCell(T('STATISTICS') + " (* = " + T('MIN') + ")", [['colspan', '4'], ['style', 'text-align:center; font-weight:bold;'], ['class', 'tb3ch']]);
				hRow.appendChild(hCell);
				attdefTable.appendChild(hRow);

				//add the total attack, def_i and def_c power for the selected troops
				var bRow = newRow("", [['style', 'text-align:' + docDir[0] + ';']]);

				var aCell = newCell(gIcons["att_all"] + " *", [['id', "troopsattpower"], ['width', "33,3%"]]);
				var bCell = newCell(gIcons["def_i"] + " *", [['id', "troopsdefipower"], ['colspan', "2"], ['width', "33,3%"]]);
				var cCell = newCell(gIcons["def_c"] + " *", [['id', "troopsdefcpower"], ['width', "33,3%"]]);

				bRow.appendChild(aCell);
				bRow.appendChild(bCell);
				bRow.appendChild(cCell);
				attdefTable.appendChild(bRow);
				var dRow = newRow("");

				//total capacity
				var dCell = newCell(gIcons["capacity"], [['id', 'troopscapacity'], ['style', 'text-align:' + docDir[0] + ';'], ['colspan', "2"], ['width', '50%']]);

				//crop consumption
				var eCell = newCell(gIcons["r5"], [['id', 'troopscropconsumption'], ['style', 'text-align:' + docDir[0] + ';'], ['colspan', "2"], ['width', '50%']]);

				dRow.appendChild(dCell);
				dRow.appendChild(eCell);
				attdefTable.appendChild(dRow);

				var aDiv = newDiv("");
				var pX = elem("P", "");
				aDiv.appendChild(pX);
				aDiv.appendChild(attdefTable);
				insertAfter(parX, aDiv);
			}
		}

		function addUpdateTroopsPower(i, troopLink) {
			return function() {
				var aNo = parseInt(troopLink.textContent.replace("(", "").replace(")", ""));
				var troopInput = get("t" + i);
				if (troopInput) {
					troopInput.value = aNo;
					updateTroopsPower();
				}
			}
		}

		function updateTroopsPower() {
			var totals = [["troopsattpower", "att_all", 5, 0], ["troopsdefipower", "def_i", 6, 0], ["troopsdefcpower", "def_c", 7, 0], ["troopscapacity", "capacity", 4, 0], ["troopscropconsumption", "img5", 9, 0]];
			for (var i = 1; i < 11; i++) {
				var tInput = get("t" + i);
				if (tInput) {
					var tImg;
					if (TB3O.T35 == false) {
						tImg = tInput.parentNode.previousSibling.firstChild;
					} else {
						tImg = tInput.parentNode.childNodes[1];
					}
					var tType = getTroopIndexTitleFromImage(tImg)[0];
					if (tInput.value != "") {
						var intTinput = parseInt(tInput.value);
						for (var j = 0; j < 5; j++) {
							totals[j][3] += intTinput * uc[tType][totals[j][2]];
						}
					}
				}
			}
			for (var j = 0; j < 5; j++) {
				var aCell = get(totals[j][0]);
				if (aCell) {
					var imgPath;
					var strX = " *";
					switch (j) {
						case 0:
						case 1:
						case 2: imgPath = gIcons[totals[j][1]]; break;
						case 3: imgPath = gIcons["capacity"]; strX = ""; break;
						case 4: imgPath = gIcons["r5"]; strX = ""; break;
					}
					aCell.innerHTML = imgPath + strX + " " + getLS(totals[j][3]);
				}
			}
			return;
		}

		function clearAllTroops() {
			for (var i = 1; i < 12; i++) {
				var troopInput = get("t" + i);
				if (troopInput) troopInput.value = '';
			}
			updateTroopsPower();
			return;
		}

		function getTroopInputFields() {
			var nodeRes;
			var strSearch = "//form[@name='snd']//table//input[(@type='text' or @type='Text') and not (@name='x') and not (@name='y')]";
			if (TB3O.T35 == false) strSearch = "//table[@class='p1']//table[@class='f10']//input[@type='Text' or @type='text']";
			nodeRes = find(strSearch, XPList);
			return nodeRes;
		}

		function getTroopInputMaxFields() {
			var nodes;
			var strSearch = "//form[@name='snd']//table//a";
			if (TB3O.T35 == false) strSearch = "//table[@class='p1']//table[@class='f10']//a";
			nodes = find(strSearch, XPList);
			return nodes;
		}

		function getAllTroops() {
			var nodeRes = getTroopInputFields();
			//clear all the input fields
			for (var i = 0; i < nodeRes.snapshotLength; i++) {nodeRes.snapshotItem(i).value = ""; }
			var troopsForm = document.forms.namedItem("snd");
			var nodes = getTroopInputMaxFields();
			if (nodes.snapshotLength > 1) {
				for(var i = 0; i < nodes.snapshotLength; i++) {
					var node = nodes.snapshotItem (i);
					if (node.getAttribute("onClick")) {
						node.getAttribute("onClick").search(/document\.snd\.(.*)\.value=(.*); return false;/);
						var inputName = RegExp.$1;
						var troopValue = RegExp.$2;
						var troopInput = troopsForm.elements.namedItem(inputName);
						troopInput.value = troopValue;
					}
				}
				updateTroopsPower();
			} else {
				alert(T('NOTROOPS'));
			}
		}

		function getScout() {
			var indCol = ((TB3O.crtUserRace == "Gauls") ? 't3' : 't4');
			var nodeRes = getTroopInputFields();

			//clear all the input fields
			for (var i = 0; i < nodeRes.snapshotLength; i++) { nodeRes.snapshotItem(i).value = ""; }

			//set the attack:raid as action
			var rbAction = find("//input[@value='4' and @name='c']", XPFirst);
			if (rbAction) {rbAction.checked = true;}

			var troopsForm = document.forms.namedItem("snd");
			var maxScout = find("//a[contains(@onclick, '" + indCol + "')]", XPFirst);
			if (maxScout) {
				maxScout.getAttribute("onClick").search(/document\.snd\.(.*)\.value=(.*); return false;/);
				var inputName = RegExp.$1;
				if (inputName != 't9' && inputName != 't10') {
					var scoutInput = troopsForm.elements.namedItem(inputName);
					var maxNoOfScouts = parseInt(maxScout.textContent.replace("(", "").replace(")", ""));
					var iNoOfScouts = get('selectscoutnumber');
					if (iNoOfScouts) wNoOfScouts = parseInt(iNoOfScouts.value); else wNoOfScouts = 3;
					if (wNoOfScouts > maxNoOfScouts) wNoOfScouts = maxNoOfScouts;
					scoutInput.value = wNoOfScouts;
					var scoutSave = get('savescoutnumber');
					if (scoutSave && scoutSave.checked == true) setGMcookie("noofscouts", scoutInput.value, false);
					updateTroopsPower();
				}
			} else {
				alert(T('NOTROOP2SCOUT'));
			}
		}

		function getFakeUnitV2() {
			var nodeRes = getTroopInputFields();
			//remove previously selected units
			for (var i = 0; i < nodeRes.snapshotLength; i++) { nodeRes.snapshotItem(i).value = ""; }

			//set the attack:normal as action
			var rbAction = find("//input[@value='3' and @name='c']", XPFirst);
			if (rbAction) rbAction.checked = true;

			var nodeUnits = getTroopInputMaxFields();
			if (nodeUnits.snapshotLength > 1) {
				var chk = false;
				for (var xi = 1; xi < 9; xi++) {
					var faketroopselected = get("faketroop_" + xi);
					if (faketroopselected && faketroopselected.checked) {
						var faketroopavailable = get('troopsav_' + xi);
						if (faketroopavailable) {
							//there are units available from selected fake troop type
							var aInput = get("t" + xi);
							if (aInput) {
								aInput.value = 1;
								chk = true;
							}
						}
					}
				}
				if (chk == false) {
					//no troops for fake selected or nothing availabe => use default
					var tTroop = 2;
					var faketroopavailable = get('troopsav_2');
					if (faketroopavailable == null) {
						faketroopavailable = get('troopsav_1');
						tTroop = 1;
					}
					if (faketroopavailable != null) {
						var aInput = get("t" + tTroop);
						if (aInput) {
							aInput.value = 1;
							chk = true;
						}
					}
				}
				if (chk == false) alert(T('NOSCOUT2FAKE')); else updateTroopsPower();
			} else {
				alert(T('NOTROOPS'));
			}
		}
	}

	function addAttDefInfoTable1() {
		var tTable = find("//div[@id='troop_village']//table", XPFirst);
		if (tTable == null) tTable = find("//div[@id='ltrm']/table", XPFirst);
		if (tTable == null) tTable = find("//div[@id='map_details']/table[@id='troops']", XPFirst);
		if (tTable == null) return;

		var boolShowAttDefInfoTable = false;

		if (TB3O.M35 != 2) {
			var tDiv = tTable.previousSibling;
			if (tDiv.nodeName != "DIV") tDiv = tDiv.previousSibling;
			if (tDiv.nodeName == "DIV") boolShowAttDefInfoTable = true;
		} else {
			var tDiv = tTable.rows[0].cells[0];
			boolShowAttDefInfoTable = true;
		}

		if (boolShowAttDefInfoTable == true) {
			tDiv.innerHTML += " ";
			var iImg = newImage([['src', image["info"]], ['style', 'width:16px; height:16px;']]);
			tDiv.appendChild(iImg);
			tDiv.addEventListener("mouseover", showAttDefTooltip(), false);
			tDiv.addEventListener("mouseout",  function() {get("tb_tooltip").style.display = 'none';}, 0);
		}

		function showAttDefTooltip() {
			return function() {
				var tadInfo = getTroopsAttDefInfoTable(tTable, false, true);
				var adtHTML = "<table class='tb3tbnb' width='100px'>" + tadInfo + "</table>";
				var aTooltip = get("tb_tooltip");
				if (aTooltip == null) aTooltip = createTooltip();
				aTooltip.innerHTML = adtHTML;
				aTooltip.style.display = 'block';
			}
		}
	}

	function getTroopsAttDefInfoTable(tNTroops, bMap, bMin) {
		if (!tNTroops) return '';
		var tNinfo = [0, 0, 0, 0];
		var iHTML = '';
		var bInfo = false;
		var strMinInfo = '';
		var strMinX = '';
		if (tNTroops.rows == null) return iHTML;
		for (var i = 0; i < tNTroops.rows.length; i++) {
			var aRow = tNTroops.rows[i];
			var aImg = aRow.cells[0].firstChild;
			if (aImg.nodeName != 'IMG') aImg = aRow.cells[0].firstChild.firstChild;
			if (aImg != null && aImg.src) {
				var index = getTroopIndexTitleFromImage(aImg)[0];
				if (!isNaN(index) && index > 0) {
					if (bMap) {
						var imgHTML = '<img class="' + aImg.className + '" src="' + xGIF + '">';
						if (TB3O.T35 == false) imgHTML = "<img src=" + aRow.childNodes[0].firstChild.src + ">";
						iHTML += "<td style='text-align:" + docDir[0] + ";'>" + imgHTML + "</td><td style='text-align:" + docDir[1] + ";'>" + aRow.cells[1].textContent + "</td></tr>";
					}
					var tNo = parseInt(aRow.cells[1].textContent);
					tNinfo[0] += tNo * uc[index][5];
					tNinfo[1] += tNo * uc[index][6];
					tNinfo[2] += tNo * uc[index][7];
					tNinfo[3] += tNo * uc[index][9];
					bInfo = true;
				} else {
					tNinfo[3] += 6; //hero
				}
			} else {
				if (crtPage.indexOf("dorf1.php") != -1) iHTML += "<tr><td>" + aRow.cells[0].textContent + "</td></tr>";
			}
		}
		if (bInfo == true) {
			if (tNinfo[0] != 0 + tNinfo[1] + tNinfo[2] > 0) {
				var strTextAlign = docDir[1];
				if (bMap == true) {
					iHTML += "<tr><td>&nbsp;</td></tr>";
				}
				if (bMin == true) {
					strMinInfo = "* = " + T('MIN');
					strMinX = "*";
					iHTML += "<tr><td colspan='2' style='font-weight:bold; text-align:center;'>" + T('STATISTICS') + "</td></tr>";
				}
				iHTML += "<tr><td style='text-align:" + docDir[0] + ";'>" + gIcons["att_all"] + strMinX + "</td><td style='text-align:" + docDir[1] + ";'>&nbsp;" + getLS(tNinfo[0]) + "</td></tr>";
				iHTML += "<tr><td style='text-align:" + docDir[0] + ";'>" + gIcons["def_i"] + strMinX + "</td><td style='text-align:" + docDir[1] + ";'>&nbsp;" + getLS(tNinfo[1]) + "</td></tr>";
				iHTML += "<tr><td style='text-align:" + docDir[0] + ";'>" + gIcons["def_c"] + strMinX + "</td><td style='text-align:" + docDir[1] + ";'>&nbsp;" + getLS(tNinfo[2]) + "</td></tr>";
				iHTML += "<tr><td style='text-align:" + docDir[0] + ";'>" + gIcons["r5"] + "</td><td style='text-align:" + docDir[1] + ";'>&nbsp;" + getLS(tNinfo[3]) + "</td></tr>";
				if (bMin == true) iHTML += "<tr><td colspan='2' style='text-align:" + docDir[0] + "; font-size:8pt;'>" + strMinInfo + "</td></tr>";
			}
		}
		return iHTML;
	}

	function addTroopTimes() {
		//append the distance and time for the case the user opened a cell from the map
		if (TB3O.xCrt != -1000 && TB3O.yCrt != -1000 && TB3O.boolShowDistTimes == "1") {
			var lastRowActions = null;
			var idType = '@id';
			if (TB3O.T35 == false) idType = '@class';
			var strToEvaluate = "//div[" + idType + "='map_details_actions']";
			lastRowActions = find(strToEvaluate, XPFirst);
			if (!lastRowActions) lastRowActions = find("//table[@id='options']", XPFirst);
			if (lastRowActions != null) {
				createTimeTroopTable(lastRowActions, TB3O.xCrt, TB3O.yCrt, true);
				var imgOasis = get("resfeld");
				if (imgOasis == null) imgOasis = find("//img[starts-with(@id, 'w')]", XPFirst);
				if (imgOasis == null) imgOasis = find("//img[starts-with(@class, 'w')]", XPFirst);
				if (imgOasis != null) {
					//we are probably inside an oasis
					var tNTroops;
					if (TB3O.T35 == false) {
						tNTroops = find("//table[@class='f10']", XPFirst);
						if (tNTroops) tNTroopsS = tNTroops.childNodes[0];
					} else {
						tNTroops = find("//div[@id='map_details_troops']//table", XPFirst);
						if (tNTroops) {
							tNTroopsS = tNTroops.childNodes[1];
						} else {
							tNTroops = find("//table[@id='troop_info']", XPFirst);
							if (tNTroops) tNTroopsS = tNTroops.childNodes[3];
						}
					}
					if (tNTroopsS) {
						var tNInfo = getTroopsAttDefInfoTable(tNTroopsS, false);
						if (tNInfo != '') {
							if (tNTroops.id && tNTroops.id == 'troop_info') {
								tNTroops.innerHTML += tNInfo;
							} else {
								var tNInfoT = newTable([['class', 'b'], ['style', 'width:100px; border:0px none white']]);
								tNInfoT.innerHTML = tNInfo;
								var aPar = elem("P", "");
								aPar.appendChild(tNInfoT);
								tNTroops.parentNode.appendChild(aPar);
							}
						}
					}
				}
			}
		}
	}

	//convert # links to jsVoid
	function hLToJsVoid() {
		var aX = find("//a[@href='#']", XPList);
		for (var i = 0; i < aX.snapshotLength; i++) aX.snapshotItem(i).href = jsVoid;
	}

	//Total script runtime
	function showTBTotalRuntime(){
		var aDiv = find("//div[@id='ltime']/br", XPFirst);
		if (aDiv) {
			TB3O.TBEndTime = new Date().getTime();
			var timeval = TB3O.TBTotalRunTime();
			var tb3purl = newLink(TB3O.shN, [['href', TB3O.usoSabout], ['target', '_blank'], ['title', T('SCRIPTPRESURL')], ['style', 'font-size:8pt; font-weight:bold; color:#00FF00']]);
			var tb3upd = newLink(TB3O.version, [['href', jsVoid], ['title', T('CHECKVERSION')], ['style', 'font-size:8pt; font-weight:bold; color:#00FF00']]);
			tb3upd.addEventListener('click', function() {updScript()}, false);
			var tb3tt = elem('span', '');
			tb3tt.appendChild(elem("TEXTNODE", " | "));
			tb3tt.appendChild(tb3purl);
			tb3tt.appendChild(elem("TEXTNODE", "&nbsp;(v"));
			tb3tt.appendChild(tb3upd);
			tb3tt.appendChild(elem("TEXTNODE", ') time: <b>' + timeval + '</b> ms'));
			addAttr(tb3tt, [['style', 'z-index:2000; color:#FFFFFF; width:450px']]);
			aDiv.parentNode.style.width = "500px";
			aDiv.parentNode.insertBefore(tb3tt, aDiv);
		}
	}

	function showFieldInfoInTooltip(vID, fieldtype, animalsTable) {
		var ttDiv = get("tb_tooltip");
		if (ttDiv == null) ttDiv = createTooltip();
		var tDisplay = "none";
		if (fieldtype != 0) {
			//a map cell or a village
			var tmTableHTML = "";
			var ttHTML = "<table class='tb3tbnb'>";
			if (fieldtype != null) {
				//there are 12 types of cells
				var dist = [[3, 3, 3, 9], [3, 4, 5, 6], [4, 4, 4, 6], [4, 5, 3, 6], [5, 3, 4, 6], [1, 1, 1, 15], [4, 4, 3, 7], [3, 4, 4, 7], [4, 3, 4, 7], [3, 5, 4, 6], [4, 3, 5, 6], [5, 4, 3, 6]];
				var info = dist[fieldtype-1];
				ttHTML += "<tr><td colspan='2'>";
				for (var i = 1; i < 5; i++) {ttHTML += gIcons["r" + i] + " " + info[i-1] + ' ';}
				ttHTML += "</td></tr><tr><td>&nbsp;</td></tr>";
			}
			if (TB3O.boolShowDistTimes == "1") tmTableHTML = getTroopMerchantTooltipHTML(vID, "blue", false, true, true);
			tDisplay = "block";
			ttDiv.innerHTML = ttHTML + tmTableHTML + "</table>";
			ttDiv.style.display = tDisplay;
		} else {
			//an oasis
			var ttHTML = getTroopsAttDefInfoTable(animalsTable, true);
			//if (ttHTML != '') {
				tDisplay = "block";
				if (TB3O.boolShowDistTimes == "1") ttHTML += "<tr><td>&nbsp;</td></tr>";
				ttHTML = "<table class='tb3tbnb'>" + ttHTML;
			//}
			ttHTML += getTroopMerchantTooltipHTML(vID, "blue", false, false, true) + "</table>";
			ttDiv.innerHTML = ttHTML;
			ttDiv.style.display = tDisplay;
		}
	}

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
				mev.pict = get("i_"+ area.id.substring(2)).src;
				if (mev.pict.match(/\/(d|t)\d*.gif$/)) strRegExp1 = true; else if (mev.pict.match(/\/(o)\d*.gif$/)) strRegExp2 = true;
				//all AJAX requests
				if (TB3O.boolShowCellTypeInfo == '1')  {
					mev.timeout = setTimeout(function() {ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout!=0) processMapCell(t, mev, crtPos)}, dummy); }, 300);
				} else {
					if (strRegExp1 == true || strRegExp2 == true) showFieldInfoInTooltip(crtPos, null);
				}
			} else {
				if (TB3O.boolShowCellTypeInfo == '1') {
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
						}
					} else {
						//we try to use the map_infobox
						var mapInfoBox = get("map_infobox");
						if (mapInfoBox != null) {
							var aRowContent = mapInfoBox.rows[0].textContent;
							if (aRowContent.indexOf(":") != -1 && aRowContent.indexOf("-")) {
								var strType = aRowContent.split(": ");
								if (strType.length > 1) {
									fieldtype = showCellInfo(mev.pos + 1, strType[1]);
									showFieldInfoInTooltip(crtPos, fieldtype);
								}
							} else {
								//second alternative - to generate AJAX requests to get the information
								mev.timeout = setTimeout(function() {ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout!=0) processMapCell(t, mev, crtPos)}, dummy); }, 300);
							}
						} else {
							//second alternative - to generate AJAX requests to get the information
							mev.timeout = setTimeout(function() {ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout!=0) processMapCell(t, mev, crtPos)}, dummy); }, 300);
						}
					}
				} else {
					//show only distance and time
					showFieldInfoInTooltip(crtPos, null);
				}
			}
		}
		mev.mouseOutEvent = function() {clearTimeout(mev.timeout); mev.timeout = 0; get("tb_tooltip").style.display = 'none'; }
		mev.scan = function() { ajaxRequest(mev.area.href, "GET", null, function(t) {processMapCell(t, mev, null);}, dummy); }
		return mev;
	}

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
				}
			}
		}
		var mcDiv = get('map_info_' + pos);
		if (mcDiv) {
			if (aType < 13) {
				var itext = ['', '&nbsp;9', gIcons["r3"], '&nbsp;6', gIcons["r2"], gIcons["r1"], '15', '&nbsp;7', '&nbsp;7', '&nbsp;7', gIcons["r2"], gIcons["r3"], gIcons["r1"]];
				if (TB3O.T35 == false) itext = ['', '(9)', gIcons["r3"], '(6)', gIcons["r2"], gIcons["r1"], '(15)', '(7)', '(7)', '(7)', gIcons["r2"], gIcons["r3"], gIcons["r1"]];
				mcDiv.innerHTML = itext[aType];
				if (TB3O.T35 == true) addAttr(mcDiv, [['style', "position:relative; height:16px; width:20px; " + docDir[0] + ":31px; top:45px; z-index:90; border:1px solid #00C000; background-color: #FEFFE3; -moz-border-radius: 10px;"]]);
			}
		}
		return aType;
	}

	function processMapCell(t, mev, crtPos) {
		var fieldType;
		var ans = document.createElement('DIV');
		ans.innerHTML = t.responseText;
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		if (TB3O.T35 == false) {
			var aField = ansdoc.evaluate("//img[@id='resfeld']", ans, null, XPFirst, null).singleNodeValue;
			if (aField != null) aField = aField.src.search(/\/w(\d+)\.jpg$/); else aField = ansdoc.evaluate("//img[starts-with(@id, 'w')]", ans, null, XPFirst, null).singleNodeValue;

			if (aField != null) {
				//this is an oasis
				if (crtPos != null) {
					var animalsTable = ansdoc.evaluate("//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
					if (animalsTable != null) animalsTable = animalsTable.childNodes[0]; //we need only the table not the body
					fieldType = 0;
					showFieldInfoInTooltip(crtPos, 0, animalsTable);
				}
			} else {
				aField = ansdoc.evaluate("//div[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue;
				aField.id.search(/f(\d)/);
				var fieldtype = RegExp.$1;
				//this is an empty cell or a village
				showCellInfo(mev.pos + 1, fieldtype);
				if (crtPos != null) showFieldInfoInTooltip(crtPos, fieldtype);
			}
		} else {
			var imgID = ansdoc.evaluate("//img[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue;
			if (!imgID) imgID = ansdoc.evaluate("//img[starts-with(@class, 'f')]", ans, null, XPFirst, null).singleNodeValue;
			if (imgID != null) {
				//a cell or village
				var fieldTypeC = imgID.getAttribute("class");
				if (fieldTypeC == null) {
					fieldType = imgID.getAttribute("alt");
				} else {
					var fieldTypeS = fieldTypeC.replace("f", "");
					fieldType = parseInt(fieldTypeS);
				}
				var fieldtype = showCellInfo(mev.pos + 1, fieldType);
				if (crtPos != null) showFieldInfoInTooltip(crtPos, fieldtype);
			} else {
				//perhaps an oasis
				if (crtPos != null) {
					imgID = ansdoc.evaluate("//img[starts-with(@id, 'w')]", ans, null, XPFirst, null).singleNodeValue;
					if (!imgID) imgID = ansdoc.evaluate("//img[starts-with(@class, 'w')]", ans, null, XPFirst, null).singleNodeValue;
					if (imgID != null) {
						var animalsTable = ansdoc.evaluate("//div[@id='map_details_troops']//table", ans, null, XPFirst, null).singleNodeValue;
						if (animalsTable) {
							animalsTable = animalsTable.childNodes[1]; //we need only the table not the body
						} else {
							animalsTable = ansdoc.evaluate("//table[@id='troop_info']", ans, null, XPFirst, null).singleNodeValue;
							if (animalsTable) animalsTable = animalsTable.childNodes[3];
						}
						showFieldInfoInTooltip(crtPos, 0, animalsTable);
						fieldType = 0;
					}
				}
			}
		}
		return fieldType;
	}

	function getArrDefaultrpAction() {
		var arrAct = ['def1_1', T('ATTACKTYPE2')];
		switch (parseInt(TB3O.rpDefAction)) {
			case 1: arrAct[0] = "att_all_1"; arrAct[1] = T('ATTACKTYPE3'); break;
			case 2: arrAct[0] = "att_all_2"; arrAct[1] = T('ATTACKTYPE4'); break;
			default: arrAct[0] = "def1_1"; arrAct[1] = T('ATTACKTYPE2'); break;
		}
		return arrAct;
	}

	function getTroopMerchantTooltipHTML(vID, aColor, addCoords, addMTime, addTTime, boolAllRaces) {
		var iHTML = "";
		var properAlign = docDir[1];
		var xy = id2xy(vID);
		var qDist = getDistance(xy[0], xy[1], aVillage.vx, aVillage.vy);
		//add the distance row
		if (aColor == undefined) aColor = 'black';
		var strDist = '';

		var aRow = newRow("", [['class', 'tb3rnb']]);
		var aCell = newCell("", [['class', 'tb3cnb'], ["style", 'font-size:8pt; color:' + aColor + "; text-align:" + docDir[0] +";"]]);
		var imgDist = newImage([['src', image["dist" + docDir[0].substr(0,1)]]]);
		aCell.appendChild(imgDist);
		aRow.appendChild(aCell);

		if (qDist != 0) {
			strDist = qDist.toFixed(2);
			var bCell = newCell(strDist, [['class', 'tb3cnb'], ["style", 'font-size:8pt; color:' + aColor + "; text-align:" + properAlign +";"]]);
			aRow.appendChild(bCell);

			strDist = "";
			if (addCoords && addCoords == true) strDist = "(" + aVillage.vx + "|" + aVillage.vy + ") " + "<img src= '" + image["dist" + docDir[0].substr(0,1)] + "'>" + " (" + xy[0] + "|" + xy[1] + ")";
			if (strDist != "") {
				c1Cell = newCell("&nbsp;&nbsp;", [['class', 'tb3nb']]);
				var intCols = '1';
				if (boolAllRaces == true) intCols = '4';
				cCell = newCell(strDist, [['class', 'tb3cnb'], ["style", 'font-size:8pt; color:' + aColor + "; text-align:" + properAlign +";"], ['colspan', intCols]]);
				aRow.appendChild(c1Cell);
				aRow.appendChild(cCell);
			}
			iHTML = "<tr class='tb3rnb'>" + aRow.innerHTML + "</tr>";
		}

		if (strDist != '') strDist = "<td></td>";

		if (TB3O.crtUserRace != "false" && qDist != 0) {
			var arrRaces;
			switch (TB3O.crtUserRace) {
				case "Romans": arrRaces = ["Teutons", "Gauls"]; break;
				case "Teutons": arrRaces = ["Romans", "Gauls"]; break;
				case "Gauls": arrRaces = ["Romans", "Teutons"]; break;
			}
			var aColspan = '';
			var aAlign = '';
			if (addTTime == true) {
				aColspan = "colspan='2' ";
				aAlign = "style='text-align:center;' ";
			}
			var clockCell = "<td class='tb3cnb' " + aColspan + aAlign + gIcons["clock"] + "</td> ";
			if (addTTime == true) {
				//add the clock row
				iHTML += "<tr class='tb3rnb'>" + clockCell;
				clockCell = '';
				if (boolAllRaces == true) iHTML += "<td colspan='6'</td>";
				iHTML += "</tr>";
			}

			if (addMTime == true) {
				//add the merchant row
				var aTime = getMTime(qDist, TB3O.crtUserRace);
				aMalign = docDir[1];
				if (addTTime == false) aMalign = docDir[0];
				iHTML += "<tr class='tb3rnb'>" + clockCell + "<td class='tb3cnb' >" + gIcons["merchant"] + "</td><td class='tb3cnb' style='font-size:8pt; color:blue; text-align:" + aMalign +";'>" + formatTime(aTime, 0) + " h</td>" + strDist;
				if (boolAllRaces) {
					aTime = getMTime(qDist, arrRaces[0]);
					aMalign = docDir[1];
					iHTML += "<td class='tb3cnb' >" + gIcons["merchant"] + "</td><td class='tb3cnb' style='font-size:8pt; color:blue; text-align=" + aMalign +";'>" + formatTime(aTime, 0) + " h</td><td>&nbsp;&nbsp;&nbsp</td>";

					aTime = getMTime(qDist, arrRaces[1]);
					aMalign = docDir[1];
					iHTML += "<td class='tb3cnb' >" + gIcons["merchant"] + "</td><td class='tb3cnb' style='font-size:8pt; color:blue; text-align:" + aMalign +";'>" + formatTime(aTime, 0) + " h</td>";
				}
				iHTML += "</tr>";
			}
			if (addTTime == true) {
				//add the troop rows
				var arX = getTroopsDetails(qDist, TB3O.crtUserRace, false);
				var arY = getTroopsDetails(qDist, arrRaces[0], true);
				var arZ = getTroopsDetails(qDist, arrRaces[1], true);
				for (iTT = 0; iTT < 10; iTT++) {
					var imgNo = iTT + arX[3];
					var imgName = "src='" + gIcons["u" + imgNo] + "'";
					if (TB3O.T35 != false) imgName = 'class="unit u' + imgNo + '" src="' + xGIF + '"';
					var aTime = getTTime(iTT, TB3O.crtUserRace, arX);
					iHTML += "<tr class='tb3rnb'><td class='tb3cnb' ><img " + imgName + "></td><td class='tb3cnb' style='font-size:8pt; text-align:" + properAlign + ";'>" + "&nbsp;" + formatTime(aTime, 0) + " h</td>" + strDist;
					if (boolAllRaces) {
						var imgNo = iTT + arY[3];
						var imgName = "src='" + gIcons["u" + imgNo] + "'";
						if (TB3O.T35 != false) imgName = 'class="unit u' + imgNo + '" src="' + xGIF + '"';
						var aTime = getTTime(iTT, arrRaces[0], arY);
						iHTML += "<td class='tb3cnb' ><img " + imgName + "></td><td class='tb3cnb' style='font-size:8pt; text-align:" + properAlign +";'>" + "&nbsp;" + formatTime(aTime, 0) + " h</td><td>&nbsp;&nbsp;&nbsp</td>";

						var imgNo = iTT + arZ[3];
						var imgName = "src='" + gIcons["u" + imgNo] + "'";
						if (TB3O.T35 != false) imgName = 'class="unit u' + imgNo + '" src="' + xGIF + '"';
						var aTime = getTTime(iTT, arrRaces[1], arZ);
						iHTML += "<td class='tb3cnb' ><img " + imgName + "></td><td class='tb3cnb' style='font-size:8pt; text-align:" + properAlign + ";'>" + "&nbsp;" + formatTime(aTime, 0) + " h</td>";
					}
					iHTML += "</tr>";
				}
			}
		}
		return iHTML;
	}

	//update tooltip position
	function updateTooltip(e){
		var ttDiv = get("tb_tooltip");
		var x = (e.pageX + 8);
		var y = (e.pageY + 8);
		var divHeight = ttDiv.clientHeight;
		var divWidth = ttDiv.clientWidth;
		ttDiv.style.left = x + "px";
		if (y + divHeight > TB3O.wH) y = y - divHeight;
		ttDiv.style.top = y + "px";
		if (docDir[0] == 'left') {
			if (x + divWidth > TB3O.wW) x = x - divWidth;
		} else {
			if (x < 0) x = 5;
		}
		ttDiv.style.left = x + "px";
	}

	function createTooltip() {
		var ttDiv = newDiv("", [["id", "tb_tooltip"], ["style", "position:absolute; display:block; padding:2px; z-index:900; border:1px solid #00C000; background-color:#FEFFE3; display:none;"]]);
		document.body.appendChild(ttDiv);
		document.addEventListener("mousemove", updateTooltip, 0);
		return ttDiv;
	}

	function reloadMapFunctions() {
		TB3O.origMap = false;
		mapFunctions();
	}

	// Map functions
	function mapFunctions() {
		var aTimeOut = getRndTime(1800);
		var allArrows = find("//area[starts-with(@id, 'ma_n')]", XPList);
		for (var xi = 0; xi < allArrows.snapshotLength; xi++) {
			if (TB3O.origMap == true) allArrows.snapshotItem(xi).addEventListener('click', reloadMapFunctions, false);
		}

		if (get("tb_tooltip") == null) createTooltip();
		var mapcontent = get('map_content');
		var areas = find("//map//area[@shape='poly' and (@coords)]", XPList, mapcontent);
		//if (areas.snapshotLength > 0 && TB3O.boolShowCellTypeInfo == '1') genMapCellInfoDivs();

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
				var area = get("a_" + k1 + "_" + k2);
				var mevobj = createMapInfoObjV2(area, i - 1);
				if (TB3O.origMap == true) {
					area.addEventListener("mouseover", mevobj.mouseOverEvent, false);
					area.addEventListener("mouseout",  mevobj.mouseOutEvent, false);
				}
			}
		}

		//the functions needed for the map
		function mapScan() {
			var j = 0;
			for(var i = 1; i < 50; i++) {
				if (get('map_info_' + i).innerHTML == '') {
					var k1 = (i - 1) % 7;
					var k2 = Math.floor((49-i)/7);
					if (get("i_" + k1 + "_" + k2).src.match(/\/(d|t)\d*.gif$/)) {
						var area = get("a_" + k1 + "_" + k2);
						var mevobj = createMapInfoObjV2(area, i-1);
						setTimeout(mevobj.scan, j * 600 + getRndTime(600));
						j++;
					}
				}
			}
		}

		function addMapScanLink() {
			removeElement(get('map_opts'));
			if (TB3O.boolShowCellTypeInfo == '1' && TB3O.T35 == false) {
				// create the "Scan the Map" link
				var b = find("//form[@method='post']", XPFirst).parentNode;
				var ctable = newTable([["id", "map_opts"]]);
				var ctbody = document.createElement("TBODY");
				var mapScanA = newLink(T('MAPSCAN'), [['id', 'mapscan'], ['href', jsVoid]]);
				mapScanA.addEventListener("click", mapScan, 0);
				trc = newRow("");
				tdc = newCell("", [["colspan", '2']]);
				tdc.appendChild(mapScanA);
				trc.appendChild(tdc);
				ctbody.appendChild(trc);
				ctable.appendChild(ctbody);
				b.appendChild(ctable);
			}
		}

		//generate the table on the "karte.php" page
		function genMapTable(){
			if (areas.snapshotLength > 0 && TB3O.boolShowCellTypeInfo == '1') genMapCellInfoDivs();
			//select the correct images and link titles for the reinf/attack icons
			var bMT = getGMcookie("showmaptable", false);
			if (bMT == 'false') {
				setGMcookie("showmaptable", '1', false);
				bMT = '1';
			}
			if (bMT != '1') return;
			var arrAction = getArrDefaultrpAction();
			removeElement(get('mapTable'));
			var table = newTable([["id", "mapTable"], ["sortCol", -1], ["class", "tbg"], ['style', 'text-align:' + docDir[0] + '; spacing:1px; padding:1px;']]);
			var thead = document.createElement("THEAD");
			var tbody = document.createElement("TBODY");
			var aRow = newRow("", [['class', "rbg"]]);
			thead.appendChild(aRow);
			table.appendChild(thead);
			var columnLabels = ['PLAYER', 'ALLIANCE', 'ALDEAS', 'POPULATION', 'COORDS', 'MAPTBACTS'];
			for (var i = 0; i < columnLabels.length; i++){
				if (i < 4) {
					var td = newCell(T(columnLabels[i]) + " (<img src='" + image["arrowdown"] + "' width='8' style='cursor:pointer;'><img src='" + image["arrowup"] + "' width='8' style='cursor:pointer'>)", [['title', T('CLICKSORT')], ['style', 'font-size:8pt; font-weight:bold; text-align:center; cursor:pointer;']]);
					switch(i){
						case 3:	td.addEventListener("click", sortTable('mapTable', i, 'int'), 0);	break;
						default: td.addEventListener("click", sortTable('mapTable', i), 0);
					}
				} else {
					var td = newCell(T(columnLabels[i]), [['style', 'font-size:8pt; text-align:center;']]);
				}
				aRow.appendChild(td);
			}
			var boolMapTable = false;
			var anArea;
			for (var i = 0; i < 7; i++) {
				for (var j = 0; j < 7; j++) {
					anArea = get('a_' + i + '_' + j).wrappedJSObject;
					var cInfo = anArea.details;
					if (cInfo && cInfo.name != null ) {
						boolMapTable = true;
						var iRow = newRow("", [['class', 'tb3r'],['style', 'font-size:8pt']]);
						var aName = cInfo.name;
						var vID = xy2id(cInfo.x, cInfo.y);
						var aStyle = 'font-weight:plain; color:black;';
						if (cInfo.name == TB3O.crtUserName) aStyle = 'font-weight:bold; color:blue;';
						iRow.appendChild(newCell(aName, [['class', 'tb3c'], ['style', 'font-size:8pt; text-align:center;' + aStyle + ';']]));
						iRow.appendChild(newCell(cInfo.ally, [['class', 'tb3c'], ['style', 'font-size:8pt; text-align:center;']]));
						if (TB3O.T35 == false) aHref = anArea.href; else aHref = "karte.php?" + cInfo.querystring;
						iRow.appendChild(newCell('<a href="' + aHref + '">' + cInfo.dname + '</a>', [['class', 'tb3c'], ['style', 'font-size:8pt; text-align:center;']]));
						iRow.appendChild(newCell(cInfo.ew, [['class', 'tb3c'], ['style', 'font-size:8pt; text-align:' + docDir[1] + ';']]));
						iRow.appendChild(newCell('<a href="' + aHref + '">' + cInfo.x + " | " + cInfo.y + '</a>', [['class', 'tb3c'], ['style', 'font-size:8pt; text-align:center;']]));
						iRow.appendChild(newCell('<a href="a2b.php?z=' + vID + '">' + gIcons[arrAction[0]] + '</a>' + '  ' + '<a href="build.php?z=' + vID + '&gid=17">' + gIcons["r41"] + '</a>', [['style', 'font-size:8pt; text-align:center;']]));
						tbody.appendChild(iRow);
					}
				}
			}
			table.appendChild(tbody);
			if (boolMapTable == true)  {
				var middleblock = get(dmid);
				var yT = deltaTopY(table) + 'px';
				table.style.top = yT;
				table.style.position = "absolute";
				middleblock.appendChild(table);
			}
		}

		function genMapCellInfoDivs() {
			var mapinfoX = get("map_info");
			if (mapinfoX != null) {
				//remove the big DIV
				removeElement(mapinfoX);
			} else {
				//remove all the small DIVs
				for(var i = 1; i < 50; i++) {removeElement(get('map_info_' + i));}
			}
			if (TB3O.T35 == false) {var mapinfo = newDiv("", [['id', 'map_info']]);}

			for(var i = 1; i < 50; i++){
				if (TB3O.T35 == false) {
					var divsX = newDiv("", [['id', 'map_info_' + i], ['class', 'mt' + i], ['style', 'position:relative; left:31px; top:54px; z-index:90; border:1px solid #00C000; background-color: #FEFFE3; -moz-border-radius:10px;']]);
					var divs = newDiv("", [['class', 'mt' + i], ['style', 'z-index:2;']]);
					divs.appendChild(divsX);
					mapinfo.appendChild(divs);
				} else {
					var divs = newDiv("", [['id', 'map_info_' + i], ['style', 'position:relative; height:1px; width:1px; ' + docDir[0] +':31px; top:45px; z-index:90; border:1px solid #00C000; background-color: #FEFFE3; -moz-border-radius:10px']]);
					var k1 = (i - 1) % 7;
					var k2 = Math.floor((49-i)/7);
					var mapCell = get("i_" + k1 + "_" + k2);
					mapCell.appendChild(divs);
				}
			}
			if (TB3O.T35 == false) {
				var iniCell = get("a_0_6");
				if (iniCell) iniCell.parentNode.appendChild(mapinfo);
			}
		}
	}

	function marketSell(){
		//global/local option provided by Zippo.
		marketSellMinMax();
		if (!find("//input[@type='hidden' and @name='t' and @value='2']", XPFirst)) return;
		find("//form", XPFirst).setAttribute("name", "sell");
		var a = find("//input[@type='image' and @name='s1']", XPFirst);
		a.addEventListener("click", function(){
			var saveofferoption = document.getElementById('saveofferoption');
			var saveofferglobal = document.getElementById('saveofferglobal');
			var bSaveOf = true;
			var bSaveOfG = true;
			if (saveofferoption && saveofferoption.checked == false) bSaveOf = false;
			if (saveofferglobal && saveofferglobal.checked == false) bSaveOfG = false;
			if (bSaveOf) {
				var param = ["m1", "m2", "rid1", "rid2", "d2"];
				var checks = ["d1", "ally"];
				var values = new Array();
				for (var i = 0; i < param.length; i++) eval("values[" + i + "] = find(\"//*[@name='" + param[i] + "']\", XPFirst).value");
				for (var i = 0; i < checks.length; i++){
					try {
						eval("var b = find(\"//*[@name='" + checks[i] + "']\", XPFirst).checked");
						if (b == true) values[i + param.length] = '1'; else values[i + param.length] = '0';
					} catch(e) {}
				}
				if (!bSaveOfG) values[7] = aVillage.vID;
				appendGMcookieValue("ventas", values, false);
			}
		}, 0);

		// get offers string
		var strOffers = getGMcookie("ventas", false);
		if (strOffers == "false") {
			setGMcookie("ventas", '', false);
			strOffers = '';
		}

		var ventas = new Array();
		if (strOffers != ''){
			strOffers = strOffers.split("$$");
			var j = 0;
			for (var i = 0; i < strOffers.length; i++) {
				var strVillage = strOffers[i].split("$")[7];
				if (strVillage == aVillage.vID || strVillage == undefined ) {
					ventas[j] = strOffers[i].split("$");
					ventas[j][8] = i;
					j++;
				}
			}
		}

		if (ventas.length > 0){
			var aTb = newTable([["id", "ventas"], ["class", "tb3tb"]]);

			var tr = newRow("", [["class", "rbg"]]);
			var columnas = [T('OFREZCO'), T('BUSCO'), T('MAXTIME'), T('ALLIANCE'), T('SELL'), T('ELIMINAR')];
			for (var i = 0; i < columnas.length; i++) tr.appendChild(newCell(columnas[i]));
			aTb.appendChild(tr);

			for (var i = 0; i < ventas.length; i++){
				var tr = newRow("");
				//var td = elem("TD", '<img ' + gIcons["r" + (ventas[i][2])] + ' width="18" height="12" title="' + T('RES' + (ventas[i][2])) + '"> ' + ventas[i][0]);
				var td = newCell(gIcons["r" + (ventas[i][2])] + ' ' + ventas[i][0]);
				tr.appendChild(td);
				td = newCell(gIcons["r" + (ventas[i][3])] + ' ' + ventas[i][1]);
				tr.appendChild(td);
				td = newCell(ventas[i][5] == '1' ? ventas[i][4] : T('NO'));
				tr.appendChild(td);
				td = newCell(ventas[i][6] == '1' ? T('YES') : T('NO'));
				tr.appendChild(td);

				td = newCell('<a href=' + jsVoid + ' onClick = "sell.m1.value=' + ventas[i][0] + '; sell.m2.value=' + ventas[i][1] + '; sell.rid1.value=' + ventas[i][2] + '; sell.rid2.value=' + ventas[i][3] + '; sell.d2.value=' + ventas[i][4] + '; sell.d1.checked=' + (ventas[i][5] == '1') + '; sell.ally.checked=' + (ventas[i][6] == '1') + '; sell.submit();"><img src="' + image["buttonOK"] + '" title="' + T('SELL') + '" alt="' + T('SELL') + '"></a>');
				tr.appendChild(td);
				aTb.appendChild(tr);

				var enlace = newLink("", [['href', jsVoid]]);
				var delImg = newImage([['src', gIcons["del"]], ['style', 'width:12px; height:12px; border:0px none white; cursor:pointer'], ['title', T('ELIMINAR')]]);

				enlace.appendChild(delImg);
				enlace.addEventListener("click", removeGMcookieValue("ventas", ventas[i][8] , true, marketSell, false), 0);
				var td = newCell("");
				td.appendChild(enlace);
				tr.appendChild(td);;
			}
			var aPar = elem("P", "");
			aPar.appendChild(aTb);
			insertAfter(a, aPar);
		}
	}

	function getdorf3SelectedVinfo(ansdoc, ans) {
		// newdid of the village
		var newdid;
		var vID = 0;
		var retValue = [-1000, -1000];
		try {
			if (TB3O.T35 == false) {
				var avLink = ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue;
				newdid = getNewdidFromLink(avLink.href);
				var aX = ansdoc.evaluate('//a[@class="active_vl"]/../../td/table/tbody/tr/td', ans, null, XPFirst, null).singleNodeValue;
				if (aX) {
					var X = parseInt(aX.innerHTML.replace("(", ""));
					var aY = ansdoc.evaluate('//a[@class="active_vl"]/../../td/table/tbody/tr/td[3]', ans, null, XPFirst, null).singleNodeValue;
					if (aY) {
						var Y = parseInt(aY.innerHTML.replace(")", ""));
						vID = xy2id(X, Y);
					}
				}
			} else {
				var avLink = ansdoc.evaluate("//div[@id='vlist']//table[@class='vlist']//tr[@class='sel']//a", ans, null, XPFirst, null).singleNodeValue;
				if (!avLink) avLink = ansdoc.evaluate("//table[@id='vlist']//td[@class='dot hl']/../td[@class='link']//a", ans, null, XPFirst, null).singleNodeValue;
				newdid = getNewdidFromLink(avLink.href);
				var vx;
				var vy;
				if (TB3O.M35 == 1) {
					vx = avLink.parentNode.parentNode.cells[2].textContent.replace("(", "");
					vy = avLink.parentNode.parentNode.cells[4].textContent.replace(")", "");
				} else if (TB3O.M35 == 2) {
					//avLink.parentNode.parentNode.cells[
				}
				vID = xy2id(vx, vy);
			}
		} catch(e) {
			newdid = aVillage.vNewdid;
			vID = aVillage.vID;
		}
		retValue[0] = vID;
		retValue[1] = newdid;
		return retValue;
	}

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
			var aCell = find("//td[@id='aldea" + vNewdid + "_1_3" + "']", XPFirst);
			if (arrBiP != null) {
				var b = new Array();
				b[0] = '-';
				var xi = 0;
				for (var j = 0; j < arrBiP.length; j++) {
					var bipT = arrBiP[j].endTime;
					if (bipT > crtTime) {
						b[xi] = "<img src='" + gIcons["bau"] +  "' title='" + arrBiP[j].name + " " +arrBiP[j].txtLvl + " - " + formatTime((bipT - crtTime) / 1000, 0) + "'>";
						xi += 1;
					}
				}
				aCell.innerHTML = b.join(" ");
			} else aCell.innerHTML = '-';
			var aCell = find("//td[@id='aldea" + vNewdid + "_1_2" + "']", XPFirst);
			if (arrTM != null) {
				var c = new Array();
				c[0] = '-';
				var yi = 0;
				for (var j = 0; j < arrTM.length; j++) {
					var atT = arrTM[j].fT;
					if (atT > crtTime) {
						var xImg;
						if (TB3O.T35 == false) xImg = '<img src="' + img("a/" + arrTM[j].type) + '" height="12px" width= "12px">'; else xImg = gIcons[arrTM[j].type];
						c[yi] = '<a href="build.php?newdid=' + vNewdid + '&gid=16" title="' + arrTM[j].no + ' - ' + formatTime((atT - crtTime) / 1000, 0) + '">' + xImg + "</a>";
						yi += 1;
					}
				}
				aCell.innerHTML = c.join(" ");
			} else aCell.innerHTML = '-';
		}
	}

	function processVillage119(t) {
		var ans = newDiv(t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		var newdid = getdorf3SelectedVinfo(ansdoc, ans)[1];

		// Baracks,Big barracks, Stable, BigStable, Workshop, Residence/Palace troops training
		var a = ansdoc.evaluate("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@width='5%']", ans, null, XPFirst, null).singleNodeValue;
		if (a){
			var aCell = find("//td[@id='aldea" + newdid + "_1_4" + "']", XPFirst);
			var aTb = a.parentNode.parentNode;
			var troopTraining = getTroopTrainingArray(aTb);
			var intAdd = 1 + TB3O.deltaRaceImg;

			var iHTML = aCell.innerHTML;
			if (iHTML == "-") iHTML = "";
			var gid = "false";
			for (var xi = 0; xi < troopTraining.length; xi++) {
				if (troopTraining[xi][0] > 0) {
					var imgNo = xi + intAdd;
					//var imgName = img("u/" + imgNo) + ".gif";
					var imgName = "src='" + gIcons["u" + imgNo] + "'";
					if (TB3O.T35 != false) imgName = 'class="unit u' + imgNo + '" src="' + xGIF + '"';
					if (gid != "" && gid != "false") {
						iHTML += "<a href='build.php?newdid=" + newdid + "&gid=" + gid + "'><img " + imgName + " title='" + troopTraining[xi][0] + "' alt='" + troopTraining[xi][1] + "'> ";
					} else {
						iHTML += "<img " + imgName + " title='" + troopTraining[xi][0] + "' alt='" + troopTraining[xi][1] + "'> ";
					}
				}
			}
			aCell.innerHTML = iHTML;
		}
	}

	function processVillage2() {
		//Resources
		var tPpH = [0, 0, 0, 0, 0];
		var infoX = getGMcookieV2("VillageRes");
		var tPpHc = 0;

		for (var i = 0; i < vList.length; i++) {
			if (infoX[vList[i].vID]) {
				for (var yi = 6; yi < 10; yi++) {
					tPpH[yi - 6] += infoX[vList[i].vID][yi];
					var aCell = find("//td[@id='aldea" + vList[i].vNewdid + "_2_" + (yi - 4) + "']", XPFirst);
					if (aCell) {
						aCell.innerHTML = getLS(infoX[vList[i].vID][yi]);
						addAttr(aCell, [['style', 'font-size:8pt; text-align:' + docDir[1] + ';']]);
					}
				}
				tPpHc += infoX[vList[i].vID][4];
				var bCell = find("//td[@id='aldea" + vList[i].vNewdid + "_2_6" + "']", XPFirst);
				var aVal = infoX[vList[i].vID][4];
				bCell.innerHTML = getLS(aVal);
				var strColor = "black";
				if (aVal < 0) strColor = "red";
				addAttr(bCell, [['style', 'font-size:8pt; text-align:' + docDir[1] + '; color:' + strColor + ' !important;']]);
			}
		}

		for (var i = 0; i < 4; i++) {
			var aCell = find("//td[@id='aldea_s_2_" + (i + 2) + "']", XPFirst);
			aCell.innerHTML = getLS(tPpH[i]);
			addAttr(aCell, [['style', 'font-size:8pt; text-align:' + docDir[1] + ';']]);
		}
		var sCell = find("//td[@id='aldea_s_2_6" + "']", XPFirst);
		sCell.innerHTML = getLS(tPpHc);
		addAttr(sCell, [['style', 'font-size:8pt; text-align:' + docDir[1] + ';']]);
	}

	function processVillage3() {
		//Resources
		var infoX = getGMcookieV2("VillageRes");
		for (var i = 0; i < vList.length; i++) {
			var ttFillG;
			var ttFillW = Infinity;
			var ttTemp;
			if (infoX[vList[i].vID]) {
				for (var yi = 6; yi < 10; yi++) {
					var cellNo = yi - 4;
					if (yi == 9) {
						cellNo = 6;
						var cropPerSec = infoX[vList[i].vID][4] / 3600;
						if (cropPerSec > 0 ) {
							ttFillG = (infoX[vList[i].vID][yi + 4] - infoX[vList[i].vID][yi]) / (cropPerSec);
						} else {
							ttFillG = - (infoX[vList[i].vID][yi] / cropPerSec);
						}
					} else {
						var ppS = infoX[vList[i].vID][yi - 5] / 3600;
						ttTemp = (infoX[vList[i].vID][yi + 4] - infoX[vList[i].vID][yi]) / (ppS);
						if (ttTemp < ttFillW) ttFillW = ttTemp;
					}
					var aCell = find("//td[@id='aldea" + vList[i].vNewdid + "_3_" + cellNo + "']", XPFirst);
					aCell.innerHTML = Math.round((infoX[vList[i].vID][yi] / infoX[vList[i].vID][yi + 4]) * 100) + " %";
					addAttr(aCell, [['style', 'font-size:10pt; text-align:' + docDir[1] + ';']]);
				}
				//time to empty/fill the warehouse
				var bCell = find("//td[@id='aldea" + vList[i].vNewdid + "_3_5" + "']", XPFirst);
				bCell.innerHTML = formatTime(ttFillW, 0);
				if (ttFillW < 7200) addAttr(bCell, [['style', 'color:red']]);
				addAttr(bCell, [['id', 'timeouta']]);
				//time to empty/fill granary
				var cCell = find("//td[@id='aldea" + vList[i].vNewdid + "_3_7" + "']", XPFirst);
				cCell.innerHTML = formatTime(ttFillG, 0);
				if (ttFillG < 7200 || cropPerSec < 0) addAttr(cCell, [['style', 'color:red']]);
				addAttr(cCell, [['id', 'timeouta']]);
			}
		}
	}

	function processVillage42(t){

		var ans = newDiv(t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		var newdid = getdorf3SelectedVinfo(ansdoc, ans)[1];

		var a = ansdoc.evaluate("//div[@id='" + dmid2 + "']//b", ans, null, XPList, null);
		var cpi = 0;
		var cpt = 0;
		if (a && a.snapshotLength > 0) {
			var intAdd = 0;
			if (TB3O.T35 == false) intAdd = 1;
			cpi = a.snapshotItem(intAdd).textContent;
			cpt = a.snapshotItem(intAdd + 1).textContent;
		}

		var aCell = find("//td[@id='aldea" + newdid + "_4_2" + "']", XPFirst);
		aCell.innerHTML = cpi;
		//aCell.setAttribute("class", "ou");

		var aCell = find("//td[@id='aldea_s_4_2']", XPFirst);
		aCell.innerHTML = cpt;

		find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b2"];
		//find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='" + dlright1 + "']]", XPFirst).parentNode.firstChild.className = 'c2';
	}

	//function provided by MarioCheng for checking the Townhall and the parties thrown.
	function processVillage43(t){

		var ans = newDiv(t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		var newdid = getdorf3SelectedVinfo(ansdoc, ans)[1];

		var lvl = 0;
		var bTitle = ansdoc.evaluate("//div[@id='" + dmid2 + "']/h1/b", ans, null, XPFirst, null).singleNodeValue;
		if (bTitle) {
			var aLvl = bTitle.textContent.split(" ");
			for (i = 0; i < aLvl.length; i++) {
				if (!isNaN(parseInt(aLvl[i]))) lvl = parseInt(aLvl[i]);
			}
		}

		var aCell = find("//td[@id='aldea" + newdid + "_4_3" + "']", XPFirst);
		var showLvl = "Lvl " + lvl;
		var partyTime = "";

		var a = ansdoc.evaluate("//td[@width='25%']//span[@id='timer1']", ans, null, XPFirst, null).singleNodeValue;
		if (a) {
			partyTime = a.textContent;
			aCell.innerHTML = "<font title='" + showLvl + "'>" + partyTime + "</font>";
		} else {
			if (lvl > 0) {
				partyTime = "•";
				aCell.innerHTML = "<a href='build.php?newdid=" + newdid + "&gid=24' title='" + showLvl + "'>" + partyTime + "</a>";
			}
		}

		find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b2"];
		//find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='" + dlright1 + "']]", XPFirst).parentNode.firstChild.className = 'c2';
	}

	function processVillage44(t) {
		//get available senators/chiefs/settlers
		var ans = newDiv(t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		var vInfo = getdorf3SelectedVinfo(ansdoc, ans);
		var villageID = vInfo[0];
		var newdid = vInfo[1];

		if (villageID != 0) {
			var allTables = ansdoc.evaluate("//div[@id='" + dmid2 + "']/table/tbody/tr/td[1]/a[contains(@href, " + villageID + ")]/../../../..|//div[@id='" + dmid2 + "']/p[@class='b f16']", ans, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (allTables) {
				var aCell = find("//td[@id='aldea" + newdid + "_4_4" + "']", XPFirst);
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
							dImg.setAttribute("class", 'unit');
							dImg.setAttribute('border', '0');
							aCell.appendChild(dImg);
							aCell.innerHTML += " ";
						}
					}
					aValue = toNumber(allTroopCells[10].innerHTML);
					if (aValue != 0) {
						//settlers
						for (var xi = 1; xi < aValue + 1; xi++) {
							var aImg = aTb.rows[1].cells[10].firstChild;
							var dImg = aImg.cloneNode(true);
							dImg.setAttribute("class", 'unit');
							dImg.setAttribute('border', '0');
							aCell.appendChild(dImg);
							aCell.innerHTML += " ";
						}
					}
				}
				if (aCell.innerHTML == "") aCell.innerHTML = "-";
			}
		}
		find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b2"];
		//find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='" + dlright1 + "']]", XPFirst).parentNode.firstChild.className = 'c2';
	}

	function processVillage45(t){
		var ans = newDiv(t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		var newdid = getdorf3SelectedVinfo(ansdoc, ans)[1];

		var lvl = 0;
		var maxSlots = 0;
		var bTitle = ansdoc.evaluate("//div[@id='" + dmid2 + "']//h1", ans, null, XPFirst, null).singleNodeValue;
		if (bTitle) {
			var aLvl = bTitle.textContent.split(" ");
			lvl = parseInt(aLvl[aLvl.length - 1]);
		}
		var cpbuilding = 0;
		var ocSlots = 0;
		if (lvl != 0) {
			var spBcookie = getGMcookieV2("specBuildings");
			if (spBcookie && spBcookie[newdid]) cpbuilding = spBcookie[newdid][0];
		}

		var maxSlots = 0;
		maxSlots = (cpbuilding == 26)?((lvl==20)?3:(lvl>=15)?2:(lvl>=10)?1:0):(lvl==20)?2:(lvl>=10)?1:0;

		var expTable = ansdoc.evaluate("//div[@id='" + dmid2 + "']//table[@class='tbg']", ans, null, XPFirst, null).singleNodeValue;
		if (!expTable) expTable = ansdoc.evaluate("//div[@id='" + dmid2 + "']//table[@id='expansion']", ans, null, XPFirst, null).singleNodeValue;
		if (expTable) {
			var intRows = expTable.rows.length;
			var lrtd = expTable.rows[intRows-1].cells[0];
			var aColspan;
			ocSlots = intRows - 2;
			if (lrtd) aColspan = lrtd.getAttribute("colspan");
			if (aColspan) ocSlots = ocSlots - 1;
		}

		var slots = "" + ocSlots + "/" + maxSlots;

		var aCell = find("//td[@id='aldea" + newdid + "_4_5" + "']", XPFirst);
		var oldSlots = aCell.innerHTML;
		if (oldSlots != "-") oldSlots = oldSlots.split("/"); else oldSlots = ["0", "0"];

		aCell.innerHTML = slots;
		var sumCell = find("//td[@id='aldea_s_4_5']", XPFirst);
		if (sumCell) {
			var sumCellValue = sumCell.innerHTML.replace(",", "").replace(".", "").replace(" ", "").replace("&nbsp;", "");
			if (sumCellValue == "-") {
				sumCell.innerHTML = slots;
			} else {
				sumCell.innerHTML = (parseInt(sumCellValue.split("/")[0]) + ocSlots - parseInt(oldSlots[0])) + "/" + (parseInt(sumCellValue.split("/")[1]) + maxSlots - parseInt(oldSlots[1]));
			}
		}

		find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b2"];
		//find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='" + dlright1 + "']]", XPFirst).parentNode.firstChild.className = 'c2';
	}

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
					var aCell = find("//td[@id='aldea" + vNewdid + "_5_" + (j + 2) + "']", XPFirst);
					if (arrTT[j] != 0) {
						aCell.innerHTML = arrTT[j];
						addAttr(aCell, [['style', 'font-size:8pt; color:black; text-align:center;']]);
					} else {
						aCell.innerHTML = "-";
						addAttr(aCell, [['style', 'color:lightgrey; text-align:center;']]);
					}
					sumTT[j] += arrTT[j];
				}
			}
		}
		//sum of the troops
		for (var i = 2; i < 13; i++) {
			var aCell = find("//td[@id='aldea_s_5_" + i + "']", XPFirst);
			if (sumTT[i - 2] != 0) {
				aCell.innerHTML = sumTT[i - 2];
				addAttr(aCell, [['style', 'font-size:8pt; color:black; text-align:center;']]);
			} else {
				aCell.innerHTML = "-";
				addAttr(aCell, [['style', 'color:lightgrey; text-align:center;']]);
			}
		}
	}


	function refreshVillageV2(newdid, xi){
		return function(){
			find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b3"];
			var specBcookie = getGMcookieV2("specBuildings");
			var d3specBuildings = specBuildings;
			if (specBcookie && specBcookie[newdid]) d3specBuildings = specBcookie[newdid];
			if (xi == 1) {
				//buildings and attacks in progress
				//fix provided by MarioCheng
				var aCell = find("//td[@id='aldea" + newdid + "_1_4" + "']", XPFirst);
				aCell.innerHTML = "-";
				//end fix provided by MarioCheng
				ajaxRequest("dorf1.php?newdid=" + newdid, "GET", null, processVillage11,
					function(){ find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b4"]; });

				var updTroopsTraining = get("d3Upd_1_3");
				var boolUpdTroopsTraining = false;
				if (updTroopsTraining) boolUpdTroopsTraining = updTroopsTraining.checked;

				if (boolUpdTroopsTraining) {
					//troops in training in the barracks
					var isAvailableBarracks = d3specBuildings[1];
					if (isAvailableBarracks != 0) {
						var pgAjaxRequest = "build.php?newdid=" + newdid + "&gid=" + isAvailableBarracks;
						ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, function(){ find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b4"]; });
					}
					//troops in training in the big barracks
					var isAvailableBigBarracks = d3specBuildings[2];
					if (isAvailableBigBarracks != 0) {
						var pgAjaxRequest = "build.php?newdid=" + newdid + "&gid=" + isAvailableBigBarracks;
						ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, function(){ find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b4"]; });
					}
					//troops in training in the stable
					var isAvailableStable = d3specBuildings[4];
					if (isAvailableStable != 0) {
						var pgAjaxRequest = "build.php?newdid=" + newdid[i] + "&gid=" + isAvailableStable;
						ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, function(){ find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b4"]; });
					}
					//troops in training in the big stable
					var isAvailableBigStable = d3specBuildings[5];
					if (isAvailableBigStable != 0) {
						var pgAjaxRequest = "build.php?newdid=" + newdid + "&gid=" + isAvailableBigStable;
						ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, function(){ find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b4"]; });
					}
					//troops in training in the workshop
					var isAvailableWorkshop = d3specBuildings[3];
					if (isAvailableWorkshop != 0) {
						var pgAjaxRequest = "build.php?newdid=" + newdid[i] + "&gid=" + isAvailableWorkshop;
						ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, function(){ find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b4"]; });
					}
					//troops in training in the residence/palace
					var cpbuilding = d3specBuildings[0];
					if (cpbuilding != 0) {
						var pgAjaxRequest = "build.php?newdid=" + newdid + "&gid=" + cpbuilding;
						ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, function(){ find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b4"]; });
					}
				}
				//cannot get the correct request and table as no residence/palace level 10 available in test accounts
			} else if (xi == 2) {
				ajaxRequest("dorf1.php?newdid=" + newdid, "GET", null, processVillage2,
					function(){ find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = igIcons["b4"]; });
			} else if (xi == 3) {
				ajaxRequest("dorf1.php?newdid=" + newdid, "GET", null, processVillage3,
					function(){ find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b4"]; });
			} else if (xi == 4) {
				var cpbuilding = d3specBuildings[0];
				if (cpbuilding != 0) {

					var updPCperDay = get("d3Upd_4_2");
					var boolupdPCperDay = false;
					if (updPCperDay) boolupdPCperDay = updPCperDay.checked;

					var updSlots = get("d3Upd_4_5");
					var boolupdSlots = false;
					if (updSlots) boolupdSlots = updSlots.checked;

					var pgAjaxRequest = "build.php?newdid=" + newdid + "&gid=" + cpbuilding;
					if (boolupdPCperDay == true) {
						var pgAjaxRequest2 = pgAjaxRequest + "&s=2";
						ajaxRequest(pgAjaxRequest2, "GET", null, processVillage42,
							function(){ find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b4"]; });
					}
					if (boolupdSlots == true) {
						var pgAjaxRequest5 = pgAjaxRequest + "&s=4";
						ajaxRequest(pgAjaxRequest5, "GET", null, processVillage45,
							function(){ find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b4"]; });
					}
				} else {
					find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b5"];
					var aCell = find("//td[@id='aldea" + newdid + "_4_5" + "']", XPFirst);
					aCell.innerHTML = "0/0";
					//alert(T('NOPALACERESIDENCE'));
				}

				//parties thrown in the village
				var updParty = get("d3Upd_4_3");
				var boolupdParty = false;
				if (updParty) boolupdParty = updParty.checked;

				if (boolupdParty == true) {
					var isAvailableTownhall = d3specBuildings[7];
					if (isAvailableTownhall != 0) {
						var pgAjaxRequestParty = "build.php?newdid=" + newdid + "&gid=24";
						ajaxRequest(pgAjaxRequestParty, "GET", null, processVillage43, function(){ find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b4"]; });
					}
				}

				var updSenSettlers = get("d3Upd_4_4");
				var boolupdSenSettlers = false;
				if (updSenSettlers) boolupdSenSettlers = updSenSettlers.checked;

				if (boolupdSenSettlers == true) {
					//available senators/chiefs/settlers
					ajaxRequest("build.php?newdid=" + newdid + "&gid=16&j&k", "GET", null, processVillage44,
						function(){ find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b4"]; });
				}

			} else if (xi == 5) {
				//added "&j&k" as suggested by MarioCheng.
				ajaxRequest("build.php?newdid=" + newdid + "&gid=16&j&k", "GET", null, processVillage5,
					function(){ find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = gIcons["b4"]; });
			}
		}
	}

	function removeDorf3Table() {removeElement(get("dorf3table"));}

	function createDorf35Table(newPar, topRowText, secRowText) {
		var intAdd = 1 + TB3O.deltaRaceImg;
		removeDorf3Table();
		var aTb = newTable([["class", "tb3tb"], ['id', 'dorf3table'], ['style', 'font-size:10pt;']]);

		var trTop = newRow("", [["class", "tb3rhb"]]);

		var updAllCell = createUpdAllCell(5);
		trTop.appendChild(updAllCell);

		var tdTop = newCell(topRowText[4], [['class', 'tb3chnb'], ["colspan", "11"], ['style', ['font-weight:bold;']]]);
		trTop.appendChild(tdTop);
		//trTop.setAttribute("class", "rbg");
		aTb.appendChild(trTop);
		var trTop2 = newRow("", [['class', 'tb3rh']]);
		var tdTop2 = newCell(secRowText[0], [['class', 'tb3chnb'], ['width', '150']]);
		trTop2.appendChild(tdTop2);

		for (xi = 0; xi < 10; xi++) {
			var tdTop2 = newCell("-", [["class", "c"]]);
			if (TB3O.crtUserRace != "false") {
				var imgName = 'class="unit u' + (xi + intAdd) + '" src="' + xGIF + '"';
				if (TB3O.T35 == false) imgName = "src='" + gIcons["u" + (xi + intAdd)] + "'";
				tdTop2 = newCell("<img " + imgName + ">", [['class', 'tb3chnb']]);
			}
			trTop2.appendChild(tdTop2);
		}
		var tdTopHero = newCell(gIcons["hero"], [['class', 'tb3chnb']]);
		//if (TB3O.crtUserRace != "false") tdTopHero.setAttribute("class", "c");
		trTop2.appendChild(tdTopHero);
		aTb.appendChild(trTop2);

		//create the rows for the villages
		rowsDorf3(aTb, 11, 5);
		//Sum row
		sumRowDorf3(aTb, 11, 5);
		if (newPar) insertAfter(newPar, aTb);
		processVillage5();
	}

	function createDorf34Table(newPar, topRowText, secRowText) {

		removeDorf3Table();
		var aTb = newTable([["class", "tb3tb"], ['id', 'dorf3table'], ['style', 'font-size:10pt;']]);
		var trTop = newRow("", [["class", "tb3rhb"]]);
		var updAllCell = createUpdAllCell(4);
		trTop.appendChild(updAllCell);
		var tdTop = newCell(topRowText[3], [['class', 'tb3chnb'], ["colspan", "4"], ['style', ['font-weight:bold;']]]);
		trTop.appendChild(tdTop);
		aTb.appendChild(trTop);

		var trTop2 = newRow("");
		for (xi = 0; xi < 5; xi++){
			var tdTop2 = newCell('', [['class', 'tb3chnb']]);
			var iHTML = '';
			switch (xi) {
				case 0: iHTML = secRowText[0]; break;
				case 1: iHTML = T('CPPERDAY'); break;
				case 2: iHTML = T('PARTY'); break;
				case 3: iHTML = T('TROPAS'); break;
				case 4: iHTML = T('SLOT'); break;
			}
			tdTop2.innerHTML = iHTML;
			if (xi > 0) {
				var aCB = createDorf3Checkbox();
				aCB.setAttribute('id', 'd3Upd_4_' + (xi + 1));
				tdTop2.appendChild(aCB);
			} else if (xi == 0) tdTop2.setAttribute('width', '150');
			trTop2.appendChild(tdTop2);

		}

		aTb.appendChild(trTop2);
		//create the rows for the villages
		rowsDorf3(aTb, 4, 4);
		//Sum row
		sumRowDorf3(aTb, 4, 4);
		if (newPar) insertAfter(newPar, aTb);
	}

	function createDorf33Table(newPar, topRowText, secRowText) {

		removeDorf3Table();

		var aTb = newTable([["class", "tb3tb"], ['id', 'dorf3table'], ['style', 'font-size:10pt;']]);
		var trTop = newRow("", [["class", "tb3rhb"]]);
		var updAllCell = createUpdAllCell(3);
		trTop.appendChild(updAllCell);
		var tdTop = newCell(topRowText[2], [['class', 'tb3chnb'], ["colspan", "6"], ['style', ['font-weight:bold;']]]);
		trTop.appendChild(tdTop);
		aTb.appendChild(trTop);

		var trTop2 = newRow("");
		for (xi = 0; xi < 7; xi++){
			var tdTop2 = newCell('', [['class', 'tb3chnb']]);
			var iHTML = '';
			switch (xi) {
				case 0: iHTML = secRowText[0]; break;
				case 1:
				case 2:
				case 3: iHTML = gIcons["r" + xi]; break;
				case 5: iHTML = gIcons['r4']; break;
				case 4:
				case 6: iHTML = gIcons["clock"]; break;
			}
			tdTop2.innerHTML = iHTML;
			if (xi == 0) tdTop2.setAttribute('width', '150');
			trTop2.appendChild(tdTop2);
		}

		aTb.appendChild(trTop2);
		//create the rows for the villages
		rowsDorf3(aTb, 6, 3);
		if (newPar) insertAfter(newPar, aTb);
		processVillage3();
	}

	function createDorf32Table(newPar, topRowText, secRowText, merchant) {

		removeDorf3Table();

		var aTb = newTable([["class", "tb3tb"], ['id', 'dorf3table'], ['style', 'font-size:10pt;']]);
		var trTop = newRow("", [["class", "tb3rhb"]]);
		var updAllCell = createUpdAllCell(2);
		trTop.appendChild(updAllCell);
		var tdTop = newCell(topRowText[1], [['class', 'tb3chnb'], ["colspan", "6"], ['style', ['font-weight:bold;']]]);
		trTop.appendChild(tdTop);

		aTb.appendChild(trTop);

		var trTop2 = newRow("", [['class', 'tb3rh']]);
		for (xi = 0; xi < 7; xi++){
			var tdTop2 = newCell("", [['class', 'tb3chnb']]);
			var iHTML = '';
			switch (xi) {
				case 0: iHTML = secRowText[0]; break;
				case 1:
				case 2:
				case 3:
				case 4: iHTML = gIcons["r" + xi]; break;
				case 5: iHTML = gIcons["r4"] + "/" + gIcons["clock"]; break;
				case 6: iHTML = secRowText[4]; break;
			}
			tdTop2.innerHTML = iHTML;
			if (xi == 0) tdTop2.setAttribute('width', '150');
			trTop2.appendChild(tdTop2);
		}

		aTb.appendChild(trTop2);
		//create the rows for the villages
		rowsDorf3(aTb, 6, 2, merchant);
		//Sum row
		sumRowDorf3(aTb, 6, 2, merchant);
		if (newPar) insertAfter(newPar, aTb);
		processVillage2();
	}

	function createDorf31Table(newPar, topRowText, secRowText, merchant) {
		removeDorf3Table();
		var aTb = newTable([["class", "tb3tb"], ['id', 'dorf3table'], ['style', 'font-size:10pt;']]);
		var trTop = newRow("", [["class", "tb3rhb"]]);
		var updAllCell = createUpdAllCell(1);
		trTop.appendChild(updAllCell);
		var tdTop = newCell(topRowText[0], [['class', 'tb3chnb'], ['colspan', '4'], ['style', ['font-weight:bold;']]]);
		trTop.appendChild(tdTop);
		aTb.appendChild(trTop);
		if (secRowText) {
			var trTop2 = newRow("", [['class', 'tb3rh']]);
			for (xi = 0; xi < secRowText.length; xi++){
				var tdTop2 = newCell(secRowText[xi], [['class', 'tb3chnb']]);
				if (xi == 3) {
					var aS = 'd3Upd_1_3';
					var aCB = createDorf3Checkbox();
					aCB.setAttribute('id', aS);
					var aCBI = getGMcookie(aS, false);
					aCB.checked = eval(aCBI);
					aCB.addEventListener('click', setDorf3CheckOption(aS), false);
					tdTop2.appendChild(aCB);
				} else if (xi == 0) tdTop2.setAttribute('width', '150');
				trTop2.appendChild(tdTop2);
			}
		}
		aTb.appendChild(trTop2);
		//create the rows for the villages
		rowsDorf3(aTb, secRowText.length - 1, 1, merchant);
		if (newPar) insertAfter(newPar, aTb);
		processVillage11();
	}

	function setDorf3CheckOption(aStr) {
		return function() {
			var aCB = get(aStr);
			if (aCB) {
				if (aCB.checked == true) aCBI = 'true'; else aCBI = 'false';
				setGMcookie(aStr, aCBI, false);
			}
		}
	}

	function createUpdAllCell(xi) {
		var tdUA = newCell("", [['class', 'tb3chnb']]);
		if (xi == 4) {
			var uAL = newLink(gIcons["reload_v"], [['href', jsVoid]]);
			uAL.addEventListener('click', function () {updateAllVillages(xi);}, false);
			tdUA.appendChild(uAL);
		}
		return tdUA;
	}

	function updateAllVillages(xi) {
		for (var i = 0; i < vList.length; i++) {
			var aTimeOut = getRndTime(1971);
			setTimeout(refreshVillageV2(vList[i].vNewdid, xi), aTimeOut);
		}
		return;
	}

	function createDorf3Checkbox() {
		var cb = newInput([['type', 'checkbox'], ['value', '1'], ['checked', 'true']]);
		return cb;
	}

	function sumRowDorf3(pNode, maxTD, tabNo, merchant) {
		//Separator row
		var trSeparator = newRow("", [['class', 'tb3r']]);
		var tdSeparator = newCell("", [['class', 'tb3rnb'], ["colspan", "" + (maxTD + 1)]]);
		trSeparator.appendChild(tdSeparator);
		pNode.appendChild(trSeparator);

		//sum row
		var trSum = newRow("", [['class', 'tb3r']]);
		//first sum cell
		var ts1 = newCell(T('TOTAL'), [['class', 'tb3cnb'], ['style', 'font-weight:bold']]);
		trSum.appendChild(ts1);
		var totalMerchants = new Array();
		totalMerchants = [0, 0];
		if (merchant) {
			for (xi = 0; xi < merchant.length; xi++) {
				var merchants = merchant[xi].split("/");
				var posX = merchants[0].lastIndexOf(">");
				totalMerchants[0] += parseInt(merchants[0].substring(posX + 1));
				posX = merchants[1].indexOf("<");
				totalMerchants[1] += parseInt(merchants[1].substring(0, posX));
			}
		}
		for (var yi = 0; yi < maxTD; yi++) {
			var ts;
			if (merchant && yi == maxTD - 1) {
				ts = newCell("" + totalMerchants[0] + "/" + totalMerchants[1], [['class', 'tb3cnb']]);
			} else if (tabNo == 4 && yi == 1) {
				ts = newCell("", [["colspan", "2"], ['class', 'tb3cnb']]);
			} else if (tabNo == 4 && yi == 2) {
			} else {
				ts = newCell("-", [['class', 'tb3cnb']]);
			}
			ts.setAttribute("id", "aldea_s_" + tabNo + "_" + (yi+2));
			trSum.appendChild(ts);
		}
		pNode.appendChild(trSum);
		//return trSeparator;
	}

	function rowsDorf3(pNode, maxTD, tabNo, merchant) {
		for (var i = 0; i < vList.length; i++){
			var tr = newRow("", [['class', 'tb3r']]);
			//first cell
			var td1 = newCell("", [['class', 'tb3cnb'], ['style', 'text-align:' + docDir[0] + ';']]);
			var nobr = elem("NOBR", "");
			if (tabNo == 4) {
				var aLink = newLink("<img src='" + gIcons["b5"] + "' title='" + T('ACTUALIZAR') + "' id='aldea" + vList[i].vNewdid + "_boton'>", [['href', jsVoid]]);
				aLink.addEventListener("click", refreshVillageV2(vList[i].vNewdid, tabNo), 0);
				nobr.appendChild(aLink);
			}
			nobr.appendChild(elem("SPAN", ' <a href="dorf1.php?newdid=' + vList[i].vNewdid + '">' + vList[i].vName + '</a>'));
			td1.appendChild(nobr);
			tr.appendChild(td1);
			//second cell and the other ones
			for (yi = 0; yi < maxTD; yi++) {
				var td = newCell("-", [['class', 'tb3cnb'], ["id", "aldea" + vList[i].vNewdid + "_" + tabNo + "_" + (yi+2)]]);
				if (yi == maxTD - 1 && (tabNo == 1 || tabNo == 2)) td.innerHTML = merchant[i];
				tr.appendChild(td);
			}
			pNode.style.textAlign = docDir[0];
			pNode.appendChild(tr);
		}
	}

	function processDorf3() {
		var origParTop = find("//div[@id='" + dmid2 + "']//*[@class='txt_menue']", XPFirst);
		if (!origParTop) origParTop = find("//div[@id='" + dmid2 + "']//*[@id='textmenu']", XPFirst);
		if (!origParTop) origParTop = find("//div[@id='" + dmid2 + "']//p", XPFirst);
		if (TB3O.plusAcc == true) {
			origParTop.innerHTML += ' | <a href="dorf3.php?s=6">' + T('ATTABLES') + '</a>';
			return;
		}

		var origT = find("//div[@id='" + dmid2 + "']//table[@class='tbg']", XPFirst);
		if (!origT) origT = find("//div[@id='" + dmid2 + "']//table[@id='overview']", XPFirst);
		if (origT) origT.style.visibility = "hidden";

		if (origParTop) {
			var arrParTopLinks = origParTop.textContent.split("\n");
			var arrParTopText = new Array();
			for (xi = 0; xi < arrParTopLinks.length; xi++) {
				arrParTopText[xi] = arrParTopLinks[xi].replace("|", "");
			}
			arrParTopText.shift();
			origParTop.style.visibility = "hidden";
		}

		var origSecRow = origT.rows[1];
		var arrSecRow = origSecRow.textContent.split("\n");
		arrSecRow.pop();
		arrSecRow.shift();

		//get the merchant array
		var arrM = new Array();
		for (i = 0; i < vList.length; i++) {arrM[i] = origT.rows[2 + i].cells[4].innerHTML;}

		//replace the original Paragraph with a new one providing the same options as in Travian Plus
		var nP = elem("P", "");
		var a = get(dmid2);
		if (a.firstChild) {
			a.insertBefore(nP, a.firstChild);
		} else {
			a.appendChild(nP);
		}

		for (xi = 0; xi < arrParTopText.length; xi++) {
			var nPelem = newLink(arrParTopText[xi], [['class', "newDorf3elem_" + xi], ['href', jsVoid]]);
			if (xi == 0) {
				nPelem.addEventListener("click", function() {createDorf31Table(nP, arrParTopText, arrSecRow, arrM);}, 0);
			} else if (xi == 1) {
				nPelem.addEventListener("click", function() {createDorf32Table(nP, arrParTopText, arrSecRow, arrM);}, 0);
			} else if (xi == 2) {
				nPelem.addEventListener("click", function() {createDorf33Table(nP, arrParTopText, arrSecRow);}, 0);
			} else if (xi == 3) {
				nPelem.addEventListener("click", function() {createDorf34Table(nP, arrParTopText, arrSecRow);}, 0);
			} else if (xi == 4) {
				nPelem.addEventListener("click", function() {createDorf35Table(nP, arrParTopText, arrSecRow);}, 0);
			}
			nP.appendChild(nPelem);
			if (xi < arrParTopText.length - 1) {
				var nPsep = elem("SPAN", " | ");
				nP.appendChild(nPsep);
			}
		}
		removeElement(origParTop);
		createDorf31Table(nP, arrParTopText, arrSecRow, arrM);
	}

	function showDeleteAccount(){
		var aDiv = find("//p[parent::div[@id='" + dleft + "'] and @style] | //*[@class='deltimer']", XPFirst);
		if (aDiv){
			moveElement(aDiv, document.body);
			addAttr(aDiv, [["style", "position:absolute; display:block; padding:4px; z-index:2; border:1px solid #00C000; background-color:#FEFFE3; width:130px; text-align:center; " + docDir[1] + ":0px; top:0px;"]]);
			var aSpan = get("timer1");
			if (aSpan) addAttr(aSpan, [['style', 'color:orange;']]);
		}
	}

	//time and resource counters
	function setTimers(){
		function createResourceTimer(i){
			return function(){
				var sTimeouts = find("//*[@id='timeout" + i + "']", XPList);
				//decrease the required amount of the i type resource
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
											addAttr(resourceCellNode, [['class', 'tb3cnb']]);
											resourceCellNode.innerHTML = T('EXTAV');
										}
									} else removeElement(aTimeout.parentNode);
								}
							}
						}
					}
				}
			}
		}

		function createTimerHandler(){
			return function () {
				var allTimeouts = find("//*[@id='timeout' or @id='timeouta']", XPList);
				//decrease time
				for (var i = 0; i < allTimeouts.snapshotLength; i++){
					var aTimeout = allTimeouts.snapshotItem(i);
					var xTime = toSeconds(aTimeout.textContent) - 1;
					if (xTime >= 0)	aTimeout.textContent = formatTime(xTime, 0);//not reached
				}
				if (TB3O.boolIsNPCExluded == false) NPCUpdate();//fr3nchlover
			}
		}

		var arrFrequency = new Array(4);
		for (var i = 0; i < 4; i++){
			arrFrequency[i] = (1000 / Math.abs(prodPerHour[i]/3600));
			if (!isFinite(arrFrequency[i]) || arrFrequency[i] < 0 || capacity[i] - crtResUnits[i] == 0) arrFrequency[i] = Number.POSITIVE_INFINITY; else setInterval(createResourceTimer(i), Math.floor(arrFrequency[i]));
		}
		setInterval(createTimerHandler(),1000);
	}

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
		}
		return (maxLevel);
	}

	function colorLvl(crtLvl, gid){
		var result = 1;
		var neededResNPC = 0;
		var XY = bCost[parseInt(gid)][parseInt(crtLvl) + 1];
		if (XY) {
			for (var i = 0; i < 4; i++) {
				if (crtResUnits[i] < XY[i]) result = 0;
				neededResNPC += XY[i];
			}
			if (result == 0 && neededResNPC <= crtResUnits[4]) result = 2;
		}
		return result;
	}

	// market => offer: function marketSellMinMax automatically selects as offering the resource from which you have the most units and searching the resource with the minimum units for the current village
	// add option to save the offer
	// add option to save the offer as global (Zippo)
	function marketSellMinMax() {
		var aX = find("//input[@class='fm fm25']", XPFirst);
		if (!aX) aX = find("//input[@name='d2']", XPFirst);
		if (!aX) aX = find("//a[@class='selected' and contains(@href, '&t=2')]", XPFirst);
		if (!aX) return;
		var maxRes = crtResUnits[0];
		var minRes = crtResUnits[0];
		var indexMaxRes = 0;
		var indexMinRes = 0;
		var pS = document.getElementById('saveofferoption');

		for (var xi = 0; xi < 4; xi++){
			if (maxRes <= parseInt(crtResUnits[xi])) {maxRes = crtResUnits[xi]; indexMaxRes = xi;}
			if (minRes >= parseInt(crtResUnits[xi])) {minRes = crtResUnits[xi]; indexMinRes = xi;}
		}
		try {
			var offerTypeMax = document.getElementsByName("rid1");
			var offerTypeMin = document.getElementsByName("rid2");
			if (offerTypeMax) {offerTypeMax[0].value = "" + (indexMaxRes + 1) + ""; }
			if (offerTypeMin) {offerTypeMin[0].value = "" + (indexMinRes + 1) + ""; }
		} catch(e) {}

		if (!pS) {
			var aTb = find("//table[@class='f10']", XPFirst);
			if (!aTb) aTb = get("sell");
			if (aTb) {
				var sRow = newRow("");
				var iSave = elem("INPUT", "");
				addAttr(iSave, [['type', 'CHECKBOX'], ['id', 'saveofferoption'], ['value', '1'], ['style', 'margin:0px']]);
				var iSaveGlobal = elem("INPUT", "");
				addAttr(iSaveGlobal, [['type', 'CHECKBOX'], ['id', 'saveofferglobal'], ['value', '1']]);
				var sCell = newCell("");
				sCell.appendChild(iSave);
				sCell.appendChild(elem("TEXTNODE", "&nbsp;" + T('SAVE') + "&nbsp;"));
				sCell.appendChild(iSaveGlobal);
				sCell.appendChild(elem("TEXTNODE", "&nbsp;" + T('SAVEGLOBAL')));
				var maxCells = 4;
				if (TB3O.M35 == 2) maxCells = 3;
				for (var i = 0; i < maxCells; i++) {
					var aCell = newCell("");
					sRow.appendChild(aCell);
				}
				sRow.appendChild(sCell);
				aTb.appendChild(sRow);
			}
		}

		//add information about capacity of the merchants and make transport functions available to this page, too
		var merchantsPar = find("//form//p[@class='f10']", XPFirst);
		if (!merchantsPar) merchantsPar = find("//form//p", XPFirst);
		var mHTML = "";
		if (merchantsPar) {
			mHTML = merchantsPar.innerHTML;
			var mhMH = mHTML.split(" ")[0];
			var avMerchants = parseInt(mHTML.split(" ")[1].split("/")[0]);
			if (mHTML.indexOf("(") == -1) merchantsPar.innerHTML += " (" + merchantsCapacity + " / " + gIcons["merchant"] + ")";
		}

		var rxI = find("//input[@class='fm' and @name='m1']", XPFirst);
		if (!rxI) rxI = find("//input[@class='text' and @name='m1']", XPFirst);
		if (rxI) rxI.addEventListener('keyup', function() {mhRowUpdate3(avMerchants);}, false);
		var rxType = find("//select[@class='fm' and @name='rid1']", XPFirst);
		if (!rxType) rxType = find("//select[@class='dropdown' and @name='rid1']", XPFirst);
		if (rxType) rxType.addEventListener('change', function() {mhRowUpdate3(avMerchants);}, false);

		function mhRowUpdate3(maxM) {
			var totalTransport = 0;
			var maxC = parseInt(merchantsCapacity);
			var aR = parseInt(rxI.value);

			if (rxType) {
				if (crtResUnits[parseInt(rxType.value) - 1] < aR) rxI.value = crtResUnits[parseInt(rxType.value) - 1];
			}

			if (!isNaN(aR)) totalTransport += aR;

			var totMerchants = Math.ceil(totalTransport / maxC);

			//by MarioCheng & DMaster for wasted/exceeding resources
			var crtWaste = maxC - (totalTransport - (totMerchants-1) * maxC);
			var crtExceed = totalTransport - (maxM * maxC);
			//finished
			var mhText = "<b>" + mhMH + ": " + totMerchants + "/" + maxM + "<br>" + T('MAX') + ": " + maxM * maxC + "<br>";

			if (totMerchants > maxM) {
				var mhColor = "red";
				mhText += T('MTEXCEED') + ": "+ crtExceed;
			} else {
				var mhColor = "darkgreen";
				mhText += T('MTWASTED') + ": "+ crtWaste;
			}
			mhText += "<br>" + T('MTCURRENT') + ": " + totalTransport + "</b>";
			var mhCell = get("mhMerchants");
			if (mhCell == null || mhCell == undefined) {
				var mhRow = newRow("");
				var mhCell = newCell(mhText, [["id", "mhMerchants"], ["style", 'color:' + mhColor], ["colspan", '8']]);
				mhRow.appendChild(mhCell);
				aTb.appendChild(mhRow);
			} else {
				mhCell.innerHTML = mhText;
				mhCell.setAttribute("style", 'color:' + mhColor);
			}
			//work in progress !!!
			return;
		}
	}

	//show hero extended status
	function showHeroStatus() {
		var hmLink = find("//div[@id='" + dmid2 + "']//a[contains(@href, '&rename')]", XPFirst);
		if (!hmLink) return;
		var hoT = hmLink.parentNode.parentNode.parentNode.parentNode;
		var posType = hoT.rows[0].cells[0].textContent.indexOf(" (");
		var hHeader = hoT.rows[0].cells[0].textContent.substr(0, posType);
		var xLevel = "";
		notgata = true;
		for (xi = hHeader.length; xi > 0; xi--) {
			if (hHeader.charAt(xi) != " " && notgata) xLevel = hHeader.charAt(xi) + xLevel; else notgata = false;
		}
		var hLevel = parseInt(xLevel);
		var hPercent = parseInt(hoT.rows[hoT.rows.length - 1].cells[1].textContent);

		var crtExp = (hLevel + 1) * 100;
		var crtLevelExp = ((crtExp) / 2) * hLevel;
		var nextLevelExp = crtLevelExp + crtExp;

		var expGainedCrtLevel = (hLevel+1) * hPercent;
		var expToLevelUp = (hLevel + 1) * (100 - hPercent);

		var strLevel = hoT.rows[0].cells[0].childNodes[1].textContent;
		strLevel = strLevel.substr(0, strLevel.indexOf(hLevel) - 1);

		var xRow = newRow('');
		var hCell = newCell("", [['colSpan', '5']]);

		var hTable = newTable([['class', 'tb3tb'], ['width', '100%'], ['style', 'border:1px solid #C2C2C2;']]);
		var aRow = newRow('');
		var aCell = newCell(strLevel + " " + hLevel, [['class', 'tb3cbt']]);
		var bCell = newCell("" + hPercent + "%", [['class', 'tb3cbt']]);
		var cCell = newCell("" + (100 - hPercent) + "%", [['class', 'tb3cbt']]);
		var dCell = newCell(strLevel + " " + (hLevel + 1), [['class', 'tb3cbt']]);
		aRow.appendChild(aCell);
		aRow.appendChild(bCell);
		aRow.appendChild(cCell);
		aRow.appendChild(dCell);

		var bRow = newRow('');
		var a1Cell = newCell('', [['width', '100px'], ['class', 'tb3cbt']]);
		bRow.appendChild(a1Cell);
		var b1Cell = newCell('', [['colSpan', 2], ['class', 'tb3cbt']]);
		bRow.appendChild(b1Cell);

		var graphBar = newTable([['style', 'height: 10px; width: 100%; spacing:0px;']]);

		var rX = newRow('');
		var x1Cell = newCell('', [['style', 'width: ' + hPercent + '%; background-color: blue']]);
		var x2Cell = newCell('', [['style', 'width: ' + (100 - hPercent) + '%; background-color: lightgrey']]);

		rX.appendChild(x1Cell);
		rX.appendChild(x2Cell);
		graphBar.appendChild(rX);
		b1Cell.appendChild(graphBar);

		var c1Cell = newCell('', [['colSpan', 2], ['class','tb3cbt']]);
		bRow.appendChild(c1Cell);

		var cRow = newRow('');
		var a2Cell = newCell(crtLevelExp, [['class', 'tb3cbt']]);
		cRow.appendChild(a2Cell);
		var b2Cell = newCell(expGainedCrtLevel, [['title', "" + crtLevelExp + " + " + expGainedCrtLevel + " = " + (crtLevelExp + expGainedCrtLevel)], ['class', 'tb3cbt']]);
		cRow.appendChild(b2Cell);
		var c2Cell = newCell(expToLevelUp, [['class', 'tb3cbt']]);
		cRow.appendChild(c2Cell);
		var d2Cell = newCell(nextLevelExp, [['class', 'tb3cbt']]);
		cRow.appendChild(d2Cell);

		hTable.appendChild(aRow);
		hTable.appendChild(bRow);
		hTable.appendChild(cRow);
		hCell.appendChild(hTable);
		xRow.appendChild(hCell);
		hoT.appendChild(xRow);
	}

	//check if NPC page
	function isThisNPC()  {
		var xp = xpathResultEvaluate('//tr[@class="rbg"]/td[@colspan="5"]');
		var retValue = xp.snapshotLength == 1 && document.getElementsByName('m2[]').length == 4;
		if (retValue == false) retValue = document.getElementsByName("m2[]").length == 4;
		return retValue;
	}

	//check if NPC excluded
	function isThisNPCexcluded() {
		return (TB3O.boolUseNPCAssistant != '1' ||
			TB3O.boolIsThisNPC == true ||
			crtPage.indexOf("build.php") == -1 ||
			crtPage.match(/build.php\?(.*)&t=(\d+)/) != null ||
			get("map1") != null || find("//map[@name='map1']", XPFirst) != null);
	}

	//check if we are on the page where the NPC trade has been finished
	function boolIsThisPostNPC() {
		var xp = xpathResultEvaluate('//p[@class="txt_menue"]/following-sibling::*/img[@class="res"]');
		if (xp.snapshotLength == 0) xp = xpathResultEvaluate('//p[@class="txt_menue"]/following-sibling::*/img[starts-with(@class,"r")]');
		if (xp.snapshotLength == 0) xp = xpathResultEvaluate('//p/following-sibling::*/img[starts-with(@class,"r")]');
		return (xp.snapshotLength == 8);
	}

	//insert the NPC assistant back link
	function insertNPCHistoryLink() {
		var bname = getQueryParameters(urlNow, NPCbacklinkName);
		if (!bname) bname = "Go back";
		var div = get(dmid2);
		div.innerHTML += '<p>&nbsp;<a href="#" onclick="window.history.go(-2)"> &laquo; ' + bname + '</a></p>';
	}

	//fill out the NPC Merchant fields
	function fillOutNPCfields(aURL) {
		if (aURL.indexOf('&' + NPCResources) != NPCURL.length) return false;
		var needed = getQueryParameters(aURL, NPCResources).split(',');
		var inputs = document.getElementsByName('m2[]');
		for (var i = 0; i < 4; i++) {inputs[i].value = needed[i];}
		unsafeWindow.calculateRest();
	}

	function getTroopsToBeTrained() {
		var xp = xpathResultEvaluate('//input[starts-with(@id, "inputTroopNo_")]');
		if (xp.snapshotLength > 0) {
			var inputs = new Array();
			for (var i = 0; i < xp.snapshotLength; i++) {
				var f = xp.snapshotItem(i).value;
				inputs.push(f.length == 0 || isNaN(f) ? 0 : parseInt(f));
			}
			return inputs;
		} else return;
	}

	function parseURL(aURL) {
		var urlParts = aURL.split('?', 2);
		if (urlParts.length == 1) urlParts[1] = '';
		var parts = {path: urlParts[0], query: urlParts[1]};
		return parts;
	}

	function getQueryParameters(aURL, param) {
		var urlParts = parseURL(aURL).query.split('&');
		for (var i = 0; i < urlParts.length; i++) {
			var ki = urlParts[i].split('=');
			if (ki[0] == param) return decodeURIComponent(ki[1]);
		}
	}

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
			}
		}
		if (!added) pairs.push(add_pair);
		return urlParts.path + '?' + pairs.join('&');
	}

	function createFunctionToTrainMilitaryUnits(aId, aCost) {
		return function () {
			var a = get("inputTroopNo_" + aId);
			var d = get("exp" + aId);
			var c = calculateResourceTime(arrayByN(aCost, parseInt(a.value)), "100");
			if (c != null) {
				d.innerHTML = '';
				c.setAttribute('id', 'resNtable');
				d.appendChild(c);
			} else if (d != null) d.innerHTML = '';
		}
	}

	function timeToTrainMilitaryUnits() {
		if (!find("//form[@name='snd']//input[@type='image' and @value='ok']", XPFirst)) return;
		var aX = xpathResultEvaluate("//*[starts-with(@id, 'npc_tt_r')]");
		for (var i = 0; i < aX.snapshotLength; i++){
			var b = aX.snapshotItem(i);
			var cost = b.textContent.split("|");
			var aD = document.createElement("DIV");
			aD.setAttribute("id", "exp" + i);
			if (b.nodeName == "TD") {
				var aR = newRow("");
				var oT = b.parentNode.parentNode.parentNode;
				oT.rows[0].cells[0].setAttribute("rowspan", "3");
				oT.childNodes[1].appendChild(aR);
				var d = newCell("");
				aR.appendChild(d);
			} else if (b.nodeName == "DIV") {
				var aR = aX.snapshotItem(i);
				var d = aR.parentNode;
			}
			d.appendChild(aD);
			z = get('inputTroopNo_' + i);//fr3nchlover
			if (z) z.addEventListener("keyup", createFunctionToTrainMilitaryUnits(i, cost), 0);
		}
	}

	function NPCUpdate() {
		var arrTrain = null;
		//NPC for buildings/resource fields/armoury/blacksmith/town hall/academy
		var xpNeeded = xpathResultEvaluate("//*[@id='npcXX_1']");
		if (xpNeeded.snapshotLength != 0) NPCAssistant(1, xpNeeded, arrTrain);
		if (boolIsTroopsTrainingBuilding == true && document.getElementsByName('s1').length > 0) arrTrain = getTroopsToBeTrained();
		xpNeeded = xpathResultEvaluate('//*[starts-with(@id, "npc_tt_r")]');
		if (xpNeeded.snapshotLength != 0) NPCAssistant(2, xpNeeded, arrTrain);
	}

	//function for the NPC entries on pages where an NCP trade is possible
	function NPCAssistant(typeNPC, xpNeeded, arrTrain) {
		var crtBName = TB3O.FXtitle;
		//Needed resources
		for (var i = 0; i < xpNeeded.snapshotLength; i++) {
			var td = xpNeeded.snapshotItem(i);
			var arrContent = td.textContent.replace("\n", "").replace("\n", "").replace("\n", "").replace("\n", "").split("|");
			var arrayRes = new Array;
			for (xi = 0; xi < 4; xi++) {
				var aQ = arrContent[xi];
				if (arrContent[xi].lastIndexOf(":") != -1) {
					aQ = arrContent[xi].substr(arrContent[xi].lastIndexOf(":") + 1);
				} else if (arrContent[xi].lastIndexOf(".") != -1) {
					aQ = arrContent[xi].substr(arrContent[xi].lastIndexOf(".") + 1);
				}
				var intVal = parseInt(aQ);
				if (isNaN(intVal)) return;
				arrayRes[arrayRes.length] = intVal;
			}
			if (arrayRes == null || arrayRes.length < 4) continue;
			// Read needed resources and calculate total
			var needRes = new Array();
			var needResTotal = 0;
			for (var j = 0; j < 4; j++) {
				needRes.push(arrTrain ? arrayRes[j] * arrTrain[i] : arrayRes[j]);
				needResTotal += arrayRes[j];
			}

			//change suggested by fr3nchlover.
			var neededTotal = arrTrain && arrTrain[i] != 0 ? needResTotal * arrTrain[i] : needResTotal;

			// Get or create HTML container
			var container_id = 'npcXX_' + typeNPC + '_' + i;
			var container = get(container_id);
			if (container == null) {
				if (td.nodeName == "DIV") td = td.parentNode;
				td.innerHTML += '<br>';
				if (needResTotal > 20000  && typeNPC == 2) td.innerHTML += "<br>";
				td.innerHTML += '<div id="' + container_id + '" class="npc-general"> </div>';
				container = get(container_id);
			}
			//Show total & deficit/surplus
			var r = crtResUnits[4] - neededTotal;
			var r_s = '(' + r + ')';
			if (r < 0) r_s = '<span class="npc-red">(' + r + ')</span>'; else if (r > 0) r_s = '<span class="npc-green">(+' + r + ')</span>';
			container.innerHTML = '<b>' + T("TOTAL") + '</b>: ' + neededTotal + ' ' + r_s;

			// Show time estimate
			var dtNow = new Date();
			var dtEstimated = new Date();
			if (neededTotal > 0 && r < 0) {
				var sEst = Math.ceil(Math.abs(r) / (prodPerHour[5] / 3600));
				dtEstimated.setTime(dtNow.getTime() + (sEst * 1000));
				var formatDtEstimated =
					(dtEstimated.getDate() < 10 ? '0' + dtEstimated.getDate() : dtEstimated.getDate()) + '.' +
					(dtEstimated.getMonth() < 9 ? '0' + (dtEstimated.getMonth() + 1) : (dtEstimated.getMonth() + 1)) +
					(dtNow.getFullYear() < dtEstimated.getFullYear() ? dtEstimated.getYear() : '');
				if (dtEstimated.getDate() == dtNow.getDate() && dtEstimated.getMonth() == dtNow.getMonth()) {
					formatDtEstimated = "";
				} else {
					formatDtEstimated = '&nbsp;' + formatDtEstimated;
				}
				var formatTimeEstimated =
					(dtEstimated.getHours() < 10 ? '0' + dtEstimated.getHours() : dtEstimated.getHours()) + ':' +
					(dtEstimated.getMinutes() < 10 ? '0' + dtEstimated.getMinutes() : dtEstimated.getMinutes());
					container.innerHTML += ' | ' + T('LISTO') + '<span class="npc-red">' + formatDtEstimated + '&nbsp;' + '</span>' + T('AT') + '&nbsp;' + '<span class="npc-red">' + formatTimeEstimated + '</span>';
			}

			// Show time saved by NPC
			var time_saved = 0;

			if (neededTotal > 0) {
				for (var j = 0; j < 4; j++) {
					var PpMt = prodPerHour[j] / 60;
					var mUntilNPC = (dtEstimated.getTime() - dtNow.getTime()) / 1000 / 60;
					var resAtNPCtime = parseInt(crtResUnits[j]) + (mUntilNPC * PpMt);
					var deficitUntilNPC = needRes[j] - resAtNPCtime;
					if (deficitUntilNPC <= 0) continue;
					if (PpMt <= 0) {
						time_saved = null;
						break;
					}
					var diffCalc = Math.ceil(deficitUntilNPC / PpMt);
					if (diffCalc > time_saved) time_saved = diffCalc;
				}
			}

			if (time_saved == null) {
				container.innerHTML += ' | &#8734;';
			} else if (r < 0) {
			} else if (time_saved > 0) {
				var diffHours = Math.floor(time_saved / 60);
				if (diffHours < 10) diffHours = "0" + diffHours;
				var diffMinutes = time_saved % 60;
				if (diffMinutes < 10) diffMinutes = "0" + diffMinutes;
				var delta_str = T('NPCSAVETIME') + '&nbsp;' + diffHours + ':' + diffMinutes + ' h';
				if (diffHours < 1) delta_str = '<span class="npc-red">' + delta_str + '</span>';
				container.innerHTML += ' | ' + delta_str;
			}

			// Show max.
			if (arrTrain) {
				var maxY = Math.floor(crtResUnits[4] / needResTotal);
				container.innerHTML += ' | ' + T('MAX') + '. ';
				var aLink = newLink(maxY, [['href', jsVoid]]);
				aLink.addEventListener('click', clickOnNPCAssistant(i, maxY), false);
				container.appendChild(aLink);
			}

			// Show NPC link
			if (neededTotal > 0 && r >= 0 && (time_saved > 0 || time_saved == null) && TB3O.boolShowNPCLink) {
				var urlNPCback = addQueryParameter(NPCURL, NPCResources, needRes.join(','));
				urlNPCback = addQueryParameter(urlNPCback, NPCbacklinkName, crtBName);
				container.innerHTML += '&nbsp;<a href="' + urlNPCback + '"> &raquo; NPC</a>';
			}
		}

		function clickOnNPCAssistant(i, maxY) {
			return function() {
				var aI = get("inputTroopNo_" + i);
				if (aI) aI.value = maxY;
			}
		}
	}

	function getBootyCellInfo(booty) {
		var iHTML = '';
		for (var i = 0; i < 4; i++) {
			iHTML += gIcons["r" + (i + 1)] + booty[i] + (i < 3 ? ' + ' : ' = ' + booty[4]);
		}
		return iHTML;
	}

	function getBootyFromTable(aTb) {
		var retValue = [0,0,0,0,0];
		var xi = 3;
		var gata = false;
		while (xi < aTb.rows.length && !gata) {
			var bootyCell = aTb.rows[xi].cells[1];
			if (bootyCell.textContent.indexOf("|") != -1) gata = true;
			xi += 1;
		}
		if (gata) {
			var resInfo = bootyCell;
			for (var xi = 0; xi < bootyCell.childNodes.length; xi++) {
				var aChild = bootyCell.childNodes[xi];
				if (aChild.className == "goods" || aChild.className == "res") resInfo = aChild;
			}

			var aqBooty = resInfo.textContent.split("|");
			if (aqBooty.length > 1) {
				for (var i = 0; i < 4; i++) {
					retValue[i] = parseInt(aqBooty[i].replace(" ", "").replace(" ", ""));
					retValue[4] += retValue[i];
				}
			}
			var iHTML = getBootyCellInfo(retValue);
			bootyCell.innerHTML = iHTML;
		}
		return retValue;
	}

	function tableTotalVillageTroopsV3() {
		if (aVillage.vID != "") {
			// new search function
			// first search for tables, if search successfull then search for tables and oasis
			var strToSearch = "//div[@id='" + dmid2 + "']//table[@class='troop_details']//a[contains(@href, " + aVillage.vID + ")]/../../../..";
			var allTables = xpathResultEvaluate(strToSearch);
			if (allTables.snapshotLength == 0) {
				strToSearch = "//div[@id='" + dmid2 + "']//table[@class='std troop_details']//a[contains(@href, " + aVillage.vID + ")]/../../../..";
				allTables = xpathResultEvaluate(strToSearch);

				if (allTables.snapshotLength == 0) {
					strToSearch = "//div[@id='" + dmid2 + "']/table/tbody/tr/td[1]/a[contains(@href, " + aVillage.vID + ")]/../../../..";
					allTables = xpathResultEvaluate(strToSearch);

					if (allTables.snapshotLength == 0) {
						strToSearch = "//div[@id='" + dmid2 + "']/table/tbody/tr/td[1]/a[contains(@href, " + aVillage.vID + ")]/../../../..|//div[@id='" + dmid2 + "']/p[@class='b f16'] | //div[@id='" + dmid2 + "']//p[@class='info']";
						allTables = xpathResultEvaluate(strToSearch);
					}

				} else {
					strToSearch = "//div[@id='" + dmid2 + "']//table[@class='std troop_details']//a[contains(@href, " + aVillage.vID + ")]/../../../..|//div[@id='" + dmid2 + "']/p[@class='b f16'] | //div[@id='" + dmid2 + "']//p[@class='info']";
					allTables = xpathResultEvaluate(strToSearch);
				}

			} else {
				strToSearch = "//div[@id='" + dmid2 + "']//table[@class='troop_details']//a[contains(@href, " + aVillage.vID + ")]/../../../..|//div[@id='" + dmid2 + "']/p[@class='b f16'] | //div[@id='" + dmid2 + "']//p[@class='info']";
				allTables = xpathResultEvaluate(strToSearch);
			}

			if (allTables.snapshotLength > 0) {

				var booty = [0,0,0,0,0];
				var sumbooty = [0,0,0,0,0];
				var ccLabel = getGMcookie("tvtccLabel", false);
				if (ccLabel == 'false') ccLabel = '';
				// Search for first troop table from this village (david.macej)
				var firstVillageTable = 0;
				while (allTables.snapshotItem(firstVillageTable).rows[0].cells[0].innerHTML.search(aVillage.vID) == -1) {firstVillageTable++;}

				var tTable = allTables.snapshotItem(firstVillageTable).cloneNode(true);
				booty = getBootyFromTable(allTables.snapshotItem(firstVillageTable));
				for (var xi = 0; xi < 5; xi++) {sumbooty[xi] += booty[xi];}
				//addAttr(tTable, [['class', 'tb3tb'], ['style', 'font-size:10pt;']]);
				tTable.rows[0].cells[1].innerHTML = '<b>' + T('TOTALTROOPS') + '</b>';
				tTable.rows[0].setAttribute("class", "cbgx");
				tTable.rows[0].cells[0].setAttribute('class', 'cbgx');
				tTable.rows[0].cells[1].setAttribute('class', 'cbgx');
				var rowTrIcons = tTable.rows[1];
				var rowTrUnits = tTable.rows[2];
				if (tTable.rows.length == 4) {
					var rowCc = tTable.rows[3];
					var rowB = newRow("");
					var b1Cell = newCell('<img src="' + image["capacity"] + '">', [['style', 'text-align:center;']]);
					var strColspan = rowCc.cells[1].colSpan;
					var b2Cell = newCell("0", [['colspan', strColspan], ['id','tb3bountycell']]);
					rowB.appendChild(b1Cell);
					rowB.appendChild(b2Cell);
					rowCc.parentNode.insertBefore(rowB, rowCc);
				}
				var rowB = tTable.rows[tTable.rows.length - 2];
				var rowCc = tTable.rows[tTable.rows.length - 1];
				var intCC = 0;

				for (var i = firstVillageTable + 1; i < allTables.snapshotLength; i++) {
					var aTb = allTables.snapshotItem(i);
					if (aTb.nodeName == "P") break;

					//add the crop consumption label if found
					if (ccLabel == '') {
						var lastCell = aTb.rows[aTb.rows.length - 1].cells[1];
						if (lastCell) {
							var arrImg = lastCell.getElementsByTagName("IMG");
							if (arrImg.length > 0 && arrImg[0].className == 'r4') {
								ccLabel = aTb.rows[aTb.rows.length - 1].cells[0].innerHTML;
								setGMcookie("tvtccLabel", ccLabel, false);
							}
						}
					}

					//fix for the troops in oasis
					var nSibling = aTb.nextSibling;
					if (nSibling && nSibling.nodeName == "P") {
						if (nSibling.className == 'b f16') i = allTables.snapshotLength;
					}

					//fix provided by fr3nchlover
					var allTroopCells = aTb.rows[2].cells;
					if (allTroopCells.length == 12) {
						var heroIconCell = aTb.rows[1].cells[11];
						//add extra hero cell only if cell not exist in total troop table (david.macej)
						if (rowTrIcons.cells.length == 11) {
							rowTrIcons.appendChild(heroIconCell.cloneNode(true)); //<= add a new cell to first line
							rowTrUnits.appendChild(allTroopCells[11].cloneNode(true)); //<= add a new cell to second line
							rowTrUnits.cells[11].innerHTML = ""; // clean new cell
							rowCc.cells[1].colSpan = 11; // add 1 to cols
							rowB.cells[1].colSpan = 11;
							addAttr(tTable.rows[0].cells[1], [['colspan', 12]]);
						}
					}

					 // if troops not in village stop summing (david.macej)
					if (aTb.rows[0].cells[0].innerHTML.search(aVillage.vID) == -1) continue;

					//add the troop units from the current table to the new created table
					for (var j = 1; j < allTroopCells.length; j++) {
						var iHTML = rowTrUnits.cells[j].innerHTML;
						var intTroops = parseInt(allTroopCells[j].innerHTML);
						if (iHTML == "") rowTrUnits.cells[j].innerHTML = intTroops; else rowTrUnits.cells[j].innerHTML = parseInt(iHTML) + intTroops;
					}
					booty = getBootyFromTable(aTb);
					for (var xi = 0; xi < 5; xi++) {sumbooty[xi] += booty[xi];}
				}
				var arrTT = [0,0,0,0,0,0,0,0,0,0,0];
				for (var j = 1; j < rowTrUnits.cells.length; j++) {
					rowTrUnits.cells[j].className = (rowTrUnits.cells[j].innerHTML == "0") ? "c" : "";
					switch (j) {
						case 11: intCC += 6; arrTT[10] = 1; break;
						default:
							var tImg = rowTrIcons.cells[j].getElementsByTagName("IMG");
							if (tImg[0]) {
								var tType = getTroopIndexTitleFromImage(tImg[0]);
								arrTT[j - 1] = parseInt(rowTrUnits.cells[j].textContent);
								intCC += uc[parseInt(tType[0])][9] * arrTT[j - 1];
							} break;
					}
				}
				setGMcookieV2("Troops", arrTT, aVillage.vNewdid);

				rowCc.cells[1].innerHTML = (intCC) + " " + gIcons["r5"] + "/" + gIcons["clock"];
				rowCc.cells[0].innerHTML = ccLabel;

				if (sumbooty[4] != 0) rowB.cells[1].innerHTML = getBootyCellInfo(sumbooty); else rowB.style.display = 'none';

				if (TB3O.T35 == false) {
					var p = xpathResultEvaluate("//div[@id='" + dmid2 + "']/p[@class='txt_menue']").snapshotItem(0);
				} else {
					var menu = xpathResultEvaluate("//div[@id='" + dmid2 + "']/p/a");
					var p;
					if (menu.snapshotLength > 0) p = menu.snapshotItem(0).parentNode; else p = get("textmenu");
				}
				p.parentNode.insertBefore(tTable, p.nextSibling);

				newP = elem('P', '');
				newP.innerHTML += '<b>' + T('TOTALTROOPS') + '</b>';
				p.parentNode.insertBefore(newP, p.nextSibling);
			}
		}
	}

	function getDistance(sx1, sy1, sx2, sy2) {
		var x1 = parseInt(sx1);
		var y1 = parseInt(sy1);
		var x2 = parseInt(sx2);
		var y2 = parseInt(sy2);
		var dX = Math.min(Math.abs(x2 - x1), Math.abs(801 - Math.abs(x2 - x1)));
		var dY = Math.min(Math.abs(y2 - y1), Math.abs(801 - Math.abs(y2 - y1)));
		var dist = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
		return dist;
	}

	//------------------------------------------
	//Modified by Lux
	//------------------------------------------
	function showMsgPage(aState) {
		scroll(0,0);
		var outerPane = get('OuterMsgPage');
		var innerPane = get('InnerMsgPage');
		var buttonPane = get('divCloseMsgPage');

		if (aState) {
			diplayElements("none");
			outerPane.className = 'OuterMsgPageOn';
			innerPane.className = 'InnerMsgPageOn';
			buttonPane.className = 'divCloseMsgPageOn';

			var aButton = get('ButtonCloseMsgPage');
			//next line changed by ms99
			if (aButton) aButton.addEventListener("click", function(){showMsgPage(false)}, true);
		} else {
			outerPane.className = 'MsgPageOff';
			innerPane.className = 'MsgPageOff';
			buttonPane.className = 'MsgPageOff';
			diplayElements("");
		}
	}

	function addDiv() {
		var div = document.createElement("div");
		//modified by ms99
		div.innerHTML = '<div style="text-align:right;" id="OuterMsgPage" class="MsgPageOff"></div>'+
						'<div style="text-align:right;" id="divCloseMsgPage" class="MsgPageOff"></div>'+
						'<div id="InnerMsgPage" class="MsgPageOff"></div>';
		document.body.insertBefore(div, document.body.firstChild);
	}

	function diplayElements(aType) {
		var uTable = get('upgTable');
		var mapTable = get('mapTable');
		var trooptimetable = get('trooptimetable');
		if (uTable) {
			uTable.style.display = aType;
		} else if (mapTable) {
			mapTable.style.display = aType;
		} else if (trooptimetable) {
			trooptimetable.style.display = aType;
		}
	}
	//------------------------------------------

	function allyCalculation() {
		if (crtPage.indexOf("allianz.php?aid") != -1) {
			var allyTable = find("//div[@id='" + dmid2 + "']//table", XPFirst);
			if (TB3O.T35 == false) allyTable = find("//div[@id='" + dmid2 + "']//table[@class='tbg']", XPFirst);
			if (allyTable) {
				var iHTML = allyTable.rows[0].cells[0].innerHTML;
				var allyName;
				if (TB3O.M35 == 2) {
					var tbd = find("//td[@class='details']//table", XPFirst);
					allyName = tbd.rows[0].cells[1].textContent;
				} else {
					allyName = allyTable.rows[3].cells[1].textContent;
				}

				var iHTML2 = iHTML.replace(allyName, "");
				allyTable.rows[0].cells[0].innerHTML = iHTML + " " + "<a href='" + crtPage + "'>" + allyName + "</a>";
			}
		}

		var a = find("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@width='6%']", XPFirst);
		var aTb;
		if (a) aTb = a.parentNode.parentNode; else aTb = get("member");
		if (aTb) {
			var totalPop = 0;
			var totalVil = 0;
			var totalBullets = [[0, ""], [0, ""], [0, ""], [0, ""], [0, ""]]; //blue, green, yellow, red, grey
			var boolMyAlly = true;
			for (var i = 1; i < aTb.rows.length; i++) {
				totalPop += parseInt(aTb.rows[i].cells[2].textContent);
				totalVil += parseInt(aTb.rows[i].cells[3].textContent);
				if (boolMyAlly) {
					if (aTb.rows[i].cells[4]) {
						var imgBullet = aTb.rows[i].cells[4].firstChild;
						if (imgBullet.src.indexOf("x.gif") == -1) {
							var xf = basename(imgBullet.src).replace("b", "").replace(".gif", "");
							var j = parseInt(xf);
							totalBullets[j - 1][0] += 1;
							totalBullets[j - 1][1] = imgBullet.title;
						} else if (imgBullet.className.indexOf("online") != -1) {
							var aClass = imgBullet.className;
							switch (aClass) {
								case 'online1': j = 0; break;
								case 'online2': j = 1; break;
								case 'online3': j = 2; break;
								case 'online4': j = 3; break;
								case 'online5': j = 4; break;
							}
							totalBullets[j][0] += 1;
							totalBullets[j][1] = imgBullet.title;
						}
					} else boolMyAlly = false;
				}
			}
			var popPerPlayer = Math.round(totalPop/(aTb.rows.length - 1));
			var boolIsMyAlly = aTb.rows[1].cells.length == 5;

			var rowTotal = newRow("", [['class', 'tb3r']]);
			aTb.appendChild(rowTotal);
			var aCell = newCell(T('TOTAL'), [['class', 'tb3ch'], ["colspan", "2"]]);
			rowTotal.appendChild(aCell);
			var bCell = newCell(totalPop, [['class', 'tb3ch'], ['style', 'text-align:center']]);
			rowTotal.appendChild(bCell);
			var cCell = newCell(totalVil, [['class', 'tb3ch'], ['style', 'text-align:center']]);
			rowTotal.appendChild(cCell);
			if (boolIsMyAlly) rowTotal.appendChild(newCell("", [['class', 'tb3ch']]));

			//average population per member of aliance
			var rowAv = newRow("", [['class', 'tb3r']]);
			aTb.appendChild(rowAv);
			var dCell = newCell(T('AVPOPPERPLAYER'), [['class', 'tb3ch'], ["colspan", "2"]]);
			rowAv.appendChild(dCell);
			var eCell = newCell(popPerPlayer, [['class', 'tb3ch'], ["colspan", "2"], ['style', 'text-align:center']]);
			rowAv.appendChild(eCell);
			if (boolIsMyAlly) rowAv.appendChild(newCell("", [['class', 'tb3ch']]));

			//average population per village
			var rowAv = newRow("", [['class', 'tb3r']]);
			aTb.appendChild(rowAv);
			var dCell = newCell(T('AVPOPPERVIL'), [['class', 'tb3ch'], ["colspan", "2"]]);
			rowAv.appendChild(dCell);
			var eCell = newCell(Math.round(totalPop/totalVil), [['class', 'tb3ch'], ["colspan", "2"], ['style', 'text-align:center']]);
			rowAv.appendChild(eCell);
			if (boolIsMyAlly) rowAv.appendChild(newCell("", [['class', 'tb3ch']]));

			//number of bullets by type
			if (boolMyAlly) {
				var rowBullets = newRow("", [['class', 'tb3r']]);
				var cellBullets = newCell("", [['class', 'tb3ch'], ['colspan', '5'], ['style', 'text-align:center']]);
				var cBiHTML = "";
				var addSpacer = " | ";
				for (var j = 0; j < 5; j++) {
					if (totalBullets[j][0] > 0) cBiHTML += "<img src='" + gIcons["b" + (j+1)] + "' title='" + totalBullets[j][1] + "'> = &nbsp;" + totalBullets[j][0] + addSpacer + " ";
				}
				cellBullets.innerHTML = cBiHTML.substring(0, cBiHTML.length - 3);
				rowBullets.appendChild(cellBullets);
				aTb.appendChild(rowBullets);
			}
		}
	}

	//function to determine if the current active village is the capital (needed for processDorf1 to show/hide the resource upgrade table for resource fields >= 10)
	function isThisTheCapital() {
		var xyCap = getGMcookie("capitalxy", false);
		var boolReturn = true;
		if (xyCap != "false") {
			capXY = xyCap.replace("(", "").replace(")", "").split("|");
			var cID = xy2id(capXY[0], capXY[1]);
			if (cID != aVillage.vID) boolReturn = false;
		}
		return boolReturn;
	}

	function getTroopTrainingArray(tb) {
		var intAdd = 1 + TB3O.deltaRaceImg;
		var arrTraining = [[0,''],[0,''],[0,''],[0,''],[0,''],[0,''],[0,''],[0,''],[0,''],[0,''], [0,'']];
		for (var i = 1; i < tb.rows.length - 1; i++) {
			var aC = tb.rows[i].cells[1];
			var bC = tb.rows[i].cells[2];
			var aImg = tb.rows[i].cells[0].firstChild;
			if (aImg.nodeName != "IMG") {
				aC = tb.rows[i].cells[0];
				aImg = aC.childNodes[1].firstChild;
				bC = aC.childNodes[5];
			}
			var iTT = getTroopIndexTitleFromImage(aImg)[0];
			if (iTT == 99) iTT = 11;
			var troopsTrained = parseInt(aC.textContent);
			arrTraining[iTT - intAdd][0] += troopsTrained;
			arrTraining[iTT - intAdd][1] = bC.textContent;
		}
		return arrTraining;
	}

	function processTroopsTrainingTable() {
		//add cells/row to the original table
		var origT = find("//div[@id='" + dmid2 + "']//table[starts-with(@class, 'build')]", XPFirst);
		if (!origT) {
			origT = find("//div[@id='" + dmid2 + "']//table[@class='tbg' and @cellspacing='1']", XPFirst);
			if (!origT) origT = find("//div[@id='" + dmid2 + "']//table[@class='tbg' and @cellpadding='2']", XPFirst);
		}
		if (origT) {
			origT.setAttribute("id", "trainingTable");
			origT.rows[0].appendChild(newCell(gIcons["clock"] + "&" + gIcons["r5"], [['class', 'tb3ch'], ['style', 'padding:2px;']]));
			for (xi = 1; xi < origT.rows.length; xi++) {origT.rows[xi].appendChild(newCell("", [['class', 'tb3c'], ['style', 'padding:2px;']]));}
		}

		//get all the input cells
		var bInputList = find("//input[@type='text'] | //input[@type='Text']", XPList);
		if (bInputList.snapshotLength != 0) {
			//trooInfo = array => troopIndex, time to build 1 troop of this type
			var troopInfo = [[0, 0], [0, 0], [0, 0], [0, 0]];
			for (var xi = 0; xi < bInputList.snapshotLength; xi++) {
				var bInput = bInputList.snapshotItem(xi);
				bInput.setAttribute("id", 'inputTroopNo_' + xi);
				//get the time for training this troop type
				var bRow = bInput.parentNode.parentNode;
				var cell1 = bRow.cells[0];
				var bCell;
				var aTimeElem;
				if (cell1.childNodes[1].nodeName == 'TABLE') {
					bCell = bRow.cells[0].childNodes[1].rows[1].cells[0];
					aTimeElem = bCell.innerHTML.split("|")[5];
					var aTime = aTimeElem.substring(aTimeElem.lastIndexOf(">") + 2);
					var tCell = bRow.cells[0].childNodes[1].rows[0].cells[0];
					if (tCell) troopInfo[xi][0] = getTroopIndexTitleFromImage(tCell.firstChild)[0];
				} else if (cell1.childNodes[1].nodeName == 'IMG') {
					bCell = bRow.cells[1].childNodes[6];
					aTimeElem = bRow.cells[1].childNodes[8];
					aTimeElem.setAttribute("style", 'font-size:8pt;');
					aTimeElem.setAttribute("id", "npc_tt_t_" + xi);
					var aTime = aTimeElem.textContent.replace("\n", "");
					var tImg = bRow.cells[0].childNodes[1];
					troopInfo[xi][0] = getTroopIndexTitleFromImage(tImg)[0];
				}
				bCell.setAttribute("style", 'font-size:8pt;');
				bCell.setAttribute("id", "npc_tt_r_" + xi);
				var aTimeSeconds = toSeconds(aTime);
				troopInfo[xi][1] = aTimeSeconds;
				var cCell = bRow.cells[bRow.cells.length - 1];
				bInput.addEventListener("keyup", computeTimeTrainTroops(xi, troopInfo, cCell), false);
				//get the number link
				var aNrLink = bRow.cells[2].childNodes[0];
				if (aNrLink.nodeName == "DIV") aNrLink = aNrLink.firstChild; else aNrLink = bRow.cells[3].childNodes[0];
				if (aNrLink) aNrLink.addEventListener("click", computeTimeTrainTroops(xi, troopInfo, cCell), false);
			}
		}
	}

	function isThisTroopTrainingBuilding() {
		var retValue = false;
		var TotCropCons = 0; //crop consumption for training troops by matteo466
		var intAdd = 1 + TB3O.deltaRaceImg;
		var cValue = find("//input[@name='t1'] | //input[@name='z']", XPFirst);
		if (cValue) {
			var aValue = find("//img[starts-with(@class, 'unit')]", XPFirst);
			if (aValue) {
				//this is a barracks/stable/big barracks/big stable/workshop
				var tInProgress = find("//table[starts-with(@class, 'under')]", XPFirst);
				if (!tInProgress) {
					var aCell = find("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@width='5%']", XPFirst);
					if (aCell) tInProgress = aCell.parentNode.parentNode.parentNode;
				}
				if (tInProgress) {
					var arrTrTraining = getTroopTrainingArray(tInProgress);
					var aRow = newRow("", [["class", "tb3rhnb"]]);
					var intCols = tInProgress.rows[1].cells.length;
					var intColsA = Math.floor(intCols / 2);
					var intColsB = Math.floor(intCols / 2) + 1;
					aCell = newCell(T('TOTALTROOPSTRAINING') + " & " + gIcons["r5"], [['class', 'tb3ch'], ["colspan", intCols], ['style', 'text-align:center;']]);
					aRow.appendChild(aCell);
					tInProgress.appendChild(aRow);
					for (var i = 0; i < arrTrTraining.length; i++) {
						if (arrTrTraining[i][0] > 0) {
							if (i < 10) TotCropCons += uc[i + intAdd][9] * arrTrTraining[i][0]; else TotCropCons += 0;//calculate the total crop consumtion for troops being trained
							var bRow = newRow("", [['class', 'tb3rnb']]);
							var imgName;
							if (i < 10) {
								imgName = "src='" + gIcons["u" + (i + intAdd)] + "'";
								if (TB3O.T35 != false) imgName = 'class="unit u' + (i + intAdd) + '" src="' + xGIF + '"';
							} else {
								imgName = "src='" + gIcons["u99"] + "'";
								if (TB3O.T35 != false) imgName = 'class="unit u99" src="' + xGIF + '"';
							}
							bRow.appendChild(newCell("<img " + imgName + ">", [['class', 'tb3c']]));
							bRow.appendChild(newCell(arrTrTraining[i][1], [['class', 'tb3c'], ["colspan", intColsA]]));
							bRow.appendChild(newCell(arrTrTraining[i][0], [['class', 'tb3c'], ["colspan", intColsA], ['style', 'text-align:center;']]));
							tInProgress.appendChild(bRow);
						}
					}
					//crop consumption for training troops-matteo466
					var cRow = newRow("", [['class', 'tb3rnb']]);
					cRow.appendChild(newCell(gIcons["r5"] ,[['class', 'tb3c'], ["colspan", intColsB]]));
					cRow.appendChild(newCell(TotCropCons, [['class', 'tb3c'], ["colspan", intColsA], ['style', 'text-align:center;']]));
					tInProgress.appendChild(cRow);
				}
				processTroopsTrainingTable();
				retValue = true;
			}
		} else {
			//perhaps hero's mansion
			arrI = find("//table[@class='f10 bn']//td[@class='s7']//img[starts-with(@class, 'r')]", XPList);
			var i = 0;
			var j = 1;
			while (i < arrI.snapshotLength) {
				var aX = arrI.snapshotItem(i).parentNode;
				var aQ = aX.textContent.replace("\n", "").split("|");
				aX.setAttribute("style", 'font-size:8pt;');
				aX.setAttribute("id", "npc_tt_r_" + j);
				i += 4;
				j += 1;
			}
		}
		return retValue;
	}

	function computeTimeTrainTroops(xi, troopInfo, pNode) {
		return function() {
			var trNoInput = get("inputTroopNo_" + xi);
			if (trNoInput) {
				var totalTimeCell = get("timeToTrainTroops_" + xi);
				var totalCropCell = get("ccTrainedTroops_" + xi);
				var boolAddDiv = false;
				var intNo = trNoInput.value;
				if (intNo == '') intNo = 0; else intNo = parseInt(intNo);
				if (isNaN(intNo)) intNo = 0;
				if (!isNaN(intNo)) {
					var totalSeconds = parseInt(intNo) * troopInfo[xi][1];
					var totalConsumption = 0;
					if (troopInfo[xi][0] > 0) totalConsumption = parseInt(intNo) * uc[troopInfo[xi][0]][9];
					var timeTotal = formatTime(totalSeconds, 0);
					var aDiv = newDiv("");
					var aTb = newTable([['class', 'tb3tbnb']]);
					var iHTML1 = '';
					var iHTML2 = '';
					if (totalSeconds > 0) iHTML1 = timeTotal + " h";
					if (totalConsumption > 0) {var iHTML2 = gIcons["r5"] + " " + totalConsumption;}
					if (!totalTimeCell) {
						var aRow = newRow("", [['class', 'tb3rnb']]);
						// border-bottom:1px grey solid; color:blue;
						var aCell = newCell(iHTML1, [['class', 'tb3cnb'], ['id', 'timeToTrainTroops_' + xi], ['style', 'font-size:8pt; padding:0px;']]);
						aRow.appendChild(aCell);
						aTb.appendChild(aRow);
						boolAddDiv = true;
					} else {
						totalTimeCell.innerHTML = iHTML1;
					}
					if (!totalCropCell) {
						var bRow = newRow("", [['class', 'tn3rnb']]);
						var bCell = newCell(iHTML2, [['class', 'tb3cnb'], ['id', 'ccTrainedTroops_' + xi], ['style', 'font-size:8pt; padding:0px;']]);
						bRow.appendChild(bCell);
						aTb.appendChild(bRow);
						boolAddDiv = true;
					} else {
						totalCropCell.innerHTML = iHTML2;
					}
					if (boolAddDiv == true) {
						aDiv.appendChild(aTb);
						pNode.appendChild(aDiv);
					}

					//add the 2 bottom rows to the existing table
					var origT = get("trainingTable");
					if (origT) {
						if (!get("trbCell_0")) {
							var sRow = newRow("", [['class', 'tb3rh']]);
							var aFsize = 10;
							var intCpR = origT.rows[1].cells.length;
							var sCell = newCell(T('SUMMARY'), [['class', 'tb3ch'], ['colspan', intCpR], ['style', 'text-align:center;']]);
							sRow.appendChild(sCell);
							origT.appendChild(sRow);
							var bottomRow = newRow("", [['class', 'tb3r']]);
							var aColor = 'black';
							var iMax = intCpR;
							var intCS = 1;
							if (intCpR > 4) {iMax = intCpR - 1; intCS = 2;}
							for (i = 0; i < iMax; i++) {
								if (i == iMax - 1) aFsize = 8;
								var bCell = newCell("", [['class', 'tb3c'], ['style', 'text-align:center; font-size:' + aFsize + 'pt; color:' + aColor + ';'], ['id', 'trbCell_' + i]]);
								if (i == 0 && intCS == 2) bCell.setAttribute('colspan', intCS);
								bottomRow.appendChild(bCell);
							}
							origT.appendChild(bottomRow);
						}
						var btCell0 = get("trbCell_0");
						var btCell1 = get("trbCell_1");
						var btCell3 = get("trbCell_3");
						if (btCell0 && btCell1 && btCell3) {
							var iHTML0 = '';
							var iHTML1 = '';
							var iHTML3 = '';
							var intTotal = 0;
							var intTTotal = 0;
							var intCTotal = 0;
							for (i = 0; i < troopInfo.length; i++) {
								var inputX = get('inputTroopNo_' + i);
								if (inputX) {
									var intNo = inputX.value;
									if (intNo == '') intNo = 0; else intNo = parseInt(intNo);
									if (isNaN(intNo)) intNo = 0;
									if (i > 0) iHTML0 += " | ";
									var imgName = "src='" + gIcons["u" + troopInfo[i][0]] + "'";
									if (TB3O.T35 != false) imgName = 'class="unit u' + troopInfo[i][0] + '" src="' + xGIF + '"';
									iHTML0 += "<img " + imgName + "> " + intNo;
									intTotal += intNo;
									intTTotal += intNo * troopInfo[i][1];
									intCTotal += intNo * uc[troopInfo[i][0]][9];
								}
							}
							btCell0.innerHTML = iHTML0;
							if (intTotal > 0) iHTML1 = intTotal;
							btCell1.innerHTML = iHTML1;
							if (intTTotal > 0) iHTML3 = formatTime(intTTotal, 0) + " h <br>" + gIcons["r5"] + " " + intCTotal;
							btCell3.innerHTML = iHTML3;
						}
					}
				} else {
					if (totalTimeCell) totalTimeCell.innerHTML = "";
					if (totalCropCell) totalCropCell.innerHTML = "";
				}
			}
		}
	}

	function processCoordsInMessage(iHTML) {
		var arrCoords = iHTML.match(/\((-?\d+)\s*[\|\,\s\/]\s*(-?\d+)\)/g);
		if (arrCoords) {
			for (var j = 0; j < arrCoords.length; j++) {
				var xy = arrCoords[j].replace(" ", "").replace(",", "|").replace(";", "|").replace("/", "|").replace("\\", "|");
				if (xy.indexOf("(") == 0 && xy.indexOf(")") != -1  && xy.indexOf("|") != -1) {
					xy = xy.replace("(", "").replace(")", "");
					var xy = xy.split("|");
					var idVillage = xy2id(xy[0], xy[1]);
					var villageLink = "<a href='karte.php?z=" + idVillage + "'>" + "( " + xy[0] + "|" + xy[1] + " )" + "</a>" +
					"&nbsp;<a href='a2b.php?z=" + idVillage + "'>" + gIcons[getArrDefaultrpAction()[0]] + "</a>" +
					"&nbsp;<a href='build.php?z=" + idVillage + "&gid=17'>" + gIcons["r41"] + "</a>";
					iHTML = iHTML.replace(arrCoords[j], villageLink);
				}
			}
		}
		return iHTML;
	}

	function convertCoordsInMessagesToLinks() {
		var aCell = find("//td[@background]", XPFirst);
		if (!aCell) aCell = find("//div[@class='underline']", XPFirst);
		if (!aCell) aCell = get('message');
		if (aCell) aCell.innerHTML = processCoordsInMessage(aCell.innerHTML);
	}

	function setVillageRes(vID, vPop) {
		var infoX = getGMcookieV2("VillageRes");
		if (infoX[vID] == undefined) infoX[vID] = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
		if (vPop != -1) infoX[vID][0] = vPop;
		if (vID == aVillage.vID) {
			for (var i = 0; i < 5; i++) {infoX[vID][i + 1] = prodPerHour[i];}
		}
		if (vPop == -1) {
			for (var i = 0; i < 4; i++) {
				infoX[vID][i + 6] = crtResUnits[i];
				infoX[vID][i + 10] = capacity[i];
			}
		}
		setGMcookieV2("VillageRes", infoX[vID], vID);
	}

	function addPlayerStatistics() {
		var userTable = find("//div[@id='" + dmid2 + "']//table[@class='tbg']", XPFirst);
		if (!userTable) userTable = get("profile");
		if (userTable) {
			var iHTML = userTable.rows[0].cells[0].innerHTML;
			var aTxt = userTable.rows[0].cells[0].textContent;
			var xi = aTxt.indexOf(" ");
			var pName = aTxt.substring(xi + 1);
			var iHTML2 = iHTML.replace(pName, "");
			userTable.rows[0].cells[0].innerHTML = iHTML2 +  "<a href='" + crtPage + "'>" + pName + "</a>";
		}
		var aTb = find("//div[@id='" + dmid2 + "']//table[@class='tbg'][2]", XPFirst);
		if (!aTb) aTb = get("villages");
		if (aTb) {
			var vPop = 0;
			var totalPop = 0;
			var totalVil = aTb.rows.length - 2;
			var boolUpdate = crtPage.indexOf("spieler.php?uid=" + TB3O.crtUserID) != -1;
			totalPop = parsePlayerTable(aTb, boolUpdate);
			var csp = aTb.rows[2].cells.length - 2;
			//total row (population, villages)
			var rowTotal = newRow("", [['class', 'tb3rnb']]);
			aTb.appendChild(rowTotal);
			var aCell = newCell(T('TOTAL'), [['class', 'tb3ch']]);
			rowTotal.appendChild(aCell);
			var bCell = newCell(totalPop, [['class', 'tb3ch'], ['style', 'text-align:center;']]);
			rowTotal.appendChild(bCell);
			cCell = newCell("", [['class', 'tb3ch'], ['colspan', csp]]);
			rowTotal.appendChild(cCell);

			//average population per village
			var rowAv = newRow("", [['class', 'tb3rnb']]);
			aTb.appendChild(rowAv);
			var dCell = newCell(T('AVPOPPERVIL'), [['class', 'tb3ch']]);
			rowAv.appendChild(dCell);
			var eCell = newCell(Math.round(totalPop/totalVil), [['class', 'tb3ch'], ['style', 'text-align:center;']]);
			rowAv.appendChild(eCell);
			var fCell = newCell("", [['class', 'tb3ch'], ['colspan', csp]]);
			rowAv.appendChild(fCell);
			//move the "(capital)" string to the same line as the name of the capital
			var aSpan = find("//div[@id='" + dmid2 + "']//table[@class='tbg']//td[@class='s7']//span[@class='c']", XPFirst);
			if (!aSpan) aSpan = find("//div[@id='" + dmid2 +"']//table[@id='villages']//span", XPFirst);
			if (aSpan) {
				aSpan.style.cssFloat = '';
				aSpan.style.display = '';
				//save capital name and capital coordinates as GM "cookies"
				if (crtPage.indexOf("spieler.php?uid=" + TB3O.crtUserID) != -1) {
					var cellCap = aSpan.parentNode;
					var capitalLink = cellCap.getElementsByTagName("A")[0];
					var nameCap = capitalLink.textContent;
					var arrLink = capitalLink.href.split("=");
					cxy = id2xy(parseInt(arrLink[1]));
					var xyCap = "(" + cxy[0] + "|" + cxy[1] + ")";
					setGMcookie("capital", nameCap, false);
					setGMcookie("capitalxy", xyCap, false);
				}
			}
		}
	}

	function createTroopInfoTooltip(tt, tInfo) {
		return function() {
			var cSt0 = 'padding:2px; font-size:8pt; ';
			var cSt1 = cSt0 + 'text-align:' + docDir[0] + '; ';
			var cSt2 = cSt0 + 'text-align:' + docDir[1] + '; ';
			var cSt3 = 'border-' + docDir[1] + ':1px grey solid; ';
			var cSt4 = 'border-bottom:1px grey solid;';

			var imgSpeed = "speed" + docDir[0].substring(0,1);
			var aTb = newTable([['class', 'tb3tbnb']]);

			if (tInfo[1] != "") {
				var aRow1 = newRow("");
				var aCell1 = newCell(tInfo[1], [['style', 'text-align:center; font-size:8pt; font-weight:bold;'], ['colspan', '6']]);
				aRow1.appendChild(aCell1);
				aTb.appendChild(aRow1);
			}
			var aRow2 = newRow("");
			//attack power row
			var aCell2 = newCell(gIcons["att_all"], [['style', cSt1 + cSt4]]);
			var aCell3 = newCell(uc[tInfo[0]][5], [['style', cSt2 + cSt4 + cSt3]]);
			aRow2.appendChild(aCell2);
			aRow2.appendChild(aCell3);
			//def power infantry row
			var aCell4 = newCell(gIcons["def_i"], [['style', cSt1 + cSt4]]);
			var aCell5 = newCell(uc[tInfo[0]][6], [['style', cSt2 + cSt4 + cSt3]]);
			aRow2.appendChild(aCell4);
			aRow2.appendChild(aCell5);
			//def power cavalry row
			var aCell6 = newCell(gIcons["def_c"], [['style', cSt1 + cSt4]]);
			var aCell7 = newCell(uc[tInfo[0]][7], [['style', cSt2 + cSt4]]);
			aRow2.appendChild(aCell6);
			aRow2.appendChild(aCell7);
			aTb.appendChild(aRow2);

			var aRow3 = newRow("");
			//speed only for troops as animals do not move
			var aCell8 = newCell("<img src='" + image[imgSpeed] + "'>", [['style', cSt1]]);
			var tSpeed = "-";
			if (tInfo[0] < 31) {
				tSpeed = uc[tInfo[0]][8];
				if (crtPage.indexOf('speed') != -1) tSpeed = tSpeed * 2;
			}
			var aCell9 = newCell(tSpeed, [['style', cSt2 + cSt3]]);
			aRow3.appendChild(aCell8);
			aRow3.appendChild(aCell9);
			//can carry
			var aCell10 = newCell(gIcons["capacity"], [['style', cSt1]]);
			var aCell11 = newCell(uc[tInfo[0]][4], [['style', cSt2 + cSt3]]);
			aRow3.appendChild(aCell10);
			aRow3.appendChild(aCell11);
			//crop consumption
			var aCell12 = newCell(gIcons["r5"], [['style', cSt1]]);
			var aCell13 = newCell(uc[tInfo[0]][9], [['style', cSt2]]);
			aRow3.appendChild(aCell12);
			aRow3.appendChild(aCell13);
			aTb.appendChild(aRow3);

			tt.innerHTML = "";
			tt.appendChild(aTb);
			tt.style.display = 'block';
			tt.style.zIndex = 200;
		}
	}

	function showTroopInfoInTooltips() {
		var arrImg = document.images;
		var aTooltip = get('tb_tooltip');
		if (aTooltip == null) aTooltip = createTooltip();
		for (var i = 0; i < arrImg.length; i++) {
			var tImg = arrImg[i];
			var tInfo = getTroopIndexTitleFromImage(tImg);
			if (tInfo[0] != 0  && tInfo[0] < 51) {
				if (tInfo[0] != 0 && tInfo[1] == '') {
					//for the dorf1.php page where there is no title attribute to the image
					var xRow = tImg.parentNode;
					if (xRow) {
						if (xRow.getAttribute("href")) {
							xRow = xRow.parentNode;
							if (xRow) xRow = xRow.parentNode;
						} else xRow = xRow.parentNode;
						if (xRow) {
							try {
								var tCell = xRow.cells[2];
								if (tCell) tInfo[1] = tCell.textContent;
							} catch(e) {}
						}
					}
				}
				tImg.removeAttribute('title');
				tImg.addEventListener("mouseover", createTroopInfoTooltip(aTooltip, tInfo), 0);
				tImg.addEventListener("mouseout", function() {aTooltip.style.display = 'none';}, 0);
			}
		}
	}

	function addSelectAllCheckbox(intRows, mrTable) {
		//check for the "s10" element to avoid double checkbox from other scripts
		var sACheckbox = get("s10");
		if (!sACheckbox) {
			//selectAll
			var sAcell = mrTable.rows[intRows - 1].cells[0];
			var sAcolspan = sAcell.getAttribute("colspan");
			if (sAcolspan) {
				if (sAcolspan == "2") {
					sAcell.setAttribute('colspan', '1');
					sAcell.removeAttribute('class');
					if (TB3O.T35 == false) {
						var bCell = newCell(sAcell.innerHTML, [['style', 'text-align:' + docDir[0] + ';']]);
					} else {
						var bCell = document.createElement("TH");
						addAttr(bCell, [['class', 'buttons'], ['style', 'text-align:' + docDir[0] + ';']]);
						bCell.innerHTML = sAcell.innerHTML;
					}
					insertAfter(sAcell, bCell);
				}
			}
			sAcell.innerHTML = '<input id="s10" name="s10" onclick="Allmsg(this.form);" style="vertical-align:bottom;" type="checkbox">';
			//now append the archive button if necessary
			if (!TB3O.plusAcc) {
				var bRow = mrTable.rows[intRows - 1].cells[1];
				if (bRow) {
					var bRiHTML = bRow.innerHTML;
					if (TB3O.T35 == false) {
						if (bRiHTML.toUpperCase().indexOf("ARCHIVE") == -1) bRow.innerHTML += '<input class="std" type="submit" name="archive" value="' + T('ARCHIVE') + '"/></input>';
					} else {
						if (bRiHTML.toUpperCase().indexOf("BTN_ARCHIV") == -1) bRow.innerHTML += '&nbsp;&nbsp;<input id="btn_archiv" class="dynamic_img" type="image" alt="' + T('ARCHIVE') + '" src="' + xGIF + '" name="archive" value="' + T('ARCHIVE') + '"/></input>';
					}
				}
			}
		}
	}

	function createDelRepTable(aLinks) {
		var cSt = 'text-align:center;';
		var delTable = newTable([['id', 'del_table'], ['class', 'tb3tb']]);
		var intMax = aLinks.length;
		if (intMax > 5) intMax = 5;
		var tRow = newRow("", [['class', 'tb3rh']]);
		var tCell = newCell(T('ELIMINAR'), [['colspan', intMax], ['class', 'tb3chbb'], ['style', cSt]]);
		tRow.appendChild(tCell);
		var bRow = newRow("", [['class', 'tb3rh']]);
		var cRow = newRow("");
		var crtLink = crtPage;
		for (var i = 0; i < intMax; i++) {
			var bTitle = aLinks[i].firstChild.nodeValue;
			var bCell = newCell(bTitle, [['class', 'tb3chb'], ['style', cSt]]);
			bRow.appendChild(bCell);
			cTitle = T('MTCLEARALL') + " (" + bTitle  + ")";
			var xImg = newImage([['src', image["buttonDel"]], ['title', bTitle]]);
			var cLink = newLink("", [['href', jsVoid]]);
			cLink.appendChild(xImg);
			cLink.addEventListener('click', delete10Reports(i, aLinks), false);
			var cCell = newCell("", [['class', 'tb3c'], ['style', cSt]]);
			cCell.appendChild(cLink);
			cRow.appendChild(cCell);
		}
		delTable.appendChild(tRow);
		delTable.appendChild(bRow);
		delTable.appendChild(cRow);
		return delTable;
	}

	function delete10Reports(xi, aLinks) {
		return function() {
			var aLink = aLinks[xi].href;
			var crtLink = crtPage;
			setGMcookie("reportsPageToDelete", aLink, false);
			setGMcookie("reportsPageToReturnTo", crtLink, false);
			setGMcookie("reportsDeleteAll", "1", false);
			location.href = aLink;
		}
	}

	function MessageOptions(){
		if (crtPage.indexOf("nachrichten.php") != -1) {
			var genLink = "nachrichten.php?s=";
			var archLink = ' | <a href="nachrichten.php?t=3">' + T('ARCHIVE') + '</a>';

			//code provided by rtellezi for enabling sending message by pressing the CTRL+ENTER keys.
			//modified by ms99 to apply only to the "igm" textarea
			if (document.evaluate) {
				var arrInp = find("//textarea[@id='igm']", XPList);
				for (var i = 0; i < arrInp.snapshotLength; i++) {
					var t = arrInp.snapshotItem(i);
					t.addEventListener("keydown", sendMessage, 0);
				}
			}
		} else if (crtPage.indexOf("berichte.php") != -1) {
			var genLink = "berichte.php?s=";
			var archLink = ' | <a href="berichte.php?t=5">' + T('ARCHIVE') + '</a>';
		}

		if (get("adressbuch") || get("adbook")) return;
		var topMenu = find("//p[@class='txt_menue']", XPFirst);
		if (!topMenu) topMenu = get('textmenu');

		if (document.evaluate) {
			var arrInp = find("//textarea[@id='igm']", XPList);
			for (var i = 0; i < arrInp.snapshotLength; i++) {
				var t = arrInp.snapshotItem(i);
				t.addEventListener("keydown", sendMessage, 0);
			}
			var navLinks = find("//div[@id='" + dmid2 + "']//a[contains(@href, 'berichte.php?s=')]", XPList);
			if (navLinks.snapshotLength == 0) navLinks = find("//div[@id='" + dmid2 + "']//a[contains(@href, 'nachrichten.php?s=')]", XPList);
			if (navLinks.snapshotLength > 0) document.addEventListener("keydown", navToPage, 0);
		}

		//add the Archive option to the menu if PLUS not available and if the Archive link is not already present (added by other scripts)
		if (!TB3O.plusAcc) {
			if (topMenu) {
				var tMiHTML = topMenu.innerHTML.split("|");
				var bAddArchL = false;
				if (genLink.indexOf("nachrichten.php") != -1 && tMiHTML.length < 4) bAddArchL = true;
				if (genLink.indexOf("berichte.php") != -1 && tMiHTML.length < 6) bAddArchL = true;
				if (bAddArchL == true) topMenu.innerHTML += archLink;
			}
		}

		if (crtPage.indexOf("berichte.php") != -1 && crtPage.indexOf("&id=") == -1 && topMenu) {
			var arrMLinks = find("//p[@class='txt_menue']//a", XPList);
			if (arrMLinks.snapshotLength == 0) arrMLinks = find("//div[@id='textmenu']//a", XPList);
			var bRepDelTable = getGMcookie("showrepdeltable", false);
			if (bRepDelTable != "0") {
				setGMcookie("showrepdeltable", '1', false);
				var aLinks = new Array();
				for (var i = 0; i < arrMLinks.snapshotLength; i++) {
					aLinks[i] = arrMLinks.snapshotItem(i);
				}
				var delTable = createDelRepTable(aLinks);
				var lastDiv = get(dmid2);
				if (lastDiv) {
					var newPar = elem("P", "");
					insertAfter(lastDiv.lastChild, newPar);
					newPar.appendChild(delTable);
				}
			}
		}

		if (crtPage.indexOf("?newdid=") != -1 && crtPage.indexOf("&id=") != -1) return;

		//general variables needed for this function
		var mrTable;
		if (TB3O.T35 == false) {
			mrTable = find("//table[@class='tbg']", XPFirst);
		} else {
			mrTable = find("//table[@class='reports std']", XPFirst);
			if (!mrTable) mrTable = find("//table[@class='tbg']", XPFirst);
			if (!mrTable) mrTable = get("overview");
		}
		var intRows = mrTable.rows.length;
		mrTable.id = "overview";
		addSelectAllCheckbox(intRows, mrTable);

		deleteReports();

		//get the number of pages to preload from server
		var mrpC = getGMcookie("mesreppreload", false);
		if (mrpC == "false") {
			intMRP = 0;
			setGMcookie("mesreppreload", 0, false);
		} else {
			intMRP = parseInt(mrpC) + 1;
			if (intMRP > 5) {
				intMRP = 4;
				setGMcookie("mesreppreload", 4, false);
			}
		}
		var pageNo1 = crtPage.indexOf("?s=");
		var intPage = 0;
		if (pageNo1 != -1) {
			var pageNoS1 = crtPage.substring(pageNo1 + 3);
			intPage = Math.round(parseInt(pageNoS1) / 10);
		}
		if (intMRP > 1) {
			for (var i = 1; i < intMRP; i++) {
				setTimeout(createMrPreloadFunc(i + intPage), getRndTime(i * 498));
			}
			var X2 = (intMRP + intPage) * 10;
			var X1 = (intPage - intMRP) * 10;

			var intPgType = crtPage.indexOf("t=");
			var addLink = "";
			if (intPgType != -1) addLink = "&" + crtPage.substr(intPgType,3);

			var backLink = genLink + X1 + addLink;
			var forwardLink = genLink + X2 + addLink;

			var tdbfLinks = mrTable.rows[mrTable.rows.length - 1].cells[2];
			if (tdbfLinks) {
				var aSpan;
				if (X1 < 0) {
					aSpan = elem("SPAN", "«");
					addAttr(aSpan, [['class', 'c'], ["style", "font-weight:bold;"]]);
				} else aSpan = newLink("« ", [['style', 'font-weigth:bold'], ['href', backLink]]);
				var fwLink = newLink("»&nbsp;", [['style', 'font-weight:bold'], ['href', forwardLink]]);
				tdbfLinks.innerHTML = "";
				tdbfLinks.appendChild(aSpan);
				tdbfLinks.appendChild(fwLink);
			}
		}

		//code provided by rtellezi for sending message by pressing CTRL+ENTER
		//modified by ms99 to work only on the form  action='nachrichten.php' and form name='msg'
		function sendMessage(event) {
			if (event.keyCode == 13 && event.ctrlKey) {
				var aForm = find("//form[@name='msg']", XPFirst);
				if (aForm) aForm.submit();
			}
			return;
		}

		function navToPage(event) {
			var evCode = event.keyCode;
			if (evCode == 37) {
				for (var i = 0; i < navLinks.snapshotLength; i++) {
					if (navLinks.snapshotItem(i).textContent == "«") {location.href = navLinks.snapshotItem(i).href; break;}
				}
			} else if (evCode == 39) {
				for (var i = 0; i < navLinks.snapshotLength; i++) {
					if (navLinks.snapshotItem(i).textContent == "»") {location.href = navLinks.snapshotItem(i).href; break;}
				}
			}
			return;
		}

		function createMrPreloadFunc(page) {
			var intPgType = crtPage.indexOf("t=");
			var addLink = "";
			if (intPgType != -1) addLink = "&" + crtPage.substr(intPgType,3);
			return function() {ajaxRequest(genLink + (page * 10) + addLink, "GET", null, processMrPage, dummy);}
		}

		function processMrPage(t) {
			var ans = newDiv(t.responseText);
			var ansdoc = document.implementation.createDocument("", "", null);
			ansdoc.appendChild(ans);

			var aTb = ansdoc.evaluate("//table[@class='tbg']", ans, null, XPFirst, null).singleNodeValue;
			if (!aTb) aTb = ansdoc.evaluate("//table[@class='reports std']", ans, null, XPFirst, null).singleNodeValue;
			if (!aTb) aTb = ansdoc.evaluate("//table[@id='overview']", ans, null, XPFirst, null).singleNodeValue;

			if (aTb) {
				var maxRows = aTb.rows.length;
				var mrTable = get("overview");
				var lastRow = mrTable.rows[mrTable.rows.length - 1];

				removeElement(lastRow);
				if (maxRows > 3) {
					for (var xi = 1; xi < maxRows - 1; xi++) {
						var aRow = aTb.rows[xi];
						var xRow = newRow("");
						var intNoOfCells = aRow.cells.length;
						if (intNoOfCells > 1) {
							for (var yi = 0; yi < intNoOfCells; yi++) {
								var xCell = newCell(aRow.cells[yi].innerHTML);
								if (TB3O.T35 == true) xCell.setAttribute('style', 'border:1px solid silver;');
								var iHTML = xCell.innerHTML;
								if (iHTML.indexOf("spieler.php") != -1) {
									var aNode = xCell.childNodes[0];
									xCell.className = 'topic';
									if (aNode.href.search(/spieler.php\?uid=(\d+$)/) > 0) {
										var uid = RegExp.$1;
										insertUserLinks(aNode, uid, aNode.textContent);
									}
								}
								if (TB3O.bMO == "1") {
									if (iHTML.indexOf("nachrichten.php?id=") != -1 || iHTML.indexOf("berichte.php?id=") != -1) {
										var aNode = xCell.childNodes[0];
										addReadMesRepInPopup(aNode);
									}
								}
								if (yi == 1) {
									xCell.setAttribute('style', 'text-align:' + docDir[0] + ';');
									if (TB3O.TB35 == false) xCell.setAttribute('class', 's7');
								}
								xRow.appendChild(xCell);
							}
							mrTable.appendChild(xRow);
						}
					}
				} else {
				}
				mrTable.appendChild(lastRow);
			}
		}
	}

	function pauseScript(ms) {
		var ms1 = getRndTime(ms);
		var aDate = new Date();
		var crtDate = new Date();
		do {crtDate = new Date();}
		while (crtDate - aDate < ms1);
	}

	function deleteReports() {
		var boolDeleteReports = getGMcookie("reportsDeleteAll", false);
		if (boolDeleteReports != '1') return;
		var pageToDeleteReportsFrom = getGMcookie("reportsPageToDelete", false);
		if (pageToDeleteReportsFrom == '') return;
		if (crtPage.indexOf("berichte.php") != -1) {
			pauseScript(500);
			var allCB = find("//input[@type='checkbox' and not (@id)]", XPList);
			var selectAllCB = document.getElementsByName("s10");
			var delButton = document.getElementsByName("del");
			if (!delButton) delButton = get("btn_delete");
			if (allCB.snapshotLength > 0 && selectAllCB && delButton) {
				//now delete the reports without checking the correct address of the reports page
				selectAllCB[0].click();
				pauseScript(500);
				delButton[0].click();
			} else {
				setGMcookie("reportsDeleteAll", "0", false);
				setGMcookie("reportsPageToDelete", '', false);
			}
		} else {
			setGMcookie("reportsDeleteAll", "0", false);
			setGMcookie("reportsPageToDelete", '', false);
		}
	}

	function toNumber(aValue) {
		return parseInt(aValue.replace(",", "").replace(",", "").replace(".", "").replace(".", "").replace(" ", "").replace(" ", "").replace("&nbsp;", "").replace("&nbsp", ""));
	}

	function getMerchantsInformation() {
		//get the current capacity of the merchants for this village
		var mCc = getGMcookieV2("merchantscapacity");
		if (mCc && mCc[aVillage.vID]) merchantsCapacity = mCc[aVillage.vID];
		xLang['MERCHANTS'] = getGMcookie("merchantsName", false);
		if (xLang['MERCHANTS'] == "false") xLang['MERCHANTS'] = '';
	}

	function getStatisticsMenu() {
		var statArray = new Array();
		var tM = find("//p[@class='txt_menue']//a", XPList);
		var intCounter = 0;
		if (tM.snapshotLength == 0) tM = find("//div[@id='" + dmid2 + "']//p//a", XPList);
		if (tM.snapshotLength == 0) tM = find("//div[@id='" + dmid2 + "']//div[@id='textmenu']//a", XPList);
		if (tM) {
			for (var xi = 0; xi < tM.snapshotLength; xi++) {
				statArray[0] = tM.snapshotItem(xi).text;
				var aLink = tM.snapshotItem(xi).href;
				statArray[1] = aLink.substring(aLink.lastIndexOf("/"));
				var aX = statArray[1].split("=");
				if (aX.length > 1) intCounter = parseInt(aX[1]); else intCounter = 1;
				setGMcookieV2('statistics', statArray, intCounter);
			}
		}
		tM = find("//div[@class='sub']//a", XPList);
		if (tM.snapshotLength == 0) tM = find("//div[@id='submenu']//a", XPList);
		if (tM) {
			for (var i = 0; i < tM.snapshotLength; i++) {
				statArray[0] = tM.snapshotItem(i).title;
				var aLink = tM.snapshotItem(i).href;
				statArray[1] = aLink.substring(aLink.lastIndexOf("/"));
				var intCounter = parseInt(statArray[1].split("=")[1]);
				setGMcookieV2('statistics', statArray, intCounter);
			}
		}
	}

	function showSearchBar() {
		if (TB3O.boolShowSearchBar != "1") return;

		var sbc = getGMcookieV2('statistics');
		if (!sbc || !sbc[1]) return;

		var aForm = createSearchForm(sbc);
		if (TB3O.boolFloatSearchBar != '1') {
			get(dlright1).insertBefore(aForm, get(dlright1).firstChild);
		} else {
			var crtState = getGMcookie("showsearchbar_state", false);
			if (crtState == "min" && TB3O.boolFloatSearchBar == '1' ) aForm.style.display = 'none';
			var xyC = getGMcookie("searchbarXY", false);
			if (xyC == "false") {xyC = defPosFloatDiv; setGMcookie("searchbarXY", xyC, false);}
			var xy = xyC.split("|");
			var div = createFloatingDiv(300, xy[0], xy[1], T('ID_SEARCH'), "showsearchbar", "showsearchbar_tooltip", true);
			TB3O.nodeToAppendSb = div;
			TB3O.nodeToAppendSb.appendChild(aForm);
		}
	}

	function createSearchForm(sbc) {
		var sboptc = getGMcookieV2('searchopt');
		var searchopt = 1;
		if (sboptc && sboptc['all']) searchopt = sboptc['all']; else setGMcookieV2('searchopt', searchopt, 'all');
		var aForm = document.createElement("FORM");
		aForm.action = 'statistiken.php?id=' + searchopt;
		aForm.method = 'POST';
		aForm.setAttribute('style', 'padding:10px; border:1px solid #C0C0C0;');
		aForm.id = 'searchform';
		var aPar = elem("P", "");
		aPar.setAttribute('style', 'margin-top:20px;');

		var i1 = elem("INPUT", "");
		i1.type = 'hidden';
		i1.id = "searchopt";
		i1.value = searchopt;

		var i2 = elem("INPUT", "");
		i2.type = 'text';
		i2.maxlength = '20';
		i2.size = '10';
		i2.value = '';
		if (TB3O.M35 == 1) {
			i2.name = 'name';
			i2.className = "spieler fm";
		} else if (TB3O.M35 == 2) {
			i2.name = 'name';
			i2.className = 'text name';
		} else if (TB3O.T35 == false) {
			i2.name = 'spieler';
			i2.className = 'fm f80';
		}
		i2.setAttribute('style', 'font-size:8pt; margin:2px;');

		var s1 = elem("SELECT", "");
		s1.id = 'searchtype';
		s1.setAttribute('style', 'font-size:8pt; margin:2px;');
		s1.options[0] = new Option(sbc[1][0], 1, false, isSearchSelected(1000, searchopt));
		s1.options[1] = new Option(sbc[2][0], 2, false, isSearchSelected(2, searchopt));
		s1.options[2] = new Option(sbc[4][0], 4, false, isSearchSelected(4, searchopt));
		s1.options[3] = new Option(sbc[31][0], 31, false, isSearchSelected(31, searchopt));
		s1.options[4] = new Option(sbc[32][0], 32, false, isSearchSelected(32, searchopt));
		if (TB3O.T35 != false && sbc[8]) s1.options[5] = new Option(sbc[8][0], 8, false, isSearchSelected(8, searchopt));
		s1.addEventListener('change', setSearchBarOption, false);

		var i3 = elem("INPUT", "");
		addAttr(i3, [['type', 'submit'], ['name', 'submit'], ['value', T('ID_SEARCH')], ['style', 'font-size:8pt']]);

		if (TB3O.boolFloatSearchBar == '1') aForm.appendChild(aPar); else aForm.style.width = "200px";
		aForm.appendChild(i1);
		aForm.appendChild(i2);
		aForm.appendChild(s1);
		aForm.appendChild(i3);

		return aForm;

		function isSearchSelected(opt, searchopt) {return (opt == searchopt) ? true : false;}

		function setSearchBarOption() {
			var searchType = get("searchtype").value;
			setGMcookieV2('searchopt', searchType, 'all');
			var i1 = get("searchopt");
			if (i1) i1.value = searchType;
			var aForm = get("searchform");
			if (aForm && TB3O.T35 == true) aForm.action = 'statistiken.php?id=' + searchType;
		}

	}

	function composeGMcookieName(aName) {return TB3O.gServer + '_' + TB3O.crtUserID + '_' + aName;}

	function getGMcookieV2(aName) {
		var nC = composeGMcookieName(aName);
		var gmcookie = eval(GM_getValue(nC, '({})'));
		return gmcookie;
	}

	function setGMcookieV2(aName, aValue, newdid) {
		if (newdid == 0) return;
		var nC = composeGMcookieName(aName);
		var cV = getGMcookieV2(aName);
		if (cV == 'false' | cV == false) cV = {};
		cV[newdid] = aValue;
		if (aValue) GM_setValue(nC, uneval(cV)); else GM_setValue(nC, false);
	}

	function getArrBiP() {
		var divName = "lbau1";
		var arrBiP = new Array();
		var retVal = null;
		var dlB = get(divName);
		if (!dlB) {divName = "lbau2"; dlB = get(divName);}
		if (!dlB) {divName = "building_contract"; dlB = get(divName);}
		if (!dlB) {divName = "building_contract2"; dlB = get(divName);}
		if (dlB) {
			var BiPtb = find("//div[@id='" + divName + "']//table", XPFirst);
			if (!BiPtb) BiPtb = find("//div[@id='" + dmid1 + "']//table[@id='" + divName + "']", XPFirst);
			for (xi = 0; xi < BiPtb.rows.length; xi++) {
				if (BiPtb.rows[xi].cells.length > 1)	{
					var tdD = BiPtb.rows[xi].cells[2];
					var tdDS = tdD.getElementsByTagName("SPAN")[0];
					var dEnd = new Date();
					dEnd.setTime(dEnd.getTime() + toSeconds(tdDS.textContent) * 1000);
					arrBiP[arrBiP.length] = new xBiP(BiPtb.rows[xi].cells[1].textContent.split(" ("), dEnd.getTime());
				}
			}
			retVal = arrBiP;
		}
		setGMcookieV2('BiP', arrBiP, aVillage.vNewdid);
		return retVal;
	}

	//© Copyright 2007 Richard Laffers (http://userscripts.org/scripts/show/35277)
	//Start of Drag-n-drop
	var mouseOffset = null;
	var iMouseDown = false;
	var lMouseState = false;
	var dragObject = null;
	var curTarget = null;

	function mouseCoords(ev) {return {x:ev.pageX, y:ev.pageY};}

	function getMouseOffset(target, ev){
		var docPos = getPosition(target);
		var mousePos = mouseCoords(ev);
		return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
	}

	function getPosition(e) {
		var left = 0;
		var top = 0;
		var right = 0;
		while (e.offsetParent){
			left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
			top += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
			e = e.offsetParent;
		}
		left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		return {x:left, y:top};
	}

	function mouseMove(ev) {
		var target = ev.target;
		var mousePos = mouseCoords(ev);
		if (dragObject) {
			oldStylePosition = dragObject.style.position;
			dragObject.style.position = 'absolute';
			dragObject.style.top = (mousePos.y - mouseOffset.y) +'px';
			dragObject.style.left = (mousePos.x - mouseOffset.x) +'px';
			dragObject.style.position = oldStylePosition;
		}
		lMouseState = iMouseDown;
		return false;
	}

	function mouseUp(ev){
		if (dragObject) {
			var dOx = dragObject.style.left;
			var dOy = dragObject.style.top;
			var strXY = dOx + "|" + dOy;
			switch (dragObject.id) {
				case "showresbartable_tooltip": setGMcookie("resbarXY", strXY, false); break;
				case "showbookmarks_tooltip": setGMcookie("userBookmarksXY", strXY, false); break;
				case "noteblock_tooltip": setGMcookie("noteblockXY", strXY, false); break;
				case "showvl2table_tooltip": setGMcookie('vList2XY', strXY, false); break;
				case "showsearchbar_tooltip": setGMcookie('searchbarXY', strXY, false); break;
			}
		}
		dragObject = null;
		iMouseDown = false;
	}

	function mouseDown(ev){
		var target = ev.target;
		iMouseDown = true;
		if (target.getAttribute('DragObj')){ return false;}
	}

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
	}
	//End of Drag-n-drop

	//General actions
	getGeneralData();
	if (crtPage.match(/statistiken.php/)) getStatisticsMenu();
	if (!crtPage.match(/karte2.php/)) {
		hideAd();
		hLToJsVoid();
		showBigIconsBar();
		showDeleteAccount();
		leftMenuLinks();
		getRace();
		addFillTimeRow();
		getCrtLocation();
		prepareDivDocking();
		villageList();
		show2ndVillageList();
		showResBarTooltip();
		showUserBookmarks();
		showNoteBlock();
		showHeroStatus();
	}
	//Actions to be performed only on specific pages
	TB3O.boolIsThisNPC = isThisNPC();
	TB3O.boolIsNPCExluded = isThisNPCexcluded();
	if (TB3O.boolIsThisNPC == true) fillOutNPCfields(urlNow);
	if (crtPage.match(/allianz.php/)) allyCalculation();
	if (crtPage.match(/karte.php\?/) && crtPage.match(/d=/)) addTroopTimes();
	if (crtPage.match(/build.php/))	{
		boolIsTroopsTrainingBuilding = isThisTroopTrainingBuilding();
		TimeToExplore();
		timeToTrainMilitaryUnits();
		quickCity();
		getMerchantsInformation();
		if (isMarketSend() == true) marketSend();
		marketSell();
	}
	if (crtPage.match(/build.php\?(.*)&t=1/)) {
		addAllyColumnForMarketOffers();
		marketBuy();
	}
	if (crtPage.match(/dorf1/)) {
		processDorf1();
		addAttDefInfoTable1();
	}
	if (crtPage.match(/a2b\.php($|\?newdid=|\?z=)/)) selectAllTroops();//Send troops page
	if (crtPage.match(/dorf2/) || crtPage.match(/build.php\?newdid=/)) processDorf2();
	if (crtPage.match(/a2b.php/)) {
		quickCity();
		defaultAttackType();
	}
	if (crtPage.match(/dorf3.php($|\?newdid=(\d+)$)/) || crtPage.match(/dorf3.php/)) processDorf3();
	if (crtPage.match(/build.php\?(.*)&s=2/)) culturePoints();
	if ((crtPage.match(/karte.php($|\?z=|\?new)/) && crtPage.match(/d=/)) || crtPage.match(/karte.php($|\?newdid=(\d+)$)/)) mapFunctions();
	if (crtPage.match(/gid=16/) || crtPage.match(/\?id=39/)) tableTotalVillageTroopsV3();
	if (crtPage.match(/nachrichten.php($|\?t=|\?s=|\?newdid=)/) || crtPage.match(/berichte.php($|\?t=|\?s=|\?newdid=)/)) MessageOptions();
	if (crtPage.match(/nachrichten.php\?/)) convertCoordsInMessagesToLinks();
	if (crtPage.match(/berichte.php\?/)) battleReportV2("orig");
	if (crtPage.match(/spieler.php\?/) && crtPage.match(/uid/)) addPlayerStatistics();
	if (crtPage.match(/spieler.php/) && !crtPage.match(/\?/) && vList.length < 2) getSingleTown(); //to capture the change of the singleTown name while in the Profile
	if (TB3O.boolIsNPCExluded == false) NPCUpdate();
	if (boolIsThisPostNPC()) insertNPCHistoryLink();

	//General actions  continued
	if (getGMcookie("starttimers", false) == "false") setTimers();
	if (TB3O.boolShowTroopInfoTooltips == "1") showTroopInfoInTooltips();
	showSearchBar();
	playerLinks(dmid2);
	playerLinks("llist");
	showTBTotalRuntime();
};

if (window.addEventListener) {
	window.addEventListener('load', functionMain, false);
	document.body.setAttribute("onbeforeunload", '{xLang = null; bCost = null; uc = null; image = null; TB3O = null; }');

} else {
	window.attachEvent('onload', functionMain);
}
