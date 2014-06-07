// ==UserScript==
// @name           Autosave Wakamete Log
// @namespace      https://twitter.com/WITCHeYyY
// @description    わかめて人狼のログを自動保存する
// @version        0.1.1
// @author         @WITCHeYyY
// @homepageURL    https://userscripts.org/scripts/show/154949
// @downloadURL    https://userscripts.org/scripts/source/154949.user.js
// @updateURL      https://userscripts.org/scripts/source/154949.meta.js
// @include        http://www7a.biglobe.ne.jp/~kuri/cgi_jinro.cgi*
// @include        http://www7a.biglobe.ne.jp/~kuri/kako/*
// @include        http://jinrou.dip.jp/~jinrou/cgi_jinro.cgi*
// @include        http://jinrou.dip.jp/~jinrou/kako/*
// @grant          GM_addStyle
// @grant          GM_log
// @run-at         document-end
// @icon           http://www16.atpages.jp/momokuri/images/wlf.ico
// ==/UserScript==
// Original Message Filter Script: "wakamete filter"
// http://niha28.sakura.ne.jp/wakamete.html
(function() {
	"use strict";
	//--[デフォルト設定]--------------------------------------------------------
	var configDefault = {
		ENABLE_FILTER     : true	// 発言フィルター
		,VILLAGER_POSITION: 0		// 村人欄の縦表示 0:右上 1:右下 2:左下 3:左上 4:しない
		,BOX_POSITION     : 1		// メニューボックスの位置 0:右上 1:右下 2:左下 3:左上
		,MOVE_TIME_LEFT   : true	// 制限時間表示をメニューボックスにも表示
		,OPTIMIZED_VIEW   : true	// ログ表示の最適化
		,MULTIPLE_LIST    : true	// ログの複数日選択
		,ENABLE_TRAVELLER : true	// 観戦時にログを保存
		,SAVE_NIGHT_LOG   : false	// 夜のログを保存
		,DELETE_LOG_AT_END: true	// 終了時にログを削除
		,EXPIRES_LOG      : 3 * 60	// ログの有効期限 (分)
	};
	
	var verticalVillagerConf = {	// 村人欄縦表示の設定
		width             : "330px"	// 最大幅
		,height           : "500px"	// 最大高さ
		,margin           : "330px"	// 左配置時マージン
		,column           : 2		// 横に並べる人数
	};
	
	var ctrlBoxConf = {
		margin            : "130px"	// メニューボックス左配置時マージン
	};
	//--[デフォルト設定]--------------------------------------------------------

	// メイン処理
	var main = function() {
		// 村情報取得
		if (!vilInfo.init())
			return;
		
		// ストレージ設定
		try {
			ls = (typeof localStorage == "object") ? new StorageClass(localStorage) : null;
			ss = (typeof sessionStorage == "object") ? new StorageClass(sessionStorage) : null;
			if (!ls || !ss)
				throw null;
		} catch(e) {
			GM_log(!e ? "Web Storage未対応。" :
				"Web Storage利用不可。\nCookieの保存を許可してください。");
			return;
		}
		
		// 設定取得
		configManager.init();
		
		// CSS適用
		styleSheet.applyNormal();
		
		if (configValue.OPTIMIZED_VIEW) {
			styleSheet.applyOpt();
			styleSheet.applyMove();
		}
		
		// ログ保存無効チェック
		status.checkEnableSave();
		
		// ログ要素位置
		var nthTr = (vilInfo.kako) ? 5 :
					(vilInfo.type==0 && vilInfo.now!="0D") ? 9 : 7;
		
		// 村人欄縦置き
		if (configValue.VILLAGER_POSITION != 4)
			verticalVillager.init();
		
		// 発言フィルター
		if (configValue.ENABLE_FILTER)
			messageFilter.init(nthTr);
		
		// 村終了時処理
		if (vilInfo.closed && !vilInfo.kako)
			preprocess.closing();
		
		// 最新ログ
		var logTable = $("body > form > table > tbody > tr:nth-of-type(" + nthTr + ") > td > table");
		
		try {
			// ログリスト取得
			logList.init();
			
			// ログ保存
			if (status.enableSave)
				logManager.saveDailyLog(logTable);
		} catch(e) {
			GM_log(e);
			setTimeout(function() {
				ctrlBox.notify("ログ保存失敗。");
			}, 10);
		}
		
		// ログ挿入位置準備
		preprocess.moveLogHTML(logTable);
		
		// (コントロール)メニューボックス作成
		ctrlBox.init();
	};
	
	// 汎用関数
	function $(s)    { return document.querySelector(s); }
	function $$(s)   { return document.querySelectorAll(s); }
	function $id(id) { return document.getElementById(id); }
	function $cr(e)  { return document.createElement(e); }
	
	
	// Web Storage
	var StorageClass = function(obj) {
		this._storage = obj;
	};
	
	StorageClass.prototype = {
		get: function(key) {
			return this._storage.getItem(key);
		},
		
		set: function(key, value) {
			try {
				this._storage.setItem(key, value);
			} catch(e) {
				throw e;
			}
		},
		
		unset: function(key) {
			this._storage.removeItem(key);
		},
		
		clear: function() {
			this._storage.clear();
		},
		
		exists: function(key) {
			return (this._storage.getItem(key) !== null);
		},
		
		each: function(callback) {
			var key, value;
			for (var i=this._storage.length; i--;) {
				key = this._storage.key(i);
				value = this.get(key);
				callback.call(value, key, value);
			}
			return this;
		}
	};
	
	// ストレージインスタンス
	var ls, ss;
	
	// 設定
	var configValue = {};
	
	var configManager = {
		key: "awlConfig",	// 設定アクセスキー
		init: function() {
			// デフォルト設定読込み
			for (var key in configDefault)
				configValue[key] = configDefault[key];
			
			// ストレージ読込み
			if (ls.exists(this.key)) {
				var configUser = JSON.parse(ls.get(this.key));
				for (var key in configUser)
					configValue[key] = configUser[key];
			}
		},
		
		save: function() {
			// 更新値のみ保存
			var saveFlg = false;
			var tmpObj = {};
			for (var key in configValue) {
				if (configValue[key] == configDefault[key])
					continue;
				tmpObj[key] = configValue[key];
				saveFlg = true;
			}
			
			if (saveFlg)
				ls.set(this.key, JSON.stringify(tmpObj));
			else
				ls.unset(this.key);
		},
		
		reset: function() {
			ls.unset(this.key);
			// 再読込み
			this.init();
		}
	};
	
	// ステータス
	var status = {
		enableSave  : true,		// ログ保存の有効状態
		movedTime   : false,	// 制限時間表示の移動
		time        : Math.floor((new Date()).getTime() / 1000),
		
		checkEnableSave: function() {
			// 終了後ログ
			if (vilInfo.closed || vilInfo.kako)
				this.enableSave = false;
			// 旅人時ログ
			if (vilInfo.type == 2 && !configValue.ENABLE_TRAVELLER)
				this.enableSave = false;
			// 夜ログ
			if (vilInfo.phase == "N" && !configValue.SAVE_NIGHT_LOG)
				this.enableSave = false;
		}
	};
	
	// 村の情報
	var vilInfo = {
		no    : 0,			// 村番号
		type  : 0,			// 村人の種別
		nthDay: 0,			// 日数
		phase : "D",		// 昼夜
		now   : "0D",		// 現在の日時
		closed: false,		// 終了後
		kako  : false,		// 過去ログ
		
		// 初期化
		init: function() {
			var inputVilno = $("input[name='VILLAGENO']");
			var inputPno = $("input[name='TXTPNO']");
			var reloadCaution = $("font");
			var dayElement = $("img[src$='clock.gif'] ~ font");
			
			if (!inputVilno || !inputPno || !reloadCaution || !dayElement)
				return false;	// 必須情報が取得できない
			
			var dayText = dayElement.textContent;
			
			this.no = inputVilno.value;
			this.type = (inputPno.value == 50) ? 1 :		// 50: GM
						(inputPno.value == 60) ? 2 : 0;		// 60: 旅人, 0: その他
			this.nthDay = isNaN(dayText) ? 0 : +dayText;	// 事件前日は0日目
			this.phase = document.body.hasAttribute("bgcolor") ? "N" : "D";	// D: 昼, N: 夜
			this.now = this.nthDay + this.phase;
			
			if (dayElement.nextSibling.textContent == "日目　（終了")
				this.closed = true;
			
			if (reloadCaution.textContent != "ブラウザの更新ボタンは押さないでください")
				this.kako = true;
			
			return true;		// 初期化成功
		}
	};
	
	// ストレージ内ログ操作
	var logManager = {
		// 削除処理
		eraseLog: function(mode) {
			/*
				mode 0: 有効期限切れ（新規登録）
				mode 1: 現在の村（終了、手動）
				mode 2: 現在の村以外（手動）
			*/
			
			// 村リストを生成
			var vilList = [];
			var tmpHash = {};
			
			// 存在する村番号をすべて取得
			ls.each(function(key, value) {
				var vilno = (key.match(/^logInfo(\d+)/)||[])[1] ||
							 (key.match(/^log(\d+)_/)||[])[1] || 0;
				if (vilno)
					tmpHash[vilno] = 1;
			});
			for (var n in tmpHash)
				vilList.push(n);
			
			// 条件に合うログを削除
			var count = 0;
			for (var i=vilList.length; i--;) {
				var vilno = vilList[i];
				
				if ( (mode == 1 && vilno != vilInfo.no) || (mode != 1 && vilno == vilInfo.no) )
					continue;	// 村番号が対象外
				
				if (ls.exists("logInfo" + vilno)) {
					var logInfo = JSON.parse(ls.get("logInfo" + vilno));
					
					// 有効期限チェック
					if (mode == 0 && logInfo.expires > status.time)
						continue;
					
					// 該当番地のログを全削除
					for (var j=logInfo.list.length; j--;)
						ls.unset("log" + vilno + "_" + logInfo.list[j]);
					
					// ログ情報を削除
					ls.unset("logInfo" + vilno);
				} else {
					// logInfoが存在しないならstorageを総当り
					ls.each(function(key, value) {
						if (key.indexOf("log" + vilno + "_") == 0) {
							ls.unset(key);
						}
					});
				}
				count++;
			}
			
			return count;	// 削除した村数
		},
		
		// 有効期限確認
		checkExpires: function() {
			// 他の処理が終わった後に実行
			setTimeout(function() {
				ctrlBox.notify("有効期限確認中...");
				
				var eraseCount = logManager.eraseLog(0);
				if (eraseCount) {
					ctrlBox.notify(eraseCount + "件のログを削除しました。", 5);
				} else {
					ctrlBox.notify("");
				}
			}, 10);
		},
		
		// ログ情報を保存
		saveLogInfo: function() {
			var logInfo = {
				expires: status.time + (configValue.EXPIRES_LOG * 60),
				list: logList.item
			};
			ls.set("logInfo" + vilInfo.no, JSON.stringify(logInfo));
		},
		
		// ログを保存
		saveDailyLog: function(logTable) {
			if (!logTable || !logTable.firstChild)
				return;
			
			var logHTML = logTable.firstChild.innerHTML;
			var logKey = "log" + vilInfo.no + "_" + vilInfo.now;
			if (!ls.exists(logKey) || logHTML.length > ls.get(logKey).length) {
				ls.set(logKey, logHTML);
			}
		},
		
		// localStorage閲覧
		viewStorage: function() {
			var a = [],
				d = new Date,
				z = function(n) { return ('0' + n).slice(-2) },
				f = prompt("filter");
			if (f == null) return;
			
			ls.each(function(k, v) {
				if (k.indexOf(f) != -1 && v != null)
					a.push( k + " = " + (
						/^log\d/.test(k) ? v.length + " letters" :
						/^logInfo/.test(k) ? (function() {
							var o = JSON.parse(v);
							d.setTime(o.expires * 1000);
							o.expires = z(d.getMonth()+1) + "/" + z(d.getDate()) + " " +
								z(d.getHours()) + ":" + z(d.getMinutes()) + ":" + z(d.getSeconds());
							return JSON.stringify(o);
						})() : v
					) );
			});
			alert(a.length ? a.sort().join("\n") : "null");
		}
	};
	
	// ログリスト
	var logList = {
		item: [],			// ログ一覧
		key: "logInfo",		// アクセスキー
		
		// 初期化
		init: function() {
			this.key += vilInfo.no;		// 村番号付与
			
			if (ls.exists(this.key))
				this.item = JSON.parse(ls.get(this.key)).list;
			else if (status.enableSave)
				// ログ情報が存在しない場合、他の村の有効期限チェック
				logManager.checkExpires();
			
			if (!ls.exists("log" + vilInfo.no + "_" + vilInfo.now) || !ls.exists(this.key))
				this.update();
		},
		
		// リスト更新
		update: function() {
			var tmpHash = {};
			for (var i=this.item.length; i--;)
				tmpHash[this.item[i]] = 1;
			if (!(vilInfo.now in tmpHash))
				this.item.push(vilInfo.now);	// 最新ログを末尾に
			
			// 最新が上なのでソート
			this.item.sort(this.revSort);
			
			// ログ情報更新
			if (status.enableSave)
				logManager.saveLogInfo();
		},
		
		// ソート用関数
		revSort: function(a,b) {
			return ('0' + a).slice(-3) > ('0' + b).slice(-3)
		}
	};
	
	// 準備処理
	var preprocess = {
		// ログをコンテナに移動
		moveLogHTML: function(logTable) {
			// 配置要素作成
			var divLog = $cr("div");
			var divTitle = $cr("div");
			var divInfo = $cr("div");
			divLog.id = "log" + vilInfo.now;
			divTitle.id = "vilTitle";
			divInfo.id = "dailyInfo";
			
			// 要素取得元
			var logContainer = logTable.parentNode;
			logContainer.id = "logContainer";
			var logItems = logContainer.childNodes;
			
			// 子要素リストをコピー
			var _logItems = [];
			for (var i=0,l=logItems.length-1; i<l; i++)
				_logItems[_logItems.length] = logItems[i];
			
			// 子要素を移動
			var isVilTitle = true;
			for (var i=0,l=_logItems.length; i<l; i++) {
				var node = _logItems[i];
				if (isVilTitle) {
					if (node.tagName == "BR")
						isVilTitle = false;
					divTitle.appendChild(node);
				} else {
					divInfo.appendChild(node);
				}
			}
			
			// ログを移動
			divLog.appendChild($cr("div"));
			divLog.appendChild(logTable);
			
			// コンテナに挿入
			logContainer.appendChild(divTitle);
			logContainer.appendChild(divInfo);
			logContainer.appendChild(divLog);
		},
		
		// 終了時処理
		closing: function() {
			// 旅人とGMにログを開くリンクを追加
			if (vilInfo.type > 0) {
				var div = $cr("div");
				div.id = "linkLog";
				div.style.cssText = "background-color: #fee; color: #033;";
				div.innerHTML = 'この村の記録は<a href="cgi_jinro.cgi?COMMAND=LOGVIEW' +
					'&amp;TXTLOGIN=1&amp;STORYTYPE=3&amp;VILLAGENO=' + vilInfo.no +
					'" target="_blank" style="color: #dd3300">こちら</a>（<a href="cgi_jinro.cgi?' +
					'COMMAND=LOGVIEW&amp;TXTLOGIN=1&amp;STORYTYPE=4&amp;VILLAGENO=' + vilInfo.no +
					'" target="_blank" style="color: #dd3300">逆順</a>）から見ることができます。';
				var parent = $("body > form > table > tbody > tr:nth-of-type(3) > td");
				if (parent)
					parent.appendChild(div);
			}
			
			// ログ削除
			if ( configValue.DELETE_LOG_AT_END &&
				 ls.exists("logInfo" + vilInfo.no) &&
				 !ss.exists("notDelete" + vilInfo.no) ) {
				if (confirm("終了しました。\nログを削除しますか？")) {
					if (logManager.eraseLog(1) == 1) {
						setTimeout(function() {
							ctrlBox.notify("ログを削除しました。", 3);
						}, 10);
					}
				} else {
					// 確認済みフラグをsessionStorageに保存
					ss.set("notDelete" + vilInfo.no, 1);
				}
			}
		}
	};
	
	// 表示ログ切り替え
	var logChanger = {
		// 実行
		run: function(days) {
			// 表示配色
			var phaseflg = "";
			for (var day in days) {
				if (day.slice(-1) == "D") {// 昼ログが1つでもあれば昼の配色
					phaseflg = "D";
					break;
				}
				phaseflg = "N";
			}
			
			// 配色適用
			if (phaseflg == "") {
				return;
			} else if (phaseflg == "D") {
				document.body.removeAttribute("bgcolor");
				document.body.removeAttribute("text");
				document.body.className = "log_day";
			} else {
				document.body.setAttribute("bgcolor", "#000000");
				document.body.setAttribute("text", "#ffffff");
				document.body.className = "log_night";
			}
			
			// ログコンテナの表示更新
			var logContainer = $id("logContainer");
			var logItems = logContainer.childNodes;
			
			for (var i=2, l=logItems.length; i<l; i++)
				logItems[i].style.display = (logItems[i].id.slice(3) in days) ? "" : "none";
			
			$id("dailyInfo").style.display = (!status.movedTime || vilInfo.now in days) ? "block" : "none";
			
			
			for (var day in days) {
				if($id("log" + day)) continue;	// 作成済みのログはスキップ
				
				// ストレージからログHTML作成
				var _logKey = "log" + vilInfo.no + "_" + day;
				var strHTML = '<div id="log' + day + '"><div>' +
					'<img src="./img/clock.gif" border="0" height="32" width="32"> <font size="+2">' +
					( (day == "0D") ? ('事件前日' + '</font>') :
						( day.slice(0, -1) + '</font>日目 <img src="./img/' +
						  (day.slice(-1) == "D" ? "sun" : "moon") + '.gif" border="0">' ) ) +
					'<br><br></div><table cellpadding="0">' +
					( ls.exists(_logKey) ? ls.get(_logKey) :
						"<tbody><tr><td>ログが見つかりませんでした。(" + _logKey + ")</td></tr></tbody>" ) +
					'</table></div>';
				var range = document.createRange();
				range.selectNodeContents(logContainer);
				
				// ログ挿入位置
				var target = null;
				for (var i=2, l=logItems.length; i<l; i++) {
					if ( ("0" + logItems[i].id.slice(3)).slice(-3) < ("0" + day).slice(-3) ) {
						target = logItems[i];
						break;
					}
				}
				// ログ挿入
				logContainer.insertBefore(range.createContextualFragment(strHTML), target);
			}
			
			// 発言フィルタ
			if (configValue.ENABLE_FILTER) {
				// 発言数更新
				messageFilter.refreshCount(days);
				// 検索ボックスのテキストがあれば再検索
				messageFilter.wordFilter(void(0), true);
			}
		},
		
		// 選択されたリストを取得
		runBridge: function(e) {
			var days = {},
				options = this.options;
			for (var i=options.length; i--;)
				if (options[i].selected)
					days[ options[i].value ] = 1;
			
			// 複数選択された日時を渡す
			logChanger.run(days);
		}
	};
	
	
	// (コントロール)メニューボックス
	var ctrlBox = {
		timerID: 0,		// 制限時間タイマーID
		
		// ボックス作成
		init: function() {
			// コンテナ
			var container = $cr("div");
			container.id = "ctrlContainer";
			
			// 配置位置
			var vAlignBox = ["top", "bottom"];
			var hAlignBox = ["left", "right"];
			if (configValue.BOX_POSITION % 3)
				vAlignBox.reverse();
			if (configValue.BOX_POSITION < 2)
				hAlignBox.reverse();
			
			container.style.cssText = "position: fixed; z-index: 99; text-align: " +
				hAlignBox[0] + "; " + vAlignBox[0] + ": 0; " + hAlignBox[0] + ": 0; " +
				"border-" + vAlignBox[1] + ": 1px solid #666; border-" + hAlignBox[1] +
				": 1px solid #666; border-" + vAlignBox[1] + "-" + hAlignBox[1] + "-radius" +
				": 5px; padding: 2px; background-color: rgba(0,0,0,0.5); color: #fff;";
			
			// 制限時間
			this.moveTimeLeft(container);
			
			// ログセレクトボックス
			this.makeSelect(container);
			
			// 通知領域
			var notice = container.appendChild($cr("div"));
			notice.id = "notice";
			notice.style.cssText = "min-height: 1.2em; padding: 2px 0; font-size: small; word-break: keep-all;";
			
			// オプションボタン
			var button = container.appendChild($cr("input"));
			button.id = "optionButton";
			button.type = "button";
			button.value = "オプション";
			button.addEventListener("click", this.toggleOption, false);
			
			document.body.appendChild(container);
		},
		
		// ページ遷移時処理
		uninit: function() {
			clearInterval(this.timerID);
		},
		
		// 制限時間を移動
		moveTimeLeft: function(container) {
			var tl = $id("timeleft");
			var tl2 = $id("timeleft2");
			if (!tl && !tl2) {
				status.movedTime = true;
			} else if (configValue.MOVE_TIME_LEFT) {
				status.movedTime = true;
				// メイン制限時間
				if (tl) {
					container.appendChild(document.createTextNode(
						tl.nextSibling.tagName == "B" ?
							(vilInfo.phase == "D" ? "投票：" : "能力：") : "あと"
					));
					var _tl = tl.cloneNode(true);
					_tl.id = "_timeleft";
					container.appendChild(_tl);
					container.appendChild($cr("br"));
				}
				// 沈黙時間
				if (tl2) {
					var span = container.appendChild($cr("span"));
					span.style.fontSize = "small";
					span.appendChild(document.createTextNode("沈黙："));
					var _tl2 = tl2.cloneNode(true);
					_tl2.id = "_timeleft2";
					span.appendChild(_tl2);
					span.appendChild(document.createTextNode("秒"));
					container.appendChild($cr("br"));
				}
				
				this.timerID = setInterval(this.syncTimeLeft, 500);
				window.addEventListener("unload", this.uninit, false);
			}
		},
		
		// 制限時間同期
		syncTimeLeft: function() {
			var tl = $id("timeleft");
			var tl2 = $id("timeleft2");
			if (tl)
				$id("_timeleft").innerHTML = tl.innerHTML;
			if (tl2)
				$id("_timeleft2").innerHTML = tl2.innerHTML;
		},
		
		// ログセレクトボックス作成
		makeSelect: function(container) {
			if (vilInfo.kako)
				return;
			
			var select = container.appendChild($cr("select"));
			select.id = "selectLog";
			
			for (var i=logList.item.length; i--;) {
				var day = logList.item[i];
				// 夜ログを保存しない設定ならば、保存されていてもリストに表示しない
				if (day.slice(-1) == "N" && day != vilInfo.now && !configValue.SAVE_NIGHT_LOG)
					continue;
				
				var option = select.appendChild($cr("option"));
				option.value = day;
				option.appendChild(document.createTextNode(
					day == "0D" ? "事件前日" :
						day.slice(0, -1) + "日目 " + (day.slice(-1) == "D" ? "昼" : "夜")
				));
			}
			
			// ログの複数選択
			if (configValue.MULTIPLE_LIST) {
				var len = select.childNodes.length;
				select.multiple = true;
				select.size = len < 10 ? len : 10;
				select.selectedIndex = 0;
			}
			
			select.addEventListener("change", logChanger.runBridge, false);
		},
		
		// オプション開閉
		toggleOption: function() {
			var dialog = $id("optionDialog");
			if (dialog) {// 作成済み
				if (dialog.style.display == "none") {
					dialog.style.display = "block";
					this.value = "オプションを閉じる";
				} else {
					dialog.style.display = "none";
					this.value = "オプション";
				}
				return;
			}
			
			this.value = "オプションを閉じる";
			optionDialog.init();
		},
		
		// 通知
		notify: function(msg, clrSec) {
			$id("notice").textContent = msg;
			if (clrSec)
				setTimeout(function() {
					ctrlBox.notify("")
				}, clrSec * 1000);
		}
	};
	
	// オプションダイアログ
	var optionDialog = {
		// 初期化
		init: function() {
			var dialog = $cr("div");
			dialog.id = "optionDialog";
			
			this.makeUList(dialog);
			this.makeButtonBox(dialog);
			this.makeLinks(dialog);
			
			// 挿入位置の調整
			if (configValue.BOX_POSITION % 3)
				$id("ctrlContainer").insertBefore(dialog, $id("notice"));
			else
				$id("ctrlContainer").appendChild(dialog);
		},
		
		// リストアイテムの作成
		makeUList: function(dialog) {
			var unorderedList = dialog.appendChild($cr("ul"));
			unorderedList.id ="optionUList";
			unorderedList.style.cssText = "list-style-type: none; text-align: left; " +
				"font-size: small; margin: 0; padding: 0;";
			
			// チェックボックス作成関数
			var addCheckBox = function(id, caption) {
				var li = unorderedList.appendChild($cr("li"));
				var label = li.appendChild($cr("label"));
				var input = label.appendChild($cr("input"));
				input.type = "checkbox";
				input.id = "check_" + id;
				input.checked = configValue[id];
				var span = label.appendChild($cr("span"));
				span.appendChild(document.createTextNode(caption));
			};
			
			// セレクトボックス作成関数
			var addSelectBox = function(id, caption, values) {
				var li = unorderedList.appendChild($cr("li"));
				var span = li.appendChild($cr("span"));
				span.appendChild(document.createTextNode(caption));
				var select = li.appendChild($cr("select"));
				select.id = "value_" + id;
				for (var i=0,l=values.length; i<l; i++) {
					var option = select.appendChild($cr("option"));
					option.value = i;
					option.appendChild(document.createTextNode(values[i]));
				}
				select.selectedIndex = configValue[id];
			};
			
			// 数字入力ボックス作成関数
			var addNumberBox = function(id, caption) {
				var li = unorderedList.appendChild($cr("li"));
				var span = li.appendChild($cr("span"));
				span.appendChild(document.createTextNode(caption));
				var input = li.appendChild($cr("input"));
				input.type = "text";
				input.id = "value_" + id;
				input.value = configValue[id];
				input.size = 10;
			};
			
			// 各種リスト項目を配置順に作成
			addCheckBox("ENABLE_FILTER", "発言フィルターを有効");
			addSelectBox("VILLAGER_POSITION", "村人欄の縦表示：", ["右上", "右下", "左下", "左上", "しない"]);
			addSelectBox("BOX_POSITION", "メニューの位置：", ["右上", "右下", "左下", "左上"]);
			addCheckBox("MOVE_TIME_LEFT", "制限時間表示を移動");
			addCheckBox("OPTIMIZED_VIEW", "ログ表示の最適化");
			addCheckBox("MULTIPLE_LIST", "ログの複数日選択");
			addCheckBox("ENABLE_TRAVELLER", "観戦時にログを保存");
			addCheckBox("SAVE_NIGHT_LOG", "夜のログを保存");
			addCheckBox("DELETE_LOG_AT_END", "終了時にログを削除");
			addNumberBox("EXPIRES_LOG", "ログの有効期限 (分)：");
		},
		
		// ボタンの作成
		makeButtonBox: function(dialog) {
			var buttonBox = dialog.appendChild($cr("div"));
			buttonBox.style.textAlign = "center";
		
			// ボタン作成関数
			var addButton = function(fn, caption, halfSize) {
				var button = buttonBox.appendChild($cr("input"));
				button.type = "button";
				button.value = caption;
				button.style.width = halfSize ? "6.5em" : "14em";
				button.style.display = halfSize ? "inline" : "block";
				button.style.margin = halfSize ? "3px 0.5em 0" : "3px auto";
				if (halfSize) {
					button.style.width = "6.5em";
					button.style.margin = "3px 0.5em 0";
				} else {
					button.style.width = "14em";
					button.style.display = "block";
					button.style.margin = "3px auto";
				}
				button.addEventListener("click", fn, false);
			};
			
			// 各種ボタンを順に作成
			addButton(this.onOK, "OK", true);
			addButton(this.onCancel, "キャンセル", true);
			addButton(this.onInitConfig, "設定初期化", false);
			addButton(this.onDeleteThis, "この村のログを削除", false);
			addButton(this.onDeleteOthers, "この村以外のログを全削除", false);
			addButton(logManager.viewStorage, "ストレージ閲覧", false);
			addButton(this.onInitAll, "全初期化", false);
		},
		
		// リンクの作成
		makeLinks: function(dialog) {
			var linkBox = dialog.appendChild($cr("div"));
			linkBox.style.fontSize = "small";
			
			// リンク作成関数
			var addLink = function(url, text, isEnd) {
				var link = linkBox.appendChild($cr("a"));
				link.href = url;
				link.target = "_blank";
				link.appendChild(document.createTextNode(text));
				if (!isEnd)
					linkBox.appendChild(document.createTextNode(" | "));
			};
			
			// 順にリンクを作成
			//addLink("http://jinrou.sp.land.to/", "ヘルプ");
			addLink("http://my.formman.com/form/pc/JNVX0zJcfupuUn5k/", "お問い合わせ");
			addLink("https://userscripts.org/scripts/show/154949", "配布サイト", true);
		},
		
		// 設定保存処理
		onOK: function() {
			// 有効期限チェック
			var expItem = $id("value_EXPIRES_LOG");
			if (expItem.value === "" || /\D/.test(expItem.value)) {
				ctrlBox.notify("有効期限には半角数字を入力してください。", 5);
				expItem.focus();
				return;
			}
			
			// 現在の設定値を上書き
			var items1 = $$("#optionUList [id^='value_']");
			for (var i=items1.length; i--;)
				configValue[items1[i].id.slice(6)] = +items1[i].value;
			
			var items2 = $$("#optionUList input[type='checkbox']");
			for (var i=items2.length; i--;)
				configValue[items2[i].id.slice(6)] = items2[i].checked;
			try {
				configManager.save();	// 設定値保存
				
				$id("optionDialog").style.display = "none";
				$id("optionButton").value = "オプション";
				ctrlBox.notify("設定を保存しました。", 3);
			} catch(e) {
				GM_log(e);
				ctrlBox.notify("設定を保存できません。");
			}
		},
		
		// 設定保存キャンセル
		onCancel: function() {
			// 変更された項目の値を元に戻す
			var items1 = $$("#optionUList [id^='value_']");
			for (var i=items1.length; i--;)
				items1[i].value = configValue[items1[i].id.slice(6)];
			var items2 = $$("#optionUList input[type='checkbox']");
			for (var i=items2.length; i--;)
				items2[i].checked = configValue[items2[i].id.slice(6)];
			$id("optionDialog").style.display = "none";
			$id("optionButton").value = "オプション";
		},
		
		// 設定初期化
		onInitConfig: function() {
			if (!confirm("設定を初期化しますか？"))
				return;
			configManager.reset();
			optionDialog.onCancel();
			ctrlBox.notify("設定を初期化しました。", 3);
		},
		
		// 現在のログ削除
		onDeleteThis: function() {
			if ( confirm(vilInfo.no + "番地のログを削除しますか？") &&
				 logManager.eraseLog(1) == 1 )
				ctrlBox.notify("ログを削除しました。", 3);
		},
		
		// その他ログ削除
		onDeleteOthers: function() {
			if (confirm(vilInfo.no + "番地以外のログをすべて削除しますか？"))
				ctrlBox.notify(logManager.eraseLog(2) + "件のログを削除しました。", 5);
		},
		
		// localStorage全初期化
		onInitAll: function() {
			if (!confirm(location.hostname + " のログと設定をすべて初期化しますか？"))
				return;
			ls.clear();
			configManager.init();		// 設定再読み込み
			optionDialog.onCancel();	// ダイアログを閉じる
			ctrlBox.notify("すべて初期化しました。", 3);
		}
	};

	// 発言フィルター
	var messageFilter = {
		strGM: "GM",
		strSys: "SYS",
		
		// 個別フィルター
		filter: function() {
			GM_addStyle( "tr[class~=\"" + this.classList[0] + "\"] { display: " +
				(this.checked ? "table-row" : "none") + "; }" );
			var isChecked = true;
			var inputs = $$(".player > input");
			for (var i=inputs.length; i--;) {
				if (!inputs[i].checked) {
					isChecked = false;
					break;
				}
			}
			$id("selectAll").checked = isChecked;
		},
		
		// 全対象フィルター
		filterAll: function() {
			var isVisible = this.checked;
			var inputs = $$(".player > input");
			for (var i=inputs.length; i--;)
				inputs[i].checked = isVisible;
			GM_addStyle( "tr.msg { display: " + (isVisible ? "table-row" : "none") + "; }" );
		},
		
		// 単語フィルター
		wordFilter: function(evt, ignoreEmpty) {
			var filterBox = $id("wordSearch");
			if (ignoreEmpty && filterBox.value === "")
				return;
			
			try {
				var re = new RegExp(filterBox.value, "i");
			} catch(e) {
				filterBox.style.backgroundColor = "#fcc";
				return;
			}
			filterBox.style.backgroundColor = "";
			
			var tr = $$("tr.msg");
			for (var i=0, l=tr.length; i<l; i++)
				tr[i].style.display = re.test(tr[i].lastChild.textContent) ? "" : "none";
		},
		
		// 単語フィルターでsubmit抑止
		blockSubmit: function(evt) {
			if (evt.keyCode == 13)
				evt.preventDefault();
		},
		
		// 初期化処理
		init: function(nthTr) {
			var cnt = {};
			var trs = $$("body > form > table > tbody > tr:nth-of-type(" + nthTr +
						 ") > td > table > tbody > tr");
			
			this.initLogs(cnt, trs, vilInfo.now, true);
			this.makeCheckbox(cnt);
			this.makeForm(cnt);
		},
		
		// クラス付与、発言数カウント
		initLogs: function(_cnt, _trs, _day, isSetClass) {
			var tr, regex, name;
			for (var i=_trs.length; i--;) {
				tr = _trs[i];
				if ( tr.firstChild.hasAttribute("colspan") || 
					!(regex = /<b>(.+?)<\/b>(<)?/.exec(tr.firstChild.innerHTML)) ) {
					name = this.strSys;
				} else if (!regex[2]) {
					name = this.escapePlayerName(regex[1]);
				} else if (regex[1] == "ゲームマスター") {
					name = this.strGM;
				} else {
					continue;
				}
				_cnt[name]++ || (_cnt[name] = 1);
				if (isSetClass) {
					tr.classList.add(name);
					tr.classList.add("msg");
				}
			}
			
			// sessionStorageに発言数を保持
			ss.set( "cnt" + vilInfo.no + "_" + _day, JSON.stringify(_cnt) );
		},
		
		// 村人欄にチェックボックス作成
		makeCheckbox: function(cnt) {
			var tds = $$(".CLSTABLE td");
			var td, name, label, check;
			for (var i=0, l=tds.length/2; i<l ; i++) {
				td = tds[ 2 * i + 1 ];
				if (!td.firstChild) break;
				
				name = this.escapePlayerName(td.firstChild.textContent);
				
				label = td.appendChild($cr("label"));
				
				check = label.appendChild($cr("input"));
				check.type = "checkbox";
				check.checked = true;
				check.classList.add(name);
				check.addEventListener("click", this.filter, false);
				
				label.classList.add("player");
				label.appendChild(document.createTextNode(cnt[name] || 0));
				
				if (!(name in cnt))
					label.style.display = "none";
			}
		},
		
		// その他フォーム部品作成
		makeForm: function(cnt) {
			var td = $id("villagerFooter") || $(".CLSTABLE").parentNode;
			
			// すべて選択
			var labelAll = td.appendChild($cr("label"));
			
			var checkAll = labelAll.appendChild($cr("input"));
			checkAll.id = "selectAll";
			checkAll.type = "checkbox";
			checkAll.checked = true;
			checkAll.addEventListener("click", this.filterAll, false);
			
			labelAll.appendChild(document.createTextNode("ALL"));
			labelAll.style.marginRight = "0.5em";
			
			// フィルターボタン作成関数
			var addFilterCheckBox = function(strClass) {
				var label = td.appendChild($cr("label"));

				var check = label.appendChild($cr("input"));
				check.type = "checkbox";
				check.checked = true;
				check.classList.add(strClass);
				check.addEventListener("click", messageFilter.filter, false);

				label.appendChild(document.createTextNode(strClass));
				label.classList.add("player");
				label.style.marginRight = "0.5em";
				if (!(strClass in cnt))
					label.style.display = "none";
			};
			
			addFilterCheckBox(this.strSys);		// システムメッセージ
			addFilterCheckBox(this.strGM);		// GMメッセージ

			td.appendChild($cr("br"));

			// 単語フィルターボックス
			var input = td.appendChild($cr("input"));
			input.type = "text";
			input.id = "wordSearch";
			input.addEventListener("keyup", this.wordFilter, false);
			input.addEventListener("keypress", this.blockSubmit, false);
			
			// 単語フィルター検索ボタン
			var submit = td.appendChild($cr("input"));
			submit.type = "button";
			submit.value = "検索";
			submit.addEventListener("click", this.wordFilter, false);
		},
		
		// クラス名変換
		escapePlayerName: function(name) {
			return "_" + name.replace(/ /g, "&nbsp");
		},
		
		// フィルターのチェックボックスとカウントを再描画
		refreshCount: function(days) {
			var labels = $$("label.player");
			if (!labels.length) return;
			
			// 発言数再集計
			var cnt = {};
			var key, dayCnt;
			for (var day in days) {
				key = "cnt" + vilInfo.no + "_" + day;	// アクセスキー
				if ( !ss.exists(key) ) {
					// sessionStorageにない場合は、作成したHTMLをチェック
					dayCnt = {};
					this.initLogs(dayCnt, $$("#log" + day + " > table > tbody > tr"), day, false);
				} else {
					dayCnt = JSON.parse(ss.get(key));
				}
				
				// 発言数加算
				for (var name in dayCnt)
					cnt[name] = (cnt[name] || 0) + +dayCnt[name];
			}
			
			// 再描画
			var label, name;
			for (var i=labels.length; i--;) {
				label = labels[i];
				name = label.firstChild.classList[0];			// 名前classはinput要素
				label.style.display = (name in cnt) ? "" : "none";
				if (name != this.strGM && name != this.strSys)	// GM, SYSは発言数表示しない
					label.replaceChild(document.createTextNode(cnt[name] || 0), label.lastChild);
			}
		}
	};
	
	// 村人欄縦置き
	var verticalVillager = {
		key: "hideVillagerList",		// アクセスキー
		
		init: function() {
			this.key += vilInfo.no;		// 村番号付与
			
			// 村人欄とヘッダの取得
			var td = $$(".CLSTABLE td");
			var trHead = $("tr:nth-child(2)");
			if (!td.length || !trHead)
				return;// 取得失敗
			
			// 村人欄コンテナ
			var div = $cr("div");
			div.id = "villagerContainer";
			
			// コンテナ位置決め
			var vAlignBox = ["top", "bottom"];
			var hAlignBox = ["left", "right"];
			if (configValue.VILLAGER_POSITION % 3)
				vAlignBox.reverse();
			if (configValue.VILLAGER_POSITION < 2)
				hAlignBox.reverse();
			
			div.style.cssText = "position: fixed; max-width: " + verticalVillagerConf.width +
				"; max-height: 100%; " + vAlignBox[0] + ": 0; " + hAlignBox[0] + ": 0; " +
				"border-" + vAlignBox[1] + ": 1px solid #666; border-" + hAlignBox[1] +
				": 1px solid #666; border-" + vAlignBox[1] + "-" + hAlignBox[1] + "-radius" +
				": 5px; margin: 0; padding: 2px; overflow: auto; " +
				"background-color: rgba(0,0,0,0.5); color: #fff; font-size: small;";
			
			// 移動先要素作成
			var header = div.appendChild($cr("div"));
			header.id = "villagerHeader";
			
			var divList = div.appendChild($cr("div"));
			divList.id = "villagerList";
			divList.style.cssText = "max-height: " + verticalVillagerConf.height + "; overflow: auto;";
			
			var footer = div.appendChild($cr("div"));
			footer.id = "villagerFooter";
			
			var table = divList.appendChild($cr("table"));
			table.style.cssText = "color: #fff; margin: 0;";
			
			var tbody = table.appendChild($cr("tbody"));
			
			var x = trHead.textContent.match(/^(.+?\])\s*(.*)/)||[];
			header.textContent = x[1] || "◆ 村人たち";
			if (x[2])
				header.title = x[2];// わかめて用ルールテキスト
			trHead.textContent = "";
			
			// 村人欄の表示切り替え
			if (ss.exists(this.key))
				divList.style.display = "none";
			
			header.style.cursor = "pointer";
			header.addEventListener("click", this.toggleBridge, false);
			
			// 民族大移動
			var psn = verticalVillagerConf.column * 2;
			for (var i=0, l=td.length/psn; i<l; i++) {
				if (!td[psn*i].hasChildNodes())
					break;
				
				var row = tbody.appendChild($cr("tr"));
				
				for (var j=0; j<psn; j++)
					row.appendChild( td[psn*i+j] || $cr("td") );
			}
			
			// 元の村人リストテーブルを削除
			var orgTable = $(".CLSTABLE");
			orgTable.parentNode.removeChild(orgTable);
			
			table.className = "CLSTABLE";
			
			document.body.appendChild(div);
		},
		
		// 村人欄の表示切り替え
		toggle: function() {
			if (ss.exists(this.key)) {
				$id("villagerList").style.display = "block";
				ss.unset(this.key);
			} else {
				$id("villagerList").style.display = "none";
				ss.set(this.key, 1);
			}
		},
		
		toggleBridge: function() {
			verticalVillager.toggle();
		}
	};
	
	// CSS適用
	var styleSheet = {
		applyNormal: function() {
// スタイルシートの追加
GM_addStyle("\
.log_day a:link,\
.log_day a:visited,\
.log_day a:active {\
	color: #ffcc00;\
}\
.log_night a:link,\
.log_night a:visited,\
.log_night a:active {\
	color: #ff6600;\
}\
.log_day .CLSTD01 {\
	color: white;\
	background-color: black;\
	font-weight: bold;\
}\
.log_night .CLSTD01 {\
	color: black;\
	background-color: white;\
	font-weight: bold;\
}\
");
		},
		
		// ログ表示の最適化
		applyOpt: function() {
		
GM_addStyle('\
body:not([bgcolor]) {\
	color: #000000;\
	background-color: #efefef;\
}\
\
body[bgcolor="#000000"] {\
	color: #efefef;\
	background-color: #000000;\
}\
\
.CLSTABLE {\
	font-size: 13px;\
}\
\
/*◆ 見出し*/\
.CLSTD01 {\
	color: #f9f9f9 !important;\
	background-color: #666666 !important;\
	font-weight: normal !important;\
}\
/*霊界*/\
.CLSTABLE2 {\
	color: #000000;\
}\
.CLSTD02 {\
	background-color: #dedfde;\
}\
\
/*強く発言*/\
td[valign="top"] + td > font[size="+1"] {\
	color: #cc0000;\
	font-size: 15px;\
}\
td[valign="top"] + td > font[size="+1"] > b {\
	font-weight: normal;\
}\
/*弱く発言*/\
td[valign="top"] + td > font[size="-1"] {\
	color: #6666ee;\
	font-size: 13px;\
}\
/*念話*/\
td[valign="top"] + td > font[color="#ffcc33"] {\
	color: #ffaa00;\
}\
/*管理者発言*/\
td[valign="top"]:not([width="160"]) + td:not([bgcolor]) {\
	color: inherit;\
}\
/*過去ログ霊話*/\
td[valign="top"][bgcolor="#e3e3e3"],\
td[valign="top"] + td[bgcolor="#e3e3e3"] {\
	color: #000000;\
	background-color: #dedfde;\
}\
\
/*画像縮小*/\
img {\
	height: 24px;\
	width:  24px;\
}\
/*アイコン縮小*/\
.CLSTABLE img {\
	height: 16px;\
	width:  16px;\
}\
/*情報表示縮小*/\
table[width="770"] > tbody > tr:nth-child(5) > td > table:only-child:not(.CLSTABLE2) {\
	font-size: 12px;\
}\
\
/*注意表示削除*/\
table[width="770"] > tbody > tr:first-child {\
	display: none;\
}\
/*スペース削除*/\
.CLSTABLE {\
	margin: -5px 0px;\
}\
.CLSTABLE td[align="center"] {\
	font-size: 10px;\
}\
.CLSTABLE td:empty {\
	display: none;\
}\
table[width="770"] > tbody > tr:empty:nth-child(2),\
table[width="770"] > tbody > tr:nth-child(3) > td:empty {\
	display: none;\
}\
/*ログ破壊対策*/\
table:not([cellspacing]) td[valign="top"] {\
	width: 160px;\
	min-width: 160px;\
	max-width: 160px;\
}\
td[valign="top"] + td {\
	max-width: 592px;\
	min-width: 592px;\
	word-wrap: break-word;\
}\
');
		},
		
		// メインテーブルを右に移動
		applyMove: function() {
			var isVilLeft = !!(configValue.VILLAGER_POSITION == 2 || configValue.VILLAGER_POSITION == 3);
			var isBoxLeft = !!(configValue.BOX_POSITION > 1);
			if (!isVilLeft && !isBoxLeft) return;
			
			var target = $("body > form > table");
			if (isVilLeft && isBoxLeft) {
				target.style.marginLeft = "auto";
				target.style.marginRight = 0;
			} else if (isVilLeft) {
				target.style.marginLeft = verticalVillagerConf.margin;
			} else {
				target.style.marginLeft = ctrlBoxConf.margin;
			}
		}
	};
	
	main();
})();