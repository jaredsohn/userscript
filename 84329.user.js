// ==UserScript==
// @name      nico_auto
// @namespace http://twitter.com/foldrr/
// @include   http://www.nicovideo.jp/watch/*
// ==/UserScript==

(function(){
	/**
	 * デバッグモード。
	 */
	var DEBUG = 0;
	
	/**
	 * スクリプト名。
	 */
	var APP_NAME = "nico_auto";
	
	/**
	 * 常に動画を自動再生するか？
	 */
	var AUTOPLAY_ALWAYS = false;
	
	/**
	 * 動画の自動再生を制御するフラグ。
	 * AUTOPLAY_ALWAYSがオフの場合はこのフラグを見て自動再生するか決定する。
	 */
	var AUTOPLAY_FLAG = "a=1";
	
	/**
	 * 次回分の動画が複数存在する場合でも自動遷移を試みる。
	 */
	var AUTOPLAY_FORCE = true;
	
	/**
	 * タイマーのインターバル。
	 */
	var INTERVAL = 2 * 1000;
	
	/**
	 * 動画へのリンクを探すためのXPATH文字列。
	 */
	var XPATH = '//div[@id="WATCHHEADER"]//a';
	
	/**
	 * 動画へのリンクだけを抜き出すためのプレフィックス。
	 */
	var HREF_TO_WATCH = "http://www.nicovideo.jp/watch/";
	
	/**
	 * プレイヤーの名前
	 */
	var PLAYER_NAME = "flvplayer";
	
	/**
	 * プレイヤーの状態（ニコニコ動画の仕様変更により変わる可能性あり）
	 */
	var STATUS_STOPPED = "stopped";
	var STATUS_LOAD    = "load";
	var STATUS_PAUSED  = "paused";
	var STATUS_PLAYING = "playing";
	var STATUS_END     = "end";
	
	/**
	 * ニコニコ動画プレイヤーのオブジェクト
	 */
	// var player = unsafeWindow.$(PLAYER_NAME);
	var player = document.getElementById(PLAYER_NAME).wrappedJSObject;
	
	/**
	 * ニコニコ動画プレイヤーの再生状態
	 */
	var currStatus;  // 現在の状態。
	var lastStatus;  // 直前の状態。
	
	/**
	 * メイン処理
	 */
	(function(){
		// プレイヤーの再生状態を更新する。
		refreshStatus();
		trace("再生状態: " + lastStatus + " => " + currStatus);
		
		// プレイヤーの再生状態が準備完了になっていれば自動再生を開始する。
		if(isReady()){
			trace("再生準備完了");
			if(isAutoPlay(location.href)){
				playMovie();
			}
		}
		
		// プレイヤーの再生状態が終了した瞬間以外なら処理を始めからやり直す。
		if(! hasEnded()){
			setTimeout(arguments.callee, INTERVAL);
			return;
		}
		trace("再生終了");
		
		// 動画へのリンクを取得。
		var linksToVideo = [];
		var links = $X(XPATH, document);
		for(var i = 0, n = links.snapshotLength; i < n; i++){
			var href = links.snapshotItem(i).href;
			if(href.indexOf(HREF_TO_WATCH) == 0){
				if(location.href < href){
					linksToVideo.push(href);
				}
			}
		}
		trace("次回動画候補件数: " + linksToVideo.length + "件");
		
		// 次回分の動画が存在しない場合。
		var len = linksToVideo.length;
		if(len == 0){
			return;
		}
		
		// 次回分の動画が１つだけ存在した場合。
		if(len == 1){
			var linkToNext = linksToVideo[linksToVideo.length - 1];
			if(linkToNext){
				location.href = linkToNext + "?" + AUTOPLAY_FLAG;
			}
			return;
		}
		
		// 次回分の動画が複数存在する場合。
		if(2 <= len){
			// 次回分の動画をユーザーが選択するよう促して終了する。
			if(! AUTOPLAY_FORCE){
				var message = document.createElement("div");
				message.innerHTML = "該当する次の動画が複数あるため自動ジャンプを中断します。";
				message.style.borderColor = "#FF0000";
				message.style.borderStyle = "solid";
				message.style.borderWidth = "2px";
				message.style.padding = "10px";
				message.style.backgroundColor = "#FFDDDD";
				message.style.fontSize = "20pt";
				message.style.fontWeight = "bold";
				player.parentNode.insertBefore(message, player);
				return;
			}
			
			// 次回動画を自動選択するために情報を取得する。
			var infos = [];
			for(var i = 0, n = linksToVideo.length; i < n; i++){
				var link = linksToVideo[i];
				var slash = link.lastIndexOf('/');
				var id = link.slice(slash + 1, link.length);
				GM_xmlhttpRequest({
					method: "GET",
					url: "http://ext.nicovideo.jp/api/getthumbinfo/" + id,
					onload: function(x){
						var parser = new DOMParser();
						var dom = parser.parseFromString(x.responseText, "application/xml");
						infos.push(dom);
					}
				});
			}
			
			// 次回動画へ自動遷移する。
			(function(){
				// 全てのタイトルを取得し終わるまで待つ。
				if(infos.length < linksToVideo.length){
					trace("次回動画の情報を取得中..." +
						infos.length + " / " + linksToVideo.length);
					setTimeout(arguments.callee, 200);
					return;
				}
				
				// 全ての次回動画から現在のタイトルに最も似ている動画を探す。
				var title = document.title;
				var nextIndex = null;
				var sameLength = 0;
				for(var i = 0, n = infos.length; i < n; i++){
					var nextTitle = $XSTR("//title", infos[i]);
					var len = equality(title, nextTitle);
					if(sameLength < len){
						nextIndex = i;
						sameLength = len;
					}
					
					if(nextIndex !== null){
						trace("次回動画候補: " + $XSTR("//title", infos[nextIndex]));
					}
				}
				
				// 最も似ている動画へ自動遷移する。
				if(nextIndex){
					var id = $XSTR("//video_id", infos[nextIndex]);
					location.href = "http://www.nicovideo.jp/watch/" + id + "?" + AUTOPLAY_FLAG;
				}
			})();
		}
		
		/**
		 * プレイヤーの再生が終了した瞬間か？
		 */
		function hasEnded(){
			return lastStatus === STATUS_PLAYING && currStatus === STATUS_END;
		}
		
		/**
		 * 自動再生するか？
		 */
		function isAutoPlay(href){
			return AUTOPLAY_ALWAYS || (0 <= href.indexOf(AUTOPLAY_FLAG));
		}
		
		/**
		 * プレイヤーの準備が完了したか？
		 */
		function isReady(){
			return lastStatus === STATUS_STOPPED &&
			       currStatus === STATUS_PAUSED;
		}
		
		// プレイヤーの再生を開始する。
		function playMovie(){
			try {
				if(player.ext_play){
					player.ext_play(1);
				}
			}
			catch(e){
			}
		}
		
		// プレイヤーの再生状態を最新にする。
		function refreshStatus(){
			// ext_getStatus() でコケる時があるので。
			try{
				lastStatus = currStatus;
				currStatus = player.ext_getStatus();
			}
			catch(e){
			}
		}
	})();
	
	/**
	 * ユーティリティ: XPATHから要素を取得する。
	 */
	function $X(xpath, node){
		var nodes = node.evaluate(xpath,
			node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		return nodes;
	}
	
	/**
	 * ユーティリティ: XPATHから要素の文字列を取得する。
	 */
	function $XSTR(xpath, node){
		var r = node.evaluate(xpath,
			node, null, XPathResult.STRING_TYPE, null);
		return r.stringValue;
	}
	
	/**
	 * ユーティリティ: 文字列が先頭から何文字一致するか調べる。
	 */
	function equality(left, right){
		var n = left.length < right.length ? left.length : right.length;
		for(var i = 0; i < n; i++){
			if(left.charAt(i) !== right.charAt(i)){
				break;
			}
		}
		
		return i;
	}
	
	/**
	 * ユーティリティ: デバッグメッセージを出力する。
	 */
	function trace(s){
		if(DEBUG){
			console.log(APP_NAME + ": " + s);
		}
	}
})();
