// ==UserScript==
// @name           bro3_contrib_checker
// @version        1.01
// @namespace      http://blog.livedoor.jp/froo/
// @include        http://*.sangokushi.in.th/alliance/info.php*
// @description    ブラウザ三国志 同盟貢献チェッカー by 浮浪プログラマ
// ==/UserScript==

// 公開ページ: http://blog.livedoor.jp/froo/archives/51427985.html
// 使い方: 同盟トップでリンク「貢献チェック実行」をクリック

var VERSION = "1.01";
var LOCAL_STORAGE = "bro3_contrib_checker";

var DELIMIT = "#$%";

//インデックス
var IDX_RANK = 0; //ランク
var IDX_POINT = 1; //ポイント
var IDX_CONTRIB = 2; //寄付
var IDX_VILLAGE = 3; //拠点

//グローバル変数
var CURRENT_TIME = generateDateString(new Date());
var LAST_UPDATE = "";
var ALLY_NAME = "";
var SAVE_DATA = new Array();
var SAVE_USERS = new Array();

//main
(function(){
	initGMWrapper();
	
	//「略称」欄取得
	var myAllyElem = document.evaluate(
		'//*[@id="gray02Wrapper"]//table/tbody/tr[3]/td',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (myAllyElem.snapshotLength == 0) return;
	ALLY_NAME = trim(myAllyElem.snapshotItem(0).innerHTML);
	
	//前回更新日時取得
	LAST_UPDATE = GM_getValue(generateAllyKey(ALLY_NAME), "");
	
	//同盟ランキングTableタイトル部取得
	var tableTitle = document.evaluate(
		'//*[@id="gray02Wrapper"]//table[@class="tables"]/tbody/tr/th',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	//チェック実行リンク追加
	var checkExecLink = document.createElement("a");
	checkExecLink.id = "checkContribLink";
	checkExecLink.href = "javascript:void(0)";
	checkExecLink.innerHTML = "貢献チェック実行";
	if (LAST_UPDATE != "") {
		checkExecLink.innerHTML += "(前回:" + convDateStrShort(LAST_UPDATE) + ")";
	}
	checkExecLink.style.margin = "0px 5px";
	tableTitle.snapshotItem(0).appendChild(checkExecLink);
	checkExecLink.addEventListener("click", chackContrib, true);
	
	//基準時刻更新リンク追加
	var checkSaveLink = document.createElement("a");
	checkSaveLink.id = "saveContribLink";
	checkSaveLink.href = "javascript:void(0)";
	checkSaveLink.innerHTML = "貢献チェック基準時刻更新";
	checkSaveLink.innerHTML += "(";
	if (LAST_UPDATE != "") {
		checkSaveLink.innerHTML += convDateStrShort(LAST_UPDATE);
	}
	checkSaveLink.innerHTML += " → " + convDateStrShort(CURRENT_TIME);
	checkSaveLink.innerHTML += ")";
	checkSaveLink.style.display = "none";
	checkSaveLink.style.margin = "0px 5px";
	tableTitle.snapshotItem(0).appendChild(checkSaveLink);
	checkSaveLink.addEventListener("click", saveContrib, true);
	
	//データ更新済メッセージ追加
	var messageSaveEnd = document.createElement("span");
	messageSaveEnd.id = "descContribEnd";
	messageSaveEnd.innerHTML = "貢献チェック基準時刻更新済";
	messageSaveEnd.innerHTML += "(";
	if (LAST_UPDATE != "") {
		messageSaveEnd.innerHTML += convDateStrShort(LAST_UPDATE);
	}
	messageSaveEnd.innerHTML += " → " + convDateStrShort(CURRENT_TIME);
	messageSaveEnd.innerHTML += ")";
	messageSaveEnd.style.display = "none";
	messageSaveEnd.style.margin = "0px 5px";
	messageSaveEnd.style.fontSize = "10px";
	tableTitle.snapshotItem(0).appendChild(messageSaveEnd);
})();

//貢献チェック実行
function chackContrib() {
	
	//「同盟内ランキング」Table各行の取得
	var userElems = document.evaluate(
		'//*[@id="gray02Wrapper"]//table[@class="tables"]/tbody/tr',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < userElems.snapshotLength; i++) {
		var newModified = "";
		var oldModified = "";
		
		var rowFields = document.evaluate('./td', userElems.snapshotItem(i), 
			null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (rowFields.snapshotLength == 0) continue;
		
		//「君主」欄
		var userField = rowFields.snapshotItem(1);
		var userLink = document.evaluate('./a', userField,
			null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var user = trim(userLink.snapshotItem(0).innerHTML);
		
		//前回値取得
		var userData = new Array();
		var dataStr = GM_getValue(generateUserKey(user), "");
		if (dataStr != "") {
			userData = dataStr.split(DELIMIT);
		}
		
		//「ランク」欄
		{
			var rankField = rowFields.snapshotItem(0);
			var newRank = trim(rankField.innerHTML);
			
			var rankItem = new Array("", "");
			if (userData[IDX_RANK] != undefined && userData[IDX_RANK] != "") {
				rankItem = userData[IDX_RANK].split(",");
			}
			
			var oldRank = rankItem[0];
			if (newRank != oldRank) {
				if (oldRank != "") {
					var diff = diffNum(oldRank, newRank);
					if (parseInt(diff) > 0) rankField.style.color = "red";
					else rankField.style.color = "blue";
					rankField.innerHTML = newRank + "<font size='-2'>(" + diff + ")</font>";
				}
				
				rankItem[0] = newRank;
				rankItem[1] = CURRENT_TIME;
				userData[IDX_RANK] = rankItem;
			}
		}
		
		//貢献チェック対象データ
		var fieldId = new Array(
			new Array(IDX_POINT, 2), //ポイント
			new Array(IDX_CONTRIB, 3), //寄付
			new Array(IDX_VILLAGE, 4) //拠点
		);
		for (var j = 0; j < fieldId.length; j++) {
			var targetElem = rowFields.snapshotItem(fieldId[j][1]);
			var targetData = userData[fieldId[j][0]];
			var newValue = trim(targetElem.innerHTML);
			
			var dataItem = new Array("", "");
			if (targetData != undefined && targetData != "") {
				dataItem = targetData.split(",");
			}
			var oldValue = dataItem[0];
			
			if (dataItem[1] > oldModified) {
				oldModified = dataItem[1];
			}
			
			if (newValue != oldValue) {
				
				//増減表示
				if (oldValue != "") {
					var diff = diffNum(newValue, oldValue);
					if (parseInt(diff) > 0) targetElem.style.color = "red";
					else targetElem.style.color = "blue";
					
					targetElem.innerHTML = newValue + 
						"<font size='-2'>(" + diff + ")</font>";
				}
				
				dataItem[0] = newValue;
				dataItem[1] = CURRENT_TIME;
				userData[fieldId[j][0]] = genDelimitString(dataItem, ",");
				newModified = CURRENT_TIME;
				
			} else if (oldModified > newModified) {
				newModified = oldModified;
			}
		}
		
		//前回変化からの時間数を表示
		var newText = trim(userField.innerHTML);
		newText += "<font size='-2'> (";
		if (oldModified != "" && oldModified != newModified) {
			newText += diffTime(CURRENT_TIME, oldModified) + "→";
		}
 		newText += diffTime(CURRENT_TIME, newModified);
 		newText += ")</font>";
 		userField.innerHTML = newText;
		
		if (oldModified != newModified) {
			userField.style.color = "red";
		}
		
		//データを保存
		if (newModified == CURRENT_TIME || rankItem[1] == CURRENT_TIME) {
			SAVE_DATA[user] = userData;
			SAVE_USERS.push(user);
		}
	}
	
	//操作リンク更新
	document.getElementById("checkContribLink").style.display = "none";
	if (LAST_UPDATE == "") {
		//初回なら即保存
		saveContrib();
		document.getElementById("descContribEnd").style.display = "inline";
	} else {
		document.getElementById("saveContribLink").style.display = "inline";
	}
}

//貢献チェック基準更新
function saveContrib() {
	
	//Greasemonkey領域へ値を保存
	for (var i = 0; i < SAVE_USERS.length; i++) {
		var dataStr = genDelimitString(SAVE_DATA[SAVE_USERS[i]], DELIMIT);
		GM_setValue(generateUserKey(SAVE_USERS[i]), dataStr);
//console.log(generateUserKey(SAVE_USERS[i]) + ": " + dataStr);
	}
	
	//Greasemonkey領域へ最終更新時刻を保存
	GM_setValue(generateAllyKey(ALLY_NAME), CURRENT_TIME);
//console.log(generateAllyKey(ALLY_NAME) + ": " + CURRENT_TIME);
	
	//操作リンク更新
	document.getElementById("saveContribLink").style.display = "none";
	document.getElementById("descContribEnd").style.display = "inline";
}

//同盟データキー生成
function generateAllyKey(allyName) {
	return location.hostname + "_ally_" + escape(allyName);
}
//君主データキー生成
function generateUserKey(userName) {
	return location.hostname + "_user_" + escape(userName);
}

//数値増減計算（文字列）
function diffNum(strNum1, strNum2) {
	var intNum1 = parseInt(strNum1);
	if (isNaN(intNum1)) intNum1 = 0;
	var intNum2 = parseInt(strNum2);
	if (isNaN(intNum2)) intNum2 = 0;
	
	var diffInt = intNum1 - intNum2;
	var diffStr = "" + diffInt;
	if (diffInt > 0) diffStr = "+" + diffStr;
	
	return diffStr;
}

//時刻差分計算（文字列）
function diffTime(strTime1, strTime2) {
	var date1 = new Date(strTime1);
	var date2 = new Date(strTime2);
	var diffSec = Math.ceil((date1.getTime() - date2.getTime()) / 1000);
	
	var result = "";
	result += Math.floor(diffSec / (60*60));
	result += ":";
	result += padZero(Math.floor((diffSec % (60*60)) / 60));
	result += ":";
	result += padZero(diffSec % 60);
	
	return result;
}

//日時文字列編集（yyyy/mm/dd hh:mm:ss）
function generateDateString(date) {
	var res = "" + date.getFullYear() + "/" + padZero(date.getMonth() + 1) + 
		"/" + padZero(date.getDate()) + " " + padZero(date.getHours()) + ":" + 
		padZero(date.getMinutes()) + ":" + padZero(date.getSeconds());
	return res;
}

//日付文字列を短縮型に変換
function convDateStrShort(str) {
	var result = str;
	result = result.replace(/^[0-9]{4}\//, "");
	result = result.replace(/:[0-9]{2}$/, "");
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

//空白除去
function trim(str) {
	return str.replace(/^[ 　\t\r\n]+|[ 　\t\r\n]+$/g, "");
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
			localStorage.setItem(LOCAL_STORAGE + "." + name, value);
		}
	}
}
