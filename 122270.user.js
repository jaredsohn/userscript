// ==UserScript==
// @name           pixiv 漫画ページ スペースをなくす＋
// @version        2.2.1
// @namespace      http://userscripts.org/users/347021
// @description    漫画ページのスペースをなくす / Eliminates margins in pixiv manga pages
// @include        http://www.pixiv.net/member_illust.php?*mode=manga*
// @run-at         document-start
// @grant          none
// @updateURL      https://userscripts.org/scripts/source/122270.meta.js
// @icon           data:image/vnd.microsoft.icon;base64,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
// @author         100の人
// @license        Creative Commons Attribution 3.0 Unported License
// ==/UserScript==

(function() {
'use strict';

var mangaClassElements = document.getElementsByClassName('manga');

startScript(main, null, null, function() {
	return mangaClassElements[0];
}, {
	firefox: {
		isTargetParent: function (parent) {
			return parent.localName === 'body';
		},
		isTarget: function (target) {
			return target.id === 'main';
		},
	},
	google: {
		isTargetParent: function (parent) {
			return parent.id === 'main';
		},
		isTarget: function (target) {
			return target.classList.contains('manga');
		},
	},
});

function main() {
	var imagesParent, style, sheet, cssRules;

	// スタイルの設定
	style = document.createElement('style');
	document.head.appendChild(style);
	sheet = style.sheet;
	cssRules = sheet.cssRules;
	[
		// 作品名と評価を同じ行に
		'.end-page .breadcrumbs {'
				+ 'position: absolute;'
				+ '}',
		// ページ下部の白帯の上下の空白を除去
		'.end-page {'
				+ 'min-height: 0 !important;'
				+ '}',
		'.end-page .layout-wrapper {'
				+ 'padding-top: 0;'
				+ 'padding-bottom: 0.5em;'
				+ '}',
		// 画像の下の空白を除去
		'.item-container.complete {'
				+ 'margin-bottom: 0.5em;'	// 画像クリック時のスクロールが正常に動作するために、最低2px必要
				+ 'min-height: 0 !important;'
				+ '}',
	].forEach(function(rule) {
		sheet.insertRule(rule, cssRules.length);
	});
	
	// 読み込み完了時に余白を削除
	imagesParent = mangaClassElements[0];
	imagesParent.addEventListener('load', addCompleteClass, true);
	imagesParent.addEventListener('error', addCompleteClass, true);
	
	function addCompleteClass(event) {
		var image = event.target, imageParent, images, pairImage;
		if (image.src !== 'http://source.pixiv.net/source/images/common/transparent.gif' && !(event.type === 'load' && image.width === 1 && image.height === 1)) {
			// ダミー画像で発生したイベントでなければ
			imageParent = image.parentNode;
			images = imageParent.getElementsByClassName('image');
			if (images[1]) {
				// 見開きページなら
				pairImage = image === images[0] ? images[1] : images[0];
				if (pairImage.src === 'http://source.pixiv.net/source/images/common/transparent.gif' || !pairImage.complete) {
					// もう一方の画像が読み込み済みでなければ
					return;
				}
			}
			// クラスを追加
			image.parentNode.classList.add('complete');
		}
	}
}



/**
 * 指定した要素が挿入された直後に関数を実行する
 * @param {Function} main 実行する関数
 * @param {Function} isTargetParent 挿入された要素の親要素が、指定した要素の親要素か否かを返す関数。functionsAccordingToBrowsersを指定していれば省略する
 * @param {Function} isTarget 挿入された要素が、指定した要素か否かを返す関数。functionsAccordingToBrowsersを指定していれば省略する
 * @param {Function} existsTarget 指定した要素が存在するか否かを返す関数
 * @param {Object} [functionsAccordingToBrowsers] DOMContentLoaded前のタイミングで1回だけスクリプトを起動させる場合に設定
 * @param {Function} functionsAccordingToBrowsers.firefox.isTargetParent 挿入された要素の親要素が、指定した要素の親要素か否かを返す関数（Firefoxの場合）
 * @param {Function} functionsAccordingToBrowsers.firefox.isTarget 挿入された要素が、指定した要素か否かを返す関数（Firefoxの場合）
 * @param {Function} functionsAccordingToBrowsers.google.isTargetParent 挿入された要素の親要素が、指定した要素の親要素か否かを返す関数（Google Chromeの場合）
 * @param {Function} functionsAccordingToBrowsers.google.isTarget 挿入された要素が、指定した要素か否かを返す関数（Google Chromeの場合）
 * @version 2013-06-08
 */
function startScript(main, isTargetParent, isTarget, existsTarget, functionsAccordingToBrowsers) {
	var observer, flag;
	
	// ブラウザによってDOMContentLoaded前のMutationObserverの挙動が異なるため、isTargetParent、isTargetをブラウザに合わせて変更
	if (functionsAccordingToBrowsers) {
		if ('chrome' in window) {
			// Google Chromeなら
			if (functionsAccordingToBrowsers.google) {
				isTargetParent = functionsAccordingToBrowsers.google.isTargetParent;
				isTarget = functionsAccordingToBrowsers.google.isTarget;
			}
		} else {
			// Firefoxなら
			if (functionsAccordingToBrowsers.firefox) {
				isTargetParent = functionsAccordingToBrowsers.firefox.isTargetParent;
				isTarget = functionsAccordingToBrowsers.firefox.isTarget;
			}
		}
	}
	
	// 指定した要素が既に存在していれば、即実行
	startMain();
	if (flag) {
		return;
	}
	
	if (typeof MutationObserver !== 'undefined') {
		// MutationObserverが利用できる場合
		observer = new MutationObserver(mutationCallback);
		observer.observe(document, {
			childList: true,
			subtree: true,
		});
	} else {
		// MutationObserverが利用できない場合 (Opera)
		checkExistingTarget(0);
	}
	
	if (functionsAccordingToBrowsers) {
		// DOMContentLoadedまでにスクリプトを実行できなかった場合、監視を停止（指定した要素が存在するか確認し、存在すれば実行）
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
	 * 指定された要素が挿入されたら、監視を停止し、{@link checkExistingTarget}を実行する
	 * 
	 * @param {MutationRecord[]} mutations a list of MutationRecord objects
	 * @param {MutationObserver} observer the constructed MutationObserver object
	 */
	function mutationCallback(mutations, observer) {
		var mutation, target, addedNodes, addedNode,
				i, j, l, l2;
		for (i = 0, l = mutations.length; i < l; i++) {
			mutation = mutations[i];
			target = mutation.target;
			if (target.nodeType === Node.ELEMENT_NODE && isTargetParent(target)) {
				// 子が追加されたノードがElementノードで、かつそのノードについてisTargetParentが真を返せば
				addedNodes = Array.prototype.slice.call(mutation.addedNodes);
				for (j = 0, l2 = addedNodes.length; j < l2; j++) {
					addedNode = addedNodes[j];
					if (addedNode.nodeType === Node.ELEMENT_NODE && isTarget(addedNode)) {
						// 追加された子がElementノードで、かつそのノードについてisTargetが真を返せば
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
	 * 
	 * @param {integer} count {@link startMain}を実行した回数
	 */
	function checkExistingTarget(count) {
		var LIMIT = 500, INTERVAL = 10;
		startMain();
		if (!flag && count < LIMIT) {
			window.setTimeout(checkExistingTarget, INTERVAL, count + 1);
		}
	}
	
	/**
	 * 指定した要素が存在するか確認し、存在すれば監視を停止しスクリプトを実行
	 */
	function startMain() {
		if (!flag && existsTarget()) {
			flag = true;
			main();
		}
	}
}

})();
