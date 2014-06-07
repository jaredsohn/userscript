// ==UserScript==
// @name           pixiv 遅延読み込みを解消
// @namespace      http://userscripts.org/users/347021
// @id             pixiv-solving-lazy-loading-347021
// @version        2.2.0
// @description    漫画を遅延読み込みさせず、普通に表示する / Solves lazy loading in pixiv manga pages (by replacing spacers with actual images.)
// @match          http://www.pixiv.net/member_illust.php?*mode=manga*
// @domain         www.pixiv.net
// @run-at         document-start
// @grant          dummy
// @updateURL      https://userscripts.org/scripts/source/105018.meta.js
// @icon           data:image/vnd.microsoft.icon;base64,AAABAAEAMDAAAAEAIADnDAAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAwAAAAMAgGAAAAVwL5hwAADK5JREFUaIHFmXuwVdV9xz9rrf0459z3hXsFUUAhIBQBUTQVJT5iCKbR2Gga22qatnl1apM2M4ZmGitpp7F5TB7TmiY6JpOZmDEmxhjUpEZrjVoeopjyEigI8r4P7vOcvfd69Y997rn3wgUutsDvzDp7zzlrr/V7/77rtwXAih9t4L7bF/Klxzfytx+YB7w3+uZj904wVk/YuKd7nhRCc4ZIgHfeq/cuPG/dL9fvqjx0962HAOb//fPityuv8UJIvHfD8z/14Bq+/edXsPwLj0ZP/8Nt2S0rH33XjYsvuLu9teXGaZNbQSqEEGeKf/D5V5qmbN6130mrv37n577zIK8/sPX3vvgzteqeW+xRAsN1K34UPnff7foP73v8nz66bMHd9U3NCiG8ybQXQuRrnlFyCCRhHMusUmbfwY4D//z9Jz7+2vc/vypuniSmLvsLv/2Re3IBPv3Qy3zzT6/kPSt++NnPfXjJV01QtNJbhcngLLA+mgREJQSWXbv39a782neX7332u+sBjZAe73IL8K7Pz/jJP96xNigUm1RYUCS9gDyrrA+TwxdbKZHw5AuvPPf1u2758Owb7ux745kfpAABwMqPLfujJDOtYakIvZ3knmVPtOqZJXOESlRnFs59x3WFqZddMj04vG5b25zMd2zxAZd9sqFvMLnZq4BypQJJBlKBP9vuUyUhAINzoayPI+Zff9MnnvnePRumLHp3uLdjSxYsmDOpBH5mWZSw5UHQjtz3T0UAAXi8B+89rvqor64hqp4qZX53akktn+wVAhxTJk+ZuxbqfdJXBrKgXvnYexrLmcVWEtB63DtIIXDOkRqLFILGUkxDKaalLkZKQRwGCAGDSYb30NFbppIa+pOMQEqiQGG9z3V1ki19kAlrtSuWSq1Ag0kGewCCtFKWqTaUU41NNFgzLsZzxjRtjSUWzWyjpb7A9PYm4lARBYowkIRK4YFKqvFAqg1JZti+/wg7D/awfV839cUI5/3JPVYZjNNoYwVQ1GkSAARZlohUWyqpwWkD5sQCeO9RUtJUF7P8qhnMmNxCMQrwgLEO5zzGOXYf6KW3nBErxfRJTUSBohiH1BciJjaVWDzrXPYc7uXpV3ZyqGew5l7H3VcZjDdk2gAoZ60ARACgrSMzFptZcMdmHwFY5/HeM629iWsXTGPBBe1Y57HO09lXZtu+bjbv6eTNQ72kxuL9kF/k1ziUzJvWziUzzmHWlFaUFMyY3MKn3reIZ17bxW82vYVzHiGOE33a4LzJXQ6ExwvAB8Y6Mm1JM51bwI4WQElBaiwTG4osnT+VK+dMoRAFJNqQZpbHX97GzkM97OvsJwwUgZIjQsjXrpXU8vLmvazeuo+FM87h96+cTX0xBODGxRcy49xmHnh6A8a4MaGLDzTOGjJtPSB81ecC53OTp9rgjB0VA0IIstQy5/wJfGL5JQRSIoUg05YoUPx605u8sGkPgZIoJXDekRl3zOYjyTrP+u0H2LG/m7+6aTFtTSW0ccyc3MJHb5jPvz31GtaOUYMyi/MWa/P1h2JGGpNbINOaTJvq/ZBVDO+7dCaf+cDlRIFCW4d1wwxKKTDW1+aPd2jj6OpL+NdV60kyXc1mnllTWlk0YxJJls8Z5iVXcJoZtM2T9JAFpPcebRxJqkkyS6Itmcmvf7ZsAR+8ejbWOg4eGeTbT75Kd39SS3nGOJLM5NlF23GPSmaopJqdB3p46pWdOYauKuSmd76DUhzkCtSWRJuqu2qSzGCd9SOdMzDOkVnr00wLrw0CS+9gyhfvWMqimZMoZ4au3jIrH/4NUaBQqoqRBBjnyIxBSsnbAX7GelZv2ce186fRWBejraO9ucS86W088+ougkDWXMVLQ+BzDxnTApk2ZCY310Al48JzmskyC87ztcfW0tVbwVqPdx58rjLnPKkebepTGc55Nuw6xOu7DiM8CA8DFc3tS+dSzgx6pGtmmjSzODdaUdJVU6E2llRrUm2JwoCH/3MzDaWIJ9buYOPujty1rK3q2dcCMjM2F9zYtzEc1noOHhmopU/vPfWliJmTW+hPMlJj0dbhnENbKwaTzAE1QYLuvrJXnX22XZaChtCBd4RK8sgLm7l4WhvFMCDVFikgMw7vPUMf6xyptih54sxzMnpx015uXXIRzjuEFBjruGb+VNZtP0BTKaa3nNJnUt/Z3U9vR5cFRJoXNIJykvndh3rt7l4flKShsRjSWCrQVBfx5Z+upqW+gDYWIUAbW4NnILA2t0Ag3/6pzXs40N2PdW4UBBtMDFt2dyKEYCDJICiAM2BGZ6EAked7vKOSGsqVlINd/YCgEIfEkaIUh8SBoqEY56arPmycy/0yyANbiGHkWWNwCKVWNx1Cq955nM/d1zmHdR4hBAKPl3C4Z4DBjj5EU6la2FwN3Y6kgCF+nAU8CIGQuUMm2pBkmt7+Crj88czYnAE83f0J2/d3E4WqBpPliDO0gBpQ8x6sczjvyeMuZ9qmmisunoaSMq8xVaDY2VeBIM9uOX9uzDNKMFJXI81aIyGqYxin5OhGoLWlXE4pK3kKByAx6kJiuO2q2bnwUlTxkGTrW10QqBHLjh1nwZi/jpfyUMgh29ttvcQB505oqDEqBHT0DLLq+U0EDUWMPXGCOLsnd+tYcskFXLdgOpC7VnNdgZUPvwTF6KicP7aC5OjbM9TA8hAFCqTgrvcvorkuRghBMQ5Zv/0Aj720FaUUbqRbCjnmSVHWVhRnzhhKCbJM841P3sCHls4l1XmaTjLDvT98kb7BDOeOcp3juOgw1/LUBbDOQTnDO48UonrUFNV0Wt2X4ewkBJDk6PP+u5bz6ZsX09VXAQGlOOT+VetZtXpbDdwdy+qxQgwHsZD58OOrqpmxLLv0Qrr++Goefn4zh97sACUgDvP0J+TwcsbhKxmEktuXLeRjyxdy9bzz6eyrUFcIqaSGzz7wLN/4yWoI1NgbSpljsGMEEOQpUKpTCgFjHRedP5GVdyzlM7dcTpIZVm/dz1PrdrCno48jAwnlRFOMQ6a2NfKRd1/M4lmTaW8uESjJYKKpK4T8dtdh7vzqL9i2r/v4zAMIBeLY8/oIC1Rz4jgpUJL12w+w80AP1yyYRl0h5NarZnPn9fPGnJ9VQdkQzn9l20GeWLON+3+6BlmI8hpzolJyHP6qAniQp1YS4lDx1LqdfOl7/8HFc8+jvbmOyy+azKIZk1BS0lAMkTI/H1vnKaeaTFt+9eou3tjbxeot+9ADCWF9AWPdybGUVGMGcpBXIjE84UQFacR/3nsa62IoRfz3zkPgPc9u2EUUhUgpiJTMMYzI4YQxDmMdOtXgPIQKUYrRzo+vkSZVNU6PEkDkuwivgnzSCRtbRwO1/DcRqJoGtfVg84POseQhCI56fpykcgGEUMKDHxI6EFLkEa7CXAA5diB55yhndoSfClLjIHPIuhA3Tm5OGXEMzVchqAAh5SjBg1AFqCiUvhhDFoFyo1VThdtxoPjL919KUynOzwXes/R3zuODN8zn52t2UArVMce9/xcakjiOgQwqIRWqfVkgiEJFFEfOxwGUYkjcKDVJIahkhr+++TK+8AdXMFDJgFzGJXOmMOvcVv5r68Fqy+U0tuTrIiDCB4oK1JpfQeQzUyxEfU6YiaKuDoQ9KlghLoR85eevce8jawnUcMUewiptTSVCpYhOG5QSUIjARsKKrB8QwufaClTf3qQUssMrP1E0NoOtHBMHHk9DqYCSY7T8PCeFvP9X3kHgowCRSQYHDu4EhHCZBQgOb36pp+13P/RcLMw7aW2FSvdxA/nskMgzV33JSz0odq/72YthXYs35V4NeSFzAxv//enWaz/ycan7JjJlKnQfBnUG4fWJyFloPw850Cu79254PRvo7lRhodc7lwEEE6bPY/eaJ19tnjr3X6Ze9p57fX1sfHyOEoMD4mTvCk47FQr4Qp1X0otKf8fg9l89+Avv3GGTlo8AuQW63tzoJs5cxOuPfuUHQpcLc66/bUU4oQ3d0miQUoqTvXk4DeSHWhk6c5GQQc+OrYOrH1rxnXLX/jeAt4Aeqq9Rh1iTCNGI9xc0T5q+eOmf/N3fTJk9f/Z43l2dLhJCkKap2/jsj19c8+Nv/VoqdcBZuxnYAXQDpiaACiI8PhBCNMX1zVPLRw5PBGYtWH7Hkrrmia31Le1Ntd7I6SYpfMfuHZ0DXft7tq/+5QagEhXre7LKwP8Ae6rMa6rl9mj9KqmCUrGhpS0tD0w0WaUeKAEhecCfCXsM2V1HxTrjrOk2WXoYRCf4fnLXGQFojiVBDvIKCFkECkAEfigtnU4zVF844wDtvUuBSnUYxmgO/S9jF1Zlift4fQAAAABJRU5ErkJggg==
// @author         100の人 https://userscripts.org/users/347021
// @license        Creative Commons Attribution 3.0 Unported License
// ==/UserScript==

(function() {
'use strict';

polyfill();

var footers = document.getElementsByClassName('end-page'), images, imagesLength;

startScript(main,
	function (parent) { return parent.id === 'main'; },
	function (target) { return target.classList.contains('end-page'); },
	function () { return footers[0]; },
	{});

function main() {
	// 読み込み完了時に、次の画像を取得
	var imagesParent = document.getElementsByClassName('manga')[0];
	images = imagesParent.getElementsByClassName('image');
	imagesLength = images.length;
	imagesParent.addEventListener('load', loadNextImage, true);
	imagesParent.addEventListener('error', loadNextImage, true);
}

function loadNextImage(event) {
	var image = event.target, index;
	if (image.localName === 'img' && !(new URL(image.src).pathname.endsWith('/transparent.gif'))
			&& !(event.type === 'load' && image.width === 1 && image.height === 1)) {
		// ダミー画像で発生したイベントでなければ
		for (index = parseInt(image.dataset.index, 10) + 1; index < imagesLength; index++) {
			// 次のページが存在すれば
			image = images[index];
			if (new URL(image.src).pathname.endsWith('/transparent.gif')) {
				// 次のページがダミー画像なら
				// 正しい画像に置き換え
				image.src = image.dataset.src;
				break;
			} else if (!image.complete) {
				// 読み込みが完了していなければ
				break;
			}
		}
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
 * @param {Function} main 実行する関数
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

// Polyfill for Firefox 24 ESR, Opera and Google Chrome
try {
	new URL('http://example.com/').pathname.indexOf('foobar');
} catch(e) { (function () {
	/**
	 * To parse a URL without using a base URL, invoke the constructor with a single argument.
	 * If you rather resolve it against the base URL of a document, use baseURI.
	 * @constructor
	 * @param {string} url
	 * @param {(URL|string)} [base="about:blank"]
	 * @see {@link http://url.spec.whatwg.org/#constructors 7.1 Constructors - URL Standard}
	 * @version polyfill-2013-12-26
	 * @name URL
	 */
	Object.defineProperty(window, 'URL', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (url) {
			var base = arguments[1];
			if (!(0 in arguments)) {
				throw new TypeError('Not enough arguments');
			}
			this._urlUtils = document.implementation.createHTMLDocument().createElement('a');
			this._urlUtils.href = url;
			if (base) {
				if (!(base instanceof URL)) {
					base = new URL(base);
				}
				base.hash = '';
				['protocol', 'username', 'password', 'host', 'pathname', 'search'].forEach(function (propertyName) {
					var property = base[propertyName];
					if (property) {
						this._urlUtils[propertyName] = property;
					}
				});
			} else {
				if (this._urlUtils.protocol === ':') {    // Firefoxでは未設定時 http: になるため検出できない
					throw new TypeError('An invalid or illegal string was specified');
				}
			}
		},
	});
	var properties = {};
	['href', 'origin', 'protocol', 'username', 'password', 'host', 'hostname', 'port', 'pathname', 'search', 'hash'].forEach(function (propertyName) {
		properties[propertyName] = {
			enumerable: false,
			configurable: true,
			get: function () { return this._urlUtils[propertyName]; },
			set: function (value) { this._urlUtils[propertyName] = value; },
		};
	});
	Object.defineProperties(URL.prototype, properties);
})();}

// Polyfill for Opera and Google Chrome
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
}

})();
