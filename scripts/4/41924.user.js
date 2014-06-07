// coding: utf-8
// ==UserScript==
// @name          	Ikariam v3 Empire Board
// @namespace     miaouw.net
// @version	122
// @author		oliezekat
// @description    Display population, ressources, incomes, buildings, and units overviews for each cities. Require Ikariam v0.3.0 server game. Support any countries/languages.
//		
//                 It collects important information about your towns (population, amount of
//                 resources, gold incomes, building levels, buildings under construction), and displays it all
//                 in a table below your town.
//
//		This script automatically refreshes the page in Ikariam (every 5-10 minutes),
//                 and if there's a new message, or an attack, it warns you with a sound signal.
//		
//		Based on "Ikariam Alarm And Overview Table" script (for Ikariam v0.2.8)
//		http://userscripts.org/scripts/show/35995
//
// @include     http://*.ikariam.*/*
// @exclude    http://board.ikariam.*/*
// @exclude    http://*.ikariam.*/*?view=options
// ==/UserScript==

/**************************************************************************************************
LAST CHANGES:

Version 1.2.2:
- Remove ressources links if not current city (don't work)
- Remove happiness scores (not usefull and need space)
- Add buttons to city's world map or island view
- Fix while display resource view
- Fix productions per hour values
- Fix population growth values
- Add sums of max population and population growth
- Add daily incomes tooltip

OLD CHANGES:
http://userscripts.org/topics/20976

**************************************************************************************************/

var _startTime = new Date().getTime();
var scriptversion = "122";

//a szerver neve
var server = /\/\/([a-z._0-9]+)\//.exec(document.URL);
server = RegExp.$1;

var config = unserialize(getVar("config", ""));
if (config == null || config == undefined || config == "" || ("".config == "NaN")) {
  config = new Object();
}
if (config.cfg == undefined) {
  config.cfg = new Object();
}

var ALERT_SOUNDS = getCfgValue("ALERT_SOUNDS", false); //play sound when you are under attack, or you have undreaded message
var AUTO_REFRESH = getCfgValue("AUTO_REFRESH", false); //automatically refreshes browser window (useful when ALERT_SOUNDS is true)
var DEBUG_LOG    = getCfgValue("DEBUG_LOG", false); //log debug messages to console
var PROGRESS_BAR_MODE; //have to be a global variable

var time = new Date().getTime();
//log("time unserialize: "+(time - _startTime)+" msec");
/*
var players;
try {
  players = eval(getVar("players", "({})"));
} catch (e) {
  //log("Error while unserializing 'players': "+e);
  //log("Stored data: "+getVar("players", ""));
}
if (players == null || players == undefined || ("".players == "NaN")) {
  players = new Object();
}
if (players.cities == undefined) {
  players.cities = new Object();
}
if (players.playersCities == undefined) {
  players.playersCities = new Object();
}
if (players.islands == undefined) {
  players.islands = new Object();
}
*/
//log("time unserialize: "+(new Date().getTime() - time)+" msec");

//log("time-1: "+(new Date().getTime() - _startTime)+" msec");


/************************* DEFAULT STYLE **************************/
var default_style = <><![CDATA[
.resources_table, .buildings_table, .army_table, .players_table {
  text-align: center;
  border-style: double; border-width: 3px;border-color: #CB9B6A;
  //border-style: dotted;
  //border-width: 1px;
  //border-color: black;
  //background-color: #F6EBBC;
  width: 1000px !important;
  //border-collapse: collapse;
}
//.resources_table td, .buildings_table td, .army_table td, .players_table td { min-width: 10px; vertical-align: top;}
//.resources_table td, .buildings_table td, .army_table td {text-align: center; padding-right: 3px; padding-left: 3px}
.buildings_table .build_name { max-width: 20px; overflow: hidden; padding-left: 2px; }
//.army_table .unit_name {  max-width: 35px; overflow: hidden; padding-left: 2px;}
#overview__table .city_name { width: 130px; max-width: 250px; overflow: hidden; padding-left: 2px; text-align: left;}
#overview__table .city_name img { border: none; max-height: 15px;}
//#overview__table.RtoL .city_name { text-align: right; }
//#overview__table th {text-align: center !important; padding-left: 3px;}

tr.table_header {
  //height: 22px;
  //border-bottom: none !important;
  border-bottom: double;
  font-weight: bold;
  //background-color: #F6EBBC;
  background-color: #A8A92A;
  //border-color: #F6EBBC;
}
th.table_header {
  text-align: center;
  font-weight: bold;
  //background-image: url(/skin/layout/bg_sidebox_header.jpg);
  //background-repeat: no-repeat;
  //background-position: -4px -5px;
  //padding-bottom: 2px;
  //max-width: 250px;
}
tr.table_footer {
  //border-top-width: 2px;
  //border-top-style: solid;
  //border-color: #CB9B6A;
  border-top: double;
}
td.table_footer { /*also for army table's last column*/
  font-weight: bold;
  //background-color: #E8D8A8;
}
.lf {
  border-left: double;
  //border-color: #CB9B6A;
  border-color: #542C0F;
}
.time_counter {
  font-weight: bold;
  //color: #C00000;
  //color: yellow;
  color: #FFFF33;
}
.current_city_highlight {
  //background-color: #E0D0A0;
  background-color: #CDA55F;
}
#overview__table .upgrading, #overview__table .upgrading a {
  //color: #008000; 
  background-color: #22AAAA;
  font-weight: bold;
}
.arrivinggoods {
//color: #CB9B6A;
color: #ff0000;
font-size: 10px;
}
.arrivinggoodstooltip td {
  padding: 1px;
}

/****************** progress bar styles *******************/
table.myPercent {
  height: 4px;
  width: 100%;
  //background-color: #CB9B6A;
}
tr.myPercent {
  height: 4px;
}
td.myPercentRemaining {
//  background-color: #CDA55F;
}
td.myPercentNormal { /* normal state. you have plenty of rooms */
  background-color: green;
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

/****************** highscore styles *******************/
tr.hs_ownally {
  background-color: #DAF887 !important;
}
tr.hs_friendlyally {
  background-color: #FFFF80 !important;
}
tr.hs_hostileally {
  background-color: #FF979B !important;
}

/****************** population full *******************/
td.populationfull {
  color: red;
  font-weight: bold;
}

/****************** current building *******************/
th.current_building {
	background-color: #D2B1EB;
  color: white;
}
td.current_building {
}

/****************** tooltip *******************/
.TTContent {padding: 4px; background-color: #F1D7AD; border-color: #BE8D53; border-width: 1px; border-top-width: 4px; border-style: solid; color: #542C0F;}

]]></>.toXMLString();



var alertSound     = "http://simplythebest.net/sounds/WAV/events_WAV/event_WAV_files/alarm_3.wav";
var warningSound   = "http://www.ilovewavs.com/Effects/Beeps/FlyinOff.wav";
var WARNING_VOLUME = getCfgValue("WARNING_VOLUME", "50");   // "0" = silent "100" = full volume
var ALERT_VOLUME   = getCfgValue("ALERT_VOLUME", "100");   // "0" = silent "100" = full volume

var MIN = getCfgValue("AUTO_REFRESH_MIN_SECS", 300);  // seconds
var MAX = getCfgValue("AUTO_REFRESH_MAX_SECS", 600);  // seconds

function log(msg) {
  if ((config.cfg["DEBUG_LOG"] == true) && (console != undefined)) {
    console.log("[ikariam_overview] "+msg);
  }
}
function xpath(query) {
  return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function getCfgValue(key, defaultValue) {
  return ((config.cfg != undefined && config.cfg[key] != undefined) ? config.cfg[key] : defaultValue);
}
function getCfgValueNonEmpty(key, defaultValue) {
  return ((config.cfg != undefined && config.cfg[key] != undefined && config.cfg[key] != "") ? config.cfg[key] : defaultValue);
}
function playSound(sound, volume) {
  var body = document.getElementsByTagName("body")[0];
  var emb = document.createElement("embed");
  emb.src = sound;
  emb.setAttribute("autostart", "true");
  emb.setAttribute("loop", "false");
  emb.setAttribute("hidden", "true");
  emb.setAttribute("volume", volume);
  body.appendChild(emb);
}
function getRefreshTime() {
  return (parseInt(MIN) + Math.round(Math.random() * (MAX - MIN))) * 1000;
} 

if (ALERT_SOUNDS) {
  var resWarning = xpath("//a[contains(@class, 'normalactive')]");
  var resAlert = xpath("//a[contains(@class, 'normalalert')]");
  if (resAlert.snapshotLength > 0) {
    playSound(alertSound, ALERT_VOLUME);
  } else if (resWarning.snapshotLength > 0) {
    playSound(warningSound, WARNING_VOLUME);
  }
}

if (AUTO_REFRESH) {
  var timeID = setTimeout("location.href= document.URL", getRefreshTime());
}

////////////////////////////////////////////////////
//Kigy?jti a faluban lév? nyersi mennyiségét, és eltárolja. Majd az így eltárolt adatokat megjeleníti egy táblázatban.
////////////////////////////////////////////////////

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

//adott szintu kocsmaban legfeljebb ennyi bor szolgalhato fel orankent
var tavernWineUsage = [0, 4, 8, 13, 18, 24, 30, 37, 44, 51, 60, 68, 78, 88, 99, 110, 122, 136,150,165,180,197,216,235,255];
var townHallSpaces = [0, 60, 96, 142, 200, 262, 332, 410, 492, 580, 672, 768, 870, 976, 1086, 1200, 1320, 1440, 1566, 1696, 1828, 1964, 2102, 2246, 2390, 2540, 2691, 2845, 3003, 3163, 3326, 3492, 3660];
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
function getLocalizedTexts() {
	if (language == "de") { //german translation, thanks to Schneppi
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
      "palaceColony"  : ["Stadthaltersitz", "Stadthalt"],
      "embassy"       : ["Botschaft", "Botschaft"],
      "branchOffice"  : ["Kontor", "Kontor"],
      "safehouse"     : ["Versteck", "Versteck"],
      "barracks"      : ["Kaserne", "Kaserne"],
      "workshop" : ["Erfinderwerkstatt", "Erfinder"],
 		"carpentering" : ["Carpenter", "Carpenter"],
			"forester" : ["Forester", "Forester"],
		  "stonemason" : ["Stone Mason", "Stone Mason"],
		"glassblowing" : ["Glass Blowing", "Glass Blowing"],
		  "winegrower" : ["Wine Grower", "Wine Grower"],
		   "alchemist" : ["Alchemist", "Alchemist"],
		   "architect" : ["Architect", "Architect"],
			"optician" : ["Optician", "Optician"],
			"vineyard" : ["Vine Yard", "Vine Yard"],
		  "fireworker" : ["Fireworker", "Fireworker"]
   };
    texts = {
      "cityName": "Stadtname", "currentlyBuilding": "Zur Zeit im Bau", "summary": "Gesamt:",
      "hide_settings": "Hide settings", "show_settings": "Show settings",
 	  "Population": "Population",
	  "finishedBuilding": "Finished building","Incomes":"Incomes","Trading":"Trading",
 	  "Wood": "Wood", "Wine": "Wine", "Marble": "Marble", "Crystal": "Crystal", "Sulfur": "Sulfur"
   };
  } else if (language == "es") { //Spanish translation, thanks to dragondeluz
  langtype = "";
    buildings = {
      "townHall"      : ["Intendencia", "Intendencia"],
      "academy"       : ["Academia", "Academia"],
      "port"          : ["Puerto comercial", "Puerto"],
      "shipyard"      : ["Astillero", "Astillero"],
      "warehouse"     : ["Depósito", "Depósito"],
      "wall"          : ["Muro", "Muro"],
      "tavern"        : ["Taberna", "Taberna"],
      "museum"        : ["Museo", "Museo"],
      "palace"        : ["Palacio", "Palacio"],
      "palaceColony"  : ["Residencia del Gobernador", "R. Gobernador"],
      "embassy"       : ["Embajada", "Embajada"],
      "branchOffice"  : ["Tienda", "Tienda"],
      "safehouse"     : ["Escondite", "Escondite"],
      "barracks"      : ["Cuarteles", "Cuarteles"],
      "workshop" : ["Taller de Invenciones", "Taller"],
		"carpentering" : ["Carpenter", "Carpenter"],
			"forester" : ["Forester", "Forester"],
		  "stonemason" : ["Stone Mason", "Stone Mason"],
		"glassblowing" : ["Glass Blowing", "Glass Blowing"],
		  "winegrower" : ["Wine Grower", "Wine Grower"],
		   "alchemist" : ["Alchemist", "Alchemist"],
		   "architect" : ["Architect", "Architect"],
			"optician" : ["Optician", "Optician"],
			"vineyard" : ["Vine Yard", "Vine Yard"],
		  "fireworker" : ["Fireworker", "Fireworker"]
    };
    texts = {
      "cityName": "Nombre de la Ciudad", "currentlyBuilding": "Construcción Actual", "summary": "Totales:",
      "hide_settings": "Hide settings", "show_settings": "Show settings",
 	  "Population": "Population",
	  "finishedBuilding": "Finished building","Incomes":"Incomes","Trading":"Trading",
 	  "Wood": "Wood", "Wine": "Wine", "Marble": "Marble", "Crystal": "Crystal", "Sulfur": "Sulfur"
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
	"cityName": "Città", "currentlyBuilding": "Costruzione in corso", "summary": "Sommario:",
	"hide_settings": "Nascondi opzioni", "show_settings": "Mostra opzioni",
	"Population": "Popolazione",
	  "finishedBuilding": "Costruzione completata","Incomes":"Saldo oro","Trading":"Trading",
	"Wood": "Legno", "Wine": "Vino", "Marble": "Marmo", "Crystal": "Cristallo", "Sulfur": "Zolfo"
	};
  } else if (language == "pt") { //Portuguese translation, thanks to alpha tester
   langtype = "";
   buildings = {
      "townHall"      : ["Câmara Municipal", "Câmara Municipal"],
      "academy"       : ["Academia", "Academia"],
      "port"          : ["Porto Mercantil", "Porto Mercantil"],
      "shipyard"      : ["Estaleiro", "Estaleiro"],
      "warehouse"     : ["Armazém", "Armazém"],
      "wall"          : ["Muralha", "Muralha"],
      "tavern"        : ["Taberna", "Taberna"],
      "museum"        : ["Museu", "Museu"],
      "palace"        : ["Palácio", "Palácio"],
      "palaceColony"  : ["Residencia do Governador", "Residencia do Governador"],
      "embassy"       : ["Embaixada", "Embaixada"],
      "branchOffice"  : ["Mercado", "Mercado"],
      "safehouse"     : ["Espionagem", "Espionagem"],
      "barracks"      : ["Quartel", "Quartel"],
      "workshop" : ["Oficina", "Oficina"],
 		"carpentering" : ["Carpenter", "Carpenter"],
			"forester" : ["Forester", "Forester"],
		  "stonemason" : ["Stone Mason", "Stone Mason"],
		"glassblowing" : ["Glass Blowing", "Glass Blowing"],
		  "winegrower" : ["Wine Grower", "Wine Grower"],
		   "alchemist" : ["Alchemist", "Alchemist"],
		   "architect" : ["Architect", "Architect"],
			"optician" : ["Optician", "Optician"],
			"vineyard" : ["Vine Yard", "Vine Yard"],
		  "fireworker" : ["Fireworker", "Fireworker"]
   };
    texts = {
      "cityName": "Cidades", "currentlyBuilding": "Em Construçao", "summary": "Sumário:",
      "hide_settings": "Ocultar Configuraçoes", "show_settings": "Ver Configuraçoes",
  	  "Population": "Population",
	  "finishedBuilding": "Finished building","Incomes":"Incomes","Trading":"Trading",
 	  "Wood": "Wood", "Wine": "Wine", "Marble": "Marble", "Crystal": "Crystal", "Sulfur": "Sulfur"
  };
  } else if (language == "fr") { //French translation, thanks to Chirel
  langtype = "";
    buildings = {
      "townHall"      : ["Hôtel de ville", "HdV"],
      "academy"       : ["Académie", "Ac."],
      "port"          : ["Port commercial", "Port"],
      "shipyard"      : ["Chantier naval", "Chtr"],
      "warehouse"     : ["Entrepôt", "Entp"],
      "wall"          : ["Mur d'enceinte", "Mur"],
      "tavern"        : ["Taverne", "Tvrn"],
      "museum"        : ["Musée", "Msé"],
      "palace"        : ["Palais", "Plais"],
      "palaceColony"  : ["Résidence du Gouverneur", "RdG"],
      "embassy"       : ["Ambassade", "Amb."],
      "branchOffice"  : ["Comptoir", "Cptr"],
      "safehouse"     : ["Cachette", "Ccht"],
      "barracks"      : ["Caserne", "Csrn"],
      "workshop" 	  : ["Atelier", "Atlr"],
	   "carpentering" : ["Menuisier","Men."],
		   "forester" : ["Maison forestière","Frst"],
		 "stonemason" : ["Tailleur de pierres","Tail."],
	   "glassblowing" : ["Verrier","Vrr"],
			"winegrower" : ["Pressoir à vin","Prsr"],
		   "alchemist" : ["Tour des alchimistes","Alch."],
		   "architect" : ["Bureau de l`architecte","Arch."],
			"optician" : ["Opticien","Opt."],
		  "vineyard" : ["Cave à vin","Cave"],
		  "fireworker" : ["Zone de test des artificiers","Artf"]
    };
    texts = {
      "cityName": "Nom ville", "currentlyBuilding": "Construction en cours", "summary": "Total:",
      "hide_settings": "Cacher les options", "show_settings": "Voir les options",
	  "Population": "Population",
	  "finishedBuilding": "Construction terminée","Incomes":"Revenus","Trading":"Commerce",
	  "Wood": "Bois", "Wine": "Vin", "Marble": "Marbre", "Crystal": "Cristal", "Sulfur": "Soufre"
    };
  } else if ((language == "ae") || (language == "eg") || (language == "sa")) { //by wa7d beta server - kuwaitv@gmail.com
		langtype = "rf";
		buildings = {
		"townHall" : ["البلدية", "البلدية"],
		"academy" : ["الاكاديمية", "الاكاديمية"],
		"port" : ["المرفأ", "المرفأ"],
		"shipyard" : ["حوض السفن", "حوض السفن"],
		"warehouse" : ["المخزن", "المخزن"],
		"wall" : ["السور", "السور"],
		"tavern" : ["الاستراحة", "الاستراحة"],
		"museum" : ["المتحف", "المتحف"],
		"palace" : ["القصر", "القصر"],
		"palaceColony" : ["قائم مقام", "قائم مقام"],
		"embassy" : ["السفارة", "السفارة"],
		"branchOffice" : ["السوق", "السوق"],
		"safehouse" : ["المخبأ", "المخبأ"],
		"barracks" : ["الثكنة", "الثكنة"],
		"workshop" : ["المختبر", "المختبر"],
		"carpentering" : ["الحطاب", "الحطاب"],
		"forester" : ["حارس الغابات", "حارس الغابات"],
		"stonemason" : ["الحجار", "الحجار"],
		"glassblowing" : ["نافخ الزجاج", "نافخ الزجاج"],
		"winegrower" : ["مزارع العنب", "مزارع العنب"],
		"alchemist" : ["الكيمائي", "الكيمائي"],
		"architect" : ["المعماري", "المعماري"],
		"optician" : ["صانع العدسات", "صانع العدسات"],
		"vineyard" : ["مزرعة العنب", "مزرعة العنب"],
		"fireworker" : ["عامل النار", "عامل النار"]
		};
		texts = {
		"cityName": "المدينة", "currentlyBuilding": "أعمال بناء", "summary": "الإجمالي:",
		"hide_settings": "إخفاء الخيارات", "show_settings": "إظهار الخيارات",
		"Population": "السكان",
	    "finishedBuilding": "Finished building","Incomes":"Incomes","Trading":"Trading",
		"Wood": "الخشب", "Wine": "العنب", "Marble": "الرخام", "Crystal": "البلور", "Sulfur": "الكبريت"
		};
  } else {
    langtype = ""; // Set "lf" for Rigth-to-Left languages, or leave blank
    buildings = {
      "townHall"      : ["Városháza", "Városháza"],
      "academy"       : ["Akadémia", "Akadémia"],
      "port"          : ["Kikötő", "Kikötő"],
      "shipyard"      : ["Hajógyár", "Hajógyár"],
      "warehouse"     : ["Raktár", "Raktár"],
      "wall"          : ["Városfal", "Fal"],
      "tavern"        : ["Fogadó", "Fogadó"],
      "museum"        : ["Múzeum", "Múzeum"],
      "palace"        : ["Palota", "Palota"],
      "palaceColony"  : ["Helytartó", "Helytartó"],
      "embassy"       : ["Nagykövetség", "Nagykövetség"],
      "branchOffice"  : ["Kereskedő", "Kereskedő"],
      "safehouse"     : ["Rejtekhely", "Rejtekhely"],
      "barracks"      : ["Barakk", "Barakk"],
      "workshop"		  : ["Műhely", "Műhely"],
		"carpentering" : ["Ácsmester", "Ácsmester"],
			"forester" : ["Erdész", "Erdész"],
		  "stonemason" : ["Kőműves", "Kőműves"],
		"glassblowing" : ["Üvegfúvó", "Üvegfúvó"],
		  "winegrower" : ["Bortermelő", "Bortermelő"],
		   "alchemist" : ["Alkimista", "Alkimista"],
		   "architect" : ["Építész", "Építész"],
			"optician" : ["Optikus", "Optikus"],
			"vineyard" : ["Szőlőprés", "Szőlőprés"],
		  "fireworker" : ["Tűzszerész", "Tűzszerész"]
    };
    texts = {
      "cityName": "Város neve", "currentlyBuilding": "Építés alatt", "summary": "Összesen:",
      "hide_settings": "Beállítások elrejtése", "show_settings": "Beállítások megtekintése",
 	  "Population": "Lakosság",
	  "finishedBuilding": "Finished building","Incomes":"Incomes","Trading":"Trading",
 	  "Wood": "Építőanyag", "Wine": "Bor", "Marble": "Márvány", "Crystal": "Kristály", "Sulfur": "Kénpor"
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

var city_name = getNodeValue("id('breadcrumbs')/*[@class='city']");
if (city_name != undefined)
	{
	//var city_idmainView = getNodeValue("id('breadcrumbs')/*[@class='city']");
	//var island_id = getNodeValue("id('breadcrumbs')//a[@title='Back to the island']");
	//if (island_id == undefined){
	//	island_id = "";
	//}

	var island_id = getNodeValue("id('breadcrumbs')//a[@class='island']");
	if ( island_id == undefined || island_id == 0 )
	    island_id = /\[[0-9:]+\]/.exec(getNode("id('breadcrumbs')").innerHTML)[0];

	//city_idmainView = TrimIsland(island_id)+" "+city_idmainView;
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

	//a varos koordinataja
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
	if (island_id == "" && (/view=island&id=([0-9]+)/.exec(document.URL) != null)) { //sziget nézetben az urlben van a sziget id-je
	  island_id = RegExp.$1;
	}
	//log("server: "+server+", language: "+language+", city_id: "+city_id+", city_idmainView: "+city_idmainView+", city_coord: "+city_coord+", island_id: "+island_id);
	}
else
	{
	city_idmainView = 0;
	city_name = '';
	city_coord = '';
	island_id = '';
	}
//segéd függvények
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
  //log("Pontosan 1 elemet kellett volna visszaadnia: "+path+", de "+value.snapshotLength+" elemet adott vissza");
  //for(var i = 0; i < value.snapshotLength; i++) {
    //log(i+".: "+getPath(value.snapshotItem(i)));
  //}
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
function getIntValue(str, defaultValue) {
  var temp = ""+str;
  temp = temp.replace(/[^0-9]+/g, "");
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
		if ((/view=(resource|tradegood|deployment)/.exec(document.URL) != null) || (document.getElementById("setWorkers") != undefined))
			{
			var nScript = scripts[scripts.length - 2];
			}
		else
			{
			var nScript = scripts[scripts.length - 1];
			}
		
        var sCode = nScript.innerHTML;
      
        var aCodeLines = sCode.split(';');
        if (aCodeLines.length < 24)
          return;
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
      
      //  var res = getCity(city_id);
        res.prodwood = startResourcesDelta;
        res.prodwine = 0;
        res.prodmarble = 0;
        res.prodglass = 0;
        res.prodsulfur = 0;
        res.prodtime = ""+new Date().getTime(); //a leolvasas idopontja
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
      var arr = c.lang.split(",");
      var startTime = arr[0];
      var startAmount = parseFloat(arr[1]);
      var factPerHour = parseFloat(arr[2]);

      c.innerHTML = mynumberformat(getCurrentResourceAmount(currenttime, startTime, startAmount, factPerHour));
    }
  }
/*  if ((noloop == undefined) && (counters.snapshotLength > 0)) {
    window.setTimeout(realtimeFactDisplayF, 1000);
  }*/
  return (counters.snapshotLength > 0);
}
function createTooltipAttribute(tooltip, title) {
  if (tooltip == undefined || tooltip == "") {
    return "";
  }
  if (title == undefined || title == "") {
  	  title = "";
  }
  else
  	  title = ", TITLE, '"+title+"', TITLEALIGN , 'center', TITLEFONTCOLOR, '#794424'";
  var html = "<div class='TTContent'>"+tooltip+"</div>";
  html = html.replace(/'/g, "\\'");
  return "onmouseover=\"Tip('"+html+"', ABOVE, true, BORDERWIDTH, 0, SHADOW, true, SHADOWWIDTH, 1"+title+");\"";
}
function createTooltip(content, tooltip, title) {
  if (tooltip == undefined || tooltip == "") {
    return content;
  }
  return "<font "+createTooltipAttribute(tooltip, title)+">"+content+"</font>";
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
    res = "<font id='myresourcecounter' lang='"+startTime+","+startAmount+","+factPerHour+"'>x</font>";
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
    } else {
      //log("ismeretlen progress bar mode: "+PROGRESS_BAR_MODE);
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
  if(val < 10) {
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
    var abstime = Math.round(c.lang);
    hdata = (abstime - currenttime) / 1000;
    if (hdata > 0) {
      var hday = Math.floor(hdata / 86400);
      var hhor = Math.floor((hdata - (hday * 86400)) / 3600);
      var hmin = Math.floor((hdata - (hday * 86400) - (hhor * 3600)) / 60);
      var hsec = Math.floor(hdata - (hday * 86400) - (hhor * 3600) - (hmin * 60));
      var s = "";
      var b = false;
      if (b || hday > 0) { s += hday+"d "; b = true; }
      b = true; //az óra, perc, mp mindig látsszon
      if (b || hhor > 0) { s += hhor+":"; b = true; }
      if (b || hmin > 0) { s += twodigit(hmin)+":"; b = true; }
      if (b || hsec > 0) { s += twodigit(hsec)+""; b = true; }
      c.innerHTML = s;
    } else {
      c.innerHTML = "-";
    }
  }
  var found = realtimeFactDisplayF(0, 1);
/*  if (onlyOnce != true && (found || (cs.snapshotLength > 0))) {
    nextTimemyTimeCounterF += 1000;
    window.setTimeout(myTimeCounterF, Math.max(20, nextTimemyTimeCounterF - new Date().getTime()));
  }*/
}
function createTimeCounter(enddate) {
  if (enddate != undefined && enddate != "") {
    var s = smartDateFormat(enddate);
    return createTooltip("<font id='mytimecounter' lang='"+enddate+"' class='time_counter'></font>", s);
  }
  return "";
}
function createProd(prodPerHour, extraTooltip) {
  if (""+prodPerHour == "" || ""+prodPerHour == "0" || prodPerHour == undefined || ""+prodPerHour == "???") {
    return "";
  }
  var tooltip = mynumberformat(Math.round(24 * prodPerHour), true)+" / d";
  if (extraTooltip != undefined) {
    tooltip += ", "+extraTooltip;
  }
  return createTooltip(mynumberformat(Math.round(prodPerHour), true), tooltip);
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
      //log(name);
      txt = txt.substring(tmp+nlen+2);
      del = txt.indexOf(':{')+2;
      ret = new Object();
      arrlen[level+1] = Number(txt.substring(0, del-2))*2;
    break;
    case '}':
      txt = txt.substr(1);
      if(arrlen[level] != 0){ return undefined;};
      //log(arrlen[level]);
      level--;
    continue;
    default:
      if(level==0) return final;
      //log('syntax invalid(1) : '+save+"\nat\n"+txt+"level is at "+level);
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
    arrlen[level]--;//log(arrlen[level]-1);
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

function createLinkToCity(text, city_id, city_index) {
	var res = getCity(city_id);
	var rHTML = '';
	
	if (res.city_coord != undefined)
		{
		cCoord =  res.city_coord.split(":");
		rHTML += '<a href="?view=worldmap_iso&islandX='+getIntValue(cCoord[0],'')+'&islandY='+getIntValue(cCoord[1],'')+'" title="View world map at ' + res.city_coord + '"><img align="absmiddle" src="skin/layout/icon-world.gif" /></a>'; 
		}
		
	if (res.island_id != undefined)
		{
		rHTML += '<a href="?view=island&id=' + res.island_id + '&selectCity='+city_id+'" title="View island"><img align="absmiddle" src="skin/layout/icon-island.gif" /></a>'; 
		}
	
	if (res.city_name != undefined)
		{
		cName = Trim(text); 
		}
	else
		{
		cName = res.city_name;
		}
	rHTML += createLink(cName, "?view=city&id="+city_id, "title=\"Change current city\" onclick=\"var s = document.getElementById('citySelect'); s.selectedIndex = "+city_index+"; s.form.submit(); return false;\"");
	
	return rHTML;
}

// késako ?
function createLinkToForeignCity(text, city_id) {
  return createLink(text, "?view=island&id="+city_id);
}

function createLinkToResource(text, island_id, city_id, city_index) {
  if (island_id != undefined && island_id != "") {
    return createLink(text, "?action=header&function=changeCurrentCity&oldView=tradegood&view=resource&type=resource&id="+island_id+"&cityId="+city_id, "");
  }
  return text;
}
function createLinkToResource(text, island_id, city_id, city_index) {
  if (island_id != undefined && island_id != "") {
    return createLink(text, "?action=header&function=changeCurrentCity&oldView=tradegood&view=resource&type=resource&id="+island_id+"&cityId="+city_id, "");
  }
  return text;
}
function createLinkToResourceCond(condition, text, island_id, city_id, city_index) {
  if (condition == true && island_id != undefined && island_id != "") {
    return createLink(text, "?action=header&function=changeCurrentCity&oldView=tradegood&view=resource&type=resource&id="+island_id+"&cityId="+city_id, "");
  }
  return text;
}
function createLinkToTradegoodCond(condition, text, island_id, city_id, city_index) {
  if (condition == true && island_id != undefined && island_id != "") {
    return createLink(text, "?action=header&function=changeCurrentCity&oldView=tradegood&view=tradegood&type=tradegood&id="+island_id+"&cityId="+city_id, "");
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
function getArrivingGoods(city_id, resName) {
  var city = getCity(city_id);
  var tooltip = "<table class='arrivinggoodstooltip'>";
  var rows = getArrValue(config.arrivinggoods, city_id, []);
  var key;
  var found = false;
  var sum = 0;
  for (key in rows) {
    var row = rows[key];
    var res = row["res"];
    var a = getArrValue(res, resName, 0);
    var arrivetime = parseInt(getArrValue(row, "arrivetime", ""));
    if ((a > 0) && (arrivetime*1000 > city.prodtime)) {
      var startcity = getArrValue(row, "startcity", "");
      var quest = getArrValue(row, "quest", "");
	  var counter = "<font id='mytimecounter' lang='"+Math.round(arrivetime*1000)+"' class='time_counter'></font>";
      tooltip += "<tr>"+
                 "<td><b>"+mynumberformat(a, true) + "</b> from </td>"+
                 "<td align=right><i>" + startcity + "</i></td>"+
				 "</tr><tr>"+
                 "<td>at " + smartDateFormat(arrivetime*1000,false) + "</td><td align=right>("+counter+")</td>"+
                 "</tr>";
	  sum += a;
      found = true;
    }
  }
  tooltip += "</table>";
  var s = "";
  if (found) {
    s = ""+createTooltip("<font class='arrivinggoods'>"+mynumberformat(sum, true)+"</font>", tooltip);
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

//megadja, hogy az adott boldogsagi szinten mennyi ido kell egy plusz ember szaporodasahoz. ezredmasodpercekben adja meg.
function getOnePeopleGrowthTime(happiness) {
  if (happiness != 0) {
    return 3600/0.02/happiness*1000;
  }
  return "NaN";
}
//megadja, hogy varhatoan mekkora a populacio aktualis merete. Azon a feltetelezesen alapul, hogy a
//boldogsag csak a populacio hatasara valtozik, mas tenyezo nem befolyasolja. Ha ez nem teljesul,
//akkor rossz eredmenyt fog adni.
function getEstimatedPopulation(population, startTime, currenttime, startHappiness) {
  var happiness = startHappiness;
  startTime = Number(startTime);
//  log("getEstimatedPopulation("+population+", "+startTime+", "+currenttime+", "+startHappiness+")");
  while (happiness > 0) {
    var t = getOnePeopleGrowthTime(happiness);
//    log(population+", "+startTime+", "+currenttime+", "+happiness+", t: "+t);
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
  if (now.getYear() != s.getYear() || now.getMonth() != s.getMonth() || now.getDate() != s.getDate()) {
    t = s.toLocaleString();
  } else {
    t = twodigit(s.getHours())+":"+twodigit(s.getMinutes())+":"+twodigit(s.getSeconds());
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

function createLastUpdateAsTooltip(content, time) {
  return createTooltip(content, "last update: "+smartDateFormat(time, true));
}

//nyersi osztály
function Resource() {
//  this.city_coord = city_coord;
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

//log("time0: "+(new Date().getTime() - _startTime)+" msec");


/*
if (language == "hu") { //csak magyar szerveren
  //üzenetek fejlécében a dátumot nemtörhet?re állítja, és az év.hónap.nap sorrendbe átrakja a dátumot
  var res = xpath("//td[contains(text(), ':')]");
  for(var i = 0; i < res.snapshotLength; i++) {
    var s = res.snapshotItem(i).innerHTML;
    if (s.charAt(2) == "." && s.charAt(5) == "." && s.charAt(10) == " " && (s.charAt(12) == ":" || s.charAt(13) == ":")) {
      res.snapshotItem(i).innerHTML = s.substring(6, 10)+"."+s.substring(3, 5)+"."+s.substring(0, 2)+"&nbsp;"+s.substring(11);
    }
  }
  
  //a kereskedelmi egyezménynek és a többinek a feliratát lecseréli
  function replaceText(fromwhat, towhat) {
    var res = xpath("//*[contains(text(), '"+fromwhat+"')]");
    for(var i = 0; i < res.snapshotLength; i++) {
      res.snapshotItem(i).innerHTML = res.snapshotItem(i).innerHTML.replace(fromwhat, towhat);
    }
  }
  replaceText("Kulturgüterabkommen", "Kultúrális Egyezmény");
  replaceText("Handelsabkommen", "Kereskedelmi Egyezmény");
  replaceText("Militärabkmmen", "Katonai Egyezmény");
  replaceText("kündigen", "Felbontás");
  replaceText("anbieten", "Megkötés");
  replaceText("annehmen", "Elfogadás");
  replaceText("ablehnen", "Elutasítás");
  replaceText("zurückziehen", "Visszavonás");
}
*/
var res = getCity(city_id);

//aktuális nyersanyag mennyisége a városban
res.wood   = getIntValue(getNodeValue("id('value_wood')"));
res.wine   = getIntValue(getNodeValue("id('value_wine')"));
res.marble = getIntValue(getNodeValue("id('value_marble')"));
res.glass  = getIntValue(getNodeValue("id('value_crystal')"));
res.sulfur = getIntValue(getNodeValue("id('value_sulfur')"));
digProducedResources(res);
//lakosok száma a városban
res.population = getNodeValue("//span[@id='value_inhabitants']");
if (/\(([0-9,.]+)/.exec(res.population) != null) {
  res.population = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));
} else {
  res.population = 0;
}

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
  //az aktuálisan építés alatt álló épület
  var node = xpath("//div[@class='constructionSite']/following-sibling::a");
  if (node.snapshotLength == 1) {
    res.underConstruction = node.snapshotItem(0).title;
    res.underConstructionName = node.snapshotItem(0).parentNode.getAttribute("class");
    var script = node.snapshotItem(0).parentNode.getElementsByTagName("script")[0];
    if (script != undefined) {
      var enddate = 0;
      var currentdate = 0;
      if (/enddate[^0-9]*([0-9]+)/.exec(script.innerHTML) != null) {
        enddate = parseFloat(RegExp.$1) * 1000; //millisecundumban az építési id? vége
      }
      if (/currentdate[^0-9]*([0-9]+)/.exec(script.innerHTML) != null) {
        currentdate = parseFloat(RegExp.$1) * 1000; //millisecundumban az aktuális id?pont
      }
      if (enddate != 0 && currentdate != 0) {
        res.underConstruction += ","+(enddate - currentdate + new Date().getTime());
      }
    }
  } else {
    var cityView = xpath("//li[@id='position0']"); //ha ilyen van, akkor a falut latjuk a kepernyon
    if (cityView.snapshotLength > 0) {
      res.underConstruction = "-";
      res.underConstructionName = "";
    }
  }
  // Fix v3, reset levels
  var nodes = xpath("//li[contains(@id, 'position')]/a[contains(@href, 'view=')]");
  for(var i = 0; i < nodes.snapshotLength; i++) {
    var node = nodes.snapshotItem(i);
    var li = node.parentNode;
    
    var name = li.getAttribute("class");
    if (buildings[name] != undefined) {
      if (res.buildings[name] == undefined) {
        res.buildings[name] = {};
      }
	  res.buildings[name].level = 0;
    }
  }
  //osszegyujti az epuletek szintjeit a varosban
  for(var i = 0; i < nodes.snapshotLength; i++) {
    var node = nodes.snapshotItem(i);
    var li = node.parentNode;
    
    var level = "-";
    if (/([0-9]+)/.exec(node.title) != null) {
      level = RegExp.$1;
    }
    var name = li.getAttribute("class");
    if (buildings[name] != undefined) {
      if (res.buildings[name] == undefined) {
        res.buildings[name] = {};
      }
	  // fix v3, support several warehouse
	  if (res.buildings[name].level == undefined) {
        res.buildings[name].level = 0;
      }
	  
	  if (res.buildings[name].link == undefined) {
        res.buildings[name].link = node.href;
      }
	  
      res.buildings[name].level = res.buildings[name].level + parseInt(level);

    }
  }
  //townhall population total and growth
  if (/view=townHall/.test(document.URL)) {
    res.population = Number(getNodeValue("//span[@class='value occupied']", "0"));
	res.buildings["townHall"].growth = Number(getNodeValue("//li[contains(@class, 'growth ')]/span[@class='value']", "0"));
    //ennyivel több a kapacitás, mint a városháza szintje alapján lenne
    res.buildings["townHall"].bonusspace = Number(getNodeValue("//span[@class='value total']", "0")) - townHallSpaces[getArrValue(res.buildings["townHall"], "level",1)];
    //ennyi az elégedettség a populációt nem számítva
    res.buildings["townHall"].happiness  = Number(getNodeValue("//div[contains(@class, 'happiness ')]/div[@class='value']", "0")) + res.population;
	// Income
    res.buildings["townHall"].incomegold  = Number(getNodeValue("//li[contains(@class, 'incomegold ')]/span[@class='value']", "0"));
  }
  //military-army and fleet unit counts
  if (/view=cityMilitary-(army|fleet)/.exec(document.URL) != null) {
    var k = RegExp.$1;
    var idx = (k == "fleet") ? 13 : 0;
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
  }
  //military-army unit counts
  if (/view=(barracks|shipyard)/.exec(document.URL) != null) {
    var k = RegExp.$1;
    var idx = 0;
    if (k == "shipyard") {
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
  //fogadó nézet
  if ((/view=tavern/.test(document.URL)) || (document.getElementById("wineAssignForm") != undefined)) {
    //hozzáad egy eseménykezel?t a "Csirió!" gombhoz, hogy eltárolja a beállított bor mennyiségét
    function storeWineUsage() {
      try {
        var n = document.getElementById("wineAmount");
        var city_id = getNode_value("//form[@id='wineAssignForm']/input[@type='hidden' and @name='id']");
        var city = getCity(city_id);
        city.wineUsage = tavernWineUsage[n.selectedIndex] - getSavedWine();
        setVar("config", serialize(config));
      } catch (e) {
        //log("Hiba: "+e);
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
        //log("Hiba: "+e);
		return 0;
      }
   }
    var n = getNode("//form[@id='wineAssignForm']//*[@type='submit']");
    n.addEventListener("click", storeWineUsage, false);
    //leolvassa az aktuálisan beállított bor mennyiségét
    var n = document.getElementById("wineAmount");
    res.wineUsage = tavernWineUsage[n.selectedIndex] - getSavedWine();
  }
  
  //az upgrade-et leolvassa az upgrade oldalról is
  if (true) {
    var n = getNode("//*[@id='buildingUpgrade']//*[@class='buildingLevel']");
    if (n != null) {
      var buildingName = getNode("//body"); //a body.id tartalmazza az aktuálisan nézett épület azonosítóját
      if (buildingName != null) {
        var script = n.parentNode.getElementsByTagName("script")[0];
        if (script != undefined) {
          var enddate = 0;
          var currentdate = 0;
          if (/enddate[^0-9]*([0-9]+)/.exec(script.innerHTML) != null) {
            enddate = parseFloat(RegExp.$1) * 1000; //millisecundumban az építési id? vége
          }
          if (/currentdate[^0-9]*([0-9]+)/.exec(script.innerHTML) != null) {
            currentdate = parseFloat(RegExp.$1) * 1000; //millisecundumban az aktuális id?pont
          }
          if (enddate != 0 && currentdate != 0) {
            res.underConstruction = buildings[buildingName.id][0] + " " + (n.innerHTML.replace(/<[^>]*>/g, ""));
            res.underConstructionName = buildingName.id;
            res.underConstruction += ","+(enddate - currentdate + new Date().getTime());
          }
        }
      }
    }
  }

  //barakk nézet
  if (/view=barracks/.test(document.URL)) {
    //az építési sort feldolgozza, és ++ -al jelöli a táblázatban
  }
  
  // not finished
  if (/view=port/.test(document.URL)) {
	//config["arrivinggoods"][city_idmainView] = {};
	
    var cities = {};
    var res = xpath("//select[@id='citySelect']/option");
    for(var i = 0; i < res.snapshotLength; i++) {
      var n = res.snapshotItem(i);
      cities[n.value] = Trim(n.innerHTML);
    }
	
	var res = xpath("//table[@class='table01']/tbody/tr");
	for(var i = 0; i < res.snapshotLength; i++) {
		{
		/*
		config["arrivinggoods"][city_idmainView][i] = {};
		config["arrivinggoods"][city_idmainView][i]["startcity"] = 'test';
		config["arrivinggoods"][city_idmainView][i]["res"] = {};
		config["arrivinggoods"][city_idmainView][i]["res"]["wood"] = 3000;
		config["arrivinggoods"][city_idmainView][i]["quest"] = 'Transport';
		config["arrivinggoods"][city_idmainView][i]["arrivetime"] = '6:10:28';
		*/
		}
	}
 }
  
} else {

	if (/view=merchantNavy/.test(document.URL)) {
	// delete old
    config["arrivinggoods"] = new Object();
	// nb: prevoir nettoyeur des transports internes et laisser les autres, et ceux expirés
	
	var resETA = xpath("//table/tbody/tr/td[@class='eta']");
	if (resETA.snapshotLength > 0)
		{
		// Villes du joueur
	    var citiesIDs = {};
	    var res = xpath("//select[@id='citySelect']/option");
	    for(var i = 0; i < res.snapshotLength; i++) {
	      var n = res.snapshotItem(i);
		  var cName = Trim(n.innerHTML);
		  citiesIDs[cName] = n.value;
		  }
		
		// heures
		var mTimers = {};
		var scripts = document.getElementsByTagName("script");
	    var nScript = scripts[2];
	    var sCode = nScript.innerHTML;
		var aCodeLines = sCode.split(';');
		for (var i=0; i < aCodeLines.length-1; i++)
			{
			var sValues = aCodeLines[i].substring(aCodeLines[i].indexOf('{')+1,aCodeLines[i].indexOf('}'));
			var sParts = sValues.split(',');
			var sID = sParts[2].substring(sParts[2].indexOf('"')+1,sParts[2].indexOf('"',sParts[2].indexOf('"')+2));
			var sPart0 = sParts[0].split(':');
			mTimers[sID] = parseInt(Trim(sPart0[1]));
			}

		// infos
		var resT = xpath("//table/tbody/tr/td[@class='target']/a[contains(@href, 'view=island')]");
		var resS = xpath("//table/tbody/tr/td[@class='source']/a[contains(@href, 'view=island')]");
		var resMi = xpath("//table/tbody/tr/td[contains(@class, 'mission')]");
		var resPL = xpath("//table/tbody/tr/td[@class='pulldown']//div[@class='payload']");
		for (var i = 0; i < resT.snapshotLength; i++)
			{
			var nT = resT.snapshotItem(i);
			var nS = resS.snapshotItem(i);
			var nMi = resMi.snapshotItem(i);
			if (nMi.className.indexOf('gotoown') > 0)
				{
				var citySource = Trim(nS.innerHTML);
				var cityTarget = citiesIDs[Trim(nT.innerHTML)];
				var quest = 'gotoown';
				}
			else if (nMi.className.indexOf('returning') > 0)
				{
				var citySource = Trim(nT.innerHTML);
				var cityTarget = citiesIDs[Trim(nS.innerHTML)];
				var quest = 'returning';
				}
			else continue;
			var nPL = resPL.snapshotItem(i);
			var plParts = nPL.innerHTML.split('img');
			
			var nETA = resETA.snapshotItem(i);
			if ((cityTarget != undefined) && (mTimers[nETA.id] != undefined) && (plParts.length > 1))
				{
				if (config["arrivinggoods"][cityTarget] == undefined) config["arrivinggoods"][cityTarget] = {};
				config["arrivinggoods"][cityTarget][i] = {};
				config["arrivinggoods"][cityTarget][i]["startcity"] = citySource;
				config["arrivinggoods"][cityTarget][i]["res"] = {};
				//config["arrivinggoods"][cityTarget][i]["res"]["wood"] = 3000;
				config["arrivinggoods"][cityTarget][i]["quest"] = quest;
				config["arrivinggoods"][cityTarget][i]["arrivetime"] = mTimers[nETA.id];
				}
			}
		}
	}

  // version bug
  if (/view=merchantNavy/.test(document.URL)) {
    //config["arrivinggoods"] = new Object();
    var cities = {};
    var res = xpath("//select[@id='citySelect']/option");
    for(var i = 0; i < res.snapshotLength; i++) {
      var n = res.snapshotItem(i);
      cities[n.value] = Trim(n.innerHTML);
    }
    var res = xpath("//table[@class='table01']/tbody/tr/td/br");
    for(var i = 0; i < res.snapshotLength; i++) {
      var n = res.snapshotItem(i).parentNode;
      var cel = n.innerHTML.replace(/<br>.*/, "");
      //log("cel: "+cel);
      var found = false;
      var key;
      for (key in cities) {
        if (cities[key] == cel) {
          found = key;
          break;
        }
      }
      if (found != false) {
        var c = config["arrivinggoods"][found];
        if (c == undefined) {
          config["arrivinggoods"][found] = {};
        }
        c = config["arrivinggoods"][found][i];
        if (c == undefined) {
          config["arrivinggoods"][found][i] = {};
          c = config["arrivinggoods"][found][i];
        }
        //a start város
        var nn = getPreviousNode(n);
        c["startcity"] = nn.innerHTML;
        //a szállítmány tartalma
        var nn = getNextNode(n);
        //var rak = nn.getAttribute("onmouseover");
        var rak = nn.childNodes[0].getAttribute("onmouseover");
        rak = rak.replace(/<img [^>]*\/icon_([^>]+).gif[^0-9]*([0-9.,]+)/g, ";$1:$2;");
        rak = rak.replace(/^[^<]*/, "");
        rak = rak.replace(/>[^>]*$/, ">");
        rak = rak.replace(/<[^>]*>/g, "");
        //log("szallitmany ide: "+found+": "+rak);
        var arr = rak.split(";");
        var r = {};
        for (key in arr) {
          if (arr[key].indexOf(":") >= 0) {
            var a = arr[key].split(":");
            r[a[0]] = getIntValue(a[1]);
          }
        }
        c["res"] = r;
        //a szállítmány küldetése
        var nn = getNextNode(nn);
        c["quest"] = nn.textContent;
        //a szállítmány érkezési ideje
        var nn = getNextNode(nn); //érkezés ideje
        var nn = getNextNode(nn); //küldetés vége, ez kell nekünk
        c["arrivetime"] = nn.textContent;
      }
    }
    //log("arrivinggoods: "+serialize(config.arrivinggoods));
  }
  
  /*
  if (/view=highscore/.test(document.URL)) {
    var ownAlly = getCfgValue("ownAlly", '');
    var friendlyAllies = getCfgValue("friendlyAllies", '');
    if (friendlyAllies != "") {
      friendlyAllies = friendlyAllies.split(",");
    } else {
      friendlyAllies = [];
    }
    var hostileAllies = getCfgValue("hostileAllies", '');
    if (hostileAllies != "") {
      hostileAllies = hostileAllies.split(",");
    } else {
      hostileAllies = [];
    }
    
    function displayHighscoreColor(alliance, colorClass) {
      if (alliance != undefined && alliance != "" && colorClass != undefined && colorClass != "") {
        var res = xpath("//tr[@class!='own']/td[@class='allytag' and text()='"+alliance+"']");
        for(var i = 0; i < res.snapshotLength; i++) {
          var n = res.snapshotItem(i);
          var tr = n.parentNode;
          if (tr != undefined && tr != null) {
            tr.setAttribute("class", colorClass+" "+tr.getAttribute("class"));
          } else {
            log("tr is undefined! n: "+n);
          }
        }
      }
    }
    
    if (ownAlly != "" || friendlyAllies.length > 0 || hostileAllies.length > 0) {
      displayHighscoreColor(ownAlly, "hs_ownally");
      for(var i = 0; i < friendlyAllies.length; i++) {
        displayHighscoreColor(friendlyAllies[i], "hs_friendlyally");
      }
      for(var i = 0; i < hostileAllies.length; i++) {
        displayHighscoreColor(hostileAllies[i], "hs_hostileally");
      }
      
      //set form's method to "get", to work in other pages as well
      var forms = document.getElementsByTagName("form");
      for(var i = 0; i < forms.length; i++) {
        var form = forms[i];
        if (form != null) {
          form.method = "get";
        }
      }
    }
  }
  */
  }

/*
//a sziget nézetb?l összegy?jti a városok adatait, és eltárolja
if ((getCfgValue("TABLE_PLAYERS", false) == true) && (/view=island/.exec(document.URL) != null)) {
  var cities = xpath("//li[contains(@id, 'cityLocation')]/ul[@class='cityinfo']");
  for(var i = 0; i < cities.snapshotLength; i++) {
    var c = cities.snapshotItem(i);
    var infos = c.getElementsByTagName("li");
    var data = new Object();
    var cityid = 0;
    for(var j = 0; j < infos.length; j++) {
      var info = infos[j];
      var s = info.innerHTML;
      if (/destinationCityId=([0-9]+)/.exec(s) != null) {
        cityid = parseInt(RegExp.$1);
      }
      s = s.replace(/<[^>]*>/g, "");
      var arr = s.split(":");
      if (arr.length > 1) {
        var key = arr[0].replace(/^\s+|\s+$/g, "");
        var value = arr[1].replace(/^\s+|\s+$/g, "");
        data[j] = value;
      }
    }
    var playername = data[2];
    if (cityid > 0) {
      try {
        players.playersCities[players.cities[cityid][2]].cities[cityid] = false;
      } catch (e) {
      }
      if (players.playersCities[playername] == undefined) {
        players.playersCities[playername] = new Object();
      }
      if (players.playersCities[playername].cities == undefined) {
        players.playersCities[playername].cities = new Object();
      }
      players.playersCities[playername].cities[cityid] = true;
      players.playersCities[playername].alliance = data[3];
      players.cities[cityid] = {name: data[0], size: data[1], player: playername, island_id: island_id};
      players.islands[island_id] = {coord: city_coord};
      
      //a szövetség nevét utána f?zi a játékos nevének
      var a = c.parentNode.getElementsByTagName("a")[0];
      if (a != undefined) {
        a = a.getElementsByTagName("span")[0];
        if (a != undefined) {
          a = a.getElementsByTagName("span")[0];
          if (a != undefined) {
            a = a.nextSibling;
            if (a != undefined) {
              a.data += " ("+data[3]+")";
            }
          }
        }
      }
    }
  }
}
*/

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
      //log(isNaN(k));
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
    //log('var undefined: '+typeof(txt)); //return undefined;
    txt = unUtf("has undefined type: "+txt);
    return 's:'+txt.length+':"'+txt+'";';
  }
}
function unUtf(str) {
//return str;
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
  //var TABLE_PLAYERS   = getCfgValue("TABLE_PLAYERS",   false); //table for players and cities
  PROGRESS_BAR_MODE = getCfgValue("PROGRESS_BAR_MODE", "time"); //progress bar mode for resource counters
  GM_addStyle(getCfgValueNonEmpty("CSS", default_style));
  
  var nodes = xpath("//select[@id='citySelect']/option"); //cities
  var s = "";

  //log("time1: "+(new Date().getTime() - _startTime)+" msec");
  //az els? táblázat kirajzolása (nyersanyagok)
  if (TABLE_RESOURCES) {
	// Fix for v3
	/*
    var woodName =   getNodeTitle("//div[@id='cityResources']/ul[@class='resources']/li[@class='wood']", "Wood");
    var wineName =   getNodeTitle("//div[@id='cityResources']/ul[@class='resources']/li[@class='wine']", "Wine");
    var marbleName = getNodeTitle("//div[@id='cityResources']/ul[@class='resources']/li[@class='marble']", "Marble");
    var glassName =  getNodeTitle("//div[@id='cityResources']/ul[@class='resources']/li[@class='glass']", "Crystal");
    var sulfurName = getNodeTitle("//div[@id='cityResources']/ul[@class='resources']/li[@class='sulfur']", "Sulfur");
    var populationName = getNodeTitle("//div[@id='cityResources']//li[@class='population']", "Population");
	*/
    s += "<table border=1 class='resources_table'>";
    s += "<tr class='table_header'>";
    s += "<th class='table_header city_name' nowrap>"+texts["cityName"]+"</th>"+
         "<th colspan=4 class='lf table_header'>"+texts["Population"]+"</th>"+
         "<th colspan=2 class='lf table_header'>"+texts["Wood"]+"</th>"+
         "<th colspan=3 class='lf table_header'>"+texts["Wine"]+"</th>"+
         "<th colspan=2 class='lf table_header'>"+texts["Marble"]+"</th>"+
         "<th colspan=2 class='lf table_header'>"+texts["Crystal"]+"</th>"+
         "<th colspan=2 class='lf table_header'>"+texts["Sulfur"]+"</th>"+
         "<th colspan=2 class='lf table_header'>"+texts["currentlyBuilding"]+"</th>";
    s += "</tr>";
    var sumres = new Resource("");
	sumres.spacetotal = 0;
	sumres.growth = 0;
	sumres.Income = 0;
    var sumProd = new Resource("");
    sumProd.wineUsage = 0;
    for(var i = 0; i < nodes.snapshotLength; i++) {
      var city = nodes.snapshotItem(i);
      var res = getCity(city.value);
      var wineUsage;
      if (res.wineUsage != undefined) {
        wineUsage = res.wineUsage;
      } else {
        var tavernLevel = getArrValue(res.buildings["tavern"], "level", "-");
        wineUsage = (tavernLevel > 0 ? tavernWineUsage[tavernLevel] : 0);
		var cellarLevel = getArrValue(res.buildings["vineyard"], "level", "-");
		if (cellarLevel >=0) {
			wineSave = wineUsage * cellarLevel;
			wineSave = Math.round(wineSave / 100);
			wineUsage = wineUsage - wineSave;
			res.wineUsage = wineUsage ;
			}
      }
	  
	  var Income = getArrValue(res.buildings["townHall"],"incomegold","?");
	  if (Income != "?")
		{
		sumres.Income += Income;
		}

      sumres.wood += getCurrentResourceAmount(_startTime, res.prodtime, res.wood, res.prodwood);
      sumres.wine += getCurrentResourceAmount(_startTime, res.prodtime, res.wine, res.prodwine - wineUsage);
      sumres.marble += getCurrentResourceAmount(_startTime, res.prodtime, res.marble, res.prodmarble);
      sumres.glass += getCurrentResourceAmount(_startTime, res.prodtime, res.glass, res.prodglass);
      sumres.sulfur += getCurrentResourceAmount(_startTime, res.prodtime, res.sulfur, res.prodsulfur);
      
      sumProd.wood += res.prodwood;
      sumProd.wine += res.prodwine;
      sumProd.marble += res.prodmarble;
      sumProd.glass += res.prodglass;
      sumProd.sulfur += res.prodsulfur;
      
      sumProd.wineUsage += wineUsage;
      var townHallLevel = getArrValue(res.buildings["townHall"], "level", "?");
      var wineTooltip = "";
      if (Math.round(res.prodwine) > 0) {
        wineTooltip = mynumberformat(Math.round(res.prodwine), true)+" / h";
      }
      var wineRemainingHours = undefined;
      if (wineUsage > 0) {
        wineRemainingHours = floatFormat(getCurrentResourceAmount(_startTime, res.prodtime, res.wine, res.prodwine - wineUsage) / wineUsage, 1) + " h";
      }
      var wineUsageHtml = wineUsage > 0 ? createProd(-1 * wineUsage, wineRemainingHours) : "";
	  
	  
      var arr = res.underConstruction.split(",");
      var underConstruction = arr[0];
      //var underConstruction = "";
      //  if (arr[0] != "-") underConstruction = buildings[res.underConstructionName][1];
      var counter = createTimeCounter(arr[1]);
	  
	  
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
//        growthRemainingHours = floatFormat((parseInt(spacetotal) + parseInt(bonusspace) - parseInt(population)) / (0.02 * happiness), 1) + " h";
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
        spacetotal = createTooltip(mynumberformat(parseInt(spacetotal) + parseInt(bonusspace)), mynumberformat(spacetotal) + " + " + mynumberformat(bonusspace));
      } else {
		sumres.spacetotal = '?';
        spacetotal = mynumberformat(spacetotal) + " + ?";
      }
	  
      var warehouseLevel = getArrValue(res.buildings["warehouse"], "level", "0");
	  // Fix for v3
      var maxcwood = warehouseCapacities(warehouseLevel) + 3000;//1000 a városháza kapacitása
      var maxcother = warehouseCapacities(warehouseLevel) + 1500;//300 a városháza kapacitása
	  
      s += "<tr>";
      s += "<td class='"+cs+" city_name' align=left nowrap>"+createLinkToCity(city.innerHTML, city.value, i)+"</td>"+
           "<td class='"+lfcs+townHallStyle+"'>"+createLastUpdateAsTooltip(mynumberformat(population), res.prodtime)+"</td>"+
               "<td class='"+cs+"'>"+spacetotal+"</td>"+
	       "<td class='"+cs+"'>"+happiness+"</td>"+
               "<td class='"+cs+"'>"+createTooltip(floatFormat(growth,2,true), growthRemainingHours)+"</td>"+
           //"<td class='"+lfcs+"'>"+createLinkToResourceCond(isCurrentCity,
           //                   createCounter(res.prodtime, res.wood, res.prodwood, false, maxcwood, getArrivingGoods(city.value, "wood")),
           //                   res.island_id, city.value, i) +"</td>"+
           "<td class='"+lfcs+"'>"+createLinkToResource(
                              createCounter(res.prodtime, res.wood, res.prodwood, false, maxcwood, getArrivingGoods(city.value, "wood")),
                              res.island_id, city.value, i) +"</td>"+
               "<td class='"+cs+"'>"+createProd(res.prodwood)+"</td>"+
           "<td class='"+lfcs+"'>"+createLinkToTradegoodCond(/*isCurrentCity && */res.prodwine > 0,
                              createCounter(res.prodtime, res.wine, res.prodwine - wineUsage, false, maxcother, getArrivingGoods(city.value, "wine")),
                              res.island_id, city.value, i) +"</td>"+
               "<td class='"+cs+"'>"+createProd(res.prodwine)+"</td>"+
               "<td class='"+cs+"'>"+wineUsageHtml+"</td>"+
           "<td class='"+lfcs+"'>"+createLinkToTradegoodCond(/*isCurrentCity && */res.prodmarble > 0,
                              createCounter(res.prodtime, res.marble, res.prodmarble, false, maxcother, getArrivingGoods(city.value, "marble")),
                              res.island_id, city.value, i)+"</td>"+
               "<td class='"+cs+"'>"+createProd(res.prodmarble)+"</td>"+
           "<td class='"+lfcs+"'>"+createLinkToTradegoodCond(/*isCurrentCity && */res.prodglass > 0,
                              createCounter(res.prodtime, res.glass, res.prodglass, false, maxcother, getArrivingGoods(city.value, "glass")),
                              res.island_id, city.value, i) +"</td>"+
               "<td class='"+cs+"'>"+createProd(res.prodglass)+"</td>"+
           "<td class='"+lfcs+"'>"+createLinkToTradegoodCond(/*isCurrentCity && */res.prodsulfur > 0,
                              createCounter(res.prodtime, res.sulfur, res.prodsulfur, false, maxcother, getArrivingGoods(city.value, "sulfur")),
                              res.island_id, city.value, i) +"</td>"+
               "<td class='"+cs+"'>"+createProd(res.prodsulfur)+"</td>"+
           "<td class='"+lfcs+"'>"+underConstruction+"</td>"+
		"<td class='"+cs+"'>"+counter+"</td>";
      s += "</tr>";
    }
    s += "<tr class='table_footer'>";
    s += "<td class='table_footer' nowrap>"+texts["summary"]+"</td>"+
         "<td class='table_footer lf'>"+mynumberformat(sumres.population)+"</td>"+
         //"<td class='table_footer'>"+mynumberformat(sumres.spacetotal)+"</td>"+
         //"<td class='table_footer'>"+floatFormat(sumres.growth,2,true)+"</td>"+
         "<td class='table_footer'></td>"+
         "<td class='table_footer'></td>"+
         "<td class='table_footer'></td>"+
	 "<td class='table_footer lf'>"+createCounter(_startTime, sumres.wood, sumProd.wood)+"</td>"+
         "<td class='table_footer'>"+createProd(sumProd.wood)+"</td>"+
         "<td class='table_footer lf'>"+createCounter(_startTime, sumres.wine, sumProd.wine - sumProd.wineUsage, true)+"</td>"+
         "<td class='table_footer'>"+createProd(sumProd.wine)+"</td>"+
         "<td class='table_footer'>"+createProd(-1 * sumProd.wineUsage)+"</td>"+
         "<td class='table_footer lf'>"+createCounter(_startTime, sumres.marble, sumProd.marble)+"</td>"+
         "<td class='table_footer'>"+createProd(sumProd.marble)+"</td>"+
         "<td class='table_footer lf'>"+createCounter(_startTime, sumres.glass, sumProd.glass)+"</td>"+
         "<td class='table_footer'>"+createProd(sumProd.glass)+"</td>"+
         "<td class='table_footer lf'>"+createCounter(_startTime, sumres.sulfur, sumProd.sulfur)+"</td>"+
         "<td class='table_footer'>"+createProd(sumProd.sulfur)+"</td>"+
         //"<td class='table_footer lf'>"+createProd(sumres.Income)+"</td>";
	 "<td class='table_footer lf'></td>"+
         "<td class='table_footer'></td>";
    s += "</tr>";
    s += "</table>";
    s += "<br>";
  }

  //log("time2: "+(new Date().getTime() - _startTime)+" msec");
  //második táblázat: épületek szintjei
  if (TABLE_BUILDINGS) {
    s += "<table border=1 class='buildings_table'>";
    s += "<tr class='table_header'><th class='table_header city_name' nowrap>"+texts["cityName"]+"</th>";
    try {
      var body_id = document.getElementsByTagName("body")[0].id;
    } catch (e) {
    }
    var firstStyle = "lf";
    for(key in buildings) {
      var currentBuildingStyle = "";
      if (key == body_id) {
        currentBuildingStyle = " current_building";
      }
	  // Fix for v3
      s += "<th class='"+firstStyle+currentBuildingStyle+" table_header build_name' nowrap "+createTooltipAttribute(buildings[key][0])+">"+buildings[key][1]+"</th>";
      firstStyle = "";
    }
    s += "</tr>";
    for(var i = 0; i < nodes.snapshotLength; i++) {
      var city = nodes.snapshotItem(i);
      var res = getCity(city.value);

      s += "<tr>";
      var cs = (parseInt(city_id) == parseInt(city.value)) ? "current_city_highlight" : "";
      s += "<td class='"+cs+" city_name' align=left nowrap>"+createLinkToCity(city.innerHTML, city.value, i)+"</td>";
      var firstStyle = "lf";
      for(key in buildings) {
        var currentBuildingStyle = "";
        if (key == body_id) {
          currentBuildingStyle = " current_building";
        }
        var level = getArrValue(res.buildings[key], "level", "-");
        if (level == undefined || level == "") {
          level = "-";
        }
		var link = getArrValue(res.buildings[key], "link", "-");
		
		if (res.underConstructionName == key) {
		  if (level == "-") { level = 0; }
		  var arr = res.underConstruction.split(",");
		  var sdate = smartDateFormat(arr[1]);
		  if (Math.round(arr[1]) <= _startTime)
			{
			levellink =(level+1);
			if (link != "-") levellink = "<a href='" + link + "'>"+(level+1)+"</a>";
            levelUpgrading = createTooltip(levellink, '<b>'+texts["finishedBuilding"]+'</b><br />' + sdate);
			}
		  else
			{
			var counter = "<font id='mytimecounter' lang='"+Math.round(arr[1])+"' class='time_counter'></font>";
			levellink =level+"&raquo;"+(level+1);
			if (link != "-") levellink = "<a href='" + link + "'>"+level+"&raquo;"+(level+1)+"</a>";
            levelUpgrading = createTooltip(levellink, '<b>'+texts["currentlyBuilding"]+'</b><br />&raquo; ' + sdate +' ('+ counter+')');
			}
		  s += "<td class='"+cs+" "+firstStyle+currentBuildingStyle+" upgrading'>"+levelUpgrading+"</td>";
        }
		else
			{
			levellink =level;
			if (level != "-" && link != "-") levellink = "<a href='" + link + "'>"+level+"</a>";
			s += "<td class='"+cs+" "+firstStyle+currentBuildingStyle+"'>"+levellink+"</td>";
			}
        firstStyle = "";
      }
      s += "</tr>";
    }
    s += "</table>";
    s += "<br>";
  }

  //log("time3: "+(new Date().getTime() - _startTime)+" msec");

  //harmadik táblázat: hadsereg + flotta
  // Fix for v3 ; remove points
  if (TABLE_ARMYFLEET) {
    if (config["unitnames"] != undefined) {
      var names = config["unitnames"];
      var usedIndexes = [];
      var usedIndexesCount = 0;
      for(var i = 0; i < nodes.snapshotLength; i++) {
        var city = nodes.snapshotItem(i);
        var res = getCity(city.value);
        
        for(key in names) {
          if (parseInt(getArrValue(getArrValue(res.units, key), "count", 0)) > 0) {
            usedIndexes[key] = 1;
            usedIndexesCount++;
          }
        }
      }

      if (usedIndexesCount > 0) {
        s += "<table border=1 class='army_table'>";
        s += "<tr class='table_header'><th class='table_header city_name' nowrap>"+texts["cityName"]+"</th>";
		var firstStyle = "lf";
        for(key in names) {
          var name = names[key];

          if (usedIndexes[key] == 1) {
            s += "<th class='"+firstStyle+" table_header unit_name' colspan=1 nowrap "+createTooltipAttribute(name)+">"+name+"</th>";
			firstStyle = "";
          }
        }
        //s += "<th class='lf table_header' colspan=1 nowrap style='min-width: 45px'>"+texts["summary"]+"</th>";
        s += "</tr>";
        var sum = [];
        //var sumPoint = [];
        
        for(var i = 0; i < nodes.snapshotLength; i++) {
          var city = nodes.snapshotItem(i);
          var res = getCity(city.value);

          s += "<tr>";
          var cs = (parseInt(city_id) == parseInt(city.value)) ? "current_city_highlight" : "";
          s += "<td class='"+cs+" city_name' align=left nowrap>"+createLinkToCity(city.innerHTML, city.value, i)+"</td>";
		  
          //var citySum = 0;
          //var citySumPoint = 0;
		  var firstStyle = "lf";
          for(key in names) {
            if (usedIndexes[key] == 1) {
              var level = getIntValue(getArrValue(getArrValue(res.units, key), "count", "0"), 0);
              //var pointPerUnit = getIntValue(getArrValue(config["unitpoints"], key, "0"), 0);
              if (level == 0) {
                level = "-";
              } else {
                sum[key] = (sum[key] == undefined) ? level : sum[key] + level;
                //citySum += level;
              }
			  /*
              var point = "";
              if (pointPerUnit == 0 || level == "-") {
              } else {
                point = pointPerUnit * level;
                sumPoint[key] = (sumPoint[key] == undefined) ? point : sumPoint[key] + point;
                citySumPoint += point;
                point = createTooltip(mynumberformat(point), level + " * " + mynumberformat(pointPerUnit) + " point");
              }
			  */
              s += "<td class='"+firstStyle+" "+cs+"'>"+mynumberformat(level)+"</td>";
			  firstStyle = "";
			  /*
              s += "<td class='lf "+cs+"'>"+mynumberformat(level)+"</td>"+
                   "<td class='"+cs+"'>"+point+"</td>";
			  */
            }
          }
          //s += "<td class='lf table_footer "+cs+"'>"+(citySum != 0 ? mynumberformat(citySum) : "-")+"</td>";
          /*
		  s += "<td class='lf table_footer "+cs+"'>"+(citySum != 0 ? mynumberformat(citySum) : "-")+"</td>"+
               "<td class='table_footer "+cs+"'>"+(citySumPoint != 0 ? mynumberformat(citySumPoint) : "-")+"</td>";
		      */
          s += "</tr>";
        }
        s += "<tr class='table_footer'>";
        s += "<td class='table_footer'>"+texts["summary"]+"</td>";
        var citySum = 0;
        //var citySumPoint = 0;
		var firstStyle = "lf";
        for(key in names) {
          if (usedIndexes[key] == 1) {
            s += "<td class='table_footer "+firstStyle+"'>"+mynumberformat(sum[key])+"</td>";
			/*
            s += "<td class='table_footer lf'>"+mynumberformat(sum[key])+"</td>"+
                 "<td class='table_footer'>"+mynumberformat(sumPoint[key])+"</td>";
			*/
            citySum += sum[key];
            //citySumPoint += sumPoint[key];
			firstStyle = "";
          }
        }
        //s += "<td class='table_footer lf'>"+mynumberformat(citySum)+"</td>";
		/*
        s += "<td class='table_footer lf'>"+mynumberformat(citySum)+"</td>"+
             "<td class='table_footer'>"+mynumberformat(citySumPoint)+"</td>";
		*/
        s += "</tr>";
        s += "</table>";
        s += "<br>";
      }
    }
  }


  //log("time4: "+(new Date().getTime() - _startTime)+" msec");

  //negyedik táblázat: játékosok, és azok városai
  /*
  if (TABLE_PLAYERS) {
    var maxCityNum = 6;
    s += "<table border=1 class='players_table'>";
    var playerNames = [];
    for(plname in players.playersCities) {
      playerNames[playerNames.length] = plname;
    }
    playerNames.sort(function(a,b){
      a = a.toLowerCase();
      b = b.toLowerCase();
      return (a < b) ? -1 : ((a > b) ? 1 : 0);
    });
    for(idx in playerNames) {
      var plname = playerNames[idx];
      var city_ids = players.playersCities[plname].cities;
      s += "<tr>";
      s += "<td>"+plname+"</td>" +
           "<td>" + players.playersCities[plname].alliance + "</td>";
      var i = 0;
      for(id in city_ids) {
        if (city_ids[id]) {
          var city = players.cities[id];
          s += "<td class='lf'>" + city.name + "</td>" +
               "<td>" + createLinkToForeignCity(players.islands[city.island_id].coord, city.island_id) + "</td>" +
               "<td>" + city.size + "</td>";
          i++;
        }
      }
      for(;i < maxCityNum; i++) {
        s += "<td class='lf'></td><td></td><td></td>";
      }
      s += "</tr>";
    }
    s += "</table>";
    s += "<br>";
  }
  log("time5: "+(new Date().getTime() - _startTime)+" msec");
	*/

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
  //log("time6: "+(new Date().getTime() - _startTime)+" msec");



  //settings table
  if (true) {
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
      //log(this.lang+" set to "+config.cfg[this.lang]);
      setVar("config", serialize(config));
    }
    function myChgEventHandler() {
      config.cfg[this.lang] = this.value;
      //log(this.lang+" set to "+config.cfg[this.lang]);
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
    t.appendChild(createRowChk("Alert sounds:", "ALERT_SOUNDS", ALERT_SOUNDS));
    t.appendChild(createRowInput("Alert volume (0 - 100):", "ALERT_VOLUME", ALERT_VOLUME));
    t.appendChild(createRowInput("Warning volume (0 - 100):", "WARNING_VOLUME", WARNING_VOLUME));
    t.appendChild(createRowChk("Auto refresh:", "AUTO_REFRESH", AUTO_REFRESH));
    t.appendChild(createRowInput("Auto refresh min seconds:", "AUTO_REFRESH_MIN_SECS", MIN));
    t.appendChild(createRowInput("Auto refresh max seconds:", "AUTO_REFRESH_MAX_SECS", MAX));
    t.appendChild(createRowChk("Show resources table:", "TABLE_RESOURCES", TABLE_RESOURCES));
    t.appendChild(createRowChk("Show buildings table:", "TABLE_BUILDINGS", TABLE_BUILDINGS));
    t.appendChild(createRowChk("Show army and fleet table:", "TABLE_ARMYFLEET", TABLE_ARMYFLEET));
    //t.appendChild(createRowChk("Show players and cities table (under development):", "TABLE_PLAYERS", TABLE_PLAYERS));
    t.appendChild(createRowSlct("Resource progress bar mode:", "PROGRESS_BAR_MODE", PROGRESS_BAR_MODE, {off: "off", time: "based on remaining time", percent: "based on fullness percentage"}));
    t.appendChild(createRowSlct("Language:", "LANGUAGE", language, {"": "Automatic from server name",ae: "Arabic", en: "English", hu: "Magyar", de: "German", cz: "Czech", tr: "Turkish", es: "Spanish", ba: "Bosnian", it: "Italian", pt: "Portuguese", fr: "French"}));
    //t.appendChild(createRowInput("Own alliance (short name):", "ownAlly", getCfgValue("ownAlly", "")));
    //t.appendChild(createRowInput("Friendly alliances (short names, separated by comma):", "friendlyAllies", getCfgValue("friendlyAllies", "")));
    //t.appendChild(createRowInput("Hostile alliances (short names, separated by comma):", "hostileAllies", getCfgValue("hostileAllies", "")));
    //t.appendChild(createRowTxtr("CSS:", "CSS", getCfgValueNonEmpty("CSS", default_style), 15, 70));
    //t.appendChild(createRowChk("Log debug messages:", "DEBUG_LOG", DEBUG_LOG));
    
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
	  var n = document.createElement('a');
	  n.innerHTML = '<b>Ikariam v3 Empire Board</b><br /><i>version ' + scriptversion + '</i><br />';
	  n.href = 'http://userscripts.org/scripts/show/41051';
	  n.target = '_blank';
      body.appendChild(n);
	  
      var n = document.createElement('input');
      n.type = "button";
      n.value = texts["show_settings"];
      n.setAttribute("class", "button");
      n.addEventListener("click", show_hide_table, false);
      body.appendChild(n);
      //now adds table
      body.appendChild(t);
    }
  }
  myTimeCounterF(123, true); //egyszer frissíti a visszaszámlálókat
}

renderTables();

// Fix for v3
var script = document.createElement('script');
script.type = "text/javascript";
script.src = "/js/wz_tooltip.js";
var body = getNode("//head");
body.appendChild(script);

window.setInterval(myTimeCounterF, 1000);
window.setTimeout(myTimeCounterF, 1000); //a setinterval az els? két hívást azonnal végrehajtja, és aztán 2 mp marad ki, majd onnantól megy rendesen. kézzel kell ezt a bugot "javítani"
//myTimeCounterF();


//város választó form típusát get-re állítja, hogy a paraméterek az url-ben megjelenjenek
//var form = getNode("//form[@id='changeCityForm']");
/*var forms = document.getElementsByTagName("form");
for(var i = 0; i < forms.length; i++) {
  var form = forms[i];
  if (form != null) {
    form.method = "get";
  }
}*/

var time = new Date().getTime();
setVar("config", serialize(config));
//log("time serialize: "+(new Date().getTime() - time)+" msec");

/*
if (getCfgValue("TABLE_PLAYERS", false) == true) {
  //var time = new Date().getTime();
  setVar("players", uneval(players));
  //log("time uneval: "+(new Date().getTime() - time)+" msec");
}
*/
var _endTime = new Date().getTime();
//log("total time: "+(_endTime - _startTime)+" msec");

/***********************************************************************
* Trim Whitespace Function ************************************************************************/
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

/**************************************************************************************************
* TrimIsland Function ******************************************************************/

function TrimIsland(str){
	var a = str.indexOf('[');
	var b = str.indexOf(']');
	str = str.substring(a,b+1);
	return str;
}

function TrimIsland100(str){
	//var a = str.indexOf('[');
	var b = str.indexOf(']');
	var c = str.indexOf(':');
	res = '[';
	res += str.substring(c-2,c);
	res += ':';
	res += str.substring(b-2,b);
	res += ']';
	//str = str.substring(a,b+1);
	return res;
}
