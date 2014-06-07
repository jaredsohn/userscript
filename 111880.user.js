// ==UserScript==
// @name           bro3_map_tool
// @namespace      http://blog.livedoor.jp/froo/
// @include        http://*.sangokushi.in.th/map.php*
// @include        http://*.sangokushi.in.th/alliance/info.php*
// @include        http://*.sangokushi.in.th/user/*

// @description    ブラウザ三国志 地図ツール by 浮浪プログラマ
// ==/UserScript==

// 公開ページ: http://blog.livedoor.jp/froo/archives/51365945.html
// 使い方: 全体地図ページ左下「地図ツール」の各リンクをクリック

var VERSION = "2.38";
var LOCAL_STORAGE = "bro3_map_tool";

var RADIUS = 25; //半径（มุมมอง map tool）
var RADIUS_L = 125; //半径（มุมมองแบบกว้าง）
var CELL_SIZE_M = 14; //中域地図の1マスサイズ(px)
var CELL_SIZE_L = 3; //広域地図の1マスサイズ(px)
var FONT_SIZE = "10px"; //中域地図のマス内文字サイズ
var HI_POWER = 4; //高☆領地基準
var HI_POPUL = 600; //高人口拠点基準
var MAX_XY = 700; //座標絶対値最大
var DELIMIT = "#$%";
var DELIMIT2 = "&?@";
var NPC_ALLY = "-";

//保存データインデックス（マス）
var IDX_VILLAGE_NAME = 0; //地名
var IDX_USER_NAME = 1; //君主名
var IDX_POPULATION = 2; //人口
var IDX_ALLIANCER = 3; //同盟名
var IDX_POWER = 4; //戦力
var IDX_WOOD = 5; //森
var IDX_STONE = 6; //岩
var IDX_IRON = 7; //鉄
var IDX_RICE = 8; //穀
var IDX_NPC_FLG = 9; //NPCフラグ
var IDX_TIME_BEFORE = 10;
var IDX_USER_BEFORE = 11;
var IDX_ALLY_BEFORE = 12;
var IDX_LAST_UPDATE = 13;
var IDX_CAPITAL_FLG = 14; //本拠地フラグ

//保存データインデックス（同盟）
var IDX_ALLY_PARENT = 0; //親同盟
var IDX_ALLY_CHILDREN = 1; //子同盟リスト
var IDX_ALLY_MEMBERS = 2; //同盟員リスト

//保存データインデックス（เจ้าเมือง）
var IDX_USER_VILLAGES = 0; //拠点リスト
var IDX_USER_ALLY = 1; //所属同盟

//地図モード
var MAP_MODE_S = ""; //狭域地図
var MAP_MODE_M = "1"; //中域地図
var MAP_MODE_L = "2"; //広域地図

//入力モード
var INPUT_MODE_NAME = "1"; //名称
var INPUT_MODE_COLOR = "2"; //色

//デフォルト色定義
var USER_COLORS_DEF = new Array("#0000a0", "#a00000", "#00a000", "#808000", 
	"#008080", "#505050", "#505050", "#505050", "#505050", "#505050");
var ALLY_COLORS_DEF = new Array("#a0a0ff", "#ffa0a0", "#a0ffa0", "#ffff80", 
	"#80ffff", "#ff80ff", "#40c0ff", "#ffc040", "#c0ff40", "#b0b0b0");
var NPC_COLOR = "purple";
var ETC_COLOR = "lightgrey";

//CSV出力
var CSV_RADIUS_S = 25; //半径S
var CSV_RADIUS_L = 100; //半径L

//グローバル変数
var USERS; //君主名
var ALLYS; //同盟名
var USER_COLORS; //君主色
var ALLY_COLORS; //同盟色
var CENTER_X; //中心X座標
var CENTER_Y; //中心Y座標
var MY_X = 0; //自拠点X座標
var MY_Y = 0; //自拠点Y座標
var BASE_TIME = ""; //基準時刻
var MAP_MODE = MAP_MODE_S; //地図モード（狭域/มุมมอง map tool/มุมมองแบบกว้าง）
var INPUT_MODE = INPUT_MODE_NAME; //入力モード（名称/色）
var DISP_NPC_YET = false; //未攻略NPC表示フラグ
var DISP_NPC_FALLEN = false; //攻略済NPC表示フラグ
var MATCH_FULL = false; //完全一致フラグ
var MAP_SCALE; //地図幅
var LOADED_MAPS = new Array();
var CELLS_CACHE = new Array();
var ALLYS_CACHE = new Array();
var USERS_CACHE = new Array();
var ALLYS_INDEX = new Array();
var USERS_INDEX = new Array();

//マウスドラッグ用
var MOUSE_DRAGGING = false;
var MOUSE_DRAG_START_X;
var MOUSE_DRAG_START_Y;

//main
(function(){
	
	//mixi鯖障害回避用: 広告iframe内で呼び出されたら無視
	var container = document.evaluate('//*[@id="container"]',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (container.snapshotLength == 0) return;
	
	initGMWrapper();
	BASE_TIME = getBaseTime();
	ALLYS_INDEX = GM_getValue(location.hostname + "ALLYS_INDEX", "").split(DELIMIT);
	USERS_INDEX = GM_getValue(location.hostname + "USERS_INDEX", "").split(DELIMIT);
	
	//地図ページ
	if (location.pathname == "/map.php") {
		
		//地図サイズ
		MAP_SCALE = getMapScale();
		
		//中心座標取得
		CENTER_X = parseInt(getParameter("x"));
		if (isNaN(CENTER_X)) CENTER_X = 0;
		CENTER_Y = parseInt(getParameter("y"));
		if (isNaN(CENTER_Y)) CENTER_Y = 0;
		
		//マップモード取得
		MAP_MODE = GM_getValue(location.hostname + "MAP_MODE", "");
		GM_setValue(location.hostname + "MAP_MODE", "");
		
		//自拠点座標取得
		var xy = getMyXY();
		if (xy == "") {
			MY_X = 0;
			MY_Y = 0;
		} else {
			MY_X = parseInt(xy.split(",")[0]);
			MY_Y = parseInt(xy.split(",")[1]);
		}
		
		//名称取得
		USERS = loadNames("USERS");
		ALLYS = loadNames("ALLYS");
		
		//色取得
		USER_COLORS = loadColors("USER_COLORS", USER_COLORS_DEF);
		ALLY_COLORS = loadColors("ALLY_COLORS", ALLY_COLORS_DEF);
		
		//NPC表示フラグ
		DISP_NPC_YET = GM_getValue(location.hostname + "DISP_NPC_YET", true);
		DISP_NPC_FALLEN = GM_getValue(location.hostname + "DISP_NPC_FALLEN", false);
		
		//完全一致フラグ
		MATCH_FULL = GM_getValue(location.hostname + "MATCH_FULL", false);
		
		saveMapData();
		window.setTimeout(saveCapital, 0);
		window.setTimeout(saveAllyForMap, 0);
		window.setTimeout(markChangeArea, 0);
		window.setTimeout(defaultTargets, 0);
		window.setTimeout(addMapHtml, 0);
		window.setTimeout(changeMap, 0);
		
	//同盟トップページ
	} else if (location.pathname == "/alliance/info.php") {
		saveAllyForAllyInfo();
		
	//君主プロフィールページ
	} else if (location.pathname == "/user/" || location.pathname == "/user/index.php") {
		saveUserForProf();
	}
	
	window.setTimeout(saveAllysIndex, 0);
	window.setTimeout(saveUsersIndex, 0);
})();

//地図データ保存
function saveMapData() {
	var areas = document.evaluate('//*[@id="mapOverlayMap"]//area/@onmouseover',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < areas.snapshotLength; i++) {
		rowText = areas.snapshotItem(i).textContent;
		rowText = rowText.replace(/^.*mapInfoView/, "mapInfoViewCustom");
		rowText = rowText.replace(/^.*rewrite/, "mapInfoViewCustom");
		rowText = rowText.replace(/\); .*$/, ");");
		eval(rowText);
	}
}
function mapInfoViewCustom(h,k,g,l,e,c,b,f,j,d,i,a) {
	window.setTimeout(function() {
		var key = location.hostname + l;
		var xy = l.replace(/^\((-?[0-9]+\,-?[0-9]+)\)$/, "$1");
		
		//前セルデータ取得
		var data = loadCellData(key);
		
		//保存データ作成
		data = updateMapCellBefore(data);
		data[IDX_VILLAGE_NAME] = h; //地名
		data[IDX_USER_NAME] = k; //君主名
		data[IDX_POPULATION] = (g=="-") ? "" : g; //人口
		data[IDX_ALLIANCER] = e; //同盟名
		data[IDX_POWER] = c; //戦力
		data[IDX_WOOD] = f; //森
		data[IDX_STONE] = j; //岩
		data[IDX_IRON] = d; //鉄
		data[IDX_RICE] = i; //穀
		data[IDX_NPC_FLG] = a; //NPC拠点
		data[IDX_CAPITAL_FLG] = "";
		
		//Greasemonkey領域に永続保存
		saveCellData(key, data);
		
		//同盟⇔君主→拠点関係性情報更新
		if (data[IDX_USER_NAME] != "") {
			//君主所属同盟情報更新
			updateAllyMember(data[IDX_USER_NAME], data[IDX_ALLIANCER]);
			
			//拠点情報更新
			if (data[IDX_POPULATION] != "" || data[IDX_NPC_FLG] == "1") {
				var userData = getUserDataCache(data[IDX_USER_NAME]);
				if (searchArrayItem(userData[IDX_USER_VILLAGES], xy) < 0) {
					userData[IDX_USER_VILLAGES].push(xy);
					saveUserData(data[IDX_USER_NAME], userData);
				}
			}
		}
		
		//NPC砦を登録
		if (data[IDX_NPC_FLG] == "1") {
			saveNpcsIndex(xy);
		}
	}, 0);
}

//前所有者情報が基準時刻より古かったら更新
function updateMapCellBefore(data) {
	if (data[IDX_TIME_BEFORE] == undefined || 
		data[IDX_TIME_BEFORE] < BASE_TIME) {
		
		data[IDX_TIME_BEFORE] = getCurrentTime2(); //前所有者更新時刻
		data[IDX_USER_BEFORE] = data[IDX_USER_NAME]; //前君主
		data[IDX_ALLY_BEFORE] = data[IDX_ALLIANCER]; //前同盟
	}
	return data;
}

//地図のマスデータを保存
function saveCellData(key, data) {
	
	//初回表示時の変更チェックを回避
	if (data[IDX_USER_BEFORE] == undefined) {
		data[IDX_USER_BEFORE] = data[IDX_USER_NAME];
	}
	if (data[IDX_ALLY_BEFORE] == undefined) {
		data[IDX_ALLY_BEFORE] = data[IDX_ALLIANCER];
	}
	
	//最終更新日時
	data[IDX_LAST_UPDATE] = getCurrentTime();
	
	//Greasemonkey領域に永続保存
	GM_setValue(key, genDelimitString(data, DELIMIT));
//console.log(key + ": " + data);
	CELLS_CACHE[key] = data;
}

//地図のマスデータを読み込み
function loadCellData(key) {
	var data = new Array();
	
	//Greasemonkey領域から取得
	var dataStr = GM_getValue(key);
	if (dataStr != undefined) {
		data = dataStr.split(DELIMIT);
	}
	
	return data;
}

//地図のマスデータのキャッシュを取得
function getCellDataCache(key) {
	if (CELLS_CACHE[key] == undefined) {
		CELLS_CACHE[key] = loadCellData(key);
	}
	return CELLS_CACHE[key];
}

//本拠地フラグ保存
function saveCapital() {
	var myAlly;
	var imgs = document.evaluate('//*[@id="mapsAll"]//img',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < imgs.snapshotLength; i++) {
		var className = imgs.snapshotItem(i).className;
		var src = imgs.snapshotItem(i).src;
		
		if (!className.match(/mapAll[0-9]+/)) {
			continue;
		}
		
		if (src.match(/capital_[a-z]+_[a-z]+\.png$/)) {
			var xy = getXyFromMapClass(className);
			var key = generateCellKey(xy[0], xy[1]);
			var data = getCellDataCache(key);
			data[IDX_CAPITAL_FLG] = "1";
			saveCellData(key, data);
		}
	}
}

//配下同盟データ保存（全体地図ページ）
function saveAllyForMap() {
	var myAlly;
	var depAllys = new Array(); //自同盟の配下である同盟
	var aloneAllys = new Array(); //自同盟の配下でない同盟
	var imgs = document.evaluate('//*[@id="mapsAll"]//img',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < imgs.snapshotLength; i++) {
		var className = imgs.snapshotItem(i).className;
		var src = imgs.snapshotItem(i).src;
		
		if (!className.match(/mapAll[0-9]+/)) {
			continue;
		}
		
		if (src.match(/_b_.\.png$/) || src.match(/_g_.\.png$/)) {
			if (myAlly == undefined) {
				myAlly = getAllyFromMapClass(className);
			}
		} else if (src.match(/_bk_.\.png$/)) {
			var allyName = getAllyFromMapClass(className);
			depAllys[allyName] = allyName;
		} else {
			var allyName = getAllyFromMapClass(className);
			aloneAllys[allyName] = allyName;
		}
	}
	
	//Greasemonkey領域に永続保存
	if (myAlly != undefined && myAlly != "") {
		
		//自同盟の配下である同盟
		for (var i in depAllys) {
			updateParentAlly(i, myAlly);
		}
		
		//自同盟の配下でない同盟
		for (var i in aloneAllys) {
			var before = getParentAlly(i);
			
			//かつては自同盟配下だった同盟
			if (before == myAlly) {
				updateParentAlly(i, "");
			}
		}
	}
}

//配下同盟データ保存（同盟情報ページ）
function saveAllyForAllyInfo() {
	
	//「略称」欄取得
	var myAlly = "";
	var myAllyElem = document.evaluate(
		'//*[@id="gray02Wrapper"]//table/tbody/tr[3]/td',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (myAllyElem.snapshotLength == 0) return;
	myAlly = myAllyElem.snapshotItem(0).innerHTML;
	
	//「状態」欄取得
	var parentAlly = "";
	var statElem = document.evaluate(
		'//*[@id="gray02Wrapper"]//table/tbody/tr[6]/td',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	if (statElem.snapshotItem(0).innerHTML.match(/親同盟/)) {
		var parentAllyElem = document.evaluate(
			'//*[@id="gray02Wrapper"]//table/tbody/tr[6]/td/a',
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (parentAllyElem.snapshotLength >= 1) {
			parentAlly = parentAllyElem.snapshotItem(0).innerHTML;
		}
	}
	
	//Greasemonkey領域に永続保存
	updateParentAlly(myAlly, parentAlly);
}

//君主領地データ保存（プロフィールページ）
function saveUserForProf() {
	
	//「君主」欄取得
	var user = "";
	var userElem = document.evaluate(
		'//*[@id="gray02Wrapper"]//table/tbody/tr[2]/td[2]',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	user = userElem.snapshotItem(0).innerHTML;
	
	//「同盟」欄取得
	var ally = "";
	var allyElem = document.evaluate(
		'//*[@id="gray02Wrapper"]//table/tbody/tr[3]/td[4]/a',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	ally = allyElem.snapshotItem(0).innerHTML;
	
	//「国情報」欄取得
	var landElems = document.evaluate(
		'//*[@id="gray02Wrapper"]//table/tbody/tr',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var isLandList =false;
	var villages = new Array();
	for (var i=0; i<landElems.snapshotLength; i++) {
		var item = landElems.snapshotItem(i);
		
		if (!isLandList) {
			if (trim(getChildElement(item, 0).innerHTML) == "Name") {
				isLandList = true;
			}
			continue;
		}
		
		//地名を取得
		var land = trim(getChildElement(getChildElement(item, 0), 0).innerHTML);
		
		//座標を取得
		var xySrc = getChildElement(item, 1).innerHTML;
		xySrc = "" + xySrc.match(/-?[0-9]+\,-?[0-9]+/i);
		var xy = xySrc.split(",");
		var x = xy[0];
		var y = xy[1];
		if (!isNumeric(x) || !isNumeric(y)) continue;
		
		//人口を取得
		var popul = getChildElement(item, 2).innerHTML;
		if (!isNumeric(popul)) popul = "";
		
		//マスデータを更新
		var key = generateCellKey(x, y);
		var data = loadCellData(key);
		data = updateMapCellBefore(data);
		data[IDX_VILLAGE_NAME] = land;
		data[IDX_USER_NAME] = user;
		data[IDX_POPULATION] = popul;
		data[IDX_ALLIANCER] = ally;
		if (!data[IDX_CAPITAL_FLG]) data[IDX_CAPITAL_FLG] = "";
		saveCellData(key, data);
		
		//拠点の場合、座標を別領域に保存
		if (popul != "") {
			villages.push(xy);
		}
	}
	
	//同盟所属情報を更新
	updateAllyMember(user, ally);
	
	//君主の拠点データを更新
	var userData = getUserDataCache(user);
	userData[IDX_USER_VILLAGES] = villages;
	saveUserData(user, userData);
}

//MapタグのClass属性から同盟名を取得
function getAllyFromMapClass(className) {
	var xy = getXyFromMapClass(className);
	var data = getCellDataCache(generateCellKey(xy[0], xy[1]));
	var ally = data[IDX_ALLIANCER];
	if (ally == undefined) ally = "";
	
	return ally;
}

//MapタグのClass属性から座標を取得
function getXyFromMapClass(className) {
	var mapNo = parseInt(trimZero(className.replace(/mapAll/, "")));
    var x = CENTER_X - Math.floor((MAP_SCALE-1)/2) + Math.floor((mapNo-1) / MAP_SCALE);
    var y = CENTER_Y + Math.floor((MAP_SCALE-1)/2) - ((mapNo-1) % MAP_SCALE);
	return new Array(x, y);
}

//HTML要素追加
function addMapHtml() {
	var rootElem = document.createElement("div");
	rootElem.id = "maptool";
	
	var mapElem = document.evaluate('//*[@id="mapboxInner"]',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	mapElem.snapshotItem(0).insertBefore(
		rootElem, document.getElementById("mapAll").nextSibling);
	
	addLinkHtml(rootElem);
	addBodyHtml(rootElem);
	addHeadHtml(rootElem);
	if (navigator.userAgent.toLowerCase().indexOf('chrome') < 0) {
		initPopup();
	}
}

//地図ツールOpenリンク追加
function addLinkHtml(parentElem) {
	var addElem = document.createElement("div");
	parentElem.appendChild(addElem);
	addElem.id = "maptoolLink";
	addElem.style.margin = "4px 2px";
	
	//タイトル
	var titleElem =  document.createElement("span");
	titleElem.innerHTML = "Map Tool";
	titleElem.style.margin = "2px 2px";
	addElem.appendChild(titleElem);
	
	//aタグ（中域地図）
	var linkElem =  document.createElement("a");
	linkElem.id = "maptoolOpen";
	linkElem.href = "javascript:void(0);";
	linkElem.innerHTML = "มุมมอง map tool";
	linkElem.style.backgroundColor = "black";
	linkElem.style.padding = "2px 4px";
	linkElem.style.margin = "2px 2px";
	addElem.appendChild(linkElem);
	
	//aタグ（広域地図）
	var linkElem2 =  document.createElement("a");
	linkElem2.id = "maptoolOpenL";
	linkElem2.href = "javascript:void(0);";
	linkElem2.innerHTML = "มุมมองแบบกว้าง";
	linkElem2.style.backgroundColor = "black";
	linkElem2.style.padding = "2px 4px";
	linkElem2.style.margin = "2px 2px";
	addElem.appendChild(linkElem2);
	
	//aタグ（CSV出力S）
	var csvSizeS = CSV_RADIUS_S * 2 + 1;
	var linkElemCsvS =  document.createElement("a");
	linkElemCsvS.id = "maptoolCsvS";
	linkElemCsvS.href = "javascript:void(0);";
	linkElemCsvS.innerHTML = "CSV" + 
		"<span style='font-size:9px'>" + csvSizeS + "x" + csvSizeS + "</span>";
	linkElemCsvS.style.backgroundColor = "black";
	linkElemCsvS.style.padding = "2px 4px";
	linkElemCsvS.style.margin = "2px 2px";
	addElem.appendChild(linkElemCsvS);
	
	//aタグ（CSV出力L）
	var csvSizeL = CSV_RADIUS_L * 2 + 1;
	var linkElemCsvL =  document.createElement("a");
	linkElemCsvL.id = "maptoolCsvL";
	linkElemCsvL.href = "javascript:void(0);";
	linkElemCsvL.innerHTML = "CSV" + 
		"<span style='font-size:9px'>" + csvSizeL + "x" + csvSizeL + "</span>";
	linkElemCsvL.style.backgroundColor = "black";
	linkElemCsvL.style.padding = "2px 4px";
	linkElemCsvL.style.margin = "2px 2px";
	addElem.appendChild(linkElemCsvL);
	
	//イベントリスナー（中域地図）
	linkElem.addEventListener("click",
		function() {
			MAP_MODE = MAP_MODE_M;
			changeMap();
		},
		true);
	
	//イベントリスナー（広域地図）
	linkElem2.addEventListener("click",
		function() {
			MAP_MODE = MAP_MODE_L;
			changeMap();
		},
		true);
	
	//イベントリスナー（CSV出力S）
	linkElemCsvS.addEventListener("click",
		function() {
			outputMapCsvS();
		},
		true);
	
	//イベントリスナー（CSV出力L）
	linkElemCsvL.addEventListener("click",
		function() {
			outputMapCsvL();
		},
		true);
	
	//初期化機能
	if (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0) {
	
		//aタグ
		var linkElemClr =  document.createElement("a");
		linkElemClr.id = "maptoolClr";
		linkElemClr.href = "javascript:void(0);";
		linkElemClr.innerHTML = "Initialization";
		linkElemClr.style.backgroundColor = "black";
		linkElemClr.style.padding = "2px 4px";
		linkElemClr.style.margin = "2px 2px";
		addElem.appendChild(linkElemClr);
		
		//イベントリスナー
		linkElemClr.addEventListener("click",
			function() {
				if (confirm("Initializing map tool data: " + location.hostname)) {
					clearAllData();
					location.reload();
				}
			},
			true);
	}
}

//ヘッダ部HTML追加
function addHeadHtml(parentElem) {
	var addElem = document.createElement("div");
	parentElem.appendChild(addElem);
	
	addElem.id = "maptoolHead";
	addElem.style.margin = "2px 2px";
	addElem.innerHTML = 
		"<table style='font-size:11px; margin:1px;'>"+
		"<tr>"+
			"<td style='background-color:black; padding:3px 4px; text-align:center;'>"+
				"<a id='maptoolClose' href='javascript:void(0);'>มุมมองปกติ</a> "+
				"<a id='maptoolSwitch' href='javascript:void(0);'></a>"+
			"</td>"+
			"<td style='background-color:black; padding:3px 4px; "+
				"font-size:10px; font-family:monospace;'>"+
				"<a id='maptoolMoveLeft' href='javascript:void(0);'>←</a> "+
				"<a id='maptoolMoveUp' href='javascript:void(0);'>↑</a> "+
				"<a id='maptoolMoveDown' href='javascript:void(0);'>↓</a> "+
				"<a id='maptoolMoveRight' href='javascript:void(0);'>→</a>"+
			"</td>"+
			"<td style='width:4px'></td>"+
			"<td style='color:white; background-color:black; padding:0px 4px; "+
				"text-align:center;'>"+
				"<input id='maptoolTime' type='button' value='อัพเดทแผนที่' /> "+
				"<span id='base_time'></span>"+
			"</td>"+
			"<td style='width:4px'></td>"+
			"<td style='color:white; background-color:black; padding:3px 4px; "+
				"text-align:center;'>"+
				"ป้อนข้อมูล"+
				"<a id='maptoolModeName' href='javascript:void(0);'>ชื่อ</a> "+
				"<a id='maptoolModeColor' href='javascript:void(0);'>สี</a>"+
			"</td>"+
			"<td style='width:4px'></td>"+
			"<td style='color:white; background-color:black; padding:3px 4px; "+
				"text-align:center;'>"+
				"<input id='maptoolMatchFull' type='checkbox' "+
					"style='vertical-align:bottom' />มีข้อความที่ระบุเท่านั้น"+
			"</td>"+
			"<td id='version' style='font-size:9px; padding:0px 4px;'></td>"+
		"</tr>"+
		"</table>"+
		"<table style='font-size:11px; margin:1px;'>"+
		"<tr>"+
			"<td style='color:white; background-color:black; padding:3px 4px'>เจ้าเมือง</td>"+
			"<td id='fld_user1' style='padding:3px 4px;'>"+
				"<input id='user1' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user2' style='padding:3px 4px;'>"+
				"<input id='user2' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user3' style='padding:3px 4px;'>"+
				"<input id='user3' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user4' style='padding:3px 4px;'>"+
				"<input id='user4' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user5' style='padding:3px 4px;'>"+
				"<input id='user5' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user6' style='padding:3px 4px;'>"+
				"<input id='user6' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user7' style='padding:3px 4px;'>"+
				"<input id='user7' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user8' style='padding:3px 4px;'>"+
				"<input id='user8' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user9' style='padding:3px 4px;'>"+
				"<input id='user9' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user10' style='padding:3px 4px;'>"+
				"<input id='user10' type='text' style='width:50px' />"+
			"</td>"+
			"<td style='background-color:purple; color:white; padding:3px 4px;'>"+
				"NPC "+
				"<input id='fld_npc_yet' type='checkbox' style='vertical-align:bottom' />ยังไม่ถูกยึดครอง"+
				"<input id='fld_npc_fallen' type='checkbox' style='vertical-align:bottom' />ถูกยึดครองแล้ว"+
			"</td>"+
		"</tr>"+
		"<tr>"+
			"<td style='color:white; background-color:black; padding:3px 4px'>พันธมิตร</td>"+
			"<td id='fld_ally1' style='padding:3px 4px;'>"+
				"<input id='ally1' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally2' style='padding:3px 4px;'>"+
				"<input id='ally2' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally3' style='padding:3px 4px;'>"+
				"<input id='ally3' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally4' style='padding:3px 4px;'>"+
				"<input id='ally4' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally5' style='padding:3px 4px;'>"+
				"<input id='ally5' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally6' style='padding:3px 4px;'>"+
				"<input id='ally6' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally7' style='padding:3px 4px;'>"+
				"<input id='ally7' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally8' style='padding:3px 4px;'>"+
				"<input id='ally8' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally9' style='padding:3px 4px;'>"+
				"<input id='ally9' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally10' style='padding:3px 4px;'>"+
				"<input id='ally10' type='text' style='width:50px' />"+
			"</td>"+
			"<td style='background-color:black; padding:0px 2px; text-align:center;'>"+
				"<input id='maptoolSave' type='button' value='Save' />"+
			"</td>"+
		"</tr>"+
		"</table>";
	
	//バージョン
	document.getElementById("version").innerHTML = "Ver." + VERSION;
	
	//基準時刻
	var baseTime = BASE_TIME;
	if (baseTime.length == 8) baseTime += "000000";
	document.getElementById("base_time").innerHTML = 
		baseTime.substr(4, 2) + "/" + baseTime.substr(6, 2) +
		" " + baseTime.substr(8, 2) + ":" + baseTime.substr(10, 2);
	
	//完全一致
	document.getElementById("maptoolMatchFull").checked = MATCH_FULL;
	
	//項目背景着色
	setFieldColors();
	
	//เจ้าเมือง、同盟を表示
	setInputNames();
	
	//NPCを表示
	document.getElementById("fld_npc_yet").checked = DISP_NPC_YET;
	document.getElementById("fld_npc_fallen").checked = DISP_NPC_FALLEN;
	
	//イベントリスナー登録（保存ボタン）
	document.getElementById('maptoolSave').addEventListener("click",
		function() {
			
			//入力値をGreasemonkey領域に保存
			if (INPUT_MODE == INPUT_MODE_NAME) {
				saveInputUsers("USERS");
				saveInputAllys("ALLYS");
				USERS = loadNames("USERS");
				ALLYS = loadNames("ALLYS");
				defaultTargets();
				setInputNames();
				
			} else if (INPUT_MODE == INPUT_MODE_COLOR) {
				saveInputUsers("USER_COLORS");
				saveInputAllys("ALLY_COLORS");
				USER_COLORS = loadColors("USER_COLORS", USER_COLORS_DEF);
				ALLY_COLORS = loadColors("ALLY_COLORS", ALLY_COLORS_DEF);
				setInputColors();
				setFieldColors();
			}
			
			//NPC表示フラグ
			DISP_NPC_YET = document.getElementById("fld_npc_yet").checked;
			DISP_NPC_FALLEN = document.getElementById("fld_npc_fallen").checked;
			GM_setValue(location.hostname + "DISP_NPC_YET", DISP_NPC_YET);
			GM_setValue(location.hostname + "DISP_NPC_FALLEN", DISP_NPC_FALLEN);
//console.log(location.hostname + "DISP_NPC_YET: " + GM_getValue(location.hostname + "DISP_NPC_YET"));
//console.log(location.hostname + "DISP_NPC_FALLEN: " + GM_getValue(location.hostname + "DISP_NPC_FALLEN"));
			
			//地図変更
			LOADED_MAPS = new Array();
			changeMap();
		},
		true);
	
	//イベントリスナー登録（基準時更新ボタン）
	document.getElementById('maptoolTime').addEventListener("click",
		function() {
			
			//基準時間として現在時刻をGreasemonkey領域に保存
			GM_setValue(location.hostname + "BASE_TIME", getCurrentTime2());
			
			//ページリロード
			GM_setValue(location.hostname + "MAP_MODE", MAP_MODE);
			location.reload();
		},
		true);
	
	//イベントリスナー登録（狭域地図リンク）
	document.getElementById('maptoolClose').addEventListener("click",
		function() {
			MAP_MODE = MAP_MODE_S;
			changeMap();
		},
		true);
	
	//イベントリスナー登録（มุมมอง map tool/広域地図リンク）
	document.getElementById('maptoolSwitch').addEventListener("click",
		function() {
			MAP_MODE = (MAP_MODE == MAP_MODE_L ? MAP_MODE_M : MAP_MODE_L);
			changeMap();
		}, true);
	
	//イベントリスナー登録（←↑↓→リンク）
	document.getElementById('maptoolMoveLeft').addEventListener("click",
		function() { shiftMap(-1, 0); }, true);
	document.getElementById('maptoolMoveUp').addEventListener("click",
		function() { shiftMap(0, 1); }, true);
	document.getElementById('maptoolMoveDown').addEventListener("click",
		function() { shiftMap(0, -1); }, true);
	document.getElementById('maptoolMoveRight').addEventListener("click",
		function() { shiftMap(1, 0); }, true);
	
	//イベントリスナー登録（名称設定・色設定）
	document.getElementById('maptoolModeName').addEventListener("click",
		function() { setInputNames(); }, true);
	document.getElementById('maptoolModeColor').addEventListener("click",
		function() { setInputColors(); }, true);
	
	//イベントリスナー登録（完全一致チェックボックス）
	document.getElementById('maptoolMatchFull').addEventListener("click",
		function() { changeMatchMode(this.checked); }, true);
}

//本体部HTML追加
function addBodyHtml(parentElem) {
	
	//中域地図div
	var addElem = document.createElement("div");
	parentElem.appendChild(addElem);
	addElem.id = "maptoolBody";
	addElem.style.display = "none";
	
	//広域地図div
	var addElem2 = document.createElement("div");
	parentElem.appendChild(addElem2);
	addElem2.id = "maptoolBodyL";
	addElem2.style.display = "none";
	
	//มุมมอง map tool/広域地図ドラッグ＆ドロップイベントリスナー
	var elems = new Array();
	elems.push(addElem);
	elems.push(addElem2);
	for (var i=0; i<elems.length; i++) {
		elems[i].addEventListener("mousedown",
			function(event) {
				MOUSE_DRAGGING = true;
				MOUSE_DRAG_START_X = event.pageX;
				MOUSE_DRAG_START_Y = event.pageY;
				this.style.cursor = "move";
				event.preventDefault();
			},
			false);
		elems[i].addEventListener("mouseup",
			function(event) {
				if (!MOUSE_DRAGGING) {
					return true;
				}
				MOUSE_DRAGGING = false;
				this.style.cursor = "default";
				
				var offsetX = event.pageX - MOUSE_DRAG_START_X;
				var offsetY = event.pageY - MOUSE_DRAG_START_Y;
				if (Math.sqrt(offsetX*offsetX+offsetY*offsetY) > 5) {
					var cellSize;
					if (MAP_MODE == MAP_MODE_M) cellSize = CELL_SIZE_M;
					else if (MAP_MODE == MAP_MODE_L) cellSize = CELL_SIZE_L;
					
					if (cellSize != undefined) {
						moveMap(CENTER_X - Math.round(offsetX / cellSize), 
							CENTER_Y + Math.round(offsetY / cellSize));
					}
				}
				event.preventDefault();
			},
			false);
	}
}

//地図（มุมมอง map tool）本体部HTML生成
function genBodyHtml() {
	var bodyHtml = "";
	
	bodyHtml += "<table style='border:1px solid gray; font-size:" + FONT_SIZE + "'>\n";
	
	//各マス作成
	for (var y=CENTER_Y+RADIUS; y>=CENTER_Y-RADIUS; y--) {
		bodyHtml += "<tr style='height:" + CELL_SIZE_M + "px'>\n";
		
		for (var x=CENTER_X-RADIUS; x<=CENTER_X+RADIUS; x++) {
			bodyHtml += generateMapCellHtml(x, y);
		}
		bodyHtml += "</tr>\n";
	}
	
	bodyHtml += "</table>\n";
	
	return bodyHtml;
}

//地図（มุมมองแบบกว้าง）本体部HTML生成
function genBodyHtmlL() {
	var bodyHtml = "";
	
	var width = (RADIUS_L * 2 + 1) * CELL_SIZE_L;
	bodyHtml +=
		"<div id='mapBodyL' style='background-color:lightgray; color:white; " + 
		"position:relative; overflow:hidden; " + 
		"width:" + width + "px; height:" + width + "px;'>\r\n";
	
	//中心線
	bodyHtml += 
		"<div style='background-color:darkgray; position:absolute; " +
		"width:" + width + "px; height:1px; " +
		"left:0px; top:" + (Math.floor(width/2) + 1) + "px;'></div>";
	bodyHtml += 
		"<div style='background-color:darkgray; position:absolute; " +
		"width:1px; height:" + width + "px; " +
		"left:" + (Math.floor(width/2) + 1) + "px; top:0px;'></div>";
	
	//同盟単位
	for (var i = ALLYS.length - 1; i >= 0; i--) {
		var allySub = ALLYS[i];
		if (allySub == "") {
			continue;
		}
		
		//名称が部分一致する同盟が対象
		var matchAllys = searchArrayString(ALLYS_INDEX, allySub);
		for (var j=0; j<matchAllys.length; j++) {
			var allyData = getAllyDataCache(matchAllys[j]);
			var members = allyData[IDX_ALLY_MEMBERS];
			for (var k=0; k<members.length; k++) {
				bodyHtml += genUserVillageHtml(members[k], ALLY_COLORS[i], matchAllys[j], 1);
			}
		}
	}
	
	//NPC拠点
	if (DISP_NPC_YET || DISP_NPC_FALLEN) {
		var npcs = splitDelimited(
			GM_getValue(location.hostname + "NPCS_INDEX", ""), DELIMIT);
		bodyHtml += genVillagesHtml(npcs, "", NPC_COLOR, 3);
	}
	
	//君主単位
	for (var i = USERS.length - 1; i >= 0; i--) {
		var userSub = USERS[i];
		if (userSub == "") {
			continue;
		}
		
		//名称が部分一致する君主が対象
		var matchUsers = searchArrayString(USERS_INDEX, userSub);
		for (var j=0; j<matchUsers.length; j++) {
			bodyHtml += genUserVillageHtml(matchUsers[j], USER_COLORS[i], "", 2);
		}
	}
	
	bodyHtml += "</div>";
	
	return bodyHtml;
}

//君主下各拠点のHTML生成（広域地図）
function genUserVillageHtml(user, color, ally, priority) {
	var ret = "";
	var userData = getUserDataCache(user);
	
	//既に同盟から抜けている場合はスキップ
	if (ally != "" && ally != userData[IDX_USER_ALLY]) {
		return "";
	}
	
	//各拠点HTML生成
	var villages = userData[IDX_USER_VILLAGES];
	ret = genVillagesHtml(villages, user, color, priority);
	
	return ret;
}

//拠点表示（複数分）HTML生成（広域地図）
function genVillagesHtml(villages, user, color, priority) {
	var ret = "";
	
	for (var j = 0; j < villages.length; j++) {
		var x = parseInt(villages[j].split(",")[0]);
		var y = parseInt(villages[j].split(",")[1]);
		if (isNaN(x) || isNaN(y)) {
			continue;
		}
		ret += genVillageHtml(user, color, x, y, priority) + "\r\n";
	}
	
	return ret;
}

//拠点表示HTML生成（広域地図）
function genVillageHtml(user, color, x, y, priority) {
	
	//画面範囲外ならスキップ
	if (x < CENTER_X-RADIUS_L-5 || x > CENTER_X+RADIUS_L+5) return "";
	if (y < CENTER_Y-RADIUS_L-5 || y > CENTER_Y+RADIUS_L+5) return "";
	
	//マスデータ取得
	var data = loadCellData(generateCellKey(x, y));
	
	//表示対象外はスキップ
	if (data[IDX_NPC_FLG] == "1") {
		//NPCの表示指定がない場合はスキップ
		var disp = false;
		if (data[IDX_ALLIANCER] == NPC_ALLY) {
			if (DISP_NPC_YET) {
				disp = true;
			}
		} else {
			if (DISP_NPC_FALLEN) {
				if (user == "") disp = true;
			} else {
				if (user != "") disp = true;
			}
		}
		if (!disp) return "";
		
	} else {
		//既に拠点がない場合はスキップ
		if ((data[IDX_POPULATION] == undefined || data[IDX_POPULATION] == "" ||
			data[IDX_USER_NAME] != user)) {
			return "";
		}
	}
	
	//四角形のサイズを決定
	var size;
	if (data[IDX_NPC_FLG] == "1") {
		if (data[IDX_POWER].length <= 3) size = 3;
		else if (data[IDX_POWER].length <= 6) size = 4;
		else size = 5;
	} else {
		var population = parseInt(data[IDX_POPULATION]);
		if (population < 100) size = 1;
		else if (population < 250) size = 2;
		else if (population < 600) size = 3;
		else if (population < 1000) size = 4;
		else size = 5;
	}
	
	var borderWidth = 1;
	var width = (size + 1) * 2 + 1 - borderWidth * 2;
	var left = (x - (CENTER_X - RADIUS_L)) * CELL_SIZE_L - (width-CELL_SIZE_L)/2;
	var top = ((CENTER_Y + RADIUS_L) - y) * CELL_SIZE_L - (width-CELL_SIZE_L)/2;
	var zIndex = priority * 10 + (9 - size);
	var popupText = genPopupText(data, x, y);
	
	var ret = 
		"<a href='" + getMapUrl(x, y) + "'>" +
		"<div style='background-color:" + color + "; z-index:" + zIndex + "; " +
		"width:" + width + "px; height:" + width + "px; " +
		"left:" + left + "px; top:" + top + "px; " +
		"position:absolute; border:outset " + borderWidth + "px " + color + "' ";
	if (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0) {
		ret += "title='" + popupText.replace(/<br\/>/g, "\n") + "'>";
	} else {
		ret += "onMouseOver='onPopup(\"" + popupText + "\", event.pageX, event.pageY)' " +
			"onMouseOut='offPopup()'>";
	}
	ret += "</div></a>";
	
	return ret;
}


//説明ポップアップ初期化
function initPopup() {

	//CSS
	addGlobalStyle(
		".popup{"+
			"position:absolute; left:0px; top:0px; visibility:hidden; "+
			"font-size:9pt; color:#0099FF; "+
			"background-color:#FFFFFF; layer-background-color:#FFFFFF; "+
			"border:1px solid #0099FF; padding:5; z-index:255;"+
		"}"
	);
	
	//表示関数
	var funcHTML = 
		'function onPopup(text, nX, nY) {\n'+
			'var sX = -10, sY = 24;\n'+
			'var msgElem = document.getElementById("popup");\n'+
			'msgElem.innerHTML = text;\n'+
			'msgElem.style.visibility = "visible";\n'+
			'msgElem.style.left = (nX + sX) + "px";\n'+
			'msgElem.style.top = (nY + sY) + "px";\n'+
		'}\n'+
		'function offPopup() {\n'+
			'document.getElementById("popup").style.visibility = "hidden";\n'+
		'}\n';
	var scriptElem = document.createElement("script");
	scriptElem.type = "text/javascript";
	scriptElem.innerHTML = funcHTML;
	document.getElementsByTagName("head")[0].appendChild(scriptElem);
	
	//HTMLタグ追加
	var popupElem = document.createElement('span');
	popupElem.id = "popup";
	popupElem.className = "popup";
	var mapElem = document.evaluate('//*[@id="maptool"]',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	mapElem.snapshotItem(0).appendChild(popupElem);
	
	//イベントリスナー登録
	popupElem.addEventListener("mouseover",
		function() { this.style.visibility = "hidden" }, true);
}

//所有者が変わった領地に印
function markChangeArea() {
	var markHtml = "";
	
	var mapElem = document.evaluate('//*[@id="mapsAll"]', document, 
		null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	
	var baseX = CENTER_X - Math.floor((MAP_SCALE-1)/2);
	var baseY = CENTER_Y + Math.floor((MAP_SCALE-1)/2);
	for (var x = baseX; x <= baseX + MAP_SCALE - 1; x++) {
		for (var y = baseY; y >= baseY - MAP_SCALE + 1; y--) {
			
			//保存データ取得
			var data = getCellDataCache(generateCellKey(x, y));
			var userBefore = data[IDX_USER_BEFORE];
			var userAfter = data[IDX_USER_NAME];
			
			if (userBefore == userAfter) {
				continue;
			}
			
			//チェック画像
			var areaNo = (x - baseX) * MAP_SCALE + (baseY - y) + 1;
			var addElem = document.createElement("img");
			addElem.className = "mapAll" + padZero(areaNo);
			addElem.alt = "change";
			addElem.src = "data:image/gif;base64,"+
				"R0lGODlhPAA8AHcAMSH+GlNvZnR3YXJlOiBNaWNyb3NvZnQgT2ZmaWNlACH5BAEAAAAALBMAHgAZ"+
				"ABQAgAAAAP4AAAIyhI+ZwayPmoRUOvpswFDzbH2KJy5TGZ2oQa5AyF0HjKltddK1pn58s/q5eC5W"+
				"byhDFQAAOw==";
			
			mapElem.appendChild(addElem);
		}
	}
}

//地図幅の取得
function getMapScale() {
	var sort15 = document.evaluate('//*[@id="changemapscale"]/ul/li[@class="sort15 now"]',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (sort15.snapshotLength != 0) {
		return 15;
	}
	
	var sort20 = document.evaluate('//*[@id="changemapscale"]/ul/li[@class="sort20 now"]',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (sort20.snapshotLength != 0) {
		return 20;
	}
	
	return 11;
}

//เจ้าเมือง、同盟の指定がない場合は中心座標の君主をデフォルト
function defaultTargets() {
	if (USERS[0] != "" || ALLYS[0] != "") {
		return;
	}
	
	var data = getCellDataCache(generateCellKey(CENTER_X, CENTER_Y));
	if (data.length > 0) {
		USERS[0] = data[IDX_USER_NAME];
		ALLYS[0] = data[IDX_ALLIANCER];
	}
}

//名称入力欄設定
function setInputNames() {
	INPUT_MODE = INPUT_MODE_NAME;
	setInputLink("maptoolModeName");
	setInputs(USERS, ALLYS, "");
}
//色入力欄設定
function setInputColors() {
	INPUT_MODE = INPUT_MODE_COLOR;
	setInputLink("maptoolModeColor");
	setInputs(USER_COLORS, ALLY_COLORS, "monospace");
}
//リンク背景色設定
function setInputLink(id) {
	var linkIds = new Array("maptoolModeName", "maptoolModeColor");
	for (var i = 0; i < linkIds.length; i++) {
		var elem = document.getElementById(linkIds[i]);
		if (linkIds[i] == id) {
			elem.style.backgroundColor = "dimgray";
		} else {
			elem.style.backgroundColor = "";
		}
	}
}

//入力欄設定
function setInputs(users, allys, fontFamily) {
	
	//各テキストボックスを初期化
	for (var i = 0; i < USER_COLORS.length; i++) {
		var field = document.getElementById("user" + (i+1));
		field.value = "";
		field.style.fontFamily = fontFamily;
	}
	for (var i = 0; i < ALLY_COLORS.length; i++) {
		var field = document.getElementById("ally" + (i+1));
		field.value = "";
		field.style.fontFamily = fontFamily;
	}
	
	//各テキストボックスに設定
	for (var i = 0; i < users.length; i++) {
		document.getElementById("user" + (i+1)).value = users[i];
	}
	for (var i = 0; i < allys.length; i++) {
		document.getElementById("ally" + (i+1)).value = allys[i];
	}
}

//入力欄背景色設定
function setFieldColors() {
	for (var i = 0; i < USER_COLORS.length; i++) {
		document.getElementById("fld_user" + (i+1)).style.backgroundColor = USER_COLORS[i];
	}
	for (var i = 0; i < ALLY_COLORS.length; i++) {
		document.getElementById("fld_ally" + (i+1)).style.backgroundColor = ALLY_COLORS[i];
	}
}

//地図1マス生成
function generateMapCellHtml(x, y) {
	var cellHtml = "";
	
	//保存データ取得
	var data = loadCellData(generateCellKey(x, y));
	var user = data[IDX_USER_NAME];
	var population = data[IDX_POPULATION];
	var ally = data[IDX_ALLIANCER];
	var power = data[IDX_POWER];
	var npcFlg = data[IDX_NPC_FLG];
	var capitalFlg = data[IDX_CAPITAL_FLG];
	var timeBefore = data[IDX_TIME_BEFORE];
	var userBefore = data[IDX_USER_BEFORE];
	var parentAlly = getParentAlly(ally);
	
	//背景色
	var bgColor;
	var reverse = false;
	if (user == undefined) {
		bgColor = "gray";
	} else if (user == "") {
		bgColor = "white";
 	} else if (npcFlg == "1" && 
 		((DISP_NPC_YET && ally == NPC_ALLY) || (DISP_NPC_FALLEN && ally != NPC_ALLY))) {
		bgColor = NPC_COLOR;
		reverse = true;
	}
	if (bgColor == undefined) {
		for (var i=0; i<USERS.length; i++) {
			if (matchString(user, USERS[i])) {
				bgColor = USER_COLORS[i];
				reverse = true;
				break;
			}
		}
	}
	if (bgColor == undefined) {
		for (var i=0; i<ALLYS.length; i++) {
			if (matchString(ally, ALLYS[i]) || matchString(parentAlly, ALLYS[i])) {
				bgColor = ALLY_COLORS[i];
				break;
			}
		}
	}
	if (bgColor == undefined) {
		bgColor = ETC_COLOR;
	}
	
	//マス情報は新しい？
	var isNewData = (timeBefore >= BASE_TIME);
	
	//所有者変更有無チェック
	var isDiff = (userBefore != user && isNewData);
	
	//ポップアップ内容
	var popupText = genPopupText(data, x, y);
	
	//データが古いマスに目印
	var borderStyle = "";
	if (!isNewData) {
		if (reverse) {
			borderStyle = "border: solid lightgrey 1px;";
		} else {
			borderStyle = "border: solid gray 1px;"
		}
	}
	
	//中心マスに目印
	if (x==CENTER_X && y==CENTER_Y) {
		var borderColor;
		if (reverse) borderColor = "black";
		else borderColor = "black";
		borderStyle = "border: solid "+borderColor+" 2px;";
	}
	
	//☆多領地、人口多拠点を強調
	var hiPowerStyle, textColor;
	if ((power != undefined && power.length >= HI_POWER) || 
		(population != undefined && parseInt(population) > HI_POPUL)) {
		hiPowerStyle = "font-weight:bold;";
		if (reverse) textColor = "white";
		else textColor = "black";
	} else {
		hiPowerStyle = "";
		if (reverse) textColor = "lightgray";
		else textColor = "dimgray";
	}
	
	//配下同盟表示
	var anchorStyle = "";
	if (ally != "" && parentAlly != "" && !reverse) {
		anchorStyle += "background-color:whitesmoke;";
	}
	
	//攻略済みNPC表示
//	if (DISP_NPC_FALLEN && npcFlg == "1" && ally != NPC_ALLY) {
//		anchorStyle += "background-color:" + NPC_COLOR + ";";
//		textColor = "lightgray";
//	}
	
	//本拠地表示
	if (capitalFlg == "1") {
		anchorStyle += "border:dotted 1px " + textColor + ";";

	}
	
	//所有者変更表示
	if (isDiff) {
		if (reverse) textColor = "pink";
		else textColor = "red";
	}
	
	//tdタグ
	cellHtml += "<td style='width:" + CELL_SIZE_M + "px; text-align:center; " +
		"background-color:" + bgColor + ";" + borderStyle + hiPowerStyle + "'>";
	
	//座標リンク
	cellHtml += "<a href='" + getMapUrl(x, y) + "' " +
		"style='color:" + textColor + "; text-decoration:none; " + anchorStyle + "' ";
	if (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0) {
		cellHtml += "title='" + popupText.replace(/<br\/>/g, "\n") + "'>";
	} else {
		cellHtml += "onMouseOver='onPopup(\"" + popupText + "\", event.pageX, event.pageY)' " +
			"onMouseOut='offPopup'>";
	}
	
	//☆数(領地) 、「P」(PC)、「N」(NPC)
	if (data.length == 0) cellHtml += "　";
	else if (npcFlg == "1") cellHtml += "N";
	else if (population != "") cellHtml += "P";
	else if (power == "") cellHtml += "?";
	else cellHtml += power.length;
	
	cellHtml += "</a>";
	cellHtml += "</td>\n";
	
	return cellHtml;
}

//ポップアップテキスト生成
function genPopupText(data, x, y) {
	var village = data[IDX_VILLAGE_NAME];
	var user = data[IDX_USER_NAME];
	var population = data[IDX_POPULATION];
	var ally = data[IDX_ALLIANCER];
	var power = data[IDX_POWER];
	var material = 
		"ไม้"+data[IDX_WOOD] +
		" หิน"+data[IDX_STONE] +
		" เหล็ก"+data[IDX_IRON] +
		" อาหาร"+data[IDX_RICE];
	var npcFlg = data[IDX_NPC_FLG];
	var userBefore = data[IDX_USER_BEFORE];
	var allyBefore = data[IDX_ALLY_BEFORE];
	var lastUpdate = data[IDX_LAST_UPDATE];
	var parentAlly = getParentAlly(ally);
	
	//自拠点からの距離
	var distance = -1;
	if (MY_X != 0 || MY_Y != 0) {
		distance = Math.sqrt((MY_X-x)*(MY_X-x)+(MY_Y-y)*(MY_Y-y));
		distance = Math.round(distance * 100) / 100;
	}
	
	//[地名]([座標])/[[距離]]
	if (village == undefined) village = "ไม่ทราบ";
	var popupText = "";
	popupText += village;
	popupText += "(" + x + "," + y + ")"
	if (distance >= 0) {
		popupText += " / "
		popupText += "[" + distance + "]"
	}
	popupText += "<br/>";
	
	//[君主名]@[同盟名]@[親同盟]([前君主名]@[同盟名])
	var exists = false;
	if (user != undefined && user != "") {
		popupText += user + "@" + ally;
		if (parentAlly != "") popupText += "@" + parentAlly;
		exists = true;
	}
	if (userBefore != user && userBefore != undefined && userBefore != "") {
		popupText += "(" + userBefore + "@" + allyBefore + ")";
		exists = true;
	}
	if (exists) {
		popupText += "<br/>";
	}
	//NPC戦力
	if (npcFlg == "1") {
		popupText += power + "<br/>";
	//資源
	} else if (power != undefined && power != "" && npcFlg != "1") {
		popupText += material + "<br/>";
	//人口
	} else if (population != undefined && population != "") {
		popupText += "ประชากร" + population + "<br/>";
	}
	//最終更新日時
	if (lastUpdate != undefined) {
		var dateText = lastUpdate;
		dateText = dateText.replace(/^[0-9]{4}\//, "");
		dateText = dateText.replace(/:[0-9]{2}$/, "");
		popupText += dateText;
	}
	
	return popupText;
}

//地図切り替え
function changeMap() {
	//現在の表示を消去
	if (MAP_MODE != MAP_MODE_S) {
		document.getElementById("mapAll").style.display = "none";
		document.getElementById("maptoolLink").style.display = "none";
	} else {
		document.getElementById("maptoolHead").style.display = "none";
	}
	if (MAP_MODE != MAP_MODE_M) {
		document.getElementById("maptoolBody").style.display = "none";
	}
	if (MAP_MODE != MAP_MODE_L) {
		document.getElementById("maptoolBodyL").style.display = "none";
	}
	
	//地図ツール共通部表示
	if (MAP_MODE != MAP_MODE_S) {
		document.getElementById("maptoolHead").style.display = "block";
		
		var switchName;
		if (MAP_MODE == MAP_MODE_M) switchName = "มุมมองแบบกว้าง";
		if (MAP_MODE == MAP_MODE_L) switchName = "มุมมอง map tool";
		document.getElementById("maptoolSwitch").innerHTML = switchName;
		
		if (MAP_MODE == MAP_MODE_L) {
			document.getElementById("maptoolTime").disabled = true;
		} else {
			document.getElementById("maptoolTime").disabled = false;
		}
	}
	
	//時間がかかるので別スレッド化（一旦描画して砂時計を表示させる）
	setWaitCursor();
	window.setTimeout(function() {
		//地図ツール個別部表示
		if (MAP_MODE == MAP_MODE_M) {
			//中域地図
			document.getElementById("maptoolBody").style.display = "block";
		} else if (MAP_MODE == MAP_MODE_L) {
			//広域地図
			document.getElementById("maptoolBodyL").style.display = "block";
		} else {
			//狭域地図
			var x = parseInt(getParameter("x"));
			if (isNaN(x)) x = 0;
			var y = parseInt(getParameter("y"));
			if (isNaN(y)) y = 0;
			if (x == CENTER_X && y == CENTER_Y) {
				document.getElementById("mapAll").style.display = "block";
				document.getElementById("maptoolLink").style.display = "block";
				window.scroll(0,0);
			} else {
				//ページリロード
				GM_setValue(location.hostname + "MAP_MODE", MAP_MODE);
				location.href = getMapUrl(CENTER_X, CENTER_Y);
			}
		}
		
		//未表示の場合はHTML生成
		if (LOADED_MAPS[MAP_MODE] != "1") {
//console.log((new Date()).getTime());
			if (MAP_MODE == MAP_MODE_M) {
				document.getElementById("maptoolBody").innerHTML = genBodyHtml();
			} else if (MAP_MODE == MAP_MODE_L) {
				document.getElementById("maptoolBodyL").innerHTML = genBodyHtmlL();
			}
//console.log((new Date()).getTime());
			
			LOADED_MAPS[MAP_MODE] = "1";
		}
		
		resetCursor();
	}, 0);
}

//同盟データ読み込み
function loadAllyData(ally) {
	var ret = new Array();
	var src = GM_getValue(generateAllyKey(ally), "");
	
	var array1 = src.split(DELIMIT);
	ret[IDX_ALLY_PARENT] = array1[IDX_ALLY_PARENT];
	if (ret[IDX_ALLY_PARENT] == undefined) ret[IDX_ALLY_PARENT] = "";
	
	var chiliren = new Array();
	if (array1[IDX_ALLY_CHILDREN] != undefined && array1[IDX_ALLY_CHILDREN] != "") {
		chiliren = array1[IDX_ALLY_CHILDREN].split(DELIMIT2);
	}
	ret[IDX_ALLY_CHILDREN] = chiliren;
	
	var members = new Array();
	if (array1[IDX_ALLY_MEMBERS] != undefined && array1[IDX_ALLY_MEMBERS] != "") {
		members = array1[IDX_ALLY_MEMBERS].split(DELIMIT2);
	}
	ret[IDX_ALLY_MEMBERS] = members;
	
	return ret;
}

//同盟データ保存
function saveAllyData(ally, data) {
	var dataArray = new Array();
	dataArray[IDX_ALLY_PARENT] = data[IDX_ALLY_PARENT];
	dataArray[IDX_ALLY_CHILDREN] = genDelimitString(data[IDX_ALLY_CHILDREN], DELIMIT2);
	dataArray[IDX_ALLY_MEMBERS] = genDelimitString(data[IDX_ALLY_MEMBERS], DELIMIT2);
	GM_setValue(generateAllyKey(ally), genDelimitString(dataArray, DELIMIT));
//console.log(generateAllyKey(ally) +":"+ genDelimitString(dataArray, DELIMIT));
	
	ALLYS_CACHE[ally] = data;
	if (searchArrayItem(ALLYS_INDEX, ally) < 0) {
		ALLYS_INDEX.push(ally);
	}
}

//同盟データキャッシュ取得
function getAllyDataCache(ally) {
	if (ALLYS_CACHE[ally] == undefined) {
		ALLYS_CACHE[ally] = loadAllyData(ally);
	}
	return ALLYS_CACHE[ally];
}

//親同盟取得
function getParentAlly(ally) {
	parentAlly = getAllyDataCache(ally)[IDX_ALLY_PARENT];
	if (parentAlly == undefined) {
		parentAlly = "";
	}
	
	return parentAlly;
}

//親同盟更新
function updateParentAlly(child, parent) {
	var childData = getAllyDataCache(child);
	var beforeParent = childData[IDX_ALLY_PARENT];
	
	//子同盟のデータを更新
	childData[IDX_ALLY_PARENT] = parent;
	saveAllyData(child, childData);
	
	//親同盟の子同盟リストに追加
	if (parent != "") {
		//TODO
	}
	
	//親同盟が変わった場合、元親の子同盟リストから削除
	if (beforeParent != "" && beforeParent != parent) {
		//TODO
	}
}

//同盟所属君主のデータを更新
function updateAllyMember(user, ally) {
	
	//所属同盟のデータを更新
	{
		var afterAllyData = getAllyDataCache(ally);
		var members = afterAllyData[IDX_ALLY_MEMBERS];
		if (searchArrayItem(members, user) < 0) {
			members.push(user);
			afterAllyData[IDX_ALLY_MEMBERS] = members;
			saveAllyData(ally, afterAllyData);
		}
	}
	
	//君主データの同盟情報を取得
	var userData = getUserDataCache(user);
	var beforeAlly = userData[IDX_USER_ALLY];
	
	//君主データがなかったら作成
	if (beforeAlly == "") {
		userData[IDX_USER_ALLY] = ally;
		saveUserData(user, userData);
	
	//君主の所属同盟が変化した場合
	} else if (beforeAlly != ally) {
		
		//同盟データの所属君主情報を更新
		var beforeAllyData = getAllyDataCache(beforeAlly);
		var members = beforeAllyData[IDX_ALLY_MEMBERS];
		var itemIdx = searchArrayItem(members, user);
		if (itemIdx >= 0) {
			members.splice(itemIdx, 1);
			beforeAllyData[IDX_ALLY_MEMBERS] = members;
			saveAllyData(beforeAlly, beforeAllyData);
		}
		
		//君主データの同盟情報を更新
		userData[IDX_USER_ALLY] = ally;
		saveUserData(user, userData);
	}
}

//君主データ読み込み
function loadUserData(user) {
	var ret = new Array();
	var src = GM_getValue(generateUserKey(user), "");
	var array1 = src.split(DELIMIT);
	
	var villages = new Array();
	if (array1[IDX_USER_VILLAGES] != undefined && array1[IDX_USER_VILLAGES] != "") {
		villages = array1[IDX_USER_VILLAGES].split("|");
	}
	ret[IDX_USER_VILLAGES] = villages;
	
	ret[IDX_USER_ALLY] = array1[IDX_USER_ALLY];
	if (ret[IDX_USER_ALLY] == undefined) ret[IDX_USER_ALLY] = "";
	
	return ret;
}

//君主データ保存
function saveUserData(user, data) {
	var dataArray = new Array();
	dataArray[IDX_USER_VILLAGES] = genDelimitString(data[IDX_USER_VILLAGES], "|");
	dataArray[IDX_USER_ALLY] = data[IDX_USER_ALLY];
	GM_setValue(generateUserKey(user), genDelimitString(dataArray, DELIMIT));
//console.log(generateUserKey(user) + ": " + genDelimitString(dataArray, DELIMIT));
	
	USERS_CACHE[user] = data;
	if (searchArrayItem(USERS_INDEX, user) < 0) {
		USERS_INDEX.push(user);
	}
}

//君主データキャッシュ取得
function getUserDataCache(user) {
	if (USERS_CACHE[user] == undefined) {
		USERS_CACHE[user] = loadUserData(user);
	}
	return USERS_CACHE[user];
}

//検索用索引保存
function saveAllysIndex() {
	GM_setValue(location.hostname + "ALLYS_INDEX", 
		genDelimitString(ALLYS_INDEX, DELIMIT));
}
function saveUsersIndex() {
	GM_setValue(location.hostname + "USERS_INDEX", 
		genDelimitString(USERS_INDEX, DELIMIT));
}

//NPC砦リストに追加
function saveNpcsIndex(value) {
	var key = location.hostname + "NPCS_INDEX";
	var delimiter = DELIMIT;
	
	var items = splitDelimited(GM_getValue(key, ""), delimiter);
	
	if (items.indexOf(value) == -1) {
		items.push(value);
		
		//Greasemonkey領域へ永続保存
		GM_setValue(key, genDelimitString(items, delimiter));
//console.log(key+": " + genDelimitString(items, delimiter));
	}
}

//完全一致/部分一致変更
function changeMatchMode(checked) {
	GM_setValue(location.hostname + "MATCH_FULL", checked);
//console.log(location.hostname + "MATCH_FULL: " + checked);
	MATCH_FULL = checked;
	
	//地図変更
	LOADED_MAPS = new Array();
	changeMap();
}


//名称定義読み込み
function loadNames(key) {
	var result = GM_getValue(location.hostname + key, "").split(DELIMIT);
	return result;
}

//色定義読み込み
function loadColors(key, defaults) {
	var result = new Array();
	var inputs = GM_getValue(location.hostname + key, "").split(DELIMIT)
	for (var i = 0; i < defaults.length; i++) {
		if (inputs[i] == undefined || inputs[i] == "") {
			result[i] = defaults[i];
		} else {
			result[i] = inputs[i];
		}
	}
	return result;
}

//入力値を保存
function saveInputAllys(key) {
	saveInputValues(key, ALLY_COLORS.length, "ally");
}
function saveInputUsers(key) {
	saveInputValues(key, USER_COLORS.length, "user");
}
function saveInputValues(key, length, id) {
	var newAllys = new Array();
	
	//テキストボックスから入力値を取得
	for (var i = 0; i < length; i++) {
		newAllys[i] = trim(document.getElementById(id + (i+1)).value);
	}
	
	//Greasemonkey領域に永続保存
	trimArray(newAllys);
	GM_setValue(location.hostname + key, genDelimitString(newAllys, DELIMIT));
//console.log(location.hostname + key + ":" + genDelimitString(newAllys, DELIMIT));
}

//配列空項目削除
function trimArray(ary) {
	for (var i = ary.length - 1; i >= 0; i--) {
		if (ary[i] != undefined && ary[i] != "") break;
		ary.splice(i, 1);
	}
}

//地図データCSV出力
function outputMapCsvS() {
	outputMapCsv(CSV_RADIUS_S);
}
function outputMapCsvL() {
	outputMapCsv(CSV_RADIUS_L);
}
function outputMapCsv(radius) {
	document.getElementById("mapAll").style.display = "none";
	document.getElementById("maptoolLink").style.display = "none";
	
	var frameElem = document.createElement("iframe");
	frameElem.id = "maptoolCsvFrame";
	frameElem.style.width = "100%";
	frameElem.style.height = "540px";
	
	var mapElem = document.evaluate('//*[@id="mapboxInner"]',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	mapElem.snapshotItem(0).insertBefore(
		frameElem, document.getElementById("mapAll").nextSibling);
	
	//時間がかかるので別スレッド化（一旦描画して砂時計を表示させる）
	setWaitCursor();
	window.setTimeout(function() {
		var frameDoc = document.getElementById("maptoolCsvFrame").contentDocument;
		var addElem = frameDoc.createElement("pre");
		addElem.id = "maptoolCsv";
		addElem.style.fontSize = "12px";
		frameDoc.body.appendChild(addElem);
		
		//タイトル行
		var csvText = "";
		csvText += "X,Y,VILLAGE_NAME,USER_NAME,POPULATION,X_Y,ALLIANCER,POWER,";
		csvText += "WOOD,STONE,IRON,RICE,NPC_FLAG,LAST_UPDATE,CAPITAL_FLAG,PARENT_ALLY\n";
		
		//各マス行
		for (var y=CENTER_Y+radius; y>=CENTER_Y-radius; y--) {
			for (var x=CENTER_X-radius; x<=CENTER_X+radius; x++) {
				
				//保存データ取得
				var data = loadCellData(generateCellKey(x, y));
				if (data.length == 0) {
					continue;
				}
				
				csvText += x;
				csvText += ",";
				csvText += y;
				csvText += ",";
				csvText += convCsvString(data[IDX_VILLAGE_NAME]);
				csvText += ",";
				csvText += convCsvString(data[IDX_USER_NAME]);
				csvText += ",";
				csvText += data[IDX_POPULATION];
				csvText += ",";
				csvText += convCsvString("(" + x + "," + y + ")");
				csvText += ",";
				csvText += convCsvString(data[IDX_ALLIANCER]);
				csvText += ",";
				csvText += data[IDX_POWER];
				csvText += ",";
				csvText += data[IDX_WOOD];
				csvText += ",";
				csvText += data[IDX_STONE];
				csvText += ",";
				csvText += data[IDX_IRON];
				csvText += ",";
				csvText += data[IDX_RICE];
				csvText += ",";
				csvText += data[IDX_NPC_FLG];
				csvText += ",";
				csvText += data[IDX_LAST_UPDATE];
				csvText += ",";
				csvText += data[IDX_CAPITAL_FLG];
				csvText += ",";
				csvText += convCsvString(getParentAlly(data[IDX_ALLIANCER]));
				csvText += "\n";
			}
		}
		
		addElem.innerHTML = csvText;
		resetCursor();
	}, 100);
}

//マスデータキー生成
function generateCellKey(x, y) {
	return location.hostname + "(" + x + "," + y + ")";
}
//同盟データキー生成
function generateAllyKey(allyName) {
	return location.hostname + "_ally_" + escape(allyName);
}
//君主データキー生成
function generateUserKey(userName) {
	return location.hostname + "_user_" + escape(userName);
}

//基準時刻取得
function getBaseTime() {
	var res = GM_getValue(location.hostname + "BASE_TIME", "");
	if (res == "") {
		var date = new Date();
		res = "" + date.getFullYear() + padZero(date.getMonth() + 1) + 
			padZero(date.getDate());
	}
	return res;
}

//自拠点座標取得
//RE土＠mixi鯖さん(http://3gokushijp.zouri.jp/)提供
function getMyXY() {
	var d = document;
	var $x = function(xp,dc) {
		return document.evaluate(xp, dc||d, null, 
			XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	};

	var nowLoc = $x('id("gnavi")//a[contains(@href,"map.php")]');
	if (!nowLoc) return "";

	var xy = nowLoc.href.match(/x=([\-0-9]+)&y=([\-0-9]+)/i);
	if( xy ) {
		return xy[1]+","+xy[2];
	}
}

//地図シフト
function shiftMap(shiftX, shiftY) {
	var r; //半径
	if (MAP_MODE == MAP_MODE_M) r = RADIUS;
	else if (MAP_MODE == MAP_MODE_L) r = RADIUS_L;
	
	//移動先座標算出
	var x = CENTER_X + ((r*2 + 1) * shiftX);
	var y = CENTER_Y + ((r*2 + 1) * shiftY);
	
	//地図移動
	moveMap(x, y);
}

//地図移動
function moveMap(x, y) {
	if (isNaN(x) || isNaN(y)) return;
	CENTER_X = x;
	CENTER_Y = y;
	
	//範囲外に出ないように
	CENTER_X = (CENTER_X > MAX_XY ? MAX_XY: CENTER_X);
	CENTER_X = (CENTER_X < -MAX_XY ? -MAX_XY: CENTER_X);
	CENTER_Y = (CENTER_Y > MAX_XY ? MAX_XY: CENTER_Y);
	CENTER_Y = (CENTER_Y < -MAX_XY ? -MAX_XY: CENTER_Y);
	
	//地図表示
	LOADED_MAPS = new Array();
	changeMap();
}

//地図画面URL取得
function getMapUrl(x, y) {
	return "/map.php?x=" + x + "&y=" + y;
}

//全データ初期化
function clearAllData() {
	var keys = GM_listValues();
	var hostname = location.hostname;
	for (var i = 0; i < keys.length; i++) {
		if (keys[i].indexOf(hostname, 0) == 0) {
			GM_deleteValue(keys[i]);
		}
	}
}

//カーソル変更
function setWaitCursor() {
	document.getElementsByTagName("body")[0].style.cursor = "wait";
}
function resetCursor() {
	document.getElementsByTagName("body")[0].style.cursor = "auto";
}

//CSS追加
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName("head")[0];
	if (!head) { return; } style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = css;
	head.appendChild(style);
}

//URLパラメータ取得
function getParameter(key) {
	var str = location.search.split("?");
	if (str.length < 2) {
		return "";
	}
	
	var params = str[1].split("&");
	for (var i = 0; i < params.length; i++) {
		var keyVal = params[i].split("=");
		if (keyVal[0] == key && keyVal.length == 2) {
			return decodeURIComponent(keyVal[1]);
		}
	}
	return "";
}

//子Element取得
function getChildElement(parentNode, position) {
	var current = 0;
	for (var i = 0; i < parentNode.childNodes.length; i++){
		var childNode = parentNode.childNodes[i];
		if (childNode.nodeType == 1) {
			if (current == position) {
				return childNode;
			}
			current++;
		}
	}
	
	return undefined;
}

//現在時刻取得（yyyy/mm/dd hh:mm:ss）
function getCurrentTime() {
	var date = new Date();
	var res = "" + date.getFullYear() + "/" + padZero(date.getMonth() + 1) + 
		"/" + padZero(date.getDate()) + " " + padZero(date.getHours()) + ":" + 
		padZero(date.getMinutes()) + ":" + padZero(date.getSeconds());
	return res;
}
//現在時刻取得2（yyyymmddhhmmss）
function getCurrentTime2() {
	var date = new Date();
	var res = "" + date.getFullYear() + padZero(date.getMonth() + 1) + 
		padZero(date.getDate()) + padZero(date.getHours()) + 
		padZero(date.getMinutes()) + padZero(date.getSeconds());
	return res;
}

//先頭ゼロ付加
function padZero(num) {
	var result;
	if (num < 10) {
		result = "0" + num;
	} else {
		result = "" + num;
	}
	return result;
}
//先頭ゼロ除去
function trimZero(str) {
	var res = str.replace(/^0*/, "");
	if (res == "") res = "0";
	return res;
}

//空白除去
function trim(str) {
	return str.replace(/^[ 　\t\r\n]+|[ 　\t\r\n]+$/g, "");
}

//CSV用文字列変換
function convCsvString(str) {
	var result;
	
	//「"」を「""」に変換
	result = str.replace(/\"/g, "\"\"");
	
	//「,」を含む場合は全体を「"」で囲む
	if (result.indexOf(",") >= 0) {
		result = "\"" + result + "\""
	}
	
	return result;
}

//デリミタ区切り文字列生成
function genDelimitString(dataArray, delimiter) {
	var ret = "";
	for (var i=0; i < dataArray.length; i++) {
		if (dataArray[i] != undefined) ret += dataArray[i];
		if (i < dataArray.length-1) ret += delimiter;
	}
	return ret;
}

//完全一致/部分一致チェック
function matchString(target, sub) {
	if (target == undefined || sub == undefined) {
		return false;
	}
	
	target = target.toLowerCase();
	sub = sub.toLowerCase();
	if (sub != "") {
		if (MATCH_FULL) {
			if (target == sub) return true;
		} else {
			if (target.indexOf(sub) >= 0) return true;
		}
	}
	return false;
}
function searchArrayString(targets, sub) {
	var ret = new Array();
	for (var i=0; i<targets.length; i++) {
		if (matchString(targets[i], sub)) ret.push(targets[i]);
	}
	return ret;
}

//数値チェック
function isNumeric(num) {
	if (num.match(/^-?[0-9]+$/)) {
		return true;
	}
	return false;
}

//配列検索
function searchArrayItem(array, key) {
	for (var i=0; i<array.length; i++) {
		if (array[i] == key) {
			return i;
		}
	}
	return -1;
}

//デリミタ区切り文字列を配列に変換
function splitDelimited(str, delimiter) {
	if (str == undefined || str == "") {
		return new Array();
	} else {
		return str.split(delimiter);
	}
}

//Google Chrome用GM_*系ラッパー関数
function initGMWrapper() {
	
	// @copyright      2009, James Campos
	// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
	if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
		GM_addStyle = function(css) {
			var style = document.createElement('style');
			style.textContent = css;
			document.getElementsByTagName('head')[0].appendChild(style);
		}

		GM_deleteValue = function(name) {
			localStorage.removeItem(LOCAL_STORAGE + "." + name);
		}

		GM_getValue = function(name, defaultValue) {
			var value = localStorage.getItem(LOCAL_STORAGE + "." + name);
			if (!value)
				return defaultValue;
			var type = value[0];
			value = value.substring(1);
			switch (type) {
				case 'b':
					return value == 'true';
				case 'n':
					return Number(value);
				default:
					return value;
			}
		}

		GM_log = function(message) {
			console.log(message);
		}

		GM_registerMenuCommand = function(name, funk) {
		//todo
		}

		GM_setValue = function(name, value) {
			value = (typeof value)[0] + value;
			try {
				localStorage.setItem(LOCAL_STORAGE + "." + name, value);
			} catch (e) {
				alert("localStorageへの保存に失敗 (" + e + ")");
				throw e;
			}
		}
		
		//by froo
		GM_listValues = function() {
			var res = new Array();
			for (var i = 0; i < localStorage.length; i++) {
				var key = localStorage.key(i);
				if (key.indexOf(LOCAL_STORAGE + ".", 0) == 0) {
					res.push(key.replace(/^.*?\./, ""));
				}
			}
			return res;
		}
	}
}
