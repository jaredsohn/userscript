// coding: utf-8
// ==UserScript==
// @name           Alarm and Overview Table
// @namespace      iKariam
// @author         kChen
// @description    Ikariam Alarm and Overview Table for v.0.2.8, Traditional Chinese
// @version        v0.2.8.023
//                 Original script: http://userscripts.org/scripts/show/25124
//                 功能概述：
//                 1.自動更新IK網頁（每5-10分鐘）
//                 2.如果有新訊息或攻擊，將用聲音訊息警示玩家
//                 3.列表彙整出你所有城鎮的資訊
//                   包含人口、資源數量、建物等級、正在建造建築物、部隊...
//                 
//                 修改功能：
//                 2008.11.12 v0.2.8.023
//                   - 新增：在玩家和城市總覽裡，加入刪除、外交、掠奪、封鎖港口和派出間諜的按鈕
//                   - 修正：當資源總覽表或建築總覽表關掉時，顯示設定的按鈕會失消的問題
//                 2008.11.11 v0.2.8.022
//                   - 新增：俄文支援
//                           Russian translation by Гуляка
//                   - 修正：自動更新腳本的網址
//                 2008.11.10 v0.2.8.021
//                   - 新增：在玩家和城市總覽裡，將i羊、封鎖、假期的玩家用顏色區分出來
//                   - 新增：希伯來文支援
//                           Hebrew translation by MindTwister
//                   - 修正：軍事積分計算錯誤
//                 2008.11.10 v0.2.8.020
//                   - 新增：自動更新通知，當插件有新版時自動通知
//                   - 修正：當尚未研發出"財富"時，資源總覽表的特殊資源名稱只能是英文，無法自動隨Server語系而變更名稱語系
//                 2008.11.08 v0.2.8.018
//                   - 新增：在資源總覽表中的座標欄，可直接連至該島並且選擇該城 (此功能包含 "玩家和城市總覽" 裡的所有座標)
//                           click the link of coordinate in the resource table, the page will be redirected to the island and the town will be selected.
//                           (The link included the coordinate in the player and twon table)
//                   - 修正：自動更新網頁時，維持顯示選所擇的城鎮畫面 (先前自動更新網頁後，會變成顯示成世界地圖，此功能是為了支援某些插件而改)
//                           When refresh the page automatically, the page will stay in the selected town. (For supporting some scripts)
//                   - 修正：刪除多餘的座標顯示 (此功能是為了在遊戲的設置裡面，未將顯示城鎮詳情改成"奢侈資源"的玩家而修改，若已經設定過的玩家不影嚮)
//                           Deleted redundancy coordinates.
//                           (It's modified for the player who didn't set the display of the town detail by "Tradegoods". It doesn't affect the player who already set it.)
//                   - 修正：當城鎮座標是個位數或百位數時，資源總覽表無法更新資料 (此功能是為了在遊戲的設置裡面，未將顯示城鎮詳情改成"奢侈資源"的玩家而修改，若已經設定過的玩家不影嚮)
//                           (It's modified for the player who didn't set the display of the town detail by "Tradegoods". It doesn't affect the player who already set it.)
//                   - 修正：勾選加值畫面選項後，當被攻擊的時候，軍事指導者的警告圖示無法顯示
//                 2008.11.05 v0.2.8.017
//                   - 修正：特殊資源的全滿天數計算錯誤
//                           Caculation error of the full filled day of special resource
//                 2008.11.05 v0.2.8.016
//                   - 修正：在世界、排名、收支表等等畫面皆可顯示
//                           fix world, highscore, balances page display error
//                 2008.11.04 v0.2.8.015
//                   - 新增：在資源總覽表，新增葡萄酒存量天數 (可不需要 Kronos Utils 支援)
//                           show wine remaing time in resource table (without Kronos Utils)
//                   - 新增：在資源總覽表，新增各資源全滿天數、空閒人口數、行動點數
//                           show resource fullness of warehouse time, idle citizens, action points
//                   - 修正：點擊城鎮名稱，自動切換至所點擊的城鎮，並且顯示城鎮畫面
//                           click city name will change to the city and it
//                   - 修正：倉庫17級木材最大容量錯誤
//                           fix level 17 warehouse wood storage capacity error
//                 2008.11.02 v0.2.8.014
//                   - 新增：在建築總覽表，點擊升級快速鍵後，自動切換至所點擊的城鎮
//                           add building level up button, change the city when press button in building table
//                   - 新增：在資源總覽表，點擊伐木場和資源場後，自動切換至所點擊的城鎮
//                           change the city when press sawmill or resource in resource table
//                   - 新增：在城鎮指導者、軍事指導者、研究指導者和外交指導者，點擊其它城鎮連結，自動切換至所點擊的城鎮
//                           change the city when click city-link in four advisors
//                   - 修正：執行查看軍隊時，在觀看軍事畫面，軍隊資料無法更新。 (注意：目前在軍事畫面中，軍分無法計算)
//                   - 修正：當Kronos Utils執行時，使得軍隊名字過長
//                           fix unit's name too long bug, when Kronos Utils is runing
//                 2008.10.31 v0.2.8.013
//                   - 新增：加值畫面 (此為購買plus後的畫面)
//                           add PLUS display option
//                   - 修正：千位符號由 "." 改成 ","
//                           comma replace point in thousand display
//                 2008.10.29 v0.2.8.010
//                   - 新增：建築物總覽的升級按鈕
//                           add building level up button
//                 2008.10.28 v0.2.8.009
//                   - 修正：在書寫訊息畫面無法顯示
//                           fix display error in write message page
//                   - 新增：支援多國語言
//                           add multi-language support
//                 2008.10.28 v0.2.8.008
//                   - 修正：博物館顯示異常
//                           fix Museum display error
//                 2008.10.27 v0.2.8.007
//                   - 修正：在城鎮指導者、軍事指導者、研究指導者、外交指導者等畫面無法顯示
//                           fix advisors display error
//                 2008.10.27 v0.2.8.006
//                   - 修正：等待裝載船隻無法顯示
//                           fix cargo ship display error when loading
//                 2008.10.27 v0.2.8.004
//                   - 修正：部署軍隊與部署艦隊無法顯示
//                           fix units display bug in deploy troops and deploy fleets
//                 2008.10.26 v0.2.8.003
//                   - 新增：建築物總覽的快速連結，可直接點進建築物畫面
//                           add building link in building table
//                   - 新增：學院總覽
//                           add research table
//                   - 新增：港口總覽，包含來訪的運輸船，裝載運輸船
//                           add transporters table to display trading cargo shit and loading cargo shit
//                   - 新增：在運輸畫面的記錄常用目的地之儲存按鈕
//                           add destination button in trade page
//                   - 新增：在港口畫面顯示所記錄常用目的地
//                           add destination-link in trading port page
//                   - 修正：玩家總覽表格顯示異常
//                           fix players table display error
//                 2008.10.24 v0.2.8.002
//                   - 修正：伐木場與資源場無法正常顯示
//                           fix sawmill and resources display bug
//                 2008.10.23 v0.2.8.001
//                   - 修正：將文字翻譯成繁體中文
//                           support Traditional Chinese (TW)
//                   - 修正：設定介面美化
//                           beautify the setting interface
//                   - 修正：倉庫前六級最大值顯示錯誤
//                           fix warehouse storage capacity error
//                   - 修正：座標個位數時，資料無法正常讀取
//                           fix bug when coordinate is less than ten
//                   - 修正：學院畫面無法正常顯示
//                           fix Academy display bug
// @include        http://*.ikariam.*/index.php*
// @exclude        http://board.ikariam.*/
// ==/UserScript==

var _startTime = new Date().getTime();
var scriptname = "kChen Overview";
var scriptversion= "v0.2.8.023";
var scriptinstall = "http://userscripts.org/scripts/source/35879.user.js";
var scriptsource = "http://userscripts.org/scripts/review/35879?format=txt";
var scriptsite   = "http://userscripts.org/scripts/show/35879";

var default_style = <><![CDATA[
#overview__table .resources_table, #overview__table .buildings_table, #overview__table .army_table, #overview__table .players_table, #overview__table .transporters_table, #overview__table .research_table {
  text-align: center;
  border-style: dotted;
  width: 980px;
}
.time_counter {
  font-weight: bold;
  color: #C00000;
}
.lf {
  border-right: double;
  border-color: #542C0F;
}
.current_city_highlight {
  background-color: #CDA55F;
}
#overview__table table td {
  padding: 0px;
  white-space: nowrap;
}
#overview__table .upgrading {
  background-color: #B4DC8C;
}
#overview__table tr.table_header {
  border-bottom: double;
  font-weight: bold;
  padding: 0px;
  background-color: #E6C88C;
  color: #542C0F;
}
#overview__table th.table_header {
  text-align: center;
  font-weight: bold;
  padding: 0px;
//  color: #542C0F;
//  background-color: #E6C88C;
}
#overview__table tr.table_footer {
  border-top: double;
}
#overview__table td.table_footer { /*also for army table's last column*/
  font-weight: bold;
}
#overview__table .vacation {
  background-color: #B4DC8C;
}
#overview__table .banned {
  background-color: #F09090;
}
#overview__table .inactivity {
  background-color: #C0C0C0; 
}
.arrivinggoods {
  font-weight: bold;
  color: #C00000;
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
  height: 4px;
  width: 100%;
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
#overview__table table th.current_building {
  background-color: #E6C88C;
  color: #424994;
}
th.current_building {
  background-color: #E6C88C;
  color: #424994;
}
td.current_building {
}
]]></>.toXMLString();

var server = /\/\/([a-z._0-9]+)\//.exec(document.URL);
server = RegExp.$1;

var config;
var players;
var language;
var buildings;
var texts;

function getConfig() {
	config = unserialize(getVar("config", ""));
	if (config == null || config == undefined || config == "" || ("".config == "NaN")) {
		config = new Object();
	}
	if (config.cfg == undefined) {
		config.cfg = new Object();
	}
}
function saveConfig() {
	setVar("config", serialize(config));
}
function getPlayers() {
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
}
function savePlayers() {
	setVar("players", uneval(players));
}
function CheckupDate(text){
	if (/scriptversion.*=.*\"([v0-9.]+)\"/.exec(text) == null) return;
	var newversion = RegExp.$1;
	var newver = newversion.split("\.");
	var oldver = scriptversion.split("\.");
	var update = (newver.length != oldver.length) ? true : false;
	if (!update) {
		for(var i=0; i<newver.length-1; i++)
			if (newver[i]!=oldver[i]) { update = true;  break; }
	}
	var inewver = parseInt(newver[newver.length-1],10);
	var ioldver = parseInt(oldver[oldver.length-1],10);
	if (ioldver < inewver) update = true;
	if (update) {
		if (confirm(texts["NewVersion"].replace(/%s/,newversion))) {
			location.href = scriptinstall;
		}
	}
}
function VersionUpdate(){
	var lastSearch = getCfgValue("LAST_UPDATE", 0);
	var searchFreq = 8 * 3600 * 1000; //
	if(_startTime - lastSearch > searchFreq) {
		setCfgValue("LAST_UPDATE", _startTime);
		get(scriptsource, CheckupDate);
	}
}
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
function setCfgValue(key, value) {
	config.cfg[key] = value;
	setVar("config", serialize(config));
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
var TimeUnits = { day: 86400, hour: 3600, minute: 60, second: 1 };
var tavernWineUsage = [0, 3, 5, 8, 11, 14, 17, 21, 25, 29, 33, 38, 42, 47, 52, 57, 63, 68, 73, 79, 85, 91, 97, 103, 109];
var townHallSpaces = [0, 60, 96, 143, 200, 263, 333, 410, 492, 580, 672, 769, 871, 977, 1087, 1201, 1320, 1441, 1567, 1696, 1828, 1964, 2103, 2246, 2391, 2540, 2691, 2845, 3003, 3163, 3326, 3492, 3660];
var academyCapacities = [0, 8, 12, 16, 22, 28, 35, 43, 51, 60, 69, 79, 89, 100, 111, 122, 134, 146, 159, 172, 185, 198, 212, 227, 241];
var warehouseWoodCapacities = [0, 1160, 2200, 3576, 5336, 7424, 9975, 12799, 16152, 19944, 24200, 28791, 34040, 43520, 54439, 66528, 80024, 320096, 640192, 1280384, 2560768, 5121536, 10243072, 20486144, 40972288, 81944576, 163889152, 327778304, 655556608, 1311113216, 2622226432, 5244452864, 10488905728];
var warehouseOtherCapacities = [0, 420, 500, 1152, 2052, 2248, 3507, 3780, 5332, 7179, 9347, 11784, 14499, 20028, 23548, 27484, 34932, 139728, 279456, 558912, 1117824, 2235648, 4471296, 8942592, 17885184, 35770368, 71540736, 143081472, 286162944, 572325888, 1144651776, 2289303552, 4579607104];
var unitScoreBasePoints = {"wood": 2, "wine": 16, "glass": 4, "sulfur": 4};
var costs = {
	"townHall"      : [{}, {w:70, t:"34m 48s"}, {w:98, t:"56m 24s"}, {w:65, M:17, t:"1h 24m"}, {w:129, M:28, t:"1h 58m"}, {w:236, M:66, t:"2h 40m"}, {w:402, M:95, t:"3h 29m"}, {w:594, M:156, t:"4h 25m"}, {w:849, M:243, t:"5h 30m"}, {w:1176, M:406, t:"6h 43m"}, {w:1586, M:579, t:"8h 5m"}, {w:2101, M:799, t:"9h 35m"}, {w:3280, M:1348, t:"11h 15m"}, {w:4937, M:2124, t:"13h 3m"}, {w:7171, M:2951, t:"15h 1m"}, {w:10139, M:4409, t:"17h 9m"}, {w:14537, M:6461, t:"20h 11m"}, {w:18420, M:8187, t:"22h 44m"}, {w:22896, M:10176, t:"1D 1h"}, {w:28047, M:12466, t:"1D 4h"}, {w:33934, M:15082, t:"1D 7h"}, {w:40623, M:18055, t:"1D 10h"}, {w:48107, M:21381, t:"1D 14h"}, {w:56511, M:25116, t:"1D 17h"}, {w:226044, M:100464, t:"6D 23h"}, {w:452088, M:200928, t:"13D 22h"}, {w:904176, M:401856, t:"27D 21h"}, {w:1808352, M:803712, t:"55D 19h"}, {w:3616704, M:1607424, t:"111D 15h"}, {w:7233408, M:3214848, t:"223D 6h"}, {w:14466816, M:6429696, t:"446D 12h"}, {w:28933632, M:12859392, t:"893D 19m"}],
	"academy"       : [{w:36, t:"14m 24s"}, {w:58, t:"28m 48s"}, {w:84, t:"48m"}, {w:79, C:30, t:"1h 19m"}, {w:159, C:73, t:"1h 57m"}, {w:302, C:210, t:"2h 48m"}, {w:535, C:285, t:"3h 52m"}, {w:889, C:467, t:"5h 6m"}, {w:1423, C:712, t:"6h 36m"}, {w:2174, C:999, t:"8h 16m"}, {w:3221, C:1307, t:"10h 16m"}, {w:4639, C:1960, t:"12h 27m"}, {w:7155, C:3267, t:"15h"}, {w:10630, C:4573, t:"17h 45m"}, {w:15224, C:6264, t:"20h 44m"}, {w:20358, C:8853, t:"1D 7m"}, {w:81432, C:35412, t:"4D 28m"}, {w:162864, C:70824, t:"8D 57m"}, {w:325728, C:141648, t:"16D 1h"}, {w:651456, C:283296, t:"32D 3h"}, {w:1302912, C:566592, t:"64D 7h"}, {w:2605824, C:1133184, t:"128D 15h"}, {w:5211648, C:2266368, t:"257D 6h"}, {w:10423296, C:4532736, t:"514D 13h"}],
	"port"          : [{w:18, t:"10m 48s"}, {w:31, t:"24m 29s"}, {w:44, t:"50m 24s"}, {w:87, M:33, t:"1h 26m"}, {w:156, M:48, t:"2h 18m"}, {w:266, M:93, t:"2h 58m"}, {w:425, M:126, t:"3h 41m"}, {w:653, M:215, t:"4h 52m"}, {w:963, M:344, t:"5h 37m"}, {w:1381, M:529, t:"7h 6m"}, {w:1915, M:777, t:"7h 48m"}, {w:2604, M:1100, t:"9h 30m"}, {w:3790, M:1731, t:"10h 36s"}, {w:5349, M:2301, t:"11h 53m"}, {w:7333, M:3017, t:"11h 59m"}, {w:9808, M:4265, t:"13h 56m"}, {w:39232, M:17060, t:"2D 7h"}, {w:78464, M:34120, t:"4D 15h"}, {w:156928, M:68240, t:"9D 7h"}, {w:313856, M:136480, t:"18D 14h"}, {w:627712, M:272960, t:"37D 4h"}, {w:1255424, M:545920, t:"74D 8h"}, {w:2510848, M:1091840, t:"148D 17h"}, {w:5021696, M:2183680, t:"297D 11h"}],
	"shipyard"      : [{w:38, t:"22m 41s"}, {w:67, t:"52m 49s"}, {w:96, t:"1h 50m"}, {w:152, M:57, t:"2h 31m"}, {w:272, M:83, t:"4h 1m"}, {w:388, M:135, t:"4h 20m"}, {w:609, M:180, t:"5h 17m"}, {w:810, M:266, t:"6h 2m"}, {w:1091, M:390, t:"6h 22m"}, {w:1551, M:594, t:"7h 58m"}, {w:1921, M:780, t:"7h 50m"}, {w:2600, M:1098, t:"9h 29m"}, {w:3530, M:1612, t:"9h 19m"}, {w:4555, M:1960, t:"10h 7m"}, {w:6228, M:2563, t:"10h 10m"}, {w:7702, M:3349, t:"10h 57m"}, {w:30808, M:13396, t:"1D 19h"}, {w:61616, M:26792, t:"3D 15h"}, {w:123232, M:53584, t:"7D 7h"}, {w:246464, M:107168, t:"14D 14h"}, {w:492928, M:214336, t:"29D 4h"}, {w:985856, M:428672, t:"58D 9h"}, {w:1971712, M:857344, t:"116D 19h"}, {w:3943424, M:1714688, t:"233D 14h"}, {w:7886848, M:3429376, t:"467D 4h"}, {w:15773696, M:6858752, t:"934D 9h"}, {w:31547392, M:13717504, t:"1868D 19h"}, {w:63094784, M:27435008, t:"3737D 14h"}, {w:126189568, M:54870016, t:"7475D 4h"}, {w:252379136, M:109740032, t:"14950D 9h"}, {w:504758272, M:219480064, t:"29900D 19h"}, {w:1009516544, M:438960128, t:"59801D 14h"}],
	"warehouse"     : [{w:42, t:"27m 36s"}, {w:91, t:"1h 7m"}, {w:79, M:13, t:"1h 40m"}, {w:145, M:43, t:"2h 25m"}, {w:255, M:62, t:"3h 8m"}, {w:396, M:110, t:"4h 2m"}, {w:565, M:134, t:"4h 54m"}, {w:799, M:237, t:"5h 57m"}, {w:1203, M:387, t:"7h 6m"}, {w:1619, M:558, t:"8h 24m"}, {w:2135, M:780, t:"9h 54m"}, {w:2761, M:1167, t:"11h 27m"}, {w:4198, M:1917, t:"13h 12m"}, {w:5746, M:2472, t:"15h 12m"}, {w:7655, M:3150, t:"17h 22m"}, {w:10032, M:5235, t:"19h 48m"}, {w:40128, M:20940, t:"3D 7h"}, {w:80256, M:41880, t:"6D 14h"}, {w:160512, M:83760, t:"13D 4h"}, {w:321024, M:167520, t:"26D 9h"}, {w:642048, M:335040, t:"52D 19h"}, {w:1284096, M:670080, t:"105D 15h"}, {w:2568192, M:1340160, t:"211D 7h"}, {w:5136384, M:2680320, t:"422D 14h"}, {w:10272768, M:5360640, t:"845D 5h"}, {w:20545536, M:10721280, t:"1690D 10h"}, {w:41091072, M:21442560, t:"3380D 21h"}, {w:82182144, M:42885120, t:"6761D 19h"}, {w:164364288, M:85770240, t:"13523D 15h"}, {w:328728576, M:171540480, t:"27047D 6h"}, {w:657457152, M:343080960, t:"54094D 12h"}, {w:1314914304, M:686161920, t:"108189D 19m"}],
	"wall"          : [{w:72, t:"1h 12m"}, {w:74, M:13, t:"1h 50m"}, {w:100, M:32, t:"2h 29m"}, {w:155, M:58, t:"3h 16m"}, {w:227, M:69, t:"4h 12m"}, {w:324, M:113, t:"4h 37m"}, {w:442, M:131, t:"4h 59m"}, {w:593, M:195, t:"5h 18m"}, {w:777, M:278, t:"5h 32m"}, {w:998, M:382, t:"5h 42m"}, {w:1255, M:509, t:"6h 24m"}, {w:1564, M:661, t:"7h 8m"}, {w:2159, M:950, t:"8h 55m"}, {w:2317, M:1058, t:"8h 44m"}, {w:2784, M:1301, t:"9h 7m"}, {w:3308, M:1423, t:"9h 27m"}, {w:3902, M:1728, t:"9h 43m"}, {w:4559, M:1876, t:"9h 56m"}, {w:5296, M:2245, t:"10h 4m"}, {w:6119, M:2661, t:"10h 9m"}, {w:7020, M:3120, t:"10h 8m"}, {w:7533, M:3348, t:"10h 2m"}, {w:8065, M:3584, t:"9h 51m"}, {w:8613, M:3828, t:"9h 34m"}, {w:34452, M:15312, t:"1D 14h"}, {w:68904, M:30624, t:"3D 4h"}, {w:137808, M:61248, t:"6D 9h"}, {w:275616, M:122496, t:"12D 18h"}, {w:551232, M:244992, t:"25D 12h"}, {w:1102464, M:489984, t:"51D 57m"}, {w:2204928, M:979968, t:"102D 1h"}, {w:4409856, M:1959936, t:"204D 3h"}, {w:8819712, M:3919872, t:"408D 7h"}, {w:17639424, M:7839744, t:"816D 15h"}, {w:35278848, M:15679488, t:"1633D 6h"}, {w:70557696, M:31358976, t:"3266D 13h"}, {w:141115392, M:62717952, t:"6533D 2h"}, {w:282230784, M:125435904, t:"13066D 5h"}, {w:564461568, M:250871808, t:"26132D 11h"}, {w:1128923136, M:501743616, t:"52264D 23h"}, {w:2257846272, M:1003487232, t:"104529D 22h"}, {w:4515692544, M:2006974464, t:"209059D 20h"}, {w:9031385088, M:4013948928, t:"418119D 16h"}, {w:18062770176, M:8027897856, t:"836239D 8h"}, {w:36125540352, M:16055795712, t:"1672478D 17h"}, {w:72251080704, M:32111591424, t:"3344957D 10h"}, {w:144502161408, M:64223182848, t:"6689914D 21h"}, {w:289004322816, M:128446365696, t:"13379829D 18h"}, {w:578008645632, M:256892731392, t:"26759659D 12h"}, {w:1156017291264, M:513785462784, t:"53519319D 57m"}, {w:2312034582528, M:1027570925568, t:"107038638D 1h"}, {w:4624069165056, M:2055141851136, t:"214077276D 3h"}, {w:9248138330112, M:4110283702272, t:"428154552D 7h"}, {w:18496276660224, M:8220567404544, t:"856309104D 15h"}, {w:36992553320448, M:16441134809088, t:"1712618209D 6h"}, {w:73985106640896, M:32882269618176, t:"3425236418D 13h"}],
	"tavern"        : [{w:25, t:"13m 20s"}, {w:112, M:12, t:"55m 12s"}, {w:196, M:46, t:"1h 49m"}, {w:297, M:88, t:"3h 5m"}, {w:494, M:162, t:"4h 2m"}, {w:766, M:274, t:"4h 58m"}, {w:1127, M:432, t:"5h 47m"}, {w:1588, M:644, t:"7h 17m"}, {w:2177, M:920, t:"7h 57m"}, {w:2895, M:1274, t:"9h 34m"}, {w:3756, M:1715, t:"9h 55m"}, {w:4803, M:2244, t:"11h 35m"}, {w:6030, M:2594, t:"11h 29m"}, {w:7468, M:3307, t:"13h 8m"}, {w:9117, M:3751, t:"12h 25m"}, {w:11804, M:5133, t:"13h 59m"}, {w:47216, M:20532, t:"2D 7h"}, {w:94432, M:41064, t:"4D 15h"}, {w:188864, M:82128, t:"9D 7h"}, {w:377728, M:164256, t:"18D 15h"}, {w:755456, M:328512, t:"37D 7h"}, {w:1510912, M:657024, t:"74D 14h"}, {w:3021824, M:1314048, t:"149D 4h"}, {w:6043648, M:2628096, t:"298D 8h"}],
	"museum"        : [{w:282, M:84, t:"1h 28m"}, {w:760, M:272, t:"2h 57m"}, {w:1616, M:656, t:"4h 56m"}, {w:2996, M:1319, t:"7h 25m"}, {w:5035, M:2353, t:"8h 40m"}, {w:7901, M:3499, t:"11h 35m"}, {w:11746, M:4979, t:"14h 54m"}, {w:16776, M:7456, t:"18h 38m"}, {w:67104, M:29824, t:"3D 2h"}, {w:134208, M:59648, t:"6D 5h"}, {w:268416, M:119296, t:"12D 10h"}, {w:536832, M:238592, t:"24D 20h"}, {w:1073664, M:477184, t:"49D 16h"}, {w:2147328, M:954368, t:"99D 9h"}, {w:4294656, M:1908736, t:"198D 19h"}, {w:8589312, M:3817472, t:"397D 15h"}, {w:17178624, M:7634944, t:"795D 7h"}, {w:34357248, M:15269888, t:"1590D 14h"}, {w:68714496, M:30539776, t:"3181D 5h"}, {w:137428992, M:61079552, t:"6362D 10h"}, {w:274857984, M:122159104, t:"12724D 21h"}, {w:549715968, M:244318208, t:"25449D 19h"}, {w:1099431936, M:488636416, t:"50899D 15h"}, {w:2198863872, M:977272832, t:"101799D 6h"}],
	"palace"        : [{w:648, t:"4h"}, {w:5600, M:536, t:"8h"}, {w:20880, M:7317, C:4878, t:"9h"}, {w:57600, W:12800, M:32000, C:25600, t:"8h"}, {w:230400, W:102400, M:153600, C:102400, t:"8h"}, {w:460800, W:204800, M:307200, C:204800, t:"8h"}, {w:921600, W:409600, M:614400, C:409600, t:"8h"}, {w:1843200, W:819200, M:1228800, C:819200, t:"8h"}, {w:3686400, W:1638400, M:2457600, C:1638400, t:"8h"}, {w:7372800, W:3276800, M:4915200, C:3276800, t:"8h"}, {w:14745600, W:6553600, M:9830400, C:6553600, t:"8h"}, {w:29491200, W:13107200, M:19660800, C:13107200, t:"8h"}],
	"palaceColony"  : [{w:648, t:"4h"}, {w:5600, M:536, t:"8h"}, {w:20880, M:7317, C:4878, t:"9h"}, {w:57600, W:12800, M:32000, C:25600, t:"8h"}, {w:230400, W:102400, M:153600, C:102400, t:"8h"}, {w:460800, W:204800, M:307200, C:204800, t:"8h"}, {w:921600, W:409600, M:614400, C:409600, t:"8h"}, {w:1843200, W:819200, M:1228800, C:819200, t:"8h"}, {w:3686400, W:1638400, M:2457600, C:1638400, t:"8h"}, {w:7372800, W:3276800, M:4915200, C:3276800, t:"8h"}, {w:14745600, W:6553600, M:9830400, C:6553600, t:"8h"}, {w:29491200, W:13107200, M:19660800, C:13107200, t:"8h"}],
	"embassy"       : [{w:46, M:14, t:"50m 25s"}, {w:120, M:42, t:"1h 42m"}, {w:212, M:63, t:"2h 23m"}, {w:334, M:110, t:"2h 59m"}, {w:489, M:175, t:"3h 29m"}, {w:681, M:261, t:"3h 53m"}, {w:1001, M:406, t:"4h 38m"}, {w:1428, M:603, t:"5h 25m"}, {w:1967, M:866, t:"6h 15m"}, {w:2635, M:1203, t:"7h 6m"}, {w:3472, M:1622, t:"7h 58m"}, {w:4481, M:1928, t:"8h 53m"}, {w:5693, M:2521, t:"9h 49m"}, {w:7122, M:2931, t:"10h 46m"}, {w:8804, M:3732, t:"11h 45m"}, {w:10770, M:4683, t:"12h 45m"}, {w:43080, M:18732, t:"2D 3h"}, {w:86160, M:37464, t:"4D 6h"}, {w:172320, M:74928, t:"8D 12h"}, {w:344640, M:149856, t:"17D 19m"}, {w:689280, M:299712, t:"34D 38m"}, {w:1378560, M:599424, t:"68D 1h"}, {w:2757120, M:1198848, t:"136D 2h"}, {w:5514240, M:2397696, t:"272D 5h"}, {w:11028480, M:4795392, t:"544D 10h"}, {w:22056960, M:9590784, t:"1088D 20h"}, {w:44113920, M:19181568, t:"2177D 16h"}, {w:88227840, M:38363136, t:"4355D 9h"}, {w:176455680, M:76726272, t:"8710D 19h"}, {w:352911360, M:153452544, t:"17421D 15h"}, {w:705822720, M:306905088, t:"34843D 7h"}, {w:1411645440, M:613810176, t:"69686D 14h"}],
	"branchOffice"  : [{w:15, t:"17m 17s"}, {w:38, t:"43m 12s"}, {w:104, M:32, t:"1h 32m"}, {w:222, M:66, t:"2h 7m"}, {w:426, M:152, t:"2h 45m"}, {w:643, M:246, t:"3h 40m"}, {w:933, M:417, t:"4h 45m"}, {w:1301, M:660, t:"5h 56m"}, {w:1765, M:1010, t:"7h 17m"}, {w:2317, M:1481, t:"8h 44m"}, {w:3002, M:2104, t:"10h 21m"}, {w:3799, M:2615, t:"12h 3m"}, {w:4754, M:3579, t:"13h 56m"}, {w:5839, M:4325, t:"15h 54m"}, {w:7618, M:6294, t:"18h 3m"}, {w:9131, M:8116, t:"20h 17m"}, {w:36524, M:32464, t:"3D 9h"}, {w:73048, M:64928, t:"6D 18h"}, {w:146096, M:129856, t:"13D 12h"}, {w:292192, M:259712, t:"27D 1h"}, {w:584384, M:519424, t:"54D 2h"}, {w:1168768, M:1038848, t:"108D 5h"}, {w:2337536, M:2077696, t:"216D 10h"}, {w:4675072, M:4155392, t:"432D 20h"}, {w:9350144, M:8310784, t:"865D 16h"}, {w:18700288, M:16621568, t:"1731D 9h"}, {w:37400576, M:33243136, t:"3462D 19h"}, {w:74801152, M:66486272, t:"6925D 15h"}, {w:149602304, M:132972544, t:"13851D 7h"}, {w:299204608, M:265945088, t:"27702D 14h"}, {w:598409216, M:531890176, t:"55405D 5h"}, {w:1196818432, M:1063780352, t:"110810D 10h"}],
	"safehouse"     : [{w:20, t:"15m 8s"}, {w:49, M:10, t:"42m"}, {w:95, M:27, t:"1h 8m"}, {w:163, M:48, t:"1h 41m"}, {w:266, M:88, t:"2h 10m"}, {w:407, M:146, t:"2h 38m"}, {w:594, M:228, t:"3h 23m"}, {w:867, M:352, t:"4h 25m"}, {w:1179, M:498, t:"5h 22m"}, {w:1559, M:686, t:"6h 26m"}, {w:2012, M:919, t:"7h 12m"}, {w:2674, M:1250, t:"8h 17m"}, {w:3343, M:1438, t:"9h 1m"}, {w:4127, M:1828, t:"9h 40m"}, {w:5021, M:2066, t:"10h 15m"}, {w:6304, M:2672, t:"11h 12m"}, {w:7533, M:3276, t:"11h 36m"}, {w:8910, M:3960, t:"11h 52m"}, {w:9833, M:4370, t:"12h 1m"}, {w:11232, M:4992, t:"12h 28m"}, {w:44928, M:19968, t:"2D 1h"}, {w:89856, M:39936, t:"4D 3h"}, {w:179712, M:79872, t:"8D 7h"}, {w:359424, M:159744, t:"16D 15h"}, {w:718848, M:319488, t:"33D 6h"}, {w:1437696, M:638976, t:"66D 13h"}, {w:2875392, M:1277952, t:"133D 2h"}, {w:5750784, M:2555904, t:"266D 5h"}, {w:11501568, M:5111808, t:"532D 11h"}, {w:23003136, M:10223616, t:"1064D 23h"}, {w:46006272, M:20447232, t:"2129D 22h"}, {w:92012544, M:40894464, t:"4259D 20h"}, {w:184025088, M:81788928, t:"8519D 16h"}, {w:368050176, M:163577856, t:"17039D 8h"}, {w:736100352, M:327155712, t:"34078D 17h"}, {w:1472200704, M:654311424, t:"68157D 10h"}, {w:2944401408, M:1308622848, t:"136314D 21h"}, {w:5888802816, M:2617245696, t:"272629D 18h"}, {w:11777605632, M:5234491392, t:"545259D 12h"}, {w:23555211264, M:10468982784, t:"1090519D 57m"}],
	"barracks"      : [{w:35, t:"6m 58s"}, {w:45, t:"16m 12s"}, {w:68, t:"31m 12s"}, {w:76, t:"56m 24s"}, {w:67, M:22, t:"1h 39m"}, {w:76, M:24, t:"1h 44m"}, {w:124, M:46, t:"2h 3m"}, {w:183, M:56, t:"2h 15m"}, {w:235, M:82, t:"2h 23m"}, {w:336, M:100, t:"2h 55m"}, {w:455, M:150, t:"3h 23m"}, {w:616, M:220, t:"4h"}, {w:755, M:289, t:"4h 18m"}, {w:980, M:398, t:"5h"}, {w:1170, M:494, t:"4h 48m"}, {w:1477, M:650, t:"5h 29m"}, {w:1797, M:821, t:"5h 25m"}, {w:2120, M:991, t:"5h 50m"}, {w:2435, M:1048, t:"5h 24m"}, {w:2831, M:1254, t:"5h 48m"}, {w:3208, M:1320, t:"5h 14m"}, {w:3763, M:1595, t:"5h 43m"}, {w:4296, M:1869, t:"5h 5m"}, {w:4874, M:2166, t:"5h 24m"}, {w:19496, M:8664, t:"21h 39m"}, {w:38992, M:17328, t:"1D 19h"}, {w:77984, M:34656, t:"3D 14h"}, {w:155968, M:69312, t:"7D 5h"}, {w:311936, M:138624, t:"14D 10h"}, {w:623872, M:277248, t:"28D 21h"}, {w:1247744, M:554496, t:"57D 18h"}, {w:2495488, M:1108992, t:"115D 12h"}, {w:4990976, M:2217984, t:"231D 57m"}, {w:9981952, M:4435968, t:"462D 1h"}, {w:19963904, M:8871936, t:"924D 3h"}, {w:39927808, M:17743872, t:"1848D 7h"}, {w:79855616, M:35487744, t:"3696D 15h"}, {w:159711232, M:70975488, t:"7393D 6h"}, {w:319422464, M:141950976, t:"14786D 13h"}, {w:638844928, M:283901952, t:"29573D 2h"}, {w:1277689856, M:567803904, t:"59146D 5h"}, {w:2555379712, M:1135607808, t:"118292D 11h"}, {w:5110759424, M:2271215616, t:"236584D 23h"}, {w:10221518848, M:4542431232, t:"473169D 22h"}, {w:20443037696, M:9084862464, t:"946339D 20h"}, {w:40886075392, M:18169724928, t:"1892679D 16h"}, {w:81772150784, M:36339449856, t:"3785359D 8h"}, {w:163544301568, M:72678899712, t:"7570718D 17h"}, {w:327088603136, M:145357799424, t:"15141437D 10h"}, {w:654177206272, M:290715598848, t:"30282874D 21h"}, {w:1308354412544, M:581431197696, t:"60565749D 18h"}, {w:2616708825088, M:1162862395392, t:"121131499D 12h"}, {w:5233417650176, M:2325724790784, t:"242262999D 57m"}, {w:10466835300352, M:4651449581568, t:"484525998D 1h"}, {w:20933670600704, M:9302899163136, t:"969051996D 3h"}, {w:41867341201408, M:18605798326272, t:"1938103992D 7h"}],
	"workshop-army" : [{w:26, M:8, t:"18m 36s"}, {w:55, M:20, t:"33m 37s"}, {w:102, M:30, t:"52m 48s"}, {w:163, M:54, t:"1h 12m"}, {w:236, M:85, t:"1h 31m"}, {w:277, M:106, t:"1h 34m"}, {w:371, M:151, t:"1h 53m"}, {w:465, M:197, t:"2h 7m"}, {w:545, M:240, t:"2h 15m"}, {w:682, M:311, t:"2h 34m"}, {w:810, M:379, t:"2h 47m"}, {w:980, M:422, t:"3h 6m"}, {w:1037, M:460, t:"3h 2m"}, {w:1197, M:493, t:"3h 15m"}, {w:1509, M:640, t:"3h 28m"}, {w:1925, M:837, t:"3h 48m"}, {w:2352, M:1046, t:"4h 1m"}, {w:2672, M:1188, t:"4h 14m"}, {w:2883, M:1281, t:"4h 16m"}, {w:3089, M:1373, t:"4h 17m"}, {w:3305, M:1469, t:"4h 19m"}, {w:3913, M:1739, t:"4h 49m"}, {w:4233, M:1881, t:"4h 57m"}, {w:4563, M:2028, t:"5h 4m"}, {w:18252, M:8112, t:"20h 16m"}, {w:36504, M:16224, t:"1D 16h"}, {w:73008, M:32448, t:"3D 9h"}, {w:146016, M:64896, t:"6D 18h"}, {w:292032, M:129792, t:"13D 12h"}, {w:584064, M:259584, t:"27D 57m"}, {w:1168128, M:519168, t:"54D 1h"}, {w:2336256, M:1038336, t:"108D 3h"}],
	};
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
var unitsAndShipsIndexesR = getUnitsShipsIndexesR();
function getLocalizedTexts() {
  if (language == "tw") { //by kChen
    buildings = {
      "townHall"      : ["市政府", "市政府"],
      "academy"       : ["學院", "學院"],
      "port"          : ["港口", "港口"],
      "shipyard"      : ["船塢", "船塢"],
      "warehouse"     : ["倉庫", "倉庫"],
      "wall"          : ["城牆", "城牆"],
      "tavern"        : ["酒館", "酒館"],
      "museum"        : ["博物館", "博物館"],
      "palace"        : ["皇宮", "皇宮"],
      "palaceColony"  : ["總督府", "總督府"],
      "embassy"       : ["大使館", "大使館"],
      "branchOffice"  : ["市場", "市場"],
      "safehouse"     : ["間諜小屋", "間諜小屋"],
      "barracks"      : ["兵營", "兵營"],
      "workshop-army" : ["兵工廠", "兵工廠"],
    };
    texts = {
      "cityName"          : "城市",
      "currentlyBuilding" : "目前正在建設",
      "summary"           : "總計:",
      "hide_settings"     : "隱藏設定",
      "show_settings"     : "顯示設定",
      "scienceReport"     : "科技總覽",
      "constructionLevel" : "學院等級",
      "scientists"        : "學者",
      "production"        : "研究效率",
      "costs"             : "耗費",
      "goTo"              : "前往",
      "armyReport"        : "軍事總覽",
      "resourcesReport"   : "資源總覽",
      "buildingsReport"   : "建築總覽",
      "transportReport"   : "運輸船總覽",
      "m"                 : "分",
      "h"                 : "時",
      "day"               : "天",
      "M"                 : "月",
      "D"                 : "日",
      "hoursToFull"       : "小時資源裝滿",
      "hoursToEmpty"      : "小時資源耗盡",
      "available"         : "總量",
      "fullness"          : "已使用",
      "lastUpdate"        : "最後更新於",
      	  
      "appendDestination"               : "記錄目的地",
      "removeDestination"               : "從快速列表移除",
      "appendDestinationNameLabel"      : "請給目的地輸入一個名稱",
      "appendDestinationNameErrorLabel" : "名稱無效! 請不要使用|或者;!",
      "removeDestinationConfirmLabel"   : "你確認要移除這個目的地嗎?",

      "SETTINGS_RESET_DATA_CONFIRM" : "您確定要清除所有保存的資料嗎?",
      "SETTINGS_RESET_PLAYERS_DATA" : "您確定要清除所有玩家的資料嗎?",
      "PREMIUM_VIEW"                : "顯示加值畫面",
      "ALERT_SOUNDS"                : "提醒",
      "ALERT_VOLUME"                : "提醒音量",
      "WARNING_VOLUME"              : "報警音量",
      "AUTO_REFRESH"                : "自動刷新",
      "AUTO_REFRESH_MIN_SECS"       : "自動刷新最短間隔(秒)",
      "AUTO_REFRESH_MAX_SECS"       : "自動刷新最長間隔(秒)",
      "TABLE_RESOURCES"             : "顯示資源總覽",
      "TABLE_BUILDINGS"             : "顯示建築總覽",
      "TABLE_ARMYFLEET"             : "顯示軍隊總覽",
      "TABLE_RESEARCH"              : "顯示研究總覽",
      "TABLE_TRANSPORT"             : "顯示運輸船總覽",
      "TECH_LETTERCHUTE"            : "信件通道已研究完成",
      "TECH_PULLEY"                 : "滑輪是否已研究完成",
      "TECH_GEOMETRY"               : "幾何學是否已研究完成",
      "TECH_SPIRITLEVEL"            : "水平衡是否已研究完成",
      "TABLE_PLAYERS"               : "顯示玩家和城市總覽",
      "PLAYERS_NORMAL"              : "顯示正常玩家",
      "PLAYERS_INACTIVITY"          : "顯示閒置玩家",
      "PLAYERS_BANNED"              : "顯示封鎖玩家",
      "PLAYERS_VACATION"            : "顯示假期玩家",
      "PROGRESS_BAR_MODE"           : "資源進度條顯示模式",

      "off"             : "關閉",
      "time"            : "剩餘時間",
      "percent"         : "顯示百分比",
      "LANGUAGE"        : "語言",
      "LANGUAGE_AUTO"   : "由服務器名自動確定",
      "ownAlly"         : "所屬聯盟 (縮寫):",
      "friendlyAllies"  : "友好聯盟 (縮寫, 用逗號隔開)",
      "hostileAllies"   : "敵對聯盟 (縮寫, 用逗號隔開)",
      "DEBUG_LOG"       : "記錄除錯訊息",

      "Refresh_table"      : "儲存設定",
      "Reset_all_data"     : "清除設定",
      "Reset_players_data" : "清除玩家資料",

      "Players"         : "玩家",
      "Score"           : "總分",
      "StartCity"       : "出發地",
      "DestinationCity" : "目的地",
      "Mission"         : "任務",
      "FinishTime"      : "完成時間",
      "FinishResources"	: "完成任務時，出發村資源量",
      "Point"           : "點",
      "Loading"         : "裝載中",
      "Wait"            : "等待",
      "Remaining"       : "尚餘",
      "Upgrade"         : "升級",
      "UpgradeConfirm"  : "確定要升級嗎?",
      "Level"           : "等級",
      "Happiness"       : "民意",
      "Growth"          : "成長率",
      "FreeWorkers"     : "空閒人口",
      "full"            : "全滿",
      "empty"           : "耗盡",
      "NewVersion"      : "偵測到新版的 "+scriptname+"\n%s\n按確定後將自動更新",
      "Attack"          : "攻擊",
      "DeleteConfirm"   : "確定要刪除 %s 嗎?",
    };
  } else if (language == "cn") { //chinese translation
    buildings = {
      "townHall"      : ["市政厅", "市政厅"],
      "academy"       : ["学院", "学院"],
      "port"          : ["港口", "港口"],
      "shipyard"      : ["船坞", "船坞"],
      "warehouse"     : ["仓库", "仓库"],
      "wall"          : ["城墙", "城墙"],
      "tavern"        : ["酒馆", "酒馆"],
      "museum"        : ["博物馆", "博物馆"],
      "palace"        : ["皇宫", "皇宫"],
      "palaceColony"  : ["总督府", "总督府"],
      "embassy"       : ["大使馆", "大使馆"],
      "branchOffice"  : ["市场", "市场"],
      "safehouse"     : ["藏身处", "藏身处"],
      "barracks"      : ["兵营", "兵营"],
      "workshop-army" : ["兵工厂", "兵工厂"],
    };
    texts = {
      "cityName"          : "城镇名称",
      "currentlyBuilding" : "建造中的建筑",
      "summary"           : "总计:",
      "hide_settings"     : "隐藏设置",
      "show_settings"     : "显示设置",
      "scienceReport"     : "科技总览",
      "constructionLevel" : "学院等级",
      "scientists"        : "学者",
      "production"        : "研究效率",
      "costs"             : "耗费",
      "goTo"              : "前往",
      "armyReport"        : "军事总览",
      "resourcesReport"   : "资源总览",
      "buildingsReport"   : "建筑总览",
      "transportReport"   : "运输船总览",
      "m"                 : "分",
      "h"                 : "小时",
      "day"               : "天",
      "hoursToFull"       : "小时资源装满",
      "hoursToEmpty"      : "小时资源耗尽",
      "available"         : "总量",
      "fullness"          : "已使用",
      "lastUpdate"        : "上次更新",

      "appendDestination"               : "添加目的地",
      "removeDestination"               : "从列表移除",
      "appendDestinationNameLabel"      : "请给目的地输入一个名称",
      "appendDestinationNameErrorLabel" : "名称无效,请重试",
      "removeDestinationConfirmLabel"   : "你确认要移除这个目的地吗?",

      "SETTINGS_RESET_DATA_CONFIRM" : "您确定要清除所有保存的数据?",
      "SETTINGS_RESET_PLAYERS_DATA" : "您确定要清除所有玩家的数据?",
      "PREMIUM_VIEW"                : "显示加值画面",
      "ALERT_SOUNDS"                : "声音报警",
      "ALERT_VOLUME"                : "报警音量",
      "WARNING_VOLUME"              : "警告音量",
      "AUTO_REFRESH"                : "自动刷新",
      "AUTO_REFRESH_MIN_SECS"       : "自动刷新下限(秒)",
      "AUTO_REFRESH_MAX_SECS"       : "自动刷新上限(秒)",
      "TABLE_RESOURCES"             : "显示资源信息",
      "TABLE_BUILDINGS"             : "显示建筑信息",
      "TABLE_ARMYFLEET"             : "显示军队信息",
      "TABLE_RESEARCH"              : "显示研究信息",
      "TABLE_TRANSPORT"             : "显示运输船信息",
      "TECH_LETTERCHUTE"            : "信件通道已研究完成",
      "TECH_PULLEY"                 : "滑轮是否已研究完成",
      "TECH_GEOMETRY"               : "几何学是否已研究完成",
      "TECH_SPIRITLEVEL"            : "水平衡是否已研究完成",
      "TABLE_PLAYERS"               : "显示玩家和城市信息",
      "PLAYERS_NORMAL"              : "显示正常玩家",
      "PLAYERS_INACTIVITY"          : "显示闲置玩家",
      "PLAYERS_BANNED"              : "显示封锁玩家",
      "PLAYERS_VACATION"            : "显示假期玩家",
      "PROGRESS_BAR_MODE"           : "资源条模式",

      "off"             : "关闭",
      "time"            : "基于剩余时间",
      "percent"         : "基于容量",
      "LANGUAGE"        : "语言",
      "LANGUAGE_AUTO"   : "由服务器名自动确定",
      "ownAlly"         : "联盟(缩写):",
      "friendlyAllies"  : "友好联盟 (缩写, 逗号分割)",
      "hostileAllies"   : "对战联盟 (缩写, 逗号分割)",
      "DEBUG_LOG"       : "调试日志",

      "Refresh_table"      : "刷新信息",
      "Reset_all_data"     : "重置数据",
      "Reset_players_data" : "重置玩家数据",

      "Players"         : "玩家",
      "Score"           : "总分",
      "StartCity"       : "出发地",
      "DestinationCity" : "目的地",
      "Mission"         : "任务",
      "FinishTime"      : "完成时间",
      "FinishResources"	: "完成任务时，出发村资源量",
      "Point"           : "点",
      "Loading"         : "装载中",
      "Wait"            : "等待",
      "Remaining"       : "尚餘",
      "Upgrade"         : "升级",
      "UpgradeConfirm"  : "确定要升级吗?",
      "Level"           : "等級",
      "Happiness"       : "民意",
      "Growth"          : "成长率",
      "FreeWorkers"     : "空闲人口",
      "full"            : "全满",
      "empty"           : "耗尽",
      "NewVersion"      : "侦测到新版的 "+scriptname+"\n%s\n按确定後将自动更新",
      "Attack"          : "攻击",
      "DeleteConfirm"   : "确定要删除 %s 吗?",
    };
  } else if (language == "hu") { //chinese translation
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
      "cityName"          : "Város neve",
      "currentlyBuilding" : "Építés alatt",
      "summary"           : "Összesen:",
      "hide_settings"     : "Beállítások elrejtése",
      "show_settings"     : "Beállítások megtekintése",
      "scienceReport"     : "Science Report",
      "constructionLevel" : "Construction Level",
      "scientists"        : "Scientists",
      "production"        : "Production",
      "costs"             : "Costs",
      "goTo"              : "Go to",
      "armyReport"        : "Army Report",
      "resourcesReport"   : "Resources Report",
      "buildingsReport"   : "Buildings Report",
      "transportReport"   : "Transport Report",
      "m"                 : "m",
      "h"                 : "h",
      "day"               : "day",
      "hoursToFull"       : "hours to full",
      "hoursToEmpty"      : "hours to empty",
      "available"         : "available",
      "fullness"          : "fullness",
      "lastUpdate"        : "last update", 
      	  
      "appendDestination"               : "Append to usefull destinations",
      "removeDestination"               : "Remove from usefull destinations",
      "appendDestinationNameLabel"      : "Type a name for the destination link",
      "appendDestinationNameErrorLabel" : "The specified name is invalid, try again",
      "removeDestinationConfirmLabel"   : "Are you sure you want to remove the destination from the list?",

      "SETTINGS_RESET_DATA_CONFIRM" : "Are you sure you want to delete ALL stored data?",
      "SETTINGS_RESET_PLAYERS_DATA" : "Are you sure you want to delete ALL players data?",
      "PREMIUM_VIEW"                : "Premium view",
      "ALERT_SOUNDS"                : "Alert sounds",
      "ALERT_VOLUME"                : "Alert volume",
      "WARNING_VOLUME"              : "Warning volume",
      "AUTO_REFRESH"                : "Auto refresh",
      "AUTO_REFRESH_MIN_SECS"       : "Auto refresh min seconds",
      "AUTO_REFRESH_MAX_SECS"       : "Auto refresh max seconds",
      "TABLE_RESOURCES"             : "Show resources table",
      "TABLE_BUILDINGS"             : "Show buildings table",
      "TABLE_ARMYFLEET"             : "Show army and fleet table",
      "TABLE_RESEARCH"              : "Show research table",
      "TABLE_TRANSPORT"             : "Show transport table",
      "TECH_LETTERCHUTE"            : "Finish Letter Chute?",
      "TECH_PULLEY"                 : "Finish Pulley?",
      "TECH_GEOMETRY"               : "Finish Geometry?",
      "TECH_SPIRITLEVEL"            : "Finish Spirit Level?",
	  "TABLE_PLAYERS"               : "Show players and cities table",
      "PLAYERS_NORMAL"              : "Show normal players",
      "PLAYERS_INACTIVITY"          : "Show inactivity players",
      "PLAYERS_BANNED"              : "Show banned players",
      "PLAYERS_VACATION"            : "Show vacation players",
      "PROGRESS_BAR_MODE"           : "Resource progress bar mode",

      "off"             : "off",
      "time"            : "based on remaining time",
      "percent"         : "based on fullness percentage",
      "LANGUAGE"        : "Language",
      "LANGUAGE_AUTO"   : "Automatic from server name",
      "ownAlly"         : "Own alliance (short name)",
      "friendlyAllies"  : "Friendly alliances (short names, separated by comma)",
      "hostileAllies"   : "Hostile alliances (short names, separated by comma)",
      "DEBUG_LOG"       : "Log debug messages",

      "Refresh_table"      : "Refresh table",
      "Reset_all_data"     : "Reset all data",
      "Reset_players_data" : "Reset players data",

      "Players"         : "Players",
      "Score"           : "Score",
      "StartCity"       : "Start City",
      "DestinationCity" : "Destination City",
      "Mission"         : "Mission",
      "FinishTime"      : "Finish Time",
      "FinishResources"	: "When finish mission, the start city of resources",
      "Point"           : "Point",
      "Loading"         : "Loading",
      "Wait"            : "Wait",
      "Remaining"       : "Remaining",
      "Upgrade"         : "Upgrade",
      "UpgradeConfirm"  : "Are you sure you want to upgrade building?",
      "Level"           : "Level",
      "Happiness"       : "Satisfaction",
      "Growth"          : "Growth",
      "FreeWorkers"     : "Free workers",
      "full"            : "full",
      "empty"           : "empty",
      "NewVersion"      : "There is a newer version of "+scriptname+"\n%s\nClick on OK if you would like to update now",    };
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
      "cityName"          : "Stadtname",
      "currentlyBuilding" : "Zur Zeit im Bau",
      "summary"           : "Gesamt:",
      "hide_settings"     : "Hide settings", "show_settings": "Show settings", 
      "scienceReport"     : "Science Report",
      "constructionLevel" : "Construction Level",
      "scientists"        : "Scientists",
      "production"        : "Production",
      "costs"             : "Costs",
      "goTo"              : "Go to",
      "armyReport"        : "Army Report",
      "resourcesReport"   : "Resources Report",
      "buildingsReport"   : "Buildings Report",
      "transportReport"   : "Transport Report",
      "m"                 : "m",
      "h"                 : "h",
      "day"               : "day",
      "hoursToFull"       : "hours to full",
      "hoursToEmpty"      : "hours to empty",
      "available"         : "available",
      "fullness"          : "fullness",
      "lastUpdate"        : "last update", 
      	  
      "appendDestination"               : "Append to usefull destinations",
      "removeDestination"               : "Remove from usefull destinations",
      "appendDestinationNameLabel"      : "Type a name for the destination link",
      "appendDestinationNameErrorLabel" : "The specified name is invalid, try again",
      "removeDestinationConfirmLabel"   : "Are you sure you want to remove the destination from the list?",

      "SETTINGS_RESET_DATA_CONFIRM" : "Are you sure you want to delete ALL stored data?",
      "SETTINGS_RESET_PLAYERS_DATA" : "Are you sure you want to delete ALL players data?",
      "PREMIUM_VIEW"                : "Premium view",
      "ALERT_SOUNDS"                : "Alert sounds",
      "ALERT_VOLUME"                : "Alert volume",
      "WARNING_VOLUME"              : "Warning volume",
      "AUTO_REFRESH"                : "Auto refresh",
      "AUTO_REFRESH_MIN_SECS"       : "Auto refresh min seconds",
      "AUTO_REFRESH_MAX_SECS"       : "Auto refresh max seconds",
      "TABLE_RESOURCES"             : "Show resources table",
      "TABLE_BUILDINGS"             : "Show buildings table",
      "TABLE_ARMYFLEET"             : "Show army and fleet table",
      "TABLE_RESEARCH"              : "Show research table",
      "TABLE_TRANSPORT"             : "Show transport table",
      "TECH_LETTERCHUTE"            : "Finish Letter Chute?",
      "TECH_PULLEY"                 : "Finish Pulley?",
      "TECH_GEOMETRY"               : "Finish Geometry?",
      "TECH_SPIRITLEVEL"            : "Finish Spirit Level?",
      "TABLE_PLAYERS"               : "Show players and cities table",
      "PLAYERS_NORMAL"              : "Show normal players",
      "PLAYERS_INACTIVITY"          : "Show inactivity players",
      "PLAYERS_BANNED"              : "Show banned players",
      "PLAYERS_VACATION"            : "Show vacation players",
      "PROGRESS_BAR_MODE"           : "Resource progress bar mode",

      "off"             : "off",
      "time"            : "based on remaining time",
      "percent"         : "based on fullness percentage",
      "LANGUAGE"        : "Language",
      "LANGUAGE_AUTO"   : "Automatic from server name",
      "ownAlly"         : "Own alliance (short name)",
      "friendlyAllies"  : "Friendly alliances (short names, separated by comma)",
      "hostileAllies"   : "Hostile alliances (short names, separated by comma)",
      "DEBUG_LOG"       : "Log debug messages",

      "Refresh_table"      : "Refresh table",
      "Reset_all_data"     : "Reset all data",
      "Reset_players_data" : "Reset players data",

      "Players"         : "Players",
      "Score"           : "Score",
      "StartCity"       : "Start City",
      "DestinationCity" : "Destination City",
      "Mission"         : "Mission",
      "FinishTime"      : "Finish Time",
      "FinishResources"	: "When finish mission, the start city of resources",
      "Point"           : "Point",
      "Loading"         : "Loading",
      "Wait"            : "Wait",
      "Remaining"       : "Remaining",
      "Upgrade"         : "Upgrade",
      "UpgradeConfirm"  : "Are you sure you want to upgrade building?",
      "Level"           : "Level",
      "Happiness"       : "Satisfaction",
      "Growth"          : "Growth",
      "FreeWorkers"     : "Free workers",
      "full"            : "full",
      "empty"           : "empty",
      "NewVersion"      : "There is a newer version of "+scriptname+"\n%s\nClick on OK if you would like to update now",    };
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
      "cityName"          : "Jméno",
      "currentlyBuilding" : "Staví se",
      "summary"           : "Celkem:",
      "hide_settings"     : "Hide settings", "show_settings": "Show settings",
      "scienceReport"     : "Science Report",
      "constructionLevel" : "Construction Level",
      "scientists"        : "Scientists",
      "production"        : "Production",
      "costs"             : "Costs",
      "goTo"              : "Go to",
      "armyReport"        : "Army Report",
      "resourcesReport"   : "Resources Report",
      "buildingsReport"   : "Buildings Report",
      "transportReport"   : "Transport Report",
      "m"                 : "m",
      "h"                 : "h",
      "day"               : "day",
      "hoursToFull"       : "hours to full",
      "hoursToEmpty"      : "hours to empty",
      "available"         : "available",
      "fullness"          : "fullness",
      "lastUpdate"        : "last update", 
      	  
      "appendDestination"               : "Append to usefull destinations",
      "removeDestination"               : "Remove from usefull destinations",
      "appendDestinationNameLabel"      : "Type a name for the destination link",
      "appendDestinationNameErrorLabel" : "The specified name is invalid, try again",
      "removeDestinationConfirmLabel"   : "Are you sure you want to remove the destination from the list?",

      "SETTINGS_RESET_DATA_CONFIRM" : "Are you sure you want to delete ALL stored data?",
      "SETTINGS_RESET_PLAYERS_DATA" : "Are you sure you want to delete ALL players data?",
      "PREMIUM_VIEW"                : "Premium view",
      "ALERT_SOUNDS"                : "Alert sounds",
      "ALERT_VOLUME"                : "Alert volume",
      "WARNING_VOLUME"              : "Warning volume",
      "AUTO_REFRESH"                : "Auto refresh",
      "AUTO_REFRESH_MIN_SECS"       : "Auto refresh min seconds",
      "AUTO_REFRESH_MAX_SECS"       : "Auto refresh max seconds",
      "TABLE_RESOURCES"             : "Show resources table",
      "TABLE_BUILDINGS"             : "Show buildings table",
      "TABLE_ARMYFLEET"             : "Show army and fleet table",
      "TABLE_RESEARCH"              : "Show research table",
      "TABLE_TRANSPORT"             : "Show transport table",
      "TECH_LETTERCHUTE"            : "Finish Letter Chute?",
      "TECH_PULLEY"                 : "Finish Pulley?",
      "TECH_GEOMETRY"               : "Finish Geometry?",
      "TECH_SPIRITLEVEL"            : "Finish Spirit Level?",
      "TABLE_PLAYERS"               : "Show players and cities table",
      "PLAYERS_NORMAL"              : "Show normal players",
      "PLAYERS_INACTIVITY"          : "Show inactivity players",
      "PLAYERS_BANNED"              : "Show banned players",
      "PLAYERS_VACATION"            : "Show vacation players",
      "PROGRESS_BAR_MODE"           : "Resource progress bar mode",

      "off"             : "off",
      "time"            : "based on remaining time",
      "percent"         : "based on fullness percentage",
      "LANGUAGE"        : "Language",
      "LANGUAGE_AUTO"   : "Automatic from server name",
      "ownAlly"         : "Own alliance (short name)",
      "friendlyAllies"  : "Friendly alliances (short names, separated by comma)",
      "hostileAllies"   : "Hostile alliances (short names, separated by comma)",
      "DEBUG_LOG"       : "Log debug messages",

      "Refresh_table"      : "Refresh table",
      "Reset_all_data"     : "Reset all data",
      "Reset_players_data" : "Reset players data",

      "Players"         : "Players",
      "Score"           : "Score",
      "StartCity"       : "Start City",
      "DestinationCity" : "Destination City",
      "Mission"         : "Mission",
      "FinishTime"      : "Finish Time",
      "FinishResources"	: "When finish mission, the start city of resources",
      "Point"           : "Point",
      "Loading"         : "Loading",
      "Wait"            : "Wait",
      "Remaining"       : "Remaining",
      "Upgrade"         : "Upgrade",
      "UpgradeConfirm"  : "Are you sure you want to upgrade building?",
      "Level"           : "Level",
      "Happiness"       : "Satisfaction",
      "Growth"          : "Growth",
      "FreeWorkers"     : "Free workers",
      "full"            : "full",
      "empty"           : "empty",
      "NewVersion"      : "There is a newer version of "+scriptname+"\n%s\nClick on OK if you would like to update now",
      "Attack"          : "Attack",
      "DeleteConfirm"   : "Are you sure you want to delete %s?",
    };
  } else if (language == "tr") { //Turkish translation, thanks to Guybrush
    buildings = {
      "townHall"      : ["Belediye Binasi", "Bldy"],
      "academy"       : ["Akademi", "Akdm"],
      "port"          : ["Ticaret Limani", "Limn"],
      "shipyard"      : ["Donanma Tersanesi", "Trsn"],
      "warehouse"     : ["Depo", "Depo"],
      "wall"          : ["Sur", "Sur"],
      "tavern"        : ["Taverna", "Tvrna"],
      "museum"        : ["Müze", "Muze"],
      "palace"        : ["Saray", "Sary"],
      "palaceColony"  : ["Vali Konagi", "Vali"],
      "embassy"       : ["Büyük Elçilik", "Elçlk"],
      "branchOffice"  : ["Ticaret Merkezi", "Markt"],
      "safehouse"     : ["Istihbarat Merkezi", "Isthb"],
      "barracks"      : ["Ki?la", "Ki?la"],
      "workshop-army" : ["Mucit Atölyesi", "Mucit"],
    };
    texts = {
      "cityName"          : "?ehir",
      "currentlyBuilding" : "Yükseltilen",
      "summary"           : "Toplam:",
      "hide_settings"     : "Hide settings",
      "show_settings"     : "Show settings", 
      "scienceReport"     : "Science Report",
      "constructionLevel" : "Construction Level",
      "scientists"        : "Scientists",
      "production"        : "Production",
      "costs"             : "Costs",
      "goTo"              : "Go to",
      "armyReport"        : "Army Report",
      "resourcesReport"   : "Resources Report",
      "buildingsReport"   : "Buildings Report",
      "transportReport"   : "Transport Report",
      "m"                 : "m",
      "h"                 : "h",
      "day"               : "day",
      "hoursToFull"       : "hours to full",
      "hoursToEmpty"      : "hours to empty",
      "available"         : "available",
      "fullness"          : "fullness",
      "lastUpdate"        : "last update", 
      	  
      "appendDestination"               : "Append to usefull destinations",
      "removeDestination"               : "Remove from usefull destinations",
      "appendDestinationNameLabel"      : "Type a name for the destination link",
      "appendDestinationNameErrorLabel" : "The specified name is invalid, try again",
      "removeDestinationConfirmLabel"   : "Are you sure you want to remove the destination from the list?",

      "SETTINGS_RESET_DATA_CONFIRM" : "Are you sure you want to delete ALL stored data?",
      "SETTINGS_RESET_PLAYERS_DATA" : "Are you sure you want to delete ALL players data?",
      "PREMIUM_VIEW"                : "Premium view",
      "ALERT_SOUNDS"                : "Alert sounds",
      "ALERT_VOLUME"                : "Alert volume",
      "WARNING_VOLUME"              : "Warning volume",
      "AUTO_REFRESH"                : "Auto refresh",
      "AUTO_REFRESH_MIN_SECS"       : "Auto refresh min seconds",
      "AUTO_REFRESH_MAX_SECS"       : "Auto refresh max seconds",
      "TABLE_RESOURCES"             : "Show resources table",
      "TABLE_BUILDINGS"             : "Show buildings table",
      "TABLE_ARMYFLEET"             : "Show army and fleet table",
      "TABLE_RESEARCH"              : "Show research table",
      "TABLE_TRANSPORT"             : "Show transport table",
      "TECH_LETTERCHUTE"            : "Finish Letter Chute?",
      "TECH_PULLEY"                 : "Finish Pulley?",
      "TECH_GEOMETRY"               : "Finish Geometry?",
      "TECH_SPIRITLEVEL"            : "Finish Spirit Level?",
      "TABLE_PLAYERS"               : "Show players and cities table",
      "PLAYERS_NORMAL"              : "Show normal players",
      "PLAYERS_INACTIVITY"          : "Show inactivity players",
      "PLAYERS_BANNED"              : "Show banned players",
      "PLAYERS_VACATION"            : "Show vacation players",
      "PROGRESS_BAR_MODE"           : "Resource progress bar mode",

      "off"             : "off",
      "time"            : "based on remaining time",
      "percent"         : "based on fullness percentage",
      "LANGUAGE"        : "Language",
      "LANGUAGE_AUTO"   : "Automatic from server name",
      "ownAlly"         : "Own alliance (short name)",
      "friendlyAllies"  : "Friendly alliances (short names, separated by comma)",
      "hostileAllies"   : "Hostile alliances (short names, separated by comma)",
      "DEBUG_LOG"       : "Log debug messages",

      "Refresh_table"      : "Refresh table",
      "Reset_all_data"     : "Reset all data",
      "Reset_players_data" : "Reset players data",

      "Players"         : "Players",
      "Score"           : "Score",
      "StartCity"       : "Start City",
      "DestinationCity" : "Destination City",
      "Mission"         : "Mission",
      "FinishTime"      : "Finish Time",
      "FinishResources"	: "When finish mission, the start city of resources",
      "Point"           : "Point",
      "Loading"         : "Loading",
      "Wait"            : "Wait",
      "Remaining"       : "Remaining",
      "Upgrade"         : "Upgrade",
      "UpgradeConfirm"  : "Are you sure you want to upgrade building?",
      "Level"           : "Level",
      "Happiness"       : "Satisfaction",
      "Growth"          : "Growth",
      "FreeWorkers"     : "Free workers",
      "full"            : "full",
      "empty"           : "empty",
      "NewVersion"      : "There is a newer version of "+scriptname+"\n%s\nClick on OK if you would like to update now",
      "Attack"          : "Attack",
      "DeleteConfirm"   : "Are you sure you want to delete %s?",
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
      "cityName"          : "Nombre de la Ciudad",
      "currentlyBuilding" : "Construcción Actual",
      "summary"           : "Totales:",
      "hide_settings"     : "Hide settings",
      "show_settings"     : "Show settings",
      "scienceReport"     : "Science Report",
      "constructionLevel" : "Construction Level",
      "scientists"        : "Scientists",
      "production"        : "Production",
      "costs"             : "Costs",
      "goTo"              : "Go to",
      "armyReport"        : "Army Report",
      "resourcesReport"   : "Resources Report",
      "buildingsReport"   : "Buildings Report",
      "transportReport"   : "Transport Report",
      "m"                 : "m",
      "h"                 : "h",
      "day"               : "day",
      "hoursToFull"       : "hours to full",
      "hoursToEmpty"      : "hours to empty",
      "available"         : "available",
      "fullness"          : "fullness",
      "lastUpdate"        : "last update", 
      	  
      "appendDestination"               : "Append to usefull destinations",
      "removeDestination"               : "Remove from usefull destinations",
      "appendDestinationNameLabel"      : "Type a name for the destination link",
      "appendDestinationNameErrorLabel" : "The specified name is invalid, try again",
      "removeDestinationConfirmLabel"   : "Are you sure you want to remove the destination from the list?",

      "SETTINGS_RESET_DATA_CONFIRM" : "Are you sure you want to delete ALL stored data?",
      "SETTINGS_RESET_PLAYERS_DATA" : "Are you sure you want to delete ALL players data?",
      "PREMIUM_VIEW"                : "Premium view",
      "ALERT_SOUNDS"                : "Alert sounds",
      "ALERT_VOLUME"                : "Alert volume",
      "WARNING_VOLUME"              : "Warning volume",
      "AUTO_REFRESH"                : "Auto refresh",
      "AUTO_REFRESH_MIN_SECS"       : "Auto refresh min seconds",
      "AUTO_REFRESH_MAX_SECS"       : "Auto refresh max seconds",
      "TABLE_RESOURCES"             : "Show resources table",
      "TABLE_BUILDINGS"             : "Show buildings table",
      "TABLE_ARMYFLEET"             : "Show army and fleet table",
      "TABLE_RESEARCH"              : "Show research table",
      "TABLE_TRANSPORT"             : "Show transport table",
      "TECH_LETTERCHUTE"            : "Finish Letter Chute?",
      "TECH_PULLEY"                 : "Finish Pulley?",
      "TECH_GEOMETRY"               : "Finish Geometry?",
      "TECH_SPIRITLEVEL"            : "Finish Spirit Level?",
      "TABLE_PLAYERS"               : "Show players and cities table",
      "PLAYERS_NORMAL"              : "Show normal players",
      "PLAYERS_INACTIVITY"          : "Show inactivity players",
      "PLAYERS_BANNED"              : "Show banned players",
      "PLAYERS_VACATION"            : "Show vacation players",
      "PROGRESS_BAR_MODE"           : "Resource progress bar mode",

      "off"             : "off",
      "time"            : "based on remaining time",
      "percent"         : "based on fullness percentage",
      "LANGUAGE"        : "Language",
      "LANGUAGE_AUTO"   : "Automatic from server name",
      "ownAlly"         : "Own alliance (short name)",
      "friendlyAllies"  : "Friendly alliances (short names, separated by comma)",
      "hostileAllies"   : "Hostile alliances (short names, separated by comma)",
      "DEBUG_LOG"       : "Log debug messages",

      "Refresh_table"      : "Refresh table",
      "Reset_all_data"     : "Reset all data",
      "Reset_players_data" : "Reset players data",

      "Players"         : "Players",
      "Score"           : "Score",
      "StartCity"       : "Start City",
      "DestinationCity" : "Destination City",
      "Mission"         : "Mission",
      "FinishTime"      : "Finish Time",
      "FinishResources"	: "When finish mission, the start city of resources",
      "Point"           : "Point",
      "Loading"         : "Loading",
      "Wait"            : "Wait",
      "Remaining"       : "Remaining",
      "Upgrade"         : "Upgrade",
      "UpgradeConfirm"  : "Are you sure you want to upgrade building?",
      "Level"           : "Level",
      "Happiness"       : "Satisfaction",
      "Growth"          : "Growth",
      "FreeWorkers"     : "Free workers",
      "full"            : "full",
      "empty"           : "empty",
      "NewVersion"      : "There is a newer version of "+scriptname+"\n%s\nClick on OK if you would like to update now",
      "Attack"          : "Attack",
      "DeleteConfirm"   : "Are you sure you want to delete %s?",
    };
  } else if (language == "ba") { //Bosnian translation, thanks to Sasha969
    buildings = {
      "townHall"      : ["Gradska Vije?nica", "Gradska Vije?nica"],
      "academy"       : ["Akademija", "Akademija"],
      "port"          : ["Trgova?ka luka", "Trgova?ka luka"],
      "shipyard"      : ["Brodogradili?te", "Brodogradili?te"],
      "warehouse"     : ["Skladi?te", "Skladi?te"],
      "wall"          : ["Gradski bedem", "Gradski bedem"],
      "tavern"        : ["Taverna", "Taverna"],
      "museum"        : ["Muzej", "Muzej"],
      "palace"        : ["Pala?a", "Pala?a"],
      "palaceColony"  : ["Guvernerova pala?a", "Guvernerova pala?a"],
      "embassy"       : ["Veleposlanstvo", "Veleposlanstvo"],
      "branchOffice"  : ["Market", "Market"],
      "safehouse"     : ["Skloni?te", "Skloni?te"],
      "barracks"      : ["Barake", "Barake"],
      "workshop-army" : ["Radionica", "Radionica"],
    };
    texts = {
      "cityName"          : "Ime grda",
      "currentlyBuilding" : "Trenutno se gradi",
      "summary"           : "Izvje?taj:",
      "hide_settings"     : "Hide settings",
      "show_settings"     : "Show settings", 
      "scienceReport"     : "Science Report",
      "constructionLevel" : "Construction Level",
      "scientists"        : "Scientists",
      "production"        : "Production",
      "costs"             : "Costs",
      "goTo"              : "Go to",
      "armyReport"        : "Army Report",
      "resourcesReport"   : "Resources Report",
      "buildingsReport"   : "Buildings Report",
      "transportReport"   : "Transport Report",
      "m"                 : "m",
      "h"                 : "h",
      "day"               : "day",
      "hoursToFull"       : "hours to full",
      "hoursToEmpty"      : "hours to empty",
      "available"         : "available",
      "fullness"          : "fullness",
      "lastUpdate"        : "last update", 
      	  
      "appendDestination"               : "Append to usefull destinations",
      "removeDestination"               : "Remove from usefull destinations",
      "appendDestinationNameLabel"      : "Type a name for the destination link",
      "appendDestinationNameErrorLabel" : "The specified name is invalid, try again",
      "removeDestinationConfirmLabel"   : "Are you sure you want to remove the destination from the list?",

      "SETTINGS_RESET_DATA_CONFIRM" : "Are you sure you want to delete ALL stored data?",
      "SETTINGS_RESET_PLAYERS_DATA" : "Are you sure you want to delete ALL players data?",
      "PREMIUM_VIEW"                : "Premium view",
      "ALERT_SOUNDS"                : "Alert sounds",
      "ALERT_VOLUME"                : "Alert volume",
      "WARNING_VOLUME"              : "Warning volume",
      "AUTO_REFRESH"                : "Auto refresh",
      "AUTO_REFRESH_MIN_SECS"       : "Auto refresh min seconds",
      "AUTO_REFRESH_MAX_SECS"       : "Auto refresh max seconds",
      "TABLE_RESOURCES"             : "Show resources table",
      "TABLE_BUILDINGS"             : "Show buildings table",
      "TABLE_ARMYFLEET"             : "Show army and fleet table",
      "TABLE_RESEARCH"              : "Show research table",
      "TABLE_TRANSPORT"             : "Show transport table",
      "TECH_LETTERCHUTE"            : "Finish Letter Chute?",
      "TECH_PULLEY"                 : "Finish Pulley?",
      "TECH_GEOMETRY"               : "Finish Geometry?",
      "TECH_SPIRITLEVEL"            : "Finish Spirit Level?",
      "TABLE_PLAYERS"               : "Show players and cities table",
      "PLAYERS_NORMAL"              : "Show normal players",
      "PLAYERS_INACTIVITY"          : "Show inactivity players",
      "PLAYERS_BANNED"              : "Show banned players",
      "PLAYERS_VACATION"            : "Show vacation players",
      "PROGRESS_BAR_MODE"           : "Resource progress bar mode",

      "off"             : "off",
      "time"            : "based on remaining time",
      "percent"         : "based on fullness percentage",
      "LANGUAGE"        : "Language",
      "LANGUAGE_AUTO"   : "Automatic from server name",
      "ownAlly"         : "Own alliance (short name)",
      "friendlyAllies"  : "Friendly alliances (short names, separated by comma)",
      "hostileAllies"   : "Hostile alliances (short names, separated by comma)",
      "DEBUG_LOG"       : "Log debug messages",

      "Refresh_table"      : "Refresh table",
      "Reset_all_data"     : "Reset all data",
      "Reset_players_data" : "Reset players data",

      "Players"         : "Players",
      "Score"           : "Score",
      "StartCity"       : "Start City",
      "DestinationCity" : "Destination City",
      "Mission"         : "Mission",
      "FinishTime"      : "Finish Time",
      "FinishResources"	: "When finish mission, the start city of resources",
      "Point"           : "Point",
      "Loading"         : "Loading",
      "Wait"            : "Wait",
      "Remaining"       : "Remaining",
      "Upgrade"         : "Upgrade",
      "UpgradeConfirm"  : "Are you sure you want to upgrade building?",
      "Level"           : "Level",
      "Happiness"       : "Satisfaction",
      "Growth"          : "Growth",
      "FreeWorkers"     : "Free workers",
      "full"            : "full",
      "empty"           : "empty",
      "NewVersion"      : "There is a newer version of "+scriptname+"\n%s\nClick on OK if you would like to update now",
      "Attack"          : "Attack",
      "DeleteConfirm"   : "Are you sure you want to delete %s?",
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
      "cityName"          : "Πόλη",
      "currentlyBuilding" : "Τρέχουσα Εργασία",
      "summary"           : "Συνοψη",
      "hide_settings"     : "Απόκρυψη ρυθμίσεων",
      "show_settings"     : "Εμφάνιση ρυθμίσεων",
      "scienceReport"     : "Science Report",
      "constructionLevel" : "Construction Level",
      "scientists"        : "Scientists",
      "production"        : "Production",
      "costs"             : "Costs",
      "goTo"              : "Go to",
      "armyReport"        : "Army Report",
      "resourcesReport"   : "Resources Report",
      "buildingsReport"   : "Buildings Report",
      "transportReport"   : "Transport Report",
      "m"                 : "m",
      "h"                 : "h",
      "day"               : "day",
      "hoursToFull"       : "hours to full",
      "hoursToEmpty"      : "hours to empty",
      "available"         : "available",
      "fullness"          : "fullness",
      "lastUpdate"        : "last update", 
      	  
      "appendDestination"               : "Append to usefull destinations",
      "removeDestination"               : "Remove from usefull destinations",
      "appendDestinationNameLabel"      : "Type a name for the destination link",
      "appendDestinationNameErrorLabel" : "The specified name is invalid, try again",
      "removeDestinationConfirmLabel"   : "Are you sure you want to remove the destination from the list?",

      "SETTINGS_RESET_DATA_CONFIRM" : "Are you sure you want to delete ALL stored data?",
      "SETTINGS_RESET_PLAYERS_DATA" : "Are you sure you want to delete ALL players data?",
      "PREMIUM_VIEW"                : "Premium view",
      "ALERT_SOUNDS"                : "Alert sounds",
      "ALERT_VOLUME"                : "Alert volume",
      "WARNING_VOLUME"              : "Warning volume",
      "AUTO_REFRESH"                : "Auto refresh",
      "AUTO_REFRESH_MIN_SECS"       : "Auto refresh min seconds",
      "AUTO_REFRESH_MAX_SECS"       : "Auto refresh max seconds",
      "TABLE_RESOURCES"             : "Show resources table",
      "TABLE_BUILDINGS"             : "Show buildings table",
      "TABLE_ARMYFLEET"             : "Show army and fleet table",
      "TABLE_RESEARCH"              : "Show research table",
      "TABLE_TRANSPORT"             : "Show transport table",
      "TECH_LETTERCHUTE"            : "Finish Letter Chute?",
      "TECH_PULLEY"                 : "Finish Pulley?",
      "TECH_GEOMETRY"               : "Finish Geometry?",
      "TECH_SPIRITLEVEL"            : "Finish Spirit Level?",
      "TABLE_PLAYERS"               : "Show players and cities table",
      "PLAYERS_NORMAL"              : "Show normal players",
      "PLAYERS_INACTIVITY"          : "Show inactivity players",
      "PLAYERS_BANNED"              : "Show banned players",
      "PLAYERS_VACATION"            : "Show vacation players",
      "PROGRESS_BAR_MODE"           : "Resource progress bar mode",

      "off"             : "off",
      "time"            : "based on remaining time",
      "percent"         : "based on fullness percentage",
      "LANGUAGE"        : "Language",
      "LANGUAGE_AUTO"   : "Automatic from server name",
      "ownAlly"         : "Own alliance (short name)",
      "friendlyAllies"  : "Friendly alliances (short names, separated by comma)",
      "hostileAllies"   : "Hostile alliances (short names, separated by comma)",
      "DEBUG_LOG"       : "Log debug messages",

      "Refresh_table"      : "Refresh table",
      "Reset_all_data"     : "Reset all data",
      "Reset_players_data" : "Reset players data",

      "Players"         : "Players",
      "Score"           : "Score",
      "StartCity"       : "Start City",
      "DestinationCity" : "Destination City",
      "Mission"         : "Mission",
      "FinishTime"      : "Finish Time",
      "FinishResources"	: "When finish mission, the start city of resources",
      "Point"           : "Point",
      "Loading"         : "Loading",
      "Wait"            : "Wait",
      "Remaining"       : "Remaining",
      "Upgrade"         : "Upgrade",
      "UpgradeConfirm"  : "Are you sure you want to upgrade building?",
      "Level"           : "Level",
      "Happiness"       : "Satisfaction",
      "Growth"          : "Growth",
      "FreeWorkers"     : "Free workers",
      "full"            : "full",
      "empty"           : "empty",
      "NewVersion"      : "There is a newer version of "+scriptname+"\n%s\nClick on OK if you would like to update now",
      "Attack"          : "Attack",
      "DeleteConfirm"   : "Are you sure you want to delete %s?",
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
      "cityName"          : "Citta",
      "currentlyBuilding" : "Costruzione in corso",
      "summary"           : "Sommario:",
      "hide_settings"     : "Hide settings",
      "show_settings"     : "Show settings", 
      "scienceReport"     : "Science Report",
      "constructionLevel" : "Construction Level",
      "scientists"        : "Scientists",
      "production"        : "Production",
      "costs"             : "Costs",
      "goTo"              : "Go to",
      "armyReport"        : "Army Report",
      "resourcesReport"   : "Resources Report",
      "buildingsReport"   : "Buildings Report",
      "transportReport"   : "Transport Report",
      "m"                 : "m",
      "h"                 : "h",
      "day"               : "day",
      "hoursToFull"       : "hours to full",
      "hoursToEmpty"      : "hours to empty",
      "available"         : "available",
      "fullness"          : "fullness",
      "lastUpdate"        : "last update", 
      	  
      "appendDestination"               : "Append to usefull destinations",
      "removeDestination"               : "Remove from usefull destinations",
      "appendDestinationNameLabel"      : "Type a name for the destination link",
      "appendDestinationNameErrorLabel" : "The specified name is invalid, try again",
      "removeDestinationConfirmLabel"   : "Are you sure you want to remove the destination from the list?",

      "SETTINGS_RESET_DATA_CONFIRM" : "Are you sure you want to delete ALL stored data?",
      "SETTINGS_RESET_PLAYERS_DATA" : "Are you sure you want to delete ALL players data?",
      "PREMIUM_VIEW"                : "Premium view",
      "ALERT_SOUNDS"                : "Alert sounds",
      "ALERT_VOLUME"                : "Alert volume",
      "WARNING_VOLUME"              : "Warning volume",
      "AUTO_REFRESH"                : "Auto refresh",
      "AUTO_REFRESH_MIN_SECS"       : "Auto refresh min seconds",
      "AUTO_REFRESH_MAX_SECS"       : "Auto refresh max seconds",
      "TABLE_RESOURCES"             : "Show resources table",
      "TABLE_BUILDINGS"             : "Show buildings table",
      "TABLE_ARMYFLEET"             : "Show army and fleet table",
      "TABLE_RESEARCH"              : "Show research table",
      "TABLE_TRANSPORT"             : "Show transport table",
      "TECH_LETTERCHUTE"            : "Finish Letter Chute?",
      "TECH_PULLEY"                 : "Finish Pulley?",
      "TECH_GEOMETRY"               : "Finish Geometry?",
      "TECH_SPIRITLEVEL"            : "Finish Spirit Level?",
      "TABLE_PLAYERS"               : "Show players and cities table",
      "PLAYERS_NORMAL"              : "Show normal players",
      "PLAYERS_INACTIVITY"          : "Show inactivity players",
      "PLAYERS_BANNED"              : "Show banned players",
      "PLAYERS_VACATION"            : "Show vacation players",
      "PROGRESS_BAR_MODE"           : "Resource progress bar mode",

      "off"             : "off",
      "time"            : "based on remaining time",
      "percent"         : "based on fullness percentage",
      "LANGUAGE"        : "Language",
      "LANGUAGE_AUTO"   : "Automatic from server name",
      "ownAlly"         : "Own alliance (short name)",
      "friendlyAllies"  : "Friendly alliances (short names, separated by comma)",
      "hostileAllies"   : "Hostile alliances (short names, separated by comma)",
      "DEBUG_LOG"       : "Log debug messages",

      "Refresh_table"      : "Refresh table",
      "Reset_all_data"     : "Reset all data",
      "Reset_players_data" : "Reset players data",

      "Players"         : "Players",
      "Score"           : "Score",
      "StartCity"       : "Start City",
      "DestinationCity" : "Destination City",
      "Mission"         : "Mission",
      "FinishTime"      : "Finish Time",
      "FinishResources"	: "When finish mission, the start city of resources",
      "Point"           : "Point",
      "Loading"         : "Loading",
      "Wait"            : "Wait",
      "Remaining"       : "Remaining",
      "Upgrade"         : "Upgrade",
      "UpgradeConfirm"  : "Are you sure you want to upgrade building?",
      "Level"           : "Level",
      "Happiness"       : "Satisfaction",
      "Growth"          : "Growth",
      "FreeWorkers"     : "Free workers",
      "full"            : "full",
      "empty"           : "empty",
      "NewVersion"      : "There is a newer version of "+scriptname+"\n%s\nClick on OK if you would like to update now",
      "Attack"          : "Attack",
      "DeleteConfirm"   : "Are you sure you want to delete %s?",
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
      "cityName"          : "Cidades",
      "currentlyBuilding" : "Em Construçao",
      "summary"           : "Sumário:",
      "hide_settings"     : "Ocultar Configuraçoes",
      "show_settings"     : "Ver Configuraçoes", 
      "scienceReport"     : "Science Report",
      "constructionLevel" : "Construction Level",
      "scientists"        : "Scientists",
      "production"        : "Production",
      "costs"             : "Costs",
      "goTo"              : "Go to",
      "armyReport"        : "Army Report",
      "resourcesReport"   : "Resources Report",
      "buildingsReport"   : "Buildings Report",
      "transportReport"   : "Transport Report",
      "m"                 : "m",
      "h"                 : "h",
      "day"               : "day",
      "hoursToFull"       : "hours to full",
      "hoursToEmpty"      : "hours to empty",
      "available"         : "available",
      "fullness"          : "fullness",
      "lastUpdate"        : "last update", 
      	  
      "appendDestination"               : "Append to usefull destinations",
      "removeDestination"               : "Remove from usefull destinations",
      "appendDestinationNameLabel"      : "Type a name for the destination link",
      "appendDestinationNameErrorLabel" : "The specified name is invalid, try again",
      "removeDestinationConfirmLabel"   : "Are you sure you want to remove the destination from the list?",

      "SETTINGS_RESET_DATA_CONFIRM" : "Are you sure you want to delete ALL stored data?",
      "SETTINGS_RESET_PLAYERS_DATA" : "Are you sure you want to delete ALL players data?",
      "PREMIUM_VIEW"                : "Premium view",
      "ALERT_SOUNDS"                : "Alert sounds",
      "ALERT_VOLUME"                : "Alert volume",
      "WARNING_VOLUME"              : "Warning volume",
      "AUTO_REFRESH"                : "Auto refresh",
      "AUTO_REFRESH_MIN_SECS"       : "Auto refresh min seconds",
      "AUTO_REFRESH_MAX_SECS"       : "Auto refresh max seconds",
      "TABLE_RESOURCES"             : "Show resources table",
      "TABLE_BUILDINGS"             : "Show buildings table",
      "TABLE_ARMYFLEET"             : "Show army and fleet table",
      "TABLE_RESEARCH"              : "Show research table",
      "TABLE_TRANSPORT"             : "Show transport table",
      "TECH_LETTERCHUTE"            : "Finish Letter Chute?",
      "TECH_PULLEY"                 : "Finish Pulley?",
      "TECH_GEOMETRY"               : "Finish Geometry?",
      "TECH_SPIRITLEVEL"            : "Finish Spirit Level?",
      "TABLE_PLAYERS"               : "Show players and cities table",
      "PLAYERS_NORMAL"              : "Show normal players",
      "PLAYERS_INACTIVITY"          : "Show inactivity players",
      "PLAYERS_BANNED"              : "Show banned players",
      "PLAYERS_VACATION"            : "Show vacation players",
      "PROGRESS_BAR_MODE"           : "Resource progress bar mode",

      "off"             : "off",
      "time"            : "based on remaining time",
      "percent"         : "based on fullness percentage",
      "LANGUAGE"        : "Language",
      "LANGUAGE_AUTO"   : "Automatic from server name",
      "ownAlly"         : "Own alliance (short name)",
      "friendlyAllies"  : "Friendly alliances (short names, separated by comma)",
      "hostileAllies"   : "Hostile alliances (short names, separated by comma)",
      "DEBUG_LOG"       : "Log debug messages",

      "Refresh_table"      : "Refresh table",
      "Reset_all_data"     : "Reset all data",
      "Reset_players_data" : "Reset players data",

      "Players"         : "Players",
      "Score"           : "Score",
      "StartCity"       : "Start City",
      "DestinationCity" : "Destination City",
      "Mission"         : "Mission",
      "FinishTime"      : "Finish Time",
      "FinishResources"	: "When finish mission, the start city of resources",
      "Point"           : "Point",
      "Loading"         : "Loading",
      "Wait"            : "Wait",
      "Remaining"       : "Remaining",
      "Upgrade"         : "Upgrade",
      "UpgradeConfirm"  : "Are you sure you want to upgrade building?",
      "Level"           : "Level",
      "Happiness"       : "Satisfaction",
      "Growth"          : "Growth",
      "FreeWorkers"     : "Free workers",
      "full"            : "full",
      "empty"           : "empty",
      "NewVersion"      : "There is a newer version of "+scriptname+"\n%s\nClick on OK if you would like to update now",
      "Attack"          : "Attack",
      "DeleteConfirm"   : "Are you sure you want to delete %s?",
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
      "cityName"          : "Nom ville",
      "currentlyBuilding" : "Construction en cours",
      "summary"           : "Total:",
      "hide_settings"     : "Hide settings",
      "show_settings"     : "Show settings", 
      "scienceReport"     : "Science Report",
      "constructionLevel" : "Construction Level",
      "scientists"        : "Scientists",
      "production"        : "Production",
      "costs"             : "Costs",
      "goTo"              : "Go to",
      "armyReport"        : "Army Report",
      "resourcesReport"   : "Resources Report",
      "buildingsReport"   : "Buildings Report",
      "transportReport"   : "Transport Report",
      "m"                 : "m",
      "h"                 : "h",
      "day"               : "day",
      "hoursToFull"       : "hours to full",
      "hoursToEmpty"      : "hours to empty",
      "available"         : "available",
      "fullness"          : "fullness",
      "lastUpdate"        : "last update", 
      	  
      "appendDestination"               : "Append to usefull destinations",
      "removeDestination"               : "Remove from usefull destinations",
      "appendDestinationNameLabel"      : "Type a name for the destination link",
      "appendDestinationNameErrorLabel" : "The specified name is invalid, try again",
      "removeDestinationConfirmLabel"   : "Are you sure you want to remove the destination from the list?",

      "SETTINGS_RESET_DATA_CONFIRM" : "Are you sure you want to delete ALL stored data?",
      "SETTINGS_RESET_PLAYERS_DATA" : "Are you sure you want to delete ALL players data?",
      "PREMIUM_VIEW"                : "Premium view",
      "ALERT_SOUNDS"                : "Alert sounds",
      "ALERT_VOLUME"                : "Alert volume",
      "WARNING_VOLUME"              : "Warning volume",
      "AUTO_REFRESH"                : "Auto refresh",
      "AUTO_REFRESH_MIN_SECS"       : "Auto refresh min seconds",
      "AUTO_REFRESH_MAX_SECS"       : "Auto refresh max seconds",
      "TABLE_RESOURCES"             : "Show resources table",
      "TABLE_BUILDINGS"             : "Show buildings table",
      "TABLE_ARMYFLEET"             : "Show army and fleet table",
      "TABLE_RESEARCH"              : "Show research table",
      "TABLE_TRANSPORT"             : "Show transport table",
      "TECH_LETTERCHUTE"            : "Finish Letter Chute?",
      "TECH_PULLEY"                 : "Finish Pulley?",
      "TECH_GEOMETRY"               : "Finish Geometry?",
      "TECH_SPIRITLEVEL"            : "Finish Spirit Level?",
      "TABLE_PLAYERS"               : "Show players and cities table",
      "PLAYERS_NORMAL"              : "Show normal players",
      "PLAYERS_INACTIVITY"          : "Show inactivity players",
      "PLAYERS_BANNED"              : "Show banned players",
      "PLAYERS_VACATION"            : "Show vacation players",
      "PROGRESS_BAR_MODE"           : "Resource progress bar mode",

      "off"             : "off",
      "time"            : "based on remaining time",
      "percent"         : "based on fullness percentage",
      "LANGUAGE"        : "Language",
      "LANGUAGE_AUTO"   : "Automatic from server name",
      "ownAlly"         : "Own alliance (short name)",
      "friendlyAllies"  : "Friendly alliances (short names, separated by comma)",
      "hostileAllies"   : "Hostile alliances (short names, separated by comma)",
      "DEBUG_LOG"       : "Log debug messages",

      "Refresh_table"      : "Refresh table",
      "Reset_all_data"     : "Reset all data",
      "Reset_players_data" : "Reset players data",

      "Players"         : "Players",
      "Score"           : "Score",
      "StartCity"       : "Start City",
      "DestinationCity" : "Destination City",
      "Mission"         : "Mission",
      "FinishTime"      : "Finish Time",
      "FinishResources"	: "When finish mission, the start city of resources",
      "Point"           : "Point",
      "Loading"         : "Loading",
      "Wait"            : "Wait",
      "Remaining"       : "Remaining",
      "Upgrade"         : "Upgrade",
      "UpgradeConfirm"  : "Are you sure you want to upgrade building?",
      "Level"           : "Level",
      "Happiness"       : "Satisfaction",
      "Growth"          : "Growth",
      "FreeWorkers"     : "Free workers",
      "full"            : "full",
      "empty"           : "empty",
      "NewVersion"      : "There is a newer version of "+scriptname+"\n%s\nClick on OK if you would like to update now",
      "Attack"          : "Attack",
      "DeleteConfirm"   : "Are you sure you want to delete %s?",
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
      "cityName"          : "Nazwa Miasta",
      "currentlyBuilding" : "Obecnie w budowie",
      "summary"           : "Podsumowanie:",
      "hide_settings"     : "Ukryj ustawienia",
      "show_settings"     : "Poka? ustawienia", 
      "scienceReport"     : "Science Report",
      "constructionLevel" : "Construction Level",
      "scientists"        : "Scientists",
      "production"        : "Production",
      "costs"             : "Costs",
      "goTo"              : "Go to",
      "armyReport"        : "Army Report",
      "resourcesReport"   : "Resources Report",
      "buildingsReport"   : "Buildings Report",
      "transportReport"   : "Transport Report",
      "m"                 : "m",
      "h"                 : "h",
      "day"               : "day",
      "hoursToFull"       : "hours to full",
      "hoursToEmpty"      : "hours to empty",
      "available"         : "available",
      "fullness"          : "fullness",
      "lastUpdate"        : "last update", 
      	  
      "appendDestination"               : "Append to usefull destinations",
      "removeDestination"               : "Remove from usefull destinations",
      "appendDestinationNameLabel"      : "Type a name for the destination link",
      "appendDestinationNameErrorLabel" : "The specified name is invalid, try again",
      "removeDestinationConfirmLabel"   : "Are you sure you want to remove the destination from the list?",

      "SETTINGS_RESET_DATA_CONFIRM" : "Are you sure you want to delete ALL stored data?",
      "SETTINGS_RESET_PLAYERS_DATA" : "Are you sure you want to delete ALL players data?",
      "PREMIUM_VIEW"                : "Premium view",
      "ALERT_SOUNDS"                : "Alert sounds",
      "ALERT_VOLUME"                : "Alert volume",
      "WARNING_VOLUME"              : "Warning volume",
      "AUTO_REFRESH"                : "Auto refresh",
      "AUTO_REFRESH_MIN_SECS"       : "Auto refresh min seconds",
      "AUTO_REFRESH_MAX_SECS"       : "Auto refresh max seconds",
      "TABLE_RESOURCES"             : "Show resources table",
      "TABLE_BUILDINGS"             : "Show buildings table",
      "TABLE_ARMYFLEET"             : "Show army and fleet table",
      "TABLE_RESEARCH"              : "Show research table",
      "TABLE_TRANSPORT"             : "Show transport table",
      "TECH_LETTERCHUTE"            : "Finish Letter Chute?",
      "TECH_PULLEY"                 : "Finish Pulley?",
      "TECH_GEOMETRY"               : "Finish Geometry?",
      "TECH_SPIRITLEVEL"            : "Finish Spirit Level?",
      "TABLE_PLAYERS"               : "Show players and cities table",
      "PLAYERS_NORMAL"              : "Show normal players",
      "PLAYERS_INACTIVITY"          : "Show inactivity players",
      "PLAYERS_BANNED"              : "Show banned players",
      "PLAYERS_VACATION"            : "Show vacation players",
      "PROGRESS_BAR_MODE"           : "Resource progress bar mode",

      "off"             : "off",
      "time"            : "based on remaining time",
      "percent"         : "based on fullness percentage",
      "LANGUAGE"        : "Language",
      "LANGUAGE_AUTO"   : "Automatic from server name",
      "ownAlly"         : "Own alliance (short name)",
      "friendlyAllies"  : "Friendly alliances (short names, separated by comma)",
      "hostileAllies"   : "Hostile alliances (short names, separated by comma)",
      "DEBUG_LOG"       : "Log debug messages",

      "Refresh_table"      : "Refresh table",
      "Reset_all_data"     : "Reset all data",
      "Reset_players_data" : "Reset players data",

      "Players"         : "Players",
      "Score"           : "Score",
      "StartCity"       : "Start City",
      "DestinationCity" : "Destination City",
      "Mission"         : "Mission",
      "FinishTime"      : "Finish Time",
      "FinishResources"	: "When finish mission, the start city of resources",
      "Point"           : "Point",
      "Loading"         : "Loading",
      "Wait"            : "Wait",
      "Remaining"       : "Remaining",
      "Upgrade"         : "Upgrade",
      "UpgradeConfirm"  : "Are you sure you want to upgrade building?",
      "Level"           : "Level",
      "Happiness"       : "Satisfaction",
      "Growth"          : "Growth",
      "FreeWorkers"     : "Free workers",
      "full"            : "full",
      "empty"           : "empty",
      "NewVersion"      : "There is a newer version of "+scriptname+"\n%s\nClick on OK if you would like to update now",
      "Attack"          : "Attack",
      "DeleteConfirm"   : "Are you sure you want to delete %s?",
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
      "cityName"          : "NumeleOra?ului",
      "currentlyBuilding" : "In construc?ie",
      "summary"           : "Total:",
      "hide_settings"     : "Inchide Setarile",
      "show_settings": "Vezi Setarile", 
      "scienceReport"     : "Science Report",
      "constructionLevel" : "Construction Level",
      "scientists"        : "Scientists",
      "production"        : "Production",
      "costs"             : "Costs",
      "goTo"              : "Go to",
      "armyReport"        : "Army Report",
      "resourcesReport"   : "Resources Report",
      "buildingsReport"   : "Buildings Report",
      "transportReport"   : "Transport Report",
      "m"                 : "m",
      "h"                 : "h",
      "day"               : "day",
      "hoursToFull"       : "hours to full",
      "hoursToEmpty"      : "hours to empty",
      "available"         : "available",
      "fullness"          : "fullness",
      "lastUpdate"        : "last update", 
      	  
      "appendDestination"               : "Append to usefull destinations",
      "removeDestination"               : "Remove from usefull destinations",
      "appendDestinationNameLabel"      : "Type a name for the destination link",
      "appendDestinationNameErrorLabel" : "The specified name is invalid, try again",
      "removeDestinationConfirmLabel"   : "Are you sure you want to remove the destination from the list?",

      "SETTINGS_RESET_DATA_CONFIRM" : "Are you sure you want to delete ALL stored data?",
      "SETTINGS_RESET_PLAYERS_DATA" : "Are you sure you want to delete ALL players data?",
      "PREMIUM_VIEW"                : "Premium view",
      "ALERT_SOUNDS"                : "Alert sounds",
      "ALERT_VOLUME"                : "Alert volume",
      "WARNING_VOLUME"              : "Warning volume",
      "AUTO_REFRESH"                : "Auto refresh",
      "AUTO_REFRESH_MIN_SECS"       : "Auto refresh min seconds",
      "AUTO_REFRESH_MAX_SECS"       : "Auto refresh max seconds",
      "TABLE_RESOURCES"             : "Show resources table",
      "TABLE_BUILDINGS"             : "Show buildings table",
      "TABLE_ARMYFLEET"             : "Show army and fleet table",
      "TABLE_RESEARCH"              : "Show research table",
      "TABLE_TRANSPORT"             : "Show transport table",
      "TECH_LETTERCHUTE"            : "Finish Letter Chute?",
      "TECH_PULLEY"                 : "Finish Pulley?",
      "TECH_GEOMETRY"               : "Finish Geometry?",
      "TECH_SPIRITLEVEL"            : "Finish Spirit Level?",
      "TABLE_PLAYERS"               : "Show players and cities table",
      "PLAYERS_NORMAL"              : "Show normal players",
      "PLAYERS_INACTIVITY"          : "Show inactivity players",
      "PLAYERS_BANNED"              : "Show banned players",
      "PLAYERS_VACATION"            : "Show vacation players",
      "PROGRESS_BAR_MODE"           : "Resource progress bar mode",

      "off"             : "off",
      "time"            : "based on remaining time",
      "percent"         : "based on fullness percentage",
      "LANGUAGE"        : "Language",
      "LANGUAGE_AUTO"   : "Automatic from server name",
      "ownAlly"         : "Own alliance (short name)",
      "friendlyAllies"  : "Friendly alliances (short names, separated by comma)",
      "hostileAllies"   : "Hostile alliances (short names, separated by comma)",
      "DEBUG_LOG"       : "Log debug messages",

      "Refresh_table"      : "Refresh table",
      "Reset_all_data"     : "Reset all data",
      "Reset_players_data" : "Reset players data",

      "Players"         : "Players",
      "Score"           : "Score",
      "StartCity"       : "Start City",
      "DestinationCity" : "Destination City",
      "Mission"         : "Mission",
      "FinishTime"      : "Finish Time",
      "FinishResources"	: "When finish mission, the start city of resources",
      "Point"           : "Point",
      "Loading"         : "Loading",
      "Wait"            : "Wait",
      "Remaining"       : "Remaining",
      "Upgrade"         : "Upgrade",
      "UpgradeConfirm"  : "Are you sure you want to upgrade building?",
      "Level"           : "Level",
      "Happiness"       : "Satisfaction",
      "Growth"          : "Growth",
      "FreeWorkers"     : "Free workers",
      "full"            : "full",
      "empty"           : "empty",
      "NewVersion"      : "There is a newer version of "+scriptname+"\n%s\nClick on OK if you would like to update now",
      "Attack"          : "Attack",
      "DeleteConfirm"   : "Are you sure you want to delete %s?",
    };
  } else if (language == "il") { // by MindTwister
    buildings = {
      "townHall"      : ["בניין העירייה", "עירייה"],
      "academy"       : ["אקדמיה", "אקדמיה"],
      "port"          : ["נמל סחר", "נמל"],
      "shipyard"      : ["מספנה", "מספנה"],
      "warehouse"     : ["מחסן", "מחסן"],
      "wall"          : ["חומת העיר", "חומה"],
      "tavern"        : ["טברנה", "טברנה"],
      "museum"        : ["מוזיאון", "מוזיאון"],
      "palace"        : ["ארמון", "ארמון"],
      "palaceColony"  : ["בית המושל", "מגורי המושל"],
      "embassy"       : ["שגרירות", "שגרירות"],
      "branchOffice"  : ["תחנת סחר", "שוק"],
      "safehouse"     : ["בית מרגלים", "מחבוא"],
      "barracks"      : ["מגורי החיילים", "מגורי החיילים"],
      "workshop-army" : ["בית מלאכה", "בית מלאכה"],
    };
    texts = {
      "cityName"          : "מידע על ערי המשתמש",
      "currentlyBuilding" : "כרגע בבנייה",
      "summary"           : "סך הכל:",
      "hide_settings"     : "החבא הגדרות",
      "show_settings"     : "הראה הגדרות",
      "scienceReport"     : "דוח החוקרים",
      "constructionLevel" : "שלב המבנה",
      "scientists"        : "חוקרים",
      "production"        : "ייצור",
      "costs"             : "עלויות",
      "goTo"              : "עבור אל ה",
      "armyReport"        : "דוח צבאי",
      "resourcesReport"   : "דוח משאבים",
      "buildingsReport"   : "דוח מבנים",
      "transportReport"   : "דוח משלוחים",
      "m"                 : "ד",
      "h"                 : "ש",
      "day"               : "יום",
      "hoursToFull"       : "שעות למליאה",
      "hoursToEmpty"      : "שעות להתרוקנות",
      "available"         : "נתון",
      "fullness"          : "מליאות",
      "lastUpdate"        : "עידכון אחרון", 
      	  
      "appendDestination"               : "הוסף ליעדים שימושיים",
      "removeDestination"               : "הסר מיעדים שימושיים",
      "appendDestinationNameLabel"      : "כתוב את שם היעד",
      "appendDestinationNameErrorLabel" : "שגיאה: השם אינו תקין",
      "removeDestinationConfirmLabel"   : "האם אתה בטוח שאתה רוצה למחוק את היעד?",

      "SETTINGS_RESET_DATA_CONFIRM" : "האם אתה בטוח שאתה רוצה למחוק את כל המיד?",
      "SETTINGS_RESET_PLAYERS_DATA" : "Are you sure you want to delete ALL players data?",
      "PREMIUM_VIEW"                : "מראה פרימיום",
      "ALERT_SOUNDS"                : "הדלק קולות",
      "ALERT_VOLUME"                : "עוצמת קול ההודעה",
      "WARNING_VOLUME"              : "עוצמת קול האזהרה",
      "AUTO_REFRESH"                : "ריענון אוטומטי",
      "AUTO_REFRESH_MIN_SECS"       : "ריענון אוטומטי במינימום זמן",
      "AUTO_REFRESH_MAX_SECS"       : "ריענון אוטומטי במקסימום זמן",
      "TABLE_RESOURCES"             : "הראה טבלת משאבים",
      "TABLE_BUILDINGS"             : "הראה טבלת מבנים",
      "TABLE_ARMYFLEET"             : "הראה טבלת ציים וצבאות",
      "TABLE_RESEARCH"              : "הראה טבלת חוקרים",
      "TABLE_TRANSPORT"             : "הראה טבלת משלוחים",
      "TECH_LETTERCHUTE"            : "צינור מכתב נחקר?",
      "TECH_PULLEY"                 : "מבדוק נחקר?",
      "TECH_GEOMETRY"               : "גיאומטריה נחקרה?",
      "TECH_SPIRITLEVEL"            : "שלב רוחני נחקר?",
      "TABLE_PLAYERS"               : "הראה טבלת שחקנים וערים",	  
      "PLAYERS_NORMAL"              : "הראה שחקנים רגילים",
      "PLAYERS_INACTIVITY"          : "הראה שחקנים לא פעילים",
      "PLAYERS_BANNED"              : "הראה שחקנים שקיבלו באן",
      "PLAYERS_VACATION"            : "הראה שחקנים שבחופשה",
      "PROGRESS_BAR_MODE"           : "סגנון מד המשאבים",

      "off"             : "מכובה",
      "time"            : "מבוסס על זמן נותר",
      "percent"         : "מבוסס על מליאה",
      "LANGUAGE"        : "שפה",
      "LANGUAGE_AUTO"   : "אוטומטי",
      "ownAlly"         : "שם הברית (תגית)",
      "friendlyAllies"  : "בריתות בשלום (תגיות, מפורדות בפסיק)",
      "hostileAllies"   : "בריתות במלחמה (תגיות, מופרדות בפסיק)",
      "DEBUG_LOG"       : "הודעות תיקון",

      "Refresh_table"      : "רענן טבלה",
      "Reset_all_data"     : "אפס מידע",
      "Reset_players_data" : "אפס מידע של שחקנים",

      "Players"         : "שחקנים",
      "Score"           : "ניקוד",
      "StartCity"       : "עיר התחלה",
      "DestinationCity" : "עיר יעד",
      "Mission"         : "משימה",
      "FinishTime"      : "זמן סיום",
      "FinishResources"	: "בסיום המשימה יהיו לך",
      "Point"           : "נקודות",
      "Loading"         : "טוען",
      "Wait"            : "חכה",
      "Remaining"       : "נותרו",
      "Upgrade"         : "שדרג לרמה ",
      "UpgradeConfirm"  : "האם אתה בטוח שאתה רוצה לשדרג את המבנה?",
      "Level"           : "רמה",
      "Happiness"       : "שביעות רצון",
      "Growth"          : "צמיחה",
      "FreeWorkers"     : "עובדים פנויים",
      "full"            : "מלא",
      "empty"           : "ריק",
      "NewVersion"      : "יש גרסא חדשה של הסקריפט "+scriptname+"\n%s\nלחץ על אישור בכדי לעדכן",
      "Attack"          : "התקף",
      "DeleteConfirm"   : "האם אתה בטוח שאתה רוצה להסיר %s?",
    };
  } else if (language == "ru") { // by Гуляка
    buildings = {
          "townHall"      : ["Ратуша", "Ратуша"],
          "academy"       : ["Академия", "Академия"],
          "port"          : ["Порт", "Порт"],
          "shipyard"      : ["Верфь", "Верфь"],
          "warehouse"     : ["Склад", "Склад"],
          "wall"          : ["Стена", "Стена"],
          "tavern"        : ["Таверна", "Таверна"],
          "museum"        : ["Музей", "Музей"],
          "palace"        : ["Дворец", "Дворец"],
          "palaceColony"  : ["Резиденция", "Резиденция"],
          "embassy"       : ["Посольство", "Посольство"],
          "branchOffice"  : ["Рынок", "Рынок"],
          "safehouse"     : ["Укрытие", "Укрытие"],
          "barracks"      : ["Казарма", "Казарма"],
          "workshop-army" : ["Мастерская", "Мастерская"],
    };
    texts = {
      "cityName"          : "Город",
      "currentlyBuilding" : "В строительстве",
      "summary"           : "Итого:",
      "hide_settings"     : "Скрыть настройки",
      "show_settings"     : "Показать настройки",
      "scienceReport"     : "Наука",
      "constructionLevel" : "Уровень академии",
      "scientists"        : "Ученые",
      "production"        : "Производство",
      "costs"             : "Затраты",
      "goTo"              : "Перейти к ",
      "armyReport"        : "Войска",
      "resourcesReport"   : "Ресурсы",
      "buildingsReport"   : "Постройки",
      "transportReport"   : "Транспорты",
      "h"                 : "ч",
      "day"               : "день",
      "hoursToFull"       : "Время до заполнения",
      "hoursToEmpty"      : "Время до опустошения",
      "available"         : "Доступно",
      "fullness"          : "Заполнение",
      "lastUpdate"        : "Последнее обновление",

      "appendDestination"               : "Добавить к полезным назначения",
      "removeDestination"               : "Удалить из полезных назначений",
      "appendDestinationNameLabel"      : "Введите имя для назначения ссылке",
      "appendDestinationNameErrorLabel" : "Указано недопустимое имя, попробуйте еще раз",
      "removeDestinationConfirmLabel"   : "Вы уверены, что хотите удалить адрес из списка?",

      "SETTINGS_RESET_DATA_CONFIRM" : "Вы действительно хотите удалить все хранящиеся данные?",
      "SETTINGS_RESET_PLAYERS_DATA" : "Вы уверены, что хотите удалить все данные игроков?",
      "PREMIUM_VIEW"                : "Премиум вид",
      "ALERT_SOUNDS"                : "Звуковой сиграл",
      "ALERT_VOLUME"                : "Громкость",
      "WARNING_VOLUME"              : "Громкость тревоги",
      "AUTO_REFRESH"                : "Авто_обновление",
      "AUTO_REFRESH_MIN_SECS"       : "Авто_обновление секунд минимум",
      "AUTO_REFRESH_MAX_SECS"       : "Авто_обновление скеунд максимум",
      "TABLE_RESOURCES"             : "Показывать таблицу ресурсов",
      "TABLE_BUILDINGS"             : "Показывать таблицу зданий",
      "TABLE_ARMYFLEET"             : "Показывать таблицу армии",
      "TABLE_RESEARCH"              : "Показывать таблицу исследований",
      "TABLE_TRANSPORT"             : "Показывать таблицу транспортов",
      "TECH_LETTERCHUTE"            : "Почтовые трубы",
      "TECH_PULLEY"                 : "Шкив",
      "TECH_GEOMETRY"               : "Геометрия",
      "TECH_SPIRITLEVEL"            : "Водяной уровень",
      "TABLE_PLAYERS"               : "Показывать таблицу игроков и городов",
      "PLAYERS_NORMAL"              : "Показывать нормальный игроков",
      "PLAYERS_INACTIVITY"          : "Показывать бездействие игроков",
      "PLAYERS_BANNED"              : "Показывать запретили игроков",
      "PLAYERS_VACATION"            : "Показывать отпуск игроков",
      "PROGRESS_BAR_MODE"           : "Шкала ресурсов в виде",

      "off"             : "Выключено",
      "time"            : "Основано на оставшемся времени",
      "percent"         : "Основано на доле наполнения",
      "LANGUAGE"        : "Язык",
      "LANGUAGE_AUTO"   : "Автоматически, от имени сервера",
      "ownAlly"         : "Собственный альянс (краткое название)",
      "friendlyAllies"  : "дружественные альянсы (короткие имена, разделенные запятыми)",
      "hostileAllies"   : "враждебные альянсы (короткие имена, разделенные запятыми)",
      "DEBUG_LOG"       : "Журнал отладки сообщений",

      "Refresh_table"      : "Обновить настройки",
      "Reset_all_data"     : "Сбросить все настройки",
      "Reset_players_data" : "Сбросить игроков данных",
		  
      "Players"         : "Игроки",
      "Score"           : "Очки",
      "StartCity"       : "Старт из города",
      "DestinationCity" : "Город назначения",
      "Mission"         : "Миссия",
      "FinishTime"      : "Время окончания",
      "FinishResources" : "Когда завершить миссию, начало городу ресурсов",
      "Point"           : "Точка",
      "Loading"         : "Загрузка",
      "Wait"            : "Подождите",
      "Remaining"       : "Оставшееся время",
      "Upgrade"         : "Обновить",
      "UpgradeConfirm"  : "Вы уверены, что хотите обновить здание?",
      "Level"           : "Уровень",
      "Happiness"       : "Удовлетворенность",
      "Growth"          : "Рост",
      "FreeWorkers"     : "Бесплатно работников",
      "full"            : "Полный",
      "empty"           : "Пустой",
      "NewVersion"      : "There is a newer version of "+scriptname+"\n%s\nClick on OK if you would like to update now",
      "Attack"          : "Боевые",
      "DeleteConfirm"   : "Are you sure you want to delete %s?",
    };
  } else {   // other
    buildings = {
      "townHall"      : ["Town Hall", "Town Hall"],
      "academy"       : ["Academy", "Academy"],
      "port"          : ["Trading Port", "Trading Port"],
      "shipyard"      : ["Shipyard", "Shipyard"],
      "warehouse"     : ["Warehouse", "Warehouse"],
      "wall"          : ["Wall", "Wall"],
      "tavern"        : ["Tavern", "Tavern"],
      "museum"        : ["Museum", "Museum"],
      "palace"        : ["Palace", "Palace"],
      "palaceColony"  : ["Governor's Residence", "Governor"],
      "embassy"       : ["Embassy", "Embassy"],
      "branchOffice"  : ["Trading Post", "Trading Post"],
      "safehouse"     : ["Hideout", "Hideout"],
      "barracks"      : ["Barracks", "Barracks"],
      "workshop-army" : ["Workshop", "Workshop"],
    };
    texts = {
      "cityName"          : "City name",
      "currentlyBuilding" : "Currently building",
      "summary"           : "Summary:",
      "hide_settings"     : "Hide settings",
      "show_settings"     : "Show settings",
      "scienceReport"     : "Science Report",
      "constructionLevel" : "Construction Level",
      "scientists"        : "Scientists",
      "production"        : "Production",
      "costs"             : "Costs",
      "goTo"              : "Go to",
      "armyReport"        : "Army Report",
      "resourcesReport"   : "Resources Report",
      "buildingsReport"   : "Buildings Report",
      "transportReport"   : "Transport Report",
      "m"                 : "m",
      "h"                 : "h",
      "day"               : "day",
      "hoursToFull"       : "hours to full",
      "hoursToEmpty"      : "hours to empty",
      "available"         : "available",
      "fullness"          : "fullness",
      "lastUpdate"        : "last update", 
      	  
      "appendDestination"               : "Append to usefull destinations",
      "removeDestination"               : "Remove from usefull destinations",
      "appendDestinationNameLabel"      : "Type a name for the destination link",
      "appendDestinationNameErrorLabel" : "The specified name is invalid, try again",
      "removeDestinationConfirmLabel"   : "Are you sure you want to remove the destination from the list?",

      "SETTINGS_RESET_DATA_CONFIRM" : "Are you sure you want to delete ALL stored data?",
      "SETTINGS_RESET_PLAYERS_DATA" : "Are you sure you want to delete ALL players data?",
      "PREMIUM_VIEW"                : "Premium view",
      "ALERT_SOUNDS"                : "Alert sounds",
      "ALERT_VOLUME"                : "Alert volume",
      "WARNING_VOLUME"              : "Warning volume",
      "AUTO_REFRESH"                : "Auto refresh",
      "AUTO_REFRESH_MIN_SECS"       : "Auto refresh min seconds",
      "AUTO_REFRESH_MAX_SECS"       : "Auto refresh max seconds",
      "TABLE_RESOURCES"             : "Show resources table",
      "TABLE_BUILDINGS"             : "Show buildings table",
      "TABLE_ARMYFLEET"             : "Show army and fleet table",
      "TABLE_RESEARCH"              : "Show research table",
      "TABLE_TRANSPORT"             : "Show transport table",
      "TECH_LETTERCHUTE"            : "Finish Letter Chute?",
      "TECH_PULLEY"                 : "Finish Pulley?",
      "TECH_GEOMETRY"               : "Finish Geometry?",
      "TECH_SPIRITLEVEL"            : "Finish Spirit Level?",
      "TABLE_PLAYERS"               : "Show players and cities table",
      "PLAYERS_NORMAL"              : "Show normal players",
      "PLAYERS_INACTIVITY"          : "Show inactivity players",
      "PLAYERS_BANNED"              : "Show banned players",
      "PLAYERS_VACATION"            : "Show vacation players",
      "PROGRESS_BAR_MODE"           : "Resource progress bar mode",

      "off"             : "off",
      "time"            : "based on remaining time",
      "percent"         : "based on fullness percentage",
      "LANGUAGE"        : "Language",
      "LANGUAGE_AUTO"   : "Automatic from server name",
      "ownAlly"         : "Own alliance (short name)",
      "friendlyAllies"  : "Friendly alliances (short names, separated by comma)",
      "hostileAllies"   : "Hostile alliances (short names, separated by comma)",
      "DEBUG_LOG"       : "Log debug messages",

      "Refresh_table"      : "Refresh table",
      "Reset_all_data"     : "Reset all data",
      "Reset_players_data" : "Reset players data",

      "Players"         : "Players",
      "Score"           : "Score",
      "StartCity"       : "Start City",
      "DestinationCity" : "Destination City",
      "Mission"         : "Mission",
      "FinishTime"      : "Finish Time",
      "FinishResources"	: "When finish mission, the start city of resources",
      "Point"           : "Point",
      "Loading"         : "Loading",
      "Wait"            : "Wait",
      "Remaining"       : "Remaining",
      "Upgrade"         : "Upgrade",
      "UpgradeConfirm"  : "Are you sure you want to upgrade building?",
      "Level"           : "Level",
      "Happiness"       : "Satisfaction",
      "Growth"          : "Growth",
      "FreeWorkers"     : "Free workers",
      "full"            : "full",
      "empty"           : "empty",
      "NewVersion"      : "There is a newer version of "+scriptname+"\n%s\nClick on OK if you would like to update now",
      "Attack"          : "Attack",
      "DeleteConfirm"   : "Are you sure you want to delete %s?",
    };
  }
}

getConfig();
getPlayers();
setLanguage();
getLocalizedTexts();

VersionUpdate();

var ALERT_SOUNDS = getCfgValue("ALERT_SOUNDS", false); //play sound when you are under attack, or you have undreaded message
var AUTO_REFRESH = getCfgValue("AUTO_REFRESH", false); //automatically refreshes browser window (useful when ALERT_SOUNDS is true)
var DEBUG_LOG    = getCfgValue("DEBUG_LOG", false); //log debug messages to console
var PROGRESS_BAR_MODE; //have to be a global variable
var PREMIUM_VIEW = getCfgValue("PREMIUM_VIEW", false);

var alertSound     = "http://simplythebest.net/sounds/WAV/events_WAV/event_WAV_files/alarm_3.wav";
var warningSound   = "http://www.ilovewavs.com/Effects/Beeps/FlyinOff.wav";
var WARNING_VOLUME = getCfgValue("WARNING_VOLUME", "50");   // "0" = silent "100" = full volume
var ALERT_VOLUME   = getCfgValue("ALERT_VOLUME", "100");   // "0" = silent "100" = full volume

var MIN = getCfgValue("AUTO_REFRESH_MIN_SECS", 300);  // seconds
var MAX = getCfgValue("AUTO_REFRESH_MAX_SECS", 600);  // seconds

var TECH_LETTERCHUTE = getCfgValue("TECH_LETTERCHUTE", false);
var TECH_PULLEY = getCfgValue("TECH_PULLEY", false);
var TECH_GEOMETRY = getCfgValue("TECH_GEOMETRY", false);
var TECH_SPIRITLEVEL = getCfgValue("TECH_SPIRITLEVEL", false);

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
	var city_id = getSelectCity();
	var strurl = postUrl("?action=header&function=changeCurrentCity&oldView=city&view=city&cityId="+ city_id);
	var timeID = setTimeout("location.href= '"+strurl+"'", getRefreshTime());
}

if (PREMIUM_VIEW) {
  GM_addStyle("#advisors #advCities a.normal             {background-image:url('/skin/rtl/layout/advisors/mayor_premium.gif');}");
  GM_addStyle("#advisors #advCities a.normalactive       {background-image:url('/skin/rtl/layout/advisors/mayor_premium_active.gif');}");
  GM_addStyle("#advisors #advMilitary a.normal           {background-image:url('/skin/rtl/layout/advisors/general_premium.gif');}");
  GM_addStyle("#advisors #advMilitary a.normalactive     {background-image:url('/skin/rtl/layout/advisors/general_premium_active.gif');}");
  GM_addStyle("#advisors #advMilitary a.normalalert      {background-image:url('/skin/rtl/layout/advisors/general_premium_alert.gif');}");
  GM_addStyle("#advisors #advResearch a.normal           {background-image:url('/skin/rtl/layout/advisors/scientist_premium.gif');}");
  GM_addStyle("#advisors #advResearch a.normalactive     {background-image:url('/skin/rtl/layout/advisors/scientist_premium_active.gif');}");
  GM_addStyle("#advisors #advDiplomacy a.normal          {background-image:url('/skin/rtl/layout/advisors/diplomat_premium.gif');}");
  GM_addStyle("#advisors #advDiplomacy a.normalactive    {background-image:url('/skin/rtl/layout/advisors/diplomat_premium_active.gif');}");
  GM_addStyle("#GF_toolbar a							{margin:0 12px; line-height:24px; font:bold 11px Arial, Helvetica, sans-serif; color:#FFFFFF}");  
}


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

var island_id = island_id = getNodeValue("id('breadcrumbs')//a[@class='island']");
if ( island_id == undefined || island_id == 0 )
  island_id = getNodeValue("id('breadcrumbs')//span[@class='island']");
if ( island_id == undefined || island_id == 0 ) {
  if (/(\[[0-9]+:[0-9]+\])/.exec(getNode("id('breadcrumbs')").innerHTML) != null)
    island_id = RegExp.$1;
}
if ( island_id == undefined || island_id == 0 ) {
  var node = getNode("id('breadcrumbs')");
  if (node!=null) {
  	node = node.getElementsByTagName("a")[0];
  	if (node!=null) {
  	  var strhref = node.getAttribute("href");
  	  if (/islandX=([0-9]+).+islandY=([0-9]+)/.exec(strhref) != null)
  	  	  island_id = "["+RegExp.$1+":"+RegExp.$2+"]";
  	}
  }
}
if ( island_id == undefined || island_id == 0 ) {
  var idx = $("citySelect").selectedIndex;
  island_id = $x("//option", $("citySelect"))[idx].title;
}

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

function getUnitsShipsIndexesR() {
	var ret = [];
	for(key in unitsAndShipsIndexes) {
		ret[unitsAndShipsIndexes[key]] = key;
	}
	return ret;
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
    s = s.substring(0, i) + "," + s.substring(i);
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
function digProducedResources(res, strroot) {
  if (strroot == undefined) strroot = "";
  var scripts = xpath(strroot+"//script");
  var nScript = scripts.snapshotItem(scripts.snapshotLength - 1);
  if (strroot == "") {
    var view = urlParse("view");
    if (view == "academy" || view == "resource" || view == "tradegood" || view == "deployment") {
	  nScript = scripts.snapshotItem(scripts.snapshotLength - 2);
    }
  }
  var sCode = nScript.innerHTML;
  var aCodeLines = sCode.split(';');
  if (aCodeLines.length < 24)
    return;
  var sWood = aCodeLines[24].substring(aCodeLines[24].indexOf('(')+2,aCodeLines[24].indexOf(')')-1);

  var startResourcesDelta = /production: *([0-9.]+)/.exec(sWood);
  if (startResourcesDelta != null) {
    startResourcesDelta = parseFloat(RegExp.$1) * 3600;
  } else {
    startResourcesDelta = 0;
  }
  var sTradeGood = aCodeLines[27].substring(aCodeLines[27].indexOf('(')+2,aCodeLines[27].indexOf(')')-1);
  var startTradegoodDelta = /production: *([0-9.]+)/.exec(sTradeGood);
  if (startTradegoodDelta != null) {
    startTradegoodDelta = parseFloat(RegExp.$1) * 3600;
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
function TimeResourceCounter() {
  var currenttime = new Date().getTime();
  var counters = xpath("//font[contains(@id, 'ResourceCounter')]");
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
function createSendSpyLink(id, island_id) {
	var href = "?view=sendSpy&destinationCityId="+id+"&islandId="+island_id;
	return createLink(createImg("/skin/layout/icon-mission.gif", "", 16), href, "")
}
function createPlunderLink(id) {
	var href = "?view=plunder&destinationCityId="+id;
	return createLink(createImg("/skin/actions/plunder.gif", "", 16), href, "")
}
function createBlockadeLink(id) {
	var href = "?view=blockade&destinationCityId="+id;
	return createLink(createImg("/skin/actions/blockade.gif", "", 16), href, "")
}
function createDiplomacyLink(city_id, id) {
	var href = "?view=sendMessage&with="+city_id+"&destinationCityId="+id+"&oldView=island";
	return createLink(createImg("/skin/actions/diplomacy.gif", "", 16), href, "")
}
function createImg(src, att, height, width) {
	if (height == undefined) height = "";
	if (height != "") height = "height='"+height+"' ";
	if (width == undefined) width = "";
	if (width != "") width = "width='"+width+"' ";
	if (att == undefined) att = "";
	return "<img src='"+src+"' " +height+width+att+">";
}
function createCounter(startTime, startAmount, factPerHour, showTooltip, maxCapacity, plusText) {
  intfactPerHour = Math.round(factPerHour);
  var dailyFact = Math.round(24 * factPerHour);
  var tooltip = "";
  if ((showTooltip == true) && (dailyFact != 0)) {
    tooltip = mynumberformat(intfactPerHour, true)+" / "+texts["h"]+", "+mynumberformat(dailyFact, true)+" / "+texts["day"];
  }
  var res;
  if (factPerHour != 0) {
    res = "<font id='ResourceCounter' lang='"+startTime+","+startAmount+","+factPerHour+"'>x</font>";
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
      remaining = "<br>"+texts["Remaining"]+" "+floatFormat(remhour, 1) + " " + texts["hoursToFull"];
    } else if (factPerHour < 0) {
      remaining = "<br>"+texts["Remaining"]+" "+floatFormat(curres / -factPerHour, 1) + " " + texts["hoursToEmpty"];
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
            "<tr class='myPercent' "+createTooltipAttribute(mynumberformat(maxCapacity)+ " "+texts["available"]+"<br>" + perc+"% "+texts["fullness"] + remaining)+">"+
            "<td width='"+perc+"%' class='"+cl+"'></td>"+
            "<td width='"+(100-perc)+"%' class='myPercentRemaining'></td>"+
            "</tr>"+
            "</table>";
  }
  return res;
}
function twodigit(val) {
  val = val%100;
  if(val < 10) {
    return "0"+val;
  }
  return val;
}
function TimeCounter() {
  var currenttime = new Date().getTime();
  var cs = xpath("//font[contains(@id, 'FinishCounter')]");
 
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
      if (b || hday > 0) { s += hday+texts["day"]+" "; b = true; }
      b = true; //az óra, perc, mp mindig látsszon
      if (b || hhor > 0) { s += hhor+":"; b = true; }
      if (b || hmin > 0) { s += twodigit(hmin)+":"; b = true; }
      if (b || hsec > 0) { s += twodigit(hsec)+""; b = true; }
      c.innerHTML = s;
    } else {
      c.innerHTML = "-";
    }
  }
}
function getDuration(timeStr) {

	var s = strToDatetime(timeStr);
	var serverTime = strToDatetime(document.getElementById('servertime').innerHTML);
	var d = s - serverTime;
	if(d < -1)
		d += 86400 * 1000;
	return d;
}

function getLocalTime(milliseconds) {
	var currenttime = new Date().getTime();
	return currenttime + milliseconds;
}
function createTimeCounter(enddate) {
  if (enddate != undefined && enddate != "") {
    var s = smartDateFormat(enddate);
    return createTooltip("<font id='FinishCounter' lang='"+enddate+"' class='time_counter'></font>", s);
  }
  return "";
}
function createProd(prodPerHour, extraTooltip) {
  if (""+prodPerHour == "" || ""+prodPerHour == "0" || prodPerHour == undefined || ""+prodPerHour == "NaN") {
    return "";
  }
  var tooltip = mynumberformat(Math.round(24 * prodPerHour), true)+" / "+texts["day"];
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
function url(query) {
  return (location.search || "").replace(/([#?].*)?$/, query||"");
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
function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}
function postWrap(url) {
  var get = urlParse(null, url);
  if (!get.action) return url;
  var cookie = $X('id("changeCityForm")//input[@name="actionRequest"]');
  if (cookie)
    get.actionRequest = cookie.value;
  return postUrlTo(url.replace(/\?.*|$/, "/index.php"), get);
}
function postUrlTo(url, postvars) {
  if (!/^http/i.test( url ))
    url = location.protocol +"//"+ location.host + url;
  var form = <form method="POST" action={ url }/>;
  for (var v in postvars)
    form.* += <input type="hidden" name={ v } value={ postvars[v] }/>;
  var body = <body onload="document.forms[0].submit()">{ form }</body>;
  return "data:text/html,"+ encodeURIComponent(body.toXMLString());
}
function createLink(text, href, attrs) {
  return "<a href=\""+href+"\" "+attrs+">"+text+"</a>";
}
function postUrl(strurl) {
	return postWrap(url(strurl));
}
function createLinkToCity(text, city_id, city_index) {
  strurl = "?action=header&function=changeCurrentCity&oldView=city&view=city&cityId="+ city_id;
  return createLink(text, postUrl(strurl), "");
}
function createLinkToForeignCity(text, island_id, city_id) {
  return createLink(text, "?view=island&id="+island_id+"&selectCity="+city_id);
}
function createLinkToResource(text, island_id, city_id, city_index) {
  if (island_id != undefined && island_id != "") {
    return createLink(text, "?action=header&function=changeCurrentCity&oldView=tradegood&view=resource&type=resource&id="+island_id+"&cityId="+city_id, "class='AutoChange' cityid='"+city_id+"'");
  }
  return text;
}
function createLinkToTradegoodCond(condition, text, island_id, city_id, city_index) {
  if (condition == true && island_id != undefined && island_id != "") {
    return createLink(text, "?action=header&function=changeCurrentCity&oldView=tradegood&view=tradegood&type=tradegood&id="+island_id+"&cityId="+city_id, "class='AutoChange' cityid='"+city_id+"'");
  }
  return text;
}
function strToDatetime(str) {
  var d;
  if (/([0-9][0-9][0-9][0-9])\.([0-9][0-9])\.([0-9][0-9])[^0-9]*([0-9]+)\:([0-9]+)\:([0-9]+)/.exec(str) != null) {
//    d = new Date(RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6);
      d = new Date(RegExp.$1, getIntValue(RegExp.$2)-1, RegExp.$3, RegExp.$4, RegExp.$5, RegExp.$6);
  } else if (/([0-9][0-9])\.([0-9][0-9])\.([0-9][0-9][0-9][0-9])[^0-9]*([0-9]+)\:([0-9]+)\:([0-9]+)/.exec(str) != null) {
//    d = new Date(RegExp.$3, RegExp.$2, RegExp.$1, RegExp.$4, RegExp.$5, RegExp.$6);
    d = new Date(RegExp.$3, getIntValue(RegExp.$2)-1, RegExp.$1, RegExp.$4, RegExp.$5, RegExp.$6);
  } else if (/([0-9]+)\:([0-9]+)\:([0-9]+)/.exec(str) != null) {
  	var serverTime = document.getElementById('servertime').innerHTML;
  	//add current date to time part
  	str = serverTime.split(' ')[0] + " " + str;
		return strToDatetime(str);
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
    return "&#8734; "+texts["h"];
  }
  var time = Number(startTime);
  while (population < maxPopulation) {
    var t = getOnePeopleGrowthTime(happiness);
    if (t == "NaN") {
      return "&#8734; "+texts["h"];
    }
    time += t;
    population++;
    happiness--;
  }
  return floatFormat((time - Number(startTime)) / 1000 / 3600, 1) + " " + texts["h"];
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
  var t = twodigit(s.getHours())+":"+twodigit(s.getMinutes())+":"+twodigit(s.getSeconds());
  if (now.getYear() != s.getYear() || now.getMonth() != s.getMonth() || now.getDate() != s.getDate()) {
    t = s.getFullYear()+"/"+twodigit(s.getMonth()+1)+"/"+twodigit(s.getDate())+" "+ t
  }
  if (showElapsedTime) {
    t += elapsedTimeSeparator;
    var d = (now.getTime() - s.getTime()) / 1000;
    if (d < 3600) {
      t += " " + Math.floor(d / 60) + texts["m"];
    } else {
      if (d >= 86400) {
        t += " " + Math.floor(d / 86400) + texts["day"];
      }
      t += " " + floatFormat((d % 86400) / 3600, 1) + texts["h"];
    }
  }
  return t;
}

function createLastUpdateAsTooltip(content, actionsName, time) {
  return createTooltip(content, actionsName+" ("+texts["lastUpdate"]+" "+smartDateFormat(time, true)+")");
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
  this.actions = 0;
  this.population = 0;
  this.freeworkers = 0;
  this.buildings = {};
  this.units = {};
}

log("time0: "+(new Date().getTime() - _startTime)+" msec");

var res = getCity(city_id);

//aktuális nyersanyag mennyisége a városban
res.wood   = getIntValue(getNodeValue("id('value_wood')"));
res.wine   = getIntValue(getNodeValue("id('value_wine')"));
res.marble = getIntValue(getNodeValue("id('value_marble')"));
res.glass  = getIntValue(getNodeValue("id('value_crystal')"));
res.sulfur = getIntValue(getNodeValue("id('value_sulfur')"));
digProducedResources(res);
//lakosok száma a városban
var strpopulation = getNodeValue("//span[@id='value_inhabitants']");
if (/\(([0-9,.]+)/.exec(strpopulation) != null) {
  res.population = getIntValue(strpopulation.match(/\(([\d,.]+)/)[1]);
  res.freeworkers = getIntValue(strpopulation.match(/^[\d,.]+/)[0]);
} else {
  res.population = 0;
}
res.actions = getNodeValue("//span[@id='value_maxActionPoints']");
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
      res.buildings[name].link = node.href;
      res.buildings[name].position = /position=([0-9]+)/.exec(node.href)[1];
    }
  }
  //townhall population total and growth
  if (/view=townHall/.test(document.URL)) {
    //ennyivel több a kapacitás, mint a városháza szintje alapján lenne
    res.buildings["townHall"].bonusspace = Number(getNodeValue("//span[@class='value total']", "0")) - townHallSpaces[getArrValue(res.buildings["townHall"], "level")];
    log("bonusspace:"+res.buildings["townHall"].bonusspace);
    //ennyi az elégedettség a populációt nem számítva
    res.buildings["townHall"].happiness  = Number(getNodeValue("//div[contains(@class, 'happiness ')]/div[@class='value']", "0")) + res.population;
    log("happiness:"+res.buildings["townHall"].happiness);
  }
  //military-army and fleet unit counts
  if (/view=cityMilitary-(army|fleet)/.exec(document.URL) != null) {
    var k = RegExp.$1;
    var tab = (k == "army") ? "tab1" : "tab2";
    var idx = (k == "fleet") ? 13 : 0;
    if (config["unitnames"] == undefined) {
      config["unitnames"] = {};
    }
    if (res.units == undefined) {
      res.units = {};
    }
    var names = xpath("//div[@id='"+tab+"']//table/tbody/tr/th");
    var counts = xpath("//div[@id='"+tab+"']//table/tbody/tr[@class='count']/td");
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
        n = n.replace(/\([0-9]+\/[0-9]+\)/g, "");
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
  if(/view=academy/.test(document.URL)||/index\.php/.test(document.URL)) {

  	function storeResearchStatic() {
  		 try {
  		 	var scientists = document.getElementById("inputScientists").value;

        var n = document.getElementById("valueResearch").innerHTML;
        n = n.substring(1, n.length);
        var city_id = getNode_value("//form[@id='setScientists']//input[@type='hidden' and @name='cityId']");
        var city = getCity(city_id);
        city.buildings["academy"].scientists = scientists;
        city.buildings["academy"].efficiency = n;
        setVar("config", serialize(config));
      } catch (e) {
        log("academy: "+e);
      }
  	}
  	try {
      var body_id = document.getElementsByTagName("body")[0].id;
      if(body_id="academy") {
        	var n = getNode("//form[@id='setScientists']//*[@type='submit']");
  				n.addEventListener("click", storeResearchStatic, false);
  		 		var scientists = document.getElementById("inputScientists").value;
	        var n = document.getElementById("valueResearch").innerHTML;
					n = n.substring(1, n.length);
					res.buildings["academy"].scientists = scientists;
        	res.buildings["academy"].efficiency = n;
      }
      
    } catch (e) {
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

  //add destination to port view
  //if(/view=port/.test(document.URL)||/index\.php/.test(document.URL)) {
  if(/view=port/.test(document.URL)) {
    try{
	  var body_id = document.getElementsByTagName("body")[0].id;
	  if(body_id="port") {
        //add destination part
        var node = getNode("//div[@class='contentBox01h'][2]/div/ul");
        if(config["destinations"] != undefined) {
          for(var dest in config["destinations"]) {
            var n = document.createElement("li");
			n.innerHTML="<a href='"+config["destinations"][dest].link+"'>"+config["destinations"][dest].name+"</a>"
  			function removeDestination() {
			  if(confirm(texts["removeDestinationConfirmLabel"]))
    	        if(config["destinations"][dest] != undefined)
    		      delete config["destinations"][dest];
    	      setVar("config", serialize(config));
    	      location.replace(window.location);
  	        }			
			var b = document.createElement('input');
			b.type = "button";
			b.value = texts["removeDestination"];
			b.setAttribute("class", "button");
			b.setAttribute("style", "display: inline; width: auto;");
			b.addEventListener("click", removeDestination, false);
			n.appendChild(b);
			node.appendChild(n);
          }
        }
        res.incomingTransporters = [];

        //record load ship
        var transporters = xpath("//div[@class='contentBox01h'][3]/div/table/tbody/tr");
        if(transporters.snapshotLength > 0) {
          for(var i = 0; i < transporters.snapshotLength; i++) {
            var Itemnode = transporters.snapshotItem(i);
            var transporter = {};
            node = Itemnode.getElementsByTagName("td")[0];
            transporter.startcity = "-";
            transporter.endcity = node.innerHTML;
            node = Itemnode.getElementsByTagName("td")[1];
            var rak = node.getAttribute("onmouseover");
            rak = rak.replace(/<img [^>]*\/icon_([^>]+).gif[^0-9]*([0-9.,]+)/g, ";$1:$2;");
            rak = rak.replace(/^[^<]*/, "");
            rak = rak.replace(/>[^>]*$/, ">");
            rak = rak.replace(/<[^>]*>/g, "");
            var arr = rak.split(";");
            var r = {"wood":0,"wine":0,"marble":0,"glass":0,"sulfur":0};
            for (key in arr) {
              if (arr[key].indexOf(":") >= 0) {
                var a = arr[key].split(":");
                r[a[0]] = getIntValue(a[1]);
              }
            }
            transporter.res = r;
            node = Itemnode.getElementsByTagName("td")[3];
            transporter.mission = texts["Loading"];
            var totaltime = 0;
            if (node.innerHTML == texts["Wait"])
              transporter.mission = texts["Wait"];
            else {
              //node = Itemnode.getElementsByTagName("td")[3];
              node = node.getElementsByTagName("script")[0];
              var starttime = 0;
              if (/enddate:\s([0-9]+)/.exec(node.innerHTML) != null)
                arrivetime = RegExp.$1*1000;
              if (/currentdate:\s([0-9]+)/.exec(node.innerHTML) != null)
                starttime = RegExp.$1*1000;
              totaltime = getLocalTime(arrivetime-starttime);
            }
            transporter.arriveTime = totaltime;
            
            res.incomingTransporters.push(transporter);
          }
        }
        
        //record arriving ship
        var transporters = xpath("//div[@class='contentBox01h'][4]/div[1]/table/tbody/tr");
        if(transporters.snapshotLength > 0) {
          //record them
          for(var i = 1; i < transporters.snapshotLength; i++) {
            var Itemnode = transporters.snapshotItem(i);
            var transporter = {};
            node = Itemnode.getElementsByTagName("td")[2];
            transporter.startcity = node.innerHTML;
            transporter.endcity = "-";
            node = Itemnode.getElementsByTagName("td")[3];
            var rak = node.getAttribute("onmouseover");
            rak = rak.replace(/<img [^>]*\/icon_([^>]+).gif[^0-9]*([0-9.,]+)/g, ";$1:$2;");
            rak = rak.replace(/^[^<]*/, "");
            rak = rak.replace(/>[^>]*$/, ">");
            rak = rak.replace(/<[^>]*>/g, "");
            var arr = rak.split(";");
            var r = {"wood":0,"wine":0,"marble":0,"glass":0,"sulfur":0};
            for (key in arr) {
              if (arr[key].indexOf(":") >= 0) {
                var a = arr[key].split(":");
                r[a[0]] = getIntValue(a[1]);
              }
            }
            transporter.res = r;
            node = Itemnode.getElementsByTagName("td")[4];
            transporter.mission = node.innerHTML;
            node = Itemnode.getElementsByTagName("td")[5];
            var arrivetime = node.innerHTML;
            transporter.arriveTime = getLocalTime(getDuration(arrivetime));
            res.incomingTransporters.push(transporter);
          }
        }
      }
    } catch (e) {
    }
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
  //add a button to transport page so we can store theses links
  //if(/view=transport/.test(document.URL)||/index\.php/.test(document.URL)) {
  if(/view=transport/.test(document.URL)) {
  	function saveDestination() {
  	var destId = getNode_value("//form[@id='transport']/input[@type='hidden' and @name='destinationCityId']");
		var destName = getNodeValue("//div[@class='journeyTarget']/text()");
		var journeyTime = getNodeValue("//div[@class='journeyTime']/text()");
		if(destName.indexOf(" — ")>0)
			destName = destName.substring(0, destName.indexOf(" — "));
		if((journeyTime.indexOf(" + ") > 0) && (journeyTime.indexOf(" = ") > 0))
			journeyTime = journeyTime.substring(journeyTime.indexOf(" + ") + 3, journeyTime.indexOf(" = "));
		
  		var addname = prompt(texts["appendDestinationNameLabel"],destName+"["+journeyTime+"]");
			if((addname.length == 0) || (addname.search(/\|/) != -1) || (addname.search(/;/) != -1))
			{
				alert(texts["appendDestinationNameErrorLabel"]);
				exit;
			}
			
			var addlocation = window.location;
			if(config["destinations"][destId] == undefined)
				config["destinations"][destId] = {};
			config["destinations"][destId].link = addlocation+"";
			config["destinations"][destId].name = addname;
			setVar("config", serialize(config));
			location.replace(window.location);
  	}
  	function removeDestination() {
  		var destId = getNode_value("//form[@id='transport']/input[@type='hidden' and @name='destinationCityId']");
		if(confirm(texts["removeDestinationConfirmLabel"]))
    	  if(config["destinations"][destId] != undefined)
    		delete config["destinations"][destId];
    	setVar("config", serialize(config));
    	location.replace(window.location);
  	}
  	try {
      var body_id = document.getElementsByTagName("body")[0].id;
      if(body_id="transport") {
		//var t = document.getElementById('colonizeBtn').parentNode;
		var t = document.getElementById('missionSummary').parentNode;
        if (config["destinations"] == undefined) {
          config["destinations"] = {};
        }
        
        var destId = getNode_value("//form[@id='transport']/input[@type='hidden' and @name='destinationCityId']");
		
        if(config["destinations"][destId] == undefined) {
          //save button
          var n = document.createElement('input');
          n.type = "button";
          n.value = texts["appendDestination"];
          n.setAttribute("class", "button");
          n.addEventListener("click", saveDestination, false);
          t.appendChild(n);
        } else {
          //remove button
          var n = document.createElement('input');
          n.type = "button";
          n.value = texts["removeDestination"];
          n.setAttribute("class", "button");
          n.addEventListener("click", removeDestination, false);
          t.appendChild(n);
        }
      }
    } catch (e) {
      GM_log(e);
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
    var citytype = c.parentNode.getElementsByTagName("a")[0].childNodes[1].getElementsByTagName("span").length;
    var citystatus = "";
    switch(citytype) {
    	case 4:
    		citystatus = "vacation";
    		break;
    	case 3:
    		citystatus = "inactivity";
    		break;
    	case 1:
    		citystatus = "banned";
    		break;
    }
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
      players.playersCities[playername].citystatus = citystatus;
      players.cities[cityid] = {name: data[0], size: data[1], player: playername, island_id: island_id};
      players.islands[island_id] = {coord: city_coord};
      var a = c.parentNode.getElementsByTagName("a")[0];
      if (a != undefined) {
        a = a.getElementsByTagName("span")[0];
        if (a != undefined) {
          a = a.getElementsByTagName("span")[a.getElementsByTagName("span").length-1];
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
function getActionCode(root) {
  return $X("//form[@id='changeCityForm']//input[@type='hidden' and @name='actionRequest']" ,root).value;
}
/**************************************************************************************************
 * Render tables
 *************************************************************************************************/
function renderTables() {
  setLanguage();
  getLocalizedTexts();
  var TABLE_RESOURCES    = getCfgValue("TABLE_RESOURCES", true); //overview table for resources
  var TABLE_BUILDINGS    = getCfgValue("TABLE_BUILDINGS", true); //overview table for buildings
  var TABLE_ARMYFLEET    = getCfgValue("TABLE_ARMYFLEET", true); //overview table for army and fleet
  var TABLE_PLAYERS      = getCfgValue("TABLE_PLAYERS", false); //table for players and cities
  var PLAYERS_NORMAL     = getCfgValue("PLAYERS_NORMAL", true); //table for players and cities
  var PLAYERS_INACTIVITY = getCfgValue("PLAYERS_INACTIVITY", true); //table for players and cities
  var PLAYERS_BANNED     = getCfgValue("PLAYERS_BANNED", true); //table for players and cities
  var PLAYERS_VACATION   = getCfgValue("PLAYERS_VACATION", true); //table for players and cities
  var TABLE_RESEARCH     = getCfgValue("TABLE_RESEARCH", true); // overview table for research
  var TABLE_TRANSPORTERS = getCfgValue("TABLE_TRANSPORTERS", true); //overview table for transporters
  PROGRESS_BAR_MODE = getCfgValue("PROGRESS_BAR_MODE", "time"); //progress bar mode for resource counters
  GM_addStyle(getCfgValueNonEmpty("CSS", default_style));
  
  var nodes = xpath("//select[@id='citySelect']/option"); //cities
  var s = "";

  var cityName =   texts["cityName"];
  var actionsName = getNodeTitle("//div[@id='cityResources']//li[@class='actions']", "actions");
  var populationName = getNodeTitle("//div[@id='cityResources']//li[@class='population']", "population");
  var woodName =   getNodeTitle("//div[@id='cityResources']/ul[@class='resources']/li[@class='wood']", "wood");
  var wineName =   getNodeTitle("//div[@id='cityResources']/ul[@class='resources']/li[contains(@class,'wine')]", "wine");
  var marbleName = getNodeTitle("//div[@id='cityResources']/ul[@class='resources']/li[contains(@class,'marble')]", "marble");
  var glassName =  getNodeTitle("//div[@id='cityResources']/ul[@class='resources']/li[contains(@class,'glass')]", "crystal");
  var sulfurName = getNodeTitle("//div[@id='cityResources']/ul[@class='resources']/li[contains(@class,'sulfur')]", "sulfur");

  log("time1: "+(new Date().getTime() - _startTime)+" msec");
  //az els? táblázat kirajzolása (nyersanyagok)
  if (TABLE_RESOURCES) {
    var sumspacetotal = 0;
    s += "<table border=1 class='resources_table'>";
    s += "<tr class='table_header'>";
    s += "<th class='table_header' colspan=3>"+cityName+"</th>"+
         "<th colspan=4 class='lf table_header'>"+populationName+"</th>"+
         "<th colspan=3 class='lf table_header'>"+woodName+"</th>"+
         "<th colspan=3 class='lf table_header'>"+wineName+"</th>"+
         "<th colspan=3 class='lf table_header'>"+marbleName+"</th>"+
         "<th colspan=3 class='lf table_header'>"+glassName+"</th>"+
         "<th colspan=3 class='lf table_header'>"+sulfurName+"</th>"+
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
        wineTooltip = mynumberformat(Math.round(res.prodwine), true)+" / "+ texts["h"];
      }
      var wineRemainingHours = undefined;
      if (wineUsage > 0) {
        wineRemainingHours = floatFormat(getCurrentResourceAmount(currenttime, res.prodtime, res.wine, res.prodwine - wineUsage) / wineUsage, 1) + " 時";
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
      var growthRemainingHours = "&#8734; "+texts["h"];
      var growth = happiness != "?" ? floatFormat(0.02 * happiness, 2, true) : "?";
      if (happiness != "?" && happiness > 0 && bonusspace != "?") {
        growthRemainingHours = getGrowthRemainingHours(population, parseInt(spacetotal) + parseInt(bonusspace), currenttime, happiness);
      }
      var cs = "";
      var lfcs = "lf";
      if (parseInt(city_id) == parseInt(city.value)) {
        cs += " current_city_highlight";
        lfcs += " current_city_highlight";
      }
      var townHallStyle = "";
	  sumspacetotal += parseInt(spacetotal) + parseInt(bonusspace);
      if (parseInt(population) >= parseInt(spacetotal) + parseInt(bonusspace)) {
        townHallStyle = " populationfull";
      } else {
        log("population is less than spacetotal "+population+" < "+(parseInt(spacetotal) + parseInt(bonusspace)));
      }
      if (bonusspace != "?") {
        spacetotal = mynumberformat(parseInt(spacetotal) + parseInt(bonusspace))+ " ("+mynumberformat(spacetotal) + "+" + mynumberformat(bonusspace)+")";
      } else {
        spacetotal = mynumberformat(spacetotal) + " + ?";
      }
      var warehouseLevel = getArrValue(res.buildings["warehouse"], "level", "0");
      var maxcwood = warehouseWoodCapacities[warehouseLevel] + 1000;//1000 a városháza kapacitása
      var maxcother = warehouseOtherCapacities[warehouseLevel] + 300;//300 a városháza kapacitása
      var strhappiness = "("+texts["Happiness"]+":"+happiness+" "+texts["Growth"]+":"+growth+" "+texts["full"]+":"+growthRemainingHours+")";
      s += "<tr>";
      s += "<td class='"+cs+"'>"+createLinkToCity(getCityName(city.innerHTML), city.value, i)+"</td>"+
           "<td class='"+cs+"'>"+createLinkToForeignCity(res.city_coord, res.island_id, city.value)+"</td>"+
           "<td class='"+cs+"'>"+createLastUpdateAsTooltip(res.actions, actionsName, res.prodtime)+"</td>"+
           "<td class='"+lfcs+townHallStyle+"'>"+createTooltip(mynumberformat(population), "Max:"+spacetotal)+"</td>"+
               "<td class='"+cs+townHallStyle+"'>"+createTooltip(res.freeworkers, texts["FreeWorkers"]+strhappiness)+"</td>"+
               "<td class='"+cs+"'>"+createTooltip(happiness, texts["Happiness"])+"</td>"+
               "<td class='"+cs+"'>"+createTooltip(growth, growthRemainingHours)+"</td>"+
           "<td class='"+lfcs+"'>"+createLinkToResource(
                              createCounter(res.prodtime, res.wood, res.prodwood, false, maxcwood, getArrivingGoods(city.value, "wood")),
                              res.island_id, city.value, i) +"</td>"+
               "<td class='"+cs+"'>"+createProd(res.prodwood)+"</td>"+
               "<td class='"+cs+"'>"+createFillageTimes(res.prodwood, res.wood, maxcwood)+"</td>"+
           "<td class='"+lfcs+"'>"+createLinkToTradegoodCond(res.prodwine > 0,
                              createCounter(res.prodtime, res.wine, res.prodwine - wineUsage, false, maxcother, getArrivingGoods(city.value, "wine")),
                              res.island_id, city.value, i) +"</td>"+
               "<td class='"+cs+"'>"+wineUsageHtml+"</td>"+
               "<td class='"+cs+"' name='wine'>"+createProd(res.prodwine)+"</td>"+
           "<td class='"+lfcs+"'>"+createLinkToTradegoodCond(res.prodmarble > 0,
                              createCounter(res.prodtime, res.marble, res.prodmarble, false, maxcother, getArrivingGoods(city.value, "marble")),
                              res.island_id, city.value, i)+"</td>"+
               "<td class='"+cs+"'>"+createProd(res.prodmarble)+"</td>"+
               "<td class='"+cs+"'>"+createFillageTimes(res.prodmarble, res.marble, maxcother)+"</td>"+
           "<td class='"+lfcs+"'>"+createLinkToTradegoodCond(res.prodglass > 0,
                              createCounter(res.prodtime, res.glass, res.prodglass, false, maxcother, getArrivingGoods(city.value, "glass")),
                              res.island_id, city.value, i) +"</td>"+
               "<td class='"+cs+"'>"+createProd(res.prodglass)+"</td>"+
               "<td class='"+cs+"'>"+createFillageTimes(res.prodglass, res.glass, maxcother)+"</td>"+
           "<td class='"+lfcs+"'>"+createLinkToTradegoodCond(res.prodsulfur > 0,
                              createCounter(res.prodtime, res.sulfur, res.prodsulfur, false, maxcother, getArrivingGoods(city.value, "sulfur")),
                              res.island_id, city.value, i) +"</td>"+
               "<td class='"+cs+"'>"+createProd(res.prodsulfur)+"</td>"+
               "<td class='"+cs+"'>"+createFillageTimes(res.prodsulfur, res.sulfur, maxcother)+"</td>"+
           "<td class='"+lfcs+"'>"+underConstruction+"</td>"+
               "<td class='"+cs+"'>"+counter+"</td>";
      s += "</tr>";
    }
    s += "<tr class='table_footer'>";
    s += "<td class='table_footer' colspan=3>"+texts["summary"]+"</td>"+
         "<td class='table_footer lf'>"+createTooltip(mynumberformat(sumres.population), "Max:"+mynumberformat(sumspacetotal))+"</td>"+
         "<td class='table_footer'></td>"+
         "<td class='table_footer'></td>"+
         "<td class='table_footer'></td>"+
         "<td class='table_footer lf'>"+createCounter(currenttime, sumres.wood, sumProd.wood)+"</td>"+
         "<td class='table_footer'>"+createProd(sumProd.wood)+"</td>"+
         "<td class='table_footer'></td>"+
         "<td class='table_footer lf'>"+createCounter(currenttime, sumres.wine, sumProd.wine - sumProd.wineUsage, true)+"</td>"+
         "<td class='table_footer'>"+createProd(-1 * sumProd.wineUsage)+"</td>"+
         "<td class='table_footer'>"+createProd(sumProd.wine)+"</td>"+
         "<td class='table_footer lf'>"+createCounter(currenttime, sumres.marble, sumProd.marble)+"</td>"+
         "<td class='table_footer'>"+createProd(sumProd.marble)+"</td>"+
         "<td class='table_footer'></td>"+
         "<td class='table_footer lf'>"+createCounter(currenttime, sumres.glass, sumProd.glass)+"</td>"+
         "<td class='table_footer'>"+createProd(sumProd.glass)+"</td>"+
         "<td class='table_footer'></td>"+
         "<td class='table_footer lf'>"+createCounter(currenttime, sumres.sulfur, sumProd.sulfur)+"</td>"+
         "<td class='table_footer'>"+createProd(sumProd.sulfur)+"</td>"+
         "<td class='table_footer'></td>"+
         "<td class='table_footer lf' colspan=2 style='font-weight: normal;'>"+createLink(scriptname, scriptsite, "target='_blank'")+"</td>";
    s += "</tr>";
    s += "</table>";
    s += "<br>";
  }

  log("time2: "+(new Date().getTime() - _startTime)+" msec");
  //második táblázat: épületek szintjei
  if (TABLE_BUILDINGS) {
    actioncode = getActionCode();
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
      s += "<th colspan=2 class='"+firstStyle+currentBuildingStyle+" table_header'>"+createTooltip(buildings[key][1], buildings[key][0])+"</th>";
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
      s += "<td class='"+cs+"'>"+createLinkToCity(getCityName(city.innerHTML), city.value, i)+"</td>";
      var firstStyle = "lf";
      for(key in buildings) {
        var level = getArrValue(res.buildings[key], "level", "-");
        var link = getArrValue(res.buildings[key], "link", "-");
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
        var upgradelink = "&nbsp\;";
        var upgradetext = "&nbsp\;";
        var levellink = level;
        if(level!="-"&&link!="-") {
          levellink = createLink(level, link, "");
          //if (cs != "" && res.underConstructionName != key) {
          if (res.underConstructionName != key) {
            upgradelink = link.replace(/view=(.+)\&id=/,"action=CityScreen&function=upgradeBuilding&id=");
            //upgradelink = upgradelink+"&level=" +level+"&actionRequest="+actioncode;
            upgradelink = upgradelink+"&level=" +level;
            var strconfirm = "confirm='"+city.innerHTML+" "+ buildings[key][0] + " "+texts["Level"] + ":" + (++level) +"'";
            var strattr = "class='upgradelink' href='"+upgradelink+"' cityid='"+city.value+"'";
            upgradetext = "<img src='/skin/upgrade/btn_upgrade.jpg' width='15' height='15' "+strattr+strconfirm+" >";
            upgradetext = createTooltip(upgradetext, texts["Upgrade"]+level);
          }
        }
        s += "<td class='"+cs+" "+firstStyle+currentBuildingStyle+"'>"+levellink+"</td>";
        s += "<td width='15px'class='"+cs+currentBuildingStyle+"'>"+upgradetext+"</td>";
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
          s += "<td class='"+cs+"'>"+createLinkToCity(getCityName(city.innerHTML), city.value, i)+"</td>";
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
                point = createTooltip(mynumberformat(point), level + " * " + mynumberformat(pointPerUnit) + " "+texts["Point"]);
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

  log("time research table: " + (new Date().getTime() - _startTime)+" msec");
  if(TABLE_RESEARCH) {
    s += "<table border=1 class='research_table'>";
//  	s += "<caption>+texts["scienceReport"]+</caption>";
    s += "<tr class='table_header'>";
    s += "<th class='table_header'>"+texts["cityName"]+"</th>"+
         "<th class='lf table_header'>"+texts["constructionLevel"]+"</th>"+
         "<th colspan=2 class='lf table_header'>"+texts["scientists"]+"</th>"+
         "<th class='lf table_header'>"+texts["production"]+"</th>"+
         "<th class='lf table_header'>"+texts["costs"]+"</th>"+
         "<th class='lf table_header'></th>";
    s += "</tr>";
    var sSum=0,sMaxSum=0,eSum=0;
    for(var i = 0; i < nodes.snapshotLength; i++) {
      var city = nodes.snapshotItem(i);
      var res = getCity(city.value);
      //if(i%2==0)
        s += "<tr>";
      //else
        //s += "<tr class='alt'>";
      var cs = "";
      var lfcs = "lf";
      if (parseInt(city_id) == parseInt(city.value)) {
        cs += " current_city_highlight";
        lfcs += " current_city_highlight";
      }
      s += "<td class='"+cs+"'>"+createLinkToCity(getCityName(city.innerHTML), city.value, i)+"</td>";
      var level = getArrValue(res.buildings["academy"], "level", "-");
      var link = getArrValue(res.buildings["academy"], "link", "-");
      var linkText = level;
      if(level!="-"&&link!="-")
        linkText="<a href='"+link+"'>"+level+"</a>";
      s += "<td class='lf "+cs+"'>"+linkText+"</td>";
      var scientists = getIntValue(getArrValue(res.buildings["academy"], "scientists", "0"),0);
      var scientistText = scientists;
      if (scientistText == 0)
      	  scientistText = "-";
      var efficiency = getIntValue(getArrValue(res.buildings["academy"], "efficiency", "0"),0);
      sSum += scientists;
      var currentMax=0;
      if(level!='-')
      	currentMax = academyCapacities[level];
      sMaxSum += currentMax
      eSum += efficiency;
      s += "<td class='"+lfcs+"'>"+scientistText+"</td>";
      s += "<td class='"+cs+"'>"+currentMax+"</td>";
      s += "<td class='"+lfcs+"'>"+createProd(efficiency)+"</td>";
      var cost = 8;
      if(TECH_LETTERCHUTE)
      	cost = 7;
      s += "<td class='"+lfcs+"'>"+createProd(-cost*scientists)+"</td>";
      var link = getArrValue(res.buildings["academy"], "link", "-");
      var linkText = "";
      if(link!='-')
      	linkText="<a href='"+link+"'>"+texts["goTo"]+buildings["academy"][1]+"</a>";
      s += "<td class='"+lfcs+"'>"+linkText+"</td>";
      s += "</tr>";
    }
    s += "<tr class='table_footer'>";
    s += "<td class='table_footer'>"+texts["summary"]+"</td>"+
         "<td class='table_footer lf'></td>"+
         "<td class='table_footer lf'>"+sSum+"</td>"+
         "<td class='table_footer'>"+sMaxSum+"</td>"+
         "<td class='table_footer lf'>"+createProd(eSum)+"</td>"+
         "<td class='table_footer lf '>"+createProd(-cost*sSum)+"</td>"+
         "<td class='table_footer lf'></td>";
    s += "</tr>";
    s += "</table>";
    s += "<br>";
  }

  if(TABLE_TRANSPORTERS) {
    s += "<table border=1 class='transporters_table'>";
//  	s += "<caption>+texts["transportReport"]+</caption>";
    s += "<tr class='table_header'>";
    s += "<th class='table_header'>"+texts["cityName"]+"</th>"+
         "<th class='lf table_header'>"+texts["StartCity"]+"</th>"+
         "<th class='lf table_header'>"+texts["DestinationCity"]+"</th>"+
         "<th class='lf table_header'>"+woodName+"</th>"+
         "<th class='lf table_header'>"+wineName+"</th>"+
         "<th class='lf table_header'>"+marbleName+"</th>"+
         "<th class='lf table_header'>"+glassName+"</th>"+
         "<th class='lf table_header'>"+sulfurName+"</th>"+
         "<th class='lf table_header'>"+texts["Mission"]+"</th>"+
         "<th class='lf table_header'>"+texts["FinishTime"]+"</th>";
    s += "</tr>";
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
      if(res.incomingTransporters == undefined)
      	res.incomingTransporters = [];
      var lastship={"wood":0,"wine":0,"marble":0,"glass":0,"sulfur":0};
      var cs = "";
      var lfcs = "lf";
      if (parseInt(city_id) == parseInt(city.value)) {
        cs += " current_city_highlight";
        lfcs += " current_city_highlight";
      }
      var t = res.incomingTransporters.length;
      if(t > 0)
        for(var j = 0; j < t; j++) {
          var transporter = res.incomingTransporters[j];
          lastship["wood"]+=transporter.res["wood"];
          lastship["wine"]+=transporter.res["wine"];
          lastship["marble"]+=transporter.res["marble"];
          lastship["glass"]+=transporter.res["glass"];
          lastship["sulfur"]+=transporter.res["sulfur"];
          
          s += "<tr>";
          if(j == 0)
            s += "<td rowspan='"+t+"' class='"+cs+"'>"+createLinkToCity(getCityName(city.innerHTML), city.value, i)+"</td>";
          s += "<td class='lf'>"+transporter.startcity+"</td>";
          s += "<td class='lf'>"+transporter.endcity+"</td>";
          if (transporter.arriveTime>0) {
		  	s += "<td class='lf'>"+createTooltip(transporter.res["wood"], texts["FinishResources"]+":"+getCurrentResourceAmount(transporter.arriveTime, res.prodtime, lastship["wood"]+res.wood, res.prodwood))+"</td>";
		  	s += "<td>"+createTooltip(transporter.res["wine"], texts["FinishResources"]+":"+getCurrentResourceAmount(transporter.arriveTime, res.prodtime, lastship["wine"] + res.wine, res.prodwine - wineUsage))+"</td>";
		  	s += "<td>"+createTooltip(transporter.res["marble"], texts["FinishResources"]+":"+getCurrentResourceAmount(transporter.arriveTime, res.prodtime, lastship["marble"] + res.marble, res.prodmarble))+"</td>";
		  	s += "<td>"+createTooltip(transporter.res["glass"], texts["FinishResources"]+":"+getCurrentResourceAmount(transporter.arriveTime, res.prodtime, lastship["glass"] + res.glass, res.prodglass))+"</td>";
		  	s += "<td>"+createTooltip(transporter.res["sulfur"], texts["FinishResources"]+":"+getCurrentResourceAmount(transporter.arriveTime, res.prodtime, lastship["sulfur"] + res.sulfur, res.prodsulfur))+"</td>";
          	s += "<td class='lf'>"+transporter.mission+"</td>";
          	s += "<td>"+createTimeCounter(transporter.arriveTime)+"</td>";
          }
          else {
		  	s += "<td class='lf'>"+transporter.res["wood"]+"</td>";
		  	s += "<td>"+transporter.res["wine"]+"</td>";
		  	s += "<td>"+transporter.res["marble"]+"</td>";
		  	s += "<td>"+transporter.res["glass"]+"</td>";
		  	s += "<td>"+transporter.res["sulfur"]+"</td>";
          	s += "<td class='lf'>"+transporter.mission+"</td>";
          	s += "<td>"+createTimeCounter(transporter.arriveTime)+"</td>";
          }
          s += "</tr>";
        }
    }
    		 
    s += "</tr>";
    s += "</table>";
    s += "<br>";
  }

  log("time4: "+(new Date().getTime() - _startTime)+" msec");

  //negyedik táblázat: játékosok, és azok városai
  if (TABLE_PLAYERS) {
  	var select_cityid = getSelectCity();
    var maxCityNum = 6;
    var playerNames = [];
    for(plname in players.playersCities) {
      playerNames[playerNames.length] = plname;
    }
    playerNames.sort(function(a,b){
      a = a.toLowerCase();
      b = b.toLowerCase();
      return (a < b) ? -1 : ((a > b) ? 1 : 0);
    });
    maxCityNum = 0;
    for(idx in playerNames) {
      var plname = playerNames[idx];
      var city_ids = players.playersCities[plname].cities;
      var citystatus = players.playersCities[plname].citystatus;
      if (citystatus == undefined) citystatus = "";
      if (!PLAYERS_NORMAL && citystatus == "") continue;
      if (!PLAYERS_INACTIVITY && citystatus == "inactivity") continue;
      if (!PLAYERS_BANNED && citystatus == "banned") continue;
      if (!PLAYERS_VACATION && citystatus == "vacation") continue;
      var i=0;
      for(id in city_ids) {
      	if (city_ids[id]) {
          i++;
      	}
      }
      maxCityNum = (i>maxCityNum) ? i :maxCityNum;
    }
    s += "<table border=1 class='players_table'>";
    s += "<tr class='table_header'>";
    s += "<th class='table_header' colspan=2 >"+texts["Players"]+"</th>";
    s += "<th class='table_header'>"+texts["Score"]+"</th>";
    s += "<th class='lf table_header' colspan="+(maxCityNum*4)+">"+texts["cityName"]+"</th>";

    for(idx in playerNames) {
      var plname = playerNames[idx];
      var city_ids = players.playersCities[plname].cities;
      var citystatus = players.playersCities[plname].citystatus;
      if (citystatus == undefined) citystatus = "";
      if (!PLAYERS_NORMAL && citystatus == "") continue;
      if (!PLAYERS_INACTIVITY && citystatus == "inactivity") continue;
      if (!PLAYERS_BANNED && citystatus == "banned") continue;
      if (!PLAYERS_VACATION && citystatus == "vacation") continue;
      var banner = (citystatus == "banned") ? "<img src=skin/icons/player_banned_14x14.gif>" : "";
      var strattr = "class='deleteplayer' playername='"+plname+"' "
      var deletebutton = createImg("skin/advisors/military/icon_close_small.gif", strattr, 16);
      if (citystatus != "")
      	s += "<tr class='"+citystatus+"'>";
      else
      	s += "<tr>";
      s += "<td width='16px'>"+deletebutton+"</td>";
      s += "<td>"+banner+plname+"</td>";
      s += "<td>" + players.playersCities[plname].alliance + "</td>";
      var i = 0;

      for(id in city_ids) {
        if (city_ids[id]) {
          var city = players.cities[id];
          s += "<td class='lf'>"+createLinkToForeignCity(createTooltip(city.name, players.islands[city.island_id].coord), city.island_id, id)+"</td>";
          s += "<td>"+createLinkToForeignCity(players.islands[city.island_id].coord, city.island_id, id)+"</td>";
          s += "<td>"+city.size+"</td>";
          s += "<td>";
          if (select_cityid>0)
            s += createDiplomacyLink(select_cityid, id);
          if (citystatus != "vacation")
          	s += createPlunderLink(id)+createBlockadeLink(id);
          s += createSendSpyLink(id, city.island_id)+"</td>";
          i++;
        }
      }

      for(;i < maxCityNum; i++) {
        s += "<td class='lf'></td><td></td><td></td><td></td>";
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
    span.setAttribute("style", "clear: right;");
    span.innerHTML = s;
    body.appendChild(span);
  } else {
    span.innerHTML = s;
    table_mode = "refresh_table";
  }

	if (TABLE_BUILDINGS) {
		function upgrade_building(e) {
			if (confirm(texts["Upgrade"] +":"+e.target.getAttribute("confirm")+"\n"+texts["UpgradeConfirm"])) {
				var city_id = e.target.getAttribute("cityid");
				var actioncode = changeCity(city_id);
				location.href = e.target.getAttribute("href")+"&actionRequest="+actioncode;
			}
  		}
		var linknode = getNode("//table[@class='buildings_table']");
		var imgnodes = linknode.getElementsByTagName("img");
		for(var i=0; i<imgnodes.length; i++) {
			if (imgnodes[i].getAttribute("class") == "upgradelink") {
				imgnodes[i].setAttribute("style", "cursor: pointer; display: block;");
				imgnodes[i].addEventListener('click', upgrade_building, false);
			}
		}
	}
	if (TABLE_RESOURCES) {
		function change_resourcetradegood(e) {
			var city_id = e.target.getAttribute("cityid");
			if (city_id == "" || city_id == undefined)
				city_id = e.target.parentNode.parentNode.getAttribute("cityid");
			var actioncode = changeCity(city_id);
		}
		var linknode = getNode("//table[@class='resources_table']");
		var anodes = linknode.getElementsByTagName("a");
		
		for(var i=0; i<anodes.length; i++) {
			if (anodes[i].getAttribute("class") == "AutoChange") {
				if (city_idmainView!=anodes[i].getAttribute("cityid"))
					anodes[i].addEventListener('click', change_resourcetradegood, false);
			}
		}
	}
	
	if (TABLE_PLAYERS) {
		function delete_players(e) {
			var name = e.target.getAttribute("playername");
			if (confirm(texts["DeleteConfirm"].replace(/%s/, texts["Players"]+":"+name))) {
				delete players.playersCities[name];
				savePlayers();
				renderTables();
			}
  		}
		var linknode = getNode("//table[@class='players_table']");
		var imgnodes = linknode.getElementsByTagName("img");
		for(var i=0; i<imgnodes.length; i++) {
			if (imgnodes[i].getAttribute("class") == "deleteplayer") {
				imgnodes[i].setAttribute("style", "cursor: pointer; display: block;");
				imgnodes[i].addEventListener('click', delete_players, false);
			}
		}
	}
  log("time6: "+(new Date().getTime() - _startTime)+" msec");

  //settings table
  if (true) {
    function reset_all_data() {
      var answer = confirm(texts["SETTINGS_RESET_DATA_CONFIRM"]);
      if (answer) {
        setVar("config", "");
        setVar("players", "");
        window.location.href = window.location.href;
      }
    }
    function reset_players_data() {
      var answer = confirm(texts["SETTINGS_RESET_PLAYERS_DATA"]);
      if (answer) {
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
      td.setAttribute("align", "right");
      td.setAttribute("style", "border-style: dotted; border-width: 1px;");
      td.innerHTML = title;
      tr.appendChild(td);
      var td = document.createElement('td');
      td.setAttribute("align", "right");
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
    t.setAttribute("align", "center");
    t.appendChild(createRowChk(texts["PREMIUM_VIEW"]+":", "PREMIUM_VIEW", PREMIUM_VIEW));
    t.appendChild(createRowChk(texts["ALERT_SOUNDS"]+":", "ALERT_SOUNDS", ALERT_SOUNDS));
    t.appendChild(createRowInput(texts["ALERT_VOLUME"]+" (0 - 100):", "ALERT_VOLUME", ALERT_VOLUME));
    t.appendChild(createRowInput(texts["WARNING_VOLUME"]+" (0 - 100):", "WARNING_VOLUME", WARNING_VOLUME));
    t.appendChild(createRowChk(texts["AUTO_REFRESH"]+":", "AUTO_REFRESH", AUTO_REFRESH));
    t.appendChild(createRowInput(texts["AUTO_REFRESH_MIN_SECS"]+":", "AUTO_REFRESH_MIN_SECS", MIN));
    t.appendChild(createRowInput(texts["AUTO_REFRESH_MAX_SECS"]+":", "AUTO_REFRESH_MAX_SECS", MAX));
    t.appendChild(createRowChk(texts["TABLE_RESOURCES"]+":", "TABLE_RESOURCES", TABLE_RESOURCES));
    t.appendChild(createRowChk(texts["TABLE_BUILDINGS"]+":", "TABLE_BUILDINGS", TABLE_BUILDINGS));
    t.appendChild(createRowChk(texts["TABLE_ARMYFLEET"]+":", "TABLE_ARMYFLEET", TABLE_ARMYFLEET));
    t.appendChild(createRowChk(texts["TABLE_RESEARCH"]+":", "TABLE_RESEARCH", TABLE_RESEARCH));
    t.appendChild(createRowChk(texts["TABLE_TRANSPORT"]+":", "TABLE_TRANSPORTERS", TABLE_TRANSPORTERS));
    t.appendChild(createRowChk(texts["TABLE_PLAYERS"]+":", "TABLE_PLAYERS", TABLE_PLAYERS));	
    t.appendChild(createRowChk(texts["TECH_LETTERCHUTE"]+":", "TECH_LETTERCHUTE", TECH_LETTERCHUTE));
    t.appendChild(createRowChk(texts["TECH_PULLEY"]+":", "TECH_PULLEY", TECH_PULLEY));
    t.appendChild(createRowChk(texts["TECH_GEOMETRY"]+":", "TECH_GEOMETRY", TECH_GEOMETRY));
    t.appendChild(createRowChk(texts["TECH_SPIRITLEVEL"]+":", "TECH_SPIRITLEVEL", TECH_SPIRITLEVEL));
    t.appendChild(createRowChk(texts["PLAYERS_NORMAL"]+":", "PLAYERS_NORMAL", PLAYERS_NORMAL));
    t.appendChild(createRowChk(texts["PLAYERS_INACTIVITY"]+":", "PLAYERS_INACTIVITY", PLAYERS_INACTIVITY));
    t.appendChild(createRowChk(texts["PLAYERS_BANNED"]+":", "PLAYERS_BANNED ", PLAYERS_BANNED));
    t.appendChild(createRowChk(texts["PLAYERS_VACATION"]+":", "PLAYERS_VACATION", PLAYERS_VACATION));
    t.appendChild(createRowSlct(texts["PROGRESS_BAR_MODE"]+":", "PROGRESS_BAR_MODE", PROGRESS_BAR_MODE, {off: texts["off"], time: texts["time"], percent: texts["percent"]}));
    t.appendChild(createRowSlct(texts["LANGUAGE"]+":", "LANGUAGE", language, {"": texts["LANGUAGE_AUTO"], tw: "繁體中文", cn: "简体中文", en: "English", hu: "Magyar", de: "German", cz: "Czech", tr: "Turkish", es: "Español", ba: "Bosnian", gr: "Greek", it: "Italian", pt: "Portuguese", fr: "French", pl: "Polish", ro: "Romanian", il: "עברית", ru: "Русский"}));
    t.appendChild(createRowInput(texts["ownAlly"]+":", "ownAlly", getCfgValue("ownAlly", "")));
    t.appendChild(createRowInput(texts["friendlyAllies"]+":", "friendlyAllies", getCfgValue("friendlyAllies", "")));
    t.appendChild(createRowInput(texts["hostileAllies"]+":", "hostileAllies", getCfgValue("hostileAllies", "")));
    t.appendChild(createRowTxtr("CSS:", "CSS", getCfgValueNonEmpty("CSS", default_style), 15, 70));
    t.appendChild(createRowChk(texts["DEBUG_LOG"]+":", "DEBUG_LOG", DEBUG_LOG));
    
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
    n.value = texts["Refresh_table"];
    n.setAttribute("class", "button");
    n.setAttribute("style", "display: inline !important;");
    n.addEventListener("click", renderTables, false);
    buttonsPanel.appendChild(n);

    //reset button
    var n = document.createElement('input');
    n.type = "button";
    n.value = texts["Reset_all_data"];
    n.setAttribute("class", "button");
    n.setAttribute("style", "display: inline !important;");
    n.addEventListener("click", reset_all_data, false);
    buttonsPanel.appendChild(n);

    //reset button
    var n = document.createElement('input');
    n.type = "button";
    n.value = texts["Reset_players_data"];
    n.setAttribute("class", "button");
    n.setAttribute("style", "display: inline !important;");
    n.addEventListener("click", reset_players_data, false);
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
  TimeCounter();
  TimeResourceCounter();
  WineTime();
}

renderTables();

window.setInterval(TimeCounter, 1000);
window.setInterval(TimeResourceCounter, 1000);

function WineTime() {
  function countdown(td, s) {
    var time = secsToDHMS(s, 0);
    if (time != td.innerHTML) {
      td.innerHTML = createTooltip(time, texts["empty"]+":"+resolveTime(s, 1));
    }
    var wait = s < 61 ? 1 : s % 60 + 1;
    setTimeout(countdown, wait * 1e3, td, s - wait);
  }
  function wineConsumptionTime(total, rate) {
    total = getIntValue(total);
    rate = Math.abs(getIntValue(rate));
    if (!rate) return Infinity;
    return Math.floor(3600 * total / rate);
  }
  function wineLasts(td) {
    if (td.textContent) return;
    var total = $X('preceding-sibling::td[2]', td).textContent;
    var rate = $X('preceding-sibling::td[1]', td).textContent;
    if (rate) {
      var left = wineConsumptionTime(total, rate);
      if (!isFinite(rate)) return;
      countdown(td, left);
    }
  }
  var td = $x('id("overview__table")/table[@class="resources_table"]/tbody/tr[not(@class="table_footer")]/td[@name="wine"]'); // W
  if (td) td.map(wineLasts);
}

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
	var ret = "[??:??]";
	if (/\[([0-9]+):([0-9]+)\]/.test(str) != null) {
		ret = "["+twodigit(RegExp.$1)+":"+twodigit(RegExp.$2)+"]";
	}
	return ret;
}

function secsToDHMS(t, rough, join) {
  if (t == Infinity) return "∞";
  var result = [];
  var minus = t < 0 ? "-" : "";
  if (minus)
    t = -t;
  for (var unit in TimeUnits) {
    var u = unsafeWindow.LocalizationStrings.timeunits.short[unit];
    var n = TimeUnits[unit];
    var r = t % n;
    if (r == t) continue;
    if ("undefined" == typeof rough || rough--)
      result.push(((t - r) / n) + u);
    else {
      result.push(Math.round(t / n) + u);
      break;
    }
    t = r;
  }
  return minus + result.join(join || " ");
}
function urlParse(param, url) {
  if (!url) url = location.search || "";
  var keys = {};
  url.replace(/([^=&?]+)=([^&#]*)/g, function(m, key, value) {
    keys[decodeURIComponent(key)] = decodeURIComponent(value);
  });
  return (param ? keys[param] : keys) ||
    "view" == param && document.body.id;
}
function changeCity(city_id) {
	var postdata = getFormInput("//form[@id='changeCityForm']//input");
    postdata = postdata + "&cityId="+city_id+"&view=city";
	var xmlhttp;
	if(window.XMLHttpRequest){
    	xmlhttp = new XMLHttpRequest();
	}
	xmlhttp.open('POST','http://' + location.host + '/index.php',false);
	xmlhttp.setRequestHeader('User-agent','Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-TW; rv:1.9.0.3) Gecko/2008092417 Firefox/3.0.3');
	xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xmlhttp.setRequestHeader('Accept','application/atom+xml,application/xml,text/xml');
	xmlhttp.setRequestHeader('Referer','http://' + location.host + '/index.php');
	xmlhttp.setRequestHeader('Cooki',document.cookie);
	xmlhttp.overrideMimeType('text/javascript; charset='+document.characterSet);
	xmlhttp.send(postdata);
	var node = getDocument(xmlhttp.responseText);
	return node.getElementsByTagName("input")[2].value;
}
function getDocument(responseText) {
   var html = document.createElement("html");
   html.innerHTML = responseText;
   var response = document.implementation.createDocument("", "", null);
   response.appendChild(html);
   return response;
}
// consumption/replenish rate and emptiness/fillage times:
function createFillageTimes(r, d, max) {
	var t = CalFillageTimes(r, d, max);
	return (t) ? createTooltip(secsToDHMS(t, 0), texts[r > 0 ? "full" : "empty"]+":"+resolveTime(t, 1)) : "";
}
function CalFillageTimes(r, d, max) {
  if (r) {
    if (r > 0) {
      t = (max - d) * 3600 / r;
    } else {
      t = d * 3600 / -r;
    }
    return t;
  }
}
function $(id) {
  return document.getElementById(id);
}
function getServerTime(offset) {
  var Y, M, D, h, m, s, t;
  [D, M, Y, h, m, s] = $("servertime").textContent.split(/[. :]+/g);
  t = new Date(Y, parseInt(M, 10)-1, D, h, m, s);
  return offset ? new Date(t.valueOf() + offset*1e3) : t;
}
// input: s, bool; output: time or date+time
function resolveTime(seconds, timeonly) { // Crée le temps de fin.
  function z(t) { return (t < 10 ? "0" : "") + t; }
  var t0 = unsafeWindow.startTime || // 0.2.7 (and earlier)
    getIntValue(unsafeWindow.updateServerTime.toSource()); // 0.2.8 (onwards?)
  var t = getServerTime(seconds - (t0 - unsafeWindow.startServerTime) / 1e3);
  var d = "", now = (new Date);
  if (t.getDate() != now.getDate() || t.getMonth() != now.getMonth()) {
    m = t.getMonth();
    d = t.getFullYear()+"/"+twodigit(t.getMonth()+1)+"/"+twodigit(t.getDate());
    if (2 == timeonly) return d;
    d += ", ";
  }
  var h = z(t.getHours());
  var m = z(t.getMinutes());
  var s = z(t.getSeconds());
  t = d + h + ":" + m + ":" + s;
  return timeonly ? t : texts["FinishTime"] + ":" + t;
}
function getCityName(cityhtml) {
	return Trim(cityhtml.replace(/\[[0-9]+.[0-9]+\]/,""));
}
function getFormInput(path) {
	var nodes = $x(path);
	if (nodes.length<=0) return null;
	var postdata = nodes[0].name+"="+nodes[0].value;
    for(var i = 1; i < nodes.length; i++)
    	postdata = postdata +"&" + nodes[i].name+"="+nodes[i].value;
    return postdata;
}
function get(url, fn , tag) {
	GM_xmlhttpRequest({
        method: "GET",
           url: url,
       headers: {
          'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-TW; rv:1.9.0.3) Gecko/2008092417 Firefox/3.0.3',
             'Referer': 'http://' + location.host + '/index.php',
              'Cookie': document.cookie
                },
        onload: function(responseDetails) { fn(responseDetails.responseText, tag); } });
}
function getSelectCity() {
  return $x("//option", $("citySelect"))[$("citySelect").selectedIndex].value;
}

/* IkariamPredict */

function debug(aMsg) {	setTimeout(function() { throw new Error("[debug] " + aMsg); }, 0);}

var satisfaction;

function predictPopulationOverfull() {
	var curPopulation, maxPopulationSpace, timeLeftEx, msg_extra = "";
	var lang = (navigator.language == "en")?"en":"he";
	
	var divCityOverview = document.getElementById('CityOverview');
	var happy = parseInt(document.getElementById('SatisfactionOverview').childNodes[5].childNodes[3].textContent,10);
	if (divCityOverview) {
		curPopulation	    = Number(divCityOverview.childNodes[3].childNodes[3].childNodes[1].childNodes[1].textContent);
		satisfaction        = curPopulation + happy;
		maxPopulationSpace	= Number(divCityOverview.childNodes[3].childNodes[3].childNodes[1].childNodes[3].textContent);
		
		debug(" כרגע : " + curPopulation + "\n מקסימום מקום : " + maxPopulationSpace + "\n שמח : " + happy + "\n  : " + satisfaction);

    if (curPopulation > 0 && maxPopulationSpace > 0) {
      if (satisfaction < maxPopulationSpace) {
        timeLeftEx = 1/0.02*Math.log(happy);
        msg_extra  = "* (" + satisfaction + ")";
      } else {
  			timeLeftEx = 1/0.02*Math.log(happy/(satisfaction-maxPopulationSpace));
      }
		}
		//debug("timeLeft : " + timeLeftEx);
		var parentNode = divCityOverview.childNodes[3].childNodes[3];
		var newNode = parentNode.childNodes[3].cloneNode(true);
		var insertedElement = parentNode.appendChild(newNode);
		insertedElement.style.position = "relative";
		insertedElement.style.top = "74px";					
		insertedElement.innerHTML = msg_TimeLeft[lang] + timeRealToString(timeLeftEx, lang) + msg_extra;
		//alert("did it work?");
		//divCityOverview.childNodes[3].childNodes[3].childNodes[1].childNodes[3].title  = msg_TimeLeft[lang] + timeRealToString(timeLeftEx, lang);// + "/" + curPopulation + "/" + maxPopulationSpace + "/" + curPopulationGrowth + "/" + timeLeftEx;
	}
}

function timeRealToString(rTime, lang) {
	var sDays, sHours, sMinutes, sResult;
	if (rTime > 0) {
		sDays = Math.floor(rTime / 24);
		sHours = Math.floor(rTime - sDays * 24);
		sMinutes = Math.floor((rTime - sDays * 24 - sHours) * 60);
		sResult = (sDays == 0)?"":String(sDays) + msg_Days[lang];
		sResult += (sHours == 0)?"":String(sHours) + msg_Hours[lang];
		sResult += sMinutes + msg_Minutes[lang];
	} else {
		sResult = msg_Never[lang] + "(מקסימום: " + satisfaction + ")";
		//sResult = msg_Never[lang] ;
	}
	return sResult;
}

var msg_TimeLeft = new Object;
var msg_Days = new Object;
var msg_Hours = new Object;
var msg_Minutes = new Object;
var msg_Never = new Object;

msg_TimeLeft["en"] = "Time to full: ";
msg_TimeLeft["he"] = "העיר תתמלא בעוד: ";
msg_TimeLeft["he"] = "מלא בעוד: ";
msg_Days["en"] = "d. ";
msg_Days["he"] = "י. ";
msg_Days["he"] = " ימים ";
msg_Hours["en"] = "h. ";
msg_Hours["he"] = "ש. ";
msg_Hours["he"] = " שעות ";
msg_Minutes["en"] = "min. ";
msg_Minutes["he"] = "ד. ";
msg_Minutes["he"] = " דקות ";
msg_Never["en"] = "Never";
msg_Never["he"] = " בעוד הרבה זמן";

predictPopulationOverfull();