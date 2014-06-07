// ==UserScript==
// @name           Bug 667607 (タブを閉じた時の隙間を埋める)
// @namespace      https://userscripts.org/users/347021
// @version        1.1.1
// @description    タブを閉じた時、タブバーの右端に生じる隙間をすぐに埋める / Resize tabs to fill the tab bar immediately after closing a tab (Firefox 4 feature)
// @include        main
// @author         100の人 https://userscripts.org/users/347021
// @license        Creative Commons Attribution 3.0 Unported License
// ==/UserScript==

(function () {
'use strict';

let _removeTab = gBrowser.removeTab;
gBrowser.removeTab = function (aTab, aParams) {
	if (aParams && typeof aParams === 'object' && 'byMouse' in aParams) {
		delete arguments[1].byMouse;
	}
	_removeTab.apply(this, arguments);
};

})();
