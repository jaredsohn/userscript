// ==UserScript==
// @name           Script Paketi
// @author         Okan       
// @namespace      ikariam
// @description    ikariam'a yeni özellikler ekler( 7'den fazla script bir arada)
// @include        http://s*.ikariam.*/index.php*
// @exclude        http://board.ikariam.*/
// ==/UserScript==

// Baryu Çeviri Düzeltme Başı

//
// ==UserScript==
// @name          Baryu Çeviri Düzeltme
// @description   Ikariam 'daki çeviri hatalarını düzeltir
// @include       s*.ikariam.*/index.php*
// ==/UserScript==

var links = document.getElementsByTagName('a');
var imgs = document.getElementsByTagName('img');
var options = document.getElementsByTagName('option');
var ths = document.getElementsByTagName('th');
var tds = document.getElementsByTagName('td');
var ps = document.getElementsByTagName('p');
var lis = document.getElementsByTagName('li');
document.getElementsByClass = function(className) {
  var all = document.all ? document.all : document.getElementsByTagName('*');
  var elements = new Array();
  for (var e = 0; e < all.length; e++)
    if (all[e].className == className)
      elements[elements.length] = all[e];
  return elements;
}
for (var i = 0; i < links.length; i++) {
	links[i].innerHTML = links[i].innerHTML.replace(/Send circular message/gi, "Bütün ittifaga mesaj yolla");
	links[i].innerHTML = links[i].innerHTML.replace(/Friedensabkommen anbieten/gi, "Barış antlaşması öner");
	for(var x = 0; x < links[i].attributes.length; x++) {
		if(links[i].attributes[x].nodeName.toLowerCase() == 'title') {
			links[i].attributes[x].nodeValue = links[i].attributes[x].nodeValue.replace(/Allianz beitreten/gi, "Ittifaga gir");
			links[i].attributes[x].nodeValue = links[i].attributes[x].nodeValue.replace(/stufe/gi, "Seviye");
			links[i].attributes[x].nodeValue = links[i].attributes[x].nodeValue.replace(/Inspect the selected town/gi, "Haritada seçilen köye git");
			links[i].attributes[x].nodeValue = links[i].attributes[x].nodeValue.replace(/Centre the selected town on the World Map/gi, "Harita ortasindaki seçilen köye git");
		}
	}
}
for (var i = 0; i < imgs.length; i++) {
	for(var x = 0; x < imgs[i].attributes.length; x++) {
		if(imgs[i].attributes[x].nodeName.toLowerCase() == 'title') {
			imgs[i].attributes[x].nodeValue = imgs[i].attributes[x].nodeValue.replace(/Gunsman/gi, "Nişancı");
		}
	}
}
for (var i = 0; i < options.length; i++) {
	options[i].innerHTML = options[i].innerHTML.replace(/Handelsabkommen[^a-zA-Z0-9]*anbieten/gi, "Ticaret anlaşması öner");
	options[i].innerHTML = options[i].innerHTML.replace(/Kulturg[^t]*terabkommen  anbieten/gi, "Kültürel eşya anlaşması öner");
	options[i].innerHTML = options[i].innerHTML.replace(/Kulturg[^t]*terabkommen  k[^n]*ndigen/gi, "Kültürel eşya degiştirme anlaşması öner");
	options[i].innerHTML = options[i].innerHTML.replace(/als gelesen markieren/gi, "Okunmuş olaraka işaretle");
	options[i].innerHTML = options[i].innerHTML.replace(/l[^s]*schen/gi, "Sil");
	options[i].innerHTML = options[i].innerHTML.replace(/Silmek/gi, "Sil");
	options[i].innerHTML = options[i].innerHTML.replace(/okunmuş olarak işaretle/gi, "Okunmuş olarak işaretle");
	options[i].innerHTML = options[i].innerHTML.replace(/Aktion w[^h]*hlen/gi, "Eylem seç...");
	options[i].innerHTML = options[i].innerHTML.replace(/ausgegraut/gi, "Puan yetersiz...");
	options[i].innerHTML = options[i].innerHTML.replace(/Allianz Milit[^r]*rabkmmen[^a-zA-Z0-9]*To the town ([\sa-zA-Z0-9]*)anbieten/gi, "Kişiye akeri ittifak teklif et $1");
}
for (var i = 0; i < ps.length; i++) {
	ps[i].innerHTML = ps[i].innerHTML.replace(/Inspect troops, that are stationed in the town/gi, "Inspect troops that are stationed in the town.");
	ps[i].innerHTML = ps[i].innerHTML.replace(/ Kulturgüterabkommen kündigen/gi, "Kültürel anlaşmayı bitir!");
}
for (var i = 0; i < ths.length; i++) {
	ths[i].innerHTML = ths[i].innerHTML.replace(/M[^g]*gliche Upgrades/gi, "Olasi yükseltme");
}
for (var i = 0; i < tds.length; i++) {
	tds[i].innerHTML = tds[i].innerHTML.replace(/Allianz Rundmail/gi, "Bütün ittifak üyelerine mesaj");
	tds[i].innerHTML = tds[i].innerHTML.replace(/[^A-Za-z0-9]xB4;/gi, "'");
	tds[i].innerHTML = tds[i].innerHTML.replace(/If we get to know all the other peoples, this will help us to make progress ourselves./gi, "Getting to know other cultures will help us make progress as well.");
}
for (var i = 0; i < lis.length; i++) {
	for(var x = 0; x < lis[i].attributes.length; x++) {
		if(lis[i].attributes[x].nodeName.toLowerCase() == 'title') {
			lis[i].attributes[x].nodeValue = lis[i].attributes[x].nodeValue.replace(/Kosten: ([0-9,]*) ([a-zA-Z\s]*)/gi, "Maliyet: $1 $2");
		}
	}
}

// Baryu Çeviri Düzeltme Sonu

// ================================Alarm ve Tablo Başı====================================
 // coding: utf-8
//
// ==UserScript==
// @name           Tablo
// @namespace      Ikariam
// @description    Ikariam'a yep yeni bir tablo ekler
// @include        http://s*.ikariam.*/index.php*
// @exclude        http://board.ikariam.*/
// ==/UserScript==


var _startTime = new Date().getTime();

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
log("time unserialize: "+(time - _startTime)+" msec");
var players;
try {
  players = eval(getVar("players", "({})"));
} catch (e) {
  log("Error while unserializing 'players': "+e);
  log("Stored data: "+getVar("players", ""));
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
log("time unserialize: "+(new Date().getTime() - time)+" msec");

log("time-1: "+(new Date().getTime() - _startTime)+" msec");


/************************* DEFAULT STYLE **************************/


var default_style = <><![CDATA[
.resources_table, .buildings_table, .army_table, .players_table {
  text-align: center;
  border-style: dotted;
  width: 980px;
  font-weight: bold;
  background-color: #FFFFCC;
}
.time_counter {
  font-weight: bold;
  color: #2000FF;
background-color: #FFFF00;
}
.lf {
border-weight: bold;
  border-left: double;
  border-color: #000000;
}
.current_city_highlight {
color: #663300;   
background-color: #FFFFFF;
}
#overview__table .upgrading {
font-weight: bold;
color: #2000FF;   
background-color: #FFFF00;
}
tr.table_header {
  border-bottom: double;
  font-weight: bold;
  color: #FFEE00;  
  background-color: #2000FF;
  
}
th.table_header {
  text-align: center;
  font-weight: bold;
}
tr.table_footer {
  border-top: double;
  font-weight: bold;
  color: #000000;  
  background-color: #FFff99;

}
td.table_footer { /*also for army table's last column*/
  font-weight: bold;
  color: #ff6600; 
}
.arrivinggoods {
  font-weight: bold;
  color: #FF0000;

}
td.arrivinggoodstooltip {
  padding: 3px;

}
td.arrivinggoodstooltip {
  border-width: 1px;
  border-style: dotted;

}

/****************** progress bar styles *******************/
table.myPercent {
  height: 7px;
  width: 100%;

}
tr.myPercent {
  height: 7px;

}
td.myPercentRemaining {
//  background-color: #009900;
}
td.myPercentNormal { /* normal state. you have plenty of rooms */
  background-color: #009900;
}
td.myPercentWarning { /* warehose is getting full */
  background-color: #ff7700;
}
td.myPercentAlmostFull { /* warehouse is almost full */
  background-color: #ff0000;
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
  background-color: #ffff00;
  color: white;
}
td.current_building {
}
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
var tavernWineUsage = [0, 3, 5, 8, 11, 14, 17, 21, 25, 29, 33, 38, 42, 47, 52, 57, 63, 68];
var townHallSpaces = [0, 60, 96, 143, 200, 263, 333, 410, 492, 580, 672, 769, 871, 977, 1087, 1201, 1320, 1441, 1567, 1696, 1828, 1964, 2103, 2246, 2391, 2540, 2691, 2845, 3003, 3163, 3326, 3492, 3660];
var unitsAndShipsIndexes = {
  "unit slinger" : 0,
  "unit swordsman" : 1,
  "unit phalanx": 2,
  "unit ram" : 3,
  "unit archer" : 4,
  "unit catapult" : 5,
  "unit marksman" : 6,
  "unit mortar" : 7,
  "unit steamgiant" : 8,
  "unit gyrocopter" : 9,
  "unit bombardier" : 10,
  "unit medic" : 11,
  "unit cook" : 12,

  "unit ship_ram" : 13,
  "unit ship_ballista" : 14,
  "unit ship_flamethrower" : 15,
  "unit ship_catapult" : 16,
  "unit ship_mortar" : 17,
  "unit ship_steamboat" : 18,
  "unit ship_submarine" : 19,
};
var unitsAndShipsIndexesR = [];
for(key in unitsAndShipsIndexes) {
  unitsAndShipsIndexesR[unitsAndShipsIndexes[key]] = key;
}
var unitScoreBasePoints = {"wood": 2, "wine": 4, "glass": 4, "sulfur": 4};
var warehouseWoodCapacities = [0, 2160, 3200, 4576, 6336, 8424, 9975, 12799, 16152, 19944, 24200, 28791, 34040, 43520, 54439, 66528, 80024, 320096, 640192, 1280384, 2560768, 5121536, 10243072, 20486144, 40972288, 81944576, 163889152, 327778304, 655556608, 1311113216, 2622226432, 5244452864, 10488905728];
var warehouseOtherCapacities = [0, 720, 800, 1152, 2352, 2548, 3507, 3780, 5332, 7179, 9347, 11784, 14499, 20028, 23548, 27484, 34932, 139728, 279456, 558912, 1117824, 2235648, 4471296, 8942592, 17885184, 35770368, 71540736, 143081472, 286162944, 572325888, 1144651776, 2289303552, 4578607104];


var buildings;
var texts;
function getLocalizedTexts() {
  if (language == "hu") {
    buildings = {
      "townHall"      : ["Városháza", "Városháza"],
      "academy"       : ["Akadémia", "Akadémia"],
      "port"          : ["Kiköt?", "Kiköt?"],
      "shipyard"      : ["Hajógyár", "Hajógyár"],
      "warehouse"     : ["Raktár", "Raktár"],
      "wall"          : ["Városfal", "Fal"],
      "tavern"        : ["Fogadó", "Fogadó"],
      "museum"        : ["Múzeum", "Múzeum"],
      "palace"        : ["Palota", "Palota"],
      "palaceColony"  : ["Helytartó", "Helytartó"],
      "embassy"       : ["Nagykövetség", "Nagykövetség"],
      "branchOffice"  : ["Keresked?", "Keresked?"],
      "safehouse"     : ["Rejtekhely", "Rejtekhely"],
      "barracks"      : ["Barakk", "Barakk"],
      "workshop-army" : ["M?hely", "M?hely"],
    };
    texts = {
      "cityName": "Város neve", "currentlyBuilding": "Építés alatt", "summary": "Összesen:",
      "hide_settings": "Beállítások elrejtése", "show_settings": "Beállítások megtekintése",
    };
  } else if (language == "de") { //german translation, thanks to Schneppi
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
      "workshop-army" : ["Erfinderwerkstatt", "Erfinder"],
    };
    texts = {
      "cityName": "Stadtname", "currentlyBuilding": "Zur Zeit im Bau", "summary": "Gesamt:",
      "hide_settings": "Hide settings", "show_settings": "Show settings",
    };
  } else if (language == "cz") { //cz translation, thanks to pavel10
    buildings = {
      "townHall"      : ["M?stská radnice", "radnice"],
      "academy"       : ["Akademie", "akademie"],
      "port"          : ["Obchodní p?ístav", "pristav"],
      "shipyard"      : ["Lodenice", "lodenice"],
      "warehouse"     : ["Sklad", "sklad"],
      "wall"          : ["M?stská ze?", "zed"],
      "tavern"        : ["Hostinec", "hostinec"],
      "museum"        : ["Muzeum", "muzeum"],
      "palace"        : ["Palác", "palac "],
      "palaceColony"  : ["Guvernérova Rezidence", "rezidence"],
      "embassy"       : ["Ambasáda", "ambasada"],
      "branchOffice"  : ["Tr?nice", "trznice"],
      "safehouse"     : ["Úkryt", "ukryt"],
      "barracks"      : ["Kasárna", "kasarna"],
      "workshop-army" : ["Dílna", "dilna"],
    };
    texts = {
      "cityName": "Jméno", "currentlyBuilding": "Staví se", "summary": "Celkem:",
      "hide_settings": "Hide settings", "show_settings": "Show settings",
    };
} else if (language == "tr") { //Turkish translation,okan
    buildings = {
         "townHall"      : ["Belediye Binasi", "Belediye Binasi"],
      "academy"       : ["Akademi", "Akademi"],
      "port"          : ["Ticaret Limani", "Ticaret Limani"],
      "shipyard"      : ["Donanma Tersanesi", "Donanma Tersanesi"],
      "warehouse"     : ["Depo", "Depo"],
      "wall"          : ["Sur", "Sur"],
      "tavern"        : ["Taverna", "Taverna"],
      "museum"        : ["Müze", "Müze"],
      "palace"        : ["Saray", "Saray"],
      "palaceColony"  : ["Vali Konagi", "Vali Konagi"],
      "embassy"       : ["Büyük Elçilik", "Büyük Elçilik"],
      "branchOffice"  : ["Ticaret Merkezi", "Ticaret Merkezi"],
      "safehouse"     : ["Istihbarat Merkezi", "Istihbarat Merkezi"],
      "barracks"      : ["Kişla", "Kişla"],
      "workshop-army" : ["Mucit Atölyesi", "Mucit Atölyesi"],
    };
    texts = {
      "cityName": "Şehir", "currentlyBuilding": "Yükseltilen", "summary": "Toplam:",
      "hide_settings": "Ayarları Gizle", "show_settings": "Ayarları Göster",
    };
  } else if (language == "es") { //Spanish translation, thanks to dragondeluz
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
      "workshop-army" : ["Taller de Invenciones", "Taller"],
    };
    texts = {
      "cityName": "Nombre de la Ciudad", "currentlyBuilding": "Construcción Actual", "summary": "Totales:",
      "hide_settings": "Hide settings", "show_settings": "Show settings",
    };
  } else if (language == "gr") { //Greek translation, thanks to Samael
    buildings = {
      "townHall"      : ["Δημαρχείο", "Δημαρχείο"],
      "academy"       : ["Ακαδημία", "Ακαδημία"],
      "port"          : ["Λιμένας", "Λιμένας"],
      "shipyard"      : ["Ναυπηγείο", "Ναυπηγείο"],
      "warehouse"     : ["Αποθήκη", "Αποθήκη"],
      "wall"          : ["Τοίχος", "Τοίχος"],
      "tavern"        : ["Ταβέρνα", "Ταβέρνα"],
      "museum"        : ["Μουσείο", "Μουσείο"],
      "palace"        : ["Παλάτι", "Παλάτι"],
      "palaceColony"  : ["Κατοικία", "Κατοικία"],
      "embassy"       : ["Πρεσβεία", "Πρεσβεία"],
      "branchOffice"  : ["Αγορά", "Αγορά"],
      "safehouse"     : ["Κρυσφήγετο", "Κρυσφήγετο"],
      "barracks"      : ["Στρατώνας", "Στρατώνας"],
      "workshop-army" : ["Εργαστήριο", "Εργαστήριο"],
    };
    texts = {
      "cityName": "Πόλη", "currentlyBuilding": "Τρέχουσα Εργασία", "summary": "Συνοψη",
      "hide_settings": "Απόκρυψη ρυθμίσεων", "show_settings": "Εμφάνιση ρυθμίσεων",
    };
  } else if (language == "it") { //Italian translation, thanks to Brucee
    buildings = {
      "townHall"      : ["Municipio", "Municipio"],
      "academy"       : ["Accademia", "Accademia"],
      "port"          : ["Porto", "Porto"],
      "shipyard"      : ["Cantiere navale", "Cantiere navale"],
      "warehouse"     : ["Magazzino", "Magazzino"],
      "wall"          : ["Muro", "Muro"],
      "tavern"        : ["Taverna", "Taverna"],
      "museum"        : ["Museo", "Museo"],
      "palace"        : ["Palazzo", "Palazzo"],
      "palaceColony"  : ["Governatore", "Governatore"],
      "embassy"       : ["Ambasciata", "Ambasciata"],
      "branchOffice"  : ["Mercato", "Mercato"],
      "safehouse"     : ["Rudere", "Rudere"],
      "barracks"      : ["Caserma", "Caserma"],
      "workshop-army" : ["Officina", "Officina"],
    };
    texts = {
      "cityName": "Citta", "currentlyBuilding": "Costruzione in corso", "summary": "Sommario:",
      "hide_settings": "Hide settings", "show_settings": "Show settings",
    };
  } else if (language == "pt") { //Portuguese translation, thanks to alpha tester
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
      "workshop-army" : ["Oficina", "Oficina"],
    };
    texts = {
      "cityName": "Cidades", "currentlyBuilding": "Em Construçao", "summary": "Sumário:",
      "hide_settings": "Ocultar Configuraçoes", "show_settings": "Ver Configuraçoes",
    };
  } else if (language == "fr") { //French translation, thanks to Chirel
    buildings = {
      "townHall"      : ["Hôtel de ville", "Hôtel"],
      "academy"       : ["Académie", "Académie"],
      "port"          : ["Port commercial", "Port"],
      "shipyard"      : ["Chantier naval", "Chantier"],
      "warehouse"     : ["Entrepôt", "Entrepôt"],
      "wall"          : ["Mur d'enceinte", "Mur"],
      "tavern"        : ["Taverne", "Taverne"],
      "museum"        : ["Musée", "Musée"],
      "palace"        : ["Palais", "Palais"],
      "palaceColony"  : ["Résidence du Gouverneur", "Résidence"],
      "embassy"       : ["Ambassade", "Ambassade"],
      "branchOffice"  : ["Comptoir", "Comptoir"],
      "safehouse"     : ["Cachette", "Cachette"],
      "barracks"      : ["Caserne", "Caserne"],
      "workshop-army" : ["Atelier", "Atelier"],
    };
    texts = {
      "cityName": "Nom ville", "currentlyBuilding": "Construction en cours", "summary": "Total:",
      "hide_settings": "Hide settings", "show_settings": "Show settings",
    };
  } else if (language == "pl") { //Polish translation, thanks to -S-X-
    buildings = {
      "townHall"      : ["Ratusz", "Ratusz"],
      "academy"       : ["Akademia", "Akademia"],
      "port"          : ["Port", "Port"],
      "shipyard"      : ["Stocznia", "Stocznia"],
      "warehouse"     : ["Magazyn", "Magazyn"],
      "wall"          : ["Mur", "Mur"],
      "tavern"        : ["Tawerna", "Tawerna"],
      "museum"        : ["Muzeum", "Muzeum"],
      "palace"        : ["Pa?ac", "Pa?ac"],
      "palaceColony"  : ["Stolica", "Stolica"],
      "embassy"       : ["Ambasada", "Ambasada"],
      "branchOffice"  : ["Mercato", "Mercato"],
      "safehouse"     : ["Rudere", "Rudere"],
      "barracks"      : ["Koszary", "Koszary"],
      "workshop-army" : ["Warsztat", "Warsztat"],
    };
    texts = {
      "cityName": "Nazwa Miasta", "currentlyBuilding": "Obecnie w budowie", "summary": "Podsumowanie:",
      "hide_settings": "Ukryj ustawienia", "show_settings": "Poka? ustawienia",
    };
  } else if (language == "ro") { //by Atomic
    buildings = {
      "townHall"      : ["Prim?ria", "Prim?ria"],
      "academy"       : ["Academie", "Academie"],
      "port"          : ["Portcomercial", "PortComer?"],
      "shipyard"      : ["?antier naval", "?antierNav"],
      "warehouse"     : ["Magazie", "Magazie"],
      "wall"          : ["Zidurile ora?ului", "Zid"],
      "tavern"        : ["Taverna", "Taverna"],
      "museum"        : ["Muzeu", "Muzeu"],
      "palace"        : ["Palat", "Palat"],
      "palaceColony"  : ["Re?edinta Guvernatorului", "Re?.Guv."],
      "embassy"       : ["Ambasad?", "Ambasad?"],
      "branchOffice"  : ["Punct de nego?", "PunctNego?"],
      "safehouse"     : ["Ascunz?toare", "Ascunz?."],
      "barracks"      : ["Casarma", "Casarma"],
      "workshop-army" : ["Atelier", "Atelier"], 
    };
    texts = {
      "cityName": "NumeleOra?ului", "currentlyBuilding": "In construc?ie",
      "summary" : "Total:", "hide_settings": "Inchide Setarile", "show_settings": "Vezi Setarile",
    };
  } else if (language == "ru") { //by LiFeAiR
    buildings = {
      "townHall"      : ["Town Hall", "??????"],
      "academy"       : ["Academy", "????????"],
      "port"          : ["Trading Port", "???????? ????"],
      "shipyard"      : ["Shipyard", "?????"],
      "warehouse"     : ["Warehouse", "?????"],
      "wall"          : ["Wall", "?????"],
      "tavern"        : ["Tavern", "???????"],
      "museum"        : ["Museum", "?????"],
      "palace"        : ["Palace", "??????"],
      "palaceColony"  : ["Governor's Residence", "??????????"],
      "embassy"       : ["Embassy", "??????????"],
      "branchOffice"  : ["Trading Post", "?????"],
      "safehouse"     : ["Hideout", "???????"],
      "barracks"      : ["Barracks", "???????"],
      "workshop-army" : ["Workshop", "??????????"],
    };
    texts = {
      "cityName": "?????", "currentlyBuilding": "????????", "summary": "?????:",
      "hide_settings": "?????? ?????????", "show_settings": "???????? ?????????",
    };
  } else {
    buildings = {
         "townHall"      : ["Belediye Binasi", "Belediye Binasi"],
      "academy"       : ["Akademi", "Akademi"],
      "port"          : ["Ticaret Limani", "Ticaret Limani"],
      "shipyard"      : ["Donanma Tersanesi", "Donanma Tersanesi"],
      "warehouse"     : ["Depo", "Depo"],
      "wall"          : ["Sur", "Sur"],
      "tavern"        : ["Taverna", "Taverna"],
      "museum"        : ["Müze", "Müze"],
      "palace"        : ["Saray", "Saray"],
      "palaceColony"  : ["Vali Konagi", "Vali Konagi"],
      "embassy"       : ["Büyük Elçilik", "Büyük Elçilik"],
      "branchOffice"  : ["Ticaret Merkezi", "Ticaret Merkezi"],
      "safehouse"     : ["Istihbarat Merkezi", "Istihbarat Merkezi"],
      "barracks"      : ["Kişla", "Kişla"],
      "workshop-army" : ["Mucit Atölyesi", "Mucit Atölyesi"],
    };
    texts = {
      "cityName": "Şehir", "currentlyBuilding": "Yükseltilen", "summary": "Toplam:",
      "hide_settings": "Ayarları Gizle", "show_settings": "Ayarları Göster",
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

//var city_idmainView = getNodeValue("id('breadcrumbs')/*[@class='city']");
var city_name = getNodeValue("id('breadcrumbs')/*[@class='city']");
//var island_id = getNodeValue("id('breadcrumbs')//a[@title='Back to the island']");
//if (island_id == undefined){
//	island_id = "";
//}
var island_id = getNodeValue("id('breadcrumbs')//a[@class='island']");
if ( island_id == undefined || island_id == 0 )
    island_id = /\[[0-9][0-9]:[0-9][0-9]\]/.exec(getNode("id('breadcrumbs')").innerHTML)[0];

//city_idmainView = TrimIsland(island_id)+" "+city_idmainView;
var city_idmainView = getNode_value("//option[@class='avatarCities coords' and text()='"+TrimIsland(island_id)+" "+city_name+"']", 0);
if (city_idmainView == 0){
    city_idmainView = getNode_value("//option[@class='avatarCities' and text()=' "+city_name+"']", 0);	
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
log("server: "+server+", language: "+language+", city_id: "+city_id+", city_idmainView: "+city_idmainView+", city_coord: "+city_coord+", island_id: "+island_id);

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
  log("Pontosan 1 elemet kellett volna visszaadnia: "+path+", de "+value.snapshotLength+" elemet adott vissza");
  for(var i = 0; i < value.snapshotLength; i++) {
    log(i+".: "+getPath(value.snapshotItem(i)));
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
  if (value != null) {
    return value.title;
  }
  return defaultValue;
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
  var nScript = document.getElementById("cityResources").getElementsByTagName("script")[0];
  var sCode = nScript.innerHTML;

  var aCodeLines = sCode.split(';');
  var sTradeGoodName = aCodeLines[20].substring(aCodeLines[20].indexOf('(')+2,aCodeLines[20].indexOf(')')-1);
  var startResourcesDelta = /startResourcesDelta.*= *([0-9.]+)/.exec(sCode);
  if (startResourcesDelta != null) {
    startResourcesDelta = parseFloat(RegExp.$1) * 3600;
  } else {
    startResourcesDelta = 0;
  }
  var startTradegoodDelta = /startTradegoodDelta.*= *([0-9.]+)/.exec(sCode);
  if (startTradegoodDelta != null) {
    startTradegoodDelta = parseFloat(RegExp.$1) * 3600;
  } else {
    startTradegoodDelta = 0;
  }

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
function createTooltipAttribute(tooltip) {
  if (tooltip == undefined || tooltip == "") {
    return "";
  }
  var html = "<table border='0' cellspacing='4' cellpadding=4 class=''><tr><td>"+tooltip+"</td></tr></table>";
  return "onmouseover=\"Tip('"+(html.replace(/'/g, "\\'"))+"', STICKY, false, FOLLOWMOUSE, false, DELAY, 1, SHADOW, false, ABOVE, true);\"";
}
function createTooltip(content, tooltip) {
  if (tooltip == undefined || tooltip == "") {
    return content;
  }
  return "<font "+createTooltipAttribute(tooltip)+">"+content+"</font>";
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
    res += plusText;
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
      log("ismeretlen progress bar mode: "+PROGRESS_BAR_MODE);
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
  if (""+prodPerHour == "" || ""+prodPerHour == "0" || prodPerHour == undefined || ""+prodPerHour == "NaN") {
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
      if(arrlen[level] != 0){log('var missed : '+save); return undefined;};
      //log(arrlen[level]);
      level--;
    continue;
    default:
      if(level==0) return final;
      log('syntax invalid(1) : '+save+"\nat\n"+txt+"level is at "+level);
      return undefined;
    }
    if(arrlen[level]%2 == 0){
      if(typeof(ret) == 'object'){log('array index object no accepted : '+save);return undefined;}
      if(ret == undefined){log('syntax invalid(2) : '+save);return undefined;}
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
  return createLink(text, "?view=city&id="+city_id, "onclick=\"var s = document.getElementById('citySelect'); s.selectedIndex = "+city_index+"; s.form.submit(); return false;\"");
}
function createLinkToForeignCity(text, city_id) {
  return createLink(text, "?view=island&id="+city_id);
}
function createLinkToResource(text, island_id, city_id, city_index) {
  if (island_id != undefined && island_id != "") {
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
  var tooltip = "<table class='arrivinggoodstooltip'>";
  var rows = getArrValue(config.arrivinggoods, city_id, []);
  var key;
  var found = false;
  for (key in rows) {
    var row = rows[key];
    var res = row["res"];
    var a = getArrValue(res, resName, 0);
    if (a > 0) {
      var startcity = getArrValue(row, "startcity", "");
      var quest = getArrValue(row, "quest", "");
      var arrivetime = getArrValue(row, "arrivetime", "");
      tooltip += "<tr class='arrivinggoodstooltip'>"+
                 "<td class='arrivinggoodstooltip' align=right>"+mynumberformat(a, true) + "</td>"+
                 "<td class='arrivinggoodstooltip'>" + startcity + "</td>"+
                 "<td class='arrivinggoodstooltip'>" + quest + "</td>"+
                 "<td class='arrivinggoodstooltip'>" + arrivetime + "</td>"+
                 "</tr>";
      found = true;
    }
  }
  tooltip += "</table>";
  var s = "";
  if (found) {
    s = " "+createTooltip("<font class='arrivinggoods'>++</font>", tooltip);
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

log("time0: "+(new Date().getTime() - _startTime)+" msec");



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
  //osszegyujti az epuletek szintjeit a varosban
  var nodes = xpath("//li[contains(@id, 'position')]/a[contains(@href, 'view=')]");
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
      res.buildings[name].level = level;
    }
  }
  //townhall population total and growth
  if (/view=townHall/.test(document.URL)) {
    //ennyivel több a kapacitás, mint a városháza szintje alapján lenne
    res.buildings["townHall"].bonusspace = Number(getNodeValue("//span[@class='value total']", "0")) - townHallSpaces[getArrValue(res.buildings["townHall"], "level")];
    //ennyi az elégedettség a populációt nem számítva
    res.buildings["townHall"].happiness  = Number(getNodeValue("//div[contains(@class, 'happiness ')]/div[@class='value']", "0")) + res.population;
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
  if (/view=tavern/.test(document.URL)) {
    //hozzáad egy eseménykezel?t a "Csirió!" gombhoz, hogy eltárolja a beállított bor mennyiségét
    function storeWineUsage() {
      try {
        var n = document.getElementById("wineAmount");
        var city_id = getNode_value("//form[@id='wineAssignForm']/input[@type='hidden' and @name='id']");
        var city = getCity(city_id);
        city.wineUsage = tavernWineUsage[n.selectedIndex];
        setVar("config", serialize(config));
      } catch (e) {
        log("Hiba: "+e);
      }
    }
    var n = getNode("//form[@id='wineAssignForm']//*[@type='submit']");
    n.addEventListener("click", storeWineUsage, false);
    //leolvassa az aktuálisan beállított bor mennyiségét
    var n = document.getElementById("wineAmount");
    res.wineUsage = tavernWineUsage[n.selectedIndex];
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
} else {
  if (/view=merchantNavy/.test(document.URL)) {
    config["arrivinggoods"] = new Object();
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
      log("cel: "+cel);
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
        log("szallitmany ide: "+found+": "+rak);
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
    log("arrivinggoods: "+serialize(config.arrivinggoods));
  }
  
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
}

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
    log('var undefined: '+typeof(txt)); //return undefined;
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
  var TABLE_PLAYERS   = getCfgValue("TABLE_PLAYERS",   false); //table for players and cities
  PROGRESS_BAR_MODE = getCfgValue("PROGRESS_BAR_MODE", "time"); //progress bar mode for resource counters
  GM_addStyle(getCfgValueNonEmpty("CSS", default_style));
  
  var nodes = xpath("//select[@id='citySelect']/option"); //cities
  var s = "";

  log("time1: "+(new Date().getTime() - _startTime)+" msec");
  //az els? táblázat kirajzolása (nyersanyagok)
  if (TABLE_RESOURCES) {
    var woodName =   getNodeTitle("//div[@id='cityResources']/ul[@class='resources']/li[@class='wood']", "wood");
    var wineName =   getNodeTitle("//div[@id='cityResources']/ul[@class='resources']/li[@class='wine']", "wine");
    var marbleName = getNodeTitle("//div[@id='cityResources']/ul[@class='resources']/li[@class='marble']", "marble");
    var glassName =  getNodeTitle("//div[@id='cityResources']/ul[@class='resources']/li[@class='glass']", "crystal");
    var sulfurName = getNodeTitle("//div[@id='cityResources']/ul[@class='resources']/li[@class='sulfur']", "sulfur");
    var populationName = getNodeTitle("//div[@id='cityResources']//li[@class='population']", "population");
    s += "<table border=1 class='resources_table'>";
    s += "<tr class='table_header'>";
    s += "<th class='table_header' colspan=2>"+texts["cityName"]+"</th>"+
         "<th colspan=4 class='lf table_header'>"+populationName+"</th>"+
         "<th colspan=2 class='lf table_header'>"+woodName+"</th>"+
         "<th colspan=3 class='lf table_header'>"+wineName+"</th>"+
         "<th colspan=2 class='lf table_header'>"+marbleName+"</th>"+
         "<th colspan=2 class='lf table_header'>"+glassName+"</th>"+
         "<th colspan=2 class='lf table_header'>"+sulfurName+"</th>"+
         "<th colspan=2 class='lf table_header'>"+texts["currentlyBuilding"]+"</th>";
    s += "</tr>";
    var sumres = new Resource("");
    var sumProd = new Resource("");
    sumProd.wineUsage = 0;
    var currenttime = new Date().getTime();
    for(var i = 0; i < nodes.snapshotLength; i++) {
      var city = nodes.snapshotItem(i);
      var res = getCity(city.value);
      var wineUsage;
      if (res.wineUsage != undefined) {
        wineUsage = res.wineUsage;
      } else {
        var tavernLevel = getArrValue(res.buildings["tavern"], "level", "-");
        wineUsage = (tavernLevel > 0 ? tavernWineUsage[tavernLevel] : 0);
      }

      sumres.wood += getCurrentResourceAmount(currenttime, res.prodtime, res.wood, res.prodwood);
      sumres.wine += getCurrentResourceAmount(currenttime, res.prodtime, res.wine, res.prodwine - wineUsage);
      sumres.marble += getCurrentResourceAmount(currenttime, res.prodtime, res.marble, res.prodmarble);
      sumres.glass += getCurrentResourceAmount(currenttime, res.prodtime, res.glass, res.prodglass);
      sumres.sulfur += getCurrentResourceAmount(currenttime, res.prodtime, res.sulfur, res.prodsulfur);
      
      sumProd.wood += res.prodwood;
      sumProd.wine += res.prodwine;
      sumProd.marble += res.prodmarble;

      sumProd.glass += res.prodglass;
      sumProd.sulfur += res.prodsulfur;
      
      sumProd.wineUsage += wineUsage;
      var townHallLevel = getArrValue(res.buildings["townHall"], "level", "-");
      var wineTooltip = "";
      if (Math.round(res.prodwine) > 0) {
        wineTooltip = mynumberformat(Math.round(res.prodwine), true)+" / h";
      }
      var wineRemainingHours = undefined;
      if (wineUsage > 0) {
        wineRemainingHours = floatFormat(getCurrentResourceAmount(currenttime, res.prodtime, res.wine, res.prodwine - wineUsage) / wineUsage, 1) + " h";
      }
      var wineUsageHtml = wineUsage > 0 ? createProd(-1 * wineUsage, wineRemainingHours) : "";
      var arr = res.underConstruction.split(",");
      var underConstruction = arr[0];
      var counter = createTimeCounter(arr[1]);
      var happiness = getArrValue(res.buildings["townHall"], "happiness", "?");
      var population = res.population;
      var bonusspace = getArrValue(res.buildings["townHall"], "bonusspace", "?");
      var spacetotal = townHallSpaces[townHallLevel];
      if (happiness != "?") {
        population = getEstimatedPopulation(population, res.prodtime, currenttime, happiness - population);
        if (parseInt(population) > parseInt(spacetotal) + parseInt(bonusspace)) {
          population = parseInt(spacetotal) + parseInt(bonusspace);
        }
        happiness -= population;
      }
      
      sumres.population += population;
      
      var growthRemainingHours = undefined;
      var growth = happiness != "?" ? floatFormat(0.02 * happiness, 2, true) : "?";
      if (happiness != "?" && happiness > 0 && bonusspace != "?") {
//        growthRemainingHours = floatFormat((parseInt(spacetotal) + parseInt(bonusspace) - parseInt(population)) / (0.02 * happiness), 1) + " h";
        growthRemainingHours = getGrowthRemainingHours(population, parseInt(spacetotal) + parseInt(bonusspace), currenttime, happiness);
      }
      var cs = "";
      var lfcs = "lf";
      if (parseInt(city_id) == parseInt(city.value)) {
        cs += " current_city_highlight";
        lfcs += " current_city_highlight";
      }
      var townHallStyle = "";
      if (parseInt(population) >= parseInt(spacetotal) + parseInt(bonusspace)) {
        townHallStyle = " populationfull";
      } else {
        log("population is less than spacetotal "+population+" < "+(parseInt(spacetotal) + parseInt(bonusspace)));
      }
      if (bonusspace != "?") {
        spacetotal = createTooltip(mynumberformat(parseInt(spacetotal) + parseInt(bonusspace)), mynumberformat(spacetotal) + " + " + mynumberformat(bonusspace));
      } else {
        spacetotal = mynumberformat(spacetotal) + " + ?";
      }
      var warehouseLevel = getArrValue(res.buildings["warehouse"], "level", "0");
      var maxcwood = warehouseWoodCapacities[warehouseLevel] + 1000;//1000 a városháza kapacitása
      var maxcother = warehouseOtherCapacities[warehouseLevel] + 300;//300 a városháza kapacitása
      s += "<tr>";
      s += "<td class='"+cs+"'>"+createLinkToCity(city.innerHTML, city.value, i)+"</td>"+
           "<td class='"+cs+"'>"+res.city_coord+"</td>"+
           "<td class='"+lfcs+townHallStyle+"'>"+createLastUpdateAsTooltip(mynumberformat(population), res.prodtime)+"</td>"+
               "<td class='"+cs+"'>"+spacetotal+"</td>"+
               "<td class='"+cs+"'>"+happiness+"</td>"+
               "<td class='"+cs+"'>"+createTooltip(growth, growthRemainingHours)+"</td>"+
           "<td class='"+lfcs+"'>"+createLinkToResource(
                              createCounter(res.prodtime, res.wood, res.prodwood, false, maxcwood, getArrivingGoods(city.value, "wood")),
                              res.island_id, city.value, i) +"</td>"+
               "<td class='"+cs+"'>"+createProd(res.prodwood)+"</td>"+
           "<td class='"+lfcs+"'>"+createLinkToTradegoodCond(res.prodwine > 0,
                              createCounter(res.prodtime, res.wine, res.prodwine - wineUsage, false, maxcother, getArrivingGoods(city.value, "wine")),
                              res.island_id, city.value, i) +"</td>"+
               "<td class='"+cs+"'>"+wineUsageHtml+"</td>"+
               "<td class='"+cs+"'>"+createProd(res.prodwine)+"</td>"+
           "<td class='"+lfcs+"'>"+createLinkToTradegoodCond(res.prodmarble > 0,
                              createCounter(res.prodtime, res.marble, res.prodmarble, false, maxcother, getArrivingGoods(city.value, "marble")),
                              res.island_id, city.value, i)+"</td>"+
               "<td class='"+cs+"'>"+createProd(res.prodmarble)+"</td>"+
           "<td class='"+lfcs+"'>"+createLinkToTradegoodCond(res.prodglass > 0,
                              createCounter(res.prodtime, res.glass, res.prodglass, false, maxcother, getArrivingGoods(city.value, "glass")),
                              res.island_id, city.value, i) +"</td>"+
               "<td class='"+cs+"'>"+createProd(res.prodglass)+"</td>"+
           "<td class='"+lfcs+"'>"+createLinkToTradegoodCond(res.prodsulfur > 0,
                              createCounter(res.prodtime, res.sulfur, res.prodsulfur, false, maxcother, getArrivingGoods(city.value, "sulfur")),
                              res.island_id, city.value, i) +"</td>"+
               "<td class='"+cs+"'>"+createProd(res.prodsulfur)+"</td>"+
           "<td class='"+lfcs+"'>"+underConstruction+"</td>"+
               "<td class='"+cs+"'>"+counter+"</td>";
      s += "</tr>";
    }
    s += "<tr class='table_footer'>";
    s += "<td class='table_footer' colspan=2>"+texts["summary"]+"</td>"+
         "<td class='table_footer lf'>"+mynumberformat(sumres.population)+"</td>"+
         "<td class='table_footer'></td>"+
         "<td class='table_footer'></td>"+
         "<td class='table_footer'></td>"+
         "<td class='table_footer lf'>"+createCounter(currenttime, sumres.wood, sumProd.wood)+"</td>"+
         "<td class='table_footer'>"+createProd(sumProd.wood)+"</td>"+
         "<td class='table_footer lf'>"+createCounter(currenttime, sumres.wine, sumProd.wine - sumProd.wineUsage, true)+"</td>"+
         "<td class='table_footer'>"+createProd(-1 * sumProd.wineUsage)+"</td>"+
         "<td class='table_footer'>"+createProd(sumProd.wine)+"</td>"+
         "<td class='table_footer lf'>"+createCounter(currenttime, sumres.marble, sumProd.marble)+"</td>"+
         "<td class='table_footer'>"+createProd(sumProd.marble)+"</td>"+
         "<td class='table_footer lf'>"+createCounter(currenttime, sumres.glass, sumProd.glass)+"</td>"+
         "<td class='table_footer'>"+createProd(sumProd.glass)+"</td>"+
         "<td class='table_footer lf'>"+createCounter(currenttime, sumres.sulfur, sumProd.sulfur)+"</td>"+
         "<td class='table_footer'>"+createProd(sumProd.sulfur)+"</td>"+
         "<td class='table_footer lf'></td>"+
         "<td class='table_footer'></td>";
    s += "</tr>";
    s += "</table>";
    s += "<br>";
  }

  log("time2: "+(new Date().getTime() - _startTime)+" msec");
  //második táblázat: épületek szintjei
  if (TABLE_BUILDINGS) {
    s += "<table border=1 class='buildings_table'>";
    s += "<tr class='table_header'><th class='table_header'>"+texts["cityName"]+"</th>";
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
      s += "<th class='"+firstStyle+currentBuildingStyle+" table_header'>"+createTooltip(buildings[key][1], buildings[key][0])+"</th>";
      firstStyle = "";
    }
    s += "</tr>";
    for(var i = 0; i < nodes.snapshotLength; i++) {
      var city = nodes.snapshotItem(i);
      var res = getCity(city.value);

      s += "<tr>";
      if (city_idmainView > 0) {
        cs = (parseInt(city_idmainView) == parseInt(city.value)) ? "current_city_highlight" : "";
      } else {
        cs = (parseInt(city_id) == parseInt(city.value)) ? "current_city_highlight" : "";
      }
      s += "<td class='"+cs+"'>"+createLinkToCity(city.innerHTML, city.value, i)+"</td>";
      var firstStyle = "lf";
      for(key in buildings) {
        var level = getArrValue(res.buildings[key], "level", "-");
        if (level == undefined || level == "") {
          level = "-";
        } else if (res.underConstructionName == key) {
          firstStyle += " upgrading";
          level = createTooltip(level, texts["currentlyBuilding"]);
        }
        var currentBuildingStyle = "";
        if (key == body_id) {
          currentBuildingStyle = " current_building";
        }
        s += "<td class='"+cs+" "+firstStyle+currentBuildingStyle+"'>"+level+"</td>";
        firstStyle = "";
      }
      s += "</tr>";
    }
    s += "</table>";
    s += "<br>";
  }

  log("time3: "+(new Date().getTime() - _startTime)+" msec");

  //harmadik táblázat: hadsereg + flotta
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
        s += "<tr class='table_header'><th class='table_header'>"+texts["cityName"]+"</th>";
        for(key in names) {
          var name = names[key];
          if (usedIndexes[key] == 1) {
            s += "<th class='lf table_header' colspan=2>"+name+"</th>";
          }
        }
        s += "<th class='lf table_header' colspan=2>"+texts["summary"]+"</th>";
        s += "</tr>";
        var sum = [];
        var sumPoint = [];
        for(var i = 0; i < nodes.snapshotLength; i++) {
          var city = nodes.snapshotItem(i);
          var res = getCity(city.value);

          s += "<tr>";
          var cs;
          if (city_idmainView > 0) {
            cs = (parseInt(city_idmainView) == parseInt(city.value)) ? "current_city_highlight" : "";
          } else {
            cs = (parseInt(city_id) == parseInt(city.value)) ? "current_city_highlight" : "";
          }
          s += "<td class='"+cs+"'>"+createLinkToCity(city.innerHTML, city.value, i)+"</td>";
          var citySum = 0;
          var citySumPoint = 0;
          for(key in names) {
            if (usedIndexes[key] == 1) {
              var level = getIntValue(getArrValue(getArrValue(res.units, key), "count", "0"), 0);
              var pointPerUnit = getIntValue(getArrValue(config["unitpoints"], key, "0"), 0);
              if (level == 0) {
                level = "-";
              } else {
                sum[key] = (sum[key] == undefined) ? level : sum[key] + level;
                citySum += level;
              }
              var point = "";
              if (pointPerUnit == 0 || level == "-") {
              } else {
                point = pointPerUnit * level;
                sumPoint[key] = (sumPoint[key] == undefined) ? point : sumPoint[key] + point;
                citySumPoint += point;
                point = createTooltip(mynumberformat(point), level + " * " + mynumberformat(pointPerUnit) + " point");
              }
              s += "<td class='lf "+cs+"'>"+mynumberformat(level)+"</td>"+
                   "<td class='"+cs+"'>"+point+"</td>";
            }
          }
          s += "<td class='lf table_footer "+cs+"'>"+(citySum != 0 ? mynumberformat(citySum) : "-")+"</td>"+
               "<td class='table_footer "+cs+"'>"+(citySumPoint != 0 ? mynumberformat(citySumPoint) : "-")+"</td>";
          s += "</tr>";
        }
        s += "<tr class='table_footer'>";
        s += "<td class='table_footer'>"+texts["summary"]+"</td>";
        var citySum = 0;
        var citySumPoint = 0;
        for(key in names) {
          if (usedIndexes[key] == 1) {
            s += "<td class='table_footer lf'>"+mynumberformat(sum[key])+"</td>"+
                 "<td class='table_footer'>"+mynumberformat(sumPoint[key])+"</td>";
            citySum += sum[key];
            citySumPoint += sumPoint[key];
          }
        }
        s += "<td class='table_footer lf'>"+mynumberformat(citySum)+"</td>"+
             "<td class='table_footer'>"+mynumberformat(citySumPoint)+"</td>";
        s += "</tr>";
        s += "</table>";
        s += "<br>";
      }
    }
  }


  log("time4: "+(new Date().getTime() - _startTime)+" msec");

  //negyedik táblázat: játékosok, és azok városai
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


  var body = getNode("//body");
  var table_mode = "new_table";
  var span = document.getElementById("overview__table");
  if (span == null) {
    span = document.createElement('div');
    span.id = "overview__table";
    span.align = "center";
    span.setAttribute("style", "clear: left;");
    span.innerHTML = s;
    body.appendChild(span);
  } else {
    span.innerHTML = s;
    table_mode = "refresh_table";
  }
  log("time6: "+(new Date().getTime() - _startTime)+" msec");



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
      log(this.lang+" set to "+config.cfg[this.lang]);
      setVar("config", serialize(config));
    }
    function myChgEventHandler() {
      config.cfg[this.lang] = this.value;
      log(this.lang+" set to "+config.cfg[this.lang]);
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
    t.appendChild(createRowChk("Uyarı Sesi:", "ALERT_SOUNDS", ALERT_SOUNDS));
    t.appendChild(createRowInput("Uyarı Ses Seviyesi (0 - 100):", "ALERT_VOLUME", ALERT_VOLUME));
    t.appendChild(createRowInput("Tehlike Ses Seviyesi (0 - 100):", "WARNING_VOLUME", WARNING_VOLUME));
    t.appendChild(createRowChk("Sayfayı Otomatik Yenile:", "AUTO_REFRESH", AUTO_REFRESH));
    t.appendChild(createRowInput("Min Otomatik Yenileme Süresi:", "AUTO_REFRESH_MIN_SECS", MIN));
    t.appendChild(createRowInput("Max Otomatik Yenileme Süresi:", "AUTO_REFRESH_MAX_SECS", MAX));
    t.appendChild(createRowChk("Kaynak Tablosunu Göster:", "TABLE_RESOURCES", TABLE_RESOURCES));
    t.appendChild(createRowChk("Bina Seviyelerini Göster:", "TABLE_BUILDINGS", TABLE_BUILDINGS));
    t.appendChild(createRowChk("Birimler ve Gemileri Göster (kışla ve tersaneye tıklamalısınız):", "TABLE_ARMYFLEET", TABLE_ARMYFLEET));
    t.appendChild(createRowChk("Adadaki Oyuncuların Şehir ve Seviyelerini Göster (adaya tıklamanız gerekli):", "TABLE_PLAYERS", TABLE_PLAYERS));
    t.appendChild(createRowSlct("Kaynak ilerlemesi çubuğu şekili:", "PROGRESS_BAR_MODE", PROGRESS_BAR_MODE, {off: "Kapalı", time: "Kalan zamana göre temellendir", percent: "Doluluk oranıyla temellendir"}));
    t.appendChild(createRowSlct("Diller:", "LANGUAGE", language, {"": "Otomatik",tr: "Türkçe", en: "English", hu: "Magyar", de: "German", cz: "Czech",  es: "Spanish", ba: "Bosnian", it: "Italian", pt: "Portuguese", fr: "French"}));
  t.appendChild(createRowInput("Own alliance (short name):", "ownAlly", getCfgValue("ownAlly", "")));
    t.appendChild(createRowInput("Friendly alliances (short names, separated by comma):", "friendlyAllies", getCfgValue("friendlyAllies", "")));
    t.appendChild(createRowInput("Hostile alliances (short names, separated by comma):", "hostileAllies", getCfgValue("hostileAllies", ""))); 

 t.appendChild(createRowTxtr("Tablo Renk ve Boyut Ayarları (Anlamlarını bilmiyorsanız değiştirmeyin):", "CSS", getCfgValueNonEmpty("CSS", default_style), 15, 70));
    t.appendChild(createRowChk("Kayıt Hatalarını Gider:", "DEBUG_LOG", DEBUG_LOG));
    
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
    n.value = "Kaydet ve Yenile";
    n.setAttribute("class", "button");
    n.setAttribute("style", "display: inline !important;");
    n.addEventListener("click", renderTables, false);
    buttonsPanel.appendChild(n);

    //reset button
    var n = document.createElement('input');

    n.type = "button";
    n.value = "Varsayılan Ayarlar";
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
log("time serialize: "+(new Date().getTime() - time)+" msec");
if (getCfgValue("TABLE_PLAYERS", false) == true) {
  var time = new Date().getTime();
  setVar("players", uneval(players));
  log("time uneval: "+(new Date().getTime() - time)+" msec");
}

var _endTime = new Date().getTime();
log("total time: "+(_endTime - _startTime)+" msec");

/***********************************************************************
* Trim Whitespace Function ************************************************************************/
function Trim(str){ 
	str = str.substring(str.indexOf(']')+1,str.length);
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
// Tablo Sonu

// ==================================================================================
//
// ==UserScript==
// @name           Ocean Fill
// @namespace      Ikariam
// @include        http://s*.ikariam.*/index.php*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

//GM_addStyle("");



var URL= "http://i221.photobucket.com/albums/dd189/geoSpartan/ikariam";


GM_addStyle("#city #container2 {position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:url("+URL+"/bg_content.jpg);text-align:left;}");
GM_addStyle("#city #footer {clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px; background-image:url("+URL+"/bg_footer.jpg);font-size:11px;font-weight:bold;color:#edd090;text-align:right;}");

GM_addStyle("#island #container2 {position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:url("+URL+"/bg_content.jpg);text-align:left;}");
GM_addStyle("#island #footer {clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px; background-image:url("+URL+"/bg_footer.jpg);font-size:11px;font-weight:bold;color:#edd090;text-align:right;}");

GM_addStyle("#worldmap_iso #container2 {position:relative;width:1000px;margin:0 -10px;min-height:1px; z-index:20;background-image:url("+URL+"/bg_content.jpg);text-align:left;}");
GM_addStyle("#worldmap_iso #footer {clear:both;position:relative;width:560px;height:33px;padding:47px 120px 0px 340px;margin:0 -10px; background-image:url("+URL+"/bg_footer.jpg);font-size:11px;font-weight:bold;color:#edd090;text-align:right;}");


// Ocean Fill Sonu

// ==================================================================================
//

// ==UserScript==
// @name           ikariam Not Defteri
// @version        1.2
// @namespace      http://ikariamwikibar.googlepages.com/home
// @description    ikariam'a Not Defteri Ekler
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==
// ===========================================================================
// This script was made by EnigmaBrand.

var mynotes = GM_getValue("mynotes", "NOT EKLEMEK iCiN TIKLAYIN!");
var version="1.9";

// Create my div and append it to the body tag
vnotebar = document.createElement("div");
vnotebar.setAttribute("id", "notebar");
var body = document.getElementsByTagName("body");
body[0].appendChild(vnotebar);

// This is the function that saves your notes
unsafeWindow.savenotes = function() {
	window.setTimeout(GM_setValue, 0, "mynotes", document.getElementById("notes").value);
}

// This is the function that clears the window if it has the default value
unsafeWindow.startnotes = function() {
	if(document.getElementById("notes").value == "NOT EKLEMEK iCiN TIKLAYIN!")
	{
		document.getElementById("notes").value = "";
	}
}

unsafeWindow.shownotes = function() {
	if(document.getElementById("notebar").style.left == "-412px")
	{
		document.getElementById("notebar").style.left = "0px;"
	}
}

unsafeWindow.hidenotes = function() {
	document.getElementById("notebar").style.left = "-412px;"
}

// Add the style to the notebar and put the code into it
GM_addStyle("#notebar { width:410px; position:fixed; left:-412px; height:400px; top:115px; z-index: 50; background:url(http://imgboot.com/images/enigmabrand/bgnotebarmid.gif); background-repeat:repeat-y; border:1px black solid;}");
GM_addStyle("#nhead { height:30px; width:410px; position:absolute; left:0px; top:0px; background:url(http://imgboot.com/images/enigmabrand/bgnotebartop.gif); line-height:38px; font-weight:bold; font-size:11px;} ");
GM_addStyle("#notebar:hover { left:0px; }");
GM_addStyle("#nfoot { width:410px; height:3px; background:url(http://imgboot.com/images/enigmabrand/bgnotebarbot.gif); position:absolute; bottom:0px; left:0px;}");
GM_addStyle("#notes { position: absolute; top:31px; left:29px; right:3px; bottom:3px; background: #FDF7DD; border:none; font-weight: bold; font-size: 11px; padding:3px; } ");
GM_addStyle("#notetab { background:url(http://www.imgboot.com/images/enigmabrand/tabnotebar.png); width:26px; height:100px; position:absolute; right:-26px; top:0px; z-index:495; } ");
GM_addStyle("#notetab:hover { cursor: pointer; } ");

var nbHTML = '<div id="notetab" onmouseover="shownotes()" onclick="hidenotes()"></div>';
nbHTML += '<div id="nhead"><a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="http://userscripts.org/users/55264/scripts">Ikiariam Notebar v'+version+'</a></div>';
nbHTML += '<textarea id="notes" cols="66" wrap="soft" rows="23" onkeyup="savenotes()" onclick="startnotes()">'+mynotes+'</textarea>';
nbHTML += '<div id="nfoot"></div>';
document.getElementById("notebar").innerHTML = nbHTML;

///// End of script /////

// ==================================================================================
//
// Animasyon Başı
//
// JavaScript Document
// ==UserScript==
// @name           Ikariam Animator v0.6.7 [WEB BASED]
// @autor          Angelo Verona alias Anilo, Givelin, Omegaboy, TatkaSmoula 
// @email          anilo4ever@gmail.com
// @namespace      Ikariam
// @description    Animated graphic pack for Ikariam v.0.2.5 This Script was approved by Game forge. For more information visit your board (IT,GR,CZ,COM,RU,ES,DE). Creator: Anilo(SVK), International Fun-help Artists: Givelin(CZ), TatkaSmoula(CZ), Omegaboy(CZ). International Help (support/translations): DragonReborn(ORG),jim_aeropeiratis(GR),Frugghi(IT). This script was downloaded more than 700.000 times.
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

/*TEST VERSION, SLOW CODED ONLY FOR TESTING PURPOSE*/

function addAnimStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//*********
//addAnimStyle('');
//'+URL+'/
//*********
var URL= "http://ikariam.bgt-angels.sk/game/animated";
//0.6.7


addAnimStyle('#city #container #mainview #locations .museum .buildingimg {	left:-8px; top:-38px; width:133px; height:98px;  background-image:url('+URL+'/building_museum64x.gif);	}');
addAnimStyle('#city #container #mainview #locations .branchOffice .buildingimg {	left:-19px; top:-31px; width:120px; height:84px; background-image:url('+URL+'/building_marketplace2.gif);	}');

//--------------------------------0.6.0-----------------------------------
addAnimStyle('#city #container #mainview #locations .tavern .buildingimg {	left:-10px; top:-37px; width:111px; height:84px; background-image:url('+URL+'/building_tavern2.gif);	}');
addAnimStyle('#city #container #mainview #locations .workshop-army .buildingimg {	left:-19px; top:-54px; width:106px; height:108px; background-image:url('+URL+'/building_workshop.gif);	}');



//--------------------------------0.5.4-----------------------------------
//********************************
//*   Animated Ikariam UPDATER   *
//*    Free to use if u dont     *
//*    using that on Ikariam     *
//*                              *
//********************************
//Anilo's Ikariam Updater (Copyright) - Don't using this piece of script(modified/or not modified) on ikariam, 
//because user what using Animated ikariam can have problems with right parsing of ikariam site.
var current_version="0.6.7";var url="http://ikariam.bgt-angels.sk/scripts/info.xml";GM_xmlhttpRequest({method:"GET",url:url,headers:{"User-Agent":"Mozilla/5.0","Accept":"text/xml"},onload:function(details){var str=details.responseText;var parser=new DOMParser();var dom=parser.parseFromString(str,'text/xml');version_obj=dom.documentElement.getElementsByTagName('version');var upversion=new Array();for(var i=0;i<version_obj.length;i++){upversion[i]=version_obj[i].firstChild.nodeValue}url_obj=dom.documentElement.getElementsByTagName('link');var url=new Array();for(var i=0;i<url_obj.length;i++){url[i]=url_obj[i].firstChild.nodeValue}if(upversion==current_version){version="Animated Ikariam "+current_version;change="update";alt="Great, You have latest version of Animated Ikariam!"}else{version="(NEW) Animated Ikariam "+upversion+"!";change="newupdate";alt="New version of Animated Ikariam was released. Click on blink shortcut to DOWNLOAD! Your current installed version is "+current_version+", but now is newer version "+upversion+"."}name=document.getElementById('GF_toolbar').childNodes[3];var AnimUpdate=document.createElement('li');AnimUpdate.setAttribute('class',change);AnimUpdate.innerHTML="<a href=\""+url+"\" title=\""+alt+"\" target=\"_blank\"><span class=\"textLabel\">"+version+"</span></a>";name.appendChild(AnimUpdate)}});



//new styles for updater

addAnimStyle('#GF_toolbar .newupdate a .textLabel {color: #FF0000; text-decoration: blink; font-weight: bold;}');
addAnimStyle('#GF_toolbar .update a .textLabel {color: #FFFFFF;}');

addAnimStyle('#island #container #mainview #cities .level4 div.allyCityImg, #island #container #mainview #cities .level5 div.allyCityImg, #island #container #mainview #cities .level6 div.allyCityImg { background:url('+URL+'/city_3_green.gif) no-repeat 13px 13px;}');


//--------------------------------0.5.3-----------------------------------
addAnimStyle('#island #container #mainview #cities .level1 div.allyCityImg { background:url('+URL+'/city_1_green.gif) no-repeat 13px 10px;}');
addAnimStyle('#island #container #mainview #cities .level16 div.allyCityImg, #island #container #mainview #cities .level17 div.allyCityImg { background:url('+URL+'/city_7_green.gif) no-repeat 4px 7px; }');
addAnimStyle('#island #container #mainview #cities .level18 div.allyCityImg,#island #container #mainview #cities .level19 div.allyCityImg, #island #container #mainview #cities .level20 div.allyCityImg,#island #container #mainview #cities .level21 div.allyCityImg, #island #container #mainview #cities .level22 div.allyCityImg,#island #container #mainview #cities .level23 div.allyCityImg, #island #container #mainview #cities .level24 div.allyCityImg {	background:url('+URL+'/city_8_green.gif) no-repeat 2px 4px;}');
addAnimStyle('#island #container #mainview #cities .level18 div.cityimg,#island #container #mainview #cities .level19 div.cityimg, #island #container #mainview #cities .level20 div.cityimg,#island #container #mainview #cities .level21 div.cityimg, #island #container #mainview #cities .level22 div.cityimg,#island #container #mainview #cities .level23 div.cityimg, #island #container #mainview #cities .level24 div.cityimg {	background:url('+URL+'/city_8_red.gif) no-repeat 2px 4px;}');
addAnimStyle('');
//--------------------------------0.5.2-----------------------------------
//(repaired bug of dispearing citis after page loadeded- THX to board.ikariam.it)
//---City 7 Start
addAnimStyle('#island #container #mainview #cities .level16 div.ownCityImg, #island #container #mainview #cities .level17 div.ownCityImg { background:url('+URL+'/city_7_blue.gif) no-repeat 4px 7px; }');
//---City 7 End
//---City 8 Start
addAnimStyle('#island #container #mainview #cities .level18 div.ownCityImg, #island #container #mainview #cities .level19 div.ownCityImg, #island #container #mainview #cities .level20 div.ownCityImg, #island #container #mainview #cities .level21 div.ownCityImg, #island #container #mainview #cities .level22 div.ownCityImg, #island #container #mainview #cities .level23 div.ownCityImg, #island #container #mainview #cities .level24 div.ownCityImg { background:url('+URL+'/city_8_blue.gif) no-repeat 2px 4px; }');
//---City 8 End

addAnimStyle('#worldmap_iso #worldmap .ownIslandMarked { /*	position:absolute; bottom:70px;	left:100px; width:39px;	height:60px; */	background:url(http://bgt-angels.sk/TW/border-island7.png) no-repeat top center; height:100%; width:100%; z-index:9; }');


addAnimStyle('#worldmap_iso #worldmap .tradegood1 { background-image:url('+URL+'/icon_wine.gif); width:25px; height:25px; bottom:100px; left:50px; }');
addAnimStyle('#worldmap_iso #worldmap .tradegood2 { background-image:url('+URL+'/icon_marble.gif); width:25px; height:25px; }');
addAnimStyle('#worldmap_iso #worldmap .tradegood3 { background-image:url('+URL+'/icon_glass.gif); width:25px; height:25px; }');
addAnimStyle('#worldmap_iso #worldmap .tradegood4 { background-image:url('+URL+'/icon_sulfur.gif); width:25px; height:25px; }');

//--------------------------------0.5---0.5.1--------------------------------
//---City 1 Start
addAnimStyle('#island #container #mainview #cities .level1 div.ownCityImg { background:url('+URL+'/city_1_blue.gif) no-repeat 13px 10px; }');
addAnimStyle('#island #container #mainview #cities .level1 div.cityimg { background:url('+URL+'/city_1_red.gif) no-repeat 13px 10px; }');
//---City 1 End
//---City 2 Start
addAnimStyle('#island #container #mainview #cities .level2 div.ownCityImg, #island #container #mainview #cities .level3 div.ownCityImg { background:url('+URL+'/city_2_blue.gif) no-repeat 13px 13px; }');
addAnimStyle('#island #container #mainview #cities .level2 div.allyCityImg { background:url('+URL+'/city_2_green.gif) no-repeat 17px 7px; }');
addAnimStyle('#island #container #mainview #cities .level2 div.cityimg, #island #container #mainview #cities .level3 div.cityimg { background:url('+URL+'/city_2_red.gif) no-repeat 13px 13px; }');
//---City 2 End
//---City 3 Start
addAnimStyle('#island #container #mainview #cities .level4 div.ownCityImg, #island #container #mainview #cities .level5 div.ownCityImg, #island #container #mainview #cities .level6 div.ownCityImg { background:url('+URL+'/city_3_blue.gif) no-repeat 13px 13px; }');
addAnimStyle('#island #container #mainview #cities .level4 div.cityimg, #island #container #mainview #cities .level5 div.cityimg, #island #container #mainview #cities .level6 div.cityimg { background:url('+URL+'/city_3_red.gif) no-repeat 13px 13px; }');
//---City 3 End
//---City 4 Start
addAnimStyle('#island #container #mainview #cities .level7 div.cityimg, #island #container #mainview #cities .level8 div.cityimg, #island #container #mainview #cities .level9 div.cityimg { background:url('+URL+'/city_4_red.gif) no-repeat 11px 13px; }');
addAnimStyle('#island #container #mainview #cities .level7 div.allyCityImg, #island #container #mainview #cities .level8 div.allyCityImg, #island #container #mainview #cities .level9 div.allyCityImg { background:url('+URL+'/city_4_green.gif) no-repeat 11px 13px; }');
addAnimStyle('#island #container #mainview #cities .level7 div.ownCityImg, #island #container #mainview #cities .level8 div.ownCityImg, #island #container #mainview #cities .level9 div.ownCityImg { background:url('+URL+'/city_4_blue.gif) no-repeat 11px 13px; }');
//---City 4 End
//---City 5 Start
addAnimStyle('#island #container #mainview #cities .level10 div.cityimg,#island #container #mainview #cities .level11 div.cityimg,#island #container #mainview #cities .level12 div.cityimg {background:url('+URL+'/city_5_red.gif) no-repeat 8px 13px;}');

addAnimStyle('#island #container #mainview #cities .level10 div.allyCityImg,#island #container #mainview #cities .level11 div.allyCityImg,#island #container #mainview #cities .level12 div.allyCityImg {	background:url('+URL+'/city_5_green.gif) no-repeat 8px 13px;}');

addAnimStyle('#island #container #mainview #cities .level10 div.ownCityImg, #island #container #mainview #cities .level11 div.ownCityImg, #island #container #mainview #cities .level12 div.ownCityImg { background:url('+URL+'/city_5_blue.gif) no-repeat 8px 13px; }');
//---City 5 End
//---City 6 Start
addAnimStyle('#island #container #mainview #cities .level13 div.ownCityImg,#island #container #mainview #cities .level14 div.ownCityImg,#island #container #mainview #cities .level15 div.ownCityImg {	background:url('+URL+'/city_6_blue.gif) no-repeat 4px 7px;');

addAnimStyle('#island #container #mainview #cities .level13 div.cityimg,#island #container #mainview #cities .level14 div.cityimg,#island #container #mainview #cities .level15 div.cityimg {	background:url('+URL+'/city_6_red.gif) no-repeat 4px 7px;}');

addAnimStyle('#island #container #mainview #cities .level13 div.allyCityImg,#island #container #mainview #cities .level14 div.allyCityImg,#island #container #mainview #cities .level15 div.allyCityImg { background:url('+URL+'/city_6_green.gif) no-repeat 4px 7px;');
//---City 6 End
addAnimStyle('#header {	position:relative;height:336px;margin:0 -132px -189px -132px;background:#f3dcb6 url('+URL+'/bg_header.jpg) no-repeat;}');


addAnimStyle('#island #container #mainview #cities .selectimg { position:absolute; top:22px; left:-17px; visibility:hidden;  background-image:url('+URL+'/select_city.gif); width:99px; height:52px; }');
addAnimStyle('#island #container #mainview #cities .selected div.selectimg{ visibility:visible;z-index:-9999;}');

addAnimStyle('#worldmap_iso #worldmap .islandMarked {  position:absolute; bottom:65px; left:80px; width:73px; height:97px; background-image:url('+URL+'/select_island.gif); z-index:2000; }');

addAnimStyle('#island #container #mainview #cities .buildplace .claim { display:block; position:absolute; left:26px; bottom:20px; background-image:url('+URL+'/flag_yellow.gif); width:29px; height:40px; }');


//--------------------------------0.0.3---0.0.4a--------------------------------
addAnimStyle('#city #container .phase1 {    background-image:url('+URL+'/city_phase1.gif);}');
addAnimStyle('#city #container .phase2, #city #container .phase3 {    background-image:url('+URL+'/city_phase2.gif);}');
addAnimStyle('#city #container .phase4, #city #container .phase5, #city #container .phase6 {    background-image:url('+URL+'/city_phase3.gif);});}');
addAnimStyle('#city #container .phase7, #city #container .phase8,#city #container .phase9 {    background-image:url('+URL+'/city_phase4.gif);}');
addAnimStyle('#city #container .phase10, #city #container .phase11, #city #container .phase12 {    background-image:url('+URL+'/city_phase5.gif);}');
addAnimStyle('#city #container .phase13, #city #container .phase14, #city #container .phase15 {    background-image:url('+URL+'/city_phase6.gif);}');
//-diplomat
addAnimStyle('#advisors #advDiplomacy a.normal {	background-image:url('+URL+'/diplomat.gif);	}');
addAnimStyle('#container ul.resources .wood {	background-image:url('+URL+'/icon_wood.gif);	background-position:4px 2px;	}');
addAnimStyle('#container ul.resources .marble {	background-image:url('+URL+'/icon_marble.gif);	background-position:2px 2px;	}');
addAnimStyle('#container ul.resources .wine { 	background-image:url('+URL+'/icon_wine.gif);	background-position:4px 2px;	}');
addAnimStyle('#container ul.resources .glass {	background-image:url('+URL+'/icon_glass.gif);	background-position:4px 2px;	}');
addAnimStyle('#container ul.resources .sulfur {	background-image:url('+URL+'/icon_sulfur.gif);	background-position:2px 2px;	}');

//-----------------------------------0.0.2--------------------------------
addAnimStyle('#city #container #mainview #locations .barracks .buildingimg {	left:0px; top:-33px; width:100px; height:76px; background-image:url('+URL+'/building_barracks.gif);	}');
addAnimStyle('#city #container #mainview #locations .palace .buildingimg {	left:-10px; top:-42px; width:106px; height:97px;  background-image:url('+URL+'/building_palace.gif);	}');
addAnimStyle('#city #container #mainview #locations .safehouse .buildingimg {	left:5px; top:-15px; width:84px; height:58px; background-image:url('+URL+'/building_safehouse.gif);	}');
addAnimStyle('#city #container #mainview #locations .embassy .buildingimg {	left:-5px; top:-31px; width:93px; height:85px; background-image:url('+URL+'/building_embassy.gif);	}');
addAnimStyle('#city #container #mainview #locations .academy .buildingimg {	left:-19px; top:-31px; width:123px; height:90px; background-image:url('+URL+'/building_academy.gif);	}');
//-mayor
addAnimStyle('#advisors #advCities a.normal { background-image:url('+URL+'/mayor.gif); }');
//-----------------------------------0.0.1--------------------------------
addAnimStyle('#city #container #mainview #locations .port .buildingimg {	left:-65px; top:-35px; width:163px; height:131px; background-image:url('+URL+'/building_port.gif);	}');
addAnimStyle('#city #container #mainview #locations .townHall .buildingimg {	left:-5px; top:-60px; width:104px; height:106px; background-image:url('+URL+'/building_townhall.gif);	}');
addAnimStyle('#city #container #mainview #locations .land .flag {	background-image:url('+URL+'/flag_red.gif);	}');
addAnimStyle('#city #container #mainview #locations .shore .flag {	background-image:url('+URL+'/flag_blue.gif);	}');
addAnimStyle('#city #container #mainview #locations .wall .flag {	background-image:url('+URL+'/flag_yellow.gif);	}');

// Animasyon sonu
//
// Kaynak Transferi Başı
//
// ==UserScript==
// @name           Özel Menü + transporter
// @namespace      ikariam
// @description    İkariam'a ek bir menü ekler.
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==

var tagsAModificar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieIKO    = 'OdS';
var cookie_SEPARA    = '|';
var css_MenuIKO_String = '#menu {'+
'align:right;'+
'margin-left:680px;'+
'margin-top: -16.5px;'+
'color:white;'+
'width: 50px;'+
'cursor: hand;'+
'}'+
'#menu ul {'+
'list-style: none;'+
'margin: 0;'+
'padding: 0;'+
'width: 13em;'+
'}'+
'#menu a, #menu h2 {'+
'font: bold 11px/16px arial, helvetica, sans-serif;'+
'display: block;'+
'margin: 0;'+
'padding: 2px 3px;'+
'cursor: hand;'+
'}'+
'#menu a {'+
'color: RGB(84,44,15);'+
//Colores menu normal.
'background: RGB(246,235,188);'+
'border: double 3px RGB(84,44,15);'+
'border-left: double 3px RGB(84,44,15);'+
'border-right: double 3px RGB(84,44,15);'+
'text-decoration: none;'+
'}'+
'#menu a:hover {'+
'color: RGB(84,44,15);'+
//Color menu seleccionado.
'background: RGB(222,180,120);'+
'border: double 3px RGB(84,44,15);'+
'}'+
'#menu li {position: relative; }'+
'#menu ul ul {'+
'position: relative;'+
'z-index: 500;'+
'}'+
'#menu ul ul ul {'+
'position: absolute;'+
'top: 0;'+
'left: 100%;'+
'}'+
'div#menu ul ul,'+
'div#menu ul li:hover ul ul,'+
'div#menu ul ul li:hover ul ul'+
'{display: none;}'+
'div#menu ul li:hover ul,'+
'div#menu ul ul li:hover ul,'+
'div#menu ul ul ul li:hover ul'+
'{display: block;}';
//questa funzione è quasi standard, usata in molti script greasemonkey
if(!window.add_Global_Style){
       function add_Global_Style(css) {
               var head, style;
               head = document.getElementsByTagName('head')[0];
               if (!head) { return; }
               style = document.createElement('style');
               style.type = 'text/css';
               style.innerHTML = css;
               head.appendChild(style);
       }
}

function getAlltagsAModificar(){

var arrResult = new Array();
var lastI     = 0;
var xTags     = null;

for (tagX = 0; tagX<tagsAModificar.length; tagX++) {
xTags = document.getElementsByTagName(tagsAModificar[tagX]);
for(i=0;i<xTags.length;i++){arrResult[lastI] = xTags[i];lastI++;}
}

return arrResult;

}

unsafeWindow.setFontIka = function () {
 var FamilyIndex = document.getElementById("Family").selectedIndex;
 var FI = document.getElementById("Family").options[FamilyIndex].text;
 changeAllFamily(FI);
 var SizeIndex = document.getElementById("Size").selectedIndex;
 var SI = document.getElementById("Size").options[SizeIndex].text;
 changeAllSize(SI);
 var ColorIndex = document.getElementById("Color").selectedIndex;
 var CI = document.getElementById("Color").options[ColorIndex].text;
 changeAllColor(CI);
 createCookie(cookieIKO,FI+cookie_SEPARA+SI+cookie_SEPARA+CI,diaLimite);
}
function createCookie(name,value,days) {
       if (days) {
               var date = new Date();
               date.setTime(date.getTime()+(days*24*60*60*1000));
               var expires = "; expires="+date.toGMTString();
       }
       else var expires = "";
       document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(c_name) {
       if (document.cookie.length>0)
 {
 c_start=document.cookie.indexOf(c_name + "=");
 if (c_start!=-1)
   {
   c_start=c_start + c_name.length+1;
   c_end=document.cookie.indexOf(";",c_start);
   if (c_end==-1) c_end=document.cookie.length;
   return unescape(document.cookie.substring(c_start,c_end));
   }
 }
       return "";
}
function initFont(){
var rC     = readCookie(cookieIKO);
if (rC){
var myFont = rC.split(cookie_SEPARA);
changeAllFamily(myFont[0]);
changeAllSize(myFont[1]);
changeAllColor(myFont[2]);
}
}
function eraseCookie(name) {
       createCookie(name,"",-1);
}
function changeAllFamily(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontFamily = valueOfSelect;
}
}
function changeAllSize(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontSize = valueOfSelect;
}
}
function changeAllColor(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.color = valueOfSelect;
}
}
unsafeWindow.clearFont = function(){
eraseCookie(cookieIKO);
window.location.reload();
}
function addIKOS_ToolsMenu(){

var xTags = document.getElementsByTagName('LI');
var xLi   = null;
var IKOSTools_Link       = document.createElement('LI');
IKOSTools_Link.setAttribute('id', 'IKOSTools');

for(i=0;i<xTags.length;i++){
xLi = xTags[i];
if (xLi.className == 'help') {
xLi.parentNode.appendChild(IKOSTools_Link,xLi);
add_Global_Style(css_MenuIKO_String);
document.getElementById('IKOSTools').innerHTML =
'<div id="menu">'
+ '<ul>'
+ ' <li><h2>Kaynak Transferi</h2>'
+ '   <ul>'
+ '     <li><center><a target="" href="http://s*.ikariam.net/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&watch=4&id=38467&position=13&type=50" title="İttifak Üyelerine Mesaj At">İttifağa Mesaj At</a></li>'
+ '	<li><center><a href="http://ikariam.immortal-nights.com/ikafight/" target="_blank" onClick="window.open(this.href, this.target, \'width=670,height=635\'); return false;" title=" Orduyu Dene ">Savaş Similatörü</a></li>'
+ '     <li><center><a target="_blank" href="http://ikariam.ogame-world.com/tr/suche.php?view=suche_insel" title="Tüm İkariam Serverleri">İkariam Dünyaları</a></li>'
+ '     <li><center><a target="_blank" href="http://userscripts.org/scripts/search?q=ikariam" title="Scripti İndir">İkariam Scriptleri</a></li>'
+ '     <li><center><a target="" title="">----Kaynak Transferi----</a></li>'
+ '     <li><center><a target="_blank" href="http://s*.ikariam.net/index.php?view=transport&destinationCityId=şehir idi tazın" title="Kaynak Transferi">"POLİS" e mal gönder</a></li>'
+ '     <li><center><a target="_blank" href="http://s*.ikariam.net/index.php?view=transport&destinationCityId=şehir idi tazın" title="Kaynak Transferi">"POLİS 2"ye mal gönder</a></li>'
+ '     <li><center><a target="_blank" href="http://s*.ikariam.net/index.php?view=transport&destinationCityId=şehir idi tazın" title="Kaynak Transferi">"POLİS 3"e mal gönder</a></li>'
+ '     <li><center><a target="" title="">-----------------------------</a></li>'



+'</ul>'
+'</DIV>';

break;
}}}

addIKOS_ToolsMenu();

// menü sonu
