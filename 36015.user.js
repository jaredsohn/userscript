{\rtf1\ansi\ansicpg1250\deff0\deflang1038{\fonttbl{\f0\fswiss\fcharset238{\*\fname Arial;}Arial CE;}}
{\*\generator Msftedit 5.41.15.1515;}\viewkind4\uc1\pard\f0\fs20\u-257?// coding: utf-8\par
// ==UserScript==\par
// @name           ikariam alarm and overview table\par
// @namespace      psmith\par
// @description    Az ikariam j\'e1t\'e9kban automatikusan friss\'edti az oldalt (5-10 percenk\'e9nt), \'e9s ha \'faj\par
//                 \'fczenet j\'f6n, vagy megt\'e1madnak, akkor hangjelz\'e9ssel figyelmeztet.\par
//                 Ezen k\'edv\'fcl a falvakr\'f3l \'f6sszegy?ti a fontos inform\'e1ci\'f3kat (lakosok, nyersanyagok mennyis\'e9ge,\par
//                 \'e9p\'fcletek szintje, \'e9p\'edt\'e9s alatt \'e1ll\'f3 \'e9p\'fclet), \'e9s a lap alj\'e1n egy t\'e1bl\'e1zatban megjelen\'edti.\par
// @include        http://*.ikariam.*/index.php*\par
// ==/UserScript==\par
/**************************************************************************************************\par
Version history:\par
- 2008.07.07:\par
  * Lots of little fixes to keep the script alive. Thanks Kupy123 and ocdcsv.\par
  \par
- 2008.07.01:\par
  * Updated code to pick up the city and island id's from the new html source.\par
  \par
- 2008.06.27:\par
  * Applied fixes by Coop\par
  * Applied fixes by Choobaka\par
\par
- 2008.06.02:\par
  * Russian translation by LiFeAiR\par
  * Tavern wine usage missed for level 17\par
\par
- 2008.06.01:\par
  * colorize current building in buildings table\par
\par
- 2008.05.31:\par
  * in building view, getting upgrading building name is not worked for town hall. fixed.\par
  * mark current population red, when citizens number reaches town halls capacity\par
\par
- 2008.05.26:\par
  * colorize players in highscore view, using his/her alliance name. There are 3 type of alliances: your own alliance, friendly\par
    alliances and hostile alliances.\par
    You have to set these values in settings to see any changes. Alliance names separated by commas. If alliance name contains comma,\par
    you stucked.\par
    Also, there are 3 styles in css to configure colors.\par
    To work properly, I have to set the form's method to "get". I think it can be detectable by gameforge, so I recommend you not use\par
    this feature (i.e. leave all 3 values empty) !\par
\par
- 2008.05.22:\par
  * fix incompatibility with transport countdown script\par
\par
- 2008.05.10:\par
  * population estimation (try to guess current number of citizens in cities. Based on satisfaction)\par
  * population remaining time estimation is more accurate. It is based on population estimation. If capacity is\par
    higher than reachable maximum, it displays infinity hours (it happens, when current satisfaction is lower than\par
    the remaining space in town hall).\par
  * use setInterval for counters instead of setTimeout\par
  * append alliance name after player's in city view, when 4th table is enabled\par
  * show last update time of city's resource amounts and population 3rd column (I use it for population estimation)\par
\par
- 2008.05.08:\par
  * Romanian translation, by Atomic\par
\par
- 2008.05.07:\par
  * Polish translation, thanks to -S-X-\par
  * fix unserialize problem (thanks to ogameclub)\par
\par
- 2008.05.06:\par
  * display happiness in a separated column (no colors yet)\par
  * happiness changes when population changes (1 people == 1 point of satisfaction).\par
    Population is still constant, so u have to visit your town to see happiness changes!\par
  * link to island view in fourth (players and cities) table\par
  * "Show settings" and "Hide settings" texts can be localized\par
\par
- 2008.05.05:\par
  * Portuguese translation update (thanks to alpha tester)\par
  * language selection into settings\par
\par
- 2008.05.04:\par
  * translate some german texts on .hu server. Probably it will be fixed in ikariam 0.2.2, but it is so annoying.\par
  * fix wine remaining time computing\par
  * get wine usage from tavern view\par
  * show a progress bar below resource amounts to display fullness of warehouse. There are 7 styles to display this, read comments is css.\par
    This progress bar is constant, not updating with resource amounts! \par
  * add progress bar mode to settings. It has 3 mode:\par
    - off : turn off progress bar\par
    - based on remaining time : warning levels are 16 and 8 hours before warehouse is full. This is the default mode.\par
    - basef on fullness percentage : warning levels are 80% and 95% before warehouse is full.\par
  * get upgrading building name from building view, so u dont have to go back to city view to see the upgrading building in table. (suggested by Johan Sundstr\'f6m (I'm not sure))\par
\par
- 2008.05.01:\par
  * tooltip for army and fleet points\par
  * default style fix (thanks to Johan Sundstr\'f6m)\par
  * speedup with config storing and reloading\par
  * get transferred resources from merchant view and display a "++" next to resource at destination city. Informations are in tooltip.\par
    To disable, type "display: none;" in ".arrivinggoods" style.\par
\par
- 2008.04.29:\par
  * add refresh button to settings\par
  * add editable css to settings. Set to empty to get back the default style. (suggested by Johan Sundstr\'f6m)\par
  * add alert and warning volume to settings (suggested by Ahmedwia)\par
  * do not gather city informations from island view, if table is turned off (suggested by Johan Sundstr\'f6m)\par
\par
- 2008.04.28:\par
  * settings table. Changes are "on the fly"\par
  * reset button moved into settings table, and add confirm\par
  * show players and their cities' coordinates in a very large table (collected from island view). Under development! Any ideas about it?\par
  * version history in source (suggested by me and ocdcsv)\par
  * remove city coordinates from buildings and army tables (suggested by almost everybody :))\par
  * return  value.textContent instead of value.innerHTML in getNodeValue() (suggested by Johan Sundstr\'f6m)\par
  * new tooltip format. I better like it.\par
\par
- 2008.04.26:\par
  * links to cities (suggested by S\'e1rk\'e1ny)\par
  * links to mines and forests (suggested by S\'e1rk\'e1ny)\par
  * count units points (only after u visit barrack and shipyard)\par
  * highlight current city in tables (there is a style variable for this: currentCityStyle)\par
  * highlight currently upgrading building in tables (there is a style variable for this: underConstructionTdStyle)\par
  * town hall maximum population reading works better with upgrades\par
  * rewrite data storing for better usability (you have to refresh all your cities)\par
  * coordinates moves into a new column (suggested by Johan Sundstr\'f6m)\par
\par
- 2008.04.25:\par
  * rewrite data storing for speedup (you have to refresh all your cities)\par
  * some desing improvements in resource table\par
  * table and time counter style is configurable via variables (tableStyle and timeCounterStyle)\par
  * xpath updates to work with kronos 0.5 (i've tested, and works fine for me)\par
  * city ids is now separated for resources and main view. It should solve problem reported by Johan Sundstr\'f6m.\par
\par
- 2008.04.23:\par
  * Portuguese translation (thanks to alpha tester)\par
  * French translation (thanks to Chirel)\par
  * fix for server s*.*.ikariam.com, to get correct language code\par
  * fix broken display when building something with "?" or "?" in its name (every column in that row was "-" or NaN)\par
  * probably fix, that resource names is always english\par
\par
- 2008.04.22:\par
  * probably fix population problem\par
  * fix error in previous version (thanks to Guybrush)\par
  * Italian translation (thanks to Brucee)\par
  * Bosnian translation (thanks to Sasha969)\par
\par
- 2008.04.21:\par
  * Spanish translation (thanks to dragondeluz)\par
  * some design improvements (thanks to ocdcsv)\par
  * reset button: delete all stored data (I recommend to uninstall this script with "Also uninstall associated preferences" checked. After that you can update.)\par
  * display "-" instead of NaN (thanks to ocdcsv)\par
\par
- 2008.04.20:\par
  * Turkish translation (thanks to Guybrush)\par
  * config flags at the top of source code (ALERT_SOUNDS, AUTO_REFRESH, TABLE_RESOURCES, TABLE_BUILDINGS, TABLE_ARMYFLEET).\par
    ALERT_SOUNDS and AUTO_REFRESH is turned off by default.\par
  * army and fleet information is gathered and displayed also.\par
  * table splitted into 3 parts, and can be individually turned on/off by the above flags. Thanks, ocdcsv for the idea, I would have never thought about that.\par
  * population capacity and growth readed from town hall view. Growth is constant.\par
\par
- 2008.04.18:\par
  * alarm is now disabled, by default (as of elizium23 reported, that it is illegal). If you want to enable, then remove the slashes from line 48 (var timeID =...)\par
  * cz translation (thanks to pavel10)\par
  * improve xpath queries (I like xpath :)), thanks to Johan Sundstr\'f6m\par
\par
- 2008.04.16:\par
  * aligned in center\par
  * time counter is now bold, and red coloured\par
  * time counter has a tooltip with finish time\par
  * daily wine usage in tooltip\par
\par
- 2008.04.15: german translation (thanks to Schneppi)\par
\par
- 2008.04.14: english translation, and a bugfix to works better with Kronos' script\par
\par
- 2008.04.13: initial release\par
**************************************************************************************************/\par
\par
\par
\par
\par
var _startTime = new Date().getTime();\par
\par
//a szerver neve\par
var server = /\\/\\/([a-z._0-9]+)\\//.exec(document.URL);\par
server = RegExp.$1;\par
\par
var config = unserialize(getVar("config", ""));\par
if (config == null || config == undefined || config == "" || ("".config == "NaN")) \{\par
  config = new Object();\par
\}\par
if (config.cfg == undefined) \{\par
  config.cfg = new Object();\par
\}\par
\par
var ALERT_SOUNDS = getCfgValue("ALERT_SOUNDS", false); //play sound when you are under attack, or you have undreaded message\par
var AUTO_REFRESH = getCfgValue("AUTO_REFRESH", false); //automatically refreshes browser window (useful when ALERT_SOUNDS is true)\par
var DEBUG_LOG    = getCfgValue("DEBUG_LOG", false); //log debug messages to console\par
var PROGRESS_BAR_MODE; //have to be a global variable\par
\par
var time = new Date().getTime();\par
log("time unserialize: "+(time - _startTime)+" msec");\par
var players;\par
try \{\par
  players = eval(getVar("players", "(\{\})"));\par
\} catch (e) \{\par
  log("Error while unserializing 'players': "+e);\par
  log("Stored data: "+getVar("players", ""));\par
\}\par
if (players == null || players == undefined || ("".players == "NaN")) \{\par
  players = new Object();\par
\}\par
if (players.cities == undefined) \{\par
  players.cities = new Object();\par
\}\par
if (players.playersCities == undefined) \{\par
  players.playersCities = new Object();\par
\}\par
if (players.islands == undefined) \{\par
  players.islands = new Object();\par
\}\par
log("time unserialize: "+(new Date().getTime() - time)+" msec");\par
\par
log("time-1: "+(new Date().getTime() - _startTime)+" msec");\par
\par
\par
/************************* DEFAULT STYLE **************************/\par
var default_style = <><![CDATA[\par
.resources_table, .buildings_table, .army_table, .players_table \{\par
  text-align: center;\par
  border-style: dotted;\par
  width: 980px;\par
\}\par
.time_counter \{\par
  font-weight: bold;\par
  color: yellow;\par
\}\par
.lf \{\par
  border-left: double;\par
  border-color: #542C0F;\par
\}\par
.current_city_highlight \{\par
  background-color: #CDA55F;\par
\}\par
#overview__table .upgrading \{\par
  background-color: #22AAAA;\par
\}\par
tr.table_header \{\par
  border-bottom: double;\par
  font-weight: bold;\par
  background-color: #A8A92A;\par
\}\par
th.table_header \{\par
  text-align: center;\par
  font-weight: bold;\par
\}\par
tr.table_footer \{\par
  border-top: double;\par
\}\par
td.table_footer \{ /*also for army table's last column*/\par
  font-weight: bold;\par
\}\par
.arrivinggoods \{\par
  font-weight: bold;\par
  color: #ff0000;\par
\}\par
td.arrivinggoodstooltip \{\par
  padding: 3px;\par
\}\par
td.arrivinggoodstooltip \{\par
  border-width: 1px;\par
  border-style: dotted;\par
\}\par
\par
/****************** progress bar styles *******************/\par
table.myPercent \{\par
  height: 4px;\par
  width: 100%;\par
\}\par
tr.myPercent \{\par
  height: 4px;\par
\}\par
td.myPercentRemaining \{\par
//  background-color: #CDA55F;\par
\}\par
td.myPercentNormal \{ /* normal state. you have plenty of rooms */\par
  background-color: green;\par
\}\par
td.myPercentWarning \{ /* warehose is getting full */\par
  background-color: #C00000;\par
\}\par
td.myPercentAlmostFull \{ /* warehouse is almost full */\par
  background-color: #ff0000;\par
\}\par
td.myPercentFull \{ /* warehouse is full */\par
  background-color: #ff0000;\par
\}\par
\par
/****************** highscore styles *******************/\par
tr.hs_ownally \{\par
  background-color: #DAF887 !important;\par
\}\par
tr.hs_friendlyally \{\par
  background-color: #FFFF80 !important;\par
\}\par
tr.hs_hostileally \{\par
  background-color: #FF979B !important;\par
\}\par
\par
/****************** population full *******************/\par
td.populationfull \{\par
  color: red;\par
  font-weight: bold;\par
\}\par
\par
/****************** current building *******************/\par
th.current_building \{\par
  background-color: #D2B1EB;\par
  color: white;\par
\}\par
td.current_building \{\par
\}\par
]]></>.toXMLString();\par
\par
\par
\par
var alertSound     = "http://simplythebest.net/sounds/WAV/events_WAV/event_WAV_files/alarm_3.wav";\par
var warningSound   = "http://www.ilovewavs.com/Effects/Beeps/FlyinOff.wav";\par
var WARNING_VOLUME = getCfgValue("WARNING_VOLUME", "50");   // "0" = silent "100" = full volume\par
var ALERT_VOLUME   = getCfgValue("ALERT_VOLUME", "100");   // "0" = silent "100" = full volume\par
\par
var MIN = getCfgValue("AUTO_REFRESH_MIN_SECS", 300);  // seconds\par
var MAX = getCfgValue("AUTO_REFRESH_MAX_SECS", 600);  // seconds\par
\par
function log(msg) \{\par
  if ((config.cfg["DEBUG_LOG"] == true) && (console != undefined)) \{\par
    console.log("[ikariam_overview] "+msg);\par
  \}\par
\}\par
function xpath(query) \{\par
  return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);\par
\}\par
function getCfgValue(key, defaultValue) \{\par
  return ((config.cfg != undefined && config.cfg[key] != undefined) ? config.cfg[key] : defaultValue);\par
\}\par
function getCfgValueNonEmpty(key, defaultValue) \{\par
  return ((config.cfg != undefined && config.cfg[key] != undefined && config.cfg[key] != "") ? config.cfg[key] : defaultValue);\par
\}\par
function playSound(sound, volume) \{\par
  var body = document.getElementsByTagName("body")[0];\par
  var emb = document.createElement("embed");\par
  emb.src = sound;\par
  emb.setAttribute("autostart", "true");\par
  emb.setAttribute("loop", "false");\par
  emb.setAttribute("hidden", "true");\par
  emb.setAttribute("volume", volume);\par
  body.appendChild(emb);\par
\}\par
function getRefreshTime() \{\par
  return (parseInt(MIN) + Math.round(Math.random() * (MAX - MIN))) * 1000;\par
\} \par
\par
if (ALERT_SOUNDS) \{\par
  var resWarning = xpath("//a[contains(@class, 'normalactive')]");\par
  var resAlert = xpath("//a[contains(@class, 'normalalert')]");\par
  if (resAlert.snapshotLength > 0) \{\par
    playSound(alertSound, ALERT_VOLUME);\par
  \} else if (resWarning.snapshotLength > 0) \{\par
    playSound(warningSound, WARNING_VOLUME);\par
  \}\par
\}\par
\par
if (AUTO_REFRESH) \{\par
  var timeID = setTimeout("location.href= document.URL", getRefreshTime());\par
\}\par
\par
////////////////////////////////////////////////////\par
//Kigy?jti a faluban l\'e9v? nyersi mennyis\'e9g\'e9t, \'e9s elt\'e1rolja. Majd az \'edgy elt\'e1rolt adatokat megjelen\'edti egy t\'e1bl\'e1zatban.\par
////////////////////////////////////////////////////\par
\par
var language;\par
function setLanguage() \{\par
  var arr = server.split("\\.");\par
  language = arr[arr.length - 1];\par
  if (language == "com" && arr.length == 4) \{ //for example: http://s1.ba.ikariam.com\par
    language = arr[1];\par
  \}\par
  var l = getCfgValueNonEmpty("LANGUAGE", language);\par
  if (l != undefined) \{\par
    language = l;\par
  \}\par
\}\par
setLanguage();\par
\par
//adott szintu kocsmaban legfeljebb ennyi bor szolgalhato fel orankent\par
var tavernWineUsage = [0, 3, 5, 8, 11, 14, 17, 21, 25, 29, 33, 38, 42, 47, 52, 57, 63, 68, 73, 78, 84, 90];\par
var townHallSpaces = [0, 60, 96, 143, 200, 263, 333, 410, 492, 580, 672, 769, 871, 977, 1087, 1201, 1320, 1441, 1567, 1696, 1828, 1964, 2103, 2246, 2391, 2540, 2691, 2845, 3003, 3163, 3326, 3492, 3660];\par
var unitsAndShipsIndexes = \{\par
  "unit slinger" : 0,\par
  "unit swordsman" : 1,\par
  "unit phalanx": 2,\par
  "unit ram" : 3,\par
  "unit archer" : 4,\par
  "unit catapult" : 5,\par
  "unit marksman" : 6,\par
  "unit mortar" : 7,\par
  "unit steamgiant" : 8,\par
  "unit gyrocopter" : 9,\par
  "unit bombardier" : 10,\par
  "unit medic" : 11,\par
  "unit cook" : 12,\par
\par
  "unit ship_ram" : 13,\par
  "unit ship_ballista" : 14,\par
  "unit ship_flamethrower" : 15,\par
  "unit ship_catapult" : 16,\par
  "unit ship_mortar" : 17,\par
  "unit ship_steamboat" : 18,\par
  "unit ship_submarine" : 19,\par
\};\par
var unitsAndShipsIndexesR = [];\par
for(key in unitsAndShipsIndexes) \{\par
  unitsAndShipsIndexesR[unitsAndShipsIndexes[key]] = key;\par
\}\par
var unitScoreBasePoints = \{"wood": 2, "wine": 4, "glass": 4, "sulfur": 4\};\par
var warehouseWoodCapacities = [0, 2160, 3200, 4576, 6336, 8424, 9975, 12799, 16152, 19944, 24200, 28791, 34040, 43520, 54439, 66528, 80024, 320096, 640192, 1280384, 2560768, 5121536, 10243072, 20486144, 40972288, 81944576, 163889152, 327778304, 655556608, 1311113216, 2622226432, 5244452864, 10488905728];\par
var warehouseOtherCapacities = [0, 720, 800, 1152, 2352, 2548, 3507, 3780, 5332, 7179, 9347, 11784, 14499, 20028, 23548, 27484, 34932, 139728, 279456, 558912, 1117824, 2235648, 4471296, 8942592, 17885184, 35770368, 71540736, 143081472, 286162944, 572325888, 1144651776, 2289303552, 4578607104];\par
\par
\par
var buildings;\par
var texts;\par
function getLocalizedTexts() \{\par
  if (language == "hu") \{\par
    buildings = \{\par
      "townHall"      : ["V\'e1rosh\'e1za", "V\'e1rosh\'e1za"],\par
      "academy"       : ["Akad\'e9mia", "Akad\'e9mia"],\par
      "port"          : ["Kik\'f6t?", "Kik\'f6t?"],\par
      "shipyard"      : ["Haj\'f3gy\'e1r", "Haj\'f3gy\'e1r"],\par
      "warehouse"     : ["Rakt\'e1r", "Rakt\'e1r"],\par
      "wall"          : ["V\'e1rosfal", "Fal"],\par
      "tavern"        : ["Fogad\'f3", "Fogad\'f3"],\par
      "museum"        : ["M\'fazeum", "M\'fazeum"],\par
      "palace"        : ["Palota", "Palota"],\par
      "palaceColony"  : ["Helytart\'f3", "Helytart\'f3"],\par
      "embassy"       : ["Nagyk\'f6vets\'e9g", "Nagyk\'f6vets\'e9g"],\par
      "branchOffice"  : ["Keresked?", "Keresked?"],\par
      "safehouse"     : ["Rejtekhely", "Rejtekhely"],\par
      "barracks"      : ["Barakk", "Barakk"],\par
      "workshop-army" : ["M?hely", "M?hely"],\par
    \};\par
    texts = \{\par
      "cityName": "V\'e1ros neve", "currentlyBuilding": "\'c9p\'edt\'e9s alatt", "summary": "\'d6sszesen:",\par
      "hide_settings": "Be\'e1ll\'edt\'e1sok elrejt\'e9se", "show_settings": "Be\'e1ll\'edt\'e1sok megtekint\'e9se",\par
    \};\par
  \} else if (language == "de") \{ //german translation, thanks to Schneppi\par
    buildings = \{\par
      "townHall"      : ["Rathaus", "Rathaus"],\par
      "academy"       : ["Academie", "Academie"],\par
      "port"          : ["Handelshafen", "Handelshafen"],\par
      "shipyard"      : ["Schiffswerft", "Schiffswerft"],\par
      "warehouse"     : ["Lagerhaus", "Lagerhaus"],\par
      "wall"          : ["Stadtmauer", "Stadtmauer"],\par
      "tavern"        : ["Taverne", "Taverne"],\par
      "museum"        : ["Museum", "Museum"],\par
      "palace"        : ["Palast", "Palast"],\par
      "palaceColony"  : ["Stadthaltersitz", "Stadthalt"],\par
      "embassy"       : ["Botschaft", "Botschaft"],\par
      "branchOffice"  : ["Kontor", "Kontor"],\par
      "safehouse"     : ["Versteck", "Versteck"],\par
      "barracks"      : ["Kaserne", "Kaserne"],\par
      "workshop-army" : ["Erfinderwerkstatt", "Erfinder"],\par
    \};\par
    texts = \{\par
      "cityName": "Stadtname", "currentlyBuilding": "Zur Zeit im Bau", "summary": "Gesamt:",\par
      "hide_settings": "Hide settings", "show_settings": "Show settings",\par
    \};\par
  \} else if (language == "cz") \{ //cz translation, thanks to pavel10\par
    buildings = \{\par
      "townHall"      : ["M?stsk\'e1 radnice", "radnice"],\par
      "academy"       : ["Akademie", "akademie"],\par
      "port"          : ["Obchodn\'ed p?\'edstav", "pristav"],\par
      "shipyard"      : ["Lodenice", "lodenice"],\par
      "warehouse"     : ["Sklad", "sklad"],\par
      "wall"          : ["M?stsk\'e1 ze?", "zed"],\par
      "tavern"        : ["Hostinec", "hostinec"],\par
      "museum"        : ["Muzeum", "muzeum"],\par
      "palace"        : ["Pal\'e1c", "palac "],\par
      "palaceColony"  : ["Guvern\'e9rova Rezidence", "rezidence"],\par
      "embassy"       : ["Ambas\'e1da", "ambasada"],\par
      "branchOffice"  : ["Tr?nice", "trznice"],\par
      "safehouse"     : ["\'dakryt", "ukryt"],\par
      "barracks"      : ["Kas\'e1rna", "kasarna"],\par
      "workshop-army" : ["D\'edlna", "dilna"],\par
    \};\par
    texts = \{\par
      "cityName": "Jm\'e9no", "currentlyBuilding": "Stav\'ed se", "summary": "Celkem:",\par
      "hide_settings": "Hide settings", "show_settings": "Show settings",\par
    \};\par
  \} else if (language == "tr") \{ //Turkish translation, thanks to Guybrush\par
    buildings = \{\par
      "townHall"      : ["Belediye Binasi", "Bldy"],\par
      "academy"       : ["Akademi", "Akdm"],\par
      "port"          : ["Ticaret Limani", "Limn"],\par
      "shipyard"      : ["Donanma Tersanesi", "Trsn"],\par
      "warehouse"     : ["Depo", "Depo"],\par
      "wall"          : ["Sur", "Sur"],\par
      "tavern"        : ["Taverna", "Tvrna"],\par
      "museum"        : ["M\'fcze", "Muze"],\par
      "palace"        : ["Saray", "Sary"],\par
      "palaceColony"  : ["Vali Konagi", "Vali"],\par
      "embassy"       : ["B\'fcy\'fck El\'e7ilik", "El\'e7lk"],\par
      "branchOffice"  : ["Ticaret Merkezi", "Markt"],\par
      "safehouse"     : ["Istihbarat Merkezi", "Isthb"],\par
      "barracks"      : ["Ki?la", "Ki?la"],\par
      "workshop-army" : ["Mucit At\'f6lyesi", "Mucit"],\par
    \};\par
    texts = \{\par
      "cityName": "?ehir", "currentlyBuilding": "Y\'fckseltilen", "summary": "Toplam:",\par
      "hide_settings": "Hide settings", "show_settings": "Show settings",\par
    \};\par
  \} else if (language == "es") \{ //Spanish translation, thanks to dragondeluz\par
    buildings = \{\par
      "townHall"      : ["Intendencia", "Intendencia"],\par
      "academy"       : ["Academia", "Academia"],\par
      "port"          : ["Puerto comercial", "Puerto"],\par
      "shipyard"      : ["Astillero", "Astillero"],\par
      "warehouse"     : ["Dep\'f3sito", "Dep\'f3sito"],\par
      "wall"          : ["Muro", "Muro"],\par
      "tavern"        : ["Taberna", "Taberna"],\par
      "museum"        : ["Museo", "Museo"],\par
      "palace"        : ["Palacio", "Palacio"],\par
      "palaceColony"  : ["Residencia del Gobernador", "R. Gobernador"],\par
      "embassy"       : ["Embajada", "Embajada"],\par
      "branchOffice"  : ["Tienda", "Tienda"],\par
      "safehouse"     : ["Escondite", "Escondite"],\par
      "barracks"      : ["Cuarteles", "Cuarteles"],\par
      "workshop-army" : ["Taller de Invenciones", "Taller"],\par
    \};\par
    texts = \{\par
      "cityName": "Nombre de la Ciudad", "currentlyBuilding": "Construcci\'f3n Actual", "summary": "Totales:",\par
      "hide_settings": "Hide settings", "show_settings": "Show settings",\par
    \};\par
  \} else if (language == "ba") \{ //Bosnian translation, thanks to Sasha969\par
    buildings = \{\par
      "townHall"      : ["Gradska Vije?nica", "Gradska Vije?nica"],\par
      "academy"       : ["Akademija", "Akademija"],\par
      "port"          : ["Trgova?ka luka", "Trgova?ka luka"],\par
      "shipyard"      : ["Brodogradili?te", "Brodogradili?te"],\par
      "warehouse"     : ["Skladi?te", "Skladi?te"],\par
      "wall"          : ["Gradski bedem", "Gradski bedem"],\par
      "tavern"        : ["Taverna", "Taverna"],\par
      "museum"        : ["Muzej", "Muzej"],\par
      "palace"        : ["Pala?a", "Pala?a"],\par
      "palaceColony"  : ["Guvernerova pala?a", "Guvernerova pala?a"],\par
      "embassy"       : ["Veleposlanstvo", "Veleposlanstvo"],\par
      "branchOffice"  : ["Market", "Market"],\par
      "safehouse"     : ["Skloni?te", "Skloni?te"],\par
      "barracks"      : ["Barake", "Barake"],\par
      "workshop-army" : ["Radionica", "Radionica"],\par
    \};\par
    texts = \{\par
      "cityName": "Ime grda", "currentlyBuilding": "Trenutno se gradi", "summary": "Izvje?taj:",\par
      "hide_settings": "Hide settings", "show_settings": "Show settings",\par
    \};\par
  \} else if (language == "it") \{ //Italian translation, thanks to Brucee\par
    buildings = \{\par
      "townHall"      : ["Municipio", "Municipio"],\par
      "academy"       : ["Accademia", "Accademia"],\par
      "port"          : ["Porto", "Porto"],\par
      "shipyard"      : ["Cantiere navale", "Cantiere navale"],\par
      "warehouse"     : ["Magazzino", "Magazzino"],\par
      "wall"          : ["Muro", "Muro"],\par
      "tavern"        : ["Taverna", "Taverna"],\par
      "museum"        : ["Museo", "Museo"],\par
      "palace"        : ["Palazzo", "Palazzo"],\par
      "palaceColony"  : ["Governatore", "Governatore"],\par
      "embassy"       : ["Ambasciata", "Ambasciata"],\par
      "branchOffice"  : ["Mercato", "Mercato"],\par
      "safehouse"     : ["Rudere", "Rudere"],\par
      "barracks"      : ["Caserma", "Caserma"],\par
      "workshop-army" : ["Officina", "Officina"],\par
    \};\par
    texts = \{\par
      "cityName": "Citta", "currentlyBuilding": "Costruzione in corso", "summary": "Sommario:",\par
      "hide_settings": "Hide settings", "show_settings": "Show settings",\par
    \};\par
  \} else if (language == "pt") \{ //Portuguese translation, thanks to alpha tester\par
    buildings = \{\par
      "townHall"      : ["C\'e2mara Municipal", "C\'e2mara Municipal"],\par
      "academy"       : ["Academia", "Academia"],\par
      "port"          : ["Porto Mercantil", "Porto Mercantil"],\par
      "shipyard"      : ["Estaleiro", "Estaleiro"],\par
      "warehouse"     : ["Armaz\'e9m", "Armaz\'e9m"],\par
      "wall"          : ["Muralha", "Muralha"],\par
      "tavern"        : ["Taberna", "Taberna"],\par
      "museum"        : ["Museu", "Museu"],\par
      "palace"        : ["Pal\'e1cio", "Pal\'e1cio"],\par
      "palaceColony"  : ["Residencia do Governador", "Residencia do Governador"],\par
      "embassy"       : ["Embaixada", "Embaixada"],\par
      "branchOffice"  : ["Mercado", "Mercado"],\par
      "safehouse"     : ["Espionagem", "Espionagem"],\par
      "barracks"      : ["Quartel", "Quartel"],\par
      "workshop-army" : ["Oficina", "Oficina"],\par
    \};\par
    texts = \{\par
      "cityName": "Cidades", "currentlyBuilding": "Em Constru\'e7ao", "summary": "Sum\'e1rio:",\par
      "hide_settings": "Ocultar Configura\'e7oes", "show_settings": "Ver Configura\'e7oes",\par
    \};\par
  \} else if (language == "fr") \{ //French translation, thanks to Chirel\par
    buildings = \{\par
      "townHall"      : ["H\'f4tel de ville", "H\'f4tel"],\par
      "academy"       : ["Acad\'e9mie", "Acad\'e9mie"],\par
      "port"          : ["Port commercial", "Port"],\par
      "shipyard"      : ["Chantier naval", "Chantier"],\par
      "warehouse"     : ["Entrep\'f4t", "Entrep\'f4t"],\par
      "wall"          : ["Mur d'enceinte", "Mur"],\par
      "tavern"        : ["Taverne", "Taverne"],\par
      "museum"        : ["Mus\'e9e", "Mus\'e9e"],\par
      "palace"        : ["Palais", "Palais"],\par
      "palaceColony"  : ["R\'e9sidence du Gouverneur", "R\'e9sidence"],\par
      "embassy"       : ["Ambassade", "Ambassade"],\par
      "branchOffice"  : ["Comptoir", "Comptoir"],\par
      "safehouse"     : ["Cachette", "Cachette"],\par
      "barracks"      : ["Caserne", "Caserne"],\par
      "workshop-army" : ["Atelier", "Atelier"],\par
    \};\par
    texts = \{\par
      "cityName": "Nom ville", "currentlyBuilding": "Construction en cours", "summary": "Total:",\par
      "hide_settings": "Hide settings", "show_settings": "Show settings",\par
    \};\par
  \} else if (language == "pl") \{ //Polish translation, thanks to -S-X-\par
    buildings = \{\par
      "townHall"      : ["Ratusz", "Ratusz"],\par
      "academy"       : ["Akademia", "Akademia"],\par
      "port"          : ["Port", "Port"],\par
      "shipyard"      : ["Stocznia", "Stocznia"],\par
      "warehouse"     : ["Magazyn", "Magazyn"],\par
      "wall"          : ["Mur", "Mur"],\par
      "tavern"        : ["Tawerna", "Tawerna"],\par
      "museum"        : ["Muzeum", "Muzeum"],\par
      "palace"        : ["Pa?ac", "Pa?ac"],\par
      "palaceColony"  : ["Stolica", "Stolica"],\par
      "embassy"       : ["Ambasada", "Ambasada"],\par
      "branchOffice"  : ["Mercato", "Mercato"],\par
      "safehouse"     : ["Rudere", "Rudere"],\par
      "barracks"      : ["Koszary", "Koszary"],\par
      "workshop-army" : ["Warsztat", "Warsztat"],\par
    \};\par
    texts = \{\par
      "cityName": "Nazwa Miasta", "currentlyBuilding": "Obecnie w budowie", "summary": "Podsumowanie:",\par
      "hide_settings": "Ukryj ustawienia", "show_settings": "Poka? ustawienia",\par
    \};\par
  \} else if (language == "ro") \{ //by Atomic\par
    buildings = \{\par
      "townHall"      : ["Prim?ria", "Prim?ria"],\par
      "academy"       : ["Academie", "Academie"],\par
      "port"          : ["Portcomercial", "PortComer?"],\par
      "shipyard"      : ["?antier naval", "?antierNav"],\par
      "warehouse"     : ["Magazie", "Magazie"],\par
      "wall"          : ["Zidurile ora?ului", "Zid"],\par
      "tavern"        : ["Taverna", "Taverna"],\par
      "museum"        : ["Muzeu", "Muzeu"],\par
      "palace"        : ["Palat", "Palat"],\par
      "palaceColony"  : ["Re?edinta Guvernatorului", "Re?.Guv."],\par
      "embassy"       : ["Ambasad?", "Ambasad?"],\par
      "branchOffice"  : ["Punct de nego?", "PunctNego?"],\par
      "safehouse"     : ["Ascunz?toare", "Ascunz?."],\par
      "barracks"      : ["Casarma", "Casarma"],\par
      "workshop-army" : ["Atelier", "Atelier"], \par
    \};\par
    texts = \{\par
      "cityName": "NumeleOra?ului", "currentlyBuilding": "In construc?ie",\par
      "summary" : "Total:", "hide_settings": "Inchide Setarile", "show_settings": "Vezi Setarile",\par
    \};\par
  \} else if (language == "ru") \{ //by LiFeAiR\par
    buildings = \{\par
      "townHall"      : ["Town Hall", "??????"],\par
      "academy"       : ["Academy", "????????"],\par
      "port"          : ["Trading Port", "???????? ????"],\par
      "shipyard"      : ["Shipyard", "?????"],\par
      "warehouse"     : ["Warehouse", "?????"],\par
      "wall"          : ["Wall", "?????"],\par
      "tavern"        : ["Tavern", "???????"],\par
      "museum"        : ["Museum", "?????"],\par
      "palace"        : ["Palace", "??????"],\par
      "palaceColony"  : ["Governor's Residence", "??????????"],\par
      "embassy"       : ["Embassy", "??????????"],\par
      "branchOffice"  : ["Trading Post", "?????"],\par
      "safehouse"     : ["Hideout", "???????"],\par
      "barracks"      : ["Barracks", "???????"],\par
      "workshop-army" : ["Workshop", "??????????"],\par
    \};\par
    texts = \{\par
      "cityName": "?????", "currentlyBuilding": "????????", "summary": "?????:",\par
      "hide_settings": "?????? ?????????", "show_settings": "???????? ?????????",\par
    \};\par
  \} else \{\par
    buildings = \{\par
      "townHall"      : ["Town Hall", "Town Hall"],\par
      "academy"       : ["Academy", "Academy"],\par
      "port"          : ["Trading Port", "Trading Port"],\par
      "shipyard"      : ["Shipyard", "Shipyard"],\par
      "warehouse"     : ["Warehouse", "Warehouse"],\par
      "wall"          : ["Wall", "Wall"],\par
      "tavern"        : ["Tavern", "Tavern"],\par
      "museum"        : ["Museum", "Museum"],\par
      "palace"        : ["Palace", "Palace"],\par
      "palaceColony"  : ["Governor's Residence", "Governor"],\par
      "embassy"       : ["Embassy", "Embassy"],\par
      "branchOffice"  : ["Trading Post", "Trading Post"],\par
      "safehouse"     : ["Hideout", "Hideout"],\par
      "barracks"      : ["Barracks", "Barracks"],\par
      "workshop-army" : ["Workshop", "Workshop"],\par
    \};\par
    texts = \{\par
      "cityName": "City name", "currentlyBuilding": "Currently building", "summary": "Summary:",\par
      "hide_settings": "Hide settings", "show_settings": "Show settings",\par
    \};\par
  \}\par
\}\par
\par
getLocalizedTexts();\par
\par
//lots of code to get the city id. The code trys to find the city id no matter which "city dropdown view" the user has chosen.\par
var city_id = getIntValue(getNode_value("//option[@class='avatarCities coords' and @selected='selected']"), 0);\par
if (city_id == 0)\{\par
    city_id = getIntValue(getNode_value("//option[@class='avatarCities' and @selected='selected']"), 0);\tab\par
\}\par
if (city_id == 0)\{\par
    city_id = getIntValue(getNode_value("//option[@class='avatarCities tradegood1' and @selected='selected']"), 0);\par
\}\par
\par
if (city_id == 0)\{\par
    city_id = getIntValue(getNode_value("//option[@class='avatarCities tradegood2' and @selected='selected']"), 0);\par
\}\par
\par
if (city_id == 0)\{\par
    city_id = getIntValue(getNode_value("//option[@class='avatarCities tradegood3' and @selected='selected']"), 0);\par
\}\par
\par
if (city_id == 0)\{\par
    city_id = getIntValue(getNode_value("//option[@class='avatarCities tradegood4' and @selected='selected']"), 0);\par
\}\par
\par
//var city_idmainView = getNodeValue("id('breadcrumbs')/*[@class='city']");\par
var city_name = getNodeValue("id('breadcrumbs')/*[@class='city']");\par
//var island_id = getNodeValue("id('breadcrumbs')//a[@title='Back to the island']");\par
//if (island_id == undefined)\{\par
//\tab island_id = "";\par
//\}\par
var island_id = getNodeValue("id('breadcrumbs')//a[@class='island']");\par
if ( island_id == undefined || island_id == 0 )\par
    island_id = /\\[[0-9][0-9]:[0-9][0-9]\\]/.exec(getNode("id('breadcrumbs')").innerHTML)[0];\par
\par
//city_idmainView = TrimIsland(island_id)+" "+city_idmainView;\par
var city_idmainView = getNode_value("//option[@class='avatarCities coords' and text()='"+TrimIsland(island_id)+" "+city_name+"']", 0);\par
if (city_idmainView == 0)\{\par
    city_idmainView = getNode_value("//option[@class='avatarCities' and text()=' "+city_name+"']", 0);\tab\par
\}\par
if (city_idmainView == 0)\{\par
    city_idmainView = getNode_value("//option[@class='avatarCities tradegood1' and @selected='selected' and text()='"+city_name+"']", 0);\tab\par
\}\par
if (city_idmainView == 0)\{\par
    city_idmainView = getNode_value("//option[@class='avatarCities tradegood2' and @selected='selected' and text()='"+city_name+"']", 0);\tab\par
\}\par
if (city_idmainView == 0)\{\par
    city_idmainView = getNode_value("//option[@class='avatarCities tradegood3' and @selected='selected' and text()='"+city_name+"']", 0);\tab\par
\}\par
if (city_idmainView == 0)\{\par
    city_idmainView = getNode_value("//option[@class='avatarCities tradegood4' and @selected='selected' and text()='"+city_name+"']", 0);\tab\par
\}\par
\par
//a varos koordinataja\par
var a = getNode("//div[@id='breadcrumbs']/*[@class='island' and contains(text(), '[')]", "");\par
if (a == null) \{\par
  a = getNode("//a[contains(@href, '?view=island')]/span[contains(text(), '[')]", "");\par
  if (a != null) \{\par
    a = a.parentNode;\par
  \}\par
\}\par
var city_coord = "";\par
var island_id = "";\par
if (a != null) \{\par
  if (/(\\[[0-9:]+\\])/.exec(a.innerHTML)) \{\par
    city_coord = RegExp.$1;\par
    if (/[?&]id=([0-9]+)/.exec(a.href) != null) \{\par
      island_id = RegExp.$1;\par
    \}\par
  \}\par
\}\par
if (island_id == "" && (/view=island&id=([0-9]+)/.exec(document.URL) != null)) \{ //sziget n\'e9zetben az urlben van a sziget id-je\par
  island_id = RegExp.$1;\par
\}\par
log("server: "+server+", language: "+language+", city_id: "+city_id+", city_idmainView: "+city_idmainView+", city_coord: "+city_coord+", island_id: "+island_id);\par
\par
//seg\'e9d f\'fcggv\'e9nyek\par
function getVar(varname, vardefault) \{\par
  var res = GM_getValue(server+varname);\par
  if (res == undefined) \{\par
    return vardefault;\par
  \}\par
  return res;\par
\}\par
function setVar(varname, varvalue) \{\par
  GM_setValue(server+varname, varvalue);\par
\}\par
function getCity(city_id) \{\par
  city_id = "city_"+city_id;\par
  if (config[city_id] == undefined) \{\par
    config[city_id] = new Resource();\par
  \}\par
  return config[city_id];\par
\}\par
function getPath(node) \{\par
  if (node == null || node == undefined) \{\par
    return "/";\par
  \}\par
  return getPath(node.parentNode) + "/" + node.nodeName + "["+node.id+"]";\par
\}\par
function getNode(path) \{\par
  var value = xpath(path);\par
  if (value.snapshotLength == 1) \{\par
    return value.snapshotItem(0);\par
  \}\par
  log("Pontosan 1 elemet kellett volna visszaadnia: "+path+", de "+value.snapshotLength+" elemet adott vissza");\par
  for(var i = 0; i < value.snapshotLength; i++) \{\par
    log(i+".: "+getPath(value.snapshotItem(i)));\par
  \}\par
  return null;\par
\}\par
//get node's textContent\par
function getNodeValue(path, defaultValue) \{\par
  var value = getNode(path);\par
  if (value != null) \{\par
    return value.textContent;\par
  \}\par
  return defaultValue;\par
\}\par
//get node's value attribute\par
function getNode_value(path, defaultValue) \{\par
  var value = getNode(path);\par
  if (value != null) \{\par
    return value.value;\par
  \}\par
  return defaultValue;\par
\}\par
//get node's title attribute\par
function getNodeTitle(path, defaultValue) \{\par
  var value = getNode(path);\par
  if (value != null) \{\par
    return value.title;\par
  \}\par
  return defaultValue;\par
\}\par
function getIntValue(str, defaultValue) \{\par
  var temp = ""+str;\par
  temp = temp.replace(/[^0-9]+/g, "");\par
  temp = parseInt(temp);\par
  if (defaultValue != undefined && (temp == undefined || (""+temp == "NaN"))) \{\par
    return defaultValue;\par
  \}\par
  return temp;\par
\}\par
function mynumberformat(num, alwaysShowSign) \{\par
  var s = ""+num;\par
  if (num == undefined || s == "NaN") \{\par
    return "-";\par
  \}\par
  if (num == "?") \{\par
    return num;\par
  \}\par
  var negative = "";\par
  if (s.substring(0, 1) == "-") \{\par
    negative = "-";\par
    s = s.substring(1);\par
  \} else if (alwaysShowSign == true) \{\par
    negative = "+";\par
  \}\par
  var i = s.length-3;\par
  while (i > 0) \{\par
    s = s.substring(0, i) + "." + s.substring(i);\par
    i -= 3;\par
  \}\par
  return negative + s;\par
\}\par
var _cachedDecimalPoint = undefined;\par
function getDecimalPoint() \{ //hack\par
  if (_cachedDecimalPoint == undefined) \{\par
    _cachedDecimalPoint = new Number(1.5).toLocaleString().substring(1, 2);\par
    if (_cachedDecimalPoint == undefined || _cachedDecimalPoint == "") \{\par
      _cachedDecimalPoint = ",";\par
    \}\par
  \}\par
  return _cachedDecimalPoint;\par
\}\par
function floatFormat(num, fracdigits, alwaysShowSign) \{\par
  var s = ""+num;\par
  if (num == "?") \{\par
    return num;\par
  \}\par
  var negative = "";\par
  if (s.substring(0, 1) == "-") \{\par
    negative = "-";\par
    s = s.substring(1);\par
  \} else if (alwaysShowSign == true) \{\par
    negative = "+";\par
  \}\par
  var p = s.indexOf(".");\par
  if (p >= 0) \{\par
    var i = s.substring(0, p);\par
    var frac = s.substring(p + 1, p + 1 + fracdigits);\par
    while (frac.length < fracdigits) \{\par
      frac += "0";\par
    \}\par
    s = i + getDecimalPoint() + frac;\par
  \}\par
  return negative + s;\par
\}\par
function digProducedResources(res) \{\par
  var scripts = document.getElementsByTagName("script");\par
        var nScript = scripts[scripts.length - 1];\par
        var sCode = nScript.innerHTML;\par
      \par
        var aCodeLines = sCode.split(';');\par
        if (aCodeLines.length < 24)\par
          return;\par
        var sWood = aCodeLines[24].substring(aCodeLines[24].indexOf('(')+2,aCodeLines[24].indexOf(')')-1);\par
        var startResourcesDelta = /production: *([0-9.]+)/.exec(sWood);\par
        if (startResourcesDelta != null) \{\par
          startResourcesDelta = parseFloat(RegExp.$1) * 3600;\par
        \} else \{\par
          startResourcesDelta = 0;\par
        \}\par
        var sTradeGood = aCodeLines[27].substring(aCodeLines[27].indexOf('(')+2,aCodeLines[27].indexOf(')')-1);\par
        var startTradegoodDelta = /production: *([0-9.]+)/.exec(sTradeGood);\par
        if (startTradegoodDelta != null) \{\par
          startTradegoodDelta = parseFloat(RegExp.$1) * 3600;\par
        \} else \{\par
          startTradegoodDelta = 0;\par
        \}\par
      \par
        var sName = /valueElem: \\"(.*?)\\"/.exec(sTradeGood);\par
        var sTradeGoodName = sName[1];\par
      \par
      //  var res = getCity(city_id);\par
        res.prodwood = startResourcesDelta;\par
        res.prodwine = 0;\par
        res.prodmarble = 0;\par
        res.prodglass = 0;\par
        res.prodsulfur = 0;\par
        res.prodtime = ""+new Date().getTime(); //a leolvasas idopontja\par
        if (sTradeGoodName == "value_wine") \{\par
          res.prodwine = startTradegoodDelta;\par
        \} else if (sTradeGoodName == "value_marble") \{\par
          res.prodmarble = startTradegoodDelta;\par
        \} else if (sTradeGoodName == "value_crystal") \{\par
          res.prodglass = startTradegoodDelta;\par
        \} else if (sTradeGoodName == "value_sulfur") \{\par
          res.prodsulfur = startTradegoodDelta;\par
        \}\par
      \}\par
\par
function getCurrentResourceAmount(currenttime, startTime, startAmount, factPerHour) \{\par
  var elapsedhours = (currenttime - startTime) / 1000.0 / 3600.0;\par
  return Math.max(0, Math.floor(startAmount + elapsedhours * factPerHour));\par
\}\par
function realtimeFactDisplayF(tmp, noloop) \{\par
  var currenttime = new Date().getTime();\par
  var counters = xpath("//font[contains(@id, 'myresourcecounter')]");\par
  for(var i=0; i < counters.snapshotLength; i++) \{\par
    var c = counters.snapshotItem(i);\par
    if (c.color != "#ff0000") \{\par
      var arr = c.lang.split(",");\par
      var startTime = arr[0];\par
      var startAmount = parseFloat(arr[1]);\par
      var factPerHour = parseFloat(arr[2]);\par
\par
      c.innerHTML = mynumberformat(getCurrentResourceAmount(currenttime, startTime, startAmount, factPerHour));\par
    \}\par
  \}\par
/*  if ((noloop == undefined) && (counters.snapshotLength > 0)) \{\par
    window.setTimeout(realtimeFactDisplayF, 1000);\par
  \}*/\par
  return (counters.snapshotLength > 0);\par
\}\par
function createTooltipAttribute(tooltip) \{\par
  if (tooltip == undefined || tooltip == "") \{\par
    return "";\par
  \}\par
  var html = "<table border='0' cellspacing='4' cellpadding=4 class=''><tr><td>"+tooltip+"</td></tr></table>";\par
  return "onmouseover=\\"Tip('"+(html.replace(/'/g, "\\\\'"))+"', STICKY, false, FOLLOWMOUSE, false, DELAY, 1, SHADOW, false, ABOVE, true);\\"";\par
\}\par
function createTooltip(content, tooltip) \{\par
  if (tooltip == undefined || tooltip == "") \{\par
    return content;\par
  \}\par
  return "<font "+createTooltipAttribute(tooltip)+">"+content+"</font>";\par
\}\par
function createCounter(startTime, startAmount, factPerHour, showTooltip, maxCapacity, plusText) \{\par
  intfactPerHour = Math.round(factPerHour);\par
  var dailyFact = Math.round(24 * factPerHour);\par
  var tooltip = "";\par
  if ((showTooltip == true) && (dailyFact != 0)) \{\par
    tooltip = mynumberformat(intfactPerHour, true)+" / h, "+mynumberformat(dailyFact, true)+" / d";\par
  \}\par
  var res;\par
  if (factPerHour != 0) \{\par
    res = "<font id='myresourcecounter' lang='"+startTime+","+startAmount+","+factPerHour+"'>x</font>";\par
    if (intfactPerHour > 0) \{\par
      res = "<b>"+res+"</b>";\par
    \}\par
  \} else \{\par
    res = mynumberformat(startAmount);\par
  \}\par
  if (plusText != undefined) \{\par
    res += plusText;\par
  \}\par
  res = createTooltip(res, tooltip);\par
  //progress bar :)\par
  if ((PROGRESS_BAR_MODE != "off") && (maxCapacity > 0)) \{\par
    var curres = getCurrentResourceAmount(new Date().getTime(), startTime, startAmount, factPerHour);\par
    var perc = Math.min(100, Math.round(curres / maxCapacity * 100.0));\par
    var remaining = "";\par
    var remhour = 100000000;\par
    if (factPerHour > 0) \{\par
      remhour = (maxCapacity - curres) / factPerHour;\par
      remaining = "<br>"+floatFormat(remhour, 1) + " h to full";\par
    \} else if (factPerHour < 0) \{\par
      remaining = "<br>"+floatFormat(curres / -factPerHour, 1) + " h to empty";\par
    \}\par
    var cl = "myPercentNormal";\par
    if (PROGRESS_BAR_MODE == "percent") \{\par
      if (perc == 100) \{\par
        cl = "myPercentFull";\par
      \} else if (perc > 95) \{\par
        cl = "myPercentAlmostFull";\par
      \} else if (perc > 80) \{\par
        cl = "myPercentWarning";\par
      \}\par
    \} else if (PROGRESS_BAR_MODE == "time") \{\par
      if (remhour == 0) \{\par
        cl = "myPercentFull";\par
      \} else if (remhour < 8) \{\par
        cl = "myPercentAlmostFull";\par
      \} else if (remhour < 16) \{\par
        cl = "myPercentWarning";\par
      \}\par
    \} else \{\par
      log("ismeretlen progress bar mode: "+PROGRESS_BAR_MODE);\par
    \}\par
    res +=  "<table class='myPercent'>"+\par
            "<tr class='myPercent' "+createTooltipAttribute(mynumberformat(maxCapacity) + " total capacity<br>" + perc+"% full" + remaining)+">"+\par
            "<td width='"+perc+"%' class='"+cl+"'></td>"+\par
            "<td width='"+(100-perc)+"%' class='myPercentRemaining'></td>"+\par
            "</tr>"+\par
            "</table>";\par
  \}\par
  return res;\par
\}\par
function twodigit(val) \{\par
  if(val < 10) \{\par
    return "0"+val;\par
  \}\par
  return val;\par
\}\par
var nextTimemyTimeCounterF = undefined;\par
function myTimeCounterF(tmp, onlyOnce) \{\par
  var currenttime = new Date().getTime();\par
  if (nextTimemyTimeCounterF == undefined) \{\par
    nextTimemyTimeCounterF = Math.floor(currenttime/1000) * 1000 + 100;\par
  \}\par
  var cs = xpath("//font[contains(@id, 'mytimecounter')]");\par
  for (var i = 0; i < cs.snapshotLength; i++) \{\par
    var c = cs.snapshotItem(i);\par
    var abstime = Math.round(c.lang);\par
    hdata = (abstime - currenttime) / 1000;\par
    if (hdata > 0) \{\par
      var hday = Math.floor(hdata / 86400);\par
      var hhor = Math.floor((hdata - (hday * 86400)) / 3600);\par
      var hmin = Math.floor((hdata - (hday * 86400) - (hhor * 3600)) / 60);\par
      var hsec = Math.floor(hdata - (hday * 86400) - (hhor * 3600) - (hmin * 60));\par
      var s = "";\par
      var b = false;\par
      if (b || hday > 0) \{ s += hday+"d "; b = true; \}\par
      b = true; //az \'f3ra, perc, mp mindig l\'e1tsszon\par
      if (b || hhor > 0) \{ s += hhor+":"; b = true; \}\par
      if (b || hmin > 0) \{ s += twodigit(hmin)+":"; b = true; \}\par
      if (b || hsec > 0) \{ s += twodigit(hsec)+""; b = true; \}\par
      c.innerHTML = s;\par
    \} else \{\par
      c.innerHTML = "-";\par
    \}\par
  \}\par
  var found = realtimeFactDisplayF(0, 1);\par
/*  if (onlyOnce != true && (found || (cs.snapshotLength > 0))) \{\par
    nextTimemyTimeCounterF += 1000;\par
    window.setTimeout(myTimeCounterF, Math.max(20, nextTimemyTimeCounterF - new Date().getTime()));\par
  \}*/\par
\}\par
function createTimeCounter(enddate) \{\par
  if (enddate != undefined && enddate != "") \{\par
    var s = smartDateFormat(enddate);\par
    return createTooltip("<font id='mytimecounter' lang='"+enddate+"' class='time_counter'></font>", s);\par
  \}\par
  return "";\par
\}\par
function createProd(prodPerHour, extraTooltip) \{\par
  if (""+prodPerHour == "" || ""+prodPerHour == "0" || prodPerHour == undefined || ""+prodPerHour == "NaN") \{\par
    return "";\par
  \}\par
  var tooltip = mynumberformat(Math.round(24 * prodPerHour), true)+" / d";\par
  if (extraTooltip != undefined) \{\par
    tooltip += ", "+extraTooltip;\par
  \}\par
  return createTooltip(mynumberformat(Math.round(prodPerHour), true), tooltip);\par
\}\par
function serialize(txt) \{\par
  return uneval(txt); //new version\par
\}\par
function unserialize(txt)\{\par
  if (txt.substr(0,1) == "(") \{ //new version\par
    return eval(txt);\par
  \}\par
  var level=0,arrlen=new Array(),del=0,final=new Array(),key=new Array(),save=txt;\par
  while(1)\{\par
    switch(txt.substr(0,1))\{\par
    case 'N':\par
      del = 2;\par
      ret = null;\par
    break;\par
    case 'b':\par
      del = txt.indexOf(';')+1;\par
      ret = (txt.substring(2,del-1) == '1')?true:false;\par
    break;\par
    case 'i':\par
      del = txt.indexOf(';')+1;\par
      ret = Number(txt.substring(2,del-1));\par
    break;\par
    case 'd':\par
      del = txt.indexOf(';')+1;\par
      ret = Number(txt.substring(2,del-1));\par
    break;\par
    case 's':\par
      del = txt.substr(2,txt.substr(2).indexOf(':'));\par
      ret = txt.substr( 1+txt.indexOf('"'),del);\par
      del = txt.indexOf('"')+ 1 + ret.length + 2;\par
    break;\par
    case 'a':\par
      del = txt.indexOf(':\{')+2;\par
      ret = new Object();\par
      arrlen[level+1] = Number(txt.substring(txt.indexOf(':')+1, del-2))*2;\par
    break;\par
    case 'O':\par
      txt = txt.substr(2);\par
      var tmp = txt.indexOf(':"')+2;\par
      var nlen = Number(txt.substring(0, txt.indexOf(':')));\par
      name = txt.substring(tmp, tmp+nlen );\par
      //log(name);\par
      txt = txt.substring(tmp+nlen+2);\par
      del = txt.indexOf(':\{')+2;\par
      ret = new Object();\par
      arrlen[level+1] = Number(txt.substring(0, del-2))*2;\par
    break;\par
    case '\}':\par
      txt = txt.substr(1);\par
      if(arrlen[level] != 0)\{log('var missed : '+save); return undefined;\};\par
      //log(arrlen[level]);\par
      level--;\par
    continue;\par
    default:\par
      if(level==0) return final;\par
      log('syntax invalid(1) : '+save+"\\nat\\n"+txt+"level is at "+level);\par
      return undefined;\par
    \}\par
    if(arrlen[level]%2 == 0)\{\par
      if(typeof(ret) == 'object')\{log('array index object no accepted : '+save);return undefined;\}\par
      if(ret == undefined)\{log('syntax invalid(2) : '+save);return undefined;\}\par
      key[level] = ret;\par
    \} else \{\par
      var ev = '';\par
      for(var i=1;i<=level;i++)\{\par
        if(typeof(key[i]) == 'number')\{\par
          ev += '['+key[i]+']';\par
        \}else\{\par
          ev += '["'+key[i]+'"]';\par
        \}\par
      \}\par
      eval('final'+ev+'= ret;');\par
    \}\par
    arrlen[level]--;//log(arrlen[level]-1);\par
    if(typeof(ret) == 'object') level++;\par
    txt = txt.substr(del);\par
    continue;\par
  \}\par
\}\par
function getArrValue(arr, key, defaultValue) \{\par
  if (arr == undefined || arr[key] == undefined) \{\par
    return defaultValue;\par
  \}\par
  return arr[key];\par
\}\par
function createLink(text, href, attrs) \{\par
  return "<a href=\\""+href+"\\" "+attrs+">"+text+"</a>";\par
\}\par
function createLinkToCity(text, city_id, city_index) \{\par
  return createLink(text, "?view=city&id="+city_id, "onclick=\\"var s = document.getElementById('citySelect'); s.selectedIndex = "+city_index+"; s.form.submit(); return false;\\"");\par
\}\par
function createLinkToForeignCity(text, city_id) \{\par
  return createLink(text, "?view=island&id="+city_id);\par
\}\par
function createLinkToResource(text, island_id, city_id, city_index) \{\par
  if (island_id != undefined && island_id != "") \{\par
    return createLink(text, "?action=header&function=changeCurrentCity&oldView=tradegood&view=resource&type=resource&id="+island_id+"&cityId="+city_id, "");\par
  \}\par
  return text;\par
\}\par
function createLinkToTradegoodCond(condition, text, island_id, city_id, city_index) \{\par
  if (condition == true && island_id != undefined && island_id != "") \{\par
    return createLink(text, "?action=header&function=changeCurrentCity&oldView=tradegood&view=tradegood&type=tradegood&id="+island_id+"&cityId="+city_id, "");\par
  \}\par
  return text;\par
\}\par
function strToDatetime(str) \{\par
  var d;\par
  if (/([0-9][0-9][0-9][0-9])\\.([0-9][0-9])\\.([0-9][0-9])[^0-9]*([0-9]+)\\:([0-9]+)\\:([0-9]+)/.exec(str) != null) \{\par
    d = new Date(RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6);\par
  \} else if (/([0-9][0-9])\\.([0-9][0-9])\\.([0-9][0-9][0-9][0-9])[^0-9]*([0-9]+)\\:([0-9]+)\\:([0-9]+)/.exec(str) != null) \{\par
    d = new Date(RegExp.$3, RegExp.$2, RegExp.$1, RegExp.$4, RegExp.$5, RegExp.$6);\par
  \}\par
  if (d != undefined) \{\par
    return d.getTime();\par
  \}\par
  return undefined;\par
\}\par
function getArrivingGoods(city_id, resName) \{\par
  var tooltip = "<table class='arrivinggoodstooltip'>";\par
  var rows = getArrValue(config.arrivinggoods, city_id, []);\par
  var key;\par
  var found = false;\par
  for (key in rows) \{\par
    var row = rows[key];\par
    var res = row["res"];\par
    var a = getArrValue(res, resName, 0);\par
    if (a > 0) \{\par
      var startcity = getArrValue(row, "startcity", "");\par
      var quest = getArrValue(row, "quest", "");\par
      var arrivetime = getArrValue(row, "arrivetime", "");\par
      tooltip += "<tr class='arrivinggoodstooltip'>"+\par
                 "<td class='arrivinggoodstooltip' align=right>"+mynumberformat(a, true) + "</td>"+\par
                 "<td class='arrivinggoodstooltip'>" + startcity + "</td>"+\par
                 "<td class='arrivinggoodstooltip'>" + quest + "</td>"+\par
                 "<td class='arrivinggoodstooltip'>" + arrivetime + "</td>"+\par
                 "</tr>";\par
      found = true;\par
    \}\par
  \}\par
  tooltip += "</table>";\par
  var s = "";\par
  if (found) \{\par
    s = " "+createTooltip("<font class='arrivinggoods'>++</font>", tooltip);\par
  \}\par
  return s;\par
\}\par
function getNextNode(node) \{\par
  var n = node.nextSibling;\par
  while (n != undefined && n != null && n.nodeName == "#text") \{\par
    n = n.nextSibling;\par
  \}\par
  return n;\par
\}\par
function getPreviousNode(node) \{\par
  var n = node.previousSibling;\par
  while (n != undefined && n != null && n.nodeName == "#text") \{\par
    n = n.previousSibling;\par
  \}\par
  return n;\par
\}\par
\par
//megadja, hogy az adott boldogsagi szinten mennyi ido kell egy plusz ember szaporodasahoz. ezredmasodpercekben adja meg.\par
function getOnePeopleGrowthTime(happiness) \{\par
  if (happiness != 0) \{\par
    return 3600/0.02/happiness*1000;\par
  \}\par
  return "NaN";\par
\}\par
//megadja, hogy varhatoan mekkora a populacio aktualis merete. Azon a feltetelezesen alapul, hogy a\par
//boldogsag csak a populacio hatasara valtozik, mas tenyezo nem befolyasolja. Ha ez nem teljesul,\par
//akkor rossz eredmenyt fog adni.\par
function getEstimatedPopulation(population, startTime, currenttime, startHappiness) \{\par
  var happiness = startHappiness;\par
  startTime = Number(startTime);\par
//  log("getEstimatedPopulation("+population+", "+startTime+", "+currenttime+", "+startHappiness+")");\par
  while (happiness > 0) \{\par
    var t = getOnePeopleGrowthTime(happiness);\par
//    log(population+", "+startTime+", "+currenttime+", "+happiness+", t: "+t);\par
    if (t == "NaN" || startTime + t > currenttime) \{\par
      break;\par
    \}\par
    population++;\par
    happiness--;\par
    startTime += t;\par
  \}\par
  return population;\par
\}\par
\par
function getGrowthRemainingHours(population, maxPopulation, startTime, happiness) \{\par
  if (maxPopulation - population > happiness) \{\par
    return "&#8734; h";\par
  \}\par
  var time = Number(startTime);\par
  while (population < maxPopulation) \{\par
    var t = getOnePeopleGrowthTime(happiness);\par
    if (t == "NaN") \{\par
      return "&#8734; h";\par
    \}\par
    time += t;\par
    population++;\par
    happiness--;\par
  \}\par
  return floatFormat((time - Number(startTime)) / 1000 / 3600, 1) + " h";\par
\}\par
\par
function smartDateFormat(time, showElapsedTime, elapsedTimeSeparator) \{\par
  if (showElapsedTime != true) \{\par
    showElapsedTime = false;\par
  \}\par
  if (elapsedTimeSeparator == undefined) \{\par
    elapsedTimeSeparator = ",";\par
  \}\par
  var s = new Date();\par
  s.setTime(time);\par
  var now = new Date();\par
  var t = "";\par
  if (now.getYear() != s.getYear() || now.getMonth() != s.getMonth() || now.getDate() != s.getDate()) \{\par
    t = s.toLocaleString();\par
  \} else \{\par
    t = twodigit(s.getHours())+":"+twodigit(s.getMinutes())+":"+twodigit(s.getSeconds());\par
  \}\par
  if (showElapsedTime) \{\par
    t += elapsedTimeSeparator;\par
    var d = (now.getTime() - s.getTime()) / 1000;\par
    if (d < 3600) \{\par
      t += " " + Math.floor(d / 60) + "m";\par
    \} else \{\par
      if (d >= 86400) \{\par
        t += " " + Math.floor(d / 86400) + "d";\par
      \}\par
      t += " " + floatFormat((d % 86400) / 3600, 1) + "h";\par
    \}\par
  \}\par
  return t;\par
\}\par
\par
function createLastUpdateAsTooltip(content, time) \{\par
  return createTooltip(content, "last update: "+smartDateFormat(time, true));\par
\}\par
\par
//nyersi oszt\'e1ly\par
function Resource() \{\par
//  this.city_coord = city_coord;\par
  this.wood = 0;\par
  this.wine = 0;\par
  this.marble = 0;\par
  this.glass = 0;\par
  this.sulfur = 0;\par
  this.underConstruction = "-";\par
  this.population = 0;\par
  this.buildings = \{\};\par
  this.units = \{\};\par
\}\par
\par
log("time0: "+(new Date().getTime() - _startTime)+" msec");\par
\par
\par
\par
if (language == "hu") \{ //csak magyar szerveren\par
  //\'fczenetek fejl\'e9c\'e9ben a d\'e1tumot nemt\'f6rhet?re \'e1ll\'edtja, \'e9s az \'e9v.h\'f3nap.nap sorrendbe \'e1trakja a d\'e1tumot\par
  var res = xpath("//td[contains(text(), ':')]");\par
  for(var i = 0; i < res.snapshotLength; i++) \{\par
    var s = res.snapshotItem(i).innerHTML;\par
    if (s.charAt(2) == "." && s.charAt(5) == "." && s.charAt(10) == " " && (s.charAt(12) == ":" || s.charAt(13) == ":")) \{\par
      res.snapshotItem(i).innerHTML = s.substring(6, 10)+"."+s.substring(3, 5)+"."+s.substring(0, 2)+"&nbsp;"+s.substring(11);\par
    \}\par
  \}\par
  \par
  //a kereskedelmi egyezm\'e9nynek \'e9s a t\'f6bbinek a felirat\'e1t lecser\'e9li\par
  function replaceText(fromwhat, towhat) \{\par
    var res = xpath("//*[contains(text(), '"+fromwhat+"')]");\par
    for(var i = 0; i < res.snapshotLength; i++) \{\par
      res.snapshotItem(i).innerHTML = res.snapshotItem(i).innerHTML.replace(fromwhat, towhat);\par
    \}\par
  \}\par
  replaceText("Kulturg\'fcterabkommen", "Kult\'far\'e1lis Egyezm\'e9ny");\par
  replaceText("Handelsabkommen", "Kereskedelmi Egyezm\'e9ny");\par
  replaceText("Milit\'e4rabkmmen", "Katonai Egyezm\'e9ny");\par
  replaceText("k\'fcndigen", "Felbont\'e1s");\par
  replaceText("anbieten", "Megk\'f6t\'e9s");\par
  replaceText("annehmen", "Elfogad\'e1s");\par
  replaceText("ablehnen", "Elutas\'edt\'e1s");\par
  replaceText("zur\'fcckziehen", "Visszavon\'e1s");\par
\}\par
\par
var res = getCity(city_id);\par
\par
//aktu\'e1lis nyersanyag mennyis\'e9ge a v\'e1rosban\par
res.wood   = getIntValue(getNodeValue("id('value_wood')"));\par
res.wine   = getIntValue(getNodeValue("id('value_wine')"));\par
res.marble = getIntValue(getNodeValue("id('value_marble')"));\par
res.glass  = getIntValue(getNodeValue("id('value_crystal')"));\par
res.sulfur = getIntValue(getNodeValue("id('value_sulfur')"));\par
digProducedResources(res);\par
//lakosok sz\'e1ma a v\'e1rosban\par
res.population = getNodeValue("//span[@id='value_inhabitants']");\par
if (/\\(([0-9,.]+)/.exec(res.population) != null) \{\par
  res.population = parseInt((RegExp.$1).replace(/[^0-9]/g, ""));\par
\} else \{\par
  res.population = 0;\par
\}\par
\par
if (city_idmainView > 0) \{\par
  var res = getCity(city_idmainView);\par
  if (city_coord != "") \{\par
    res.city_coord = city_coord;\par
  \}\par
  if (island_id != "") \{\par
    res.island_id = island_id;\par
  \}\par
  //az aktu\'e1lisan \'e9p\'edt\'e9s alatt \'e1ll\'f3 \'e9p\'fclet\par
  var node = xpath("//div[@class='constructionSite']/following-sibling::a");\par
  if (node.snapshotLength == 1) \{\par
    res.underConstruction = node.snapshotItem(0).title;\par
    res.underConstructionName = node.snapshotItem(0).parentNode.getAttribute("class");\par
    var script = node.snapshotItem(0).parentNode.getElementsByTagName("script")[0];\par
    if (script != undefined) \{\par
      var enddate = 0;\par
      var currentdate = 0;\par
      if (/enddate[^0-9]*([0-9]+)/.exec(script.innerHTML) != null) \{\par
        enddate = parseFloat(RegExp.$1) * 1000; //millisecundumban az \'e9p\'edt\'e9si id? v\'e9ge\par
      \}\par
      if (/currentdate[^0-9]*([0-9]+)/.exec(script.innerHTML) != null) \{\par
        currentdate = parseFloat(RegExp.$1) * 1000; //millisecundumban az aktu\'e1lis id?pont\par
      \}\par
      if (enddate != 0 && currentdate != 0) \{\par
        res.underConstruction += ","+(enddate - currentdate + new Date().getTime());\par
      \}\par
    \}\par
  \} else \{\par
    var cityView = xpath("//li[@id='position0']"); //ha ilyen van, akkor a falut latjuk a kepernyon\par
    if (cityView.snapshotLength > 0) \{\par
      res.underConstruction = "-";\par
      res.underConstructionName = "";\par
    \}\par
  \}\par
  //osszegyujti az epuletek szintjeit a varosban\par
  var nodes = xpath("//li[contains(@id, 'position')]/a[contains(@href, 'view=')]");\par
  for(var i = 0; i < nodes.snapshotLength; i++) \{\par
    var node = nodes.snapshotItem(i);\par
    var li = node.parentNode;\par
    \par
    var level = "-";\par
    if (/([0-9]+)/.exec(node.title) != null) \{\par
      level = RegExp.$1;\par
    \}\par
    var name = li.getAttribute("class");\par
    if (buildings[name] != undefined) \{\par
      if (res.buildings[name] == undefined) \{\par
        res.buildings[name] = \{\};\par
      \}\par
      res.buildings[name].level = level;\par
    \}\par
  \}\par
  //townhall population total and growth\par
  if (/view=townHall/.test(document.URL)) \{\par
    //ennyivel t\'f6bb a kapacit\'e1s, mint a v\'e1rosh\'e1za szintje alapj\'e1n lenne\par
    res.buildings["townHall"].bonusspace = Number(getNodeValue("//span[@class='value total']", "0")) - townHallSpaces[getArrValue(res.buildings["townHall"], "level")];\par
    //ennyi az el\'e9gedetts\'e9g a popul\'e1ci\'f3t nem sz\'e1m\'edtva\par
    res.buildings["townHall"].happiness  = Number(getNodeValue("//div[contains(@class, 'happiness ')]/div[@class='value']", "0")) + res.population;\par
  \}\par
  //military-army and fleet unit counts\par
  if (/view=cityMilitary-(army|fleet)/.exec(document.URL) != null) \{\par
    var k = RegExp.$1;\par
    var idx = (k == "fleet") ? 13 : 0;\par
    if (config["unitnames"] == undefined) \{\par
      config["unitnames"] = \{\};\par
    \}\par
    if (res.units == undefined) \{\par
      res.units = \{\};\par
    \}\par
    var names = xpath("//table/tbody/tr/th");\par
    var counts = xpath("//table/tbody/tr[@class='count']/td");\par
    if (names.snapshotLength == counts.snapshotLength) \{\par
      for(var i = 0; i < names.snapshotLength; i++) \{\par
        var n = names.snapshotItem(i).title;\par
        var unit_id = unitsAndShipsIndexesR[i + idx];\par
        config["unitnames"][unit_id] = n;\par
        var c = counts.snapshotItem(i);\par
        var cnt = getIntValue(c.innerHTML, 0);\par
        if (res.units[unit_id] == undefined) \{\par
          res.units[unit_id] = \{\};\par
        \}\par
        res.units[unit_id].count = cnt;\par
      \}\par
    \}\par
  \}\par
  //military-army unit counts\par
  if (/view=(barracks|shipyard)/.exec(document.URL) != null) \{\par
    var k = RegExp.$1;\par
    var idx = 0;\par
    if (k == "shipyard") \{\par
      idx = 13;\par
    \}\par
    if (config["unitnames"] == undefined) \{\par
      config["unitnames"] = \{\};\par
    \}\par
    if (config["unitpoints"] == undefined) \{\par
      config["unitpoints"] = \{\};\par
    \}\par
    if (res.units == undefined) \{\par
      res.units = \{\};\par
    \}\par
    var names = xpath("//ul[@id='units']/li[contains(@class, 'unit')]/div[@class='unitinfo']/h4");\par
    var counts = xpath("//ul[@id='units']/li[contains(@class, 'unit')]/div[@class='unitinfo']/div[@class='unitcount']");\par
    if (names.snapshotLength == counts.snapshotLength) \{\par
      for(var i = 0; i < names.snapshotLength; i++) \{\par
        var node = names.snapshotItem(i);\par
        var n = node.innerHTML;\par
        var cost;\par
        try \{\par
          unit_id = node.parentNode.parentNode.getAttribute("class");\par
          cost = xpath("//ul[@id='units']/li[@class='"+unit_id+"']/div[@class='costs']/ul[@class='resources']/li");\par
        \} catch (e) \{\par
        \}\par
        config["unitnames"][unit_id] = n;\par
        var c = counts.snapshotItem(i);\par
        var cnt = getIntValue(c.innerHTML.replace(/<.+>/g, ""), 0);\par
        if (res.units[unit_id] == undefined) \{\par
          res.units[unit_id] = \{\};\par
        \}\par
        res.units[unit_id].count = cnt;\par
        if (cost != undefined) \{\par
          config["unitpoints"][unit_id] = 0;\par
          for(var j = 0; j < cost.snapshotLength; j++) \{\par
            var c = cost.snapshotItem(j);\par
            var cl = c.getAttribute("class");\par
            if (unitScoreBasePoints[cl] != undefined) \{\par
              config["unitpoints"][unit_id] += getIntValue(c.innerHTML) * unitScoreBasePoints[cl];\par
            \}\par
          \}\par
        \}\par
      \}\par
    \}\par
  \}\par
  //fogad\'f3 n\'e9zet\par
  if (/view=tavern/.test(document.URL)) \{\par
    //hozz\'e1ad egy esem\'e9nykezel?t a "Csiri\'f3!" gombhoz, hogy elt\'e1rolja a be\'e1ll\'edtott bor mennyis\'e9g\'e9t\par
    function storeWineUsage() \{\par
      try \{\par
        var n = document.getElementById("wineAmount");\par
        var city_id = getNode_value("//form[@id='wineAssignForm']/input[@type='hidden' and @name='id']");\par
        var city = getCity(city_id);\par
        city.wineUsage = tavernWineUsage[n.selectedIndex];\par
        setVar("config", serialize(config));\par
      \} catch (e) \{\par
        log("Hiba: "+e);\par
      \}\par
    \}\par
    var n = getNode("//form[@id='wineAssignForm']//*[@type='submit']");\par
    n.addEventListener("click", storeWineUsage, false);\par
    //leolvassa az aktu\'e1lisan be\'e1ll\'edtott bor mennyis\'e9g\'e9t\par
    var n = document.getElementById("wineAmount");\par
    res.wineUsage = tavernWineUsage[n.selectedIndex];\par
  \}\par
  \par
  //az upgrade-et leolvassa az upgrade oldalr\'f3l is\par
  if (true) \{\par
    var n = getNode("//*[@id='buildingUpgrade']//*[@class='buildingLevel']");\par
    if (n != null) \{\par
      var buildingName = getNode("//body"); //a body.id tartalmazza az aktu\'e1lisan n\'e9zett \'e9p\'fclet azonos\'edt\'f3j\'e1t\par
      if (buildingName != null) \{\par
        var script = n.parentNode.getElementsByTagName("script")[0];\par
        if (script != undefined) \{\par
          var enddate = 0;\par
          var currentdate = 0;\par
          if (/enddate[^0-9]*([0-9]+)/.exec(script.innerHTML) != null) \{\par
            enddate = parseFloat(RegExp.$1) * 1000; //millisecundumban az \'e9p\'edt\'e9si id? v\'e9ge\par
          \}\par
          if (/currentdate[^0-9]*([0-9]+)/.exec(script.innerHTML) != null) \{\par
            currentdate = parseFloat(RegExp.$1) * 1000; //millisecundumban az aktu\'e1lis id?pont\par
          \}\par
          if (enddate != 0 && currentdate != 0) \{\par
            res.underConstruction = buildings[buildingName.id][0] + " " + (n.innerHTML.replace(/<[^>]*>/g, ""));\par
            res.underConstructionName = buildingName.id;\par
            res.underConstruction += ","+(enddate - currentdate + new Date().getTime());\par
          \}\par
        \}\par
      \}\par
    \}\par
  \}\par
\par
  //barakk n\'e9zet\par
  if (/view=barracks/.test(document.URL)) \{\par
    //az \'e9p\'edt\'e9si sort feldolgozza, \'e9s ++ -al jel\'f6li a t\'e1bl\'e1zatban\par
  \}\par
\} else \{\par
  if (/view=merchantNavy/.test(document.URL)) \{\par
    config["arrivinggoods"] = new Object();\par
    var cities = \{\};\par
    var res = xpath("//select[@id='citySelect']/option");\par
    for(var i = 0; i < res.snapshotLength; i++) \{\par
      var n = res.snapshotItem(i);\par
      cities[n.value] = Trim(n.innerHTML);\par
    \}\par
    var res = xpath("//table[@class='table01']/tbody/tr/td/br");\par
    for(var i = 0; i < res.snapshotLength; i++) \{\par
      var n = res.snapshotItem(i).parentNode;\par
      var cel = n.innerHTML.replace(/<br>.*/, "");\par
      log("cel: "+cel);\par
      var found = false;\par
      var key;\par
      for (key in cities) \{\par
        if (cities[key] == cel) \{\par
          found = key;\par
          break;\par
        \}\par
      \}\par
      if (found != false) \{\par
        var c = config["arrivinggoods"][found];\par
        if (c == undefined) \{\par
          config["arrivinggoods"][found] = \{\};\par
        \}\par
        c = config["arrivinggoods"][found][i];\par
        if (c == undefined) \{\par
          config["arrivinggoods"][found][i] = \{\};\par
          c = config["arrivinggoods"][found][i];\par
        \}\par
        //a start v\'e1ros\par
        var nn = getPreviousNode(n);\par
        c["startcity"] = nn.innerHTML;\par
        //a sz\'e1ll\'edtm\'e1ny tartalma\par
        var nn = getNextNode(n);\par
        //var rak = nn.getAttribute("onmouseover");\par
        var rak = nn.childNodes[0].getAttribute("onmouseover");\par
        rak = rak.replace(/<img [^>]*\\/icon_([^>]+).gif[^0-9]*([0-9.,]+)/g, ";$1:$2;");\par
        rak = rak.replace(/^[^<]*/, "");\par
        rak = rak.replace(/>[^>]*$/, ">");\par
        rak = rak.replace(/<[^>]*>/g, "");\par
        log("szallitmany ide: "+found+": "+rak);\par
        var arr = rak.split(";");\par
        var r = \{\};\par
        for (key in arr) \{\par
          if (arr[key].indexOf(":") >= 0) \{\par
            var a = arr[key].split(":");\par
            r[a[0]] = getIntValue(a[1]);\par
          \}\par
        \}\par
        c["res"] = r;\par
        //a sz\'e1ll\'edtm\'e1ny k\'fcldet\'e9se\par
        var nn = getNextNode(nn);\par
        c["quest"] = nn.textContent;\par
        //a sz\'e1ll\'edtm\'e1ny \'e9rkez\'e9si ideje\par
        var nn = getNextNode(nn); //\'e9rkez\'e9s ideje\par
        var nn = getNextNode(nn); //k\'fcldet\'e9s v\'e9ge, ez kell nek\'fcnk\par
        c["arrivetime"] = nn.textContent;\par
      \}\par
    \}\par
    log("arrivinggoods: "+serialize(config.arrivinggoods));\par
  \}\par
  \par
  if (/view=highscore/.test(document.URL)) \{\par
    var ownAlly = getCfgValue("ownAlly", '');\par
    var friendlyAllies = getCfgValue("friendlyAllies", '');\par
    if (friendlyAllies != "") \{\par
      friendlyAllies = friendlyAllies.split(",");\par
    \} else \{\par
      friendlyAllies = [];\par
    \}\par
    var hostileAllies = getCfgValue("hostileAllies", '');\par
    if (hostileAllies != "") \{\par
      hostileAllies = hostileAllies.split(",");\par
    \} else \{\par
      hostileAllies = [];\par
    \}\par
    \par
    function displayHighscoreColor(alliance, colorClass) \{\par
      if (alliance != undefined && alliance != "" && colorClass != undefined && colorClass != "") \{\par
        var res = xpath("//tr[@class!='own']/td[@class='allytag' and text()='"+alliance+"']");\par
        for(var i = 0; i < res.snapshotLength; i++) \{\par
          var n = res.snapshotItem(i);\par
          var tr = n.parentNode;\par
          if (tr != undefined && tr != null) \{\par
            tr.setAttribute("class", colorClass+" "+tr.getAttribute("class"));\par
          \} else \{\par
            log("tr is undefined! n: "+n);\par
          \}\par
        \}\par
      \}\par
    \}\par
    \par
    if (ownAlly != "" || friendlyAllies.length > 0 || hostileAllies.length > 0) \{\par
      displayHighscoreColor(ownAlly, "hs_ownally");\par
      for(var i = 0; i < friendlyAllies.length; i++) \{\par
        displayHighscoreColor(friendlyAllies[i], "hs_friendlyally");\par
      \}\par
      for(var i = 0; i < hostileAllies.length; i++) \{\par
        displayHighscoreColor(hostileAllies[i], "hs_hostileally");\par
      \}\par
      \par
      //set form's method to "get", to work in other pages as well\par
      var forms = document.getElementsByTagName("form");\par
      for(var i = 0; i < forms.length; i++) \{\par
        var form = forms[i];\par
        if (form != null) \{\par
          form.method = "get";\par
        \}\par
      \}\par
    \}\par
  \}\par
\}\par
\par
//a sziget n\'e9zetb?l \'f6sszegy?jti a v\'e1rosok adatait, \'e9s elt\'e1rolja\par
if ((getCfgValue("TABLE_PLAYERS", false) == true) && (/view=island/.exec(document.URL) != null)) \{\par
  var cities = xpath("//li[contains(@id, 'cityLocation')]/ul[@class='cityinfo']");\par
  for(var i = 0; i < cities.snapshotLength; i++) \{\par
    var c = cities.snapshotItem(i);\par
    var infos = c.getElementsByTagName("li");\par
    var data = new Object();\par
    var cityid = 0;\par
    for(var j = 0; j < infos.length; j++) \{\par
      var info = infos[j];\par
      var s = info.innerHTML;\par
      if (/destinationCityId=([0-9]+)/.exec(s) != null) \{\par
        cityid = parseInt(RegExp.$1);\par
      \}\par
      s = s.replace(/<[^>]*>/g, "");\par
      var arr = s.split(":");\par
      if (arr.length > 1) \{\par
        var key = arr[0].replace(/^\\s+|\\s+$/g, "");\par
        var value = arr[1].replace(/^\\s+|\\s+$/g, "");\par
        data[j] = value;\par
      \}\par
    \}\par
    var playername = data[2];\par
    if (cityid > 0) \{\par
      try \{\par
        players.playersCities[players.cities[cityid][2]].cities[cityid] = false;\par
      \} catch (e) \{\par
      \}\par
      if (players.playersCities[playername] == undefined) \{\par
        players.playersCities[playername] = new Object();\par
      \}\par
      if (players.playersCities[playername].cities == undefined) \{\par
        players.playersCities[playername].cities = new Object();\par
      \}\par
      players.playersCities[playername].cities[cityid] = true;\par
      players.playersCities[playername].alliance = data[3];\par
      players.cities[cityid] = \{name: data[0], size: data[1], player: playername, island_id: island_id\};\par
      players.islands[island_id] = \{coord: city_coord\};\par
      \par
      //a sz\'f6vets\'e9g nev\'e9t ut\'e1na f?zi a j\'e1t\'e9kos nev\'e9nek\par
      var a = c.parentNode.getElementsByTagName("a")[0];\par
      if (a != undefined) \{\par
        a = a.getElementsByTagName("span")[0];\par
        if (a != undefined) \{\par
          a = a.getElementsByTagName("span")[0];\par
          if (a != undefined) \{\par
            a = a.nextSibling;\par
            if (a != undefined) \{\par
              a.data += " ("+data[3]+")";\par
            \}\par
          \}\par
        \}\par
      \}\par
    \}\par
  \}\par
\}\par
function phpserialize(txt) \{\par
  switch(typeof(txt))\{\par
  case 'string':\par
    txt = unUtf(txt); //for utf8 compatibility\par
    return 's:'+txt.length+':"'+txt+'";';\par
  case 'number':\par
    if(txt>=0 && String(txt).indexOf('.') == -1 && txt < 65536000000) return 'i:'+txt+';';\par
    return 'd:'+txt+';';\par
  case 'boolean':\par
    return 'b:'+( (txt)?'1':'0' )+';';\par
  case 'object':\par
    var i=0,k,ret='';\par
    for(k in txt)\{\par
      //log(isNaN(k));\par
      if(!isNaN(k)) k = Number(k);\par
      if (typeof(txt[k]) != 'function') \{\par
        ret += phpserialize(k)+phpserialize(txt[k]);\par
        i++;\par
      \}\par
    \}\par
    return 'a:'+i+':\{'+ret+'\}';\par
  case 'function':\par
    return 'N;';\par
  default:\par
    log('var undefined: '+typeof(txt)); //return undefined;\par
    txt = unUtf("has undefined type: "+txt);\par
    return 's:'+txt.length+':"'+txt+'";';\par
  \}\par
\}\par
function unUtf(str) \{\par
//return str;\par
  for(var i = str.length - 1; i >= 0; i--) \{\par
    var ch = str.charCodeAt(i);\par
    if (ch > 255) \{\par
      str = str.substring(0, i) + "&#" + ch + ";" + str.substring(i + 1);\par
    \}\par
  \}\par
  return str;\par
\}\par
function urlencode(str) \{\par
  str = escape(str);\par
  str = str.replace('+', '%2B');\par
  str = str.replace('%20', '+');\par
  str = str.replace('*', '%2A');\par
  str = str.replace('/', '%2F');\par
  str = str.replace('@', '%40');\par
  return str;\par
\}\par
\par
/**************************************************************************************************\par
 * Render tables\par
 *************************************************************************************************/\par
function renderTables() \{\par
  setLanguage();\par
  getLocalizedTexts();\par
  var TABLE_RESOURCES = getCfgValue("TABLE_RESOURCES", true); //overview table for resources\par
  var TABLE_BUILDINGS = getCfgValue("TABLE_BUILDINGS", true); //overview table for buildings\par
  var TABLE_ARMYFLEET = getCfgValue("TABLE_ARMYFLEET", true); //overview table for army and fleet\par
  var TABLE_PLAYERS   = getCfgValue("TABLE_PLAYERS",   false); //table for players and cities\par
  PROGRESS_BAR_MODE = getCfgValue("PROGRESS_BAR_MODE", "time"); //progress bar mode for resource counters\par
  GM_addStyle(getCfgValueNonEmpty("CSS", default_style));\par
  \par
  var nodes = xpath("//select[@id='citySelect']/option"); //cities\par
  var s = "";\par
\par
  log("time1: "+(new Date().getTime() - _startTime)+" msec");\par
  //az els? t\'e1bl\'e1zat kirajzol\'e1sa (nyersanyagok)\par
  if (TABLE_RESOURCES) \{\par
    var woodName =   getNodeTitle("//div[@id='cityResources']/ul[@class='resources']/li[@class='wood']", "wood");\par
    var wineName =   getNodeTitle("//div[@id='cityResources']/ul[@class='resources']/li[@class='wine']", "wine");\par
    var marbleName = getNodeTitle("//div[@id='cityResources']/ul[@class='resources']/li[@class='marble']", "marble");\par
    var glassName =  getNodeTitle("//div[@id='cityResources']/ul[@class='resources']/li[@class='glass']", "crystal");\par
    var sulfurName = getNodeTitle("//div[@id='cityResources']/ul[@class='resources']/li[@class='sulfur']", "sulfur");\par
    var populationName = getNodeTitle("//div[@id='cityResources']//li[@class='population']", "population");\par
    s += "<table border=1 class='resources_table'>";\par
    s += "<tr class='table_header'>";\par
    s += "<th class='table_header' colspan=2>"+texts["cityName"]+"</th>"+\par
         "<th colspan=4 class='lf table_header'>"+populationName+"</th>"+\par
         "<th colspan=2 class='lf table_header'>"+woodName+"</th>"+\par
         "<th colspan=3 class='lf table_header'>"+wineName+"</th>"+\par
         "<th colspan=2 class='lf table_header'>"+marbleName+"</th>"+\par
         "<th colspan=2 class='lf table_header'>"+glassName+"</th>"+\par
         "<th colspan=2 class='lf table_header'>"+sulfurName+"</th>"+\par
         "<th colspan=2 class='lf table_header'>"+texts["currentlyBuilding"]+"</th>";\par
    s += "</tr>";\par
    var sumres = new Resource("");\par
    var sumProd = new Resource("");\par
    sumProd.wineUsage = 0;\par
    var currenttime = new Date().getTime();\par
    for(var i = 0; i < nodes.snapshotLength; i++) \{\par
      var city = nodes.snapshotItem(i);\par
      var res = getCity(city.value);\par
      var wineUsage;\par
      if (res.wineUsage != undefined) \{\par
        wineUsage = res.wineUsage;\par
      \} else \{\par
        var tavernLevel = getArrValue(res.buildings["tavern"], "level", "-");\par
        wineUsage = (tavernLevel > 0 ? tavernWineUsage[tavernLevel] : 0);\par
      \}\par
\par
      sumres.wood += getCurrentResourceAmount(currenttime, res.prodtime, res.wood, res.prodwood);\par
      sumres.wine += getCurrentResourceAmount(currenttime, res.prodtime, res.wine, res.prodwine - wineUsage);\par
      sumres.marble += getCurrentResourceAmount(currenttime, res.prodtime, res.marble, res.prodmarble);\par
      sumres.glass += getCurrentResourceAmount(currenttime, res.prodtime, res.glass, res.prodglass);\par
      sumres.sulfur += getCurrentResourceAmount(currenttime, res.prodtime, res.sulfur, res.prodsulfur);\par
      \par
      sumProd.wood += res.prodwood;\par
      sumProd.wine += res.prodwine;\par
      sumProd.marble += res.prodmarble;\par
\par
      sumProd.glass += res.prodglass;\par
      sumProd.sulfur += res.prodsulfur;\par
      \par
      sumProd.wineUsage += wineUsage;\par
      var townHallLevel = getArrValue(res.buildings["townHall"], "level", "-");\par
      var wineTooltip = "";\par
      if (Math.round(res.prodwine) > 0) \{\par
        wineTooltip = mynumberformat(Math.round(res.prodwine), true)+" / h";\par
      \}\par
      var wineRemainingHours = undefined;\par
      if (wineUsage > 0) \{\par
        wineRemainingHours = floatFormat(getCurrentResourceAmount(currenttime, res.prodtime, res.wine, res.prodwine - wineUsage) / wineUsage, 1) + " h";\par
      \}\par
      var wineUsageHtml = wineUsage > 0 ? createProd(-1 * wineUsage, wineRemainingHours) : "";\par
      var arr = res.underConstruction.split(",");\par
      var underConstruction = arr[0];\par
      var counter = createTimeCounter(arr[1]);\par
      var happiness = getArrValue(res.buildings["townHall"], "happiness", "?");\par
      var population = res.population;\par
      var bonusspace = getArrValue(res.buildings["townHall"], "bonusspace", "?");\par
      var spacetotal = townHallSpaces[townHallLevel];\par
      if (happiness != "?") \{\par
        population = getEstimatedPopulation(population, res.prodtime, currenttime, happiness - population);\par
        if (parseInt(population) > parseInt(spacetotal) + parseInt(bonusspace)) \{\par
          population = parseInt(spacetotal) + parseInt(bonusspace);\par
        \}\par
        happiness -= population;\par
      \}\par
      \par
      sumres.population += population;\par
      \par
      var growthRemainingHours = undefined;\par
      var growth = happiness != "?" ? floatFormat(0.02 * happiness, 2, true) : "?";\par
      if (happiness != "?" && happiness > 0 && bonusspace != "?") \{\par
//        growthRemainingHours = floatFormat((parseInt(spacetotal) + parseInt(bonusspace) - parseInt(population)) / (0.02 * happiness), 1) + " h";\par
        growthRemainingHours = getGrowthRemainingHours(population, parseInt(spacetotal) + parseInt(bonusspace), currenttime, happiness);\par
      \}\par
      var cs = "";\par
      var lfcs = "lf";\par
      if (parseInt(city_id) == parseInt(city.value)) \{\par
        cs += " current_city_highlight";\par
        lfcs += " current_city_highlight";\par
      \}\par
      var townHallStyle = "";\par
      if (parseInt(population) >= parseInt(spacetotal) + parseInt(bonusspace)) \{\par
        townHallStyle = " populationfull";\par
      \} else \{\par
        log("population is less than spacetotal "+population+" < "+(parseInt(spacetotal) + parseInt(bonusspace)));\par
      \}\par
      if (bonusspace != "?") \{\par
        spacetotal = createTooltip(mynumberformat(parseInt(spacetotal) + parseInt(bonusspace)), mynumberformat(spacetotal) + " + " + mynumberformat(bonusspace));\par
      \} else \{\par
        spacetotal = mynumberformat(spacetotal) + " + ?";\par
      \}\par
      var warehouseLevel = getArrValue(res.buildings["warehouse"], "level", "0");\par
      var maxcwood = warehouseWoodCapacities[warehouseLevel] + 1000;//1000 a v\'e1rosh\'e1za kapacit\'e1sa\par
      var maxcother = warehouseOtherCapacities[warehouseLevel] + 300;//300 a v\'e1rosh\'e1za kapacit\'e1sa\par
      s += "<tr>";\par
      s += "<td class='"+cs+"'>"+createLinkToCity(city.innerHTML, city.value, i)+"</td>"+\par
           "<td class='"+cs+"'>"+res.city_coord+"</td>"+\par
           "<td class='"+lfcs+townHallStyle+"'>"+createLastUpdateAsTooltip(mynumberformat(population), res.prodtime)+"</td>"+\par
               "<td class='"+cs+"'>"+spacetotal+"</td>"+\par
               "<td class='"+cs+"'>"+happiness+"</td>"+\par
               "<td class='"+cs+"'>"+createTooltip(growth, growthRemainingHours)+"</td>"+\par
           "<td class='"+lfcs+"'>"+createLinkToResource(\par
                              createCounter(res.prodtime, res.wood, res.prodwood, false, maxcwood, getArrivingGoods(city.value, "wood")),\par
                              res.island_id, city.value, i) +"</td>"+\par
               "<td class='"+cs+"'>"+createProd(res.prodwood)+"</td>"+\par
           "<td class='"+lfcs+"'>"+createLinkToTradegoodCond(res.prodwine > 0,\par
                              createCounter(res.prodtime, res.wine, res.prodwine - wineUsage, false, maxcother, getArrivingGoods(city.value, "wine")),\par
                              res.island_id, city.value, i) +"</td>"+\par
               "<td class='"+cs+"'>"+wineUsageHtml+"</td>"+\par
               "<td class='"+cs+"'>"+createProd(res.prodwine)+"</td>"+\par
           "<td class='"+lfcs+"'>"+createLinkToTradegoodCond(res.prodmarble > 0,\par
                              createCounter(res.prodtime, res.marble, res.prodmarble, false, maxcother, getArrivingGoods(city.value, "marble")),\par
                              res.island_id, city.value, i)+"</td>"+\par
               "<td class='"+cs+"'>"+createProd(res.prodmarble)+"</td>"+\par
           "<td class='"+lfcs+"'>"+createLinkToTradegoodCond(res.prodglass > 0,\par
                              createCounter(res.prodtime, res.glass, res.prodglass, false, maxcother, getArrivingGoods(city.value, "glass")),\par
                              res.island_id, city.value, i) +"</td>"+\par
               "<td class='"+cs+"'>"+createProd(res.prodglass)+"</td>"+\par
           "<td class='"+lfcs+"'>"+createLinkToTradegoodCond(res.prodsulfur > 0,\par
                              createCounter(res.prodtime, res.sulfur, res.prodsulfur, false, maxcother, getArrivingGoods(city.value, "sulfur")),\par
                              res.island_id, city.value, i) +"</td>"+\par
               "<td class='"+cs+"'>"+createProd(res.prodsulfur)+"</td>"+\par
           "<td class='"+lfcs+"'>"+underConstruction+"</td>"+\par
               "<td class='"+cs+"'>"+counter+"</td>";\par
      s += "</tr>";\par
    \}\par
    s += "<tr class='table_footer'>";\par
    s += "<td class='table_footer' colspan=2>"+texts["summary"]+"</td>"+\par
         "<td class='table_footer lf'>"+mynumberformat(sumres.population)+"</td>"+\par
         "<td class='table_footer'></td>"+\par
         "<td class='table_footer'></td>"+\par
         "<td class='table_footer'></td>"+\par
         "<td class='table_footer lf'>"+createCounter(currenttime, sumres.wood, sumProd.wood)+"</td>"+\par
         "<td class='table_footer'>"+createProd(sumProd.wood)+"</td>"+\par
         "<td class='table_footer lf'>"+createCounter(currenttime, sumres.wine, sumProd.wine - sumProd.wineUsage, true)+"</td>"+\par
         "<td class='table_footer'>"+createProd(-1 * sumProd.wineUsage)+"</td>"+\par
         "<td class='table_footer'>"+createProd(sumProd.wine)+"</td>"+\par
         "<td class='table_footer lf'>"+createCounter(currenttime, sumres.marble, sumProd.marble)+"</td>"+\par
         "<td class='table_footer'>"+createProd(sumProd.marble)+"</td>"+\par
         "<td class='table_footer lf'>"+createCounter(currenttime, sumres.glass, sumProd.glass)+"</td>"+\par
         "<td class='table_footer'>"+createProd(sumProd.glass)+"</td>"+\par
         "<td class='table_footer lf'>"+createCounter(currenttime, sumres.sulfur, sumProd.sulfur)+"</td>"+\par
         "<td class='table_footer'>"+createProd(sumProd.sulfur)+"</td>"+\par
         "<td class='table_footer lf'></td>"+\par
         "<td class='table_footer'></td>";\par
    s += "</tr>";\par
    s += "</table>";\par
    s += "<br>";\par
  \}\par
\par
  log("time2: "+(new Date().getTime() - _startTime)+" msec");\par
  //m\'e1sodik t\'e1bl\'e1zat: \'e9p\'fcletek szintjei\par
  if (TABLE_BUILDINGS) \{\par
    s += "<table border=1 class='buildings_table'>";\par
    s += "<tr class='table_header'><th class='table_header'>"+texts["cityName"]+"</th>";\par
    try \{\par
      var body_id = document.getElementsByTagName("body")[0].id;\par
    \} catch (e) \{\par
    \}\par
    var firstStyle = "lf";\par
    for(key in buildings) \{\par
      var currentBuildingStyle = "";\par
      if (key == body_id) \{\par
        currentBuildingStyle = " current_building";\par
      \}\par
      s += "<th class='"+firstStyle+currentBuildingStyle+" table_header'>"+createTooltip(buildings[key][1], buildings[key][0])+"</th>";\par
      firstStyle = "";\par
    \}\par
    s += "</tr>";\par
    for(var i = 0; i < nodes.snapshotLength; i++) \{\par
      var city = nodes.snapshotItem(i);\par
      var res = getCity(city.value);\par
\par
      s += "<tr>";\par
      if (city_idmainView > 0) \{\par
        cs = (parseInt(city_idmainView) == parseInt(city.value)) ? "current_city_highlight" : "";\par
      \} else \{\par
        cs = (parseInt(city_id) == parseInt(city.value)) ? "current_city_highlight" : "";\par
      \}\par
      s += "<td class='"+cs+"'>"+createLinkToCity(city.innerHTML, city.value, i)+"</td>";\par
      var firstStyle = "lf";\par
      for(key in buildings) \{\par
        var level = getArrValue(res.buildings[key], "level", "-");\par
        if (level == undefined || level == "") \{\par
          level = "-";\par
        \} else if (res.underConstructionName == key) \{\par
          firstStyle += " upgrading";\par
          level = createTooltip(level, texts["currentlyBuilding"]);\par
        \}\par
        var currentBuildingStyle = "";\par
        if (key == body_id) \{\par
          currentBuildingStyle = " current_building";\par
        \}\par
        s += "<td class='"+cs+" "+firstStyle+currentBuildingStyle+"'>"+level+"</td>";\par
        firstStyle = "";\par
      \}\par
      s += "</tr>";\par
    \}\par
    s += "</table>";\par
    s += "<br>";\par
  \}\par
\par
  log("time3: "+(new Date().getTime() - _startTime)+" msec");\par
\par
  //harmadik t\'e1bl\'e1zat: hadsereg + flotta\par
  if (TABLE_ARMYFLEET) \{\par
    if (config["unitnames"] != undefined) \{\par
      var names = config["unitnames"];\par
      var usedIndexes = [];\par
      var usedIndexesCount = 0;\par
      for(var i = 0; i < nodes.snapshotLength; i++) \{\par
        var city = nodes.snapshotItem(i);\par
        var res = getCity(city.value);\par
        \par
        for(key in names) \{\par
          if (parseInt(getArrValue(getArrValue(res.units, key), "count", 0)) > 0) \{\par
            usedIndexes[key] = 1;\par
            usedIndexesCount++;\par
          \}\par
        \}\par
      \}\par
\par
      if (usedIndexesCount > 0) \{\par
        s += "<table border=1 class='army_table'>";\par
        s += "<tr class='table_header'><th class='table_header'>"+texts["cityName"]+"</th>";\par
        for(key in names) \{\par
          var name = names[key];\par
          if (usedIndexes[key] == 1) \{\par
            s += "<th class='lf table_header' colspan=2>"+name+"</th>";\par
          \}\par
        \}\par
        s += "<th class='lf table_header' colspan=2>"+texts["summary"]+"</th>";\par
        s += "</tr>";\par
        var sum = [];\par
        var sumPoint = [];\par
        for(var i = 0; i < nodes.snapshotLength; i++) \{\par
          var city = nodes.snapshotItem(i);\par
          var res = getCity(city.value);\par
\par
          s += "<tr>";\par
          var cs;\par
          if (city_idmainView > 0) \{\par
            cs = (parseInt(city_idmainView) == parseInt(city.value)) ? "current_city_highlight" : "";\par
          \} else \{\par
            cs = (parseInt(city_id) == parseInt(city.value)) ? "current_city_highlight" : "";\par
          \}\par
          s += "<td class='"+cs+"'>"+createLinkToCity(city.innerHTML, city.value, i)+"</td>";\par
          var citySum = 0;\par
          var citySumPoint = 0;\par
          for(key in names) \{\par
            if (usedIndexes[key] == 1) \{\par
              var level = getIntValue(getArrValue(getArrValue(res.units, key), "count", "0"), 0);\par
              var pointPerUnit = getIntValue(getArrValue(config["unitpoints"], key, "0"), 0);\par
              if (level == 0) \{\par
                level = "-";\par
              \} else \{\par
                sum[key] = (sum[key] == undefined) ? level : sum[key] + level;\par
                citySum += level;\par
              \}\par
              var point = "";\par
              if (pointPerUnit == 0 || level == "-") \{\par
              \} else \{\par
                point = pointPerUnit * level;\par
                sumPoint[key] = (sumPoint[key] == undefined) ? point : sumPoint[key] + point;\par
                citySumPoint += point;\par
                point = createTooltip(mynumberformat(point), level + " * " + mynumberformat(pointPerUnit) + " point");\par
              \}\par
              s += "<td class='lf "+cs+"'>"+mynumberformat(level)+"</td>"+\par
                   "<td class='"+cs+"'>"+point+"</td>";\par
            \}\par
          \}\par
          s += "<td class='lf table_footer "+cs+"'>"+(citySum != 0 ? mynumberformat(citySum) : "-")+"</td>"+\par
               "<td class='table_footer "+cs+"'>"+(citySumPoint != 0 ? mynumberformat(citySumPoint) : "-")+"</td>";\par
          s += "</tr>";\par
        \}\par
        s += "<tr class='table_footer'>";\par
        s += "<td class='table_footer'>"+texts["summary"]+"</td>";\par
        var citySum = 0;\par
        var citySumPoint = 0;\par
        for(key in names) \{\par
          if (usedIndexes[key] == 1) \{\par
            s += "<td class='table_footer lf'>"+mynumberformat(sum[key])+"</td>"+\par
                 "<td class='table_footer'>"+mynumberformat(sumPoint[key])+"</td>";\par
            citySum += sum[key];\par
            citySumPoint += sumPoint[key];\par
          \}\par
        \}\par
        s += "<td class='table_footer lf'>"+mynumberformat(citySum)+"</td>"+\par
             "<td class='table_footer'>"+mynumberformat(citySumPoint)+"</td>";\par
        s += "</tr>";\par
        s += "</table>";\par
        s += "<br>";\par
      \}\par
    \}\par
  \}\par
\par
\par
  log("time4: "+(new Date().getTime() - _startTime)+" msec");\par
\par
  //negyedik t\'e1bl\'e1zat: j\'e1t\'e9kosok, \'e9s azok v\'e1rosai\par
  if (TABLE_PLAYERS) \{\par
    var maxCityNum = 6;\par
    s += "<table border=1 class='players_table'>";\par
    var playerNames = [];\par
    for(plname in players.playersCities) \{\par
      playerNames[playerNames.length] = plname;\par
    \}\par
    playerNames.sort(function(a,b)\{\par
      a = a.toLowerCase();\par
      b = b.toLowerCase();\par
      return (a < b) ? -1 : ((a > b) ? 1 : 0);\par
    \});\par
    for(idx in playerNames) \{\par
      var plname = playerNames[idx];\par
      var city_ids = players.playersCities[plname].cities;\par
      s += "<tr>";\par
      s += "<td>"+plname+"</td>" +\par
           "<td>" + players.playersCities[plname].alliance + "</td>";\par
      var i = 0;\par
      for(id in city_ids) \{\par
        if (city_ids[id]) \{\par
          var city = players.cities[id];\par
          s += "<td class='lf'>" + city.name + "</td>" +\par
               "<td>" + createLinkToForeignCity(players.islands[city.island_id].coord, city.island_id) + "</td>" +\par
               "<td>" + city.size + "</td>";\par
          i++;\par
        \}\par
      \}\par
      for(;i < maxCityNum; i++) \{\par
        s += "<td class='lf'></td><td></td><td></td>";\par
      \}\par
      s += "</tr>";\par
    \}\par
    s += "</table>";\par
    s += "<br>";\par
  \}\par
  log("time5: "+(new Date().getTime() - _startTime)+" msec");\par
\par
\par
  var body = getNode("//body");\par
  var table_mode = "new_table";\par
  var span = document.getElementById("overview__table");\par
  if (span == null) \{\par
    span = document.createElement('div');\par
    span.id = "overview__table";\par
    span.align = "center";\par
}
