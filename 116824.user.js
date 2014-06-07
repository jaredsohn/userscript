// ==UserScript==
// @name           ニコニコ動画 ユーザーニコ割以外ブロック
// @namespace      https://userscripts.org/users/347021
// @id             nicovideo-user-cm-only-347021
// @version        3.0.1
// @description    【UA偽装必須】動画と生放送のプレイヤーを原宿に戻し、ユーザーニコ割が含まれる動画でのみマーキーエリアを表示する
// @match          http://www.nicovideo.jp/watch/*
// @match          http://live.nicovideo.jp/watch/*
// @match          http://watch.live.nicovideo.jp/watch/*
// @match          http://flapi.nicovideo.jp/api/getflv/*?nicovideo-user-cm-only-347021=on
// @exclude        http://www.nicovideo.jp/watch/*?*edit=owner*
// @domain         www.nicovideo.jp
// @domain         live.nicovideo.jp
// @domain         watch.live.nicovideo.jp
// @domain         flapi.nicovideo.jp
// @domain         msg.nicovideo.jp
// @grant          GM_xmlhttpRequest
// @run-at         document-start
// @updateURL      https://userscripts.org/scripts/source/116824.meta.js
// @icon           data:image/vnd.microsoft.icon;base64,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
// @author         100の人 https://userscripts.org/users/347021
// @license        Creative Commons Attribution 3.0 Unported License
// ==/UserScript==

(function(){
'use strict';

polyfill();

/**
 * スクリプトを有効にするページのGETパラメータ等に使用するID
 * 半角英数とハイフンのみからなる文字列
 * @constant {string}
 */
var ID = 'nicovideo-user-cm-only-347021';

/**
 * 視聴ページのオリジン
 * @constant {string}
 */
var VIDEO_PAGE_ORIGIN = 'http://www.nicovideo.jp';

/**
 * APIサーバーのオリジン
 * @constant {string}
 */
var API_ORIGIN = 'http://flapi.nicovideo.jp';

/**
 * ニコスクリプト簡易設定モードで設定される「クリックでマイリストにジャンプ！」の動画ID
 * @constant {string}
 */
var USER_CM_MYLIST = 'nm5575978';

/**
 * メソッドを修正済みなら真。
 * @type {boolean}
 */
var already = false;

switch (window.location.hostname) {
	case 'www.nicovideo.jp':
		// ニコニコ動画
		/**
		 * マーキーエリアを表示するなら真。
		 * @type {boolean}
		 */
		var shownMarqueeArea = false;

		document.addEventListener('afterscriptexecute', function handleEvent(event) {
			if (event.target.src.startsWith('http://res.nimg.jp/js/swfobject.js')) {
				event.currentTarget.removeEventListener(event.type, handleEvent);
				fixVideoPlayer(shownMarqueeArea);
			}
		});

		var videoId = window.location.pathname.replace('/watch/', '');
		isExistedUserCM(videoId, function (existedUserCM, existedMylist) {
			if (existedUserCM) {
				// ユーザーニコ割が存在すれば
				if (already) {
					// メソッドを修正済みなら
					var originalFlvplayer = document.getElementById('flvplayer');
					if (originalFlvplayer) {
						var flvplayer = originalFlvplayer.cloneNode(true);
						var flashvars = flvplayer.getAttribute('flashvars');
						flvplayer.setAttribute('flashvars', flashvars.replace('noMarquee=1', 'noMarquee=0'));
						originalFlvplayer.parentNode.replaceChild(flvplayer, originalFlvplayer);
					} else {
						fixVideoPlayer(true);
					}
				} else {
					shownMarqueeArea = existedUserCM;
				}
			} else {
				if (existedMylist) {
					// マイリストへのリンクが存在すれば
					getMylistId(videoId, showMylistLink);
				}
			}
		});

		if (!('onafterscriptexecute' in document)) {
			// Opera、Google Chrome
			// Tampermonkeyのloadイベントリスナー無効化を回避
			Document.prototype.addEventListener.call(document, 'load', function (event) {
				var target = event.target;
				if (target.localName === 'script') {
					target.dispatchEvent(new Event('afterscriptexecute', { bubbles: true }));
				}
			}, true);
		}
		break;

	case 'live.nicovideo.jp':
	case 'watch.live.nicovideo.jp':
		// ニコニコ生放送
		document.addEventListener('afterscriptexecute', function handleEvent(event) {
			if (event.target.text.contains('player_filename')) {
				event.currentTarget.removeEventListener(event.type, handleEvent);
				fixLivePlayer();
			}
		});

		if (!('onafterscriptexecute' in document)) {
			// Opera、Google Chrome
			new MutationObserver(function (mutations, observer) {
				for (var i = 0, l = mutations.length; i < l; i++) {
					var addedNodes = mutations[i].addedNodes;
					for (var j = 0, l2 = addedNodes.length; j < l2; j++) {
						var addedNode = addedNodes[j];
						if (addedNode.id === 'page') {
							observer.disconnect();
							var script = addedNode.previousElementSibling.previousElementSibling;
							script.dispatchEvent(new Event('afterscriptexecute', { bubbles: true }));
						}
					}
				}
			}).observe(document, { childList: true, subtree: true });
		}
		break;

	case 'flapi.nicovideo.jp':
		// 動画情報API
		window.addEventListener('message', function (event) {
			if (event.origin === VIDEO_PAGE_ORIGIN && isDataToThisScript(event.data)) {
				// 親からコメントサーバーの取得指示が来たら
				event.source.postMessage({
					id: ID,
					data: document.body.textContent.trim(),
				}, VIDEO_PAGE_ORIGIN);
			}
		});
		break;
}

/**
 * 動画プレイヤーのURLなどを修正する。
 * @param {boolean} shownMarqueeArea - マーキーエリアを表示するなら真。
 */
function fixVideoPlayer(shownMarqueeArea) {
	executeOnUnsafeContext(function (shownMarqueeArea, wmode) {
		if (!SWFObject._write) {
			SWFObject._write = SWFObject.prototype.write;
		}
		SWFObject.prototype.write = function (id) {
			if (id === 'flvplayer_container') {
				this.setAttribute('swf', 'http://res.nimg.jp/swf/player/nicoplayer.swf');
				if (shownMarqueeArea) {
					this.addVariable('noMarquee', '0');
				}
				if (wmode) {
					this.addParam('wmode', wmode);
				}
			}
			return SWFObject._write.call(this, id);
		};
	}, [shownMarqueeArea, 'webkitURL' in window ? 'opaque' : null]);
	already = true;
}

/**
 * 生放送プレイヤーのURLなどを修正する。
 */
function fixLivePlayer() {
	executeOnUnsafeContext(function () {
		Nicolive_JS_Conf.Watch.Player.player_filename = 'liveplayer.swf';
		Nicolive_JS_Conf.Watch.Player.player_width = '950';
		Nicolive_JS_Conf.Watch.Player.player_height = '520';
	});
}

/**
 * ユーザーニコ割が含まれるか否かを調べる。
 * @param {string} videoId
 * @param {Function} callback - ユーザーニコ割が存在すれば、第1引数が真。マイリストへのリンクが存在すれば、第2引数が真。
 */
function isExistedUserCM(videoId, callback) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://flapi.nicovideo.jp/api/getbgm?v=' + videoId,
		onload: function (response) {
			var existedCM = false, existedMylist = false,
					responseXML = new DOMParser().parseFromString(response.responseText, 'application/xml');
			if (responseXML.documentElement.getAttribute('status') === 'ok') {
				// ユーザーニコ割、またはバックグラウンドムービーが存在すれば
				var bgms = responseXML.getElementsByTagName('bgm');
				for (var i = 0, l = bgms.length; i < l; i++) {
					if (bgms[i].getElementsByTagName('bgm_type')[0].textContent === 'cm') {
						// ユーザーニコ割なら
						if (!existedMylist && bgms[i].getElementsByTagName('video_id')[0].textContent === USER_CM_MYLIST) {
							// マイリストへのリンクなら
							existedMylist = true;
						} else {
							existedCM = true;
							break;
						}
					}
				}
			}
			callback(existedCM, existedMylist);
		},
	});
}

/**
 * マーキーエリアにマイリストへのリンクを表示する。
 * @param {string} mylistId
 */
function showMylistLink(mylistId) {
	// スタイルシートの設定
	var styleSheet = document.head.appendChild(document.createElement('style')).sheet;
	var cssRules = styleSheet.cssRules;
	[
		'#flvplayer_container {'
				+ 'position: relative;'
				+ '}',
		'#flvplayer_container a {'
				+ 'display: block;'
				+ 'width: 544px;'
				+ 'height: 56px;'
				+ 'position: absolute;'
				+ 'top: 10px;'
				+ 'left: 10px;'
				+ 'background: linear-gradient(dimgray, whitesmoke) white;'
				+ 'font-weight: bold;'
				+ 'font-size: 28px;'
				+ 'text-align: center;'
				+ 'line-height: 56px;'
				+ 'color: black;'
				+ 'text-decoration: none;'
				+ '}',
		// フルスクリーン時
		'#flvplayer_container [style*="100%"] ~ a {'
				+ 'display: none;'
				+ '}',
	].forEach(function (rule) {
		styleSheet.insertRule(rule, cssRules.length);
	});

	var anchor = document.createElement('a');
	anchor.href = (mylistId.startsWith('mylist') ? '/' : '/watch/') + mylistId;
	anchor.textContent = 'クリックでマイリストにジャンプ！';
	anchor.target = '_blank';

	var flvplayerContainer = document.getElementById('flvplayer_container');
	if (document.getElementById('flvplayer')) {
		// プレイヤーがすでに埋め込まれていれば
		document.getElementById('flvplayer_container').appendChild(anchor);
	} else {
		new MutationObserver(function (mutations, observer) {
			for (var i = 0, l = mutations.length; i < l; i++) {
				var addedNode = mutations[i].addedNodes[0];
				if (addedNode.id === 'flvplayer') {
					observer.disconnect();
					addedNode.parentElement.appendChild(anchor);
				}
			}
		}).observe(document, { childList: true, subtree: true });
	}
}

/**
 * 投稿者コメントからマイリスト等のIDを取得する
 * @param {string} videoId
 * @param {Function} callback
 */
function getMylistId(videoId, callback) {
	var url = 'http://flapi.nicovideo.jp/api/getflv/' + videoId;
	if ('webkitURL' in window) {
		// Opera、Google Chrome
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function (response) {
				getMylistIdFromOwnerComment(response.responseText, callback);
			},
		});
	} else {
		// 動画情報APIのページを埋め込み、コメントサーバーの取得を指示する
		var iframe = document.createElement('iframe');
		iframe.src = url + '?' + ID + '=on';
		iframe.hidden = true;
		window.addEventListener('message', function (event) {
			if (event.origin === API_ORIGIN && isDataToThisScript(event.data)) {
				iframe.remove();
				getMylistIdFromOwnerComment(event.data.data, callback);
			}
		});
		iframe.addEventListener('load', function (event) {
			event.target.contentWindow.postMessage({
				id: ID,
			}, API_ORIGIN);
		});

		if (document.body) {
			// body要素がすでに生成されていれば
			document.body.appendChild(iframe);
		} else {
			new MutationObserver(function (mutations, observer) {
				for (var i = 0, l = mutations.length; i < l; i++) {
					var addedNodes = mutations[i].addedNodes;
					for (var j = 0, l2 = addedNodes.length; j < l2; j++) {
						if (addedNodes[j].localName === 'body') {
							observer.disconnect();
							document.body.appendChild(iframe);
						}
					}
				}
			}).observe(document, { childList: true, subtree: true });
		}
	}
}

/**
 * 投稿者コメントを取得し、マイリストのIDを抽出する。
 * @param {string} gotflv - getflvが返した文字列。
 * @param {Function}
 * @return {?string}
 */
function getMylistIdFromOwnerComment(gotflv, callback) {
	/**
	 * 全角文字を半角に変換するときの加数
	 * @constant {number}
	 */
	var ADDEND_FULL_TO_HALF_WIDTH = '!'.charCodeAt() - '！'.charCodeAt();

	var params = new URLSearchParams(gotflv);
	var messageServer = params.get('ms');
	if (!messageServer) {
		return;
	}

	GM_xmlhttpRequest({
		method: 'POST',
		url: messageServer,
		data: '<packet><thread thread="' + params.get('thread_id') + '" version="20061206" res_from="-1000" fork="1" /></packet>',
		onload: function (response) {
			var doc = new DOMParser().parseFromString(response.responseText, 'application/xml');
			var chats = doc.getElementsByTagName('chat');
			for (var i = 0, l = chats.length; i < l; i++) {
				// ASCII文字を半角に変換する
				var comment = chats[i].textContent.replace(/[！-～]/g, function (match) {
					return String.fromCharCode(match.charCodeAt() + ADDEND_FULL_TO_HALF_WIDTH);
				});
				// IDを取得する
				var matches = new RegExp('@CM\\s+' + USER_CM_MYLIST + '\\s+.*?(mylist/[0-9]+|[a-z]{2}[0-9]+|[0-9]{5,})', 'i').exec(comment);
				if (matches) {
					// IDが存在すれば
					callback(matches[1]);
					break;
				}
			}
		},
	});
}

/**
 * 当スクリプト宛てのメッセージなら真を返す。
 * @param {*} data - MessageEventインスタンスのdataプロパティ値。
 * @returns {boolean}
 */
function isDataToThisScript(data) {
	return typeof data === 'object' && data !== null && data.id === ID;
}

/**
 * {@link unsafeWindow}なコンテキストで関数を実行する。
 * @param {Function} func
 * @param {Array} [args]
 */
function executeOnUnsafeContext(func, args) {
	fixPrototypeJavaScriptFramework();
	var script = document.createElement('script');
	script.text = '(' + func.toString() + ').apply(null, ' + JSON.stringify(args || []) + ')';
	document.head.appendChild(script);
}



/**
 * ECMAScriptとWHATWG仕様のPolyfill
 */
function polyfill() {
// Polyfill for Opera and Google Chrome
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

// Polyfill for Firefox, Opera and Google Chrome
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

/**
 * prototype汚染が行われる Prototype JavaScript Framework (prototype.js) 1.5.1.1 のバグを修正（Tampermonkey / Violentmonkey用）
 */
function fixPrototypeJavaScriptFramework() {
	[
		[Array.prototype, 'toJSON'],
		[String.prototype, 'toJSON'],
	].forEach(function (objectProperty) {
		delete objectProperty[0][objectProperty[1]];
	});
}

})();
