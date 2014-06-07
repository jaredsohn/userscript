// coding: utf-8
// ==UserScript==
// @name          	Ikariam v3 Empire Board
// @namespace     ikariam-v3-empire-board.miaouw.net
// @version	140
// @author		oliezekat
// @description    Display population, resources, trading, transports, incomes, buildings, and army or fleet units overviews for each cities. Require Ikariam v0.3.0 server game. Support any countries/languages.
// @include     http://s*.ikariam.*/*
// @exclude    http://board.ikariam.*/*
// @exclude    http://*.ikariam.*/*?view=options
// @exclude    http://*.ikariam.*/pillory.php
// @exclude    http://ikariam.ogame-world.com/*
// @exclude    http://www.ika-world.com/*
// ==/UserScript==

/**************************************************************************************************

LAST CHANGES:

Version 1.4.0:
- Fix to fetch buildings position (barracks bug)
- Update german translation, thanks to xkaaay
- Add russian translation by Mugiwara
- Display red alert if not enough wine for next 24 hours usages
- Add available free spaces for new buildings
- Add available action points
- Remove Last Update time per cities
- Display red "!" symbol for each views, cities, or buildings which require attention (to update data overview)
- Change script's namespace that's reset all data
- Most beautifull appearance while script's first use

PREV IOUS CHANGES:
http://userscripts.org/topics/20976
	
Based on "Ikariam Alarm And Overview Table" script (for Ikariam v0.2.8)
http://userscripts.org/scripts/show/35995

**************************************************************************************************/

var _startTime = new Date().getTime();
var scriptversion = "140";

//a szerver neve
var server = /\/\/([a-z._0-9]+)\//.exec(document.URL);
server = RegExp.$1;
//window.status = 'server=' + server;

try
	{
	var body_id = document.getElementsByTagName("body")[0].id;
	//window.status = 'body.id=' + body_id;
	}
catch (e)
	{
	var body_id = '';
	var url_view = /[\?&]view=([a-zA-Z0-9\-_]+)/.exec(document.URL);
	if (url_view != null) body_id = RegExp.$1;
	//window.status = 'body.id not found, view=' + body_id;
	if (body_id == '') { window.status = 'body.id and view not found'; }
	}
var actioncode = getActionCode();

var config = unserialize(getVar("config", ""));
if (config == null || config == undefined || config == "" || ("".config == "NaN")) {
  config = new Object();
}
if (config.cfg == undefined) {
  config.cfg = new Object();
}

var PROGRESS_BAR_MODE; //have to be a global variable

/************************* DEFAULT STYLE **************************/
var default_style = <><![CDATA[
#overview__table .resources_table,
#overview__table .buildings_table,
#overview__table .army_table {
  text-align: center;
  border-style: double; border-width: 3px; border-color: #CB9B6A;
  background-color: #F6EBBC;
  width: 980px !important;
  border-collapse: collapse;
}

#overview__table th.city_name,
#overview__table td.city_name { overflow: hidden;  }

#overview__table table th {  color: #542C0F; text-align: center !important; padding: 1px; padding-left: 2px;}
th.table_header {
  height: 22px;
  font-weight: bold;
  text-align: center;
  padding-bottom: 2px;
  border-bottom: none !important;
  background-color: #F6EBBC;
  background-image: url(/skin/layout/bg_sidebox_header.jpg);
  background-repeat: repeat-x;
  background-position: -4px -5px;
}
#overview__table th.city_name {width: 140px; max-width: 140px;}
#overview__table th.actions { width: 45px; max-width: 45px; background-position: -144px -5px;padding-bottom: 3px;}
#overview__table .buildings_table th.build_name0,
#overview__table .buildings_table th.build_name1,
#overview__table .buildings_table th.build_name2,
#overview__table .buildings_table th.build_name3 { max-width: 35px; overflow: hidden; cursor: default;}
#overview__table .buildings_table th.build_name2 { max-width: 50px;}
#overview__table .buildings_table th.build_name3 { max-width: 65px;}
#overview__table .army_table th.unit_name {  max-width: 35px; overflow: hidden; cursor: default;}

#overview__table .resources_table td,
#overview__table .buildings_table td,
#overview__table .army_table td {  color: #542C0F; line-height: 12px; min-width: 10px; vertical-align: top; text-align: right; padding: 1px;}
#overview__table td.city_name { width: 140px; max-width: 140px;padding-left: 4px;text-align: left; }
#overview__table td.actions { border-left-color: #E8D8A8; border-left-width: 1px; border-left-style: solid; text-align: right; }
#overview__table.RtoL td.city_name { text-align: right; }

#overview__table th.city_name img,
#overview__table th.actions img,
#overview__table td.city_name img,
#overview__table td.actions img { margin-left: 1px; border: none; max-height: 15px;}

td.table_footer { /*also for army table's last column*/
  border-top-width: 2px;
  border-top-style: solid;
  border-color: #CB9B6A;
  font-weight: bold;
  background-color: #E8D8A8;
}
th.lf,
td.lf {
  border-left-style: double;
  border-left-width: 3px;
  border-left-color: #CB9B6A;
}
td.lfd {
  border-left-style: solid;
  border-left-width: 1px;
  border-left-color: #E8D8A8;
}
.time_counter {
  font-weight: bold;
  width: 55px;
}
.current_city_highlight {
  background-color: #E0D0A0;
}
#overview__table .upgrading, #overview__table .upgrading a {
  color: #008000; font-weight: bold;
}
.tradinggoods,
.arrivinggoods,
.MoreGoods {
font-size: 10px;
line-height: 10px;
clear: both;
display: block;
color: #CB9B6A;
}
.MoreGoods {color: #7E4A21;}
.arrivinggoods {color: #008000; cursor: default;}
.tradinggoods { cursor: default; }
/****************** progress bar styles *******************/
table.myPercent {
  height: 4px !important;
  width: 100%;
  background-color: #CB9B6A;
  margin-top: 1px;
}
table.myPercent td {height: 4px !important; min-width: 0px !important; padding: 0px !important}
td.myPercentNormal { /* normal state. you have plenty of rooms */
  background-color: #73443E;
}
td.myPercentWarning { /* warehose is getting full */
  background-color: #C00000;
}
td.myPercentAlmostFull { /* warehouse is almost full */
  background-color: #D50000;
}
td.myPercentFull { /* warehouse is full */
  background-color: #ff0000;
}

/****************** population full *******************/
td.populationfull {
  color: red !important;
  font-weight: bold;
}

.EmptySoon {
  color: red !important;
  font-weight: bold;
}

.Red {
  color: red !important;
}
.Green {
  color: green !important;
}


/****************** current building *******************/
td.current_building {
font-weight: bold;
}

/****************** tooltip *******************/
.TTContent {padding: 3px; background-color: #F1D7AD; border-color: #BE8D53; border-width: 1px; border-top-width: 4px; border-style: solid; color: #542C0F;}
.TTTitle { font-weight: bold; padding: 3px; background-color: #BE8D53; color: #542C0F; margin-bottom: -4px;}

#overview__table p {text-align: left; margin-bottom: 5px; display: block; width: 980px !important; }
#overview__table .Footer {text-align: right}
#overview__table .Footer .button {margin-top: 0px; margin-bottom: 5px}
]]></>.toXMLString();

function xpath(query) {
  return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function getCfgValue(key, defaultValue) {
  return ((config.cfg != undefined && config.cfg[key] != undefined) ? config.cfg[key] : defaultValue);
}
function getCfgValueNonEmpty(key, defaultValue) {
  return ((config.cfg != undefined && config.cfg[key] != undefined && config.cfg[key] != "") ? config.cfg[key] : defaultValue);
}

var language;
function setLanguage() {
  var arr = server.split("\.");
  language = arr[arr.length - 1];
  if (language == "com" && arr.length == 4) { //for example: http://s1.ba.ikariam.com
    language = arr[1];
  }
  var l = getCfgValueNonEmpty("LANGUAGE", language);
  if (l != undefined) {
    language = l;
  }
}
setLanguage();

var tavernWineUsage = [0, 4, 8, 13, 18, 24, 30, 37, 44, 51, 60, 68, 78, 88, 99, 110, 122, 136,150,165,180,197,216,235,255,277,300];
var townHallSpaces = [0, 60, 96, 142, 200, 262, 332, 410, 492, 580, 672, 768, 870, 976, 1086, 1200, 1320, 1440, 1566, 1696, 1828, 1964, 2102, 2246, 2390, 2540, 2690, 2845, 3003, 3163, 3326, 3492, 3660];
// fix for v3
var unitsAndShipsIndexes = {
  "unit slinger" : 0,
  "unit swordsman" : 1,
  "unit phalanx": 2,
  "unit archer" : 3,
  "unit marksman" : 4,
  "unit gyrocopter" : 5,
  "unit steamgiant" : 6,
  "unit bombardier" : 7,
  "unit ram" : 8,
  "unit catapult" : 9,
  "unit mortar" : 10,
  "unit medic" : 11,
  "unit cook" : 12,

  "unit ship_ram" : 13,
  "unit ship_ballista" : 14,
  "unit ship_flamethrower" : 15,
  "unit ship_catapult" : 16,
  "unit ship_steamboat" : 17,
  "unit ship_mortar" : 18,
  "unit ship_submarine" : 19,
};
var unitsAndShipsIndexesR = [];
for(key in unitsAndShipsIndexes) {
  unitsAndShipsIndexesR[unitsAndShipsIndexes[key]] = key;
}
var unitScoreBasePoints = {"wood": 2, "wine": 4, "glass": 4, "sulfur": 4};
// deprecated
var warehouseWoodCapacities = [0, 2160, 3200, 4576, 6336, 8424, 9975, 12799, 16152, 19944, 24200, 28791, 34040, 43520, 54439, 66528, 80024, 320096, 640192, 1280384, 2560768, 5121536, 10243072, 20486144, 40972288, 81944576, 163889152, 327778304, 655556608, 1311113216, 2622226432, 5244452864, 10488905728];
var warehouseOtherCapacities = [0, 720, 800, 1152, 2352, 2548, 3507, 3780, 5332, 7179, 9347, 11784, 14499, 20028, 23548, 27484, 34932, 139728, 279456, 558912, 1117824, 2235648, 4471296, 8942592, 17885184, 35770368, 71540736, 143081472, 286162944, 572325888, 1144651776, 2289303552, 4578607104];
// Fix for v3
function warehouseCapacities(level)
	{
	if (level == 0) 
		{ return 0; }
	else
		{ return level*8000; }
	}

var buildings;
var texts;
var langtype;
function getLocalizedTexts() {
if (language == "de") { //german translation, thanks to Schneppi & xkaaay
langtype = "";
  buildings = {
    "townHall"      : ["Rathaus", "Rathaus"],
    "academy"       : ["Academie", "Academie"],
    "port"          : ["Handelshafen", "Handelshafen"],
    "shipyard"      : ["Schiffswerft", "Schiffswerft"],
    "warehouse"     : ["Lagerhaus", "Lagerhaus"],
    "wall"          : ["Stadtmauer", "Stadtmauer"],
    "tavern"        : ["Taverne", "Taverne"],
    "museum"        : ["Museum", "Museum"],
    "palace"        : ["Palast", "Palast"],
    "palaceColony"  : ["Statthaltersitz", "Statthaltersitz"],
    "embassy"       : ["Botschaft", "Botschaft"],
    "branchOffice"  : ["Kontor", "Kontor"],
    "safehouse"     : ["Versteck", "Versteck"],
    "barracks"      : ["Kaserne", "Kaserne"],
    "workshop"      : ["Erfinderwerkstatt", "Erfinderwerkstatt"],
    "carpentering"  : ["Zimmerei", "Zimmerei"],
    "forester"      : ["Forsthaus", "Forsthaus"],
    "stonemason"    : ["Steinmetz", "Steinmetz"],
    "glassblowing"  : ["GlasblÃ¤serei", "GlasblÃ¤serei"],
    "winegrower"    : ["Winzerei", "Winzerei"],
    "alchemist"     : ["Alchimistenturm", "Alchimistenturm"],
    "architect"     : ["ArchitekturbÃ¼ro", "ArchitekturbÃ¼ro"],
    "optician"      : ["Optiker", "Optiker"],
    "vineyard"      : ["Kelterei", "Kelterei"],
    "fireworker"    : ["Feuerwerksplatz", "Feuerwerksplatz"]
  };
  texts = {
    "cityName"          : "Stadtname",
    "currentlyBuilding" : "Zur Zeit im Bau",
    "summary"           : "Gesamt:",
    "hide_settings"     : "Verstecke Optionen",
    "show_settings"     : "Zeige Optionen",
    "Population"        : "BevÃ¶lkerung",
    "finishedBuilding"  : "Bau abgeschlossen",
    "Incomes"           : "Einkommen",
    "Trading"           : "Handel",
    "Wood"              : "Baumaterial",
    "Wine"              : "Wein",
    "Marble"            : "Marmor",
    "Crystal"           : "Kristallglas",
    "Sulfur"            : "Schwefel"
  };
} else if (language == "tw") { //traditional chinese translation by Whiskers
	langtype = "";
	buildings = {
	"townHall" : ["å¸‚æ”¿åºœ", "å¸‚åºœ"],
	"academy" : ["å­¸é™¢", "å­¸é™¢"],
	"port" : ["æ¸¯å£", "æ¸¯å£"],
	"shipyard" : ["èˆ¹å¡¢", "èˆ¹å¡¢"],
	"warehouse" : ["å€‰åº«", "å€‰åº«"],
	"wall" : ["åŸŽç‰†", "åŸŽç‰†"],
	"tavern" : ["é…’é¤¨", "é…’é¤¨"],
	"museum" : ["åšç‰©é¤¨", "åšç‰©"],
	"palace" : ["çš‡å®«", "çš‡å®«"],
	"palaceColony" : ["ç¸½ç£åºœ", "ç¸½ç£"],
	"embassy" : ["å¤§ä½¿é¤¨", "ä½¿é¤¨"],
	"branchOffice" : ["å¸‚å ´", "å¸‚å ´"],
	"safehouse" : ["é–“è«œå°å±‹", "é–“è«œ"],
	"barracks" : ["å…µç‡Ÿ", "å…µç‡Ÿ"],
	"workshop" : ["å…µå·¥å» ", "å…µå» "],
	"carpentering" : ["æœ¨åŒ å±‹", "æœ¨ï¼"],
	"forester" : ["æž—å‹™å®˜å®…", "æœ¨ï¼‹"],
	"stonemason" : ["çŸ³åŒ å±‹", "çŸ³ï¼‹"],
	"glassblowing" : ["çŽ»ç’ƒå¹åˆ¶å» ", "æ™¶ï¼‹"],
	"winegrower" : ["è‘¡è„æ¨¹åœ’", "è‘¡ï¼‹"],
	"alchemist" : ["ç…‰é‡‘å¡”", "ç¡«ï¼‹"],
	"architect" : ["å»ºç¯‰å…¬ç½²", "çŸ³ï¼"],
	"optician" : ["é…é¡å•†é¤¨", "æ™¶ï¼"],
	"vineyard" : ["è—é…’çª–", "è‘¡ï¼"],
	"fireworker" : ["ç…™ç«æ¸¬è©¦å€åŸŸ", "ç¡«ï¼"]
	};
	texts = {
	"cityName": "åŸŽéŽ®", "currentlyBuilding": "æ­£åœ¨å»ºé€ ", "summary": "ç¸½è¨ˆ:",
	"hide_settings": "éšè—è¨­å®š", "show_settings": "é¡¯ç¤ºè¨­å®š",
	"Population": "äººå£",
	"finishedBuilding": "å»ºé€ å®Œæˆ","Incomes":"æ”¶å…¥","Trading":"äº¤æ˜“",
	"Wood": "æœ¨æ", "Wine": "è‘¡è„", "Marble": "å¤§ç†çŸ³", "Crystal": "æ°´æ™¶", "Sulfur": "ç¡«ç£º"
	}; 
} else if (language == "cn") { //chinese translation, thank Alphasong
		langtype = "";
		buildings = {
		"townHall" : ["å¸‚æ”¿åŽ…", "å¸‚æ”¿åŽ…"],
		"academy" : ["å­¦é™¢", "å­¦é™¢"],
		"port" : ["æ¸¯å£", "æ¸¯å£"],
		"shipyard" : ["èˆ¹åž", "èˆ¹åž"],
		"warehouse" : ["ä»“åº“", "ä»“åº“"],
		"wall" : ["åŸŽå¢™", "åŸŽå¢™"],
		"tavern" : ["é…’é¦†", "é…’é¦†"],
		"museum" : ["åšç‰©é¦†", "åšç‰©é¦†"],
		"palace" : ["çš‡å®«", "çš‡å®«"],
		"palaceColony" : ["æ€»ç£åºœ", "æ€»ç£åºœ"],
		"embassy" : ["ä½¿é¦†", "ä½¿é¦†"],
		"branchOffice" : ["å¸‚åœº", "å¸‚åœº"],
		"safehouse" : ["è—èº«å¤„", "è—èº«å¤„"],
		"barracks" : ["å…µè¥", "å…µè¥"],
		"workshop" : ["å…µå·¥åŽ‚", "å…µå·¥åŽ‚"],
		"carpentering" : ["æœ¨åŒ æ‰€", "æœ¨åŒ æ‰€r"],
		"forester" : ["æž—åŠ¡å®˜å®…", "æž—åŠ¡å®˜å®…"],
		"stonemason" : ["çŸ³åŒ å±‹", "çŸ³åŒ å±‹"],
		"glassblowing" : ["çŽ»ç’ƒå¹åˆ¶åŽ‚", "çŽ»ç’ƒå¹åˆ¶åŽ‚"],
		"winegrower" : ["è‘¡è„ç§æ¤å›­", "è‘¡è„ç§æ¤å›­"],
		"alchemist" : ["ç‚¼é‡‘å¡”", "ç‚¼é‡‘å¡”"],
		"architect" : ["å»ºç­‘å…¬ç½²", "å»ºç­‘å…¬ç½²"],
		"optician" : ["é…é•œå•†é¦†", "é…é•œå•†é¦†"],
		"vineyard" : ["è—é…’çª–", "è—é…’çª–"],
		"fireworker" : ["çƒŸç«å®žéªŒåœº", "çƒŸç«å®žéªŒåœº"]
		};
		texts = {
		"cityName": "åŸŽå¸‚", "currentlyBuilding": "æ­£åœ¨å»ºé€ ", "summary": "æ€»è®¡:",
		"hide_settings": "éšè—è®¾ç½®", "show_settings": "æ˜¾ç¤ºè®¾ç½®",
		"Population": "äººå£",
		"finishedBuilding": "å»ºé€ å®Œæˆ","Incomes":"æ”¶å…¥","Trading":"äº¤æ˜“",
		"Wood": "æœ¨æ", "Wine": "è‘¡è„", "Marble": "å¤§ç†çŸ³", "Crystal": "æ°´æ™¶", "Sulfur": "ç¡«ç£º"
		};
	} else if (language == "tr") { //Turkish translation, thanks to NailBey
		langtype = "";
		buildings = {
		"townHall" : ["Belediye Binasi", "Belediye Binasi"],
		"academy" : ["Akademi", "Akademi"],
		"port" : ["Ticaret Limani", "Ticaret Limani"],
		"shipyard" : ["Donanma Tershanesi", "Donanma Tershanesi"],
		"warehouse" : ["Depo", "Depo"],
		"wall" : ["Sur", "Sur"],
		"tavern" : ["Taverna", "Taverna"],
		"museum" : ["Muze", "Muze"],
		"palace" : ["Saray", "Saray"],
		"palaceColony" : ["Vali Konagi", "Vali Konagi"],
		"embassy" : ["Buyukelcilik", "Buyukelcilik"],
		"branchOffice" : ["Ticaret Merkezi", "Ticaret Merkezi"],
		"safehouse" : ["Istihbarat Merkezi", "Istihbarat Merkezi"],
		"barracks" : ["Kisla", "Kisla"],
		"workshop" : ["Mucit Atolyesi", "Mucit Atolyesi"],
		"carpentering" : ["Marangoz Atolyesi", "Marangoz Atolyesi"],
		"forester" : ["Ormanci Kulubesi", "Ormanci Kulubesi"],
		"stonemason" : ["Mermer Atolyesi", "Mermer Atolyesi"],
		"glassblowing" : ["Cam Esya Atolyesi", "Cam Esya Atolyesi"],
		"winegrower" : ["Bag Evi", "Bag Evi"],
		"alchemist" : ["Simya Kulesi", "Simya Kulesi"],
		"architect" : ["Mimarlik Burosu", "Mimarlik Burosu"],
		"optician" : ["Optik", "Optik"],
		"vineyard" : ["Sarap Mahzeni", "Sarap Mahzeni"],
		"fireworker" : ["Fisekci", "Fisekci"]
		};
		texts = {
		"cityName": "Sehir Adi", "currentlyBuilding": "Insaa Ediliyor", "summary": "Toplam:",
		"hide_settings": "Ayarlari Gizle", "show_settings": "Ayarlari Goster",
		"Population": "Nufus","finishedBuilding": "Ä°nsaa Bitti","Incomes":"Gelir","Trading":"Ticaret",
		"Wood": "Odun", "Wine": "Sarap", "Marble": "Mermer", "Crystal": "Kristal", "Sulfur": "Sulfur"  
		};
 } else if (language == "vn") { // Vietnamese translations, thank Gafs
	langtype = ""; // Set "lf" for Rigth-to-Left languages, or leave blank
    buildings = {
       "townHall"      : ["TÃ²a thá»‹ chÃ­nh", "TÃ²a T.ChÃ­nh"],
      "academy"       : ["Há»c viá»‡n", "Há»c viá»‡n"],
      "port"          : ["Cáº£ng giao dá»‹ch", "Cáº£ng GD"],
      "shipyard"      : ["XÆ°á»Ÿng Ä‘Ã³ng tÃ u", "XÆ°á»Ÿng tÃ u"],
      "warehouse"     : ["Kho hÃ ng", "Kho"],
      "wall"          : ["TÆ°á»ng thÃ nh", "TÆ°á»ng"],
      "tavern"        : ["QuÃ¡n rÆ°á»£u", "QuÃ¡n rÆ°á»£u"],
      "museum"        : ["Viá»‡n báº£o tÃ ng", "V.B.TÃ ng"],
      "palace"        : ["Cung Ä‘iá»‡n", "Cung Ä‘iá»‡n"],
      "palaceColony"  : ["Phá»§ thá»§ hiáº¿n", "Phá»§"],
      "embassy"       : ["TÃ²a Ä‘áº¡i sá»©", "TÃ²a Ä.Sá»©"],
      "branchOffice"  : ["Tráº¡m giao dá»‹ch", "Tráº¡m GD"],
      "safehouse"     : ["NÆ¡i áº©n nÃ¡u", "NÆ¡i áº©n nÃ¡u"],
      "barracks"      : ["Tráº¡i lÃ­nh", "Tráº¡i lÃ­nh"],
      "workshop" 	  : ["XÆ°á»Ÿng", "XÆ°á»Ÿng"],
		"carpentering" : ["Thá»£ má»™c", "Thá»£ má»™c"],
			"forester" : ["NhÃ  kiá»ƒm lÃ¢m", "Kiá»ƒm lÃ¢m"],
		  "stonemason" : ["Thá»£ xÃ¢y Ä‘Ã¡", "Thá»£ Ä‘Ã¡"],
		"glassblowing" : ["NgÆ°á»i thá»•i thá»§y tinh", "Thá»•i TT"],
		  "winegrower" : ["MÃ¡y Ã©p nho", "Ã‰p nho"],
		   "alchemist" : ["Giáº£ kim", "Giáº£ kim"],
		   "architect" : ["TÃ²a kiáº¿n trÃºc", "Kiáº¿n trÃºc"],
			"optician" : ["Thá»£ kÃ­nh", "Thá»£ kÃ­nh"],
			"vineyard" : ["VÆ°á»n nho", "V.Nho"],
		  "fireworker" : ["Thá»­ thuá»‘c sÃºng", "Thuá»‘c sÃºng"]
    };
	texts = {
      "cityName": "ThÃ nh phá»‘", "currentlyBuilding": "Äang xÃ¢y dá»±ng", "summary": "Tá»•ng:",
      "hide_settings": "áº¨n thiáº¿t láº­p", "show_settings": "Hiá»ƒn thá»‹ thiáº¿t láº­p",
 	  "Population": "DÃ¢n sá»‘",
	  "finishedBuilding": "CÃ´ng trÃ¬nh hoÃ n táº¥t","Incomes":"Thu nháº­p","Trading":"Trao Ä‘á»•i",
 	  "Wood": "Gá»—", "Wine": "RÆ°á»£u", "Marble": "Cáº©m tháº¡ch", "Crystal": "Pha lÃª", "Sulfur": "LÆ°u huá»³nh"
	};
} else if (language == "es") { //Spanish translation, thanks to dragondeluz & graff86
		langtype = "";
		buildings = {
		  "townHall"      : ["Intendencia", "Intendencia"],
		  "academy"       : ["Academia", "Academia"],
		  "port"          : ["Puerto comercial", "Puerto"],
		  "shipyard"      : ["Astillero", "Astillero"],
		  "warehouse"     : ["DepÃ³sito", "DepÃ³sito"],
		  "wall"          : ["Muro", "Muro"],
		  "tavern"        : ["Taberna", "Taberna"],
		  "museum"        : ["Museo", "Museo"],
		  "palace"        : ["Palacio", "Palacio"],
		  "palaceColony"  : ["Residencia del Gobernador", "R. Gobernador"],
		  "embassy"       : ["Embajada", "Embajada"],
		  "branchOffice"  : ["Tienda", "Tienda"],
		  "safehouse"     : ["Escondite", "Escondite"],
		  "barracks"      : ["Cuarteles", "Cuarteles"],
		  "workshop" 	: ["Taller de Invenciones", "Taller"],
		  "carpentering" 	: ["CarpinterÃ­a", "CarpinterÃ­a"],
		  "forester" 	: ["CabaÃ±a del Guardabosques", "CabaÃ±a"],
		  "stonemason" 	: ["Cantero", "Cantero"],
		  "glassblowing"	: ["Soplador de vidrio", "Soplador"],
		  "winegrower" 	: ["Vinicultor", "Vinicultor"],
		  "alchemist" 	: ["Torre del Alquimista", "Alquimista"],
		  "architect" 	: ["Oficina del Arquitecto", "Arquitecto"],
		  "optician" 	: ["Optico", "Optico"],
		  "vineyard" 	: ["Prensa de Vino", "Prensa"],
		  "fireworker" 	: ["Area de Pruebas PirotÃ©cnicas", "A. PirotÃ©cnica"]
		};
		texts = {
		  "cityName": "Nombre de la Ciudad", "currentlyBuilding": "ConstrucciÃ³n Actual", "summary": "Totales:",
		  "hide_settings": "Hide settings", "show_settings": "Show settings",
		  "Population": "Poblacion",
		  "finishedBuilding": "Edificios terminados","Incomes":"Ingresos","Trading":"Trading",
		  "Wood": "Madera", "Wine": "Vino", "Marble": "Marmol", "Crystal": "Cristal", "Sulfur": "Azufre"
		};
   } else if (language == "pl") { // thanks to Syjamek
		langtype = "";
		buildings = {
		"townHall" : ["Ratusz", "Ratusz"],
		"academy" : ["Akademia", "Akademia"],
		"port" : ["Port", "Port"],
		"shipyard" : ["Stocznia", "Stocznia"],
		"warehouse" : ["Magazyn", "Magazyn"],
		"wall" : ["Mur", "Mur"],
		"tavern" : ["Taverne", "Taverne"],
		"museum" : ["Muzeum", "Muzeum"],
		"palace" : ["PaÅ‚ac", "PaÅ‚ac"],
		"palaceColony" : ["Rezydencja", "Rezydencja"],
		"embassy" : ["Ambasada", "Ambasada"],
		"branchOffice" : ["Bazar", "Bazar"],
		"safehouse" : ["KryjÃ³wka", "KryjÃ³wka"],
		"barracks" : ["Koszary", "Koszary"],
		"workshop" : ["Warsztat", "Warsztat"],
		"carpentering" : ["Warsztat CieÅ›li", "Warsztat CieÅ›li"],
		"forester" : ["LeÅ›niczÃ³wka", "LeÅ›niczÃ³wka"],
		"stonemason" : ["Kamieniarz", "Kamieniarz"],
		"glassblowing" : ["Huta SzkÅ‚a", "Huta SzkÅ‚a"],
		"winegrower" : ["Winnica", "Winnica"],
		"alchemist" : ["WieÅ¼a Alchemika", "WieÅ¼a Alchemika"],
		"architect" : ["Biuro Architekta", "Biuro Architekta"],
		"optician" : ["Optyk", "Optyk"],
		"vineyard" : ["Winiarz", "Winiarz"],
		"fireworker" : ["ZakÅ‚ad Pirotechnika", "ZakÅ‚ad Pirotechnika"]
		};
		texts = {
		"cityName": "Nazwa", "currentlyBuilding": "W budowie", "summary": "Suma:",
		"hide_settings": "Ukryj ustawieni", "show_settings": "PokaÅ¼ ustawienia",
		"Population": "Populacja",
		"finishedBuilding": "Budowa zakoÅ„czona","Incomes":"Bilans zÅ‚ota","Trading":"Handel",
		"Wood": "Drewno", "Wine": "Wino", "Marble": "Marmur", "Crystal": "KrysztaÅ‚", "Sulfur": "Siarka"
		}; 
	} else if (language == "it") { //Italian translation, thanks to Brucee and matteo466
	langtype = "";
	buildings = {
	"townHall" : ["Municipio", "Municipio"],
	"academy" : ["Accademia", "Accademia"],
	"port" : ["Porto", "Porto"],
	"shipyard" : ["Cantiere navale", "Cantiere navale"],
	"warehouse" : ["Magazzino", "Magazzino"],
	"wall" : ["Muro", "Muro"],
	"tavern" : ["Taverna", "Taverna"],
	"museum" : ["Museo", "Museo"],
	"palace" : ["Palazzo", "Palazzo"],
	"palaceColony" : ["Governatore", "Governatore"],
	"embassy" : ["Ambasciata", "Ambasciata"],
	"branchOffice" : ["Mercato", "Mercato"],
	"safehouse" : ["Rudere", "Rudere"],
	"barracks" : ["Caserma", "Caserma"],
	"workshop" : ["Officina", "Officina"],
	"carpentering" : ["Carpentiere", "Carpentiere"],
	"forester" : ["Guardaboschi", "Guardaboschi"],
	"stonemason" : ["Tagliapietre", "Tagliapietre"],
	"glassblowing" : ["Vetraio", "Vetraio"],
	"winegrower" : ["Viticoltore", "Viticoltore"],
	"alchemist" : ["Alchimista", "Alchimista"],
	"architect" : ["Architetto", "Architetto"],
	"optician" : ["Ottico", "Ottico"],
	"vineyard" : ["Cantina", "Cantina"],
	"fireworker" : ["Pirotecnico", "Pirotecnico"]
	};
	texts = {
	"cityName": "CittÃ ", "currentlyBuilding": "Costruzione in corso", "summary": "Sommario:",
	"hide_settings": "Nascondi opzioni", "show_settings": "Mostra opzioni",
	"Population": "Popolazione",
	  "finishedBuilding": "Costruzione completata","Incomes":"Saldo oro","Trading":"Trading",
	"Wood": "Legno", "Wine": "Vino", "Marble": "Marmo", "Crystal": "Cristallo", "Sulfur": "Zolfo"
	};
  } else if (language == "pt") { //Portuguese translation, thanks to alpha tester & Mr. Burns
   langtype = "";
   buildings = {
      "townHall"      : ["CÃ¢mara Municipal", "CÃ¢mara Municipal"],
      "academy"       : ["Academia", "Academia"],
      "port"          : ["Porto Mercantil", "Porto"],
      "shipyard"      : ["Estaleiro", "Estaleiro"],
      "warehouse"     : ["ArmazÃ©m", "ArmazÃ©m"],
      "wall"          : ["Muralha", "Muralha"],
      "tavern"        : ["Taberna", "Taberna"],
      "museum"        : ["Museu", "Museu"],
      "palace"        : ["PalÃ¡cio", "PalÃ¡cio"],
      "palaceColony"  : ["Residencia do Governador", "Governador"],
      "embassy"       : ["Embaixada", "Embaixada"],
      "branchOffice"  : ["Mercado", "Mercado"],
      "safehouse"     : ["Espionagem", "Espionagem"],
      "barracks"      : ["Quartel", "Quartel"],
      "workshop" : ["Oficina", "Oficina"],
 		"carpentering" : ["Carpintaria", "Carpintaria"],
			"forester" : ["Guarda Florestal", "Florestal"],
		  "stonemason" : ["Pedreiro", "Pedreiro"],
		"glassblowing" : ["FÃ¡brica de Vidro", "Vidro"],
		  "winegrower" : ["Viticultor", "Viticultor"],
		   "alchemist" : ["Torre do Alquimista", "Alquimista"],
		   "architect" : ["Atelier de Arquitectura", "Arquitectura"],
			"optician" : ["Oculista", "Oculista"],
			"vineyard" : ["Caves de Vinho", "Caves"],
		  "fireworker" : ["FÃ¡brica de Pirotecnia", "Pirotecnia"]
   };
    texts = {
      "cityName": "Cidades", "currentlyBuilding": "Em ConstruÃ§ao", "summary": "SumÃ¡rio:",
      "hide_settings": "Ocultar ConfiguraÃ§oes", "show_settings": "Ver ConfiguraÃ§oes",
  	  "Population": "PopulaÃ§Ã£o",
	  "finishedBuilding": "Finished building","Incomes":"Rendimento","Trading":"Trading",
 	  "Wood": "Madeira", "Wine": "Vinho", "Marble": "MÃ¡rmore", "Crystal": "Cristal", "Sulfur": "Enxofre"
  };
  } else if (language == "fr") { //French translation, thanks to Chirel
  langtype = "";
    buildings = {
      "townHall"      : ["HÃ´tel de ville", "HdV"],
      "academy"       : ["AcadÃ©mie", "Ac."],
      "port"          : ["Port commercial", "Port"],
      "shipyard"      : ["Chantier naval", "Chtr"],
      "warehouse"     : ["EntrepÃ´t", "Entp"],
      "wall"          : ["Mur d'enceinte", "Mur"],
      "tavern"        : ["Taverne", "Tvrn"],
      "museum"        : ["MusÃ©e", "MsÃ©"],
      "palace"        : ["Palais", "Plais"],
      "palaceColony"  : ["RÃ©sidence du Gouverneur", "RdG"],
      "embassy"       : ["Ambassade", "Amb."],
      "branchOffice"  : ["Comptoir", "Cptr"],
      "safehouse"     : ["Cachette", "Ccht"],
      "barracks"      : ["Caserne", "Csrn"],
      "workshop" 	  : ["Atelier", "Atlr"],
	   "carpentering" : ["Menuisier","Men."],
		   "forester" : ["Maison forestiÃ¨re","Frst"],
		 "stonemason" : ["Tailleur de pierres","Tail."],
	   "glassblowing" : ["Verrier","Vrr"],
			"winegrower" : ["Pressoir Ã  vin","Prsr"],
		   "alchemist" : ["Tour des alchimistes","Alch."],
		   "architect" : ["Bureau de l`architecte","Arch."],
			"optician" : ["Opticien","Opt."],
		  "vineyard" : ["Cave Ã  vin","Cave"],
		  "fireworker" : ["Zone de test des artificiers","Artf"]
    };
    texts = {
      "cityName": "Nom ville", "currentlyBuilding": "Construction en cours", "summary": "Total:",
      "hide_settings": "Cacher les options", "show_settings": "Voir les options",
	  "Population": "Population",
	  "finishedBuilding": "Construction terminÃ©e","Incomes":"Revenus","Trading":"Commerce",
	  "Wood": "Bois", "Wine": "Vin", "Marble": "Marbre", "Crystal": "Cristal", "Sulfur": "Soufre"
    };
  } else if ((language == "ae") || (language == "eg") || (language == "sa")) { //by wa7d beta server - kuwaitv@gmail.com
		langtype = "rf";
		buildings = {
		"townHall" : ["Ø§Ù„Ø¨Ù„Ø¯ÙŠØ©", "Ø§Ù„Ø¨Ù„Ø¯ÙŠØ©"],
		"academy" : ["Ø§Ù„Ø§ÙƒØ§Ø¯ÙŠÙ…ÙŠØ©", "Ø§Ù„Ø§ÙƒØ§Ø¯ÙŠÙ…ÙŠØ©"],
		"port" : ["Ø§Ù„Ù…Ø±ÙØ£", "Ø§Ù„Ù…Ø±ÙØ£"],
		"shipyard" : ["Ø­ÙˆØ¶ Ø§Ù„Ø³ÙÙ†", "Ø­ÙˆØ¶ Ø§Ù„Ø³ÙÙ†"],
		"warehouse" : ["Ø§Ù„Ù…Ø®Ø²Ù†", "Ø§Ù„Ù…Ø®Ø²Ù†"],
		"wall" : ["Ø§Ù„Ø³ÙˆØ±", "Ø§Ù„Ø³ÙˆØ±"],
		"tavern" : ["Ø§Ù„Ø§Ø³ØªØ±Ø§Ø­Ø©", "Ø§Ù„Ø§Ø³ØªØ±Ø§Ø­Ø©"],
		"museum" : ["Ø§Ù„Ù…ØªØ­Ù", "Ø§Ù„Ù…ØªØ­Ù"],
		"palace" : ["Ø§Ù„Ù‚ØµØ±", "Ø§Ù„Ù‚ØµØ±"],
		"palaceColony" : ["Ù‚Ø§Ø¦Ù… Ù…Ù‚Ø§Ù…", "Ù‚Ø§Ø¦Ù… Ù…Ù‚Ø§Ù…"],
		"embassy" : ["Ø§Ù„Ø³ÙØ§Ø±Ø©", "Ø§Ù„Ø³ÙØ§Ø±Ø©"],
		"branchOffice" : ["Ø§Ù„Ø³ÙˆÙ‚", "Ø§Ù„Ø³ÙˆÙ‚"],
		"safehouse" : ["Ø§Ù„Ù…Ø®Ø¨Ø£", "Ø§Ù„Ù…Ø®Ø¨Ø£"],
		"barracks" : ["Ø§Ù„Ø«ÙƒÙ†Ø©", "Ø§Ù„Ø«ÙƒÙ†Ø©"],
		"workshop" : ["Ø§Ù„Ù…Ø®ØªØ¨Ø±", "Ø§Ù„Ù…Ø®ØªØ¨Ø±"],
		"carpentering" : ["Ø§Ù„Ø­Ø·Ø§Ø¨", "Ø§Ù„Ø­Ø·Ø§Ø¨"],
		"forester" : ["Ø­Ø§Ø±Ø³ Ø§Ù„ØºØ§Ø¨Ø§Øª", "Ø­Ø§Ø±Ø³ Ø§Ù„ØºØ§Ø¨Ø§Øª"],
		"stonemason" : ["Ø§Ù„Ø­Ø¬Ø§Ø±", "Ø§Ù„Ø­Ø¬Ø§Ø±"],
		"glassblowing" : ["Ù†Ø§ÙØ® Ø§Ù„Ø²Ø¬Ø§Ø¬", "Ù†Ø§ÙØ® Ø§Ù„Ø²Ø¬Ø§Ø¬"],
		"winegrower" : ["Ù…Ø²Ø§Ø±Ø¹ Ø§Ù„Ø¹Ù†Ø¨", "Ù…Ø²Ø§Ø±Ø¹ Ø§Ù„Ø¹Ù†Ø¨"],
		"alchemist" : ["Ø§Ù„ÙƒÙŠÙ…Ø§Ø¦ÙŠ", "Ø§Ù„ÙƒÙŠÙ…Ø§Ø¦ÙŠ"],
		"architect" : ["Ø§Ù„Ù…Ø¹Ù…Ø§Ø±ÙŠ", "Ø§Ù„Ù…Ø¹Ù…Ø§Ø±ÙŠ"],
		"optician" : ["ØµØ§Ù†Ø¹ Ø§Ù„Ø¹Ø¯Ø³Ø§Øª", "ØµØ§Ù†Ø¹ Ø§Ù„Ø¹Ø¯Ø³Ø§Øª"],
		"vineyard" : ["Ù…Ø²Ø±Ø¹Ø© Ø§Ù„Ø¹Ù†Ø¨", "Ù…Ø²Ø±Ø¹Ø© Ø§Ù„Ø¹Ù†Ø¨"],
		"fireworker" : ["Ø¹Ø§Ù…Ù„ Ø§Ù„Ù†Ø§Ø±", "Ø¹Ø§Ù…Ù„ Ø§Ù„Ù†Ø§Ø±"]
		};
		texts = {
		"cityName": "Ø§Ù„Ù…Ø¯ÙŠÙ†Ø©", "currentlyBuilding": "Ø£Ø¹Ù…Ø§Ù„ Ø¨Ù†Ø§Ø¡", "summary": "Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠ:",
		"hide_settings": "Ø¥Ø®ÙØ§Ø¡ Ø§Ù„Ø®ÙŠØ§Ø±Ø§Øª", "show_settings": "Ø¥Ø¸Ù‡Ø§Ø± Ø§Ù„Ø®ÙŠØ§Ø±Ø§Øª",
		"Population": "Ø§Ù„Ø³ÙƒØ§Ù†",
	    "finishedBuilding": "Finished building","Incomes":"Incomes","Trading":"Trading",
		"Wood": "Ø§Ù„Ø®Ø´Ø¨", "Wine": "Ø§Ù„Ø¹Ù†Ø¨", "Marble": "Ø§Ù„Ø±Ø®Ø§Ù…", "Crystal": "Ø§Ù„Ø¨Ù„ÙˆØ±", "Sulfur": "Ø§Ù„ÙƒØ¨Ø±ÙŠØª"
		};
  } else if (language == 'hu') { // Thank Luzer
    langtype = ""; // Set "lf" for Rigth-to-Left languages, or leave blank
    buildings = {
      "townHall"      : ["VÃ¡roshÃ¡za", "VÃ¡roshÃ¡za"],
      "academy"       : ["AkadÃ©mia", "AkadÃ©mia"],
      "port"          : ["KikÃ¶tÅ‘", "KikÃ¶tÅ‘"],
      "shipyard"      : ["HajÃ³gyÃ¡r", "HajÃ³gyÃ¡r"],
      "warehouse"     : ["RaktÃ¡r", "RaktÃ¡r"],
      "wall"          : ["VÃ¡rosfal", "Fal"],
      "tavern"        : ["FogadÃ³", "FogadÃ³"],
      "museum"        : ["MÃºzeum", "MÃºzeum"],
      "palace"        : ["Palota", "Palota"],
      "palaceColony"  : ["HelytartÃ³", "HelytartÃ³"],
      "embassy"       : ["NagykÃ¶vetsÃ©g", "NagykÃ¶vetsÃ©g"],
      "branchOffice"  : ["KereskedÅ‘", "KereskedÅ‘"],
      "safehouse"     : ["Rejtekhely", "Rejtekhely"],
      "barracks"      : ["Barakk", "Barakk"],
      "workshop"		  : ["MÅ±hely", "MÅ±hely"],
		"carpentering" : ["Ãcsmester", "Ãcsmester"],
			"forester" : ["ErdÃ©sz", "ErdÃ©sz"],
		  "stonemason" : ["KÅ‘mÅ±ves", "KÅ‘mÅ±ves"],
		"glassblowing" : ["ÃœvegfÃºvÃ³", "ÃœvegfÃºvÃ³"],
		  "winegrower" : ["BortermelÅ‘", "BortermelÅ‘"],
		   "alchemist" : ["Alkimista", "Alkimista"],
		   "architect" : ["Ã‰pÃ­tÃ©sz", "Ã‰pÃ­tÃ©sz"],
			"optician" : ["Optikus", "Optikus"],
			"vineyard" : ["SzÅ‘lÅ‘prÃ©s", "SzÅ‘lÅ‘prÃ©s"],
		  "fireworker" : ["TÅ±zszerÃ©sz", "TÅ±zszerÃ©sz"]
    };
    texts = {
      "cityName": "VÃ¡ros neve", "currentlyBuilding": "Ã‰pÃ­tÃ©s alatt", "summary": "Ã–sszesen:",
      "hide_settings": "BeÃ¡llÃ­tÃ¡sok elrejtÃ©se", "show_settings": "BeÃ¡llÃ­tÃ¡sok megtekintÃ©se",
 	  "Population": "LakossÃ¡g",
	  "finishedBuilding": "Finished building","Incomes":"Incomes","Trading":"Trading",
 	  "Wood": "Ã‰pÃ­tÅ‘anyag", "Wine": "Bor", "Marble": "MÃ¡rvÃ¡ny", "Crystal": "KristÃ¡ly", "Sulfur": "KÃ©npor"
	};
	} else if (language == "ro") { //Romanian translation, thanks to Peta
	langtype = "";
	buildings = {
	"townHall" : ["Primarie", "Primarie"],
	"academy" : ["Academie", "Academie"],
	"port" : ["Port", "Port"],
	"shipyard" : ["Santier Naval", "S.Naval"],
	"warehouse" : ["Depozit", "Depozit"],
	"wall" : ["Zid", "Zid"],
	"tavern" : ["Taverna", "Taverna"],
	"museum" : ["Muzeu", "Muzeu"],
	"palace" : ["Palat", "Palat"],
	"palaceColony" : ["Resedinta Guvernatorului", "R.Guv."],
	"embassy" : ["Ambasada", "Ambasada"],
	"branchOffice" : ["Punct de negot", "Piata"],
	"safehouse" : ["Ascunzatoare", "Ascunzatoare"],
	"barracks" : ["Baraca", "Baraca"],
	"workshop" : ["Atelier", "Atelier"],
	"carpentering" : ["Dulgher", "Dulgher"],
	"forester" : ["Casa Padurarului", "Padurar"],
	"stonemason" : ["Cariera", "Cariera"],
	"glassblowing" : ["Sticlarie", "Sticlarie"],
	"winegrower" : ["Vinificator", "Vinificator"],
	"alchemist" : ["Turnul Alchimistului", "Alchimist"],
	"architect" : ["Biroul Arhitectului", "Architect"],
	"optician" : ["Optician", "Optician"],
	"vineyard" : ["Presa de Vin", "Presa Vin"],
	"fireworker" : ["Zona Pirotehnica de Test", "Poligon"]
	};
	texts = {
	"cityName": "Nume Oras", "currentlyBuilding": "In constructie", "summary": "Total:",
	"hide_settings": "Ascunde Setari", "show_settings": "Arata Setari",
	"Population": "Populatie",
	"finishedBuilding": "Constructie Finalizata","Incomes":"Economii","Trading":"Comert",
	"Wood": "Lemn", "Wine": "Vin", "Marble": "Marmura", "Crystal": "Cristal", "Sulfur": "Sulf"
	};
} else if (language == "cz") { //Czech translation , thank Tetraedron
	langtype = "";
	buildings = {
	"townHall" : ["Radnice", "Radnice"],
	"academy" : ["Akademie", "Akademie"],
	"port" : ["PÅ™Ã­stav", "PÅ™Ã­stav"],
	"shipyard" : ["LodÄ›nice", "LodÄ›nice"],
	"warehouse" : ["Sklad", "Sklad"],
	"wall" : ["Hradby", "Hradby"],
	"tavern" : ["Hopoda", "Hospoda"],
	"museum" : ["Muzeum", "Muzeum"],
	"palace" : ["PlalÃ¡c", "PlaÃ¡c"],
	"palaceColony" : ["GuvernÃ©r", "GuvernÃ©r"],
	"embassy" : ["AmbasÃ¡da", "AmbasÃ¡da"],
	"branchOffice" : ["TrÅ¾nice", "TrÅ¾nice"],
	"safehouse" : ["Ãškryt", "Ãškryt"],
	"barracks" : ["KasÃ¡rna", "KasÃ¡rna"],
	"workshop" : ["DÃ­lna", "DÃ­lna"],
	"carpentering" : ["TesaÅ™", "TesaÅ™"],
	"forester" : ["Pila", "Pila"],
	"stonemason" : ["KamenÃ­k", "KamenÃ­k"],
	"glassblowing" : ["SklÃ¡rna", "SklÃ¡rna"],
	"winegrower" : ["VinaÅ™stvÃ­", "VinaÅ™stvÃ­"],
	"alchemist" : ["Alchimista", "Alchimista"],
	"architect" : ["Architekt", "Architekt"],
	"optician" : ["Optik", "Optik"],
	"vineyard" : ["VinaÅ™skÃ½ lis", "VinaÅ™skÃ½ lis"],
	"fireworker" : ["PrachaÅ™", "PrachaÅ™"]
	};
	texts = {
	"cityName": "MÄ›sto", "currentlyBuilding": "StavÃ­ se", "summary": "Celkem:",
	"hide_settings": "SkrÃ½t nastavenÃ­", "show_settings": "UkÃ¡zat nastavenÃ­",
	"Population": "Populace",
	"finishedBuilding": "DokonÄenÃ© stavby","Incomes":"PÅ™Ã­jmy","Trading":"Obchod",
	"Wood": "DÅ™evo", "Wine": "VÃ­no", "Marble": "Mramor", "Crystal": "Sklo", "Sulfur": "SÃ­ra"
	}; 
} else if (language == "ru") { //russian translation by Mugivara
	langtype = "";
	buildings = {
	"townHall" : ["Ð Ð°Ñ‚ÑƒÑˆÐ°", "Ð Ð°Ñ‚ÑƒÑˆÐ°"],
	"academy" : ["ÐÐºÐ°Ð´ÐµÐ¼Ð¸Ñ", "ÐÐºÐ°Ð´ÐµÐ¼Ð¸Ñ"],
	"port" : ["Ð¢Ð¾Ñ€Ð³Ð¾Ð²Ñ‹Ð¹ Ð¿Ð¾Ñ€Ñ‚", "ÐŸÐ¾Ñ€Ñ‚"],
	"shipyard" : ["Ð’ÐµÑ€Ñ„ÑŒ", "Ð’ÐµÑ€Ñ„ÑŒ"],
	"warehouse" : ["Ð¡ÐºÐ»Ð°Ð´", "Ð¡ÐºÐ»Ð°Ð´"],
	"wall" : ["Ð¡Ñ‚ÐµÐ½Ð°", "Ð¡Ñ‚ÐµÐ½Ð°"],
	"tavern" : ["Ð¢Ð°Ð²ÐµÑ€Ð½Ð°", "Ð¢Ð°Ð²ÐµÑ€Ð½Ð°"],
	"museum" : ["ÐœÑƒÐ·ÐµÐ¹", "ÐœÑƒÐ·ÐµÐ¹"],
	"palace" : ["Ð”Ð²Ð¾Ñ€ÐµÑ†", "Ð”Ð²Ð¾Ñ€ÐµÑ†"],
	"palaceColony" : ["Ð ÐµÐ·Ð¸Ð´ÐµÐ½Ñ†Ð¸Ñ Ð³ÑƒÐ±ÐµÑ€Ð½Ð°Ñ‚Ð¾Ñ€Ð°", "Ð ÐµÐ·Ð¸Ð´ÐµÐ½Ñ†Ð¸Ñ"],
	"embassy" : ["ÐŸÐ¾ÑÐ¾Ð»ÑŒÑÑ‚Ð²Ð¾", "ÐŸÐ¾ÑÐ¾Ð»ÑŒÑÑ‚Ð²Ð¾"],
	"branchOffice" : ["Ð¢Ð¾Ñ€Ð³Ð¾Ð²Ñ‹Ð¹ Ð¿Ð¾ÑÑ‚", "ÐŸÐ¾ÑÑ‚"],
	"safehouse" : ["Ð£ÐºÑ€Ñ‹Ñ‚Ð¸Ðµ", "Ð£ÐºÑ€Ñ‹Ñ‚Ð¸Ðµ"],
	"barracks" : ["ÐšÐ°Ð·Ð°Ñ€Ð¼Ð°", "ÐšÐ°Ð·Ð°Ñ€Ð¼Ð°"],
	"workshop" : ["ÐœÐ°ÑÑ‚ÐµÑ€ÑÐºÐ°Ñ", "ÐœÐ°ÑÑ‚ÐµÑ€ÑÐºÐ°Ñ"],
	"carpentering" : ["ÐŸÐ»Ð¾Ñ‚Ð½Ð¸Ñ†ÐºÐ°Ñ Ð¼Ð°ÑÑ‚ÐµÑ€ÑÐºÐ°Ñ", "ÐŸÐ»Ð¾Ñ‚Ð½Ð¸Ðº"],
	"forester" : ["Ð¥Ð¸Ð¶Ð¸Ð½Ð° Ð»ÐµÐ½Ð¸Ñ‡ÐµÐ³Ð¾", "Ð›ÐµÑÐ½Ð¸Ñ‡Ð¸Ð¹"],
	"stonemason" : ["ÐšÐ°Ð¼ÐµÐ½Ð¾Ð»Ð¾Ð¼Ð½Ñ", "ÐšÐ°Ð¼ÐµÐ½Ð¾Ð»Ð¾Ð¼Ð½Ñ"],
	"glassblowing" : ["Ð¡Ñ‚ÐµÐºÐ»Ð¾Ð´ÑƒÐ²Ð½Ð°Ñ Ð¼Ð°ÑÑ‚ÐµÑ€ÑÐºÐ°Ñ", "Ð¡Ñ‚ÐµÐºÐ»Ð¾Ð´ÑƒÐ²"],
	"winegrower" : ["Ð’Ð¸Ð½Ð¾Ð´ÐµÐ»ÑŒÐ½Ñ", "Ð’Ð¸Ð½Ð¾Ð´ÐµÐ»ÑŒÐ½Ñ"],
	"alchemist" : ["Ð‘Ð°ÑˆÐ½Ñ Ð°Ð»Ñ…Ð¸Ð¼Ð¸ÐºÐ°", "ÐÐ»Ñ…Ð¸Ð¼Ð¸Ðº"],
	"architect" : ["Ð‘ÑŽÑ€Ð¾ Ð°Ñ€Ñ…Ð¸Ñ‚ÐµÐºÑ‚Ð¾Ñ€Ð°", "ÐÑ€Ñ…Ð¸Ñ‚ÐµÐºÑ‚Ð¾Ñ€"],
	"optician" : ["ÐžÐ¿Ñ‚Ð¸ÐºÐ°", "ÐžÐ¿Ñ‚Ð¸ÐºÐ°"],
	"vineyard" : ["Ð’Ð¸Ð½Ð½Ñ‹Ð¹ Ð¿Ð¾Ð³Ñ€ÐµÐ±", "ÐŸÐ¾Ð³Ñ€ÐµÐ±"],
	"fireworker" : ["ÐŸÐ¾Ð»Ð¸Ð³Ð¾Ð½ Ð¿Ð¸Ñ€Ð¾Ñ‚ÐµÑ…Ð½Ð¸ÐºÐ°", "ÐŸÐ¾Ð»Ð¸Ð³Ð¾Ð½"]
	};
	texts = {
	"cityName": "ÐÐ°Ð·Ð²Ð°Ð½Ð¸Ðµ Ð³Ð¾Ñ€Ð¾Ð´Ð°", "currentlyBuilding": "Ð¢ÐµÐºÑƒÑ‰ÐµÐµ ÑÑ‚Ñ€Ð¾Ð¸Ñ‚ÐµÐ»ÑŒÑÑ‚Ð²Ð¾", "summary": "Ð˜Ñ‚Ð¾Ð³Ð¾:",
	"hide_settings": "Ð¡ÐºÑ€Ñ‹Ñ‚ÑŒ Ð½Ð°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸", "show_settings": "ÐŸÐ¾ÐºÐ°Ð·Ð°Ñ‚ÑŒ	Ð½Ð°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸",
	"Population": "ÐÐ°ÑÐµÐ»ÐµÐ½Ð¸Ðµ",
	"finishedBuilding": "Ð¡Ñ‚Ñ€Ð¾Ð¸Ñ‚ÐµÐ»ÑŒÑÑ‚Ð²Ð¾ Ð·Ð°ÐºÐ¾Ð½Ñ‡ÐµÐ½Ð¾","Incomes":"Ð‘Ð°Ð»Ð°Ð½Ñ","Trading":"Ð¢Ð¾Ñ€Ð³Ð¾Ð²Ð»Ñ",
	"Wood": "Ð¡Ñ‚Ñ€Ð¾Ð¹Ð¼Ð°Ñ‚ÐµÑ€Ð¸Ð°Ð»Ñ‹", "Wine": "Ð’Ð¸Ð½Ð¾Ð³Ñ€Ð°Ð´", "Marble": "ÐœÑ€Ð°Ð¼Ð¾Ñ€",
	"Crystal": "Ð¥Ñ€ÑƒÑÑ‚Ð°Ð»ÑŒ", "Sulfur": "Ð¡ÐµÑ€Ð°"
	};
} else if (language == "nl") { //Dutch translation, thanks to cremers
	langtype = "";
	buildings = {
	"townHall" : ["Stadhuis", "Stadhuis"],
	"academy" : ["Academie", "Academie"],
	"port" : ["Handelshaven", "Haven"],
	"shipyard" : ["Scheepswerf", "Werf"],
	"warehouse" : ["Opslagplaats", "Opslagplaats"],
	"wall" : ["Stadsmuur", "Muur"],
	"tavern" : ["Taverne", "Taverne"],
	"museum" : ["Museum", "Museum"],
	"palace" : ["Paleis", "Paleis"],
	"palaceColony" : ["Gouverneurswoning", "Gouverneurswoning"],
	"embassy" : ["Ambassade", "Ambassade"],
	"branchOffice" : ["Handelspost", "Handelspost"],
	"safehouse" : ["Schuilplaats", "Schuilplaats"],
	"barracks" : ["Barakken", "Barakken"],
	"workshop" : ["Werkplaats", "Werkplaats"],
	"carpentering" : ["Timmerman", "Timmerman"],
	"forester" : ["Houthakkers Loge", "Houthakkers Loge"],
	"stonemason" : ["Steenhouwer", "Steenhouwer"],
	"glassblowing" : ["Glasblazer", "Glasblazer"],
	"winegrower" : ["Wijnboer", "Wijnboer"],
	"alchemist" : ["De Alchemie Toren", "De Alchemie Toren"],
	"architect" : ["Architectenbureau", "Architectenburea"],
	"optician" : ["Opticien", "Opticien"],
	"vineyard" : ["Wijnpers", "Wijnpers"],
	"fireworker" : ["Vuurwerk Opslag", "Vuurwerk Opslag"]
	};
	texts = {
	"cityName": "Stadsnaam", "currentlyBuilding": "Huidige constructie", "summary": "Opgeteld:",
	"hide_settings": "Verberg instellingen", "show_settings": "Instellingen",
	"Population": "Inwoners", "finishedBuilding": "Klaar","Incomes":"Inkomsten","Trading":"Handel",
	"Wood": "Hout", "Wine": "Wijn", "Marble": "Marmer", "Crystal": "Glas", "Sulfur": "Zwavel"
	}; 
} else if (language == "gr") { //greek translation, thanks to panospap
	langtype = "";
	buildings = {
	"townHall" : ["Î”Î·Î¼Î±ÏÏ‡ÎµÎ¯Î¿", "Î”Î·Î¼Î±ÏÏ‡ÎµÎ¯Î¿"],
	"academy" : ["Î‘ÎºÎ±Î´Î·Î¼Î¯Î±", "Î‘ÎºÎ±Î´Î·Î¼Î¯Î±"],
	"port" : ["Î•Î¼Ï€Î¿ÏÎ¹ÎºÏŒÏ‚ Î»Î¹Î¼Î­Î½Î±Ï‚", "Î•Î¼Ï€Î¿ÏÎ¹ÎºÏŒÏ‚ Î»Î¹Î¼Î­Î½Î±Ï‚"],
	"shipyard" : ["ÎÎ±Ï…Ï€Î·Î³ÎµÎ¯Î¿", "ÎÎ±Ï…Ï€Î·Î³ÎµÎ¯Î¿"],
	"warehouse" : ["Î‘Ï€Î¿Î¸Î®ÎºÎ· ÎµÎ¼Ï€Î¿ÏÎµÏ…Î¼Î¬Ï„Ï‰Î½", "Î‘Ï€Î¿Î¸Î®ÎºÎ·"],
	"wall" : ["Î¤ÎµÎ¯Ï‡Î· Ï„Î·Ï‚ Ï€ÏŒÎ»Î·Ï‚", "Î¤ÎµÎ¯Ï‡Î¿Ï‚"],
	"tavern" : ["Î¤Î±Î²Î­ÏÎ½Î±", "Î¤Î±Î²Î­ÏÎ½Î±"],
	"museum" : ["ÎœÎ¿Ï…ÏƒÎµÎ¯Î¿", "ÎœÎ¿Ï…ÏƒÎµÎ¯Î¿"],
	"palace" : ["Î Î±Î»Î¬Ï„Î¹", "Î Î±Î»Î¬Ï„Î¹"],
	"palaceColony" : ["Î— ÎšÎ±Ï„Î¿Î¹ÎºÎ¯Î± Ï„Î¿Ï… ÎšÏ…Î²ÎµÏÎ½Î®Ï„Î·", "ÎšÏ…Î²ÎµÏÎ½Î®Ï„Î·Ï‚"],
	"embassy" : ["Î ÏÎµÏƒÎ²ÎµÎ¯Î±", "Î ÏÎµÏƒÎ²ÎµÎ¯Î±"],
	"branchOffice" : ["Î˜Î­ÏƒÎ· ÎµÎ¼Ï€Î¿ÏÎ¹ÎºÏŽÎ½ ÏƒÏ…Î½Î±Î»Î»Î±Î³ÏŽÎ½", "Î•Î¼Ï€Î¿ÏÎ¹ÎºÎ­Ï‚ ÏƒÏ…Î½Î±Î»Î»Î±Î³Î­Ï‚"],
	"safehouse" : ["ÎšÏÎ·ÏƒÏ†ÏÎ³ÎµÏ„Î¿", "ÎšÏÎ·ÏƒÏ†ÏÎ³ÎµÏ„Î¿"],
	"barracks" : ["Î£Ï„ÏÎ±Ï„ÏŽÎ½ÎµÏ‚", "Î£Ï„ÏÎ±Ï„ÏŽÎ½ÎµÏ‚"],
	"workshop" : ["Î•ÏÎ³Î±ÏƒÏ„Î®ÏÎ¹Î¿", "Î•ÏÎ³Î±ÏƒÏ„Î®ÏÎ¹Î¿"],
	"carpentering" : ["ÎžÏ…Î»Î¿Ï…ÏÎ³ÏŒÏ‚", "ÎžÏ…Î»Î¿Ï…ÏÎ³ÏŒÏ‚"],
	"forester" : ["Î£Ï€Î¯Ï„Î¹ ÎžÏ…Î»Î¿ÎºÏŒÏ€Î¿Ï…", "ÎžÏ…Î»Î¿ÎºÏŒÏ€Î¿Ï‚"],
	"stonemason" : ["ÎšÏ„Î¯ÏÎ¹Î¿ Î›Î±Ï„Î¿Î¼ÎµÎ¯Î¿Ï…", "ÎšÏ„Î¯ÏÎ¹Î¿ Î›Î±Ï„Î¿Î¼ÎµÎ¯Î¿Ï…"],
	"glassblowing" : ["Î¥Î±Î»Î¿Ï…ÏÎ³ÎµÎ¯Î¿", "Î¥Î±Î»Î¿Ï…ÏÎ³ÎµÎ¯Î¿"],
	"winegrower" : ["Î‘Ï€Î¿ÏƒÏ„Î±ÎºÏ„Î®ÏÎ¹Î¿", "Î‘Ï€Î¿ÏƒÏ„Î±ÎºÏ„Î®ÏÎ¹Î¿"],
	"alchemist" : ["Î ÏÏÎ³Î¿Ï‚ Î‘Î»Ï‡Î·Î¼Î¹ÏƒÏ„Î®", "Î ÏÏÎ³Î¿Ï‚ Î‘Î»Ï‡Î·Î¼Î¹ÏƒÏ„Î®"],
	"architect" : ["Î‘ÏÏ‡Î¹Ï„ÎµÎºÏ„Î¿Î½Î¹ÎºÏŒ Î“ÏÎ±Ï†ÎµÎ¯Î¿", "Î‘ÏÏ‡Î¹Ï„Î­ÎºÏ„Î¿Î½Î±Ï‚"],
	"optician" : ["ÎŸÏ€Ï„Î¹ÎºÏŒÏ‚", "ÎŸÏ€Ï„Î¹ÎºÏŒÏ‚"],
	"vineyard" : ["Î Î¹ÎµÏƒÏ„Î®ÏÎ¹Î¿ Î£Ï„Î±Ï†Ï…Î»Î¹Î¿Ï", "Î Î¹ÎµÏƒÏ„Î®ÏÎ¹Î¿ Î£Ï„Î±Ï†Ï…Î»Î¹Î¿Ï"],
	"fireworker" : ["Î ÎµÏÎ¹Î¿Ï‡Î® Î”Î¿ÎºÎ¹Î¼ÏŽÎ½ Î Ï…ÏÎ¿Ï„ÎµÏ‡Î½Î·Î¼Î¬Ï„Ï‰Î½", "Î”Î¿ÎºÎ¹Î¼Î® Î Ï…ÏÎ¿Ï„ÎµÏ‡Î½Î·Î¼Î¬Ï„Ï‰Î½"]
	};
	texts = {
	"cityName": "ÎŒÎ½Î¿Î¼Î± Ï€ÏŒÎ»Î·Ï‚", "currentlyBuilding": "Î‘Ï…Ï„Î®Î½ Ï„Î·Î½ Ï€ÎµÏÎ¯Î¿Î´Î¿ Ï‡Ï„Î¯Î¶ÎµÏ„Îµ", "summary": "Î£ÏÎ½Î¿Î»Î¿:",
	"hide_settings": "ÎšÏÏÏˆÎµ ÏÏ…Î¸Î¼Î¯ÏƒÎµÎ¹Ï‚", "show_settings": "Î•Î¼Ï†Î¬Î½Î¹ÏƒÎµ ÏÏ…Î¸Î¼Î¯ÏƒÎµÎ¹Ï‚",
	"Population": "Î Î»Î·Î¸Ï…ÏƒÎ¼ÏŒÏ‚",
	"finishedBuilding": "Î¤ÎµÎ»ÎµÎ¹Ï‰Î¼Î­Î½Î¿ ÎºÏ„Î¯ÏÎ¹Î¿","Incomes":"Î•Î¹ÏƒÎ¿Î´Î®Î¼Î±Ï„Î±","Trading":"Î•Î¼Ï€ÏŒÏÎ¹Î¿",
	"Wood": "ÎžÏÎ»Î±", "Wine": "ÎšÏÎ±ÏƒÎ¯", "Marble": "ÎœÎ¬ÏÎ¼Î±ÏÎ¿", "Crystal": "ÎšÏÏÏƒÏ„Î±Î»Î»Î¿", "Sulfur": "Î˜ÎµÎ¯Î¿"
	};
  } else {
    langtype = ""; // Set "lf" for Rigth-to-Left languages, or leave blank
    buildings = {
      "townHall"      : ["Town Hall", "T. Hall"],
      "academy"       : ["Academy", "Academy"],
      "port"          : ["Trading Port", "Port"],
      "shipyard"      : ["Shipyard", "Shipyard"],
      "warehouse"     : ["Warehouse", "Warehouse"],
      "wall"          : ["Wall", "Wall"],
      "tavern"        : ["Tavern", "Tavern"],
      "museum"        : ["Museum", "Museum"],
      "palace"        : ["Palace", "Palace"],
      "palaceColony"  : ["Governor's Residence", "Governor"],
      "embassy"       : ["Embassy", "Embassy"],
      "branchOffice"  : ["Trading Post", "Trading"],
      "safehouse"     : ["Hideout", "Hideout"],
      "barracks"      : ["Barracks", "Barracks"],
      "workshop" 	  : ["Workshop", "Workshop"],
		"carpentering" : ["Carpenter", "Carpenter"],
			"forester" : ["Forester", "Forester"],
		  "stonemason" : ["Stone Mason", "Mason"],
		"glassblowing" : ["Glass Blowing", "Blowing"],
		  "winegrower" : ["Wine Grower", "Grower"],
		   "alchemist" : ["Alchemist", "Alchemist"],
		   "architect" : ["Architect", "Architect"],
			"optician" : ["Optician", "Optician"],
			"vineyard" : ["Vine Yard", "Yard"],
		  "fireworker" : ["Fireworker", "Fireworker"]
    };
    texts = {
      "cityName": "City name", "currentlyBuilding": "Currently building", "summary": "Summary:",
      "hide_settings": "Hide settings", "show_settings": "Show settings",
 	  "Population": "Population",
	  "finishedBuilding": "Finished building","Incomes":"Incomes","Trading":"Trading",
 	  "Wood": "Wood", "Wine": "Wine", "Marble": "Marble", "Crystal": "Crystal", "Sulfur": "Sulfur"
	};
  }
}
getLocalizedTexts();

//lots of code to get the city id. The code trys to find the city id no matter which "city dropdown view" the user has chosen.
var city_id = getIntValue(getNode_value("//option[@class='avatarCities coords' and @selected='selected']"), 0);
if (city_id == 0){
    city_id = getIntValue(getNode_value("//option[@class='avatarCities' and @selected='selected']"), 0);	
}
if (city_id == 0){
    city_id = getIntValue(getNode_value("//option[@class='avatarCities tradegood1' and @selected='selected']"), 0);
}

if (city_id == 0){
    city_id = getIntValue(getNode_value("//option[@class='avatarCities tradegood2' and @selected='selected']"), 0);
}

if (city_id == 0){
    city_id = getIntValue(getNode_value("//option[@class='avatarCities tradegood3' and @selected='selected']"), 0);
}
if (city_id == 0){
    city_id = getIntValue(getNode_value("//option[@class='avatarCities tradegood4' and @selected='selected']"), 0);
}
var current_city_id = city_id;

var city_name = getNodeValue("id('breadcrumbs')/*[@class='city']");
if (city_name != undefined)
	{
	var island_id = getNodeValue("id('breadcrumbs')//a[@class='island']");
	if ( island_id == undefined || island_id == 0 )
	    island_id = /\[[0-9:]+\]/.exec(getNode("id('breadcrumbs')//a[contains(@href,'view=island')]").innerHTML)[0];
	//window.status = 'Current main view coords : '+island_id + ' => ' + TrimIsland100(island_id);

	var city_idmainView = getNode_value("//option[@class='avatarCities coords' and text()='"+TrimIsland100(island_id)+" "+city_name+"']", 0);
	if (city_idmainView == 0){
	    city_idmainView = getNode_value("//option[@class='avatarCities' and text()='"+city_name+"']", 0);	
	}
	if (city_idmainView == 0){
	    city_idmainView = getNode_value("//option[@class='avatarCities tradegood1' and @selected='selected' and text()='"+city_name+"']", 0);	
	}
	if (city_idmainView == 0){
	    city_idmainView = getNode_value("//option[@class='avatarCities tradegood2' and @selected='selected' and text()='"+city_name+"']", 0);	
	}
	if (city_idmainView == 0){
	    city_idmainView = getNode_value("//option[@class='avatarCities tradegood3' and @selected='selected' and text()='"+city_name+"']", 0);	
	}
	if (city_idmainView == 0){
	    city_idmainView = getNode_value("//option[@class='avatarCities tradegood4' and @selected='selected' and text()='"+city_name+"']", 0);	
	}
	//window.status = 'Current main view city ID = '+city_idmainView;
	var city_positionmainView = -1;

	var a = getNode("//div[@id='breadcrumbs']/*[@class='island' and contains(text(), '[')]", "");
	if (a == null) {
	  a = getNode("//a[contains(@href, '?view=island')]/span[contains(text(), '[')]", "");
	  if (a != null) {
	    a = a.parentNode;
	  }
	}
	var city_coord = "";
	var island_id = "";
	if (a != null) {
	  if (/(\[[0-9:]+\])/.exec(a.innerHTML)) {
	    city_coord = RegExp.$1;
	    if (/[?&]id=([0-9]+)/.exec(a.href) != null) {
	      island_id = RegExp.$1;
	    }
	  }
	}
	if (island_id == "" && (/view=island&id=([0-9]+)/.exec(document.URL) != null)) { 
	  island_id = RegExp.$1;
	}
	}
else
	{
	city_idmainView = 0;
	city_name = '';
	city_coord = '';
	island_id = '';
	}
	
function getVar(varname, vardefault) {
  var res = GM_getValue(server+varname);
  if (res == undefined) {
    return vardefault;
  }
  return res;
}
function setVar(varname, varvalue) {
  GM_setValue(server+varname, varvalue);
}
function getCity(city_id) {
  city_id = "city_"+city_id;
  if (config[city_id] == undefined) {
    config[city_id] = new Resource();
  }
  return config[city_id];
}

function getCityTime(city_id)
	{
	var city = getCity(city_id);
	
	if (city.prodtime == undefined)
		{
		return 0;
		}
	else
		{
		return city.prodtime;
		}
	}

function getPath(node) {
  if (node == null || node == undefined) {
    return "/";
  }
  return getPath(node.parentNode) + "/" + node.nodeName + "["+node.id+"]";
}
function getNode(path) {
  var value = xpath(path);
  if (value.snapshotLength == 1) {
    return value.snapshotItem(0);
  }
  return null;
}
//get node's textContent
function getNodeValue(path, defaultValue) {
  var value = getNode(path);
  if (value != null) {
    return value.textContent;
  }
  return defaultValue;
}
//get node's value attribute
function getNode_value(path, defaultValue) {
  var value = getNode(path);
  if (value != null) {
    return value.value;
  }
  return defaultValue;
}
//get node's title attribute
function getNodeTitle(path, defaultValue) {
  var value = getNode(path);
  // Fix for v3
  if ((value != null) && (value.title != '')) {
    return value.title;
  } else return defaultValue;
}
//support negative value
function getIntValue(str, defaultValue) {
  var temp = ""+str;
  temp = temp.replace(/[^-0-9]+/g, "");
  temp = parseInt(temp);
  if (defaultValue != undefined && (temp == undefined || (""+temp == "NaN"))) {
    return defaultValue;
  }
  return temp;
}

function mynumberformat(num, alwaysShowSign) {
  var s = ""+num;
  if (num == undefined || s == "NaN") {
    return "-";
  }
  if (num == "?") {
    return num;
  }
  var negative = "";
  if (s.substring(0, 1) == "-") {
    negative = "-";
    s = s.substring(1);
  } else if (alwaysShowSign == true) {
    negative = "+";
  }
  var i = s.length-3;
  while (i > 0) {
    s = s.substring(0, i) + "." + s.substring(i);
    i -= 3;
  }
  return negative + s;
}

var _cachedDecimalPoint = undefined;
function getDecimalPoint() { //hack
  if (_cachedDecimalPoint == undefined) {
    _cachedDecimalPoint = new Number(1.5).toLocaleString().substring(1, 2);
    if (_cachedDecimalPoint == undefined || _cachedDecimalPoint == "") {
      _cachedDecimalPoint = ",";
    }
  }
  return _cachedDecimalPoint;
}
function floatFormat(num, fracdigits, alwaysShowSign) {
  var s = ""+num;
  if (num == "?") {
    return num;
  }
  var negative = "";
  if (s.substring(0, 1) == "-") {
    negative = "-";
    s = s.substring(1);
  } else if (alwaysShowSign == true) {
    negative = "+";
  }
  var p = s.indexOf(".");
  if (p >= 0) {
    var i = s.substring(0, p);
    var frac = s.substring(p + 1, p + 1 + fracdigits);
    while (frac.length < fracdigits) {
      frac += "0";
    }
    s = i + getDecimalPoint() + frac;
  }
  return negative + s;
}
function digProducedResources(res) {
        var scripts = document.getElementsByTagName("script");
		var found = false;
		for (var j = scripts.length-1; j >= 0; j--)
			{
			var nScript = scripts[j];
			var sCode = nScript.innerHTML;
			if (sCode.indexOf('getResourceCounter') > 0)
				{
				found = true;
				break;
				}
			}
        if (found == false)
			{
			window.status = 'script not found';
			return;
			}
      
        var aCodeLines = sCode.split(';');
        if (aCodeLines.length < 24)
			{
			window.status = 'bad script';
			return;
			}
			
        var sWood = aCodeLines[24].substring(aCodeLines[24].indexOf('(')+2,aCodeLines[24].indexOf(')')-1);
        var startResourcesDelta = /production: *([0-9.]+)/.exec(sWood);
        if (startResourcesDelta != null) {
          startResourcesDelta = Math.floor(parseFloat(RegExp.$1) * 3600);
        } else {
          startResourcesDelta = 0;
        }
        var sTradeGood = aCodeLines[27].substring(aCodeLines[27].indexOf('(')+2,aCodeLines[27].indexOf(')')-1);
        var startTradegoodDelta = /production: *([0-9.]+)/.exec(sTradeGood);
        if (startTradegoodDelta != null) {
          startTradegoodDelta = Math.floor(parseFloat(RegExp.$1) * 3600);
        } else {
          startTradegoodDelta = 0;
        }
      
        var sName = /valueElem: \"(.*?)\"/.exec(sTradeGood);
        var sTradeGoodName = sName[1];
      
        res.prodwood = startResourcesDelta;
        res.prodwine = 0;
        res.prodmarble = 0;
        res.prodglass = 0;
        res.prodsulfur = 0;
        res.prodtime = new Date().getTime(); 
        if (sTradeGoodName == "value_wine") {
          res.prodwine = startTradegoodDelta;
        } else if (sTradeGoodName == "value_marble") {
          res.prodmarble = startTradegoodDelta;
        } else if (sTradeGoodName == "value_crystal") {
          res.prodglass = startTradegoodDelta;
        } else if (sTradeGoodName == "value_sulfur") {
          res.prodsulfur = startTradegoodDelta;
        }
      }

function getCurrentResourceAmount(currenttime, startTime, startAmount, factPerHour) {
  var elapsedhours = (currenttime - startTime) / 1000.0 / 3600.0;
  return Math.max(0, Math.floor(startAmount + elapsedhours * factPerHour));
}
function realtimeFactDisplayF(tmp, noloop) {
  var currenttime = new Date().getTime();
  var counters = xpath("//font[contains(@id, 'myresourcecounter')]");
  for(var i=0; i < counters.snapshotLength; i++) {
    var c = counters.snapshotItem(i);
    if (c.color != "#ff0000") {
      var arr = c.getAttribute('counter').split(",");
      var startTime = arr[0];
      var startAmount = parseFloat(arr[1]);
      var factPerHour = parseFloat(arr[2]);
	  var maxAmount = arr[3];
	  
	  var currAmount = getCurrentResourceAmount(currenttime, startTime, startAmount, factPerHour);
	  
	  if ((maxAmount != '-') && (currAmount >= maxAmount))
		{
		c.innerHTML = mynumberformat(maxAmount);
		c.color = "#ff0000";
		}
	  else
		{
		c.innerHTML = mynumberformat(currAmount);
		}
    }
  }
  return (counters.snapshotLength > 0);
}
function createTooltipAttribute(tooltip, title, isFct) {
  if (tooltip == undefined || tooltip == "") {
    return "";
  }
  if (isFct == true)
	{
	html = tooltip;
	}
  else
	{
	  if (title == undefined || title == "") {
	  	  title = "";
	  }
	  else title = "<div class=TTTitle>"+title+"</div>";
	  var html = title+"<div class=TTContent>"+tooltip+"</div>";
	  html = "'"+html.replace(/'/g, "\\'")+"'";
	}
  return "onmouseover=\"Tip("+html+", ABOVE, true, BORDERWIDTH, 0, SHADOW, false, BGCOLOR, '');\"";
}
function createTooltip(content, tooltip, title) {
  if (tooltip == undefined || tooltip == "") {
    return content;
  }
  return "<font "+createTooltipAttribute(tooltip, title)+">"+content+"</font>";
}

function createResCounter(startTime, startAmount, factPerHour, showTooltip, maxAmount, tradeAmount)
	{
	  if (tradeAmount == undefined) tradeAmount = 0;
	  if ((maxAmount == undefined) || (maxAmount == '-'))
		{
		maxAmount = '-';
		}
	else
		{
		maxAmount = maxAmount - tradeAmount;
		}
	  intfactPerHour = Math.round(factPerHour);
	  var dailyFact = Math.round(24 * factPerHour);
	  var tooltip = "";
	  if ((showTooltip == true) && (dailyFact != 0))
		{
	    tooltip = mynumberformat(intfactPerHour, true)+" / h, "+mynumberformat(dailyFact, true)+" / d";
		}
	  var res;
	  if ((factPerHour != 0) && (startTime != undefined))
		{
		var counterClass = '';
		if ((factPerHour < 0) && (startAmount+(24*factPerHour) <= 0)) counterClass = 'EmptySoon';
	    res = "<font id='myresourcecounter' counter='"+startTime+","+startAmount+","+factPerHour+","+maxAmount+"' class='"+counterClass+"'>"+mynumberformat(startAmount)+"</font>";
	    if (intfactPerHour > 0)
			{
			res = "<b>"+res+"</b>";
			}
		}
	  else
		{
	    res = mynumberformat(startAmount);
		}
	  if (tooltip != '') res = createTooltip(res, tooltip);
	  return res;
	}
	
function createResProgressBar(startTime, startAmount, factPerHour, maxCapacity)
	{
	  var res = '';
	  if ((PROGRESS_BAR_MODE != "off") && (maxCapacity > 0) && (startTime != undefined))
		{
	    var curres = getCurrentResourceAmount(new Date().getTime(), startTime, startAmount, factPerHour);
	    var perc = Math.min(100, Math.round(curres / maxCapacity * 100.0));
	    var remaining = "";
	    var remhour = 100000000;
		if (curres >= maxCapacity)
			{
			// no more
			}
	    else if (factPerHour > 0) {
	      remhour = (maxCapacity - curres) / factPerHour;
	      remaining = "<br>"+floatFormat(remhour, 1) + " h to full";
	    } else if (factPerHour < 0) {
	      remaining = "<br>"+floatFormat(curres / -factPerHour, 1) + " h to empty";
	    }
	    var cl = "myPercentNormal";
	    if (PROGRESS_BAR_MODE == "percent") {
	      if (perc == 100) {
	        cl = "myPercentFull";
	      } else if (perc > 95) {

	        cl = "myPercentAlmostFull";
	      } else if (perc > 80) {
	        cl = "myPercentWarning";
	      }
	    } else if (PROGRESS_BAR_MODE == "time") {
	      if (remhour == 0) {
	        cl = "myPercentFull";
	      } else if (remhour < 8) {
	        cl = "myPercentAlmostFull";
	      } else if (remhour < 16) {
	        cl = "myPercentWarning";
	      }
	    }
	    res +=  "<table class='myPercent' "+createTooltipAttribute(mynumberformat(maxCapacity) + " total capacity<br>" + perc+"% full" + remaining)+">"+
	            "<tr>"+
	            "<td width='"+perc+"%' class='"+cl+"'></td>"+
	            "<td width='"+(100-perc)+"%'></td>"+
	            "</tr>"+
	            "</table>";
		}
	else if (PROGRESS_BAR_MODE != "off")
		{
	    res +=  "<table class='myPercent'>"+
	            "<tr>"+
	            "<td></td>"+
	            "</tr>"+
	            "</table>";
		}
	  return res;
	}
function createCounter(startTime, startAmount, factPerHour, showTooltip, maxCapacity, plusText) {
  intfactPerHour = Math.round(factPerHour);
  var dailyFact = Math.round(24 * factPerHour);
  var tooltip = "";
  if ((showTooltip == true) && (dailyFact != 0)) {
    tooltip = mynumberformat(intfactPerHour, true)+" / h, "+mynumberformat(dailyFact, true)+" / d";
  }
  var res;
  if (factPerHour != 0) {
    res = "<font id='myresourcecounter' counter='"+startTime+","+startAmount+","+factPerHour+"'>x</font>";
    if (intfactPerHour > 0) {
      res = "<b>"+res+"</b>";
    }
  } else {
    res = mynumberformat(startAmount);
  }
  if (plusText != undefined) {
    res += '<br>' + plusText;
  }
  res = createTooltip(res, tooltip);
  //progress bar :)
  if ((PROGRESS_BAR_MODE != "off") && (maxCapacity > 0)) {
    var curres = getCurrentResourceAmount(new Date().getTime(), startTime, startAmount, factPerHour);
    var perc = Math.min(100, Math.round(curres / maxCapacity * 100.0));
    var remaining = "";
    var remhour = 100000000;
    if (factPerHour > 0) {
      remhour = (maxCapacity - curres) / factPerHour;
      remaining = "<br>"+floatFormat(remhour, 1) + " h to full";
    } else if (factPerHour < 0) {
      remaining = "<br>"+floatFormat(curres / -factPerHour, 1) + " h to empty";
    }
    var cl = "myPercentNormal";
    if (PROGRESS_BAR_MODE == "percent") {
      if (perc == 100) {
        cl = "myPercentFull";
      } else if (perc > 95) {

        cl = "myPercentAlmostFull";
      } else if (perc > 80) {
        cl = "myPercentWarning";
      }
    } else if (PROGRESS_BAR_MODE == "time") {
      if (remhour == 0) {
        cl = "myPercentFull";
      } else if (remhour < 8) {
        cl = "myPercentAlmostFull";
      } else if (remhour < 16) {
        cl = "myPercentWarning";
      }
    } 
    res +=  "<table class='myPercent'>"+
            "<tr class='myPercent' "+createTooltipAttribute(mynumberformat(maxCapacity) + " total capacity<br>" + perc+"% full" + remaining)+">"+
            "<td width='"+perc+"%' class='"+cl+"'></td>"+
            "<td width='"+(100-perc)+"%' class='myPercentRemaining'></td>"+
            "</tr>"+
            "</table>";
  }
  return res;
}
function twodigit(val) {
  val = parseInt(val);
  if (val == 0)
	{
	val = "00";
	}
  else if (val < 10)
	{
    return "0"+val;
	}
  return val;
}
var nextTimemyTimeCounterF = undefined;
function myTimeCounterF(tmp, onlyOnce) {
  var currenttime = new Date().getTime();
  if (nextTimemyTimeCounterF == undefined) {
    nextTimemyTimeCounterF = Math.floor(currenttime/1000) * 1000 + 100;
  }
  var cs = xpath("//font[contains(@id, 'mytimecounter')]");
  for (var i = 0; i < cs.snapshotLength; i++) {
    var c = cs.snapshotItem(i);
    var abstime = Math.round(c.getAttribute('counter'));
    hdata = (abstime - currenttime) / 1000;
    if (hdata > 0) {
      var hday = Math.floor(hdata / 86400);
      var hhor = Math.floor((hdata - (hday * 86400)) / 3600);
      var hmin = Math.floor((hdata - (hday * 86400) - (hhor * 3600)) / 60);
      var hsec = Math.floor(hdata - (hday * 86400) - (hhor * 3600) - (hmin * 60));
      var s = "";
      var b = false;
      if (b || hday > 0) { s += hday+"d "; b = true; }
      b = true; 
      if (b || hhor > 0) { s += hhor+":"; b = true; }
      if (b || hmin > 0) { s += twodigit(hmin)+":"; b = true; }
      if (b || hsec > 0) { s += twodigit(hsec)+""; b = true; }
      c.innerHTML = s;
    } else {
      c.innerHTML = "-";
    }
  }
  var found = realtimeFactDisplayF(0, 1);
}
function createTimeCounter(enddate) {
  if (enddate != undefined && enddate != "") {
    var s = smartDateFormat(enddate);
    return createTooltip("<font id='mytimecounter' counter='"+enddate+"'></font>", s);
  }
  return "";
}
function createProd(prodPerHour, extraTooltip) {
  if (""+prodPerHour == "NaN" || ""+prodPerHour == "" || ""+prodPerHour == "0" || prodPerHour == undefined || ""+prodPerHour == "???") {
    return "";
  }
  var tooltip = mynumberformat(Math.round(24 * prodPerHour), true)+" / d";
  if (extraTooltip != undefined) {
    tooltip += ", "+extraTooltip;
  }
  return createTooltip(mynumberformat(Math.round(prodPerHour), true), tooltip);
}

function createMoreGoods(sum)
	{
	var output = '';
	if (sum > 0) 
		{
		output = '<font class="MoreGoods">'+mynumberformat(sum, true)+'</font>';
		}
 	return output;
	}
function serialize(txt) {
  return uneval(txt); //new version
}
function unserialize(txt){
  if (txt.substr(0,1) == "(") { //new version
    return eval(txt);
  }
  var level=0,arrlen=new Array(),del=0,final=new Array(),key=new Array(),save=txt;
  while(1){
    switch(txt.substr(0,1)){
    case 'N':
      del = 2;
      ret = null;
    break;
    case 'b':
      del = txt.indexOf(';')+1;
      ret = (txt.substring(2,del-1) == '1')?true:false;
    break;
    case 'i':
      del = txt.indexOf(';')+1;
      ret = Number(txt.substring(2,del-1));
    break;
    case 'd':
      del = txt.indexOf(';')+1;
      ret = Number(txt.substring(2,del-1));
    break;
    case 's':
      del = txt.substr(2,txt.substr(2).indexOf(':'));
      ret = txt.substr( 1+txt.indexOf('"'),del);
      del = txt.indexOf('"')+ 1 + ret.length + 2;
    break;
    case 'a':
      del = txt.indexOf(':{')+2;
      ret = new Object();
      arrlen[level+1] = Number(txt.substring(txt.indexOf(':')+1, del-2))*2;
    break;
    case 'O':
      txt = txt.substr(2);
      var tmp = txt.indexOf(':"')+2;
      var nlen = Number(txt.substring(0, txt.indexOf(':')));
      name = txt.substring(tmp, tmp+nlen );
      txt = txt.substring(tmp+nlen+2);
      del = txt.indexOf(':{')+2;
      ret = new Object();
      arrlen[level+1] = Number(txt.substring(0, del-2))*2;
    break;
    case '}':
      txt = txt.substr(1);
      if(arrlen[level] != 0){ return undefined;};
      level--;
    continue;
    default:
      if(level==0) return final;
      return undefined;
    }
    if(arrlen[level]%2 == 0){
      if(typeof(ret) == 'object'){return undefined;}
      if(ret == undefined){return undefined;}
      key[level] = ret;
    } else {
      var ev = '';
      for(var i=1;i<=level;i++){
        if(typeof(key[i]) == 'number'){
          ev += '['+key[i]+']';
        }else{
          ev += '["'+key[i]+'"]';
        }
      }
      eval('final'+ev+'= ret;');
    }
    arrlen[level]--;
    if(typeof(ret) == 'object') level++;
    txt = txt.substr(del);
    continue;
  }
}

function getArrValue(arr, key, defaultValue) {
  if (arr == undefined || arr[key] == undefined) {
    return defaultValue;
  }
  return arr[key];
}

function createLink(text, href, attrs) {
  return "<a href=\""+href+"\" "+attrs+">"+text+"</a>";
}

// From kChen script with some fixes
function changeCity(city_id) {
	var postdata = getFormInput("//form[@id='changeCityForm']//input");
    postdata = postdata + "&cityId="+city_id+"&view=city";
	var xmlhttp;
	if(window.XMLHttpRequest){
    	xmlhttp = new XMLHttpRequest();
	}
	xmlhttp.open('POST','http://' + location.host + '/index.php',false);
	xmlhttp.setRequestHeader('User-agent',window.navigator.userAgent);
	xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xmlhttp.setRequestHeader('Accept','application/atom+xml,application/xml,text/xml');
	xmlhttp.setRequestHeader('Referer','http://' + location.host + '/index.php');
	xmlhttp.setRequestHeader('Cookie',document.cookie);
	xmlhttp.overrideMimeType('text/javascript; charset='+document.characterSet);
	xmlhttp.send(postdata);
	var node = getDocument(xmlhttp.responseText);
	return node.getElementsByTagName("input")[2].value;
}
function getActionCode(root) {
  return $X("//form[@id='changeCityForm']//input[@type='hidden' and @name='actionRequest']" ,root).value;
}
function getDocument(responseText) {
   var html = document.createElement("html");
   html.innerHTML = responseText;
   var response = document.implementation.createDocument("", "", null);
   response.appendChild(html);
   return response;
}
function getFormInput(path, root, isaction) {
	isaction = (isaction == undefined) ? false : true;
	var nodes = $x(path, root);
	if (nodes.length<=0) return null;
	var postdata = nodes[0].name+"="+nodes[0].value;
    for(var i = 1; i < nodes.length; i++) {
    	if (nodes[i].name == "actionRequest" && !isaction) nodes[i].value = actioncode;
    	postdata = postdata +"&" + nodes[i].name+"="+nodes[i].value;
    }
    return postdata;
}
function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}
function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
		result.push( next );
      return result;
  }
}

function applyChangeCityEvents()
	{
	var nodes = $x("//table//a[contains(@class,'changeCity')]");
	for(var i=0; i<nodes.length; i++)
		{
		if (current_city_id != nodes[i].getAttribute("cityid"))
			nodes[i].addEventListener('click', changeCityEvent, false);
		}
	}
	
function changeCityEvent(e)
	{
	var obj = e.srcElement ? e.srcElement:e.target;
	obj.style.cursor="wait";
	while (obj.tagName != 'A')
		{
		obj = obj.parentNode;
		}
	var city_id = obj.getAttribute("cityid");
	actioncode = changeCity(city_id);
	}

function createLinkToMap(city_id) {
	var res = getCity(city_id);
	var rHTML = '';
	
	if (res.city_coord != undefined)
		{
		cCoord =  res.city_coord.split(":");
		rHTML += '<a href="?view=worldmap_iso&islandX='+getIntValue(cCoord[0],'')+'&islandY='+getIntValue(cCoord[1],'')+'" title="' + res.city_coord + ' View world map"><img align="absmiddle" src="skin/layout/icon-world.gif" /></a>'; 
		}
		
	if ((res.island_id != undefined) && (res.city_coord != undefined))
		{
		rHTML += '<a href="?view=island&id=' + res.island_id + '&selectCity='+city_id+'" title="' + res.city_coord + ' View island"><img align="absmiddle" src="skin/layout/icon-island.gif" /></a>'; 
		}
	else if (res.island_id != undefined)
		{
		rHTML += '<a href="?view=island&id=' + res.island_id + '&selectCity='+city_id+'" title="View island"><img align="absmiddle" src="skin/layout/icon-island.gif" /></a>'; 
		}
		
	return rHTML;
}

function createLinkToChangeCity(text, city_id, city_index, sup_text, sup_class, sup_title) {
	var res = getCity(city_id);
	var rHTML = '';
	
	if (res.city_name != undefined)
		{
		cName = res.city_name;
		}
	else
		{
		cName = Trim(text); 
		}
	if (current_city_id == city_id)
		{
		rHTML += '<b>'+cName+'</b>';
		}
	else
		{
		rHTML += createLink(cName, "?cityId="+city_id, "title=\"Change current city\" onclick=\"var s = document.getElementById('citySelect'); s.selectedIndex = "+city_index+"; s.form.submit(); return false;\"");
		}
	
	if ((sup_text != undefined) && (sup_text != '') && (sup_text != 0))
		{
		if (sup_class == undefined) sup_class = '';
		if (sup_title == undefined) sup_title = '';
		rHTML += '<sup class="'+sup_class+'" title="'+sup_title+'">'+sup_text+'</sup>';
		}
	
	return rHTML;
}

function reportViewToSurvey(view, city_id)
	{
	if (view == undefined) view = '';
	var report = false;
	
	if ((city_id == undefined) || (city_id <= 0))
		{
		if (view == 'finances')
			{
			if (config.financestime == undefined)
				{
				report = true;
				}
			else if (config.financestime == 0)
				{
				report = true;
				}
			else if (config.financestime <= (_startTime - 1000*60*60*12))
				{
				report = true;
				}
			}
		else if (view == 'merchantNavy')
			{
			if (config.merchantNavytime == undefined)
				{
				report = true;
				}
			else if (config.merchantNavytime == 0)
				{
				report = true;
				}
			else if (config.merchantNavytime <= (_startTime - 1000*60*60*4))
				{
				report = true;
				}
			}
		}
	else
		{
		var city = getCity(city_id);
		if (view == '')
			{
			if (city.prodtime == undefined)
				{
				report = true;
				}
			else if (city.prodtime == 0)
				{
				report = true;
				}
			else if (city.prodtime <= (_startTime - 1000*60*60*6))
				{
				report = true;
				}
			}
		else if (view == 'city')
			{
			if (city.citytime == undefined)
				{
				report = true;
				}
			else if (city.citytime == 0)
				{
				report = true;
				}
			else if (city.citytime <= (_startTime - 1000*60*60*24*6))
				{
				report = true;
				}
			}
		else if ((view == 'cityMilitary-army') || (view == 'barracks'))
			{
			var recentTime = city.cityMilitaryarmytime;
			if ((city.buildings['barracks'] != undefined) && (city.buildings['barracks'].uptime > recentTime)) recentTime = city.buildings['barracks'].uptime;
			
			if (recentTime == undefined)
				{
				report = true;
				}
			else if (recentTime == 0)
				{
				report = true;
				}
			else if (recentTime <= (_startTime - 1000*60*60*24*2))
				{
				report = true;
				}
			}
		else if ((view == 'cityMilitary-fleet') || (view == 'shipyard'))
			{
			var recentTime = city.cityMilitaryfleettime;
			if ((city.buildings['shipyard'] != undefined) && (city.buildings['shipyard'].uptime > recentTime)) recentTime = city.buildings['shipyard'].uptime;
			
			if (recentTime == undefined)
				{
				report = true;
				}
			else if (recentTime == 0)
				{
				report = true;
				}
			else if (recentTime <= (_startTime - 1000*60*60*24*2))
				{
				report = true;
				}
			}
			
		// Any buildings
		if (buildings[view] != undefined)
			{
			if (city.buildings[view] != undefined)
				{
				if (view == 'townHall')
					{
					if (city.buildings[view].uptime == undefined)
						{
						report = true;
						}
					else if (city.buildings[view].uptime == 0)
						{
						report = true;
						}
					else if (city.buildings[view].uptime <= (_startTime - 1000*60*60*24*6))
						{
						report = true;
						}
					}
				else if (view == 'tavern')
					{
					if (city.buildings[view].uptime == undefined)
						{
						report = true;
						}
					else if (city.buildings[view].uptime == 0)
						{
						report = true;
						}
					}
				}
			else
				{
				
				}
			}
		}
	
	return (report == true ? '!' : '');
	}

function createLinkToCityView(city_id) {
	var rHTML = '';
		
	rHTML += '<a href="?view=city&cityId='+city_id+'" class="changeCity" cityid="'+city_id+'" title="View city"><img align="absmiddle" src="skin/layout/icon-city2.gif" /></a>';
	if (reportViewToSurvey('city', city_id) == '!')
		rHTML += '<sup class=Red title="Require attention">!</sup>';
		
	return rHTML;
	}

function createLinkToMilitaryView(city_id) {
	var rHTML = '';
		
	rHTML += '<a href="?view=cityMilitary-army&id='+city_id+'" class="changeCity" cityid="'+city_id+'" title="View army overview"><img align="absmiddle" src="skin/img/city/building_barracks.gif" /></a>';
	if (reportViewToSurvey('cityMilitary-army', city_id) == '!')
		rHTML += '<sup class=Red title="Require attention">!</sup>';
	
	rHTML += '<a href="?view=cityMilitary-fleet&id='+city_id+'" class="changeCity" cityid="'+city_id+'" title="View fleet overview"><img align="absmiddle" src="skin/img/city/building_shipyard.gif" /></a>';
	if (reportViewToSurvey('cityMilitary-fleet', city_id) == '!')
		rHTML += '<sup class=Red title="Require attention">!</sup>';
	
	return rHTML;
	}
	
function createLinkToFinanceNavyViews() {
	var rHTML = '';
		
	rHTML += '<a href="?view=merchantNavy" title="View merchant navy"><img align="absmiddle" src="skin/img/city/building_port.gif" /></a>';
	if (reportViewToSurvey('merchantNavy') == '!')
		rHTML += '<sup class=Red title="Require attention">!</sup>';
	
	rHTML += '<a href="?view=finances" title="View finances"><img align="absmiddle" src="skin/img/city/building_townhall.gif" /></a>';
	if (reportViewToSurvey('finances') == '!')
		rHTML += '<sup class=Red title="Require attention">!</sup>';
	
	return rHTML;
	}

// kÃ©sako ?
function createLinkToForeignCity(text, city_id) {
  return createLink(text, "?view=island&id="+city_id);
}

function createLinkToResource(text, island_id, city_id, city_index) {
  if (island_id != undefined && island_id != "") {
    return createLink(text, "?action=header&function=changeCurrentCity&oldView=tradegood&view=resource&type=resource&id="+island_id+"&cityId="+city_id, "");
  }
  return text;
}
function createLinkToResourceCond(condition, text, island_id, city_id, city_index) {
  if (condition == true && island_id != undefined && island_id != "") {
    return createLink(text, "?view=resource&type=resource&id="+island_id, "class=changeCity cityid="+city_id);
  }
  return text;
}
function createLinkToTradegoodCond(condition, text, island_id, city_id, city_index) {
  if (condition == true && island_id != undefined && island_id != "") {
    return createLink(text, "?view=tradegood&type=tradegood&id="+island_id, "class=changeCity cityid="+city_id);
  }
  return text;
}
function strToDatetime(str) {
  var d;
  if (/([0-9][0-9][0-9][0-9])\.([0-9][0-9])\.([0-9][0-9])[^0-9]*([0-9]+)\:([0-9]+)\:([0-9]+)/.exec(str) != null) {
    d = new Date(RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6);
  } else if (/([0-9][0-9])\.([0-9][0-9])\.([0-9][0-9][0-9][0-9])[^0-9]*([0-9]+)\:([0-9]+)\:([0-9]+)/.exec(str) != null) {
    d = new Date(RegExp.$3, RegExp.$2, RegExp.$1, RegExp.$4, RegExp.$5, RegExp.$6);
  }
  if (d != undefined) {
    return d.getTime();
  }
  return undefined;
}

function dropUndeliveredLoadingGoods()
	{
	var arrivinggoods = getArrValue(config, 'arrivinggoods', []);
	var city_id;
	var i = 0;
	for (city_id in arrivinggoods)
		{
		var rows = getArrValue(arrivinggoods, city_id, []);
		var city = getCity(city_id);
		var key;
		for (key in rows)
			{
		    var row = rows[key];
			var quest = getArrValue(row, "quest", "");
			if (quest == 'loading')
				{
				if (delete config.arrivinggoods[city_id][key]) i++;
				continue;
				}
		    var arrivetime = parseInt(getArrValue(row, "arrivetime", 0));
			if (_startTime < arrivetime)
				{
				if (delete config.arrivinggoods[city_id][key]) i++;
				continue;
				}
			}
		}
	if (i > 0) window.status = 'Removed '+i+' undelivered/loading transports';
	}
	
function dropDeliveredGoods(city_id)
	{
	var rows = getArrValue(config.arrivinggoods, city_id, []);
	var city = getCity(city_id);
	var key;
	var i = 0;
	for (key in rows)
		{
	    var row = rows[key];
	    var arrivetime = parseInt(getArrValue(row, "arrivetime", 0));
		if (arrivetime <= city.prodtime)
			{
			if (delete config.arrivinggoods[city_id][key]) i++;
			}
		}
	if (i > 0) window.status = 'Removed '+i+' delivered transports';
	}

// Tooltip content
function getArrivingGoodsTTC(city_id, resName, tradinggoods)
	{
	tooltip = '<div class=TTTitle>Arrivals:</div>';
	
	return tooltip;
	}

function getArrivingGoodsSum(city_id, resName)
	{
	var sum = 0;
	var city = getCity(city_id);
	var rows = getArrValue(config.arrivinggoods, city_id, []);
	var key;
	for (key in rows)
		{
	    var row = rows[key];
	    var res = row["res"];
	    var a = getArrValue(res, resName, 0);
	    var arrivetime = parseInt(getArrValue(row, "arrivetime", ""));
		if ((a > 0) && (arrivetime > city.prodtime)) sum += a;
		}
	return sum;
	}
	
function getArrivingGoods(city_id, resName, tradinggoods, resAmount, sum) {
  var city = getCity(city_id);
  var tooltip = "<table class='arrivinggoodstooltip'>";
  var rows = getArrValue(config.arrivinggoods, city_id, []);
  var key;
  var found = false;
  if (sum == undefined) sum = getArrivingGoodsSum(city_id, resName);
  for (key in rows) {
    var row = rows[key];
    var res = row["res"];
    var a = getArrValue(res, resName, 0);
    var arrivetime = parseInt(getArrValue(row, "arrivetime", ""));
    if ((a > 0) && (arrivetime > city.prodtime)) {
      var startcity = getArrValue(row, "startcity", "");
      var quest = getArrValue(row, "quest", "");
	  if (_startTime >= arrivetime)
 		{
		var counter = "(delivered)";
		var smartDate = '';
		}
	  else if (quest == 'loading')
		{
		var counter = "(loading)";
		var smartDate = '';
		}
	  else
		{
		var counter = "(<font id='mytimecounter' counter='"+Math.round(arrivetime)+"'>__:__:__</font>)";
		var smartDate = smartDateFormat(arrivetime,false);
		}
     tooltip += "<tr>"+
 				 "<td>+</td>"+
                 "<td align=right><b>"+mynumberformat(a, false) + "</b>&nbsp;</td>"+
                 "<td align=left>&laquo;&nbsp;<i>" + startcity + "</i></td>"+
				 "</tr><tr>"+
                 "<td align=right colspan=3>&nbsp;&nbsp;" + smartDate + "&nbsp;"+counter+"</td>"+
                 "</tr>";
      found = true;
    }
  }
  
  if ((tradinggoods != undefined) && (parseInt(tradinggoods) > 0))
	{
	sum += parseInt(tradinggoods);
     tooltip += "<tr>"+
				 "<td>+</td>"+
                 "<td align=right><b>"+mynumberformat(parseInt(tradinggoods), false) + "</b>&nbsp;</td>"+
                 "<td align=left>&laquo;&nbsp;<i>" + buildings['branchOffice'][0] + "</i></td>"+
                 "</tr>";
	}
	
  if (sum > 0)
	{
	// refaire estimation en dynamic
	 if (resAmount == undefined) resAmount = getArrValue(city, resName, 0);
     tooltip += "<tr>"+
				 "<td>+</td>"+
                 "<td align=right><b>"+mynumberformat(resAmount, false) + "</b>&nbsp;</td>"+
                 "<td align=left>&laquo;&nbsp;<i>" + buildings['warehouse'][0] + "</i></td>"+
                 "</tr>";
     tooltip += "<tr>"+
				 "<td>=</td>"+
                 "<td align=right><b>"+mynumberformat(sum+resAmount, false) + "</b>&nbsp;</td>"+
                 "<td></td>"+
                 "</tr>";
	}
  
  tooltip += "</table>";
  var s = "<font class='tradinggoods'>-</font>";
  if (found == true) {
	s = "<font class='arrivinggoods' "+createTooltipAttribute(tooltip)+">"+mynumberformat(sum, true)+"</font>";
  }
  else if (sum > 0) {
	s = "<font class='tradinggoods' "+createTooltipAttribute(tooltip)+">"+mynumberformat(sum, true)+"</font>";
  }
  return s;
}
function getNextNode(node) {
  var n = node.nextSibling;
  while (n != undefined && n != null && n.nodeName == "#text") {
    n = n.nextSibling;
  }
  return n;
}
function getPreviousNode(node) {
  var n = node.previousSibling;
  while (n != undefined && n != null && n.nodeName == "#text") {
    n = n.previousSibling;
  }
  return n;
}

function getBuildingLink(city_id, name, defaultValue, position)
	{
	if (defaultValue == undefined) defaultValue = '';
	if (position == undefined) position = -1;
	var link = '';
	
	if (position == -1)
		{
		var city = getCity(city_id);
		link = getArrValue(city.buildings[name], "link", defaultValue);
		}
	else
		{
		// deprecated
		link = '?view='+name+'&id='+city_id+'&position='+position;
		}
	
	if (link == '') link = defaultValue;
	return link;
	}

// deprecated
function getBuildingPosition(city_id, name, defaultValue)
	{
	if (defaultValue == undefined) defaultValue = -1;
	var position = -1;
	var city = getCity(city_id);
	
	if ((city.buildings == undefined) || (city.buildings[name] == undefined))
		{
		
		}
	else if ((city.buildings[name].link != undefined) && (city.buildings[name].link != ''))
		{
		var link = city.buildings[name].link;
		position = parseInt(/position=([0-9]+)/.exec(link)[1]);
		}
	else if (city.buildings[name].position != undefined)
		{
		position = city.buildings[name].position;
		}
	
	if (position == -1) position = defaultValue;
	return position;
	}
	
function getCityBuildingsCount(city_id, defaultValue)
	{
	if (defaultValue == undefined) defaultValue = 0;
	var count = 0;
	var city = getCity(city_id);

	if (city.citytime != undefined)
		{
		for (name in city.buildings)
			{
			if (city.buildings[name].levels != undefined)
				{
				var p;
				for (p in city.buildings[name].levels)
					{
					count++;
					}
				}
			else if (city.buildings[name].level != undefined)
				{
				count++;
				}
			}
		}

	if (count == 0) count = defaultValue;
	return count;
	}
	
function getBuildingCount(city_id, name, defaultValue)
	{
	if (defaultValue == undefined) defaultValue = 0;
	var count = 0;
	var city = getCity(city_id);
	
	if ((city.buildings == undefined) || (city.buildings[name] == undefined))
		{
		
		}
	else if (city.buildings[name].levels != undefined)
		{
		var p;
		for (p in city.buildings[name].levels)
			{
			count++;
			}
		}
	else if (city.underConstructionName == name)
		{
		count = 1;
		}
	
	if (count == 0) count = defaultValue;
	return count;
	}
	
// Get level instead building upgrading is finished
function getBuildingLevel(city_id, name, defaultValue, position)
	{
	if (defaultValue == undefined) defaultValue = 0;
	if (position == undefined) position = -1;
	var level = 0;
	var city = getCity(city_id);
	
	if ((city.buildings == undefined) || (city.buildings[name] == undefined))
		{
		if (city.underConstructionName == name)
			{
			if (city.underConstructionTime <= _startTime) level++;
			}
		}
	else if (position == -1)
		{
		if (city.buildings[name].levels != undefined)
			{
			var p;
			for (p in city.buildings[name].levels)
				{
				level += city.buildings[name].levels[p];
				}
			}
		else
			{
			// deprecated
			level = getArrValue(city.buildings[name], "level", 0);
			}
		if (city.underConstructionName == name)
			{
			if (city.underConstructionTime <= _startTime) level++;
			}
		}
	else if (city.buildings[name].levels != undefined)
		{
		level = city.buildings[name].levels[position];
		// deprecated 
		if (level == undefined) level = getArrValue(city.buildings[name], "level", 0);
		if ((city.underConstructionName == name) && (city.underConstructionPosition == position))
			{
			if (city.underConstructionTime <= _startTime) level++;
			}
		}
		
	if (level == 0) level = defaultValue;
	return level;
	}

function getOnePeopleGrowthTime(happiness) {
  if (happiness != 0) {
    return 3600/0.02/happiness*1000;
  }
  return "NaN";
}
function getEstimatedPopulation(population, startTime, currenttime, startHappiness) {
  var happiness = startHappiness;
  startTime = Number(startTime);
  while (happiness > 0) {
    var t = getOnePeopleGrowthTime(happiness);
    if (t == "NaN" || startTime + t > currenttime) {
      break;
    }
    population++;
    happiness--;
    startTime += t;
  }
  return population;
}

function getGrowthRemainingHours(population, maxPopulation, startTime, happiness) {
  if (maxPopulation - population > happiness) {
    return "&#8734; h";
  }
  var time = Number(startTime);
  while (population < maxPopulation) {
    var t = getOnePeopleGrowthTime(happiness);
    if (t == "NaN") {
      return "&#8734; h";
    }
    time += t;
    population++;
    happiness--;
  }
  return floatFormat((time - Number(startTime)) / 1000 / 3600, 1) + " h";
}

function smartDateFormat(time, showElapsedTime, elapsedTimeSeparator) {
  if (showElapsedTime != true) {
    showElapsedTime = false;
  }
  if (elapsedTimeSeparator == undefined) {
    elapsedTimeSeparator = ",";
  }
  var s = new Date();
  s.setTime(time);
  var now = new Date();
  var t = "";
  if ((1+now.getDate()) == s.getDate() && now.getYear() == s.getYear() && now.getMonth() == s.getMonth()) {
    t = 'tomorrow ' + twodigit(s.getHours())+":"+twodigit(s.getMinutes());
  } else if (now.getYear() != s.getYear() || now.getMonth() != s.getMonth() || now.getDate() != s.getDate()) {
    t = s.toLocaleString();
  } else {
    t = twodigit(s.getHours())+":"+twodigit(s.getMinutes());
  }
  if (showElapsedTime) {
    t += elapsedTimeSeparator;
    var d = (now.getTime() - s.getTime()) / 1000;
    if (d < 3600) {
      t += " " + Math.floor(d / 60) + "m";
    } else {
      if (d >= 86400) {
        t += " " + Math.floor(d / 86400) + "d";
      }
      t += " " + floatFormat((d % 86400) / 3600, 1) + "h";
    }
  }
  return t;
}

function createLastUpdateAsTooltip(content, time)
	{
	if (time == undefined)
		{
		return content;
		}
	else
		{
		return createTooltip(content, "Last update: "+smartDateFormat(time, true));
		}
	}

function Resource() {
  this.wood = 0;
  this.wine = 0;
  this.marble = 0;
  this.glass = 0;
  this.sulfur = 0;
  this.underConstruction = "-";
  this.population = 0;
  this.buildings = {};
  this.units = {};
}

// Current selected city
//window.status = 'Current selected city ID = '+current_city_id;
if (current_city_id > 0)
	{
	var res = getCity(current_city_id);
	
	res.wood   = getIntValue(getNodeValue("id('value_wood')"));
	var wareNode = getNodeValue("//div[@id='cityResources']//li[@class='wood']/div[@class='tooltip']");
	if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)
		{
		res.tradewood = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));
		}
	else
		{
		res.tradewood = 0;
		}
	res.wine   = getIntValue(getNodeValue("id('value_wine')"));
	var wareNode = getNodeValue("//div[@id='cityResources']//li[@class='wine']/div[@class='tooltip']");
	if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)
		{
		res.tradewine = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));
		}
	else
		{
		res.tradewine = 0;
		}
	res.marble = getIntValue(getNodeValue("id('value_marble')"));
	var wareNode = getNodeValue("//div[@id='cityResources']//li[@class='marble']/div[@class='tooltip']");
	if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)
		{
		res.trademarble = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));
		}
	else
		{
		res.trademarble = 0;
		}
	res.glass  = getIntValue(getNodeValue("id('value_crystal')"));
	var wareNode = getNodeValue("//div[@id='cityResources']//li[@class='glass']/div[@class='tooltip']");
	if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)
		{
		res.tradeglass = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));
		}
	else
		{
		res.tradeglass = 0;
		}
	res.sulfur = getIntValue(getNodeValue("id('value_sulfur')"));
	var wareNode = getNodeValue("//div[@id='cityResources']//li[@class='sulfur']/div[@class='tooltip']");
	if (/: [0-9,.]+[^0-9]+: ([0-9,.]+)/.exec(wareNode) != null)
		{
		res.tradesulfur = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));
		}
	else
		{
		res.tradesulfur = 0;
		}
	
	digProducedResources(res);
	
	var inhabitantsNode = getNodeValue("//span[@id='value_inhabitants']");
	if (/([0-9,.]+) \(([0-9,.]+)\)/.exec(inhabitantsNode) != null) {
		cizReg = RegExp.$1;
		popReg = RegExp.$2;
		res.population = getIntValue(popReg);
		res.citizens = getIntValue(cizReg);
		} else { 
		res.population = 0;
		res.citizens = 0;
		}
		
	res.actions = getNodeValue("//span[@id='value_maxActionPoints']");
	
	dropDeliveredGoods(current_city_id);
	}

// If main view is a city
if (city_idmainView > 0) {
  var res = getCity(city_idmainView);
  if (city_name != "") {
    res.city_name = city_name;
  }
  if (city_coord != "") {
    res.city_coord = city_coord;
  }
  if (island_id != "") {
    res.island_id = island_id;
  }
  
  // Vue ville
  if (body_id == 'city')
	{
	// Add new buildings
	var nodes = xpath("//li[contains(@id, 'position')]/a[contains(@href, 'view=')]");
	for(var i = 0; i < nodes.snapshotLength; i++) {
	    var node = nodes.snapshotItem(i);
	    var li = node.parentNode;
	    
	    var name = li.getAttribute("class");
	    if (buildings[name] != undefined)
			{
			if (res.buildings[name] == undefined) {
				res.buildings[name] = {};
				}
			}
		else
			{
			if (res.buildings[name] != undefined) {
				// fix if demolish
				try
					{
					delete config[city_idmainView].buildings[name];
					}
				catch (e)
					{
					
					}
				}
			}
		}
	var res = getCity(city_idmainView);

	// Reset levels, links, and positions
	for (name in res.buildings)
		{
		try
			{
			delete config[city_idmainView].buildings[name].levels;
			}
		catch (e)
			{
			
			}
		}
	var res = getCity(city_idmainView);
	for (name in res.buildings)
		{
		res.buildings[name].position = -1;
		res.buildings[name].level = 0;
		res.buildings[name].levels = {};
		res.buildings[name].link = '';
		}
	  
	// Fetch levels & positions
	var nodes = xpath("//li[contains(@id, 'position')]/a[contains(@href, 'view=')]");
	for(var i = 0; i < nodes.snapshotLength; i++) {
	    var node = nodes.snapshotItem(i);
	    var li = node.parentNode;
	    
		// name
	    var name = li.getAttribute("class");
	  	if (buildings[name] != undefined)
			{
			var position = parseInt(/position=([0-9]+)/.exec(node.href)[1]);
			// deprecated
			res.buildings[name].position = position;
			
			// level
		    var level = "-";
		    if (/([0-9]+)/.exec(node.title) != null) {
				level = RegExp.$1;
				}
			// deprecated
			res.buildings[name].level = res.buildings[name].level + parseInt(level);
			res.buildings[name].levels[position] = parseInt(level);
					
			// link, will deprecated
			res.buildings[name].link = node.href;
			}
		}
	  
	// Nouvelle construction
	  var node = xpath("//div[@class='constructionSite']/following-sibling::a[contains(@href, 'view=')]");
	  if (node.snapshotLength >= 1) {
	    res.underConstruction = node.snapshotItem(0).title;
	    res.underConstructionName = node.snapshotItem(0).parentNode.getAttribute("class");
		res.underConstructionPosition = /position=([0-9]+)/.exec(node.snapshotItem(0).href)[1];
		// fetch time
	    var script = node.snapshotItem(0).parentNode.getElementsByTagName("script")[0];
	    if (script != undefined) {
	      var enddate = 0;
	      var currentdate = 0;
	      if (/enddate[^0-9]*([0-9]+)/.exec(script.innerHTML) != null) {
	        enddate = parseFloat(RegExp.$1) * 1000; 
	      }
	      if (/currentdate[^0-9]*([0-9]+)/.exec(script.innerHTML) != null) {
	        currentdate = parseFloat(RegExp.$1) * 1000; 
	      }
	      if (enddate != 0 && currentdate != 0) {
			res.underConstructionTime = enddate - currentdate + new Date().getTime();
	      }
	    }
	  } else {
	      res.underConstruction = "-";
	      res.underConstructionName = "";
	      res.underConstructionPosition = -1;
	      res.underConstructionTime = 0;
	  }
	  
	res.citytime = new Date().getTime();
	}
  
  //military-army and fleet unit counts
  if ((body_id == "cityMilitary-army") || (body_id == "cityMilitary-fleet")) {
    var idx = (body_id == "cityMilitary-fleet") ? 13 : 0;
    if (config["unitnames"] == undefined) {
      config["unitnames"] = {};
    }
    if (res.units == undefined) {
      res.units = {};
    }
    var names = xpath("//table/tbody/tr/th");
    var counts = xpath("//table/tbody/tr[@class='count']/td");
    if (names.snapshotLength == counts.snapshotLength) {
      for(var i = 0; i < names.snapshotLength; i++) {
        var n = names.snapshotItem(i).title;
        var unit_id = unitsAndShipsIndexesR[i + idx];
        config["unitnames"][unit_id] = n;
        var c = counts.snapshotItem(i);
        var cnt = getIntValue(c.innerHTML, 0);
        if (res.units[unit_id] == undefined) {
          res.units[unit_id] = {};
        }
        res.units[unit_id].count = cnt;
      }
    }
	
	if (body_id == "cityMilitary-army")
		{
		res.cityMilitaryarmytime = new Date().getTime();
		}
	else if (body_id == "cityMilitary-fleet")
		{
		res.cityMilitaryfleettime = new Date().getTime();
		}
  }
	
	// view is building
	if (buildings[body_id] != undefined)
		{
		
		if (res.buildings[body_id] == undefined) {
			res.buildings[body_id] = {};
			}
		
		// Fetch position
		var position = -1;
		var node = xpath("//*[@id='buildingUpgrade']//ul[@class='actions']//a[contains(@href, 'position=')]");
		if (node.snapshotLength == 0)
			{
			node = xpath("//*[@id='buildingUpgrade']//a[@class='cancelUpgrade']");
			}
		if (node.snapshotLength >= 1)
			{
			position = parseInt(/position=([0-9]+)/.exec(node.snapshotItem(0).href)[1]);
			}
		else if ((res.buildings[body_id].position != undefined) && (res.buildings[body_id].position != -1))
			{
			position = res.buildings[body_id].position;
			}
		else
			{
			var url_position = /[\?&]position=([a-zA-Z0-9\-_]+)/.exec(document.URL);
			if (url_position != null) position = parseInt(RegExp.$1);
			}
		city_positionmainView = position;
		// deprecated
		res.buildings[body_id].position = position;
		
		// Fetch level & detect upgrading
		var n = getNode("//*[@id='buildingUpgrade']//*[@class='buildingLevel']");
		if (n != null)
			{
			if (position != -1)
				{
				// Fetch level
				if (res.buildings[body_id].levels == undefined) res.buildings[body_id].levels = {};
				res.buildings[body_id].levels[position] = getIntValue(n.innerHTML,0);
				}
			
			// Ignorer ancien upgrade du batiment
			if (res.underConstructionPosition == undefined) res.underConstructionPosition = -1; // Deprecated
			if ((res.underConstructionName == body_id) && (res.underConstructionPosition == position))
				{
				res.underConstruction = '';
				res.underConstructionName = '';
				res.underConstructionTime = 0;
				res.underConstructionPosition = -1;
				}
			
			var script = n.parentNode.getElementsByTagName("script")[0];
			if (script != undefined)
				{
				// buildings under upgrading
				var enddate = 0;
				var currentdate = 0;
				if (/enddate[^0-9]*([0-9]+)/.exec(script.innerHTML) != null) {
					enddate = parseFloat(RegExp.$1) * 1000; 
					}
				if (/currentdate[^0-9]*([0-9]+)/.exec(script.innerHTML) != null) {
					currentdate = parseFloat(RegExp.$1) * 1000; 
					}
				if (enddate != 0 && currentdate != 0) {
					// First, apply previous upgrading of other building
					if (res.underConstructionName != '')
						{
						if ((res.buildings[res.underConstructionName].uptime != undefined) && (res.buildings[res.underConstructionName].uptime > res.underConstructionTime))
							{
							// Ignore
							}
						else if ((res.citytime != undefined) && (res.citytime > res.underConstructionTime))
							{
							// Ignore
							}
						else if ((res.buildings[res.underConstructionName].uptime != undefined) && (res.citytime != undefined))
							{
							if ((res.underConstructionPosition != undefined) && (res.underConstructionPosition != -1))
								{
								if (res.buildings[res.underConstructionName].levels == undefined) res.buildings[res.underConstructionName].levels = {};
								res.buildings[res.underConstructionName].levels[res.underConstructionPosition] = parseInt(res.buildings[res.underConstructionName].levels[res.underConstructionPosition])+1;
								}
							else
								{
								res.buildings[res.underConstructionName].level = parseInt(res.buildings[res.underConstructionName].level)+1;
								}
							}
						}
					
					// Define new upgrading
					res.underConstruction = buildings[body_id][0] + " level " + getIntValue(n.innerHTML,0);
					//res.underConstruction += ","+(enddate - currentdate + new Date().getTime());
					res.underConstructionName = body_id;
					res.underConstructionPosition = position;
					res.underConstructionTime = enddate - currentdate + new Date().getTime();
					}
				}
			else
				{
				// Not upgrading
				}
			}
		res.buildings[body_id].uptime = new Date().getTime();
		}
  
  //townhall population total and growth
  if (body_id == 'townHall') {
    res.population = Number(getNodeValue("//span[@class='value occupied']", "0"));
	res.buildings["townHall"].growth = Number(getNodeValue("//li[contains(@class, 'growth ')]/span[@class='value']", "0"));
    res.buildings["townHall"].bonusspace = Number(getNodeValue("//span[@class='value total']", "0")) - townHallSpaces[getArrValue(res.buildings["townHall"], "level",1)];
    res.buildings["townHall"].happiness  = Number(getNodeValue("//div[contains(@class, 'happiness ')]/div[@class='value']", "0")) + res.population;
    res.buildings["townHall"].incomegold  = Number(getNodeValue("//li[contains(@class, 'incomegold ')]/span[@class='value']", "0"));
	var raw_income = getIntValue(getNodeValue("//div[@class='citizens']/span[@class='production']", "0"),0);
	//window.status = 'Raw income = '+raw_income;
  }
  
  //military-army unit counts
  if ((body_id == "barracks") || (body_id == "shipyard")) {
    var idx = 0;
    if (body_id == "shipyard") {
      idx = 13;
    }
    if (config["unitnames"] == undefined) {
      config["unitnames"] = {};
    }
    if (config["unitpoints"] == undefined) {
      config["unitpoints"] = {};
    }
    if (res.units == undefined) {
      res.units = {};
    }
    var names = xpath("//ul[@id='units']/li[contains(@class, 'unit')]/div[@class='unitinfo']/h4");
    var counts = xpath("//ul[@id='units']/li[contains(@class, 'unit')]/div[@class='unitinfo']/div[@class='unitcount']");
    if (names.snapshotLength == counts.snapshotLength) {
      for(var i = 0; i < names.snapshotLength; i++) {
        var node = names.snapshotItem(i);
        var n = node.innerHTML;
        var cost;
        try {
          unit_id = node.parentNode.parentNode.getAttribute("class");
          cost = xpath("//ul[@id='units']/li[@class='"+unit_id+"']/div[@class='costs']/ul[@class='resources']/li");
        } catch (e) {
        }
        config["unitnames"][unit_id] = n;
        var c = counts.snapshotItem(i);
        var cnt = getIntValue(c.innerHTML.replace(/<.+>/g, ""), 0);
        if (res.units[unit_id] == undefined) {
          res.units[unit_id] = {};
        }
        res.units[unit_id].count = cnt;
        if (cost != undefined) {
          config["unitpoints"][unit_id] = 0;
          for(var j = 0; j < cost.snapshotLength; j++) {
            var c = cost.snapshotItem(j);
            var cl = c.getAttribute("class");
            if (unitScoreBasePoints[cl] != undefined) {
              config["unitpoints"][unit_id] += getIntValue(c.innerHTML) * unitScoreBasePoints[cl];
            }
          }
        }
      }
    }
  }

  if (body_id == "tavern") {
    function storeWineUsage() {
      try {
        var n = document.getElementById("wineAmount");
        var city_id = getNode_value("//form[@id='wineAssignForm']/input[@type='hidden' and @name='id']");
        var city = getCity(city_id);
        city.wineUsageId = n.selectedIndex;
        city.wineUsage = tavernWineUsage[n.selectedIndex] - getSavedWine();
        setVar("config", serialize(config));
      } catch (e) {
      }
    }
	// Fix for v3
    function getSavedWine() {
      try {
        var n = document.getElementById("savedWine");
		if ((n.innerHTML != '&nbsp;') && (Trim(n.innerHTML) != ''))
			{
			return Math.round(parseFloat(n.innerHTML));
			}
		else return 0;
       } catch (e) {
		return 0;
      }
   }
    var n = getNode("//form[@id='wineAssignForm']//*[@type='submit']");
    n.addEventListener("click", storeWineUsage, false);
    var n = document.getElementById("wineAmount");
	res.wineUsageId = n.selectedIndex;
    res.wineUsage = tavernWineUsage[n.selectedIndex] - getSavedWine();
  }
    
  // not finished, not usefull... may support army advisor view
  if (body_id == "port") {
	//config["arrivinggoods"][city_idmainView] = {};
		
	var res = xpath("//table[@class='table01']/tbody/tr");
	for(var i = 0; i < res.snapshotLength; i++) {
		{
		
		}
	}
 }
  
} else {

	if (body_id == "finances")
		{
		var citiesIDs = {};
		var res = xpath("//select[@id='citySelect']/option");
		for(var i = 0; i < res.snapshotLength; i++)
		  {
		  var n = res.snapshotItem(i);
		  var cName = Trim(n.innerHTML);
		  citiesIDs[cName] = parseInt(n.value);
		  }
		  
		var nodes = xpath("//table[@id='balance']//td[@class='city']");
		for (var i = 0; i < nodes.snapshotLength; i++)
			{
			var node = nodes.snapshotItem(i);
			var cName = Trim(node.innerHTML);
			var cID = citiesIDs[cName];
			
			var tr = node.parentNode;
			var tds = tr.getElementsByTagName("td");
			var incomegold = getIntValue(tds[3].innerHTML);
			
			var city = getCity(cID); 
			if (city.buildings["townHall"] == undefined) city.buildings["townHall"] = {};
			city.buildings["townHall"].incomegold  = incomegold;
			}
		
		config.financestime = new Date().getTime();
		}

	if (body_id == "merchantNavy")
		{
		if (config["arrivinggoods"] == undefined) config["arrivinggoods"] = new Object();

		dropUndeliveredLoadingGoods();

		var resETA = xpath("//table/tbody/tr/td[@class='eta']");
		if (resETA.snapshotLength > 0)
			{
			// Villes du joueur
			var citiesIDs = {};
			var res = xpath("//select[@id='citySelect']/option");
			for(var i = 0; i < res.snapshotLength; i++)
			  {
			  var n = res.snapshotItem(i);
			  var cName = Trim(n.innerHTML);
			  citiesIDs[cName] = n.value;
			  }
			
			// heures
			var mTimers = {};
			var scripts = document.getElementsByTagName("script");
			for (var j = 0; j < scripts.length; j++)
				{
				// search getCountdown
				var nScript = scripts[j];
				var sCode = nScript.innerHTML;
				if (sCode.indexOf('getCountdown') > 0)
					{
					var aCodeLines = sCode.split(';');
					for (var i=0; i < aCodeLines.length-1; i++)
						{
						var sValues = aCodeLines[i].substring(aCodeLines[i].indexOf('{')+1,aCodeLines[i].indexOf('}'));
						var sParts = sValues.split(',');
						var sID = sParts[2].substring(sParts[2].indexOf('"')+1,sParts[2].indexOf('"',sParts[2].indexOf('"')+2));
						var sPart0 = sParts[0].split(':');
						mTimers[sID] = 1000*parseInt(Trim(sPart0[1]));
						}
					}
				}
				
			// infos
			var resT = xpath("//table/tbody/tr/td[@class='target']/a[contains(@href, 'view=island')]");
			var resS = xpath("//table/tbody/tr/td[@class='source']/a[contains(@href, 'view=island')]");
			var resMi = xpath("//table/tbody/tr/td[contains(@class, 'mission')]");
			var resPL = xpath("//table/tbody/tr/td[@class='pulldown']//div[@class='payload']");
			var resAc = xpath("//table/tbody/tr/td[contains(@class, 'actions')]");
			for (var i = 0; i < resT.snapshotLength; i++)
				{
				var nT = resT.snapshotItem(i);
				var nS = resS.snapshotItem(i);
				var nMi = resMi.snapshotItem(i);
				var nETA = resETA.snapshotItem(i);
				var nAc = resAc.snapshotItem(i);
				var citySource;
				var cityTarget;
				var quest;
				if (nMi.className.indexOf('gotoown') > 0)
					{
					citySource = Trim(nS.innerHTML);
					cityTarget = citiesIDs[Trim(nT.innerHTML)];
					quest = 'gotoown';
					if (mTimers[nETA.id] == undefined)
						{
						mTimers[nETA.id] = _startTime + (1 * 60 * 60 * 1000);
						quest = 'loading';
						}
					else if (nAc.innerHTML == '')
						{
						citySource = Trim(nT.innerHTML);
						cityTarget = citiesIDs[Trim(nS.innerHTML)];
						quest = 'comeback';
						}
					}
				else if (nMi.className.indexOf('returning') > 0)
					{
					citySource = Trim(nT.innerHTML);
					cityTarget = citiesIDs[Trim(nS.innerHTML)];
					quest = 'returning';
					}
				else if (nMi.className.indexOf('gotoforeign') > 0)
					{
					citySource = Trim(nT.innerHTML);
					cityTarget = citiesIDs[Trim(nS.innerHTML)];
					quest = 'gotoforeign';
					if ((nAc.innerHTML == '') && (mTimers[nETA.id] == undefined))
						{
						mTimers[nETA.id] = _startTime + (1 * 60 * 60 * 1000);
						quest = 'loading';
						}
					else continue;
					}
				else continue;
				var nPL = resPL.snapshotItem(i);
				var plParts = nPL.innerHTML.split('img');
				
				if ((cityTarget != undefined) && (mTimers[nETA.id] != undefined) && (plParts.length > 1))
					{
					if (config["arrivinggoods"][cityTarget] == undefined) config["arrivinggoods"][cityTarget] = {};
					var idx = nETA.id;
					if (config["arrivinggoods"][cityTarget][idx] == undefined) config["arrivinggoods"][cityTarget][idx] = {};
					config["arrivinggoods"][cityTarget][idx]["startcity"] = citySource;
					if (config["arrivinggoods"][cityTarget][idx]["res"] == undefined) config["arrivinggoods"][cityTarget][idx]["res"] = {};
					for (var j = 1; j < plParts.length; j++)
						{
						var rKey = ''; 
						if (plParts[j].indexOf('wood') > 0)
							{
							rKey = 'wood';
							}
						else if (plParts[j].indexOf('wine') > 0)
							{
							rKey = 'wine';
							}
						else if (plParts[j].indexOf('marble') > 0)
							{
							rKey = 'marble';
							}
						else if (plParts[j].indexOf('glass') > 0)
							{
							rKey = 'glass';
							}
						else if (plParts[j].indexOf('sulfur') > 0)
							{
							rKey = 'sulfur';
							}
						if ((rKey != '') && (config["arrivinggoods"][cityTarget][idx]["res"][rKey] == undefined))
							{
							var rAmnt = getIntValue(plParts[j].substring(plParts[j].indexOf('title="')+7,plParts[j].indexOf('"',plParts[j].indexOf('title="')+8)));
							config["arrivinggoods"][cityTarget][idx]["res"][rKey] = rAmnt;
							}
						}
					config["arrivinggoods"][cityTarget][idx]["quest"] = quest;
					config["arrivinggoods"][cityTarget][idx]["arrivetime"] = parseInt(mTimers[nETA.id]);
					}
				}
			}
			
		config.merchantNavytime = new Date().getTime();
		//window.status = 'merchantNavytime='+config.merchantNavytime;
		}
		
		
  }


function phpserialize(txt) {
  switch(typeof(txt)){
  case 'string':
    txt = unUtf(txt); //for utf8 compatibility
    return 's:'+txt.length+':"'+txt+'";';
  case 'number':
    if(txt>=0 && String(txt).indexOf('.') == -1 && txt < 65536000000) return 'i:'+txt+';';
    return 'd:'+txt+';';
  case 'boolean':
    return 'b:'+( (txt)?'1':'0' )+';';
  case 'object':
    var i=0,k,ret='';
    for(k in txt){
      if(!isNaN(k)) k = Number(k);
      if (typeof(txt[k]) != 'function') {
        ret += phpserialize(k)+phpserialize(txt[k]);
        i++;
      }
    }
    return 'a:'+i+':{'+ret+'}';
  case 'function':
    return 'N;';
  default:
    txt = unUtf("has undefined type: "+txt);
    return 's:'+txt.length+':"'+txt+'";';
  }
}
function unUtf(str) {
  for(var i = str.length - 1; i >= 0; i--) {
    var ch = str.charCodeAt(i);
    if (ch > 255) {
      str = str.substring(0, i) + "&#" + ch + ";" + str.substring(i + 1);
    }
  }
  return str;
}
function urlencode(str) {
  str = escape(str);
  str = str.replace('+', '%2B');
  str = str.replace('%20', '+');
  str = str.replace('*', '%2A');
  str = str.replace('/', '%2F');
  str = str.replace('@', '%40');
  return str;
}
/**************************************************************************************************
 * Render tables
 *************************************************************************************************/
function renderTables() {
  setLanguage();
  getLocalizedTexts();
  var TABLE_RESOURCES = getCfgValue("TABLE_RESOURCES", true); //overview table for resources
  var TABLE_BUILDINGS = getCfgValue("TABLE_BUILDINGS", true); //overview table for buildings
  var TABLE_ARMYFLEET = getCfgValue("TABLE_ARMYFLEET", true); //overview table for army and fleet
  PROGRESS_BAR_MODE = getCfgValue("PROGRESS_BAR_MODE", "time"); //progress bar mode for resource counters
  GM_addStyle(getCfgValueNonEmpty("CSS", default_style));
  
  var nodes = xpath("//select[@id='citySelect']/option"); //cities
  var s = "";

  if (TABLE_RESOURCES) {
    s += "<table border=1 class='resources_table'>";
    s += "<tr>";
    s += "<th class='table_header city_name' nowrap>"+texts["cityName"]+"</th>"+
		 "<th class='table_header actions' nowrap>"+createLinkToFinanceNavyViews()+"</th>"+
         "<th colspan=3 class='lf table_header'>"+texts["Population"]+"</th>"+
         "<th colspan=2 class='lf table_header'>"+texts["Wood"]+"</th>"+
         "<th colspan=3 class='lf table_header'>"+texts["Wine"]+"</th>"+
         "<th colspan=2 class='lf table_header'>"+texts["Marble"]+"</th>"+
         "<th colspan=2 class='lf table_header'>"+texts["Crystal"]+"</th>"+
         "<th colspan=2 class='lf table_header'>"+texts["Sulfur"]+"</th>"+
         "<th colspan=1 class='lf table_header'>"+texts["Incomes"]+"</th>";
    s += "</tr>";
	
    var sumres = new Resource("");
	sumres.spacetotal = 0;
	sumres.growth = 0;
	sumres.Income = 0;
    var sumProd = new Resource("");
    sumProd.wineUsage = 0;
    var sumArTr = new Resource("");

    for(var i = 0; i < nodes.snapshotLength; i++) {
      var city = nodes.snapshotItem(i);
      var res = getCity(city.value);
	  var curres = new Resource("");
	  var arrres = new Resource('');
	  
      var wineUsage;
	  var cellarLevel = getBuildingLevel(city.value, "vineyard", "-");

	  if (res.wineUsageId != undefined)
		{
		wineUsage = tavernWineUsage[res.wineUsageId];
		if (cellarLevel != '-') {
			wineSave = wineUsage * cellarLevel;
			wineSave = Math.round(wineSave / 100);
			wineUsage = wineUsage - wineSave;
			//res.wineUsage = wineUsage ;
			}
		}
      else if (res.wineUsage != undefined) {
        wineUsage = res.wineUsage;
      } else {
	    // on devrait laisser vide, Ã  verifier...
        var tavernLevel = getBuildingLevel(city.value, "tavern", "-");
        wineUsage = (tavernLevel != '-' ? tavernWineUsage[tavernLevel] : 0);
		if (cellarLevel != '-') {
			wineSave = wineUsage * cellarLevel;
			wineSave = Math.round(wineSave / 100);
			wineUsage = wineUsage - wineSave;
			//res.wineUsage = wineUsage ;
			}
      }
	  
      curres.wood = getCurrentResourceAmount(_startTime, res.prodtime, res.wood, res.prodwood);
      curres.wine = getCurrentResourceAmount(_startTime, res.prodtime, res.wine, res.prodwine - wineUsage);
      curres.marble = getCurrentResourceAmount(_startTime, res.prodtime, res.marble, res.prodmarble);
      curres.glass = getCurrentResourceAmount(_startTime, res.prodtime, res.glass, res.prodglass);
      curres.sulfur = getCurrentResourceAmount(_startTime, res.prodtime, res.sulfur, res.prodsulfur);
	  
	  if (res.tradewood == undefined) res.tradewood = 0;
	  if (res.tradewine == undefined) res.tradewine = 0;
	  if (res.trademarble == undefined) res.trademarble = 0;
	  if (res.tradeglass == undefined) res.tradeglass = 0;
	  if (res.tradesulfur == undefined) res.tradesulfur = 0;
	  
	  arrres.wood = getArrivingGoodsSum(city.value, 'wood');
	  arrres.wine = getArrivingGoodsSum(city.value, 'wine');
	  arrres.marble = getArrivingGoodsSum(city.value, 'marble');
	  arrres.glass = getArrivingGoodsSum(city.value, 'glass');
	  arrres.sulfur = getArrivingGoodsSum(city.value, 'sulfur');
	  
      sumres.wood += curres.wood;
      sumres.wine += curres.wine;
      sumres.marble += curres.marble;
      sumres.glass += curres.glass;
      sumres.sulfur += curres.sulfur;
      
      sumProd.wood += res.prodwood;
      sumProd.wine += res.prodwine;
      sumProd.wineUsage += wineUsage;
      sumProd.marble += res.prodmarble;
      sumProd.glass += res.prodglass;
      sumProd.sulfur += res.prodsulfur;
	  
	  sumArTr.wood += res.tradewood + arrres.wood;
	  sumArTr.wine += res.tradewine + arrres.wine;
	  sumArTr.marble += res.trademarble + arrres.marble;
	  sumArTr.glass += res.tradeglass + arrres.glass;
	  sumArTr.sulfur += res.tradesulfur + arrres.sulfur;

	  var Income = getArrValue(res.buildings["townHall"],"incomegold","?");
	  if (Income != "?")
		{
		sumres.Income += Income;
		}

      var wineRemainingHours = undefined;
	  var wineUsageHtml = ''+wineUsage;
      if (wineUsage > 0)
		{
        wineRemainingHours = floatFormat(curres.wine / wineUsage, 1) + " h";
        wineUsageHtml = createProd(-1 * wineUsage, wineRemainingHours);
		}
	  
      var townHallLevel = getBuildingLevel(city.value, "townHall", "?");
      var happiness = getArrValue(res.buildings["townHall"], "happiness", "?");
      var population = res.population;
      var bonusspace = getArrValue(res.buildings["townHall"], "bonusspace", "?");
      var spacetotal = townHallSpaces[townHallLevel];
      if (happiness != "?") {
        population = getEstimatedPopulation(population, res.prodtime, _startTime, happiness - population);
        if (parseInt(population) > parseInt(spacetotal) + parseInt(bonusspace)) {
          population = parseInt(spacetotal) + parseInt(bonusspace);
        }
        happiness -= population;
      }
      sumres.population += population;
      
      var growthRemainingHours = undefined;
	  var growth = getArrValue(res.buildings["townHall"], "growth", "?");
      if (growth == '?') growth = happiness != "?" ? (0.02 * happiness) : "?";
	  if ((growth != '?') && (sumres.growth != '?'))
		{
		sumres.growth += growth;
		}
	  else
		{
		sumres.growth = '?';
		}
      if (happiness != "?" && happiness > 0 && bonusspace != "?") {
        growthRemainingHours = getGrowthRemainingHours(population, parseInt(spacetotal) + parseInt(bonusspace), _startTime, happiness);
      }
      var cs = "";
      var lfcs = "lf";
	  var isCurrentCity = false;
      if (parseInt(city_id) == parseInt(city.value)) {
        cs += " current_city_highlight";
        lfcs += " current_city_highlight";
		isCurrentCity = true;
      }
      var townHallStyle = "";
      if (parseInt(population) >= parseInt(spacetotal) + parseInt(bonusspace)) {
        townHallStyle = " populationfull";
      }
      if (bonusspace != "?") {
		if (sumres.spacetotal != '?') sumres.spacetotal += parseInt(spacetotal) + parseInt(bonusspace);
        //spacetotal = createTooltip(mynumberformat(parseInt(spacetotal) + parseInt(bonusspace)), mynumberformat(spacetotal) + " + " + mynumberformat(bonusspace));
        spacetotal = mynumberformat(parseInt(spacetotal) + parseInt(bonusspace));
      } else {
		sumres.spacetotal = '?';
        spacetotal = mynumberformat(spacetotal) + " + ?";
      }
	  
      var warehouseLevel = getBuildingLevel(city.value,"warehouse", '-', -1);
	  // Fix for v3
      var maxcwood = (warehouseLevel != '-') ? warehouseCapacities(warehouseLevel) + 3000 : '-';
      var maxcother = (warehouseLevel != '-') ? warehouseCapacities(warehouseLevel) + 1500 : '-';
	  
      s += "<tr>";
      s += "<td class='"+cs+" city_name' nowrap>"+createLinkToChangeCity(city.innerHTML, city.value, i, reportViewToSurvey('',city.value),'Red', 'Require attention')+"</td>"+
		   "<td class='"+cs+" actions' nowrap>"+createLinkToMap(city.value)+"</td>"+
           "<td class='"+lfcs+townHallStyle+"'>"+(population > 0 ? mynumberformat(population) : '?')+"</td>"+
               "<td class='"+cs+"'>"+spacetotal+"</td>"+
               "<td class='"+cs+"'>"+createTooltip(floatFormat(growth,2,true), growthRemainingHours)+"</td>"+
           "<td class='"+lfcs+"'>"+
							  createLinkToResourceCond(true, createResCounter(res.prodtime, res.wood, res.prodwood, false, maxcwood, res.tradewood), res.island_id, city.value, i)+
							  getArrivingGoods(city.value, "wood", res.tradewood, curres.wood, arrres.wood)+
							  createResProgressBar(res.prodtime, res.wood + arrres.wood, res.prodwood, maxcwood - res.tradewood)+
							  "</td>"+
               "<td class='"+cs+"'>"+createProd(res.prodwood)+"</td>"+
           "<td class='"+lfcs+"'>"+
							  createLinkToTradegoodCond(res.prodwine > 0, createResCounter(res.prodtime, res.wine, res.prodwine - wineUsage, res.prodwine > 0, maxcother, res.tradewine), res.island_id, city.value, i)+
							  getArrivingGoods(city.value, "wine", res.tradewine, curres.wine, arrres.wine)+
							  createResProgressBar(res.prodtime, res.wine + arrres.wine, res.prodwine - wineUsage, maxcother - res.tradewine)+
							  "</td>"+
               "<td class='"+cs+"'>"+createProd(res.prodwine)+"</td>"+
               "<td class='"+cs+"'>"+wineUsageHtml+"</td>"+
           "<td class='"+lfcs+"'>"+
							  createLinkToTradegoodCond(res.prodmarble > 0, createResCounter(res.prodtime, res.marble, res.prodmarble, false, maxcother, res.trademarble), res.island_id, city.value, i)+
							  getArrivingGoods(city.value, "marble", res.trademarble, curres.marble, arrres.marble)+
							  createResProgressBar(res.prodtime, res.marble + arrres.marble, res.prodmarble, maxcother - res.trademarble)+
							  "</td>"+
               "<td class='"+cs+"'>"+createProd(res.prodmarble)+"</td>"+
           "<td class='"+lfcs+"'>"+
							  createLinkToTradegoodCond(res.prodglass > 0, createResCounter(res.prodtime, res.glass, res.prodglass, false, maxcother, res.tradeglass), res.island_id, city.value, i)+
							  getArrivingGoods(city.value, "glass", res.tradeglass, curres.glass, arrres.glass)+
							  createResProgressBar(res.prodtime, res.glass + arrres.glass, res.prodglass, maxcother - res.tradeglass)+
							  "</td>"+
               "<td class='"+cs+"'>"+createProd(res.prodglass)+"</td>"+
           "<td class='"+lfcs+"'>"+
							  createLinkToTradegoodCond(res.prodsulfur > 0, createResCounter(res.prodtime, res.sulfur, res.prodsulfur, false, maxcother, res.tradesulfur), res.island_id, city.value, i)+
							  getArrivingGoods(city.value, "sulfur", res.tradesulfur, curres.sulfur, arrres.sulfur)+
							  createResProgressBar(res.prodtime, res.sulfur + arrres.sulfur, res.prodsulfur, maxcother - res.tradesulfur)+
							  "</td>"+
               "<td class='"+cs+"'>"+createProd(res.prodsulfur)+"</td>"+
           "<td class='"+lfcs+"'>"+createProd(Income)+"</td>";
      s += "</tr>";
    }
    s += "<tr>";
    s += "<td class='table_footer' nowrap colspan=2>"+texts["summary"]+"</td>"+
         "<td class='table_footer lf'>"+mynumberformat(sumres.population)+"</td>"+
         "<td class='table_footer'>"+mynumberformat(sumres.spacetotal)+"</td>"+
         "<td class='table_footer'>"+floatFormat(sumres.growth,2,true)+"</td>"+
         "<td class='table_footer lf'>"+
							createResCounter(_startTime, sumres.wood, sumProd.wood)+
							createMoreGoods(sumArTr.wood)+
							"</td>"+
         "<td class='table_footer'>"+createProd(sumProd.wood)+"</td>"+
         "<td class='table_footer lf'>"+
							createResCounter(_startTime, sumres.wine, sumProd.wine - sumProd.wineUsage, true)+
							createMoreGoods(sumArTr.wine)+
							"</td>"+
         "<td class='table_footer'>"+createProd(sumProd.wine)+"</td>"+
         "<td class='table_footer'>"+createProd(-1 * sumProd.wineUsage)+"</td>"+
         "<td class='table_footer lf'>"+
							createResCounter(_startTime, sumres.marble, sumProd.marble)+
							createMoreGoods(sumArTr.marble)+
							"</td>"+
         "<td class='table_footer'>"+createProd(sumProd.marble)+"</td>"+
         "<td class='table_footer lf'>"+
							createResCounter(_startTime, sumres.glass, sumProd.glass)+
							createMoreGoods(sumArTr.glass)+
							"</td>"+
         "<td class='table_footer'>"+createProd(sumProd.glass)+"</td>"+
         "<td class='table_footer lf'>"+
							createResCounter(_startTime, sumres.sulfur, sumProd.sulfur)+
							createMoreGoods(sumArTr.sulfur)+
							"</td>"+
         "<td class='table_footer'>"+createProd(sumProd.sulfur)+"</td>"+
         "<td class='table_footer lf'>"+createProd(sumres.Income)+"</td>";
    s += "</tr>";
    s += "</table>";
    s += "<p>(<span class=Red>!</span>) require your attention to update overview's data.</p>";
  }

  if (TABLE_BUILDINGS) 
	{
	var buildingsCount = [];
	for (var i = 0; i < nodes.snapshotLength; i++)
		{
		var city = nodes.snapshotItem(i);
		for (key in buildings)
			{
			var count = getBuildingCount(city.value, key, 0);
			if (buildingsCount[key] == undefined || buildingsCount[key] < count)
				{
				buildingsCount[key] = count;
				}
			}
		}

	s += "<table border=1 class='buildings_table'>";

	s += "<tr><th class='table_header city_name' nowrap>"+texts["cityName"]+"</th>";
	s += "<th class='table_header actions' nowrap></th>";
	var firstStyle = "lf";
	var buildsNum = 0;
	for (key in buildings) 
		{
		if (buildingsCount[key] > 0)
			{
			// Fix for v3
			var colspan = (buildingsCount[key] > 1) ? ' colspan='+buildingsCount[key] : '';
			s += "<th"+colspan+" class='"+firstStyle+" table_header build_name"+buildingsCount[key]+"' nowrap "+createTooltipAttribute(buildings[key][0])+">"+buildings[key][1]+"</th>";
			firstStyle = "";
			buildsNum++;
			}
		}
	if (buildsNum <= 1) s += "<th class='"+firstStyle+" table_header'></th><th class='table_header'></th><th class='table_header'></th><th class='table_header'></th><th class='table_header'></th><th class='table_header'></th>";
	s += "</tr>";

	for (var i = 0; i < nodes.snapshotLength; i++)
		{
		var city = nodes.snapshotItem(i);
		var res = getCity(city.value);

		s += "<tr>";
		var cs = (parseInt(city_id) == parseInt(city.value)) ? "current_city_highlight" : "";
		var usedspaces = getCityBuildingsCount(city.value, 0);
		s += "<td class='"+cs+" city_name' nowrap>"+createLinkToChangeCity(city.innerHTML, city.value, i, (usedspaces > 0) ? 15-usedspaces : '', 'Green', 'Available free spaces')+"</td>";
		s += "<td class='"+cs+" actions' nowrap>"+createLinkToCityView(city.value)+"</td>";
		var firstStyle = "lf";
		for (key in buildings)
			{
			if (buildingsCount[key] > 0)
				{
				var buildingCount = 0;
				if (res.buildings[key] != undefined)
					{
					if (res.buildings[key].levels == undefined)
						{
						res.buildings[key].levels = {};
						// deprecated
						var position = getBuildingPosition(parseInt(city.value), key, -1);
						var level = getBuildingLevel(parseInt(city.value), key, 0, position);
						res.buildings[key].levels[position] = level;
						}

					var position;
					for (position in res.buildings[key].levels)
						{
						//var position = getArrValue(res.buildings[key], "position", -1);
						//var position = getBuildingPosition(parseInt(city.value), key, -1);

						var currentBuildingStyle = "";
						if ((key == body_id) && (parseInt(city.value) == city_idmainView) && (position == city_positionmainView))
							{
							currentBuildingStyle = " current_building";
							}

						//var level = getArrValue(res.buildings[key], "level", "-");
						var level = getBuildingLevel(parseInt(city.value), key, '-', position);
						if (level == undefined || level == "" || level == 0)
							{
							level = "-";
							}

						var link = getBuildingLink(parseInt(city.value), key, '-', position);

						if ((res.underConstructionName == key) && (res.underConstructionPosition == position))
							{
							if (level == "-") { level = 0; }
							var underConstructionTime = res.underConstructionTime;
							// deprecated
							if (underConstructionTime == undefined)
								underConstructionTime = res.underConstruction.split(",")[1];
							var sdate = smartDateFormat(underConstructionTime);
							if (underConstructionTime <= _startTime)
								{
								levellink = level;
								if (link != "-")
									levellink = "<a href='" + link + "' class=changeCity cityid="+city.value+">"+level+"</a>";
								levelUpgrading = createTooltip(levellink, texts["finishedBuilding"]+':<br />' + sdate);
								}
							else
								{
								var counter = "<font id='mytimecounter' counter='"+Math.round(underConstructionTime)+"' class='time_counter'>__:__:__</font>";
								levellink =level+"&raquo;"+(level+1);
								if (link != "-")
									levellink = "<a href='" + link + "' class=changeCity cityid="+city.value+">"+level+"&raquo;"+(level+1)+"</a>";
								levellink += '<sup class=Red title="Require attention">!</sup>';
								levelUpgrading = createTooltip(levellink, texts["currentlyBuilding"]+':<br />' + sdate +' ('+ counter+')');
								}
							s += "<td class='"+cs+" "+firstStyle+currentBuildingStyle+" upgrading'>"+levelUpgrading+"</td>";
							}
						else
							{
							levellink =level;
							if (level != "-" && link != "-")
								levellink = "<a href='" + link + "' class=changeCity cityid="+city.value+">"+level+"</a>";
							if ((level != '-') && (reportViewToSurvey(key, city.value) == '!'))
								levellink += '<sup class=Red title="Require attention">!</sup>';
							s += "<td class='"+cs+" "+firstStyle+currentBuildingStyle+"'>"+levellink+"</td>";
							}
						buildingCount++;
						firstStyle = "lfd";
						}
					}
				else
					{
					s += "<td class='"+cs+" "+firstStyle+"'>-</td>";
					buildingCount++;
					firstStyle = "lfd";
					}

				if (buildingCount < buildingsCount[key])
					{
					for (var j = buildingCount; j < buildingsCount[key]; j++)
						{
						s += "<td class='"+cs+" "+firstStyle+"'>-</td>";
						firstStyle = "lfd";
						}
					}

				firstStyle = "";
				}
			}
		if (buildsNum <= 1) s += "<td class='"+cs+" "+firstStyle+"'></td><td class='"+cs+"'></td><td class='"+cs+"'></td><td class='"+cs+"'></td><td class='"+cs+"'></td><td class='"+cs+"'></td>";
		s += "</tr>";
		}
	s += "</table>";
    s += "<p>(<span class=Green>1-14</span>) available free spaces for new buildings.</p>";
	}


  if (TABLE_ARMYFLEET)
	{
	var usedIndexes = [];
	var usedIndexesCount = 0;
	if (config["unitnames"] != undefined)
		{
		var names = config["unitnames"];
		for(var i = 0; i < nodes.snapshotLength; i++)
			{
			var city = nodes.snapshotItem(i);
			var res = getCity(city.value);

			for(key in names)
				{
				if (parseInt(getArrValue(getArrValue(res.units, key), "count", 0)) > 0)
					{
					usedIndexes[key] = 1;
					usedIndexesCount++;
					}
				}
			}
		}

	s += "<table border=1 class='army_table'>";
	s += "<tr><th class='table_header city_name' nowrap>"+texts["cityName"]+"</th>";
	s += "<th class='table_header actions' nowrap></th>";
	if (usedIndexesCount > 0)
		{
		var firstStyle = "lf";
		for(key in names)
			{
			var name = names[key];
			if (usedIndexes[key] == 1) 
				{
				s += "<th class='"+firstStyle+" table_header unit_name' nowrap "+createTooltipAttribute(name)+">"+name+"</th>";
				firstStyle = "";
				}
			}
		}
	else s += "<th class='lf table_header'></th><th class='table_header'></th><th class='table_header'></th><th class='table_header'></th><th class='table_header'></th><th class='table_header'></th><th class='table_header'></th>";
	s += "</tr>";

	var sum = [];
	for(var i = 0; i < nodes.snapshotLength; i++) 
		{
		var city = nodes.snapshotItem(i);
		var res = getCity(city.value);

		s += "<tr>";
		var cs = (parseInt(city_id) == parseInt(city.value)) ? "current_city_highlight" : "";
		s += "<td class='"+cs+" city_name' nowrap>"+createLinkToChangeCity(city.innerHTML, city.value, i, res.actions, 'Green', 'Available action points')+"</td>";
		s += "<td class='"+cs+" actions' nowrap>"+createLinkToMilitaryView(city.value)+"</td>";
		if (usedIndexesCount > 0)
			{
			var firstStyle = "lf";
			for(key in names)
				{
				if (usedIndexes[key] == 1) {
					var level = getIntValue(getArrValue(getArrValue(res.units, key), "count", "0"), 0);
					if (level == 0)
						{
						level = "-";
						}
					else
						{
						sum[key] = (sum[key] == undefined) ? level : sum[key] + level;
						}
					s += "<td class='"+firstStyle+" "+cs+"'>"+mynumberformat(level)+"</td>";
					firstStyle = "";
					}
				}
			}
		else s += "<td class='lf "+cs+"'></td><td class='"+cs+"'></td><td class='"+cs+"'></td><td class='"+cs+"'></td><td class='"+cs+"'></td><td class='"+cs+"'></td><td class='"+cs+"'></td>";
		s += "</tr>";
		}
	s += "<tr>";
	s += "<td class='table_footer' colspan=2>"+texts["summary"]+"</td>";
	if (usedIndexesCount > 0)
		{
		var firstStyle = "lf";
		for(key in names)
			{
			if (usedIndexes[key] == 1)
				{
				s += "<td class='table_footer "+firstStyle+"'>"+mynumberformat(sum[key])+"</td>";
				firstStyle = "";
				}
			}
		}
	else s += "<td class='table_footer lf'></td><td class='table_footer'></td><td class='table_footer'></td><td class='table_footer'></td><td class='table_footer'></td><td class='table_footer'></td><td class='table_footer'></td>";
	s += "</tr>";
	s += "</table>";
    s += "<p>(<span class=Green>1-x</span>) available action points.</p>";
	}

  var body = getNode("//body");
  var table_mode = "new_table";
  var span = document.getElementById("overview__table");
  if (span == null) {
    span = document.createElement('div');
    span.id = "overview__table";
    span.align = "center";
	if (langtype == "rf")
		{
		span.setAttribute("dir", "rtl");
		span.setAttribute("class", "RtoL");
		}
    span.setAttribute("style", "clear: both;");
    span.innerHTML = s;
    body.appendChild(span);
  } else {
    span.innerHTML = s;
    table_mode = "refresh_table";
  }



  //settings table
    function reset_all_data() {
      var answer = confirm("Are you sure you want to delete ALL stored data?");
      if (answer) {
        setVar("config", "");
        setVar("players", "");
        window.location.href = window.location.href;
      }
    }
    function myChkEventHandler() {
      this.value = (this.value == '1' ? '0' : '1');
      config.cfg[this.lang] = (this.value == '1');
      setVar("config", serialize(config));
    }
    function myChgEventHandler() {
      config.cfg[this.lang] = this.value;
      setVar("config", serialize(config));
    }
    function createChk(propertyName, propertyValue) {
      var btn = document.createElement('input');
      btn.type = "checkbox";
      btn.lang = propertyName;
      btn.value = (propertyValue == true ? '1' : '0');
      if (propertyValue == true) {
        btn.checked = "checked";
      }
      btn.addEventListener('click', myChkEventHandler, false);
      return btn;
    }
    function createInp(propertyName, propertyValue) {
      var btn = document.createElement('input');
      btn.type = "text";
      btn.lang = propertyName;
      btn.value = propertyValue;
      btn.addEventListener('change', myChgEventHandler, false);
      return btn;
    }
    function createTxtr(propertyName, propertyValue, rows, cols) {
      var btn = document.createElement('textarea');
      btn.cols = (cols != undefined) ? cols : 50;
      btn.rows = (rows != undefined) ? rows : 15;
      btn.lang = propertyName;
      btn.value = propertyValue;
      btn.addEventListener('change', myChgEventHandler, false);
      return btn;
    }
    function createSlct(propertyName, propertyValue, items) {
      var btn = document.createElement('select');
      btn.lang = propertyName;
      for(key in items) {
        var o = document.createElement("option");
        o.value = key;
        o.text = items[key];
        btn.add(o, null);
      }
      btn.value = propertyValue;
      btn.addEventListener('change', myChgEventHandler, false);
      return btn;
    }
    function createRow(title, input) {
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      td.setAttribute("align", "left");
      td.setAttribute("style", "border-style: dotted; border-width: 1px;");
      td.innerHTML = title;
      tr.appendChild(td);
      var td = document.createElement('td');
      td.setAttribute("align", "left");
      td.setAttribute("style", "border-style: dotted; border-width: 1px;");
      td.appendChild(input);
      tr.appendChild(td);
      return tr;
    }
    function createRowChk(title, propertyName, propertyValue) {
      return createRow(title, createChk(propertyName, propertyValue));
    }
    function createRowInput(title, propertyName, propertyValue) {
      return createRow(title, createInp(propertyName, propertyValue));
    }
    function createRowTxtr(title, propertyName, propertyValue, rows, cols) {
      return createRow(title, createTxtr(propertyName, propertyValue, rows, cols));
    }
    function createRowSlct(title, propertyName, propertyValue, items) {
      return createRow(title, createSlct(propertyName, propertyValue, items));
    }

    var t = document.createElement('table');
    t.id = "table_settings";
    t.setAttribute("style", "display: none; border-style: dotted; border-width: 1px;");
    t.appendChild(createRowChk("Show resources table:", "TABLE_RESOURCES", TABLE_RESOURCES));
    t.appendChild(createRowChk("Show buildings table:", "TABLE_BUILDINGS", TABLE_BUILDINGS));
    t.appendChild(createRowChk("Show army and fleet table:", "TABLE_ARMYFLEET", TABLE_ARMYFLEET));
    t.appendChild(createRowSlct("Resource progress bar mode:", "PROGRESS_BAR_MODE", PROGRESS_BAR_MODE, {off: "off", time: "based on remaining time", percent: "based on fullness percentage"}));
    t.appendChild(createRowSlct("Language:", "LANGUAGE", language, {"": "Automatic from server name",ae: "Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©", en: "English", hu: "Magyar", de: "Deutsch", cz: "Czech", tr: "Turkish", es: "Espanol", ba: "Bosnian", it: "Italiano", pt: "Portuguese", fr: "FranÃ§ais", pl: "Polish", ro: "Romanian", gr: "Greek", cn: "Chinese", nl: "Dutch", cz: "Czech", vn: "Vietnamese", tw: "Chinese (traditional)"}));
    
    var tr = document.createElement('tr');
    t.appendChild(tr);
    var td = document.createElement('td');
    tr.appendChild(td);
    td.setAttribute("colspan", "2");
    var buttonsPanel = document.createElement('div');
    td.appendChild(buttonsPanel);
    
    //save button
    var n = document.createElement('input');
    n.type = "button";
    n.value = "Refresh table";
    n.setAttribute("class", "button");
    n.setAttribute("style", "display: inline !important;");
    n.addEventListener("click", renderTables, false);
    buttonsPanel.appendChild(n);

    //reset button
    var n = document.createElement('input');

    n.type = "button";
    n.value = "Reset all data";
    n.setAttribute("class", "button");
    n.setAttribute("style", "display: inline !important;");
    n.addEventListener("click", reset_all_data, false);
    buttonsPanel.appendChild(n);

    if (table_mode == "new_table") {
      //show / hide button
	  function show_hide_table() {
        var n = document.getElementById("table_settings");
        if (n.style.display == 'none') {
          n.style.display = 'table';
          this.value = texts["hide_settings"];
        } else {
          n.style.display = 'none';
          this.value = texts["show_settings"];
        }
      }
	  
      //now adds table
      span.appendChild(t);
	  
	  var p = document.createElement('p');
      p.setAttribute("class", "Footer");
	  
	  var n = document.createElement('span');
	  n.innerHTML = 'Powered by <a href="http://userscripts.org/scripts/show/41051" target="_blank"><b>Ikariam v3 Empire Board</b></a> <i>v. ' + scriptversion + '</i> ';
      p.appendChild(n);
	  
      var n = document.createElement('input');
      n.type = "button";
      n.value = texts["show_settings"];
      n.setAttribute("class", "button");
      n.addEventListener("click", show_hide_table, false);
      p.appendChild(n);
	  
	  // footer
	  span.appendChild(p);
    }
	
  myTimeCounterF(200, true); 
}

function Trim(str){ 
	str = str.replace("&nbsp;", " ");
	if (str.indexOf(']') > 0) { str = str.substring(str.indexOf(']')+1,str.length); }
	while(str.charAt(0) == (" ") ){ 
		str = str.substring(1);
	}
	while(str.charAt(str.length-1) == " " ){ 
		str = str.substring(0,str.length-1);
	}
return str;
}

function TrimIsland(str){
	var a = str.indexOf('[');
	var b = str.indexOf(']');
	str = str.substring(a,b+1);
	return str;
}

function TrimIsland100(str){
	var a = str.indexOf('[');
	var b = str.indexOf(']');
	str = str.substring(a+1,b);
	var coords = str.split(':');
	res = '[';
	res += twodigit(coords[0].substr(-2,2));
	res += ':';
	res += twodigit(coords[1].substr(-2,2));
	res += ']';
	return res;
}

if ((body_id != '') && (body_id != 'errorLoggedOut'))
	{
	// Fix for v3
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = "/js/wz_tooltip.js";
	var body = getNode("//body");
	body.appendChild(script);

	renderTables();
	
	applyChangeCityEvents();

	window.setInterval(myTimeCounterF, 1000);
	window.setTimeout(myTimeCounterF, 1000); 
	//myTimeCounterF();

	setVar("config", serialize(config));

	var _endTime = new Date().getTime();
	}
