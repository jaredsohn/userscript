// ==UserScript==
// @name           basatimer
// @version        1.40
// @namespace      http://blog.livedoor.jp/froo/
// @include        http://*.bbsr-maql.jp/*
// @description    ブラウザバサラタイマー by 浮浪プログラマ
// ==/UserScript==

// 公開ページ:http://blog.livedoor.jp/froo/archives/51423697.html
// 使い方: 都市・内政・施設画面の表示で実行中作業を自動登録
//         作業完了時刻が来たら通知（alert/popup）
//         各ページ右下「タイマー」リンクで登録情報確認

var VERSION = "1.40";
var DIST_URL = "http://blog.livedoor.jp/froo/archives/51423697.html";
var LOCAL_STORAGE = "bro3_timer";

var DELIMIT1 = "#$%";
var DELIMIT2 = "&?@";
var DELIMIT3 = "{=]";
var DELIMIT4 = "|-/";

//保存データインデックス（拠点）
var IDX_XY = 0; //座標
var IDX_BASE_NAME = 1; //拠点名
var IDX_URL = 2; //拠点URL
var IDX_ACTIONS = 3; //実行中作業

//保存データインデックス（実行中作業）
var IDX2_STATUS = 0; //ステータス
var IDX2_TIME = 1; //完了時刻
var IDX2_TYPE = 2; //作業種別
var IDX2_ALERTED = 3; //通知済フラグ

//作業種別
var TYPE_CONSTRUCTION = "C"; //建設
var TYPE_MARCH = "M"; //行軍
var TYPE_DOMESTIC = "D"; //内政
var TYPE_FACILITY = "F"; //施設

//通知モード
var NOTICE_MODE_POPUP = ""; //ポップアップ
var NOTICE_MODE_ALERT = "1"; //アラート
var NOTICE_MODE_NONE = "2"; //通知なし

//表示モード
var DISP_MODE_PUSH = ""; //通知あり
var DISP_MODE_PULL = "1"; //通知なし
var DISP_MODE_NONE = "2"; //表示なし

//グローバル変数
var MOUSE_DRAGGING = false;
var MOUSE_OFFSET_X;
var MOUSE_OFFSET_Y;
var ALERT_TIME;

//main
(function(){
	
	//mixi鯖障害回避用: 広告iframe内で呼び出されたら無視
	if (!document.getElementById("container") && location.hostname.indexOf("www.") != 0) return;
	
	initGMWrapper();
	setHost();
	
	//都市画面なら実行中作業を取得
	if (location.pathname == "/village.php") {
		getVillageActions();
	}
	
	//君主プロフィール画面なら都市画面URLを取得
	if ((location.pathname == "/user/" || location.pathname == "/user/index.php") &&
		getParameter("user_id") == "") {
		getUserProf();
	}
	
	//内政設定画面なら使用中スキルを取得
	if (location.pathname == "/card/domestic_setting.php") {
		getDomesticSkill();
	}
	
	//兵士作成画面なら作成中兵士を取得
	if (location.pathname == "/facility/facility.php") {
		getTrainingSoldier();
	}
	
	//リンクHTML追加
	addOpenLinkHtml();
	
	//アラート登録
	window.setTimeout(function() {
		updateTimer();
	}, 0);
})();

//サーバ登録
function setHost() {
	var hosts = loadHosts();
	for (var i = 0; i < hosts.length; i++) {
		if (hosts[i] == location.hostname) return;
	}
	hosts[i] = location.hostname;
	
	saveHosts(hosts);
}

//拠点の作業中情報を取得
function getVillageActions() {
	var data = new Array();
	
	//拠点名を取得
	var baseNameElem = document.evaluate(
		'//*[@id="basepoint"]/span[@class="basename"]',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	data[IDX_BASE_NAME] = trim(baseNameElem.snapshotItem(0).innerHTML);
	
	//座標を取得
	var xyElem = document.evaluate('//*[@id="basepoint"]/span[@class="xy"]',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	data[IDX_XY] = trim(xyElem.snapshotItem(0).innerHTML);
	
	//建設情報を取得
	var actionsElem = document.evaluate('//*[@id="actionLog"]/ul/li',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var actions1 = new Array();
	for (var i = 0; i < actionsElem.snapshotLength; i++) {
		var paItem = actionsElem.snapshotItem(i);
		var newAction = new Array();
		newAction[IDX2_TYPE] = TYPE_CONSTRUCTION;
		
		//ステータス
		var buildStatusElem = document.evaluate('./span[@class="buildStatus"]/a',
			paItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var buildStatus;
		if (buildStatusElem.snapshotLength > 0) {
			//施設建設
			buildStatus = "建設:" + trim(buildStatusElem.snapshotItem(0).innerHTML);
		} else {
			//研究
//			buildStatusElem = document.evaluate('./span[@class="buildStatus"]',
//				paItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//			buildStatus = buildStatusElem.snapshotItem(0).innerHTML;
			continue;
		}
		newAction[IDX2_STATUS] = buildStatus;
		
//		var buildTimeElem = document.evaluate('./span[@class="buildTime"]',
//			paItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//		newAction[IDX2_STATUS] += buildTimeElem.snapshotItem(0).innerHTML;
		
		//施設建設完了時刻
		var buildClockElem = document.evaluate('./span[@class="buildClock"]',
			paItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var clock = buildClockElem.snapshotItem(0).innerHTML;
		newAction[IDX2_TIME] = generateDateString(computeTime(clock));
		
		actions1.push(newAction);
	}
	
	//建設情報を永続保存
	data[IDX_ACTIONS] = actions1;
	saveVillage(data, TYPE_CONSTRUCTION);
	
	//行軍情報を取得
	var actionsElem = document.evaluate(
		'//*[@id="action"]/div[@class="floatInner"]/ul/li',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var actions2 = new Array();
	for (var i = 0; i < actionsElem.snapshotLength; i++) {
		var paItem = actionsElem.snapshotItem(i);
		var newAction = new Array();
		newAction[IDX2_TYPE] = TYPE_MARCH;
		
		//ステータス
		var statusElem = document.evaluate('./a',
			paItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var status = trim(statusElem.snapshotItem(0).innerHTML);
		newAction[IDX2_STATUS] = "行軍:" + status;
		
		//完了時刻
		var buildClockElem = document.evaluate('./span',
			paItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var clock = buildClockElem.snapshotItem(0).innerHTML;
		newAction[IDX2_TIME] = generateDateString(computeTime(clock));
		
		actions2.push(newAction);
	}
	
	//行軍情報を永続保存
	data[IDX_ACTIONS] = actions2;
	saveVillage(data, TYPE_MARCH);
}

//拠点情報を保存
function saveVillage(newData, type) {
	var allData = loadVillages(location.hostname);
	
	//新旧データをマージ
	var exists = false;
	for (var i = 0; i < allData.length; i++) {
		var villageData = allData[i];
		
		//作業リスト更新
		if (villageData[IDX_XY] == newData[IDX_XY]) {
			exists = true;
			villageData[IDX_BASE_NAME] = newData[IDX_BASE_NAME];
			
			var actions = villageData[IDX_ACTIONS];
			for (var j = actions.length - 1; j >= 0; j--) {
				if (actions[j][IDX2_TYPE] != type) continue;
				var endTime = new Date(actions[j][IDX2_TIME]);
				var nowTime = new Date();
				if (isNaN(endTime.valueOf()) || endTime > nowTime) actions.splice(j, 1);
			}
			villageData[IDX_ACTIONS] = actions.concat(newData[IDX_ACTIONS]);
		}
		
		allData[i] = villageData;
	}
	if (!exists) allData.push(newData);
	
	//Greasemonkey領域へ永続保存
	saveVillages(location.hostname, allData);
}

//ユーザプロフィール画面の拠点情報を取得
function getUserProf() {
	var oldVillages = loadVillages(location.hostname);
	var newVillages = new Array();
	
	var landElems = document.evaluate(
		'//*[@id="gray02Wrapper"]//table/tbody/tr',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var isLandList = false;
	for (var i=0; i<landElems.snapshotLength; i++) {
		var item = landElems.snapshotItem(i);
		
		if (!isLandList) {
			var firstElem = getChildElement(item, 0);
			if (firstElem && trim(firstElem.innerHTML) == "名前") {
				isLandList = true;
			}
			continue;
		}
		
		//名前項目を取得
		var nameElem = getChildElement(getChildElement(item, 0), 0);
		var name = trim(nameElem.innerHTML);
		var url = nameElem.href;
		
		//座標項目を取得
		var xy = "(" + getChildElement(item, 1).innerHTML + ")";
		
		//人口項目を取得
		var popul = getChildElement(item, 2).innerHTML;
		
		//拠点じゃなければ終了
		if (!isNumeric(popul)) break;
		
		//データマージ
		var newVil = new Array();
		newVil[IDX_ACTIONS] = new Array();
		for (var j = 0; j < oldVillages.length; j++) {
			if (xy == oldVillages[j][IDX_XY]) {
				newVil = oldVillages[j];
			}
		}
		newVil[IDX_XY] = xy;
		newVil[IDX_BASE_NAME] = name;
		newVil[IDX_URL] = url;
		newVillages.push(newVil);
	}
	
	//保存
	saveVillages(location.hostname, newVillages);
}

//タイマーを開く
function openTimer() {
	dispTimer();
	setNoticeWait();
}

//タイマーを表示
function dispTimer() {
	deleteTimerHtml();
	addTimerHtml();
}

//作業完了後の表示を消す
function confirmTimer() {
	
	//基準時刻より前の作業情報を削除
	var hosts = getTargetHosts();
	for (var ii = 0; ii < hosts.length; ii++) {
		var baseTime = new Date(document.getElementById("openTime").innerHTML);
		var villages = loadVillages(hosts[ii]);
		for (var i = 0; i < villages.length; i++) {
			var actions = villages[i][IDX_ACTIONS];
			for (var j = actions.length - 1; j >=0 ; j--) {
				var actionTime = new Date(actions[j][IDX2_TIME]);
				if (actionTime <= baseTime) {
					actions.splice(j, 1);
				}
			}
			villages[i][IDX_ACTIONS] = actions;
		}
		
		//保存
		saveVillages(hosts[ii], villages);
	}
	
	//更新後内容で表示
	openTimer();
}

//タイマー表示を閉じる
function closeTimer() {
	deleteTimerHtml();
}

//設定ダイアログを表示
function setupTimer() {
	deleteTimerHtml();
	addSetupHtml();
}

//完了通知モード変更
function changeNoticeMode(value) {
	GM_setValue(location.hostname + "_notice_mode", value);
//console.log(location.hostname + "_notice_mode: " + value);
	
	openTimer();
}

//常駐モード変更
function changeStayMode(value) {
	GM_setValue(location.hostname + "_stay_mode", value);
//console.log(location.hostname + "_stay_mode: " + value);
}

//常駐モード取得
function getStayMode() {
	var result = GM_getValue(location.hostname + "_stay_mode", false);
	return result;
}

//リンクHTML追加
function addOpenLinkHtml() {
	var container;
	var isMixi;
	
	var sidebar = document.evaluate('//*[@id="sidebar"]',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (sidebar.snapshotLength == 0) {
		sidebar = document.evaluate('//*[@id="bptpcp_area"]',
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (sidebar.snapshotLength > 0) {
			isMixi = true;
		}
	}
	if (sidebar.snapshotLength == 0) {
		container = document.body;
	} else {
		container = sidebar.snapshotItem(0);
	}
	
	//タイマー表示リンク
	var linksDiv = document.createElement("div");
	container.appendChild(linksDiv);
	var openLink = document.createElement("a");
	openLink.id = "timerOpenLink";
	openLink.href = "javascript:void(0);";

	if (isMixi) {
		//RE土＠mixi鯖さん(http://3gokushijp.zouri.jp/)、ご隠居@mixi鯖さん提供
		var imgsrc_timer18x18=
		'data:image/gif;base64,'+
		'R0lGODlhEAAQANUAACAcHfDx8enp6oCAg8jJyoSGiZCSlNDR0YuNkGlrbXh5e46Qkh8aG+Dg4Xx9'+
		'gIiKjDMwMfj5+XBxc9jZ2ZiYmWFhY1hYWrO0tMXFxt/g4ENCRHV2efjq6Li5up6eoKKjpPf4+CUh'+
		'InJXV1FOTyMfIU5MTTg0NUE+Pzs4OTMvMEpHSCgkJUhFRtHGxc7HyLe4ub/AwefX1tjT09bJyOHY'+
		'2Kumpu7x8W5vcV5eYGdoaoeJjL+cm/rw7/bn5QAAAAAAACH5BAEAAD4ALAAAAAAQABAAAAawwMLg'+
		'gVgsDEaD0oAYWgrEpmMwmBYRj0piINwYMAQXwaMY6AqSikIhuRwatFmgQVA4HDmcJEERBAI8HBEB'+
		'ES83GxUWCRIEGIQcPSARDQcFCRYQGgV+DTAtMX8BAh8aEAAABQR+HiI7Nn8HHyGnDAoCAhcDNTKh'+
		'AhSnAAwjEx0HAiChExMJDMArFBm3vbimwAAoHdECDQIHBCXWwBADBN4HBifh4SksKiYk6uoMzfH1'+
		'8UEAOw==';
		
		linksDiv.style.cssFloat = "right";
		openLink.innerHTML =
			'<ul><li class="first_bpbtn">'+
				'<img src="'+imgsrc_timer18x18+'" height="18" width="18">'+
				'<span style="fontsize:66%;">タイマー</span>'+
			'</li></ul>';
	} else {
		openLink.innerHTML = "タイマー";
	}

	openLink.addEventListener("click", function() {
		if (location.pathname == "/village.php") {
			getVillageActions();
		}
		openTimer();
	}, true);
	linksDiv.appendChild(openLink);
}

//タイマー表示HTML追加
function addTimerHtml() {
	var popupLeft = GM_getValue(location.hostname + "_popup_left", 150);
	var popupTop = GM_getValue(location.hostname + "_popup_top", 150);
	if (popupLeft < 0) popupLeft = 0;
	if (popupTop < 0) popupTop = 0;
	
	var timerContainer = document.createElement("div");
	timerContainer.id = "timerContainer";
	timerContainer.style.position = "absolute";
	timerContainer.style.backgroundColor = "#B8B8B8";
	timerContainer.style.border = "outset 2px #B8B8B8";
	timerContainer.style.left = popupLeft + "px";
	timerContainer.style.top = popupTop + "px";
	timerContainer.style.fontSize = "10px";
	timerContainer.style.padding = "3px";
	timerContainer.style.zIndex = 999;
	timerContainer.style.textAlign = "left";
//	timerContainer.style.opacity = 0.8;
	document.body.appendChild(timerContainer);
	
	//現在時刻保存
	var nowTime = new Date();
	var openTimeElem = document.createElement("span");
	openTimeElem.id = "openTime";
	openTimeElem.style.display = "none";
	openTimeElem.innerHTML = generateDateString(nowTime);
	timerContainer.appendChild(openTimeElem);
	
	//確認済リンク
	var confirmLink = document.createElement("a");
	confirmLink.title = "完了済の作業を削除します";
	confirmLink.href = "javascript:void(0);";
	confirmLink.style.margin = "3px";
	confirmLink.innerHTML = "確認済";
	confirmLink.addEventListener("click", function() {confirmTimer()}, true);
	timerContainer.appendChild(confirmLink);
	
	//閉じるリンク
	var closeLink = document.createElement("a");
	closeLink.title = "タイマー表示を隠します";
	closeLink.href = "javascript:void(0);";
	closeLink.style.margin = "3px";
	closeLink.innerHTML = "閉じる";
	closeLink.addEventListener("click", function() {closeTimer()}, true);
	timerContainer.appendChild(closeLink);
	
	//通知プルダウン
	var noticeSpan = document.createElement("span");
	noticeSpan.title = "作業完了の通知方法を指定します";
	noticeSpan.style.margin = "3px";
	timerContainer.appendChild(noticeSpan);
	
	var noticeCap = document.createElement("span");
	noticeCap.innerHTML = "通知";
	noticeSpan.appendChild(noticeCap);
	
	var noticeBox =  document.createElement("select");
	noticeBox.addEventListener("change", 
		function() {changeNoticeMode(this.value)}, true);
	noticeSpan.appendChild(noticeBox);
	
	var noticeOpts = new Array(
		new Array("popup", NOTICE_MODE_POPUP), 
		new Array("alert", NOTICE_MODE_ALERT), 
		new Array("none", NOTICE_MODE_NONE));
	for (var i = 0; i < noticeOpts.length; i++) {
		var elem = document.createElement("option");
		elem.innerHTML = noticeOpts[i][0];
		elem.value = noticeOpts[i][1];
		noticeBox.appendChild(elem);
	}
	noticeBox.value = GM_getValue(
		location.hostname + "_notice_mode", NOTICE_MODE_POPUP);
	
	//常駐チェックボックス
	var staySpan = document.createElement("span");
	staySpan.title = "作業完了がなくても常に表示します";
	staySpan.style.margin = "3px";
	timerContainer.appendChild(staySpan);
	
	var stayCap = document.createElement("span");
	stayCap.innerHTML = "常駐";
	staySpan.appendChild(stayCap);
	
	var stayBox =  document.createElement("input");
	stayBox.type = "checkbox";
	stayBox.style.verticalAlign = "middle";
	stayBox.checked = getStayMode();
	stayBox.addEventListener("change", 
		function() {changeStayMode(this.checked)}, true);
	staySpan.appendChild(stayBox);
	
	//設定リンク
	var setupLink = document.createElement("a");
	setupLink.title = "細かい通知＆表示設定を行えます";
	setupLink.href = "javascript:void(0);";
	setupLink.style.margin = "3px";
	setupLink.innerHTML = "設定";
	setupLink.addEventListener("click", function() {setupTimer()}, true);
	timerContainer.appendChild(setupLink);
	
	//バージョン
	var versionSpan = document.createElement("span");
	versionSpan.title = "ツール公開ページを表示します";
	versionSpan.style.fontSize = "9px";
	versionSpan.style.margin = "3px";
	timerContainer.appendChild(versionSpan);
	
	var versionLink = document.createElement("a");
	versionLink.target = "_blank";
	versionLink.href = DIST_URL;
	versionLink.innerHTML = "Ver." + VERSION;
	versionSpan.appendChild(versionLink);
	
	//現在サーバtable
	timerContainer.appendChild(createCurrentHostTable(nowTime));
	
	//他サーバtable
	if (navigator.userAgent.toLowerCase().indexOf('chrome') < 0) {
		timerContainer.appendChild(createOtherHostsTable(nowTime));
	}
	
	//ドラッグ＆ドロップ設定
	timerContainer.addEventListener("mousedown",
		function(event) {
			MOUSE_DRAGGING = true;
			MOUSE_OFFSET_X = event.pageX - parseInt(this.style.left);
			MOUSE_OFFSET_Y = event.pageY - parseInt(this.style.top);
			if (navigator.userAgent.toLowerCase().indexOf('chrome') < 0) {
				event.preventDefault();
			}
		},
		false);
	document.body.addEventListener("mousemove",
		function(event) {
			if (!MOUSE_DRAGGING) return true;
			
			var timerContainer = document.getElementById("timerContainer");
			if (timerContainer == undefined) return true;
			
			var popupLeft = event.pageX - MOUSE_OFFSET_X;
			var popupTop = event.pageY - MOUSE_OFFSET_Y;
			timerContainer.style.left = popupLeft + "px";
			timerContainer.style.top = popupTop + "px";
			
			//ポップアップ位置を永続保存
			GM_setValue(location.hostname + "_popup_left", popupLeft);
			GM_setValue(location.hostname + "_popup_top", popupTop);
		},
		false);
	document.body.addEventListener("mouseup",
		function(event) {
			MOUSE_DRAGGING = false;
		},
		false);
}

//現サーバのテーブル作成
function createCurrentHostTable(nowTime) {
	var table = document.createElement("table");
	table.style.margin = "3px";
	
	//次回時間
	var nextTime = getNextTime(location.hostname, nowTime);
	if (nextTime != undefined) {
		var waitTimeStr = generateWaitTimeString(nextTime, nowTime);
		var nextTimeTr = document.createElement("tr");
		var nextTimeTd = document.createElement("td");
		nextTimeTd.colSpan = 2;
		nextTimeTd.innerHTML = "次回: " + generateDateString2(nextTime);
		nextTimeTd.innerHTML += " (あと" + waitTimeStr + ")";
		nextTimeTr.appendChild(nextTimeTd);
		table.appendChild(nextTimeTr);
	}
	
	//各拠点テーブル
	var villages = loadVillages(location.hostname);
	for (var i = 0; i < villages.length; i++) {
		var tableTr = document.createElement("tr");
		tableTr.style.verticalAlign = "top";
		table.appendChild(tableTr);
		
		//拠点情報項目
		var villageTd = document.createElement("td");
		villageTd.style.border = "solid 1px dimgray";
		villageTd.style.padding = "3px";
		villageTd.style.margin = "3px";
		tableTr.appendChild(villageTd);
		var villageText = villages[i][IDX_BASE_NAME];
		if (villages[i][IDX_URL] != "") {
			villageText = "<a href='" + villages[i][IDX_URL] + "'>" + 
				villageText + "</a>";
		}
		villageTd.innerHTML = villageText;
		
		//実行中作業情報項目
		var actionsTd = document.createElement("td");
		actionsTd.style.border = "solid 1px dimgray";
		actionsTd.style.padding = "3px";
		tableTr.appendChild(actionsTd);
		var actions = sortAction(villages[i][IDX_ACTIONS]);
		for (var j = 0; j < actions.length; j++) {
			var actionDiv = createActionDiv(
				actions[j], nowTime, villages[i][IDX_XY], location.hostname);
			if (!actionDiv) continue;
			
			actionsTd.appendChild(actionDiv);
		}
	}
	
	return table;
}

//他サーバのテーブル作成
function createOtherHostsTable(nowTime) {
	var table = document.createElement("table");
	table.style.margin = "3px";
	
	//他サーバ監視有無フラグ
	var dispOtherHosts = GM_getValue(location.hostname + "_disp_other_hosts", false);
	
	//操作リンク行
	var linkTr = document.createElement("tr");
	var linkTd = document.createElement("td");
	linkTd.colSpan = 2;
	
	//他サーバ監視有無
	var linkDesc = document.createElement("span");
	linkDesc.innerHTML = "他サーバ監視" + (dispOtherHosts ? "ON" : "OFF");
	linkTd.appendChild(linkDesc);
	
	//他サーバ監視切り替えリンク
	var dispLink = document.createElement("a");
	dispLink.href = "javascript:void(0);";
	dispLink.style.margin = "3px";
	var flipMode;
	if (dispOtherHosts) {
		flipMode = "→OFF";
		dispLink.addEventListener("click", function() {setDispOtherHosts(false)}, true);
	} else {
		flipMode = "→ON";
		dispLink.addEventListener("click", function() {setDispOtherHosts(true)}, true);
	}
	dispLink.innerHTML = flipMode;
	linkTd.appendChild(dispLink);
	
	linkTr.appendChild(linkTd);
	table.appendChild(linkTr);
	
	//他サーバ監視なしなら終了
	if (!dispOtherHosts) return table;
	
	var hosts = loadHosts();
	
	//次回時間
	var nextTime;
	var nextHost;
	for (var i = 0; i < hosts.length; i++) {
		if (hosts[i] == location.hostname) continue;
		
		var tmpNextTime = getNextTime(hosts[i], nowTime);
		if (nextTime == undefined || tmpNextTime < nextTime) {
			nextTime = tmpNextTime;
			nextHost = hosts[i];
		}
	}
	if (nextTime != undefined) {
		var waitTimeStr = generateWaitTimeString(nextTime, nowTime);
		
		var nextTimeTr = document.createElement("tr");
		var nextTimeTd = document.createElement("td");
		nextTimeTd.colSpan = 2;
		nextTimeTd.innerHTML = "次回(" + nextHost + "): " + generateDateString2(nextTime);
		nextTimeTd.innerHTML += " (あと" + waitTimeStr + ")";
		nextTimeTr.appendChild(nextTimeTd);
		table.appendChild(nextTimeTr);
	}
	
	//完了済みの作業のみ表示
	for (var ii = 0; ii < hosts.length; ii++) {
		if (hosts[ii] == location.hostname) continue;
		var villages = loadVillages(hosts[ii]);
		
		for (var i = 0; i < villages.length; i++) {
			var actions = sortAction(villages[i][IDX_ACTIONS]);
			
			//行表示有無判断
			var existsAction = false;
			for (var j = 0; j < actions.length; j++) {
				var actionTime = new Date(actions[j][IDX2_TIME]);
				if (actionTime < nowTime) {
					var type = actions[j][IDX2_TYPE].charAt(0);
					if (getDispMode(type) != DISP_MODE_NONE) {
						existsAction = true;
					}
				}
			}
			if (!existsAction) continue;
			
			var tableTr = document.createElement("tr");
			tableTr.style.verticalAlign = "top";
			table.appendChild(tableTr);
			
			//拠点情報項目
			var villageTd = document.createElement("td");
			villageTd.style.border = "solid 1px dimgray";
			villageTd.style.padding = "3px";
			tableTr.appendChild(villageTd);
			var villageText = hosts[ii] + "<br/>" + villages[i][IDX_BASE_NAME];
			villageTd.innerHTML = villageText;
			
			//実行中作業情報項目
			var actionsTd = document.createElement("td");
			actionsTd.style.border = "solid 1px dimgray";
			actionsTd.style.padding = "3px";
			tableTr.appendChild(actionsTd);
			for (var j = 0; j < actions.length; j++) {
				var actionTime = new Date(actions[j][IDX2_TIME]);
				if (actionTime > nowTime) {
					continue;
				}
				
				var actionDiv = createActionDiv(
					actions[j], nowTime, villages[i][IDX_XY], hosts[ii]);
				if (!actionDiv) continue;
				
				actionsTd.appendChild(actionDiv);
			}
		}
	}
	
	return table;
}

//各作業行生成
function createActionDiv(action, nowTime, baseXy, host) {
	var type = action[IDX2_TYPE].charAt(0);
	if (getDispMode(type) == DISP_MODE_NONE) {
		return undefined;
	}
	
	var actionDiv = document.createElement("div");
	
	//作業完了背景色
	var actionTime = new Date(action[IDX2_TIME]);
	if (actionTime < nowTime) {
		actionDiv.style.backgroundColor = "white";
	}
	
	//作業完了時刻
	var textSpan = document.createElement("span");
	var text = "";
	text += action[IDX2_TIME].replace(/^[0-9]{4}\//, "");
	if (getDispWaitTime()) {
		var finishTime = new Date(action[IDX2_TIME]);
		text += " (あと" + generateWaitTimeString(finishTime, nowTime) + ")";
	}
	text += " ";
	text += action[IDX2_STATUS];
	textSpan.innerHTML = text;
	actionDiv.appendChild(textSpan);
	
	//作業完了行の個別削除リンク
	if (actionTime < nowTime) {
		var delLink = document.createElement("a");
		delLink.title = "確認済にして削除します";
		delLink.href = "javascript:void(0);";
		delLink.style.color = "gray";
		delLink.innerHTML = "済";
		
		var key = host + DELIMIT1 + baseXy + DELIMIT1 + action[IDX2_TIME];
		delLink.addEventListener("click", 
			(function(key_) {
				return function() { deleteAction(key_); }
			})(key), true);
		actionDiv.appendChild(delLink);
	}
	
	return actionDiv;
}

//作業削除
function deleteAction(key) {
	var hosts = getTargetHosts();
	for (var ii = 0; ii < hosts.length; ii++) {
		var villages = loadVillages(hosts[ii]);
		var exists = false;
		villageLoop:
		for (var i = 0; i < villages.length; i++) {
			for (var j = 0; j < villages[i][IDX_ACTIONS].length; j++) {
				var action = villages[i][IDX_ACTIONS][j];
				var curKey = hosts[ii] + DELIMIT1 + 
					villages[i][IDX_XY] + DELIMIT1 + action[IDX2_TIME];
				if (key == curKey) {
					exists = true;
					villages[i][IDX_ACTIONS].splice(j, 1);
					break villageLoop;
				}
			}
		}
		
		//見つかったら更新
		if (exists) {
			saveVillages(hosts[ii], villages);
			openTimer();
			return;
		}
	}
}

function setDispOtherHosts(on) {
	GM_setValue(location.hostname + "_disp_other_hosts", on);
	openTimer();
}
function sortAction(actions) {
	actions.sort(function(val1, val2) {
		var diff = (new Date(val1[IDX2_TIME])).getTime() 
			- (new Date(val2[IDX2_TIME])).getTime();
		return diff;
	});
	return actions;
}

//タイマー表示HTML削除
function deleteTimerHtml() {
	var timerElem = document.getElementById("timerContainer");
	if (timerElem) document.body.removeChild(timerElem);
	deleteSetupHtml();
}

//通知設定
function setNoticeWait() {
	var noticeMode = GM_getValue(location.hostname + "_notice_mode", "");
	if (noticeMode == NOTICE_MODE_NONE) return;
	
	var nextTime;
	var hosts = getTargetHosts();
	for (var i = 0; i < hosts.length; i++) {
		var tmpNextTime = getNextTime(hosts[i], new Date());
		if (nextTime == undefined || tmpNextTime < nextTime) {
			nextTime = tmpNextTime;
		}
	}
	
	//未完了作業がなければ何もしない
	if (nextTime == undefined) {
		return;
	}
	
	//通知時刻が直近でなければ何もしない
	if (ALERT_TIME != undefined) {
		if (nextTime.getTime() > ALERT_TIME.getTime() - 3000) {
			return;
		}
	}
	ALERT_TIME = nextTime;
	
	var nowTime = new Date();
	var waitTime = nextTime.getTime() - nowTime.getTime() + 5000;
//console.log("waitTime="+waitTime);
	
	//完了時刻まで待つ
	window.setTimeout(function() {
		ALERT_TIME = undefined;
		updateTimer();
	}, waitTime);
}

//タイマー更新
function updateTimer() {
	var noticeMode = GM_getValue(location.hostname + "_notice_mode", "");
	
	//通知なしなら表示しない
	if (noticeMode == NOTICE_MODE_NONE && !getStayMode()) return;
	
	//アラート表示
	if (noticeMode == NOTICE_MODE_ALERT && existsAlertNeed()) {
		alert("作業完了！");
		setActionAlerted();
	}
	
	//通知対象の作業あれば表示
	if (getStayMode() || existsNotice(new Date())) {
		dispTimer();
	}
	
	//通知待ち設定
	setNoticeWait();
}

//通知対象ホスト
function getTargetHosts() {
	var hosts = new Array();
	var dispOtherHosts = GM_getValue(location.hostname + "_disp_other_hosts", false);
	if (dispOtherHosts) {
		hosts = loadHosts();
	} else {
		hosts[0] = location.hostname;
	}
	return hosts;
}

//次回完了時刻取得
function getNextTime(hostname, baseTime) {
	
	//一番早い作業完了時刻を取得
	var startTime = new Date("2099/12/31 23:59:59");
	var nextTime = startTime;
	var villages = loadVillages(hostname);
	for (var i = 0; i < villages.length; i++) {
		var actions = villages[i][IDX_ACTIONS];
		for (var j = 0; j < actions.length; j++) {
			var actionTime = new Date(actions[j][IDX2_TIME]);
			if (actionTime > baseTime && actionTime < nextTime) {
				var type = actions[j][IDX2_TYPE].charAt(0);
				if (getDispMode(type) == DISP_MODE_PUSH) {
					nextTime = actionTime;
				}
			}
		}
	}
	
	//作業中がなければ何もしない
	if (nextTime == startTime) nextTime = undefined;
	
	return nextTime;
}

//通知有無チェック
function existsNotice(baseTime) {
	var hosts = getTargetHosts();
	for (var i = 0; i < hosts.length; i++) {
		var villages = loadVillages(hosts[i]);
		for (var j = 0; j < villages.length; j++) {
			var actions = villages[j][IDX_ACTIONS];
			for (var k = 0; k < actions.length; k++) {
				var actionTime = new Date(actions[k][IDX2_TIME]);
				if (actionTime <= baseTime) {
					var type = actions[k][IDX2_TYPE].charAt(0);
					if (getDispMode(type) == DISP_MODE_PUSH) {
						return true;
					}
				}
			}
		}
	}
	return false;
}

//未アラート作業の有無チェック
function existsAlertNeed() {
	var baseTime = new Date();
	var hosts = getTargetHosts();
	for (var ii = 0; ii < hosts.length; ii++) {
		var villages = loadVillages(hosts[ii]);
		for (var i = 0; i < villages.length; i++) {
			for (var j = 0; j < villages[i][IDX_ACTIONS].length; j++) {
				var action = villages[i][IDX_ACTIONS][j];
				var actionTime = new Date(action[IDX2_TIME]);
				if (actionTime <= baseTime) {
					if (action[IDX2_ALERTED] != "1") {
						var type = action[IDX2_TYPE].charAt(0);
						if (getDispMode(type) == DISP_MODE_PUSH) {
							return true;
						}
					}
				}
			}
		}
	}
	return false;
}

//通知済フラグ設定
function setActionAlerted() {
	var baseTime = new Date();
	var hosts = getTargetHosts();
	for (var ii = 0; ii < hosts.length; ii++) {
		var villages = loadVillages(hosts[ii]);
		for (var i = 0; i < villages.length; i++) {
			for (var j = 0; j < villages[i][IDX_ACTIONS].length; j++) {
				var action = villages[i][IDX_ACTIONS][j];
				var actionTime = new Date(action[IDX2_TIME]);
				if (actionTime <= baseTime) {
					action[IDX2_ALERTED] = "1";
				}
				villages[i][IDX_ACTIONS][j] = action;
			}
		}
		
		//保存
		saveVillages(hosts[ii], villages);
	}
}


//拠点情報を読み出し
function loadVillages(hostname) {
	var ret = new Array();
	
	var src = GM_getValue(hostname, "");
	if (src == "") return ret;
	
	var villages = src.split(DELIMIT1);
	for (var i = 0; i < villages.length; i++) {
		var fields = villages[i].split(DELIMIT2);
		
		ret[i] = new Array();
		ret[i][IDX_XY] = fields[IDX_XY];
		ret[i][IDX_BASE_NAME] = fields[IDX_BASE_NAME];
		ret[i][IDX_URL] = fields[IDX_URL];
		
		ret[i][IDX_ACTIONS] = new Array();
		if (fields[IDX_ACTIONS] == "") continue;
		var actions = fields[IDX_ACTIONS].split(DELIMIT3);
		for (var j = 0; j < actions.length; j++) {
			ret[i][IDX_ACTIONS][j] = new Array();
			if (actions[j] == "") continue;
			
			var item = actions[j].split(DELIMIT4);
			if (item[IDX2_TYPE] == undefined) item[IDX2_TYPE] = TYPE_CONSTRUCTION;
			
			ret[i][IDX_ACTIONS][j][IDX2_STATUS] = item[IDX2_STATUS];
			ret[i][IDX_ACTIONS][j][IDX2_TIME] = item[IDX2_TIME];
			ret[i][IDX_ACTIONS][j][IDX2_TYPE] = item[IDX2_TYPE];
			ret[i][IDX_ACTIONS][j][IDX2_ALERTED] = item[IDX2_ALERTED];
		}
	}
	
	return ret;
}

//拠点情報を保存
function saveVillages(hostname, newData) {
	
	//配列をデリミタ区切り文字列に変換
	var newDataStr = new Array();
	for (var i = 0; i < newData.length; i++) {
		var villageData = newData[i];
		var actions = villageData[IDX_ACTIONS];
		
		//配列をデリミタ区切り文字列に変換
		for (var j = 0; j < actions.length; j++) {
			actions[j] = genDelimitString(actions[j], DELIMIT4);
		}
		villageData[IDX_ACTIONS] = genDelimitString(actions, DELIMIT3);
		newDataStr[i] = genDelimitString(villageData, DELIMIT2);
	}
	
	//Greasemonkey領域へ永続保存
	GM_setValue(hostname, genDelimitString(newDataStr, DELIMIT1));
//console.log(genDelimitString(newDataStr, DELIMIT1));
}

//対象サーバリスト読み出し
function loadHosts() {
	var ret = new Array();
	
	var src = GM_getValue("hosts", "");
	if (src == "") return ret;
	
	ret = src.split(DELIMIT1);
	
	return ret;
}

//対象サーバリスト保存
function saveHosts(hosts) {
	
	//Greasemonkey領域へ永続保存
	GM_setValue("hosts", genDelimitString(hosts, DELIMIT1));
//console.log(genDelimitString(hosts, DELIMIT1));
}

//内政スキル取得
function getDomesticSkill() {
	var data = getMyVillage();
	data[IDX_ACTIONS] = new Array();
	
	for (var i = 0; i < 3; i++) {
		var clockElem = document.getElementById("area_timer" + i);
		if (clockElem != undefined) {
			var clock = trim(clockElem.innerHTML);
			data[IDX_ACTIONS][i] = new Array();
			
			var statusElem = document.evaluate('..',
				clockElem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
			var status = "";
			if (statusElem.className == "status") status = "使用";
			else if (statusElem.className == "recovery") status = "回復";
			
			var nameLink = document.evaluate('../td/a',
				statusElem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			status = "内政:" + status + "(" + trim(nameLink.snapshotItem(0).innerHTML) + ")";
			
			data[IDX_ACTIONS][i][IDX2_STATUS] = status;
			data[IDX_ACTIONS][i][IDX2_TIME] = generateDateString(computeTime(clock));
			data[IDX_ACTIONS][i][IDX2_TYPE] = TYPE_DOMESTIC;
		}
	}
	
	saveVillage(data, TYPE_DOMESTIC);
}

//施設内作業中取得
function getTrainingSoldier() {
	var data = getMyVillage();
	data[IDX_ACTIONS] = new Array();
	
	//施設名
	var facilityName = "";
	var h2Elem = document.evaluate('//*[@id="gray02Wrapper"]/h2',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (h2Elem.getSnapshotLength != 0) {
		facilityName = trim(h2Elem.snapshotItem(0).innerHTML);
	}
	
	//作業種別
	var actionType = TYPE_FACILITY + getParameter("x") + getParameter("y");

	//作業中情報取得
	var idx = 0; 
	while (1) {
		var clockElem = document.getElementById("area_timer" + idx);
		if (clockElem == undefined) break;
		
		var mainTtls = document.evaluate('../../../tr/th[@class="mainTtl"]',
			clockElem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (mainTtls.snapshotLength == 0) break;
		var clock = trim(clockElem.innerHTML);
		if (clock == "") break;
		
		var mainTtlElem = mainTtls.snapshotItem(idx);
		if (mainTtlElem == undefined) break;
		var status = trim(mainTtlElem.innerHTML);
		if (status == "") break;
		
		data[IDX_ACTIONS][idx] = new Array();
		data[IDX_ACTIONS][idx][IDX2_STATUS] = facilityName + ":" + status;
		data[IDX_ACTIONS][idx][IDX2_TIME] = generateDateString(computeTime(clock));
		data[IDX_ACTIONS][idx][IDX2_TYPE] = actionType;
		
		idx++;
	}
	
	saveVillage(data, actionType);
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
	if (!nowLoc) nowLoc = $x('id("gNav")//a[contains(@href,"map.php")]');
	if (!nowLoc) return null;

	var xy = nowLoc.href.match(/x=([\-0-9]+)&y=([\-0-9]+)/i);
	if( xy ) {
		return xy[1]+","+xy[2];
	}
}

//自拠点情報取得
//RE土＠mixi鯖さん(http://3gokushijp.zouri.jp/)提供
function getMyVillage() {
	var ret = new Array();
	
	var xy=getMyXY();
	if(! xy){
		return ret;
	}
	var allData = loadVillages(location.hostname);
	for (var i = 0; i < allData.length; i++) {
		var villageData = allData[i];
		if (villageData[IDX_XY] == "("+xy+")") {
			ret[IDX_XY] = villageData[IDX_XY];
			ret[IDX_BASE_NAME] = villageData[IDX_BASE_NAME];
			return ret;
		}
	}
	
	return ret;
}


//設定ダイアログHTML追加
function addSetupHtml() {
	var popupLeft = GM_getValue(location.hostname + "_popup_left", 150);
	var popupTop = GM_getValue(location.hostname + "_popup_top", 150);
	if (popupLeft < 0) popupLeft = 0;
	if (popupTop < 0) popupTop = 0;
	
	var container = document.createElement("div");
	container.id = "setupContainer";
	container.style.position = "absolute";
	container.style.backgroundColor = "silver";
	container.style.border = "outset 2px silver";
	container.style.left = popupLeft + "px";
	container.style.top = popupTop + "px";
//	container.style.fontSize = "10px";
	container.style.padding = "3px";
	container.style.zIndex = 999;
	container.style.textAlign = "left";
	document.body.appendChild(container);
	
	//各作業種別プルダウン
	var types = new Array(
		new Array("建設", TYPE_CONSTRUCTION, 
			"施設建設の完了時刻"), 
		new Array("行軍", TYPE_MARCH, 
			"武将・兵士の行動（出撃・移動など）の完了時刻"), 
		new Array("施設", TYPE_FACILITY, 
			"施設内作業（研究・兵士作成など）の完了時刻"), 
		new Array("内政", TYPE_DOMESTIC, 
			"内政スキル使用・回復の完了時刻"));
	for (var type = 0; type < types.length; type++) {
		var typeDiv = document.createElement("div");
		typeDiv.title = types[type][2];
		typeDiv.style.margin = "3px";
		container.appendChild(typeDiv);
		
		var caption = document.createElement("span");
		caption.innerHTML = types[type][0];
		typeDiv.appendChild(caption);
		
		var selectBox = document.createElement("select");
		selectBox.id = "dispMode" + types[type][1];
		typeDiv.appendChild(selectBox);
		
		var options = new Array(
			new Array("通知あり", DISP_MODE_PUSH), 
			new Array("通知なし", DISP_MODE_PULL), 
			new Array("表示なし", DISP_MODE_NONE));
		for (var i = 0; i < options.length; i++) {
			var elem = document.createElement("option");
			elem.innerHTML = options[i][0];
			elem.value = options[i][1];
			selectBox.appendChild(elem);
		}
		
		selectBox.value = getDispMode(types[type][1]);
	}
	
	//残り時間表示チェックボックス
	var waitTimeDiv = document.createElement("div");
	waitTimeDiv.title = "明細行に残り時間を表示します";
	waitTimeDiv.style.margin = "3px";
	container.appendChild(waitTimeDiv);
	
	var waitTimeCap = document.createElement("span");
	waitTimeCap.innerHTML = "残り時間表示";
	waitTimeDiv.appendChild(waitTimeCap);
	
	var waitTimeBox =  document.createElement("input");
	waitTimeBox.id = "dispWaitTime";
	waitTimeBox.type = "checkbox";
	waitTimeBox.style.verticalAlign = "middle";
	waitTimeBox.checked = getDispWaitTime();
	waitTimeDiv.appendChild(waitTimeBox);
	
	//OKボタン
	var okButton = document.createElement("input");
	okButton.title = "設定を保存して閉じます";
	okButton.id = "setupOk";
	okButton.type = "button";
	okButton.value = "OK";
	okButton.addEventListener("click", function() {saveSetup()}, true);
	container.appendChild(okButton);
	
	//Cancelボタン
	var cancelButton = document.createElement("input");
	cancelButton.title = "設定を保存せずに閉じます";
	cancelButton.id = "setupCancel";
	cancelButton.type = "button";
	cancelButton.value = "Cancel";
	cancelButton.addEventListener("click", function() {dispTimer()}, true);
	container.appendChild(cancelButton);
}

//設定ダイアログHTML削除
function deleteSetupHtml() {
	var setupElem = document.getElementById("setupContainer");
	if (setupElem) document.body.removeChild(setupElem);
}

//設定情報保存
function saveSetup() {
	
	//作業種別表示モード
	var types = new Array(
		TYPE_CONSTRUCTION, TYPE_MARCH, TYPE_FACILITY, TYPE_DOMESTIC);
	for (var i = 0; i < types.length; i++) {
		var mode = document.getElementById("dispMode" + types[i]).value;
		GM_setValue(location.hostname + "_disp_mode" + types[i], mode);
	}
	
	//残り時間表示有無
	var dispWaitTime = document.getElementById("dispWaitTime").checked;
	GM_setValue(location.hostname + "_disp_wait_time", dispWaitTime);
	
	deleteSetupHtml();
	updateTimer();
}

//表示モード取得
function getDispMode(type) {
	var result = GM_getValue(
		location.hostname + "_disp_mode" + type, DISP_MODE_PUSH);
	return result;
}

//残り時間表示有無取得
function getDispWaitTime() {
	var result = GM_getValue(location.hostname + "_disp_wait_time", false);
	return result;
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

//時刻計算（現在時刻に加算、引数hh:mm:ss）
function computeTime(clock) {
	var hour = parseInt(trimZero(
		clock.replace(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$1")));
	if (isNaN(hour)) hour = 0;
	var min = parseInt(trimZero(
		clock.replace(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$2")));
	if (isNaN(min)) min = 0;
	var sec = parseInt(trimZero(
		clock.replace(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$3")));
	if (isNaN(sec)) sec = 0;
	
	var now = new Date();
	var resTime = new Date();
	resTime.setHours(now.getHours() + hour);
	resTime.setMinutes(now.getMinutes() + min);
	resTime.setSeconds(now.getSeconds() + sec);
	
	return resTime;
}

//日時文字列編集（yyyy/mm/dd hh:mm:ss）
function generateDateString(date) {
	var res = "" + date.getFullYear() + "/" + padZero(date.getMonth() + 1) + 
		"/" + padZero(date.getDate()) + " " + padZero(date.getHours()) + ":" + 
		padZero(date.getMinutes()) + ":" + padZero(date.getSeconds());
	return res;
}

//日時文字列編集2（mm/dd hh:mm:ss）
function generateDateString2(date) {
	var res = "" + padZero(date.getMonth() + 1) + "/" + padZero(date.getDate()) + 
		" " + padZero(date.getHours()) + ":" + padZero(date.getMinutes()) + 
		":" + padZero(date.getSeconds());;
	return res;
}

//残時間文字列編集
function generateWaitTimeString(time1, time2) {
	var result = "";
	if (time1 < time2) time1 = time2;
	
	var waitTimeSec = Math.ceil((time1.getTime() - time2.getTime()) / 1000);
	result += Math.floor(waitTimeSec / (60*60));
	result += ":";
	result += padZero(Math.floor((waitTimeSec % (60*60)) / 60));
	result += ":";
	result += padZero(waitTimeSec % 60);
	
	return result;
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

//デリミタ区切り文字列生成
function genDelimitString(dataArray, delimiter) {
	var ret = "";
	for (var i=0; i < dataArray.length; i++) {
		if (dataArray[i] != undefined) ret += dataArray[i];
		if (i < dataArray.length-1) ret += delimiter;
	}
	return ret;
}

//空白除去
function trim(str) {
	if (str == undefined) return "";
	return str.replace(/^[ 　\t\r\n]+|[ 　\t\r\n]+$/g, "");
}

//数値チェック
function isNumeric(num) {
	if (num.match(/^-?[0-9]+$/)) {
		return true;
	}
	return false;
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
	}
}
