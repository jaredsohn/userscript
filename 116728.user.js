// ==UserScript==
// @name           ニコニコ動画 動画を保存
// @namespace      http://userscripts.org/users/347021
// @id             niconico-video-get-file-uri-347021
// @version        2.1.2
// @description    動画ファイルに直接アクセスする URI を提供 / Gets the URI of the video file.
// @match          http://www.nicovideo.jp/watch/*
// @match          http://flapi.nicovideo.jp/api/getflv/*?niconico-video-get-file-uri-347021=on*
// @match          http://*.nicovideo.jp/smile?niconico-video-get-file-uri-347021=on
// @run-at         document-start
// @grant          dummy
// @updateURL      https://userscripts.org/scripts/source/116728.meta.js
// @icon           data:image/vnd.microsoft.icon;base64,AAABAAEAMDAAAAEAIADXCwAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAwAAAAMAgGAAAAVwL5hwAAC55JREFUaIHtmX9sHNV2xz93ZnbX3o2zu/653sSOsQ3YIQFcx/DUQkmCQFB4f5CKB3p/QCOVVuIPGlX8aCKrClEtwCWJhBDKP61U/kA8+opQEaUEKQhMMMKBZyLHJU79o9gkThx77d21Z9c7O6d/7M5kl2zybIMrVXpf6WpnZ+6ce77nnHvOvXPhD/j/AwPQ1lE2QOM6yQdgC1C2DnJ1cobpAwT4x/UYIJAXLsCf/MzyvUA6LzvJ+hgJgGe4QuI3+XtrHcwJmacAOy/zSP6evlYFfx8UcBMwnh/wAtCUf7bSuaHyv2Hg3/NyZoB7VynnJ+PvueKNv17lu78qePeD/D117e7Xx1pe1Mi5vRH4D+AWoB/4Y8CTV8yR7bRloAb4GLg1//9u4KtSAzz22GOBb775pnZpaanasqwq27arbNsOWZYVjsfj9cBREfnvtRBwlHehlDoE/B3gEZFfAV97vV4CgUAgFosFAD9wq6ZpR23bTpGbN/9KLjF4gUqgGoh4PB5veXk5fr8fv99PIBBwm2EYlJeX8/HHH5umaV6ybbsJUKslYABvAnVAFbApP/iKcN9997Fjxw5aWlpobGxk06ZNbN68mY0bN67o/WeffZbDhw87k35FdUmRCwuAf/F6vQJIS0uLHDp0SN577z37xIkTVl9fn5w8eVLef/99CYfD9pYtW+y9e/fa5DNMR0eHJJNJKYVsNiuWZYllWZLNZt2WyWQkk8mIiEh3d7dUVlYKIOFwOKuUsvI6XZNAoWf+Std1ATK33HKL3d/f7w5umqaYpimpVEosy5KBgQGJRCLOBHXbsWPH5JVXXpHPP/+8JAkHtm2LZVkiIpJIJOTYsWMCSDAYlMcff1yGh4elp6cnS24OAWgG18afAp8opZSI8NFHHxn3339/UYeysitl4NKlSyil+OCDD5iammJwcJBAIEBDQwNbt25l69ataNrvz5K6rvPCCy/Q29uLx+Ph4MGDPPTQQyilWFpawu/3A2Sd/oUEVN5iNwK/VUrdKiL2oUOH1IEDBwCYmZlB0zREBNu2yWazblNKEQqFSKVStLa2cu+99+L1ekkmkyQSCYaHh1laWsI0TRKJhNvm5+eJxWJMT08zMjJCf38/IsJTTz3FM888g9/vp7m5mcHBQWzbxomGkuw1TXs5T8Ip7evalFKi67oYhiGGYQggHo9HAPnkk09kYGBAjh49KpqmSTQalbNnz8qRI0csYM5VmSvx/jvbtv+2t7cXy7K8tm0jIkUtm82yvLyMaZosLi66bWlpiXQ6TTabveqd6zXbtrEsi0wmQyaTIZVKkcnkjJtKpfjqq6949913SSaThEIhqqursW2bQg84qSjr8/lu37Vrlzz33HNks1kymQxer/fHHkLTNDweD2tBIpFwSadSKdLpNJZl0dLSQigUwufz8fzzz9Pb24vP58Pv99PW1sbrr7/Om2++yezsLI2NjUUhZOTdSTabTUaj0XJA13Wdvr4+Dh8+jIhQVlZGWVkZHo8HpZTriVQqxeLiIgsLC24sz8/Pu1ZcDdLpNEopNmzYAEAwGKSzs5Pdu3czOTlJNpslHo8zNzdHAQFxJ7Gu6zHTNMsApqam2LVrlys8Go3S2NhIfX09NTU1RCIRqqqqqKyspKqq6qprXV/5grKnp4fu7m7Gx8e5+eabXe96vV5SqRQzMzNF2W5xcVG4kkaveEDTtLlYLFYH8OGHHwIwODjIbbfdtmJlCrPTj6EKir6IuNdPP/003d3dTmy78Hq9pNNp938gEMCyLFKpFCUJiMh8IpEQgMbG3M5u27ZtZLPZFVtUKXXdvoWKOzXB6e9YXkTweDwYRnGJisfj3HTTTUSj0SIPFFaW87FYTAHceOONRcJ/LiiluHjxYpE3HMs7sW9ZFuFw+Kp3dV1ndHSUixcvUpKAiHx3+fJlL0BzczMApmm6gy0vL5cMjdVg37591NfXo2kas7OzAG6YBINBN1WHQiGam5uvCiuAZDJZ6AEpJDDiCHUwPj7uuvrbb79lfn7+JxEo9Oinn34K5IwEUF5e7hIIBoMAdHZ2FnkLcDJc0RxwHgw7AnRdp6amhpGREdra2ujr62Pnzp0O0TUpLyK8/PLLiAh33XUXe/bsKSIAuRDLZDIEg0FisRiTk5O0t7dz5swZdwmTzWadlQJQHEJnAL788ksAbr/9doaGhtA0rSiNrRVKKQzD4MiRI+zZs8cNj6WlpaI+y8vLBINBwuEwLS0trg5KKVpaWrAsSyP39aKYAPkVXl9fHwAdHR18/fXXANx555388MMPiAiWZbFW2LbN3NwcCwsLbuwnk8miPplMhoqKCiCXOru6uvB4PIgIIyMjWJalKaUSpQgAjPf39wPQ1dXlkrl48SKVlZUAV6W3lUJESKfTjI+PMzo6yvj4OJBbXhTODcuy3Ix05swZ4vG4O6au61y4cEE3DGOhJAGl1DenTp0CYPPmzczOzjI0NMTExATT09NrUrxANn6/n+rqaizLcpVKJBIEAgG3XzqdJhgMMjU1RTAY5Ny5c5imiW3bBINBDMNQhmG42aTInB6P53fnz5//c4Dq6txWNx6P4/P5aGpqQkSuygoOrvesEFu2bCEajbp94/G4a3HIeSAWi5FMJkkmkyilEBE0TSMWi7G4uIjH41lwJn+hB3xKqdOO0JqaGgBqa2vZvn27a8VrYSXKOyistAsLC0UEUqkUN9xwA+Xl5UU7OIfEwsIChR4oJCDAeYBLly6Jk4uXl5e5HizL4rPPPqOjowNg1cUuFou5k9aRl0gkXMs7MnVdd6PAMIxYKQK2bdsXHAIAlZWVXLhw4bq5/+TJk9xzzz2cPXvWTYOrWU7Pzc0VETBNk0gkUlSFa2trqaioYGJiAk3T8Pl8pQlkMpnzAOfOnROAO+64gy+++AKfz3fVwJZlMTY2xs6dO1FKuQVp06ZNq9rwzM3NFX0XWl5eJh6Ps7CwUNQHcqndNE02bNhwuSQBp39/f7+CXP5/6aWXrlLc2T6Gw2F6enp48MEH2bZtG9FoFI/HwxtvvLFiAvPz8+7SAXJZqJQB5ubmGB0dRUTYvn37jHO/VFL/z76+vl8DPPzww7z44osopaivr2f37t3cfffdtLe3E41GCYfD7N+/f1UTuHCvrWka09PTdHZ2us9TqRQej6doLvn9fhKJBLZtMzk5yalTp5xNfUkC/zY8PPxrgB07dhCLxRgYGGBoaIjvvvuOd955h7GxMb7//vuiODUMg4aGBqLRKPX19UQiESKRCDU1NdTV1VFXV0dNTY0bz7Ztk06nGRoaYt++fa4c0zQxDINoNMrk5CSaphGPx6mtraWrq4vLly8XneD82HR6/l7m0UcflVdffVU5m5trIZPJEI/H3e898XiceDzO/Pw8ExMTjI+PMzY25lbfUlkqHo+7E7mpqYkDBw7wwAMP0NjYyPHjxzl48GCqv7+/TNO0R23b/m1ZWZlKpVJSioDz/3+UUptFxH0eDAbxer2EQiFqa2uJRqM0NDTQ3t5uNzU1EQqFCIfDhEIhla+YpeQXYXFxkUAgQCaTQdM0dF0nHA7z2muvEQqFeOutt+y3335b83q931uW9QvbtmeAosXYtQaoBt4CXgIMpdQ+Efmz/fv3Y5omp0+f5sSJE9fTDaUUzc3NtLe309bWRltbG62trbS2thKJRK6521NKUVVVRcHe5J+Av7zuYCvEe3v37hURkSeffNIiV/j+AairqKjwVlVVbQiHw3XBYLA5GAxu27hx453AbuCXwF8AzwGvAP8M/BdXzsYKPwhnlFICWPnfX+TH/slHT465hpqbm0XTtEvAH+XvOR/H9Py1Qe6TvBfwkTvQ8PAjbyulTiul7OPHj4uIyCOPPCLAPPA3wOv5butyYvmCo8NPkKGRI2g98cQTWRERTdPE5/P9kivnEesCxxM/12niJkACgYBomvbgzyTz/xQGubMyWGfL/wHrhf8Ft6Tp1QdndmIAAAAASUVORK5CYII=
// @author         100の人 https://userscripts.org/users/347021
// @contributor    JixunMoe https://greasyfork.org/users/44
// @license        Creative Commons Attribution 3.0 Unported License
// ==/UserScript==

(function () {
'use strict';

polyfill();

// L10N
setLocalizedTexts({
	'en': {
		'動画ダウンロード': 'Video download',
		'停止する': 'Stop',
		'ページを更新し、ログインが切れていないかご確認ください。': 'Please reload and make sure whether you are still logged in or not (check if session has expired).',
	},
	'zh-TW': {
		'動画ダウンロード': '動畫下載',
		'停止する': '停止',
		// Translation for chinese... - Greasy Forum <https://greasyfork.org/forum/discussion/62/translation-for-chinese-/p1>
		'ページを更新し、ログインが切れていないかご確認ください。': '請重新整理頁面檢查登入信息是否過期。',
	},
	// Translation for chinese... - Greasy Forum <https://greasyfork.org/forum/discussion/62/translation-for-chinese-/p1>
	'zh-CN': {
		'動画ダウンロード': '动画下载',
		'停止する': '停止',
		'ページを更新し、ログインが切れていないかご確認ください。': '请刷新页面检查您的登录信息是否过期。',
	},
});

/**
 * 動画ファイルを解放するまでの時間（分）
 * @constant {number}
 */
var LIFEMINUTES_OF_VIDEO = 10;

/**
 * スクリプトを有効にするページのGETパラメータ等に使用するID
 * 半角英数とハイフンのみからなる文字列
 * @constant {string}
 */
var ID = 'niconico-video-get-file-uri-347021';

/**
 * 視聴ページの生成元
 * @constant {string}
 */
var VIDEO_PAGE_ORIGIN = 'http://www.nicovideo.jp';

/**
 * APIサーバーの生成元
 * @constant {string}
 */
var API_ORIGIN = 'http://flapi.nicovideo.jp';

/**
 * 動画サーバーの生成元に一致する正規表現
 * @constant {RegExp}
 */
var VIDEO_SERVER_ORIGIN_REGEXP = /^http:\/\/smile-[a-z]+[0-9]+\.nicovideo\.jp$/;

/**
 * 分をミリ秒に変換するときの乗数
 * @constant {number}
 */
var MINUTES_TO_MILISECONDS = 60 * 1000;

var downloadButtons = document.getElementsByClassName('downloadButton');

if (document.URL === 'about:blank') {
	// window.location.origin参照時に発生するFirefoxのエラーを抑止
} else if (window.location.href.startsWith('http://www.nicovideo.jp/watch/')) {
	// 視聴ページ
	// 文書型宣言が挿入されるまで待機
	startScript(function () {
		if (document.doctype.publicId) {
			// 原宿プレイヤー
			startScript(main,
					function (parent) { return parent.localName === 'td' && parent.getAttribute('valign') === 'bottom'; },
					function (target) { return target.id === 'open_share'; },
					function () { return document.getElementById('open_share'); },
					{
						isTargetParent: function (parent) { return parent.id === 'PAGEBODY'; },
						isTarget: function (target) { return target.id === 'WATCHFOOTER'; },
					});
		} else {
			// Qwatch
			setlang(document.documentElement.lang);
			startScript(main,
					function (parent) { return parent.classList.contains('videoMenuList'); },
					function (target) { return target.classList.contains('downloadButton'); },
					function () { return downloadButtons[0]; },
					{
						isTargetParent: function (parent) { return parent.localName === 'body'; },
						isTarget: function (target) { return target.id === 'content'; },
					});
		}
	},
	function (parent) { return true; },
	function (target) { return true; },
	function () { return document.doctype; });
} else if (window.location.href.startsWith('http://flapi.nicovideo.jp/api/getflv/') && window.location.search.startsWith('?' + ID + '=on&')) {
	// 動画情報API
	window.addEventListener('message', function (event) {
		var data, uri;
		if (event.origin === VIDEO_PAGE_ORIGIN) {
			data = event.data;
			if (isDataToThisScript(data)) {
				// 親から動画サーバーへの接続指示が来たら
				uri = new URLSearchParams(document.body.textContent.trim()).get('url');
				if (uri) {
					connectVideoServer(uri, event.source);
				} else {
					// ログインしていなければ
					event.source.postMessage({
						id: ID,
						error: 'login',
					}, VIDEO_PAGE_ORIGIN);
				}
			}
		}
	});
} else if (VIDEO_SERVER_ORIGIN_REGEXP.test(window.location.origin) && window.location.pathname === '/smile' && window.location.search === '?' + ID + '=on') {
	// 動画ファイルサーバー
	window.addEventListener('message', function (event) {
		var data;
		if (event.origin === API_ORIGIN) {
			data = event.data;
			if (isDataToThisScript(data)) {
				// 親から動画ファイルへの接続指示が来たら
				openVideoFile(data.uri);
			}
		}
	});
}

function main() {
	var DEFAULT_BUTTON_TEXT = _('動画ダウンロード');
	var shared = {};
	var img, table, parent, listItem, originalButton, originalListItem, styleSheet, cssRules;

	originalButton = downloadButtons[0];
	if (originalButton) {
		// Qwatch
		// スタイルの設定
		styleSheet = document.head.appendChild(document.createElement('style')).sheet;
		cssRules = styleSheet.cssRules;
		[
			'#videoMenuTopList .videoMenuList .videoDownloadButton {'
					+ 'cursor: pointer;'
					+ '}',
			'#videoMenuTopList .videoMenuList .videoDownloadButton:hover span {'
					+ 'background-position: left top, center center, -131px -972px;'
					+ '}',
			'#videoMenuTopList .videoMenuList .videoDownloadButton span {'
					+ 'background-image: linear-gradient(rgba(144, 238, 144, 0.8), rgba(50, 205, 50, 0.8)), url(/favicon.ico), url(http://res.nimg.jp/img/watch_zero/sprites/watch-s4bdca239f7.png);'
					+ 'background-position: left top, center center, -131px -927px;'
					+ 'background-repeat: no-repeat, no-repeat, no-repeat;'
					+ 'background-size: 0% 100%, auto, auto;'
					+ '}',
		].forEach(function (rule) {
			styleSheet.insertRule(rule, cssRules.length);
		});
		shared.pregressStyle = cssRules[cssRules.length - 1].style;

		// ボタンの複製
		originalListItem = originalButton.parentNode;
		listItem = originalListItem.cloneNode(true);

		// 変更
		shared.button = listItem.firstElementChild;
		shared.button.classList.remove('downloadButton');
		shared.button.classList.add('videoDownloadButton');
		shared.buttonText = shared.button.childNodes[1];
		shared.buttonText.data = DEFAULT_BUTTON_TEXT;

		// 挿入
		originalListItem.parentNode.insertBefore(listItem, originalListItem.nextSibling);
	} else {
		// 原宿プレイヤー
		// ボタンの作成
		shared.button = document.createElement('a');
		shared.button.classList.add('musicDL');
		shared.button.classList.add('videoDL');
		shared.button.href = '#dummy';
		img = new Image(13, 13);
		img.src = '/favicon.ico';
		img.alt = '';
		shared.button.appendChild(img);
		shared.button.appendChild(new Text(' '));
		shared.buttonText = shared.button.appendChild(new Text(DEFAULT_BUTTON_TEXT));

		// 挿入
		table = document.querySelector('#player_bottom_share table');
		parent = (table.getElementsByClassName('musicDL').length > 0 ? table.insertRow(-1) : table.rows[0]).insertCell(0);
		parent.appendChild(shared.button);
	}

	// ボタンクリックの待ち受け
	shared.button.addEventListener('click', function (event) {
		var client;
		event.stopPropagation();	// Qwatch
		event.preventDefault();
		if (shared.iframe) {
			// 実行中なら（停止ボタンとしてクリックされたら）
			stopScript();
		} else {
			if (!shared.videoId) {
				// 動画ページを開いて最初の実行なら
				// 動画IDの取得
				shared.videoId = window.location.pathname.replace('/watch/', '');
				// 動画のタイトルを取得
				shared.title = convertSpecialCharacter((document.getElementById('video_title') || document.getElementsByClassName('videoHeaderTitle')[0]).textContent) + ' (' + shared.videoId + ')';
				if (!shared.pregressStyle) {
					// 原宿プレイヤー
					// スタイルの設定
					styleSheet = document.head.appendChild(document.createElement('style')).sheet;
					styleSheet.insertRule('.musicDL.videoDL {'
							+ 'background-image: linear-gradient(lightgreen, limegreen), linear-gradient(#F2F2F2, #D6D6D6), none;'
							+ 'background-repeat: no-repeat, repeat, repeat;'
							+ 'background-size: 0% 100%, auto, auto;'
							+ '}', 0);
					shared.pregressStyle = styleSheet.cssRules[0].style;
				}
			}
			// ボタンの文字を変更
			shared.buttonText.data = _('停止する');
			// ページを再読み込み
			client = new XMLHttpRequest();
			client.open('GET', document.URL);
			client.addEventListener('load', function () {
				// 動画サーバーからのメッセージ待ち受け
				window.addEventListener('message', receiveMessage);
				// 動画情報APIのページを埋め込み、動画サーバーへの接続を指示する
				shared.iframe = connectVideoInfoApi(shared.videoId);
			});
			client.send();
		}
	});
	
	/**
	 * API、動画サーバーからのメッセージを受け取るイベントリスナー
	 * @param {MessageEvent} messageEvent
	 */
	function receiveMessage(messageEvent) {
		var data, uri;
		if (messageEvent.origin === API_ORIGIN) {
			data = messageEvent.data;
			if (isDataToThisScript(data)) {
				if (data.error === 'login') {
					// ログインしていなければ
					reportLoginError();
				}
			}
		} else if (VIDEO_SERVER_ORIGIN_REGEXP.test(messageEvent.origin)) {
			data = messageEvent.data;
			if (isDataToThisScript(data)) {
				if (data.arrayBuffer) {
					// 動画の取得が完了していれば
					// ArrayBufferのBlobへの変換、Blob URLの生成
					uri = window.URL.createObjectURL(new Blob([data.arrayBuffer], {type: data.type}));
					// クリック
					clickUri(uri, shared.title + typeToExtension(data.type));
					// スクリプトの終了処理
					stopScript();
					// 一定時間後、Blob URLに紐づく資源を解放
					window.setTimeout(window.URL.revokeObjectURL, LIFEMINUTES_OF_VIDEO * MINUTES_TO_MILISECONDS, uri);
				} else if (data.total) {
					// 進捗状況の通知なら
					shared.pregressStyle.backgroundSize = data.loaded / data.total * 100 + '% 100%, auto, auto';
				} else if (data.error === 'login') {
					// ログインしていなければ
					reportLoginError();
				}
			}
		}
	}
	
	/**
	 * {@link stopScript}を実行し、ログインを促す
	 */
	function reportLoginError() {
		// スクリプトの実行を停止する
		stopScript();
		// 警告ダイアログを表示する
		window.alert(_('ページを更新し、ログインが切れていないかご確認ください。'));
	}
	
	/**
	 * スクリプトの実行を停止する（終了処理）
	 */
	function stopScript() {
		// メッセージイベントリスナーの削除
		window.removeEventListener('message', receiveMessage);
		// ボタンのスタイルを元に戻す
		shared.pregressStyle.backgroundSize = '0% 100%, auto, auto';
		// ボタンの文字を元に戻す
		shared.buttonText.data = DEFAULT_BUTTON_TEXT;
		// 埋め込んだAPIを削除することで実行を停止
		document.body.removeChild(shared.iframe);
		delete shared.iframe;
	}
}

/**
 * 当スクリプト宛てのメッセージかどうか
 * @param {*} data - MessageEventインスタンスのdataプロパティ値
 */
function isDataToThisScript(data) {
	return typeof data === 'object' && data !== null && data.id === ID;
}

/**
 * a要素でURIを埋め込みクリックする
 * @param {string} uri
 * @param {string} title
 */
function clickUri(uri, title) {
	var anchor = document.createElement('a');
	anchor.href = uri;
	anchor.download = title;
	anchor.hidden = true;
	document.body.appendChild(anchor);
	anchor.click();
	document.body.removeChild(anchor);
}

/**
 * 動画情報APIのページを埋め込み、動画サーバーへの接続を指示する
 * @param {string} [videoId] - 動画ID
 * @returns {HTMLIFrameElement} 埋め込んだフレーム
 */
function connectVideoInfoApi(videoId) {
	var iframe = document.createElement('iframe');
	iframe.src = 'http://flapi.nicovideo.jp/api/getflv/' + videoId + '?' + ID + '=on&as3=1' + window.location.search.replace('?', '&');
	iframe.hidden = true;
	iframe.addEventListener('load', function (event) {
		event.target.contentWindow.postMessage({
			id: ID,
		}, API_ORIGIN);
	});
	return document.body.appendChild(iframe);
}

/**
 * 動画ファイルと同一オリジンのページを埋め込み、動画ファイルのURIを送信する
 * @param {string} uri - 動画ファイルのURI
 */
function connectVideoServer(uri) {
	var iframe = document.createElement('iframe');
	iframe.src = uri.split('?')[0] + '?' + ID + '=on';
	iframe.addEventListener('load', function (event) {
		event.target.contentWindow.postMessage({
			id: ID,
			uri: uri,
		}, /^(http:\/\/[^/]+)/.exec(uri)[1]);
	});
	document.body.appendChild(iframe);
}

/**
 * 動画ファイルを取得し、親の親（視聴ページ）に進捗状況を送信する
 * @param {string} uri - 動画ファイルのURI
 */
function openVideoFile(uri) {
	var client = new XMLHttpRequest(), videoPage = window.parent.parent;
	client.open('GET', uri);
	client.responseType = 'arraybuffer';
	client.addEventListener('progress', function (event) {
		if (event.lengthComputable) {
			videoPage.postMessage({
				id: ID,
				total: event.total,
				loaded: event.loaded,
			}, VIDEO_PAGE_ORIGIN);
		}
	});
	client.addEventListener('load', function (event) {
		var target = event.target, message = { id: ID };
		if (target.status === 200) {
			message.arrayBuffer = target.response;
			message.type = correctMimeType(target.getResponseHeader('Content-Type'));
		} else {
			// 取得に失敗していればログインを促す
			message.error = 'login';
		}
		videoPage.postMessage(message, VIDEO_PAGE_ORIGIN);
	});
	client.send();
}

/**
 * MIMEタイプに対応する拡張子を返す
 * @param {string} type - MIMEタイプ
 * @returns {string} ピリオドを含む拡張子
 */
function typeToExtension(type) {
	switch (type.toLowerCase()) {
		case 'video/mp4':
			return '.mp4';
		case 'video/x-flv':
		case 'video/flv':	// niconico
			return '.flv';
		case 'application/x-shockwave-flash':
			return '.swf';
	}
	return '';
}

/**
 * MIMEタイプが間違っていれば正しいタイプを返す
 * @param {string} type
 * @returns {string}
 */
function correctMimeType(type) {
	switch (type.toLowerCase()) {
		case 'video/flv':
			return 'video/x-flv';
	}
	return type;
}

/**
 * ファイル名に使用できないASCII記号を全角に変換する
 * ただしWindowsにおいて、「AUX」等の完全一致した場合に使用できない文字列は置換しない
 * @param {string} str
 * @returns {string}
 */
function convertSpecialCharacter(str) {
	str = str.replace(/[\x00-\x1F\x7F]+/g, '')	// 制御文字を削除
			.replace(/ {2,}/g, ' ')	// 連続する半角空白を1つに
			.replace(/^ | $/g, '')	// 先頭末尾の半角空白を削除
			.replace(/\/|^\./g, convertCharacterToFullwidth);	// スラッシュ、先頭のピリオドを全角に
	
	if (window.navigator.platform.toLowerCase().contains('win') || window.navigator.userAgent.contains('Android')) {
		// Windows、又はAndroidの場合
		str = str.replace(/[\\<>:"/|?*]/, convertCharacterToFullwidth);
	}
	
	return str;
}

/**
 * 半角空白を除く1文字のASCII印字可能文字を対応する全角文字に変換する
 * ASCII印字可能文字以外と半角空白の入力は想定しない
 * @param {string} character - 半角空白を除くASCII印字可能文字
 * @returns {string}
 */
function convertCharacterToFullwidth(character) {
	/**
	 * UTF-16において、空白を除くASCII文字を対応する全角形に変換するときの加数
	 * @constant {string}
	 */
	var BETWEEN_HALF_AND_FULL = '～'.charCodeAt() - '~'.charCodeAt();
	
	return String.fromCharCode(character.charCodeAt() + BETWEEN_HALF_AND_FULL);
}



/**
 * 挿入された節の親節が、目印となる節の親節か否かを返すコールバック関数。
 * @callback isTargetParent
 * @param {(Document|Element)} parent
 * @returns {boolean}
 */

/**
 * 挿入された節が、目印となる節か否かを返すコールバック関数。
 * @callback isTarget
 * @param {(DocumentType|Element)} target
 * @returns {boolean}
 */

/**
 * 目印となる節が文書に存在するか否かを返すコールバック関数。
 * @callback existsTarget
 * @returns {boolean}
 */

/**
 * 目印となる節が挿入された直後に関数を実行する。
 * @param {Function} main - 実行する関数
 * @param {isTargetParent} isTargetParent
 * @param {isTarget} isTarget
 * @param {existsTarget} existsTarget
 * @param {Object} [callbacksForFirefox]
 * @param {isTargetParent} [callbacksForFirefox.isTargetParent] - FirefoxにおけるisTargetParent
 * @param {isTarget} [callbacksForFirefox.isTarget] - FirefoxにおけるisTarget
 * @version 2014-04-21
 */
function startScript(main, isTargetParent, isTarget, existsTarget, callbacksForFirefox) {
	/**
	 * {@link checkExistingTarget}で{@link startMain}を実行する間隔（ミリ秒）。
	 * @constant {number}
	 */
	var INTERVAL = 10;
	/**
	 * {@link checkExistingTarget}で{@link startMain}を実行する回数。
	 * @constant {number}
	 */
	var LIMIT = 500;

	/**
	 * 実行済みなら真。
	 * @type {boolean}
	 */
	var alreadyCalled = false;

	// 指定した節が既に存在していれば、即実行
	startMain();
	if (alreadyCalled) {
		return;
	}

	// FirefoxのMutationObserverは、HTMLのDOM構築に関して要素をまとめて挿入したと見なすため、isTargetParent、isTargetを変更
	if (callbacksForFirefox && typeof sidebar !== 'undefined') {
		if (callbacksForFirefox.isTargetParent) {
			isTargetParent = callbacksForFirefox.isTargetParent;
		}
		if (callbacksForFirefox.isTarget) {
			isTarget = callbacksForFirefox.isTarget;
		}
	}

	var observer = new MutationObserver(mutationCallback);
	observer.observe(document, {
		childList: true,
		subtree: true,
	});

	// DOMContentLoadedまでにスクリプトを実行できなかった場合、監視を停止（指定した節が存在するか確認し、存在すれば実行）
	document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

	/**
	 * {@link startMain}を実行し、スクリプトが開始されていなければ{@link stopObserving}を実行する。
	 */
	function onDOMContentLoaded() {
		startMain();
		if (!alreadyCalled) {
			stopObserving();
		}
	}

	/**
	 * 目印となる節が挿入されたら、監視を停止し、{@link checkExistingTarget}を実行する。
	 * @param {MutationRecord[]} mutations - A list of MutationRecord objects.
	 * @param {MutationObserver} observer - The constructed MutationObserver object.
	 */
	function mutationCallback(mutations, observer) {
		var mutation, target, nodeType, addedNodes, addedNode, i, j, l, l2;
		for (i = 0, l = mutations.length; i < l; i++) {
			mutation = mutations[i];
			target = mutation.target;
			nodeType = target.nodeType;
			if ((nodeType === Node.ELEMENT_NODE) && isTargetParent(target)) {
				// 子が追加された節が要素節で、かつその節についてisTargetParentが真を返せば
				addedNodes = Array.prototype.slice.call(mutation.addedNodes);
				for (j = 0, l2 = addedNodes.length; j < l2; j++) {
					addedNode = addedNodes[j];
					nodeType = addedNode.nodeType;
					if ((nodeType === Node.ELEMENT_NODE || nodeType === Node.DOCUMENT_TYPE_NODE) && isTarget(addedNode)) {
						// 追加された子が要素節か文書型節で、かつその節についてisTargetが真を返せば
						observer.disconnect();
						checkExistingTarget(0);
						return;
					}
				}
			}
		}
	}

	/**
	 * {@link startMain}を実行し、スクリプトが開始されていなければ再度実行。
	 * @param {number} count - {@link startMain}を実行した回数。
	 */
	function checkExistingTarget(count) {
		startMain();
		if (!alreadyCalled && count < LIMIT) {
			window.setTimeout(checkExistingTarget, INTERVAL, count + 1);
		}
	}

	/**
	 * 指定した節が存在するか確認し、存在すれば{@link stopObserving}を実行しスクリプトを開始。
	 */
	function startMain() {
		if (!alreadyCalled && existsTarget()) {
			stopObserving();
			main();
		}
	}

	/**
	 * 監視を停止する。
	 */
	function stopObserving() {
		alreadyCalled = true;
		if (observer) {
			observer.disconnect();
		}
		document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
	}
}

/**
 * 国際化・地域化関数の読み込み、及びECMAScriptとWHATWG仕様のPolyfill
 */
function polyfill() {
// i18n
(function () {
	/**
	 * 翻訳対象文字列 (msgid) の言語
	 * @constant {string}
	 */
	var ORIGINAL_LOCALE = 'ja';
	
	/**
	 * クライアントの言語の翻訳リソースが存在しないとき、どの言語に翻訳するか
	 * @constant {string}
	 */
	var DEFAULT_LOCALE = 'en';
	
	/**
	 * 以下のような形式の翻訳リソース
	 * {
	 *     'IETF言語タグ': {
	 *         '翻訳前 (msgid)': '翻訳後 (msgstr)',
	 *         ……
	 *     },
	 *     ……
	 * }
	 * @typedef {Object} LocalizedTexts
	 */
	
	/**
	 * クライアントの言語。{@link setlang}から変更される
	 * @type {string}
	 * @access private
	 */
	var langtag = 'ja';
	
	/**
	 * クライアントの言語のlanguage部分。{@link setlang}から変更される
	 * @type {string}
	 * @access private
	 */
	var language = 'ja';
	
	/**
	 * 翻訳リソース。{@link setLocalizedTexts}から変更される
	 * @type {LocalizedTexts}
	 * @access private
	 */
	var multilingualLocalizedTexts = {};
	multilingualLocalizedTexts[ORIGINAL_LOCALE] = {};
	
	/**
	 * テキストをクライアントの言語に変換する
	 * @param {string} message - 翻訳前
	 * @returns {string} 翻訳後
	 */
	window._ = window.gettext = function (message) {
		// クライアントの言語の翻訳リソースが存在すれば、それを返す
		return langtag in multilingualLocalizedTexts && multilingualLocalizedTexts[langtag][message]
				// 地域下位タグを取り除いた言語タグの翻訳リソースが存在すれば、それを返す
				|| language in multilingualLocalizedTexts && multilingualLocalizedTexts[language][message]
				// デフォルト言語の翻訳リソースが存在すれば、それを返す
				|| DEFAULT_LOCALE in multilingualLocalizedTexts && multilingualLocalizedTexts[DEFAULT_LOCALE][message]
				// そのまま返す
				|| message;
	};
	
	/**
	 * {@link gettext}から参照されるクライアントの言語を設定する
	 * @param {string} lang - IETF言語タグ（「language」と「language-REGION」にのみ対応）
	 */
	window.setlang = function (lang) {
		lang = lang.split('-', 2);
		language = lang[0].toLowerCase();
		langtag = language + (lang[1] ? '-' + lang[1].toUpperCase() : '');
	};
	
	/**
	 * {@link gettext}から参照される翻訳リソースを追加する
	 * @param {LocalizedTexts} localizedTexts
	 */
	window.setLocalizedTexts = function (localizedTexts) {
		var localizedText, lang, language, langtag, msgid;
		for (lang in localizedTexts) {
			localizedText = localizedTexts[lang];
			lang = lang.split('-');
			language = lang[0].toLowerCase();
			langtag = language + (lang[1] ? '-' + lang[1].toUpperCase() : '');
			
			if (langtag in multilingualLocalizedTexts) {
				// すでに該当言語の翻訳リソースが存在すれば、統合する（同じmsgidがあれば上書き）
				for (msgid in localizedText) {
					multilingualLocalizedTexts[langtag][msgid] = localizedText[msgid];
				}
			} else {
				multilingualLocalizedTexts[langtag] = localizedText;
			}
			
			if (language !== langtag) {
				// 言語タグに地域下位タグが含まれていれば
				// 地域下位タグを取り除いた言語タグも翻訳リソースとして追加する
				if (language in multilingualLocalizedTexts) {
					// すでに該当言語の翻訳リソースが存在すれば、統合する（同じmsgidがあれば無視）
					for (msgid in localizedText) {
						if (!(msgid in multilingualLocalizedTexts[language])) {
							multilingualLocalizedTexts[language][msgid] = localizedText[msgid];
						}
					}
				} else {
					multilingualLocalizedTexts[language] = localizedText;
				}
			}
			
			// msgidの言語の翻訳リソースを生成
			for (msgid in localizedText) {
				multilingualLocalizedTexts[ORIGINAL_LOCALE][msgid] = msgid;
			}
		}
	};
})();

// Polyfill for Blink
if (!String.prototype.hasOwnProperty('startsWith')) {
	/**
	 * Determines whether a string begins with the characters of another string, returning true or false as appropriate.
	 * @param {string} searchString - The characters to be searched for at the start of this string.
	 * @param {number} [position=0] - The position in this string at which to begin searching for searchString.
	 * @returns {boolean}
	 * @see {@link http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.startswith 21.1.3.18 String.prototype.startsWith (searchString [, position ] )}
	 * @see {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith String.startsWith - JavaScript | MDN}
	 * @version polyfill-2013-11-05
	 * @name String.prototype.startsWith
	 */
	Object.defineProperty(String.prototype, 'startsWith', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (searchString) {
			var position = arguments[1];
			return this.indexOf(searchString, position) === Math.max(Math.floor(position) || 0, 0);
		},
	});
}

if (!String.prototype.hasOwnProperty('contains')) {
	/**
	 * Determines whether one string may be found within another string, returning true or false as appropriate.
	 * @param {string} searchString - A string to be searched for within this string.
	 * @param {number} [position=0] - The position in this string at which to begin searching for searchString.
	 * @returns {boolean}
	 * @see {@link http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.contains 21.1.3.6 String.prototype.contains (searchString, position = 0 )}
	 * @see {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/contains String.contains - JavaScript | MDN}
	 * @version polyfill-2013-11-05
	 * @name String.prototype.contains
	 */
	Object.defineProperty(String.prototype, 'contains', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (searchString) {
			return this.indexOf(searchString, arguments[1]) !== -1;
		},
	});
}

// Polyfill for Firefox and Blink
if (typeof URLSearchParams === 'undefined') {
	/**
	 * A URLSearchParams object has an associated list of name-value pairs, which is initially empty.
	 * @constructor
	 * @param {(string|URLSearchParams)} [init=""]
	 * @see {@link http://url.spec.whatwg.org/#interface-urlsearchparams Interface URLSearchParams - URL Standard}
	 * @version polyfill-2014-03-18
	 * @name URLSearchParams
	 */
	Object.defineProperty(window, 'URLSearchParams', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (init) {
			var strings, string, index, name, value, i, l;
			this._pairs = [];
			if (init) {
				if (init instanceof URLSearchParams) {
					for (i = 0, l = init._pairs.length; i < l; i++) {
						this._pairs.push([init._pairs[i][0], init._pairs[i][1]]);
					}
				} else {
					strings = init.split('&');
					if (!strings[0].contains('=')) {
						strings[0] = '=' + strings[0];
					}
					for (i = 0, l = strings.length; i < l; i++) {
						string = strings[i];
						if (string === '') {
							continue;
						}
						index = string.indexOf('=');
						if (index !== -1) {
							name = string.slice(0, index);
							value = string.slice(index + 1);
						} else {
							name = string;
							value = '';
						}
						this._pairs.push([
							decodeURIComponent(name.replace(/\+/g, ' ')),
							decodeURIComponent(value.replace(/\+/g, ' '))
						]);
					}
				}
			}
		}
	});
	/**
	 * Append a new name-value pair whose name is name and value is value, to the list of name-value pairs.
	 * @param {string} name
	 * @param {string} value
	 * @name URLSearchParams#append
	 */
	Object.defineProperty(URLSearchParams.prototype, 'append', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (name, value) {
			this._pairs.push([String(name), String(value)]);
		}
	});
	/**
	 * Remove all name-value pairs whose name is name.
	 * @param {string} name
	 * @name URLSearchParams#delete
	 */
	Object.defineProperty(URLSearchParams.prototype, 'delete', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (name) {
			var i;
			for (i = 0; i < this._pairs.length; i++) {
				if (this._pairs[i][0] === name) {
					this._pairs.splice(i, 1);
					i--;
				}
			}
		}
	});
	/**
	 * Return the value of the first name-value pair whose name is name, and null if there is no such pair.
	 * @param {string} name
	 * @name URLSearchParams#get
	 * @returns {?string}
	 */
	Object.defineProperty(URLSearchParams.prototype, 'get', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (name) {
			var i, l;
			for (i = 0, l = this._pairs.length; i < l; i++) {
				if (this._pairs[i][0] === name) {
					return this._pairs[i][1];
				}
			}
			return null;
		}
	});
	/**
	 * Return the values of all name-value pairs whose name is name, in list order, and the empty sequence otherwise.
	 * @param {string} name
	 * @name URLSearchParams#getAll
	 * @returns {string[]}
	 */
	Object.defineProperty(URLSearchParams.prototype, 'getAll', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (name) {
			var pairs = [], i, l;
			for (i = 0, l = this._pairs.length; i < l; i++) {
				if (this._pairs[i][0] === name) {
					pairs.push(this._pairs[i][1]);
				}
			}
			return pairs;
		}
	});
	/**
	 * If there are any name-value pairs whose name is name, set the value of the first such name-value pair to value and remove the others.
	 * Otherwise, append a new name-value pair whose name is name and value is value, to the list of name-value pairs.
	 * @param {string} name
	 * @param {string} value
	 * @name URLSearchParams#set
	 */
	Object.defineProperty(URLSearchParams.prototype, 'set', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (name, value) {
			var flag, i;
			for (i = 0; i < this._pairs.length; i++) {
				if (this._pairs[i][0] === name) {
					if (flag) {
						this._pairs.splice(i, 1);
						i--;
					} else {
						this._pairs[i][1] = String(value);
						flag = true;
					}
				}
			}
			if (!flag) {
				this.append(name, value);
			}
		}
	});
	/**
	 * Return true if there is a name-value pair whose name is name, and false otherwise.
	 * @param {string} name
	 * @name URLSearchParams#has
	 * @returns {boolean}
	 */
	Object.defineProperty(URLSearchParams.prototype, 'has', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (name) {
			var i, l;
			for (i = 0, l = this._pairs.length; i < l; i++) {
				if (this._pairs[i][0] === name) {
					return true;
				}
			}
			return false;
		}
	});
	/**
	 * Return the serialization of the URLSearchParams object's associated list of name-value pairs.
	 * @name URLSearchParams#toString
	 * @returns {string}
	 */
	Object.defineProperty(URLSearchParams.prototype, 'toString', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function () {
			return this._pairs.map(function (pair) {
				return encodeURIComponent(pair[0]) + '=' + encodeURIComponent(pair[1]);
			}).join('&');
		}
	});
}
}

})();
