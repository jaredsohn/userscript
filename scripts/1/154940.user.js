// ==UserScript==
// @name           pixiv コメントを展開
// @namespace      http://userscripts.org/users/347021
// @id             pixiv-expands-comments-347021
// @version        1.3.0
// @description    コメントを常に全件表示する / Expands pixiv comments. Always shows all comments
// @match          http://www.pixiv.net/member_illust.php?*mode=medium*
// @match          http://www.pixiv.net/novel/show.php?*id=*
// @domain         www.pixiv.net
// @run-at         document-start
// @grant          dummy
// @updateURL      https://userscripts.org/scripts/source/154940.meta.js
// @icon           data:image/vnd.microsoft.icon;base64,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
// @author         100の人 https://userscripts.org/users/347021
// @license        Creative Commons Attribution 3.0 Unported License
// ==/UserScript==

/* @iconに、TMZ様のイラストを使わせていただきました。
 「iPhoneふうpixivアイコン」/「TMZ」のイラスト [pixiv]
 <http://www.pixiv.net/member_illust.php?mode=medium&illust_id=8572587> */

(function () {
'use strict';

polyfill();

/**
 * コメント取得回数（20コメント / 1回）制限
 * @constant {number}
 */
var LIMIT_LOADING_COMMENT = 10;

/**
 * 何ページ目のコメントから取得を開始するか
 * @constant {number}
 */
var DEFAULT_PAGE = 2;

var worksOptionRights = document.getElementsByClassName('worksOptionRight');
startScript(main,
	function (parent) { return parent.id === 'one_comment'; },
	function (target) { return target.classList.contains('worksOptionRight'); },
	function () { return worksOptionRights[0]; },
	{
		isTargetParent: function (parent) { return parent.nodeType === Node.ELEMENT_NODE && parent.classList.contains('work-detail-unit'); },
		isTarget: function (target) { return target.classList.contains('works_info'); },
	});
function main() {
	var illustIdElement, commentArea, commentList, moreCommentButton, illustId, userId,
			page = DEFAULT_PAGE, count = 1, client;

	illustIdElement = document.getElementsByName('illust_id')[0];
	if (illustIdElement) {
		// イラストページ
		moreCommentButton = document.getElementsByClassName('more-comment')[0];
		if (moreCommentButton) {
			// 「もっと見る」ボタンが存在すれば
			// イラストID、投稿者IDを取得
			illustId = illustIdElement.value;
			userId = document.getElementsByClassName('tab-profile')[0].search.replace('?id=', '');
			
			// コメントリスト要素を取得
			commentList = document.getElementsByClassName('_comment-items')[0];

			// コメントが取得されたとき
			client = new XMLHttpRequest();
			client.addEventListener('load', function (event) {
				var data = event.target.response.body;
				
				// コメントを追加
				commentList.insertAdjacentHTML('beforeend', data.html);
				
				if (data.more) {
					// さらにコメントがあれば
					if (++page >= DEFAULT_PAGE + LIMIT_LOADING_COMMENT * count) {
						// コメント取得回数制限を超えていれば
						// 遅延読み込みされる画像リストの更新
						var script = document.createElement('script');
						script.text = 'pixiv.scrollView.update();';
						commentList.appendChild(script);
					} else {
						getComments();
					}
				} else {
					// 全コメントを取得済みであれば
					// 「もっと見る」ボタンを削除
					moreCommentButton.remove();
					
					// 遅延読み込みされる画像リストの更新
					var script = document.createElement('script');
					script.text = 'pixiv.scrollView.update();';
					commentList.appendChild(script);
				}
			});
						
			// 「もっと見る」ボタンが押されたとき
			moreCommentButton.addEventListener('click', function (event) {
				// ページ側で設定されたイベントを実行しない
				event.stopPropagation();

				// コメントを取得
				count++;
				getComments();
			});

			// コメントを取得
			getComments();
		}
	} else {
		// 小説ページ
		// コメント表示領域を取得
		commentArea = document.getElementsByClassName('comment-area')[0];
		if (commentArea && commentArea.classList.contains('comment-more')) {
			// 「もっと見る」ボタンが表示されていれば
			// 小説ID、投稿者IDを取得
			illustId = document.getElementsByName('id')[0].value;
			userId = document.getElementById('rpc_u_id').textContent;
			
			// コメントリスト要素を取得
			commentList = commentArea.getElementsByClassName('comment-list')[0];

			// コメントが取得されたとき
			client = new XMLHttpRequest();
			client.addEventListener('load', function (event) {
				var data = event.target.response.data;
				
				// コメントを追加
				commentList.insertAdjacentHTML('beforeend', data.html_array.join(''));

				if (data.more) {
					// さらにコメントがあれば
					if (++page >= DEFAULT_PAGE + LIMIT_LOADING_COMMENT * count) {
						// コメント取得回数制限を超えていれば
					} else {
						getComments();
					}
				} else {
					// 全コメントを取得済みであれば
					// 「もっと見る」ボタンを非表示に
					commentArea.classList.remove('comment-more');
				}
			});

			// 「もっと見る」ボタンが押されたとき
			commentArea.addEventListener('click', function (event) {
				if (event.target.classList.contains('comment-more-button')) {
					// ページ側で設定されたイベントを実行しない
					event.stopPropagation();

					// コメントを取得
					count++;
					getComments();
				}
			}, true);

			// コメントを取得
			getComments();
		}
	}

	function getComments() {
		// POSTパラメータを生成
		var data = new FormData();
		data.append('i_id', illustId);
		data.append('u_id', userId);
		data.append('p', page);

		// POSTリクエスト送信
		client.open('POST', 'rpc_comment_history.php');
		client.responseType = 'json';
		client.send(data);
	}
}



/**
 * 挿入された節の親節が、目印となる節の親節か否かを返すコールバック関数
 * @callback isTargetParent
 * @param {(Document|Element)} parent
 * @returns {boolean}
 */

/**
 * 挿入された節が、目印となる節か否かを返すコールバック関数
 * @callback isTarget
 * @param {(DocumentType|Element)} target
 * @returns {boolean}
 */

/**
 * 目印となる節が文書に存在するか否かを返すコールバック関数
 * @callback existsTarget
 * @returns {boolean}
 */

/**
 * 目印となる節が挿入された直後に関数を実行する
 * @param {Function} main - 実行する関数
 * @param {isTargetParent} isTargetParent
 * @param {isTarget} isTarget
 * @param {existsTarget} existsTarget
 * @param {Object} [callbacksForFirefox] - DOMContentLoaded前のタイミングで1回だけスクリプトを起動させる場合に設定
 * @param {isTargetParent} [callbacksForFirefox.isTargetParent] - FirefoxにおけるisTargetParent
 * @param {isTarget} [callbacksForFirefox.isTarget] - FirefoxにおけるisTarget
 * @version 2013-09-23
 */
function startScript(main, isTargetParent, isTarget, existsTarget, callbacksForFirefox) {
	var observer, flag;
	
	// FirefoxのDOMContentLoaded前のMutationObserverは、要素をまとめて挿入したと見なすため、isTargetParent、isTargetを変更
	if (callbacksForFirefox && window.navigator.userAgent.contains(' Firefox/')) {
		if (callbacksForFirefox.isTargetParent) {
			isTargetParent = callbacksForFirefox.isTargetParent;
		}
		if (callbacksForFirefox.isTarget) {
			isTarget = callbacksForFirefox.isTarget;
		}
	}
	
	// 指定した節が既に存在していれば、即実行
	startMain();
	if (flag) {
		return;
	}
	
	observer = new MutationObserver(mutationCallback);
	observer.observe(document, {
		childList: true,
		subtree: true,
	});
	
	if (callbacksForFirefox) {
		// DOMContentLoadedまでにスクリプトを実行できなかった場合、監視を停止（指定した節が存在するか確認し、存在すれば実行）
		document.addEventListener('DOMContentLoaded', function stopScript(event) {
			event.target.removeEventListener('DOMContentLoaded', stopScript);
			if (observer) {
				observer.disconnect();
			}
			startMain();
			flag = true;
		});
	}
	
	/**
	 * 目印となる節が挿入されたら、監視を停止し、{@link checkExistingTarget}を実行する
	 * @param {MutationRecord[]} mutations - a list of MutationRecord objects
	 * @param {MutationObserver} observer - the constructed MutationObserver object
	 */
	function mutationCallback(mutations, observer) {
		var mutation, target, nodeType, addedNodes, addedNode, i, j, l, l2;
		for (i = 0, l = mutations.length; i < l; i++) {
			mutation = mutations[i];
			target = mutation.target;
			nodeType = target.nodeType;
			if ((nodeType === Node.ELEMENT_NODE || nodeType === Node.DOCUMENT_NODE) && isTargetParent(target)) {
				// 子が追加された節が要素節か文書節で、かつそのノードについてisTargetParentが真を返せば
				addedNodes = Array.prototype.slice.call(mutation.addedNodes);
				for (j = 0, l2 = addedNodes.length; j < l2; j++) {
					addedNode = addedNodes[j];
					nodeType = addedNode.nodeType;
					if ((nodeType === Node.ELEMENT_NODE || nodeType === Node.DOCUMENT_TYPE_NODE) && isTarget(addedNode)) {
						// 追加された子が要素節か文書型節で、かつそのノードについてisTargetが真を返せば
						observer.disconnect();
						checkExistingTarget(0);
						return;
					}
				}
			}
		}
	}
	
	/**
	 * {@link startMain}を実行し、スクリプトが開始されていなければ再度実行
	 * @param {number} count - {@link startMain}を実行した回数
	 */
	function checkExistingTarget(count) {
		var LIMIT = 500, INTERVAL = 10;
		startMain();
		if (!flag && count < LIMIT) {
			window.setTimeout(checkExistingTarget, INTERVAL, count + 1);
		}
	}
	
	/**
	 * 指定した節が存在するか確認し、存在すれば監視を停止しスクリプトを実行
	 */
	function startMain() {
		if (!flag && existsTarget()) {
			flag = true;
			main();
		}
	}
}

/**
 * ECMAScriptとWHATWG仕様のPolyfill
 */
function polyfill() {

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

(function () {
	var client, _addEventListener;
	client = new XMLHttpRequest();
	client.open('GET', 'http://polyfill.test/');
	client.responseType = 'json';
	if (client.responseType !== 'json') {
		_addEventListener = XMLHttpRequest.prototype.addEventListener;
		XMLHttpRequest.prototype.addEventListener = function (type, callback, capture) {
			if (type === 'load') {
				arguments[1] = function (event) {
					var target = event.target, response, Event, XMLHttpRequest;
					if (target.getResponseHeader('Content-Type').startsWith('application/json')) {
						response = target.response;
						if (typeof response === 'string') {
							try {
								response = JSON.parse(response);
							} catch(e) {
								response = null;
							}
							XMLHttpRequest = function () {
								Object.defineProperty(this, 'response', {writable: true, enumerable: true, configurable:true, value: response});
							};
							XMLHttpRequest.prototype = target;
							Event = function () {
								Object.defineProperty(this, 'target', {writable: true, enumerable: true, configurable:true, value: new XMLHttpRequest()});
							};
							Event.prototype = event;
							event = new Event();
						}
					}
					callback(event);
				};
			}
			_addEventListener.apply(this, arguments);
		};
	}
})();
}

})();
