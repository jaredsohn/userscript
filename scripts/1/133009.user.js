// ==UserScript==
// @name           bro3_questcheck
// @version        2012.05.12
// @namespace      http://5zen.info/
// @author         gozensan
// @description    クエスト完了できるものを表示しちゃうかもよ！
// @include        http://*.3gokushi.jp/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://sizzlemctwizzle.com/updater.php?id=133009
// @homepage       http://5zen.info/
// @updateURL      http://userscripts.org/scripts/source/133009.meta.js
// @icon           http://5zen.info/mikanbox/icon.png
// @run-at         document-end
// ==/UserScript==
var VERSION = "2012.05.12";

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

var d = document;
var $ = function(id) { return d.getElementById(id); };
//var $x = function(xp,dc) { return d.evaluate(xp, dc||d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; };
var $a = function(xp,dc) { var r = d.evaluate(xp, dc||d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); var a=[]; for(var i=0; i<r.snapshotLength; i++){ a.push(r.snapshotItem(i)); } return a; };
var $e = function(e,t,f) { if (!e) return; e.addEventListener(t, f, false); };

var $x = function(xp, dc) {function c(f) {var g = ''; if (typeof f === 'string') {g = f;} var h = function(a) {var b = document.implementation.createHTMLDocument(''); var c = b.createRange(); c.selectNodeContents(b.documentElement); c.deleteContents(); b.documentElement.appendChild(c.createContextualFragment(a)); return b;}; if (0 <= navigator.userAgent.toLowerCase().indexOf('firefox')) {h = function(a) {var b = document.implementation.createDocumentType('html', '-//W3C//DTD HTML 4.01//EN', 'http://www.w3.org/TR/html4/strict.dtd'); var c = document.implementation.createDocument(null, 'html', b); var d = document.createRange(); d.selectNodeContents(document.documentElement); var e = c.adoptNode(d.createContextualFragment(a)); c.documentElement.appendChild(e); return c;};} return h(g);} var m = [], r = null, n = null; var o = dc || document.documentElement; var p = o.ownerDocument; if (typeof dc === 'object' && typeof dc.nodeType === 'number') {if (dc.nodeType === 1 && dc.nodeName.toUpperCase() === 'HTML') {o = c(dc.innerHTML); p = o;} else if (dc.nodeType === 9) {o = dc.documentElement; p = dc;}} else if (typeof dc === 'string') {o = c(dc); p = o;} try {r = p.evaluate(xp, o, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); for (var i = 0, l = r.snapshotLength; i < l; i++) m.push(r.snapshotItem(i));} catch (e) {try {var q = p.evaluate(xp, o, null, XPathResult.ANY_TYPE, null); while (n = q.iterateNext()) m.push(n);} catch (e) {throw new Error(e.message);}} return m;};
var $s = function(xp, dc) {return $x(xp, dc).shift();};

// 定数定義 ======================================================================================================================
var HOST	=	location.hostname;				//アクセスURLホスト
var PGNAME	=	"_bro3_questcheck_20120511";	//グリモン領域への保存時のPGの名前
var QuestTable = [];

// main ==========================================================================================================================
(function(){
	var checkLoop = function(loop, loopmax) {
		if (loop == loopmax) {
			fukidash.snapshotItem(0).innerHTML = "クエストのチェックが完了しました。";
			return;
		} else {

			if (QuestTable[loop].Flg) {
				// クエストを受けて完了状態を確認
				NowCheckQuestNum += 1;
				fukidash.snapshotItem(0).innerHTML = "クエストが完了できるかチェックしています。しばらくお待ちください。 (" + NowCheckQuestNum + "/" + CheckQuestNum + ")";
				var c = {};
				c['list']=1;
				c['id']=parseInt(QuestTable[loop].No);
				j$.post("http://"+HOST+"/quest/index.php?list=1&id=" + QuestTable[loop].No,c,function(x){

					var htmldoc = document.createElement("html");
				        htmldoc.innerHTML = x;
					var nowQuestStatus = document.evaluate('//*[@class="gnavi_questnew"]', htmldoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					if (nowQuestStatus.snapshotLength > 0){
//						console.log("OK №" + QuestTable[loop].No + " [ " + QuestTable[loop].title + " ] ");
						QuestTable[loop].Btn1.src = "http://5zen.info/hokan/quest_orders_btn_rollover.png";
						QuestTable[loop].Btn2.src = "http://5zen.info/hokan/quest_orders_btn_rollout.png";
					} else {
//						console.log("NG №" + QuestTable[loop].No + " [ " + QuestTable[loop].title + " ] ");
					}
					// クエストキャンセル
					var c2 = {};
					c2['cancel_id']=parseInt(QuestTable[loop].No);
					c2['list']=1;
					c2['action']='cancel_quest';
					c2['ssid']=j$.cookie('SSID');
					j$.post("http://"+HOST+"/quest/index.php?cancel_id=" + parseInt(QuestTable[loop].No) + "&list=1&action=cancel_quest&ssid=" + j$.cookie('SSID')  ,c,function(){
						checkLoop(loop + 1, loopmax);
					});
				});
			} else {
				checkLoop(loop + 1, loopmax);
			}
		}
	}
	var fukidash = document.createElement("html");
	var CheckQuestNum = 0;
	var NowCheckQuestNum = 0;

	var modFunc = function () {

		if ( ((location.pathname == "/quest/index.php") || (location.pathname == "/quest/")) && (location.search.match("&id=") == null)) {
//			JSSleep(2);
			fukidash = document.evaluate('//p[@id="questB3_fukidashi"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

			var nowQuestStatus = document.evaluate('//*[@class="gnavi_questnew"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (nowQuestStatus.snapshotLength > 0) {
				// 動作不可
				fukidash.snapshotItem(0).innerHTML = "報酬受け取りが保留されているクエストが存在するため動作を停止しました";
				return;
			} else {
				// 表示されているクエストの一覧取得 questB3_table
				var nowQuestTable = document.evaluate('//*[@id="questB3_table"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				if (nowQuestTable.snapshotLength > 0){

					var nowQuestList  = document.evaluate('//*[@id="questB3_table"]//tr/td[3]/a',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					var nowQuestBtn   = document.evaluate('//*[@id="questB3_table"]//tr/td[5]/img|//*[@id="questB3_table"]//tr/td[5]/a/img[1]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					var nowQuestBtn2  = document.evaluate('//*[@id="questB3_table"]//tr/td[5]/img|//*[@id="questB3_table"]//tr/td[5]/a/img[2]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

					QuestTable = [];
					CheckQuestNum = 0;
					for (var i=0;i<nowQuestList.snapshotLength;i++){
						var QuestName = nowQuestList.snapshotItem(i).innerHTML;
						var QuestNum  = nowQuestList.snapshotItem(i).href.match(/\d+/);
						var QuestFlg  = (nowQuestBtn.snapshotItem(i).src.match("quest_orders") != null);
						if (QuestFlg) { CheckQuestNum += 1 };
//						console.log(i + ":" + nowQuestBtn2.snapshotItem(i).src);
						QuestTable.push({'title':QuestName, 'No':QuestNum, 'Flg':QuestFlg, 'Btn1':nowQuestBtn.snapshotItem(i), 'Btn2':nowQuestBtn2.snapshotItem(i)});
					}
				}
				checkLoop(0, nowQuestList.snapshotLength);
			}
		}
	}

	// document-endタイミングで置き換え実行
//questB3_list
	var menuList  = document.evaluate('//div[@id="questB3_list"]//ul/li',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
//	console.log(menuList.snapshotLength);
	menuList.snapshotItem(3).innerHTML += '　<li><a href="javascript:void(0);">クエストチェック</a></li>';
	menuList.snapshotItem(3).addEventListener("click", function() {modFunc()}, true);

//	modFunc();

})();

// ===============================================================================================================================



// 汎用ルーチン ==================================================================================================================

//3桁カンマ区切り
function addFigure(str) {
　var num = new String(str).replace(/,/g, "");
　while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
　return num;
}

function JSSleep(sec) {
	var start = new Date;
	while (1) {
		var cur = new Date;
		if (sec * 1000 <= cur.getTime() - start.getTime()) {
			break;
		}
	}
}

function constractSearchParams() {
	var search_param = new Array('p', 'mode', 'sort_1st_item', 'sort_1st_order', 'sort_2nd_item', 'sort_2nd_order', 'sort_3rd_item', 'sort_3rd_order', 'filter_difficult', 'filter_category', 'filter_reward');
	var add = '';
	if(location.search.length > 1) {
		var ret = location.search.substr(1).split("&");
		for(var i = 0; i < ret.length; i++) {
			var r = ret[i].split("=");
			for (var j = 0; j < search_param.length; j++) {
				if (search_param[j] == r[0]) {
					add += "&" + ret[i];
				}
			}
		}
	}
	return add;
}
