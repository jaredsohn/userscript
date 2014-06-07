// ==UserScript==
// @name         360doc免登录复制
// @namespace    http://weibo.com/qiangtoutou
// @include      http://www.360doc.com/content*
// @description  360doc免登录复制脚本
// @updateURL    https://userscripts.org/scripts/source/171986.meta.js
// @downloadURL  https://userscripts.org/scripts/source/171986.user.js
// @grant        unsafeWindow
// @version      20130724
// ==/UserScript==
(function (w) {
	var set = function (obj, key, val, timeout) {
		timeout = timeout || 5;
		timeout = timeout << 10;
		var interval = 300,
		count = 0;
		var fun = function () {
			if (count++ * interval < timeout) {
				setTimeout(function () {
					if (obj[key]) {
						obj[key] = val;
					} else {
						fun();
					}
				}, interval);
			}
		}
		fun();
	}

	w.$('#LayerLogin').hide();
	set(w, 'getCookie', function () {
		return 'hehe';
	});
})(unsafeWindow);