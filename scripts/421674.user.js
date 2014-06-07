// ==UserScript==
// @name           ニコニコ動画(原宿) 「＠ジャンプ」後に自動再生
// @namespace      https://userscripts.org/users/347021
// @version        1.0.0
// @description    【原宿プレイヤー用】＠ジャンプ後（jump関数実行後）に動画が自動再生されないバグを修正する
// @include        main
// @author         100の人 https://userscripts.org/users/347021
// @license        Creative Commons Attribution 3.0 Unported License
// ==/UserScript==

(function () {
'use strict';

gBrowser.addTabsProgressListener({
	QueryInterface: function (uuid) {
		if (uuid.equals(Ci.nsIWebProgressListener) || uuid.equals(Ci.nsISupportsWeakReference) || uuid.equals(Ci.nsISupports)) {
			return this;
		}
		throw Cr.NS_NOINTERFACE;
	},
	onStateChange: function (browser, webProgress, request, stateFlags, status) {
		if (stateFlags & Ci.nsIWebProgressListener.STATE_STOP
				&& request.URI !== request.originalURI
				&& request.originalURI.spec.startsWith('http://www.nicovideo.jp/redir?')) {
			// リクエスト完了時の通知であり、
			// リダイレクト後のHTTPチャンネル、かつリダイレクト前のURLが原宿の自動ジャンプによるものなら
			let win = webProgress.DOMWindow;
			
			// 動画の準備完了時に再生開始
			win.location.assign('javascript: (' + function () {
				NicoPlayerReady.register(function () {
					document.getElementById('flvplayer').ext_play(true);
				});
			}.toString() + ')();');
			
			// クエリ文字列を削除
			win.history.replaceState(win.history.state, win.document.title, win.location.pathname);
		}
	},
	onLocationChange: function () { },
	onProgressChange: function () { },
	onStatusChange: function () { },
	onSecurityChange: function () { },
	onLinkIconAvailable: function () { },
});

})();
