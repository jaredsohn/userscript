// ==UserScript==
// @name Travian3 Beyond - ID
// @author Victor Garcia (aka Croc), Szabka, Lux, Nux, ms99
// @namespace T3
// @version 3.5.7.1
// @description  (v 3.5.7.1 Travian v3 addons originally by Victor Garcia (aka Croc); -  updated by CuPliz13-28.December2008
// @source http://userscripts.org/scripts/show/39384
// @identifier http://userscripts.org/scripts/show/39384.user.js
// @include http://*.travian*.*/*.php*
// @exclude http://*.travian*.*/hilfe.php*
// @exclude http://*.travian*.*/log*.php*
// @exclude http://*.travian*.*/index.php*
// @exclude http://*.travian*.*/anleitung.php*
// @exclude http://*.travian*.*/impressum.php*
// @exclude http://*.travian*.*/anmelden.php*
// @exclude http://*.travian*.*/gutscheine.php*
// @exclude http://*.travian*.*/spielregeln.php*
// @exclude http://*.travian*.*/links.php*
// @exclude http://*.travian*.*/geschichte.php*
// @exclude http://*.travian*.*/tutorial.php*
// @exclude http://*.travian*.*/manual.php*
// @exclude http://*.travian*.*/ajax.php*
// @exclude http://*.travian*.*/ad/*
// @exclude http://*.travian*.*/chat/*
// @exclude http://forum.travian*.*
// @exclude http://board.travian*.*
// @exclude http://shop.travian*.*
// @exclude http://*.travian*.*/activate.php*
// @exclude http://*.travian*.*/support.php*
// @exclude  http://help.travian*.*/*log
// @exclude *.css
// @exclude *.js
// ==/UserScript==

//Travian3 Beyond - ML&CN (multilanguage & center numbers)

/*
* The original script from Victor Garcia (aka Croc) is licensed under the
* Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Spain License.
* To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/es/
*
* The updated script from ms99 is licensed under the
* Creative Commons Attribution-Noncommercial-Share Alike 3.0 Germany License
* To view a copy of this license, please visit http://creativecommons.org/licenses/by-nc-sa/3.0/de/
*
* An English translation of the "Creative Commons Attribution-Noncomercial-Share Alike 3.0 License"
* can be found here http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en
*
* © Copyright ms99, 2008-2009
*
* Portions of this script © Copyright 2008 Nux
* Portions of this script (Setup bevavior) © Copyright 2008 Lux
* Portions of this script (Update script & Drag n drop library) © Copyright 2007 Richard Laffers
*
* All rights to most images embedded in this script belong to Travian Games Gmbh  (http://www.traviangames.com/ and http://www.travian.com).
* All rights to additional images embedded in this script belong to their respective creators or to ms99, Nux, Lux, DMaster, fr3nchlover
*
* Parts of this code are provided (or based on code written) by others
* RELEVANT CONTRIBUTIONS TO THIS SCRIPT (listed in alphabetical order).  THANK YOU !!!
*	BmW for the great ideas, comments, screenshots, testing and continuous help !
*	Brains for his ideas, comments, icons and help !
*	DMaster for the great ideas, comments. pictures, testing, screenshots and help !
*	Dream1 for his ideas, comments, screenshots, translation and help !
*	ezGertie for his ideas, comments, screenshots and help !
*	friedturnip for the "alt" tags for images !
*	fr3nchlover for testing, translation, ideas, code and bug fixes provided !
*	Lux for the new behavior of the "Travian Beyond Setup" !
*	MarioCheng for great ideas, comments, fixes, code, translation and help !
*	phob0z for his ideas, comments, translation and code !
*	rtellezi for the function that allows to send an IGM via <CTRL>+<ENTER> keystroke !
*	Rypi for his help and trust and translation !
*	someweirdnobody for the amazing "Select all troops" function !
*	vampiricdust/fr3nchlover for fixing the villages2cp function  !
*	yabash for ideas, translations, comments, icons and help !
*	Zippo for the global/local options of the saved offers, support, translation, patience and help !
*
* Please have understanding if I've forgotten somebody with a relevant contribution to this script.  Please send a message to the address specified on the page of the script, for credits.
*
* Other contributors' (nick)names are provided in the header of (or inside) the functions.
* Special thanks to all contributors and translators of this script !
 */

// Main function executed when the whole page is loaded
function functionMain(e) {

	// Time when the script initiates on the current page
	var TBeyondRunTime = new Array(1);
	TBeyondRunTime[0] = new Date().getTime();

	var SCRIPT = {
		url: 'http://userscripts.org/scripts/show/39384.user.js',
		version: '3.5.7',
		name: ':D',
		presentationurl: 'http://userscripts.org/scripts/show/39384'
	};

	var versionText = SCRIPT.version + " - " + SCRIPT.name;

	var boolShowNoteBlock;
	var boolShowCenterNumbers;
	var boolShowDistTimes;
	var boolShowStatLinks;
	var boolIsAvailableBarracks = false;
	var boolShowBuildColorCodes;
	var boolShowResColorCodes;
	var boolShowCellTypeInfo;
	var boolShowMenuSection3;
	var boolShowTravmapLinks;
	var boolShowBigIconAlliance;
	var boolShowCenterMapIcon;
	//var boolIsAvailableTownHall = "0";
	var boolShowTroopInfoTooltips;
	var boolOldServerVersion;
	//var boolshowRPrInfoTooltips = "0";
	//var boolShowInOutIcons = "0";
	//var boolShowMesOpenLinks = "0";
	var villageName = "";
	var merchantsCapacity;
	var merchantsName;
	var localGraphicPack = "";
	var docDirection;
	var invDocDirection;
	var wsServerName;
	var wsURLStart = new Array();
	wsURLStart["0"]	= "http://www.travian.ws/analyser.pl?s=";
	wsURLStart["1"]	= "http://travian-utils.com/?s=";
	//wsURLCropFinderLink = "&u=2";
	var wsURLCropFinderLinkV2 = "http://crop-finder.com/";
	var crtUserName;
	var crtUserID;
	var urlNow = window.location.pathname + window.location.search;
	var windowheight = window.innerHeight;
	var windowwidth = window.innerWidth;
	var villageID = "";
	var xCoord, yCoord;
	var crtUserRace = "";
	var xActive = "";
	var yActive = "";
	var detectedLanguage = "en";
	var warsimExtLink = "http://kirilloid.ru/travian/warsim.php";
	var warsimIntLink = "warsim.php";
	var newdidActive;
	var fullServerName;
	var jsVoid = 'javaScript:void(0)';
	
	var LOG_LEVEL = 0;

	var currentResUnits = new Array(4);		// Current resource units
	var capacity = new Array(4);			// Capacity of the warehouse/granary
	var productionPerHour = new Array(4); 	//production per hour for the four resource types

	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;		// Constante que devuelve el primer elemento por XPath
	var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;		// Constante que devuelve una lista de elementos por XPath
	var XPIterate  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;		// Constante que deuvelve un iterador de elementos por XPath

	//css Style declarations
    //general
    var cssStyle = "";
	cssStyle += "#resumen {position:relative; width:900px;}";
    cssStyle += "#tabla_mapa {position: relative; width:900px; margin-top:16px;}";
    cssStyle += ".bttable {width:100%; height:129px;}";
    cssStyle += ".dcol {color:#A0A0A0;}";
	// NEW TABLE STYLE for the Total village troops table (initially),  Used also for market arriving merchants resume. Provided by david.macej.  Thank you !
    cssStyle += "table.tbg tr.cbgx td, td.cbgx {background-color:#FFFFC0;}";

    GM_addStyle(cssStyle);

	//------------------------------------------
	//Modified by Lux
	//------------------------------------------
	var cssStyleSetup =	".MsgPageOff {visibility: hidden; display: none; position: absolute; top: -100px; left: -100px;}" +
				".OuterMsgPageOn {position: absolute; top: 0px; left: 0px; visibility: visible; width: 150%; height: 200%; background-color: #000; z-index: 1998; opacity:0.75;}"+
				".InnerMsgPageOn {position: absolute;  left:25%; top:2.8%; visibility: visible; opacity:1; z-index: 1999;}"+
				".divCloseMsgPageOn {position: absolute;  left:73.5%; top:0.2%; visibility: visible; opacity:1; z-index: 2000;}";
	GM_addStyle(cssStyleSetup);
	//------------------------------------------

	//NPC Assistant
	var cssNPCStyle = "";
	cssNPCStyle += ".npc-general {margin:3px 0 0; font-size:10px}";
	cssNPCStyle += ".npc-red {color: #DD0000}";
	cssNPCStyle += ".npc-green {color: #009900}";
	cssNPCStyle += ".npc-highlight {color: #009900; background-color: #FFFFCC}";
	GM_addStyle(cssNPCStyle);

	var NPCResources = 'npcResources';
	var NPCbacklinkName = 'npcBacklinkName';
	var NPCURL = '/build.php?gid=17&t=3';

	//resource level & center numbers
	var CN_COLOR_TEXT = '#000000';
	var CN_COLOR_NEUTRAL = '#FDF8C1';
	var CN_COLOR_MAX_LEVEL = '#7DFF7D';
	var CN_COLOR_NO_UPGRADE = '#FF9696';
	var CN_COLOR_UPGRADABLE_VIA_NPC = '#FFC84B';

	var cssResDiv = "#resDiv{position:absolute; top:69px; left:12px; z-index:20;}";
	GM_addStyle(cssResDiv);

	//center numbers
	var cssCNStyle = "";
	cssCNStyle += ".CNbuildingtags{background-color:" + CN_COLOR_NEUTRAL + "; border:thin solid #000000; -moz-border-radius: 2em; padding-top: 3px; font-family: Arial, Helvetica, Verdana, sans-serif; font-size:9pt; font-weight:bold; color:" + CN_COLOR_TEXT + "; text-align:center; position:absolute; width:21px; height:18px; cursor:pointer; visibility:hidden; z-index:26;}";
	GM_addStyle(cssCNStyle);

	var gidToName = new Array();
    gidToName[1] = 'lumber';
    gidToName[2] = 'clay';
    gidToName[3] = 'iron';
    gidToName[4] = 'crop';
    gidToName[5] = 'sawmill';
    gidToName[6] = 'brickyard';
    gidToName[7] = 'ironFoundry';
    gidToName[8] = 'grainMill';
    gidToName[9] = 'bakery';
    gidToName[10] = 'warehouse';
    gidToName[11] = 'granary';
    gidToName[12] = 'blacksmith';
    gidToName[13] = 'armoury';
    gidToName[14] = 'tournamentSquare';
    gidToName[15] = 'mainBuilding';
    gidToName[16] = 'rallyPoint';
    gidToName[17] = 'marketplace';
    gidToName[18] = 'embassy';
    gidToName[19] = 'barracks';
    gidToName[20] = 'stable';
    gidToName[21] = 'workshop';
    gidToName[22] = 'academy';
    gidToName[23] = 'cranny';
    gidToName[24] = 'townhall';
    gidToName[25] = 'residence';
    gidToName[26] = 'palace';
    gidToName[27] = 'treasury';
    gidToName[28] = 'tradeOffice';
    gidToName[29] = 'greatBarrack';
    gidToName[30] = 'greatStable';
	gidToName[31] = 'wallGauls';
	gidToName[32] = 'wallRomans';
	gidToName[33] = 'wallTeutons';
    gidToName[34] = 'stonemason';
    gidToName[35] = 'brewery';
    gidToName[36] = 'trapper';
    gidToName[37] = 'herosMansion';
    gidToName[38] = 'greatWarehouse';
    gidToName[39] = 'greatGranary';
    gidToName[40] = 'WW';

	var xLang = new Array(0);
	//default language = English  (.uk, .com and .us)
	//we'll replace the array item values with the translated ones (if available) based on the language detected
	xLang['ALLIANCE'] 		= 'Alliance';
	xLang['SIM'] 			= 'Combat simulator';
	xLang['AREYOUSURE'] 	= 'Are you sure?';
	xLang['LOSS'] 			= 'Loss';
	xLang['PROFIT'] 		= 'Profit';
	xLang['EXTAVAILABLE'] 	= 'Extension available';
	xLang['PLAYER'] 		= 'Player';
	xLang['VILLAGE'] 		= 'Village';
	xLang['POPULATION'] 	= 'Population';
	xLang['COORDS'] 		= 'Coordinates';
	xLang['MAPTABLEACTIONS']= 'Actions';
	xLang['SAVED'] 			= 'Saved';
	xLang['YOUNEED'] 		= 'You need';
	xLang['TODAY'] 			= 'today';
	xLang['TOMORROW'] 		= 'tomorrow';
	xLang['PAS_MANYANA'] 	= 'day after tomorrow';
	xLang['MARKET'] 		= 'Marketplace';
	xLang['BARRACKS'] 		= 'Barracks';
	xLang['RALLYPOINT'] 	= 'Rally point';
	xLang['STABLE'] 		= 'Stable';
	xLang['WORKSHOP'] 		= 'Workshop';
	xLang['ENVIAR'] 		= 'Send resources';
	xLang['COMPRAR'] 		= 'Buy';
	xLang['VENDER'] 		= 'Sell';
	xLang['SENDIGM'] 		= 'Send IGM';
	xLang['LISTO'] 			= 'Available';
	xLang['ON'] 			= 'on';
	xLang['A_LAS'] 			= 'at';
	xLang['EFICIENCIA'] 	= 'Efficiency';
	xLang['NEVER']			= 'Never';
	xLang['PC']				= 'Culture points';
	xLang['ALDEAS']			= 'Village(s)';
	xLang['RECURSO1']		= 'Wood';
	xLang['RECURSO2']		= 'Clay';
	xLang['RECURSO3']		= 'Iron';
	xLang['RECURSO4']		= 'Crop';
	xLang['TIEMPO']			= 'Time';
	xLang['OFREZCO']		= 'Offering';
	xLang['BUSCO']			= 'Searching';
	xLang['TIPO']			= 'Type';
	xLang['DISPONIBLE']		= 'Only available';
	xLang['CUALQUIERA']		= 'Any';
	xLang['YES']			= 'Yes';
	xLang['NO']				= 'No';
    xLang['LOGIN']			= 'Login';
    xLang['MARCADORES']		= 'Bookmarks';
    xLang['ANYADIR']		= 'Add';
    xLang['ENLACE']			= 'New Bookmark URL';
    xLang['TEXTO']			= 'New Bookmark Text';
	xLang['ELIMINAR']		= 'Delete';
	xLang['MAPA']			= 'Map';
    xLang['MAXTIME']		= 'Maximum time';
	xLang['ARCHIVE']		= 'Archive';
	xLang['RESUMEN']		= 'Summary';
	xLang['TROPAS']			= 'Troops';
	xLang['CHECKVERSION']	= 'Update TBeyond';
	xLang['ACTUALIZAR']		= 'Update village information';
    xLang['VENTAS']			= 'Saved Offers';
    xLang['MAPSCAN']    	= 'Scan the Map';
	xLang['BIGICONS']		= 'Show extended icons';
	xLang['NOTEBLOCK']		= 'Show note block';
	xLang['SAVE']			= 'Save';
	xLang['RPDEFACT']		= 'Rally point default action';
	xLang['ATTACKTYPE2']	= 'Reinforcement';
	xLang['ATTACKTYPE3']	= 'Attack: Normal';
	xLang['ATTACKTYPE4']	= 'Attack: Raid';
	xLang['NBSIZE']			= 'Note block size';
	xLang['NBSIZEAUTO']		= 'Auto';
	xLang['NBSIZENORMAL']	= 'Normal (small)';
	xLang['NBSIZEBIG']		= 'Large screen (large)';
	xLang['NBHEIGHT']		= 'Note block height';
	xLang['NBAUTOEXPANDHEIGHT']	= 'Automatic expand height';
	xLang['NBKEEPHEIGHT']		= 'Default height';
	xLang['SHOWCENTERNUMBERS'] 	= 'Show center numbers';
	xLang['NPCSAVETIME']		= 'Save: ';
	xLang['SHOWCOLORRESLEVELS'] = 'Show resource level colours';
	xLang['SHOWCOLORBUILDLEVELS']	= 'Show building level colours';
	xLang['CNCOLORNEUTRAL'] 		= 'Color upgrade available<br>(Default = Empty)';
	xLang['CNCOLORMAXLEVEL'] 		= 'Color max level<br>(Default = Empty)';
	xLang['CNCOLORNOUPGRADE'] 		= 'Color upgrade not possible<br>(Default = Empty)';
	xLang['CNCOLORNPCUPGRADE'] 		= 'Color upgrade via NPC<br>(Default = Empty)';
	xLang['TOTALTROOPS'] 			= 'Total village troops';
	xLang['SHOWBOOKMARKS'] 			= 'Show bookmarks';
	xLang['RACECRTV2'] 				= 'Race';
	xLang['SERVERVERSION2'] 		= "Travian v2.x server";
	xLang['SELECTALLTROOPS'] 		= "Select all troops";
	xLang['PARTY'] 					= "Festivities";
	xLang['CPPERDAY']				= "CP/day";
	xLang['SLOT']					= "Slot";
	xLang['TOTAL']					= "Total";
	xLang['NOPALACERESIDENCE'] 		= "No residence or palace in this village or village center not opened yet !";
	xLang['SELECTSCOUT'] 			= "Select scout";
	xLang['SELECTFAKE'] 			= "Select fake";
	xLang['NOSCOUT2FAKE'] 			= "It's impossible to use scouts for a fake attack !";
	xLang['NOTROOP2FAKE'] 			= "There aren't troops for a fake attack!";
	xLang['NOTROOP2SCOUT'] 			= "There aren't troops to scout !";
	xLang['NOTROOPS'] 				= "There aren't troops in the village !";
	xLang['ALL'] 					= "All";
	xLang['NORACE'] 				= "Build the barracks to automatically determine the race and/or open the village center...";
	xLang['COLORHELPTEXT']			= "In color fields you may enter:<br>- <b>green</b> or <b>red</b> or  <b>orange</b>, etc.<br>- the HEX color code like <b>#004523</b><br>- leave empty for the default color";
	xLang['COLORHELP']				= "Help for color fields";
	xLang['SHOWORIGREPORT']			= "Show original report (for posting)";
	xLang['SHOWCELLTYPEINFO']		= "Show cell type/oasis info<br>while mousing over the map";
	xLang['WARSIM']					= "Combat simulator link to use:<br>(menu left)";
	xLang['WARSIMOPTION1']			= "Internal (provided by the game)";
	xLang['WARSIMOPTION2']			= "External (provided by kirilloid.ru)";
	xLang['WSANALYSER'] 			= "World Analyser to use";
	xLang['SHOWSTATLINKS'] 			= "Show analyser statistic links";
	xLang['WANALYSER0']				= "World Analyser"; //no Translation !  Name of a site !!!
	xLang['WANALYSER1']				= "Travian Utils"; //no Translation !  Name of a site !!!
	xLang['NONEWVERSION']			= "You have the latest version available";
	xLang['BETAVERSION']			= "You may have a beta version";
	xLang['NEWVERSIONAV']			= "A new version of the script is available";
	xLang['UPDATESCRIPT']			= "Update script now ?";
	xLang['CHECKUPDATE']			= "Checking for script update.  Please wait...";
	xLang['CROPFINDER']				= "Crop finder";
	xLang['AVPOPPERVIL']			= "Average population per village";
	xLang['AVPOPPERPLAYER']			= "Average population per player";
	xLang['SHOWRESUPGRADETABLE']	= "Show resource fields upgrade table";
	xLang['SHOWBUPGTABLE'] 			= "Show buildings upgrade table";
	xLang['CONSOLELOGLEVEL']		= "Console Log Level<br>ONLY FOR PROGRAMMERS OR DEBUGGING<br>(Default = 1)";
	xLang['MARKETPRELOAD']			= "Number of offer pages to preload<br>while on the 'Market => Buy' page<br>(Default = 1)";
	xLang['CAPITAL']				= 'Name of your capital<br><b>Visit your Profile for an update</b>';
	xLang['CAPITALXY']				= 'Coordinates of your capital<br><b>Visit your Profile for an update</b>';
	xLang['MAX']					= 'Max';
	//introduced in version 3.0.7
	xLang['TOTALTROOPSTRAINING']	= 'Total troops training';
	//introduced in version 3.0.9
	xLang['SHOWDISTTIMES'] 			= 'Show distances & times';
	//introduced in version 3.1.3
	xLang['TBSETUPLINK'] 			= 'Travian Beyond Setup';
	xLang['UPDATEALLVILLAGES']		= 'Update all villages.  USE WITH MAXIMUM CARE AS THIS CAN LEAD TO A BANNED ACCOUNT !';
	//introduced in version 3.1.4
	xLang['SHOWMENUSECTION3']		= "Show additional links in left menu<br>(Traviantoolbox, World Analyser, Travilog, Map, etc.)";
	//introduced in version 3.1.7
	xLang['LARGEMAP']				= 'Large map';
	//introduced in version 3.1.8
	xLang['SHOWTRAVMAPLINKS']		= 'Show links to travmap.shishnet.org<br>(users and alliances)';
	//introduced in version 3.1.9
	xLang['USETHEMPR']				= 'Use them (proportional)';
	xLang['USETHEMEQ']				= 'Use them (equal)';
	//introduced in version 3.2
	xLang['TOWNHALL']				= 'Town Hall';
	xLang['GAMESERVERTYPE']			= 'Game server';
	xLang['MARKETOFFERS']			= 'Market offers';
	xLang['ACCINFO']				= 'Account Information';
	xLang['BOOKMARKOPTIONS']		= 'Bookmarks';//identical to xLang['MARCADORES'] => check if this can be removed
	xLang['NOTEBLOCKOPTIONS']		= 'Noteblock';
	xLang['MENULEFT']				= 'Menu on the left side';
	xLang['STATISTICS']				= 'Statistics';
	xLang['RESOURCEFIELDS']			= 'Resource fields';
	xLang['VILLAGECENTER']			= 'Village center';
	xLang['MAPOPTIONS']				= 'Map options';
	xLang['COLOROPTIONS']			= 'Color options';
	xLang['DEBUGOPTIONS']			= 'Debug options';
	xLang['SHOWBIGICONMARKET']		= 'Market';
	xLang['SHOWBIGICONMILITARY']	= 'Military<br>Rally point/Barracks/Workshop/Stable';
	xLang['SHOWBIGICONALLIANCE']	= 'Alliance'; //identical to xLang['ALLIANCE'] => check if this can be removed
	xLang['SHOWBIGICONMILITARY2']	= "Town hall/Hero's mansion/Armoury/Blacksmith";
	xLang['HEROSMANSION']			= "Hero's mansion";
	xLang['BLACKSMITH']				= 'Blacksmith';
	xLang['ARMOURY']				= 'Armoury';
	//introduced in 3.2.1
	xLang['NOW']					= 'Now';
	xLang['CLOSE']					= 'Close';
	//introduced in 3.3
	xLang['USE']					= 'Use';
	xLang['USETHEM1H']				= 'Use them (1 hour production)';
	xLang['OVERVIEW']				= 'Overview';
	xLang['FORUM']					= 'Forum';
	xLang['ATTACKS']				= 'Attacks';
	xLang['NEWS']					= 'News';
	//introduced in 3.3.1
	xLang['ADDCRTPAGE']				= 'Add current'; //additional Add link for Bookmarks meaning 'add current page as a bookmark'
	xLang['SCRIPTPRESURL']			= 'TBeyond page';
	//introduced in 3.3.3
	xLang['NOOFSCOUTS']				= 'No. of scouts for the<br>"Select scout" function';
	//introduced in 3.3.4.2
	xLang['SPACER'] 				= 'Spacer';
	//introduced in 3.3.5
	xLang['SHOWTROOPINFOTOOLTIPS']	= 'Show troops information in tooltips';
	//introduced in 3.3.6
	xLang['MESREPOPTIONS']			= 'Messages & Reports';
	xLang['MESREPPRELOAD']			= 'Number of message/report pages to preload<br>(Default = 1)';
	xLang['ATTABLES']				= 'Troop tables';//only for users with PLUS => dorf3.php?s=6 link on dorf3.php pages
	//introduced in 3.3.7
	xLang['MTWASTED'] 				= 'Wasted';
    xLang['MTEXCEED'] 				= 'Exceeding';
    xLang['MTCURRENT'] 				= 'Current load';
	xLang['ALLIANCEFORUMLINK']		= 'Link to external forum<br>(Leave empty for internal forum)';
	xLang['LOCKBOOKMARKS']			= 'Lock bookmarks<br>(Hide delete, move up, move down icons)';
	xLang['MTCLEARALL']				= 'Clear all';
	//introduced in 3.3.7.2
	xLang['UNLOCKBOOKMARKS']		= 'Unlock bookmarks<br>(Show delete, move up, move down icons)';
	//introduced in 3.3.7.3
	xLang['CLICKSORT']				= 'Click to sort';
	xLang['MIN']					= 'Min';
	//introduced in 3.3.8
	xLang['SAVEGLOBAL']				= 'Shared among villages';
	//introduced in 3.3.8.1
	xLang['VILLAGELIST']			= 'Village List';
	xLang['SHOWINOUTICONS']			= "Show 'dorf1.php' and 'dorf2.php' links";
	//introduced in 3.3.8.3
	xLang['UPDATEPOP']				= 'Update population';
	//introduced in 3.4
	xLang['SHOWRPRINFOTOOLTIPS']	= 'Show distance and times to villages in tooltips<br>(Rally Point & Reports)';
	//introduced in 3.4.5
	xLang['EDIT']					= 'Edit';
	//introduced in 3.5
	xLang['SHOWMESOPENLINKS']		= 'Show links to open messages in a pop-up';
	//introduced in 3.5.4.1
	xLang['NPCOPTIONS']				= 'NPC Assistant options';
	xLang['NPCASSISTANT']			= 'Show NPC Assistant calculations/links';
	//introduced in 3.5.4.7
	xLang['SHOWMAPTABLE']			= 'Show table of players/villages/occupied oasis';
	//introduced in 3.5.4.7.2
	xLang['NEWVILLAGEAV']			= 'Date/Time';
	xLang['TIMEUNTIL']				= 'Time to wait';
	//introduced in 3.5.5
	xLang['SHOWREPDELTABLE']		= 'Show "Delete all" table on the Reports page';
	xLang['SHOWIGMLINKFORME']		= 'Show the "Send IGM" icon for me, too';
	xLang['CENTERMAP']				= 'Center map on this village';
	xLang['SHOWCENTERMAPICON']		= 'Show "Center map on this village" icon';
	
	function switchLanguage(detectedLanguage) {
		switch (detectedLanguage) {
			case "id":				
			// Indonesian Translation by CuPliz13
				xLang['ALLIANCE'] 		= 'Aliansi';
				xLang['SIM'] 			= 'Simulator Perang';
				xLang['AREYOUSURE'] 	= 'Apakah Anda yakin?';
				xLang['LOSS'] 			= 'Kerugian';
				xLang['PROFIT'] 		= 'Laba';
				xLang['EXTAVAILABLE'] 	= 'Naikkan tingkat';
				xLang['PLAYER'] 		= 'Pemain';
				xLang['VILLAGE'] 		= 'Desa';
				xLang['POPULATION'] 	= 'Populasi';
				xLang['COORDS'] 		= 'Koordinat';
				xLang['MAPTABLEACTIONS']= 'Aksi';
				xLang['SAVED'] 			= 'Disimpan';
				xLang['YOUNEED'] 		= 'Anda butuh';
				xLang['TODAY'] 			= 'hari ini';
				xLang['TOMORROW'] 		= 'besok';
				xLang['PAS_MANYANA'] 	= 'lusa';
				xLang['MARKET'] 		= 'Pasar';
				xLang['BARRACKS'] 		= 'Barak';
				xLang['RALLYPOINT'] 	= 'Titik Temu';
				xLang['STABLE'] 		= 'Istal';
				xLang['WORKSHOP'] 		= 'Bengkel';
				xLang['ENVIAR'] 		= 'Kirim sumberdaya';
				xLang['COMPRAR'] 		= 'Beli';
				xLang['VENDER'] 		= 'Jual';
				xLang['SENDIGM'] 		= 'Kirim Pesan';
				xLang['LISTO'] 			= 'Tersedia';
				xLang['ON'] 			= 'pada';
				xLang['A_LAS'] 			= 'pukul';
				xLang['EFICIENCIA'] 	= 'Efisiensi';
				xLang['NEVER']			= 'Tidak pernah';
				xLang['PC']				= 'Nilai budaya';
				xLang['ALDEAS']			= 'Desa(-desa)';
				xLang['RECURSO1']		= 'Kayu';
				xLang['RECURSO2']		= 'Liat';
				xLang['RECURSO3']		= 'Besi';
				xLang['RECURSO4']		= 'Gandum';
				xLang['TIEMPO']			= 'Waktu';
				xLang['OFREZCO']		= 'Penawaran';
				xLang['BUSCO']			= 'Cari';
				xLang['TIPO']			= 'Tipe';
				xLang['DISPONIBLE']		= 'Hanya tersedia';
				xLang['CUALQUIERA']		= 'Beberapa';
				xLang['YES']			= 'Ya';
				xLang['NO']				= 'Tidak';
				xLang['LOGIN']			= 'Login';
				xLang['MARCADORES']		= 'Bookmark';
				xLang['ANYADIR']		= 'Tambah';
				xLang['ENLACE']			= 'Bookmark URL Baru';
				xLang['TEXTO']			= 'Tulis Bookmark Baru';
				xLang['ELIMINAR']		= 'Hapus';
				xLang['MAPA']			= 'Peta';
				xLang['MAXTIME']		= 'Waktu maks';
				xLang['ARCHIVE']		= 'Arsip';
				xLang['RESUMEN']		= 'Laporan';
				xLang['TROPAS']			= 'Pasukan';
				xLang['ACTUALIZAR']		= 'Informasi Desa diubah';
				xLang['VENTAS']			= 'Simpan penawaran';
				xLang['MAPSCAN']    	= 'Pindai peta';
				xLang['BIGICONS']		= 'Tampilkan ikon tambahan';
				xLang['NOTEBLOCK']		= 'Tampilkan blok catatan';
				xLang['SAVE']			= 'Simpan';
				xLang['RPDEFACT']		= 'Aksi default dari titik temu';
				xLang['ATTACKTYPE2']	= 'Bantuan';
				xLang['ATTACKTYPE3']	= 'Serangan: Normal';
				xLang['ATTACKTYPE4']	= 'Serangan: Raid';
				xLang['NBSIZE']			= 'Ukuran blok catatan';
				xLang['NBSIZEAUTO']		= 'Otomatis';
				xLang['NBSIZENORMAL']	= 'Normal (kecil)';
				xLang['NBSIZEBIG']		= 'Layar lebar (besar)';
				xLang['NBHEIGHT']		= 'Lebar blok catatan';
				xLang['NBAUTOEXPANDHEIGHT']	= 'Lebar menyesuaikan otomatis';
				xLang['NBKEEPHEIGHT']		= 'Lebar asal';
				xLang['SHOWCENTERNUMBERS'] 	= 'Tampilkan angka pusat';
				xLang['NPCSAVETIME']		= 'Simpan: ';
				xLang['SHOWCOLORRESLEVELS'] = 'Tampilkan warna tingkatan sumberdaya';
				xLang['SHOWCOLORBUILDLEVELS']	= 'Tampilkan warna tingkatan bangunan';
				xLang['CNCOLORNEUTRAL'] 		= 'Upgrade warna tersedia<br>(Default = Kosong)';
				xLang['CNCOLORMAXLEVEL'] 		= 'Warna level maks<br>(Default = Kosong)';
				xLang['CNCOLORNOUPGRADE'] 		= 'Upgrade warna tidak tersedia<br>(Default = Kosong)';
				xLang['CNCOLORNPCUPGRADE'] 		= 'Upgrade warna lewat NPC<br>(Default = Kosong)';
				xLang['TOTALTROOPS'] 			= 'Jumlah pasukan';
				xLang['SHOWBOOKMARKS'] 			= 'Tampilkan bookmark';
				xLang['RACECRTV2'] 				= 'Lomba';
				xLang['SERVERVERSION2'] 		= "Server Travian v2.x";
				xLang['SELECTALLTROOPS'] 		= "Pilih semua pasukan";
				xLang['PARTY'] 					= "Festivalitas";
				xLang['CPPERDAY']				= "Nilai budaya/hari";
				xLang['SLOT']					= "Slot";
				xLang['TOTAL']					= "Total";
				xLang['NOPALACERESIDENCE'] 		= "Tidak ada istana atau kastil di desa ini atau pusat desa belum dibuka sebelumnya!";
				xLang['SELECTSCOUT'] 			= "Pilih pengintai";
				xLang['SELECTFAKE'] 			= "Pilih penipu";
				xLang['NOSCOUT2FAKE'] 			= "Tidak dimungkinkan untuk memakai pengintai untuk serangan tipuan!";
				xLang['NOTROOP2FAKE'] 			= "Tidak ada pasukan untuk serangan tipuan!";
				xLang['NOTROOP2SCOUT'] 			= "Tidak ada pasukan untuk mengintai!";
				xLang['NOTROOPS'] 				= "Tidak ada pasukan di desa!";
				xLang['ALL'] 					= "Seluruh";
				xLang['NORACE'] 				= "Bangun barak untuk secara otomatis menetapkan lomba da/atau membuka pusat desa...";
				xLang['COLORHELPTEXT']			= "Di kolom warna Anda bisa mengisi:<br>- <b>green</b> or <b>red</b> or  <b>orange</b>, etc.<br>- warna menggunakan kode heksadesilmal (HEX), seperti <b>#004523</b><br>- kosongak untuk warna default";
				xLang['COLORHELP']				= "Bantuan untuk kolom warna";
				xLang['SHOWORIGREPORT']			= "Tampilkan laporan asli (untuk ditampilkan)";
				xLang['SHOWCELLTYPEINFO']		= "Tampilkan tipe info bidang/oasis<br>saat kursor mouse berada diatas peta";
				xLang['WARSIM']					= "Link simulator perang untuk dipakai:<br>(menu kiri)";
				xLang['WARSIMOPTION1']			= "Internal (dari permainan)";
				xLang['WARSIMOPTION2']			= "Eksternal (dari kirilloid.ru)";
				xLang['WSANALYSER'] 			= "World Analyser untuk dipakai";
				xLang['SHOWSTATLINKS'] 			= "Tampilkan link Analyser Statistic";
				xLang['WANALYSER0']				= "World Analyser"; //no Translation !  Name of a site !!!
				xLang['WANALYSER1']				= "Travian Utils"; //no Translation !  Name of a site !!!
				xLang['NONEWVERSION']			= "Anda memiliki versi tyerakhir yang tersedia";
				xLang['BETAVERSION']			= "Anda memiliki versi beta";
				xLang['NEWVERSIONAV']			= "Versi script terbaru telah tersedia";
				xLang['UPDATESCRIPT']			= "Update script sekarang?";
				xLang['CHECKUPDATE']			= "Mengecek update script. Harap tunggu...";
				xLang['CROPFINDER']				= "Crop Finder";
				xLang['AVPOPPERVIL']			= "Populasi rata-rata per desa";
				xLang['AVPOPPERPLAYER']			= "Populasi rata-rata per pemain";
				xLang['SHOWRESUPGRADETABLE']	= "Tampilkan tabel upgrade lahan sumberdaya";
				xLang['SHOWBUPGTABLE'] 			= "Tampilkan tabel upgrade bangunan";
				xLang['CONSOLELOGLEVEL']		= "Console Log Level<br>HANYA UNTUK ROGRAMMERS AT DEBUGGING<br>(Default = 1)";
				xLang['MARKETPRELOAD']			= "Jumlah halaman penawaran untuk ditampilkan<br>saat ada di halaman 'Pasar => Beli'<br>(Default = 1)";
				xLang['CAPITAL']				= 'Nama Ibukota<br><b>Kunjungi profil Anda untuk perubahan</b>';
				xLang['CAPITALXY']				= 'Koordinat Ibukota Anda<br><b>Kunjungi profil Anda untuk perubaham</b>';
				xLang['MAX']					= 'Maks';
				//introduced in version 3.0.7
				xLang['TOTALTROOPSTRAINING']	= 'Total pelatihan pasukan';
				//introduced in version 3.0.9
				xLang['SHOWDISTTIMES'] 			= 'Tampilkan jarak & waktu';
				//introduced in version 3.1.3
				xLang['TBSETUPLINK'] 			= 'Travian Beyond Setup';
				xLang['UPDATEALLVILLAGES']		= 'Update semua desa. PEMAKAIAN MAKSIMUM BISA MENYEBABKAN AKUN ANDA DIHAPUS!';
				//introduced in version 3.1.4
				xLang['SHOWMENUSECTION3']		= "Tampilkan link tambahan di menu kiri<br>(Traviantoolbox, World Analyser, Travilog, Map, dll.)";
				//introduced in version 3.1.7
				xLang['LARGEMAP']				= 'Map lebar';
				//introduced in version 3.1.8
				xLang['SHOWTRAVMAPLINKS']		= 'Tampilkan link ke travmap.shishnet.org<br>(pemain dan aliansi)';
				//introduced in version 3.1.9
				xLang['USETHEMPR']				= 'Pakai (proporsional)';
				xLang['USETHEMEQ']				= 'Pakai (sama)';
				//introduced in version 3.2
				xLang['TOWNHALL']				= 'Balai Desa';
				xLang['GAMESERVERTYPE']			= 'Server permainan';
				xLang['MARKETOFFERS']			= 'Penawaran pasar';
				xLang['ACCINFO']				= 'Informasi Akun';
				xLang['BOOKMARKOPTIONS']		= 'Bookmark';//identical to xLang['MARCADORES'] => check if this can be removed
				xLang['NOTEBLOCKOPTIONS']		= 'Catatan';
				xLang['MENULEFT']				= 'Menu di sebelah kanan';
				xLang['STATISTICS']				= 'Statistik';
				xLang['RESOURCEFIELDS']			= 'Lahan Sumberdaya';
				xLang['VILLAGECENTER']			= 'Pusat desa';
				xLang['MAPOPTIONS']				= 'Opsi peta';
				xLang['COLOROPTIONS']			= 'Opsi warna';
				xLang['DEBUGOPTIONS']			= 'Opsi debug';
				xLang['SHOWBIGICONMARKET']		= 'Pasar';
				xLang['SHOWBIGICONMILITARY']	= 'Militer<br>Titik temu/Barak/Bengkel/Istal';
				xLang['SHOWBIGICONALLIANCE']	= 'Aliansi'; //identical to xLang['ALLIANCE'] => check if this can be removed
				xLang['SHOWBIGICONMILITARY2']	= "Balai desa/Padepokan/Pabrik perisai/Pandai besi";
				xLang['HEROSMANSION']			= "Padepokan";
				xLang['BLACKSMITH']				= 'Pabrik perisai';
				xLang['ARMOURY']				= 'Pandai besi';
				//introduced in 3.2.1
				xLang['NOW']					= 'Sekarang';
				xLang['CLOSE']					= 'Tutup';
				//introduced in 3.3
				xLang['USE']					= 'Pakai';
				xLang['USETHEM1H']				= 'Pakai (1 jam produksi)';
				xLang['OVERVIEW']				= 'Peninjauan';
				xLang['FORUM']					= 'Forum';
				xLang['ATTACKS']				= 'Serangan';
				xLang['NEWS']					= 'Berita';
				//introduced in 3.3.1
				xLang['ADDCRTPAGE']				= 'Tambahkan halaman ini'; //additional Add link for Bookmarks meaning 'add current page as a bookmark'
				xLang['SCRIPTPRESURL']			= 'Halaman TBeyond';
				//introduced in 3.3.3
				xLang['NOOFSCOUTS']				= 'No. paengintai untuk<br>fungsi "Pilih pengintai"';
				//introduced in 3.3.4.2
				xLang['SPACER'] 				= 'Penjeda';
				//introduced in 3.3.5
				xLang['SHOWTROOPINFOTOOLTIPS']	= 'Tampilkan info pasukan di tooltip';
				//introduced in 3.3.6
				xLang['MESREPOPTIONS']			= 'Pesan & Laporan';
				xLang['MESREPPRELOAD']			= 'Jumlah halaman pesan/laporan untuk ditampilkan<br>(Default = 1)';
				xLang['ATTABLES']				= 'Tabel pasukan';//only for users with PLUS => dorf3.php?s=6 link on dorf3.php pages
				//introduced in 3.3.7
				xLang['MTWASTED'] 				= 'Pengeluaran';
				xLang['MTEXCEED'] 				= 'Melampaui';
				xLang['MTCURRENT'] 				= 'Muatan saat ini';
				xLang['ALLIANCEFORUMLINK']		= 'Link ke forum luar<br>(kosongkan untuk memakai forum internal)';
				xLang['LOCKBOOKMARKS']			= 'Kunci bookmark<br>(sembunyikan ikon hapus, naikkan, turunkan)';
				xLang['MTCLEARALL']				= 'Kosongkan Semua';
				//introduced in 3.3.7.2
				xLang['UNLOCKBOOKMARKS']		= 'Buka bookmark<br>(tampilkan ikon hapus, naikkan, turunkan)';
				//introduced in 3.3.7.3
				xLang['CLICKSORT']				= 'Klik untuk mengurutkan';
				xLang['MIN']					= 'Min';
				//introduced in 3.3.8
				xLang['SAVEGLOBAL']				= 'Pembagian diantara desa-desa';
				//introduced in 3.3.8.1
				xLang['VILLAGELIST']			= 'Daftar Desa';
				xLang['SHOWINOUTICONS']			= "tampilkan link 'Peninjauan Desa' dan 'Pusat Desa'";
				//introduced in 3.3.8.3
				xLang['UPDATEPOP']				= 'Update populasi';
				//introduced in 3.4
				xLang['SHOWRPRINFOTOOLTIPS']	= 'Tampilkan jarak dan waktu ke desa-desa di tooltip<br>(Titik Temu & Laporan)';
				//introduced in 3.4.5
				xLang['EDIT']					= 'Ubah';
				//introduced in 3.5
				xLang['SHOWMESOPENLINKS']		= 'Tampilkan link to membuka pesan dalam popup';
				//introduced in 3.5.4.1
				xLang['NPCOPTIONS']				= 'Opsi NPC Assistant';
				xLang['NPCASSISTANT']			= 'Tampilkan kalkulasi/link NPC Assistant';
				//introduced in 3.5.4.7
				xLang['SHOWMAPTABLE']			= 'Tampilkan tabel pemain/desa-desa/oasis-oasis yang dikuasai';
				//introduced in 3.5.4.7.2
				xLang['NEWVILLAGEAV']			= 'Tanggal/Waktu';
				xLang['TIMEUNTIL']				= 'Waktu untuk menunggu';
				//introduced in 3.5.5
				xLang['SHOWREPDELTABLE']		= 'Tampilkan tabel "Hapus semua" di halaman Laporan';
				xLang['SHOWIGMLINKFORME']		= 'Tampilkan ikon "Kirim Pesan" untukku juga';
				xLang['CENTERMAP']				= 'Desa ini sebagai tengah-tengah peta';
				xLang['SHOWCENTERMAPICON']		= 'Tampilkan ikon "Desa ini sebagai tengah-tengah peta"';
				break;
			}
		}

	// Lumber mine
	var lumberCost = [
		[0, 0, 0, 0],
		[40, 100, 50, 60],
		[65, 165, 85, 100],
		[110, 280, 140, 165],
		[185, 465, 235, 280],
		[310, 780, 390, 465],
		[520, 1300, 650, 780],
		[870, 2170, 1085, 1300],
		[1450, 3625, 1810, 2175],
		[2420, 6050, 3025, 3630],
		[4040, 10105, 5050, 6060],				// Level 10
		[6750, 16870, 8435, 10125],
		[11270, 28175, 14090, 16905],
		[18820, 47055, 23525, 28230],
		[31430, 78580, 39290, 47150],
		[52490, 131230, 65615, 78740],
		[87660, 219155, 109575, 131490],
		[146395, 365985, 182995, 219590],
		[244480, 611195, 305600, 366715],
		[408280, 1020695, 510350, 612420],
		[681825, 1704565, 852280, 1022740], 	// Level 20
		[1138650, 2846620, 1423310, 1707970],
		[1901540, 4753855, 2376925, 2852315],
		[3175575, 7938935, 3969470, 4763360],
		[5303210, 13258025, 6629015, 7954815],
		[8856360, 22140900, 11070450, 13284540] // Level 25
	];

	// Clay mine
	var clayCost = [
		[0, 0, 0, 0],
		[80, 40, 80, 50],
		[135, 65, 135, 85],
		[225, 110, 225, 140],
		[375, 185, 375, 235],
		[620, 310, 620, 390],
		[1040, 520, 1040, 650],
		[1735, 870, 1735, 1085],
		[2900, 1450, 2900, 1810],
		[4840, 2420, 4840, 3025],
		[8080, 4040, 8080, 5050],				// Level 10
		[13500, 6750, 13500 ,8435],
		[22540, 11270, 22540, 14090],
		[37645, 18820, 37645, 23525],
		[62865, 31430, 62865, 39290],
		[104985, 52490, 104985, 65615],
		[175320, 87660, 175320, 109575],
		[292790, 146395, 292790, 182995],
		[488955, 244480, 488955, 305600],
		[816555, 408280, 816555, 510350],
		[1363650, 681825, 1363650, 852280], 	// Level 20
		[2277295, 1138650, 2277295, 1423310],
		[3803085, 1901540, 3803085, 2376925],
		[6351150, 3175575, 6351150, 3969470],
		[10606420, 5303210, 10606420, 6629015],
		[17712720, 8856360, 17712720, 11070450] // Level 25
	];

	// Iron mine
	var ironCost = [
		[0, 0, 0, 0],
		[100, 80, 30, 60],
		[165, 135, 50, 100],
		[280, 225, 85, 165],
		[465, 375, 140, 280],
		[780, 620, 235, 465],
		[1300, 1040, 390, 780],
		[2170, 1735, 650, 1300],
		[3625, 2900, 1085, 2175],
		[6050, 4840, 1815, 3630],
		[10105, 8080, 3030, 6060],				// Level 10
		[16870, 13500, 5060, 10125],
		[28175, 22540, 8455, 16905],
		[47055, 37645, 14115, 28230],
		[78580, 62865, 23575, 47150],
		[131230, 104985, 39370, 78740],
		[219155, 175320, 65745, 131490],
		[365985, 292790, 109795, 219590],
		[611195, 488955, 183360, 366715],
		[1020695, 816555, 306210, 612420],
		[1704565, 1363650, 511370, 1022740], 	// Level 20
		[2846620, 2277295, 853985, 1707970],
		[4753855, 3803085, 1426155, 2852315],
		[7938935, 6351150, 2381680, 4763360],
		[13258025, 10606420, 3977410, 7954815],
		[22140900, 17712720, 6642270, 13284540] // Level 25
	];


	// crop field
	var cropCost = [
		[0, 0, 0, 0],
		[70, 90, 70, 20],
		[115, 150, 115, 35],
		[195, 250, 195, 55],
		[325, 420, 325, 95],
		[545, 700, 545, 155],
		[910, 1170, 910, 260],
		[1520, 1950, 1520, 435],
		[2535, 3260, 2535, 725],
		[4235, 5445, 4235, 1210],
		[7070, 9095, 7070, 2020],				// Level 10
		[11810, 15185, 11810, 3375],
		[19725, 25360, 19725, 5635],
		[32940, 42350, 32940, 9410],
		[55005, 70720, 55005, 15715],
		[91860, 118105, 91860, 26245],
		[153405, 197240, 153405, 43830],
		[256190, 329385, 256190, 73195],
		[427835, 550075, 427835, 122240],
		[714485, 918625, 714485, 204140],
		[1193195, 1534105, 1193195, 340915], 	// Level 20
		[1992635, 2561960, 1992635, 569325],
		[3327700, 4278470, 3327700, 950770],
		[5557255, 7145045, 5557255, 1587785],
		[9280620, 11932225, 9280620, 2651605],
		[15498630, 19926810, 15498630, 4428180] // Level 25
	];

	// Warehouse
	var warehouseCost = [
		[0, 0, 0, 0],
		[130,160,90,40],
		[165,205,115,50],
		[215,260,145,65],
		[275,335,190,85],
		[350,430,240,105],
		[445,550,310,135],
		[570,705,395,175],
		[730,900,505,225],
		[935,1155,650,290],
		[1200,1475,830,370],					// Level 10
		[1535,1890,1065,470],
		[1965,2420,1360,605],
		[2515,3095,1740,775],
		[3220,3960,2230,990],
		[4120,5070,2850,1270],
		[5275,6490,3650,1625],
		[6750,8310,4675,2075],
		[8640,10635,5980,2660],
		[11060,13610,7655,3405],
		[14155,17420,9800,4355]					// Level 20
	];

	// Academy
	var academyCost = [
		[0, 0, 0, 0],
		[220, 160, 90, 40],
		[280, 205, 115, 50],
		[360, 260, 145, 65],
		[460, 335, 190, 85],
		[590, 430, 240, 105],
		[755, 550, 310, 135],
		[970, 705, 395, 175],
		[1240, 900, 505, 225],
		[1585, 1155, 650, 290],
		[2030, 1475, 830, 370], 				// Level 10
		[2595, 1890, 1065, 470],
		[3325, 2420, 1360, 605],
		[4255, 3095, 1740, 775],
		[5445, 3960, 2230, 990],
		[6970, 5070, 2850, 1270],
		[8925, 6490, 3650, 1625],
		[11425, 8310, 4675, 2075],
		[14620, 10635, 5980, 2660],
		[18715, 13610, 7655, 3405],
		[23955, 17420, 9800, 4355] 				// Level 20
	];

	// Grain Mill
	var grainMillCost = [
		[0, 0, 0, 0], 			// Level 0
		[500, 440, 380, 1240],
		[900, 790, 685, 2230],
		[1620, 1425, 1230, 4020],
		[2915, 2565, 2215, 7230],
		[5250, 4620, 3990, 13015] // Level 5
	];

	// Brickyard
	var brickyardCost = [
		[0, 0, 0, 0],
		[440, 480, 320, 50],
		[790, 865, 575, 90],
		[1425, 1555, 1035, 160],
		[2565, 2800, 1865, 290],
		[4620, 5040, 3360, 525] 				// Level 5
	];

	// Sawmill
	var sawmillCost = [
		[0, 0, 0, 0],
		[520, 380, 290, 90],
		[935, 685, 520, 160],
		[1685, 1230, 940, 290],
		[3035, 2215, 1690, 525],
		[5460, 3990, 3045, 945] 				// Level 5
	];

	// Iron foundry
	var ironFoundryCost = [
		[0, 0, 0, 0],
		[200, 450, 510, 120],
		[360, 810, 920, 215],
		[650, 1460, 1650, 390],
		[1165, 2625, 2975, 700],
		[2100, 4725, 5355, 1260] 				// Level 5
	];

	// Bakery
	var bakeryCost = [
		[0, 0, 0, 0],
		[1200, 1480, 870, 1600],
		[2160, 2665, 1565, 2880],
		[3890, 4795, 2820, 5185],
		[7000, 8630, 5075, 9330],
		[12595, 15535, 9135, 16795] 			// Level 5
	];

	// Market place
	var marketplaceCost = [
		[0, 0, 0, 0],
		[80, 70, 120, 70],
		[100, 90, 155, 90],
		[130, 115, 195, 115],
		[170, 145, 250, 145],
		[215, 190, 320, 190],
		[275, 240, 410, 240],
		[350, 310, 530, 310],
		[450, 395, 675, 395],
		[575, 505, 865, 505],
		[740, 645, 1105, 645], 					// Level 10
		[945, 825, 1415, 825],
		[1210, 1060, 1815, 1060],
		[1545, 1355, 2320, 1355],
		[1980, 1735, 2970, 1735],
		[2535, 2220, 3805, 2220],
		[3245, 2840, 4870, 2840],
		[4155, 3635, 6230, 3635],
		[5315, 4650, 7975, 4650],
		[6805, 5955, 10210, 5955],
		[8710, 7620, 13065, 7620] 				// Level 20
	];

	// Granary
	var granaryCost = [
		[0, 0, 0, 0],
		[80,100,70,20],
		[100,130,90,25],
		[130,165,115,35],
		[170,210,145,40],
		[215,270,190,55],
		[275,345,240,70],
		[350,440,310,90],
		[450,565,395,115],
		[575,720,505,145],
		[740,920,645,185],						// Level 10
		[945,1180,825,235],
		[1210,1510,1060,300],
		[1545,1935,1355,385],
		[1980,2475,1735,495],
		[2535,3170,2220,635],
		[3245,4055,2840,810],
		[4155,5190,3635,1040],
		[5315,6645,4650,1330],
		[6805,8505,5955,1700],
		[8710,10890,7620,2180]					// Level 20
	];

	// Blacksmith
	var blacksmithCost = [
		[0, 0, 0, 0],
		[170,200,380,130],
		[220,255,485,165],
		[280,330,625,215],
		[355,420,795,275],
		[455,535,1020,350],
		[585,685,1305,445],
		[750,880,1670,570],
		[955,1125,2140,730],
		[1225,1440,2740,935],
		[1570,1845,3505,1200],					// Level 10
		[2005,2360,4485,1535],
		[2570,3020,5740,1965],
		[3290,3870,7350,2515],
		[4210,4950,9410,3220],
		[5390,6340,12045,4120],
		[6895,8115,15415,5275],
		[8825,10385,19730,6750],
		[11300,13290,25255,8640],
		[14460,17015,32325,11060],
		[18510,21780,41380,14155]				// Level 20
	];

	// Armoury
	var armouryCost = [
		[0, 0, 0, 0],
		[130,210,410,130],
		[165,270,525,165],
		[215,345,670,215],
		[275,440,860,275],
		[350,565,1100,350],
		[445,720,1410,445],
		[570,925,1805,570],
		[730,1180,2310,730],
		[935,1515,2955,935],
		[1200,1935,3780,1200],					// Level 10
		[1535,2480,4840,1535],
		[1965,3175,6195,1965],
		[2515,4060,7930,2515],
		[3220,5200,10150,3220],
		[4120,6655,12995,4120],
		[5275,8520,16630,5275],
		[6750,10905,21290,6750],
		[8640,13955,27250,8640],
		[11060,17865,34880,11060],
		[14155,22865,44645,14155]				// Level 20
	];

	// Main building
	var mainBuildingCost = [
		[0, 0, 0, 0],
		[70,40,60,20],
		[90,50,75,25],
		[115,65,100,35],
		[145,85,125,40],
		[190,105,160,55],
		[240,135,205,70],
		[310,175,265,90],
		[395,225,340,115],
		[505,290,430,145],
		[645,370,555,185],						// Level 10
		[825,470,710,235],
		[1060,605,905,300],
		[1355,775,1160,385],
		[1735,990,1485,495],
		[2220,1270,1900,635],
		[2840,1625,2435,810],
		[3635,2075,3115,1040],
		[4650,2660,3990,1330],
		[5955,3405,5105,1700],
		[7620,4355,6535,2180]					// Level 20
	];

	// Rally point
	var rallyPointCost = [
		[0, 0, 0, 0],
		[110,160,90,70],
		[140,205,115,90],
		[180,260,145,115],
		[230,335,190,145],
		[295,430,240,190],
		[380,550,310,240],
		[485,705,395,310],
		[620,900,505,395],
		[795,1155,650,505],
		[1015,1475,830,645], 					// Level 10
		[1300,1890,1065,825],
		[1660,2420,1360,1060],
		[2130,3095,1740,1355],
		[2725,3960,2230,1735],
		[3485,5070,2850,2220],
		[4460,6490,3650,2840],
		[5710,8310,4675,3635],
		[7310,10635,5980,4650],
		[9360,13610,7655,5955],
		[11980,17420,9800,7620] 				// Level 20
	];

	// Embassy
	var embassyCost = [
		[0, 0, 0, 0],
		[180,130,150,80],
		[230,165,190,100],
		[295,215,245,130],
		[375,275,315,170],
		[485,350,405,215],
		[620,445,515,275],
		[790,570,660,350],
		[1015,730,845,450],
		[1295,935,1080,575],
		[1660,1200,1385,740],					// Level 10
		[2125,1535,1770,945],
		[2720,1965,2265,1210],
		[3480,2515,2900,1545],
		[4455,3220,3715,1980],
		[5705,4120,4755,2535],
		[7300,5275,6085,3245],
		[9345,6750,7790,4155],
		[11965,8640,9970,5315],
		[15315,11060,12760,6805],
		[19600,14155,16335,8710]				// Level 20
	];

	// Barracks
	var barracksCost = [
		[0, 0, 0, 0],
		[210,140,260,120],
		[270,180,335,155],
		[345,230,425,195],
		[440,295,545,250],
		[565,375,700,320],
		[720,480,895,410],
		[925,615,1145,530],
		[1180,790,1465,675],
		[1515,1010,1875,865],
		[1935,1290,2400,1105],					// Level 10
		[2480,1655,3070,1415],
		[3175,2115,3930,1815],
		[4060,2710,5030,2320],
		[5200,3465,6435,2970],
		[6655,4435,8240,3805],
		[8520,5680,10545,4870],
		[10905,7270,13500,6230],
		[13955,9305,17280,7975],
		[17865,11910,22120,10210],
		[22865,15245,28310,13065]				// Level 20
	];

	// Stable
	var stableCost = [
		[0, 0, 0, 0],
		[260,140,220,100],
		[335,180,280,130],
		[425,230,360,165],
		[545,295,460,210],
		[700,375,590,270],
		[895,480,755,345],
		[1145,615,970,440],
		[1465,790,1240,565],
		[1875,1010,1585,720],
		[2400,1290,2030,920],					// Level 10
		[3070,1655,2595,1180],
		[3930,2115,3325,1510],
		[5030,2710,4255,1935],
		[6435,3465,5445,2475],
		[8240,4435,6970,3170],
		[10545,5680,8925,4055],
		[13500,7270,11425,5190],
		[17280,9305,14620,6645],
		[22120,11910,18715,8505],
		[28310,15245,23955,10890]				// Level 20
	];

	// Workshop
	var workshopCost = [
		[0, 0, 0, 0],
		[460,510,600,320],
		[590,655,770,410],
		[755,835,985,525],
		[965,1070,1260,670],
		[1235,1370,1610,860],
		[1580,1750,2060,1100],
		[2025,2245,2640,1405],
		[2590,2870,3380,1800],
		[3315,3675,4325,2305],
		[4245,4705,5535,2950],					// Level 10
		[5430,6020,7085,3780],
		[6950,7705,9065,4835],
		[8900,9865,11605,6190],
		[11390,12625,14855,7925],
		[14580,16165,19015,10140],
		[18660,20690,24340,12980],
		[23885,26480,31155,16615],
		[30570,33895,39875,21270],
		[39130,43385,51040,27225],
		[50090,55535,65335,34845]				// Level 20
	];

	// Cranny
	var crannyCost = [
		[0, 0, 0, 0],
		[40,50,30,10],
		[50,65,40,15],
		[65,80,50,15],
		[85,105,65,20],
		[105,135,80,25],
		[135,170,105,35],
		[175,220,130,45],
		[225,280,170,55],
		[290,360,215,70],
		[370,460,275,90]						// Level 10
	];

	// Townhall
	var townhallCost = [
		[0, 0, 0, 0],
		[1250,1110,1260,600],
		[1600,1420,1615,770],
		[2050,1820,2065,985],
		[2620,2330,2640,1260],
		[3355,2980,3380,1610],
		[4295,3815,4330,2060],
		[5500,4880,5540,2640],
		[7035,6250,7095,3380],
		[9005,8000,9080,4325],
		[11530,10240,11620,5535],				// Level 10
		[14755,13105,14875,7085],
		[18890,16775,19040,9065],
		[24180,21470,24370,11605],
		[30950,27480,31195,14855],
		[39615,35175,39930,19015],
		[50705,45025,51110,24340],
		[64905,57635,65425,31155],
		[83075,73770,83740,39875],
		[106340,94430,107190,51040],
		[136115,120870,137200,65335]			// Level 20
	];

	// Residence
	var residenceCost = [
		[0, 0, 0, 0],
		[580,460,350,180],
		[740,590,450,230],
		[950,755,575,295],
		[1215,965,735,375],
		[1555,1235,940,485],
		[1995,1580,1205,620],
		[2550,2025,1540,790],
		[3265,2590,1970,1015],
		[4180,3315,2520,1295],
		[5350,4245,3230,1660],					// Level 10
		[6845,5430,4130,2125],
		[8765,6950,5290,2720],
		[11220,8900,6770,3480],
		[14360,11390,8665,4455],
		[18380,14580,11090,5705],
		[23530,18660,14200,7300],
		[30115,23885,18175,9345],
		[38550,30570,23260,11965],
		[49340,39130,29775,15315],
		[63155,50090,38110,19600]				// Level 20
	];

	// Palace
	var palaceCost = [
		[0, 0, 0, 0],
		[550,800,750,250],
		[705,1025,960,320],
		[900,1310,1230,410],
		[1155,1680,1575,525],
		[1475,2145,2015,670],
		[1890,2750,2575,860],
		[2420,3520,3300,1100],
		[3095,4505,4220,1405],
		[3965,5765,5405,1800],
		[5075,7380,6920,2305],					// Level 10
		[6495,9445,8855,2950],
		[8310,12090,11335,3780],
		[10640,15475,14505,4835],
		[13615,19805,18570,6190],
		[17430,25355,23770,7925],
		[22310,32450,30425,10140],
		[28560,41540,38940,12980],
		[36555,53170,49845,16615],
		[46790,68055,63805,21270],
		[59890,87110,81670,27225]				// Level 20
	];

	// Tournament square
	var tournamentSquareCost = [
		[0, 0, 0, 0],
		[1750,2250,1530,240],
		[2240,2880,1960,305],
		[2865,3685,2505,395],
		[3670,4720,3210,505],
		[4700,6040,4105,645],
		[6015,7730,5255,825],
		[7695,9895,6730,1055],
		[9850,12665,8615,1350],
		[12610,16215,11025,1730],
		[16140,20755,14110,2215],				// Level 10
		[20660,26565,18065,2835],
		[26445,34000,23120,3625],
		[33850,43520,29595,4640],
		[43330,55705,37880,5940],
		[55460,71305,48490,7605],
		[70990,91270,62065,9735],
		[90865,116825,79440,12460],
		[116000,150000,102000,15950],
		[149000,191000,130000,20415],
		[190560,245005,166600,26135]			// Level 20
	];

	// Treasury
	var treasuryCost = [
		[0, 0, 0, 0],
		[2880,2740,2580,990],
		[3685,3505,3300,1265],
		[4720,4490,4225,1620],
		[6040,5745,5410,2075],
		[7730,7355,6925,2660],
		[9895,9415,8865,3400],
		[12665,12050,11345,4355],
		[16215,15425,14525,5575],
		[20755,19745,18590,7135],
		[26565,25270,23795,9130]				// Level 10
	];

	// Trade office
	var tradeOfficeCost = [
		[0, 0, 0, 0],
		[1400,1330,1200,400],
		[1790,1700,1535,510],
		[2295,2180,1965,655],
		[2935,2790,2515,840],
		[3760,3570,3220,1075],
		[4810,4570,4125,1375],
		[6155,5850,5280,1760],
		[7880,7485,6755,2250],
		[10090,9585,8645,2880],
		[12915,12265,11070,3690],				// Level 10
		[16530,15700,14165,4720],
		[21155,20100,18135,6045],
		[27080,25725,23210,7735],
		[34660,32930,29710,9905],
		[44370,42150,38030,12675],
		[56790,53950,48680,16225],
		[72690,69060,62310,20770],
		[93045,88395,79755,26585],
		[119100,113145,102085,34030],
		[152445,144825,130670,43555]			// Level 20
	];

	// Great barracks
	var greatBarrackCost = [
		[0, 0, 0, 0],
		[630,420,780,360],
		[805,540,1000,460],
		[1030,690,1280,590],
		[1320,880,1635,755],
		[1690,1125,2095,965],
		[2165,1445,2680,1235],
		[2770,1845,3430,1585],
		[3545,2365,4390,2025],
		[4540,3025,5620,2595],
		[5810,3875,7195,3320],					// Level 10
		[7440,4960,9210,4250],
		[9520,6345,11785,5440],
        [12185,8125,15085,6965],
		[15600,10400,19310,8915],
		[19965,13310,24720,11410],
        [25555,17035,31640,14605],
		[32710,21810,40500,18690],
		[41870,27915,51840,23925],
		[53595,35730,66355,30625],
		[68600,45735,84935,39200]				// Level 20
	];

	// Great stable
	var greatStableCost = [
		[0, 0, 0, 0],
		[780,420,660,300],
		[1000,540,845,385],
		[1280,690,1080,490],
		[1635,880,1385,630],
		[2095,1125,1770,805],
		[2680,1445,2270,1030],
		[3430,1845,2905,1320],
		[4390,2365,3715,1690],
		[5620,3025,4755,2160],
		[7195,3875,6085,2765],					// Level 10
		[9210,4960,7790,3540],
		[11785,6345,9975,4535],
		[15085,8125,12765,5805],
		[19310,10400,16340,7430],
		[24720,13310,20915,9505],
		[31640,17035,26775,12170],
		[40500,21810,34270,15575],
		[51840,27915,43865,19940],
		[66355,35730,56145,25520],
		[84935,45735,71870,32665]				// Level 20
	];

	// City wall (Romans)
	var wallRomansCost = [
		[0, 0, 0, 0],
		[70, 90, 170, 70],
		[90, 115, 220, 90],
		[115, 145, 280, 115],
		[145, 190, 355, 145],
		[190, 240, 455, 190],
		[240, 310, 585, 240],
		[310, 395, 750, 310],
		[395, 505, 955, 395],
		[505, 650, 1225, 505],
		[645, 830, 1570, 645],					// Level 10
		[825, 1065, 2005, 825],
		[1060, 1360, 2570, 1060],
		[1355, 1740, 3290, 1355],
		[1735, 2230, 4210, 1735],
		[2220, 2850, 5390, 2220],
		[2840, 3650, 6895, 2840],
		[3635, 4675, 8825, 3635],
		[4650, 5980, 11300, 4650],
		[5955, 7655, 14460, 5955],
		[7620, 9800, 18510, 7620]				// Level 20
	];

	// Palisade (Gauls)
	var wallGaulsCost = [
		[0, 0, 0, 0],
		[160, 100, 80, 60],
		[205, 130, 100, 75],
		[260, 165, 130, 100],
		[335, 210, 170, 125],
		[430, 270, 215, 160],
		[550, 345, 275, 205],
		[705, 440, 350, 265],
		[900, 565, 450, 340],
		[1155, 720, 575, 430],
		[1475, 920, 740, 555],					// Level 10
		[1890, 1180, 945, 710],
		[2420, 1510, 1210, 905],
		[3095, 1935, 1545, 1160],
		[3960, 2475, 1980, 1485],
		[5070, 3170, 2535, 1900],
		[6490, 4055, 3245, 2435],
		[8310, 5190, 4155, 3115],
		[10635, 6645, 5315, 3990],
		[13610, 8505, 6805, 5105],
		[17420, 10890, 8710, 6535]				// Level 20
	];

	// Earth wall (Teutons)
	var wallTeutonsCost = [
		[0, 0, 0, 0],
		[120, 200, 0, 80],
		[155, 255, 0, 100],
		[195, 330, 0, 130],
		[250, 420, 0, 170],
		[320, 535, 0, 215],
		[410, 685, 0, 275],
		[530, 880, 0, 350],
		[675, 1125, 0, 450],
		[865, 1440, 0, 575],
		[1105, 1845, 0, 740],					// Level 10
		[1415, 2360, 0, 945],
		[1815, 3020, 0, 1210],
		[2320, 3870, 0, 1545],
		[2970, 4950, 0, 1980],
		[3805, 6340, 0, 2535],
		[4870, 8115, 0, 3245],
		[6230, 10385, 0, 4155],
		[7975, 13290, 0, 5315],
		[10210, 17015, 0, 6805],
		[13065, 21780, 0, 8710]					// Level 20
	];

	// Brewery (not in T3)
	var breweryCost = [
		[0, 0, 0, 0],
		[1200, 1400, 1050, 2200],
		[1535, 1790, 1345, 2815],
		[1965, 2295, 1720, 3605],
		[2515, 2935, 2200, 4615],
		[3220, 3760, 2820, 5905],
		[4125, 4810, 3610, 7560],
		[5280, 6155, 4620, 9675],
		[6755, 7880, 5910, 12385],
		[8645, 10090, 7565, 15855],
		[11070, 12915, 9685, 20290],			// Level 10
		[14165, 16530, 12395, 25975],
		[18135, 21155, 15865, 33245],
		[23210, 27080, 20310, 42555],
		[29710, 34660, 25995, 54470],
		[38030, 44370, 33275, 69720],
		[48680, 56790, 42595, 89245],
		[62310, 72690, 54520, 114230],
		[79755, 93045, 69785, 146215],
		[102085, 119100, 89325, 187155],
		[130670, 152445, 114335, 239560]		// Level 20
	];

	// Hero's mansion
	var herosMansionCost = [
		[0, 0, 0, 0],
		[700, 670, 700, 240],
		[930, 890, 930, 320],
		[1240, 1185, 1240, 425],
		[1645, 1575, 1645, 565],
		[2190, 2095, 2190, 750],
		[2915, 2790, 2915, 1000],
		[3875, 3710, 3875, 1330],
		[5155, 4930, 5155, 1765],
		[6855, 6560, 6855, 2350],
		[9115, 8725, 9115, 3125],				// Level 10
		[12125, 11605, 12125, 4155],
		[16125, 15435, 16125, 5530],
		[21445, 20525, 21445, 7350],
		[28520, 27300, 28520, 9780],
		[37935, 36310, 37935, 13005],
		[50450, 48290, 50450, 17300],
		[67100, 64225, 67100, 23005],
		[89245, 85420, 89245, 30600],
		[118695, 113605, 118695, 40695],
		[157865, 151095, 157865, 54125]			// Level 20
	];

	// Trapper
	var trapperCost = [
		[0, 0, 0, 0],
		[100, 100, 100, 100],
		[130, 130, 130,	130],
		[165, 165, 165,	165],
		[210, 210, 210, 210],
		[270, 270, 270,	270],
		[345, 345, 345, 345],
		[440, 440, 440,	440],
		[565, 565, 565, 565],
		[720, 720, 720, 720],
		[920, 920, 920, 920],					// Level 10
		[1180, 1180, 1180, 1180],
		[1510, 1510, 1510, 1510],
		[1935, 1935, 1935, 1935],
		[2475, 2475, 2475, 2475],
		[3170, 3170, 3170, 3170],
		[4055, 4055, 4055, 4055],
		[5190, 5190, 5190, 5190],
		[6645, 6645, 6645, 6645],
		[8505, 8505, 8505, 8505],
		[10890, 10890, 10890, 10890]			// Level 20
	];

	// Stonemason
	var stonemasonCost = [
		[0, 0, 0, 0],
		[155, 130, 125, 70],
		[200, 165, 160, 90],
		[255, 215, 205, 115],
		[325, 275, 260, 145],
		[415, 350, 335, 190],
		[535, 445, 430, 240],
		[680, 570, 550, 310],
		[875, 730, 705, 395],
		[1115, 935, 900, 505],
		[1430, 1200, 1155, 645],				// Level 10
		[1830, 1535, 1475, 825],
		[2340, 1965, 1890, 1060],
		[3000, 2515, 2420, 1355],
		[3840, 3220, 3095, 1735],
		[4910, 4120, 3960, 2220],
		[6290, 5275, 5070, 2840],
		[8050, 6750, 6490, 3635],
		[10300, 8640, 8310, 4650],
		[13185, 11060, 10635, 5955],
		[16880, 14155, 13610, 7620]				// Level 20
	];

	//Great warehouse
	var greatWarehouseCost = [
		[0, 0, 0, 0],
		[650, 800, 450, 200],
		[830, 1025, 575, 255],
		[1065, 1310, 735, 330],
		[1365, 1680, 945, 420],
		[1745, 2145, 1210, 535],
		[2235, 2750, 1545, 685],
		[2860, 3520, 1980, 880],
		[3660, 4505, 2535, 1125],
		[4685, 5765, 3245, 1440],
		[5995, 7380, 4150, 1845],				// Level 10
		[7675, 9445, 5315, 2360],
		[9825, 12090, 6800, 3020],
		[12575, 15475, 8705, 3870],
		[16095, 19805, 11140, 4950],
		[20600, 25355, 14260, 6340],
		[26365, 32450, 18255, 8115],
		[33750, 41540, 23365, 10385],
		[43200, 53170, 29910, 13290],
		[55295, 68055, 38280, 17015],
		[70780, 87110, 49000, 21780]			// Level 20
	];

	//Great granary
	var greatGranaryCost = [
		[0, 0, 0, 0],
		[400, 500, 350, 100],
		[510, 640, 450, 130],
		[655, 820, 575, 165],
		[840, 1050, 735, 210],
		[1075, 1340, 940, 270],
		[1375, 1720, 1205, 345],
		[1760, 2200, 1540, 440],
		[2250, 2815, 1970, 565],
		[2880, 3605, 2520, 720],
		[3690, 4610, 3230, 920],				// Level 10
		[4720, 5905, 4130, 1180],
		[6045, 7555, 5290, 1510],
		[7735, 9670, 6770, 1935],
		[9905, 12380, 8665, 2475],
		[12675, 15845, 11090, 3170],
		[16225, 20280, 14200, 4055],
		[20770, 25960, 18175, 5190],
		[26585, 33230, 23260, 6645],
		[34030, 42535, 29775, 8505],
		[43555, 54445, 38110, 10890]			// Level 20
	];

	//World wonder
    var wwCost = [
		[0, 0, 0, 0],
		[66700, 69050, 72200, 13200],
		[68535, 70950, 74185, 13565],
		[70420, 72900, 76225, 13935],
		[72355, 74905, 78320, 14320],
		[74345, 76965, 80475, 14715],
		[76390, 79080, 82690, 15120],
		[78490, 81255, 84965, 15535],
		[80650, 83490, 87300, 15960],
		[82865, 85785, 89700, 16400],
		[85145, 88145, 92165, 16850], 			// Level 10
		[87485, 90570, 94700, 17315],
		[89895, 93060, 97305, 17790],
		[92365, 95620, 99980, 18280],
		[94905, 98250, 102730, 18780],
		[97515, 100950, 105555, 19300],
		[100195, 103725, 108460, 19830],
		[102950, 106580, 111440, 20375],
		[105785, 109510, 114505, 20935],
		[108690, 112520, 117655, 21510],
		[111680, 115615, 120890, 22100], 		// Level 20
		[114755, 118795, 124215, 22710],
		[117910, 122060, 127630, 23335],
		[121150, 125420, 131140, 23975],
		[124480, 128870, 134745, 24635],
		[127905, 132410, 138455, 25315],
		[131425, 136055, 142260, 26010],
		[135035, 139795, 146170, 26725],
		[138750, 143640, 150190, 27460],
		[142565, 147590, 154320, 28215],
		[146485, 151650, 158565, 28990], 		// Level 30
		[150515, 155820, 162925, 29785],
		[154655, 160105, 167405, 30605],
		[158910, 164505, 172010, 31450],
		[163275, 169030, 176740, 32315],
		[167770, 173680, 181600, 33200],
		[172380, 178455, 186595, 34115],
		[177120, 183360, 191725, 35055],
		[181995, 188405, 197000, 36015],
		[186995, 193585, 202415, 37005],
		[192140, 198910, 207985, 38025], 		// Level 40
		[197425, 204380, 213705, 39070],
		[202855, 210000, 219580, 40145],
		[208430, 215775, 225620, 41250],
		[214165, 221710, 231825, 42385],
		[220055, 227805, 238200, 43550],
		[226105, 234070, 244750, 44745],
		[232320, 240505, 251480, 45975],
		[238710, 247120, 258395, 47240],
		[245275, 253915, 265500, 48540],
		[252020, 260900, 272800, 49875], 		// Level 50
		[258950, 268075, 280305, 51245],
		[266070, 275445, 288010, 52655],
		[273390, 283020, 295930, 54105],
		[280905, 290805, 304070, 55590],
		[288630, 298800, 312430, 57120],
		[296570, 307020, 321025, 58690],
		[304725, 315460, 329850, 60305],
		[313105, 324135, 338925, 61965],
		[321715, 333050, 348245, 63670],
		[330565, 342210, 357820, 65420], 		// Level 60
		[339655, 351620, 367660, 67220],
		[348995, 361290, 377770, 69065],
		[358590, 371225, 388160, 70965],
		[368450, 381435, 398835, 72915],
		[378585, 391925, 409800, 74920],
		[388995, 402700, 421070, 76985],
		[399695, 413775, 432650, 79100],
		[410685, 425155, 444550, 81275],
		[421980, 436845, 456775, 83510],
		[433585, 448860, 469335, 85805], 		// Level 70
		[445505, 461205, 482240, 88165],
		[457760, 473885, 495505, 90590],
		[470345, 486920, 509130, 93080],
		[483280, 500310, 523130, 95640],
		[496570, 514065, 537520, 98270],
		[510225, 528205, 552300, 100975],
		[524260, 542730, 567490, 103750],
		[538675, 557655, 583095, 106605],
		[553490, 572990, 599130, 109535],
		[568710, 588745, 615605, 112550], 		// Level 80
		[584350, 604935, 632535, 115645],
		[600420, 621575, 649930, 118825],
		[616930, 638665, 667800, 122090],
		[633895, 656230, 686165, 125450],
		[651330, 674275, 705035, 128900],
		[669240, 692820, 724425, 132445],
		[687645, 711870, 744345, 136085],
		[706555, 731445, 764815, 139830],
		[725985, 751560, 785850, 143675],
		[745950, 772230, 807460, 147625], 		// Level 90
		[766460, 793465, 829665, 151685],
		[787540, 815285, 852480, 155855],
		[809195, 837705, 875920, 160140],
		[831450, 860745, 900010, 164545],
		[854315, 884415, 924760, 169070],
		[877810, 908735, 950190, 173720],
		[901950, 933725, 976320, 178495],
		[926750, 959405, 1000000, 183405],
		[952235, 985785, 1000000, 188450],
		[1000000, 1000000, 1000000, 193630] 		// Level 100
        ];

	var buildingCost = new Array();
	buildingCost[0] = lumberCost;
	buildingCost[1] = clayCost;
	buildingCost[2] = ironCost;
	buildingCost[3] = cropCost;

	buildingCost[5] = sawmillCost;
	buildingCost[6] = brickyardCost;
	buildingCost[7] = ironFoundryCost;
	buildingCost[8] = grainMillCost;
	buildingCost[9] = bakeryCost;
	buildingCost[10] = warehouseCost;
	buildingCost[11] = granaryCost;
	buildingCost[12] = blacksmithCost;
	buildingCost[13] = armouryCost;
	buildingCost[14] = tournamentSquareCost;
	buildingCost[15] = mainBuildingCost;
	buildingCost[16] = rallyPointCost;
	buildingCost[17] = marketplaceCost;
	buildingCost[18] = embassyCost;
	buildingCost[19] = barracksCost;
	buildingCost[20] = stableCost;
	buildingCost[21] = workshopCost;
	buildingCost[22] = academyCost;
	buildingCost[23] = crannyCost;
	buildingCost[24] = townhallCost;
	buildingCost[25] = residenceCost;
	buildingCost[26] = palaceCost;
	buildingCost[27] = treasuryCost;
	buildingCost[28] = tradeOfficeCost;
	buildingCost[29] = greatBarrackCost;
	buildingCost[30] = greatStableCost;
	buildingCost[31] = wallGaulsCost;
	buildingCost[32] = wallRomansCost;
	buildingCost[33] = wallTeutonsCost;
	buildingCost[34] = stonemasonCost;
	buildingCost[35] = breweryCost;
	buildingCost[36] = trapperCost;
	buildingCost[37] = herosMansionCost;
	buildingCost[38] = greatWarehouseCost;
	buildingCost[39] = greatGranaryCost;
	buildingCost[40] = wwCost;

	// Training cost for each unit (4), load capacity (1), attack power (1), def power infantery (1), def power cavalery (1), speed (1) - for normal servers, crop consumption(1)
	// Def and crop of nature from http://www.kirilloid.ru/travian
	var uc = new Array();

	// Romans
	uc[1] = [120,100,180,40,40,40,35,50,6,1]; 			// Legionnaire
	uc[2] = [100,130,160,70,20,35,65,35,5,1];			// Praetorian
	uc[3] = [150,160,210,80,50,70,40,25,7,1]; 			// Imperian
	uc[4] = [140,160,20,40,0,0,20,10,16,2]; 			// Equites legati
	uc[5] = [550,440,320,100,100,120,65,50,14,3];		// Equites imperatoris
	uc[6] = [550,640,800,180,70,180,80,105,10,4];		// Equites cesaris
	uc[7] = [900,360,500,70,0,60,30,75,4,3];			// Battering ram
	uc[8] = [950,1350,600,90,0,75,60,10,3,6];			// Fire catapult
	uc[9] = [30750,27200,45000,37500,0,50,40,30,4,5];	// Senator
	uc[10] = [5800,5300,7200,5500,3000,0,80,80,5,1];	// Settler

	// Teutons
	uc[11] = [95,75,40,40,60,40,20,5,7,1];				// Club swinger
	uc[12] = [145,70,85,40,40,10,35,60,7,1];			// Spearman
	uc[13] = [130,120,170,70,50,60,30,30,6,1];			// Axeman
	uc[14] = [160,100,50,50,0,0,10,5,9,1];				// Scout
	uc[15] = [370,270,290,75,110,55,100,40,10,2];		// Paladin
	uc[16] = [450,515,480,80,80,150,50,75,9,3];			// Teutonic knight
	uc[17] = [1000,300,350,70,0,65,30,80,4,3];			// Ram
	uc[18] = [900,1200,600,60,0,50,60,10,3,6];			// Catapult
	uc[19] = [35500,26600,25000,27200,0,40,60,40,4,4];	// Chief
	uc[20] = [7200,5500,5800,6500,3000,10,80,80,5,1];	// Settler

	// Gauls
	uc[21] = [100,130,55,30,30,15,40,50,7,1];			// Phalanx
	uc[22] = [140,150,185,60,45,65,35,20,6,1]; 			// Swordsman
	uc[23] = [170,150,20,40,0,0,20,10,17,2];			// Pathfinder
	uc[24] = [350,450,230,60,75,90,25,40,19,2]; 		// Theutates thunder
	uc[25] = [360,330,280,120,35,45,115,55,16,2];		// Druidrider
	uc[26] = [500,620,675,170,65,140,50,165,13,3];		// Haeduan
	uc[27] = [950,555,330,75,0,50,30,105,4,3];			// Ram
	uc[28] = [960,1450,630,90,0,70,45,10,3,6];			// Trebuchet
	uc[29] = [30750,45400,31000,37500,0,40,50,50,5,4];	// Chieftain
	uc[30] = [5500,7000,5300,4900,3000,0,80,80,5,1];	// Settler
	
	// Nature's
	uc[31] = [0,0,0,0,0,0,25,10,0,1];			// Rat
	uc[32] = [0,0,0,0,0,0,35,40,0,1];			// Spider
	uc[33] = [0,0,0,0,0,0,40,60,0,1];			// Snake
	uc[34] = [0,0,0,0,0,0,66,50,0,1];			// Bat
	uc[35] = [0,0,0,0,0,0,70,33,0,2];			// Wild boar
	uc[36] = [0,0,0,0,0,0,80,70,0,2];			// Wolf
	uc[37] = [0,0,0,0,0,0,140,200,0,3];			// Bear
	uc[38] = [0,0,0,0,0,0,380,240,0,3];			// Crocodile
	uc[39] = [0,0,0,0,0,0,170,250,0,3];			// Tiger
	uc[40] = [0,0,0,0,0,0,440,520,0,5];			// Elephant

	// Natarian
	uc[41] = [0, 0, 0, 0, 0];				// Pikeman
	uc[42] = [0, 0, 0, 0, 0];				// Thorned warrior
	uc[43] = [0, 0, 0, 0, 0];				// Guardsman
	uc[44] = [0, 0, 0, 0, 0];				// Birds of prey
	uc[45] = [0, 0, 0, 0, 0];				// Axerider
	uc[46] = [0, 0, 0, 0, 0];				// Natarian knight
	uc[47] = [0, 0, 0, 0, 0];				// Warelephant
	uc[48] = [0, 0, 0, 0, 0];				// Ballista
	uc[49] = [0, 0, 0, 0, 0];				// Natarian emperor
	uc[50] = [0, 0, 0, 0, 0];				// Settler

	// Other..Demons?
	uc[51] = [0, 0, 0, 0, 0];
	uc[52] = [0, 0, 0, 0, 0];
	uc[53] = [0, 0, 0, 0, 0];
	uc[54] = [0, 0, 0, 0, 0];
	uc[55] = [0, 0, 0, 0, 0];
	uc[56] = [0, 0, 0, 0, 0];
	uc[57] = [0, 0, 0, 0, 0];
	uc[58] = [0, 0, 0, 0, 0];
	uc[59] = [0, 0, 0, 0, 0];
	uc[60] = [0, 0, 0, 0, 0];

	uc[98] = [20, 30, 10, 20, 0];			// trap
	uc[99] = [20, 30, 10, 20, 0];			// trap

	//Speed for the market Merchants
	var mts = new Array();
	mts['Romans']	= 16;
	mts['Gauls']	= 24;
	mts['Teutons']	= 12;

	var imgPrefix = 'data:image/gif;base64,';
	var imgPrefixPNG = 'data:image/png;base64,';

	var image = new Array();		// base64 coded images included in script

	//image for the hero (used on dor3.php troop table)
	image["hero"] = imgPrefix + 'R0lGODlhEAAQANU/AM+qcPCrU/fDcOJXD/Xamt5UBPRtJtO5gq9ZAdywWa51F/mMKv/91ON6Gv/wtNyHJ7SEM/qXR//++v/99P73xqltKvjow/eENsZZB/11CPeVNuW3bOxsA/zXquLPpv/97NxhAf//3MacSv3x1MxMAf7z4v/np//23c+ZOvavY8deF9NTCePDg+nQif2+du2JOeHbs8uXY+/do+Tpwch5H+vr1NBuHdt4Ec2BMfzu1/v28dGBOdnAmuW8e/327P///yH5BAEAAD8ALAAAAAAQABAAAAamwJ9w+JtQGMQksSSjTJRJSSdB+ECXrkdgdBVOOhFOgyAhSiSMNMW1yIACjmNJUoOxBPhAG3QLbHoHHj8zGw8LGogNHCAgChAAFj8fDgENCxcXBgMFKxWQZZImKZmaKyQqADmgRQwmEQacGAg7XEkhBC8FJLIIOCdKDAI2GA8oCgg0kUQTDiIVMRY5BxAKPKuSLSI8OkI+BCIHVkMTMgQ+RCcEHk8/QQA7';
	// Imagen de un sobre para enviar IGM
	image["igm"] = imgPrefix + 'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAICAYAAAAvOAWIAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1QsKFws6qttDxQAAAB10RVh0Q29tbWVudABDcmVhdGVkIHdpdGggVGhlIEdJTVDvZCVuAAAAkUlEQVQY05XQTUpDQRAE4K8yz9BuPEduEH8C2Tw8haeT3CQbPZEiIeNmhLdIAvamqerqaqqDdxxwcr0mvAWv+MYHfi4I13hErXCuqmOSp9batFS11qYk26o64gzzmCXJPsl64DvskYHn1cKo995PvfdnPOBl5OjLa/PY3qEGtxm9Bh/MfwG/8Hkj4Bb3+c/rfgHKwRzhskmMfQAAAABJRU5ErkJggg==';
	//Image for the open IGM
	image["igmopen"] = imgPrefix + 'R0lGODlhCwAPAPcAAEBAQAAm/4CAgP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAACwAPAAAIRwAHABhIkOAAgQcTHgSwcECAhw8RSlQokSHEiAwnKsxo8SLCgRQXAhAgwKFHkiVLKkypUuWAljBRHiT5kiJLlysFjETJU2dAADs=';
	//Image for the market big icon - provided by DMaster (Thank you !)
	image["mercado"] = imgPrefixPNG + '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';
	// Imagen compuesta para militar con 4 secciones: plaza de reuniones, cuartel, establo / corral y taller
	image["militar"] = imgPrefix + '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';
	//Image for the big icon bar - military 2 - blacksmith/armoury/townhall/hero's mansion
	image["militar2"] = imgPrefix + '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';
	//Image to replace the def1.gif
	image["def1"] = imgPrefix + 'R0lGODlhEAAQAPcAAAAAACYlSSsrVi0rVS0sXDAuWTAuWzEwXjQxYDY0Zjc1ZzI0bjU0aDg2ajk4ajw7bzw6fANJAAZOEgtNGw9PGQhcDwdYFA9SHhBFHxBSCxNWEhZQHh9FJhNYKxpULxpTMwFoAwdpBQ9kHAxuFgRzBgZ0CAd0Cgp3BQp1Dg11DA52DAp4BAx5BQx6BQt4DBB4Dhp+DBBzExF1ExJ1FBN0FhNwGBRwGBRxGRV0GhR0GxN6ExZ4HBZvIBprJRpsJRttJxtoLRtpLhxrLRtiNh5mMx1oPhdwIh1/Ii5bLiJnNSFmNiNjOiJiPCdnPyBsMSBoOyRoOSxxNjFjMjd1OzteQDtAcidmQShoQTp2SD16R0dWUkpIZE9NZ0dFd0hGeFNQb1paa19hdWN+X3F0T3h8S3xyXmNhdz8/gEJDgUJDhUVDgkVEg0RGgkJGiEZFiEVEjkJIhkZLhUVLjUhHiklHi0pJjUtJjklPiUlNkE5MlE1MlUtLnEtRjU1SkU9VlE9VlVBQnFNZnVRZnl5fln10h2VqrWpvrxeAGzSCFF+YPWGDHGuAM3eMIVmTQVuSQl2XQ12ZSWObQ3+OVW2DbW2HbX6Qe4CrQrScV6KRZK6VYLakesy7Md6+LN2/NdrAM+bFUYiOiomYhZaLgpOVl5Kdk5OclKCpna6zr663rbKyt7W1t7m4vLu5vcTExsnIytLU0NzZ3N3b3Ofl5+nm6Onn6fTy8vfy9/n1+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAj6AFcFGFDAwAEECbp4aaAgQQICYFJViXOHT58/ggoZCuSnTx84YVCFWLHihAkSJEqoZMGiBQhKpzwsYYLFUiJIjxo5umKlyQdSrRy4eUMIk6hPlzRlAqRHzwNXsDS4SAFDx5FNig4heqEChRRbszgQSaJkSBZPi4o8gQKlw6R//8xAoGPnzaBOZfbkyaOHASu4pSrIiEEjEidGO2LMGEHlFtxXG4QAiSJpDJkpQZxcMAUX7pYzc+a0kYOnTp00X2p1/gdKAo4bNmzUuJGDgqrV/2QhEeGjh+8fFsTghrtKAJo1atgs4EJrONxRGIzwmKAllvPOoSJkqOQ8IAA7';
	//Image to replace the  def_i.gif
	image["def_i"] = imgPrefix + 'R0lGODlhEAAQAOZ/ACIlkEFEoD5AnkJFoDY5miotlCYpkmBirzI0mCgrk7W9vSUokmlrtEhLo1JUqHd5u1FWqS00oDo9nFhaqywvlWJmtHBytjI1mGBjr3N4s1lcrDg6mSYqkL7DxkZfWn+ImWtvrmpstENGnIefiU1nYjU4mtzg8SEjjTs+nS0wllNbm7a3yV9kpX9re6ertVp3djE2n4GFumFin0BGlLm5y29XYVRXqUpMpCkskzM2mSMmkJCWpLjAwODj8nFzuDc6mufp8WxwsGJksEVHnnN1uSwulWJPcS4xlnh6ux4hkGldflJXoImPtFZYqomOn11SfI2VkT5RXGd+b5ebxjxBebi812ZagoWItG1nh1JHhXyVgbvA2LS4zUpOmzs+mzw/n19djzQrgC4zjUxPoUxPpTc6lV1of0RGoX59rzQ3kk5ZXJecqCYpj8fOznh9taWnzXV3uhwdhYCBtoSGtGltqK6w015gq25wtjg6m0lKolRYgEZJoiImj3J0uDk6mP///yH5BAEAAH8ALAAAAAAQABAAAAfCgHkwABQoA4eIDTYYIXIRAAA6eAGUlTdTXH0PG5AACAKgoTFtTERIRp0JBKurbgouFj5wWZ0ABbcFGQprdgcMd361nUE8OyINE0IMX7VLMywdTmUIDU0HIBVhkF4fUlpQXQs5ew4ac3VJBgsAHCMeUXqqZ2RjNH9DJwAqL2pifGxFfgTYI+PPnzdxAJghQQWSgRQlJKRZYfAPBGGQcBy5QKfinx5KMAIwAMajQRMtMGIBYrIimhqdrrQ0WcXKky0tAwEAOw==';
	//Image to replace the  def_c.gif
	image["def_c"] = imgPrefix + 'R0lGODlhEAAQAOZ/ACIlkEJFoEFEoCotlCUokiYpkmlrtGpstCMmkFlcrGBirzQ3kjQrgDM2kltdoyksk66w0yEjjWJksDg6m25voUlKoiotkn19hlxerS0wllBToTE2n42NlGZagjU4mqCgr3d3nDs+nX59rxwdhTI1mHt9qqqpsjk6mFxerG1nh2ldfra0u7/AwUxPoYuMrpWVkZmYnXFyoEpMpCgrkywvlR4hkEVHnjU4lllboVNVp7CusLCxsGltqGhqs2BjryQnkZiZtbm5y3N1uS4xlnJ0uDg6mVJVqXd4rU5QkWJPcVJHhW9XYV9dj6OgpVtbkKmoqbvA2Hd5u3h6u2Finzw/n29vly00oJeVndzg8ZCQp2dps5mar0ZJokxPpV1SfLi8125wtkBCn39re0FEmIWItFhaq7Oxt+Dj8ufp8XFzuHV3unZ3mLCuuKajrICBtoSGtGtvrnN1pYGBgKWnzVRXqWJmtFZYqpWWtHR1n7a3yTo9nEhLoykskjI0mHx8hP///yH5BAEAAH8ALAAAAAAQABAAAAe+gBUbADQhAYeIe3Q+B25WAAAIEwKUlTIJWkRRRZAAfWExbU0wIDkYB0JSSZ0zJSx4SBQrWSg9aWpKnWM7JQO+OE9xCgZgJ51rJnydAB8XZRIGVJ0vLssId3J2CnB1DJAcQMsEW35GCW8QNQUETmYWkD83OlVdLUF/NhEADWwOkARHrmjgMuXPnzkjlkEqkMGDngV5DP4xohDSgyEkeEj8c0ZFRQAFmGw0iEVMxRRoRkoUsaQTGZUjv3TwAkVlIAA7';
	//Image to replace the block_b21.gif
	image["blockheader"] = imgPrefix + 'R0lGODlhuAEpAPcAAP///wEBAhYXFwMIEhIREFBdaz4/Oh0eHGt8k3GCk2x7jSgyOyIqNDlGVYeKjQkTGouKh3F9lP///RgjLC0uKWtraZOWmmmBjSYnJlxdXVdmd1hXWEVRXUlHNlxvgIuMiy86R/39/f3//2+In5aZnIKCgg0MCWuClkFMVwoWL215hmR1hSQkGpCNiIiHhVVYWfz++n5+fvr+/niCinKEmjU0K3eIlru8u1NVWHd8hGZxeMTFxk9MRDc3N2RlZJWVlmN0ijExMmV8m/z3+rm4uYuNkGt1i7KyrLOys/f29bW2t4OIg8C8ib7Bwufq6mZ7lGV8jWp9meDg4f37+niFnf7+/m1zlfT082V3kP/+/dzc22Nrduzs66yojHiLn8LCwr+/wE1PTXh6eqCfoImGi8/Q0fr6+QIRBJqWlQ4NB+Pj4//9//38/vHy8vr69amqpqSkoaaqrc/Rze/u7ZudoXR1d62wqtXUy/78+xApEc3Mz3l2ce3u8I2RitLR0ZiWmniEk9TU0/X+/djX15aYlYF/ea6xskZHRWFdUMvFlZycm8G/wpCPkZqalWpqanp6dKWlo4J+g1JSUrW3scPDu+bl5/79/w4ODIeHc+fo5aurq2NtgWtpVszMy1dURoCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAC4ASkAQAj/AGHIEERQBIBBEAgECPDgAYEJGSYBABACgAwZIsxMGTJkIoAySFrEiFHiiB6KIULAEIhRI0ePIEWSNIlSJcuMGztOjDmy5MmUNi/ifLkzZE+aQFcKdanzo9GZP1MqbZkT5lOfNacObcoTatabTK3KxJoUbNWiY5FKNUvUadqoQam27Up27dKzbo/C1RoWrd6vd+deVRt3q9i/ZS/K5Tp4L1vGb796nDwxS4YACyJEiLJggAkBBASIHk069IABRhBE0HA6dGjRr2MTMI1aNesBrkfHhj1bwOnUq1uD1g2bN23gt3MXHw6692/bwl8zl30cOm7m0437rh38uvTdzat3/1eePfx25NGJT3fOPTl28LPFu/++PP556+Ths0fvXT31++O9V99++Am4HoEB0ncggPP5x9tyAXgUAAMBrADFBTYEQAFlHE5URQWYJRDFBSlg0GGHbHwY4oglnshhiiAuICKJJro4GYwr0mjjjSrKyGKNOwKAo486BilkjzO2aOSQSQK5I5M/GnlkjE1KCWWRQV6pZJZIRrlkl1g+CeaWYo7ppI1anukiG5OVEOFEAcQwmSEMTKABIDPowEEQGGDQgAozDPDmZEo8wMAKNEQAwgR58NDBGQbkMEEAY3RY6KGJLtroo5FOWimHlyKqKKOOQioppZYaKqqmpXaKKqiqZv9KKqenfkpZqLJuaqqnqWI6qq6u2kporL+2Wmuvq86666u3EssqrbzC6uuzywrrEa7FQsvssNMqGyyyuRobbbPdAnssuNlWiy6137Y5aAAlSCnvvPTWa++9+Oar77789uvvvwAHLPC/bkoY78AIJ6zwwgw37PDDEEfMb8ETTcGmFgQwoMIJUQhhBQinBTDABA1sgcFCKKP8QAEInDACEA1w0EADKOgwAwop58wQyy7DLDPNNuOss8o8vxzzzDXfPDTRLRv9c9JCL71y0z4jHfTSC03d89FAK4211k5b7bXURVfdddRDg2021FjvTDXXbH9dNtxXy/3203WTfbfYaOv/rDbdY6c9N96BC7732W3/TXjfKH8y2UIFXBAFApNSYqQEpymgeQED7CAv5gNorgDnnksJuuikf5755p2rHjrrpV+++uitmz576ra/TnvsQZ4Ou+uo1y677rgPHzzvO/q+O/C/537858oX3/vtws9LMQAmFLIGzhpccAEKD1RQiQs9GGBAD4VIwaEDAWiQgAINBLDEZEnsyL778MtPv/3tvx///B6pn43u5z/9BZB/+Pvf/gbYv/wBcCICdBEBHbhACTZQgQdkYAINCEEEFvCBAIjgiSaIwQ5q8IMVHOEFORhCD1Iwgxbc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';
	//Image to replace the underline.gif
	image["underline"] = imgPrefix + 'R0lGODlhFwAQAIABAODg4AAAACH5BAEAAAEALAAAAAAXABAAQAIVjI+py+0Po5y02ouz3rxjAIbiSIIFADs=';
	//Image to replace the att_all.gif
	image["att_all"] = imgPrefix + 'R0lGODlhEAAQAOZ/APT09Lq6ut7e3uKdOP39/bCwsOPj46WlpY+Pj7W1tfv7+8zMzKuGUfb29s/Pz+G6gb29vbmrlpOTk5SUlKmpqZ2dne/v76enp/7+/qiDTuzs7Orj19ra2ubm5s3Nzbi4uNLBqLGxsaGhodTBp9/f37KyspSBZLixp6x4Lefn57OISvDw8KOjo/j4+KaZhqWKYqRvJLe3t3R0dLN/NpiYmMSXU6x2Jf/QiLutl7V5JMTCv/+8WZaWltrSx+3t7c2LKunm4tPT06V4NsOHMczO0deQKtm4h9+gRrOEP/P2+vv49J99Sr+cae3r6MWAHKurq9CXQ8nJyYWFhaKkpf/Je+XayuTo7eDe3eXn6qNzL4V0XNeiVGlRL8Sxle3s6+zZvPbbtaSgmvT086yqqYeIiYFTEuCjS+inSbCys5dvNdXV1drVz4KCgq2mnejo6Ovr68zMzdyPIM25nbqwo5GRke2uUff39vf39/Ly8reRWo2NjYCAgLm5udHR0aioqP///yH5BAEAAH8ALAAAAAAQABAAAAfHgA4hIgl/hoeGAhUUMVILBAt8iIYWFAQaNAJ7QQAeHIgrHw0dEwd/BnpRdx8ChyUAAiwBh24yagoBHngIFik8E5MObBwtCRA+GgWmk399BwINdG8QfhjMhgESJB0IEteHT8oGChXMQEZdcERJZFNYVmgnDz2GG0hZKmAjYToRXw8wZoBAhOPGmR9LGNgYQIWJGERjUAyRo4RLmSob0hTRAsDQnBxO2hiy48XQFSFxTDR5AWVHBmvMXAyowyCDmS0Rvq3Jc6RGIAA7';
	//Image to replace the green bullet (b2.gif)
	image["bulletGreen"] = imgPrefix + 'R0lGODlhDAAMAMQfAILLgqrZquLx4heMFxiTGEqzSpPIkwmFCSSdJMnjyS2kLTytPE2mTm68bgF+ASybLAOCA1apVjalNiCRIOz37AyLDAaABwV/BQaABgiBCQyDDAmCCgR/BAeBCAN+A////yH5BAEAAB8ALAAAAAAMAAwAAAVk4PdRAVAwTSCIn2AWi/RMUTKaSzwPWiQEuYUCgeBdHIaGRDEkVA4Oh4chIRKcECnnMngQBhVIdmvpDBiHrPSC6WQ2DEPUw8FY3hqNQcColzcbeT4fCRFugYI2IgIGDBMTcSsfIQA7';
	//Image to replace the yellow bullet (b3.gif)
	image["bulletYellow"] = imgPrefix + 'R0lGODlhDAAMAMQfAPvkSvPYJeTRUufOKf7lPOXKFPnnb+rZZvDZON3ABeTHCe7jldq9Ad3DHvryv+7RGv/vgte6Afv45Pz43/nfL//87Ni8B9i9Cti8Cdi8Bti7Bdi8CNi7BNm9DNe7A////yH5BAEAAB8ALAAAAAAMAAwAAAVk4PdVDgQAxyKJ32QSBDIMhzO+BBUMTSdIDlgu8Ch0PJGFgcIkFhIRj0eACBAfigTDw9E0BoWCIsvoWjYNQUK71WQ2mItgEeVmLPFOZzERcO4bF3o+Kw4CcIM+NiISCwINaSoiIQA7';
	//Image to replace the red bullet (b4.gif)
	image["bulletRed"] = imgPrefix + 'R0lGODlhDAAMAMQfANsmJtUWFtlbW+tKSuMqKvni4uaVlfevr+dubsQBAeo9PfLJyfOCguYzM8obG8oDA8kJCc4hIf3s7NEMDNZRUtVLS8UKCsYMDMUJCcQGBsQFBcUHB8UICMQEBMQDA////yH5BAEAAB8ALAAAAAAMAAwAAAVk4PdJBzMMiFGIX2EOSgNEyDKaSkxEzkUVh1xDFglcPAkDokFoBgKQRMJTUQAAz8lj2tE4sAHttrvhOCiX7cOjyXAwFopB6ulkNvDLRUWxly0WegIrCxRvgYI2IgUGFA4RcisfIQA7';
	//Image to replace the grey bullet (b5.gif)
	image["bulletGrey"] = imgPrefix + 'R0lGODlhDAAMAMQfAK2traurq87OztfX18HBwcvKyuvr69HR0cXExKenp7KysuDg4N7e3r69vbq5uba2trCwsPX09KSkpPj4+MC/v/X19cjIyKWlpaKhocLCwqampqalpaWkpKSjo6Oiov///yH5BAEAAB8ALAAAAAAMAAwAAAVn4PdNxnIUAlOJX2WeiAMhxvgKFvUACREZgqAlI0t4MIOBxYIgOBQBjMfTyDQajgck0Zl2Ak8FJKCReDodToCQ2HDMaA7n0hhIvenLRjOIUM55exoZKwYUchuCGTUiFQMNAAAUAysfIQA7';
	//Image to replace the  del.gif
	image["delIcon"] = imgPrefix + 'R0lGODlhDAAMANU2AN4ZCtAgFNAgHdsgA9waCs4cDMwkHPNfHcspJ9oYCsoYDc8pINAYCvg0AORNOeFFPtA7O+c+QNRTU8BMSb4gHN5lTNooGsc1N+g+PuEkJOhOKLlVWOwxD9MlGtUiFMwjFcI7LtcfDPY9ANs5L+JMSOxhJLRDO+YfDdYEAPdvHORZRMkZC9EcDcwXE8ssLtonG9gbG+M8EOEZGdkZDNwVCb0pKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADYALAAAAAAMAAwAQAZJQNNgYisajzZVDHRMBJC2TEvxOY40HNfRsEJGYBKS51gS1aA2gCXVQEApDONDBikuCmgMioV2vC5FMx1GFQchG0g0BDYnAmhFQQA7';
	//Image for the delete Button
	image["delButton"] = imgPrefix + 'R0lGODlhLAASAPcAAAAAAH/YFL4gHL0pK7RDO7lVWMkZC8oYDc4cDMwXE9YEANAYCtEcDdcfDNwVCdoYCtkZDN4ZCtwaCtgbG8wjFcwkHNsgA9AgFNUiFNAgHdMlGtonG9ooGsspJ88pIMssLsI7Lsc1N9s5L9A7O+YfDeEZGewxD+M8EPY9APg0AOEkJOg+Puc+QPNfHehOKOFFPuRNOfdvHOxhJMBMSdRTU95lTOJMSORZRIrdIZPhLJ7mOanrRrTwU7/1X8f5as78ctD9dNH9epeXl6atmwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAsABIAAAj/AP/9E0KwoMGDCBMqNChw4BAgECNKhBikYkWKF4FYnMhxiBCHHEOKHEnSoxCSEglYmIGyJUSCLoFwiJGiA0cBC2K+PCkyiMQgIlyY+CCxggGOPkfC1BnkRYkRED0gCJlUJMEfWLNmDaL1B1esKhIcoNB1a1mtBH2oXcu2LdsVChi4nTuXYI+7ePPqxctiAg0bGPYK3kuQh+HDiBMbhrEhhGEIGhRLTkxwh+XLmDPvuHECBOYHFzSLxkxQh+nTqFPXaNGgQGoHElLLTk0wh+3buHPLQDEgt+0IvoPfJoijuPHjyElkQM68eXOCQwJIn069uvXr2Kl7dJi9u3fs2wUuBhxPfrzAgAA7';
	//Image to replace the bau.gif
	image["constructIcon"] = imgPrefix + 'R0lGODlhCgAQAOYAAP///7y+wFRVXuPSwlRXXsnIxHJ1e09SWnd8gXF0enp8gfT09djDsUhLU46RlI2QlMbHyP78+dO/r7q8v/39/fn18Lq7u8zNzeLj45qcnJeYmU1QWP38++7j2FtcYene0vXv5/Dr6Pj4+H+ChlNWXtbY2GBjabeqoPT19aqusWVnb0tOVo2QkY+SlFhcY6+xsKOlpN3PxFZYYHZ4flJSV6Gkp9G7qNTV1XN2fIiLkd3NvtO+rPn288rKy66wtN7NvdjOxtzd3+nq6tXCsWVnbXZ5f8LGx/r6+uzk3gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAKABAAAAdhgACCgwAVDCGEgx0SHImCPzGOABE7SJIgNjySH0OSAAM6nidAkihEPYkTKUYeEIRBLhsPNAoBJQALOAQNCCMwBUIUOSQHRQ4aFiIAPisyBi0ZF4MqAiYsLxiEMwk1N0eJgQA7';
	//image for the Travian World Analyser links
	image["globe"] = imgPrefix + 'R0lGODlhDAANAPcAAAAAAAVrEwB0CgB4DQB7DQByHwplPQF+MRZlNxJwOQdcRAZYagRkTwFuTRhiUAFjditgawM/pQBHmxVHlx9UgwFApwNGqABGrQJJrwBQtQBUuwBevBJCpxREqRdFqxdWsgFrpQB1tAF4uitcgShOtCJXtjdXpDddvjhXuDtdvTxltQBcwgBrzQFuzQ1oxxxsxRV41EFdiUdemkRerVxsk1lsmkZxvgGCNiSoLDSxLgGGQQGETAGJWQyTcB6beD6NdSWkfky/LEK3RljFNWfNRWzPQ2LKU2/QVHTTan7YdQGAjQiHjw2Xgx6KnQKIoQiEohyilTazjQGJyQKD3AaS2AGG7QmY5BKe+xehxzSd6DCw+meBkHqJmHKQmHaIqnmGo06Qz0mj3kq+/nam2nbNrGfL13rU1JyisqOotKistqW6va6yuYir1pWnwY3YkIjcq4LStZDhkZPhpJ3mpJzlrqTpoqTjtpvV0p3K66rL0qHZ0KLH5qfjzabow7XwxQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAMAA0AAAifAP8J/McHDpk7AwfaeSMnyRAgWfAMdINkjh86RqBMaZLnnx4hReLU6VMGi5MDP/6F8RGEyBEzYqzwIJBADYwnOHJE0XJFyo0CBrq4aLGkBxMqVZQMCOBgy4sVLETo2BECBAMEELiAwaBhQwMBDzJYGBEDzZ4PFS4sUCAhAgcTNASOKdGBwgQPJFDIWDOQjQ0VJ1LMqJEmocA2Xr6cSRgQADs=';
	//Image for the market function "Use them" proportional
	image["usethempr"] = imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAntJREFUSEuVlU1ME1EQx1dOHD169OjRo0eP3rTGLV5Mjdui3lCaQEy01bAtfiDRlIgEwbYkxBAwVVGCgZqI8WsNcjBNlYMJoYRaWNq1ZVtWVv6bvGa7fbv7mOSlzb7Z/29m3szbA5yLtQnR43DZbeGMXztr2eXeYa9VUz/F4zdVN92G/ZO+0MGuWyNjiYm5yvLvnIyluxjxm3z1Yfua+HSa9905xAQ9I0ROTL5YyGvav5obxGn/9ZxUuHClP+AI7RZHn6ys5l2zYQ2kIJe2eu6Pp6jQQOeDc+t5eZNVjNWvXFH/Xu4aCDdAUe+Xs1/W7ERyuZwuSZKezWapLtjDsrOPUmbjdLt4pA4N3x2b0TSNemapVEoXBMEQFEVRDwaDTboej0dHUE52e2Bi0QD6fKFWdJadM8TMZhUnwbiVeGZeUtH9HObMqe2tQGRJyheLxXQsFgPDmGneHz1fLJUVpwwJQFEUnQSAZ7Ty2umo1Zrq9Uc69oCRS3udVHaKEsJYKB8axwzGe25NA58dTdvhBbGbw6Dvd/aQJcBoFPxPp9N6MpmsZ08Lfm1d3vK2i6c4jMT8+++OGZoFkCnEYcjY3J14TvasUDDq113f4FSG5eDJiBBfa0OR0aFpDSXe/KnPIe/vOfpt6VfBCQoxKwDZmLvUmjHRw5Hh6Bpum6uh4XuVbZXarTgvwGjlAhAgLFTAavgI3OhNTDXdp7gA+oeeL1WrNdtLgKXsZh/A4s/eZoyBpxmgndcfP8z8XJH3K271RxmRmS3MHIDX33vs0ej06sLnHwramRW+sVkqfl3MFkfGZ4tNZ8byNW67GD2M2eED0TDL8gbEsw1fBQrkP6+jTExmIuLUAAAAAElFTkSuQmCC';
	//Image for the market function "Use them" equal
	image["usethemeq"] = imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAflJREFUSEtjZCAAwpPbHUBK/jExgGlcgOkfwwGQHMefHycWLmz8QchcFHn/+HqB8qZ5Sxat3vvtzoNn70H4PwEAU7d2y9HvVa0LtobGd0kQZWlIcpvH2k1HXv358/cXIUvwyW/be+ZNUmF/Kl5LK1rnz3389BVB3xDrkDfvP31o6Vu+EaulqcUTY1++ev+OWMOIVff1248vmeVTG1AsBYX35l2nnhNrCKnqjp+5/jYorVUDbmlD95Idf/78oSjOCDmic+rq82AL4+PrOUApi5AGSuV37DvzA5T6GUD5jJhkP2XKlP9nzpzBijdu3Pj/5s2beN0EsgOcp0NT2hM+fvr6mZAPAgMD/9vY2ODEIMfgAz9+/voRltJWALSwLQOYkr4SsvDzZ4JuwmvE7z9/focmt1YwgDI6MXmP0iB9/vL9h7C01gAGUJbYd/gCQR9SGqQgO+DFXe+MdddpHaSzFm1/Dc+HoSktBmcv3n5DyFJy5UFRBoo6lNKmqH5Oz7fvPyhLGVhcBKoE6joWrcMoT0EFQP+s9Rd//vxFtUIAZNnClbuvgzM8NgCytLh25qTrtx5TXGOAghHkM5yWITsgLKXDYvr8rU+PnLz6GZSciY27t+8+fTx9/ubHect3fcSIM2Jq4/D0dgVQ3glNbW8gBoeltkag1ApYLAEAIKtp4+xd+jMAAAAASUVORK5CYII=';
	//Image for the market function "Use them" 1 hour production
	image["usethem1h"] = imgPrefixPNG + 'iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAA8FJREFUSEudlUtsG2UQx01PPXLkyJEjR46coPQCQjjlgoJIUtITLRWkQoIEVCflWYFUAVEfJKpUoZICgUBUlAqJIkobmkdBVuq68Wu9tnfX6/V6n971n5kPOfL60USMtLI8+3l+8/jP54diu9ihkZkn+UhrX0x8DrJ9rdiv/G5/4N6Ym3vX3S1u5P2zw5MPT7x3/uL85RX7Xqao84NdrH1u4cffnbcSXy3Fhz94ZE/QF0amDywsXq8EQeh3Mnzfh240IFd05IsaspKKgqyhrNbQsBy0WmEkpZ9WVtVXjp0eeyD0ROLCubxEETssDANUdR3ZfAkFqYJyWYWqaNAUFUpFRVGuIEPvJPq0bTsCVfV67eQnl77vCx07/ulL5Ype7fxFMwgooILtrARN0+HZFkLXRmA16DHFZ+jY5Lchl1SktyXqghmBWrbbODJxZioC5X7/cPWm3Hmy1QIUzaDsZXiOg3q9TnAZDaOGgMBNhhLMNk2Uya8pClRKKp2lM9TiTvtjNak9fzjx2A506sOLy0EQRGbmek1kCxXU9BpavicC5wsScvkCfAK2PBeuZWErlcbt9Q1oqgoaJM1XodmqCDnjDnv/zOU1ARwentzPyuoWoWE6YjauWUeTAFyN2yDRyGWRhGs7oqJCsQSTkmmLpkotvU9V+n4zEnL52qrL6o/xnvWTvW5YAugxkNonoK6DkKrNFSvYTKZQNxs9y1IzLaQzNIYuIDPETsdHZ1426qSALmvYHrZzJZqZge8WvgE1A/dTdxE2faFGnapkXzabjfyypFSRKZRBaxXxu57vDo1OHyXg9DgpyeoGBmEIqVTFa0ePIXnnjgi+nb6HkJTLs2LrBtqOR6Ipgtahp3JSfDM+kjgR40Xv3r32advxhXBk2r3/gmcigdi3uLiI8fFxPHPwIJaWVyhJDZxst8llvTZ0OPFcjFfi2m/rPRXuQF1f3CgcfH3zb9iOC78ZUMsC4XvjzQlKSMPsuTk89fSBnla24zBj57r7+IsryZ6UOhycMQe/dXtTyD5HN05OUoTvxs01VOh629pKie+DbHb+Z2VnD+OjJx//ayNFizTY+gmk08fiGQTkkfHoIrfN65NnP6J29ai1ncL/BfKfwDun5q/03Kd8AZye/XbD8/zIJcCg7qe9CrtVyLC5r39JioXvZww9/vaXnyXv5vUHtXcv77iNXNlAWGcCQ6Onnvj8wpJ0/c9/TJbzXgB8RqvWjVtrW8b5S1eNnpn1LbHLeejVmUd5d+JjM1N7eYbGEi9G/hX6QP4F7nAoMfND3esAAAAASUVORK5CYII=';
	//Image to replace the OK button (in english only !)
	image["buttonOK"] = imgPrefix + 'R0lGODlhMgAUAMQfANHzpLbEoPb/5NH9eo7eLe390tb8iOb+t/L+2979oNv9lLPqa6HkScPwg+j8w9z4se39zKnmWrTwU6nrRr/1X878csf5ap7mOZPhLIrdIYLaGHHQAH/YFMDAwND9dP///yH5BAEAAB8ALAAAAAAyABQAAAX/4Pd1ZGmeaKqunTgGXizP9GDb8Z3jdB8HrQ7M5zMojkeDMblUGAZEGrATrRkSh2w2gd12DwkFtBojkXPXQ0HARjjUAjfcnRiTzef0esPfICACfAV7Gw51Zx54VQMKcHwQCHwIgX6Ub2KIilGMB5QQB4B8lJ5gBoiJHRWqq6yqnJZZo32SYAOtt6skFru8vbyNkYVYwcGzhgO+ybwkFM3Oz84GD8EOD9OSj9QAA9DdziQS4eLj4g0ABYIPDpTU6BsFDw0U5PThJBP4+fr5FOYQkpbcWRPYQMK+g/hIXFjIsCFDBgvMOZj1AMDEDQAs8gHQgIHDjwtJYBhJsmTJCxEWVmRc2UBlxpYsI1wwSXMkiQw4c+rcSQDigp8LIjBIGXToT487k+YkoaGp06dQmxKYOhUnVatVo2ptSiIAh69gw4odS7asWQ5AXpxdy3ZtWhEs4sqdKyIEADs=';
	//Image to replace the Save button 
	image["buttonSave"] = imgPrefix + 'R0lGODlhUAAUAPcAAAAAACAwQDAwYDA4cDBAQEA4cFBQUFBYcFBgcBA4oDA4oCBAoCBIsDBAoDBIsDBQsEA4gEBAgEBIkFBIkEBAoEBIsFBQoFBQsFBYsGBYsGBogGlqjmB4gHB4kEBQwFBYwFBgwGBgwGBowGBg0GBo0HBo0HBw0HB40HB44H/YFHCAkIB40IB44ILaGIrdIZPhLJ7mOanrRrTwU7/1X8f5as78ctD9dJeXl6atm4CA4ICI8JCI4JCI8JCQ4JCQ8JCQ/6CY4KCY/7C4wKCg8KCg/6Co8LCo8LCo/7Cw8LCw/7C48LC4/8C4/8DA0MDI0MDI4MDA/8DQ4NDY8NDg8ODg8ODo8PDw8PD4/////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAABQABQAAAj/AP/9u0GwoMGDCBMqXMiwIUOBA3HYmEixosWLGDNq3MgxI44bETuKHEmy5MWPN0ySVKIECRIjQ4D06LEjx4oTJlSOJKhTJBIoP7AIHYrlyocMGXp25Kl0408eRIVeseJBAIamG5lixVgESo6oU6s8YGFha0atZisOgYKCaFgpDkyUTWuRYI27ePPq3cs3LxAoJoa+jbKAhIW+iBPrJUijsePHkCNLftwDCgmpVqpIifIkQYgJk0OLhkxwhunTqFOrXo16B5MlI0B88PDAwQLPHySw3s07NUEZwIMLH068uPAcSZIQ8aEjBwsTJUJ8uCDBuPXrwwnG2M69u/fv4Luvujiy/ID5Awg0TK8QIbz7994JwphPv779+/jrn1iu4wAAAlJMwUEFFVAQQX4IJmgfQS806OCDEEYo4YMmBNHcAQR0QEUVKjRAQQMQTCjiiBAS5MKJKKao4oospliCDzkwEIAQQjThhAENNKBAAS326KOKBLUg5JBEFmnkkURuIAIGFjQ5gQQSRAABBAUMgOSVWBZJEA4pdOnll2CGKeaYZJZpZpkfRXTmmmy26eaXaQrk0Jx01mknQgIFBAA7';
	//Image for the ally (Thank you, Nux !  Thank you, DMaster for remastering it !)
	image["alliance"] = imgPrefix + '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';
	//Image for the down arrow (Thank you, DMaster)
	image["arrowup"] = imgPrefix + 'R0lGODlhCgAMAOZMAIStVElsPEhqO6fEhxxHEq/Jja7Fjlp/RMbNxvr7+oewVsXPxefp54mwWZi0laO7hTFGHYOleJeuecLSwHGMbWmJQmmFZVh/Tvf39zxQNDlJNHWSX5qtmVV1NOjs6Nrj2miIPkNYNp26hU9wR5S3Z52wgcTTwqnBh6K7mKK9l5KVku7x7qG/gq/KjZS4Zio3IoqmbdPe0Wd2Zevw65G1cqHCeZKygc7XzrTLk566jfn6+a7JjFVqRHKGXJCqdZ29ebDEq5e6anJ9cKa9o3KXQ0xeR9/h3ytEJoStU1t8R5KkkO/z7v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEwALAAAAAAKAAwAAAddgEyCTA5Dg4dLNheHgyYDBzeMCSg1MBSMHyIuJwErh0A/DQUbHIMzOSQAOw8jgxMsCkgtOEkLTDopQUQVEgY+FkwxNCAQGhk9JQIeER0vKhhGMiE8SgRCDIcIRUeBADs=';
	//Image for the up arrow (Thank you, DMaster)
	image["arrowdown"] = imgPrefix + 'R0lGODlhCgAMAOZMAIStVElsPEhqO6fEhxxHEq/Jja7Fjlp/RMbNxvr7+oewVsXPxefp54mwWZi0laO7hTFGHYOleJeuecLSwHGMbWmJQmmFZVh/Tvf39zxQNDlJNHWSX5qtmVV1NOjs6Nrj2miIPkNYNp26hU9wR5S3Z52wgcTTwqnBh6K7mKK9l5KVku7x7qG/gq/KjZS4Zio3IoqmbdPe0Wd2Zevw65G1cqHCeZKygc7XzrTLk566jfn6+a7JjFVqRHKGXJCqdZ29ebDEq5e6anJ9cKa9o3KXQ0xeR9/h3ytEJoStU1t8R5KkkO/z7v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEwALAAAAAAKAAwAAAdfgEdFCEyFTAxCBEo8ITJGGCovHREeAiU9GRoQIDQxTBY+BhIVREEpOkwLSTgtSAosE4YjDzsAJDkzhhwbBQ0/QIZMKwEnLiIfwUwUMDUoCck3BwMmyYUXNkvVTEMOwYEAOw==';	
	//Image for the setup
	image["setup"] = imgPrefix + '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';
	//Image to replace the 1.gif (small lumber icon)
	image["img1"] = imgPrefix + 'R0lGODlhEgAMAOYAAP/////+/v/++/38+/369/v6+fHt6e/p4+7n4u/f1OPc1tjUz9rTy9zRyNrQxfzIi/fEnvTEkdLGvfa/i+/BcO6+btK9pPSzgOe1g9e4lu+0b+u1dvGxiNe4ht60eOqwdeSxd/qradCxguinb+WnatOnh9+mdOGked6jfuCmU9CnZrSqnuWgcNyicdija+aeYrukkdqgVNGbctGadeOXZM+afNibVuOXXLeeitGaXNWaVLWcjtKUd9qXSKmckK+bibWYfr+UedCUSN6OWteSQbWVft2NRdqJRtyKOsSLV6qPbMWKRL6HZ8GKRZ6MgbuJU8qDTKiJb72CVNZ+NLaBadt7OcF8T8l5SMZ1W8Z4Qq96UsdyPqx1UrB3PbB1P7BxTLtpMaNnPKRkO3tiTptQKHpYM5BSLoxOOGNRSIBJNoFIOHNKKnk7Kmw7LGc7H10zGk4yJ0M0KEUzJ1YsIlArFEUuH0wlEjgiGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAAALAAAAAASAAwAAAeRgACCg4SCChYIAYqFgytOPzUnTFRDVg6MAAtRJRA5ZW0xWGoEjEVaLDdgb2wbPHMGjDMtLhdpcF80WXE7jEo9HSAyZ1wjV2hAhQVjKFVINlBiEVtudweDA0EmE09hdHY6Lw9mcoUJRykfFV51FBgqQms+hQ1TRhxNTRJEIRokMJg4kpDxwABABildRAjAxLBhIAA7';
	//Image to replace the 2.gif (small clay icon)
	image["img2"] = imgPrefix + 'R0lGODlhEgAMAOYAAJBcMPHWwMahh7R4VMdQHP727ci6sNt6VqtlPsltT+rl48JrQtivpbaIZ96FXI9YSOjGr+m1iNphNrxqPvPr3dGomc14VOVsSZxxSeCeduPHvPB8S9u+sqFWLubhwLteNP///8iwlNJpRcmKacldMNdrNeSJY9JuS6VkT+17U9CCWt62l92HTcl5Wvjz8PjdxeDEvLxwUfTQsKZhPNephfHg2JNhROrYz9jCs8OWduFpKtW3pZtzWu/mz8xvS/B+W8lyQOzMsfR+Q+qDVqxmTPDHp/fy6+ZrQMyZZrdtS+R1U86betSunNh9WeaWaNFgK9uzo7+Pcei0kp5bOtdxOeR6S869tNBZF//69o9jVu6BPqVbN8SRZvKQYOJ2SeHRx61jQeTPvfDh29a2qs1ySs2DYNh+Uu6GVMxyQpNaOPLWxdBrP7eLdOa1jORmN+ZzSr9jNNCslNyynMOAXfb19PTjyaRmQevYzqN1V+aLVb1rSv///wAAAAAAAAAAAAAAACH5BAUUAHsALAAAAAASAAwAAAeygHuCglhYg4eIg3Q5RWFhAS8FiYcKAxF4KAlmQZOCODtsNHMnKV1FnXsCMhQhZSYZEVxxapKDYndLIzwDJGQ2aWA+DhCHVnUQIxNUWiwICwcpVSuHBh49UWhvZ05JTUpKXipyhntWGA0qJVMAM3pAWw9EC2ZSRntfHXAlQjN2FiJVwGRp8WNDnhp7bnwgcEUHmglrJLghE+PJkQtDEGIZU4EJkzAcGDBgogEGFCgMOLgIBAA7';
	//Image to replace the 3.gif (small iron icon)
	image["img3"] = imgPrefix + 'R0lGODlhEgAMAOYAAA4SDOvhzaaOdXZrXM/EtFJKPv///7Ozqj05NIR5aPDu62VXT+jeyTAkFYZuXKWXkV9JM5yEb9nSynZuaCQiG8y/r+3n45N8bGlUQ6OSgVZTTd/f3Ec4MYtzZPr38q6bkSEbGMK1pW5XSD8xItvOxIuFepmGeOXXvH5zcHpnVGZWRkxBMrWjlK+bj2lkVOTe1/LlyF1JOYBxXMO2raCLcz0rGCkhGUM5Mt3TyaORe3VwZurl4HxtXPn49/bx7JRzY0dEPYt7amZfUpaCbsvGv7+3sDInHJqFcR4hH3JVQ1NRUK6gmpmJfHZjUPDmzVlLRYFzZEJCMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAYALAAAAAASAAwAAAeFgAaCg4SFhocWPoeLGxo6BAEMAYceOEsPSkgALicwToUKFSEVHxw2FFEFMzgHhAoJPBAtLCkqIUcrQAVChEUYTTEdOQIXDwsNHAMjhDNJPEFQCUMiIDc1ND8OhDsdHSsoCAMZRkwXIYczDilPICsyQjMkiwoZESYTJUQ9PYuCPS8S+PULBAA7';
	//Image to replace the 4.gif (small crop icon)
	image["img4"] = imgPrefix + 'R0lGODlhEgAMAOYAAIhNJfn05+LHqcyogumqOqKFYuGRKvvlxLp3Jt+ybP///+DEicSISODQwPHp3+GqY+vGj821ncORQ/j39OGfT+CpUPHIdu7Xr/HavNx7GujHnPPo1cWgbtezjfG6W6JSFtvBpvfw6NiBKv778LiQZ+zdw/DXs96+oPKWI+urUOjUtuy8Qfvq0//13ujRhPjIbOW2ctS1g//mxfzx4d7Fn8mMWuzRn82NNvbbqfrt0vHNgObYvNq9jP/89uiULvTZvOfNlv/55vz59ezgtv/x5evbzPbq2Y1VJfjsxt7FlPfm3vLGefTAXd69pfCyVeTKivG3dvvo0f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAFIALAAAAAASAAwAAAeCgFKCUkIhg4KFh4obMTlGIBsbJyo9ij0BQTQ8NkkcAxdAFwIHAYMBQ0gLC086LzAQHT8CKqWDPTsRGC4eK0wWF0QNIFGHMyVFRjhOBChLI4rQUgESCB8k0dATBUcANZXYgyMPIhk+LeCDQlApBhQs6IINCRU3DBrf4A4HJiYltYeBAAA7';
	//image for the crop consumption
	image["img5"] = imgPrefix + 'R0lGODlhEgAMAOZoAPn05//89vPo1fvlxPz59e7Xr/DXs/fw6OQzDNlrTeLHqevWvd4xI+GfT9E6HuurUOjUttMrK97Fn97FlPZICeVPNtwmEPrt0uW2cuWjceObmfHNgOiNMN6+oNezjevGj92AQNS1g/MiIvrkztJWU/TAXeezlMVYSPHGrNV1Ls2NNv/55rcpEfjr3sSISPfKwenCsuF3VuF+Wezdw9R+Xdx7HNc5JtmYhMxgXuJWNN6vbe+pmefNluFpQNGimvHIduu5Qutzatq9jN2zf9FwQPzx4c0eFtBAQNvBpuWhhMWgbsyogvbq2e5xNNJmUNebhetrUbk3JNankOSZWPjIbPFYFfvo0euIIuzRn+SWYOjHnLhOPfPEw7Q5QdZjROCpUOGRKsuJgMVAMuvc0++FafI7CupcObxeTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGgALAAAAAASAAwAQAeRgGiCaAQHg4KFh4poFQxeKTUcQUeLaC9JMVAJU0AlPyYkYVJWgwEAKxJCWBNKSwU8BQoDAJVoLUQOLGe1gk0URj46XyouWgFoIpUCIRdMSAICHRDHhwAyVT00QxtUGB8eKE83tINFCzA7ZDkgV1k4vINcJ1FbThrwZghiGQ9gDSNoIiyyUcZClzEDDBiYQe5QIAA7';
	//Image to replace the clock.gif (small clock icon)
	image["clock"] = imgPrefix + 'R0lGODlhEgAMAPcAAAAAAAoUHCE5TkROWVZjfnF1fFZlh1lphllph19pgFtril1timFxjGJyjWZzjmZ0jGd0j2hzi2x3jGh4k2p4lm18lWt7mXd8gXB/m2x/oHmDjXKElnCAmXCAmnSDnHeGm3aEnXiBln+JmnOGpXiLpnyLpHyLp4aIi4OHmYCImoOLnIiJkZWLioCPq4GQp4mQoIqSo4iVqIqXr4uaspSToZCerpuWoZWitZaitpWjuJ2ovaifnaecpKScpamkpKCms6OosaSvvaipsKyvs6+zuLavtbixt6OwwK25xLG5xLK7ybO90bjEzr/DybvF2L7I1sK/vsi5uMm7vMTDxcLK08jO2MjQ2svT2tXFw9TGxd7Gwt/LydPS1tXV1tLY3t3V18rT4dLZ4dPb5tXb4dbe597l7uLGwevQzOrSz+zQy+3SzuDR0OLT0OPT0uHZ2ezU0PDNxfHRyvDV0PDX0vLZ1fXa1Pfc1vPd2fDd2vXd2Pzj3uHl6eHm6+fp6ebq7+zn5uru8e/w8vPj4PXk4Pfs6vnm4v7m4fnr6Pns6vPy8vDz9PDz9fH09vL19/H1+Pny8Pn48/j6+/36+f/8+//8/P///P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAASAAwAAAjMAP8JFNhHyYwRGUjkqDKw4T9IQySEoNGDhw0UD0R0cRhIRQIhbOzEgROnTpsXBJI01BHBDZQTUeScoYOFxY4fCKwILEPBiKEsFwqg0bNmQAAflD6UiPTPiQMtauZsWVHkCxANUyRZQqLAz78lEMykeXOn0AYBTSyptcTEAJ9/YBpIyYNHECIuRBKttVRjwqJ/jlqkGHSI0KNJey2NOXBkoBgLMP5USmzpCgMXjRqSMVEhiBdAivZQibHgBiOHAp/I8NABAwcQOMJYGhgQADs=';
	//Image for the speed icon on troop tooltips (Thank you, DMaster !)
	image["speedl"] = imgPrefix + 'R0lGODlhGgAQAPcAAAAAAAICAgQEBAYGBgkJCQ0NDRAQEBISEhYWFhkZGR0dHR8fHyIiIiQkJCYmJigoKCsrKy4uLjMzMzU1NTc3Nzg4OD4+PkFBQUdHR0tLS01NTU9PT1JSUldXV1lZWV5eXmJiYmVlZWdnZ2hoaHFxcXNzc3R0dHd3d3l5eYGBgYKCgoSEhIaGhomJiYqKioyMjI2NjY+Pj5CQkJGRkZWVlZqampubm5ycnKGhoaampqioqKurq6+vr7Ozs7S0tLW1tbi4uLm5ub6+vr+/v8PDw8fHx8nJycrKyszMzM7Ozs/Pz9HR0dLS0tfX193d3d7e3uDg4OHh4eLi4uPj4+Tk5Ofn5+jo6Onp6erq6uzs7O/v7/Dw8PLy8vPz8/T09PX19fb29vj4+Pn5+fv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAaABAAAAj/AP8JHEiwoMAzOBpgqGKwoUAiQrAM1FIAAIATDgs+iTFAgAIQN5hYgWARRsaBQDQIsFCCQgABBkQQ6ZCiy8l/QxoAcHHlH5gWBCwGMXOzzAsABnwIDMOiQAEYCSSIGUhGBoqCZDxgYCJwSQYAF4r8swGAh0AnIQBEMAjGi8AcCQqoCCPwCwMGWo4sAOCBYcMpJCxuQAJmoA4AFgocoEHGYZEGAig4eGlhRpR/XiIAeKDE4ZYZTmlwufJjREUFVv4lWTHFoRQNASIYIVjjgAAWUzOO4aEAgAkqA6eI2NzjJhcTAg7sIAhF5wcpN7NUAMCBK8ElE2AQvdkEQQq6BrncAxwYEAA7';
	image["speedr"] = imgPrefix + 'R0lGODlhGgAQAPcAAAAAAAICAgQEBAYGBgkJCQ0NDRAQEBISEhYWFhkZGR0dHR8fHyIiIiQkJCYmJigoKCsrKy4uLjMzMzU1NTc3Nzg4OD4+PkFBQUdHR0tLS01NTU9PT1JSUldXV1lZWV5eXmJiYmVlZWdnZ2hoaHFxcXNzc3R0dHd3d3l5eYGBgYKCgoSEhIaGhomJiYqKioyMjI2NjY+Pj5CQkJGRkZWVlZqampubm5ycnKGhoaampqioqKurq6+vr7Ozs7S0tLW1tbi4uLm5ub6+vr+/v8PDw8fHx8nJycrKyszMzM7Ozs/Pz9HR0dLS0tfX193d3d7e3uDg4OHh4eLi4uPj4+Tk5Ofn5+jo6Onp6erq6uzs7O/v7/Dw8PLy8vPz8/T09PX19fb29vj4+Pn5+fv7+/z8/P39/f7+/v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAaABAAAAj/AP8J/FcFQwMcZwYqXMhw4AkAAApoGYhFCJGGGGFAhGCFyQ0QCgQMiPEE48IuKToQEWFAQAAKJSwI0ADE5EIzQSASaAHm3xUXABoMaYhCBpmBYiQkgFGgAIswAn0YAPCizMIIAEI4EcgDgI1/RS4AyLBEIBMMHo4qrOIBwIIjWhgw+CIwjIoCCXII9NKTIRkaBwpYAKBjIBgkGyCSmGLzn5IHACJ4+RdlhswADigIaFCk8ZQVSf5ZURBxxI8rXGg0nbGlsUAxLAQcqKHQSIQAGqS4FtgDsgjGAqmYAKCAx5jdUj4EhaJwxwEBJrjsNgNjQlmFTDgAqJBl9z/pDMOkBEDQJCAAOw==';
	//Image for the capacity icon on the troop tooltips (Thank you, Brains !)
	image["capacity"] = imgPrefix + 'R0lGODlhDwAQAOZ/AKqlmopuQKyMVpqETFdGI3psSqaXe6ySVczJwpWKcqSdjuLf2aWKWWdQLJqUhYRxQ3tjQLy3qtnTzk09IlpVRod9aP38+mFLLMLBtJ2FW/f38qmOXKWKVpd7RpuOaaKGVN7c1vTz7m5bMpODXHdfN////o12QqqPWqOFRaeNV5d9TotzRYtxQmhVLoBnP62PWJl6Sop1Rf7+/f39/aKhmqiGVI9xRaSHUph+TZGAZJyFYWFTP21WOqiLXY9ySuzp5J+MVJF4SZR5SOLh3Z2AVGVOJ722pfHu525iNrCkiLSvoLe3sk1EKcS7ZVlKNF9XPpF0SH59aczIv/n595GCaXdqMW9qUIVpPGFSNI99Tp6LWnJaK2tVMmpfPquKWNTLxMvGuKSRWKuPXefm4u/s6aGLUqSPUDsvGISBb3ttQIJnN7iuYYBsN5iQe4lrPIVwTZF+TIuAXPPz8/b19WJUKKCCUaKMYpmBULCTW5mAVJ2HU2NFJpp8SVZBIZ1+TP///yH5BAEAAH8ALAAAAAAPABAAAAfsgH+CfyFSVkoIDksyQwgWglMRCR5rdDwXbRFoURh/cxUtF2xNdHsuTxVgITQlDg0rKy5VSA8EFAoSMnIyCXYnLCoHYSJnFBgzg0cjQFkiDDEEE1gAMoMWcVVpLSQtRS4kfQDIfwsjbA8PJBB5KgFbBAB/GgZ3dRspH0QMHTZXF0wavmjhAwPPCwEfOJgI4uaCk3kfYLDgIOBFihQDBqjpU0GGDj81fEDhIEaMECE4uEwA8ScDCgE9OJwQw4BFBhc7FghKYubGhwMvDpSBk6YLS0FkPOgxUcfLgBgFHIwZJOiHkRwQ3lBRoJPqn0AAOw==';
	//Image for the bookmark locks (Thank you, DMaster !)
	image["unlockedl"] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAQCAMAAADDGrRQAAAAAXNSR0IArs4c6QAAAYBQTFRFAAAA/sSU9XQV+4Ym/ta2/d3D9nEN/3kB7qsT/+LI/+ra8LMc/qJS8bti/ePP/4ES/7p+//37/vPq/+HG/c+t/pY8/+XN/eHM9deD9oMv/8CI+3oO/7h5/4MVq4xa9oQwp4ZS9n4n///+/5Mz/7Rx7JwW8MdK9+Kz8a8R/atl//fw+Iw5996g/byI7ak6/uTR+uvI++zP8bAs+ee38Lgc9Kwe78Nw//Tq+KFi+JRJ/30I+eSu/frx+oAg/PTg/+3E7Z8E/6RU6Y4H+HUS99WMuZFU+JxZ7J0t/tGr/u7j7qgE/7Jt/6le920E+9mH/KNZ+n0X+okw//v4/9Cl64MF6oQI8cs+6Y0PpYE8++zJ/+7IqolU88JY9chU765H8bMWzYYdmHtL+u/S++7U/+jU/d/J/9q68L4o88V666YN/4AP76oK17h89duh+XMJ9t2m9r9l//Xt/phA/XkK+3UG++Kn9tKF//v3/6BM8cxa+7F3//Hk8LBO+u3B9slM65cFJqizLQAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2AsOFwYDc4wxCQAAANVJREFUGNNjYEAA82AeUU1WQSQRpWoZK2npElsRJMFCmeIqcX3dADYWhLI0dkYQ7ZFnCRcLkmLmAtGComxwsXKVQE8wo8iXQYtLTFhYmDNFrMKWFSzGo83gZsTvqCzLnyWr7M0iBBJjFWFQDKuNNLCPMky2s2FMhZojmV4pIZEjl5uvniQlDhWTN1GLjUlUMCvTMRbgg4nFc3Bzyynw8mZYI8Q0uE1No11rClxK4WKS2ZkcHAkR7npxfj4wMUUvh3qnkNBwVaM6K5gdFmxMUODsLwQRAgAIGCOyrkYbMQAAAABJRU5ErkJggg==';
	image["locked"] = imgPrefix + 'R0lGODlhDAAQAOZ/APvx0qmIUvnqtc2ra//Fk/+bQ/p2Cf6xZvuROvp+HP15CZ6AT/6GHfV1GPRnAP+4ePnpuP54AfGtS/nowu2dFv7Opv/aufvmqu+0DfXEXvGuQPtzAfCvE/RoAf/y6P7Gj+2ZFfeWT/XCQf+RMPTRfvS7X/nqxMOaW/zbw/iQQOeDBumLB/qlZPPFVvK+NP/JmPjmve7PNf2WP/bYkPK/We2dBf+hTv7x6PvKpfydT/TThv2rWP7y6fmNOv/DjvnqwPK2If/Qpvd5GPDAHvbdo//r2Pvfp//hx/K8Yv+1c/25dfDVR/+iUPLTb/+/humQE+mQGfCiHvyFIvrciPz35u+lEeeDCvhuAemOD/+rYP+vaPHKVPO0OPO6PPvhu/CtIvjnuPTHcu/IK/LEb/uTP/+7f//Mn/C6F/zBkvXblvjovu+lBOuUBvh3D//XtPG3Se2dLv+pXP7fwPXYmv+fSvKrF/fSg/fotPRrB/qlQP+oW/9/DfqMNcGZV//z6f///yH5BAEAAH8ALAAAAAAMABAAAAesgH+CFQUMDExHgoosGwoIPQZ7boo4VzIegjxkI0WCKQp+in83Bk6CCTaignxxp1qqfwhZfyhtBRZBLwQEaFJ6fnhcXh9KBwc7eUZyZg5Ldz9qMBMmAgBUPg4xTSQ6AwNzRGAAZQ5iWy00CwtjJGkQDw5DLl1vfSdIYTMC8GdAdVEBAkgoYedCEgcYOFQB8QQKHA0ZptDpsKYGmxUqrGCh8EVEhBANQooUKSRHIAA7';
	image["unlockedr"] = imgPrefix + 'R0lGODlhEwAQAOZ/AP7ElPV0FfuGJv7Wtv3dw/ZxDf95Ae6rE//iyP/q2vCzHP6iUvG7Yv3jz/+BEv+6fv/9+/7z6v/hxv3Prf6WPP/lzf3hzPXXg/aDL//AiPt6Dv+4ef+DFauMWvaEMKeGUvZ+J////v+TM/+0ceycFvDHSvfis/GvEf2rZf/38PiMOffeoP28iO2pOv7k0frryPvsz/GwLPnnt/C4HPSsHu/DcP/06vihYviUSf99CPnkrv368fqAIPz04P/txO2fBP+kVOmOB/h1EvfVjLmRVPicWeydLf7Rq/7u4+6oBP+ybf+pXvdtBPvZh/yjWfp9F/qJMP/7+P/QpeuDBeqECPHLPumND6WBPPvsyf/uyKqJVPPCWPXIVO+uR/GzFs2GHZh7S/rv0vvu1P/o1P3fyf/auvC+KPPFeuumDf+AD++qCte4fPXboflzCfbdpva/Zf/17f6YQP15Cvt1Bvvip/bShf/79/+gTPHMWvuxd//x5PCwTvrtwfbJTOuXBf///yH5BAEAAH8ALAAAAAATABAAAAfRgH8QBCgUC1I2f4qLjIITPHMaGjkbeiGNjAMFTywuFnlyG3CYizhtR4wABmWXpAUUEIwJAhlRpH9McY1IUCN2tyoLjQQ8dxVjCBLKFQkpEwSMEUUxDkAiHA5pHCJKA5hkIFV8WC8+WTBiPTsAmBYYZngXF2sdbG4mYRmYDR4zJVxbwHyoUWeFjAf7PHg5oEBBhw8MGJzRgbARvxMKaNDQQmTPmyF0KjJqgEENmgMHvlwx0qJLkyXtQCT54SfIFCpWSMTokwNThBsFAggdKlSIk0AAOw==';
	//Image for a bookmark, external link (Thank you, fr3nchlover !)
	image["external"] = imgPrefix + 'R0lGODlhCgAKAKIFAAChAf+AALjogArGASnGAf///wAAAAAAACH5BAEAAAUALAAAAAAKAAoAAAMlWFrRvoMsNsNYAWgQBAZKVwhXxnhCQ5gCkYIXOAaFXE+3su1LAgA7';
	//Image for dorf1.php link in village list
	image["insidev"] = imgPrefix + 'R0lGODlhEAAQAPcAAAAAABAQEBgYGCAgICgoKDg4OEBAQFhYWGBgYHBwcH9/f/8AAP4ICP4wMP5AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiSAP8J/KdAAICDAAQoGMgwwMEBBgwMOBiA4b+DBSz+K3BwoEMEGgUiAFAxAQADAxksWMBgoAEACRwOXNmgwcqBJAEQEKiSIUuBBA4eELjAAUMHCwQeEErU6ECkSg/u/NdzZst/QWUSXVDzpkCSJlHyXHn138sE/z6G/Dey4lcAGS1yBGDRIQCIEimGLIgw4cKBAQEAOw==';
	//Image for dorf2.php link in village list
	image["outsidev"] = imgPrefix + 'R0lGODlhEAAQAPcAAAAAAAgICDAwMAB/DkBAQBCGHBiKJCCOKyiSMziaQkCeSliqYGCuaHC2d3++hQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiSAP8J/OfAwICDAww4GMiwwMEDChQcOFiA4b+DCSz+S3BwoEMGGgUyGFCxwQAFAwMAABBgoIIBDRwOXClAwMqBJAcgEKiSIUuBCA4uEAiAAEMCAAQuEErU6ECkSg/u/NdzZst/QWUSBVDzpkCSJlHyXHn138sG/z6G/Dey4tcBGS1yHGDR4QCIEimGLIgw4cKBAQEAOw==';
	//image for the center map function
	image["centermap"] = imgPrefix + 'R0lGODlhEAAQAPcAAAAAAAATfwx0FRB3GRZ8Hxh9IRl+IxQu/yQ+/yBG5S9J/0NZ/0Ve/0xj/2B1/xyAJSOELCmJMzCOOTaRPzeSQTuURT+XSE6gVk+gV1alX1ukal+pZmGsaXe4fnizvIC9h5up/5LHmJvLoKXQqbjbvKLjqbj/osvT/8LgxcvlztXq2ODv4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQABAAAAiHAAMs+EewoEGDDgIgOMiwIIMADRo2VBAAhESGBwKc+DeBwkWCAQJoKBDAwoqLI0KaCBCCwAeGKyxIKBEgQQATJi5AQFHwA4EQOD2oxGniwYZ/AirgDMmUKE4OA1JA+OC0Ks4HPP9doGAVZwYJJwuKeGA1QoeGKswSfUDiYwYKGCR8LGjAQMOAADs=';
	//image for the distance
	image["dist"] = imgPrefix + 'R0lGODlhDAAMAPcAAAAAACpIgjJWmTdkqzhstDh0uzh7wEdhklJkiFRmiUNjoUhwsFJwqFZ7t1J/vTiExTiMyTiUzTWn1FmEv0mAwEiGxEeVy0CYzlOUy1aVzFacz06x2FKh0nCWxnyey2+k0X+hzHiq1Hus1VvB317D342pz4q02Jew0pW62qOuxajT5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAMAAwAAAhZAP8JFDiCxMCDAlVIkLAB4cELESJwcDjQAgQIGgZ+CCHCBAoMD0Jm+GegpMmTBioUWMmyZQEK/zp4AFHihAMCOCdQXDBgQAOKCgQIYEAxRYAABygKRJAAYUAAOw==';
	//image merchant
	image["merchant"] = imgPrefix + 'R0lGODlhCgAMAPcAAAAAAAAEBQQAAAACCw4GEwARAA8TAg8WDgQZEg8cFRMLAB0WBB0aCRwgHxQ0KSYoGywhHTUvHyInKy0tISwsJC45Kys+PDo1IjM1MjgyNBxFMzNFNzlLMyJMQjZISjxbXj94aU8/L0c6MUZFM1BQTktXY1xkT0V5Y0B4d1B2a2JfQGxeQ2xlS25sXXFsWHl6anR6el+LjmKupFXRyW3NyXLTyoKAZ5GHbpSRcJyXeZ6bfJqRgJ+Xio+hi6eZjq+qjaWikbOti7GtlLiykKamsrvEp8XFoczXt9POsdjUt83Hy+LW2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAKAAwAAAhuAP/9W7HggQqBCIOEgJBBwQ2E/3L4WEJAwA6ISEQoIWKhQhKIPBp4QNGBA8R/G1LQkKGhCEIbBU7MqAGih0AjBgKUiPEhgRCIMAY4QHAA4Y8WGCQcMTEBiEAWESiQ+DfkAgMdAl2MeCGQAQMcAQEAOw==';
	// image de los tipos de murallas
	image["empalizada"] = imgPrefix + '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';
	image["muralla"] = imgPrefix + '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';
	image["terraplen"] = imgPrefix + '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';

	// image para cada una de las tableCells productoras de un recurso
	image["r0"] = imgPrefix + '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';
	image["r1"] = imgPrefix + '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';
	image["r2"] = imgPrefix + 'R0lGODlhRwBKAOf+ABcWDhwxBS81BSNADydCBDMzQCpGAjFLGjpAP0FGLT1DTTZRFjNVDFhCHj9ONjxVI0JVFEVQK01PLElNUD1aLztjEU9SSkJhHk1TT0ZeKUNhJV9TKFZTQVFWWltXOlpeNUdvElNhRU9oPFJsI0twI05tLFZqLltgWlJsNmNgSHJeOGNhUl1hZV1sSlN5Klt1RVl5N19xVmRuXleBHWxsWWdtZGJ4PFeCJm50SmxucWpud1uEM2CDP216ToNxS2mDUXx4WW+EX3OBbH2AV3h9dn58bHh8f39+ZHl7hWmQTGaYLGyUPXWRTHaRV4SJeXWdOXSaTHqRbYSJg3yTZIOJi2+mJ4uLb4iPZHClOnOmMIiTXYeMlo6Lj3ekSImUdJWSaYCgWYOfZIegb4eqRn2yRZSfcnu4M4+gf56cc5WcjJiWqZaanJ2cf4WwVpedmJecpZGwaJGyc5+isJixdqWohpayfpyviqKrkKirgZ+xf5+xhaino6Ksn6errbaulKqut6i6gaLAd6LDc6TAhKTCgKfAk7W5lqnBjK2+lrG1v7K5s7K9o7u6orS8q7m1xr69k7O7va7LiK7Ng6/Lj7m8xr68wK/TgbTNmL3MkcHJpbXUkLPUlrnSlsDGyMDFz7vRo8TLscfD1bzRq8nOobzVn9HKo9HIrsXMusbLxMDZnL3dmcjN173eoMnP0b3ij8HcpsLflcTdocbatMXcrcjcp73iqs7WxMzZu8HjpM/cqb/jsdDatcXkn87dsNjUxcnipdbXvtHW2MfkrdPT6tPV4NrbrtLa0czjtNHZ4s/jvMzpqdXhxdvb1tfgztnd4Nvc6Njoztrrutrpyd/nzt7rxOHl6N/q1+Pm4uTo1+/nxuPm8PHrs9/v1fDrv+rr1Orp3+bu1OTx0ebt4ujw3ujt8O3v6//xtuv43Oz25Pv3wP/1wO/26/35tfn6u/L08f/4u+781P/2yPL09/v5yP76w/f27Pr53Pb49fP/7Pj88vn7+Pv7//v9+v/+9f79//3//CwAAAAARwBKAAAI/gD/CRxIsKDBgwgTKlzIsKHCffv+RSz3T5+/iBIdatxokB/GjBC5sGDmT59FfyA5qnT4USC/f/K45JApLyLEixJtQtzJcye/lysb+kP5z6M/eTqYbTmRQ9+/ixGB7nv5s6rJq/p4BnVI1F+fLdV05Ohw8WJNd/eu1lurL627t2nvyb26dSHQp0YqtarEYkK1rEPXNWuGDRy4cePQnTM8bZm1dZDXyb2Hs65BiHf36SBGrlKfCZDkOXWHypZhbtyghYOGOrU0aNbEYZv27Vu9e1MtEySK8Z67HPK0OfM8YYKUb6dOgZvGGBy0adOgvZb2GtoyUIx8fXOXtaXlewJ3/lba0kobskSe1rw50UjarnPorFkbxy0ct2mnFkGT/vqWITR++MJdUboNVFJE8hiBQA7PtIJMJ5C8kQMGUtgDjhNpjAOONfVxg4oTToDCnyiioPEFG9ql5d1WFuW0BhI6INABJKs8g8x5ayCQRhonnDCNfeeEcw4qaxDBBzzhLOMfHV8AiI07JRX41F0stOLMFgq8EcyWDlJiRAcdJCJFGvBYE4406LiRiA4TgGKLNbeIgoghhoBiG2UrruQPP045k0M1rXSyhg5/3BiMM6tA8ocOjvzhBDXcSEMNOmusIscbCrBgDJyy3OLpnRnpxg9OfaxRDaLI/EGFgzd6woIR/p6EkkgN3KADDzeNKKINMZ2ooYgQUYjiqTTLcYdSnhuhxKc/q1ZDTjWrOPOGlTduQQULb6ziSQ5CNHNOMkK44UwwqGgTBQk8iJBGnNJMM049TiG70ahHGRGMPOSQ0wqshq5CBSQYdPBHIgDzcQ43pyiyxxqopHEBFkqIcMcdZyByCzjrmOSRUw5xbOA/4OmTQ77aXEOFG50Eg4wzckCCDJZIyKqGEPhIc6uQ4UChhBlVdJFECTyIgQg046RlkjsdY2STRENdc0I5wRnTSjXIaPPMM6sYc82+HbyRyBoyJMbhOdCcIwYUXYBwgwsu+FxHMtagY9E+4DG050BUCeTO/j459EEOvjeS48yNz2hDTjDVBEPEGhBKcYIMTpyyDD7c8NFDCRqUsATETNQhyzTY3KYP0kIJ1KKy/lRihDzXPHujNsIRA/upp/4BSTCQJLLFGkbUIMMy4ZwyTZx2NLFEFk0gsssytpRztEYQme5UP/6s4Yg2zl6DTPbM+MJMOc9ueSMynniSCAs6QEKEcvZ4s4h8ssQBRh6ySLMMMOXIRVHppu+DUj/34EIl8nUNYxhDEWkowgpS4AEJrOAERuiDypAxDG2tSQdvaMQ6wrEcsoUjHPCAzn5iIxfSNeQnUfpHOfDRjy0Qo3DVUMQRUnAEOmSiGPPYxiPQAAQOSEER/oNzUCgcoQMWSIEPfADHOaYhjSXKJzrLmEYzxFGO/dltKFNyRyVWgAEuPGMYzujDCqzgB3vEgx7qUMc20hgPHq5gDwa8USi2gAQEcGACe1gHPKhBjSguQxqeWgQoUHENEzLkJXP7QwcUkQMkeCIYexijOcyhDnpY8h3pyCQmi/GFN17ji56ABCSMkIg/yMAOdThGMmQRDWjcgg5WYAMbGPG9nkTPIJTJSh9yMAFPbGECOqjEH1bAhmxUEo3psKQm25GObWSDDSvoAxIcCQlFeOIPb3CCGMJQiFnIQhTJiIEXGMEGKzTCGFYcyC0LUhJ/sIAKfYhQDnKwhiIAoRSZ/rSkOtKRxnTMgx7M9CcwgJADI8BIlJ14w1IQ8QkxdFMWsghCJhgBhFl+rypVCU9H/tGKHASqEp6gBBeKwIFHvKMdx0SjJZF50nbQwxyP4IAbVoEEKqCiD39AQg1i4NA6FOITn8gEDhaRhlk24xo9+clB+lGRhXlCG8EgBjEqYc9uvIMdylzpPuMxj3ym4x3vOIIUVqHIVUFiC0ZwQBB+MIcm/FQPHwAGMNigiG9cAyg/wcyKRmWva1TDasRgBg3oMI92sGOfyVRmYjPJTEvS4Qi4i1G2EvEGKURhDjYQgx7i0IM7gMIJd1gEOvXBp6tEpSDUY4YRqtEJeTzjhYLF/qdh04jGSiZzjemIRzK/+ogUuEwbkGDBH0LhCTfEQBlwsIEeJjEHQ1ghDaFFxTd4ghXv+IM0XBhO7K6xBw7s4p9aVeYxczsPrvpzGx7AQNXcsAUMUkIRLUgCIAAxBU3kIQIJSEAQznCKa5DWI/vIxz66sxN/2AMbNOiDIxIhj3FdgwgeiAc72gFefaqUHu9Qxzy6etJ5eAAA/0qDOKRQgDdAwgk/QMEUgnAJQlTgCUpgwhUaIQ6TBDgrogEMePohjRicoBVc6ETinNEJLnDAqvSo8EotPA/aNrMbHNBBAdSwMi/9wQ1nIEUcXiACLRACClggwxLEAAqkdse0O7lH/j7EQYMUNGMPbhBcVB3BhRXItpK0ZXJK6ZHJUqwgEWqQAzHGBwkh2IEQkhhEHZrQBDjcoAtQqAMoxGG0trRFLvvoRz2sYQcZoCKGzjAPBRMxUjY0OcPh1WeF/TmPL6RgAmoYxo2c4YlGnGESgZDEJgZRiEHEYQc7iPQtrlGTrBi7Rf04Byq34Ak5wG7QyCAHJPbgBCB0Yx7vWHJK4xEP22o4HkAoAhJK7IzEOSEEU7gAGAix60FsYhNxEAQhCjFFk8ijhKJBST4WcQhWdKIToRjGMLAXjEVU7AohoEM8sn3hC3+1Hdsorx9W4IhVvEERtoBEB6JAARtkgABxIEQk/nY9iUhoghCfsAZaTDKZtzjlFGfYBCxsIQ5kvLATi7CDolmRhx7goBRNXrI+z3jVd8SjFEBwAiqEEAMRvCAKZ6gDBUZAgAEcIAyDCMQmxBByQpBiGusYsDzG/ha7XiMNosCFK0Qh2hvxwQ6fsIQlJKEKOwDhC9vQtkq5ClaIoyEFXohABnhwgyUkYRKbuAADUHAACmSAEJYgxCAGEYlAkMIa5RhwW9xRjmv4gg9T4AUvakH6yQ+iFsLYRC14wYpa4OITdfiAFiIOUHbYnh2ongcnP3AFMOwAC1WoAhY0EIYfaIAEbOMB8euwCUI4nxCXmAalS+gOcjCjEXboNy5Y/kEK0nuf9ML4BSta/4tclAEHQ3hEebn9zzPOAw9DwEEZEMGDJZDh/l1gwAEMwIAduIAEMPAAAbAAhHBygTAIn7AM4kA3vuEOBbQIiEAKvJAKtUALnPALscAJGshcnJAKv1ALrEALuWAHOCABQ4AGpRAP2ZANpQB/JtADZQAIGXABI7AEXdAFPBAAB/AABFABLgBsGrAAJQADkUAIgUAIh3ALKkc38uAO4mAMmfAJrCB6sUAKr/AKpCAMwnAJiPcKscAKsfALdaAHepABHzAEQ8BAH7CGQ3AFeoAJkzAJTRAGcQAFFcAA+hcBGsADF3ABPFACI1ACQvh8cVAIt7AM/vfQhO4gD+LQDLJwCaywCcqAeuL3C7hAeqSwfR74C5yAAhqgAUtAAiVwgaSQCsLQC4hwBWLwCpeQCpsQh4TAAAZgAxAQADfQBnYIAQ8wAA6wAGGgCZLgfJMgLHHxFuUgDrcwC6+gCqyQCqnwCk0wB8LgjKzwCr/gjK9wCMhXAWF2A5qwfds3C5dQB5eQeqygCq/4Aw9gAyjwAA+wBDfAACWAAiLgUJNXhJoQCZPwCbJwFcYoDsswC+PngbHwCoMwCcLwCsKgDKmgCb9AC9DIAF2ABWagBBWQBF+oCqrwheO3feO3CbgwCA9wAAugAYAQB4w2CCInCILwbpFgcpvA/gnelGac14jJQAupwAuxEAvPKAysEAdhcAjCAAsP2QthQAJkYAZY8ARLAAO0cAxXqAoEqQrXaImtt2jMx24xOQiH0Hy6NgiagI6cQAqygIj45oTTAFHOqArbtwk7OQmTFwZ6IAyqUAuf8AID8AQ8gwUVAAfKgAm/EH7KgJOwAAvj94E+mQqR+G6ToAnvVgvwNgmsoAmccAnCsgwHUkLHOA3JIJA8qZPb53qbcAhSOHrJIAYvRgZt0AYlUAe1EA2/gAhhEAafMAuWSAsguH2xoHrvtgmsgAu4EAuTsGiDYIWX8AmHiA3+QBkN2HnyIQ3J8ArnGIapgAs+WQuYgAuj/icKQYACSzACEKABKDALuoAIhRABVfcDx/ALv/AJr5AKsVALXqiYVJkKnPAKyjAINqALs/AJhYAIomAL9bacbTF2VSQOTNSZUPkKuPAKm6CQ5wgLynAJIqABDCAAHyAGdnAMupABBnAAGnABGVALIScMwNmModmRl1iNCkl6hVAHiAAKzdB5Q3EVmvkWkIEO65APsYALmzAHg2CNYbkJuqALrzAJG6ACx3AMXEcAQwhsF8AEJCAIqqCQuACfBQmGwemMqUALs6AKg6AHiLAItmBXzlOjLEd9LqcPkAGV74YLv6AKylCQChkLKqACr1ACF0ACFwADLqA2JGAAINAG/pGgmysanBvZk7NQCIcgpmNqC1pTRU/BE5OBaZVWD+uQDMcgDDyJC2zpo6TnAw1wCE0ABj9TAjtwAyQQqEsAAknwgV54jbUQC7xAlbRwCXlAhnawCI1wClpTDVU0FGiaZphmEWmRD+gwDp05CxCpmMqwCb+QAg3QBJcANAQAASPgAndYAmBAAiDYo613pbUglZxwCHlgB+i6CIvgq9dwDVAjDy5RWm0BEZaWS0aDqejADcegmJ5ack0gBnVwCD5VCFNwABXQBl0QBgcQB7AAkdKpCrCgCpewCZdQCGQYWo3QCKjADMyQL+XwFigBFRVREoBhrJp3afXgDuBwk6zA/gmvOAiAgHibEH61kAE20AWuoAp1cIGwEAuf4LKUOQmYUAiPsAiGsAiMcArMYKbuSg6LSBD0ikLGdiBYIRoBNg630Au0gAmckI8x2YGkMI5xEAca6Zuc8IXiiAlqiwmPcAtuAqnMoDWt8xZ0a0gCARUnoTHHtieXtg7jAA270Atrq7ak8Am9IAqf0JmXUKSiAFEQVQqjkAvFUAzA4A21URviwHny8LFN2ITIQrLCWqMnaxIk+w3jMA3FkAujsLq7AB3iEDfj0AwkEkXY4A3W4A3ekA24Ww/b0bnVt4ggexFpgRChS7JZwSf02hYkuxaIYRiWux23kQ/lsA6vWw75tXAbvgEv/TA6+1C3ddu9c1EZBiGsJyGsUVGyNqp598AW+iAaouEbclETRsOAJWE0lAEllHER5cs/LjEUHlERx3ZplYYVfFJs9majeWsRWcGc8kCy8kK8wloUGBG6mjcUuYQVx2taGzM3eWvB7VS8RKEnXVGjaVES9VC/RmO8NoYV9buc7VS+WBTB4wvCNFzDNnzDOJzDOrzDPNzDPvzDQBzEQjzERFzERnzESJzESrzETMzDAQEAOw==';
	image["r3"] = imgPrefix + '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';

	//image reload (for update all villages on the 'dorf3.php' pages
	image["reload"] = imgPrefix + 'R0lGODlhEgARAPcAAAAAABpAthlDuRlHvBpIvCZGtyNJuRlLwBpMwBhQxBhUyBhZzBde0Bdi1BZn2BZr3Bds3BZv3xdw3x9x3RVy4hV15RV35x575iJTwiRhziNm0j9oyiF+6Epkwkh30keC20WS62eM12iD0GiG0nuP03qU13yS1Xqa3GWa5GWg6GWh6nmm53qs63mu7niv74ag3YWw66S55ae96Ki55bG846fC7K3E6q3K76fG8KfJ8rDA57DJ773L6rDM8rfN8LbR9LzS88rT68rT7MnZ8dXc7tfe79je79nf8Nvh8Nzi8d7j8t/k8uDl8uHm8+Po9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAASABEAAAjjAP8JFFgkCZMmTZgkGYjkxsB/RJT0cAGCAwcQLnosUfLDAhOBRoa0uFChpMkLLXKUdCJwiAoKMGPKjMlSCYsIESSkwCEQRwoJOHE6KbJjwgMIMJoMbALk6IOnTpKscOAAhdKBPqhqdeCEyYcGDWoYGWgDrFmwS5poYMDg4b8jTJzIlbvkX5MMCxa43TuQiQcFCmTw3ZvkRIIEIa4OJJIkxsKBOjAcQPBCsd0XCDbwGKikxIABBEbMEDhjBIHPJR4KESGgtevXIoS4DWLCQIDbuA2YCMJXCQ0SHQoU6ECChpKHAQEAOw==';
	//image small map for link to travmap
	image["smap"] = imgPrefix + 'R0lGODlhDAAMAPcAAAB/DgAm//8AAP/YAICAgP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAADAAMAAAIPgAJCBxIcKAAAQQKKEy4kMBBhgUgClyoMGKBAAEmWqSIUaPEih5BgmSYcMAAiSQLmEQJAMDHhi1fRixIk0BAADs=';
	//image for the Add bookmark link (Thank you, DMaster !)
	image["addbookmark"] = imgPrefix + 'R0lGODlhEAAQAOZ/APV+AfaRA/748/qdVfvKpvl0CvV6APunC/54AvZ8JP/7+P/t3f/9/P/49PijB/2rDv/59P3Dk/7z6v/ewP/HaPeBAvx7DP/u4P62OPzBVv+xSfidBv3o2f/Kc/eQRf/z6fyiM//cr/7q2fSPAfuwKvzQsP/FYvuLBf2uDv+xa//69fuLDv++T//9+/V1Fv+4cP25QvR2APmwJv/VkPSDAPWgAvyqDf/Kmv67RvecBf/lzf/w4v/KcfRpAf/37/iPQf/MlPaEBv/Vp//dpP/gxPipB/q0gP/YtfvJo/eiDvzLpf/isf/Nof/XsvzUtv/IbP+mRP2pEf6sE/+vF/iaVfyfUv+TJf+vGPqoGP/17P717v/VmPusbvmLNPytbv2safaCLf+9dfuZJPhvAf+jU/+mV//DXP/RhvWUAv/Xk/WBAP/38vehBvmmCf2pDvV5H//Lnf/8+fy6RP2XP//+/fafBP7AV//lz/+ybf+/U/++Uf7CWPx9CvRpBP/27v///yH5BAEAAH8ALAAAAAAQABAAAAezgH+Cg39ZO4SIiE0piY0QeAgijYgTYSBck4MKEVsZBReIDAo+C3dHQkMUYnM3RAt+cUxlZC9AIUtpT3saUFZ8BV4qVSswHTNnPCZmdnIyQT9afwwDFVgYLHl6OCRJAD8Ngy0DYwdSU1dRGz0e4IQfFm4PNg8HOX0ciToIKG1sDg51YjhJBOdEETQGDASoQcNIoi8B1CQgUAIMgBFUEnVxEUGAIAVI3iSgQ0iBEgmJ1hBoFwgAOw==';
	//image for the Add this page as bookmark (Thank you, DMaster !)
	image["addbookmarkthispage"] = imgPrefix + 'R0lGODlhFwAQAOZ/AP/69v+rQ/l8GPV+AfaEMf/RlfqKL/2qDP3Zvf/Kmv6SMvuuI/738f/x5v/kzf/m0vacBP/48v/PgPlxBfumZf/v4f717fu7i/dxCv/27//HlP/BivWRAv/GZv/59faEA/mscf/8+vmlCP16CfyMBf+1MvzHnv/BW/ZsBP/Fkf6ubf/Ytf+DFfulYvuzef26RP7n1fypZv///v/s3f7q2fqhWv/9/P57B//Sqv+zb/mAIf/fwv/69f/+/f+6ff7dwv6mWv2HIf6zLP/VsPvLqP+sYv/Oif2taf+fSfZ/JvigBvR4APicWPqpGf+LJP6/VPuWB//UpPmna//coP/frP/79/mvef7r3feNQPSMAf/juPy3gPhzCPeTSfyWQv+aQPyhL/7z6vmeDPvBl/qpbfusbviECf2qaPeiEvqmH/2pYv/AdP/o1f+uZ/6jNP+oWv+zXP/hx/zRsfuTHP7Xtf/Ylv/Lc//Ej//NoP/Ibf+/eft5DP58DPq4h/+9gv///yH5BAEAAH8ALAAAAAAXABAAAAf/gH9/PAkbgocAFRmHgkM4EYdVGgqQjBU+OIx/AG13kD0rLJWMO3pHNpo8RRshGUgqmn8NGkYCP7EJCjMafAiHMiFVO1F1YDEVHj2HcSxnTgYwIQ8PDjsreFp1JyNfPikadCFsBjojLX8efgFwawVUUxIdTwFuc2ZlkGoYNzWCHlsT0rzIY6fDiRcL0HwAwUAQkAn8EPVBIWZBiRJCmkAYYKWhoDdcbpxD5ILEgZMHlHyQ4lFQDi5BDDxglMCkiJtKBlywpEDHGQy+BFXJAUUEhwEcIGRhEubQjj0UZqAgc6iBl41YxnRZwoEAjUMqUFwJAUKAB0EOMCQhYuFPBjkEKZbc+lNFAIgQbikYOEvDRANNFkzAoKuAwiJBFlzs/IMqlg1lG1y0/RMIADs=';
	//image for the bookmark spacer (Thank you, DMaster !)
	image["addbookmarkspacer"] = imgPrefix + 'R0lGODlhEwAQAOZrAP/+/f/8+vZrAPumZP/59f/7+P/JmP+SMf57B/x0APhuAPmAIf7r3fuiWvlvAP/69f/Gkvy0ef/BivqCIv727/+rYf/Ej/3ZvP/Ci/2qZ/dyDPdxCPqRPvumYv56CP/s3f6RMvytbPulYv58DP/t3f95AfqmZ/+JIP/9/Py8iv6nWv2NLvp+F/mIL/+EFvmKMv/hxv+aQPuxeP+uZ/VrBPqtcf/Sqv/GlPyqaP/69v+oWvhxB/uyef/Aiv/48//17f61ePxzAP/p1f/27/mrcf2QMf+MJv/27v7s3f57CP+LJPqpbf/Ytv/48vdtBP/9+/dsAPhyB/3Kov/79//59P/Wsv+CFP7n1f3YvPqILv/t3Pd4F//ewf3l0/+fSPyUPvt5DP/VsP/48f2pYv6vbfhzCP2HIf+IH/+mVv717f+wa////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGsALAAAAAATABAAAAengGtrDwYSgoeIYTZihwU3RVSIkjkzFk1rAEwuPpKdDxUYAUdeIZ2mBgcfECMXpp0wVjhKWVcorodPQisLHiKYt4hjGwgNaydnQUBVMSUJJGhGCV9rKjvEaw4KAjJSDlACDBPaHGs6UUkdwJJqZWYtXeqCWgcLGRpY8WtcYCZINEv5yDhhEKDGFgLqprAgEmDNkAEvEAIwVQDEAAqHfvBIcatHhDSCAgEAOw==';
	//image for the bookmark edit (Thank you, DMaster !)
	image["editbookmark"] = imgPrefix + 'R0lGODlhEAAQAOZ/AP/x5P7z6v7t3/SdBv/8+fq3hv/lzv/69P/cvP/17PiYUffYS/VuCfpzBfhuAfV5HfVqAffZhf/Fkfq8jvmqcf/7+f7p2PZ/KfV2Gf+3d/K/NvVqBPeuKP738fu+j//+/fZyEP/38f/Djv+cRfngqP/38PVzE/nplfbcb/+zb/isMf/Hlv+9hPXaZvTCSPTRYfnWZfeCKvXHWf+4efq6jPffefp+HP+gS/WcEfXTav/o0/jhiPbcaf+MJ/7IkvrbofVxEP/GkvXUJP/Qpv/TrPyrVfLMJf+uZvfQPPfhZvmwevz03P7v5P7m1P/Ytf7ox/PCQvadIvzJovLLQvjNTvnaafjWUvveqvjaU/G4Hf/XtO/DHP1+EPixNf2gUfu5XP+oW//jyv/kyvzln/2xcfZxEPdvBv+SMvqdMPSYFPafF/u9jPjUX/XMLf53Af+8f/qHKvnnifvqw/SeCv7q3P+JIP/u3/+fS/nWbPnfo/vuzP7uz//Il//LnP/o1P///yH5BAEAAH8ALAAAAAAQABAAAAfYgH+CgwRBd3aDiX8fJYs6TiIsBH8Jk4IJWnxhRAgAe24jK2deAoIARwB9Fno5UzVPEmNmTYNDGSdQUSBlaRpJHBSJGWIaGxMBARMbWW0xlwYpcg4TiR4OLQ5rATdvBi8gHYkhXBFVag82aFRbQOGDB3URC3MmAVIMRhAeiQg9KBAFLAiCg8dFAxEhDhiQ8IPNhURkvsSRUQTMDB9XlqhQMshPgwUckPDIQ2IHjC5CMAj8I0DBAwoXIGCxguMCBQYKSgkiwORPhQIDBtCo8IeOJUUsMTxwlygQADs=';
	//image for the "Close" button in the Travian Beyond Setup
	//------------------------------------------
	//Modified by Lux
	//------------------------------------------
	//closeButton = "data:image/png;base64,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";
	//------------------------------------------

	closeButton = "data:image/png;base64,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";
	
	//Image to replace the sawmill (g5.gif)
	image["sawmill"] = imgPrefix + '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';

	//Image to replace the brickyard (g6.gif)
	image["brickyard"] = imgPrefix + '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';

	//Image to replace the  Iron Foundry (g7.gif)
	image["ironfoundry"]  = imgPrefix + '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';

	//Image to replace the grainmill (g8.gif)
	image["grainmill"] = imgPrefix + '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';

	//Image to replace the Bakery (g9.gif)
	image["bakery"]  = imgPrefix + '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';

	//Image to replace the warehouse (g10.gif)
	image["warehouse"] = imgPrefix + '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';

	//Image to replace the granary (g11.gif)
	image["granary"] = imgPrefix + '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';

	//Image to replace the blacksmith (g12.gif)
	image["blacksmith"] = imgPrefix + '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';

	//Image to replace the armoury (g13.gif)
	image["armoury"] = imgPrefix + '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';

	//Image to replace the  Tournament Square (g14.gif)
	image["tournamentsquare"]  = imgPrefix + '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';

	//Image to replace the mainbuilding (g15.gif)
	image["mainbuilding"] = imgPrefix + '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';

	//Image to replace the rally point (g16.gif)
	image["rallypoint"] = imgPrefix + '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';

	//Image to replace the marketplace (g17.gif)
	image["marketplace"] = imgPrefix + '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';

	//Image to replace the embassy (g18.gif)
	image["embassy"] = imgPrefix + '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';

	//Image to replace the barracks (g19.gif)
	image["barracks"] = imgPrefix + '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';

	//Image to replace the stable(g20.gif)
	image["stable"] = imgPrefix + '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';

	//Image to replace the workshop (g21.gif)
	image["workshop"]  = imgPrefix + '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';

	//Image to replace the academy (g22.gif)
	image["academy"] = imgPrefix + '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';

	//Image to replace the cranny (g23.gif)
	image["cranny"]  = imgPrefix + 'R0lGODlhSwBkAMQfAElfLFpnTdzo7ousYVaxE5ZjDauwsnKOTxEUBUmXECxXDTVsDJu/bY2Sk2R+QF1ACzVAIFu9FMPM0dnznLt9EX6DhaClp6/Jfra7vj+BD290cUNLOn2bTZidniQ4Df///yH5BAEAAB8ALAAAAABLAGQAAAX/4CeOZGmeaKqubOu+cCzPdG3feK7vfO//wKBwSCwaj8ikcslsOp/QqHRKrVqv2Kx2y+16v+CweEwum8/oIEcBOK8TikGZ4clkFAi5+KBQ2BcKB2N1dnYKEAcAelwDB4SFGR4LBB4ODAcOHFYAC3UEfZAKHgkRBJSkGYtREB4RfqUIooCtpRERGQS2bVIBk6a5t4gHEHakprURu1CcucARnQEidAgZpcd3mlEAzcfPGQt627XACcpQDhkJpLbAGdkBd+kR6u5NHACVDh/boAl3CR7MeUCwAQKBBQAELWHAqo4HDwcG4IPTyUMcEQ7wIVDoQJURBpb2/TFUSSQAfB5G/wx48ACiNAcBDnBg8MGBQiEKAAZ4tGCBHYgXaO5LifEBBBIKYM0iUC/IhqRwEPjsAyiSBwgANDly0BHCgw3ZPijIRQrQvJs+AHyzdefhOosemCY4ekBqJIB+FIjAR66sxx0H1nW7ww7XpFIWO91aECEuJay4frFFcPQHA8bWgIlaxy6XT1e/Pv2S1HmcTsuekH2TF5qsAl/sEgAza83YPH9odait6muUrc7O7naz9mwBHFN+yCkIuyOn1Z4ZWKWTPC+XnwQ9Zf+KBCCWqZ6/Dv2Q6DZgRuPQ09EDCAjQa5+AOuYE9Evd3CASFejb12e+T6YPIfCQTz+J0gYfouRET/8f+xnBATWdyBYJTQFA4ABcd1g4AgdcSSIVBDEpAQAbT4mCAE0MbMRAdwGhQJADEAjlBANyAFAZKx9w8BUKECBwgSMBhKQEBwPImKImF3JYwC4oDvNQTZOMYo4RuyHExkoPzBTQAQU8AABLLBVAAVGjkFXZEej8hgtAHjzQJQKUUcCSnCxB0ONVArrGHBEX/vYbJQc8QEEBhMpZAAQDJCpNd5H9dmYRCtYHRxsrUWCppQ/IOAIAstkHx55CMNDfe354IBQHYl66AQkrQrCBJNdl0KAREIgiyQJ2hrVSqhQ0OEwFEmDgUF6aFjFAkCNO+QGWqe7nwAYWSCCAABUGoIH/hlUwIOil0QSwQQMGTDuttAJIsGq2YVrqqgYNdECuuOKeS4W2hRbgQQMaAPsuvAJUkJsTx27gppgFbGAtBuRKUMHCGmAwLVYb/JuEAxpYoIGgBINYAcICGADnxwgovEEHBoCFxLEBaFWxBRUMrG4A7k47EMgCBoDBzRg8OsQBNmNw7QYGWNBBBRAUSsHIFtysAc1wamAABhXYrAGoPgywQcU4Q9uBBQ0QbfQDGjjdwAZkgwyzBUFXYEAHOvvAwdk4d2AzyxVcfOmY1gZFU6IFfduuAQY0nPOsPTAQgAVo44yBAfiSLbDRLZIwAQMMXJBvBQ0kHfjCFVJtgxzQtosB/+IdkFwB2TZ6wOsDA0wwgQkHhI255g3ULoEBbd8QMNc3N2BtAERndY/LcjIw+QkaAJ/501DDLMHUOwTQHdDBYlChRplwwCHxrE9wAQoMdLA8zhZj0ADhNtyDDwQNjI4VPtlr78C2mLb+wQHfl3AA5iQr/jTuASgWDRKFCUwU5H3C0972VneA130gfyS4QNf6l7isgQgIdkodBzChPa/c7VAq4AC7EBc1cN3uetHwQSJSh4CTWMiDvJJTA0/gPW8FoEJkuyFWIOC5GWxQUwwgko2k9xDiWaoADnDgB5RYuWXxLCAWEqAOFHU/BXIlKxcISADg5CYw4e+BFyhSRAiHCSr0FU4E2ksUjRQRxJp4yVsyCaAJpMgEGglFKBdKgx73yMc++vGPgPRBCAAAOw==';

	//Image to replace the  town hall (g24.gif)
	image["townhall"]  = imgPrefix + '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';

	//Image to replace the residence (g25.gif)
	image["residence"] = imgPrefix + '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';

	//Image to replace the palace (g26.gif)
	image["palace"] = imgPrefix + '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';

	//Image to replace the Treasury (g27.gif)
	image["treasury"]  = imgPrefix + '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';

	//Image to replace the Trade Office (g28gif)
	image["tradeoffice"]  = imgPrefix + 'R0lGODlhSwBkAOZ/AINvCeLbtrB3Aurjvd7r8k5KN9i4DalKGywvKnEwEDImBpqUdsSGAoU4ErvIzsaoCvPsxaumibaaCLezlsnEooiEZbRVJerHDnyJj1lFEOzJDqqzuQYFA8RXInZjCp+agVhYR6OcdHp8a4uKcmdpWPLODpaSbVZbW0YyBCgVBOTCDqqQCUE4Hk0jCrnEq8rWu8K9nWVEAo9AGVE7BJlDGqSLCHRNA10pEIWOktLLp9zVsNfQrHV/hWFoa3p2XL2hCdpiKHFtVmJdR5Gan2ZiTmVWBYxfAkZKRez4/H2Dcp6orZeACWZMEN6+DsjU2mRuc5W0x9Hd5Gx0eYWVn21yZLauhNCxCl5iVT5DQTY8PMx1S0dNUHRrSoKfsoqRflpiZ2hUHnxVApqjjnY+IvCRYq1lQk9VV/NtK6KrlKu1nZCYhXhsK/bSDmJVNXtzTo1NMHJdFB4fGYF2Ob+3i7adFJCIVsvIkI+EObmzbotYE5FQDMLNs7irQ+XCBdjlyAAAACH5BAEAAH8ALAAAAABLAGQAQAf/gH+Cg4SFhoeIiYqLjI2OhWlJVEmPlZaXhFlfDlM9UnuYoaKHJFI4GEMOG5SjraIgW1JYZjxDVzUPVgZNKhcXBioGD3R3roZ3ABK5VswPzs5Wyg8/DxLWKwpYWE84PTgkKxq+4+S+JTUrBq0+Hg8rQnUoKAJGMzE2GUF1HjUl5RpNHixZ4kEBCg4pFAD4YeBCkxkoPKjwV66EhFBt/pCwN0NBnIQMQq7xYCNkSCMALoiL1kTcPwMAEjS4AcQCDRkyWgBJwDPBjQYJDhw4kwDEox5OnGRBECdOFigYMkyBwoVJFyhCMoBgwsGgh5bjNJQAwOBMBxkHZARtIFQGjQ40/8hYOJCgRYcOBSpMGAAhwIc2HhUhjZJER4ABIhAwERBSwRQkUioMCKBjB4UcEQqwsAIgRoobZxvgpAHkgBYtQBpYaFHGglsaESDswMKBA1MWPg5PUCPoCosUhbI4QXKCSJACApKHtKFgCIENMwSsMRzgMIk6IRZoz17gw4ABJApwKBAhRw47JnyEWC9kR3UdVFjEEAKCwmEYIlqNODGkh5cXJIzQ1wQBBKHeeiaAUIAYaPSwwGHVDZDDCCSwIEIEH0SwAAy6KcBAGEGAAMN3FORnzImEuHDFEUsVwAqKMMYo4yII9DCFEkqcgMaMPBIiRhYn4IADD1i40OORV+DgHP8STmyQ3xUKLAEAADVQuQIeR17CwkISsIBBFKYgEQUIElDkiwYGGCBOCQ8UYQUbxiSxxA9L1MBCEgFM8IEJASAAABvljCPBEjMgEKQDPWyAhANF1LDEA2AFqpIKKLRyBQAexMAECxxExxgDApQEagopqKmBChL0IumZBtAhABA3tCDDWTTI2kI7F6iwxCUkcCAFDyxA0QUTVEDBgwIngKFACijEgEIGoM6wwgqqBmrRDEzcBYQMoPF0QAMN3GRBAh20MMYbFrQxAAxCcDACI4OB4F51AeRgghlZLIXFUlu4sV4IJiBQhEoO5THGGEDhpMUYB7xRBk1C3cDTGTSMq4D/DWHEUMAIFPS1bgotpGCUIUc4gAQGmGFhQ3KMxYDAY1Kg0Aa91e1AxAJuZIDpDB7AUUEV6f3G1k5pWQAuF0EYpgMCBRQAwgc6fDfABF6I4gIICGxAQBRtCBAGgfWCF8R62o0QBAILfNcrUwggUJu7Ho/A4cf0hGjf1LxlWYkIIsAAgZ4LULBABN9NcITeiCeu+OKJ7FsbAoczjiICSuDgAAFDvCu5K2J80SQPDijx4uZW75vKEDjkTbooIpyAwQmJbkACIWCwcIIXJqzeCAn89QB6FEd48IME1DwjEKa6I4K1GUogQcAXSniRai8aVPNAQ7nSsQQfMpqwBgBryEHH//c/FOGBB0zUSbyUKwy6xRBKEEDAlxv08085bPwAwIkFoJBMESnAAgJYIC01qeCAvThgE6wgkCJkAQMbGMwThlADDbhkVRcoQTFcUYAVWGEJCblHBogAAwpEQAx36MMFz9SEKaWAA3HgQdsQ8AT/lUksFpTUqVgwCi5IwApw2IMbmGUSUNUDBQpQQJl0qIJoSCCDFmQDZwBgEJCl4CslMNMF1nAJEMRgBi+MAwu4UAGDKAdUoopWDVoSkAdg8AJsAMANxvAwGtzAaHYh1xgSQKoicM8SGfmDR7LwrDzEIIlGCEkMjOCsDKAgBQCgyAIDpYIH5CEFNpFJAsrwhgMAof8FB5CYXIDQAS3MhQtUiIMj2BaHqWSgWCJgwVR8YwYb3ANUCijCE1foCzZIoAU3OIBNOvAGMpRBKB3gSQvOYDShsKUFTLBlGxZQgCwsAgdRiAICcqCDKlyhbTGEQhAycJUTIGALTMECCBRAsAxaYQUCsEAyZ1IaC2zLWzehwRiSeZcK/M0HYLAlEyrgA4SIARFPiIITCkMvHXgBBEcQIPROUIEdzKEKVWBPEQDAGT3YYCbgOkDFNDmrBLiGBjIRaQIUIATC/Y0ITLsPyOrCw0J8KQojyMEA4mME5YRBlkh4AgkmQzMKECErElhgNcCYggTQoAHJNJpqUEqDm2DhPW7/a0pTQHCf0RliCybDQQ58UICeKicGXiLAFGZgBBFMxjIBIMII1lOBpplArgGgAEbnEAKyhuwGZ5CBEEIgL3p9RzYL2AEMckC1RbjASINwARXAkEgbsAAHBHDAYuCQA8P6oALZWUB2fJCFEXwnRGJkShyEwKEcXMYHnZ1aCuhBBBDEFgaqC8URsEkANzDACN6hgHd8MDbtmGABdV0ABKI2NRLQx20c4BsCIiC3DtWNCHeDgVdPhIYrkCACIlDQEQ56CC9cgXBEhYDgPgADvUxmAmFgAAoUhCEQkDd5heiBC9SAgBF4gbqxCYB/8UvgAhv4wAhOsIIZcQQEzOILI1vw/yKOoATURQEHEmbECSpXCweYKMOIyIIZntCDExwhDSBOBALMYAYs9GALKE6xIdCAhSb1YAgnyK2MBSECHkhhOFHggY53nIYjYGALPegBCCC740GAYApRcMAQkIAEKjSZEFT41QYcgAMlWPkPWJhBERQABgDUIcNJ2IIZhrABKbRuBDNYCDWogSk5uEHBu3UABMUkgjlRQxdNSBNn4OCDBJ/gCaBTRRQK8ENeOEQCNaiBmgTShAKTgEptgN8QeNA8NUjggiWwQg2sII5TBUMOq2MBOqxhpydgwBNDwoH9wtKEH4yjBAbwwK5Q5IPv5YJ41ZizM6ixgiUQzxpLwAIPtv9A5R44gASffqNKWoWiETDhhxIAgJiX0IRAeztNgWYgpD2QBct9wTlK2MASeBmoU8HBGFjIQKQzoBUTfKAAa8CDB0hNyYBo21A9+MIXeoCKJZSgCe2UFJsiLAo3AMCDRbABE7hAINeeQA4r0CI5PmibH3PaCTjIZQ2Syu5xsIEOrsgAHawAhjY80h4S50IEJoAHXfDSIlI6yNtqowAPZHxQF7BCtchRghWMAgSjBkAE6pDEkNAjA/cAIwBUwEtxqGkFDzhft60wPJjUYMxFMEAJVogmLoZC1T/IgBxmwAEUgMokyTECEj2Qw1z9g+orbIINbDCrz0hMIW86lQb2dwn/BBAyAymIAwhGwCyWodEkYVBAS9C0RAxaxAgWIMMbZBLMuUgsVrp8ACYMgo/Eu6GMClAOGKL5qQ8BwIDT0PitrdCCcIWy9mdgS10SMKuZpKUN21VEIBMvn0NyIJEmiYHTIaJLlTRhBT+o+gWKwITS3OAmWiBDB8b1kwSc5vM0aQAHgn8IHmLBS12IwRO6UIAYeOZiBoFIT1NQwVLfPOsCEArnS8MToKC0A2NwRwlABmTQAB8AARDFCDD0BcfSBV3wSlCQBOTUBb8xAx9SEgKQAQMxdGFBKUAhE3OhBWUAFL73LWmhFvYkA0kwTnLHAYxgCuiEADxQAFdgLDMwFUIA/wZdEBUxkBxdEWkceAHDoxYJAARmIRpVNRcdkBahlDCwoilt4AUB8DccUDWJwANOEAVmEAJBwC9PoAAYQBVWAQUF0AZQ8ARN0XZUx0IGUANj4BpFAy5BsRPh4jBFuH0yMAY5AAEQkAN/sUgZwAFXkAhPkIVHMC8BIAYskgVPYAZxgAFE0jZZMDYmkALrphJjMQMywBYdAC5LmHmmxBPBFBRMOAZeQAQZsHcZ4AN+MwEIoUqHkFBRIALUESF9mBhxwBRXcFEIEgJt0CgXsATFVgZrcQBlQAZBIRPhEhRLCC460QAZUwBp04cfoBsgEzI7kl/ZRIvvQQQf0QIokDVBZf9aOpADMFAFc+ADGaBLpEIu33IT2zcuaXET9cQTs9IGFPAdESAEcTAeubEuWfCNRaGNs7gDU8MCGXBWWdA8TyAZNcMhE0ACbbAQbYh4oMR/T3UaoeF9wtQBQoBVj6MACBAEXaUImzA/5hFmLEMPskQAUsABhEMzOUAE3kMl1WAFHlAAPvAbNPEW4xIURzhCSuM2A2RX96E5iLAFTjA/O2ACLJBIZ6UAmMUD9rAXDUWTJkAC9LZaIFABdoBRIVABLBAyQdF5CWAC7UEZREACD8IXAQADOxABQ0YIWGAyQ5ADsWRWitSSSjAPXPAenSVX22ECFVBXXjAZIMACG/KVXFD/AAqQACxgAoSFiBIyAljDITqgXYqABSfwBVSABiQwWYzBGGEQQ5llgWDQWTqwF0FQAduhHWKZNuABAlpFHpVhBxdVBWk5NcdnBCRQWG+JlI/gBy4gAplCOQTgBAXwIfahA4QjAqA1mDtpWhBAVrkokm9TBURVAXMzAQpgBEYQIt05l4/wAliATVxDD4SzAwYpBMWFXJ8ljSRCBE2DAIn3QhWgA1HDnfeRer7JWrphhaJwBFMgP0cAdYQDA9UoAuqxHWGJAB9JVJOxAEIgBOIxApa5ANU1ABGQAuBJAtilG+RXCWkgBjH2BycQBH6DgEEQAXXFcH8gBiRQjRK6AxnyUQEfQDXdWRIgIgQTIBskQJ4nkgQgIAInmghqQAJ7MRkwoB0TQiDrogAsgAZoEFFCmjyW6QMLoCcTMDgk8mU75gVFFgctOgERcAX3dWVqeiSBAAA7';

	//Image to replace the  Great Barracks (g29gif)
	image["greatbarracks"]  = imgPrefix + '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';

	//Image to replace the  Great Stable (g30.gif)
	image["greatstable"]  = imgPrefix + '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';

	//Image to replace the  stone mason (g34.gif)
	image["stonemason"]  = imgPrefix + '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';

	//Image to replace the  trapper (g36.gif)
	image["trapper"]  = imgPrefix + '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';

	//Image to replace the hero's mansion (g37.gif)
	image["herosmansion"] = imgPrefix + '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';

	//Image to replace the  greatwarehouse (g38.gif)
	image["greatwarehouse"] = imgPrefix + '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';

	//Image to replace the  great granary (g39.gif)
	image["greatgranary"] = imgPrefix + 'R0lGODlhSwBkAPf/AODtz+rHDuHatX2KiWNsZ87dzNjn0eDu2CA3EGKROi9GGkBeJFJ4L+f12uPx1sHNtOLw07fCq9Ddwc3avpulkNfkyMrWvMfTuaq0nqOtmODt0en32Oj21+Xz1OLv0eHu0N/szt3qzNrnyuv52uf01uTx0+Pw0q+5otTgxb7JruHuz7S+psXQtuHtz4qRf5KZhsnUtdXgwPX/4+DryYGHdeLtyd7oxnh9bLC4m1lcUNvjs83Up7m/lbS5ka6yh8XIlHR0YOTjrLm2ehoZDpGMU6ehYaSiiVBPQ9HKjUJALUpINuPdqezms93YqNrWtdjUs9bTuN3UltbOk2ZjTW1qVuXgvdOzBu3KDO/MDs2vDOLBDseqDKiREcGoHaCMG8avL2RaHIR2J7ilN6WWNdC7SZqMObWlTKGVT9jJcMa5aLmtYYB3Qy0rHpqTa9/Wnp2WcIuFY3x3Wl9bRby1i4J9YNfQo8rDmuPcr87Hn5SPc46KcIiEa+HatKWghOrjvObfueXeuOTdt+LbtdjSrdPNqcnDocbAn66pjKumiezlvuvkvujhu+fgutDKqMvFpO7nwczGpezmwOLcud3XtcK9od26BNm3BbqdBManBerGB6+UBbWZBmdXBOrHCubCCaWLB+zIC/TPDOrHDOnGDOLADIdzB/HNDujFDeTCDdi3DK2TCu3JDuvIDunGDujFDubEDty7DdOzDZV/CeC+DsCjDLqeDLWaDLCWC+vIEfXRFXZlCtm6F+vKG7adF1VIC82xHe/RMODFNfDVSPXgcufVfVdSOzg1JnZwUrGofKKacqaedqujerSsgriwhr+3jsO7k8a+ltPLpKmjhuHZs9fQq7Suj5uWe5eSeNzVsNvUr8/IpcO8nLmzlJ+af+DZtN/Ys97XssvEo7+5mby2l7awkrGrjqKdguTduOPct+LbttrTsObfuuHatuLbuHNmMpWNaSUhFHRqSWdYL1FCHF9PJ35UC1A3CXFOEXtWFpRpHnJKB2JAB2tIDIpeE6BxIP///yH5BAEAAP8ALAAAAABLAGQAQAj/AP8JHEiwoMGDCBMqXMiwocOHECNKfPjiU6ottTStmcjRYZExqmihutKKlzAysioBGyYsU4CXAWZleTUrVawsW2jVsnXrFs9SvoR0TPijFqZXrF6yWrWKFS5crVppicWK1ahOrbLMSgoTF0yYq1rRTJWFFs9bqtDqKkNkqEAX4aSVW2Som5oxVkyxujIKC9evAVhpSfXKK+DArLbI4iSrFKd9/PRJ3mfPntt/L8T12WON2iJCcfhVNmbsTTNmzwalA7St3KFC3KrtMedHgG0+hKpZe4bHTpwhxoopKRZniovLAjNIW2RbAKND26pN2TPFGDx4Q+ba/nOoj7Rrhv50/+tTrRs2dNT6mMODB9ozZ3HevYuTTBkV5P8obFOUTkC6bHJhc44AgECCyCDoNIfOH4wIkKA3/g2yjTrWhDOONtlEg8d7zSjBRhJUTJEMEEO5sMwySMTRiDfclCMNNosE0gglhLBD1zfg+HdOgugkqCA74ohjjZCNUNPbHMYMMUQSe1CRzDL3RZSBC3LooQccbRAhxziDfAaEPPvow08+/dzjzz377BNPJN58k06P6YCDCCSALBiIN9NQYwg10OThzGnLwPFGMm8gQyJ+A1FAgQvz7HMPmWP20089amIjzTaHIEKIj+lgA00zbSQxhALwyGGNM8u8AwczcuSAqFuKUv/wQgayupCBQDcswAADCyigAA2vBivssMQW69AbRLjTCyafWBFKAK2gokVNONVSyyaflLJGDgQYa5AyXshiiykBZJEKL8MAg64wnaiCyRWiHAZYVK9oAQssstxiVk89yaLLGfh9sckRZ2hCSyewLBULLK2QAostsKwibwCvtBKAYfO6gkpNGKmiimO6DHEEcjRU40g64jQCyZB++KEIFG0AJcsWm3jxBS1CeHFJLLOEsUYZZHhRDhpoZFPHhs/M0UwxIstBxzI5DHCrWxmQYwgj23RjyDbjmLNHcMawAc8UixTYjTXXOIJIOeKc84040nSTDR98YHMIN3jMwcYQY9P/EQcz7wCLXAZ7VAMOIOEMMAAdeDCDRzWQLMKIInei8406qqGTjWv+NecNONhgU400czij6tPLIPPODfhhAF0e3CyiTjnVIHINIocwF+E13XRziDSbNhcIJN0d4kfd1ERjhx10ACcccfEI/tAJJ/xDQxt7RBOEFHSMg4053xRCRTH31KNPPfaIJockgIDTjR57SGPNNudQ400ghFyzjTnvS6NHH3ZwhtKYoYxjvCMZ74gScoAwDnRUAwjz6Ac++sGPNO1jUpLqhiJs8yYB/EEc17hGHw5BDj4Agg/gKEQ0oDFAZDADDgakw3G8JZBrKMEeYdJHPM6RCPv94Q/96dQz/+LBKwYk4IgMEEIbEEABGjrxiVCMohSneJAi+OIIvogHFS+zh0vkwl6xwEgtPgGGLSrkI1ywBCoyYQUxqCEYnYgXtF7xilh8Ql9itIW1NFEKXbiDDk70gRe4sIWEpeITZkjDLzzRiXVlQo6HccUrNgaLm9DiFvniV7ZKYQ5E9WCQtMBCAFyRClVsARRWIMUVLAELUsziEsIYhhZQ8ReMfWUVOhlMWc6Clo/poghu+QEaxIAJVcRClFKh2C54kYpZXAEYwrAlTLgiTZiIhWM76aUqdNGWy+hhHMywgzXS4LNjYgEjMnnKxJpSTZhoDBZbsIUudOELXyQjGaxDzgu4Qf+NblxjD+JYhyQoUQZhmMEMn0BFK1bxComtAhTUtMokSZGKK+DiF2GQgxLCEAZ6uMMd9PCoO+YxssvQYBvbwJoh/KAHY4CBTGVKkz2KoYc0uMENTkADMaIQhUFQok7nSEebsJE8OyQtCfAoRhKmMAU6SM8tNCjEH8xhiD4YQhxHMMZ02KAEeBxBEOhIhzqkIQ5taAMc2riGOBaRDkb8QQCCOMQ18rANPDgDqcZIQhJIE4cXtM4ch9BGINCxDm6MQxpxABsbrBMe/4QVHeQoBGC9sQgcCRUb3CAPHpZGBfq8QRnIeMOhkNOH2gxPG0AgxzSaQY1x7AEIdJADbZoDCEb/MMIP6jiEOAYhWAF8jqiECKAzmPHZ+LShDfk0KTesIQ1AsAMQ6jhHNE6DiAMJDxL+1EMjGvGiIAYiHYsY6iDqsEKlNQMZbVAG4JLrFheUYw9S9WDtDtEIQACCRX3IxmrUoQe0NSIQzfEPIbZhDTpcIxwZMqozrKNUOXR2tB0BQjLicIhujCOo6PAGOcrhhxil4xvU6M83tmG1axwCHP2xDVj/AI5thI4a2jBqV/PqISUcg70RoUEe9OCMKNCBa4a4byGmcEPJVAYRG2RNOQD7B0AIwjaBGEQc9kAHOnBDGtzAxgpZBYSmIuPLUIoIDvbADGcoIxpMWIIU4lAObPRB/xHWmEL6yESpMuVDHk7QhiPk0gjVfEMAABYqOALBB0GAw0hJa0Yz4PCOKisDDjiWCAZccIIbkMMPf9gGFegxQX7cAx/2uIc+LngPOvmHGtl4Mnir0d/mfgMb2SBEe8wLwyq/4R0Qvoylx0EHe+jjUZO6oD/yEZk4RCIb1djGNQpxDmwQog9CAs8UhrAABChgD89ohjKS8WVmUMGv3sqBry8ImVEfYxLieB9nEKE7aihDV0dMwK6qrYRlTAFY1TPjP4DQhwOFIxKRSITAAfGMOOjKiEckwA18NTV9O/zhEI+4xCdO8Ypb/OISiQMF8oBxh4RBE7fQxCeE0nGEwEETFP8tSy1kIY98dzwZ5sDAMT5xBWHwglo6GSMY1rAGZEjcDGIogyayEItQ7OILo3hJKzQmk1vkJJuf4AQn/EjyKc7BC5vYAiky0YU0nOELWOAFL6zpCi2Y6yZPP4stos4JdzgRCWKQxSVCEYpYcCGWuMhEJlYijIlJclo2SftZVBF1eZRBWDgYgyachQVTnCIWZBjGLIIBjEwEgwyg6MTEXuKKv98Lk7bgicd6UgpZpAFRPBgDLUTh+C1s4RS8AEYjgXEFnJDCJLyA5MRakZhapKIWGBF9WrbZzaH4IA1q6MUVlBKAwayCFKdYRS1mYQpRjAIYwKBFFnjflcOwIhaTrGT/ToSPllIUvyNfwMQtsCBKVryCFq1IRTCEsQosxOIXNo/XX77SzlGiQvy1wC9owQlt8ANuwQOxIAv0sAV+wRQUwxeq8DCxoE6AwQqz4AoXs3tjEXzlpwq+cANNNBRd4A4vYAZlAAZ3dAsRI0lZUH+r0H/ddxhiAUZb8Am6wAm+EAbuUAwNVyLVMA6PEAlDdAaVQAqroAVYoBO05H2vkApa0H+s4AqxQAt9RE/2QA/yQA/zUAzGgAFQpWfWUA2EQAlVwAxlUAuh0AW7kDBJsX+B8YIWw3tL8RKdEAulcIc3WA8S1A/54A/6YAw4YFIBBQl5cA1WYwiKcAd3sAxp8An2/2BMtjALARALu9BQDKUJXNALsaAKX9cFyEAEdCAig2JvR0AFy2ANSkAAITgUNGAIh5YH2tAgg6A2cLAG+QBq+0BPn5AGYkAJXtALZkAGRQAEUoAEaSAIgjAN2DAIGvIMzwAHbFAMbEAFcvAGUYMcLkAO4nBl5TAIcKCHkFFB8yAH78AM0KAOArAO6tAITyAARNU57OBbdAMOwQUNyeA8SeBgxzBDl+ECewI3VsUHN3AEpTgFH6IMeIBi6ZAImlEO49AH/UUIAGYb4JApfdANvXEES6IEw9Fl4HYZL1AIgOAIhaAO3rANA7kHSrBXe4MIfsAI5JAHd6MZz0YOsqNbcP/FW5DAHgvGBmJDHPHBj25xAohADo3wB4TAB9toDnQQHCxpDOoQCIHgbOrwGYRQDtzACIZgDuJwX9PwDYagDY/DBkcAW+/wZW3wVEOhHH6QYjBZCHqgBHkVNmJTDbqDDmNFZeSACObgCPyDDX/ADXRgDevxDHtQKIxGB8igDFPwV7rzB4KQA9fwB8rwWnQwPsZQWlBmCK6xDdxwCIZwDd3zB97gDZYjayzUDG8AB3EAB6EVaRyBAXnwDeiwCIhgBHRQQswQDQKnDeTQDb2VDh10DobgCLHhBxP5DY2wjNFgDc3wDPIBBzCkDMiFHy+QB9VQDn8QCOLwAocwB8mQB43/wA3h8GcEUhfVcGB/4AiD4AdP1jlDlQ3P0AeoQZ1f9mWrY51Fgo62EV2BgGLgAA5+4CMCcA5ISQ2BoA1d6R/qwJeHcD/fwIx2wEJz8AakUQzUCZsT4QJ9wGy2gQ6OsA2IcB4fdA1tlmKDAAmG8J4chA59YA1aUzvfoDzOGAfRaAxyQI651hEUUAi2o5DZ8JvacAiQYKCL8GTqEA7VUBeOMJEfOggu4gjUcGjKAw3K4DxKcATHcGP4cQP9Jg2O8AfY0A17gJ2H0KRv0iniUA6FyA2DEGACgFaN8A2B8A3ZUFR2IAfAwZHFEIoa+hBA0AZIQAeQUA7dEGLpIAiLgGl1/yIA5YAIgrUajIA/IRZgbeUN0mAg2sBbAYRUPgkiSoBrQxEH3eAMKdJndEEOAmAIQCAq8JAE5vAI/SEI2FAIRwmneLljdNAH5WAIh5ANvdEMHwJb9MEMy7CjgEoHzLAEURAH42ContFlvmY+YTIPjcAc2FBW1mAIhvBnPDIIMGoE1yANhqAbdjAHcRAHy0BA63qsG6oH0sAMTaBmdFANfhAJfmAOEERno3Y++6AHL1mu8HOoceIf3oAIfeAImFUNz7BCf8IMbRAodHBAyJoQGECYe9AHeFAHS+AGSHAM5ECS36AHxQAZE1Rn/tAP9gCa0tChixBWogMJgSZUOOJsdv9wDQO0DBPrN2+gQBGBAbfyAnKgVNVAIJBABfJgPvyAD8R2D562D/LwBEGVoJvyanVKCNzQCJYTa4g2QHRwaxFrH12qXX7ADZsmKeiDQ+YzKfxADg3iHykGCALwg4/6YeBwp7N2XidCB8kgnX8qERTQDY/wQPOgDzBFKZ/Wh/xAB4/gHM62GrTjP+YACSxyBFNwBNJwrqcBZvXRmMFCAUDQVWKCD/5QD2aCQTq0COewB4dwCBL5JmVjB8uAB3SgAAmwAElAB9DwBlWGXvEglMNCAcVgD5JyQf0gJmrCDuQwP/6Ulf6RDdAAB7qiAGygAL1Sb8WlBD3oLS4gNpIhJjpcNAmIADnWgAgoJgDTgAdUsADwhkS7ggA54HJUhAE0AARyMAV+gA05kmLP2wxycHDxlgAZwAAI8JEQ5wI3ELp7sAfwAz8hkgPtK2++8rdmJL8I0WU38AIWXHLEEhAAOw==';

	//Image to replace the large map (max.gif)
	image["largemap"] = imgPrefix + 'R0lGODlhIQAZANU/ALKwstLR0qbhVZjeQGmmIOXl5XPSBrXqasPqlvX19W+0HW1rcIjVKsPCxGaVLYiFjP/+/1NxL5TdOE1MTtHwq6njYeb30p7fSbfodHCNT5ybn930wrvnh/n5+JfiN+zr7KnbbZKod16DMYJ+h46Oj1hkSpOQl+Hu0/z7/b+7xnl0faHlRuP1zXe/HojGPODg4fv4/e3z4/by+Y7aLfn2/cvKzfHx8XzZDsrXudva2/P47VpZW2Nfabe2uZHcMgAAACH5BAEAAD8ALAAAAAAhABkAQAb/wN+v4kOwLMKkcslsIgyiCe/RyyUgTSWk8wI8Mi2PYvSqCE5o9IXBiWWTl1klfSI8Cu+8fom40E8HDAQREyoaAVc5IQozB3+ABGQCFxZYe3uVEBAcLoMRESU7OzwLKiMaNQk6OCEZIiIOBC0MDAMrdng/fY9oAjcGIB8oLBwHGBUXEsoXAhUVLjU2un4HHi2EPCYNBR2WP1sFKSZgHhhoB5EvPx05DVbel0kQCS89JBoFZicDDGfwl318nHCR4sOQM7wq3LiBAIaQDRVmIHyE6weKAgEC5CjwwUaCDiiWzLPxoUCBHAEa9ACgwQSJHgZ/cPAhYIDNCxUwIKBAYYMexQoIEAy4gQEGll2PDswgkEGbDAsMDAww9wiDAhN4hKappgCbtgIJvn2oMU6BD0db0+mSIIbQDiovujUB14CEgzAnrJL5EQOACio5dPzLMy+HFwJqIaCQGy8LBBo5XiQINAPEicGNKTC4IKPDwTRrQMTAzISCBB9z6mD9/Ihfm38QJVK8M2TFgRUrJDBoQcCBbwchAqCgYMDACl5oKspIoaL5AxMaADSokTGHMBT1Wj4YoWJBiRIRXpHI1XguigQ2SL4Q9iMIADs=';

	//Image to replace the building levels
	image["s1"]  = imgPrefix + 'R0lGODlhEQAMAMQAAP34wf/6wv/8xCopIJqXdf//zP75wiMiG//+yre1juzntPb1wURDNC0sIv/7xA4OC///1v//y6OgfYiGanJwVzc2KlJQP5eUcpyZd//9x///xywrIv/9xZiVdP//zf//yiH5BAAAAAAALAAAAAARAAwAAAU+ICCOIheRKKopkmGk6LcwhxDAY5Y0T2XjIg9l0tn8gCIIZnAEBgoE5g0JgEqp1WgT6LnUpkiPxOIAIwPmUQgAOw==';
	image["s2"]  = imgPrefix + 'R0lGODlhEQAMAMQAAP34wXRzWgMDAjc1KYqHav/9xv//zS4uJP//1P//yvz3wNfTpCgnHvLvu5mWdf/6w/75wf77xZ+bebOviP75whkYE6Ohfn99Yfz5wqmmgby4j4F+Yr29lZOQcMrInZ2ZdyH5BAAAAAAALAAAAAARAAwAAAVcICCOkWFGY5oWjRQ4TaGuzXAExxHPouEIDQSgQjDwAJGFpvBIMDbGYyEBQXwEC9kR8DBYBJLosUsQWAyULSURqHgQCS0vkRFcOJPJAjWDsHMMgR0JWwoACoiGKiEAOw==';
	image["s3"]  = imgPrefix + 'R0lGODlhEQAMAMQAAP34wZmWdTs6Lerntv//yQMDAv/9xllYRP//1ffzvm1rVSwsIv//zeLdraOgff75wv/6w/74wbOviOXgrr+8kg0MCRwbFXp3XMXAliUlHPLuud3aqxEQDaekgP/7xGNhTCH5BAAAAAAALAAAAAARAAwAAAVgICCOHsMQz6iqRhJckgGtqpcIi2IpKC0SEs4AgSlMDD7AQzMhICSVATIJITQOhQAjkhQZNoHDYjP1GQglQkbBSBI6HwKBIfi0fQRKdhAoUAhJDwQOC4UdPV0ECRMJgCshADs=';
	image["s4"]  = imgPrefix + 'R0lGODlhEQAMAMQAAP34wf//yzs6LQcHBYqKb/Dtuq2phCQkG//6w0tKOf75wVVTQf/+x///0KilgB0dFri0jNzXqRISDZyaef75wvn0vqKfe21rU/v5w358YIOAZMPAlv77xrGuh7y6kzAvJSH5BAAAAAAALAAAAAARAAwAAAVRICCOIhUwZEpSjBVhqto4gxPEJBM9g3HjAERAoPnYgIpGRsA4HHGBzaHQOHQaOATmICBoJAsPJ4aoXBaJxOAzQcUUgUAj8DBggSIEIAFx4/EhADs=';
	image["s5"]  = imgPrefix + 'R0lGODlhEQAMAMQAAP34wQEBAS0sI5uYd///1cvHm+nmt0VENf//yf/+xhkYE///zfbyvaelgdrVpv75wf/7xKWifqGde/34wP/5wl1cSP76wyopIA4NCuThr+PerfHsuH57YLy4kLi1jWtpUiH5BAAAAAAALAAAAAARAAwAAAVmICCKU7KcCzSuI+REUmxY7Lp8mHAJBVKLlIRgQFgkLI8fALJRRBoeS0IJQBQCl4PiwKD9LA6OZqFRcBbKCYJAI1QO6B+i8UEkCIdKvIboBCQGEgEFUz8PCBI7Ag0ISVQIDBkMPiwhADs=';
	image["s6"]  = imgPrefix + 'R0lGODlhEQAMAMQAAP34wcXBlmxrVEZFNf//3QQEA///yenntsvHnP/9xSQjG3h1W///zvXwu5uYdjk4LBMTDv75wSkpIdnVpv/6wxYVEYB+YjAvJKGee//7xFxaRuXhr6ilgPv6yY6LbJCNbiH5BAAAAAAALAAAAAARAAwAAAVdICCOkcEwyaiqZbB8h7GyhgUJj3KkM2BMBQTBcOHIegzPwxCYZHojBm4guSUoUGkB00EUjFmBwpBgDDSMrKOSMQ0E6V7iAFkcOIXAsWdAPCQSGAYRUCIGFBsNeyMhADs=';
	image["s7"]  = imgPrefix + 'R0lGODlhEQAMAMQAAP34wf//zdXRov//ygEBAScmHisrIcjEmP/6w/77xXl3XP75wqKee///yf/+xuTfrfn1v8zInP/8xP//0D08LsK+lP75wVZUQaOgfaungoiGaJ+ceWtpUjU0KDg3Kv/+xSH5BAAAAAAALAAAAAARAAwAAAVNICCKTmCazaiKicC8WBYl6zhsRm4QSlCPCIlkoihAFj/RYjGIEA6DJHBAuQQsUlHDKUhlAQFOZ4D4IhYFje/reBAq0W9D4Hl8virkLwQAOw==';
	image["s8"]  = imgPrefix + 'R0lGODlhEQAMAMQAAP34wQMDAv//zJKPcFlXRDc2KtfTpP//1UxLO83InOfltmtqVP/+xysqIfjzvf77xP76wv75wXt4XaShfrCth+PfriQkHJ+ce/75wsK+lB8eGH57YPr4w/r2wA8PDPz4wiH5BAAAAAAALAAAAAARAAwAAAViICCOj2A+Y5o+3yRdHaqOEEdoi4Vw0CwyhoDhUAlkGD4A0HgIJpBJwcCD8EgEkeRDUSBcCIWKbCbYWEyCwkIQXRQOjAOCwPYxMoGJghKg1GcRDBMNhAMMGEkiAg4VDgKIKSEAOw==';
	image["s9"]  = imgPrefix + 'R0lGODlhEQAMAMQAAP34wbSwiY6Mbf//zAoJBxcWEWxqU+nnt0dGNnd0Wv//0/PwvP/9xtjUpf/6w1lXQ/75wZ6cfP34wGJhTCsqIT08L/77xeLfricmHv36wx8eF/j1wKWjf8fDmObisPLtuCH5BAAAAAAALAAAAAARAAwAAAVnICCOzmA6Y5oyW5QEFqqKkrUhmoFNjDwPEYJHcSAEBjPRwFAZQAaVBDI5EBQYikxhMp1ZPAVE5EEwdFWSweWB4CDMSYClEVAoBgXOOTXoGA8GGgsWSRJPAhgUFQ17Kk8fHgwDEhIpIQA7';
	image["s10"] = imgPrefix + 'R0lGODlhEQAMAMQAADo5LJeUc///zP34wbSxigkJB+nmtnh1Wx4eF//+xyUkHM7KnVhWQ///2EtJOffyvS8uJGlnUv/7wz49L4B9YYeFaKGeexIRDaekf93Zqfv5w3BuVmJgS2FfSuXhr/j2wSH5BAAAAAAALAAAAAARAAwAAAV34CAOiTBKQjquSYZJg/QEB5Gsg2BAgCB9E0jkUjGJEgTFxVGyXB4NQsFwI3EClEmKwRAkHheCUdTIpiYbn0QRqMYE2RLgoGaPc2aBI+IbICx3cFoCBz06BQtuOYVeCwUWBgwQGjgCARwJKBYKPBmKOCICDx4abiEAOw==';
	image["s11"] = imgPrefix + 'R0lGODlhEQAMAMQAAP34wf/+yMC8kv//yvr1vv/8xBcWEfDst//9xf75wv77xP//0MzIm09OPdDMnp6beb66kd7ZqailgAAAAAgIBg8OC0NBMh0cFRAPDMXBlmNhTPPvucK+lP78xe3ruf35wSH5BAAAAAAALAAAAAARAAwAAAVXICCKAzIC5TkmgxR1AOvCZ7E8kzDYuH4qHg2GkhkEh8VTgNNwXAQLptM3+hAGBIPumqWuEAftIAEWqwCFsC9tVrHX6sE5XYHI6fazYmNhBAB7fX9nhGchADs=';
	image["s12"] = imgPrefix + 'R0lGODlhEQAMAMQAADk4K///y/z3wOzotk9OPAUEA5yaecjEmf/+x7eziycmHXp3XJSRcR0cFmtqVf75wv/7xP/6wn98Yf//1YF+Yv34wWBeSfv4xC0sIqmmgbKwid/bqz8+MBAQDDAwJb26kSH5BAAAAAAALAAAAAARAAwAAAV7YCVWSDCWQRCNY7BlEDkwSybE7eABAbI1HEeDcFk9EBpFh1CyYAKTTeFjOloMEk4AcjggEINCwiR6TCjaIyISEA4QI3Y28KhAAovCgdyaHy8WHXssIgFzEBcEHgMTW4R4PHgFBh8aGgOPDBZwihgKn1SED3UVAqUCqCMhADs=';
	image["s13"] = imgPrefix + 'R0lGODlhEQAMAMQAAP//yzk4K/34wbKxiwQEA0hGN5iWdenmtcjFmv//1Hh1W//+x4yJa//6wy0sIiUkHH98YP75wuTgrx0dFv74wf77xYF+Yg8PDPDtuWJgSz49L6ilgMG+lP35w+DcrGZlUSH5BAAAAAAALAAAAAARAAwAAAWCoCAKCzCWAECNI+BtFbUcDMQBEQtgTgAsnknhczGYBJHF4HEppCCORYIxiTSQi4zBogE0DgdAAlq5iiIJLq4CQBQIN1YDAOlGkghDoYCp6Oo4C4IJGAQbRyJ0XQsQDD8NRYgCAAo+AAxwBwoXHgs6BhkLHRUWDz0IkiwicxgSFZ4iIQA7';
	image["s14"] = imgPrefix + 'R0lGODlhEQAMAMQAAP34wTc2KrWzjP//y5iVdE5MO9bTpOvntHp4Xf/+xwICAv//0/75wt/bqg0MCv/7w/77xFlYRIB9YYeHbj8+MCMiGxMSDuXhr/DsuP75wQoKBx0cFvn0vmFfSmJgS3FvViH5BAAAAAAALAAAAAARAAwAAAV1ICACyTCKz/Cc4tAIHCNCHHFA53AEwSAzA4TCkBBlEoKKo5CQDQQOB1HESHgIEooPgqkQNtMRY5FVDQofjCWMGpQHhMBCfTHlyhdFZPLRfAw4I25aFxEFBRQaFAJFggg9KQMLBxoNKjkEHk0iCRcUDY0soqIhADs=';
	image["s15"] = imgPrefix + 'R0lGODlhEQAMAMQAALWzjP//y3BvVpWScf34wQAAAMrHm+jltjs6Lv/9xv//0xgYEv/6wysrIX57YDU0KCUkHP75wv77xYSBZP74wfbxvEA/MZ6bee/ruKakf2JgS7+8kg8OC+PfrTAwJTg4KyH5BAAAAAAALAAAAAARAAwAAAWCICESSTAGKBqNYtBlUiQZ2XVlFXNiHhIwicei0UBgEoRIAgDhWAIJzMKggFJEMs1l8gwYFpuM4ceKKBzdS+GB4GgCKxEjgIZuHBVvAWA61SMBCgxzDQ59LXV0AwoJCQsDhwR0DygTBRsHAgsHEiwBAxoJEgkOEA0fYyyqBHMYHRKHIQA7';
	image["s16"] = imgPrefix + 'R0lGODlhEQAMAMQAADc2Kv//y/34wZqXdgICAaqog0xKOv//1uvouMbCl//9xhsbFVVUQSMiGmxrViwrIuDcq9TQov/6w4F+Yn98Yfn0vuTgrvv2wGNhSw8OC3t4XUE/MWFfSvr4wz49L/f3xSH5BAAAAAAALAAAAAARAAwAAAV5oCAKSjBKQSqNYwAVqyQV2iCsLQIAgaQwDUfD0MEpCo2MIVXIIA6WRkQhCmAGE0+K4fgkLIoLS3LIpjYGwCMzMJ0CFK3Ck0kEBoQpC64NABgHJQ1te3EpGBsqC4QtGjwKCQQDCBROVC0DGAooBQ+ediyhVRUWAm4CIQA7';
	image["s17"] = imgPrefix + 'R0lGODlhEQAMAMQAAP34wWRiTDg3KwcHBevntZaUc0xKOv//yf/9xf75wv//zS0tI7WzjKqngv/6wyIhGv77xnx5X6Gdev34wP75wfTxvIF+YuDcqxAQDL26kT49L9vXp8K+lKWifv//17CshiH5BAAAAAAALAAAAAARAAwAAAV4ICBOxwGQSpoikygeVwNBnGR3zQa5CrEIB0hkQXwMGiYKgvHAGA6JKOJgMCAcgAQkULBooFGFBEMwuRIeLxSAqGAKOxfAoVAnAIoCpoKQi+pfUQcCAQp+f3YIBAMZZn4KEUAJBwwDBH2HBwUBJgcfBhNYh4ctLXIhADs=';
	image["s18"] = imgPrefix + 'R0lGODlhEQAMAMQAADc2Kv34wZORcv//ywsLCEhHN3Z0WurntSQjG///1//9xrSxiqShfX57YIF+YmFfSvbyvaqngv/7w+/suBoZFNzYqWloVioqITAwJWJgS1JQPsTCmBQTD+Xgrvv3wD49LyH5BAAAAAAALAAAAAARAAwAAAV3YCAGyjCWgzmOQxVJ5CQ0i7IGw4QBg6IDFo5BRVogCJoSgxBILAgHGCkjcHxSz0NiOZGKEtaBZPCgFAgRYmDcuA42F4OgoIF4ce0UPTGAEBhqA3kDAAYJJRQCgQ08AwIEGwePFXeOGQoSEg4IFxgLajdrOR04IyEAOw==';
	image["s19"] = imgPrefix + 'R0lGODlhEQAMAMQAADY2KZaUdP//y/34wevotQYGBUtKOa2qhXRyWdTQoyYlHf//1P/+x+HermhmT8bDl2ppVP74wf75wn57YP77xv/6w8O/lT8+MIF+YlNSP2JgS/v5w/z2wBsaFP/8ww8PDCH5BAAAAAAALAAAAAARAAwAAAWC4CAOjDCWghCNo9AcUsQQwWQJEisQACAwDQUA0gmoBhLGQfExpCCKzcJSaDCQDE0Ac0kBEAtP5HMwiSQLbipjWCwaBeOoIph0GVRH4PKRt+wqCw8GBksHV39dFQ8PbnAJiCJ1PgIBBQkNFwYMOS0BGgwVGwgKChkEHiyqA3QEBAyRIQA7';
	image["s20"] = imgPrefix + 'R0lGODlhEQAMAMQAANbSpP//y5WScm1rU/34wezmtDo5LBsbFc3JnP//0xMSDqejfy0sI//+x11cSCclHbe0jfv3wfHuuk5MO/f1wAwMCbq4j/XzwP/7w4SCZd7aq7KuiMPAlX98YREQDeXgriH5BAAAAAAALAAAAAARAAwAAAWNICEGZCASZXOOSNdxZgB0mWaOS+U4lZBwHsdEoVFhIopOIiFQRAyD5cRhpGwKmMCG6IEFFocIZoRpXB6DTwXQCFg8BdVIYmBINOv2Oz7SPAwSAXgIJFsSKg0aBwMBCQEUBwtLGQxVDAcWEBsQDQMPGggKAiYNAAynD38SFA6pAxhjBBEnEbUEWQUFAbEhADs=';
	image["s21"] = imgPrefix + 'R0lGODlhEQAMAMQAADk4K///y/34wZmWdQUFBPHuu3h2XCcmHf//0/75wv/9xry4j4qIai8vJPv2wNfTpH98Yf/6w/77xYF+Yv74waKffKmmgbOwiRkYE2xtWWJgSz49L+Dcq01LOsrInb29lSH5BAAAAAAALAAAAAARAAwAAAV6oCAqQSmJY4CORWUMhSIGnCUlLNBkTVNIgUIDEMAJAgNCASHAMBCXA6FTFEkeC0UkcJggNIPJpppKIJIPhVlMFm0rhEqAsoWMjYItI66a2ckJAQYYHggBMkd/RgEWBBAfFxcPJ4JEOIE8DQebAypIGmooDgkOpaYrKCEAOw==';
	image["s22"] = imgPrefix + 'R0lGODlhEQAMAMQAADY1Kf34wUdFNtvYqenls5WSch0cFs3KngwMCf//yfr2wf//1CcmHqmmgiwrIr67k2RjTv//zf/6wvDuu/f0v//8xV1cSLGuh3t4XRUVEP/7w7ayi4F+Yv75wf75wn17YCH5BAAAAAAALAAAAAARAAwAAAWIYCAmUZSIHWmKbHJw35N4ycNxxzk2iAUhhUUBAbEgGieNIsNZCDMEoBPD8EgkiguhErkgCJcJt2CwBmiVBIVhMWkShAwmwgokJgCH2E5gCBQaLQN+EycuBn8VggYQJQkuGR8LJh0BGhQOBg8bFw9xAJudCh0VAw4ADKkCG6epfhSBCiKys7V1IQA7';
	image["s23"] = imgPrefix + 'R0lGODlhEQAMAMQAAGZlT///y+nlsv34wSYlHdjUpjg3K0hGNx4dF//+xqmmgfbyvf//1QwMCSsqIc3JnPDuuvv3wJWTc7i2joaEaP77xJGOboF+Yl1cSLGth8PAlX16X2FfS/f1wRUVEOHfsCH5BAAAAAAALAAAAAARAAwAAAWO4CAGZCAOZXKOz7VpZqJtlqCOSoNxjcRIDcCB8FFVIp4L4+eBECyMAOFiGkQygkog04AIFoEIwlJFVRILAieQSFAIhkFlFYAYHJDKXPGWlAMfcBAmAVoMFg0LcwkFCAABUQIHBZA5EAkVHQ4IExMZEwsOBx+NGDEFDqkOcAsfB6sAiiIRclYRt20CAoUiIQA7';
	image["s24"] = imgPrefix + 'R0lGODlhEQAMALMAAP34wX58YD89MO3otc3JnV5cSN3ZqR8eF66qhI6LbAAAAA8PCy8uJL66kZ6beE5NPCH5BAAAAAAALAAAAAARAAwAAARSEMhJayUhkIsqWkWxONNwCNUSSM4yiY83SN/sCAFqSUcBGAdDbjcQMGYCUiBWMTAEs4QikBAcEhSgj1Z4PBggCuPQaCAalOHEyRg/Z6ztbj6JAAA7';
	image["s25"] = imgPrefix + 'R0lGODlhEQAMALMAAP34wX58YD89MO3otc3JnV5cSJ6beN3ZqR8eF66qhAAAAA8PC766kS8uJI6LbG5sVCH5BAAAAAAALAAAAAARAAwAAARYEMhJayUhkJlM39xSFIsBEEqjBtTCAsYCN5aUDLY8MnctIQWAYCFoLBiWQVESSEgKiMqhIcBdFIfJAfGYDApZAGNhBTQQDB4SUd0GJVMVgjpQnru+Sp0SAQA7';

	//big icons
	var cssBigIconStyle = "";
	cssBigIconStyle += "#n6, #n7, #n8, #n9, #n10 {width:70px; height:100px; background-repeat:no-repeat;}";
	cssBigIconStyle += "#n6:hover,#n7:hover,#n8:hover,#n9:hover,#n10:hover {background-position:bottom;}";
	cssBigIconStyle += '#n6 {background-image: url(' + image["mercado"] + ');}';
	cssBigIconStyle += '#n7 {background-image: url(' + image["militar"] + ');}';
	cssBigIconStyle += '#n8 {background-image: url(' + image["alliance"] + ');}';
	cssBigIconStyle += '#n9 {background-image: url(' + image["setup"] + ');}';
	cssBigIconStyle += '#n10 {background-image: url(' + image["militar2"] + ');}';
	GM_addStyle(cssBigIconStyle);

	//update the script (by Richard Gibson; changed by ms99)
	function updateScript(SCRIPT) {
		var divUpdate = elem("DIV", "<b>" + T('CHECKUPDATE') + "</b>");
		var a = get('lmid1');
		if (a) a.appendChild(divUpdate);
		try {
			if (!GM_getValue) return;
			GM_xmlhttpRequest({
				method: 'GET',
				url: SCRIPT.url + '?source', // don't increase the 'installed' count; just for checking
				onload: function(result) {
					removeElement(divUpdate);
					if (result.status != 200) return;
					if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
					var theOtherVersion = RegExp.$1;
					if (theOtherVersion == SCRIPT.version) {
						alert(T('NONEWVERSION') + ' (v ' + SCRIPT.version + ') !');
						return;
					} else if (theOtherVersion < SCRIPT.version) {
						alert(T('BETAVERSION') + ' (v ' + SCRIPT.version + ') ?!');
						return;
					} else {
						if (window.confirm(T('NEWVERSIONAV') + ' (v ' + theOtherVersion + ')!\n\n' + T('UPDATESCRIPT') + '\n')) {
							window.location.href = SCRIPT.url;
						}
					}
				}
			});
		} catch (ex) {
		}
	}

	 /**
	* Function that does absolutely nothing. Used when there is no other choice but need to use a function
	*/
    function dummy() {return;}

	function getRandomTimeRange(maxrange) {
	    var nr = Math.floor(maxrange * (0.6 + 0.4 * Math.random()));
		return nr;
	}

	/**
	* Function that extracts the name of a file path or URL
	* Params: path = Path or URL to extract the filename
	* Returns: The name of the file that points to the path or URL
	*/
    function basename(path) { return path.replace(/.*\//, "");}

	/**
	 * Convert a number to a string with 2 digits (for time representation)
	 * Params: n = Number to convert
	 * Returns: the string of 2 digits
	 */
	function convertTo2DigitString(n){	return (n > 9 ? n : '0' + n); }

	/**
	* Wrapper for the function getElementById
	* Params: aId = Text of the ID of the element to look for
	* Returns: Element of the document with the specified ID
	*/
    function get(aID) {
        if (aID != "") {
            return document.getElementById(aID);
        } else {
            return undefined;
        }
    }

	/**
	 * Multiplica cada elemento de un array por un valor
	 * Params:
	 *	a	Array con los elementos a procesar
	 *	n	Valor numero por el que multiplicar el array
	 * Returns:
	 *	Nuevo array con los valores calculados
	 */
	function arrayByN(a, n){
		var b = arrayClone(a);
		for(var i in b){ b[i] *= n; }
		return b;
	}

	/**
	 * Realiza una copia por valor de un array
	 * Params: a = Array to copy
	 * Returns: the new array (a copy of the a array)
	 */
	function arrayClone(a){
		var b = new Array();
		for(var i in a){ b[i] = a[i]; }
		return b;
	}

	/**
	 * Suma el contenido de dos arrays. Si cualquiera de los dos tiene valor nulo, se devuelve una copia del otro
	 * Params:
	 *	a	Primer array sumando
	 *	b	Segundo array sumando
	 * Returns:
	 *	Referencia a un nuevo array con la suma
	 */
	function arrayAdd(a, b){
		if(!a){ return arrayClone(b); }
		if(!b){ return arrayClone(a); }
		var c = new Array();
		//for(var i = 0; i < Math.max(a.length,b.length); c[i] = a[i] + b[i++]);
		for (var i = 0; i < Math.max(a.length,b.length); c[i] = a[i] + b[i++]);
		return c;
	}
	
	/**
	 * Remove an element of the current document
	 * Param: elem = Element to remove
	 */
	function removeElement(elem) {
		if (elem) {
			if (elem.parentNode) {
				elem.parentNode.removeChild(elem);
			}
		}
	}

	/**
	 * Mueve un elemento de lugar en un arbol DOM
	 * Params:
	 *	elem: Elemento a desplazar
	 *	dest: Nuevo padre del elemento
	 */
	function moveElement(elem, dest){
		removeElement(elem);
		dest.appendChild(elem);
	}

	/**
	 * Sum all the values of an array
	 * Parameters: a = Array a with values to sum
	 * Returns: Sum of all values of the array a
	 */
	function arrayToInt(a){
		var h = 0;
		for(var i in a){ h += a[i]; }
		return h;
	}

	/**
	 * Inserta un nodo despues de otro
	 * Params:
	 *	node		Nodo de referencia
	 *	referenceNode	Nodo a insertar
	 */
	function insertAfter(node, referenceNode) {
		node.parentNode.insertBefore(referenceNode, node.nextSibling);
	}

	/**

	 * Create a new element
	 * Params:	tag	Type of the element
	 *		content innerHTML (content)
	 * Returns:	a reference to the new created element
	 */
	function elem(tag, aContent){
		var ret = document.createElement(tag);
		ret.innerHTML = aContent;
		return ret;
	}

	/**
	 * Realiza una busqueda en el documento usando XPath
	 * Params:
	 *	xpath	Expresion de busqueda
	 *	xpres	Tipo de busqueda
	 * Returns:
	 *	Referencia a un elemento resultado de XPath
	 */
	function find(xpath, xpres, startnode){
		if (!startnode) {startnode=document;}
		var ret = document.evaluate(xpath, startnode, null, xpres, null);
		return  xpres == XPFirst ? ret.singleNodeValue : ret;
	}

	function getCrtServer() {
		location.href.search(/http:\/\/(.*)\//);
        fullServerName = RegExp.$1;
		var server = fullServerName.replace(/\.travian\./,'');
		return server;
	}

	function getCrtUserID() {
		var menu = find("//td[@class='menu']", XPFirst);
		if (menu == undefined || menu == null) return "0";
		var crtUserID;
		for (var j = 0; j < 2; j++) {
			for (var i = 0; i < menu.childNodes.length; i++) {
				var entryAttributes = menu.childNodes[i].attributes;
				if (entryAttributes) {
					for (var xi = 0; xi < entryAttributes.length; xi++) {
						if (entryAttributes[xi].nodeValue.indexOf('spieler.php?uid') != -1) {
							crtUserID = entryAttributes[xi].nodeValue;
							crtUserID = crtUserID.substr(crtUserID.indexOf("uid=") + 4);
						}
					}
				}
			}
		}
		return crtUserID;
	}

	function getGMcookie(aName, addNewDid) {
		var aServer;
		var aCrtUserID;
		var aNewdidActive;
		var strGMCookieName;
		if (server == undefined) {
			aServer = getCrtServer();
		} else {
			aServer = server;
		}

		if (crtUserID == undefined) {
			aCrtUserID = getCrtUserID();
		} else {
			aCrtUserID = crtUserID;
		}

		if (addNewDid == undefined || addNewDid == null) addNewDid = false;

		if (addNewDid == true) {
			if (newdidActive == undefined) {
				aNewdidActive = getNewdidVillage();
			} else {
				aNewdidActive = newdidActive;
			}
			strGMCookieName = aServer + '_' + aCrtUserID + '_' + aNewdidActive + '_' + aName;
		} else {
			strGMCookieName = aServer + '_' + aCrtUserID + '_' + aName;
		}
		var gmcookie = GM_getValue(strGMCookieName, false);
		var valueToReturn = decodeURIComponent(gmcookie);
		return valueToReturn;
	}

	function setGMcookie(aName, aValue, addNewDid) {
		var aServer;
		var aCrtUserID;
		var aNewdidActive;
		var strGMCookieName;

		if (server == undefined) {
			aServer = getCrtServer();
		} else {
			aServer = server;
		}

		if (crtUserID == undefined) {
			aCrtUserID = getCrtUserID();
		} else {
			aCrtUserID = crtUserID;
		}

		if (addNewDid == undefined || addNewDid == null) addNewDid = false;

		if (addNewDid == true) {
			if (newdidActive == undefined) {
				aNewdidActive = getNewdidVillage();
			} else {
				aNewdidActive = newdidActive;
			}
			strGMCookieName = aServer + '_' + aCrtUserID + '_' + aNewdidActive + '_' + aName;
		} else {
			strGMCookieName = aServer + '_' + aCrtUserID + '_' + aName;
		}

		if (aValue) {
			GM_setValue(strGMCookieName, encodeURIComponent(aValue));
		} else {
			GM_setValue(strGMCookieName, false);
		}
	}

	function appendGMcookieValue(aName, values, addNewDid) {
		var newValue = '';
		for (var i = 0; i < values.length; i++){
			if (values[i] != ''){
				newValue += values[i];
				if (i != values.length - 1) newValue += '$';
			} else {
				return;
			}
		}
		var cookieValue = getGMcookie(aName, addNewDid);

		if (cookieValue != "false" && cookieValue != '') {
			cookieValue += "$$" + newValue;
		} else {
			cookieValue = newValue;
		}
		setGMcookie(aName, cookieValue, addNewDid);
	}
	
	function addGMcookieValue(aName, values, addNewDid) {
		var newValue = '';
		
		for (var i = 0; i < values.length; i++){
			if (values[i] != ''){
				newValue += values[i];
				if (i != values.length - 1) newValue += '$';
			} else {
				return;
			}
		}
		var cookieValue = getGMcookie(aName, addNewDid);

		if (cookieValue != "false" && cookieValue != '') {
			if (cookieValue.indexOf(newValue) == -1) {
				cookieValue += "$$" + newValue;
			}
		} else {
			cookieValue = newValue;
		}
		setGMcookie(aName, cookieValue, addNewDid);
	}

	function removeGMcookieValue(aName, indexNo, reloadPage, aFunctionToRunAfter, addNewDid) {
        return function(){
			if (confirm(T('ELIMINAR') + ". " + T('AREYOUSURE'))) {
				var cookieValue = getGMcookie(aName, addNewDid);
				if (cookieValue != "false" && cookieValue != '') {
					cookieValue = cookieValue.split("$$");
					cookieValue.splice(indexNo, 1);
					cookieValue = cookieValue.join("$$");
					setGMcookie(aName, cookieValue, addNewDid);
					removeElement(find("//*[@id='" + aName + "']", XPFirst));
					if (reloadPage) {
						history.go(0);
					} else {
						aFunctionToRunAfter();
					}
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
	function img(ref, lang_dependant){ return (!lang_dependant ? localGraphicPack + "img/un/" + ref : localGraphicPack + "img/" + detectedLanguage + '/' + ref); }

	/**
	 * Compute the identifier of the cell having the x,y coordinated
	 * Params:
	 *	x	Coordinate X
	 *	y	Coordinate Y
	 * Returns: the ID of the cell coresponding to the given x,y coordinates
	 */
	function xy2id(x, y){
		return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));
	}

	/**
	* Inverse function for xy2id(x, y) => id2xy(id)
	*inspired from Travian3 Beyond Hacked FR (mik french (fr), A_r_e_s (br), Booboo(hu) )
	*/
	//function id2xy(vid) {
	//	var x = (vid % 801) - 401;
	//	var y = 400 - (vid - 401 - x) / 801;
	//	return ("" + x + "|" + y);
	//}
	
	/**
	* Inverse function for xy2id(x,y) => id2xy(vid)
	* Version proposed by fr3nchlover.  Thank you !
	*/
	function id2xy(vid) {
		//var x = (vid % 801) - 401;
		var x = (vid%801?(vid%801)-401:400);
		var y = 400 - (vid - 401 - x) / 801;
		return ("" + x + "|" + y);
	}

	/**
	*Compute the second for a given human time
	 * Params: humanTime (e.g. 23:45:23)
	 * Returns: the number of seconds corresponding the the param humanTime
	 */
	function ComputeSeconds(humanTime) {
		var p = humanTime.split(":");
		return (p[0] * 3600) + (p[1] * 60) + (p[2] * 1);
	}

	/**
	* Custom log function
	//param {int} level
	//param:{istring}  Message to log.
	*/
    function log(level, msg) {
       if (level <= LOG_LEVEL) {
          if (console != undefined) {
             console.log(msg);
          }
       }
    }

	//convert a number of seconds to "human understandable time" => format h:mm:ss (or h:mm:s?)
	//this is the "inverse" to the "ComputeSeconds" function
	function formatTime(s, returndays){
		if (s > -1) {
			var hours = Math.floor(s/3600);
			var minutes = Math.floor(s/60) % 60;
			var seconds = parseInt(s % 60);
			var t = "";
			if (returndays) {
				var days = Math.floor(hours/24);
				hours = hours - days * 24;
				t = "" + days + ", ";
			}
			t += hours + ":" + convertTo2DigitString(minutes) + ":" + convertTo2DigitString(seconds);
		} else t = "0:00:0?";
		return t;
	}

	/**
	 * Funcion encargada de mostrar el texto de resources restantes para una construccion
	 */
	function calculateBuildTime(){
		// Las tableCells son los enlaces susceptibles de ser sustituidos por la nueva informacion
		var tableCells = find("//span[@class='c']", XPList);
		// Las tablas son por cada uno de los edificios ampliables que se han detectado en la pagina
		var tablas = find("//div[@id='lmid2']/table[@class='f10' and not(@width)]", XPList);
        if (tablas.snapshotLength == 0) tablas = find("//div[@id='lmid2']/form/table[@class='f10' and not(@width)]", XPList);
		var k = tableCells.snapshotLength - 1;

		// Se comienza por el final para evitar confusiones con otra informacion, ya que suele
		// estar lo ultimo en el caso de un unico edificio
		for(var j = tablas.snapshotLength - 1; j >= 0; j--) {
			var aTable = tablas.snapshotItem(j);
			var aCell = aTable.rows[0].firstChild;
			var resources = aCell.textContent.split("|").splice(0,4);
			if(resources.length != 4) continue;

			var a = calculateResourceTime(resources);
			var b = tableCells.snapshotItem(k);
			// Por si hay mas tablas que tableCells
			if (b){
				// Si lo que hay antes de la celda es un enlace, entonces se trata de la cola del Plus
				if (b.firstChild && b.previousSibling.previousSibling.nodeName == 'A') continue;
				// Se elimina la informacion existente antes de poner la nueva
				if (a != null){
					if (b.firstChild && b.previousSibling.previousSibling.nodeName == 'TABLE') while(b.hasChildNodes()) b.removeChild(b.firstChild);
					var aDiv = elem("DIV", a);
					b.appendChild(aDiv);
					b.appendChild(document.createElement('BR'));
					k--;
				}
			}
		}
	}

	/**
	 * Get the new Dorf ID (newdid) of the current village
	 * Returns: the new Dorf ID (newdid) of the current village or 0 (zero)
	 */
	function getNewdidVillage(){
		var aX = xpathResultEvaluate('//a[@class="active_vl"]');
		if (aX) {
			var aLink = aX.snapshotItem(0).href.split("=");
			var villageNewdid = parseInt(aLink[1]);
			return villageNewdid;
		} else return 0;
	}

	/**
	 * Get the ID of the current village
	 * Returns: the ID of the current village or 0 (zero)
	 */
	function getIdVillageV2(){
		//get the villageID using XPFirst (works for one village - after reading the singleTown name/coordinates/newdid from the profile of the player - and for more villages - directly from the existing village list on the right side -
		var a = find('//a[@class="active_vl"]/../../td/table/tbody/tr/td', XPFirst);
		if (a) {
			var villageID = 0;
			try {
				var X = parseInt(a.innerHTML.replace("(", ""));
				var a = find('//a[@class="active_vl"]/../../td/table/tbody/tr/td[3]', XPFirst);
				var Y = parseInt(a.innerHTML.replace(")", ""));
				villageID = xy2id(X, Y);
				return villageID;
			} catch(e) {
				var villageID = getIdVillageFromCookie();
				return villageID;
			}
		} else {
			var villageID = getIdVillageFromCookie();
			return villageID;
		}

		function getIdVillageFromCookie() {
			//get the singleTown villageId from the GM "cookies"
			var singleTown = getGMcookie('singleTownNI', false);
			if (singleTown != false) {
				var singleTownArray = singleTown.split("|");
				var villageID = singleTownArray[1];
				return villageID;
			} else {
				return 0;
			}
		}
	}


	/**
	* Calculates the movement in pixels from 23 link
	* lateral (villages or custom links)
	* Returns: The shift in pixels
	*/
	function longitudPantalla(){
		var topx = 0;
		var rightx = 0;
		var bx = 0;
		var middlex = 0;
		var menux = 0;
		var troopx = 0;
		var mapx = 0;
		var maxTopY = 0;
		var middlex1 = 0;
		var middlex2 = 0;
		var docElem;

		docElem = get("ltop1");
		if (docElem != null) topx = parseInt(docElem.clientHeight);

		docElem = get("lright1");
		if (docElem != null) rightx = topx + parseInt(docElem.clientHeight);

		docElem = find("//td[@class='menu']", XPFirst);
		if (docElem != null) menux = topx + parseInt(docElem.clientHeight); //+60

		docElem = get("navi_table");
		if (docElem != null) navix = topx + parseInt(docElem.clientHeight); //+60

		docElem = get("lleft");
		if (docElem != null) leftx = topx + parseInt(docElem.clientHeight); //+60

		docElem = get("lmidlc");
		if (docElem != null) middlex = topx + parseInt(docElem.clientHeight);

		docElem = get("lmidall");
		if (docElem != null) middlex1 = topx + parseInt(docElem.clientHeight);

		docElem = get("lres0");
		if (docElem != null) middlex2 = topx + parseInt(docElem.clientHeight);

		docElem = get("ltbw1");
		if (docElem != null) middlex2 += parseInt(docElem.clientHeight);

		docElem = get("lrpr");
		if (docElem != null) middlex2 += parseInt(docElem.clientHeight);

		docElem = get("ltrm");
		if (docElem != null) middlex2 += parseInt(docElem.clientHeight); //+170

		docElem = get("lbau1");
		if (docElem != null) middlex2 += parseInt(docElem.clientHeight);

		docElem = get("map_content");
		if (docElem != null) {
			docElem = docElem.firstChild;
			if (docElem != null) mapx = topx + 10 + parseInt(docElem.clientHeight);
		}

		maxTopY = leftx;
		if (navix >= maxTopY) maxTopY = navix;
		if (menux >= maxTopY) maxTopY = menux;
		if (rightx >= menux) maxTopY = rightx;
		if (middlex >= maxTopY) maxTopY = middlex;
		if (middlex1 >= maxTopY) maxTopY = middlex1;
		if (middlex2 >= maxTopY) maxTopY = middlex2;
		if (mapx >= maxTopY) maxTopY = mapx;

		if (maxTopY < 0) maxTopY = 0;

		var maxX = document.body.clientWidth;
		//log(3, "maxTopY = " + maxTopY);
		return maxTopY;
	}

	function calculateResourceTime(need){
		var maxTime = 0;
		var a = null;
		var res_table = '';

		for (var i = 0; i < 4; i++){
           need[i]=need[i]-0;
			var restante = need[i] - currentResUnits[i];
			if (restante > 0){
				if (productionPerHour[i] != 0) {
					var tiempo = Math.round(restante / (productionPerHour[i] / 3600));
				} else {
					tiempo = -1;
				}
				if (tiempo < 0 || capacity[i]-need[i]<0) {
                    maxTime = 'Infinity';
					//res_table = newTable();
					//aRow = newRow("");
					//aCell = newCell('<img src="' + image["img" + (i+1)] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) +'"');
					//bCell = newCell(' ' + restante +' ', [['style', "color:#404040;font-size:8pt"], ['align', "right"], ['id', "timeout" + i]]);
					//cCell = newCell(' ' + T('NEVER') + ' ', [['width', "220"], ['style', "color:#404040;font-size:8pt"], ['align', "right"]]);
					//aRow.appendChild(aCell);
					//aRow.appendChild(bCell);
					//aRow.appendChild(cCell);
					//res_table.appendChild(aRow);
					res_table += '<tr><td><img src="' + image["img" + (i+1)] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '"></td><td style="color:#404040;font-size:8pt" align="right" id="timeout' + i + '">' + restante + '</td><td width="220" style="color:#404040;font-size:8pt" align="right">' + T('NEVER') + '</td></tr>';
                } else {
                   if (tiempo > maxTime && maxTime !='Infinity') {
                      maxTime = tiempo;
                   }
                   tiempo = formatTime(tiempo+5);
				   res_table += '<tr><td><img src="' + image["img" + (i+1)] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '"></td><td style="color:#404040;font-size:8pt" align="right" id="timeout' + i + '">' + restante + '</td><td style="color:#404040;font-size:8pt" align="right" id="timeout" width="60">' + tiempo + '</td></tr>';
                }
			}
		}

		if (maxTime == 'Infinity'){
            a = '<table align="' + docDirection + '">'+res_table+'<tr><td style="color:#404040;font-size:8pt" colspan="2">'+T('LISTO') + '</td><td style="color:#404040;font-size:8pt">' + T('NEVER')+ '</td></tr></table>';
		} else if (maxTime > 0){
			var tiempo2 = formatTime(maxTime + 5); // a 5 seconds addition to compensate differences between JS timer and server
			var fecha = new Date();
			fecha.setTime(fecha.getTime() + (maxTime * 1000));
            a = '<table align="' + docDirection + '">'+res_table+'<tr><td style="color:#000000;font-size:8pt;" colspan="1">'+T('LISTO') + '</td><td style="color:#000000;font-size:8pt" colspan="2">' + computeTextTime(fecha)+ '</td></tr></table>';
		}
		return a;
	}

	/**
	 * Formatea el tiempo needed hasta alcanzar determinada fecha
	 * Params: fecha: Objeto de tipo Date con la fecha futura
	 * Returns: Cadena de texto con el calculo de tiempo restante
	 */
	function computeTextTime(fecha){
		var dtNow = new Date();
		// Calcula la diferencia de hours entre la fecha dada y la actual
		// para saber si se trata de las proximas 72 hours
		var hours = ((fecha.getTime() - dtNow.getTime()) / 1000 / 60 / 60);
		hours += dtNow.getHours() + (dtNow.getMinutes() / 60);
		var timeRemaining='';
		//if (hours < 24) timeRemaining = T('TODAY');
		if (hours < 24) timeRemaining = "";
		else if (hours < 48) timeRemaining = T('TOMORROW');
		else if (hours < 72) timeRemaining = T('PAS_MANYANA');
		else timeRemaining = T('ON') + " " + convertTo2DigitString(fecha.getDate()) + "/" + convertTo2DigitString((fecha.getMonth()+1));
		return timeRemaining + " " + T('A_LAS') + " " + convertTo2DigitString(fecha.getHours()) + ":" + convertTo2DigitString(fecha.getMinutes());
	}

	/**
	 * Calcula el tiempo maximo estimado hasta conseguir los resources especificados basandose
	 * en la cantidad actual y en la production de cada tipo de resource
	 * Params: needed: Array con la cantidad deseada de cada tipo de resource
	 * Returns: Tiempo maximo en seconds hasta conseguir los resources deseados
	 */
	function calculateTime(needed){
		var tiempo_max = 0;
		var tiempo = 0;

		for (var i = 0; i < 4; i++){
			var restante = needed[i] - currentResUnits[i];
			if (restante > 0){
				tiempo = Math.round(restante / (productionPerHour[i] / 3600));
				if (tiempo > tiempo_max) tiempo_max = tiempo;
				if (tiempo < 0) tiempo_max = 'Infinity';
			}
		}
		if (tiempo_max > 0 && tiempo_max != 'Infinity') tiempo_max = formatTime(tiempo_max + 5); // Se introduce un margen de 5 seconds para compensar posibles desviaciones en los temporizadores de javascript
		return tiempo_max;
	}

	/**
	 * Calcula y muestra el tiempo estimado hasta el llenado/vaciado de los almacenes y graneros
	 */
	function calculateFillTime(){
		var resl4 = get('l4');
		//if (resl4 == undefined || resl4 == null) return;
		var tbodyelem = resl4.parentNode.parentNode;
		var beforelres = tbodyelem.childNodes[0];
		var timeToFillRow = newRow("");
		for (var i = 0; i < 4; i++){
			var dblRemainingTime = -1;
			if (productionPerHour[i] < 0) {
				dblRemainingTime = Math.round(currentResUnits[i] / (-productionPerHour[i] / 3600));
				var strRemainingTime = formatTime(dblRemainingTime);
			} else if (productionPerHour[i] > 0) {
				dblRemainingTime = Math.round((capacity[i] - currentResUnits[i]) / (productionPerHour[i] / 3600));
				var strRemainingTime = formatTime(dblRemainingTime);
			} else if (productionPerHour[i] == 0) {
				dblRemainingTime = 1000000;
				var strRemainingTime = "Infinity";
			}
			if (strRemainingTime == "Infinity") {
				var displayRemainingTime = "<span id='timeouta' style=font-weight:bold;color:#008000;'>" + T('NEVER') + "</span>";
			} else if (dblRemainingTime <= 0) {
				var displayRemainingTime = "<span id='timeouta' style=font-weight:bold;color:#FF0000;'>" + strRemainingTime.blink() + "</span>";
			} else if (dblRemainingTime < 7200) {
				var displayRemainingTime = "<span id='timeouta' style=font-weight:bold;color:#FF0000;'>" + strRemainingTime + "</span>";
			} else if (productionPerHour[i] < 0) {
				var displayRemainingTime = "<span id='timeouta' style=font-weight:bold;color:#FF0000;'>" + strRemainingTime + "</span>";
			} else {
				var displayRemainingTime = "<span id='timeouta' style='font-weight:bold;color:#008000'>" + strRemainingTime + "</span>";
			}
			if (productionPerHour[i] < 0) {
				var productionFormat = "<span style='color:#FF0000'>" + productionPerHour[i] + "</span>";
			} else {
				var productionFormat = "" + productionPerHour[i] + "";
			}

			var aCell = newCell('(' + productionFormat + ', '+ displayRemainingTime +')', [["style","font-size:9px; color:#707070; text-align:" + docDirection + "; padding-" + docDirection + ":25px;"], ["colspan","2"], ["valign","top"]]);
			timeToFillRow.appendChild(aCell);
		}
		tbodyelem.insertBefore(timeToFillRow, beforelres);
	}

	/**
	 * Get a script text message
	 * Params: aText: the "index" of the text to return
	 * Returns: the translated (or English) version of the text searched for
	 */
	function T(aText){
		if (xLang[aText] != undefined) {
			return xLang[aText];
		} else {
			return "---";
		}
	}

	/**
	* get current resource units, capacity or warehouse/granary, production per hour
	*/
	function getResourceInfo() {
		for (var i = 0; i < 4; i++){
			var a = get('l' + (4-i));
			if (a != undefined && a != null) {
				//get current resource units
				currentResUnits[i] = a.innerHTML.split("/")[0];
				//get capacity of warehouse/granary
				capacity[i] = a.innerHTML.split("/")[1];
				//get production per hour
				productionPerHour[i] = a.title;
			}
		}
	}

	/**
	* get village,building name or page currently open in order to change the browser title
	*/
	function getCurrentLocation() {
		var locations = new Array();
		var locX;
		if (location.href.indexOf('dorf3') != -1) {
			//the dorf3 page
			locations[0] = T("ALDEAS");
		} else if (location.href.indexOf('karte.php?d') != -1 || location.href.indexOf('karte.php?newdid=') != -1) {
			locX = document.getElementsByTagName('h1')[0].firstChild.data;
			if (locX) {
				//opening an oasis or empty cell
				locations[0] = locX;
				var xi = locX.indexOf("(");
				var yi = locX.indexOf(")");
				var vertSep = locX.indexOf("|");

				xCoord = locX.substring(xi + 1, vertSep);
				yCoord = locX.substring(vertSep + 1, yi);
			} else {
				//opening a village from the map
				locX = xpathResultEvaluate('//h1/div');
				for (var i = 0; i < locX.snapshotLength; i++) {locations.push(locX.snapshotItem(i).innerHTML);}
				locX = xpathResultEvaluate('//h1/div/div');
				if (locX) {
					for (var i = 0; i < locX.snapshotLength; i++) {locations.push(locX.snapshotItem(i).innerHTML);}
					var xi = locations[1].indexOf("(");
					var yi = locations[1].indexOf(")");
					var vertSep = locations[1].indexOf("|");
					xCoord = locations[1].substring(xi + 1, vertSep);
					yCoord = locations[1].substring(vertSep + 1, yi);
					locations[1] = locations[1].substring(xi, yi + 1);
					locations[0] += " " + locations[1];
				}
			}
		} else {
			locX = document.getElementsByTagName('h1')[0].firstChild.data;
			if (!locX) {
				//opening a building
				locX = xpathResultEvaluate('//h1/b');
				for (var i = 0; i < locX.snapshotLength; i++) {
					locations.push(locX.snapshotItem(i).innerHTML);
				}
			} else {
				//opening dorf1, dorf2, map (simple), village overview
				if (location.href.indexOf('karte.php') != -1) {
					//opening the simple map page
					xCoord = get("x").innerHTML;
					if (!xCoord) {
						xCoord = "";
					}
					yCoord = get("y").innerHTML;
					if (!yCoord) {
						yCoord = "";
					}
					locX = locX + " (" + xCoord + "|" + yCoord + ")";
					locations[0] = locX;
				} else {
					//opening dorf1, dorf2, village overview
					locations[0] = locX;
					xCoord = "";
					yCoord = "";
				}
			}
		}
		return locations[0];
	}

	/**
	*general function for getting info from the XPathResult
	*/
	function xpathResultEvaluate(searchFor, startNode) {
		if (!startNode) {startNode = document;}
		return document.evaluate(searchFor, startNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	}

	/**
	 * Get general information (when opening a page) that may be used by other functions
	 */
	function getGeneralData(){
		// language
		var imgPlus = find("//img[contains(@src, 'plus.gif')]", XPFirst);
		if (imgPlus != undefined && imgPlus != null) {
			imgPlus.src.search(/\/img\/([^\/]+)\//);
			detectedLanguage = RegExp.$1;
			if (detectedLanguage) switchLanguage(detectedLanguage);
		}

		docDirection = document.defaultView.getComputedStyle(document.body, null).getPropertyValue("direction");
		if (docDirection == "rtl") {
			docDirection = "right";
			invDocDirection = "left";
		} else {
			docDirection = "left";
			invDocDirection = "right";
		}

		//Path to the graphic pack (if available)
		// empty graphics set support added
		var cssDeclaration;
		var cssDeclaration = find("//link[starts-with(@href, 'file') and @rel='stylesheet']", XPFirst);
		if (cssDeclaration) {
			var csshr = cssDeclaration.href;
			csshr.search(/^file:\/\/[^\/]*\/(.*\/)?(.*)\.css/);
		} else {
			var csshr = find("//link[@rel='stylesheet']", XPFirst).href;
			csshr.search(/^http:\/\/[^\/]*\/(.*\/)?(.*)\.css/);
		}
		localGraphicPack = RegExp.$1;
		if (!localGraphicPack) {
			localGraphicPack = '';
		} else {
			localGraphicPack = 'file://' + localGraphicPack;
		}

		// Identify the userid
		crtUserID = getCrtUserID();

		server = getCrtServer();

		var wsAnalyserOption = getGMcookie('wsanalyser', false);

		// Name of the server and analyser server (wsServerName)
		location.href.search(/http:\/\/(.*)\//);
        var oldserver =  RegExp.$1;

		var crtServerX = new Array();
		var crtServerX = oldserver.split(".");
		var strFirst = crtServerX[0];
		var strLast = crtServerX[crtServerX.length - 1];
		if (strFirst == "speed" && strLast == "se") {
			// for swedish speed server
			wsServerName = strLast + "z";
		} else if (strFirst == "speed") {
			// for all other speed servers
			wsServerName = strLast + "x";
		} else if (strFirst == "team") {
			//for the team server
			wsServerName = "team";
		} else if (strFirst == "lv1") {
			//for "lv" server
			wsServerName = "lv1";
		} else if (strLast == "com" && strFirst.indexOf("ae") != -1) {
			//for new ae server
			wsServerName = strFirst;
		} else if (strLast == "at") {
			//for Austrian server
			wsServerName = "at";
		} else if (strLast == "org") {
			//for the org server
			wsServerName = "org";
		} else if (strLast == "cat") {
			//for catalunian server
			wsServerName = "cat";
		} else if (strLast == "net" && detectedLanguage == "es") {
			//for spanish servers
			wsServerName = "net" + crtServerX[0].substr(crtServerX[0].search(/[0-9]{1,2}/));
		} else if (strLast == "net") {
			//for the www.travian.net server
			wsServerName = "net";
		} else if (strLast == "fr" && wsAnalyserOption != "1") {
			// france3 3 - exception mentioned by fr3nchlover (Thank you !)
            wsServerName = "fr3" + crtServerX[0].substr(crtServerX[0].search(/[0-9]{1,2}/));
		} else if (strLast == detectedLanguage || strLast == "com"){
			//for all other normal servers
			wsServerName = strLast + crtServerX[0].substr(crtServerX[0].search(/[0-9]{1,2}/));
		}

		//compute resources, capacity, production per hour per resource
		getResourceInfo();
		//change the browser tab title
		document.title = document.title + " - " + getCurrentLocation();

		// Plus
		if (find("//img[contains(@src, 'travian1.gif')]", XPFirst)) plus = true; else plus = false;

		if (location.href.indexOf('dorf1') != -1) {
			villageName = document.getElementsByTagName("h1")[0].firstChild.data;
		}

		//get some of the saved GM "cookies" and set as active if Setup has not been visited yet
		boolShowCenterNumbers = getGMcookie("showcenternumbers", false);
		if (boolShowCenterNumbers == 'false') boolShowCenterNumbers = '1';
		
		boolShowDistTimes = getGMcookie("showdisttimes", false);
		if (boolShowDistTimes == 'false') boolShowDistTimes = '1';
		
		boolShowStatLinks = getGMcookie("showstatlinks", false);
		if (boolShowStatLinks == 'false') boolShowStatLinks = '1';
		
		boolShowResColorCodes = getGMcookie("showcolorreslevels", false);
		if (boolShowResColorCodes == 'false') boolShowResColorCodes = '1';
		
		boolShowBuildColorCodes = getGMcookie("showcolorbuildlevels", false);
		if (boolShowBuildColorCodes == 'false') boolShowBuildColorCodes = '1';
		
		boolShowMenuSection3 = getGMcookie("showmenusection3", false);
		if (boolShowMenuSection3 == 'false') boolShowMenuSection3 = '1';
		
		boolShowCellTypeInfo = getGMcookie("showcelltypeinfo", false);
		if (boolShowCellTypeInfo == 'false') boolShowCellTypeInfo = '1';
		
		boolShowTravmapLinks = getGMcookie("showtravmaplinks", false);
		if (boolShowTravmapLinks == 'false') boolShowTravmapLinks = '1';
		
		boolShowTroopInfoTooltips = getGMcookie("showtroopinfotooltips", false);
		if (boolShowTroopInfoTooltips == 'false') boolShowTroopInfoTooltips = '1';
		
		boolShowBigIconAlliance = getGMcookie("showbigiconalliance", false);
		if (boolShowBigIconAlliance == 'false') boolShowBigIconAlliance = '1';
		
		boolShowCenterMapIcon = getGMcookie("showcentermapicon", false);
		if (boolShowCenterMapIcon == 'false') boolShowCenterMapIcon = '1';
		
		boolOldServerVersion = getGMcookie("serverversion2", false);

		var strLogLevel = getGMcookie("consoleloglevel", false);
		if (strLogLevel != "false" && strLogLevel != false) {
			LOG_LEVEL = parseInt(strLogLevel);
		}
		
		//get the colors for center numbers
		var colorX = getGMcookie("cncolorneutral", false);
		if (colorX != "false" && colorX != "") {
			CN_COLOR_NEUTRAL = colorX;
		}

		colorX = getGMcookie("cncolormaxlevel", false);
		if (colorX != "false" && colorX != "") {
			CN_COLOR_MAX_LEVEL = colorX;
		}

		colorX = getGMcookie("cncolornoupgrade", false);
		if (colorX != "false" && colorX != "") {
			CN_COLOR_NO_UPGRADE = colorX;
		}

		colorX = getGMcookie("cncolornpcupgrade", false);
		if (colorX != "false" && colorX != "") {
			CN_COLOR_UPGRADABLE_VIA_NPC = colorX;
		}
	}

	/**
	 * try to find the add/banner and hide it (adds are usual only for german servers !)
	 */
	function hideAd(){
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
				if (header3) {
					if (header3.id != "ltop1") header3.style.display = 'none';
				}
				var lres = get("lres2");
				if (lres) lres.style.top = '100px';
			}
		}
	}

	/**
	 * Change the menu on the left side
	 */
	function leftMenuLinks(){
		var menu = find("//td[@class='menu']", XPFirst);
		//if (menu == undefined || menu == null) return;
		for (var j = 0; j < 2; j++) {
			for (var i = 0; i < menu.childNodes.length; i++) {
				if (menu.childNodes[i].nodeName == 'BR') {
					removeElement(menu.childNodes[i]);
				} else {
					var entryAttributes = menu.childNodes[i].attributes;
					if (entryAttributes) {
						for (var xi = 0; xi < entryAttributes.length; xi++) {
							if (entryAttributes[xi].nodeValue.indexOf('chatname') != -1) {
								crtUserName = entryAttributes[xi].nodeValue;
								crtUserName = crtUserName.substr(crtUserName.indexOf("|") + 1);
							}
						}
					}
				}
			}
		}

		var warsimOption = getGMcookie('warsim', false);
		if (warsimOption == "false" || warsimOption == "0") {
			var linkWarSim = warsimIntLink;
		} else {
			var linkWarSim = warsimExtLink;
		}

		var wsAnalyserOption = getGMcookie('wsanalyser', false);
		if (wsAnalyserOption == false || wsAnalyserOption == "0") {
			var linkWAnalyser = wsURLStart["0"];
			var labelWAnalyser = T('WANALYSER0');
		} else {
			var linkWAnalyser = wsURLStart["1"];
			var labelWAnalyser = T('WANALYSER1');
		}

		var traviantoolboxlanguage;
		switch (detectedLanguage) {
			case "il": traviantoolboxlanguage = "he"; break;
			case "us":
			case "uk":
			case "en": traviantoolboxlanguage = "en"; break;
			case "es":
			case "ar":
			case "cl":
			case "mx": traviantoolboxlanguage = "es"; break;
			case "kr": traviantoolboxlanguage = "ko"; break;
			case "pt":
			case "br": traviantoolboxlanguage = "pt"; break;
			case "tw":
			case "hk": traviantoolboxlanguage = "cn"; break;
			default: traviantoolboxlanguage = detectedLanguage; break;
		}

		var allLinks = [0,
				[T('LOGIN'), "login.php"],
				[T('ALLIANCE'), "allianz.php"],
				[T('RALLYPOINT'), "a2b.php"],
				[T('SIM'), linkWarSim, "_blank"],
                0
			];

		if (boolShowMenuSection3 == "1") {
			var menuSection3Links = [
				//[T('CROPFINDER'), wsURLStart[1] + wsServerName + wsURLCropFinderLink, "_blank"],
				[T('CROPFINDER'), wsURLCropFinderLinkV2, "_blank"],
				['Travilog', "http://travilog.org.ua/" + detectedLanguage + "/", "_blank"],
				['Toolbox', "http://www.traviantoolbox.com/index.php?lang=" + traviantoolboxlanguage, "_blank"],
				['Travian Utility', "http://travianutility.netsons.org/index_en.php", "_blank"],
				[T('MAPA'), "http://travmap.shishnet.org/?lang=" + detectedLanguage, "_blank"],
				[labelWAnalyser, linkWAnalyser + wsServerName, "_blank"],
				0
			];
			allLinks = allLinks.concat(menuSection3Links);
		}
		
		for(var i = 0; i < allLinks.length; i++){
			if(allLinks[i]){
				if (((allLinks[i][1] == "allianz.php") && (boolShowBigIconAlliance != "1")) || (allLinks[i][1] != "allianz.php")) {
					//var aLink = elem("A", allLinks[i][0]);
					var aLink = newLink(allLinks[i][0], [['href', allLinks[i][1]]]);
					aLink.href = allLinks[i][1];
					if (allLinks[i][2]) aLink.setAttribute('target', allLinks[i][2]);
					menu.appendChild(aLink);
				}
			} else menu.appendChild(document.createElement('HR'));
		}
		
		var presentationLink = newLink(T('SCRIPTPRESURL'), [['target', '_blank'], ['href', SCRIPT.presentationurl]]);
		menu.appendChild(presentationLink);
		
		var updateLink = newLink(T('CHECKVERSION'), [["href", jsVoid]]);
		updateLink.addEventListener('click', function() {updateScript(SCRIPT)}, false);
		menu.appendChild(updateLink);
	}

	function bigIconsBar(){
		//localise superior bar with the big icons
		//move the  "Plus" icon
		
		var intAdditionalIcons = 0;
		var bigIconBar = get('ltop5');
		//if (bigIconBar == undefined || bigIconBar == null) return;
		bigIconBar.style.display = 'none';

		//create the setup icon
		var setupLink = newLink("<img id='n9' src='" + img('a/x.gif') + "'>", [['title', T('TBSETUPLINK')], ['href', jsVoid]]);
		setupLink.addEventListener('click', TravianBeyondSetup, false);
		
		bigIconBar.setAttribute("style", docDirection + ":10px");
		bigIconBar.style.width = '800px';
		
		var aPlus = find("//a[contains(@href, 'plus.php')]", XPFirst);
		if (aPlus) { bigIconBar.removeChild(aPlus);}

		var boolShowBigIconMarket = getGMcookie("showbigiconmarket", false);
		var boolShowBigIconMilitary = getGMcookie("showbigiconmilitary", false);
		var boolShowBigIconMilitary2 = getGMcookie("showbigiconmilitary2", false);
		
		//enable the icons if Setup has not been visited yet
		if (boolShowBigIconMarket == 'false') boolShowBigIconMarket = '1';
		if (boolShowBigIconMilitary == 'false') boolShowBigIconMilitary = '1';
		if (boolShowBigIconMilitary2 == 'false') boolShowBigIconMilitary2 = '1';
		
		if (boolShowBigIconMarket == "1") {
			// Associate the market map with the image created
			var marketLink = newLink("<img usemap='#market' id='n6' src='" + img('a/x.gif') + "'>");
			bigIconBar.appendChild(marketLink);
			intAdditionalIcons += 1;
		}
		
		if (boolShowBigIconMilitary == "1") {
			// Associate the military map with the imaged created
			var militaryLink = newLink("<img usemap='#militar' id='n7' src='" + img('a/x.gif') + "'>");
			bigIconBar.appendChild(militaryLink);
			intAdditionalIcons += 1;
		}
		
		if (boolShowBigIconMilitary2 == "1") {
			// Associate the military map with the imaged created
			var militaryLink2 = newLink("<img usemap='#militar2' id='n10' src='" + img('a/x.gif') + "'>");
			bigIconBar.appendChild(militaryLink2);
			intAdditionalIcons += 1;
		}
		
		if (boolShowBigIconAlliance == "1") {
			//Associate the ally with the image created
			var allyLink = newLink("<img usemap='#alliance' id='n8' src='" + img('a/x.gif') + "' title='" + T('ALLIANCE') + "' alt = '" + T('ALLIANCE') + "'>");
			bigIconBar.appendChild(allyLink);
			intAdditionalIcons += 1;
		}
		
		bigIconBar.appendChild(aPlus);

		if (boolShowBigIconMarket == "1") {
			// Map for the market big icon
			bigIconBar.innerHTML += '<map name="market"><area shape="rect" coords="0,0,70,50" href="build.php?gid=17" title="' + T('ENVIAR') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=17&t=1" title="' + T('COMPRAR') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=17&t=2" title="' + T('VENDER') + '"></map>';
		}

		if (boolShowBigIconMilitary == "1") {
			// Map for the military big icon
			bigIconBar.innerHTML += '<map name="militar"><area shape="rect" coords="0,0,35,50" href="build.php?gid=16&j&k" title="' + T('RALLYPOINT') + '"><area shape="rect" coords="35,0,70,50" href="build.php?gid=19" title="' + T('BARRACKS') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=20" title="' + T('STABLE') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=21" title="' + T('WORKSHOP') + '"></map>';
		}
		
		if (boolShowBigIconMilitary2 == "1") {
			// Map for the military big icon
			bigIconBar.innerHTML += '<map name="militar2"><area shape="rect" coords="0,0,35,50" href="build.php?gid=24" title="' + T('TOWNHALL') + '"><area shape="rect" coords="35,0,70,50" href="build.php?gid=37" title="' + T('HEROSMANSION') + '"><area shape="rect" coords="0,50,35,100" href="build.php?gid=12" title="' + T('BLACKSMITH') + '"><area shape="rect" coords="35,50,70,100" href="build.php?gid=13" title="' + T('ARMOURY') + '"></map>';
		}
		
		if (boolShowBigIconAlliance == "1") {
			var forumLink = getGMcookie("allianceforumlink", false);
			if (forumLink == "0" || forumLink == "false" || forumLink == "") {
				forumLink = "allianz.php?s=2";
			} else {
				forumLink += ' target="_blank"';
			}
			bigIconBar.innerHTML += '<map name="alliance"><area shape="rect" coords="0,0,35,50" href="allianz.php" title="' + T('ALLIANCE') + ':&nbsp;' + T('OVERVIEW') + '"><area shape="rect" coords="35,0,70,50" href=' + forumLink + ' title="' + T('ALLIANCE') + ':&nbsp;' + T('FORUM') + '"><area shape="rect" coords="0,50,35,100" href="allianz.php?s=3" title="' + T('ALLIANCE') + ':&nbsp;' + T('ATTACKS') + '"><area shape="rect" coords="35,50,70,100" href="allianz.php?s=4" title="' + T('ALLIANCE') + ':&nbsp;' + T('NEWS') + '"></map>';
		}

		//insert an empty image based on the boolShowBigIconsOptions
		switch (intAdditionalIcons) {
			case 1: var leftM = 115;
				break;
			case 2: var leftM = 80;
				break;
			case 3: var leftM = 45;
				break;
			case 4: var leftM = 10;
				break;
			default: var leftM = 141;
				break;
		}
		
		var emptyImage = newImage([['src', img('a/x.gif')], ['width', leftM + 'px'], ['height', '100px']]);

		bigIconBar.insertBefore(emptyImage, bigIconBar.firstChild);
		bigIconBar.insertBefore(setupLink, emptyImage);

		bigIconBar.style.display='';
	}

	function createStatLink(strType, aX, textURL) {
		var linkType;
		var linkURLws = '';
		var statLink = '';
		var wsAnalyserOption = getGMcookie('wsanalyser', false);
		if (wsAnalyserOption == "false" || wsAnalyserOption == "0") {
			var linkWAnalyser = wsURLStart["0"];
			var labelWAnalyser = T('WANALYSER0');
			if (strType == "user") {
				linkType = 'uid=';
			} else if (strType == "ally") {
				linkType = 'aid=';
			}
			linkURLws = linkWAnalyser + wsServerName + "&" + linkType + aX;
		} else {
			var linkWAnalyser = wsURLStart["1"];
			var labelWAnalyser = T('WANALYSER1');
			if (strType == "user") {
				linkType = 'idu=';
			} else if (strType == "ally") {
				linkType = 'ida=';
			}
			linkURLws = linkWAnalyser + wsServerName + "&" + linkType + aX;
		}

		if (textURL) {
			var statLink = newLink(textURL, [['target', '_blank'], ['href', linkURLws]]);
		} else if (linkURLws != '') {
			var aImg = newImage([['src', image["globe"]], ['style', 'margin:0px 2px -2px 3px; display:inline;'], ['title', labelWAnalyser], ['border', '0']]);
			statLink = newLink("", [['target', '_blank'], ['href', linkURLws]]);
			statLink.appendChild(aImg);
		}
		//statLink.href = linkURLws;
		return statLink;
	}

	function createMapLink(strType, aX) {
		var smURLStart = "http://travmap.shishnet.org/map.php?lang=" + detectedLanguage + "&server=" + fullServerName;
		var smURLEnd = "&groupby=player&casen=on&format=svg&azoom=on";
		var hrefMapPage = '';
		var linkMapPage = '';
		if (strType == "user") {
			hrefMapPage = smURLStart + "&player=id:" + aX + smURLEnd;
		} else if (strType == "ally") {
			hrefMapPage = smURLStart + "&alliance=id:" + aX + smURLEnd;
		}
		if (hrefMapPage != '') {
			var aImg = newImage([['src', image["smap"]], ['style', 'margin:0px 2px -2px 3px; display:inline;'], ['title', 'Map'], ['border', '0']]);
			var linkMapPage = newLink("",[['href', hrefMapPage], ['target', '_blank']]);
			linkMapPage.appendChild(aImg);
		}
		return linkMapPage;
	}

	function insertTravMapUserLink(aNode, uid) {
		//insert the Travmap link
		aNode.parentNode.insertBefore(createMapLink("user", uid), aNode.nextSibling);
	}

	function insertWALink(aNode, uid) {
		//insert the Travian World Analyser link
		aNode.parentNode.insertBefore(createStatLink("user", uid), aNode.nextSibling);
	}
	
	function insertIGMLink(aNode, uid) {
		// Insert the IGM link
		var aImg = newImage([['src', image["igm"]], ['style', 'margin:3px 0px 1px 3px; display:inline;'], ['title', T('SENDIGM')], ['border', '0']]);
		var igmLink = newLink("", [['href', 'nachrichten.php?t=1&id=' + uid]]);
		igmLink.appendChild(aImg);
		aNode.parentNode.insertBefore(igmLink, aNode.nextSibling);
	}
	
	function addReadMesRepInPopup(aNode) {
		//var boolShowMesOpenLinks = getGMcookie("showmesopenlinks", false);
		//if (boolShowMesOpenLinks == 'false') boolShowMesOpenLinks = '1';
		//if (boolShowMesOpenLinks == "1") {
			var aButton = newLink("&nbsp;&nbsp;", [['href', "javascript:void(0);"], ['align', docDirection]]);
			var aImg = newImage([['src', image['igmopen']]]);;
			aImg.addEventListener("click", createMesRepPopup(aNode), false);
			aButton.appendChild(aImg);
			aNode.parentNode.insertBefore(aButton, aNode.nextSibling);
		//}
		
		function createMesRepPopup(aNode) {
			return function() {
				ajaxRequest(aNode.href, 'GET', null, function(AJAXrespX) {
					var aDoc = document.implementation.createDocument("", "", null);
					var aElem = document.createElement('DIV');
					aElem.innerHTML = AJAXrespX.responseText;
					aDoc.appendChild(aElem);
					var aValue = aDoc.evaluate("//div[@id='lmid2']", aElem, null, XPFirst, null).singleNodeValue;
					if (aValue) {
						if (!get("mr_tooltip")) {
							createMrTooltip();
						}
						var tooltip = get("mr_tooltip");
						
						if (get('lmid2_1')) removeElement(get('lmid2_1'));
						aValue.setAttribute('id', 'lmid2_1');
						
						tooltip.appendChild(aValue);
						
						//process message
						//var arrayCells = aDoc.evaluate("//td[@background]", aElem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
						var arrayCells = xpathResultEvaluate("//td[@background]");
						//log(3, "arrayCells = " + arrayCells);
						if (arrayCells.snapshotLength > 0) {
							//add coordinates in message if needed
							for (var i = 0; i < arrayCells.snapshotLength; i++) {
								var aCell = arrayCells.snapshotItem(i);
								var iHTML = aCell.innerHTML;
								aCell.innerHTML = processCoordsInMessage(iHTML);
							}
						} else {
							//process battle Report
							battleReport();
						}
						
						tooltip.style.display = "block";
						
					}
				}, dummy);
			}
		}
		
		function createMrTooltip() {
			var div = elem("DIV");
			div.setAttribute("id", "mr_tooltip");
			div.setAttribute("style", "position: absolute; width: 450px; top: 90px; " + docDirection + ": 680px; display: block; padding: 1px; z-index: 100; clear: both; border: solid 2px #C0C0C0; background-color: #FFFFFF;");
			div.innerHTML = "";
			
			var dragDiv = elem("DIV");
			dragDiv.setAttribute("style", "height:20px; width: 405px; float: " + docDirection + "; cursor: pointer; borderBottom: solid 1px #C0C0C0; background-color: #C0C0C0;");
			dragDiv.innerHTML = "";
			
			var closeDiv = elem("DIV");
			closeDiv.setAttribute("style", "height:20px; width: 45px; float: " + docDirection + "; borderBottom: solid 1px #C0C0C0; background-color: #C0C0C0;");
			closeDiv.innerHTML = "";
			
			var closeImage = newImage([['src', closeButton], ['style', 'cursor:pointer'], ['title', T('CLOSE')]]);
			closeImage.addEventListener("click", function() {get("mr_tooltip").style.display = "none"; }, false);
			closeDiv.appendChild(closeImage);
			
			makeDraggable(div, dragDiv);
			div.appendChild(dragDiv);
			div.appendChild(closeDiv);
			
			document.body.appendChild(div);
		}
	}
	
	function insertUserLinks(aNode, uid) {
		if (boolShowTravmapLinks == "1") {
			insertTravMapUserLink(aNode, uid);
		}
		if (boolShowStatLinks == "1") {
			insertWALink(aNode, uid);
		}
		var boolShowIGMLinkForMe = getGMcookie("showigmlinkforme", false);
		if (crtUserID != uid || (crtUserID == uid && boolShowIGMLinkForMe != "0")) {
			insertIGMLink(aNode, uid);
		}
	}
	
	/**
	 * Crea un enlace para mandar un IGM cuando aparece un enlace al perfil de un jugador, un enlace de
	 * ataque rapido cuando aparece un enlace a una ubicacion del mapa, y otro enlace de estadisticas si
	 * esta soportado para el language del servidor activo
	 */
	function playerLinks(){
		var boolShowRPrInfoTooltips = getGMcookie("showrprinfotooltips", false);
		if (boolShowRPrInfoTooltips == 'false') boolShowRPrInfoTooltips = '1';
		
		var boolShowMesOpenLinks = getGMcookie("showmesopenlinks", false);
		if (boolShowMesOpenLinks == 'false') boolShowMesOpenLinks = '1';
		
		var allLinks = document.getElementsByTagName("a");
		for(var i = 0; i < allLinks.length; i++) {
			// if it's a player link
			if (allLinks[i].href.search(/spieler.php\?uid=(\d+$)/) > 0) {
				var a = RegExp.$1;
                if (a == 0) continue;
				if (allLinks[i].parentNode.className == 'menu') continue;
				insertUserLinks(allLinks[i], a);
			
			// the attack link for karte.php links
			} else if (allLinks[i].href.search(/karte.php\?d=(\d+)/) > 0  && location.href.indexOf("build.php?gid=17") == -1 && location.href.indexOf("&t=1") == -1 && allLinks[i].href.indexOf("#") == -1) {
				var newdid = RegExp.$1;
				if (newdid != villageID) {
					// insert an market link for this village
					var srlink = elem('a',"&nbsp;<img src='" + image["img4"] + "' style='margin:3px 0px 1px 3px; display:inline;' height='12' title='" + T('ENVIAR') + "' alt='" + T('ENVIAR') + "' border='0'>");
					srlink.href = allLinks[i].href.replace("karte.php?d", "build.php?z") + "&gid=17";
					allLinks[i].parentNode.insertBefore(srlink, allLinks[i].nextSibling);
					// insert an attack/reinforcement link for this village
					var arrAction = getRallyPointDefaultActionArray();
					var atklink = elem('a',"&nbsp;<img src='" + image[arrAction[0]] + "' style='margin:3px 0px 1px 3px; display:inline;' height='12' title='" + arrAction[1] + "' alt='" + arrAction[1] + "' border='0'>");
					atklink.href = 'a2b.php?z=' + newdid;
					allLinks[i].parentNode.insertBefore(atklink, allLinks[i].nextSibling);
					
					if (boolShowRPrInfoTooltips == "1" & (location.href.indexOf("build.php?id=39") != -1 || location.href.indexOf("gid=16") != -1 || location.href.indexOf("berichte.php") != -1) || location.href.indexOf("spieler.php?uid") != -1) {
						//add a tooltip including distance and troop times
						allLinks[i].addEventListener("mouseover", showCoordAndDist(newdid), false);
						allLinks[i].addEventListener("mouseout", function() {get("tb_tooltip").style.display = 'none';}, false);
					}
				}	
			// if it's an alliance link
			} else if (allLinks[i].href.search(/allianz.php\?aid=(\d+$)/) > 0){
				var a = RegExp.$1;
				if (a == 0) continue;

				if (boolShowTravmapLinks == "1") {
					//insert the Travmap link
					allLinks[i].parentNode.insertBefore(createMapLink("ally", a), allLinks[i].nextSibling);
				}

				if (boolShowStatLinks == "1") {
					//insert the Travian World Analyser link
					allLinks[i].parentNode.insertBefore(createStatLink("ally", a), allLinks[i].nextSibling);
				}
			//if it's a message link
			} else if (boolShowMesOpenLinks == "1") {
				if (allLinks[i].href.indexOf("nachrichten.php?id=") != -1 || allLinks[i].href.indexOf("berichte.php?id=") != -1) {
					addReadMesRepInPopup(allLinks[i]);
				}
			}
		}
		
		function showCoordAndDist(newdid) {
			return function() {
				var toolTipHTML = "<table class='f8' cellpadding='0' cellspacing='0' border='0'>";
				var xyCoord = id2xy(newdid);
				toolTipHTML += "<td colspan='2' align='center' style='font-weight:bold; color:green; border-bottom:1px grey solid;'>(" + xyCoord + ")</td>";
				toolTipHTML += getTroopMerchantTooltipHTML(newdid, "blue", false, true, true);
				toolTipHTML += "</table>";
				var tooltipdiv = get("tb_tooltip");
				if (!tooltipdiv) {
					createTooltip();
				}
				tooltipdiv.innerHTML = toolTipHTML;
				tooltipdiv.style.display = 'block';
			}
		}
	}

	/**
	 * Crea eventos para enviar al formulario de envio de materias primas del mercado las coordenadas
	 * de las propias aldeas.
	 * Codigo sugerido por Bafox
	 */
	function quickCity(){
		var formInput = find("//form[@name='snd']", XPFirst);
		if (formInput == null) return;
		var cities = new Array();
		var xDestination, yDestination;

		// Recupera la coordenada X
		var n = find("//table[@class='dtbl']//td[@class='right dlist1']", XPList);
		for (var i = 0; i < n.snapshotLength; i++){
			cities[i] = new Object();
			try {
				cities[i].x = n.snapshotItem(i).innerHTML.split('(')[1];
			} catch(ex1) {}
		}

		// Recupera la coordenada Y
		n = find("//table[@class='dtbl']//td[@class='left dlist3']", XPList);
		for(var i = 0; i < n.snapshotLength; i++){
			try {
				cities[i].y = n.snapshotItem(i).innerHTML.split(')')[0];
			} catch(ex2){}
		}

		// Por cada par de coordenadas crea un evento para copiarlas al formulario
		n = find("//table[@class='dtbl']//tr", XPList);
		for (var i = 0; i < cities.length; i++){
			var elemVillage = n.snapshotItem(i);
			elemVillage.setAttribute('onClick',"snd.x.value='" + cities[i].x + "';snd.y.value='" + cities[i].y + "'");
			elemVillage.setAttribute('onMouseOver', 'this.style.color="red"');
			elemVillage.setAttribute('onMouseOut', 'this.style.color="black"');
			elemVillage.style.cursor = "pointer";
		}


		if  (location.href.indexOf('a2b.php') > -1 || location.href.indexOf('karte.php?d=') > -1) {
			var xyValues = new Array();
			xyValues[0] = find("//form[@name='snd']//input[@name='x']", XPFirst);
			xyValues[0].addEventListener('keyup', function() {captureDestination();}, 0);
			xyValues[1] = find("//form[@name='snd']//input[@name='y']", XPFirst);
			xyValues[1].addEventListener('keyup', function() {captureDestination();}, 0);
			if (location.href.indexOf('a2b.php?z=') > -1) captureDestination();
			if (location.href.indexOf('a2b.php?newdid=') > -1 && location.href.indexOf('z=')) captureDestination();
		}

		function captureDestination() {
			var xDestination = xyValues[0].value;
			var yDestination = xyValues[1].value;
			if (xDestination != "" && yDestination != "") {
				var oldTable = get("trooptimetable");
				if (oldTable) {
					var oldChild = oldTable.parentNode.removeChild(oldTable);
				}
				var ttTable = newTable();

				//for compatibility to the Travian Battle Analyser (where an additional <p/> element is introduced to the lmid2 div)
				var parOK = find("//form[@name='snd']/p[4]", XPFirst);
				if (!parOK) {
					//normal case, when Travian Battle Analyser is not active
					var parOK = find("//form[@name='snd']/p[3]", XPFirst);
				}
				parOK.appendChild(ttTable);
				var aRow = newRow("&nbsp;");
				ttTable.appendChild(aRow);

				createTimeTroopTable(aRow, xDestination, yDestination);
			} else {
				var oldTable = get("trooptimetable");
				if (oldTable) {
					oldTable.style.visibility = "hidden";
				}
			}
			return;
		}
	}

	/**
	 * Calcula y muestra informacion adicional en los informes de los ataques
	 * Codigo inicial de Bafox
	 */
	function battleReport(aFrom){
		//log(3, "Enter battleReport");
		var t = find("//table[@class='tbg']//table[@class='tbg']", XPList);
		if (!t) return;
		if (t.snapshotLength < 2) return;
		
		if (aFrom) {
			var origTable = find("//table[@class='tbg']", XPFirst);
			var newOrigTable = origTable.cloneNode(true);
			var divlmid2 = find("//div[@id='lmid2']", XPFirst);
			divlmid2.removeChild(origTable);
			//add a paragraph, a table with a text and a checkbox
			var input = elem("INPUT");
			input.setAttribute("type", "checkbox");
			//input.setAttribute("border", "0");
			input.setAttribute("id", "tb_battlereport");
			input.addEventListener("click", function(){ showHideOriginalBattleReport(p1, newOrigTable, origTable); }, 0);

			var p2 = elem("P", "");
			var ptable = newTable();
			var aRow = newRow("");
			var aCell = elem("TD", T('SHOWORIGREPORT') + ":");
			aRow.appendChild(aCell);
			var bCell = elem("TD", "");
			bCell.appendChild(input);
			aRow.appendChild(bCell);
			ptable.appendChild(aRow);
			p2.appendChild(ptable);
			divlmid2.appendChild(p2);

			//create a  second paragraph (for displaying the tables)
			var p1 = elem("P", "");
			//append the paragraph to the divlmid2
			var divlmid2 = get("lmid2");
			divlmid2.appendChild(p1);

			p1.appendChild(origTable);
		}
		
		//get the total booty
		var booty = null;
		var aX = find("//tr[@class='cbg1']", XPList);
		if (aX.snapshotLength >= 3){
			if (aX.snapshotItem(1).childNodes.length == 4){
				var b = aX.snapshotItem(1).childNodes[3];
			} else {
				var b = aX.snapshotItem(1).childNodes[1];
			}
			if (b.childNodes.length == 8){
				var cantidades_botin = new Array();
				cantidades_botin[0] = parseInt(b.childNodes[1].nodeValue);
				cantidades_botin[1] = parseInt(b.childNodes[3].nodeValue);
				cantidades_botin[2] = parseInt(b.childNodes[5].nodeValue);
				cantidades_botin[3] = parseInt(b.childNodes[7].nodeValue);
				booty = arrayToInt(cantidades_botin);
				var info_botin = '';
				for (var i = 0; i < 4; i++){
					info_botin += '<img src="' + image["img" + (i+1)] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '">';
					info_botin += cantidades_botin[i];
					if (i < 3) info_botin += ' + '; else info_botin += ' = ';
				}
				info_botin += booty;
				b.innerHTML = info_botin;
			}
		}

		var perds = new Array();
		var carry = new Array();
		// Por cada participante en la batalla (atacante, defensor y posibles apoyos)
		for(var g = 0; g < t.snapshotLength; g++){
			carry[g] = 0;
			var tt = t.snapshotItem(g);
			var num_elementos = tt.rows[1].cells.length - 1;
			for(var j = 1; j < 11; j++){
				// Recupera la cantidades de tropa de cada tipo que han intervenido
				var u = uc[tt.rows[1].cells[j].getElementsByTagName('img')[0].src.replace(/.*\/.*\//,'').replace(/\..*/,'')];
				var p = tt.rows[3] ? tt.rows[3].cells[j].innerHTML : 0;
				// Basandose en el coste por unidad y su capacidad, se calculan las perdidas y la capacidad de carga total
				var ptu = arrayByN(u, p);
				perds[g] = arrayAdd(perds[g], ptu.slice(0, 4));
				carry[g] += (tt.rows[2] ? tt.rows[2].cells[j].innerHTML - p : 0) * u[4];
			}

			// Anyade la nueva informacion como una fila adicional en cada aTable
			var iHTML = '';
			for (var i = 0; i < 4; i++){
				iHTML += '<img src="' + image["img" + (i+1)] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '">';
				iHTML += perds[g][i];
				if (i < 3) iHTML += ' + '; else iHTML += ' = ';
			}
			var perdidas = arrayToInt(perds[g]);
			iHTML += perdidas;
			var informe = newCell(iHTML, [['colspan', num_elementos], ['class', 's7']]);
			var fila = newRow("", [['class', 'cbg1']]);
			//fila.className = "cbg1";
			fila.appendChild(elem("TD", T('LOSS')));
			fila.appendChild(informe);
			tt.appendChild(fila);

			// Solo para el atacante se calcula y muestra la rentabilidad y eficiencia del ataque
			if (g == 0 && booty != null){
				// La rentabilidad muestra el botin en comparacion con las perdidas
				var rentabilidad = Math.round((booty - perdidas) * 100 / booty);
				if (booty == 0)	if (perdidas == 0) rentabilidad = 0; else rentabilidad = -100;
				var datos = newCell(rentabilidad + "%", [['colspan', num_elementos], ['class', 's7']]);
				var fila_datos = newRow("", [['class', 'cbg1']]);
				//fila_datos.className = "cbg1";
				fila_datos.appendChild(elem("TD", T('PROFIT')));
				fila_datos.appendChild(datos);
				tt.appendChild(fila_datos);

				// La eficiencia muestra el botin en comparacion con la cantidad de tropas utilizadas
				//var eficiencia = 100 - Math.round((carry[g] - booty) * 100 / carry[g]);
				var eficiencia = 100 - ((carry[g] - booty) * 100 / carry[g]);
				if (carry[g] == 0) eficiencia = 0;
				var datos = newCell(eficiencia.toFixed(2) + "% (" + booty + "/" + carry[g] + ")", [['colspan', num_elementos], ['class', 's7']]);
				var fila_datos = newRow("", [['class', 'cbg1']]);
				//fila_datos.className = "cbg1";
				fila_datos.appendChild(elem("TD", T('EFICIENCIA')));
				fila_datos.appendChild(datos);
				tt.appendChild(fila_datos);
			}
		}

		function showHideOriginalBattleReport(p1, newOrigTable, origTable) {
			var input = get("tb_battlereport");
			if (input) {
				if (input.checked == true) {
					p1.removeChild(origTable);
					p1.appendChild(newOrigTable);

				} else {
					p1.removeChild(newOrigTable);
					p1.appendChild(origTable);
				}
			}
		}

	}

	/**
	 * Realiza un resumen de la pagina de production
	 */
	function preCompute1(){
		var datos = 0;
		var boolIsThisTheCapital = isThisTheCapital();
		var currentTotalRes = 0;
		
		//get cookie for server version
		//boolOldServerVersion = getGMcookie("serverversion2", false);

		for (i = 0; i < 4; i++) {
			currentTotalRes += parseInt(currentResUnits[i]);
		}

		if (boolShowResColorCodes == "1") {
			//create the DIV for the coloured level numbers
			var posDIV = elem("DIV", "");
			posDIV.id = 'resDiv';
			if (docDirection == 'right') {posDIV.setAttribute('style', 'position:absolute; top:69px; left:257px; z-index:20;');}
			var parentOfposDIV = get("lmid2");
			parentOfposDIV.appendChild(posDIV);
		}

		// Crea una matriz inicializada a 0 con todos los posibles niveles de cada tipo de resource
		var grid = new Array(4);
		for (var i = 0; i < 4; i ++) {
			grid[i] = new Array(26);
			for(var j = 0; j <= 25; j++) {
				grid[i][j] = 0;
			}
		}

		// Solo hay 6 tipos de aldeas de 15 casillas cada uno. Se describe el tipo de resource por casilla
		var dist = [
			[3, 3, 0, 3, 3, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1], // 9 cereales
			[2, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 2, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 1, 1, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[0, 3, 0, 2, 0, 1, 2, 3, 3, 2, 2, 3, 3, 0, 3, 1, 0, 1],
			[3, 3, 0, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3] // 15 cereales
		];

		find("//div[starts-with(@id, 'f')]", XPFirst).id.search(/f(\d)/);
		var tipo = RegExp.$1;

		var aTitle = find("//map[starts-with(@name, 'rx')]", XPFirst);

		// get all fields and fill the matrix with the levels detected
		for (var i = 1; i <= 18; i++){
			var a = find("//img[@class='rf" + i + "']", XPFirst);

			var resLink = newLink("", [['href', "build.php?id=" + i], ['id', "RES" + i], ['class', "rf" + i], ['title', aTitle.areas[i-1].title]]);
			//resLink.href = "build.php?id=" + i;
			//resLink.id = "RES"+i;
			//resLink.className = "rf" + i;
			//resLink.title = aTitle.areas[i-1].title;
			var aDIV = elem("DIV", "");
			aDIV.setAttribute('id', 'Res' + i);
			aDIV.className = 'CNbuildingtags';

			resLink.appendChild(aDIV);
			if (posDIV) {posDIV.appendChild(resLink);}
			var crtLevel = 0;

			if (a){
				a.src.search(/\/s(\d+).gif$/);
				crtLevel = parseInt(RegExp.$1);
				grid[dist[tipo - 1][i - 1]][crtLevel] = i;
			} else {
				grid[dist[tipo - 1][i - 1]][0] = i;
				crtLevel = 0;
			}

			if (boolShowResColorCodes == "1") {
				if ((boolIsThisTheCapital == false && crtLevel < 10) || (boolIsThisTheCapital == true && boolOldServerVersion != "1") || (boolIsThisTheCapital == true && boolOldServerVersion == "1" && crtLevel < 12)) {
					//select resource type
					var boolNotUpgradable = false;
					var boolIsUpgradableViaNPC = false;
					var neededTotalRes = 0;
					eval('var nameStruct = ' + gidToName[parseInt(dist[tipo - 1][i - 1]) + 1] + 'Cost;');
					for (k = 0; k < 4; k++) {
						if (currentResUnits[k] < nameStruct[crtLevel + 1][k]) {
							boolNotUpgradable = true;
						}
						neededTotalRes += nameStruct[crtLevel + 1][k]
					}
					if (neededTotalRes <= currentTotalRes) {
						boolIsUpgradableViaNPC = true;
					}
					if (boolIsUpgradableViaNPC && boolNotUpgradable) {
						aDIV.style.visibility = 'visible';
						aDIV.style.backgroundColor = CN_COLOR_UPGRADABLE_VIA_NPC;
					} else if (boolNotUpgradable) {
						aDIV.style.visibility = 'visible';
						aDIV.style.backgroundColor = CN_COLOR_NO_UPGRADE;
					}
				} else {
					aDIV.style.visibility = 'visible';
					aDIV.style.backgroundColor = CN_COLOR_MAX_LEVEL;
				}
				aDIV.innerHTML = '' + crtLevel;
			}
		}

		var boolShowResUpgradeTable = getGMcookie("showresupgradetable", false);
		if (boolShowResUpgradeTable == 'false') boolShowResUpgradeTable = '1';

		if (boolShowResUpgradeTable == '1') {

		// Crea una aTable mostrando por cada tipo de resource un representante de cada nivel que se ha encontrado
		// Muestra al lado de cada uno los resources y tiempo restantes hasta poder subirlo de nivel
		var table = newTable([["class", "tbg"], ["align", docDirection], ["cellspacing", "1"], ["cellpadding", "2"], ["id", "resumen"]]);
		var fila1 = newRow("", [['class', 'rbg']]);
		var fila2 = newRow("");
		table.appendChild(fila1);
		table.appendChild(fila2);
		for (var i = 0; i < 4; i++){
            var td1 = newCell('<img src="' + image["img" + (i+1)] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (i+1)) + '">', [['width','25%']]);
			fila1.appendChild(td1);

			var td2 = newCell("", [['valign', 'top'], ['width','25%']]);
			fila2.appendChild(td2);

			var table2 = newTable([['align', 'center'], ['valign', 'top']]);
			td2.appendChild(table2);
			for (var j = 0; j < 25; j++){

				if ((boolIsThisTheCapital) || (!boolIsThisTheCapital && j < 10)){
					if (grid[i][j] > 0 && buildingCost[i][j+1] != null){
						datos = 1;
						var fila3 = newRow("");
						var imagen = '<a href="/build.php?id='+grid[i][j]+'"><div style="width: 0%;"><img src="' + image["r" + i] + '" border="0" title="' + T('RECURSO' + (i+1)) + '">';
						imagen += '<img src="' + image["s" + j] + '" style="position:relative; bottom:51px; ' + docDirection + ':27px;" border="0">';
						imagen += '</div></a>';
						var td = elem("TD", imagen);
						fila3.appendChild(td);

						var restante = calculateResourceTime(buildingCost[i][j+1]);
						var td3 = newCell("", [['class', 'dcol f7']]);
						fila3.appendChild(td3);
						table2.appendChild(fila3);

						if (restante != null) {
							td3.setAttribute('valign', 'bottom');
							td3.innerHTML = restante;
						} else {
							td3.setAttribute('valign', 'center');
							td3.setAttribute('style', 'font-size:8pt; font-weight:bold; color:#000000');
							td3.innerHTML = '<a href="/build.php?id=' + grid[i][j] + '">' + T('EXTAVAILABLE') + '</a>';
						}
					}
				}
			}
		}
		// Se desplaza la aTable hacia abajo para no interferir con la lista de aldeas / enlaces derecha
		if (datos == 1)  {
			var middleblock = get('lmidall');
			var TableY = longitudPantalla() + 'px';
			table.style.top = TableY;
			table.style.position = "absolute";
			middleblock.appendChild(table);
        }
		}
	}

	/**
	 * Realiza un resumen de la pagina de edificios de la village
	 */
	function preCompute2(){
		var edificiosPorFila = 4;
		var datos = 0;
		var buildingsImages = new Array();
		var buildingsDescs = new Array();
		var buildingsLinks = new Array();

		//newdidActive = getNewdidVillage();

		ShowCenterNumbers();

		// recoge los nombres de cada uno
		var xpathResult = find('//map[@name="map1"]/area/@title', XPIterate);
		while ((buildingsDescs[buildingsDescs.length] = xpathResult.iterateNext())) {}

		// los enlaces para acceder directamente a ellos
		xpathResult = find('//map[@name="map1"]/area/@href', XPIterate);
		while ((buildingsLinks[buildingsLinks.length] = xpathResult.iterateNext())) {}

		// Procesa as image de los edificios
		var xpathResult = find('//div[@id="lmid2"]/img/@src', XPIterate);
		buildingsImages[0] = document.createTextNode(img('g/g16.gif'));
		while ((buildingsImages[buildingsImages.length] = xpathResult.iterateNext())) {}
		// Soporte para murallas
		var a = find("//div[starts-with(@class, 'd2_x')]", XPFirst);
		if (a){
			switch(a.className){
				case 'd2_x d2_0': break;
				case 'd2_x d2_1': var b = "g/g31.gif"; break;
				case 'd2_x d2_11': var b = "g/g32.gif"; break;
				case 'd2_x d2_12': var b = "g/g33.gif"; break;
			}
			if (b) buildingsImages[buildingsDescs.length - 4] = document.createTextNode(img(b));
		}

		for(var i = 0; i < buildingsDescs.length - 3; i++) {
			if(buildingsDescs[i] != null && basename(buildingsImages[i].nodeValue) != 'iso.gif') {
				// Por cada edificio se recoge su nivel y su codigo en el juego
				var buildingLevel = buildingsDescs[i].nodeValue.split(" ");
				buildingLevel = parseInt(buildingLevel[buildingLevel.length-1]);

				var buildingCode = buildingsImages[i].nodeValue.split("/");
				buildingCode = buildingCode[buildingCode.length-1].split(".");
				if (buildingCode[0].search(/(\d+)/)) buildingCode = parseInt(RegExp.$1);

				if (buildingCode == 25) {
					//residence is available in this village - we'll write a GM "cookie" -  useful for the dorf3.php -> culture points page
					setGMcookie('cpbuilding', 25, true);
				}
				if (buildingCode == 26) {
					//palace is available in this village - we'll write a GM "cookie" -  useful for the dorf3.php -> culture points page
					setGMcookie('cpbuilding', 26, true);
				}
				if (buildingCode == 19) {
					//barracks is available in this village - we'll write a GM "cookie - useful for the dorf3.hp -> show troops being trained
					setGMcookie('barracks', 19, true);
					boolIsAvailableBarracks = true; //used for getRace()
					//barracks available so get the race if necessary
					//log(3, "go to getRace");
					getRace();
				}
				if (buildingCode == 29 ) {
					//big barracks is available in this village - we'll write a GM "cookie - useful for the dorf3.hp -> show troops being trained
					setGMcookie('bigbarracks', 29, true);
				}
				if (buildingCode == 21 ) {
					//workshop is available in this village - we'll write a GM "cookie - useful for the dorf3.hp -> show troops being trained
					setGMcookie('workshop', 21, true);
				}
				if (buildingCode == 20 ) {
					//stable is available in this village - we'll write a GM "cookie - useful for the dorf3.hp -> show troops being trained
					setGMcookie('stable', 20, true);
				}
				if (buildingCode == 30 ) {
					//big stable is available in this village - we'll write a GM "cookie - useful for the dorf3.hp -> show troops being trained
					setGMcookie('bigstable', 30, true);
				}
				if (buildingCode == 14) {
					//tournament square is available in this village - we'll write a GM "cookie" - useful for calculating troop times for distances > 30 cells
					setGMcookie('tournamentsquare', buildingLevel, true);
				}
				if (buildingCode == 24) {
					//log(3, "Found Townhall; buildingLevel = " + buildingLevel);
					//town hall is available in this village - we'll write a GM "cookie" - useful for the town hall big icon & dorf3php to check if there are parties thrown
					setGMcookie('townhall', 24, true);
				}
			}
		}

		var boolShowBUpgTable = getGMcookie("showbupgtable");
		if (boolShowBUpgTable == 'false') boolShowBUpgTable = '1';

		if (boolShowBUpgTable == '1') {

			var table = newTable([["class", "tbg"], ["align", docDirection], ["cellspacing", "1"], ["cellpadding", "2"], ["id", "resumen"]]);

			var j = 0;
			for(var i = 0; i < buildingsDescs.length - 3; i++) {
				if(buildingsDescs[i] != null && basename(buildingsImages[i].nodeValue) != 'iso.gif') {
					// Por cada edificio se recoge su nivel y su codigo en el juego
					var buildingLevel = buildingsDescs[i].nodeValue.split(" ");
					buildingLevel = parseInt(buildingLevel[buildingLevel.length-1]);

					var buildingCode = buildingsImages[i].nodeValue.split("/");
					buildingCode = buildingCode[buildingCode.length-1].split(".");
					if (buildingCode[0].search(/(\d+)/)) buildingCode = parseInt(RegExp.$1);

					// Si es actualizable se muestra junto con los resources que necesita
					if (buildingCost[buildingCode] != null && buildingCost[buildingCode][buildingLevel+1] != null){
						// Se reparten los edificios entre las columnas disponibles en las filas que haga falta
						if (j % edificiosPorFila == 0){
							var fila = elem("TR", "");
							table.appendChild(fila);
						}
						j++;
						datos = 1;

						// Soporte para murallas
						switch (buildingCode) {
							//31,32,33 - palisade, wall, earth wall
							case 31: buildingsImages[i].nodeValue = image["empalizada"]; break;
							case 32: buildingsImages[i].nodeValue = image["muralla"]; break;
							case 33: buildingsImages[i].nodeValue = image["terraplen"]; break;
							case 16: buildingsImages[i].nodeValue = image["rallypoint"]; break;
						}
						if (localGraphicPack == '') {
							switch (buildingCode) {
								//other buildings - dorf2
								case 5:  buildingsImages[i].nodeValue = image["sawmill"]; break;
								case 6:  buildingsImages[i].nodeValue = image["brickyard"]; break;
								case 7:  buildingsImages[i].nodeValue = image["ironfoundry"]; break;
								case 8:  buildingsImages[i].nodeValue = image["grainmill"]; break;
								case 9:  buildingsImages[i].nodeValue = image["bakery"]; break;
								case 10: buildingsImages[i].nodeValue = image["warehouse"]; break;
								case 11: buildingsImages[i].nodeValue = image["granary"]; break;
								case 12: buildingsImages[i].nodeValue = image["blacksmith"]; break;
								case 13: buildingsImages[i].nodeValue = image["armoury"]; break;
								case 14: buildingsImages[i].nodeValue = image["tournamentsquare"]; break;
								case 15: buildingsImages[i].nodeValue = image["mainbuilding"]; break;
								case 17: buildingsImages[i].nodeValue = image["marketplace"]; break;
								case 18: buildingsImages[i].nodeValue = image["embassy"]; break;
								case 19: buildingsImages[i].nodeValue = image["barracks"]; break;
								case 20: buildingsImages[i].nodeValue = image["stable"]; break;
								case 21: buildingsImages[i].nodeValue = image["workshop"]; break;
								case 22: buildingsImages[i].nodeValue = image["academy"]; break;
								case 23: buildingsImages[i].nodeValue = image["cranny"]; break;
								case 24: buildingsImages[i].nodeValue = image["townhall"]; break;
								case 25: buildingsImages[i].nodeValue = image["residence"]; break;
								case 26: buildingsImages[i].nodeValue = image["palace"]; break;
								case 27: buildingsImages[i].nodeValue = image["treasury"]; break;
								case 28: buildingsImages[i].nodeValue = image["tradeoffice"]; break;
								case 29: buildingsImages[i].nodeValue = image["greatbarracks"]; break;
								case 30: buildingsImages[i].nodeValue = image["greatstable"]; break;
								case 34: buildingsImages[i].nodeValue = image["stonemason"]; break;
								case 36: buildingsImages[i].nodeValue = image["trapper"]; break;
								case 37: buildingsImages[i].nodeValue = image["herosmansion"]; break;
								case 38: buildingsImages[i].nodeValue = image["greatwarehouse"]; break;
								case 39: buildingsImages[i].nodeValue = image["greatgranary"]; break;
							}
						}

						var td = newCell("", [['width','25%'], ['valign','bottom']]);
						fila.appendChild(td);

						var table2 = newTable([["align", "left"], ['class','bttable']]);
						td.appendChild(table2);

						var nametr = elem("TR", "");
						table2.appendChild(nametr);
						var nametd = newCell('<a href="' + buildingsLinks[i].nodeValue + '">' + buildingsDescs[i].nodeValue+'</a>', [['colspan',"2"], ['class', 'f10']]);
						nametr.appendChild(nametd);

						var fila2 = elem("TR", "");
						table2.appendChild(fila2);

						var td2 = newCell('<a href="' + buildingsLinks[i].nodeValue + '"><img src="' + buildingsImages[i].nodeValue + '" border="0"></a>', [['class', 'f10']]);
						fila2.appendChild(td2);

						var restante = calculateResourceTime(buildingCost[buildingCode][buildingLevel+1]);
						var td3 = newCell("", [['class', 'dcol f7'], ['valign','bottom']]);
						fila2.appendChild(td3);

						if (restante != null) {
	 					   td3.setAttribute('valign', 'bottom');
	                       td3.innerHTML = restante;
	                    } else {
							td3.setAttribute('valign', 'center');
							td3.setAttribute('style', 'font-size:8pt;font-weight:bold;color:#000000');
							td3.innerHTML = '<a href="' + buildingsLinks[i].nodeValue + '">' + T('EXTAVAILABLE') + '</a>';
	                    }
					}
				}
			}
			while (j % edificiosPorFila != 0) {
	           fila.appendChild(elem("TD", ""));
	           j++;
	        }

			// Se desplaza la aTable hacia abajo para no interferir con la lista de aldeas / enlaces derecha

			if (datos == 1)  {
				var middleblock = get('lmidall');
				var TableY = longitudPantalla() + 'px';
				table.style.top = TableY;
				table.style.position = "absolute";
				middleblock.appendChild(table);
	        }
		}
	}


	/**
	* Ordena en orden ascendete y descendente
	* Params:
	* 	sTableID: 	ID de la aTable a ordenar
	* 	iCol: 		Indice de la columna a ordenar
	* 	sDataType:	Tipo de datos de la columna, valor por defecto:texto
	*/
	function sortTable(sTableID, iCol, sDataType) {
		//log(3, "function sortTable");
		return function(){
			var oTable = get(sTableID);
			var oTBody = oTable.tBodies[0];
			var colDataRows = oTBody.rows;
			var aTRs = new Array;

			for (var i = 0; i < colDataRows.length; i++) aTRs[i] = colDataRows[i];
			if (oTable.getAttribute("sortCol") == iCol) aTRs.reverse();
			else aTRs.sort(generateCompareTRs(iCol, sDataType));

			var oFragment = document.createDocumentFragment();
			for (var i = 0; i < aTRs.length; i++) oFragment.appendChild(aTRs[i]);

			oTBody.appendChild(oFragment);
			oTable.setAttribute("sortCol", iCol);
		}
	}

	/**
	 * Convierte un elemento a un determinado tipo segun un argumento
	 * Params:
	 *	elemento: elemento a convertir
	 *	sDataType: nuevo tipo de datos (int o float)
	 * Returns: El elemento convertido al nuevo tipo de datos
	 */
	function convert(aElement, sDataType) {
		switch(sDataType) {
			case "int": return ((aElement.nodeValue == null) || !aElement.nodeValue.match(/\d+/)) ? 0 : parseInt(aElement.nodeValue);
			case "float": return ((aElement.nodeValue == null) || !aElement.nodeValue.match(/\d+/)) ? 0 : parseFloat(aElement.nodeValue);
			default: return (aElement == null) ? '' : aElement.textContent.toLowerCase();
		}
	}

	/**
	 * Realiza una compare entre las casillas de la misma columna en distintas filas
	 * Params:
	 *	iCol: numero de columna dentro de la fila a comparar
	 *	sDataType: tipo de datos de la comparacion
	 * Returns:
	 * 	Devuelve -1, 1 o 0 segun el resultado de la comparacion
	 */
	function generateCompareTRs(iCol, sDataType) {
		return function compareTRs(oTR1, oTR2) {
			var vValue1 = convert(oTR1.cells[iCol].firstChild, sDataType);
			var vValue2 = convert(oTR2.cells[iCol].firstChild, sDataType);

			if (vValue1 < vValue2) return -1;
			else if (vValue1 > vValue2) return 1;
			else return 0;
		}
	}

	/**
	 * Create a noteblock (data from GM cookies)
	 */
	function noteBlock(a,notas){
		// create an HTML structure for the note block
		var aTable = newTable();
		var tr = elem("TR", "");
		var td = newCell("", [["align", "center"]]);
		var p1 = document.createElement("P");
		var p2 = document.createElement("P");
		var imh = newImage([['src', image["blockheader"]]]);

		var textarea = elem("TEXTAREA", notas);
		textarea.setAttribute("id", "notas");
		textarea.setAttribute("style", 'background-image: url(' + image["underline"] + '); border: 1px #000000 solid; border-top: 0px; margin: -3px 0px 0px -1px; padding: 0px 1px 0px 2px; overflow:auto');
		textarea.setAttribute("nowrap", false);
		//height of the note block
		var nl = 10;
		var nbheightX = getGMcookie('nbheight', false);
		if (nbheightX != false) {
			var nbheight = parseInt(nbheightX);
		} else {
			var nbheight = 0;
		}
		if (nbheight > 0) {
			if (notas != null && notas != '') {nl = 3 + notas.split("\n").length; }
		}
		if (nl > 30) nl=30;
		textarea.setAttribute("rows", nl);

		var input = document.createElement("INPUT");
		input.setAttribute("type", "image");
		input.setAttribute("border", "0");
		input.setAttribute("src", image["buttonSave"]);
		input.setAttribute("alt", T('SAVE') );
		// En el evento del boton de guardado actualiza el valor de la cookie (1 adz?o de duracion por defecto)
		input.addEventListener("click", function(){setGMcookie("notas",textarea.value, false); alert(T('SAVED')); }, 0);

		//width of the note block
		var nboptionX = getGMcookie('nbsize', false);
		if (nboptionX != false) {
			var nboption = parseInt('nboptionX');
		} else {
			var nboption = 0;
		}

		if ((nboption == 0 && screen.width >= 1200) || nboption == 2) {
			imh.setAttribute("width", "509");
			aTable.setAttribute("width", "545px");
			textarea.setAttribute("cols", "60");
		} else if ((nboption == 0 && screen.width < 1200) || nboption == 1) {
			imh.setAttribute("width", "267");
			aTable.setAttribute("width", "280px");
			textarea.setAttribute("cols", "30");
		} else {
			imh.setAttribute("width","267");
			aTable.setAttribute("width", "280px");
			textarea.setAttribute("cols", "30");
		}

        td.appendChild(imh);
        td.appendChild(textarea);
		p2.appendChild(input);
		td.appendChild(p2);
		tr.appendChild(td);
		aTable.appendChild(tr);
		a.appendChild(document.createElement("P"));
		a.appendChild(aTable);
	}

	function getMerchantMultiplier() {
		var intMultiplierM = 1;
		if (location.href.indexOf('speed') != -1) {
			intMultiplierM = 3;
		}
		return intMultiplierM;
	}

	function getTTime(iTroopType, crtUserRace, arX) {
		switch (crtUserRace) {
			case "Romans": var tt = 1; break;
			case "Teutons": var tt = 11; break;
			case "Gauls": var tt = 21; break;
		}
		var aTime = Math.round(arX[0] * 3600 / uc[tt + iTroopType][8] / arX[4] + arX[1] * 3600 / uc[tt + iTroopType][8] / arX[4] / (1 + arX[2]/10));
		return aTime;
	}

	function getMTime(qDist, crtUserRace) {
		var intMultiplierM = getMerchantMultiplier();
		var aTime = Math.round(qDist * 3600 / mts[crtUserRace] / intMultiplierM);
		return aTime;
	}

	function getTroopsDetails(qDist, crtUserRace){
		var arX = [qDist, 0, 0, 1, 1];
		//get the tournament square level if available
		var strtsLevel = getGMcookie('tournamentsquare', true);
		if (strtsLevel != "false") {
			//the tournament square is available and we need to split the distance in 2 parts for distances > 30
			arX[2] = parseInt(strtsLevel);
			if (qDist > 30) {
				arX[0] = 30;
				arX[1] = qDist - 30;
			}
		}
		//troop image ZERO index if not Romans race
		if (crtUserRace == "Teutons") {
			arX[3] = 11;
		} else if (crtUserRace == "Gauls") {
			arX[3] = 21;
		}
		//troop speed multiplier for speed servers
		if (location.href.indexOf('speed') != -1) {
			arX[4] = 2;
		}
		return arX;
	}

	function createTimeTroopTable(nodeToAppendTo, x2, y2) {
		var dRow = elem("TR", "");
		insertAfter(nodeToAppendTo, dRow);
		var newdid = xy2id(x2, y2);
		var tmHTML = getTroopMerchantTooltipHTML(newdid, "blue", true, true, true);
		var aDiv = elem("DIV");
		aDiv.innerHTML = '<table>' + tmHTML + '</table>';
		aDiv.style.fontSize = '8pt';
		dRow.parentNode.appendChild(aDiv);
		dRow.parentNode.id = "trooptimetable";
	}

	function createTimeMerchantTable(nodeToAppendTo, x2, y2) {
		var dRow = elem("TR", "");
		insertAfter(nodeToAppendTo, dRow);
		var newdid = xy2id(x2, y2);
		var tmHTML = getTroopMerchantTooltipHTML(newdid, "blue", true, true, false);
		var aDiv = elem("DIV");
		aDiv.innerHTML = '<table>' + tmHTML + '</table>';
		aDiv.style.fontSize = '8pt';
		dRow.parentNode.appendChild(aDiv);
		dRow.parentNode.id = "Merchanttimetable";
	}

	/**
	 * Insert new quantities selectable via links on the market -> send resources page
	 */
	function marketResources() {
		var boolMLink1 = false;
		var boolMLink2 = false;
		var boolMLink3 = false;
		var boolMarketResources = false;
		var listLinks = "";
		if (find("//form[@action='build.php' and @name='snd']")) {
			var mLinks = document.getElementsByTagName("a");
			for (xi = 0; xi < mLinks.length; xi++) {
				if (mLinks[xi].href.indexOf("&t=1") != -1) boolMLink1 = true;
				if (mLinks[xi].href.indexOf("&t=2") != -1) boolMLink2 = true;
				if (mLinks[xi].href.indexOf("&t=3") != -1) boolMLink3 = true;
				listLinks += mLinks[xi].href + '\n';
			}
			if (boolMLink1 && boolMLink2 && boolMLink2) {
				if (find("//input[@type='Text']", XPList).snapshotLength > 6) boolMarketResources = true;
				if (boolMarketResources == false) {
					if (find("//input[@type='text']", XPList).snapshotLength > 6) boolMarketResources = true;
				}
			}
		}
		if (boolMarketResources) {
			//we are inside the market, option "Send resources"
			// Array of new quantities
			var quantities = [100, 250, 500, 1000];
			var boolNewMaxCapacity = false;
			var strMaxCapacity = find("//form//p/b", XPFirst);
			log(3, "strMaxCapacity = " + strMaxCapacity.innerHTML);
			var maxCapacity = 0;
			if (strMaxCapacity != undefined && strMaxCapacity != null) {
				maxCapacity = toNumber(strMaxCapacity.innerHTML);
			}
			
			for (var i = 0; i < quantities.length; i++) {
				if (maxCapacity == quantities[i]){
					boolNewMaxCapacity = true;
					break;
				}
			}
			addCumulativeArrivals(maxCapacity);
			if (!boolNewMaxCapacity) quantities = [100, 500, 1000, maxCapacity];
			var merchantsCell = find("//table[@class='f10']//tr//td[@colspan='2']", XPFirst);
			var merchantsCellIHTML = merchantsCell.innerHTML;
			var mName = merchantsCellIHTML.split(' ')[0];
			setGMcookie("merchantsName", mName, false);
			addGMcookieValue("merchantsCapacity", [villageID, maxCapacity], false);
			var maxNoOfMerchants = parseInt(merchantsCellIHTML.split(' ')[1].split('/')[0]);
			var mhMH = merchantsCellIHTML.split(' ')[0];
			var newMCIHTML = merchantsCellIHTML.replace('<br>', '');
			merchantsCell.innerHTML = newMCIHTML;
			//log(3, mhMH);
			var max_transport = maxNoOfMerchants * maxCapacity;
			var resTable = find("//table[@class='f10']", XPFirst);
			var k = 0;
			a = resTable.childNodes[resTable.childNodes.length == 2 ? 1 : 0].childNodes;
			var rxInput = new Array();
			for (var i = 0; i < a.length; a.length == 8 ? i += 2 : i++){
				//Remove original options
				a[i].removeChild(a[i].childNodes[a[i].childNodes.length > 4 ? 5 : 3]);
				//new with additional cells
				var aRow = resTable.rows[k];
				//For each new quantity and resource create a new link with the associated request
				for(var j = 0; j < quantities.length; j++){
					var xLink = newLink('<span style="white-space:nowrap;">&nbsp;' + quantities[j] + '</span>', [['href', jsVoid], ['style', 'font-size:8pt;']]);
					xLink.addEventListener('click', createEventMarketResources(k, quantities[j], max_transport, maxNoOfMerchants, maxCapacity), false);
					//new with additional cells
					var aCell = newCell("", [['align', 'center']]);
					aCell.appendChild(xLink);
					aRow.appendChild(aCell);
				}
				//add the ALL option to the list of links
				var xLink = newLink('<span style="white-space:nowrap;">&nbsp;' + T('ALL') + '</span>', [['href', jsVoid], ['style', 'font-size:8pt;']]);
				xLink.addEventListener('click', createEventMarketResources(k, parseInt(currentResUnits[k]), max_transport, maxNoOfMerchants, maxCapacity), false);
				var aCell = newCell("", [['align', 'center']]);
				aCell.appendChild(xLink);
				aRow.appendChild(aCell);
				k++;

				rxInput[k] = find("//input[@name='r" + k + "']", XPFirst);
				rxInput[k].addEventListener('keyup', function() {mhRowUpdate(maxNoOfMerchants, maxCapacity);}, false);
				rxInput[k].addEventListener('change', function() {mhRowUpdate(maxNoOfMerchants, maxCapacity);}, false);
			}
			
			//add all resource type images and the the clear all button
			//log(3, "resTable.rows.length = " + resTable.rows.length);
			var clAllRow = elem("TR","");
			var aCell = newCell("<img src='" + image["img1"] + "'>" + "<img src='" + image["img2"] + "'>" + "<img src='" + image["img3"] + "'>" + "<img src='" + image["img4"] + "'>", [['colspan', '2']]);
			clAllRow.appendChild(aCell);
			var aCell = newCell("", [['align', 'center']]);
			var clAllImg = newImage([['src', image["delButton"]], ['title', T('MTCLEARALL')]]);
			var clAllLink = newLink("", [['href', jsVoid]]);
			clAllLink.appendChild(clAllImg);
			clAllLink.addEventListener("click", clearTransport(maxNoOfMerchants, maxCapacity), false);
			aCell.appendChild(clAllLink);
			clAllRow.appendChild(aCell);
			
			//add the 100,500,1000,1500 links for all merchants
			for (var i = 0; i < 4; i++) {
				var uCellA1 = newCell("", [['align', 'center']]);
				var useThemLinkA1 = newLink('<span style="white-space:nowrap;">&nbsp;' + quantities[i] + '</span>', [['href', jsVoid], ['style', 'font-size:8pt;']]);
				useThemLinkA1.addEventListener('click', createEventMarketResourcesAll(quantities[i], max_transport, maxNoOfMerchants, maxCapacity), false);
				uCellA1.appendChild(useThemLinkA1);
				clAllRow.appendChild(uCellA1);
			}
			
			//add the reall ALL resources link (don't know if it really makes sense)
			var uCellA1 = newCell("", [['align', 'center']]);
			var useThemLinkA1 = newLink('<span style="white-space:nowrap;">&nbsp;' + T('ALL') + '</span>', [['href', jsVoid], ['style', 'font-size:8pt;']]);
			useThemLinkA1.addEventListener('click', createEventMarketAllRes(maxNoOfMerchants, maxCapacity), false);
			uCellA1.appendChild(useThemLinkA1);
			clAllRow.appendChild(uCellA1);
			
			resTable.appendChild(clAllRow);
			
			var merchantsRow = merchantsCell.parentNode;
			merchantsCell.setAttribute("colspan", "3");
			var mIHTML = merchantsCell.innerHTML;
			var bigTable = merchantsRow.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			if (bigTable) {
				var bigRow = bigTable.rows[0];
				var bigRowCell0 = bigRow.cells[0];
				bigRowCell0.setAttribute("width", "70%");
				var bigRowCell1 = bigRow.cells[1];
				bigRowCell1.setAttribute("width", "30%");
				var firstBigRow = elem("TR", "");
				var firstBigCell = newCell("", [["width", "70%"]]);
				firstBigRow.appendChild(firstBigCell);
				var secondBigCell = newCell("<b>" + mIHTML + "</b>", [["style", "color:darkblue"], ["width", "30%"]]);
				firstBigRow.appendChild(secondBigCell);
				bigTable.removeChild(bigRow.parentNode);
				bigTable.appendChild(firstBigRow);
				bigTable.appendChild(bigRow);
			}

			merchantsRow.removeChild(merchantsCell);

			var merchantsTable = merchantsRow.parentNode;
			var merchantsRow1Cell0 = merchantsTable.rows[1].cells[0];
			merchantsRow1Cell0.setAttribute("colspan", "4");
			var merchantsRow2Cell0 = merchantsTable.rows[2].cells[0];
			merchantsRow2Cell0.setAttribute("colspan", "4");
			var merchantsRow2Cell0 = merchantsTable.rows[3].cells[0];
			merchantsRow2Cell0.setAttribute("colspan", "4");

			var uRow1 = elem("TR", "");

			var uCell1 = elem("TD", "<img src='" + image["img1"] + "' title='" + T('RECURSO1') + "' alt='" + T('RECURSO1') + "'>");
			uRow1.appendChild(uCell1);
			var uCell2 = elem("TD", "");
			var i1Check = elem("INPUT");
			i1Check.setAttribute("type", "checkbox");
			i1Check.setAttribute("checked", "true");
			i1Check.setAttribute("id", "res1x");
			var aTitle = T('USE') + " " + T('RECURSO1');
			i1Check.setAttribute("title", aTitle);
			i1Check.setAttribute("alt", aTitle);
			uCell2.appendChild(i1Check);
			uRow1.appendChild(uCell2);
			
			var uCell3 = elem("TD", "");
			var useThemLink = document.createElement('A');
			useThemLink.href = jsVoid;
			useThemLink.innerHTML = "<img src='" + image["usethempr"] + "' title='" + T('USETHEMPR') + "' alt='" + T('USETHEMPR') + "'>";
			useThemLink.addEventListener('click', function () {createEventUseThemAllPr(maxNoOfMerchants, maxCapacity);}, false);
			uCell3.appendChild(useThemLink);
			uRow1.appendChild(uCell3);
			
			insertAfter(merchantsRow, uRow1);

			var uRow2 = elem("TR", "");
			var uCell4 = elem("TD", "<img src='" + image["img2"] + "' title='" + T('RECURSO2') + "' alt='" + T('RECURSO2') + "'>");
			uRow2.appendChild(uCell4);
			var uCell5 = elem("TD", "");
			var i2Check = elem("INPUT");
			i2Check.setAttribute("type", "checkbox");
			i2Check.setAttribute("checked", "true");
			i2Check.setAttribute("id", "res2x");
			aTitle = T('USE') + " " + T('RECURSO2');
			i2Check.setAttribute("title", aTitle);
			i2Check.setAttribute("alt", aTitle);
			uCell5.appendChild(i2Check);
			uRow2.appendChild(uCell5);
			
			var uCell6 = elem("TD", "");
			var useThemLinkEq = document.createElement('A');
			useThemLinkEq.href = jsVoid;
			useThemLinkEq.innerHTML = "<img src='" + image["usethemeq"] + "' title='" + T('USETHEMEQ') + "' alt='" + T('USETHEMEQ') + "'>";
			useThemLinkEq.addEventListener('click', function () {createEventUseThemAllEq(maxNoOfMerchants, maxCapacity);}, false);
			uCell6.appendChild(useThemLinkEq);
			uRow2.appendChild(uCell6);
			
			insertAfter(uRow1, uRow2);

			var uRow3 = elem("TR", "");
			var uCell7 = elem("TD", "<img src='" + image["img3"] + "' title='" + T('RECURSO3') + "' alt='" + T('RECURSO3') + "'>");
			uRow3.appendChild(uCell7);
			var uCell8 = elem("TD", "");
			var i3Check = elem("INPUT");
			i3Check.setAttribute("type", "checkbox");
			i3Check.setAttribute("checked", "true");
			i3Check.setAttribute("id", "res3x");
			aTitle = T('USE') + " " + T('RECURSO3');
			i3Check.setAttribute("title", aTitle);
			i3Check.setAttribute("alt", aTitle);
			uCell8.appendChild(i3Check);
			uRow3.appendChild(uCell8);

			var uCell9 = elem("TD", "");
			var useThemLink1H = document.createElement('A');
			useThemLink1H.href = jsVoid;
			useThemLink1H.innerHTML = "<img src='" + image["usethem1h"] + "' title='" + T('USETHEM1H') + "' alt='" + T('USETHEM1H') + "'>";
			useThemLink1H.addEventListener('click', function () {createEventUseThemAll1H(maxNoOfMerchants, maxCapacity);}, false);
			uCell9.appendChild(useThemLink1H);
			uRow3.appendChild(uCell9);
			
			insertAfter(uRow2, uRow3);

			var uRow4 = elem("TR", "");
			var uCell10 = elem("TD", "<img src='" + image["img4"] + "' title='" + T('RECURSO4') + "' alt='" + T('RECURSO4') + "'>");
			uRow4.appendChild(uCell10);
			var uCell11 = elem("TD", "");
			var i4Check = elem("INPUT");
			i4Check.setAttribute("type", "checkbox");
			i4Check.setAttribute("checked", "true");
			i4Check.setAttribute("id", "res4x");
			aTitle = T('USE') + " " + T('RECURSO4');
			i4Check.setAttribute("title", aTitle);
			i4Check.setAttribute("alt", aTitle);
			uCell11.appendChild(i4Check);
			uRow4.appendChild(uCell11);
			uRow4.appendChild(elem("TD", ""));
			
			//merchantsRow.appendChild(uRow4);
			insertAfter(uRow3, uRow4);

			var xyValues = new Array();
			xyValues[0] = find("//form[@name='snd']//input[@name='x']", XPFirst);
			xyValues[0].addEventListener('keyup', function() {captureMerchantDestination();}, 0);
			xyValues[1] = find("//form[@name='snd']//input[@name='y']", XPFirst);
			xyValues[1].addEventListener('keyup', function() {captureMerchantDestination();}, 0);

			if (location.href.indexOf("?z=") != -1) {
				captureMerchantDestination();
			}
		}

		function clearTransport(maxNoOfMerchants, maxCapacity) {
			return function() {
				for (var i = 1; i < 5; i++) {
					rxInput[i].value = '';
					mhRowUpdate(maxNoOfMerchants, maxCapacity);
				}
			}
		}
		
		function createEventUseThemAllPr(maxNoOfMerchants, maxCapacity) {
			//log(3, "Enter createEventUseThemAllPr");
			var maxTotalTransport = maxNoOfMerchants * maxCapacity;
			var totalRes = 0;
			for (var i = 0; i < 4; i++) {
				var useRes = get("res" + (i + 1) + "x");
				if (useRes) {
					if (useRes.checked == true) {
						totalRes += parseInt(currentResUnits[i]);
					} else {
					}
				}
			}
			var dmx = maxTotalTransport / totalRes;
			for (var i = 1; i < 5; i++) {
				var useRes = get("res" + i + "x");
				if (useRes) {
					if (useRes.checked == true) {
						var aRes = Math.floor(currentResUnits[i - 1] * dmx);
						if (aRes > currentResUnits[i - 1]) {
							aRes = currentResUnits[i - 1];
						}
						rxInput[i].value = aRes;
					} else {
						rxInput[i].value = 0;
					}
				} else {
					rxInput[i].value = 0;
				}
			}
			mhRowUpdate(maxNoOfMerchants, maxCapacity);
			return;
		}

		function createEventUseThemAllEq(maxNoOfMerchants, maxCapacity) {
			//log(3, "Enter createEventUseThemAllEq");
			var maxTotalTransport = maxNoOfMerchants * maxCapacity;
			var totalRes = 0;
			var intSelected = 0;
			for (var i = 0; i < 4; i++) {
				var useRes = get("res" + (i + 1) + "x");
				if (useRes) {
					if (useRes.checked == true) {
						totalRes += parseInt(currentResUnits[i]);
						intSelected += 1;
					}
				}
			}
			var minA = maxTotalTransport / intSelected;
			var minB = totalRes / intSelected;
			if (minA > minB) {
				minX = parseInt(minB);
			} else {
				minX = parseInt(minA);
			}
			for (var i = 1; i < 5; i++) {
				var useRes = get("res" + i + "x");
				if (useRes) {
					if (useRes.checked == true) {
						var aRes = minX;
						if (aRes > currentResUnits[i - 1]) {
							aRes = currentResUnits[i - 1];
						}
						rxInput[i].value = aRes;
					} else {
						rxInput[i].value = 0;
					}
				} else {
					rxInput[i].value = 0;
				}
			}
			mhRowUpdate(maxNoOfMerchants, maxCapacity);
			return;
		}
		
		function createEventUseThemAll1H(maxNoOfMerchants, maxCapacity) {
			var maxTotalTransport = maxNoOfMerchants * maxCapacity;
			var totalRes = 0;
			var intSelected = 0;
			for (var i = 0; i < 3; i++) {
				var useRes = get("res" + (i + 1) + "x");
				var intPPH = parseInt(productionPerHour[i]);
				totalRes += intPPH;
				if (useRes.checked == true) {
					intSelected += 1;
				}
			}
			var useRes = get("res4x");
			if (useRes.checked == true) {
				intSelected += 1;
			}
			//crop production without troop upkeep
			var tableCrop = find("//table[@class='f9']", XPFirst);
			if (tableCrop) {
				var cropProd1H = tableCrop.rows[1].cells[1].textContent.split("/")[1];
			} else {
				var cropProdReal = document.getElementById("l1");
				if (cropProdReal) {
					var cropProd1H = cropProdReal.parentNode.cells[8].textContent.split("/")[1];
				}
			}
			totalRes += parseInt(cropProd1H);
			
			var prod1H = [parseInt(productionPerHour[0]), parseInt(productionPerHour[1]),  parseInt(productionPerHour[2]), parseInt(cropProd1H)];
			
			for (var i = 0; i < 4; i++) {
				var useRes = get("res" + (i + 1) + "x");
				if (useRes) {
					if (useRes.checked == true) {
						if (intSelected == 4) {
							var aRes = parseInt(prod1H[i]);
						} else {
							var aRes = Math.floor(totalRes / intSelected);
						}
						if (aRes > currentResUnits[i]) {
							aRes = currentResUnits[i];
						}
						rxInput[i + 1].value = aRes;
					} else {
						rxInput[i + 1].value = 0;
					}
				} else {
					rxInput[i + 1].value = 0;
				}
			}
			mhRowUpdate(maxNoOfMerchants, maxCapacity);
			return;
		}

		function createEventMarketAllRes(maxNoOfMerchants, maxCapacity) {
			return function(){
				for (var i = 0; i < 4; i++) {
					rxInput[i + 1].value = parseInt(currentResUnits[i]);
				}
				mhRowUpdate(maxNoOfMerchants, maxCapacity);
			}
		}
		
		function mhRowUpdate(maxNoOfMerchants, maxCapacity) {
			var totalTransport = 0;
			for (var xi = 1; xi < 5; xi++) {
				var aR = parseInt(rxInput[xi].value);
				if (!isNaN(aR)) totalTransport += aR;
			}
			//log(3, "totalTransport = " + totalTransport);
			var totMerchants = Math.ceil(totalTransport / maxCapacity);
			
			//added code provided by MarioCheng & DMaster for wasted/exceeding resources
			var crtWaste = maxCapacity - (totalTransport - (totMerchants-1) * maxCapacity);
            var crtExceed = totalTransport - (maxNoOfMerchants * maxCapacity);
			//finished code addition
			var mhText = '<img src="' + image["merchant"] + '">' + "<b>" + " (" + mhMH + "): " + totMerchants + "/" + maxNoOfMerchants + "<br>" + T('MAX') + ": " + maxNoOfMerchants * maxCapacity + "<br>";
			
			if (totMerchants > maxNoOfMerchants) {
				var mhColor = "red";
				mhText += T('MTEXCEED') + ": "+ crtExceed;
			} else {
				var mhColor = "darkgreen";
				mhText += T('MTWASTED') + ": "+ crtWaste;
			}
			mhText += "<br>" + T('MTCURRENT') + ": " + totalTransport + "</b>";
			var mhCell = get("mhMerchants");
			if (mhCell == null || mhCell == undefined) {
				var mhRow = elem("TR", "");
				var mhCell = newCell(mhText, [["id", "mhMerchants"], ["style", 'color:' + mhColor], ["colspan", '8']]);
				mhRow.appendChild(mhCell);
				resTable.appendChild(mhRow);
			} else {
				mhCell.innerHTML = mhText;
				mhCell.setAttribute("style", 'color:' + mhColor);
			}
			//work in progress !!!
			return;
		}

		function createEventMarketResources(resource, quantity, max_transport, maxNoOfMerchants, maxCapacity){
			return function(){
				var a = document.getElementsByTagName('input')[resource + 1];
				var aValue = a.value;
				if (aValue == '') var suma = 0; else var suma = parseInt(aValue);
				suma += quantity;
				if (suma > currentResUnits[resource]) suma = currentResUnits[resource];
				if (suma > max_transport) suma = max_transport;
				a.value = suma;
				mhRowUpdate(maxNoOfMerchants, maxCapacity);
			}
		}

		function createEventMarketResourcesAll(quantity, max_transport, maxNoOfMerchants, maxCapacity){
			return function(){
				for (var i = 0; i < 4; i++) {
					var useRes = get("res" + (i + 1) + "x");
					if (useRes) {
						if (useRes.checked == true) {
							var a = document.getElementsByTagName('input')[i + 1];
							var aValue = a.value;
							if (aValue == '') var suma = 0; else var suma = parseInt(aValue);
							suma += quantity;
							if (suma > currentResUnits[i]) suma = currentResUnits[i];
							if (suma > max_transport) suma = max_transport;
							a.value = suma;
							mhRowUpdate(maxNoOfMerchants, maxCapacity);
						}
					}
				}
			}
		}
		
		function captureMerchantDestination() {
			var xDestination = xyValues[0].value;
			var yDestination = xyValues[1].value;
			if (xDestination != "" && yDestination != "") {
				var oldTable = get("Merchanttimetable");
				if (oldTable) {
					var oldChild = oldTable.parentNode.removeChild(oldTable);
				}
				var mtTable = elem("TABLE", "");
				var parOK = find("//form[@name='snd']/p[2]", XPFirst);
				parOK.appendChild(mtTable);
				var aRow = elem("TR", "");
				var bRow = elem("TR", "");
				aRow.appendChild(bRow);
				mtTable.appendChild(aRow);
				createTimeMerchantTable(aRow, xDestination, yDestination);
			} else {
				var oldTable = get("Merchanttimetable");
				if (oldTable) {
					oldTable.style.visibility = "hidden";
				}
			}
			return;
		}
		
		//function provided by david.maciej (Thank you !) 
		function MerchantArrivingTitles(maxCapacity) {
			var mercGroupTitles = xpathResultEvaluate('//div[@id="lmid2"]/form/p[@class="b"]');
			if (mercGroupTitles.snapshotLength == 0) { return; }
			if (mercGroupTitles.snapshotLength == 2) {
				// 2 groups: 1st is arriving mercs, 2nd is own mercs
				return(mercGroupTitles.snapshotItem(0).innerHTML);
			}
			var mercsFromOtherUsers = xpathResultEvaluate('//div[@id="lmid2"]/form/table[@class="tbg"]/tbody/tr[1]/td[1]/a[1][not(contains(@href, "spieler.php?uid=' + crtUserID + '"))]');
			if (mercsFromOtherUsers.snapshotLength > 0) {
				// only 1 group: the arriving mercs group
				return(mercGroupTitles.snapshotItem(0).innerHTML);
			}
			var availableAndTotalMercsString = xpathResultEvaluate('//div[@id="lmid2"]/form/table/tbody/tr/td/table[@class="f10"]/tbody/tr/td/span[@class="f135 b"]/../../../tr[1]/td').snapshotItem(0).firstChild.textContent;
			var availableAndTotalMercsArray = availableAndTotalMercsString.split(" ")[1].split("/");
			var mercsOnWay = availableAndTotalMercsArray[1] - availableAndTotalMercsArray[0];
			//var mercsLoad = retrievePageMarketPlaceSendResources_MercLoad();
			//log(3, "mercsLoad = " + mercsLoad + "; maxCapacity = " + maxCapacity);
			var resSpanOnMercTables = xpathResultEvaluate('//div[@id="lmid2"]/form/table[@class="tbg"]/tbody/tr[3]/td[2]/span[@class="f10"]');
			var totalMercsOnTables = 0;
      	
			for(var i = 0; i < resSpanOnMercTables.snapshotLength; i++) {
				var resSpan = resSpanOnMercTables.snapshotItem(i);
				var mercWood = parseInt(resSpan.childNodes[1].nodeValue.replace("|", ""));
				var mercClay = parseInt(resSpan.childNodes[3].nodeValue.replace("|", ""));
				var mercIron = parseInt(resSpan.childNodes[5].nodeValue.replace("|", ""));
				var mercCrop = parseInt(resSpan.childNodes[7].nodeValue.replace("|", ""));

				var totalResOnThisTable = mercWood + mercClay + mercIron + mercCrop;

				//var mercsOnThisTable = totalResOnThisTable / mercsLoad;
				var mercsOnThisTable = totalResOnThisTable / maxCapacity;
				totalMercsOnTables += Math.ceil(mercsOnThisTable);
			}
			if (totalMercsOnTables > mercsOnWay) {
				return(mercGroupTitles.snapshotItem(0).innerHTML);
			}
		}

		//initial function provided by david.maciej (Thank you !) 
		//modified by ms99: changed to table, added timers
		function addCumulativeArrivals(maxCapacity) {
			// selects the receiving merchants
			var sendReceive = xpathResultEvaluate('//div[@id="lmid2"]/form/table[@class="tbg"]|//div[@id="lmid2"]/form/p[@class="b"]');
			if (sendReceive.snapshotLength == 0) { return; }
			if (MerchantArrivingTitles(maxCapacity) != sendReceive.snapshotItem(0).textContent) { return; }
			var totalResArriving = 0;
			for(var i = 0; i < sendReceive.snapshotLength; i++) {
				if (i > 0 && sendReceive.snapshotItem(i).nodeName == "P") { break; }
				if (sendReceive.snapshotItem(i).nodeName == "P") {
	      			//create table to sum the resources
					var txtPar = sendReceive.snapshotItem(0).textContent;
					txtPar = txtPar.split(":");
					var armTable = newTable([['class', 'tbg'], ['cellspacing', '1'], ['cellpadding', '1']]);
					var hRow = newRow("", [['class', 'cbgx']]);
					var hCell = newCell(T('RESUMEN') + " - " + txtPar[0], [['colspan', '6']]);
					hRow.appendChild(hCell);
					armTable.appendChild(hRow);
					var rRow = elem("TR", "");
					var qRow = elem("TR", "");
					var tRow = elem("TR", "");
					
					var cCell = elem("TD", "<img src='" + image["clock"] + "'>");
					rRow.appendChild(cCell);
					var tCell = newCell("", [["id", "timeoutT"], ['style', 'font-size:9pt;']]);
					qRow.appendChild(tCell);
					var eCell = elem("TD","");
					tRow.appendChild(eCell);
					
					for (var xi = 1; xi < 6; xi++) {
						if (xi < 5) {
							var iCell = elem("TD", "<img src='" + image["img" + xi] + "'>");
							var tCell = newCell("00:00:00", [['id', 'timeouta'], ['style', 'font-weight:normal; font-size:9pt;']]);
						} else {
							var iCell = elem("TD", T('TOTAL'));
							var tCell = elem("TD", "");
							//tCell.setAttribute('style', 'font-weight:normal; font-size:9pt;');
						}
						rRow.appendChild(iCell);
						var qCell = elem("TD", "0");
						qCell.setAttribute('id', "arrmQ" + xi);
						if (xi < 5) {
							qCell.setAttribute('style', 'font-weight:normal; font-size:9pt;');
						}
						qRow.appendChild(qCell);
						tRow.appendChild(tCell);
					}
					
					armTable.appendChild(rRow);
					armTable.appendChild(qRow);
					armTable.appendChild(tRow);
					var aPar = elem("P", "");
					aPar.appendChild(armTable);
					sendReceive.snapshotItem(i).appendChild(aPar);
				} else {
	      			// add resources & compute time to fill for every transport
					var aTable = sendReceive.snapshotItem(i);
	      			var tdRes = aTable.rows[2].cells[1].textContent;
					var inRes = tdRes.split(" | ");
					var tdTime = get('timer' + i);
					//log(3, "tdTime = " + tdTime.textContent);
					var tdTimeSeconds = ComputeSeconds(tdTime.textContent);
					//compute the time the granary & warehouse will be full, productionPerHour (0-3). capacity (0-3), currentResUnits (0-3)
					for (var zi = 0; zi < 4; zi++) {
						var aValue = parseInt(inRes[zi]);
						totalResArriving += aValue;
						var aCell = get("arrmQ" + (zi + 1));
						aCell.innerHTML = toNumber(aCell.innerHTML) + aValue;
						var productionPerSecond = Math.abs(productionPerHour[zi] / 3600);
						if (productionPerHour[zi] > 0) {
							var aDif = parseInt(capacity[zi] - currentResUnits[zi]);
						} else {
							var aDif = parseInt(currentResUnits[zi]);
						}
						
						var totalSeconds = (productionPerHour[zi] == 0) ? ((aDif == 0) ? 0 : -1) : Math.floor(aDif / productionPerSecond);
						if (aValue > 0) {
							if (tdTimeSeconds <= totalSeconds) {
								if (productionPerHour[zi] > 0) {
									aDif = aDif - aValue;
								} else {
									aDif = aDif + aValue;
								}
								if (aDif > 0) {
									if (productionPerHour == 0) {
										totalSeconds = -1;
									} else {
										totalSeconds = Math.floor(aDif / productionPerSecond);
										totalSeconds = (totalSeconds < tdTimeSeconds) ? tdTimeSeconds : totalSeconds;
									}
								}
							}
						}
						
						var rtCell = armTable.rows[3].cells[zi + 1];
						//log(3, "totalSeconds = " + totalSeconds);
						if (totalSeconds == -1 ) {
							var txtTime = "<span id='timeouta' color:#008000;'>" + T('NEVER') + "</span>";
						} else if (totalSeconds < 7200) {
							var txtTime = "<span id='timeouta' color:#FF0000;'>" + formatTime(totalSeconds, false) + "</span>";
						} else {
							var txtTime = "<span id='timeouta' color:#008000;'>" + formatTime(totalSeconds, false) + "</span>";
						}
						//log(3, "timeTxt = " + txtTime);
						rtCell.innerHTML = txtTime;
					}
				}
			}
			var aCell = get("arrmQ5");
			aCell.innerHTML = totalResArriving;
			//add a digit separator (as BmW suggested)
			for (var xi = 1; xi < 6; xi++) {
				var aCell = get("arrmQ" + xi);
				aCell.innerHTML = parseInt(aCell.innerHTML).toLocaleString();
			}
			//add the timer for the last arrival
			var tCell = get("timeoutT");
			tCell.innerHTML = tdTime.textContent;
			tCell.setAttribute('id', 'timeouta');
		}
	}

	/**
	 * Calcula el numero de aldeas que se posee en funcion de los puntos de cultura disponibles.
	 * Funcion estandard no valida para version Speed
	 * Params: puntos: cantidad de puntos de cultura
	 * Returns: el numero de aldeas que se dispone con esos puntos
	 */
	function cp2villages(cp){
		if (document.domain.indexOf("speed") > -1) {
			//formula for speed servers
			return Math.round(Math.pow(3*cp/1600, 1 / 2.3));
		} else {
			if (boolOldServerVersion == "0" || boolOldServerVersion == "false") {
				//formula for Travian 3 servers
				return Math.round(Math.pow(cp/1600, 1 / 2.3));
			} else {
				//formula for Travian 2 servers
				return Math.round(Math.pow(cp/2000, 1 / 2));
			}
		}
	}

	/**
	 * Compute number of culture point needed to create a specific number of villages
	 * Params: aldeas: number of villages
	 * Returns: number of culture point needed
	 */

	//version from fr3nchlover
    function villages2cp(aldeas){
        if (document.domain.indexOf("speed")>-1) {
            return Math.round(1.6/3 * Math.pow(aldeas, 2.3)*10) * 100;
        } else {
            if (aldeas > 1) {
                if (boolOldServerVersion == "0" || boolOldServerVersion == "false") {
                    //formula for Travian 3 servers
                    return Math.round(1.6 * Math.pow(aldeas, 2.3)) * 1000;

                } else {
                    //formula for Travian 2.x servers
                    return Math.round(2 * Math.pow(aldeas, 2)*10) * 100;
                }
            } else {
                return 2000;
            }
        }
    }
	
	/**
	 * Calcula y muestra los puntos de cultura necesarios para la siguiente village y el tiempo para conseguirlo, o
	 * las aldeas adicionales que se pueden fundar con los puntos actuales
	 */
	function culturePoints(){
		var aX = find("//div[@id='lmid2']//b", XPList);
		if (aX.snapshotLength != 5) return;

		var bColorGreen = '#C8FFC8';
		var bColorRed = '#FFE1E1';
		
		//get cookie for server version
		//boolOldServerVersion = getGMcookie("serverversion2", false);

		// Cuture point production for all villages
		var prodTotalCP = toNumber(aX.snapshotItem(2).innerHTML);
		// Current number of culture points
		var crtTotalCP = toNumber(aX.snapshotItem(3).innerHTML);
		// Puntos de cultura necesarios para fundar la siguiente village
		var pc_aldea_prox = toNumber(aX.snapshotItem(4).innerHTML);

		// Number of current villages
		var aldeas_actuales = cp2villages(pc_aldea_prox);
		// Numero de aldeas que se pueden tener con los PC actuales
		var aldeas_posibles = cp2villages(crtTotalCP);
		
		//get now
		var dtNow = new Date();
		
		//create the new cp to villages table
		var cpTable = newTable([['class', 'tbg'], ['align', 'center'], ['cellspacing', '1'], ['cellpadding', '2']]);
		//create first header row
		var cpHeader1 = newRow("", [['class', 'rbg']]);
		var cpHeader1Cell1 = newCell(T('VILLAGE'), [['rowspan', 2]]);
		cpHeader1.appendChild(cpHeader1Cell1);
		var cpHeader1Cell2 = newCell(T('PC'), [['colspan', 2]]);
		cpHeader1.appendChild(cpHeader1Cell2);
		var cpHeader1Cell3 = newCell("<img src='" + image["clock"] + "' border='0'>", [['colspan', 2]]);
		cpHeader1.appendChild(cpHeader1Cell3);
		cpTable.appendChild(cpHeader1);
		//create second header row
		var cpHeader2 = newRow("", [['class', 'rbg'], ['style', 'font-size:8pt']]);
		var cpHeader2Cell2 = elem("TD", T('TOTAL'));
		cpHeader2.appendChild(cpHeader2Cell2);
		var cpHeader2Cell3 = elem("TD", T('YOUNEED'));
		cpHeader2.appendChild(cpHeader2Cell3);
		var cpHeader2Cell4 = elem("TD", T('NEWVILLAGEAV'));
		cpHeader2.appendChild(cpHeader2Cell4);
		//var cpHeader2Cell5 = elem("TD", "<img src='" + image["clock"] + "' border='0'>");
		var cpHeader2Cell5 = elem("TD", T('TIMEUNTIL'));
		cpHeader2.appendChild(cpHeader2Cell5);
		cpTable.appendChild(cpHeader2);
		
		var maxNewVillages = 1;
		var boolReachedMaxNewVillages = false;
		
		for (var i = 0; i < maxNewVillages && i < 50; i++) {
			var cpRow = elem("TR", "");
			var iHTML1 = aldeas_actuales + i + 1;
			var iHTML2;
			var iHTML3;
			var iHTML4;
			var iHTML5;
			//get the necessary CP for building/conquering a new village
			var pc_necesarios = villages2cp(aldeas_actuales + i);
			
			if (pc_necesarios <= crtTotalCP) {
				iHTML2 = pc_necesarios;
				iHTML3 = "0";
				iHTML4 = T('NOW');
				iHTML5 = "0:00:00";
				var strStyle = "font-size:8pt; background-color:" + bColorGreen + ";";
				maxNewVillages += 1;
			} else {
				if (boolReachedMaxNewVillages == false) {
					maxNewVillages += 2;
					boolReachedMaxNewVillages = true;
				}
				//compute how long it will take until the number of CP permits building/conquering a new village
				var tiempo = ((pc_necesarios - crtTotalCP) / prodTotalCP) * 86400;
				var timeFormatted = formatTime(tiempo, true);
				iHTML5 = timeFormatted;
				
				dtNow.setTime(dtNow.getTime() + (tiempo * 1000));
				var texto_tiempo = computeTextTime(dtNow);
				iHTML2 = pc_necesarios;
				iHTML3 = "" + (pc_necesarios - crtTotalCP) ;
				iHTML4 = texto_tiempo;
				var strStyle = "font-size:8pt; background-color:" + bColorRed + ";";
			}
			var cpCell1 = newCell(iHTML1, [['style', strStyle]]);
			var cpCell2 = newCell(iHTML2, [['style', strStyle]]);
			var cpCell3 = newCell(iHTML3, [['style', strStyle]]);
			var cpCell4 = newCell(iHTML4, [['style', strStyle]]);
			var cpCell5 = newCell(iHTML5, [['style', strStyle]]);
			cpRow.appendChild(cpCell1);
			cpRow.appendChild(cpCell2);
			cpRow.appendChild(cpCell3);
			cpRow.appendChild(cpCell4);
			cpRow.appendChild(cpCell5);
			cpTable.appendChild(cpRow);
		}
		aX.snapshotItem(4).parentNode.parentNode.appendChild(cpTable);
	}

	function getMarketOfferRatioCell(aRow) {
		var aRatio = parseInt(aRow.cells[1].textContent) / parseInt(aRow.cells[3].textContent);
		var ratioCell = elem("TD", aRatio.toFixed(2));
		var aColor;
		var bColor;
		if (aRatio < 1.00) {
			aColor = 'red';
			bColor = '#FFE1E1';
		} else if (aRatio == 1.00) {
			aColor = 'black';
			bColor = 'white';
		} else if (aRatio > 1.00) {
			aColor = 'darkgreen';
			bColor = '#C8FFC8';
		}
		ratioCell.setAttribute("style", "font-size:9px; background-color:" + bColor + ";color:" + aColor + ";");
		var timeCell = aRow.cells[5];
		if (timeCell) timeCell.setAttribute("style", "font-size:10px");
		var actionCell = aRow.cells[6];
		if (actionCell) actionCell.setAttribute("style", "font-size:10px;");
		return ratioCell;
	}
	
	function getMarketOfferAllianceCell(aRow) {
		// Aliance info is provided by the title property of the player
		var allyName = aRow.childNodes[aRow.childNodes.length == 12 ? 8 : 4].getAttribute('title');
		if (allyName == undefined || allyName == null || allyName == "") {
			var allyName = "-";
		}
		var allyCell = elem("TD", allyName);
		return allyCell;
	}

	function addMarketOfferCellEvents(aRow) {
		var cellA = aRow.cells[3];
		var cellB = aRow.cells[6];
		var quantity = cellA.innerHTML;
		cellA.addEventListener('mouseover', showNeededMerchants(quantity), false);
		cellA.addEventListener("mouseout", function() {get("tb_tooltip").style.display = 'none';}, 0);
		if (cellB.getAttribute('class') != 'c') {
			cellB.addEventListener('mouseover', showNeededMerchants(quantity), false);
			cellB.addEventListener("mouseout", function() {get("tb_tooltip").style.display = 'none';}, 0);
		}
		
		function showNeededMerchants(quantity) {
			return function() {
				var tooltip = get("tb_tooltip");
				if (!tooltip) {
					createTooltip();
					tooltip = get("tb_tooltip");
				}
				var mQ = parseInt(quantity);
				var mC = parseInt(merchantsCapacity);
				//var mC = parseInt(capacity);
				if (mC != 0) {
					var mTotal = Math.ceil(mQ / mC) + " x " + '<img src="' + image["merchant"] + '"> (' + merchantsName + ')';
				} else {
					var mTotal = 0;
				}
				var aWaste = parseInt(mTotal) * mC - mQ;
				var aTable = newTable();
				var aRow = elem("TR", "");
				var aCell = newCell(mTotal, [['style', 'font-size:8pt; font-weight:bold; color:blue;']]);
				aRow.appendChild(aCell);
				aTable.appendChild(aRow);
				if (aWaste > 0) {
					var bRow = elem("TR", "");
					var bCell = newCell(T('MTWASTED') + ": " + aWaste, [["style", "font-size:8pt; color:red;"]]);
					bRow.appendChild(bCell);
					aTable.appendChild(bRow);
				}
				tooltip.innerHTML = "";
				tooltip.appendChild(aTable);
				tooltip.style.display = 'block';
			}
		}
		
	}
	
	/**
	 * Create a new column showing the alliance of the player that offers resources for trade at the market and a ratio column
	 */
	function addAllyColumnForMarketOffers() {
		var aX = find("//tr[@class='rbg']", XPFirst).parentNode;
		
		//prepare insertion of column
		var b = aX.getElementsByTagName("TR");
		b[0].childNodes[b[0].childNodes.length == 3 ? 1 : 0].setAttribute('colspan', '9');
		b[b.length - 1].childNodes[0].setAttribute("colspan", "9");

		// Create and insert the alliance column
		var aColumn = elem("TD", T('ALLIANCE'));
		b[1].appendChild(aColumn);

		//Create and insert the ratio column
		var bColumn = elem("TD", "");
		b[1].appendChild(bColumn);

		for(var i = 2; i < b.length - 1; i++){
			var allyCell = getMarketOfferAllianceCell(b[i]);
			b[i].appendChild(allyCell);
			var ratioCell = getMarketOfferRatioCell(b[i]);
			b[i].appendChild(ratioCell);
			
			addMarketOfferCellEvents(b[i]);
		}
	}

	/**
	 * Oculta un elemento y le asgina un atributo de tipo filtro
	 * Params:
	 *	oferta: elemento a modificar
	 *	filtro: nombre del filtro que se le aplicara como atributo
	 */
	function asignarFiltro(oferta, filtro) {
		oferta.setAttribute("style", "display:none");
		oferta.setAttribute("filtro" + filtro, "on");
	}

	/**
	 * Elimina un atributo de tipo filtro de un elemento y elimina su estilo si no tiene ningun filtro activo
	 * Params:
	 *	oferta: elemento a modificar
	 *	filtro: nombre del filtro a quitar
	 *	filtros: lista de filtros a comprobar para quitar el estilo
	 */
	function quitMarketFilter(oferta, filtro, filtros) {
		oferta.removeAttribute("filtro" + filtro);
		var remove = true;
		for (var i = 0; i < filtros.length; i++) if (oferta.getAttribute("filtro" + filtros[i]) == 'on') remove = false;
		if (remove == true) oferta.removeAttribute("style");
	}

	/**
	 * Establece filtros por tipo de resource y proporcion de intercambio en las oferta de venta del
	 * mercado
	 * Arany es nyersanyagtipusbeallito
	 */
	function MarketFilters(){
		/**
		 * Crea la funcion que gestiona el evento de los filtros en el mercado
		 * Param:
		 *	tipo	Tipo de filtro (0 para ofrezco, 1 para busco y 2 para tipo)
		 *	resource	Recurso del filtro (0-4 resources basicos, 5 para cualquiera)
		 * Returns: La funcion que gestiona el evento
		 */
		function functionMarketFilters(aType, resource) {
			return function () {
				//setOption("market" + type, resource);
				setGMcookie("market" + aType, resource, false);
				filterMarket(aType, resource);
			}
		}

		function filterMarket(tipo, resource) {
			var a = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]//tr[not(@class)]", XPList, get("lmid2"));
			//log(3, "tipo = " + tipo + "; resource = " + resource);
			for (var i = 0; i < a.snapshotLength - 1; i++) {
				var b = a.snapshotItem(i);
				if (b.childNodes.length > 8) var error = true; else var error = false;
				b.childNodes[error ? 1 : 0].firstChild.src.search(/\/(\d).gif$/); var ofrezco = RegExp.$1;
				b.childNodes[error ? 4 : 2].firstChild.src.search(/\/(\d).gif$/); var busco = RegExp.$1;
				var ofrezco_cantidad = parseInt(b.childNodes[error ? 2 : 1].innerHTML);
				var busco_cantidad = parseInt(b.childNodes[error ? 6 : 3].innerHTML);
				if (b.childNodes[error ? 11 : 6].className == 'c') var carencia = true; else var carencia = false;
				var tiempo = ComputeSeconds(b.childNodes[error ? 10 : 5].innerHTML);
				// Para mantener 4 filtros activos a la vez sobre cada oferta, utiliza 3 atributos distintos
				// sobre cada fila
				switch(tipo) {
					case 0: if ((ofrezco != resource) && resource != 5) {
								asignarFiltro(b, "Ofrezco");
							} else {
								quitMarketFilter(b, "Ofrezco", ["Busco", "Tipo", "Carencia", "Tiempo"]);
							}
							break;
					case 1: if ((busco != resource) && resource != 5) {
								asignarFiltro(b, "Busco");
							} else {
								quitMarketFilter(b, "Busco", ["Ofrezco", "Tipo", "Carencia", "Tiempo"]);
							}
							break;
					case 2: switch(resource) {
						case 1: if (ofrezco_cantidad <= busco_cantidad) {
									asignarFiltro(b, "Tipo");
								} else {
									quitMarketFilter(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								}
								break;
						case 2: if (ofrezco_cantidad != busco_cantidad) {
									asignarFiltro(b, "Tipo");
								} else {
									quitMarketFilter(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								}
								break;
						case 3: if (ofrezco_cantidad >= busco_cantidad) {
									asignarFiltro(b, "Tipo");
								} else {
									quitMarketFilter(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								}
								break;
						case 4: quitMarketFilter(b, "Tipo", ["Ofrezco", "Busco", "Carencia", "Tiempo"]);
								break;
					} break;
					case 3: switch(resource) {
						case 1: if (carencia == true) {
									asignarFiltro(b, "Carencia");
								} else {
									quitMarketFilter(b, "Carencia", ["Ofrezco", "Busco", "Tipo", "Tiempo"]);
								}
								break;
						case 2: quitMarketFilter(b, "Carencia", ["Ofrezco", "Busco", "Tipo", "Tiempo"]);
								break;
					} break;
					case 4: switch(resource) {
						case 1: if (tiempo > (60*60)) {
									asignarFiltro(b, "Tiempo");
								} else {
									quitMarketFilter(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								}
								break;
						case 2: if (tiempo > (2*60*60)) {
									asignarFiltro(b, "Tiempo");
								} else {
									quitMarketFilter(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								}
								break;
						case 3: if (tiempo > (3*60*60)) {
									asignarFiltro(b, "Tiempo");
								} else {
									quitMarketFilter(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								}
								break;
						case 4: quitMarketFilter(b, "Tiempo", ["Ofrezco", "Busco", "Tipo", "Carencia"]);
								break;
					} break;
				}
			}

			// Para mantener un unico sombreado por cada filtro, activa el que se ha seleccionado y elimina
			// el resto de su tipo
			for (var i = 0; i < 5; i++){
				for (var j = 0; j < 6; j++){
					var a = find("//td[@id='filtro" + i + j + "']", XPFirst);
					if (a){
						if (i == tipo && j == (resource - 1)){
							a.setAttribute("style", "background-color:#E5E5E5");
						}else if (i == tipo){
							a.removeAttribute("style");
						}
					}
				}
			}
		}

		function applyMarketFilters() {
			var defaults = [5, 5, 4, 2, 4];
			for (var i = 0; i < 5; i++){
				var markets = getGMcookie("market" + i, false);
				if (markets != "false") {
					var marketi = parseInt(markets);
				} else {
					var marketi = defaults[i];
					setGMcookie("market" + i, defaults[i], false);
				}
				if (marketi != defaults[i]) filterMarket(i, marketi);
			}
		}

		function processOfferPage(t) {
			var ans = elem("DIV", t.responseText);
			var ansdoc = document.implementation.createDocument("", "", null);
			ansdoc.appendChild(ans);
			var xpres = ansdoc.evaluate("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]/tbody/tr", ans, null, XPList, null);
			var linktrl = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]/tbody/tr", XPList,get("lmid2"));
			var linktrlind = 3;
			var linktr = linktrl.snapshotItem(linktrlind);
			var linktimedata = ComputeSeconds(linktr.childNodes[linktr.childNodes.length >= 12 ? 10 : 6].innerHTML);
			for (var i = 2; i < xpres.snapshotLength - 1; i++) {
				var mrow = xpres.snapshotItem(i);
				var timedata = ComputeSeconds(mrow.childNodes[mrow.childNodes.length == 12 ? 10 : 6].innerHTML);
				var allyCell = getMarketOfferAllianceCell(mrow);
				mrow.appendChild(allyCell);
				var ratioCell = getMarketOfferRatioCell(mrow);
				mrow.appendChild(ratioCell);
				addMarketOfferCellEvents(mrow);
				while (linktimedata < timedata && linktrlind < linktrl.snapshotLength - 1) {
					linktrlind++;
					linktr = linktrl.snapshotItem(linktrlind);
					if (linktr.innerHTML.indexOf('class="rowpic"') < 0) {
						linktimedata = ComputeSeconds(linktr.childNodes[linktr.childNodes.length >= 12 ? 10 : 6].innerHTML);
					} else {
						linktimedata = 999999;
					}
				}
				linktr.parentNode.insertBefore(mrow,linktr);
			}
			applyMarketFilters();
		}

		function createPreloadFunc(page) {
			//log(3, "createPreloadFunc");
			//log(3, "page = " + page);
			return function() {
				ajaxRequest("build.php?id=" + linkid + "&t=1&u=" + (page * 40) + "#h2", "GET", null, processOfferPage, dummy);
			}
		}

		function createOffersTable() {
			var table = newTable([["class", "tbg"], ["style", "width:100%"], ["cellspacing", "1"], ["cellpadding", "0"]]);
			// Se crea la aTable con 3 filas, Ofrezco, Busco y Tipo
			var arrayLabels = [T('OFREZCO'), T('BUSCO')];
			for (var j = 0; j < 2; j++){
				//var marketj = getOption("market" + j, 5, "integer");
				var markets = getGMcookie("market" + j, false);
				if (markets == "false") {
					marketj = 5;
					setGMcookie("market" + j, 5);
				} else {
					marketj = parseInt(markets);
				}
				var tr = elem("TR", "");
				tr.appendChild(elem("TD", arrayLabels[j]));
				// Para Ofrezco y Busco se muestran 4 materiales y un quinto comodin
				for (var i = 0; i < 4; i++){
					var td = newCell("", [["id", "filtro" + j + i]]);
					//var ref = elem("A", "<img src='" + image["img" + (i+1)] + "' width='18' height='12' border='0' title='" + T('RECURSO' + (i+1)) + "' alt='" + T('RECURSO' + (i+1)) + "'>");
					var ref = newLink("");
					var refImg = newImage([['src', image["img" + (i + 1)]], ['width', '18'], ['height', '12'], ['border', '0'], ['title', T('RECURSO' + (i+1))]]);
					ref.appendChild(refImg);
					if (i+1 == marketj) td.setAttribute("style", "background-color:#E5E5E5");
					td.addEventListener("click", functionMarketFilters(j, i  + 1), 0);
					td.appendChild(ref);
					tr.appendChild(td);
				}
				var td = newCell("", [["id", "filtro" + j + "4"]]);
				if (marketj == 5) td.setAttribute("style", "background-color:#E5E5E5");
				var ref = newLink(T('CUALQUIERA'), [['href', jsVoid]]);
				td.addEventListener("click", functionMarketFilters(j, 5), 0);
				td.appendChild(ref);
				tr.appendChild(td);
				table.appendChild(tr);
			}
			// Tipo de transaccion segun la relacion entre oferta y demanda
			var markets = getGMcookie("market2", false);
			if (markets == "false") {
				market2 = 4;
				setGMcookie("market2", 4, false);
			} else {
				market2 = parseInt(markets);
			}
			var tr = elem("TR", "");
			tr.appendChild(elem("TD", T('TIPO')));
			table.appendChild(tr);
			var etiquetas_tipo = ["1:>1", "1:1", "1:<1", "1:x"];
			for (var i = 0; i < 4; i++){
				var td = newCell("", [["id", "filtro" + 2 + i]]);
				if (i+1 == market2) td.setAttribute("style", "background-color:#E5E5E5");
				var ref = newLink(etiquetas_tipo[i], [['href', jsVoid]]);
				td.addEventListener("click", functionMarketFilters(2, (i+1)), 0);
				td.appendChild(ref);
				tr.appendChild(td);
			}
			tr.appendChild(elem("TD", ""));

			// Tiempo maximo de transporte
			var markets = getGMcookie("market4", false);
			if (markets == "false") {
				market4 = 4;
				setGMcookie("market4", 4, false);
			} else {
				market4 = parseInt(markets);
			}
			var tr = elem("TR", "");
			tr.appendChild(elem("TD", T('MAXTIME')));
			table.appendChild(tr);
			var etiquetas_tipo = ["1", "2", "3", ">3"];
			for (var i = 0; i < 4; i++){
				var td = newCell("", [["id", "filtro" + 4 + i]]);
				if (i+1 == market4) td.setAttribute("style", "background-color:#E5E5E5");
				var ref = newLink(etiquetas_tipo[i], [["href", jsVoid]]);
				td.addEventListener("click", functionMarketFilters(4, (i+1)), 0);
				td.appendChild(ref);
				tr.appendChild(td);
			}
			tr.appendChild(elem("TD", ""));
			// Filtro por disponibilidad de resources y mercaderes
			var markets = getGMcookie("market3", false);
			if (markets == "false") {
				market3 = 2;
				setGMcookie("market3", 2, false);
			} else {
				market3 = parseInt(markets);
			}
			var tr = elem("TR", "");
			tr.appendChild(elem("TD", T('DISPONIBLE')));
			table.appendChild(tr);
			var etiquetas_carencia = [T('YES'), T('NO')];
			for (var i = 0; i < 2; i++){
				var td = newCell("", [["colspan", "2"], ["id", "filtro" + 3 + i]]);
				if (i+1 == market3) td.setAttribute("style", "background-color:#E5E5E5");
				var ref = newLink(etiquetas_carencia[i], [["href", jsVoid]]);
				td.addEventListener("click", functionMarketFilters(3, (i+1)), 0);
				td.appendChild(ref);
				tr.appendChild(td);
			}
			tr.appendChild(elem("TD", ""));
			applyMarketFilters();
			// Busca la aTable de ofertas y la inserta justo antes
			var a = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]", XPFirst,get("lmid2"));
			var p = document.createElement("P");
			p.appendChild(table);
			a.parentNode.insertBefore(p, a);
		}

		createOffersTable();
		//get the market building id from the << >> row (last row of the offers table)
		var aT = find("//table[@cellspacing='1' and @cellpadding='2' and @class='tbg' and not(@style)]", XPFirst,get("lmid2"));
		var linkid = find('//td[@class="rowpic"]/a', XPFirst, aT).href.match('id=([0-9]*)&')[1];

		// market preload
		var marketpreloads = getGMcookie("marketpreload", false);
		if (marketpreloads == "false") {
			marketpreload = 0;
			setGMcookie("marketpreload", 0, false);
		} else {
			marketpreload = parseInt(marketpreloads) + 1;
		}

		var pageNo1 = location.href.indexOf("&u=");
		if (pageNo1 != -1) {
			var pageNo2 = location.href.indexOf("#h2");
			var pageNoS1 = location.href.substring(pageNo1 + 3, pageNo2);
			var crtPage = Math.round(parseInt(pageNoS1) / 40);
		} else {
			var crtPage = 0;
		}

		if (marketpreload > 1) {
			for (var i = 1; i < marketpreload; i++) {
				setTimeout(createPreloadFunc(i + crtPage), getRandomTimeRange(1302));
			}
			var X2 = (marketpreload + crtPage) * 40;
			var X1 = (crtPage - marketpreload) * 40;
			var backLink = "build.php?id=" + linkid + "&t=1&u=" + X1 + "#h2";
			var forwardLink = "build.php?id=" + linkid + "&t=1&u=" + X2 + "#h2";
			var tdbfLinks = find('//td[@class="rowpic"]', XPFirst);
			if (tdbfLinks) {
				if (X1 < 0) {
					var aSpan = elem("SPAN", "«");
					aSpan.setAttribute("style", "font-weight:bold;");
					aSpan.setAttribute("class", "c");
				} else {
					var aSpan = elem("A", "« ");
					aSpan.setAttribute("style", "font-weight:bold;");
					aSpan.href = backLink;
				}
				var fwLink = elem("A", "»&nbsp;");
				fwLink.setAttribute("style", "font-weight:bold;");
				fwLink.href = forwardLink;
				tdbfLinks.innerHTML = "";
				tdbfLinks.appendChild(aSpan);
				tdbfLinks.appendChild(fwLink);
			}
		}
	}

	/**
	 * Crea una funcion encargada de calcular e insertar el coste needed segun una cantidad de una casilla
	 * Params:
	 *	aId: identificador de unidad
	 *	coste: coste de una sola unidad
	 * Returns: la funcion de procesamiento
	 */
    function createFunctionToExploreMilitaryUnits(aId, coste){
		var funcion = function (){
			var inputElem = find("//input[@type='text']", XPList);
			if (a == undefined || a == null || a.snapshotLength == 0) {
				a = find("//input[@type='Text']", XPList);
			}
			var a = inputElem.snapshotItem(aId - 1);
            var b = find("//div[@name='exp" + aId + "']", XPFirst);
            var c = calculateResourceTime(arrayByN(coste, a.value));
            if (c) b.innerHTML = c; else b.innerHTML = '';
        }
        return funcion;
    }

    function timeToExploreMilitaryUnits(){
		if (!find("//form[@name='snd']//input[@type='image' and @value='ok']", XPFirst)) return;
        var aX = find("//table[@class='tbg']//tr[not(@class)]//table[@class='f10']", XPList);
            for (var i = 0; i < aX.snapshotLength; i++){
            var b = aX.snapshotItem(i);
			var c = b.getElementsByTagName("TD")[2].textContent.split(" ")[0].split("|");
			var div = document.createElement("DIV");
            div.setAttribute("name", "exp" + (i+1));
            var tr = elem("TR", "");
            var td = newCell("", [["colspan", "2"], ["class", "dcol f7 s7"]]);
            td.appendChild(div);
            tr.appendChild(td);
            var d = b.childNodes;
            d[d.length - 1].appendChild(tr);
            b.parentNode.parentNode.getElementsByTagName("INPUT")[0].addEventListener("keyup", createFunctionToExploreMilitaryUnits((i+1), c), 0);
		}
	}


    function TimeToExplore(){
		var aY = find("//div[@id='lmid2']//div/table[@class='f10']/tbody/tr/td", XPFirst,get('lmid2'));
		if (aY == null || (aY.childNodes.length != 12 && aY.childNodes.length != 4)) {
			//return;
		} else {
			var d = aY.textContent.split("|").splice(0,4);
			var e = calculateResourceTime(d);
			if (e) {
				var aZ = aY.parentNode;
				if (aZ) {
					aZ = aZ.parentNode;
					if (aZ) {
						aZ = aZ.parentNode;
						if (aZ) {
							aZ = aZ.parentNode
							if (aZ) {
								aZ = aZ.getElementsByTagName("span");
								if (aZ) {
									aZ = aZ[0];
									if (aZ) {
										aZ.innerHTML = e;
									}
								}
							}
						}
					}
				}
			}
		}

		//fix for the armoury and blacksmith and town hall
		var ax = find("//table[@class='tbg']//tr[@class='cbg1']", XPFirst);
        if (ax == null || (ax.childNodes.length != 2 && ax.childNodes.length != 4)) return;

		//start new version
		var mainTable = ax.parentNode.parentNode;
		var boolIsTownHall = true;

		for (var xi = 1; xi < mainTable.rows.length; xi++) {
			var aCell = mainTable.rows[xi].cells[0];
			var aTable = aCell.childNodes[1];
			if (aTable) {

				//there is a table  to analyse in this cell
				var levelx = "0";
				for (yi = 0; yi < aTable.rows.length; yi++) {
					var bCell = aTable.rows[yi].cells[0];
					if (xi == 1 && yi == 0) {
						if (bCell.getAttribute("rowspan") != null) {
							//we are in the academy, blacksmith or armoury
							boolIsTownHall = false;
						} else {
							//we are in the town hall
						}
					}
					if (boolIsTownHall) {
						//code for missing resources for parties
						if (yi == 1) {
							var dx = bCell.textContent.split("|").splice(0,4);
							var ex = calculateResourceTime(dx);
							if (ex) mainTable.rows[xi].cells[1].innerHTML = ex;
						}
					} else {
						//code for missing resources to develop/train troops in the academy/blacksmith or armoury
						if (yi == 0) {
							levelx = aTable.rows[yi].cells[1].innerHTML;
							var zi = levelx.lastIndexOf("(");
							levelx = levelx.substring(zi);
							if (levelx.search("20") == -1) {
								levelx = "0";
							} else {
								levelx = "20";
							}
						}
						if (yi == 1) {
							if (levelx != "20") {
								var dx = bCell.textContent.split("|").splice(0,4);
								var ex = calculateResourceTime(dx);
								if (ex) mainTable.rows[xi].cells[1].innerHTML = ex;
								var multipliers = getXmX(getXfields());
							}
						}
					}
				}
			}
		}

	}

    /**
         * Modifica el valor por defecto del tipo de ataque a enviar
         */

	function defaultAttackType(){
        //var accion = getOption('a2bdefault',4,'integer'); // 2 -> Defend, 3 -> Attack, 4 -> Steal
        var actionCookie = getGMcookie('rpdefact', false);
        if (actionCookie != false && actionCookie != "0") {
            var action = "" + (parseInt(actionCookie) + 2);
        }
        var cities = find("//div[@id='lright1']//table[@class='f10']", XPFirst);
        try {
            if (cities) {
                if (location.href.search(/z=(\d+)/) >= 0){
                    var z = RegExp.$1;
                    cities = cities.firstChild;
                    for (var i = 0; i < cities.childNodes.length; i++){
                        var city = cities.childNodes[i];
                        city.textContent.search(/\((.*)\n?\|\n?(.*)\)/);
                        var id = xy2id(RegExp.$1, RegExp.$2);
                        if (id == z) action = "2";
                    }
                }
            }
        } catch(e) {
        }
		// BUGFIX : OASIS - can only be an attack:raid (Thank you, fr3nchlover !)
        if (location.href.match(/a2b.php\?(.*)&o/)) action = 4;
		// finish BUGFIX : OASIS
        var rbAction = find("//input[@value='" + action + "' and @name='c']", XPFirst);
        if (rbAction) {rbAction.checked = true;}
    }
	
	/**
	 * Player Bookmarks on the right side
	 */
	function userBookmarks(){
		var boolShowBookmarks = getGMcookie("showbookmarks", false);
		if (boolShowBookmarks == 'false') boolShowBookmarks = '1';

		// Add user bookmarks if not already present
		var ba = find("//div[@id='lright1']", XPFirst);
		if (!ba){
			ba = document.createElement("DIV");
			ba.setAttribute("id", "lright1");
			var divlmidall = find("//body/div[@id='lmidall']", XPFirst);
			//if (divlmidall != undefined && divlmidall != null) {
				divlmidall.appendChild(ba);
			//} else return;
		}
		if (boolShowBookmarks == "1") {
			var div = document.createElement("DIV");
			var titulo = elem("B", T('MARCADORES') + ":");
			var enlace = newLink("",[['href', "javascript:void(0);"]]);
			var bmImg = newImage([['src', image["addbookmark"]], ['title', T('ANYADIR')]]);
			enlace.appendChild(bmImg);
			var aTable = newTable([["class", "f10"]]);
			div.setAttribute("id", "marcadores");
			div.style.width = '390px';
			enlace.addEventListener("click", function() {addUserBookmark();}, 0);
			titulo.setAttribute("class","f10");
			div.appendChild(titulo);
			var enlaceCrtPage = newLink("", [['href', "javascript:void(0);"]]);
			var bmCrtImg = newImage([['src', image["addbookmarkthispage"]], ['title', T('ADDCRTPAGE')]]);
			enlaceCrtPage.appendChild(bmCrtImg);
			enlaceCrtPage.addEventListener("click", function() {addUserBookmark(window.location.href);}, 0);
			var bmSpImg = newImage([['src', image["addbookmarkspacer"]], ['title', T('SPACER')]]);
			var spacer = newLink("", [['href', "javascript:void(0);"]]);
			spacer.appendChild(bmSpImg);
			spacer.addEventListener("click", function() {appendGMcookieValue("marcadores", ["<hr size='2' width='100%' noshade color=black>", "#"], false); removeElement(find("//div[@id='marcadores']", XPFirst)); userBookmarks();}, 0);
			
			var boolLockBookmarks = getGMcookie("lockbookmarks", false);
			if (boolLockBookmarks == "1") {
				var imgLock = image["locked"];
				var titleLock = T('UNLOCKBOOKMARKS').replace("<br>", " ");
				var gmBMLcookie = "0";
			} else {
				var imgUnlocked = "unlocked" + docDirection.substring(0, 1);
				var imgLock = image[imgUnlocked];
				var titleLock = T('LOCKBOOKMARKS').replace("<br>", " ");
				var gmBMLcookie = "1";
			}
			
			var bmLockImg = newImage([['src', imgLock], ['title', titleLock]]);
			var bmlock = newLink("", [['href', jsVoid]]);
			bmlock.appendChild(bmLockImg);
			bmlock.addEventListener("click", function() {setGMcookie("lockbookmarks", gmBMLcookie, false); removeElement(find("//div[@id='marcadores']", XPFirst)); userBookmarks(); }, false);
			
			//add the bookmark links
			div.appendChild(document.createTextNode("  "));
			div.appendChild(enlace);
			div.appendChild(document.createTextNode(" | "));
			div.appendChild(enlaceCrtPage);
			div.appendChild(document.createTextNode(" | "));
			div.appendChild(spacer);
			div.appendChild(document.createTextNode(" | "));
			div.appendChild(bmlock);
			
			div.appendChild(aTable);
			var p = document.createElement("P");
			p.appendChild(div);
			ba.appendChild(p);

			// get bookmark string
			var strBookmarks = getGMcookie("marcadores", false);
			if (strBookmarks == "false") strBookmarks = '';

			var marcadores = new Array();
			if (strBookmarks != ''){
				strBookmarks = strBookmarks.split("$$");
				for (var i = 0; i < strBookmarks.length; i++) marcadores[i] = strBookmarks[i].split("$");
			}
			
			for (var i = 0; i < marcadores.length; i++){
				var bmRow = elem("TR", "");
				var strBookmark = marcadores[i][0];
				var aCell = elem("TD", "");
				if (boolLockBookmarks != "1") {
					var delImg = newImage([['src', image["delIcon"]], ['width', '12'], ['height', '12'], ['border', '0'], ['style', 'cursor:pointer'], ['title', T('ELIMINAR')]]);
					var delIconLink = newLink("", [['href', "javascript:void(0);"]]);

					delIconLink.appendChild(delImg);
					delIconLink.addEventListener("click", removeGMcookieValue("marcadores", i, false, userBookmarks, false), 0);
					aCell.appendChild(delIconLink);
					bmRow.appendChild(aCell);
					
					var dummyCell = elem("TD", "&nbsp;");
					bmRow.appendChild(dummyCell);
					
					var upLinkCell = elem("TD", "");
					if (i > 0) {
						var upLinkImg = newImage([['src', image["arrowup"]], ['style', 'cursor:pointer']]);
						var upLink = newLink("", [['href', "javascript:void(0);"]]);
						upLink.appendChild(upLinkImg);
						upLink.addEventListener("click", moveUserBookmark(i, -1), false);
						upLinkCell.appendChild(upLink);
					}
					bmRow.appendChild(upLinkCell);
					
					var downLinkCell = elem("TD", "");
					if (i < marcadores.length - 1) {
						var downLinkImg = newImage([['src', image["arrowdown"]], ['style', 'cursor:pointer']]);
						var downLink = newLink("", [['href', "javascript:void(0);"]]);
						downLink.appendChild(downLinkImg);
						downLink.addEventListener("click", moveUserBookmark(i, 1), false);
						downLinkCell.appendChild(downLink);
					}
					bmRow.appendChild(downLinkCell);
					
					var dummyCell = elem("TD", "&nbsp;");
					bmRow.appendChild(dummyCell);
					
					var editLinkCell = elem("TD", "");
					var editLinkImg = newImage([['src', image["editbookmark"]], ['style', 'cursor:pointer'], ['title', T('EDIT')]]);
					var editLink = newLink("", [['href', "javascript:void(0);"]]);
					editLink.appendChild(editLinkImg);
					editLink.addEventListener("click", editUserBookmark(i), false);
					editLinkCell.appendChild(editLink);
					bmRow.appendChild(editLinkCell);
					
					var dummyCell = elem("TD", "&nbsp;");
					bmRow.appendChild(dummyCell);
				} else {
					//add just a simple black button
					if (marcadores[i][1] == location.href) {
                        aCell = elem("TD", "<span> &#9675;&nbsp;&nbsp;</span>");
                    } else {
						var aCell = elem("TD", "<span> &#8226;&nbsp;&nbsp;</span>");
					}
					bmRow.appendChild(aCell);
				}
				var bmCell = elem("TD", "");
				//some changes and additions by fr3nchlover (Thank you !)
				var bmLink = "";
                if (marcadores[i][1].indexOf("*") != -1) {
					var extLinkImg = newImage([['src', image["external"]], ['style', 'cursor:pointer']]);
					strLinkHTML = newLink(strBookmark + " ", [['href', marcadores[i][1].substring(0,marcadores[i][1].length-1)], ['target','_blank']]);
					strLinkHTML.appendChild(extLinkImg);
				} else {
					strLinkHTML = newLink(strBookmark, [['href', marcadores[i][1].substring(0,marcadores[i][1].length)]]);
				}
				bmLink = elem("DIV", "");
				bmLink.appendChild(strLinkHTML);
                bmCell.appendChild(bmLink);               
                bmRow.appendChild(bmCell);
                aTable.appendChild(bmRow);
				
			}
		}
		
		//add the notwblock if necessary
		boolShowNoteBlock = getGMcookie("noteblock", false);
		if (boolShowNoteBlock == 'false') boolShowNoteBlock = '1';
		
        if (boolShowNoteBlock == "1") {
			var noteValue = getGMcookie("notas", false);
			if (noteValue == "false") noteValue = "";
			if (div) {
				noteBlock(div, noteValue);
			} else {
				noteBlock(ba, noteValue);
			}
		}
		
		function addUserBookmark(linkURL, linkLabel) {
			if (!linkURL) {
				var linkURL = prompt(T('ENLACE'));
				if (linkURL == null || linkURL == '') return;
			}
			var linkLabel = prompt(T('TEXTO'));
			if (linkLabel == null || linkLabel == '') return;
			appendGMcookieValue("marcadores", [linkLabel, linkURL], false);
			removeElement(find("//div[@id='marcadores']", XPFirst));
			userBookmarks();
		}
		
		function moveUserBookmark(i, updown) {
			return function(){
				var bookmarks = getGMcookie("marcadores", false);
				var newbookmarks = bookmarks.split("$$");
				var tempBookmark = newbookmarks[i + updown];
				newbookmarks[i + updown] = newbookmarks[i];
				newbookmarks[i] = tempBookmark;
				var strBookmarks = newbookmarks.join("$$");
				setGMcookie("marcadores", strBookmarks, false);
				removeElement(find("//div[@id='marcadores']", XPFirst));
				userBookmarks();
			}
		}
		
		function editUserBookmark(i) {
			return function() {
				var bookmarks = getGMcookie("marcadores", false);
				var newbookmarks = bookmarks.split("$$");
				var tempBookmark = newbookmarks[i].split("$");
				
				var linkLabel = prompt(T('TEXTO'), tempBookmark[0]);
				if (linkLabel != '') {
					//log(3, "linkLabel = " + linkLabel);
					var linkURL = prompt(T('ENLACE'), tempBookmark[1]);
					//if (linkLabel != '') {
						//log(3, "linkURL = " + linkURL);
					//}
				}
				
				if (linkLabel == null) linkLabel = tempBookmark[0];
				if (linkURL == null) linkURL = tempBookmark[1];
				
				if (linkLabel != '' && linkURL != '' && (linkLabel != tempBookmark[0] || linkURL != tempBookmark[1])) {
					newbookmarks[i] = linkLabel + "$" + linkURL;
					var strBookmarks = newbookmarks.join("$$");
					setGMcookie("marcadores", strBookmarks, false);
					removeElement(find("//div[@id='marcadores']", XPFirst));
					userBookmarks();
				}
			}
		}
	}

	function getSingleTown() {
		//we'll do the AJAX Request only if the user has only one village
		// get the list of villages
        var cities = find("//div[@id='lright1']//table[@class='f10']", XPFirst);
        if (!cities || ((cities) && cities.firstChild.childNodes.length == 1)) {
			//get town coordinates from the spieler.php page via AJAX request
			ajaxRequest("/spieler.php", 'GET', null, function(AJAXrespX) {
				var aDoc = document.implementation.createDocument("", "", null);
				var aElem = document.createElement('DIV');
				aElem.innerHTML = AJAXrespX.responseText;
				aDoc.appendChild(aElem);
				var aValue = aDoc.evaluate("//div[@id='lmid2']//table[@class='tbg']//td[@class='s7']//a[contains(@href,'karte.php?d=')]", aElem, null, XPFirst, null).singleNodeValue;
				var singleTownName = aValue.textContent;
				var singleTownId = aValue.href.match(/\?d=(\d+)/)[1];
				setGMcookie('singleTownNI', singleTownName + "|" + singleTownId, false);
				setGMcookie('capital', singleTownName, false);
			});
			//get the newdid from the dorf3.php page via AJAX request
			ajaxRequest("/dorf3.php", 'GET', null, function(AJAXrespX) {
				var aDoc = document.implementation.createDocument("", "", null);
				var aElem = document.createElement('DIV');
				aElem.innerHTML = AJAXrespX.responseText;
				aDoc.appendChild(aElem);
				var aValue = aDoc.evaluate("//div[@id='lmid2']//table[@class='tbg']//td[@class='s7 li ou']//a[contains(@href,'dorf1.php?newdid=')]", aElem, null, XPFirst, null).singleNodeValue;
				var singleTownNEWDID = aValue.href.split("=")[1];
				setGMcookie('singleTownNEWDID', singleTownNEWDID, false);
			});
		}
	}

	function createVillageList() {
		//we have only one village here
		//try to get the GM "cookie" containing the single town name and id
		var singleTown = getGMcookie('singleTownNI', false);
		var singleTownNEWDID = getGMcookie('singleTownNEWDID', false);
		if (singleTown == "false" || singleTownNEWDID == "false") {
			getSingleTown();
			var singleTown = getGMcookie('singleTownNI', false);
			var singleTownNEWDID = getGMcookie('singleTownNEWDID', false);
		}
		if (singleTown != "false") {
			//inspired from Travian3 Beyond Hacked FR (mik french (fr), A_r_e_s (br), Booboo(hu) )
			//now we construct the city table on the right side even if there is a single village
			var singleTown = singleTown.split("|");
			var singleTownName = singleTown[0];
			var singleTownCoords = "(" + id2xy(singleTown[1]) + ")";
			//find lright1
			var divlright1 = find("//div[@id='lright1']", XPFirst);
			if (!divlright1) {
				//create lright1
				var divlright1 = elem("DIV", "");
				divlright1.setAttribute("id", "lright1");
				var divlmidall = get("lmidall");
				//if (divlmidall != undefined && divlmidall != null) {
					divlmidall.appendChild(divlright1);
				//} else return;
			}
			
			divlright1.style.position = "relative";

			var vLink = elem('a', '<span class="f10 c0 s7 b">' + T('VILLAGE') + ':</span>');
			vLink.setAttribute('href', 'dorf3.php');
			divlright1.insertBefore(vLink, divlright1.firstChild);
			var vTable = newTable([['class', "f10"], ['style', 'position:relative']]);
			var aBody = elem("TBODY", "");
			vTable.appendChild(aBody);
			var aRow = elem("TR", "");
			aBody.appendChild(aRow);
			var aCell = newCell('<span class="c2">&#8226;</span>&nbsp;&nbsp;', [['class', 'nbr']]);
			aRow.appendChild(aCell);

			var bLink = elem('a', singleTownName);
			bLink.setAttribute('class', 'active_vl');
			if (singleTownNEWDID != false) {
				bLink.setAttribute('href', '?newdid=' + singleTownNEWDID);
			} else {
				bLink.setAttribute('href', '?newdid=0');
			}
			aCell.appendChild(bLink);
			var bCell = newCell("", [['class', 'right']]);
			aRow.appendChild(bCell);

			var aTable = newTable([["class", "dtbl"], ["cellspacing", "0"], ["cellpadding", "0"]]);
			bCell.appendChild(aTable);
			var bBody = elem("TBODY", "");
			aTable.appendChild(bBody);

			var bRow = elem("TR", "");
			bBody.appendChild(bRow);
			//new version - format correctly the coordinates of the village as if this table would have been generated by the game server - for compatibility to other scripts
			var xy = singleTownCoords.split("|");
			var cCell = newCell(xy[0], [["class", "right dlist1"]]);
			var dCell = newCell("|", [["class", "center dlist2"]]);
			var eCell = newCell(xy[1], [["class", "left dlist3"]]);
			bRow.appendChild(cCell);
			bRow.appendChild(dCell);
			bRow.appendChild(eCell);
			insertAfter(vLink, vTable);
		}
	}
	
	/**
	 * Crea enlaces directos en la lista de aldeas para enviar tropas o enviar comerciantes
	 */
    function villageList() {
		// get the list of villages
        var cities = find("//div[@id='lright1']//table[@class='f10']", XPFirst);
        if (!cities) {
			createVillageList();
			var cities = find("//div[@id='lright1']//table[@class='f10']", XPFirst);
		} else {
			setGMcookie('singleTownNI', false, false);
		}
		if (!cities) {
			return;
		}

		vilCount();
		newdidActive = getNewdidVillage();
		
		var tmpX, tmpY;
		cities.setAttribute("cellpadding", "2");
		cities.setAttribute("cellspacing", "1");
		cities = cities.firstChild;
		for (var i = 0; i < cities.childNodes.length; i++){
			
			var city = cities.childNodes[i];
			var cityLink = city.cells[0].innerHTML;
			
			var boolShowInOutIcons = getGMcookie("showinouticons", false);
			if (boolShowInOutIcons == 'false') boolShowInOutIcons = '1';
			if (boolShowInOutIcons == "1") {
				//get the village name and the newdid ID for the inside/outside links
				var newdidxi = cityLink.indexOf('?newdid=');
				cityLink = cityLink.substring(newdidxi + 1);
				var newdidyi = cityLink.indexOf('"');
				var cityName = cityLink.substring(newdidyi);
				var newdidzi = cityName.indexOf("<");
				cityName = cityName.substring(0, newdidzi);
				var newdidti = cityName.indexOf(">");
				cityName = cityName.substring(newdidti + 1);
			}
			
			// Use the text of the coordinates to get the ID needed for following links
			cityLink = cityLink.substring(0, newdidyi);
			city.textContent.search(/\((.*)\n?\|\n?(.*)\)/);
			tmpX = RegExp.$1;
			tmpY = RegExp.$2;
			if (city.innerHTML.indexOf('class="c2"') > -1) {
				//this is the current active village and we'll retain the coordinates for distance and time calculations if the user enters the cell
				xActive = tmpX;
				yActive = tmpY;
				setGMcookie("xActive", xActive, false);
				setGMcookie("yActive", yActive, false);
				if (location.href.indexOf("karte.php") < 0) {
					document.title += " (" + tmpX + "|" + tmpY + ")";
				}
			}
			var vID = xy2id(tmpX, tmpY);
			var popX = getGMcookie("" + vID, false);
			if (popX == "false") {
				var popCell = elem("TD", "<a href='spieler.php?uid=" + crtUserID + "'>?</a>");
			} else {
				var popCell = newCell(popX, [['style', 'font-size:8pt; color:darkgreen']]);
			}
			popCell.setAttribute("align", invDocDirection);
			city.appendChild(popCell);
			if (boolShowInOutIcons == "1") {
				city.appendChild(elem("TD", "<a href='dorf1.php?" + cityLink + "'><img src='" + image["outsidev"] + "' width='12' border='0' title='" + cityName + " (dorf1.php)' alt='" + cityName + " (dorf1.php)'></a>"));
				city.appendChild(elem("TD", "<a href='dorf2.php?" + cityLink + "'><img src='" + image["insidev"] + "' width='12' border='0' title='" + cityName + " (dorf2.php)' alt='" + cityName + " (dorf2.php)'></a>"));
			}
			if (boolShowCenterMapIcon == '1') {
				city.appendChild(elem("TD", "<a href='karte.php?" + cityLink + "'><img src='" + image["centermap"] + "' width='12' border='0' title='" + T('CENTERMAP') + " (" + cityName + ")" + "' alt='" + T('CENTERMAP') + " (" + cityName + ")" + "'></a>"));
			}
			city.appendChild(elem("TD", "<a href='a2b.php?z=" + vID + "'><img src='" + image["def1"] + "' width='12' border='0' title='" + T('RALLYPOINT') + "' alt='" + T('RALLYPOINT') + "'></a>"));
			city.appendChild(elem("TD", "<a href='build.php?z=" + vID + "&gid=17'><img src='" + image["img4"] + "' height='12' border='0' title='" + T('ENVIAR') + "' alt='" + T('ENVIAR') + "'></a>"));
			if (xCoord != "" && yCoord != "" && boolShowDistTimes == "1" && location.href.indexOf('karte') != -1) {
				var lDist = getDistance(parseInt(tmpX), parseInt(tmpY), parseInt(xCoord), parseInt(yCoord));
				var distCell = newCell(" d=" + lDist.toFixed(2), [['style', 'font-size:8pt; color:blue']]);
				city.appendChild(distCell);
			}
		}
	}

	function selectFakeTroopsCell(boolShowAll) {
		var crtUserRace = getRace();
		if (crtUserRace != 'false') {
			var addInt = 0;
			if (crtUserRace == 'Teutons') {
				addInt = 10;
			} else if (crtUserRace == 'Gauls') {
				addInt = 20;
			}
			log(3, "crtUserRace = " + crtUserRace);
			var aCell = elem("TD", "");
			aCell.setAttribute('id', 'selectfaketroopscell');
			for (var xi = 1; xi < 9; xi++) {
				if ((crtUserRace != 'Gauls' && xi != 4) || (crtUserRace == 'Gauls' && xi != 3)) {
					var tAv = get("troopsav_" + xi);
					if (tAv || boolShowAll) {
						var aInput = document.createElement("INPUT");
						aInput.setAttribute("type", "checkbox");
						aInput.setAttribute('id', 'faketroop_' + xi);
						aInput.setAttribute('value', '1');
						aCell.appendChild(aInput);
						var aImg = newImage([['src', img("u/" + (xi + addInt)) + ".gif"]]);
						aCell.appendChild(aImg);
						var aTxt = document.createTextNode("  ")
						aCell.appendChild(aTxt);
					}
				}
			}
			return aCell;
		} else {
			return null;
		}
	}
	
	//code for the initial selectAllTroops(function) provided by someweirdnobody.  Thank you !
	//selectScout and selectFake functions provided by Nux
	//aggregated and rewritten into a single function by ms99
	//changed by suggestion of Acr111
	function selectAllTroops() {
		
		//add an EventListener to all the input fields
		for (var i = 1; i < 12; i++) {
			var troopInput = find("//input[@name='t" + i + "']", XPFirst);
			//log(3, "troopLink(" + i + ") = " + troopLink);
			if (troopInput) {
				troopInput.setAttribute("id", "t" + i);
				troopInput.addEventListener('keyup', updateTroopsPower, false);
				troopInput.addEventListener('change', updateTroopsPower, false);
				var troopLink = troopInput.parentNode.nextSibling;
				if (troopLink) {
					var xxx = troopLink.textContent.replace("(", "").replace(")", "");
					//log(3, "i = " + i + "; xxx = " + xxx);
					if (xxx != '0') {
						if (troopLink.firstChild) {
							troopLink.firstChild.setAttribute('id', 'troopsav_' + i);
						}
						troopLink.addEventListener('click', addUpdateTroopsPower(i, troopLink), false);
					}
				}
			}
		}
	
		//original position
		var header = find("//div[@id='lmid2']//h1", XPFirst);
		//move the table as suggested by Acr111
		//var header = find("//td[@width='33%']", XPFirst); 
		var arrSelect = [[T('SELECTALLTROOPS'), getAllTroops], [T('SELECTSCOUT'), getScout], [T('SELECTFAKE'), getFakeUnitV2]];
		var aTable = newTable([["cellspacing", "1"], ["style", 'font-size:8pt;']]);
		//change the style of the table as suggested by Acr111
		//aTable.setAttribute("style", "position:relative; left:-20px; z-index: 100; border: solid 1px #00C000; font-size:11px;"); 
		for (var i = 0; i < 3; i++) {
			var aRow = elem("TR", "");
			var aCell = newCell("", [['style', 'font-size:8pt']]);
			//change as suggested by Acr111
			//if (i == 0) aCell.setAttribute("colspan", "3");
			var aLink = elem("A", arrSelect[i][0]);
			aLink.setAttribute("href", "#");
			aLink.addEventListener("click", arrSelect[i][1], true);
			aCell.appendChild(aLink);
			aRow.appendChild(aCell);
			if (i == 0) {
				var bCell = elem("TD", "");
				bCell.setAttribute('colspan', '2');
				aRow.appendChild(bCell);
			}
			if (i == 1){
				//insert no of fakes cell
				var bCell = elem("TD","");
				var scoutInput = document.createElement("INPUT");
				scoutInput.setAttribute("type", "text");
				//scoutInput.setAttribute('style', 'font-size:8pt');
				scoutInput.setAttribute("id", 'selectscoutnumber');
				scoutInput.setAttribute('style', 'width:30px; font-size:8pt');
				var noOfScouts = getGMcookie("noofscouts", false);
				if (noOfScouts == "false") {
					setGMcookie("noofscouts", "3", false);
					noOfScouts = "3";
				}
				scoutInput.value = parseInt(noOfScouts);
				bCell.appendChild(scoutInput);
				aRow.appendChild(bCell);
				//insert save option to change the setup option directly from the Rally point -> Send troops page
				var cCell = elem("TD", "&nbsp;<input type='checkbox' id='savescoutnumber' value='1'></input>&nbsp;" + T('SAVE'));
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
			aTable.appendChild(aRow);
		}
		
		insertAfter(header, aTable);
		
		var troopTable = find("//table[@class='f10']", XPFirst);
		//fix for unusual icons appearing under the list of villages - Thank you, fr3nchlover !
		var tags7 = find("//div[@id='lmid2']//td[@class='s7']", XPFirst);
        if ((troopTable) && !(tags7)) {			
			//add the "clear all" button
			var aRow = elem("TR", "");
			var delCell = newCell("", [['align', 'center'], ['colspan', '12']]);
			var clAllLink = elem("A", "<img src='" + image["delButton"] + "' title='" + T('MTCLEARALL') + "' alt='" + T('MTCLEARALL') + "'>");
			clAllLink.href = jsVoid;
			clAllLink.addEventListener("click", clearAllTroops, false);
			delCell.appendChild(clAllLink);
			aRow.appendChild(delCell);
			troopTable.appendChild(aRow);
			var minLabel = " (* = " + T('MIN') + ")";
			
			
			//add additional table as requested by users
			var parX = find("//table[@class='p1']", XPFirst);
			//log(3, "parX = " + parX);
			if (parX) {
				
	      		var attdefTable = newTable([['class', 'tbg'], ['cellspacing', '1'], ['cellpadding', '2']]);
				
	      		var hRow = newRow("", [['class', 'rbg']]);
	      		var hCell = newCell(T('STATISTICS') + minLabel, [['colspan', '4'], ['style', 'font-weight:bold;']]);
	      		hRow.appendChild(hCell);
	      		attdefTable.appendChild(hRow);
				
	      		//add the total attack, def_i and def_c power for the selected troops
	      		var bRow = newRow("", [['align', docDirection]]);
				
	      		var aCell = newCell("<img src='" + image["att_all"] + "'> *", [['id', "troopsattpower"], ['width', "33,3%"]]);
	      		var bCell = newCell("<img src='" + image["def_i"] + "'> *", [['id', "troopsdefipower"], ['colspan', "2"], ['width', "33,3%"]]);
	      		var cCell = newCell("<img src='" + image["def_c"] + "'> *", [['id', "troopsdefcpower"], ['width', "33,3%"]]);
	      		
	      		bRow.appendChild(aCell);
	      		bRow.appendChild(bCell);
	      		bRow.appendChild(cCell);
	      		attdefTable.appendChild(bRow);
	      		var dRow = elem("TR", "");				

	      		//add the total capacity
	      		var dCell = newCell("<img src='" + image["capacity"] + "'>", [['id', 'troopscapacity'], ['align', docDirection], ['colspan', "2"], ['width', '50%']]);

	      		//add the crop consumption
	      		var eCell = newCell("<img  src='" + image["img5"] + "'>", [['id', 'troopscropconsumption'], ['align', docDirection], ['colspan', "2"], ['width', '50%']]);
				
	      		dRow.appendChild(dCell);
	      		dRow.appendChild(eCell);
	      		attdefTable.appendChild(dRow);

	      		var aDiv = elem("DIV", "");
	      		var pX = elem("P", "");
	      		aDiv.appendChild(pX);
	      		aDiv.appendChild(attdefTable);
				//var pMin = elem("P", minLabel);
				//pMin.setAttribute('style', 'font-size:8pt;');
				//aDiv.appendChild(pMin);
	      		insertAfter(parX, aDiv);
	      	}
		}
		
		function addUpdateTroopsPower(i, troopLink) {
			return function() {
				var aNo = parseInt(troopLink.textContent.replace("(", "").replace(")", ""));
				//log(3, "aNo = " + aNo);
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
				var troopInput = get("t" + i);
				if (troopInput) {
					var troopTypeImg = troopInput.parentNode.previousSibling.firstChild.src;
					var xi = troopTypeImg.lastIndexOf("/");
					troopTypeImg = troopTypeImg.substring(xi + 1);
					xi = troopTypeImg.lastIndexOf(".");
					troopType = troopTypeImg.substring(0, xi);
					if (troopInput.value != "") {
						var troopTypeNo = parseInt(troopInput.value);
						for (var j = 0; j < 5; j++) {
							totals[j][3] += troopTypeNo * uc[parseInt(troopType)][totals[j][2]];
						}
					}
				}
			}
			for (var j = 0; j < 5; j++) {
				var aCell = get(totals[j][0]);
				if (aCell) {
					aCell.innerHTML = "<img src='" + image[totals[j][1]] + "'> *" + " " + totals[j][3].toLocaleString();
				}
			}
			return;
		}
		
		function clearAllTroops() {
			for (var i = 1; i < 12; i++) {
				var troopInput = get("t" + i);
				if (troopInput) {
					troopInput.value = '';
				}
			}
			updateTroopsPower();
			return;
		}
		
		function getAllTroops() {
			var nodeRes = find("//table[@class='p1']//table[@class='f10']//input[@type='text']", XPList);
			if (nodeRes == undefined || nodeRes == null || nodeRes.snapshotLength == 0) {
				nodeRes = find("//table[@class='p1']//table[@class='f10']//input[@type='Text']", XPList);
			}
			//clear all the input fields
			for (var i = 0; i < nodeRes.snapshotLength; i++) { nodeRes.snapshotItem(i).value = ""; }
			
			var troopsForm = document.forms.namedItem("snd");
			var nodes = find("//table[@class='p1']//table[@class='f10']//a", XPList);
			if (nodes.snapshotLength > 1) {
				//log(3, "nodes.snapshotLength = " + nodes.snapshotLength);
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
			var indCol = ((getGMcookie('raceV2', false) == "Gauls") ? 't3' : 't4');
			var nodeRes = find("//table[@class='p1']//table[@class='f10']//input[@type='text']", XPList);
			if (nodeRes == undefined || nodeRes == null || nodeRes.snapshotLength == 0) {
				nodeRes = find("//table[@class='p1']//table[@class='f10']//input[@type='Text']", XPList);
			}
			//clear all the input fields
			for (var i = 0; i < nodeRes.snapshotLength; i++) { nodeRes.snapshotItem(i).value = ""; }
			
			//set the attack:raid as action
			var rbAction = find("//input[@value='4' and @name='c']", XPFirst);
			if (rbAction) {rbAction.checked = true;}
			
			var troopsForm = document.forms.namedItem("snd");
			var nodeScout = document.evaluate("//table[@class='p1']//table[@class='f10']//a[contains(@onclick, '" + indCol + "')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (nodeScout.snapshotLength != 0) {
				var node = nodeScout.snapshotItem (0);
				node.getAttribute("onClick").search(/document\.snd\.(.*)\.value=(.*); return false;/);
				var inputName = RegExp.$1;
				if (inputName != 't9' && inputName != 't10') {
					var scoutInput = troopsForm.elements.namedItem(inputName);
					var inputNoOfScouts = get('selectscoutnumber');
					if (inputNoOfScouts) {
						scoutInput.value = parseInt(inputNoOfScouts.value);
					} else {
						scoutInput.value = 3;
					}
					var scoutSave = get('savescoutnumber');
					if (scoutSave) {
						if (scoutSave.checked == true) {
							setGMcookie("noofscouts", scoutInput.value, false);
						}
					}
					updateTroopsPower();
				}
			} else {
				alert(T('NOTROOP2SCOUT'));
			}
		}
		
		function getFakeUnitV2() {
			var indCol = ((getRace() == "Gauls") ? 't3' : 't4');
			var nodeRes = find("//table[@class='p1']//table[@class='f10']//input[@type='text']", XPList);
			if (nodeRes == undefined || nodeRes == null || nodeRes.snapshotLength == 0) {
				var nodeRes = find("//table[@class='p1']//table[@class='f10']//input[@type='Text']", XPList);
			}
			//remove previously selected units
			for (var i = 0; i < nodeRes.snapshotLength; i++) { nodeRes.snapshotItem(i).value = ""; }
			
			//set the attack:normal as action
			var rbAction = find("//input[@value='3' and @name='c']", XPFirst);
			if (rbAction) {rbAction.checked = true;}
			
			var nodeUnits = document.evaluate("//table[@class='p1']//table[@class='f10']//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (nodeUnits.snapshotLength > 1) {
				var chk = false;
							
				for (var xi = 1; xi < 9; xi++) {
					var faketroopselected = get("faketroop_" + xi);
					if (faketroopselected) {
						//log(3, "xi = " + xi + "; faketroopselected.checked = " + faketroopselected.checked);
						if (faketroopselected.checked) {
							var faketroopavailable = get('troopsav_' + xi);
							//log(3, "xi = " + xi + "; faketroopavailable = " + faketroopavailable);
							if (faketroopavailable) {
								//there are units available from selected fake troop type
								var aInput = get("t" + xi);
								//log(3, "xi = " + xi + "; aInput = " + aInput);
								if (aInput) {
									aInput.value = 1;
									chk = true;
								}
							}
						}
					}
				}
				if (chk == false) {
					//no troops for fake selected or nothing availabe => use default
					var faketroopavailable = get('troopsav_2');
					if (faketroopavailable) {
						var aInput = get("t2");
						if (aInput) {
							aInput.value = 1;
							chk = true;
						}
					}
				}
				//log(3, "chk = " + chk);
				if (chk == false) {
					alert(T('NOSCOUT2FAKE'));
				} else {
					updateTroopsPower();
				}
			} else {
				alert(T('NOTROOPS'));
			}
		}
	}

	function addTroopTimes() {
		//append the distance and time for the case the user opened a cell from the map
		if (xCoord != "" && yCoord != "" && boolShowDistTimes == "1") {
			//alert("show Times");
			var lastRowActions = find("//div[@class='map_details_actions']//table[@class='f10' and @width='100%']/tbody/tr[3]", XPFirst);
			if (!lastRowActions) {
				var lastRowActions = find("//div[@class='map_details_actions']//table[@class='f10' and @width='100%']/tbody/tr[2]", XPFirst);
			}
			if (!lastRowActions) {
				var lastRowActions = find("//div[@class='map_details_actions']//table[@class='f10' and @width='100%']//tr", XPFirst);
			}
			if (lastRowActions) {
				createTimeTroopTable(lastRowActions, xCoord, yCoord);
			}
		}
	}

	/**
	 * Convierte todos los enlaces a la propia pagina del tipo "#" como enlaces vacios de javascript
	 */
	function adjustLinks(){
		var aX = find("//a[@href='#']", XPList);
		for (var i = 0; i < aX.snapshotLength; i++) aX.snapshotItem(i).href = jsVoid;
	}
	
	//The setup page of the script where cookies can be set/reset
    function TravianBeyondSetup(){
		//all Travian Beyond Setup parameters
		var arrTBSetupParams = [
			[1, "accinfo", "TR", "3"],
				[2, "capital", "span", ""],
				[2, "capitalxy", "span", ""],
				[2, "raceCrtV2", "span", ""],
			[1, "gameservertype", "TR", "1"],
				[2, "serverversion2", "checkbox", ""],
			[1, "bigicons", "TR","4"],
				[2, "showbigiconmarket", "checkbox", ""],
				[2, "showbigiconmilitary", "checkbox", ""],
				[2, "showbigiconmilitary2", "checkbox", ""],
				[2, "showbigiconalliance", "checkbox", ""],
				[2, "allianceforumlink", "text", ""],
			[1, "menuleft", "TR","2"],
				[2, "showmenusection3", "checkbox", ""],
				[2, "warsim", "SELECT", [T('WARSIMOPTION1'), T('WARSIMOPTION2')]],
			[1, "villagelist", "TR","1"],
				[2, "showinouticons", "checkbox",""],
				[2, "showcentermapicon", "checkbox", ""],
			[1, "bookmarkoptions", "TR", "2"],
				[2, "showbookmarks", "checkbox",""],
				[2, "marcadores", "text", ""],
			[1, "noteblockoptions", "TR","3"],
				[2, "noteblock", "checkbox",""],
				[2, "nbsize", "SELECT", [T('NBSIZEAUTO'), T('NBSIZENORMAL'), T('NBSIZEBIG')]],
				[2, "nbheight", "SELECT", [T('NBKEEPHEIGHT'), T('NBAUTOEXPANDHEIGHT')]],
			[1, "npcoptions", "TR", "1"],
				[2, "npcassistant", "checkbox", ""],
			[1, "statistics", "TR", "3"],
				[2, "wsanalyser", "SELECT", [T('WANALYSER0'), T('WANALYSER1')]],
				[2, "showstatlinks", "checkbox", ""],
				[2, "showtravmaplinks", "checkbox", ""],
			[1, "resourcefields", "TR", "2"],
				[2, "showcolorreslevels", "checkbox", ""],
				[2, "showresupgradetable", "checkbox", ""],
			[1, "villagecenter", "TR", "3"],
				[2, "showcolorbuildlevels", "checkbox", ""],
				[2, "showbupgtable", "checkbox", ""],
				[2, "showcenternumbers", "checkbox", ""],
			[1, "marketoffers", "TR", "2"],
				[2, "marketpreload", "SELECT", ["1", "2", "3", "4", "5"]],
				[2, "ventas", "text", ""],
			[1, "rallypoint", "TR", "3"],
				[2, "rpdefact", "SELECT", [T('ATTACKTYPE2'), T('ATTACKTYPE3'), T('ATTACKTYPE4')]],
				[2, "noofscouts", "text", ""],
				[2, "showtroopinfotooltips", "checkbox", ""],
				[2, "showrprinfotooltips", "checkbox", ""],
			[1, "mapoptions", "TR", "2"],
				[2, "showcelltypeinfo", "checkbox", ""],
				[2, "showdisttimes", "checkbox", ""],
				[2, "showmaptable", "checkbox", ""],
			[1, "mesrepoptions", "TR", "1"],
				[2, "mesreppreload", "SELECT", ["1", "2", "3", "4", "5"]],
				[2, "showmesopenlinks", "checkbox", ""],
				[2, "showrepdeltable", "checkbox", ""],
				[2, "showigmlinkforme", "checkbox", ""],
			[1, "coloroptions", "TR", "3"],
				[2, "cncolormaxlevel", "text", ""],
				[2, "cncolornoupgrade", "text", ""],
				[2, "cncolornpcupgrade", "text", ""],
			[1, "debugoptions", "TR", "1"],
				[2, "consoleloglevel", "SELECT", ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]],
		];
	
		//------------------------------------------
		//Modified by Lux
		//------------------------------------------
		if (get('configuracion'))
		{
			showMsgPage(true);
			return;
		}
		//------------------------------------------
		var a = get('lmid2');
		//------------------------------------------
		//Modified by Lux
		//------------------------------------------
		var innerPane = get('InnerMsgPage');
		if (!innerPane)
		{
			addDiv();
			var innerPane = get('InnerMsgPage');
		}
		//------------------------------------------

		if (!a) a = find("//form", XPFirst);

		var setupTable = newTable([["cellspacing", "1"], ["cellpadding", "2"], ["class", "tbg"], ["id", "configuracion"]]);

		var topRow = newRow("", [["class", "rbg"]]);
		var topCell = newCell(T('TBSETUPLINK') + " - Version " + versionText, [["width", "70%"]]);
		
		//create the save button image with the associated "Save" function
		var saveCell = newCell("", [['width', '20%']]);
		var saveImage = newImage([['src', image["buttonSave"]], ['style', 'cursor:pointer;'], ['title', T('SAVE')]]);
		saveImage.addEventListener("click", TravianBeyondSetupSave, 0);
		saveCell.appendChild(saveImage);
		
		//create the close setup image
		var closeCell = newCell("", [['width', '10%']]);
		var closeImage = newImage([['src', closeButton], ['style', 'cursor:pointer;'], ['title', T('CLOSE')]]);
		closeImage.addEventListener("click", function(){showMsgPage(false)}, true);
		
		closeCell.appendChild(closeImage);
		topRow.appendChild(topCell);
		topRow.appendChild(saveCell);
		topRow.appendChild(closeCell);
		setupTable.appendChild(topRow);

		var inparr = new Array(arrTBSetupParams.length);

		for (var i = 0; i < arrTBSetupParams.length; i++){
			if (arrTBSetupParams[i][0] == 1) {
				var sectionRow = elem(arrTBSetupParams[i][2], "");
				var sectionTitleCell = newCell(T(arrTBSetupParams[i][1].toUpperCase()), [["class", "rbg"], ['align', docDirection], ['style', "font-size:9pt; font-weight:bold; color:darkblue;"], ['colspan', '3']]);
				sectionRow.appendChild(sectionTitleCell);
				setupTable.appendChild(sectionRow);
			} else if (arrTBSetupParams[i][0] == 2) {
				var setupRow = elem("TR", "");
				var setupRowLabel = newCell(T(arrTBSetupParams[i][1].toUpperCase()), [['align', docDirection], ['style', 'font-size:8pt']]);
				setupRow.appendChild(setupRowLabel);
				var cellInput = newCell("", [['align', docDirection], ['colspan', '2']]);
				var aValue = getGMcookie(arrTBSetupParams[i][1], false);
				var cellInputValue = (aValue != "false" ? aValue : '');
				if (arrTBSetupParams[i][2] == "SELECT") {
					var elemInput = document.createElement(arrTBSetupParams[i][2]);
					elemInput.setAttribute('type', arrTBSetupParams[i][2]);
				} else if (arrTBSetupParams[i][2] == "span") {
					var elemInput = document.createElement("SPAN");
				} else {
					var elemInput = document.createElement("INPUT");
					elemInput.setAttribute('type', arrTBSetupParams[i][2]);
				}
				elemInput.setAttribute('name', arrTBSetupParams[i][1]);
				elemInput.setAttribute("id", 'is_' + arrTBSetupParams[i][1]);
				switch (arrTBSetupParams[i][2]) {
					case "checkbox":
						elemInput.setAttribute('value', T('YES'));
						if (cellInputValue == 1) elemInput.setAttribute('checked', true);
						break;
					case "text":
						elemInput.setAttribute('style',"width:360px");
						elemInput.setAttribute('value', cellInputValue);
						elemInput.setAttribute('class','fm');
						break;
					case "SELECT":
						for (var xi = 0; xi < arrTBSetupParams[i][3].length; xi++) {
							elemInput.options[xi] = new Option(arrTBSetupParams[i][3][xi], xi, false, false);
						}
						elemInput.setAttribute('class', 'fm');
						elemInput.selected = cellInputValue;
						elemInput.value = cellInputValue;
						break;
					case "span":
						if (cellInputValue == "false") {
							if (arrTBSetupParams[i][1] == "raceCrtV2") {
								elemInput.innerHTML = T('NORACE');
							} else {
								elemInput.innerHTML = "";
							}
							elemInput.setAttribute('style', 'font-size:8pt; color:red;');
						} else {
							elemInput.innerHTML = cellInputValue;
							elemInput.setAttribute('style', 'font-weight:bold; font-size:8pt;');
						}
						break;
					default:
						break;
				}
				cellInput.appendChild(elemInput);
				setupRow.appendChild(cellInput);
				setupTable.appendChild(setupRow);
			}
		}
		
		var colCodeExplRow = elem("TR", "");
		var colCodeExplCell1 = newCell("<b>" + T('COLORHELP') + "</b>", [['style', 'font-size:8pt; color: blue;'], ["align", docDirection]]);
		var colCodeExplCell2 = newCell(T('COLORHELPTEXT'), [['style', 'font-size:8pt; color:blue;'], ["align", docDirection], ["colspan", "2"]]);

		colCodeExplRow.appendChild(colCodeExplCell1);
		colCodeExplRow.appendChild(colCodeExplCell2);
		setupTable.appendChild(colCodeExplRow);

		//create the "Save" row
		var saveRow = newRow("", [['class', 'rbg']]);
		var bottomCell = newCell(T('TBSETUPLINK') + " - Version " + versionText, [["colspan", "1"], ["width", "70%"]]);
		var saveCell2 = newCell("", [["class", "rbg"], ["align", "center"], ["width", "20%"]]);
		var saveImage2 = saveImage.cloneNode(true);
		saveImage2.addEventListener("click", TravianBeyondSetupSave, 0);
		saveCell2.appendChild(saveImage2);
		
		var closeCell2 = newCell("", [["class", "rbg"], ["align", "center"], ["width", "10%"]]);
		var closeImage2 = closeImage.cloneNode(true);
		closeImage2.addEventListener("click", function(){showMsgPage(false)}, true);
		closeCell2.appendChild(closeImage2);
		
		saveRow.appendChild(bottomCell);
		saveRow.appendChild(saveCell2);
		saveRow.appendChild(closeCell2);
		setupTable.appendChild(saveRow);
		//------------------------------------------
		//Modified by Lux
		//------------------------------------------
		innerPane.appendChild(setupTable);
		showMsgPage(true);
		//------------------------------------------
		
		function TravianBeyondSetupSave() {
			var arrayOfInputValues = get("configuracion").getElementsByTagName("INPUT");
			var arrayOfSelectValues = get("configuracion").getElementsByTagName("SELECT");
			var arrayOfValues = arrayOfInputValues;
			for (var i = 0; i < arrayOfValues.length; i++) {
				var valueCurrent = arrayOfValues[i].value;
				if (arrayOfValues[i].type == 'checkbox') {(arrayOfValues[i].checked == true) ? (valueCurrent = '1') : (valueCurrent = '0');}
				setGMcookie(arrayOfValues[i].name, valueCurrent, false);
			}
			var arrayOfValues = arrayOfSelectValues;
			for (var i = 0; i < arrayOfValues.length; i++) {
				var valueCurrent = arrayOfValues[i].value;
				setGMcookie(arrayOfValues[i].name, valueCurrent, false);
			}
			if (boolShowNoteBlock == "1") setGMcookie('notas', get('notas').value, false);
			alert(T('SAVED') + ".");
			location.reload(true);
		}
		
    }
	

	/**
	 * Calcula y muestra el tiempo que ha tardado desde el inicio de ejecucion del script
	 */
	function ComputeTBeyondRunTime(){
		var div = find("//div[@id='ltime']/br", XPFirst);
		if (div) {
			TBeyondRunTime[1] = new Date().getTime();
	        var timeval="" + (TBeyondRunTime[1]-TBeyondRunTime[0]);
	        var tbtime = elem("span", " | Travian Beyond time: " + timeval + " ms");
	        tbtime.setAttribute("class","b");
			tbtime.setAttribute("style", "z-index: 2; color: #FFFFFF;");
			div.parentNode.style.width="400px";
			div.parentNode.insertBefore(tbtime, div);
		}
	}

	function installMapEventHandler() {
		//log(3, "installMapEventHandler");
		var origpe = unsafeWindow.ve;
 		unsafeWindow.ve = function(pd,qd) {
		   var rv = origpe(pd,qd);
		   setTimeout(infoResources,10);
		   return rv;
		}

		for(var i = 1; i < 50; i++){
			var k1 = (i - 1) % 7;
			var k2 = Math.floor((49 - i) / 7);

		    var area = get("a_" + k1 + "_" + k2);
  		    var mevobj = createMapInfoObj(area, i - 1);
			area.addEventListener("mouseover",mevobj.mouseOverEvent,false);
			area.addEventListener("mouseout", mevobj.mouseOutEvent,false);
		}
		//log(3, "installMapEventHandler end");
	}

	function createMapInfoObj(area,pos){
		//log(3, "createMapInfoObj");
		area.removeAttribute('title');
		var mev = new Object();
		mev.area = area;
		mev.pict = get("i_"+ area.id.substring(2));
		mev.pos = pos;
		mev.timeout = 0;
		mev.mouseOverEvent = function(){
		    if (mev.pict.src.match(/\/(d|t)\d*.gif$/)) {
				if (boolShowCellTypeInfo == '1') {
					mev.timeout = setTimeout(function(){
						ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout!=0) procesarCasilla(t,mev)}, dummy); }, 300);
				} else {
					var pos = mev.area.href.match(/d=(\d+)/).pop();
					mev.timeout = setTimeout(function() {if (mev.timeout != 0) showFieldTypeInTooltip(undefined, pos);}, 300);
				}
			} else if (mev.pict.src.match(/\/(o)\d*.gif$/)) {
				if (boolShowCellTypeInfo == '1') {
					if (mev.area.href != '') {
						mev.timeout = setTimeout(function() {
							ajaxRequest(mev.area.href, "GET", null, function(t) {if (mev.timeout !=  0) parseFieldType(t, mev)}, dummy); }, 300);
					}
				} else {
					if (mev.area.href != '') {
						var pos  = mev.area.href.match(/d=(\d+)/).pop();
						mev.timeout = setTimeout(function() {if (mev.timeout != 0) showOasisInfo(mev.pos + 1, undefined, pos);}, 300);
					}
				}
			}
		}
		mev.mouseOutEvent = function(){ clearTimeout(mev.timeout); mev.timeout = 0; get("tb_tooltip").style.display = 'none'; }
		mev.scan = function(){ ajaxRequest(mev.area.href, "GET", null, function(t) {parseFieldType(t,mev);}, dummy); }
		//log(3, "createMapInfoObj end");
		return mev;
	}

	function parseFieldType(t,mev){
		//log(3, "parseFieldType");
		var ans = document.createElement('DIV');
		ans.innerHTML = t.responseText;
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);
		if (ansdoc.evaluate("//div[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue) {
			ansdoc.evaluate("//div[starts-with(@id, 'f')]", ans, null, XPFirst, null).singleNodeValue.id.search(/f(\d)/);
			var boolIsOasis = false;
		} else {
			ansdoc.evaluate("//img[@id='resfeld']", ans, null, XPFirst, null).singleNodeValue.src.search(/\/w(\d+)\.jpg$/);
			var boolIsOasis = true;
		}
		var fieldtype = RegExp.$1;
		//save to storage
		var pos = mev.area.href.match(/d=(\d+)/).pop();

		if (boolIsOasis == false) {
			//this is an empty cell or a village
			showCellInfo(mev.pos + 1, fieldtype);
			return fieldtype;
		} else {
			//this is an oasis and we're going to evaluate the animals inside
			var animalsTable = ansdoc.evaluate("//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
			if (animalsTable) animalsTable = animalsTable.childNodes[0]; //we need only the table not the body
			if (animalsTable) {
				showOasisInfo(mev.pos + 1, animalsTable, pos);
			}
			return fieldtype;
		}
	}

	function getTroopMerchantTooltipHTML(newdid, aColor, addCoords, addMTime, addTTime) {
		var iHTML = "";
		var properAlign = invDocDirection;
		var xyCoord = id2xy(newdid).split("|");
		var qDist = getDistance(parseInt(xyCoord[0]), parseInt(xyCoord[1]), parseInt(xActive), parseInt(yActive));
		//add the distance row
		if (aColor == undefined) {
			aColor = 'black';
		}
		var strDist;
		
		var aRow = elem("TR", "");
		var aCell = newCell("d =", [["style", 'font-size:8pt; color:' + aColor + "; text-align:" + docDirection +";"]]);
		aRow.appendChild(aCell);
		
		strDist = qDist.toFixed(2);
		var bCell = newCell(strDist, [["style", 'font-size:8pt; color:' + aColor + "; text-align:" + properAlign +";"]]);
		aRow.appendChild(bCell);
		
		strDist = "";
		if (addCoords != undefined) {
			if (addCoords == true) {
				strDist = "&nbsp;&nbsp;(" + xActive + "|" + yActive + ") " + "<img src= '" + image["dist"] + "'>" + " (" + xyCoord[0] + "|" + xyCoord[1] + ")"; 
			}
		}
		if (strDist != "") {
			cCell = newCell(strDist, [["style", 'font-size:8pt; color:' + aColor + "; text-align:" + properAlign +";"]]);
			aRow.appendChild(cCell);
		}
		
		iHTML = "<tr>" + aRow.innerHTML + "</tr>";
		
		if (strDist != "") {
			strDist = "<td></td>";
		}
		var crtUserRace = getRace();
		if (crtUserRace != "false" && xyCoord[0] != "" && xyCoord[1] != "" && qDist != 0) {
			var aColspan = '';
			var aAlign = '';
			if (addTTime == true) {
				aColspan = "colspan='2' ";
				aAlign = "align='center'";
			}
			var clockCell = "<td " + aColspan + aAlign + "><img src='" + image["clock"] + "'</td> ";
			if (addTTime == true) {
				//add the clock row
				iHTML += "<tr>" + clockCell + "</tr>";
				clockCell = '';
			}
			
			if (addMTime == true) {
				//add the merchant row
				var aTime = getMTime(qDist, crtUserRace);
				aMalign = invDocDirection;
				if (addTTime == false) {
					aMalign = docDirection;
				}
				iHTML += "<tr>" + clockCell + "<td><img src='" + image["merchant"] + "'></td><td style='color:blue;' align='" + aMalign +"'>" + formatTime(aTime) + " h</td></tr>";
			}
			if (addTTime == true) {
				//add the troop rows
				var arX = getTroopsDetails(qDist, crtUserRace);
				for (iTroopType = 0; iTroopType < 10; iTroopType++) {
					var imgNo = iTroopType + arX[3];
					var imgName = img("u/" + imgNo) + ".gif";
					var aTime = getTTime(iTroopType, crtUserRace, arX);
					iHTML += "<tr><td><img src =" + imgName + "></td><td align='" + properAlign +"'>" + "&nbsp;" + formatTime(aTime) + " h</td>" + strDist + "</tr>";
				}
			}
		}
		return iHTML;
	}

	function showCellInfo(pos, aType) {
		var itext=['','(9)','<img src="' + image['img3'] + '" alt="' + T('RECURSO4') + '">','(6)','<img src="' + image['img2'] + '" alt="' + T('RECURSO3') + '">','<img src="' + image['img1'] + '" alt="' + T('RECURSO2') + '">','(15)'];
		var celldiv = get('map_info_' + pos);
		celldiv.innerHTML = itext[aType];
	}

	function showOasisInfo(pos, animalsTable, newdid) {
		var toolTipHTML = "";
		var typeDisplayTooltip = "none";
		var properAlign = invDocDirection;
		if (animalsTable) {
			var anDI = 0;
			var anDC = 0;
			var anC = 0;
			for (var i = 0; i < animalsTable.childNodes.length; i++) {
				toolTipHTML = toolTipHTML + "<tr>";
				var aRow = animalsTable.childNodes[i];

				if (aRow.childNodes[0].firstChild.src) {
					var ind = aRow.childNodes[0].firstChild.src.match(/^(.*)img\/un\/u\/(\d+)\.gif$/);
					if (ind.length < 3) return;
					var index = ind.pop() - 31;
					toolTipHTML += "<td><img src=" + aRow.childNodes[0].firstChild.src + "></td><td align='" + properAlign + "'>" + aRow.childNodes[1].textContent + "</td></tr>";
					anDI += parseInt(aRow.childNodes[1].textContent) * uc[31 + index][6];
					anDC += parseInt(aRow.childNodes[1].textContent) * uc[31 + index][7];
					anC += parseInt(aRow.childNodes[1].textContent) * uc[31 + index][9];
				} else {
					toolTipHTML += "<td>" + aRow.childNodes[0].textContent + "</td>";
				}
				toolTipHTML += "</tr>";
			}
		}
		toolTipHTML = "<table class='f8' cellpadding='0' cellspacing='0' border='0'>" + toolTipHTML;
		if (toolTipHTML != "" && animalsTable) {
			typeDisplayTooltip = "block";
			if (anDI != 0 || anDC != 0 || anC != 0) {
				toolTipHTML += "<tr><td>&nbsp;</td></tr>";
				toolTipHTML += "<tr><td><img src='" + image["def_i"] + "' width='16' height='16' border='0'></td><td align='" + properAlign +"'>&nbsp;" + anDI + "</td></tr>";
				toolTipHTML += "<tr><td><img src='" + image["def_c"] + "' width='16' height='16' border='0'></td><td align='" + properAlign +"'>&nbsp;" + anDC + "</td></tr>";
				toolTipHTML += "<tr><td><img src='" + image["img5"] + "' width='18' height='12' border='0'></td><td align='" + properAlign +"'>" + anC + "</td></tr>";
				if (boolShowDistTimes == "1") {
					toolTipHTML += "<tr><td>&nbsp;</td></tr>";
				}
			}
		}

		if (boolShowDistTimes == "1") {
			typeDisplayTooltip = "block";
			toolTipHTML += getTroopMerchantTooltipHTML(newdid, "blue", false, false, true);
		}
		toolTipHTML += "</table>";

		var celldiv = get("tb_tooltip");
		celldiv.innerHTML = toolTipHTML;
		celldiv.style.display = typeDisplayTooltip;
	}

	/**
	 * Procesa una respuesta XmlHttpRequest de la pagina de una casilla para mostrar un tooltip con
	 * informacion sobre sus resources
	 * Terkepkocka valasz parser.
	 */
	function procesarCasilla(t,mev){
		var fieldtype = parseFieldType(t,mev);
		var pos = mev.area.href.match(/d=(\d+)/).pop();
		showFieldTypeInTooltip(fieldtype, pos);
	}
	
	function showFieldTypeInTooltip(fieldtype, newdid) {
		//log(3, "showFieldTypeInTooltip start; fieldtype = " + fieldtype);
		var tooltipDiv = get("tb_tooltip");
		var tmTableHTML = "";
		var typeDisplayTooltip = "none";
		var toolTipHTML = "<table class='f8' cellpadding='0' cellspacing='0' border='0'>";
		if (fieldtype != undefined) {
			typeDisplayTooltip = "block";
			// Solo hay 6 tipos de casillas
			var dist = [[3, 3, 3, 9], [3, 4, 5, 6], [4, 4, 4, 6], [4, 5, 3, 6], [5, 3, 4, 6], [1, 1, 1, 15]];
			var info = dist[fieldtype-1];
			toolTipHTML += "<tr><td colspan='2'>";
			for (var i = 1; i < 5; i++) toolTipHTML += '<img src="' + image["img" + i] + '" width="18" height="12" border="0" title="' + T('RECURSO' + i) + '" alt="' + T('RECURSO' + i) + '">' + info[i-1] + ' ';
			toolTipHTML += "</td></tr>";
			if (boolShowDistTimes == "1") {
				toolTipHTML += "<tr><td>&nbsp;</td></tr>";
			}
		}
		if (boolShowDistTimes == "1") {
			tmTableHTML = getTroopMerchantTooltipHTML(newdid, "blue", false, true, true);
			typeDisplayTooltip = 'block';
		}
		tooltipDiv.innerHTML = toolTipHTML + tmTableHTML + "</table>";
		tooltipDiv.style.display = typeDisplayTooltip;
	}

	function getRallyPointDefaultActionArray() {
		var arrAction = ['def1', T('ATTACKTYPE2')];
		var rallypointDefaultAction = getGMcookie('rpdefact', false);
		if (rallypointDefaultAction != "false") {
			switch (parseInt(rallypointDefaultAction)) {
				case 1: arrAction[0] = "att_all"; arrAction[1] = T('ATTACKTYPE3'); break;
				case 2: arrAction[0] = "att_all"; arrAction[1] = T('ATTACKTYPE4'); break;
				default: arrAction[0] = "def1"; arrAction[1] = T('ATTACKTYPE2'); break;
			}
		}
		return arrAction;
	}

	/**
	* Actualiza la posicion del tooltip. Solo puede haber un tooltip a la vez porque solo hay un puntero de cursos
	*/
	function updateTooltip(e){
		//log(3, "updateTooltip");
		var div = get("tb_tooltip");
		//if (div.style.display == 'block') {
		var xTooltip = (e.pageX + 8);
		var yTooltip = (e.pageY + 8);
		var divHeight = div.clientHeight;
		div.style.left = xTooltip + "px";
		if (yTooltip + divHeight > windowheight) {
			yTooltip = yTooltip - divHeight;
		}
		div.style.top = yTooltip + "px";
		//}
	}

	function createTooltip(){
		//log(3, "createTooltip");
		var div = elem("DIV");
		div.setAttribute("id", "tb_tooltip");
		div.setAttribute("style", "position:absolute; display: block; padding: 4px; z-index: 100; border: solid 1px #00C000; background-color: #FEFFE3; display: none;");
		document.body.appendChild(div);
		document.addEventListener("mousemove", updateTooltip, 0);
		//log(3, "createTooltip end");
	}
	
	/**
	 * Agrega un evento para mostrar la informacion de resources sobre las casillas del mapa
	 * Map resourceinfo generator
	 */
	function infoResources(){
		
		var allArrows = find("//area[starts-with(@id, 'ma_n')]", XPList);
		for (var xi = 0; xi < allArrows.snapshotLength; xi++) {
			allArrows.snapshotItem(xi).addEventListener('click', infoResources, false);
		}
		
		function clearTooltips() {
			for(var i = 1; i < 50; i++) {
				var aTooltip = get('map_info_' + i);
				if (aTooltip) {
					aTooltip.innerHTML = '';
				}
			}
			genMapTable();
		}
		
		function addLargeMapLink() {
			return;
			//if (plus) return;
			var aMap = get("map_content");
			if (aMap) {
				var lmLink = document.createElement("A");
				lmLink.href = jsVoid;
				lmLink.innerHTML = "<img src = '" + image["largemap"] + "' title = '" + T('LARGEMAP') + "' alt = '" + T('LARGEMAP') + "'>";
				lmLink.addEventListener('click', openLargeMap, false);
				lmLink.setAttribute('style', 'position:absolute; z-index:79; left:26px; top:88px;');
				aMap.insertBefore(lmLink, aMap.firstChild);
			}
		}

		function openLargeMap() {
			//get the center cell of the small map currently shown
			log(3, "openLargeMap");
			var centerCell = get("a_3_3");
			if (centerCell) {
				var centerCellID = parseInt(centerCell.href.substring(centerCell.href.indexOf('d=') + 2).split('&')[0]);
				log(3, "centerCellID = " + centerCellID);
			}
			alert("We are sorry !\nThis function is not available yet...");
			return;
		}

		function processMapGetResponse(r) {
			log(3, "processMapGetResponse");
			var cellinfos = r.split(",");
			for (var i = 0; i < 49; i++) {
				if (cellinfos[i] > 0 && cellinfos[i] < 10) showCellInfo(i + 1, cellinfos[i]);
			}
		}

		function mapScan() {
			var mapcontent = get('map_content');
			var j=0;
			for(var i=1; i < 50; i++){
				if (get('map_info_' + i).innerHTML == '') {
					var k1 = (i - 1) % 7;
					var k2 = Math.floor((49-i)/7);
					if (get("i_" + k1 + "_" + k2).src.match(/\/(d|t)\d*.gif$/)) {
						var area = get("a_" + k1 + "_" + k2);
						var mevobj = createMapInfoObj(area,i-1);
						setTimeout(mevobj.scan,j * 600 + getRandomTimeRange(600));
						j++;
					}
				}
			}
		}

		/**
		*/
		function desplazarMapa(){
			//log(3, "desplazarMapa");
			if (get('map_opts')) removeElement(get('map_opts'));

			if (boolShowCellTypeInfo == '1') {
				// create the "Scan the Map" link
				var b = find("//form[@method='post']", XPFirst).parentNode;
				var ctable = newTable([["id", "map_opts"]]);
				var ctbody = document.createElement("TBODY");
				var mapScana = newLink(T('MAPSCAN'), [['id', 'mapscan'], ['href', jsVoid]])
				mapScana.addEventListener("click", mapScan, 0);
				trc = elem("TR", "");
				tdc = newCell("", [["colspan", '2']]);
				tdc.appendChild(mapScana);
				trc.appendChild(tdc);
				ctbody.appendChild(trc);
				ctable.appendChild(ctbody);
				b.appendChild(ctable);
			}
			document.addEventListener("mousemove", updateTooltip, 0);
		}

		//generate the table on the "karte.php" page
		function genMapTable(){
			//log(3, "genMapTable");
			//select the correct images and link titles for the reinf/attack icons
			var boolShowMapTable = getGMcookie("showmaptable", false);
			if (boolShowMapTable == 'false') boolShowMapTable = '1';
			if (boolShowMapTable != '1') return;
			var arrAction = getRallyPointDefaultActionArray();

			if (get('tabla_mapa')) removeElement(get('tabla_mapa'));
			var table = newTable([["id", "tabla_mapa"], ["sortCol", -1], ["class", "tbg"], ["align", docDirection], ["cellspacing", "1"], ["cellpadding", "2"]]);
			var thead = document.createElement("THEAD");
			var tbody = document.createElement("TBODY");
			var fila = newRow("", [['class', "rbg"]]);
			thead.appendChild(fila);
			table.appendChild(thead);
			var columnLabels = ['PLAYER', 'ALLIANCE', 'ALDEAS', 'POPULATION', 'COORDS'];//, 'MAPTABLEACTIONS'];
			for (var i = 0; i < columnLabels.length; i++){
				if (i < 4){
					var td = newCell(T(columnLabels[i]) + " (<img src='" + image["arrowdown"] + "' style='cursor:pointer'><img src='" + image["arrowup"] + "' style='cursor:pointer'>)", [['title', T('CLICKSORT')]]);
					switch(i){
						case 3:
							td.addEventListener("click", sortTable('tabla_mapa', i, 'int'), 0);
							break;
						default:
							td.addEventListener("click", sortTable('tabla_mapa', i), 0);
					}
					td.style.cursor = "pointer";
				} else {
					var td = elem('TD', T(columnLabels[i]));
				}
				fila.appendChild(td);
			}
			var datos = 0;
			var area;
			for(var i = 0; i < 7; i++)
				for(var j = 0; j < 7; j++) {
					area = get('a_' + i + '_' + j).wrappedJSObject;
					var cellinfo=area.details;
					if (cellinfo && cellinfo.name !=null ) {
						datos=1;
						var inforow = elem("TR", "");
						var aName = cellinfo.name;
						if (cellinfo.name == crtUserName) {
							aName = '<b>' + aName + '</b>';
						}
						inforow.appendChild(elem('TD', aName));
						inforow.appendChild(elem('TD', cellinfo.ally));
						var aHref = area.href;
						inforow.appendChild(elem('TD', '<a href="' + aHref + '">' + cellinfo.dname + '</a>'));
						inforow.appendChild(elem('TD', cellinfo.ew));
						inforow.appendChild(elem('TD', '<a href="' + aHref + '">' + cellinfo.x + " | " + cellinfo.y + '</a>'));
						//inforow.appendChild(elem('TD', '<a href="' + aHref.replace("karte.php?d", "a2b.php?z") + "><img src='" + image[arrAction[0]] + "'width='12' title='" + arrAction[1] +"'></a>  <a href=" + aHref.replace("karte.php?d", "build.php?z") + "&gid=17><img src='" + image["img4"] + "' height='12' title='" + T('ENVIAR') + "'></a>"));
						tbody.appendChild(inforow);
					}
				}

			table.appendChild(tbody);
			if (datos == 1)  {
				var middleblock = get('lmidall');
				var TableY = longitudPantalla() + 'px';
				table.style.top = TableY;
				table.style.position = "absolute";
				middleblock.appendChild(table);
			}
		}

		function genMapInfoBlock() {
			var mapinfo = get("map_info");
			if (mapinfo) { removeElement(mapinfo); }
			var firstpos=get("a_0_6").href.match(/d=(\d+)/).pop();
			mapinfo = document.createElement("div");
			mapinfo.setAttribute("id","map_info");
			for(var i = 1; i < 50; i++){
				var divs = elem('div','<div id="map_info_' + i + '" t="0" style="position:relative;left:31px;top:54px;z-index: 90;border: solid 1px #00C000; background-color: #FEFFE3;-moz-border-radius: 8px;"></div>');
				divs.className = 'mt' + i;
				divs.setAttribute("style", "z-index:2;");
				mapinfo.appendChild(divs);
			}
			var iniCell = get("a_0_6");
			if (iniCell) iniCell.parentNode.appendChild(mapinfo);
		}

		addLargeMapLink();
		genMapTable();
		desplazarMapa();
		if (!get("tb_tooltip")) {
			createTooltip();
		}
		var mapcontent = get('map_content');
		var casillas = find("//div[@class='mdiv' and @style='z-index: 2;']/img", XPList, mapcontent); // areatypeimage
		var areas = find("//map//area[@shape='poly' and (@coords)]", XPList, mapcontent);
		if (areas.snapshotLength > 0) {
			if (boolShowCellTypeInfo == '1') genMapInfoBlock();
		}
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
		if (aMethod == 'POST') xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlHttpRequest.send(param);
	}

	function showOffers(){
		//global/local option provided by Zippo.  Thank you !
		marketSimpleOffer();
		if (!find("//input[@type='hidden' and @name='t' and @value='2']", XPFirst)) return;
		find("//form", XPFirst).setAttribute("name", "sell");

		var a = find("//input[@type='image' and @name='s1']", XPFirst);
		a.addEventListener("click", function(){
			var saveofferoption = document.getElementById('saveofferoption');
			var saveofferglobal = document.getElementById('saveofferglobal');
			var boolSaveOffer = true;
			var boolSaveGlobal = true;
			if (saveofferoption) {
				if (saveofferoption.checked == false) boolSaveOffer = false;
			}
			if (saveofferglobal) {
				if (saveofferglobal.checked == false) boolSaveGlobal = false;
			}
			if (boolSaveOffer) {
				var param = ["m1", "m2", "rid1", "rid2", "d2"];
				var checks = ["d1", "ally"];
				var values = new Array();
				for(var i = 0; i < param.length; i++) eval("values[" + i + "] = find(\"//*[@name='" + param[i] + "']\", XPFirst).value");
				for(var i = 0; i < checks.length; i++){
					try{
						eval("var b = find(\"//*[@name='" + checks[i] + "']\", XPFirst).checked");
						if (b == true) values[i + param.length] = '1'; else values[i + param.length] = '0';
					} catch(e) {}
				}
				if ( ! boolSaveGlobal ) values[7] = villageID;
				appendGMcookieValue("ventas", values, false);
			}
		}, 0);

		// get offers string
		var strOffers = getGMcookie("ventas", false);
		if (strOffers == "false") strOffers = '';

		var ventas = new Array();
		if (strOffers != ''){
			strOffers = strOffers.split("$$");
			var j = 0;
			for (var i = 0; i < strOffers.length; i++) {
				var strVillage = strOffers[i].split("$")[7];
				if ( strVillage == villageID || strVillage == undefined ) {
					ventas[j] = strOffers[i].split("$");
					ventas[j][8] = i;
					j++;
				}
			}
		}

		if (ventas.length > 0){
			var aTable = newTable([["id", "ventas"], ["class", "tbg"], ["align", "center"], ["cellspacing", "1"], ["cellpadding", "2"]]);

			var tr = newRow("", [["class", "rbg"]]);
			var columnas = [T('OFREZCO'), T('BUSCO'), T('MAXTIME'), T('ALLIANCE'), T('VENDER'), T('ELIMINAR')];
			for (var i = 0; i < columnas.length; i++) tr.appendChild(elem("TD", columnas[i]));
			aTable.appendChild(tr);

			for (var i = 0; i < ventas.length; i++){
				var tr = elem("TR", "");
				var td = elem("TD", '<img src="' + image["img" + (ventas[i][2])] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (ventas[i][2])) + '"> ' + ventas[i][0]);
				tr.appendChild(td);
				td = elem("TD", '<img src="' + image["img" + (ventas[i][3])] + '" width="18" height="12" border="0" title="' + T('RECURSO' + (ventas[i][3])) + '"> ' + ventas[i][1]);
				tr.appendChild(td);
				td = elem("TD", ventas[i][5] == '1' ? ventas[i][4] : T('NO'));
				tr.appendChild(td);
				td = elem("TD", ventas[i][6] == '1' ? T('YES') : T('NO'));
				tr.appendChild(td);

				td = elem("TD", '<a href="javascript:void(0);" onClick="sell.m1.value=' + ventas[i][0] + ';sell.m2.value=' + ventas[i][1] + ';sell.rid1.value=' + ventas[i][2] + ';sell.rid2.value=' + ventas[i][3] + ';sell.d2.value=' + ventas[i][4] + ';sell.d1.checked=' + (ventas[i][5] == '1') + (ventas[i][6] ? ';sell.ally.checked=' + (ventas[i][6] == '1') : '') + ';sell.submit();"><img src="' + image["buttonOK"] + '" title="' + T('VENDER') + '" alt="' + T('VENDER') + '" border="0"></a>');
				tr.appendChild(td);
				aTable.appendChild(tr);

				var enlace = elem("A", " <img src='" + image['delIcon'] + "' width='12' height='12' border='0' title='" + T('ELIMINAR') + "'>");
				enlace.href = "javascript:void(0);";
				enlace.addEventListener("click", removeGMcookieValue("ventas", ventas[i][8] , true, showOffers, false), 0);
				var td = elem("TD", "");
				td.appendChild(enlace);
				tr.appendChild(td);;
			}
			insertAfter(a, aTable);
		}
	}

	function processVillage11(t){
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// newdid of the village
		try {
			ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var newdid = RegExp.$1;
		} catch(e) {
			var newdid = getGMcookie('singleTownNEWDID', false);
		}

		var times = new Array();

		// Atacks
		var casilla = find("//td[@id='aldea" + newdid + "_1_2" + "']", XPFirst);
		//fix provided by MarioCheng !  Thank you ! Will enable detection of attacks even if the div changes from 'ltbw1' to ltbw0'
		var a = ansdoc.evaluate("//div[@id='ltbw0']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (!a) {
			var a = ansdoc.evaluate("//div[@id='ltbw1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		}

		if (a){
			var a = a.firstChild;
			var b = new Array();
			for (var i = 0; i < a.childNodes.length; i++){
				var tr = a.childNodes[i];
				var error = (tr.childNodes.length == 5 ? false : true);
				times.push(tr.childNodes[error ? 9 : 4].textContent.split(" ")[0]);
				b[i] = '<a href="build.php?newdid=' + newdid + '&gid=16" title="' + tr.childNodes[error ? 3 : 1].textContent.split(" ")[1] + '">' + tr.childNodes[error ? 1 : 0].firstChild.innerHTML + "</a>";
			}
			casilla.innerHTML = b.join(" ");
		} else casilla.innerHTML = '-';

		// Buildings in progress
		var casilla = find("//td[@id='aldea" + newdid + "_1_3" + "']", XPFirst);
		var a = ansdoc.evaluate("//div[@id='lbau1']//table[@class='f10']", ans, null, XPFirst, null).singleNodeValue;
		if (a){
			var b = new Array();
			for (var i = 0; i < a.firstChild.childNodes.length; i++){
				times.push(a.firstChild.childNodes[i].childNodes[2].textContent.split(" ")[0]);
				//b[i] = "<img src='" + image["constructIcon"] + "' title='" + a.firstChild.childNodes[i].childNodes[1].innerHTML + ' ' + a.firstChild.childNodes[i].childNodes[2].textContent.split(' ')[0] + "'>";
				b[i] = "<img src='" + image["constructIcon"] + "' title=\"" + a.firstChild.childNodes[i].childNodes[1].innerHTML + ' ' + a.firstChild.childNodes[i].childNodes[2].textContent.split(' ')[0] + "\">"; 
			}
			casilla.innerHTML = b.join(" ");
		} else casilla.innerHTML = '-';

		find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = image["bulletGreen"];
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';

        // Auto Refresh
		if (times.length > 0) {
			var time = Number.POSITIVE_INFINITY;
        	for (var i = 0; i < times.length; i++) {
                times[i] = ComputeSeconds(times[i]);
               	if (times[i] < time) time = times[i];
	        }
        	//setTimeout(createEventRefreshVillageV2(newdid), 1000 * time);
		}
	}


	function processVillage119(t) {
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// newdid of the village
		try {
			ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var newdid = RegExp.$1;
		} catch(e) {
			var newdid = getGMcookie('singleTownNEWDID', false);
		}

		// Baracks,Big barracks, Stable, BigStable, Workshop, Residence/Palace troops training
		var a = ansdoc.evaluate("//div[@id='lmid2']//table[@class='tbg']//td[@width='5%']", ans, null, XPFirst, null).singleNodeValue;
		if (a){
			var casilla = find("//td[@id='aldea" + newdid + "_1_4" + "']", XPFirst);
			var aTable = a.parentNode.parentNode;
			var troopTraining = getTroopTrainingArray(aTable);
			var intAdd = troopTraining[troopTraining.length - 1][0];

			var iHTML = casilla.innerHTML;
			if (iHTML == "-") iHTML = "";
			var gid = "false";
			for (var xi = 0; xi < troopTraining.length - 1; xi++) {
				if (troopTraining[xi][0] > 0) {
					var imgNo = xi + intAdd;
					var imgName = img("u/" + imgNo) + ".gif";
					if (gid != "" && gid != "false") {
						iHTML += "<a href='build.php?newdid=" + newdid + "&gid=" + gid + "'><img src =" + imgName + " title='" + troopTraining[xi][0] + "' alt='" + troopTraining[xi][1] + "'> ";
					} else {
						iHTML += "<img src =" + imgName + " title='" + troopTraining[xi][0] + "' alt='" + troopTraining[xi][1] + "'> ";
					}
				}
			}
			casilla.innerHTML = iHTML;
			setGMcookie("crtgid", "false", false);
		}
	}

	function processVillage2(t){
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// newdid of the village
		try {
			ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var newdid = RegExp.$1;
		} catch(e) {
			var newdid = getGMcookie('singleTownNEWDID', false);
		}

		//Resources
		var resi = new Array();
		var oldresi = new Array();
		var addInt = 2;
		for (i = 4; i > 0; i--) {
			var a = ansdoc.getElementById("l" + i);
			if (a) {
				var crti = a.innerHTML.split("/");
				resi[i] = toNumber(crti[0]);
				var casilla = find("//td[@id='aldea" + newdid + "_2_" + (i - addInt) + "']", XPFirst);
				if (casilla.innerHTML == "-") casilla.innerHTML = "0";
				oldresi[i] = toNumber(casilla.innerHTML);
				casilla.innerHTML = resi[i].toLocaleString();
				var sumCell = find("//td[contains(@id, 'aldea_s_2_" + (i - addInt) + "')]", XPFirst);
				if (sumCell) {
					var sumCellValue = sumCell.innerHTML;
					if (sumCellValue == "-") {
						sumCell.innerHTML = resi[i].toLocaleString();
					} else {
						sumCellValue = toNumber(sumCellValue);
						sumCell.innerHTML = (sumCellValue + resi[i] - oldresi[i]).toLocaleString();
					}
				}
				addInt = addInt - 2;
				if (i == 1) {
					//for the moment crop production/hour to be displayed in the crop consumption cell
					var casilla = find("//td[@id='aldea" + newdid + "_2_6']", XPFirst);
					var vCpH = toNumber(a.getAttribute("title"));
					if (casilla.innerHTML == "-") casilla.innerHTML = "0";
					oldvCpH = toNumber(casilla.innerHTML);
					casilla.innerHTML = vCpH.toLocaleString();
					if (vCpH < 0) {
						casilla.setAttribute('style', 'color:red');
					}
					var sumCell = find("//td[contains(@id, 'aldea_s_2_6')]", XPFirst);
					if (sumCell) {
						var sumCellValue = sumCell.innerHTML;
						if (sumCellValue == "-") {
							sumCell.innerHTML = "" + vCpH.toLocaleString();
						} else {
							sumCellValue = toNumber(sumCellValue);
							sumCell.innerHTML = (sumCellValue + vCpH - oldvCpH).toLocaleString();
						}
					}
				}
			}
		}
		var a = ansdoc.getElementsByTagName("src");
		for (i = 0; i < a.length; i++) {
			if (a[i].indexOf('img5.gif') != -1) {
				//get the total consumption per village
				//work in progress
			}
		}

		find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = image["bulletGreen"];
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';
	}

	function processVillage3(t){
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// newdid of the village
		try {
			ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var newdid = RegExp.$1;
		} catch(e) {
			var newdid = getGMcookie('singleTownNEWDID', false);
		}

		//Resources
		var resi = new Array();
		var prodH = new Array();
		var capi = new Array();
		var addInt;
		var timeToFillW = Infinity;
		var timeToFillG;
		for (i = 4; i > 0; i--) {
			var a = ansdoc.getElementById("l" + i);
			if (a) {
				var crti = a.innerHTML.split("/");
				resi[i] = crti[0];
				capi[i] = crti[1];
				prodH = a.title;
				var crtFillTime = Math.round((capi[i] - resi[i])*3600/prodH);
				//crtFillTime = crtFillTime;
				if (i > 1) {
					if (timeToFillW > crtFillTime) timeToFillW = crtFillTime;
				} else {
					if (parseInt(prodH) < 0) {
						timeToFillG = Math.round(resi[i]*3600/prodH);
					} else {
						timeToFillG = crtFillTime;
					}
				}
				switch (i) {
					case 4: addInt = 2; break;
					case 3: addInt = 3; break;
					case 2: addInt = 4; break;
					case 1: addInt = 6; break;
				}
				var casilla = find("//td[@id='aldea" + newdid + "_3_" + addInt + "']", XPFirst);
				var procFill = Math.round(100 * resi[i]/capi[i]);
				if (procFill >= 90) {
					casilla.innerHTML = "" + procFill + "%";
					casilla.style.color = "red";
				} else {
					casilla.innerHTML = "" + procFill + "%";
				}
				//casilla.setAttribute("class", "r7 ou");
			}
		}
		var casilla = find("//td[@id='aldea" + newdid + "_3_5" + "']", XPFirst);
		if (timeToFillW == 0) {
			casilla.innerHTML = "-";
		} else if (timeToFillW == Infinity) {
			casilla.innerHTML = "<span id='timer1'>" + "-" + "</span>";
		} else {
			casilla.innerHTML = "<span id='timer1'>" + formatTime(timeToFillW) + "</span>";
		}

		var casilla = find("//td[@id='aldea" + newdid + "_3_7" + "']", XPFirst);
		if (timeToFillG == 0) {
			casilla.innerHTML = "-";
		} else if (timeToFillG == Infinity) {
			casilla.innerHTML = "<span id='timer1'>" + "-" + "</span>";
		} else if (timeToFillG < 0) {
			timeToFillG = Math.abs(timeToFillG);
			casilla.innerHTML = "<span id='timer1'>" + formatTime(timeToFillG) + "</span>";
			casilla.style.color = "red";
		} else {
			casilla.innerHTML = "<span id='timer1'>" + formatTime(timeToFillG) + "</span>";
		}

		find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = image["bulletGreen"];
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';
	}

	function processVillage42(t){

		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// newdid of the village
		try {
			ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var newdid = RegExp.$1;
		} catch(e) {
			var newdid = getGMcookie('singleTownNEWDID', false);
		}

		var a = ansdoc.evaluate("//div[@id='lmid2']//table[@class='f10']/tbody/tr/td[2]/b", ans, null, XPFirst, null).singleNodeValue;
		if (a) {cpi = a.textContent;} else {cpi = 0;}

		var a = ansdoc.evaluate("//div[@id='lmid2']//table[@class='f10']/tbody/tr[2]/td[2]/b", ans, null, XPFirst, null).singleNodeValue;
		if (a) {cpt = a.textContent;} else {cpt = 0;}

		var casilla = find("//td[@id='aldea" + newdid + "_4_2" + "']", XPFirst);
		casilla.innerHTML = cpi;
		//casilla.setAttribute("class", "ou");

		var casilla = find("//td[@id='aldea_s_4_2']", XPFirst);
		casilla.innerHTML = cpt;

		find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = image["bulletGreen"];
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';
	}

	//function provided by MarioCheng for checking the Townhall and the parties thrown.  Thank you !
	function processVillage43(t){
		
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// newdid of the village
		try {
			ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var newdid = RegExp.$1;
		} catch(e) {
			var newdid = getGMcookie('singleTownNEWDID', false);
		}
		
		var lvl = 0;
		var bTitle = ansdoc.evaluate("//div[@id='lmid2']/h1/b", ans, null, XPFirst, null).singleNodeValue;
		if (bTitle) {
			var aLvl = bTitle.textContent.split(" ");
			for (i = 0; i < aLvl.length; i++) {
				if (!isNaN(parseInt(aLvl[i]))) lvl = parseInt(aLvl[i]);
			}
		}
		
		var casilla = find("//td[@id='aldea" + newdid + "_4_3" + "']", XPFirst);
		var showLvl = "Lvl " + lvl;
		var partyTime = "";
		
		var a = ansdoc.evaluate("//td[@width='25%']//span[@id='timer1']", ans, null, XPFirst, null).singleNodeValue;
		if (a) {
			partyTime = a.textContent;
			casilla.innerHTML = "<font title='" + showLvl + "'>" + partyTime + "</font>";
		} else {
			if (lvl > 0) {
				partyTime = "•";
				casilla.innerHTML = "<a href='build.php?newdid=" + newdid + "&gid=24' title='" + showLvl + "'>" + partyTime + "</a>";
			}
		}
						
		find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = image["bulletGreen"];
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';
	}
	
	function processVillage44(t) {
		//get available senators/chiefs/settlers
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// newdid of the village
		try {
			ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var newdid = RegExp.$1;
		} catch(e) {
			var newdid = getGMcookie('singleTownNEWDID', false);
		}
		
		if (villageID != 0) {
			var villageTroopTables = ansdoc.evaluate('//div[@id="lmid2"]/table/tbody/tr/td[1]/a[contains(@href, ' + villageID + ')]/../../../..|//div[@id="lmid2"]/p[@class="b f16"]', ans, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (villageTroopTables) {
				var casilla = find("//td[@id='aldea" + newdid + "_4_4" + "']", XPFirst);
				casilla.innerHTML = "";
				var aValue;
				//loop through all table of troops
				for (i = 0; i < villageTroopTables.snapshotLength; i++) {
					var aTable = villageTroopTables.snapshotItem(i);
					if (aTable.nodeName == "P") break;
					var allTroopCells = aTable.rows[2].cells;
					aValue = toNumber(allTroopCells[9].innerHTML);
					if (aValue != 0) {
						for (var xi = 1; xi < aValue + 1; xi++) {
							casilla.innerHTML += aTable.rows[1].cells[9].innerHTML + " ";
						}
					}
					aValue = toNumber(allTroopCells[10].innerHTML);
					if (aValue != 0) {
						for (var xi = 1; xi < aValue + 1; xi++) {
							casilla.innerHTML += aTable.rows[1].cells[10].innerHTML + " ";
						}
					}
				}
				if (casilla.innerHTML == "") {
					casilla.innerHTML = "-";
				}
			}
		}
		find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = image["bulletGreen"];
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';		
	}
	
	function processVillage45(t){
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);

		// newdid of the village
		try {
			ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var newdid = RegExp.$1;
		} catch(e) {
			var newdid = getGMcookie('singleTownNEWDID', false);
		}

		var lvl = 0;
		var maxSlots = 0;
		var bTitle = ansdoc.evaluate("//div[@id='lmid2']/h1/b", ans, null, XPFirst, null).singleNodeValue;
		if (bTitle) {
			var aLvl = bTitle.textContent.split(" ");
			for (i = 0; i < aLvl.length; i++) {
				if (!isNaN(parseInt(aLvl[i]))) lvl = parseInt(aLvl[i]);
			}
		}

		if (lvl != 0) {
			var cpbuilding = GM_getValue(server + '_' + crtUserID + '_' + newdid + '_cpbuilding', false);
		}

		var maxSlots = 0;
		maxSlots = (cpbuilding == "26")?((lvl==20)?3:(lvl>=15)?2:(lvl>=10)?1:0):(lvl==20)?2:(lvl>=10)?1:0;
		
		var aOcSlots = ansdoc.evaluate("//div[@id='lmid2']//table[@class='tbg']/tbody/tr[5]", ans, null, XPFirst, null).singleNodeValue;
		if (aOcSlots) {
			ocSlots = 3;
		} else {
			var aOcSlots = ansdoc.evaluate("//div[@id='lmid2']//table[@class='tbg']/tbody/tr[4]", ans, null, XPFirst, null).singleNodeValue;
			if (aOcSlots) {
				ocSlots = 2;
			} else {
				var aOcSlots = ansdoc.evaluate("//div[@id='lmid2']//table[@class='tbg']/tbody/tr[3]/td", ans, null, XPFirst, null).singleNodeValue;
				if (aOcSlots.textContent.indexOf('1') != -1) {
					ocSlots = 1;
				} else {
					ocSlots = 0;
				}
			}
		}

		var slots = "" + ocSlots + "/" + maxSlots;

		//work on !

		var casilla = find("//td[@id='aldea" + newdid + "_4_5" + "']", XPFirst);
		var oldSlots = casilla.innerHTML;
		if (oldSlots != "-") {
			oldSlots = oldSlots.split("/");
		} else {
			var oldSlots = ["0", "0"];
		}

		casilla.innerHTML = slots;
		var sumCell = find("//td[@id='aldea_s_4_5']", XPFirst);
		if (sumCell) {
			var sumCellValue = sumCell.innerHTML.replace(",", "").replace(".", "").replace(" ", "").replace("&nbsp;", "");
			if (sumCellValue == "-") {
				sumCell.innerHTML = slots;
			} else {
				sumCell.innerHTML = (parseInt(sumCellValue.split("/")[0]) + ocSlots - parseInt(oldSlots[0])) + "/" + (parseInt(sumCellValue.split("/")[1]) + maxSlots - parseInt(oldSlots[1]));
			}
		}

		find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = image["bulletGreen"];
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';
	}

	function processVillage5(t){
		var villageID = 0;
		var ans = elem("DIV", t.responseText);
		var ansdoc = document.implementation.createDocument("", "", null);
		ansdoc.appendChild(ans);
		// newdid and villageID of the village
		try {
			ansdoc.evaluate("//a[@class='active_vl']", ans, null, XPFirst, null).singleNodeValue.getAttribute("href").search(/\?newdid=(\d+)/);
			var newdid = RegExp.$1;

			var aX = ansdoc.evaluate('//a[@class="active_vl"]/../../td/table/tbody/tr/td', ans, null, XPFirst, null).singleNodeValue;
			if (aX) {
				var X = parseInt(aX.innerHTML.replace("(", ""));
				var aY = ansdoc.evaluate('//a[@class="active_vl"]/../../td/table/tbody/tr/td[3]', ans, null, XPFirst, null).singleNodeValue;
				if (aY) {
					var Y = parseInt(aY.innerHTML.replace(")", ""));
					var villageID = xy2id(X, Y);
				}
			}

		} catch(e) {
			var newdid = getGMcookie('singleTownNEWDID', false);
			var singleTown = getGMcookie('singleTownNI', false);
			if (singleTown != false) {
				var singleTownArray = singleTown.split("|");
				var villageID = singleTownArray[1];
			}
		}

		if (villageID != 0) {
			var villageTroopTables = ansdoc.evaluate('//div[@id="lmid2"]/table/tbody/tr/td[1]/a[contains(@href, ' + villageID + ')]/../../../..|//div[@id="lmid2"]/p[@class="b f16"]', ans, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var oldValues = new Array();
			for (i = 2; i < 13; i++) {
				//get old values for this village
				var casilla = find("//td[@id='aldea" + newdid + "_5_" + i + "']", XPFirst);
				if (casilla.innerHTML == "-") {
					oldValues[i] = 0;
					casilla.innerHTML = "0";
					casilla.setAttribute("class", "c");
				} else {
					oldValues[i] = toNumber(casilla.innerHTML);
				}
			}
			//log(3, oldValues);
			if (villageTroopTables) {
				for (i = 2; i < 13; i++) {
					var casilla = find("//td[@id='aldea" + newdid + "_5_" + i + "']", XPFirst);
					if (casilla) {
						casilla.innerHTML = "-";
					}
				}
				for (i = 0; i < villageTroopTables.snapshotLength; i++) {
					var aTable = villageTroopTables.snapshotItem(i);
					if (aTable.nodeName == "P") break;
					var allTroopCells = aTable.rows[2].cells;
					for (j = 1; j < allTroopCells.length; j++) {
						var casilla = find("//td[@id='aldea" + newdid + "_5_" + (j + 1) + "']", XPFirst);
						var aValue = toNumber(allTroopCells[j].innerHTML);
						if (casilla.innerHTML == "-") {
							casilla.innerHTML = aValue;
						} else {
							casilla.innerHTML = toNumber(casilla.innerHTML) + aValue;
						}
						if (parseInt(casilla.innerHTML) != 0) {
							casilla.setAttribute("class", "");
						}
						var	sumCell = find("//td[@id='aldea_s_5_" + (j + 1) + "']", XPFirst);
						if (sumCell) {
							if (sumCell.innerHTML == "-") {
								sumCell.innerHTML = aValue;
							} else {
								var sumCellValue = toNumber(sumCell.innerHTML);
								sumCell.innerHTML = sumCellValue + aValue;
							}
						}
					}
				}
				for (i = 2; i < 13; i++) {
					var sumCell = find("//td[@id='aldea_s_5_" + i + "']", XPFirst);
					if (sumCell) {
						if (sumCell.innerHTML == "-") sumCell.innerHTML = "0";
						var sumCellValue = toNumber(sumCell.innerHTML);
						sumCell.innerHTML = sumCellValue - oldValues[i];
					}
					if (parseInt(sumCell.innerHTML) == 0) {
						sumCell.setAttribute("class", "c");
					} else {
						sumCell.setAttribute("class", "");
					}
				}
			}
		}
		find("//img[@id='aldea" + newdid + "_boton']", XPFirst).src = image["bulletGreen"];
		find("//span[@class='c2']", XPFirst).removeAttribute("class");
		find("//a[contains(@href, '" + newdid + "') and ancestor::div[@id='lright1']]", XPFirst).parentNode.firstChild.className = 'c2';
	}

	function createEventRefreshVillageV2(newdid, i, xi){

		return function(){
			find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = image["bulletYellow"];
			if (xi == 1) {
				//buildings and attacks in progress
				//fix provided by MarioCheng
				var casilla = find("//td[@id='aldea" + newdid[i] + "_1_4" + "']", XPFirst);
				casilla.innerHTML = "-";
				//end fix provided by MarioCheng
				ajaxRequest("dorf1.php?newdid=" + newdid[i], "GET", null, processVillage11,
					function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = image["bulletRed"]; });
				//troops in training in the barracks
				var isAvailableBarracks = GM_getValue(server + '_' + crtUserID + '_' + newdid[i] + '_barracks', false);
				if (isAvailableBarracks != false) {
					var pgAjaxRequest = "build.php?newdid=" + newdid[i] + "&gid=" + isAvailableBarracks;
					ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = image["bulletRed"]; });
				}
				//troops in training in the big barracks
				var isAvailableBigBarracks = GM_getValue(server + '_' + crtUserID + '_' + newdid[i] + '_bigbarracks', false);
				if (isAvailableBigBarracks != false) {
					var pgAjaxRequest = "build.php?newdid=" + newdid[i] + "&gid=" + isAvailableBigBarracks;
					ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = image["bulletRed"]; });
				}
				//troops in training in the stable
				var isAvailableStable = GM_getValue(server + '_' + crtUserID + '_' + newdid[i] + '_stable', false);
				if (isAvailableStable != false) {
					var pgAjaxRequest = "build.php?newdid=" + newdid[i] + "&gid=" + isAvailableStable;
					ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = image["bulletRed"]; });
				}
				//troops in training in the big stable
				var isAvailableBigStable = GM_getValue(server + '_' + crtUserID + '_' + newdid[i] + '_bigstable', false);
				if (isAvailableBigStable != false) {
					var pgAjaxRequest = "build.php?newdid=" + newdid[i] + "&gid=" + isAvailableBigStable;
					ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = image["bulletRed"]; });
				}
				//troops in training in the workshop
				var isAvailableWorkshop = GM_getValue(server + '_' + crtUserID + '_' + newdid[i] + '_workshop', false);
				if (isAvailableWorkshop != false) {
					var pgAjaxRequest = "build.php?newdid=" + newdid[i] + "&gid=" + isAvailableWorkshop;
					ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = image["bulletRed"]; });
				}
				//troops in training in the residence/palace
				var cpbuilding = GM_getValue(server + '_' + crtUserID + '_' + newdid[i] + '_cpbuilding', false);
				if (cpbuilding != false) {
					var pgAjaxRequest = "build.php?newdid=" + newdid[i] + "&gid=" + cpbuilding;
					ajaxRequest(pgAjaxRequest, "GET", null, processVillage119, function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = image["bulletRed"]; });
				}
				//cannot get the correct request and table as no residence/palace level 10 available in test accounts
			} else if (xi == 2) {
				ajaxRequest("dorf1.php?newdid=" + newdid[i], "GET", null, processVillage2,
					function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = image["bulletRed"]; });
			} else if (xi == 3) {
				ajaxRequest("dorf1.php?newdid=" + newdid[i], "GET", null, processVillage3,
					function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = image["bulletRed"]; });
			} else if (xi == 4) {
				var cpbuilding = GM_getValue(server + '_' + crtUserID + '_' + newdid[i] + '_cpbuilding', false);
				if (cpbuilding != false) {
					var pgAjaxRequest = "build.php?newdid=" + newdid[i] + "&gid=" + cpbuilding;
					var pgAjaxRequest2 = pgAjaxRequest + "&s=2";
					ajaxRequest(pgAjaxRequest2, "GET", null, processVillage42,
						function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = image["bulletRed"]; });
					var pgAjaxRequest5 = pgAjaxRequest + "&s=4";
					ajaxRequest(pgAjaxRequest5, "GET", null, processVillage45,
						function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = image["bulletRed"]; });
				} else {
					find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = image["bulletGrey"]
					var casilla = find("//td[@id='aldea" + newdid[i] + "_4_5" + "']", XPFirst);
					casilla.innerHTML = "0/0";
					//alert(T('NOPALACERESIDENCE'));
				}
				
				//parties thrown in the village
				var isAvailableTownhall = GM_getValue(server + '_' + crtUserID + '_' + newdid[i] + '_townhall', false);
				if (isAvailableTownhall != "false") {
					var pgAjaxRequestParty = "build.php?newdid=" + newdid[i] + "&gid=24";
					ajaxRequest(pgAjaxRequestParty, "GET", null, processVillage43, function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = image["bulletRed"]; });
				}
				
				//available senators/chiefs/settlers
				ajaxRequest("build.php?newdid=" + newdid[i] + "&gid=16&j&k", "GET", null, processVillage44,
					function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = image["bulletRed"]; });
				
			} else if (xi == 5) {
				//added "&j&k" as suggested by MarioCheng. Thank you !
				ajaxRequest("build.php?newdid=" + newdid[i] + "&gid=16&j&k", "GET", null, processVillage5,
					function(){ find("//img[@id='aldea" + newdid[i] + "_boton']", XPFirst).src = image["bulletRed"]; });
			}
		}
	}

	function removeDorf3Table() {
		var oldTable = find("//div[@id='lmid2']//table[@class='tbg']", XPFirst);
		if (oldTable) {
			removeElement(oldTable);
		}
	}

	function createDorf35Table(newdid, villageName, newPar, topRowText, secRowText) {
		var intAdd = 1;
		removeDorf3Table();
		var aTable = newTable([["class", "tbg"], ["cellspacing", "1"], ["cellpadding", "2"]]);

		var trTop = elem("TR", "");

		var updAllCell = createUpdAllCell(newdid, 5);
		trTop.appendChild(updAllCell);

		var tdTop = newCell(topRowText[4], [["colspan", "11"]]);
		trTop.appendChild(tdTop);
		trTop.setAttribute("class", "rbg");
		aTable.appendChild(trTop);
		var trTop2 = elem("TR", "");
		var tdTop2 = newCell(secRowText[0], [['width', '150']]);
		trTop2.appendChild(tdTop2);

		crtUserRace = getRace();

		if (crtUserRace != "" && crtUserRace != "false") {
			if (crtUserRace == "Teutons") {
				intAdd = 11;
			} else if (crtUserRace == "Gauls") {
				intAdd = 21;
			}
		}

		for (xi = 0; xi < 10; xi++){
			if (crtUserRace) {
				log(3, "intAdd = " +intAdd);
				var imgName = img("u/" + (xi + intAdd)) + ".gif";
				var tdTop2 = elem("TD", "<img src =" + imgName + ">");
			} else {
				var tdTop2 = newCell("-", [["class", "c"]]);
			}
			trTop2.appendChild(tdTop2);
		}
		var tdTopHero = elem("TD","<img src=" + image["hero"] + ">");
		if (!crtUserRace) tdTopHero.setAttribute("class", "c");
		trTop2.appendChild(tdTopHero);
		aTable.appendChild(trTop2);

		//create the rows for the villages
		rowsDorf3(aTable, newdid, villageName, 11, 5);
		//Sum row
		sumRowDorf3(aTable, 11, 5);
		if (newPar) insertAfter(newPar, aTable);
	}

	function createDorf34Table(newdid, villageName, newPar, topRowText, secRowText) {

		removeDorf3Table();
		var aTable = newTable([["class", "tbg"], ["cellspacing", "1"], ["cellpadding", "2"]]);
		var trTop = elem("TR", "");
		var updAllCell = createUpdAllCell(newdid, 4);
		trTop.appendChild(updAllCell);
		var tdTop = newCell(topRowText[3], [["colspan", "4"]]);
		trTop.appendChild(tdTop);
		trTop.setAttribute("class", "rbg");
		aTable.appendChild(trTop);

		var trTop2 = elem("TR", "");
		for (xi = 0; xi < 6; xi++){
			switch (xi) {
				case 0: var tdTop2 = elem("TD", secRowText[0]); break;
				case 1: var tdTop2 = elem("TD", T('CPPERDAY')); break;
				case 2: var tdTop2 = elem("TD", T('PARTY')); break;
				case 3: var tdTop2 = elem("TD", T('TROPAS')); break;
				case 4: var tdTop2 = elem("TD", T('SLOT')); break;
			}
			if (xi == 0) tdTop2.setAttribute('width', '150');
			trTop2.appendChild(tdTop2);

		}

		aTable.appendChild(trTop2);
		//create the rows for the villages
		rowsDorf3(aTable, newdid, villageName, 4, 4);
		//Sum row
		sumRowDorf3(aTable, 4, 4);
		if (newPar) insertAfter(newPar, aTable);
	}

	function createDorf33Table(newdid, villageName, newPar, topRowText, secRowText) {

		removeDorf3Table();

		var aTable = newTable([["class", "tbg"], ["cellspacing", "1"], ["cellpadding", "2"]]);
		var trTop = newRow("", [["class", "rbg"]]);
		var updAllCell = createUpdAllCell(newdid, 3);
		trTop.appendChild(updAllCell);
		var tdTop = newCell(topRowText[2], [["colspan", "6"]]);
		trTop.appendChild(tdTop);
		aTable.appendChild(trTop);

		var trTop2 = elem("TR", "");
		for (xi = 0; xi < 7; xi++){
			switch (xi) {
				case 0: var tdTop2 = elem("TD", secRowText[0]); break;
				case 1:
				case 2:
				case 3: var tdTop2 = elem("TD", "<img src='" + image['img' + xi] + "' border='0'>"); break;
				case 4: var tdTop2 = elem("TD", "<img src='" + image["clock"] + "' border='0'>"); break;
				case 5: var tdTop2 = elem("TD", "<img src='" + image['img4'] + "' border='0'>"); break;
				case 6: var tdTop2 = elem("TD", "<img src='" + image["clock"] + "' border='0'>"); break;
			}
			if (xi == 0) tdTop2.setAttribute('width', '150');
			trTop2.appendChild(tdTop2);
		}

		aTable.appendChild(trTop2);
		//create the rows for the villages
		rowsDorf3(aTable, newdid, villageName, 6, 3);
		if (newPar) insertAfter(newPar, aTable);
	}

	function createDorf32Table(newdid, villageName, newPar, topRowText, secRowText, merchant) {

		removeDorf3Table();

		var aTable = newTable([["class", "tbg"], ["cellspacing", "1"], ["cellpadding", "2"]]);

		var trTop = newRow("", [["class", "rbg"]]);

		var updAllCell = createUpdAllCell(newdid, 2);
		trTop.appendChild(updAllCell);

		var tdTop = newCell(topRowText[1], [["colspan", "6"]]);
		trTop.appendChild(tdTop);

		aTable.appendChild(trTop);

		var trTop2 = elem("TR", "");
		for (xi = 0; xi < 7; xi++){
			switch (xi) {
				case 0: var tdTop2 = elem("TD", secRowText[0]); break;
				case 1:
				case 2:
				case 3:
				case 4: var tdTop2 = elem("TD", "<img src='" + image['img' + xi] + "' border='0'>"); break;
				case 5: var tdTop2 = elem("TD", "<img src='" + image['img' + 4] + "' border='0'>/<img src='" + image['clock'] + "' border='0'>"); break;
				case 6: var tdTop2 = elem("TD", secRowText[4]); break;
			}
			if (xi == 0) tdTop2.setAttribute('width', '150');
			trTop2.appendChild(tdTop2);
		}

		aTable.appendChild(trTop2);
		//create the rows for the villages
		rowsDorf3(aTable, newdid, villageName, 6, 2, merchant);
		//Sum row
		sumRowDorf3(aTable, 6, 2, merchant);

		if (newPar) insertAfter(newPar, aTable);

	}

	function createDorf31Table(newdid, villageName, newPar, topRowText, secRowText, merchant) {
		removeDorf3Table();
		var aTable = newTable([["class", "tbg"], ["cellspacing", "1"], ["cellpadding", "2"]]);
		var trTop = newRow("", [["class", "rbg"]]);
		var updAllCell = createUpdAllCell(newdid, 1);
		trTop.appendChild(updAllCell);
		var tdTop = newCell(topRowText[0], [["colspan", "4"]]);
		trTop.appendChild(tdTop);
		aTable.appendChild(trTop);
		if (secRowText) {
			var trTop2 = elem("TR", "");
			for (xi = 0; xi < secRowText.length; xi++){
				var tdTop2 = elem("TD", secRowText[xi]);
				if (xi == 0) tdTop2.setAttribute('width', '150');
				trTop2.appendChild(tdTop2);
			}
		}
		aTable.appendChild(trTop2);
		//create the rows for the villages
		rowsDorf3(aTable, newdid, villageName, secRowText.length - 1, 1, merchant);
		if (newPar) insertAfter(newPar, aTable);
	}

	function createUpdAllCell(newdid, xi) {
		var tdUpdAll = elem("TD", "");
		var updAllLink = elem("A", "<img src='" + image['reload'] + "' border='0' width='12' title='" + T('UPDATEALLVILLAGES') + "' alt = '" + T('UPDATEALLVILLAGES') + "'>");
		updAllLink.setAttribute("href", jsVoid);
		updAllLink.addEventListener('click', function () {updateAllVillages(newdid, xi);}, false);
		tdUpdAll.appendChild(updAllLink);
		return tdUpdAll;
	}

	function updateAllVillages(newdid, xi) {
		for (var i = 0; i < newdid.length; i++) {
			//code to update the villages via random timer
			var aTimeOut = getRandomTimeRange(1971);
			setTimeout(createEventRefreshVillageV2(newdid, i, xi), aTimeOut);
		}
		return;
	}

	function sumRowDorf3(nodeToAppendTo, maxTD, tabNo, merchant) {
		//Separator row
		var trSeparator = elem("TR", "");
		var tdSeparator = newCell("", [["colspan", "" + (maxTD + 1)]]);
		trSeparator.appendChild(tdSeparator);
		nodeToAppendTo.appendChild(trSeparator);

		//sum row
		var trSum = elem("TR", "");
		//first sum cell
		var ts1 = newCell(T('TOTAL'), [['style', 'font-weight:bold']]);
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
		for (var yi = 0; yi < maxTD; yi++){
			if (merchant && yi == maxTD - 1) {
				var ts = elem("TD", "" + totalMerchants[0] + "/" + totalMerchants[1]);
			} else if (tabNo == 4 && yi == 1) {
				var ts = newCell("", [["colspan", "2"]]);
			} else if (tabNo == 4 && yi == 2) {
			} else {
				var ts = elem("TD", "-");
			}
			ts.setAttribute("id", "aldea_s_" + tabNo + "_" + (yi+2));
			trSum.appendChild(ts);
		}
		nodeToAppendTo.appendChild(trSum);
		//return trSeparator;
	}

	function rowsDorf3(nodeToAppendTo, newdid, villageName, maxTD, tabNo, merchant) {
		for (var i = 0; i < newdid.length; i++){
			var tr = elem("TR", "");
			//first cell
			var td1 = newCell("", [['align', docDirection]]);
			var aLink = elem("A", "<img src='" + image['bulletGrey'] + "' border='0' title='" + T('ACTUALIZAR') + "' id='aldea" + newdid[i] + "_boton'>");
			aLink.href = "javascript:void(0);";
			aLink.addEventListener("click", createEventRefreshVillageV2(newdid, i, tabNo), 0);
			var nobr = elem("NOBR", "");
			nobr.appendChild(aLink);
			nobr.appendChild(elem("SPAN", ' <a href="dorf1.php?newdid=' + newdid[i] + '">' + villageName[i] + '</a>'));
			td1.appendChild(nobr);
			//td1.align = docDirection;
			if (newdid[i] == newdidActive && tabNo < 4) td1.setAttribute("class", "li ou");
			tr.appendChild(td1);
			//second cell and the other ones
			for (yi = 0; yi < maxTD; yi++) {
				var td = newCell("-", [["id", "aldea" + newdid[i] + "_" + tabNo + "_" + (yi+2)]]);
				if (yi == maxTD - 1 && (tabNo == 1 || tabNo == 2)) {
					td.innerHTML = merchant[i];
				}
				if (newdid[i] == newdidActive && tabNo < 4) {
					td.setAttribute("class", "ou");
					if (yi == maxTD - 1) {
						td.setAttribute("class", "re ou");
					} else {
						td.setAttribute("class", "ou");
					}
				}
				tr.appendChild(td);
			}
			nodeToAppendTo.align = docDirection;
			nodeToAppendTo.appendChild(tr);
		}
	}

	function overviewVillages(){
		//log(3, "enter overviewVillages");
		var origParTop = find("//div[@id='lmid2']//p[@class='txt_menue']", XPFirst);
		if (plus) {
			//log(3, "plus available");
			origParTop.innerHTML += ' | <a href="dorf3.php?s=6">' + T('ATTABLES') + '</a>';
			return;
		}

		//get the table with the list of villages from the right side
		var ba = find("//div[@id='lright1']//table[@class='f10']", XPFirst);
		if (!ba) return;

		var origTable = find("//div[@id='lmid2']//table[@class='tbg']", XPFirst);
		if (origTable) {
			origTable.style.visibility = "hidden";
		}
		
		if (origParTop) {

			var arrayParTopLinks = origParTop.textContent.split("\n");
			var arrayParTopText = new Array();
			for (xi = 0; xi < arrayParTopLinks.length; xi++) {
				arrayParTopText[xi] = arrayParTopLinks[xi].replace("|", "");

			}
			arrayParTopText.shift();
			origParTop.style.visibility = "hidden";
		}

		var originalSecRowHTML = find("//div[@id='lmid2']//table[@class='tbg']/tbody/tr[2]", XPFirst);
		var originalSecRow = originalSecRowHTML.textContent.split("\n");
		originalSecRow.pop();
		originalSecRow.shift();

		//get the villages array
		var newdid = new Array();
		var villageName = new Array();
		var merchant = new Array();
		for (var i = 0; i < ba.rows.length; i++) {
			var cLinks = new Array;
			var j = -1;
			while (!cLinks[0] && j < 10) {
				j = j + 1
				var aCell = ba.rows[i].cells[j];
				cLinks = aCell.getElementsByTagName("A");
			}
			aLink = cLinks[0].getAttribute("href");
			if (aLink) {
				if (aLink.search(/\?newdid=(\d+$)/) >= 0) {
					newdid[newdid.length] = RegExp.$1;
					villageName[villageName.length] = cLinks[0].textContent;					
				}
			}
		}

		//get the merchant array
		for (i = 0; i < newdid.length; i++) {
			var findformula = "//div[@id='lmid2']//table[@class='tbg']/tbody/tr[" + (3 + i) + "]/td[5]";
			var mLink = find(findformula, XPFirst);
			if (mLink != null) {
				merchant[i] = mLink.innerHTML;
			}
		}

		//replace the original Paragraph with a new one providing the same options as in Travian Plus
		var newPar = elem("P", "");
		var a = find("//div[@id='lmid2']", XPFirst);
		if (a.firstChild) {
			a.insertBefore(newPar, a.firstChild);
		} else {
			a.appendChild(newPar);
		}

		for (xi = 0; xi < arrayParTopText.length; xi++) {

			var newParElem = elem("A", arrayParTopText[xi]);
			newParElem.setAttribute("class",  "newDorf3elem_" + xi);
			newParElem.setAttribute("href", "javascript:void(0);");
			if (xi == 0) {
				newParElem.addEventListener("click", function() {createDorf31Table(newdid, villageName, newPar, arrayParTopText, originalSecRow, merchant);}, 0);
			} else if (xi == 1) {
				newParElem.addEventListener("click", function() {createDorf32Table(newdid, villageName, newPar, arrayParTopText, originalSecRow, merchant);}, 0);
			} else if (xi == 2) {
				newParElem.addEventListener("click", function() {createDorf33Table(newdid, villageName, newPar, arrayParTopText, originalSecRow);}, 0);
			} else if (xi == 3) {
				newParElem.addEventListener("click", function() {createDorf34Table(newdid, villageName, newPar, arrayParTopText, originalSecRow);}, 0);
			} else if (xi == 4) {
				newParElem.addEventListener("click", function() {createDorf35Table(newdid, villageName, newPar, arrayParTopText, originalSecRow);}, 0);
			}
			newPar.appendChild(newParElem);
			if (xi < arrayParTopText.length - 1) {
				var newParSeparator = elem("SPAN", " | ");
				newPar.appendChild(newParSeparator);
			}
		}
		removeElement(origTable);
		removeElement(origParTop);
		createDorf31Table(newdid, villageName, newPar, arrayParTopText, originalSecRow, merchant);
	}

	/**
	 * Modifica el estilo del mensaje de borrado de cuenta para adaptarlo a los cambios que realiza el script
	 */
	function deleteAccount(){
		var a = find("//p[parent::div[@id='lleft'] and @style]", XPFirst);
		if (a){
			moveElement(a, document.body);
			a.setAttribute("style", "position:absolute; display: block; padding: 4px; z-index: 2; border: solid 1px #00C000; background-color: #FEFFE3; width:130px; text-align:center; " + invDocDirection + ":0px; top:0px;");
		}
	}

	/**
	 *  time and resource counters
	 */
	function setTimers(){
		function createResourceTimer(i){
			return function(){
				var sTimeouts = find("//*[@id='timeout" + i + "']", XPList);
				//decrease the required amount of the i type resource
				currentResUnits[i]++;
				if (sTimeouts && sTimeouts != null) {
					for (var j = 0; j < sTimeouts.snapshotLength; j++){
						if (sTimeouts.snapshotItem(j)) {
							var quantity = sTimeouts.snapshotItem(j).innerHTML - 1; // calculate needed resource quantity
							if (quantity >= 0) {
								sTimeouts.snapshotItem(j).innerHTML = quantity;
							} else {
								var aParentNode = sTimeouts.snapshotItem(j).parentNode;
								if (aParentNode != undefined && aParentNode != null) {
									var tbodyNode = aParentNode.parentNode;
									if (tbodyNode) {
										if (tbodyNode.childNodes.length <= 2) {
											var resourceCellNode = tbodyNode.parentNode.parentNode;
											removeElement(tbodyNode.parentNode);
											if (resourceCellNode != null) {
												resourceCellNode.setAttribute('valign', 'center');
												resourceCellNode.innerHTML = T('EXTAVAILABLE');
											}
										} else {
											removeElement(sTimeouts.snapshotItem(j).parentNode);
										}
									}
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
				//decrease resource timers
				for (var i = 0; i < allTimeouts.snapshotLength; i++){
					var tiempo = ComputeSeconds(allTimeouts.snapshotItem(i).innerHTML) - 1; // calculate in seconds
					if (tiempo >= 0) { // not reached
						allTimeouts.snapshotItem(i).innerHTML = formatTime(tiempo);
					} else if (allTimeouts.snapshotItem(i).id == 'timeout') {
						if (sTimeouts && sTimeouts != null) {
							var tbodyNode = sTimeouts.snapshotItem(j).parentNode.parentNode;
							if (tbodyNode.childNodes.length <= 2) {
								var resourceCellNode = tbodyNode.parentNode.parentNode;
								removeElement(tbodyNode.parentNode);
								if (resourceCellNode != null) {
									resourceCellNode.setAttribute('valign', 'center');
									resourceCellNode.innerHTML = T('EXTAVAILABLE');
								}
							} else {
								removeElement(sTimeouts.snapshotItem(j).parentNode);
							}
						}
					}
				}
				//moved here by suggestion of fr3nchlover.  Thank you !
				NPCUpdate();
			}
		}
		
		// Calcula cada cuantos segundos debe actualizar cada contador de resources restantes para
		// aprovechar el temporizador del resto de allTimeouts
		var arrFrequency = new Array(4);
		for (var i = 0; i < 4; i++){
			arrFrequency[i] = (1000.0 / Math.abs(productionPerHour[i]/3600));
			if (!isFinite(arrFrequency[i]) || arrFrequency[i] < 0||capacity[i] - currentResUnits[i] == 0) {
				arrFrequency[i] = Number.POSITIVE_INFINITY;
			} else {
				setInterval(createResourceTimer(i), Math.floor(arrFrequency[i]));
			}
		}
		setInterval(createTimerHandler(),1000);
	}

	function getBuildingMaxLevel(gid) {
		var maxLevel;
		switch (gid) {
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				maxLevel = 5;
				break;
			case '23':
			case '27':
				maxLevel = 10;
				break;
			case '40':
				maxLevel = 100;
				break;
			default:
				maxLevel = 20;
		}
		return (maxLevel);
	}

	//This is the function
    function colorLvl(currLvl,structGid, currentTotalRes){
        eval('var nameStruct = ' + gidToName[structGid] + 'Cost;');
        var result = 1;
		var neededResNPC = 0;
		var XY = nameStruct[parseInt(currLvl) + 1];
		if (XY) {
        for (var i = 0; i <4; i++) {
            if (currentResUnits[i] < XY[i]) {
                result = 0;
                //i = 4;
            }
			neededResNPC += XY[i];
        }
		if (result == 0 && neededResNPC <= currentTotalRes) {
			result = 2;
		}
		}
        return (result);
    }

    function ShowCenterNumbers(){
        if (boolShowCenterNumbers == "1" && (location.href.indexOf('dorf2') != -1 || location.href.indexOf('build.php?newdid=') != -1)) {
			
			var currentTotalRes = 0;
			
			//compute total resource units available in the village
			for (var i = 0; i <4; i++) {
				currentTotalRes += parseInt(currentResUnits[i]);
			}

            // Map1 holds building names, level and building spot IDs in area elements
            var map1Element = document.getElementsByName('map1')[0];
			var isNotWW = find("//img[@class='d8']", XPFirst);
            if (map1Element){
                // Map1 ONLY has area children.
                var areaElements = map1Element.getElementsByTagName('area');
                var lvlBuilding, aDIV, coords;

                var BuildingURL = new Array(21);
				var maxCount = 22;
				if (!isNotWW) maxCount = 18;
                for (var i = 0; i < maxCount; i++) {
                    lvlBuilding = /(\d+)/.exec(areaElements[i].getAttribute("title"));
                    BuildingURL = areaElements[i].getAttribute("href");
                    coords = areaElements[i].coords.split(',');
                    // Only show spots if buildings are available
                    if (lvlBuilding){
                        var imgId = parseInt(BuildingURL.match(/id\=(\d+)/).pop()) - 18;
                        //For all the structures (also the rallyPoint)
                        if (imgId == 21) { imgId = 'x1'; }
                        try {
							var gid = document.evaluate('//img[@class="d' + imgId + '"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.getAttribute('src').match(/g(\d+)/).pop();
                        } catch(e) {}
                        //Only for the wall
                        if (imgId == 22) {
                            var aux = find("//div[starts-with(@class, 'd2_x')]", XPFirst);
                            if (aux){
                                switch(aux.className){
                                    case 'd2_x d2_0' : var gid = 'xxx'; break;
                                    case 'd2_x d2_1' : var gid = 31; break;
                                    case 'd2_x d2_11': var gid = 32; break;
                                    case 'd2_x d2_12': var gid = 33; break;
                                }
                            }
                        }
						if (!isNaN(gid)) {
							var aLink = elem("A", "");
							aLink.href = BuildingURL;
							aDIV = elem("DIV", "");
							aDIV.id = 'CNbuildingtag' + i;
							aDIV.className = 'CNbuildingtags';
							aDIV.appendChild(aLink);
							if (lvlBuilding[0]) {aDIV.innerHTML = lvlBuilding[0];}
							aDIV.style.top = parseInt(coords[1]) + parseInt(60) + 'px';
							aDIV.style.left = parseInt(coords[0]) + parseInt(95) + 'px';
							var strLvlBuilding = lvlBuilding.toString();
							aDIV.style.visibility = "visible";
							var bMaxLevel = getBuildingMaxLevel(gid);
							if (boolOldServerVersion == "1") {
								if (bMaxLevel > 12) bMaxLevel = 12;
							}
							if (boolShowBuildColorCodes != "1") {
								aDIV.style.backgroundColor = CN_COLOR_NEUTRAL;
							} else if (lvlBuilding[0] == bMaxLevel || lvlBuilding[0] == 100) {
								aDIV.style.backgroundColor = CN_COLOR_MAX_LEVEL;
							} else {
								var colorCode = colorLvl(strLvlBuilding.substr(0, strLvlBuilding.indexOf(",")), parseInt(gid), currentTotalRes);
								if (colorCode == 0) {
									aDIV.style.backgroundColor = CN_COLOR_NO_UPGRADE;
								} else if (colorCode == 2) {
									aDIV.style.backgroundColor = CN_COLOR_UPGRADABLE_VIA_NPC;
								}
							}
							get('lmid2').appendChild(aDIV);
						}
					}
                }
            }
        }
    }

	//market => offer: function marketSimpleOffer automatically selects as offering the resource
        // from which you have the most units and
        // searching the resource with the minimum units for the current village
		//add option to save the offer
		//add option to save the offer as global (Thank you, Zippo !)
	function marketSimpleOffer() {
		var aX = find("//input[@class='fm fm25']", XPFirst);
		if (!aX) return;
		//log(3, "enter marketSimpleOffer");
		var maxRes = currentResUnits[0];
		var minRes = currentResUnits[0];
		var indexMaxRes = 0;
		var indexMinRes = 0;
		var elemInput = document.getElementById('saveofferoption');
		
		for (var xi = 0; xi < 4; xi++){
			if (maxRes <= parseInt(currentResUnits[xi])) {maxRes = currentResUnits[xi]; indexMaxRes = xi;}
			if (minRes >= parseInt(currentResUnits[xi])) {minRes = currentResUnits[xi]; indexMinRes = xi;}
		}
		try {
			var offerTypeMax = document.getElementsByName("rid1");
			var offerTypeMin = document.getElementsByName("rid2");
			if (offerTypeMax) {offerTypeMax[0].value = "" + (indexMaxRes + 1) + ""; }
			if (offerTypeMin) {offerTypeMin[0].value = "" + (indexMinRes + 1) + ""; }
		} catch(e) {}
		
		if (!elemInput) {
			var aTable = find("//table[@class='f10']", XPFirst);
			if (aTable) {
				var sRow = elem("TR", "");
				var saveCell = elem("TD", "<input type='checkbox' id='saveofferoption' value='1'></input>&nbsp;" + T('SAVE') + "&nbsp;" + "<input type='checkbox' id='saveofferglobal' value='1'></input>&nbsp;" + T('SAVEGLOBAL'));
				for (var i = 0; i < 4; i++) {
					var aCell = elem("TD", "");
					sRow.appendChild(aCell);
				}
				sRow.appendChild(saveCell);
				aTable.appendChild(sRow);
			}
		}
		
		//add information about capacity of the merchants and make transport functions available to this page, too
		var merchantsPar = find("//form//p[@class='f10']", XPFirst);
		//var mCap = getGMcookie("merchantsCapacity", false);
		var mHTML = "";
		if (merchantsPar) {
			mHTML = merchantsPar.innerHTML;
			var mhMH = mHTML.split(" ")[0];
			var avMerchants = parseInt(mHTML.split(" ")[1].split("/")[0]);
			if (mHTML.indexOf("(") == -1) {
				getMerchantsInformation();
				if (merchantsCapacity != "0") {
					merchantsPar.innerHTML += " (" + merchantsCapacity + " / <img src='" + image["merchant"] + "'>)";
				}
			}
		}
		
		var rxInput = find("//input[@class='fm' and @name='m1']", XPFirst);
		if (rxInput) {
			rxInput.addEventListener('keyup', function() {mhRowUpdate3(avMerchants);}, false);
		}
		var rxType = find("//select[@class='fm' and @name='rid1']", XPFirst);
		if (rxType) {
			rxType.addEventListener('change', function() {mhRowUpdate3(avMerchants);}, false);
		}
		
		function mhRowUpdate3(maxNoOfMerchants) {
			var totalTransport = 0;
			var maxCapacity = parseInt(merchantsCapacity);
			var aR = parseInt(rxInput.value);
			
			if (rxType) {
				if (currentResUnits[parseInt(rxType.value) - 1] < aR) {
					rxInput.value = currentResUnits[parseInt(rxType.value) - 1];
				}
			}
			
			if (!isNaN(aR)) totalTransport += aR;

			var totMerchants = Math.ceil(totalTransport / maxCapacity);
			
			//added code provided by MarioCheng & DMaster for wasted/exceeding resources
			var crtWaste = maxCapacity - (totalTransport - (totMerchants-1) * maxCapacity);
            var crtExceed = totalTransport - (maxNoOfMerchants * maxCapacity);
			//finished code addition
			var mhText = "<b>" + mhMH + ": " + totMerchants + "/" + maxNoOfMerchants + "<br>" + T('MAX') + ": " + maxNoOfMerchants * maxCapacity + "<br>";
			
			if (totMerchants > maxNoOfMerchants) {
				var mhColor = "red";
				mhText += T('MTEXCEED') + ": "+ crtExceed;
			} else {
				var mhColor = "darkgreen";
				mhText += T('MTWASTED') + ": "+ crtWaste;
			}
			mhText += "<br>" + T('MTCURRENT') + ": " + totalTransport + "</b>";
			var mhCell = get("mhMerchants");
			if (mhCell == null || mhCell == undefined) {
				var mhRow = elem("TR", "");
				var mhCell = newCell(mhText, [["id", "mhMerchants"], ["style", 'color:' + mhColor], ["colspan", '8']]);
				mhRow.appendChild(mhCell);
				aTable.appendChild(mhRow);
			} else {
				mhCell.innerHTML = mhText;
				mhCell.setAttribute("style", 'color:' + mhColor);
			}
			//work in progress !!!
			return;
		}
	}

	//get hero's mansion pageX
	function boolIsHerosMansion() {
		if (getCurrentLocation()) {
			var nameHeroNode = xpathResultEvaluate('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr[@class="rbg"]/td/span[@class="t"]/../a[contains(@href, "&rename")]/span[@class="c0"]');
			return (nameHeroNode.snapshotLength == 1);
		}
		return false;
	}

	//show hero extended status
	function showHeroStatus() {

		var heroInfo = xpathResultEvaluate('//div[@id="lmid2"]/table[@class="tbg"]/tbody/tr[@class="rbg"]/td/span[@class="t"]/../a[contains(@href, "&rename")]/span[@class="c0"]/../../../..').snapshotItem(0);

		var posType = heroInfo.rows[0].cells[0].textContent.indexOf(" (");
		var heroHeader = heroInfo.rows[0].cells[0].textContent.substr(0, posType);
		var xLevel = "";
		notgata = true;
		for (xi = heroHeader.length; xi > 0; xi--) {
			if (heroHeader.charAt(xi) != " " && notgata) {
				xLevel = heroHeader.charAt(xi) + xLevel
			} else { notgata = false;}
		}
		var heroLevel = parseInt(xLevel);
		var heroPercent = parseInt(heroInfo.rows[heroInfo.rows.length - 1].cells[1].textContent);

		var thisLevelExp = (heroLevel + 1) * 100;
		var expCurrentLevel = ((thisLevelExp) / 2) * heroLevel;
		var nextLevelExp = expCurrentLevel + thisLevelExp;

		var expGainedCurrentLevel = (heroLevel+1) * heroPercent;
		var expToLevelUp = (heroLevel + 1) * (100 - heroPercent);

		var levelTxt = heroInfo.rows[0].cells[0].childNodes[1].textContent;
		levelTxt = levelTxt.substr(0, levelTxt.indexOf(heroLevel) - 1);

		var emptyRow = elem("TR", '<td colspan="0" />');
		heroInfo.appendChild(emptyRow);

		var xRow = elem("TR", '');
		var heroCell = newCell("", [['colSpan', '0']]);
		
		var heroNewTable = newTable([['width', '100%'], ['border', '1px'], ['rules', 'all'], ['cellspacing', '1'], ['cellpadding', '2']]);
		heroNewTable.setAttribute('style', 'border:1px solid #C2C2C2');
		var aRow = elem("TR", '');
		var aCell = elem("TD", levelTxt + " " + heroLevel);
		var bCell = elem("TD", "" + heroPercent + "%");
		var cCell = elem("TD", "" + (100 - heroPercent) + "%");
		var dCell = elem("TD", levelTxt + " " + (heroLevel + 1));
		aRow.appendChild(aCell);
		aRow.appendChild(bCell);
		aRow.appendChild(cCell);
		aRow.appendChild(dCell);

		var bRow = elem("TR", '');
		var a1Cell = newCell('', [['width', '100px'], ['style', 'border-top:1px solid #C2C2C2']]);
		bRow.appendChild(a1Cell);
		var b1Cell = newCell('', [['colSpan', 2], ['style', 'border-top:1px solid #C2C2C2']]);
		bRow.appendChild(b1Cell);

		var graphBar = newTable([['cellspacing', 0], ['style', 'height: 10px; width: 100%']]);

		var rX = elem("TR", '');
		var x1Cell = newCell('', [['style', 'width: ' + heroPercent + '%; background-color: blue']]);
		var x2Cell = newCell('', [['style', 'width: ' + (100 - heroPercent) + '%; background-color: lightgrey']]);

		rX.appendChild(x1Cell);
		rX.appendChild(x2Cell);
		graphBar.appendChild(rX);
		b1Cell.appendChild(graphBar);

		var c1Cell = newCell('', [['colSpan', 2], ['style', 'border-top:1px solid #C2C2C2']]);
		bRow.appendChild(c1Cell);

		var cRow = elem("TR", '');
		var a2Cell = newCell(expCurrentLevel, [['style', 'border-top:1px solid #C2C2C2']]);
		cRow.appendChild(a2Cell);
		var b2Cell = newCell(expGainedCurrentLevel, [['title', "" + expCurrentLevel + " + " + expGainedCurrentLevel + " = " + (expCurrentLevel + expGainedCurrentLevel)], ['style', 'border-top:1px solid #C2C2C2']]);
		cRow.appendChild(b2Cell);
		var c2Cell = newCell(expToLevelUp, [['style', 'border-top:1px solid #C2C2C2']]);
		cRow.appendChild(c2Cell);
		var d2Cell = newCell(nextLevelExp, [['style', 'border-top:1px solid #C2C2C2']]);
		cRow.appendChild(d2Cell);

		heroNewTable.appendChild(aRow);
		heroNewTable.appendChild(bRow);
		heroNewTable.appendChild(cRow);
		heroCell.appendChild(heroNewTable);
		xRow.appendChild(heroCell);
		heroInfo.appendChild(xRow);
	}

	//NPC Merchant

	function NPCexcludedPage(URL) {
		if (boolIsThisNPC()) return false;
		return (URL.match(/^\/build\.php\?id=\d+\&t=\d+/) != null);
	}

	//check if we are on the NPC Merchant page
	function boolIsThisNPC()  {
		var xp = xpathResultEvaluate('//tr[@class="rbg"]/td[@colspan="5"]');
		return (xp.snapshotLength == 1 && document.getElementsByName('m2[]').length == 4);
	}
	
	//check if we are on the page where the NPC trade has been finished
	function boolIsThisPostNPC() {
		var xp = xpathResultEvaluate('//p[@class="txt_menue"]/following-sibling::*/img[@class="res"]');
		return (xp.snapshotLength == 8);
	}

	//insert the NPC assistant back link
	function insertNPCHistoryLink() {
		var bname = getQueryParameters(urlNow, NPCbacklinkName);
		if (!bname) {
			var bname = "Go back";
		}
		var div = document.getElementById('lmid2');
		div.innerHTML += '<p><a href="#" onclick="window.history.go(-2)"> &laquo; ' + bname + '</a></p>';
	}
	
	//fill out the NPC Merchant fields
	function fillOutNPCfields(URL) {
		if (URL.indexOf('&' + NPCResources) != NPCURL.length) return false;
		var needed = getQueryParameters(URL, NPCResources).split(',');
		var inputs = document.getElementsByName('m2[]');
		for (var i = 0; i < 4; i++) {
			inputs[i].value = needed[i];
		}
		unsafeWindow.calculateRest();
	}

	function getXfields() {
		var xp = xpathResultEvaluate('//table[@class="tbg"]/tbody/tr/td/input[starts-with(@name, "t")]');
		if (xp.snapshotLength) {
			var fields = new Array();
			for (var i = 0; i < xp.snapshotLength; i++) {
				fields.push(xp.snapshotItem(i));
			}
			return fields;
		} else { return;}
	}

	function boolIsTroopsPage() {
		var xp = xpathResultEvaluate('//tr[@class="cbg1"]');
		return (xp.snapshotLength && document.getElementsByName('s1').length > 0);
	}

	function getXmX(fields) {
		if (fields) {
			var inputs = new Array();
			for (var i = 0; i < fields.length; i++) {
				var f = fields[i].value;
				inputs.push(f.length == 0 || isNaN(f) ? 0 : parseInt(f));
			}
			return inputs;
		} else { return;}
	}

	function parseURL(URL) {
		var urlParts = URL.split('?', 2);
		if (urlParts.length == 1) urlParts[1] = '';
		var parts = {path: urlParts[0], query: urlParts[1]};
		return parts;
	}

	function getQueryParameters(URL, param) {
		var urlParts = parseURL(URL).query.split('&');
		for (var i = 0; i < urlParts.length; i++) {
			var ki = urlParts[i].split('=');
			if (ki[0] == param) return decodeURIComponent(ki[1]);
		}
	}

	function addQueryParameter(URL, param, value) {
		var add_pair = param + '=' + encodeURIComponent(value);
		var added = false;
		var urlParts = parseURL(URL);
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

	function getmaxMX() {
		var xp = xpathResultEvaluate('//table[@class="f10"]/tbody/tr/td/b[1]');
		if (xp.snapshotLength == 0 || xp.snapshotItem(0).innerHTML.match(/\s*\d+\s*/) == null) return;
		var abs_max = parseInt(xp.snapshotItem(0).innerHTML);

		var m_fields = getXfields();
		if (m_fields == undefined || m_fields.length != 1) return;
		xp = xpathResultEvaluate('//td[@class="s7"]/div/span[@class="c f75"]');
		if (xp.snapshotLength != 1) return;
		var re_m = xp.snapshotItem(0).innerHTML.match(/\s*\(.+: \d+\)/);
		if (re_m == null) return;
		var total_available = parseInt(xp.snapshotItem(0).innerHTML.replace(/[^\d]/g, ''));

		var total_in_progress = 0;
		xp = xpathResultEvaluate('//table[@class="tbg"][2]/tbody/tr/td[2]');
		for (var i = 0; i < xp.snapshotLength; i++) {
			var n = xp.snapshotItem(i).innerHTML.replace(/[^\d]/g, '');
			if (n.length && !isNaN(n)) total_in_progress += parseInt(n);
		}
		return abs_max - total_available - total_in_progress;
	}

	function NPCUpdate() {
		var boolShowNPCAssistant = getGMcookie("npcassistant", false);
		if (boolShowNPCAssistant == 'false') boolShowNPCAssistant = '1';
		if (boolShowNPCAssistant != '1') return;
		if (NPCexcludedPage(urlNow)) return;
		if (location.href.indexOf('build') != -1) {
			var multipliers = null;
			var xpNeeded = xpathResultEvaluate('//table[@class="f10"]/tbody/tr[1]/td');
			if (xpNeeded.snapshotLength != 0) {
				NPCAssistant(1, xpNeeded, multipliers);
			}
			if (boolIsTroopsPage()) {multipliers = getXmX(getXfields());}
			xpNeeded = xpathResultEvaluate('//table[@class="tbg"]/tbody/tr/td/table[@class="f10"]/tbody/tr[2]/td');
			if (xpNeeded.snapshotLength != 0) {
				NPCAssistant(2, xpNeeded, multipliers);
			}
		}
	}

	//function for the NPC entries on pages where an NCP trade is possible
	function NPCAssistant(typeNPC, xpNeeded, multipliers) {
		//log(3, "NPCAssistant");
		var currentResUnitsTotal = 0;
		var productionPerHourTotal = 0;

		for (var i = 0; i < 4; i++) currentResUnitsTotal += parseInt(currentResUnits[i]);
		for (var i = 0; i < 4; i++) productionPerHourTotal += parseInt(productionPerHour[i]);
		var currentBuildingName = getCurrentLocation();

		var xFields = getXfields();

		// Needed resources
		var maxMX = getmaxMX();
		for (var i = 0; i < xpNeeded.snapshotLength; i++) {
			var td = xpNeeded.snapshotItem(i);
			var arrayRes = td.innerHTML.match(/\<img class="res"[^>]+\>\s*\d+/g);
			if (arrayRes == null || arrayRes.length < 4) continue;
			arrayRes = arrayRes.slice(0, 4);

			// Read needed resources and calculate total
			var neededResUnits = new Array();
			var neededResUnitsTotal = 0;
			for (var j = 0; j < 4; j++) {
				var re_m2 = arrayRes[j].match(/\d+$/);
				var n = parseInt(re_m2);
				neededResUnits.push(multipliers ? n * multipliers[i] : n);
				neededResUnitsTotal += n;
			}

			//var neededTotal = multipliers ? neededResUnitsTotal * multipliers[i] : neededResUnitsTotal;
			//change suggested by fr3nchlover.  Thank you !
			var neededTotal = multipliers && multipliers[i]!=0 ? neededResUnitsTotal * multipliers[i] : neededResUnitsTotal;
			
			// Get or create HTML container
			var container_id = 'npcXX_' + typeNPC + '_' + i;
			var container = undefined;
			while ((container = get(container_id)) == null) {
				td.innerHTML += '<br><div id="' + container_id + '" class="npc-general"> </div>';
			}
			// Show total & deficit/surplus
			var r = currentResUnitsTotal - neededTotal;
			var r_s = '(' + r + ')';
			if (r < 0) {
				r_s = '<span class="npc-red">(' + r + ')</span>';
			} else if (r > 0) {
				r_s = '<span class="npc-green">(+' + r + ')</span>';
			}
			container.innerHTML = '<b>' + T("TOTAL") + '</b>: ' + neededTotal + ' ' + r_s;

			// Show time estimate
			var dtNow = new Date();
			var dtEstimated = new Date();
			if (neededTotal > 0 && r < 0) {
				var secondsEstimated = Math.ceil(Math.abs(r) / (productionPerHourTotal / 3600));
				dtEstimated.setTime(dtNow.getTime() + (secondsEstimated * 1000));
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
					container.innerHTML += ' | ' + T('LISTO') + '<span class="npc-red">' + formatDtEstimated + '&nbsp;' + '</span>' + T('A_LAS') + '&nbsp;' + '<span class="npc-red">' + formatTimeEstimated + '</span>';
			}

			// Show time saved by NPC
			var time_saved = 0;

			if (neededTotal > 0) {
				for (var j = 0; j < 4; j++) {
					var productionPerMinuteTotal = parseInt(productionPerHour[j]) / 60;
					var minutesUntilNPCpossible = (dtEstimated.getTime() - dtNow.getTime()) / 1000 / 60;
					var resAtNPCtime = parseInt(currentResUnits[j]) + (minutesUntilNPCpossible * productionPerMinuteTotal);
					var deficitUntilNPCtime = neededResUnits[j] - resAtNPCtime;
					if (deficitUntilNPCtime <= 0) continue;
					if (productionPerMinuteTotal <= 0) {
						time_saved = null;
						break;
					}
					var diffCalculated = Math.ceil(deficitUntilNPCtime / productionPerMinuteTotal);
					if (diffCalculated > time_saved)
						time_saved = diffCalculated;
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
			if (multipliers) {
				var max = Math.floor(currentResUnitsTotal / neededResUnitsTotal);
				if (max > maxMX) max = maxMX;
				//var aLink = elem("A", max);
				container.innerHTML += ' | ' + T('MAX') + '. <a href="#" onclick="document.snd.' + xFields[i].name + '.value=' + max + '; return false;">' + max + '</a>';
			}

			// Show NPC link
			if (neededTotal > 0 && r >= 0 && (time_saved > 0 || time_saved == null)) {
				var urlNPCback = addQueryParameter(NPCURL, NPCResources, neededResUnits.join(','));
				urlNPCback = addQueryParameter(urlNPCback, NPCbacklinkName, currentBuildingName);
				container.innerHTML += '&nbsp;<a href="' + urlNPCback + '"> &raquo; NPC</a>';
			}
		}
	}

	
	function tableTotalVillageTroopsV3() {
		var villageID = getIdVillageV2();
		var htmlConsumption = '';
		var labelConsumption = '';
		//log(3, "entering tableTotalVillageTroopsV3");
		if (villageID != 0) {
			var vTroopTables = xpathResultEvaluate('//div[@id="lmid2"]/table/tbody/tr/td[1]/a[contains(@href, ' + villageID + ')]/../../../..|//div[@id="lmid2"]/p[@class="b f16"]');
			if (vTroopTables.snapshotLength > 0) {
				var tTable = vTroopTables.snapshotItem(0).cloneNode(true);
				tTable.rows[0].setAttribute("class", "cbgx");
				var tTableTroopIconRow = tTable.rows[1];
				var tTableTroopUnitsRow = tTable.rows[2];
				var tTableConsumptionRow = tTable.rows[3];
				var aConsumption = 0;
				for (var i = 1; i < vTroopTables.snapshotLength; i++) {
					var aTable = vTroopTables.snapshotItem(i);
					if (aTable.nodeName == "P") { break; }
					//fix provided by fr3nchlover (THANK YOU !)
					var allTroopCells = aTable.rows[2].cells;
					if (allTroopCells.length == 12) {
						var heroIconCell = aTable.rows[1].cells[11];
						tTableTroopIconRow.appendChild(heroIconCell.cloneNode(true)); //<= add a new cell to first line
						tTableTroopUnitsRow.appendChild(allTroopCells[11].cloneNode(true)); //<= add a new cell to second line
						tTableTroopUnitsRow.cells[11].innerHTML = ""; // clean new cell
						tTableConsumptionRow.cells[1].colSpan = 11; // add 1 to cols
						tTable.rows[0].cells[1].colSpan = 11; // add 1 to cols
                    }
					
					//add the troop units from the current table to the new created table
					for (var j = 1; j < allTroopCells.length; j++) {
						var iHTML = tTableTroopUnitsRow.cells[j].innerHTML;
						var intTroops = parseInt(allTroopCells[j].innerHTML);
						if ((iHTML == undefined) || (iHTML == "")) {
							tTableTroopUnitsRow.cells[j].innerHTML = intTroops;
						} else {
							tTableTroopUnitsRow.cells[j].innerHTML = parseInt(iHTML) + intTroops;
						}
					}
					var currentCropCell = aTable.rows[3].cells[1];
					if (currentCropCell.innerHTML.indexOf('4.gif') != -1) {
						labelConsumption = aTable.rows[3].cells[0].innerHTML;
					}
				}

				for (var j = 1; j < tTableTroopUnitsRow.cells.length; j++) {
					tTableTroopUnitsRow.cells[j].className = (tTableTroopUnitsRow.cells[j].innerHTML == "0") ? "c" : "";
				}

				tTable.rows[0].cells[1].innerHTML = '<b>' + T('TOTALTROOPS') + '</b>';

				for (var xi = 1; xi < tTable.rows[1].cells.length; xi++) {
					if (xi == 11) {
						//hero
						aConsumption += 6;
					} else {
						//other troops
						var troopImg = tTable.rows[1].cells[xi].innerHTML;
						var ti = troopImg.lastIndexOf("/");
						troopImg = troopImg.substring(ti + 1);
						ti = troopImg.indexOf(".");
						var troopType = troopImg.substring(0, ti);
						aConsumption += uc[parseInt(troopType)][9] * parseInt(tTable.rows[2].cells[xi].textContent);
					}
				}
				tTableConsumptionRow.cells[1].innerHTML = (aConsumption) + " <img src='" + image["img4"] + "'>";
				if (labelConsumption != "")	tTableConsumptionRow.cells[0].innerHTML = labelConsumption;
				var p = xpathResultEvaluate('//div[@id="lmid2"]/p[@class="txt_menue"]').snapshotItem(0);
				p.parentNode.insertBefore(tTable, p.nextSibling);

				newP = elem('P', '');
				newP.innerHTML += '<b>' + T('TOTALTROOPS') + '</b>';
				p.parentNode.insertBefore(newP, p.nextSibling);
			}
		}
    }
	
	function getDistance(x1, y1, x2, y2) {
		var dX = Math.min(Math.abs(x2 - x1),Math.abs(801 - Math.abs(x2 - x1)));
		var dY = Math.min(Math.abs(y2 - y1),Math.abs(801 - Math.abs(y2 - y1)));
		var dist = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
		return dist;
	}

	//------------------------------------------
	//Modified by Lux
	//------------------------------------------
	function showMsgPage(state) {
		scroll(0,0);
		var outerPane = get('OuterMsgPage');
		var innerPane = get('InnerMsgPage');
		var buttonPane = get('divCloseMsgPage');

		if (state) {
			diplayElements("none");
			outerPane.className = 'OuterMsgPageOn';
			innerPane.className = 'InnerMsgPageOn';
			buttonPane.className = 'divCloseMsgPageOn';

			var button = get('ButtonCloseMsgPage');
			//changed by ms99
			if (button) {
			//end changed by ms99
				button.addEventListener("click", function(){showMsgPage(false)}, true);
			}
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
		div.innerHTML = '<div align="right" id="OuterMsgPage" class="MsgPageOff"></div>'+
						'<div align="right" id="divCloseMsgPage" class="MsgPageOff"></div>'+
						'<div id="InnerMsgPage" class="MsgPageOff"></div>';
		document.body.insertBefore(div, document.body.firstChild);
	}

	function diplayElements(type) {
		var uTable = get('resumen');
		var mapTable = get('tabla_mapa');
		var trooptimetable = get('trooptimetable');
		if (uTable != null) {
			uTable.style.display = type;
		} else if (mapTable != null) {
			mapTable.style.display = type;
		} else if (trooptimetable != null) {
			trooptimetable.style.display = type;
		}
	}
	//------------------------------------------

	function vilCount() {
		var VHead = find("//div[@id='lright1']/a[contains(@href, 'dorf3.php')]", XPList);
		var VList = find("//div[@id='lright1']//a[contains(@href, '?newdid=')]", XPList);
		if (VList.snapshotLength != 0 || VHead.snapshotLength != 0) {
			VCount = VList.snapshotLength;
			VHead.snapshotItem(0).firstChild.innerHTML = T('ALDEAS') + " (" + VCount + "):&nbsp;&nbsp;";
			var aLink = elem("A", "<img src='" + image["reload"] + "' width=12 title='" + T('UPDATEPOP') + "' alt='" + T('UPDATEPOP') + "'>");
			aLink.href = jsVoid;
			aLink.addEventListener("click", updatePopulation, false);
			insertAfter(VHead.snapshotItem(0), aLink);
		}
		function updatePopulation() {
			var crtLocation = document.location.href;
			ajaxRequest('spieler.php', 'GET', null, function(AJAXrespX) {
				var aDoc = document.implementation.createDocument("", "", null);
				var aElem = document.createElement('DIV');
				aElem.innerHTML = AJAXrespX.responseText;
				aDoc.appendChild(aElem);
				var aTable = aDoc.evaluate("//div[@id='lmid2']//table[@class='tbg'][2]", aElem, null, XPFirst, null).singleNodeValue;
				if (aTable) {
					var vPop = 0;
					var totalPop = 0;
					var totalVil = aTable.rows.length - 2;
					for (i = 2; i < totalVil + 2; i++) {
						vPop = parseInt(aTable.rows[i].cells[1].innerHTML);
						totalPop += vPop;
						var xy = aTable.rows[i].cells[2].innerHTML.split("|");
						var vID = xy2id(xy[0].substr(1), xy[1]);
						setGMcookie(vID, vPop, false);
					}
					pauseScript(892);
					document.location.href = crtLocation;
				}
			});
			return;
		}
	}

	function getRace() {
		var aRace = getGMcookie('raceV2', false);
		var aRaceCrt = getGMcookie('raceCrtV2', false);
		if ((aRace == "false" || aRaceCrt == "false") && boolIsAvailableBarracks == true) {
			//race cookies are undefined
			//we now enter the barracks and try to get the race of the player
			var barracksLink = "build.php?gid=19";

			ajaxRequest(barracksLink, 'GET', null, function(AJAXrespX) {
				var aDoc = document.implementation.createDocument("", "", null);
				var aElem = document.createElement('DIV');
				aElem.innerHTML = AJAXrespX.responseText;
				aDoc.appendChild(aElem);
				var aValue = aDoc.evaluate("//img[@class='unit']", aElem, null, XPFirst, null).singleNodeValue;
				if (aValue) {
					//recognition of the race is done by the first image appearing in the table of troups that can be trained
					if (aValue.getAttribute('src').indexOf("21.gif") > -1) {
						aRace = "Gauls";
					} else if (aValue.getAttribute('src').indexOf("11.gif") > -1) {
						aRace = "Teutons";
					} else if (aValue.getAttribute('src').indexOf("1.gif") > -1) {
						aRace = "Romans";
					}
					//set the GM cookie for the race
					setGMcookie('raceV2', aRace, false);
				}
			});

			//now make the AJAX request to determine the correct name of the race from the '/spieler.php' page
			var profileLink = "/spieler.php";
			ajaxRequest(profileLink, 'GET', null, function(AJAXrespX) {
				var aDoc = document.implementation.createDocument("", "", null);
				var aElem = document.createElement('DIV');
				aElem.innerHTML = AJAXrespX.responseText;
				aDoc.appendChild(aElem);
				var aValue = aDoc.evaluate("//table[@class='tbg']/tbody/tr[5]/td[2]", aElem, null, XPFirst, null).singleNodeValue;
				if (aValue) {
					var aRaceCrt = aValue.textContent;
					//set the GM cookie for the real race
					setGMcookie('raceCrtV2', aRaceCrt, false);
				}
			});
			aRace = getGMcookie('raceV2', false);
		}

		crtUserRace = aRace;
		return aRace;
	}

	function allyCalculation() {
		
		if (location.href.indexOf("allianz.php?aid") != -1) {
			var allyTable = find("//div[@id='lmid2']//table[@class='tbg']", XPFirst);
			if (allyTable) {
				var iHTML = allyTable.rows[0].cells[0].innerHTML;
				var allyName = allyTable.rows[3].cells[1].innerHTML;
				allyTable.rows[0].cells[0].innerHTML = iHTML + " " + allyName + "<a href='" + location.href + "'>" + " " + "</a>";
			}
		}
	
		var a = find("//div[@id='lmid2']//table[@class='tbg']//td[@width='6%']", XPFirst);
		if (a) {
			var aTable = a.parentNode.parentNode;
			var totalPop = 0;
			var totalVil = 0;
			var totalBullets = [[0, ""], [0, ""], [0, ""], [0, ""], [0, ""]]; //blue, green, yellow, red, grey
			var boolMyAlly = true;
			for (var i = 1; i < aTable.rows.length; i++) {
				totalPop += parseInt(aTable.rows[i].cells[2].innerHTML);
				totalVil += parseInt(aTable.rows[i].cells[3].innerHTML);
				if (boolMyAlly) {
					if (aTable.rows[i].cells[4]) {
						var imgBullet = aTable.rows[i].cells[4].firstChild;
						for (var j = 0; j < 5; j++) {
							if (imgBullet.src.indexOf("b" + (j + 1) + ".gif") != -1) {
								totalBullets[j][0] += 1;
								totalBullets[j][1] = imgBullet.title;
							}
						}
					} else {
						boolMyAlly = false;
					}
				}
			}
			var popPerPlayer = Math.round(totalPop/(aTable.rows.length - 1));
			var boolIsMyAlly = aTable.rows[1].cells.length == 5;

			var rowTotal = newRow("", [["class", "rbg"]]);
			aTable.appendChild(rowTotal);
			var aCell = newCell("<b>" + T('TOTAL') + "</b>", [["colspan", "2"], ["align", "center"]]);
			rowTotal.appendChild(aCell);
			var bCell = newCell("<b>" + totalPop + "</b>", [["align", "center"]]);
			rowTotal.appendChild(bCell);
			var cCell = newCell("<b>" + totalVil + "</b>", [["align", "center"]]);
			rowTotal.appendChild(cCell);
			if (boolIsMyAlly) {
				var x1Cell = elem("TD","");
				rowTotal.appendChild(x1Cell);
			}

			//average population per member of aliance
			var rowAverage = newRow("", [["class", "rbg"]]);
			aTable.appendChild(rowAverage);
			var dCell = newCell("<b>" + T('AVPOPPERPLAYER') + "</b>", [["colspan", "2"], ["align", "center"]]);
			rowAverage.appendChild(dCell);
			var eCell = newCell("<b>" + popPerPlayer + "</b>", [["colspan", "2"], ["align", "center"]]);
			rowAverage.appendChild(eCell);
			if (boolIsMyAlly) {
				var x2Cell = elem("TD","");
				rowAverage.appendChild(x2Cell);
			}

			//average population per village
			var rowAverage = newRow("", [["class", "rbg"]]);
			aTable.appendChild(rowAverage);
			var dCell = newCell("<b>" + T('AVPOPPERVIL') + "</b>", [["colspan", "2"], ["align", "center"]]);
			rowAverage.appendChild(dCell);
			var eCell = newCell("<b>" + Math.round(totalPop/totalVil) + "</b>", [["colspan", "2"], ["align", "center"]]);
			rowAverage.appendChild(eCell);
			if (boolIsMyAlly) {
				var x3Cell = elem("TD","");
				rowAverage.appendChild(x3Cell);
			}
			
			//number of bullets by type
			if (boolMyAlly) {
				var rowBullets = elem("TR", "");
				var cellBullets = newCell("", [['colspan', '5'], ['align', docDirection]]);
				var cBiHTML = "";
				var addSpacer = " | ";
				for (var j = 0; j < 5; j++) {
					if (totalBullets[j][0] > 0) {
						cBiHTML += "<img src='" + img("a/" + "b" + (j+1) + ".gif") + "' title='" + totalBullets[j][1] + "'> = &nbsp;" + totalBullets[j][0] + addSpacer + " ";
					}
				}
				cellBullets.innerHTML = cBiHTML.substring(0, cBiHTML.length - 3);
				rowBullets.appendChild(cellBullets);
				aTable.appendChild(rowBullets);
			}
		}
	}

	//function to determine if the current active village is the capital (needed for precompute1 to show/hide the resource upgrade table for resource fields >= 10)
	function isThisTheCapital() {
		var capitalCoordsString = getGMcookie("capitalxy", false);
		if (capitalCoordsString != "false") {
			capitalCoords = capitalCoordsString.split("|");
			var x = parseInt(capitalCoords[0].substr(1));
			var y = parseInt(capitalCoords[1]);
			var capitalID = xy2id(x, y);
			if (villageID == undefined || villageID == null || villageID == "") {
				villageID = getIdVillageV2();
			}
			if (parseInt(capitalID) == parseInt(villageID)) {
				return true;
			} else {
				return false;
			}
		} else {
			return true;
		}
	}

	function getTroopTrainingArray(trainingTable) {
		var intAdd = 1;
		var troopTraining = [[0,''],[0,''],[0,''],[0,''],[0,''],[0,''],[0,''],[0,''],[0,''],[0,''], [1,'']];
		crtUserRace = getRace();
		if (crtUserRace != "" && crtUserRace != "false") {
			if (crtUserRace == "Teutons") {
				intAdd = 11;
			} else if (crtUserRace == "Gauls") {
				intAdd = 21;
			}
		}
		for (var i = 1; i < trainingTable.rows.length - 1; i++) {
			var aImg = trainingTable.rows[i].cells[0].firstChild.src;
			if (aImg) {
				var xi = aImg.lastIndexOf("/");
				var xj = aImg.lastIndexOf(".");
				var iTroopType = aImg.substring(xi + 1, xj);
				var troopsTrained = parseInt(trainingTable.rows[i].cells[1].textContent);
				troopTraining[iTroopType - intAdd][0] += troopsTrained;
				troopTraining[iTroopType - intAdd][1] = trainingTable.rows[i].cells[2].textContent;
			}
		}
		troopTraining[troopTraining.length - 1][0] = intAdd;
		return troopTraining;
	}

	function isThisTroopTrainingBuilding() {
		var cValue = find("//input[@name='z']", XPFirst);
		if (cValue) {
			var aValue = find("//img[@class='unit']", XPFirst);
			if (aValue) {
				//this is a barracks/stable/big barracks/big stable/workshop
				var aCell = find("//div[@id='lmid2']//table[@class='tbg']//td[@width='5%']", XPFirst);
				if (aCell) {
					//there are troops being trained
					var trainingTable = aCell.parentNode.parentNode.parentNode;
					if (trainingTable) {
						var troopTraining = getTroopTrainingArray(trainingTable);
						var intAdd = troopTraining[troopTraining.length - 1][0];
						var aRow = newRow("", [["class", "cbg1"]]);
						var aCell = newCell(T('TOTALTROOPSTRAINING'), [["colspan", "5"]]);
						aRow.appendChild(aCell);
						trainingTable.appendChild(aRow);
						for (var i = 0; i < troopTraining.length - 1; i++) {
							if (troopTraining[i][0] > 0) {
								var bRow = elem("TR", "");
								var b1Cell = newCell("<img src=" + img('u/' + (i + intAdd)) + '.gif' + ">");
								bRow.appendChild(b1Cell);
								var b3Cell = newCell(troopTraining[i][1], [["colspan", "2"]]);
								bRow.appendChild(b3Cell);
								var b2Cell = newCell(troopTraining[i][0], [["colspan", "2"]]);
								bRow.appendChild(b2Cell);
								trainingTable.appendChild(bRow);
							}
						}
					}
				}
				//add cells/row to the original table
				var origTable = find("//div[@id='lmid2']//table[@class='tbg' and @cellspacing='1']", XPFirst);
				if (origTable) {
					origTable.setAttribute("id", "trainingTable");
					var hCell = newCell("<img src='" + image["clock"] + "'>" + "&" + "<img src='" + image["img5"] + "'>", [['class', 'cbg1']]);
					origTable.rows[0].appendChild(hCell);
					for (xi = 1; xi < origTable.rows.length; xi++) {
						//color:blue;
						var aCell = newCell("", [['style', 'font-size:8pt;']]);
						origTable.rows[xi].appendChild(aCell);
					}
				}
				//get all the input cells
				var bInputList = find("//div[@id='lmid2']//table[@class='tbg']//input[@type='Text']", XPList);
				if (bInputList == undefined || bInputList == null || (bInputList && bInputList.snapshotLength == 0)) {
					bInputList = find("//div[@id='lmid2']//table[@class='tbg']//input[@type='text']", XPList);
				}
				if (bInputList) {
					//log(3," bInputList.snapshotLength = " + bInputList.snapshotLength);
					var tIndex = [0, ''];
					//trooInfo = array => troopIndex, time to build 1 troop of this type
					var troopInfo = [[0, 0], [0, 0], [0, 0], [0, 0]];
					for (var xi = 0; xi < bInputList.snapshotLength; xi++) {
						var bInput = bInputList.snapshotItem(xi);
						bInput.setAttribute("id", 'inputTroopNo_' + xi);
						//get the time for training this troop type
						var bRow = bInput.parentNode.parentNode;
						var bCell = bRow.cells[0].childNodes[1].rows[1].cells[0];
						var aTimeElem = bCell.innerHTML.split("|")[5];
						var aTime = aTimeElem.substring(aTimeElem.lastIndexOf(">") + 2);
						bCell.setAttribute("style", 'font-size:8pt;');
						var aTimeSeconds = ComputeSeconds(aTime);
						var cCell = bRow.cells[3];
						var tCell = bRow.cells[0].childNodes[1].rows[0].cells[0];
						if (tCell) {
							var tImg = tCell.firstChild;
							tIndex = getTroopIndexTitleFromImage(tImg);
							troopInfo[xi][0] = tIndex[0];
						}
						troopInfo[xi][1] = aTimeSeconds;
					}
					for (var xi = 0; xi < bInputList.snapshotLength; xi++) {
						var bInput = bInputList.snapshotItem(xi);
						var bRow = bInput.parentNode.parentNode;
						var cCell = bRow.cells[3];
						bInput.addEventListener("keyup", computeTimeTrainTroops(xi, troopInfo, cCell), false);
						//bInput.addEventListener("change", computeTimeTrainTroops(xi, troopInfo, cCell), false);
						//get the number link
						var aNrLink = bRow.cells[2].childNodes[0].firstChild;
						aNrLink.addEventListener("click", computeTimeTrainTroops(xi, troopInfo, cCell), false);
					}
					//log(3, "troopInfo = " + troopInfo);
				}
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
		
		function computeTimeTrainTroops(xi, troopInfo, nodeToAppendTo) {
			return function() {
				var trNoInput = get("inputTroopNo_" + xi);
				var totalTimeCell = get("timeToTrainTroops_" + xi);
				var totalCropCell = get("ccTrainedTroops_" + xi);
				var boolAddDiv = false;
				if (trNoInput) {
					var intNo = trNoInput.value;
					if (intNo == '') {
						intNo = 0
					} else {
						intNo = parseInt(intNo);
					}
					if (isNaN(intNo)) intNo = 0;
					if (!isNaN(intNo)) {
						var totalSeconds = parseInt(intNo) * troopInfo[xi][1];
						var totalConsumption = 0;
						if (troopInfo[xi][0] > 0) {
							totalConsumption = parseInt(intNo) * uc[troopInfo[xi][0]][9];
						}
						var timeTotal = formatTime(totalSeconds);
						var aDiv = elem("DIV", "");
						var aTable = newTable();
						//var iHTML1 = "<img src='" + image["clock"] + "'><br>" + timeTotal + " h";
						var iHTML1 = '';
						var iHTML2 = '';
						if (totalSeconds > 0) {
							iHTML1 = timeTotal + " h";
						}
						if (totalConsumption > 0) {
							var iHTML2 = "<img src='" + image["img5"] + "'> " + totalConsumption;
						}
						if (!totalTimeCell) {
							var aRow = elem("TR", "");
							// border-bottom:1px grey solid; color:blue;
							var aCell = newCell(iHTML1, [['style', 'font-size:8pt;'], ['id', 'timeToTrainTroops_' + xi]]);
							aRow.appendChild(aCell);
							aTable.appendChild(aRow);
							boolAddDiv = true;
						} else {
							totalTimeCell.innerHTML = iHTML1;
						}
						if (!totalCropCell) {
							var bRow = elem("TR", "");
							var bCell = newCell(iHTML2, [['style', 'font-size:8pt;'], ['id', 'ccTrainedTroops_' + xi]]);
							bRow.appendChild(bCell)
							aTable.appendChild(bRow);
							boolAddDiv = true;
						} else {
							totalCropCell.innerHTML = iHTML2;
						}
						if (boolAddDiv == true) {
							aDiv.appendChild(aTable);
							nodeToAppendTo.appendChild(aDiv);
						}
						
						//add the 2 bottom rows to the existing table
						var origTable = get("trainingTable");
						if (origTable) {
							if (!get("trbCell_0")) {
								var sRow = newRow("", [['class', 'cbg1']]);
								var aFsize = 10;
								var sCell = newCell(T('RESUMEN'), [['colspan', origTable.rows[0].cells.length]]);
								sRow.appendChild(sCell);
								origTable.appendChild(sRow);
								var bottomRow = elem("TR", "");
								var aColor = 'black';
								for (i = 0; i < origTable.rows[0].cells.length; i++) {
									//if (i == origTable.rows[0].cells.length - 1) {
										//aColor = 'blue';
									//}
									if (i == origTable.rows[0].cells.length - 1) aFsize = 8;
									var bCell = newCell("", [['style', 'font-size:' + aFsize + 'pt; color:' + aColor + ';'], ['id', 'trbCell_' + i]]);
									bottomRow.appendChild(bCell);
								}
								origTable.appendChild(bottomRow);
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
										if (intNo == '') {
											intNo = 0
										} else {
											intNo = parseInt(intNo);
										}
										if (isNaN(intNo)) intNo = 0;
										if (i > 0) iHTML0 += " | ";
										iHTML0 += "<img src='" + img("u/" + troopInfo[i][0] + ".gif") + "'> " + intNo;
										intTotal += intNo;
										intTTotal += intNo * troopInfo[i][1];
										intCTotal += intNo * uc[troopInfo[i][0]][9];
									}
								}
								btCell0.innerHTML = iHTML0;
								if (intTotal > 0) {
									btCell1.innerHTML = intTotal;
								} else {
									btCell1.innerHTML = '';
								}
								if (intTTotal > 0) {
									btCell3.innerHTML = formatTime(intTTotal) + " h <br>" + "<img src='" + image["img5"] + "'> " + intCTotal;
								} else {
									btCell3.innerHTML = '';
								}
							}
						}
						
					} else {
						if (totalTimeCell) {
							totalTimeCell.innerHTML = "";
						}
						if (totalCropCell) {
							totalCropCell.innerHTML = "";
						}
					}
				}
			}
		}
	}

	function processCoordsInMessage(iHTML) {
		var arrAction = getRallyPointDefaultActionArray();
		var arrCoords = iHTML.match(/\((-?\d+)\s*[\|\,\s\/]\s*(-?\d+)\)/g);
		if (arrCoords) {
			for (var j = 0; j < arrCoords.length; j++) {
				var xyCoord = arrCoords[j].replace(" ", "").replace(",", "|").replace(";", "|").replace("/", "|").replace("\\", "|");
				if (xyCoord.indexOf("(") == 0 && xyCoord.indexOf(")") != -1  && xyCoord.indexOf("|") != -1) {
					xyCoord = xyCoord.replace("(", "").replace(")", "");
					var xyCoord = xyCoord.split("|");
					var xCoord = parseInt(xyCoord[0]);
					var yCoord = parseInt(xyCoord[1]);
					var idVillage = xy2id(xCoord, yCoord);
					var villageLink = "<a href='karte.php?z=" + idVillage + "'>" + "( " + xCoord + "|" + yCoord + " )" + "</a>" +
					"&nbsp;<a href='a2b.php?z=" + idVillage + "'><img border='0' height='12' src='" + image[arrAction[0]] + "' title='" + arrAction[1] + "' alt='" + arrAction[1] + "'/></a>" +
					"&nbsp;<a href='build.php?z=" + idVillage + "&gid=17'><img border='0' height='12' src='" + image["img4"] + "' title='" + T('ENVIAR') + "' alt='" + T('ENVIAR') + "'/></a>";
					iHTML = iHTML.replace(arrCoords[j], villageLink);
				}
			}
		}
		return iHTML;
	}
	
	function convertCoordsInMessagesToLinks() {
		var arrayCells;
		arrayCells = find("//td[@background]", XPList);
		for (var i = 0; i < arrayCells.snapshotLength; i++) {
			var aCell = arrayCells.snapshotItem(i);
			var iHTML = aCell.innerHTML;
			aCell.innerHTML = processCoordsInMessage(iHTML);
		}
	}

	function addPopulationStatistics() {
		var userTable = find("//div[@id='lmid2']//table[@class='tbg']", XPFirst);
		if (userTable) {
			var iHTML = userTable.rows[0].cells[0].innerHTML;
			userTable.rows[0].cells[0].innerHTML = iHTML + " " + "<a href='" + location.href + "'>" + " " + "</a>";
		}
		var aTable = find("//div[@id='lmid2']//table[@class='tbg'][2]", XPFirst);
		if (aTable) {
			var vPop = 0;
			var totalPop = 0;
			var totalVil = aTable.rows.length - 2;
			for (i = 2; i < totalVil + 2; i++) {
				vPop = parseInt(aTable.rows[i].cells[1].innerHTML);
				totalPop += vPop;
				var xy = aTable.rows[i].cells[2].innerHTML.split("|");
				var vID = xy2id(xy[0].substr(1), xy[1]);
				if (location.href.indexOf("spieler.php?uid=" + crtUserID) != -1) {
					setGMcookie(vID, vPop, false);
				}
			}
			//total row (population, villages)
			var rowTotal = newRow("", [["class", "rbg"]]);
			aTable.appendChild(rowTotal);
			var aCell = newCell("<b>" + T('TOTAL') + "</b>", [["colspan", "1"], ["align", "center"]]);
			rowTotal.appendChild(aCell);
			var bCell = newCell("<b>" + totalPop + "</b>", [["align", "center"]]);
			rowTotal.appendChild(bCell);
			cCell = elem("TD", "");
			rowTotal.appendChild(cCell);

			//average population per village
			var rowAverage = newRow("", [["class", "rbg"]]);
			aTable.appendChild(rowAverage);
			var dCell = newCell("<b>" + T('AVPOPPERVIL') + "</b>", [['colspan', '1'], ['align', 'center']]);
			rowAverage.appendChild(dCell);
			var eCell = newCell("<b>" + Math.round(totalPop/totalVil) + "</b>", [["align", "center"]]);
			rowAverage.appendChild(eCell);
			var fCell = elem("TD", "");
			rowAverage.appendChild(fCell);
			//move the "(capital)" string to the same line as the name of the capital
			var aSpan = find("//div[@id='lmid2']//table[@class='tbg']//td[@class='s7']//span[@class='c']", XPFirst);
			if (aSpan) {
				aSpan.style.cssFloat = '';
				aSpan.style.display = '';
				//save capital name and capital coordinates as GM "cookies"
				if (location.href.indexOf("spieler.php?uid=" + crtUserID) != -1) {
					var cellCapital = aSpan.parentNode;
					var capitalCell = cellCapital.getElementsByTagName("A")[0];
					var capitalName = cellCapital.firstChild.firstChild.nodeValue;
					var capitalRow = cellCapital.parentNode;
					var capitalCoords = capitalRow.cells[2].textContent;
					setGMcookie("capital", capitalName, false);
					setGMcookie("capitalxy", capitalCoords, false);
				}
			}
		}
	}
	
	function newTable(cAttribute) {
		var aTable = document.createElement("TABLE");
		if (cAttribute != undefined) {
			for (var xi = 0; xi < cAttribute.length; xi++) {
				aTable.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
			}
		}
		return aTable;
	}
	
	function newRow(iHTML, cAttribute) {
		var aRow = elem("TR", iHTML);
		if (cAttribute != undefined) {
			for (var xi = 0; xi < cAttribute.length; xi++) {
				aRow.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
				if (cAttribute[xi][0].toUpperCase() == 'TITLE') {
					aRow.setAttribute('alt', cAttribute[xi][1]);
				}
			}
		}
		return aRow;
	}
	
	function newCell(iHTML, cAttribute) {
		var aCell = elem("TD", iHTML);
		if (cAttribute != undefined) {
			for (var xi = 0; xi < cAttribute.length; xi++) {
				aCell.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
				if (cAttribute[xi][0].toUpperCase() == 'TITLE') {
					aCell.setAttribute('alt', cAttribute[xi][1]);
				}
			}
		}
		return aCell;
	}
	
	function newImage(cAttribute) {
		var aImg = document.createElement("IMG");
		if (cAttribute != undefined) {
			for (var xi = 0; xi < cAttribute.length; xi++) {
				aImg.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
				if (cAttribute[xi][0].toUpperCase() == 'TITLE') {
					aImg.setAttribute('alt', cAttribute[xi][1]);
				}
			}
		}
		return aImg;
	}
	
	function newLink(iHTML,  cAttribute) {
		var aLink = document.createElement("A");
		aLink.innerHTML = iHTML;
		if (cAttribute != undefined) {
			for (var xi = 0; xi < cAttribute.length; xi++) {
				aLink.setAttribute(cAttribute[xi][0], cAttribute[xi][1]);
				if (cAttribute[xi][0].toUpperCase() == 'TITLE') {
					aLink.setAttribute('alt', cAttribute[xi][1]);
				}
			}
		}
		return aLink;
	}
	
	//flat function redesigned by rtellezi.  Thank you !
	function showTroopInfoTooltip(ucIndex, troopName) {
        return function() {
            var tooltip = get('tb_tooltip');
			var xAlign = invDocDirection;
			var imgSpeed = "speed" + docDirection.substring(0,1);
			
            var aTable = newTable([['cellpadding','2'], ['cellspacing','0']]);
           
            if (troopName != "") {
                //name of the troop row
                var aRow1 = elem("TR", "");
				var aCell1 = newCell(troopName, [['style', 'font-size:8pt; font-weight:bold;'], ['colspan', '6'], ['align', 'center']]);
                aRow1.appendChild(aCell1);
                aTable.appendChild(aRow1);
            }
           
            var aRow2 = elem("TR", "");           

            //attack power row
			var aCell2 = newCell("<img src='" + image["att_all"] + "'>", [['style', 'border-bottom:1px grey solid;']]);
			var aCell3 = newCell(uc[ucIndex][5], [['style', 'font-size:8pt; border-' + xAlign + ':1px grey solid; border-bottom:1px grey solid;'], ['align', xAlign]]);
            aRow2.appendChild(aCell2);
            aRow2.appendChild(aCell3);
                       
            //def power infantry row			
			var aCell4 = newCell("<img src='" + image["def_i"] + "'>", [['style', 'border-bottom:1px grey solid;']]);
			var aCell5 = newCell(uc[ucIndex][6], [['style', 'font-size:8pt; border-' + xAlign + ':1px grey solid; border-bottom:1px grey solid;'], ['align', xAlign]]);
            aRow2.appendChild(aCell4);
            aRow2.appendChild(aCell5);

            //def power cavalry row
			var aCell6 = newCell("<img src='" + image["def_c"] + "'>", [['style', 'border-bottom:1px grey solid;']]);
			var aCell7 = newCell(uc[ucIndex][7], [['style', 'font-size:8pt; border-bottom:1px grey solid;'], ['align', xAlign]]);
            aRow2.appendChild(aCell6);
            aRow2.appendChild(aCell7);
            aTable.appendChild(aRow2);
           
            var aRow3 = elem("TR", "");

            //speed only for troops as animals do not move
			var aCell8 = newCell("<img src='" + image[imgSpeed] + "'>", [['style', 'font-size:8pt']]);
			var tSpeed = "-";
			if (ucIndex < 31) {
				tSpeed = uc[ucIndex][8];
                if (location.href.indexOf('speed') != -1) {
					tSpeed = tSpeed * 2;
                }
			}
			var aCell9 = newCell(tSpeed, [['style', 'font-size:8pt; border-' + xAlign + ':1px grey solid;'], ['align', xAlign]]);
			aRow3.appendChild(aCell8);
            aRow3.appendChild(aCell9);
           
            //can carry
			var aCell10 = newCell("<img src='" + image["capacity"] + "'>", [['style', 'font-size:8pt']]);
			var aCell11 = newCell(uc[ucIndex][4], [['style', 'font-size:8pt; border-' + xAlign + ':1px grey solid;'], ['align', xAlign]]);
            aRow3.appendChild(aCell10);
            aRow3.appendChild(aCell11);
           
            //crop consumption
			var aCell12 = newCell("<img src='" + image["img5"] + "'>", [['style', 'font-size:8pt']]);
			var aCell13 = newCell(uc[ucIndex][9], [['style', 'font-size:8pt'], ['align', xAlign]]);
            aRow3.appendChild(aCell12);
            aRow3.appendChild(aCell13);
            aTable.appendChild(aRow3);

            tooltip.innerHTML = "";
            tooltip.appendChild(aTable);
            tooltip.style.display = 'block';
        }
    }

	function getTroopIndexTitleFromImage(tImg) {
		var tInfo = [0, ""];
		if (tImg.src.match(/img\/un\/u\/(\d+)\.gif/)) {
			tInfo[0] = RegExp.$1;
			tInfo[1] = tImg.title;
		}
		return tInfo;
	}
	
	function showTroopInfo() {
		if (!get('tb_tooltip')) {
			createTooltip();
		}
		var images = document.images;
		for (var i = 0; i < images.length; i++) {
			var tInfo = getTroopIndexTitleFromImage(images[i]);
			if (tInfo[0] != 0) {
				var troopImg = images[i];
				if (tInfo != 0 && tInfo[1] == '') {
					//for the dorf1.php page where there is no title attribute to the image
					var xRow = troopImg.parentNode;
					if (xRow) {
						if (xRow.getAttribute("href")) {
							xRow = xRow.parentNode;
							if (xRow) {
								xRow = xRow.parentNode;
							}
						} else {
							xRow = xRow.parentNode;
						}
						if (xRow) {
							try {
								var troopNameCell = xRow.cells[2];
								if (troopNameCell) {
									tInfo[1] = troopNameCell.textContent;
								}
							} catch(e) {
							}
						}
					}
				}
				troopImg.removeAttribute('title');
				troopImg.addEventListener("mouseover", showTroopInfoTooltip(tInfo[0], tInfo[1]), 0);
				troopImg.addEventListener("mouseout", function() {get("tb_tooltip").style.display = 'none';}, 0);
			}
		}
	}
	
	function addSelectAllCheckbox(intRows, mrTable) {
		//check for the "s10" element to avoid double checkbox from other scripts
		var sACheckbox = get("s10");
		if (!sACheckbox) {
			//there's no selectAll checkbox available so we're going to create it
			var sAcell = mrTable.rows[intRows - 1].cells[0];
			var sAcolspan = sAcell.getAttribute("colspan");
			if (sAcolspan) {
				if (sAcolspan == "2") {
					sAcell.setAttribute('colspan', '1');
					sAcell.removeAttribute('class');
					var bCell = newCell(sAcell.innerHTML, [['align', docDirection]]);
					insertAfter(sAcell, bCell);
				}
			}
			sAcell.innerHTML = '<td align="center"><input id="s10" name="s10" onclick="Allmsg(this.form);" align="bottom" type="checkbox"></td>';
			//now append the archive button if necessary
			if (!plus) {
				var buttonRow = mrTable.rows[intRows - 1].cells[1];
				if (buttonRow) {
					var bRiHTML = buttonRow.innerHTML;
					//log(3, "bRiHTML = " + bRiHTML);
					if (bRiHTML.toUpperCase().indexOf("ARCHIVE") == -1) {
						buttonRow.innerHTML += '<input class="std" type="submit" name="archive" value="' + T('ARCHIVE') + '"/></input>';
					}
				}
			}
		}
	}
	
	function createDelRepTable(aLinks) {
		var delTable = newTable([['id', 'del_table'], ['width', '100%'], ['align', 'center'], ['cellspacing', '0'], ['cellpadding', '3'], ['border', '1px'], ['rules', 'all']]);
		delTable.setAttribute('style', 'border:1px solid #C2C2C2');
		var intMax = aLinks.length;
		if (intMax > 5) intMax = 5;
		var tRow = newRow("", [['class', 'rbg'], ['align', 'center']]);
		var tCell = newCell(T('ELIMINAR'), [['colspan', intMax]]);
		tRow.appendChild(tCell);
		var bRow = newRow("", [['align', 'center'], ['bgColor', '#EBEBEB']]);
		//bRow.bgColor = '#EBEBEB';
		var cRow = elem("TR", "");
		cRow.align = 'center';
		var crtLink = document.location.href;
		for (var i = 0; i < intMax; i++) {
			var bTitle = aLinks[i].firstChild.nodeValue;
			var bCell = newCell(bTitle, [['style', 'border-top:1px solid #C2C2C2']]);
			bRow.appendChild(bCell);
			cTitle = T('MTCLEARALL') + " (" + bTitle  + ")";
			var cLink = elem("A", "<img src='" + image["delButton"] + "' title='" + bTitle + "' alt='" + bTitle + "'>");
			cLink.href = jsVoid;
			cLink.addEventListener('click', delete10Reports(i, aLinks), false);
			var cCell = newCell("", [['style', 'border-top:1px solid #C2C2C2']]);
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
			//if (confirm(T('ELIMINAR') + ". " + T('AREYOUSURE'))) {
				//log(3, aLinks);
				var aLink = aLinks[xi].href;
				//log(3, "xi = " + xi + "aLink = " + aLink);
				var crtLink = document.location.href;
				setGMcookie("reportsPageToDelete", aLink, false);
				setGMcookie("reportsPageToReturnTo", crtLink, false);
				document.location.href = aLink;
			//}
		}
	}
	
	function MessageOptions(){
		if (location.href.indexOf("nachrichten.php") != -1) {
			var genLink = "nachrichten.php?s=";
			var archLink = ' | <a href="nachrichten.php?t=3">' + T('ARCHIVE') + '</a>';
		
			//code provided by rtellezi for enabling sending message by pressing the CTRL+ENTER keys.  Thank you !
			//modified by ms99 to apply only to the "igm" textarea
			if (document.evaluate) {
				var allInps = find("//textarea[@id='igm']", XPList);
		        for (var i = 0; i < allInps.snapshotLength; i++) {
		            var t = allInps.snapshotItem(i);
		            t.addEventListener("keydown", sendMessage, 0);
		        }
			}
		} else if (location.href.indexOf("berichte.php") != -1) {
			var genLink = "berichte.php?s=";
			var archLink = ' | <a href="berichte.php?t=5">' + T('ARCHIVE') + '</a>';
		}
		
		var topMenu = find("//p[@class='txt_menue']", XPFirst);
		
		//add the Archive option to the menu if PLUS not available and if the Archive link is not already present (added by other scripts)
		if (!plus) {
			if (topMenu) {
				var tMiHTML = topMenu.innerHTML.split("|");
				var boolAddArchiveLink = false;
				if (genLink.indexOf("nachrichten.php") != -1) {
					if (tMiHTML.length < 4) boolAddArchiveLink = true;
				} else if (genLink.indexOf("berichte.php") != -1) {
					if (tMiHTML.length < 6) boolAddArchiveLink = true;
				}
				if (boolAddArchiveLink == true) {
					topMenu.innerHTML += archLink
				}
			}
		}

		//add the delete icons in a separate row below the menubar if on 'berichte.php' page
		if (location.href.indexOf("berichte.php") != -1 && topMenu) {
			var newMenu = newTable([["id", "rep_table"]]);
			var listTopMenuLinks = find("//p[@class='txt_menue']//a", XPList);
			var aLinks = new Array;
			//log(3, "listTopMenuLinks.snapshotLength = " + listTopMenuLinks.snapshotLength);
			var aRow = elem("TR", "");
			var aCell = newCell("", [['style', 'font-size:2pt;'], ["colspan", listTopMenuLinks.snapshotLength]]);
			aRow.appendChild(aCell);
			newMenu.appendChild(aRow);
			var aRow = newRow("", [["style", "white-space: nowrap;"]]);
			var aSeparator = " | ";
			for (var i = 0; i < listTopMenuLinks.snapshotLength; i++) {
				var aLink = listTopMenuLinks.snapshotItem(i);
				aLinks[i] = aLink;
				var aCell = elem("TD", "");
				aCell.appendChild(aLink);
				if (i == listTopMenuLinks.snapshotLength - 1) {
					aSeparator = "";
				}
				aCell.innerHTML = aCell.innerHTML + aSeparator;
				aRow.appendChild(aCell);
			}
			newMenu.appendChild(aRow);
			var boolShowRepDelTable = getGMcookie("showrepdeltable", false);
			if (boolShowRepDelTable != "0") {
				var delTable = createDelRepTable(aLinks);
				var lastDiv = find("//div[@id='lmid2']", XPFirst);
				if (lastDiv) {
					var newPar = elem("P", "");
					insertAfter(lastDiv.lastChild, newPar);
					newPar.appendChild(delTable);
				}
			}
			insertAfter(topMenu.parentNode.firstChild, newMenu);
			removeElement(topMenu);
		}
		
		if (location.href.indexOf("?newdid=") != -1 && location.href.indexOf("&id=") != -1) return;
		
		//general variables needed for this function
		var mrTable = find("//table[@class='tbg']", XPFirst);
		var intRows = mrTable.rows.length;
		
		addSelectAllCheckbox(intRows, mrTable);
		
		isThisReportsToDeletePage();
		
		//get the number of pages to preload from server
		var mesreppreloads = getGMcookie("mesreppreload", false);
		if (mesreppreloads == "false") {
			mesreppreload = 0;
			setGMcookie("mesreppreload", 0, false);
		} else {
			mesreppreload = parseInt(mesreppreloads) + 1;
			if (mesreppreload > 5) {
				mesreppreload = 4;
				setGMcookie("mesreppreload", 4, false);
			}
		}

		var pageNo1 = location.href.indexOf("?s=");
		if (pageNo1 != -1) {
			var pageNoS1 = location.href.substring(pageNo1 + 3);
			var crtPage = Math.round(parseInt(pageNoS1) / 10);
		} else {
			var crtPage = 0;
		}

		if (mesreppreload > 1) {
			for (var i = 1; i < mesreppreload; i++) {
				setTimeout(createMrPreloadFunc(i + crtPage), getRandomTimeRange(i * 498));
			}
			var X2 = (mesreppreload + crtPage) * 10;
			var X1 = (crtPage - mesreppreload) * 10;
			
			var intPgType = location.href.indexOf("t=");
			if (intPgType != -1) {
				var addLink = "&" + location.href.substr(intPgType,3);
			} else {
				var addLink = "";
			}
			
			var backLink = genLink + X1 + addLink;
			var forwardLink = genLink + X2 + addLink;
			
			var tdbfLinks = mrTable.rows[mrTable.rows.length - 1].cells[2];
			if (tdbfLinks) {
				if (X1 < 0) {
					var aSpan = elem("SPAN", "«");
					aSpan.setAttribute("style", "font-weight:bold;");
					aSpan.setAttribute("class", "c");
				} else {
					var aSpan = elem("A", "« ");
					aSpan.setAttribute("style", "font-weight:bold;");
					aSpan.href = backLink;
				}
				var fwLink = elem("A", "»&nbsp;");
				fwLink.setAttribute("style", "font-weight:bold;");
				fwLink.href = forwardLink;
				tdbfLinks.innerHTML = "";
				tdbfLinks.appendChild(aSpan);
				tdbfLinks.appendChild(fwLink);
			}
		}
		
		//code provided by rtellezi for sending message by pressing CTRL+ENTER (Thank you !)
		//modified by ms99 to work only on the form  action='nachrichten.php' and form name='msg'
		function sendMessage(event) {
			if (event.keyCode == 13 && event.ctrlKey) {
				var formSend = find("//form[@name='msg']", XPFirst);
				if (formSend) formSend.submit();
			}
			return;
		}

		function createMrPreloadFunc(page) {
			var intPgType = location.href.indexOf("t=");
			if (intPgType != -1) {
				var addLink = "&" + location.href.substr(intPgType,3);
			} else {
				var addLink = "";
			}
			return function() {
				ajaxRequest(genLink + (page * 10) + addLink, "GET", null, processMrPage, dummy);
			}
		}
		
		function processMrPage(t) {
			var ans = elem("DIV", t.responseText);
			var ansdoc = document.implementation.createDocument("", "", null);
			ansdoc.appendChild(ans);
			var boolShowMesOpenLinks = getGMcookie("showmesopenlinks", false);
			if (boolShowMesOpenLinks == 'false') boolShowMesOpenLinks = '1';
			
			var aTable = ansdoc.evaluate("//table[@class='tbg']", ans, null, XPFirst, null).singleNodeValue;
			if (aTable) {
				var maxRows = aTable.rows.length;
				var mrTable = find("//table[@class='tbg']", XPFirst);
				var lastRow = mrTable.rows[mrTable.rows.length - 1];
				removeElement(lastRow);
				if (maxRows > 3) {
					for (var xi = 1; xi < maxRows - 1; xi++) {
						var aRow = aTable.rows[xi];
						var xRow = elem("TR", "");
						var intNoOfCells = aRow.cells.length;
						if (intNoOfCells > 1) {
							for (var yi = 0; yi < intNoOfCells; yi++) {
								var aCell = aRow.cells[yi];
								var xCell = elem("TD", aCell.innerHTML);
								var iHTML = xCell.innerHTML;
								if (iHTML.indexOf("spieler.php") != -1) {
									var aNode = xCell.childNodes[0];
									if (aNode.href.search(/spieler.php\?uid=(\d+$)/) > 0) {
										var uid = RegExp.$1;
										//insert, if necessary travmap, world analyser and IGM links
										insertUserLinks(aNode, uid);
									}
								}
								if (boolShowMesOpenLinks == "1") {
									if (iHTML.indexOf("nachrichten.php?id=") != -1 || iHTML.indexOf("berichte.php?id=") != -1) {
										var aNode = xCell.childNodes[0];
										addReadMesRepInPopup(aNode);
									}
								}
								
								if (yi == 1) {
									xCell.setAttribute('align', docDirection);
									xCell.setAttribute('class', 's7');
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
		var ms1 = getRandomTimeRange(ms);
		var aDate = new Date();
		var crtDate = new Date();
		do {crtDate = new Date();}
		while (crtDate - aDate < ms1);
	}
	
	function isThisReportsToDeletePage() {
		var pageToDeleteReportsFrom = getGMcookie("reportsPageToDelete", false);
		var pageToReturnTo = getGMcookie("reportsPageToReturnTo", false);
		log(3, "pageToDeleteReportsFrom = " + pageToDeleteReportsFrom);
		if (pageToDeleteReportsFrom == "") return;
		if (pageToDeleteReportsFrom == document.location.href) {
			//log(3, "document.location.href = " + document.location.href);
			//pauseScript(getRandomTimeRange(2000));
			var allCB = find("//input[@type='checkbox' and not(@id)]", XPList);
			//log(3, "allCB.length = " + allCB.snapshotLength);
			if (allCB.snapshotLength > 0) {
				var selectAllCB = document.getElementsByName("s10");
				if (selectAllCB) {
					//log(3, "selectAllCB found");
					selectAllCB[0].click();
					var delButton = document.getElementsByName("del");
					if (delButton) {
						//log(3, "delButton found");
						//setGMcookie("reportsPageToDelete", "", false);
						//setGMcookie("reportsPageToReturnTo", "", false);
						pauseScript(500);
						delButton[0].click();
						//if (pageToReturnTo != "") {
						//	document.location.href = pageToReturnTo;
						//}
					}
				}
				//document.location.href = crtLink;
			} else {
				setGMcookie("reportsPageToDelete", "", false);
				setGMcookie("reportsPageToReturnTo", "", false);
			}
		} else {
			setGMcookie("reportsPageToDelete", "", false);
			setGMcookie("reportsPageToReturnTo", "", false);
		}
	}
	
	function toNumber(aValue) {
		return parseInt(aValue.replace(",", "").replace(",", "").replace(".", "").replace(".", "").replace(" ", "").replace(" ", "").replace("&nbsp;", "").replace("&nbsp", ""));
	}
	
	function getMerchantsInformation() {
		//get the current capacity of the merchants for this village
		merchantsCapacity = getGMcookie("merchantsCapacity", false);
		merchantsName = getGMcookie("merchantsName", false);
		if (merchantsName == "false") merchantsName = '';
		var sCapacity = "0";
		if (merchantsCapacity != "") {
			merchantsCapacity = merchantsCapacity.split("$$");
			for (var i = 0; i < merchantsCapacity.length; i++) {
				var aX = merchantsCapacity[i].split("$")
				if (aX[0] == villageID) {
					sCapacity = aX[1];
				}
			}
		}
		merchantsCapacity = toNumber(sCapacity);
	}
	
	function getStatisticsMenu() {
		var topMenu = find("//p[@class='txt_menue']", XPFirst);
		if (topMenu) {
			var statArray = new Array();
			var listTitles = new Array();
			var aHrefList = xpathResultEvaluate('//div[@id="lmid2"]/p[@class="txt_menue"]//a');
			var aTitleList = topMenu.textContent.split(" |");
			for (xi = 0; xi < aTitleList.length; xi++) {
				listTitles[xi] = aTitleList[xi].replace("\n", "").replace(" ", "");
				statArray[0] = listTitles[xi];
				var aLink = aHrefList.snapshotItem(xi).href; 
				statArray[1] = aLink.substring(aLink.lastIndexOf("/") + 1);
				addGMcookieValue("statArray", statArray, false);
				//log(3, "statArray = " + statArray);
			}
		}
	}
	
	//following functions from http://userscripts.org/scripts/show/35277
	//© Copyright 2007 Richard Laffers
	/************************ Start of Drag n drop******************************/
		var mouseOffset = null;
		var iMouseDown  = false;
		var lMouseState = false;
		var dragObject  = null;
		var curTarget   = null;
		function mouseCoords(ev){
			return {x:ev.pageX, y:ev.pageY};
		}
		function getMouseOffset(target, ev){
			var docPos  = getPosition(target);
			var mousePos  = mouseCoords(ev);
			return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
		}
		function getPosition(e){
			var left = 0;
			var top = 0;
			while (e.offsetParent){
				left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
				top += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
				e   = e.offsetParent;
			}
			left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
			top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
			return {x:left, y:top};
		}
		function mouseMove(ev){
			var target = ev.target;
			var mousePos = mouseCoords(ev);
			if (dragObject){
				dragObject.style.position = 'absolute';
				dragObject.style.top  = (mousePos.y - mouseOffset.y) +'px';
				dragObject.style.left   = (mousePos.x - mouseOffset.x) +'px';
			}
			lMouseState = iMouseDown;
			return false;
		}
		function mouseUp(ev){
			dragObject = null;
			iMouseDown = false;
		}
		function mouseDown(ev){
			var target = ev.target;
			iMouseDown = true;
			if (target.getAttribute('DragObj')){
				return false;
			}
		}
		function makeDraggable(parent, item){
			document.addEventListener('mousemove', mouseMove, false);
			document.addEventListener('mousedown', mouseDown, false);
			document.addEventListener('mouseup', mouseUp, false);
			if (!parent||!item) return;
			item.addEventListener('mousedown',function(ev){
				dragObject  = parent;
				mouseOffset = getMouseOffset(parent, ev);
				return false;
			}, false);
		}
	/************************ End of Drag n drop******************************/
	
	/* General actions to be performed on all pages */
	getGeneralData();
	//if (location.href.indexOf('statistiken.php') != -1)												getStatisticsMenu();
	if (location.href.indexOf('karte2.php') == -1) {
		adjustLinks();
		hideAd();
		bigIconsBar();

		leftMenuLinks();
		villageID = getIdVillageV2();
	   	calculateFillTime();
		villageList();
	   	deleteAccount();
		userBookmarks();

		isThisTroopTrainingBuilding();
	}

	/* Specific actions to be performed only on specific pages */
	if (location.href.indexOf('allianz.php') != -1)													allyCalculation();
	if (location.href.indexOf('karte.php?') != -1 && location.href.indexOf('d=') != -1)				addTroopTimes();
	if (location.href.indexOf('build.php?') != -1)													{quickCity(); marketResources(); getMerchantsInformation();}
    if (location.href.indexOf('build.php') != -1) 													{calculateBuildTime(); timeToExploreMilitaryUnits(); TimeToExplore(); showOffers();}
    if (location.href.indexOf('dorf1') != -1)														preCompute1();
	if (location.href.match(/a2b\.php($|\?newdid=|\?z=)/)) 											selectAllTroops(); // Only for "Send troops" page.
    if (location.href.indexOf('dorf2') != -1 || location.href.indexOf('build.php?newdid=') != -1)	preCompute2();
    //if (location.href.match(/berichte.php\?(|\?id=|\?newdid=)/))									battleReport();
    if (location.href.indexOf('a2b.php') != -1)														{quickCity(); defaultAttackType(); }
    if (location.href.match(/dorf3.php($|\?newdid=(\d+)$)/) || location.href.indexOf('dorf3.php') != -1) overviewVillages();
    if (location.href.match(/build.php\?(.*)&s=2/))													culturePoints();
    if (location.href.match(/build.php\?(.*)&t=1/))													{addAllyColumnForMarketOffers(); MarketFilters(); }
    if ((location.href.match(/karte.php($|\?z=|\?new)/) && location.href.indexOf('d=') == -1) || location.href.match(/karte.php($|\?newdid=(\d+)$)/)) {infoResources(); installMapEventHandler(); }
	if (location.href.indexOf('gid=16') != -1 || location.href.indexOf('id=39') != -1) 				tableTotalVillageTroopsV3();
	if (location.href.match(/nachrichten.php($|\?t=|\?s=|\?newdid=)/) || location.href.match(/berichte.php($|\?t=|\?s=|\?newdid=)/)) {MessageOptions();}
	if (location.href.indexOf("nachrichten.php?") != -1)											convertCoordsInMessagesToLinks();
	if (location.href.indexOf("berichte.php?") != -1)												battleReport("orig");
	if (location.href.indexOf("spieler.php?uid") != -1)												addPopulationStatistics();
	if (location.href.indexOf('spieler.php') != -1 && location.href.indexOf('?') == -1) 			getSingleTown(); //to capture the change of the singleTown name while in the Profile
	if (boolIsHerosMansion())																		showHeroStatus();
	if (boolIsThisNPC()) 																			fillOutNPCfields(urlNow);
	if (location.href.indexOf('build.php') != -1)													NPCUpdate();
	if (boolIsThisPostNPC())																		insertNPCHistoryLink();

	/* General actions  continued */
	if (getGMcookie("starttimers", false) == "false")												setTimers();
	if (boolShowTroopInfoTooltips == "1")															showTroopInfo();
	playerLinks();
	
   	ComputeTBeyondRunTime();

};

//window.addEventListener('load', functionMain, false);
if (window.addEventListener) {
	window.addEventListener('load', functionMain, false);
} else {
	window.attachEvent('onload', functionMain);
}
