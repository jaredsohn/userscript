// ==UserScript==
// @name        cat_beta_0.1
// @namespace   http://diveintomark.org/projects/greasemonkey/
// @description
//@require http://userscript-updater-generator.appspot.com/?id=cat_beta_0.1
// @include     http://*wasabii.com.tw/*
// @version     1
// ==/UserScript==
window.document.domain = "wasabii.com.tw";
var myiframe = document.getElementById("remote_iframe_0");
var count = 0;
var offset_height = 96;
function refresh() {

	window.location = 'http://nyaframe.wasabii.com.tw/index.aspx';

}

function show_height() {

	var iframe_height = document.getElementById("remote_iframe_0").contentDocument.body.offsetHeight;

	switch(iframe_height) {
		case 680+offset_height:
			// Start

			var ele = myiframe.contentDocument.getElementsByTagName("a");

			for (var i = 0; i < ele.length; i++) {
				if (ele[i].href == "http://nyashindig.wasabii.com.tw/world_list.htm") {
					ele[i].click();
				}
			}

			break;
		case 813+offset_height:
			//Village
			if (document.getElementById("remote_iframe_0").contentDocument.getElementById("notify").className) {
				if (document.getElementById("remote_iframe_0").contentDocument.getElementById("notify-button")) {
					if ((document.getElementById("remote_iframe_0").contentDocument.getElementById("notify-button").style.height) == "33px") {
						var ele = myiframe.contentDocument.getElementsByTagName("div");
						//Click the "notify-1"  confirm button
						for (var i = (ele.length - 1); i > 0; --i) {
							if (ele[i].id == "notify-button") {
								ele[i].click();
								break;
							}
						}
					}
				} else {//Click the other confirm button
					var ele = myiframe.contentDocument.getElementsByTagName("div");
					for (var i = (ele.length - 1); i > 0; --i) {
						if (ele[i].id == "neko-alert-confirm-button") {
							ele[i].click();
							break;
						}
					}
				}

			} else if (!document.getElementById("remote_iframe_0").contentDocument.getElementById("finish_move")) {
				var ele = myiframe.contentDocument.getElementsByTagName("a");
				for (var i = 0; i < ele.length; i++) {
					if (ele[i].href == "http://nyashindig.wasabii.com.tw/area_map.htm") {
						ele[i].click();
					}
				}
				break;
			} else if (!document.getElementById("remote_iframe_0").contentDocument.getElementById("finish_329")) {
				if (document.getElementById("remote_iframe_0").contentDocument.getElementById("my-friend").className == "close") {

					document.getElementById("remote_iframe_0").contentDocument.getElementById("friend-button").click();
					break;
				} else {
					var ele = myiframe.contentDocument.getElementById("my-friend-content").getElementsByTagName("a");
					for (var i = 0; i < ele.length; i++) {
						if (ele[i].style.color == "rgb(0, 0, 238)") {
							ele[i].click();
							break;
						}
					}

				}
			}
			break;
		case 727+offset_height:
			//Map
			if (document.getElementById("remote_iframe_0").contentDocument.getElementById("notify").className) {
				if (document.getElementById("remote_iframe_0").contentDocument.getElementById("notify-button")) {
					if ((document.getElementById("remote_iframe_0").contentDocument.getElementById("notify-button").style.height) == "33px") {
						var ele = myiframe.contentDocument.getElementsByTagName("div");
						//Click the "notify-1"  confirm button
						for (var i = (ele.length - 1); i > 0; --i) {
							if (ele[i].id == "notify-button") {
								ele[i].click();
								break;
							}
						}
					}
				} else {//Click the other confirm button
					var ele = myiframe.contentDocument.getElementsByTagName("div");
					for (var i = (ele.length - 1); i > 0; --i) {
						if (ele[i].id == "neko-alert-confirm-button") {
							ele[i].click();
							break;
						}
					}
				}

			} else if (document.getElementById("remote_iframe_0").contentDocument.getElementById("move_1")) {
				var ele = myiframe.contentDocument.getElementsByTagName("a");

				for (var i = 0; i < ele.length; i++) {
					if (ele[i].href == "http://nyashindig.wasabii.com.tw/village.htm") {
						ele[i].click();
						break;
					}
				}
			} else {
				var ele = myiframe.contentDocument.getElementsByTagName("div");

				for (var i = (ele.length - 1); i > 0; --i) {
					if (ele[i].innerHTML == "山賊") {
						ele[i + 10].click();
						break;
					} else if (ele[i].innerHTML == "海賊") {
						ele[i + 10].click();
						break;
					} else if (ele[i].innerHTML == "忍者眾") {
						ele[i + 10].click();
						break;
					} else if (ele[i].innerHTML == "一揆眾") {
						ele[i + 10].click();
						break;
					} else if (ele[i].id == "detail_c8") {
						ele[i + 2].click();
						break;
					} else if (ele[i].id == "detail_c7") {
						ele[i + 2].click();
						break;
					}

				}
			}

			break;
		case 671+offset_height:
			if (count == "0") {//在沒有對話框的時候進入
				var ele = myiframe.contentDocument.getElementById("reserve-pool").getElementsByTagName("img");
				for (var i = 50; i < ele.length; i++) {//設定起始56為培育武將一中的第一格
					if (ele[i].className.match("protected ui-draggable")) {//設定只有是"protected ui-draggable(保護狀態下)"的武將才能進行訪問。
						target = ele[i];

						var evt = document.createEvent("MouseEvents");
						evt.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
						target.dispatchEvent(evt);

						var evt1 = document.createEvent("MouseEvents");
						evt1.initMouseEvent("mousemove", true, true, window, 0, 0, 0, 464, 228 + offset_height, false, false, false, false, 0, null);
						target.dispatchEvent(evt1);

						var evt2 = document.createEvent("MouseEvents");
						evt2.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
						target.dispatchEvent(evt2);
						count = count + 1;
						break;
					} else if (i == (ele.length - 1)) {//超過第十格抓不到可拜訪的武將，即回到里。
						var ele1 = myiframe.contentDocument.getElementsByTagName("a");
						for (var j = 0; j < ele1.length; j++) {
							if (ele1[j].href == "http://nyashindig.wasabii.com.tw/village.htm") {
								ele1[j].click();
								count = 0;
								break;
							}
						}
					}
				}

			} else if (count == "1") {//在有確認進行拜訪對話框的時候進入
				var ele = myiframe.contentDocument.getElementsByTagName("div");
				for (var i = (ele.length - 1); i > 0; --i) {//點選確定按鈕，如沒有確定只有確認按鈕(即拜訪過)則到下一位
					if (ele[i].id == "neko-alert-ok-button") {
						ele[i].click();
						count = count + 1;
						break;
					}
				}
			} else if (count == "2") {//在沒有對話框準備點選下一位朋友時候進入
				var ele = myiframe.contentDocument.getElementsByTagName("div");
				for (var i = 20; i < ele.length; i++) {
					if (ele[i].className == "next-friend-button neko-button") {
						ele[i].click();
						count = 0;
						break;
					} else if (i == (ele.length - 1)) {//最後一個友人,沒有next-friend-button 則回到里
						var ele1 = myiframe.contentDocument.getElementsByTagName("a");
						for (var j = 0; j < ele1.length; j++) {
							if (ele1[j].href == "http://nyashindig.wasabii.com.tw/village.htm") {
								ele1[j].click();
								count = 0;
								break;
							}
						}
					}
				}
			}
			break;
		case 701+offset_height:
			//onWar
			var ele = myiframe.contentDocument.getElementById("btl-ok-button");
			if (ele) {
				ele.click();
			}

			break;
		case 735+offset_height:
			if (document.getElementById("remote_iframe_0").contentDocument.getElementById("show-chase-accept")) {
				var ele = myiframe.contentDocument.getElementsByTagName("div");
				for (var i = (ele.length - 1); i > 0; --i) {
					if (ele[i].id == "neko-alert-close") {
						ele[i].click();
					}
				}

				var ele = myiframe.contentDocument.getElementsByTagName("a");
				for (var i = 0; i < ele.length; i++) {
					if (ele[i].href == "http://nyashindig.wasabii.com.tw/village.htm") {
						ele[i].click();
						break;
					}
				}

			} else if (document.getElementById("remote_iframe_0").contentDocument.getElementById("show-chase-info")) {

				var ele = myiframe.contentDocument.getElementsByTagName("div");
				for (var i = (ele.length - 1); i > 0; --i) {
					if (ele[i].id == "neko-alert-close") {
						ele[i].click();
					}
				}

				var ele = myiframe.contentDocument.getElementsByTagName("a");
				for (var i = 0; i < ele.length; i++) {
					if (ele[i].href == "http://nyashindig.wasabii.com.tw/village.htm") {
						ele[i].click();
						break;
					}
				}

			} else if (document.getElementById("remote_iframe_0").contentDocument.getElementById("notify").className) {
				if (document.getElementById("remote_iframe_0").contentDocument.getElementById("notify-button")) {
					if ((document.getElementById("remote_iframe_0").contentDocument.getElementById("notify-button").style.height) == "33px") {
						var ele = myiframe.contentDocument.getElementsByTagName("div");
						//Click the "notify-1"  confirm button
						for (var i = (ele.length - 1); i > 0; --i) {
							if (ele[i].id == "notify-button") {
								ele[i].click();
								break;
							}
						}
					}
				} else {//Click the other confirm button
					var ele = myiframe.contentDocument.getElementsByTagName("div");
					for (var i = (ele.length - 1); i > 0; --i) {
						if (ele[i].id == "neko-alert-confirm-button") {
							ele[i].click();
							break;
						}
					}
				}

			} else {//Click the other confirm button
				var ele = myiframe.contentDocument.getElementsByTagName("div");
				for (var i = (ele.length - 1); i > 0; --i) {
					if (ele[i].id == "neko-alert-confirm-button") {
						ele[i].click();
						break;
					}
				}

				var ele = myiframe.contentDocument.getElementsByTagName("a");
				for (var i = 0; i < ele.length; i++) {
					if (ele[i].href == "http://nyashindig.wasabii.com.tw/village.htm") {
						ele[i].click();
						break;
					}
				}

			}

			break;

		case 20+offset_height:
			if (document.getElementById("remote_iframe_0").contentDocument.getElementById("app_main").innetHTML) {
				location.reload();
				break;
			}

			break;
		case 297+offset_height:
			var ele = myiframe.contentDocument.getElementsByTagName("a");

			for (var i = 0; i < ele.length; i++) {
				if (ele[i].href == "http://nyashindig.wasabii.com.tw/village.htm") {
					ele[i].click();
					break;
				}
			}

			break;
		case 0:
			if (count < 10) {
				count = count + 1;
				break;
			} else {
				location.reload();
				break;
			}

			break;
		default:

			break;
	}

}

//Main program====

myiframe.onload = function() {

	setInterval(show_height, 8000);
	setTimeout(refresh, 2400000);
	//每40分鐘更新網頁
}
