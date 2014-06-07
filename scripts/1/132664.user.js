// ==UserScript==
// @name           bro3_army
// @version        2012.05.07
// @namespace      http://5zen.info/
// @author         gozensan
// @description    拠点の兵士数の表示を拡張したりする奴
// @include        http://*.3gokushi.jp/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://sizzlemctwizzle.com/updater.php?id=132664
// @homepage       http://5zen.info/
// @updateURL      http://userscripts.org/scripts/source/132664.meta.js
// @icon           http://5zen.info/mikanbox/icon.png
// @run-at         document-end
// ==/UserScript==
var VERSION = "2012.05.07";


// jQuery のいろいろ =======================================================================================================================
/*!
* jQuery Cookie Plugin
* https://github.com/carhartl/jquery-cookie
*
* Copyright 2011, Klaus Hartl
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://www.opensource.org/licenses/mit-license.php
* http://www.opensource.org/licenses/GPL-2.0
*/
(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);

jQuery.noConflict();
j$ = jQuery;

// 定数定義 ======================================================================================================================
var HOST = location.hostname; //アクセスURLホスト
var PGNAME = "_bro3_Army_20120507"; //グリモン領域への保存時のPGの名前

var COLOR_FRAME	= "#333333";	// 枠背景色
var COLOR_BASE	= "#654634";	// 拠点リンク色
var COLOR_TITLE	= "#FFCC00";	// 各BOXタイトル背景色
var COLOR_BACK	= "#FFF2BB";	// 各BOX背景色

var d = document;
var $ = function(id) { return d.getElementById(id); };
var $x = function(xp,dc) { return d.evaluate(xp, dc||d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; };
var $a = function(xp,dc) { var r = d.evaluate(xp, dc||d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); var a=[]; for(var i=0; i<r.snapshotLength; i++){ a.push(r.snapshotItem(i)); } return a; };
var $e = function(e,t,f) { if (!e) return; e.addEventListener(t, f, false); };

//                           0 1 2 3 4 5 6 7 8 9 0 1 2
var waitData	 = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0);	// 待機中
var reserveData	 = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0);	// 予約中
var helpData	 = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0);	// 援軍中
var sortieData	 = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0);	// 出撃中
var returnData	 = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0);	// 帰還中
var moveData	 = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0);	// 移動中
var helpmeData	 = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0);	// 他の拠点からの援軍

// main ==========================================================================================================================
(function(){

	var mixi_ad_head = xpath('//div[@class="floatHead"]/h4/strong/a[contains(@href,"./facility/unit_status.php")]', document);
	if (mixi_ad_head.snapshotLength) {
		mixi_ad_head.snapshotItem(0).href = "javascript:void(0)";
		mixi_ad_head.snapshotItem(0).addEventListener("click", function() {
			closeArmyBox();
			openArmyBox();
		}, true);
	}


	if (location.pathname == "/village.php") {
		if ( getStayMode() ) {
			closeArmyBox()
			openArmyBox()
		}
		getSoldier();
	}
})();

// ===============================================================================================================================

//兵士数表示画面を閉じる
function closeArmyBox() {
	deleteArmyHtml();
	deleteArmyFrameHtml();
}

//兵士数表示HTML削除
function deleteArmyHtml() {
	var elem = d.getElementById("ArmyContainer");
	if (elem == undefined) return;
	d.body.removeChild(d.getElementById("ArmyContainer"));
}

//建築対象拠点表示HTML削除
function deleteArmyFrameHtml() {
	var elem = d.getElementById("ArmyContainer");
	if (elem == undefined) return;
	d.body.removeChild(document.getElementById("ArmyContainer"));
}

function openArmyBox() {
	addArmyHtml();
}


function addArmyHtml() {

	var popupLeft = GM_getValue(location.hostname + PGNAME + "_popup_left", 150);
	var popupTop = GM_getValue(location.hostname + PGNAME + "_popup_top", 150);
	if (popupLeft < 0) popupLeft = 0;
	if (popupTop < 0) popupTop = 0;


	// 表示コンテナ作成
	var ArmyContainer = d.createElement("div");
	ArmyContainer.id = "ArmyContainer";
	ArmyContainer.style.position = "absolute";
	ArmyContainer.style.backgroundColor = COLOR_FRAME;
	ArmyContainer.style.opacity= 1.0;	// 透明度
	ArmyContainer.style.border = "solid 2px #000000";
	ArmyContainer.style.MozBorderRadius = "4px";	// 角丸
	ArmyContainer.style.top = popupTop + "px";
	ArmyContainer.style.left = popupLeft + "px";
	ArmyContainer.style.fontSize = "10px";
	ArmyContainer.style.padding = "3px";
//	ArmyContainer.style.width = "600px";
	ArmyContainer.style.zIndex = 999;
	d.body.appendChild(ArmyContainer);


	$e(ArmyContainer, "mousedown", function(event){
		if( event.target != $("ArmyContainer")) {return false;}
		g_MD="ArmyContainer";
		g_MX=event.pageX-parseInt(this.style.left,10);
		g_MY=event.pageY-parseInt(this.style.top,10);
		event.preventDefault();
	});

	$e(d, "mousemove", function(event){
		if(g_MD != "ArmyContainer") return true;
		var ABContainer = $("ArmyContainer");
		if( !ABContainer ) return true;
		var popupLeft = event.pageX - g_MX;
		var popupTop = event.pageY - g_MY;
		ArmyContainer.style.left = popupLeft + "px";
		ArmyContainer.style.top = popupTop + "px";
		//ポップアップ位置を永続保存
		GM_setValue(location.hostname + PGNAME + "_popup_left", popupLeft);
		GM_setValue(location.hostname + PGNAME + "_popup_top", popupTop);
	});

	$e(d, "mouseup", function(event){ g_MD=""; });

	// タイトル＋バージョン
	var title = d.createElement("span");
	title.style.color = "#FFFFFF";
	title.style.font = 'bold 120% "ＭＳ ゴシック"';
	title.style.margin = "4px";
	title.style.verticalAlign = "middle";
	title.innerHTML = "拠点兵士情報 詳細表示 ";

	var version = d.createElement("span");
	version.style.color = COLOR_TITLE;
	version.style.font = '96% "ＭＳ ゴシック"';
	version.style.margin = "4px";
	title.style.verticalAlign = "middle";
	version.innerHTML = " Ver." + VERSION;

	// ボタンエリア
	var ButtonBox = d.createElement("div");
	ButtonBox.style.border ="solid 0px";	// 通常 0px チェック時 1px
	ButtonBox.style.margin = "2px";
	ButtonBox.style.padding = "0px";


	// 閉じるボタン
	var Button = d.createElement("span");
		ccreateButton(Button, "閉じる", "ウインドウを閉じます", function() {closeArmyBox()});

	// 常駐チェックボックス
	var staySpan = d.createElement("span");
	staySpan.title = "常に表示します";

	var stayBox =  document.createElement("input");
	stayBox.type = "checkbox";
	stayBox.style.verticalAlign = "middle";
	stayBox.checked = getStayMode();
	stayBox.addEventListener("change", 
		function() {changeStayMode(this.checked)}, true);

	var stayCap = document.createElement("span");
	stayCap.style.verticalAlign = "middle";
	stayCap.innerHTML = "　　常駐 ";
	stayCap.style.color = "#FFFFFF";
	staySpan.appendChild(stayCap);

	ArmyContainer.appendChild(title);
	ArmyContainer.appendChild(version);
//	ArmyContainer.appendChild(staySpan);
//	ArmyContainer.appendChild(stayBox);

	ButtonBox.appendChild(Button);
	ButtonBox.appendChild(staySpan);
	ButtonBox.appendChild(stayBox);
	ArmyContainer.appendChild(ButtonBox);

//

	var tbl = d.createElement("table");
	tbl.style.border ="0px";

    var fColor = "#71C4F9";
	var tr = d.createElement("tr");
	var td = d.createElement("td");
	tr.style.fontFamily = "ＭＳ ゴシック";
	td.style.padding = "2px";
	td.style.border = "solid 1px black";
	td.style.backgroundColor = "#E6CF88";

	// 行タイトル表示 =====

	var titleTable = [ "","剣兵","槍兵","弓兵","騎兵","矛槍","弩兵","近衛","斥候","斥騎","衝車","投石" ];
	var tdTitle   = Array();
	var TitleText = Array();
	for (var i=0;i<12;i++){
		tdTitle[i] = d.createElement("td");
		if (i == 0) {
//			tdTitle[i].style.width = "80px";
		} else {
			tdTitle[i].style.width = "34px";
		}
		tdTitle[i].style.padding = "2px";
		tdTitle[i].style.border = "solid 1px black";
		tdTitle[i].style.backgroundColor = "#E6CF88";
		tdTitle[i].style.textAlign = "center";
		TitleText[i] = document.createElement("text");
		TitleText[i].style.padding = "2px";
//		TitleText[i].style.textvAlign = "center";
		TitleText[i].innerHTML = titleTable[i];
		tdTitle[i].appendChild(TitleText[i]);
		tr.appendChild(tdTitle[i]);
	}

	tbl.appendChild(tr);

	// 各状態表示

	var StateTable = [ "待機中", "出兵予約中", "援軍中", "出撃中", "帰還中", "移動中", "他からの援軍" ];
	var tdTitle2   = Array();
	var rtTitle2   = Array();
	var TitleText2 = Array();
	for (var i=0;i<7;i++){
		rtTitle2[i] = d.createElement("tr");
		rtTitle2[i].style.fontFamily = "ＭＳ ゴシック";

		for (var x=0;x<12;x++){
			tdTitle2[i * 7 + x] = d.createElement("td");
			if (x == 0) {
//				tdTitle2[i * 7 + x].style.width = "80px";
				tdTitle2[i * 7 + x].style.backgroundColor = "#E6CF88";
			} else {
//				tdTitle2[i * 7 + x].style.width = "0px";
				tdTitle2[i * 7 + x].style.backgroundColor = COLOR_BACK;
			}
			tdTitle2[i * 7 + x].style.padding = "2px";
			tdTitle2[i * 7 + x].style.border = "solid 1px black";
			tdTitle2[i * 7 + x].style.textAlign = "center";
			TitleText2[i * 7 + x] = document.createElement("text");
			TitleText2[i * 7 + x].style.padding = "2px";
			TitleText2[i * 7 + x].style.textvAlign = "center";
			if (x == 0) {
				TitleText2[i * 7 + x].innerHTML = StateTable[i];
			} else {
				var temp = 0;
				switch (i) {
					case 0: // 待機中
						temp = waitData[x - 1];
						break;
					case 1: // 出兵予約中
						temp = reserveData[x - 1];
						break;
					case 2: // 援軍中
						temp = helpData[x - 1];
						break;
					case 3: // 出撃中
						temp = sortieData[x - 1];
						break;
					case 4: // 帰還中
						temp = returnData[x - 1];
						break;
					case 5: // 移動中
						temp = moveData[x - 1];
						break;
					case 6: // 他の拠点からの援軍
						temp = helpmeData[x - 1];
						break;
				}
				if (temp == 0) {
					TitleText2[i * 7 + x].innerHTML = "-";
				} else {
					TitleText2[i * 7 + x].innerHTML = addFigure(temp);
				}
			}
			tdTitle2[i * 7 + x].appendChild(TitleText2[i * 7 + x]);
			rtTitle2[i].appendChild(tdTitle2[i * 7 + x]);
		}
			tbl.appendChild(rtTitle2[i]);
	}

	ArmyContainer.appendChild(tbl);

}

// 兵士数取得 ====================================================================================================================
function getSoldier() {
	var tables = document.evaluate('//*[@class="status village-bottom"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var Temp = tables.snapshotItem(0).innerHTML.substring(tables.snapshotItem(0).innerHTML.lastIndexOf(" ")+1);
	aa = Temp.split("/");
	var now_Soldier = aa[0];	// 自軍兵士数合計
	var max_Soldier = aa[1];	// 自軍宿舎容量合計

	var tid=setTimeout(function(){

		GM_xmlhttpRequest({
			method:"GET", 
			url:"http://" + HOST + "/facility/unit_status.php",
			headers:{"Content-type":"text/html"},
			overrideMimeType:'text/html; charset=utf-8',
			onload:function(x){
				var htmldoc = document.createElement("html");
			        htmldoc.innerHTML = x.responseText;
				try {
					// 待機中の兵士
					var tables = document.evaluate('//div[@id="wait"]',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					var htmldoc2 = document.createElement("html");
						htmldoc2.innerHTML = tables.snapshotItem(0).innerHTML
					var tables2 = document.evaluate('//td[@class="digit"]',htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					waitData	 = addSoldierCount(waitData, tables2, 0);

					// 他の拠点からの援軍
					tables = document.evaluate('//div[@id="wait"]',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					htmldoc2.innerHTML = tables.snapshotItem(0).innerHTML;
					tables2 = document.evaluate('//table[@class="commonTablesNoMG"]',htmldoc2, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					if (tables2.snapshotLength > 0) {
						for (var i = 1; i < tables2.snapshotLength; i++ ){
							var htmldoc3 = document.createElement("html");
								htmldoc3 = tables2.snapshotItem(i);
							var tables3 = document.evaluate('*/tr/td[@class="digit"]',htmldoc3, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
							helpmeData	 = addSoldierCount(helpmeData, tables3, 0);
						}
					}
				}catch(e) {
				}
				// 予約中の兵士
				try{
					var tables = document.evaluate('//div[@id="reserve"]',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					var htmldoc2 = document.createElement("html");
						htmldoc2.innerHTML = tables.snapshotItem(0).innerHTML
					var tables2 = document.evaluate('//td[@class="digit"]',htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					reserveData	 = addSoldierCount(reserveData, tables2, 1);
				}catch(e) {
				}
				// 援軍中
				try {
					tables = document.evaluate('//div[@id="help"]',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					htmldoc2.innerHTML = tables.snapshotItem(0).innerHTML;
					tables2 = document.evaluate('//table[@class="commonTablesNoMG"]',htmldoc2, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					for (var i = 0; i < tables2.snapshotLength; i++ ){
						var htmldoc3 = document.createElement("html");
							htmldoc3 = tables2.snapshotItem(i);
						var tables3 = document.evaluate('*/tr/td[@class="digit"]',htmldoc3, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
						helpData	 = addSoldierCount(helpData, tables3, 0);
					}
				}catch(e) {
				}

				// 出撃中
				try{
					tables = document.evaluate('//div[@id="sortie"]',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					htmldoc2.innerHTML = tables.snapshotItem(0).innerHTML;
					tables2 = document.evaluate('//table[@class="commonTablesNoMG"]',htmldoc2, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					for (var i = 0; i < tables2.snapshotLength; i++ ){
						var htmldoc3 = document.createElement("html");
							htmldoc3 = tables2.snapshotItem(i);
						var tables3 = document.evaluate('*/tr/td[@class="digit"]',htmldoc3, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
						sortieData	 = addSoldierCount(sortieData, tables3, 0);
					}

					// 帰還中
					tables = document.evaluate('//div[@id="return"]',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					htmldoc2.innerHTML = tables.snapshotItem(0).innerHTML;
					tables2 = document.evaluate('//table[@class="commonTablesNoMG"]',htmldoc2, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					for (var i = 0; i < tables2.snapshotLength; i++ ){
						var htmldoc3 = document.createElement("html");
							htmldoc3 = tables2.snapshotItem(i);
						var tables3 = document.evaluate('*/tr/td[@class="digit"]',htmldoc3, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
						returnData	 = addSoldierCount(returnData, tables3, 0);
					}
				}catch(e) {
				}

				// 移動中
				try {
					tables = document.evaluate('//div[@id="move"]',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					htmldoc2.innerHTML = tables.snapshotItem(0).innerHTML;
					tables2 = document.evaluate('//table[@class="commonTablesNoMG"]',htmldoc2, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					for (var i = 0; i < tables2.snapshotLength; i++ ){
						var htmldoc3 = document.createElement("html");
							htmldoc3 = tables2.snapshotItem(i);
						var tables3 = document.evaluate('*/tr/td[@class="digit"]',htmldoc3, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
						moveData	 = addSoldierCount(moveData, tables3, 0);

					}
				}catch(e) {
				}

				if ( getStayMode() ) {
					closeArmyBox()
					openArmyBox()
				}
			}
		});
	},0);
}

// 兵士数加算 ====================================================================================================================
function addSoldierCount(total, add, flg) {

	if (total == undefined) total = new Array();
	if (total == undefined) {
		total = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0);
	}
	for (var j = 0; j < 11; j++) {
//alert(j + " : " + add.snapshotItem(j).innerHTML);
		if (j == 11) {
//			alert(add.snapshotItem(j + flg).innerHTML);		// スキル名
			var htmldoc = document.createElement("html");
				htmldoc = add.snapshotItem(j);
			var tt = document.evaluate('//a',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			alert(add.snapshotItem(j).innerHTML + " : " + tt.snapshotItem(0).innerHTML);		// スキル名
			total[j] += 0;
		} else {
			total[j] += parseInt(add.snapshotItem(j + flg).innerHTML);
		}
//		if (j == 11) { alert(total[j]); }
	}
	return total;
}

function xpath(query,targetDoc) {
	return document.evaluate(query, targetDoc, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function ccreateButton(container, text, title, func, width)
{
	var btn = d.createElement("input");
	btn.style.padding = "0px";
	btn.type = "button";
	btn.value = text;
	if (width == undefined) {
		btn.style.width = "54px";
	} else {
		btn.style.width = width + "px";
	}
	btn.style.height = "22px";
	btn.style.verticalAlign = "middle";
	btn.title = title;
	container.appendChild(d.createTextNode(" "));
	container.appendChild(btn);
	container.appendChild(d.createTextNode(" "));
	$e(btn, "click", func);
	return btn;
}

//3桁カンマ区切り
function addFigure(str) {
　var num = new String(str).replace(/,/g, "");
　while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
　return num;

}

//常駐モード変更
function changeStayMode(value) {
	GM_setValue(location.hostname + PGNAME + "_stay_mode", value);
}

//常駐モード取得
function getStayMode() {
	var result = GM_getValue(location.hostname + PGNAME + "_stay_mode", true);
	return result;
}
