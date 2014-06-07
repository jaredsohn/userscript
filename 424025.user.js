// ==UserScript==
// @name           pixiv タグクラウドからピックアップ
// @namespace      https://userscripts.org/users/347021
// @id             pixiv-tag-cloud-pickup-347021
// @version        1.1.1
// @description    作品左側のタグクラウド（作品タグ）から、閲覧中の作品についているタグと同じものをピックアップする / If there are tags attached to a work, this script brings those tags to the top of the tag cloud (illustration or novel tags column) on the left.
// @match          http://www.pixiv.net/member_illust.php?*mode=medium*
// @match          http://www.pixiv.net/novel/show.php?*id=*
// @domain         www.pixiv.net
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_deleteValue
// @grant          GM_listValues
// @run-at         document-start
// @updateURL      https://userscripts.org/scripts/source/424025.meta.js
// @icon           data:image/vnd.microsoft.icon;base64,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
// @author         100の人 https://userscripts.org/users/347021
// @license        Creative Commons Attribution 3.0 Unported License
// ==/UserScript==

(function () {
'use strict';

/**
 * messageイベントの選別等に使用するID。
 * @constant {string}
 */
var ID = 'pixiv-tag-cloud-pickup-347021';

/**
 * タグ一覧ページをキャッシュしておく期間（秒数）。
 * @type {number}
 */
var CACHE_LIFETIME = 24 * 60 * 60;

/**
 * 秒をミリ秒に変換するときの乗数
 * @constant {number}
 */
var MINUTES_TO_MILISECONDS = 1000;

/**
 * 小説ページなら真。
 * @constant {boolean}
 */
var NOVEL = window.location.pathname === '/novel/show.php';

/**
 * タグ一覧ページをキャッシュする名前の接尾辞。
 * @type {string}
 */
var CACHE_NAME_SUFFIX = (NOVEL ? '-novel' : '') + '-tags';

/**
 * タグ一覧ページのキャッシュ期限を記録する名前の接尾辞。
 * @type {string}
 */
var CACHE_EXPIRE_NAME_SUFFIX = (NOVEL ? '-novel' : '') + '-expire';

polyfill();

var viewMypixivs = document.getElementsByClassName('view_mypixiv');
startScript(main,
		function (parent) { return parent.classList.contains('area_inside'); },
		function (target) { return target.classList.contains('view_mypixiv'); },
		function () { return viewMypixivs[0]; },
		{
			isTargetParent: function (parent) { return parent.classList.contains('ui-layout-west'); },
			isTarget: function (target) { return target.classList.contains('user-tags'); },
		});



var nextCleaningDate = GM_getValue('next-cleaning-date');
if (nextCleaningDate) {
	if (new Date(nextCleaningDate).getTime() < Date.now()) {
		// 予定時刻を過ぎていれば、古いキャッシュを削除
		var names = GM_listValues();
		for (var i = 0, l = names.length; i < l; i++) {
			var name = names[i];
			if (name) {
				if (name.endsWith('-expire')) {
					if (new Date(GM_getValue(name)).getTime() < Date.now()) {
						// キャッシュの有効期限が切れていれば
						GM_deleteValue(name);
						var tagsName = name.replace('-expire', '-tags');
						GM_deleteValue(tagsName);
						delete names[names.indexOf(tagsName)];
					}
				}
			}
		}
		nextCleaningDate = null;
	}
} else {
	// バージョン1.0.0で生成されたデータの削除
	Array.prototype.forEach.call(GM_listValues(), GM_deleteValue);
}
if (!nextCleaningDate) {
	GM_setValue('next-cleaning-date', new Date(Date.now() + CACHE_LIFETIME * MINUTES_TO_MILISECONDS).toISOString());
}



function main() {
	// スタイルシートの設定
	var styleSheet = document.head.appendChild(document.createElement('style')).sheet;
	var cssRules = styleSheet.cssRules;
	[
		'.tagCloud .last-current-tag::after {'
				+ 'content: "";'
				+ 'display: inline-block;'
				+ 'height: 18px;'
				+ 'border-right: solid 1px #999;'
				+ 'width: 10px;'
				+ 'margin-bottom: -3px;'
				+ '-webkit-transform: rotate(0.3rad);'
				+ 'transform: rotate(0.3rad);'
				+ '}',
	].forEach(function (rule) {
		styleSheet.insertRule(rule, cssRules.length);
	});

	/**
	 * タグクラウド。
	 * @type {HTMLUListElement}
	 */
	var tagCloud = document.getElementsByClassName('tagCloud')[0];

	/**
	 * タグリンクのURLの接頭辞。
	 * @type {string}
	 */
	var tagCloudAnchorPrefix = /.+tag=/.exec(tagCloud.getElementsByTagName('a')[0].getAttribute('href'))[0];

	/**
	 * タグクラウドに無いタグ一覧。
	 * @type {HTMLLIElement[]}
	 */
	var minorityTags = [];

	var currentTags = new DocumentFragment();

	// 表示している作品のタグを取得する
	Array.prototype.forEach.call(document.querySelectorAll('.tag .text'), function (tagItem) {
		currentTags.appendChild(new Text(' '));
		/**
		 * RFC 3986にもとづいてパーセント符号化されたタグ。
		 * @type {string}
		 */
		var urlencodedTag = /[^=]+$/.exec(tagItem.search)[0];
	
		var anchor = tagCloud.querySelector('[href$="tag=' + urlencodedTag + '"]');
		if (anchor) {
			// タグクラウドに同じタグが存在すれば、抜き出す
			currentTags.appendChild(anchor.parentElement);
		} else {
			// 存在しなければ、もっとも出現度の低いタグとして追加しておく
			var li = document.createElement('li');
			li.classList.add('level6');
			anchor = document.createElement('a');
			anchor.href = tagCloudAnchorPrefix + urlencodedTag;
			anchor.textContent = tagItem.textContent;
			li.appendChild(anchor);
			minorityTags.push(currentTags.appendChild(li));
		}
	});

	// 表示している作品のタグとそれ以外のタグとの区切りを示すクラスを設定
	currentTags.lastChild.classList.add('last-current-tag'); // Firefox 24 ESRはDocumentFragmentにParentNodeを未実装

	/**
	 * タグクラウドに出現数が2つ回以上のタグしか無ければ真。
	 * @type {boolean}
	 */
	var tagCloudHavingOnlymajorityTags = tagCloud.children.length === tagCloud.getElementsByClassName('cnt').length;

	// タグクラウドの先頭に挿入
	tagCloud.insertBefore(currentTags, tagCloud.firstChild);

	if (minorityTags.length > 0 && tagCloudHavingOnlymajorityTags) {
		// 表示している作品のタグのうち、タグクラウドに存在しないタグがあり、
		// かつタグクラウドに出現数が2回以上のタグしか無ければ
		getUserId(function (userId) {
			// タグ一覧を取得
			getAllTags(userId, function (tags) {
				minorityTags.forEach(function (li) {
					var anchor = li.firstElementChild;
					
					// タグ一覧ページから出現数が2回以上のタグ数を取得
					var tag = anchor.text;
					var count;
					for (count in tags) {
						if (tags[count].indexOf(tag) !== -1) {
							// タグの数を表示
							var cnt = document.createElement('span');
							cnt.textContent = '(' + count + ')';
							cnt.classList.add('cnt');
							anchor.appendChild(cnt);
							break;
						}
					}
				});
			});
		});
	}
}

/**
 * 投稿者のユーザーIDを取得する。
 * @param {Function} callback
 */
function getUserId(callback) {
	window.addEventListener('message', function (event) {
		if (isDataToThisScript(event, window.location.origin)) {
			// 当スクリプト宛てのメッセージなら
			callback(event.data.userId);
		}
	});
	// script要素を埋め込んで変数値をmessageイベントで配送
	var script = document.createElement('script');
	script.text = '(' + function (id) {
		window.postMessage({
			id: id,
			userId: pixiv.context.userId,
		}, window.location.origin);
	}.toString() + ')(' + JSON.stringify(ID) + ')';
	document.head.appendChild(script);
}

/**
 * 指定したユーザーの、出現数が2回以上のタグ一覧を取得する。
 * @param {string} userId
 * @param {Function} callback - 第1引数に、イラスト数をキー、タグの配列を値としたオブジェクト。
 */
function getAllTags(userId, callback) {
	var expire = GM_getValue(userId + CACHE_EXPIRE_NAME_SUFFIX);
	if (expire && new Date(expire).getTime() > Date.now()) {
		// キャッシュが存在し、有効期限が切れていなければ
		callback(JSON.parse(GM_getValue(userId + CACHE_NAME_SUFFIX)));
	} else {
		getAllTagsFromPage(userId, callback);
	}
}

/**
 * 指定したユーザーの、出現数が2回以上のタグ一覧をページから取得し、キャッシュとして保存する。
 * @param {string} userId
 * @param {Function} callback - 第1引数に、イラスト数をキー、タグの配列を値としたオブジェクト。
 */
function getAllTagsFromPage(userId, callback) {
	var client = new XMLHttpRequest();
	client.open('GET', './member_tag_all.php?id=' + userId);
	client.responseType = 'document';
	client.addEventListener('load', function (event) {
		var counts = event.target.response.querySelectorAll('.tag-list > dt');
		if (counts.length > 0) {
			var tags = {};
			Array.prototype.forEach.call(counts, function (dt) {
				var count = dt.textContent;
				if (count > 1) {
					tags[dt.textContent] = Array.prototype.map.call(dt.nextElementSibling.getElementsByTagName('a'), function (anchor) {
						return anchor.text;
					});
				}
			});

			GM_setValue(userId + CACHE_NAME_SUFFIX, JSON.stringify(tags));

			// 有効期限（日時）の設定
			var expire = new Date(Date.now() + CACHE_LIFETIME * MINUTES_TO_MILISECONDS).toISOString();
			GM_setValue(userId + CACHE_EXPIRE_NAME_SUFFIX, expire);

			callback(tags);
		}
	});
	client.send();
}

/**
 * 当スクリプト宛てのメッセージなら真を返す。
 * @param {MessageEvent} event
 * @param {string} [origin] - 期待する送信元オリジン。
 * @returns {boolean}
 */
function isDataToThisScript(event, origin) {
	if (origin === undefined || event.origin === origin) {
		var data = event.data;
		return typeof data === 'object' && data !== null && data.id === ID;
	} else {
		return false;
	}
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
 * @version 2014-03-23
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
		observer.disconnect();
		document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
	}
}

/**
 * ECMAScript仕様のPolyfill、GM関数の実装。
 */
function polyfill() {
	if (!String.prototype.hasOwnProperty('endsWith')) {
		/**
		 * Determines whether a string ends with the characters of another string, returning true or false as appropriate.
		 * @param {string} searchString - The characters to be searched for at the end of this string.
		 * @param {number} [endPosition] - Search within this string as if this string were only this long; defaults to this string's actual length, clamped within the range established by this string's length.
		 * @returns {boolean}
		 * @see {@link http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.endswith 21.1.3.7 String.prototype.endsWith (searchString [, endPosition] )}
		 * @see {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith String.endsWith - JavaScript | MDN}
		 * @version polyfill-2013-11-05
		 * @name String.prototype.endsWith
		 */
		Object.defineProperty(String.prototype, 'endsWith', {
			writable: true,
			enumerable: false,
			configurable: true,
			value: function (searchString) {
				var searchStr = String(searchString),
						endPosition = arguments[1],
						len = this.length,
						end = endPosition === undefined ? len : Math.min(Math.max(Math.floor(endPosition) || 0, 0), len);
				return this.substring(end - searchStr.length, end) === searchStr;
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

	// Implement GM_setValue, GM_getValue, GM_deleteValue and GM_listValues for Google Chrome
	if (GM_setValue.toString().contains('not supported')) {
		window.GM_setValue = function setValueToLocalStorage(name, value) {
			var item = getValuesFromLocalStorage();
			item[name] = value;
			window.localStorage.setItem(ID, JSON.stringify(item));
		};
		window.GM_getValue = function getValueFromLocalStorage(name, defaultValue) {
			var item = getValuesFromLocalStorage();
			return item[name] === undefined ? defaultValue : item[name];
		}
		window.GM_deleteValue = function getValueFromLocalStorage(name, defaultValue) {
			var item = getValuesFromLocalStorage();
			delete item[name];
			window.localStorage.setItem(ID, JSON.stringify(item));
		}
		window.GM_listValues = function getValueFromLocalStorage(name, defaultValue) {
			return Object.keys(getValuesFromLocalStorage());
		}
	}

	/**
	 * ローカルストレージから当スクリプトの設定値を取得する。
	 * @returns {object}
	 */
	function getValuesFromLocalStorage() {
		var item = window.localStorage.getItem(ID);
		if (item) {
			try {
				item = JSON.parse(item);
			} catch (e) {
				item = {};
			}
		} else {
			item = {};
		}
		return item;
	}
}

})();
