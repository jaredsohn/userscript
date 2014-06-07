// ==UserScript==
// @name           niconico リンクを修正
// @namespace      https://userscripts.org/users/347021
// @id             niconico-fix-links-347021
// @version        1.1.0
// @description    JavaScriptのリンクを通常のリンクに置き換える / Replaces JavaScript links with HTML links in Niconico.
// @match          http://www.nicovideo.jp/*
// @match          http://live.nicovideo.jp/*
// @match          http://watch.live.nicovideo.jp/*
// @match          http://ch.nicovideo.jp/*
// @match          http://seiga.nicovideo.jp/search/*
// @match          http://app.nicovideo.jp/*
// @match          http://ichiba.nicovideo.jp/*
// @match          http://uad.nicovideo.jp/*
// @match          http://jk.nicovideo.jp/*
// @match          http://commons.nicovideo.jp/*
// @match          http://com.nicovideo.jp/*
// @match          http://news.nicovideo.jp/*
// @match          http://nivent.nicovideo.jp/*
// @domain         www.nicovideo.jp
// @domain         live.nicovideo.jp
// @domain         watch.live.nicovideo.jp
// @domain         ch.nicovideo.jp
// @domain         seiga.nicovideo.jp
// @domain         app.nicovideo.jp
// @domain         ichiba.nicovideo.jp
// @domain         uad.nicovideo.jp
// @domain         jk.nicovideo.jp
// @domain         commons.nicovideo.jp
// @domain         com.nicovideo.jp
// @domain         news.nicovideo.jp
// @domain         nivent.nicovideo.jp
// @grant          dummy
// @updateURL      https://userscripts.org/scripts/source/186235.meta.js
// @icon           data:image/vnd.microsoft.icon;base64,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
// @author         100の人 https://userscripts.org/users/347021
// @license        Creative Commons Attribution 3.0 Unported License
// ==/UserScript==

(function () {
'use strict';

polyfill();

switch (window.location.host) {
	case 'www.nicovideo.jp':
		// 動画
		if (window.location.pathname.startsWith('/watch/')) {
			var tagList = document.getElementById('videoHeaderTagList');
			if (tagList) {
				// タグ
				tagList.addEventListener('click', function (event) {
					if (event.target.classList.contains('videoHeaderTagLink')) {
						// タグリンクのクリックなら
						event.stopPropagation();
					}
				}, true);

				// マイリストリンク
				document.getElementsByClassName('videoDescription')[0].addEventListener('click', function (event) {
					event.target.classList.remove('mylistLinkButton');
				}, true);

				// 投稿者の関連動画
				var ownerVideosLink = document.getElementsByClassName('showOtherVideos')[0];
				var ownerLink = document.getElementsByClassName('userName')[0];
				ownerVideosLink.href = ownerLink.href + '/mylist';
				new MutationObserver(function () {
					ownerVideosLink.href = ownerLink.href + '/mylist';
				}).observe(document.getElementsByClassName('userName')[0], { attributes: true });
				document.getElementsByClassName('showOtherVideos')[0].parentNode.addEventListener('click', function (event) {
					event.stopPropagation();
				}, true);
			}
		}
		break;

	case 'live.nicovideo.jp':
	case 'watch.live.nicovideo.jp':
		// 生放送
		// 共通ヘッダの「お気に入り」ボタン
		var notifyboxToggleButton = document.querySelector('#notify_box_count > a');
		if (notifyboxToggleButton) {
			notifyboxToggleButton.href = '/my#Favorite_list';
		}

		var pathname = window.location.pathname;
		if (pathname === '/my') {
			// マイページの自分の放送
			Array.prototype.forEach.call(document.getElementsByClassName('nml'), function (anchor) {
				anchor.href = /http:\/\/live\.nicovideo\.jp\/[/?=0-9a-z]+/.exec(anchor.onclick)[0];
				anchor.removeAttribute('onclick');
			});
		} else if (pathname.startsWith('/watch/')) {
			// ザッピング表示
			var zappingArea = document.getElementById('zapping_area_inner');
			if (zappingArea) {
				new MutationObserver(function (mutations) {
					mutations.forEach(function (mutation) {
						var stream = mutation.addedNodes[0], streamInner, anchor;
						if (stream && stream.classList.contains('zapping_stream')) {
							streamInner = stream.firstElementChild;
							anchor = document.createElement('a');
							anchor.href = '/watch/' + /lv[0-9]+/.exec(stream.className)[0];
							anchor.className = streamInner.className;
							anchor.title = streamInner.title;
							while (streamInner.hasChildNodes()) {
								anchor.appendChild(streamInner.firstChild);
							}
							stream.replaceChild(anchor, streamInner);
						}
					});
				}).observe(zappingArea, { childList: true });
			}
		}
		break;
}

// 共通ヘッダのニコられた数ボタン
var notificationButton = document.getElementsByClassName('siteHeaderNotNotifications')[0];
if (notificationButton) {
	// すでにボタンが挿入されていれば
	observeNicoruButton(notificationButton);
} else {
	var siteHeaderNotificationContainer = document.getElementById('siteHeaderNotificationContainer');
	if (siteHeaderNotificationContainer) {
		// ボタンの挿入を待機
		new MutationObserver(function (mutations, observer) {
			observer.disconnect();
			observeNicoruButton(mutations[0].addedNodes[0]);
		}).observe(siteHeaderNotificationContainer, { childList: true });
	}
}

// 主クリック時のページ遷移防止
var siteHeaderMenuList = document.getElementsByClassName('siteHeaderMenuList')[0];
if (siteHeaderMenuList) {
	siteHeaderMenuList.addEventListener('click', function (event) {
		if (event.button === 0) {
			var target = event.target;
			if (Element.prototype.matches.call(event.target, '[href="http://www.nicovideo.jp/my/nicoru"], [href="/my#Favorite_list"], [href="/my#Favorite_list"] *')) {
				event.preventDefault();
			}
		}
	});
}

/**
 * ニコられた数ボタンを監視し、ボタンの数字にリンクを張る。
 * @param {HTMLSpanElement} notificationButton
 */
function observeNicoruButton(notificationButton) {
	// スタイルシートの設定
	var styleSheet = document.head.appendChild(document.createElement('style')).sheet;
	var cssRules = styleSheet.cssRules;
	[
		'#siteHeaderNotification #siteHeaderNotificationContainer .siteHeaderNotNotifications,' +
		'#siteHeaderNotification #siteHeaderNotificationContainer .siteHeaderNotifications {'
				+ 'border: none;'
				+ 'padding: 0;'
				+ '}',
		'#siteHeader #siteHeaderInner #siteHeaderNotificationContainer > span a {'
				+ 'font-size: 1em;'
				+ 'border-radius: 50%;'
				+ 'padding: 1px 4px;'
				+ 'border: solid 2px white !important;'
				+ 'margin-right: 0;'
				+ 'background: inherit;'
				+ '}',
	].forEach(function (rule) {
		styleSheet.insertRule(rule, cssRules.length);
	});

	fixNicoruLink();

	// ボタンがクリックされるたびに書き換わるので、その都度{@link fixNicoruLink}を実行する
	new MutationObserver(function (mutations, observer) {
		if (mutations[0].addedNodes[0].nodeType === Node.TEXT_NODE) {
			fixNicoruLink();
		}
	}).observe(notificationButton, { childList: true });

	/**
	 * ボタンの数字にリンクを張る。
	 */
	function fixNicoruLink() {
		var anchor = document.createElement('a');
		anchor.href = 'http://www.nicovideo.jp/my/nicoru';
		anchor.appendChild(notificationButton.firstChild);
		notificationButton.appendChild(anchor);
	}
}



/**
 * ECMAScript仕様のPolyfill。
 */
function polyfill() {
	var element = document.documentElement;

	// Polyfill for Firefox and Blink
	if (!('matches' in element)) {
		Object.defineProperty(Element.prototype, 'matches', {
			writable: true,
			enumerable: false,
			configurable: true,
			value: element.mozMatchesSelector || element.webkitMatchesSelector,
		});
	}

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
}

})();
