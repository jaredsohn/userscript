// ==UserScript==
// @name           bro3_ajax_fac
// @version        0.1.8
// @namespace      froo
// @include        http://*.3gokushi.jp/village.php*
// @include        http://*.1kibaku.jp/village.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @description    ブラウザ三国志 Ajax施設建設 by 浮浪プログラマ
// ==/UserScript==

// 都市画面の施設建設をAjaxを使った非同期通信で行います。
// 施設タイルの右クリック時に表示されるメニューで操作します。
// Copyright (C) 2010-2012 froo (http://blog.livedoor.jp/froo/)

// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

/*jslint white: true, browser: true, onevar: true, undef: true, 
	nomen: true, eqeqeq: true, bitwise: true, regexp: true, 
	newcap: true, immed: true, strict: true
*/
/*global GM_addStyle, decodeURIComponent, document, parseInt, 
	unsafeWindow, window
*/

"use strict";
(function () {
	var VERSION, LOADING_ANIME;
	VERSION = "0.1.8";
	
	//mixi鯖障害回避用: 広告iframe内で呼び出されたら無視
	var container = document.evaluate('//*[@id="container"]',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (container.snapshotLength == 0) return;
	
	// LoadingアニメGIFのBase64定義
	// http://www.ajaxload.info/
	// http://www.kawa.net/works/js/data-scheme/base64.html
	LOADING_ANIME = 'data:image/gif;base64,'+
'R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH+GkNyZWF0ZWQgd2l0aCBhamF4'+
'bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklr'+
'E2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwAAAAA'+
'EAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUk'+
'KhIAIfkEAAoAAgAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9'+
'HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAwAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYum'+
'CYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkEAAoABAAsAAAAABAAEAAAAzII'+
'unInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQACgAF'+
'ACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJ'+
'ibufbSlKAAAh+QQACgAGACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFG'+
'xTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAAKAAcALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdce'+
'CAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';
	
	// URLのクエリーからパラメータ値を取得
	function getUrlParameter(url, key) {
		var i, str, params, keyVal;
		
		str = url.replace(/#.*$/, "").split("?");
		if (str.length < 2) {
			return "";
		}
		
		params = str[1].split("&");
		for (i = 0; i < params.length; i++) {
			keyVal = params[i].split("=");
			if (keyVal[0] === key && keyVal.length === 2) {
				return decodeURIComponent(keyVal[1]);
			}
		}
		return "";
	}

	// Cookieから値を取得
	function getCookie(key) {
		var i, pair, pairs = document.cookie.split('; ');
		for (i = 0; pair = pairs[i] && pairs[i].split('='); i++) {
			if (pair[0] === key) return pair[1] || '';
		}
		return "";
	}

	// タイマーツールがあればデータを更新
	function updateTimer() {
		window.setTimeout(function () {
			var timerLink, evt;
			
			timerLink = document.getElementById("timerOpenLink");
			if (timerLink) {
				evt = document.createEvent("MouseEvents");
				evt.initEvent("click", false, true);
				timerLink.dispatchEvent(evt);
			}
		}, 0);
	}

	// レベルアップリクエスト送信(Ajax)
	function sendLvupRequest(query, times) {
		var lvupUrl, mapX, mapY, mapIdx;
		lvupUrl = "/facility/build.php";
		mapX = parseInt(query.x, 10);
		mapY = parseInt(query.y, 10);
		mapIdx = (101 + mapX * 7 + mapY).toString().substr(-2);
		
		// 施設タイルにLoading表示
		$(".mapicon" + mapIdx)
			.after("<img id='loadingMap" + mapIdx + "' />");
		$("#loadingMap" + mapIdx)
			.addClass("map" + mapIdx)
			.attr({ 
				src: LOADING_ANIME,
				alt: "Loading..."
			})
			.css({ 
				height: 16,
				width: 16,
				marginTop: "58px",
				marginLeft: "42px",
				opacity: 0.6
			});
		
		// 実行中作業欄にLoading表示
		$("#actionLog").remove();
		$("#actionLogBase").remove();
		$("#maps").after(
			"<div id='actionLogBase'>" +
				"<div id='actionLog'></div>" +
			"</div>");
		$("#actionLog").append(
			"<ul><li>" +
				"<img id='loadingLog' />" +
			"</li></ul>");
		$("#loadingLog")
			.attr({
				src: LOADING_ANIME,
				alt: "Loading..."
			})
			.css({
				opacity: 0.6
			});
		
		// Ajax通信実行
		if (times === 2) {
			$.post(lvupUrl, query);
		}
		$("#actionLogBase").load(lvupUrl + " #actionLog", query,
			function (i) {
				return function () {
					if (unsafeWindow.count_down_timer) {
						unsafeWindow.count_down_timer.stop();
					}
					$("#loadingMap" + i).remove();
					
					// タイマーツールに反映
					updateTimer();
				};
			}(mapIdx));
	}

	// メニューに施設レベルアップコマンドを追加
	function appendLvupItem(index, label, query, times) {
		
		$("#lvupList").append(
			"<li id='lvupItem" + index + "'></li>");
		$("#lvupItem" + index)
			.addClass("lvupItem")
			.attr({ 
				title: "施設の建設を指示します: " + JSON.stringify(query),
				innerHTML: label
			})
			.unbind("click")
			.one("click", 
				function (q, t) {
					return function () {
						sendLvupRequest(q, t);
					};
				}(query, times));
	}

	// 施設Lvupリスト作成
	function createLvupList(target) {
		var query, facilityName;
		
		$("#lvupList").text("");
		
		query = {
			x: getUrlParameter(target.href, "x"),
			y: getUrlParameter(target.href, "y"),
			ssid: getCookie("SSID")
		};
		
		facilityName = target.alt.replace(/\sLV\.[0-9]+$/, "");
		
		appendLvupItem(1, "建設[" + facilityName + "]", query, 1);
		appendLvupItem(2, "建設[" + facilityName + "]×2", query, 2);
	}

	// 施設Lvupのクエリーデータを取得
	function getLvupQuery(lvupLink) {
		var query, formName;
		formName = (lvupLink.onclick.toString().match(
			/sendFaciltyBuildData\(['"]([a-zA-Z0-9_]+)['"]\)/)||[])[1];
		if (formName) {
			query = {};
			$($("#facilityWork form[name='" + formName + "']").serializeArray())
				.each(function(i, v) {
					query[v.name] = v.value;
				});
		}
		return query;
	}

	// 施設建設リスト作成
	function createFacilityList() {
		var i, query, tables, facilityName, lvupLink;
		
		$("#lvupList").text("");
		
		// サーバーからロードした施設画面の情報を取得
		tables = $("#facilityWork .commonTables").get();
		for (i = 0; i < tables.length; i++) {
			query = undefined;
			
			// 施設レベルアップのURLを取得
			tables[i].id = "workTable" + i;
			lvupLink = $("#workTable" + i + " .lvupFacility .main a").get(0);
			if (lvupLink) {
				query = getLvupQuery(lvupLink);
			}
			if (!query) {
				if (i === 0) {
					$("#lvupList")
						.text("")
						.append("<li style='padding:0px 10px'>" + 
							"建設追加不可</li>");
				}
				continue;
			}
			
			// 施設名を取得
			facilityName = $("#workTable" + i + 
				" tbody:eq(0) tr:eq(1) td:eq(1) font").text();
			
			// メニューに施設レベルアップコマンドを追加
			appendLvupItem(i * 10, "建設" + facilityName, query, 1);
		}
	}

	// 建設可能施設をサーバーから取得(Ajax)
	function loadFacilities(target) {
		
		// メニューにLoading表示
		$("#lvupList")
			.text("")
			.append(
				"<li style='padding:0px 10px'>" +
					"<img id='loadingMenu' />" +
				"</li>");
		$("#loadingMenu")
			.attr({
				src: LOADING_ANIME,
				alt: "Loading..."
			})
			.css({
				opacity: 0.6
			});
		
		// Ajaxで施設画面をロード
		$("#facilityWork")
			.load(target.href + " #whiteWrapper", createFacilityList);
	}

	// 施設選択メニュー表示
	// 引数: 対象areaタグ, マウス座標
	function openMenu(target, x, y) {
		
		if (target.alt === "平地") {
			loadFacilities(target);
		} else {
			createLvupList(target);
		}
		
		$("#ajaxFacMenu")
			.css({ 
				left: x + "px", 
				top: y + "px"
			})
			.show();
		
		$(document)
			.unbind("click")
			.one("click", 
				function () {
					$("#ajaxFacMenu").hide();
				});
	}

	// 初期処理
	function init() {
		
		// メニューを非表示モードで作成
		$(document.body).append(
			"<div id='ajaxFacMenu'>" +
				"<ul id='lvupList' style='text-align:left'></ul>" +
				"<div id='footer' style='text-align:right'>" +
					"<a id='versionLink'></a>" +
				"</div>" +
			"</div>");
		$("#ajaxFacMenu")
			.hide()
			.css({ 
				position: "absolute", 
				backgroundColor: "white", 
				border: "solid 1px darkgray", 
				padding: "3px", 
				zIndex: 999
			});
		$("#versionLink")
			.attr({ 
				title: "ツール公開ページを表示します",
				target: "_blank",
				href: "http://blog.livedoor.jp/froo/archives/51568772.html",
				innerHTML: "Ver." + VERSION
			})
			.css({
				color: "gray",
				fontSize: "10px"
			});
		
		// メニュー行CSS
		GM_addStyle(
			".lvupItem { color:black; padding:0px 10px; cursor:default } " +
			".lvupItem:hover { color:white; background-color:blue } ");
		
		// 施設リストLoad用の作業領域
		$(document.body).append("<div id='facilityWork'></div>");
		$("#facilityWork").hide();
	}

	// 処理開始
	function main() {
		init();
		
		// 右クリックイベントに登録
		$("#mapOverlayMap area[href]").bind("contextmenu", 
			function (event) {
				
				// メニューを開く
				openMenu(this, event.pageX, event.pageY);
				
				// デフォルトのメニューは非表示
				event.preventDefault();
				return false;
			});
	}
	
	main();
})();
